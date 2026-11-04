// Contenido de la landing. Los textos provienen del brief oficial del evento.
// No agregar cargos, empresas, logros ni cifras de los ponentes sin confirmación.

// Fotos de ponentes: se detectan automáticamente al colocar los archivos en
// src/assets/eljuegodelasventas/ponentes/ con el nombre del id (ver LEEME.md).
const photoFiles = import.meta.glob(
  '../../assets/eljuegodelasventas/ponentes/*.{png,webp,jpg,jpeg,avif}',
  { eager: true, query: '?url', import: 'default' },
)

export const PHOTOS = Object.entries(photoFiles).reduce((acc, [path, url]) => {
  const base = path.split('/').pop().replace(/\.[^.]+$/, '').toLowerCase()
  acc[base] = url
  return acc
}, {})

export const SPEAKERS = [
  {
    id: 'victoria-poggioli',
    first: 'Victoria',
    last: 'Poggioli',
    initials: 'VP',
    area: 'Contenido y organización',
    tag: 'CONTENIDO',
    piece: 'pawn',
  },
  {
    id: 'johan-echeverri',
    first: 'Johan',
    last: 'Echeverri',
    initials: 'JE',
    area: 'Anuncios y estrategias de ventas',
    tag: 'ANUNCIOS',
    piece: 'bishop',
  },
  {
    id: 'bryan-dominguez',
    first: 'Bryan',
    last: 'Domínguez',
    initials: 'BD',
    area: 'Landing pages e inteligencia artificial',
    tag: 'LANDING PAGES + IA',
    piece: 'rook',
  },
  {
    id: 'gabriel-angulo',
    first: 'Gabriel',
    last: 'Angulo',
    initials: 'GA',
    area: 'IA aplicada a redes sociales',
    tag: 'IA PARA REDES',
    piece: 'queen',
  },
  {
    id: 'edward-nunez',
    first: 'Edward',
    last: 'Núñez',
    initials: 'EN',
    area: 'Agentes de IA y automatización comercial',
    tag: 'AGENTES DE IA',
    piece: 'king',
  },
]

export const photoOf = (speaker) => PHOTOS[speaker.id] || null

export const PROBLEMS = [
  {
    n: '01',
    title: 'Contenido sin estrategia',
    text: 'Publicar constantemente sin tener claro cómo convertir esa atención en oportunidades comerciales.',
  },
  {
    n: '02',
    title: 'Publicidad sin resultados claros',
    text: 'Invertir en anuncios sin una estrategia estructurada de captación y conversión.',
  },
  {
    n: '03',
    title: 'Procesos manuales',
    text: 'Perder tiempo en tareas repetitivas que podrían simplificarse utilizando tecnología.',
  },
  {
    n: '04',
    title: 'Herramientas desconectadas',
    text: 'Tener acceso a inteligencia artificial, marketing y automatización sin saber cómo integrarlas en un mismo proceso comercial.',
  },
]

export const STAGES = [
  {
    n: '01',
    title: 'Contenido',
    piece: 'pawn',
    text: 'Aprende a organizar tu estrategia y comunicar mensajes que atraigan al cliente adecuado.',
  },
  {
    n: '02',
    title: 'Anuncios',
    piece: 'bishop',
    text: 'Comprende cómo estructurar campañas publicitarias para generar oportunidades comerciales.',
  },
  {
    n: '03',
    title: 'Landing pages',
    piece: 'rook',
    text: 'Aprende a crear páginas orientadas a convertir visitantes en posibles clientes utilizando inteligencia artificial.',
  },
  {
    n: '04',
    title: 'Inteligencia artificial',
    piece: 'queen',
    text: 'Descubre cómo aprovechar herramientas de IA para agilizar la creación y gestión de contenido.',
  },
  {
    n: '05',
    title: 'Automatización',
    piece: 'king',
    text: 'Aprende cómo utilizar agentes y procesos automatizados para facilitar la atención, el seguimiento y la retención de clientes.',
  },
]

