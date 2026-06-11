import { getLegalPath } from "../../composables/useLegalRoute";
import type { LegalDocument } from "../legal/types";

const legalHref = getLegalPath("legal", "en");

export const privacyEn: LegalDocument = {
  title: "Privacy Policy",
  updated: "Last updated: June 11, 2026",
  langSwitchLabel: "Versión en español",
  blocks: [
    {
      type: "p",
      html: 'Enrique Roncal (the "Controller") explains how personal data is processed on this professional portfolio website, in accordance with Peru\'s Law No. 29733 on Personal Data Protection and its regulations.',
    },
    {
      type: "h2",
      text: "1. Data controller",
    },
    {
      type: "ul",
      items: [
        "<strong>Controller:</strong> Enrique Roncal",
        "<strong>Location:</strong> Lima, Peru",
        '<strong>Email:</strong> <a href="mailto:systems.roncal@gmail.com">systems.roncal@gmail.com</a>',
        '<strong>WhatsApp:</strong> <a href="https://wa.me/51989867536">+51 989 867 536</a>',
      ],
    },
    {
      type: "h2",
      text: "2. Data we collect",
    },
    {
      type: "p",
      html: "This website may process the following data:",
    },
    {
      type: "ul",
      items: [
        "<strong>Contact data:</strong> name, email address, phone number, and message when you use the contact form, send an email, or contact us via WhatsApp.",
        "<strong>Site preferences:</strong> selected language and sound preference, stored in your browser through <code>localStorage</code>.",
        "<strong>Technical data:</strong> IP address, browser type, operating system, pages visited, and server logs automatically generated when browsing or using the site.",
      ],
    },
    {
      type: "p",
      html: "This website does not require user registration and does not intentionally collect sensitive data. It does not use advertising cookies or proprietary commercial profiling.",
    },
    {
      type: "h2",
      text: "3. Purpose of processing",
    },
    {
      type: "p",
      html: "Data is used to:",
    },
    {
      type: "ul",
      items: [
        "Respond to inquiries, information requests, or professional proposals.",
        "Manage communication initiated by the user.",
        "Remember language and sound preferences to improve the browsing experience.",
        "Ensure the security, stability, and proper operation of the website.",
        "Comply with applicable legal obligations.",
      ],
    },
    {
      type: "h2",
      text: "4. Legal basis",
    },
    {
      type: "p",
      html: "Processing is based on:",
    },
    {
      type: "ul",
      items: [
        "Your consent when submitting data through the contact form or other contact channels.",
        "The Controller's legitimate interest in handling professional requests and keeping the website operational.",
        "Compliance with legal obligations, where applicable.",
      ],
    },
    {
      type: "h2",
      text: "5. Data retention",
    },
    {
      type: "p",
      html: "Contact messages are kept for as long as necessary to handle the communication and, where applicable, while a professional or business relationship exists. Technical server data is retained for the usual period of hosting providers. Browser-stored preferences remain until you delete them.",
    },
    {
      type: "h2",
      text: "6. Recipients and processors",
    },
    {
      type: "p",
      html: "Data may be processed by providers required to operate the website, including:",
    },
    {
      type: "ul",
      items: [
        "<strong>Vercel Inc.</strong>, hosting and deployment provider.",
        '<strong>Email provider (SMTP)</strong>, to send contact form messages to <a href="mailto:systems.roncal@gmail.com">systems.roncal@gmail.com</a>.',
      ],
    },
    {
      type: "p",
      html: "These providers may be located outside Peru. In such cases, the Controller seeks reasonable protection measures in accordance with applicable law.",
    },
    {
      type: "p",
      html: "Personal data is not sold or shared with third parties for commercial purposes.",
    },
    {
      type: "h2",
      text: "7. Your rights",
    },
    {
      type: "p",
      html: "Under Peruvian data protection law, you may exercise the following rights:",
    },
    {
      type: "ul",
      items: [
        "Access to your personal data.",
        "Rectification of inaccurate or incomplete data.",
        "Cancellation or deletion, where applicable.",
        "Objection to processing, in the cases provided by law.",
        "Withdrawal of consent previously given.",
      ],
    },
    {
      type: "p",
      html: 'To exercise these rights, email <a href="mailto:systems.roncal@gmail.com">systems.roncal@gmail.com</a> with your request and a contact method for our response. You may also file a complaint with Peru\'s National Authority for Personal Data Protection if you believe your rights have not been addressed.',
    },
    {
      type: "h2",
      text: "8. Security",
    },
    {
      type: "p",
      html: "Reasonable technical and organizational measures are adopted to protect personal data. However, no Internet transmission can be guaranteed to be completely secure.",
    },
    {
      type: "h2",
      text: "9. Children",
    },
    {
      type: "p",
      html: "This website is not directed at children under 14. If you believe a minor has provided personal data without authorization, contact us so we can delete it.",
    },
    {
      type: "h2",
      text: "10. Third-party links",
    },
    {
      type: "p",
      html: "The website may contain links to social networks, repositories, or other external sites. The Controller does not control the privacy policies of those sites and recommends reviewing them before sharing personal data.",
    },
    {
      type: "h2",
      text: "11. Changes to this policy",
    },
    {
      type: "p",
      html: "This policy may be updated to reflect legal or technical changes. The latest update date will appear at the top of this page. Continued use of the website after publication implies acceptance of the changes, unless additional consent is required by law.",
    },
    {
      type: "h2",
      text: "12. Contact",
    },
    {
      type: "p",
      html: 'For privacy-related questions, email <a href="mailto:systems.roncal@gmail.com">systems.roncal@gmail.com</a>.',
    },
    {
      type: "p",
      html: `See also the <a href="${legalHref}">Legal Notice</a>.`,
    },
  ],
};
