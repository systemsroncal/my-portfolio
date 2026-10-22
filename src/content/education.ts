import type { Localized } from "./types/localized";

export type EducationCategory = "degree" | "certification" | "language" | "training";

export interface EducationEntry {
  id: string;
  category: EducationCategory;
  title: Localized<string>;
  institution: string;
  period: Localized<string>;
  detail?: Localized<string>;
}

export const educationEntries: EducationEntry[] = [
  {
    id: "ucv-systems",
    category: "degree",
    title: {
      es: "Ingeniería de Sistemas — Título profesional",
      en: "Systems Engineering — Professional degree",
    },
    institution: "Universidad César Vallejo — Lima",
    period: {
      es: "2016 – 2023",
      en: "2016 – 2023",
    },
    detail: {
      es: "Formación en desarrollo de software, redes, bases de datos y gestión de proyectos TI.",
      en: "Training in software development, networking, databases, and IT project management.",
    },
  },
  {
    id: "english-b2",
    category: "language",
    title: {
      es: "Inglés — Nivel B2 (intermedio alto)",
      en: "English — B2 (upper intermediate)",
    },
    institution: "Autodidacta y práctica profesional",
    period: {
      es: "En curso",
      en: "Ongoing",
    },
    detail: {
      es: "Lectura técnica, documentación y comunicación con equipos internacionales.",
      en: "Technical reading, documentation, and communication with international teams.",
    },
  },
  {
    id: "itil",
    category: "certification",
    title: {
      es: "ITIL® 4 Foundation",
      en: "ITIL® 4 Foundation",
    },
    institution: "Cabana & Asociados SAC — Lima",
    period: {
      es: "2022",
      en: "2022",
    },
    detail: {
      es: "Modalidad online — gestión de servicios TI",
      en: "Online — IT service management",
    },
  },
  {
    id: "ccna",
    category: "certification",
    title: {
      es: "Cisco Networking Academy (CCNA 1, 2 y 3)",
      en: "Cisco Networking Academy (CCNA 1, 2 & 3)",
    },
    institution: "Universidad César Vallejo — Lima",
    period: {
      es: "2019",
      en: "2019",
    },
    detail: {
      es: "Fundamentos de redes, routing y switching",
      en: "Networking fundamentals, routing and switching",
    },
  },
  {
    id: "office",
    category: "certification",
    title: {
      es: "Microsoft Office",
      en: "Microsoft Office",
    },
    institution: "Cabana & Asociados SAC — Lima",
    period: {
      es: "2022",
      en: "2022",
    },
  },
  {
    id: "hardware",
    category: "certification",
    title: {
      es: "Ensamblaje de Computadoras",
      en: "Computer Assembly",
    },
    institution: "Cabana & Asociados SAC — Lima",
    period: {
      es: "2023",
      en: "2023",
    },
  },
  {
    id: "congress-2018",
    category: "training",
    title: {
      es: "Congreso Internacional de Ingeniería de Sistemas",
      en: "International Systems Engineering Congress",
    },
    institution: "Universidad César Vallejo — Lima",
    period: {
      es: "2018",
      en: "2018",
    },
  },
  {
    id: "congress-2017",
    category: "training",
    title: {
      es: "III Congreso Internacional de Ingeniería de Sistemas",
      en: "3rd International Systems Engineering Congress",
    },
    institution: "Universidad César Vallejo — Lima",
    period: {
      es: "2017",
      en: "2017",
    },
  },
  {
    id: "workshop-2016",
    category: "training",
    title: {
      es: "Talleres y capacitaciones (redes, bases de datos, desarrollo web)",
      en: "Workshops & training (networks, databases, web development)",
    },
    institution: "Universidad César Vallejo — Lima",
    period: {
      es: "2016 – 2018",
      en: "2016 – 2018",
    },
    detail: {
      es: "Participación en jornadas académicas y talleres técnicos durante la carrera.",
      en: "Academic events and hands-on technical workshops during undergraduate studies.",
    },
  },
];

export const educationCategoryOrder: EducationCategory[] = [
  "degree",
  "language",
  "certification",
  "training",
];
