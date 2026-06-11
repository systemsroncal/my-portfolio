export interface ContactEmailPayload {
  name: string;
  email: string;
  phone: string;
  message: string;
}

export class ContactEmailError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ContactEmailError";
  }
}

export const sendContactEmail = async (payload: ContactEmailPayload): Promise<void> => {
  const endpoint = import.meta.env.VITE_CONTACT_API_URL ?? "/api/contact";

  const response = await fetch(endpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  const data = (await response.json().catch(() => ({}))) as { error?: string };

  if (!response.ok) {
    throw new ContactEmailError(data.error ?? "send_failed");
  }
};
