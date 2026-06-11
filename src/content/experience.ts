import type { Localized } from "./types/localized";

export interface ExperienceArea {
  id: string;
  name: Localized<string>;
  highlights: Localized<string[]>;
}

export const experienceAreas: ExperienceArea[] = [
  {
    id: "frontend",
    name: { es: "Frontend & interfaces web", en: "Frontend & web interfaces" },
    highlights: {
      es: [
        "Interfaces responsivas con HTML, CSS, JavaScript, jQuery, Angular, Next.js y Vue.js.",
        "Maquetación orientada a conversión, accesibilidad y rendimiento en dispositivos móviles.",
        "Integración de componentes interactivos y experiencias visuales para sitios corporativos.",
      ],
      en: [
        "Responsive interfaces with HTML, CSS, JavaScript, jQuery, Angular, Next.js, and Vue.js.",
        "Conversion-focused layouts with accessibility and mobile performance in mind.",
        "Interactive components and visual experiences for corporate websites.",
      ],
    },
  },
  {
    id: "backend",
    name: { es: "Backend & APIs", en: "Backend & APIs" },
    highlights: {
      es: [
        "APIs REST y lógica de negocio con PHP, Python, Node.js, Laravel y CodeIgniter.",
        "Integración entre sistemas heterogéneos, ERPs y flujos de datos entre plataformas.",
        "Automatización de procesos, validaciones y capas de servicio para aplicaciones web.",
      ],
      en: [
        "REST APIs and business logic with PHP, Python, Node.js, Laravel, and CodeIgniter.",
        "Integration across heterogeneous systems, ERPs, and cross-platform data flows.",
        "Process automation, validation layers, and service tiers for web applications.",
      ],
    },
  },
  {
    id: "ecommerce",
    name: { es: "E-commerce & CMS", en: "E-commerce & CMS" },
    highlights: {
      es: [
        "Tiendas y catálogos con WordPress, WooCommerce, Shopify, PrestaShop, Magento y Ecwid.",
        "Pasarelas de pago, gestión de pedidos, inventario y flujos de checkout escalables.",
        "Mantenimiento de plataformas Moodle y CMS para educación y contenido corporativo.",
      ],
      en: [
        "Stores and catalogs with WordPress, WooCommerce, Shopify, PrestaShop, Magento, and Ecwid.",
        "Payment gateways, order management, inventory, and scalable checkout flows.",
        "Moodle and CMS maintenance for education and corporate content platforms.",
      ],
    },
  },
  {
    id: "cloud",
    name: { es: "Cloud, hosting & DevOps", en: "Cloud, hosting & DevOps" },
    highlights: {
      es: [
        "Arquitectura en AWS (EC2, S3, RDS, Cognito) para SaaS, CRM y cargas de alta disponibilidad.",
        "Administración de servidores Linux (CentOS, Ubuntu), WHM/cPanel y Windows Server.",
        "Despliegues, monitoreo, backups, hardening y soporte de infraestructura web.",
      ],
      en: [
        "AWS architecture (EC2, S3, RDS, Cognito) for SaaS, CRM, and high-availability workloads.",
        "Linux server administration (CentOS, Ubuntu), WHM/cPanel, and Windows Server.",
        "Deployments, monitoring, backups, hardening, and web infrastructure support.",
      ],
    },
  },
  {
    id: "seo",
    name: { es: "SEO & marketing técnico", en: "SEO & technical marketing" },
    highlights: {
      es: [
        "Optimización SEO on-page, Core Web Vitals y rendimiento de carga.",
        "Integración de GA4, Google Tag Manager, Meta Pixel y seguimiento de conversiones.",
        "Rediseño de plataformas críticas con foco en visibilidad y métricas de negocio.",
      ],
      en: [
        "On-page SEO, Core Web Vitals, and load performance optimization.",
        "GA4, Google Tag Manager, Meta Pixel, and conversion tracking integrations.",
        "Critical platform redesigns focused on visibility and business metrics.",
      ],
    },
  },
  {
    id: "security",
    name: { es: "Ciberseguridad & soporte", en: "Cybersecurity & support" },
    highlights: {
      es: [
        "Remediación de malware, configuración de firewalls y endurecimiento de servidores.",
        "Administración de Google Workspace y soporte técnico a usuarios y equipos.",
        "Microservicios con agentes de voz e IA para interacción con clientes en producción.",
      ],
      en: [
        "Malware remediation, firewall configuration, and server hardening.",
        "Google Workspace administration and technical support for users and teams.",
        "Microservices with voice agents and AI for production customer interactions.",
      ],
    },
  },
];
