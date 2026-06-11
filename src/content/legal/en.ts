import { getLegalPath } from "../../composables/useLegalRoute";
import type { LegalDocument } from "./types";

const privacyHref = getLegalPath("privacy", "en");

export const legalEn: LegalDocument = {
  title: "Legal Notice",
  updated: "Last updated: June 11, 2026",
  langSwitchLabel: "Versión en español",
  blocks: [
    {
      type: "h2",
      text: "1. Website owner",
    },
    {
      type: "p",
      html: "This personal portfolio website is operated by:",
    },
    {
      type: "ul",
      items: [
        "<strong>Owner:</strong> Enrique Roncal",
        "<strong>Activity:</strong> Professional portfolio and presentation of systems engineering and web development services",
        "<strong>Location:</strong> Lima, Peru",
        '<strong>Email:</strong> <a href="mailto:systems.roncal@gmail.com">systems.roncal@gmail.com</a>',
        '<strong>WhatsApp:</strong> <a href="https://wa.me/51989867536">+51 989 867 536</a>',
      ],
    },
    {
      type: "h2",
      text: "2. Purpose of the website",
    },
    {
      type: "p",
      html: "This website is informational and professional in nature. It showcases Enrique Roncal's experience, skills, and projects, and provides ways to get in touch regarding web development, cloud, e-commerce, and business systems work.",
    },
    {
      type: "h2",
      text: "3. Terms of use",
    },
    {
      type: "p",
      html: "By accessing and using this website, you agree to the following:",
    },
    {
      type: "ul",
      items: [
        "Use the site lawfully and respectfully.",
        "Do not attempt to damage, disrupt, or gain unauthorized access to its systems or content.",
        "Do not reproduce, distribute, or commercially exploit the content without prior authorization.",
        "Provide accurate information when using the available contact methods (form, email, or WhatsApp).",
      ],
    },
    {
      type: "p",
      html: "The owner reserves the right to modify, suspend, or discontinue the website, in whole or in part, without prior notice.",
    },
    {
      type: "h2",
      text: "4. Intellectual property",
    },
    {
      type: "p",
      html: "Original texts, design, code, images, animations, logos, and other content on this website belong to Enrique Roncal or are used under the appropriate license. Reproduction, distribution, or transformation without express authorization is prohibited, except where permitted by law.",
    },
    {
      type: "h2",
      text: "5. External links",
    },
    {
      type: "p",
      html: "This website may include links to third-party sites (social networks, repositories, projects, or other resources). Enrique Roncal is not responsible for the content, policies, or practices of those external sites. Accessing them is at the user's own risk.",
    },
    {
      type: "h2",
      text: "6. Limitation of liability",
    },
    {
      type: "p",
      html: "The owner strives to keep the website updated and accessible, but does not guarantee the absence of errors, interruptions, or inaccuracies. Use of the website is at the user's own risk.",
    },
    {
      type: "p",
      html: "The information published is professional in nature and does not constitute binding legal, tax, or contractual advice unless expressly agreed in writing.",
    },
    {
      type: "h2",
      text: "7. Privacy",
    },
    {
      type: "p",
      html: `Personal data processing is described in the <a href="${privacyHref}">Privacy Policy</a>.`,
    },
    {
      type: "h2",
      text: "8. Governing law",
    },
    {
      type: "p",
      html: "Use of this website shall be governed by the laws of the Republic of Peru. Any dispute shall be submitted to the competent courts of Lima, Peru, unless mandatory law provides otherwise.",
    },
    {
      type: "p",
      html: "This website is built with Vue 3, TypeScript, and Vite on the frontend. The visual experience uses Three.js for the 3D hero scene, GSAP and Lenis for animations and smooth scrolling, Sass for styling, and Howler for the audio system. The contact form is handled through a serverless API with Node.js and Nodemailer, and the site is deployed on Vercel. Content, copy, integrations, and later customizations were developed and adapted by Enrique Roncal for this professional portfolio.",
    },
    {
      type: "p",
      html: "Portions of the site interface are derived from portfolio-2025 (David Heckhoff), used under the project license.",
    },
  ],
};
