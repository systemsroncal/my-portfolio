import nodemailer from "nodemailer";

export interface ContactBody {
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

const escapeHtml = (value: string) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

const parseBody = (raw: unknown): ContactBody => {
  if (typeof raw === "string") {
    if (!raw) return {};
    try {
      return JSON.parse(raw) as ContactBody;
    } catch {
      return {};
    }
  }

  if (raw && typeof raw === "object") {
    return raw as ContactBody;
  }

  return {};
};

export async function processContactRequest(
  method: string,
  rawBody: unknown,
): Promise<{ status: number; body: Record<string, unknown> }> {
  if (method !== "POST") {
    return { status: 405, body: { error: "method_not_allowed" } };
  }

  const body = parseBody(rawBody);
  const name = sanitize(body.name, 120);
  const email = sanitize(body.email, 200);
  const phone = sanitize(body.phone, 40);
  const message = sanitize(body.message, MAX_FIELD_LENGTH);

  if (!name || !email || !phone || !message) {
    return { status: 400, body: { error: "missing_fields" } };
  }

  if (!isValidEmail(email)) {
    return { status: 400, body: { error: "invalid_email" } };
  }

  if (phone.replace(/\D/g, "").length < 9) {
    return { status: 400, body: { error: "invalid_phone" } };
  }

  const host = process.env.SMTP_HOST;
  const port = Number(process.env.SMTP_PORT ?? "587");
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  const fromEmail = process.env.SMTP_FROM ?? "systems.roncal@gmail.com";

  if (!host || !user || !pass) {
    console.error("SMTP environment variables are not configured.");
    return { status: 503, body: { error: "smtp_not_configured" } };
  }

  try {
    const transporter = nodemailer.createTransport({
      host,
      port,
      secure: port === 465,
      auth: { user, pass },
      ...(port === 587 ? { requireTLS: true } : {}),
    });

    await transporter.sendMail({
      from: `"Portfolio Enrique Roncal" <${fromEmail}>`,
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

    return { status: 200, body: { ok: true } };
  } catch (error) {
    console.error("SMTP send failed:", error);
    return { status: 500, body: { error: "send_failed" } };
  }
}
