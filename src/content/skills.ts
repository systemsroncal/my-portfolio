import type { Localized } from "./types/localized";

export interface SkillCategory {
  id: string;
  name: Localized<string>;
  items: string[];
}

export const skillCategories: SkillCategory[] = [
  {
    id: "frontend",
    name: { es: "Frontend", en: "Frontend" },
    items: [
      "HTML",
      "CSS",
      "JavaScript",
      "TypeScript",
      "jQuery",
      "Vue.js",
      "Angular",
      "Next.js",
      "Bootstrap",
    ],
  },
  {
    id: "backend",
    name: { es: "Backend & APIs", en: "Backend & APIs" },
    items: [
      "PHP",
      "Python",
      "Node.js",
      "Laravel",
      "CodeIgniter",
      "Java",
      "REST APIs",
      "Microservicios",
    ],
  },
  {
    id: "data",
    name: { es: "Datos & BI", en: "Data & BI" },
    items: ["MySQL", "PostgreSQL", "SQL", "Firebase", "Power BI", "DAX", "Modelado de datos"],
  },
  {
    id: "cms",
    name: { es: "CMS & E-commerce", en: "CMS & E-commerce" },
    items: [
      "WordPress",
      "WooCommerce",
      "Shopify",
      "PrestaShop",
      "Magento",
      "Odoo",
      "VTEX",
      "Wix",
      "Moodle",
    ],
  },
  {
    id: "cloud",
    name: { es: "Cloud & DevOps", en: "Cloud & DevOps" },
    items: [
      "AWS",
      "AWS IVS",
      "Docker",
      "Linux (CentOS, Ubuntu)",
      "WHM/cPanel",
      "Cloudflare CDN",
      "Bunny CDN",
      "Git & GitHub",
      "CI/CD",
    ],
  },
  {
    id: "ai",
    name: { es: "IA & agentes", en: "AI & agents" },
    items: [
      "Agentes de IA",
      "Cursor IDE",
      "Cursor CLI",
      "Google Antigravity",
      "OpenCode",
      "GitHub Copilot",
      "Prompting técnico",
      "Revisión y QA asistida",
    ],
  },
  {
    id: "design",
    name: { es: "Diseño & Producto", en: "Design & Product" },
    items: ["Figma", "Notion", "UI/UX web", "Prototipado", "SEO on-page"],
  },
  {
    id: "methods",
    name: { es: "Metodologías & Seguridad", en: "Methods & Security" },
    items: ["Scrum", "Kanban", "ITIL", "COBIT", "Ciberseguridad", "CCNA"],
  },
];

export const hologramSkills = [
  "Agentes & IA dev",
  "AWS & Cloud",
  "WordPress & E-commerce",
  "Power BI & Datos",
  "Figma & UX",
];
