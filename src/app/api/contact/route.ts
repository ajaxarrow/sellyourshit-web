import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

const EMAIL_PATTERN = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;

interface ContactBody {
  senderEmail?: string;
  subject?: string;
  content?: string;
}

export async function POST(request: Request) {
  let body: ContactBody;
  try {
    body = (await request.json()) as ContactBody;
  } catch {
    return NextResponse.json({ message: "Invalid request." }, { status: 400 });
  }

  const senderEmail = body.senderEmail?.trim() ?? "";
  const subject = body.subject?.trim() ?? "";
  const content = body.content?.trim() ?? "";

  if (!senderEmail || !subject || !content) {
    return NextResponse.json(
      { message: "Email, subject, and content are all required." },
      { status: 400 },
    );
  }
  if (!EMAIL_PATTERN.test(senderEmail)) {
    return NextResponse.json(
      { message: "That doesn't look like a valid email." },
      { status: 400 },
    );
  }

  const { SMTP_HOST, SMTP_PORT, SMTP_USERNAME, SMTP_PASSWORD, TICKET_RECEIVER_EMAIL } =
    process.env;
  if (!SMTP_HOST || !SMTP_PORT || !SMTP_USERNAME || !SMTP_PASSWORD || !TICKET_RECEIVER_EMAIL) {
    console.error("Contact form submitted but SMTP env vars are missing.");
    return NextResponse.json(
      { message: "Support email isn't configured." },
      { status: 500 },
    );
  }

  const transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port: Number(SMTP_PORT),
    secure: true,
    auth: { user: SMTP_USERNAME, pass: SMTP_PASSWORD },
  });

  try {
    await transporter.sendMail({
      from: `"sellyoshit Support Ticket" <${SMTP_USERNAME}>`,
      to: TICKET_RECEIVER_EMAIL,
      replyTo: senderEmail,
      subject: `[sellyoshit Ticket] ${subject}`,
      text: `From: ${senderEmail}\n\n${content}`,
    });
    return NextResponse.json({ message: "Sent." });
  } catch (error) {
    console.error("Failed to send contact email:", error);
    return NextResponse.json(
      { message: "Couldn't send your message. Try again in a bit." },
      { status: 502 },
    );
  }
}
