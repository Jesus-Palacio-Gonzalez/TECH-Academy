export interface LearningPath {
  id: 'web' | 'datos-ia' | 'movil' | 'ciberseguridad'
  name: string
  pitch: string
  duration: string
  steps: { title: string; detail: string }[]
}

export const PATHS: LearningPath[] = [
  {
    id: 'web',
    name: 'Desarrollo web',
    pitch: 'Construye sitios y aplicaciones que cualquiera puede abrir desde un enlace.',
    duration: 'Unas 10 semanas con 4 horas por semana',
    steps: [
      { title: 'HTML y CSS', detail: 'Estructura y estilo de tu primera página.' },
      { title: 'JavaScript desde cero', detail: 'Variables, funciones y cómo reacciona una página.' },
      { title: 'React', detail: 'Componentes para interfaces que crecen sin enredarse.' },
      { title: 'Backend y bases de datos', detail: 'Guarda datos y crea cuentas de usuario.' },
      { title: 'Proyecto publicado', detail: 'Sube tu aplicación y compártela con un enlace.' },
    ],
  },
  {
    id: 'datos-ia',
    name: 'Datos e IA',
    pitch: 'Aprende a preguntarle cosas a los datos y a entrenar modelos sencillos.',
    duration: 'Unas 12 semanas con 4 horas por semana',
    steps: [
      { title: 'Python desde cero', detail: 'Sintaxis, listas y funciones con ejercicios cortos.' },
      { title: 'Análisis con pandas', detail: 'Limpia y resume tablas reales.' },
      { title: 'Visualización', detail: 'Gráficos que se entienden de un vistazo.' },
      { title: 'Aprendizaje automático', detail: 'Tu primer modelo que predice algo útil.' },
      { title: 'Proyecto con datos reales', detail: 'De la pregunta a las conclusiones.' },
    ],
  },
  {
    id: 'movil',
    name: 'Desarrollo móvil',
    pitch: 'Crea apps para Android con las mismas bases que usas en la web.',
    duration: 'Unas 10 semanas con 4 horas por semana',
    steps: [
      { title: 'Fundamentos de programación', detail: 'Lógica, condicionales y ciclos.' },
      { title: 'JavaScript y TypeScript', detail: 'El lenguaje de tu app, con tipos para evitar errores.' },
      { title: 'React Native con Expo', detail: 'Pantallas, navegación y estado.' },
      { title: 'Publicar tu app', detail: 'Prepara y sube tu app a la tienda.' },
    ],
  },
  {
    id: 'ciberseguridad',
    name: 'Ciberseguridad',
    pitch: 'Entiende cómo se ataca un sistema para aprender a protegerlo.',
    duration: 'Unas 12 semanas con 4 horas por semana',
    steps: [
      { title: 'Redes y sistemas', detail: 'Cómo viaja la información entre equipos.' },
      { title: 'Linux en la terminal', detail: 'Comandos que usarás todos los días.' },
      { title: 'Seguridad web', detail: 'Las fallas más comunes y cómo corregirlas.' },
      { title: 'Prácticas de ataque y defensa', detail: 'Laboratorios guiados en un entorno seguro.' },
      { title: 'Respuesta a incidentes', detail: 'Qué hacer cuando algo ya pasó.' },
    ],
  },
]

export interface Course {
  title: string
  summary: string
  level: 'Principiante' | 'Intermedio'
  lessons: number
  hours: number
  icon: 'globe' | 'braces' | 'terminal' | 'git' | 'database' | 'shield'
  featured?: boolean
}

export const COURSES: Course[] = [
  {
    title: 'Tu primera página web',
    summary:
      'Empiezas con una pantalla en blanco y terminas con una página publicada. Aprendes HTML y CSS escribiendo, no solo leyendo.',
    level: 'Principiante',
    lessons: 18,
    hours: 5,
    icon: 'globe',
    featured: true,
  },
  {
    title: 'JavaScript desde cero',
    summary: 'Variables, funciones y eventos con ejercicios que se corrigen solos.',
    level: 'Principiante',
    lessons: 24,
    hours: 8,
    icon: 'braces',
  },
  {
    title: 'Python para empezar',
    summary: 'El lenguaje más amable para dar tus primeros pasos en datos y automatización.',
    level: 'Principiante',
    lessons: 22,
    hours: 7,
    icon: 'terminal',
  },
  {
    title: 'Git y GitHub sin miedo',
    summary: 'Guarda versiones de tu código y colabora sin pisar el trabajo de nadie.',
    level: 'Principiante',
    lessons: 12,
    hours: 3,
    icon: 'git',
  },
  {
    title: 'Bases de datos con SQL',
    summary: 'Consulta, filtra y une tablas para responder preguntas concretas.',
    level: 'Intermedio',
    lessons: 20,
    hours: 6,
    icon: 'database',
  },
  {
    title: 'Introducción a la ciberseguridad',
    summary: 'Los conceptos clave y tus primeros laboratorios de práctica.',
    level: 'Principiante',
    lessons: 16,
    hours: 5,
    icon: 'shield',
  },
]

// Textos de ejemplo: reemplázalos por testimonios reales antes de publicar.
export const TESTIMONIALS = [
  {
    quote:
      'Antes saltaba de un tutorial a otro sin saber qué seguía. Con una ruta clara por fin sé qué estudiar cada semana.',
    name: 'Valentina R.',
    context: 'Estudiante de ingeniería, Barranquilla',
    large: true,
  },
  {
    quote: 'Los ejercicios se corrigen al momento. Fallar y volver a intentar es parte de aprender.',
    name: 'Andrés M.',
    context: 'Cambió de carrera, Medellín',
  },
  {
    quote: 'Empecé sin saber qué era una variable y hoy tengo mi primera página en línea.',
    name: 'Laura P.',
    context: 'Aprende por su cuenta, Santa Marta',
  },
]

export const FAQS = [
  {
    q: '¿Necesito saber programar para empezar?',
    a: 'No. Las rutas para principiantes parten de cero y explican cada concepto con ejemplos cortos. Si ya tienes experiencia, puedes entrar por el nivel que te corresponda.',
  },
  {
    q: '¿Cuánto cuesta?',
    a: 'Hoy todo el contenido es gratis. Crear tu cuenta no pide tarjeta de crédito.',
  },
  {
    q: '¿Cuánto tiempo necesito por semana?',
    a: 'Con cuatro horas por semana puedes avanzar de forma constante. Tú marcas el ritmo y puedes retomar donde lo dejaste.',
  },
  {
    q: '¿Qué necesito para empezar?',
    a: 'Un computador con conexión a internet y un navegador actualizado. Las lecciones de lectura también se pueden seguir desde el celular.',
  },
  {
    q: '¿Entregan certificado?',
    a: 'Todavía no. Los certificados son parte del plan Pro que estamos preparando.',
  },
  {
    q: '¿Puedo cambiar de ruta más adelante?',
    a: 'Sí. Tu progreso se guarda por curso, así que puedes cambiar de ruta sin perder lo que ya completaste.',
  },
  {
    q: '¿Puedo entrar con Google o GitHub?',
    a: 'Sí. Puedes crear tu cuenta con correo y contraseña, con Google o con GitHub.',
  },
]
