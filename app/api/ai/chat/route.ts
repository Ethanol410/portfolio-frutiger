import Groq from 'groq-sdk';
import { portfolio } from '@/app/data/portfolio';

const client = new Groq({ apiKey: process.env.GROQ_API_KEY });

const MAX_MESSAGES = 10;
const MAX_CONTENT_LENGTH = 1000;

function buildSystemPrompt(): string {
  const { fullName, email, phone, github, linkedin, bio, skills, experience, projects, awards, availability } = portfolio;

  const skillLines = Object.entries(skills)
    .map(([cat, list]) => `- ${cat} : ${list.join(', ')}`)
    .join('\n');

  const experienceLines = experience
    .map(e => `- ${e.role} — ${e.company} (${e.period})\n  → ${e.desc}`)
    .join('\n');

  const projectLines = projects
    .map(p => `- ${p.title} [${p.tech.join(', ')}]\n  → ${p.desc}`)
    .join('\n');

  const awardLines = awards
    .map(a => `- ${a.title} (${a.year}) : ${a.desc}`)
    .join('\n');

  return `Tu es Ethan, un assistant IA intégré dans le portfolio interactif d'${fullName}.
Tu réponds aux questions des recruteurs, visiteurs et développeurs de façon concise, chaleureuse et professionnelle.
Tu parles à la première personne (comme si tu étais Ethan) et tu connais parfaitement son profil.

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

## Instructions
- Réponds toujours en français sauf si on te parle en anglais
- Sois concis (max 3-4 phrases sauf si on demande des détails)
- Si l'utilisateur veut voir les projets, le CV, la page à propos ou me contacter, place exactement ce tag en début de réponse : [ACTION:open:projects], [ACTION:open:cv], [ACTION:open:about] ou [ACTION:open:contact]. Exemple : "[ACTION:open:projects] Voici mes projets !"
- N'utilise ce tag qu'une seule fois par réponse, uniquement si nécessaire
- Ne réponds pas à des questions hors-sujet (politique, etc.), recentre sur le portfolio
`;
}

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

function validateMessages(messages: unknown): messages is Message[] {
  if (!Array.isArray(messages) || messages.length === 0) return false;
  if (messages.length > MAX_MESSAGES * 2) return false;
  return messages.every(
    (m) =>
      m &&
      typeof m === 'object' &&
      (m.role === 'user' || m.role === 'assistant') &&
      typeof m.content === 'string' &&
      m.content.length > 0 &&
      m.content.length <= MAX_CONTENT_LENGTH
  );
}

const ACTION_RE = /\[ACTION:open:(\w+)\]/;

export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return new Response(JSON.stringify({ error: 'Corps de requête invalide.' }), { status: 400 });
  }

  const { messages } = body as { messages: unknown };

  if (!validateMessages(messages)) {
    return new Response(JSON.stringify({ error: 'Messages invalides ou trop longs.' }), { status: 400 });
  }

  const trimmedMessages = messages.slice(-MAX_MESSAGES);

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

            // Tag potentiellement en cours de construction — envoyer ce qui précède le '['
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
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Erreur inconnue';
    return new Response(JSON.stringify({ error: `Erreur API : ${message}` }), { status: 502 });
  }
}
