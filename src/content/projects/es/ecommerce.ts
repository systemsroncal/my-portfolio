import type { ProjectContent } from "../../types";

export default {
  title: "Plataformas E-commerce",
  theme: "dark",
  tags: ["php", "javascript", "wordpress"],
  description:
    "Construí y mantuve tiendas en línea de alta disponibilidad con procesamiento de pedidos optimizado e integración de pasarelas de pago.<br/><br/>Trabajé con WooCommerce, Shopify, PrestaShop y Ecwid en múltiples proyectos para clientes.",
  components: [
    {
      type: "text",
      props: {
        title: "Resumen",
        text: "Soluciones e-commerce integrales enfocadas en conversión, rendimiento y escalabilidad operativa para clientes empresariales.",
      },
    },
    {
      type: "list",
      props: {
        title: "Entregables clave",
        items: [
          "Integración de pasarelas de pago",
          "Optimización de procesamiento de pedidos",
          "WooCommerce, Shopify y PrestaShop",
          "Mejoras de Core Web Vitals y SEO",
        ],
      },
    },
  ],
} as const satisfies ProjectContent;
