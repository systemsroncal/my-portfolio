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
      "HTML5",
      "CSS3 / Tailwind",
      "JavaScript (ES6+)",
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
      "PHP (Laravel, CodeIgniter)",
      "Python",
      "Node.js",
      "Java",
      "REST APIs",
      "Microservicios",
      "Event-driven architecture",
      "Redis",
    ],
  },
  {
    id: "data",
    name: { es: "Datos, BI & KPIs", en: "Data, BI & KPIs" },
    items: [
      "Análisis de datos",
      "SQL & Query tuning",
      "PostgreSQL / MySQL / RDS",
      "Supabase & Firebase",
      "ETL & modelado de datos",
      "Power BI, DAX & Power Query",
      "KPIs & dashboards",
      "GA4 / GTM / Search Console",
    ],
  },
  {
    id: "platforms",
    name: { es: "ERP, CRM & CMS", en: "ERP, CRM & CMS" },
    items: [
      "ERP (administración e integración)",
      "CRM (SaaS & automatización)",
      "CMS corporativos",
      "WordPress (avanzado)",
      "WooCommerce",
      "Shopify / PrestaShop / Magento",
      "Odoo / VTEX / Wix",
      "Moodle & OJS",
    ],
  },
  {
    id: "cloud",
    name: { es: "Cloud & DevOps", en: "Cloud & DevOps" },
    items: [
      "AWS (EC2, S3, RDS, Cognito, IVS)",
      "Docker",
      "Linux (CentOS, Ubuntu)",
      "WHM/cPanel & Windows Server",
      "DNS, CDN (Cloudflare, Bunny)",
      "WAF & hardening",
      "Backup & DR (RTO/RPO)",
      "Git, GitHub & CI/CD",
    ],
  },
  {
    id: "ai",
    name: { es: "IA & agentes", en: "AI & agents" },
    items: [
      "Agentes de IA & voz (Twilio, ElevenLabs, Deepgram)",
      "OpenAI, Claude & DeepSeek",
      "Cursor IDE & Cursor CLI",
      "Antigravity & OpenCode",
      "GitHub Copilot",
      "Prompting técnico",
      "QA asistida por IA",
    ],
  },
  {
    id: "design",
    name: { es: "Diseño & Producto", en: "Design & Product" },
    items: ["Figma", "Notion", "UI/UX web", "Prototipado", "SEO técnico & on-page"],
  },
  {
    id: "methods",
    name: { es: "Metodologías & ciclo de vida", en: "Methods & SDLC" },
    items: [
      "Ciclo de vida del software (análisis → diseño → desarrollo → implementación → pruebas → mejora continua)",
      "Scrum & Kanban",
      "ITIL® 4 & COBIT",
      "Coordinación de proyectos TI",
      "Ciberseguridad (OWASP Top 10)",
      "CCNA & redes",
      "VoIP (Asterisk)",
    ],
  },
];

export const hologramSkills = [
  "Datos, KPIs & BI",
  "ERP, CRM & CMS",
  "AWS & Cloud",
  "Agentes & IA dev",
  "Ciclo de vida SW",
];
