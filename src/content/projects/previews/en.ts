import { projectCovers } from "./covers";

import type { ProjectPreview } from "../../types";

export default [
  {
    title: "CRM SaaS AWS",
    slug: "aws-crm",
    thumbnail: projectCovers["aws-crm"],
    description: "Microservices & AI voice agents on AWS",
  },
  {
    title: "E-commerce Platforms",
    slug: "ecommerce",
    thumbnail: projectCovers.ecommerce,
    description: "High-availability online stores",
  },
  {
    title: "IEPSADA School System",
    slug: "iepsada",
    thumbnail: projectCovers.iepsada,
    description: "School management platform",
  },
  {
    title: "Enrollment System",
    slug: "matricula",
    thumbnail: projectCovers.matricula,
    description: "Student registration system",
  },
  {
    title: "Larry R. Dashboard",
    slug: "larry-ragland",
    thumbnail: projectCovers["larry-ragland"],
    description: "WordPress dashboard plugin",
  },
] as const satisfies ProjectPreview[];