export const MODULES = [
  {
    n: '01',
    speaker: 'victoria-poggioli',
    title: 'Organiza tu negocio y crea contenido que atraiga clientes.',
    points: [
      'Organización estratégica del contenido.',
      'Cómo identificar mensajes relevantes para tus clientes.',
      'Planificación de contenido orientado a objetivos comerciales.',
      'Cómo conectar contenido y oportunidades de venta.',
    ],
  },
  {
    n: '02',
    speaker: 'johan-echeverri',
    title: 'Anuncios y contenido para multiplicar tus oportunidades de venta.',
    points: [
      'Fundamentos de publicidad digital.',
      'Estrategias de adquisición de clientes.',
      'Mensajes y creativos publicitarios.',
      'Cómo estructurar campañas enfocadas en resultados.',
    ],
  },
  {
    n: '03',
    speaker: 'bryan-dominguez',
    title: 'Crea una landing page que venda utilizando inteligencia artificial.',
    points: [
      'Estructura de una landing page de ventas.',
      'Creación de páginas con herramientas de IA.',
      'Copywriting y llamados a la acción.',
      'Captación de clientes potenciales.',
      'Elementos fundamentales para mejorar la conversión.',
    ],
  },
  {
    n: '04',
    speaker: 'gabriel-angulo',
    title: 'Construye tu suite de IA para redes sociales con Claude.',
    points: [
      'Aplicaciones de Claude para marketing.',
      'Organización de procesos creativos.',
      'Producción de contenido asistida por IA.',
      'Flujos de trabajo para redes sociales.',
      'Productividad y simplificación de tareas.',
    ],
  },
  {
    n: '05',
    speaker: 'edward-nunez',
    title: 'Escala tus procesos comerciales y retén clientes con agentes de IA.',
    points: [
      'Introducción a los agentes de inteligencia artificial.',
      'Automatización de atención comercial.',
      'Seguimiento de prospectos.',
      'Experiencia y retención de clientes.',
      'Integración de automatizaciones en el negocio.',
    ],
  },
]

export const PILLARS = [
  {
    key: 'aprende',
    title: 'Aprende',
    text: 'Comprende los fundamentos y estrategias explicados por especialistas.',
  },
  {
    key: 'practica',
    title: 'Practica',
    text: 'Participa en ejercicios para explorar las herramientas y aplicar los conceptos a casos reales.',
  },
  {
    key: 'conecta',
    title: 'Conecta',
    text: 'Comparte experiencias, conoce otros empresarios y descubre nuevas perspectivas para tu negocio.',
  },
]

// Recorrido temático (NO es una agenda horaria oficial).
export const JOURNEY = [
  { type: 'step', n: '01', title: 'Bienvenida e introducción', text: 'Arranca el juego: contexto del workshop y visión del sistema comercial.' },
  { type: 'step', n: '02', title: 'Organización y estrategia de contenido', text: 'Ordena tu comunicación y conecta contenido con oportunidades de venta.' },
  { type: 'step', n: '03', title: 'Estrategias de anuncios y adquisición', text: 'Estructura campañas pensadas para captar clientes.' },
  { type: 'break', title: 'Pausa', text: 'Un espacio para descansar y conectar con otros participantes.' },
  { type: 'step', n: '04', title: 'Construcción de landing pages con IA', text: 'Crea páginas orientadas a convertir visitantes en clientes potenciales.' },
  { type: 'step', n: '05', title: 'Productividad y contenido con Claude', text: 'Organiza procesos creativos y flujos de trabajo para redes sociales.' },
  { type: 'break', title: 'Pausa', text: 'Otro espacio de descanso e intercambio presencial.' },
  { type: 'step', n: '06', title: 'Agentes de IA y automatización comercial', text: 'Atención, seguimiento y retención apoyados en automatización.' },
  { type: 'step', n: '07', title: 'Integración de conocimientos y cierre', text: 'Une las cinco herramientas en un mismo sistema para tu negocio.' },
]

export const BENEFITS_70 = [
  'Experiencia de aprendizaje presencial.',
  'Contacto con especialistas y otros participantes.',
  'Actividades enfocadas en la aplicación práctica.',
]

export const INCLUDES = [
  'Acceso presencial al workshop.',
  'Participación en una jornada de 8 horas.',
  'Formación con cinco especialistas.',
  'Sesiones teórico-prácticas.',
  'Espacios para conectar con otros empresarios.',
  'Certificado digital de participación.',
]

export const FAQ = [
  { q: '¿Dónde será el workshop?', a: 'En Torre Movilnet, Caracas, Venezuela.' },
  { q: '¿Cuándo se realizará?', a: 'El sábado 21 de noviembre de 2026.' },
  { q: '¿Cuánto dura el evento?', a: 'La experiencia tiene una duración total prevista de ocho horas, incluyendo las pausas programadas.' },
  { q: '¿Es un taller presencial u online?', a: 'Es una experiencia presencial.' },
  {
    q: '¿Necesito conocimientos previos de inteligencia artificial?',
    a: 'El workshop aborda herramientas y estrategias que pueden resultar útiles a emprendedores con distintos niveles de experiencia. Algunos ejercicios pueden requerir conocimientos digitales básicos.',
  },
  {
    q: '¿Debo llevar mi computadora?',
    // TODO(organizador): confirmar este requisito antes de publicar.
    a: 'Para aprovechar mejor las actividades prácticas se recomienda llevar laptop y cargador.',
  },
  { q: '¿Recibiré certificado?', a: 'Sí, se entregará un certificado digital de participación.' },
  {
    q: '¿Puedo asistir si todavía estoy comenzando mi negocio?',
    a: 'El contenido también está dirigido a emprendedores que buscan comprender herramientas y estrategias para desarrollar sus procesos comerciales.',
  },
  {
    q: '¿Cómo compro mi entrada?',
    a: 'A través del botón de inscripción, que estará conectado al sistema de pago oficial del evento.',
  },
]

