import thumbnailStreakon from "../../../assets/thumbnails/streakon.webp";
import thumbnailPokedex from "../../../assets/thumbnails/pokedex.webp";
import thumbnailCubeWar from "../../../assets/thumbnails/cubewar.webp";
import thumbnailQuibbo from "../../../assets/thumbnails/quibbo.webp";
import thumbnailSharkie from "../../../assets/thumbnails/sharkie.webp";

import type { ProjectPreview } from "../../types";

export default [
  {
    title: "CRM SaaS AWS",
    slug: "aws-crm",
    thumbnail: thumbnailStreakon,
    description: "Microservicios e IA de voz en AWS",
  },
  {
    title: "Plataformas E-commerce",
    slug: "ecommerce",
    thumbnail: thumbnailQuibbo,
    description: "Tiendas en línea de alta disponibilidad",
  },
  {
    title: "Sistema Colegio IEPSADA",
    slug: "iepsada",
    thumbnail: thumbnailPokedex,
    description: "Plataforma de gestión escolar",
  },
  {
    title: "Sistema de Matrícula",
    slug: "matricula",
    thumbnail: thumbnailSharkie,
    description: "Registro de estudiantes",
  },
  {
    title: "Larry Ragland Dashboard",
    slug: "larry-ragland",
    thumbnail: thumbnailCubeWar,
    description: "Plugin WordPress personalizado",
  },
] as const satisfies ProjectPreview[];
