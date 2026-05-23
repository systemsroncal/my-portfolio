import type { ProjectContent } from "../../types";

export default {
  title: "CRM SaaS AWS",
  theme: "dark",
  tags: ["node", "postgresql", "websockets"],
  description:
    "Lideré el desarrollo y despliegue de infraestructura nativa en AWS (EC2, S3, RDS, Cognito) para una plataforma CRM SaaS.<br/><br/>Integré agentes de voz automatizados con ChatGPT, ElevenLabs, DeepGram y Twilio para procesamiento conversacional de baja latencia.",
  components: [
    {
      type: "text",
      props: {
        title: "Resumen",
        text: "Arquitectura de microservicios diseñada para escalabilidad, seguridad e interacciones con IA en tiempo real en entornos de producción.",
      },
    },
    {
      type: "list",
      props: {
        title: "Entregables clave",
        items: [
          "Infraestructura AWS: EC2, S3, RDS, Cognito",
          "Integración de IA de voz con Twilio y DeepGram",
          "Arquitectura de microservicios para CRM SaaS",
          "Procesamiento de agentes automatizados de baja latencia",
        ],
      },
    },
  ],
} as const satisfies ProjectContent;
