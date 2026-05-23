import type { ProjectContent } from "../../types";

export default {
  title: "Enrollment System",
  theme: "light",
  tags: ["php", "javascript", "html", "css"],
  source: "https://github.com/systemsroncal/sistema-matricula",
  description:
    "Student enrollment and registration system for educational institutions.<br/><br/>Automates the matriculation process with form validation, data persistence, and an intuitive workflow for administrators.",
  components: [
    {
      type: "text",
      props: {
        title: "Overview",
        text: "Digital enrollment platform that replaces manual registration processes, reducing errors and improving efficiency for school administrators.",
      },
    },
    {
      type: "list",
      props: {
        title: "Key features",
        items: [
          "Online enrollment forms",
          "Student data validation",
          "Administrative dashboard",
          "Export and reporting tools",
        ],
      },
    },
  ],
} as const satisfies ProjectContent;
