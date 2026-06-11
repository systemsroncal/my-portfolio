import { projectCovers } from "./covers";

import type { ProjectPreview } from "../../types";

export default [
  {
    title: "CRM SaaS AWS",
    slug: "aws-crm",
    thumbnail: projectCovers["aws-crm"],
    description: "Microservicios e IA de voz en AWS",
  },
  {
    title: "Plataformas E-commerce",
    slug: "ecommerce",
    thumbnail: projectCovers.ecommerce,
    description: "Tiendas en línea de alta disponibilidad",
  },
  {
    title: "Sistema Colegio IEPSADA",
    slug: "iepsada",
    thumbnail: projectCovers.iepsada,
    description: "Plataforma de gestión escolar",
  },
  {
    title: "Sistema de Matrícula",
    slug: "matricula",
    thumbnail: projectCovers.matricula,
    description: "Registro de estudiantes",
  },
  {
    title: "Larry R. Dashboard",
    slug: "larry-ragland",
    thumbnail: projectCovers["larry-ragland"],
    description: "Plugin WordPress personalizado",
  },
] as const satisfies ProjectPreview[];
