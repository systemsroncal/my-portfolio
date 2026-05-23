import type { ProjectContent } from "../../types";

export default {
  title: "IEPSADA School System",
  theme: "dark",
  tags: ["php", "javascript", "html", "css"],
  source: "https://github.com/systemsroncal/sistema-colegio-iepsada",
  description:
    "Comprehensive school management system developed for IEPSADA institution.<br/><br/>Handles academic records, user roles, and administrative workflows with a PHP backend and responsive web interface.",
  components: [
    {
      type: "text",
      props: {
        title: "Overview",
        text: "A full-featured platform designed to streamline school operations — from student enrollment to academic tracking — built with maintainable PHP architecture.",
      },
    },
    {
      type: "list",
      props: {
        title: "Key features",
        items: [
          "Student and staff management",
          "Role-based access control",
          "Academic record tracking",
          "Responsive admin interface",
        ],
      },
    },
  ],
} as const satisfies ProjectContent;
