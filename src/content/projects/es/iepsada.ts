import type { ProjectContent } from "../../types";

export default {
  title: "Sistema Colegio IEPSADA",
  theme: "dark",
  tags: ["php", "javascript", "html", "css"],
  source: "https://github.com/systemsroncal/sistema-colegio-iepsada",
  description:
    "Sistema integral de gestión escolar desarrollado para la institución IEPSADA.<br/><br/>Administra registros académicos, roles de usuario y flujos administrativos con backend PHP e interfaz web responsive.",
  components: [
    {
      type: "text",
      props: {
        title: "Resumen",
        text: "Plataforma completa diseñada para optimizar las operaciones escolares — desde la matrícula hasta el seguimiento académico — con arquitectura PHP mantenible.",
      },
    },
    {
      type: "list",
      props: {
        title: "Características principales",
        items: [
          "Gestión de estudiantes y personal",
          "Control de acceso por roles",
          "Seguimiento de registros académicos",
          "Interfaz administrativa responsive",
        ],
      },
    },
  ],
} as const satisfies ProjectContent;
