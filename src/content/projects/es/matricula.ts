import type { ProjectContent } from "../../types";

export default {
  title: "Sistema de Matrícula",
  theme: "light",
  tags: ["php", "javascript", "html", "css"],
  source: "https://github.com/systemsroncal/sistema-matricula",
  description:
    "Sistema de matrícula y registro de estudiantes para instituciones educativas.<br/><br/>Automatiza el proceso de inscripción con validación de formularios, persistencia de datos y flujo intuitivo para administradores.",
  components: [
    {
      type: "text",
      props: {
        title: "Resumen",
        text: "Plataforma digital de matrícula que reemplaza procesos manuales de registro, reduciendo errores y mejorando la eficiencia para administradores escolares.",
      },
    },
    {
      type: "list",
      props: {
        title: "Características principales",
        items: [
          "Formularios de matrícula en línea",
          "Validación de datos de estudiantes",
          "Panel administrativo",
          "Herramientas de exportación e informes",
        ],
      },
    },
  ],
} as const satisfies ProjectContent;
