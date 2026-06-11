import type { VercelRequest, VercelResponse } from "@vercel/node";
import nodemailer from "nodemailer";

interface ContactBody {
  name?: string;
  email?: string;
  phone?: string;
  message?: string;
}

const CONTACT_TO = "systems.roncal@gmail.com";
const MAX_FIELD_LENGTH = 2000;

const sanitize = (value: unknown, max = 500): string => {
  if (typeof value !== "string") return "";
  return value.trim().slice(0, max);
};

const isValidEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "method_not_allowed" });
  }

  const body = (req.body ?? {}) as ContactBody;
  const name = sanitize(body.name, 120);
  const email = sanitize(body.email, 200);
  const phone = sanitize(body.phone, 40);
  const message = sanitize(body.message, MAX_FIELD_LENGTH);

  if (!name || !email || !phone || !message) {
    return res.status(400).json({ error: "missing_fields" });
  }

  if (!isValidEmail(email)) {
    return res.status(400).json({ error: "invalid_email" });
  }

  if (phone.replace(/\D/g, "").length < 9) {
    return res.status(400).json({ error: "invalid_phone" });
  }

  const host = process.env.SMTP_HOST;
  const port = Number(process.env.SMTP_PORT ?? "587");
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  if (!host || !user || !pass) {
    console.error("SMTP environment variables are not configured.");
    return res.status(503).json({ error: "smtp_not_configured" });
  }

  try {
    const transporter = nodemailer.createTransport({
      host,
      port,
      secure: port === 465,
      auth: { user, pass },
    });

    await transporter.sendMail({
      from: `"Portfolio Enrique Roncal" <${user}>`,
      to: CONTACT_TO,
      replyTo: `"${name}" <${email}>`,
      subject: `Contacto portfolio — ${name}`,
      text: [
        `Nombre: ${name}`,
        `Email: ${email}`,
        `Celular: ${phone}`,
        "",
        "Mensaje:",
        message,
      ].join("\n"),
      html: `
        <h2>Nuevo contacto desde el portfolio</h2>
        <p><strong>Nombre:</strong> ${escapeHtml(name)}</p>
        <p><strong>Email:</strong> ${escapeHtml(email)}</p>
        <p><strong>Celular:</strong> ${escapeHtml(phone)}</p>
        <p><strong>Mensaje:</strong></p>
        <p>${escapeHtml(message).replace(/\n/g, "<br/>")}</p>
      `,
    });

    return res.status(200).json({ ok: true });
  } catch (error) {
    console.error("SMTP send failed:", error);
    return res.status(500).json({ error: "send_failed" });
  }
}

const escapeHtml = (value: string) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
