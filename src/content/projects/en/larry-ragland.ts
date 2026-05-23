import type { ProjectContent } from "../../types";

export default {
  title: "Larry Ragland Dashboard",
  theme: "dark",
  tags: ["php", "wordpress", "javascript"],
  source: "https://github.com/systemsroncal/larry-ragland-dashboard",
  description:
    "Custom WordPress plugin providing an admin dashboard for the Larry Ragland website.<br/><br/>Extends WordPress with tailored widgets, data visualization, and content management tools.",
  components: [
    {
      type: "text",
      props: {
        title: "Overview",
        text: "A WordPress plugin that adds a custom admin dashboard with specialized tools for managing site content and monitoring key metrics.",
      },
    },
    {
      type: "list",
      props: {
        title: "Key features",
        items: [
          "Custom WordPress admin panel",
          "Dashboard widgets",
          "Content management extensions",
          "Plugin architecture best practices",
        ],
      },
    },
  ],
} as const satisfies ProjectContent;
