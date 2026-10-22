import type { ProjectContent } from "../../types";

export default {
  title: "Rediseño web — Colortex Perú S.A.",
  theme: "dark",
  tags: ["wordpress", "javascript", "html", "css", "php"],
  description:
    "Rediseño del sitio corporativo de Colortex Perú S.A., empresa textil con más de 50 años en el mercado peruano.<br/><br/>Arquitectura de información, diseño en Figma, WordPress, SEO, analítica y optimización de rendimiento, con una mejora notable en tiempos de carga.",
  components: [
    {
      type: "text",
      props: {
        title: "Resumen",
        text: "Modernización de la web institucional para las líneas de negocio (moda, tapicería, sportech e industrial): navegación más clara, nuevas páginas de servicios y una experiencia alineada a la marca.",
      },
    },
    {
      type: "list",
      props: {
        title: "Qué incluyó",
        items: [
          "Reestructuración de secciones y menú de servicios",
          "Maquetación y diseño UI en Figma",
          "Implementación y actualización en WordPress",
          "SEO on-page, analítica (GA4/GTM) y optimización WPO",
          "Aceleración del delivery con agentes de IA y Cursor (IDE/CLI), con revisión técnica manual",
        ],
      },
    },
    {
      type: "list",
      props: {
        title: "Resultado",
        items: [
          "Sitio más rápido y mantenible",
          "Mejora aproximada del 50% en performance de carga",
          "Mejor presentación de catálogos, noticias y contacto comercial",
        ],
      },
    },
  ],
} as const satisfies ProjectContent;
