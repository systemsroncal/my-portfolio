import type { ProjectContent } from "../../types";

export default {
  title: "Plataformas E-commerce",
  theme: "dark",
  tags: ["php", "javascript", "wordpress"],
  description:
    "Built and maintained high-availability online stores with optimized order processing and payment gateway integrations.<br/><br/>Worked with WooCommerce, Shopify, PrestaShop, and Ecwid across multiple client projects.",
  components: [
    {
      type: "text",
      props: {
        title: "Overview",
        text: "End-to-end e-commerce solutions focused on conversion, performance, and operational scalability for business clients.",
      },
    },
    {
      type: "list",
      props: {
        title: "Key deliverables",
        items: [
          "Payment gateway integrations",
          "Order processing optimization",
          "WooCommerce, Shopify & PrestaShop",
          "Core Web Vitals & SEO improvements",
        ],
      },
    },
  ],
} as const satisfies ProjectContent;
