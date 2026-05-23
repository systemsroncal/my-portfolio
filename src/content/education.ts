import type { Localized } from "./types/localized";

export interface EducationEntry {
  id: string;
  title: Localized<string>;
  institution: string;
  period: Localized<string>;
  detail?: Localized<string>;
}

export const educationEntries: EducationEntry[] = [
  {
    id: "ucv-systems",
    title: {
      es: "Ingeniería de Sistemas",
      en: "Systems Engineering",
    },
    institution: "Universidad César Vallejo — Lima",
    period: {
      es: "2016 – 2022",
      en: "2016 – 2022",
    },
  },
  {
    id: "ccna",
    title: {
      es: "Cisco Networking Academy (CCNA 1, 2 y 3)",
      en: "Cisco Networking Academy (CCNA 1, 2 & 3)",
    },
    institution: "Universidad César Vallejo — Lima",
    period: {
      es: "2019",
      en: "2019",
    },
  },
  {
    id: "itil",
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
      es: "Modalidad online",
      en: "Online",
    },
  },
  {
    id: "office",
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
];
