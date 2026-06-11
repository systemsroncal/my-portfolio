import type { Locale } from "../i18n/types";

export interface WhatsAppContact {
  id: string;
  phone: string;
  name: Record<Locale, string>;
  role: Record<Locale, string>;
  greeting: Record<Locale, string>;
  avatar?: string;
  initials: string;
}

export const whatsappContacts: WhatsAppContact[] = [
  {
    id: "enrique",
    phone: "51989867536",
    name: { es: "Enrique Roncal", en: "Enrique Roncal" },
    role: { es: "Desarrollo web y consultas", en: "Web development & inquiries" },
    greeting: {
      es: "Hola, si necesitas ponerte en contacto conmigo, escríbeme y te responderé lo antes posible.",
      en: "Hi, if you need to get in touch with me, send a message and I'll get back to you as soon as possible.",
    },
    avatar: "/images/enrique-whatsapp-avatar.jpg",
    initials: "ER",
  },
];

export const formatWhatsAppPhone = (phone: string) => {
  if (phone.startsWith("51") && phone.length === 11) {
    return `+51 ${phone.slice(2, 5)} ${phone.slice(5, 8)} ${phone.slice(8)}`;
  }

  return `+${phone}`;
};

export const buildWhatsAppUrl = (phone: string, message: string) => {
  const text = message.trim();
  const base = `https://wa.me/${phone}`;
  return text ? `${base}?text=${encodeURIComponent(text)}` : base;
};
