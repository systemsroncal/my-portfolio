import { getLegalPath } from "../../composables/useLegalRoute";
import type { LegalDocument } from "../legal/types";

const legalHref = getLegalPath("legal", "es");

export const privacyEs: LegalDocument = {
  title: "Política de privacidad",
  updated: "Última actualización: 11 de junio de 2026",
  langSwitchLabel: "English version",
  blocks: [
    {
      type: "p",
      html: "Enrique Roncal (en adelante, el «Responsable») informa sobre el tratamiento de los datos personales en este sitio web de portfolio profesional, de conformidad con la Ley N.° 29733, Ley de Protección de Datos Personales del Perú, y su reglamento.",
    },
    {
      type: "h2",
      text: "1. Responsable del tratamiento",
    },
    {
      type: "ul",
      items: [
        "<strong>Responsable:</strong> Enrique Roncal",
        "<strong>Ubicación:</strong> Lima, Perú",
        '<strong>Correo electrónico:</strong> <a href="mailto:systems.roncal@gmail.com">systems.roncal@gmail.com</a>',
        '<strong>WhatsApp:</strong> <a href="https://wa.me/51989867536">+51 989 867 536</a>',
      ],
    },
    {
      type: "h2",
      text: "2. Datos que se recopilan",
    },
    {
      type: "p",
      html: "En este sitio pueden tratarse los siguientes datos:",
    },
    {
      type: "ul",
      items: [
        "<strong>Datos de contacto:</strong> nombre, correo electrónico, número de celular y mensaje, cuando utilizas el formulario de contacto, escribes por correo o contactas por WhatsApp.",
        "<strong>Preferencias del sitio:</strong> idioma seleccionado y preferencia de sonidos, almacenados en el navegador mediante <code>localStorage</code>.",
        "<strong>Datos técnicos:</strong> dirección IP, tipo de navegador, sistema operativo, páginas visitadas y registros del servidor, generados automáticamente al navegar por el sitio o al utilizar sus funciones.",
      ],
    },
    {
      type: "p",
      html: "Este sitio no solicita registro de usuario ni recopila datos sensibles de forma intencionada. No utiliza cookies de publicidad ni perfiles comerciales propios.",
    },
    {
      type: "h2",
      text: "3. Finalidad del tratamiento",
    },
    {
      type: "p",
      html: "Los datos se utilizan para:",
    },
    {
      type: "ul",
      items: [
        "Responder consultas, solicitudes de información o propuestas profesionales.",
        "Gestionar la comunicación iniciada por el usuario.",
        "Recordar preferencias de idioma y sonido para mejorar la experiencia de navegación.",
        "Garantizar la seguridad, estabilidad y correcto funcionamiento del sitio.",
        "Cumplir obligaciones legales aplicables.",
      ],
    },
    {
      type: "h2",
      text: "4. Base de legitimación",
    },
    {
      type: "p",
      html: "El tratamiento se basa en:",
    },
    {
      type: "ul",
      items: [
        "El consentimiento del usuario al enviar datos a través del formulario o medios de contacto.",
        "El interés legítimo del Responsable en atender solicitudes profesionales y mantener el sitio operativo.",
        "El cumplimiento de obligaciones legales, cuando corresponda.",
      ],
    },
    {
      type: "h2",
      text: "5. Conservación de los datos",
    },
    {
      type: "p",
      html: "Los mensajes de contacto se conservarán durante el tiempo necesario para gestionar la comunicación y, en su caso, mientras exista una relación profesional o comercial. Los datos técnicos de servidor se conservarán por el plazo habitual de los proveedores de hosting. Las preferencias guardadas en el navegador permanecen hasta que el usuario las elimine.",
    },
    {
      type: "h2",
      text: "6. Destinatarios y encargados",
    },
    {
      type: "p",
      html: "Los datos pueden ser tratados por proveedores necesarios para el funcionamiento del sitio, tales como:",
    },
    {
      type: "ul",
      items: [
        "<strong>Vercel Inc.</strong>, proveedor de hosting y despliegue.",
        '<strong>Proveedor de correo electrónico (SMTP)</strong>, para el envío de mensajes del formulario de contacto a <a href="mailto:systems.roncal@gmail.com">systems.roncal@gmail.com</a>.',
      ],
    },
    {
      type: "p",
      html: "Estos proveedores pueden encontrarse fuera del Perú. En esos casos, el Responsable procura que existan medidas razonables de protección conforme a la normativa aplicable.",
    },
    {
      type: "p",
      html: "No se venden ni ceden datos personales a terceros con fines comerciales.",
    },
    {
      type: "h2",
      text: "7. Derechos del titular de los datos",
    },
    {
      type: "p",
      html: "De acuerdo con la Ley N.° 29733, puedes ejercer los siguientes derechos:",
    },
    {
      type: "ul",
      items: [
        "Acceso a tus datos personales.",
        "Rectificación de datos inexactos o incompletos.",
        "Cancelación o supresión, cuando proceda.",
        "Oposición al tratamiento, en los casos previstos por ley.",
        "Revocación del consentimiento otorgado.",
      ],
    },
    {
      type: "p",
      html: 'Para ejercer estos derechos, escribe a <a href="mailto:systems.roncal@gmail.com">systems.roncal@gmail.com</a> indicando tu solicitud y un medio de contacto para responder. También puedes presentar un reclamo ante la Autoridad Nacional de Protección de Datos Personales del Perú, si consideras que tus derechos no han sido atendidos.',
    },
    {
      type: "h2",
      text: "8. Seguridad",
    },
    {
      type: "p",
      html: "Se adoptan medidas técnicas y organizativas razonables para proteger los datos personales. No obstante, ninguna transmisión por Internet puede garantizarse como completamente segura.",
    },
    {
      type: "h2",
      text: "9. Menores de edad",
    },
    {
      type: "p",
      html: "Este sitio no está dirigido a menores de 14 años. Si detectas que un menor nos ha facilitado datos personales sin autorización, contacta con nosotros para proceder a su eliminación.",
    },
    {
      type: "h2",
      text: "10. Enlaces a terceros",
    },
    {
      type: "p",
      html: "El sitio puede contener enlaces a redes sociales, repositorios u otros sitios externos. El Responsable no controla las políticas de privacidad de esos sitios y recomienda revisarlas antes de facilitar datos personales.",
    },
    {
      type: "h2",
      text: "11. Cambios en esta política",
    },
    {
      type: "p",
      html: "Esta política puede actualizarse para reflejar cambios legales o técnicos. La fecha de la última actualización figurará al inicio del documento. El uso continuado del sitio tras su publicación implicará la aceptación de los cambios, salvo que la ley exija un consentimiento adicional.",
    },
    {
      type: "h2",
      text: "12. Contacto",
    },
    {
      type: "p",
      html: 'Para cualquier consulta sobre privacidad, escribe a <a href="mailto:systems.roncal@gmail.com">systems.roncal@gmail.com</a>.',
    },
    {
      type: "p",
      html: `Consulta también el <a href="${legalHref}">Aviso legal</a>.`,
    },
  ],
};
