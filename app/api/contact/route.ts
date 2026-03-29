import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  const { name, email, subject, message } = await req.json();

  if (!name || !email || !subject || !message) {
    return NextResponse.json({ error: 'Champs manquants.' }, { status: 400 });
  }

  const { error } = await resend.emails.send({
    from: 'Portfolio <onboarding@resend.dev>',
    to: 'ethan.collin2304@gmail.com',
    replyTo: email,
    subject: `[Portfolio] ${subject}`,
    text: `De : ${name} <${email}>\n\n${message}`,
  });

  if (error) {
    return NextResponse.json({ error: 'Envoi échoué.' }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
