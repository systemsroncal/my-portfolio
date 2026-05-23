import type { ProjectContent } from "../../types";

export default {
  title: "Larry Ragland Dashboard",
  theme: "dark",
  tags: ["php", "wordpress", "javascript"],
  source: "https://github.com/systemsroncal/larry-ragland-dashboard",
  description:
    "Plugin personalizado de WordPress que proporciona un dashboard administrativo para el sitio web de Larry Ragland.<br/><br/>Extiende WordPress con widgets personalizados, visualización de datos y herramientas de gestión de contenido.",
  components: [
    {
      type: "text",
      props: {
        title: "Resumen",
        text: "Plugin de WordPress que añade un panel administrativo personalizado con herramientas especializadas para gestionar contenido del sitio y monitorear métricas clave.",
      },
    },
    {
      type: "list",
      props: {
        title: "Características principales",
        items: [
          "Panel admin personalizado de WordPress",
          "Widgets de dashboard",
          "Extensiones de gestión de contenido",
          "Buenas prácticas de arquitectura de plugins",
        ],
      },
    },
  ],
} as const satisfies ProjectContent;
