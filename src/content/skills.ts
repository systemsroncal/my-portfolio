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
    items: ["HTML", "CSS", "JavaScript", "jQuery", "Angular", "Next.js", "Vue.js"],
  },
  {
    id: "backend",
    name: { es: "Backend", en: "Backend" },
    items: ["PHP", "Python", "Node.js", "Laravel", "CodeIgniter", "Java", "REST APIs"],
  },
  {
    id: "data",
    name: { es: "Bases de datos", en: "Databases" },
    items: ["MySQL", "PostgreSQL", "SQL", "Firebase"],
  },
  {
    id: "cms",
    name: { es: "CMS & E-commerce", en: "CMS & E-commerce" },
    items: ["WordPress", "WooCommerce", "Shopify", "PrestaShop", "Ecwid", "Moodle"],
  },
  {
    id: "cloud",
    name: { es: "Cloud & DevOps", en: "Cloud & DevOps" },
    items: ["AWS", "Linux (CentOS, Ubuntu)", "WHM/cPanel", "Windows Server", "Hosting Web"],
  },
  {
    id: "other",
    name: { es: "Otros", en: "Other" },
    items: ["SEO", "Ciberseguridad", "ITIL", "COBIT", "CCNA", "Asterisk", "Open Journal Systems"],
  },
];

export const hologramSkills = [
  "AWS & Cloud",
  "PHP & Laravel",
  "Next.js & Angular",
  "E-commerce & APIs",
  "Linux & DevOps",
];
