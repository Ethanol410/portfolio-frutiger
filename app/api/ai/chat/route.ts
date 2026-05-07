import Groq from 'groq-sdk';
import { z } from 'zod';
import { portfolio } from '@/app/data/portfolio';

const client = new Groq({ apiKey: process.env.GROQ_API_KEY });

const MAX_MESSAGES = 10;

function buildSystemPrompt(): string {
  const { fullName, title, subtitle, location, email, phone, github, linkedin, tagline, bio, skills, experience, projects, awards, availability } = portfolio;

  const skillLines = Object.entries(skills)
    .map(([cat, list]) => `- ${cat} : ${list.join(', ')}`)
    .join('\n');

  const experienceLines = experience
    .map(e => `- ${e.role}, ${e.company} (${e.period})\n  ${e.desc}`)
    .join('\n');

  const projectLines = projects
    .map(p => {
      const head = p.subtitle
        ? `- ${p.title} (${p.subtitle}) [${p.tech.join(', ')}]`
        : `- ${p.title} [${p.tech.join(', ')}]`;
      const venueLine = p.paperVenue ? `\n  Conférence : ${p.paperVenue}` : '';
      return `${head}\n  ${p.desc}${venueLine}`;
    })
    .join('\n');

  const awardLines = awards
    .map(a => `- ${a.title} (${a.year}) : ${a.desc}`)
    .join('\n');

  return `Tu es Ethan, un assistant IA intégré dans le portfolio interactif d'${fullName}.
Tu réponds aux questions des recruteurs, visiteurs et développeurs de façon concise, chaleureuse et professionnelle.
Tu parles à la première personne (comme si tu étais Ethan) et tu connais parfaitement son profil.

## Identité
- Nom : ${fullName}
- Titre : ${title}
- Formation : ${subtitle}
- Localisation : ${location}

## Pitch
${tagline}

## Profil
${bio}

## Contact
- Email : ${email}
- Téléphone : ${phone}
- GitHub : ${github}
- LinkedIn : ${linkedin}

## Disponibilité
${availability.label}

## Compétences
${skillLines}

## Expérience
${experienceLines}

## Projets
${projectLines}

## Distinctions
${awardLines}

## Règle de confidentialité importante (à respecter strictement)
- L'article de recherche soumis à ACM UIST 2026 est sous embargo de comité.
- Tu peux mentionner que je suis co-auteur d'un projet de recherche couplant IA et interaction humain-machine, et qu'un article a été soumis à la conférence ACM UIST 2026.
- Tu ne dois PAS divulguer le sujet précis de l'article, le titre interne du papier, le nom des co-auteurs, ni les chiffres exacts d'évaluation utilisateur ou de corpus.
- Si on te demande des détails sur le contenu du papier, redirige vers : "Le contenu précis est sous embargo jusqu'à la décision de comité (août 2026). Je peux en parler en entretien dans le cadre du travail que j'y ai réalisé."

## Instructions
- Réponds toujours en français sauf si on te parle en anglais
- Sois concis (max 3 à 4 phrases sauf si on demande des détails)
- N'utilise jamais de tirets cadratin (—) dans tes réponses : préfère la virgule, les deux-points, les parenthèses, le point ou le saut de ligne
- Si l'utilisateur veut voir les projets, le CV, la page à propos ou me contacter, place exactement ce tag en début de réponse : [ACTION:open:projects], [ACTION:open:cv], [ACTION:open:about] ou [ACTION:open:contact]. Exemple : "[ACTION:open:projects] Voici mes projets !"
- N'utilise ce tag qu'une seule fois par réponse, uniquement si nécessaire
- Ne réponds pas à des questions hors-sujet (politique, etc.), recentre sur le portfolio
`;
}

const messageSchema = z.object({
  role:    z.enum(['user', 'assistant']),
  content: z.string().min(1).max(1000),
});

const bodySchema = z.object({
  messages: z.array(messageSchema).min(1).max(MAX_MESSAGES * 2),
});

const ACTION_INJECT_RE = /\[ACTION:[^\]]*\]/g;
const ACTION_RE = /\[ACTION:open:(\w+)\]/;

export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return new Response(JSON.stringify({ error: 'Corps de requête invalide.' }), { status: 400 });
  }

  const parsed = bodySchema.safeParse(body);
  if (!parsed.success) {
    return new Response(JSON.stringify({ error: 'Messages invalides ou trop longs.' }), { status: 400 });
  }

  const sanitized = parsed.data.messages.map(m =>
    m.role === 'user'
      ? { ...m, content: m.content.replace(ACTION_INJECT_RE, '') }
      : m
  );

  const trimmedMessages = sanitized.slice(-MAX_MESSAGES);

  try {
    const groqStream = await client.chat.completions.create({
      model: 'llama-3.3-70b-versatile',
      max_tokens: 1024,
      stream: true,
      messages: [
        { role: 'system', content: buildSystemPrompt() },
        ...trimmedMessages,
      ],
    });

    const encoder = new TextEncoder();

    const readable = new ReadableStream({
      async start(controller) {
        let pendingBuffer = '';
        let actionSent = false;

        const sendToken = (text: string) => {
          if (text) {
            controller.enqueue(encoder.encode(`data:${JSON.stringify({ token: text })}\n\n`));
          }
        };

        for await (const chunk of groqStream) {
          const token = chunk.choices[0]?.delta?.content ?? '';
          if (!token) continue;

          pendingBuffer += token;

          if (!actionSent && pendingBuffer.includes('[')) {
            const match = ACTION_RE.exec(pendingBuffer);
            if (match) {
              // Envoyer l'action
              controller.enqueue(
                encoder.encode(`data:${JSON.stringify({ action: { type: 'open', app: match[1] } })}\n\n`)
              );
              actionSent = true;
              // Streamer le texte sans le tag
              sendToken(pendingBuffer.replace(ACTION_RE, '').replace(/^\s+/, ''));
              pendingBuffer = '';
              continue;
            }

            // Tag potentiellement en cours de construction : envoyer ce qui précède le '['
            const bracketIdx = pendingBuffer.lastIndexOf('[');
            sendToken(pendingBuffer.slice(0, bracketIdx));
            pendingBuffer = pendingBuffer.slice(bracketIdx);
          } else {
            sendToken(pendingBuffer);
            pendingBuffer = '';
          }
        }

        // Vider le tampon résiduel
        if (pendingBuffer) {
          sendToken(pendingBuffer.replace(ACTION_RE, '').replace(/^\s+/, ''));
        }

        controller.enqueue(encoder.encode('data:[DONE]\n\n'));
        controller.close();
      },
    });

    return new Response(readable, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        Connection: 'keep-alive',
      },
    });
  } catch {
    return new Response(JSON.stringify({ error: 'Une erreur est survenue.' }), { status: 502 });
  }
}
