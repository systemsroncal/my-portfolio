import { getLegalPath } from "../../composables/useLegalRoute";
import type { LegalDocument } from "./types";

const privacyHref = getLegalPath("privacy", "es");

export const legalEs: LegalDocument = {
  title: "Aviso legal",
  updated: "Última actualización: 11 de junio de 2026",
  langSwitchLabel: "English version",
  blocks: [
    {
      type: "h2",
      text: "1. Titular del sitio",
    },
    {
      type: "p",
      html: "En cumplimiento de la normativa aplicable en la República del Perú, se informa que el titular de este sitio web es:",
    },
    {
      type: "ul",
      items: [
        "<strong>Titular:</strong> Enrique Roncal",
        "<strong>Actividad:</strong> Portfolio profesional y presentación de servicios de ingeniería de sistemas y desarrollo web",
        "<strong>Ubicación:</strong> Lima, Perú",
        '<strong>Correo electrónico:</strong> <a href="mailto:systems.roncal@gmail.com">systems.roncal@gmail.com</a>',
        '<strong>WhatsApp:</strong> <a href="https://wa.me/51989867536">+51 989 867 536</a>',
      ],
    },
    {
      type: "h2",
      text: "2. Objeto del sitio",
    },
    {
      type: "p",
      html: "Este sitio web tiene carácter informativo y profesional. Su finalidad es mostrar la trayectoria, habilidades y proyectos de Enrique Roncal, así como facilitar el contacto para consultas laborales o comerciales relacionadas con desarrollo web, cloud, e-commerce y sistemas de gestión.",
    },
    {
      type: "h2",
      text: "3. Condiciones de uso",
    },
    {
      type: "p",
      html: "Al acceder y utilizar este sitio, el usuario acepta las siguientes condiciones:",
    },
    {
      type: "ul",
      items: [
        "Utilizar el sitio de forma lícita y respetuosa.",
        "No intentar dañar, interrumpir o acceder sin autorización a sus sistemas o contenidos.",
        "No reproducir, distribuir o explotar comercialmente los contenidos sin autorización previa del titular.",
        "Proporcionar información veraz al utilizar los medios de contacto disponibles (formulario, correo o WhatsApp).",
      ],
    },
    {
      type: "p",
      html: "El titular se reserva el derecho de modificar, suspender o interrumpir el sitio, total o parcialmente, sin necesidad de previo aviso.",
    },
    {
      type: "h2",
      text: "4. Propiedad intelectual",
    },
    {
      type: "p",
      html: "Los textos, diseño, código, imágenes, animaciones, logotipos y demás contenidos originales de este sitio son propiedad de Enrique Roncal o se utilizan con la licencia correspondiente. Queda prohibida su reproducción, distribución o transformación sin autorización expresa, salvo en los casos permitidos por la ley.",
    },
    {
      type: "h2",
      text: "5. Enlaces externos",
    },
    {
      type: "p",
      html: "Este sitio puede incluir enlaces a sitios de terceros (redes sociales, repositorios, proyectos u otros recursos). Enrique Roncal no se responsabiliza del contenido, políticas o prácticas de dichos sitios externos. El acceso a ellos es responsabilidad del usuario.",
    },
    {
      type: "h2",
      text: "6. Limitación de responsabilidad",
    },
    {
      type: "p",
      html: "El titular trabaja para mantener la información del sitio actualizada y accesible, pero no garantiza la ausencia de errores, interrupciones o inexactitudes. El uso del sitio se realiza bajo responsabilidad del usuario.",
    },
    {
      type: "p",
      html: "La información publicada tiene fines profesionales y no constituye asesoría legal, fiscal ni contractual vinculante, salvo que se acuerde expresamente por escrito.",
    },
    {
      type: "h2",
      text: "7. Privacidad",
    },
    {
      type: "p",
      html: `El tratamiento de datos personales se describe en la <a href="${privacyHref}">Política de privacidad</a>.`,
    },
    {
      type: "h2",
      text: "8. Legislación aplicable",
    },
    {
      type: "p",
      html: "Las relaciones derivadas del uso de este sitio se regirán por la legislación de la República del Perú. Para cualquier controversia, las partes se someten a los tribunales competentes de Lima, Perú, salvo norma imperativa en contrario.",
    },
    {
      type: "p",
      html: "Este sitio está construido con Vue 3, TypeScript y Vite en el frontend. La experiencia visual incorpora Three.js para la escena 3D del hero, GSAP y Lenis para animaciones y desplazamiento suave, Sass para estilos, y Howler para el sistema de audio. El formulario de contacto se procesa mediante una API serverless con Node.js y Nodemailer, y el despliegue se realiza en Vercel. El contenido, textos, integraciones y personalizaciones posteriores han sido desarrollados y adaptados por Enrique Roncal para este portfolio profesional.",
    },
    {
      type: "p",
      html: "Partes de la interfaz del sitio derivan de portfolio-2025 (David Heckhoff), conforme a la licencia del proyecto.",
    },
  ],
};
