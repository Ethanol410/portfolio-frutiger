import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { z } from 'zod';

const resend = new Resend(process.env.RESEND_API_KEY);

const contactSchema = z.object({
  name:    z.string().min(1).max(100),
  email:   z.string().email().max(200),
  subject: z.string().min(1).max(200),
  message: z.string().min(1).max(2000),
});

export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Données invalides.' }, { status: 400 });
  }

  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: 'Données invalides.' }, { status: 400 });
  }

  const { name, email, subject, message } = parsed.data;

  const to = process.env.CONTACT_EMAIL;
  if (!to) {
    return NextResponse.json({ error: 'Erreur de configuration.' }, { status: 500 });
  }

  const { error } = await resend.emails.send({
    from: 'Portfolio <onboarding@resend.dev>',
    to,
    replyTo: email,
    subject: `[Portfolio] ${subject}`,
    text: `De : ${name} <${email}>\n\n${message}`,
  });

  if (error) {
    return NextResponse.json({ error: "Erreur lors de l'envoi." }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
