import type { ProjectContent } from "../../types";

export default {
  title: "CRM SaaS AWS",
  theme: "dark",
  tags: ["node", "postgresql", "websockets"],
  description:
    "Led the development and deployment of a cloud-native AWS infrastructure (EC2, S3, RDS, Cognito) for a SaaS CRM platform.<br/><br/>Integrated automated voice agents with ChatGPT, ElevenLabs, DeepGram, and Twilio for low-latency conversational processing.",
  components: [
    {
      type: "text",
      props: {
        title: "Overview",
        text: "Microservices architecture designed for scalability, security, and real-time AI-powered customer interactions in production environments.",
      },
    },
    {
      type: "list",
      props: {
        title: "Key deliverables",
        items: [
          "AWS infrastructure: EC2, S3, RDS, Cognito",
          "Voice AI integration with Twilio & DeepGram",
          "Microservices architecture for SaaS CRM",
          "Low-latency automated agent processing",
        ],
      },
    },
  ],
} as const satisfies ProjectContent;
