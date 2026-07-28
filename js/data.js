/**
 * data.js
 * Fuente única de contenido para el portal de Proyecto de Grado II.
 * Separar el contenido del markup permite que coordinación académica
 * actualice fechas y textos cada semestre sin tocar HTML/CSS/JS.
 */

// Fechas clave del semestre 2026-10 (ruta principal, sin pendiente).
// Se usan para: (1) pintar la línea de tiempo, (2) calcular "estás aquí".
const ROUTE_MILESTONES = [
  {
    id: "etica",
    label: "Comité de Ética",
    date: "2026-02-27",
    dateDisplay: "27 feb",
    detail: "Fecha máxima para enviar la solicitud de aval."
  },
  {
    id: "pendiente",
    label: "Solicitud de pendiente",
    date: "2026-05-08",
    dateDisplay: "08 may",
    detail: "Fecha máxima para solicitar pendiente (si aplica)."
  },
  {
    id: "sustentacion",
    label: "Formato de sustentación",
    date: "2026-06-25",
    dateDisplay: "25 jun",
    detail: "Fecha máxima para entregar el formato firmado."
  },
  {
    id: "documentos",
    label: "Entrega de documentos",
    date: "2026-07-06",
    dateDisplay: "06 jul",
    detail: "Fecha máxima para entregar los 5 documentos finales."
  }
];

// Las cinco secciones principales del portal.
// "keywords" alimenta el buscador de la pantalla de inicio.
const SECTIONS = [
  {
    id: "etica",
    icon: "shield",
    title: "Comité de Ética",
    description: "Cuándo y cómo solicitar el aval antes de recolectar datos.",
    keywords: ["etica", "aval", "platypus", "riesgo", "datos", "comite"]
  },
  {
    id: "pendiente",
    icon: "calendar",
    title: "Pendiente",
    description: "Pendiente normal vs. especial: cuándo aplica cada uno.",
    keywords: ["pendiente", "normal", "especial", "mis solicitudes", "aplazar"]
  },
  {
    id: "sustentacion",
    icon: "mic",
    title: "Sustentación",
    description: "Jurado, modalidad, fecha y reserva de salón.",
    keywords: ["sustentacion", "jurado", "salon", "presencial", "virtual", "asesor"]
  },
  {
    id: "documentos",
    icon: "folder",
    title: "Entrega de documentos",
    description: "Los 5 documentos finales, en un vistazo.",
    keywords: ["documentos", "capstone", "tesis", "formulario", "biblioteca"]
  },
  {
    id: "faq",
    icon: "question",
    title: "Preguntas frecuentes",
    description: "Respuestas rápidas a lo que más se repite.",
    keywords: ["faq", "preguntas", "jurado", "maestria", "seccion", "biblioteca"]
  }
];
