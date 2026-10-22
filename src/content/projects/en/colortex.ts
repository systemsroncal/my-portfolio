import type { ProjectContent } from "../../types";

export default {
  title: "Website redesign — Colortex Perú S.A.",
  theme: "dark",
  tags: ["wordpress", "javascript", "html", "css", "php"],
  description:
    "Corporate website redesign for Colortex Perú S.A., a textile company with 50+ years in the Peruvian market.<br/><br/>Information architecture, Figma design, WordPress, SEO, analytics, and performance tuning—with a clear improvement in load times.",
  components: [
    {
      type: "text",
      props: {
        title: "Summary",
        text: "Institutional site refresh for fashion, upholstery, sportech, and industrial lines: clearer navigation, new service pages, and a brand-aligned user experience.",
      },
    },
    {
      type: "list",
      props: {
        title: "Scope highlights",
        items: [
          "Section restructure and services navigation",
          "Figma UI design and layout",
          "WordPress implementation and upgrades",
          "On-page SEO, analytics (GA4/GTM), and WPO",
          "Faster delivery with AI agents and Cursor (IDE/CLI), with hands-on technical review",
        ],
      },
    },
    {
      type: "list",
      props: {
        title: "Outcome",
        items: [
          "Faster, easier-to-maintain site",
          "~50% improvement in load performance",
          "Stronger showcase for catalogs, news, and business contact",
        ],
      },
    },
  ],
} as const satisfies ProjectContent;
