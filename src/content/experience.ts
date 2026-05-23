import type { Localized } from "./types/localized";

export interface ExperienceEntry {
  id: string;
  role: Localized<string>;
  company: string;
  period: Localized<string>;
  type: Localized<string>;
  highlights: Localized<string[]>;
}

export const experienceEntries: ExperienceEntry[] = [
  {
    id: "ficha-digital",
    role: {
      es: "Coordinador de Sistemas",
      en: "Systems Coordinator",
    },
    company: "FICHA DIGITAL S.A.C",
    period: {
      es: "May 2021 – Sep 2024",
      en: "May 2021 – Sep 2024",
    },
    type: {
      es: "Tiempo completo",
      en: "Full-time",
    },
    highlights: {
      es: [
        "Administración de hosting web con WHM/cPanel y servidores Linux (CentOS, Ubuntu).",
        "Desarrollo web con PHP, Next.js, Python y Angular.",
        "Gestión de tiendas en línea, ERP corporativo y mantenimiento de sitios web.",
        "Optimización SEO, Core Web Vitals e integraciones de marketing (GA4, GTM, Meta Pixel).",
        "Administración de Google Workspace y soporte técnico.",
      ],
      en: [
        "Managed web hosting with WHM/cPanel and Linux servers (CentOS, Ubuntu).",
        "Web development with PHP, Next.js, Python, and Angular.",
        "E-commerce stores, corporate ERP, and website maintenance.",
        "SEO, Core Web Vitals, and marketing integrations (GA4, GTM, Meta Pixel).",
        "Google Workspace administration and technical support.",
      ],
    },
  },
  {
    id: "freelance",
    role: {
      es: "Desarrollador de Software & Cloud",
      en: "Software & Cloud Developer",
    },
    company: "Freelance",
    period: {
      es: "2020 – Actualidad",
      en: "2020 – Present",
    },
    type: {
      es: "Independiente",
      en: "Independent",
    },
    highlights: {
      es: [
        "Arquitectura de microservicios en AWS (EC2, S3, RDS, Cognito) para CRM SaaS con agentes de voz e IA.",
        "E-commerce de alta disponibilidad con pasarelas de pago y procesamiento de pedidos escalable.",
        "APIs personalizadas e interoperabilidad entre sistemas heterogéneos.",
        "Ciberseguridad: desinfección de malware, firewalls y hardening de servidores.",
        "Rediseño de plataformas críticas y optimización de rendimiento y SEO técnico.",
      ],
      en: [
        "AWS microservices architecture (EC2, S3, RDS, Cognito) for SaaS CRM with voice agents and AI.",
        "High-availability e-commerce with payment gateways and scalable order processing.",
        "Custom APIs and interoperability across heterogeneous systems.",
        "Cybersecurity: malware remediation, firewalls, and server hardening.",
        "Critical platform redesigns with performance and technical SEO optimization.",
      ],
    },
  },
];
