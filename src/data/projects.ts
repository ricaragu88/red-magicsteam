export interface ReplicabilityFactor {
  difficulty: 'Baja' | 'Media' | 'Media-Alta';
  estimatedBudget: string;
  targetStages: string[];
  duration: string;
  externalRequirements: string[];
  classroomPrep: string[];
  successKeys: string[];
}

export interface ProjectDownload {
  title: string;
  type: 'PDF' | 'Guía' | 'Rúbrica' | 'Plantilla' | 'Código' | 'ZIP';
  size: string;
  url?: string;
}

export interface ProjectItem {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  categoryTheme: {
    bg: string;
    text: string;
    border: string;
  };
  award: string;
  author: {
    name: string;
    role: string;
    school: string;
    location: string;
    avatar: string;
    teacherPrizeEdition?: string;
  };
  image: string;
  videoUrl?: string;
  replicabilityScore: number;
  replicationsCount: number;
  studentsImpacted: number;
  summary: string;
  pedagogicalObjective: string;
  replicability: ReplicabilityFactor;
  stepByStep: {
    phase: string;
    title: string;
    description: string;
    duration: string;
  }[];
  impactResults: string[];
  downloads: ProjectDownload[];
  tags: string[];
}

export const REAL_PROJECTS_DATA: ProjectItem[] = [
  {
    id: "mas-vida-menos-redes",
    title: "Más Vida, Menos Redes",
    subtitle: "Reto pionero de desconexión digital voluntaria, salud mental y pedagogía del tiempo",
    category: "Bienestar Digital & Convivencia",
    categoryTheme: {
      bg: "bg-rose-50 dark:bg-rose-950/70",
      text: "text-rose-900 dark:text-rose-200",
      border: "border-rose-200 dark:border-rose-800"
    },
    award: "Finalista Top 3 Nacional Premios Mentes AMI 2026 (Atresmedia / Mutua)",
    author: {
      name: "Ricardo Aguado",
      role: "Docente de Tecnología y Coordinador de Innovación",
      school: "Colegio Juan de Lanuza",
      location: "Zaragoza, Aragón",
      avatar: "/images/docenteRicardo-aguado-1.jpg",
      teacherPrizeEdition: "National Teacher Prize 2026"
    },
    image: "/images/masvidamenosredes.jpg",
    videoUrl: "https://www.youtube.com/watch?v=pd3_mC_vYn4",
    replicabilityScore: 88,
    replicationsCount: 8,
    studentsImpacted: 840,
    summary: "Durante una semana completa, el alumnado sustituye voluntariamente sus smartphones por terminales básicos de teclas (cedidos por una operadora local de telecomunicaciones), prescindiendo totalmente de redes sociales, mensajería instantánea y notificaciones invasivas. Mediante Aprendizaje-Servicio (ApS), los alumnos mayores mentorizan a los de últimos cursos de primaria y a sus familias para prevenir la entrega prematura del primer smartphone.",
    pedagogicalObjective: "Recuperar la soberanía del tiempo y la atención, mitigar la ansiedad digital en adolescentes y generar un pacto comunitario centro-familias basado en la evidencia empírica.",
    replicability: {
      difficulty: "Media",
      estimatedBudget: "0 € (con cesión de terminales básicos o préstamo familiar)",
      targetStages: ["5º-6º Primaria (Mentorizados)", "1º-4º ESO (Reto central)", "Bachillerato"],
      duration: "3 semanas de preparación + 1 semana intensiva de reto",
      externalRequirements: [
        "Contacto y acuerdo con operadora local de telecomunicaciones (ej. EMBOU o similar) o campaña de recogida de terminales de teclas antiguos de las familias.",
        "Complicidad y firma voluntaria del pacto de acompañamiento por parte de las familias en el hogar.",
        "Coordinación con el ayuntamiento o servicios de salud comunitaria/adicciones (opcional pero muy enriquecedor)."
      ],
      classroomPrep: [
        "2 semanas de debates y análisis de métricas de 'tiempo de pantalla' en tutorías.",
        "Talleres de sensibilización impartidos por los alumnos mayores a los de primaria.",
        "Diseño de diarios de abordo y registros de emociones para la semana sin smartphone.",
        "Gestión de duplicados de tarjetas SIM o adaptación a formato estándar para los móviles de teclas."
      ],
      successKeys: [
        "Carácter 100% voluntario: nunca plantearlo como un castigo, sino como un experimento y desafío personal.",
        "Involucrar activamente a las familias: que los padres también reduzcan su consumo de pantallas en casa durante esa semana.",
        "Dinamizar los recreos con alternativas atractivas de ocio no digital (juegos de mesa gigantes, torneos deportivos, música, lectura)."
      ]
    },
    stepByStep: [
      {
        phase: "Fase 1",
        title: "Sensibilización y Pacto de Aula",
        description: "Auditoría de pantalla en tutorías. Debate sobre dopamina, FOMO y calidad del descanso. Presentación voluntaria del reto.",
        duration: "Semanas 1 y 2"
      },
      {
        phase: "Fase 2",
        title: "Alianza Logística y Acuerdo de Familias",
        description: "Asamblea de familias. Firma del pacto de acompañamiento. Adquisición o cesión de terminales básicos de teclas.",
        duration: "Semana 3"
      },
      {
        phase: "Fase 3",
        title: "Semana del Reto (Desconexión Real)",
        description: "Entrega de smartphones bajo custodia y activación de teléfonos de teclas. Diario de emociones, recreos activos y mentoría ApS a primaria.",
        duration: "Semana 4 (7 días)"
      },
      {
        phase: "Fase 4",
        title: "Evaluación de Impacto y Conclusiones",
        description: "Recopilación de encuestas de bienestar, análisis estadístico con el alumnado, asamblea comunitaria y difusión en medios locales.",
        duration: "Semana posterior"
      }
    ],
    impactResults: [
      "92 % de participación voluntaria en el centro y 83 % de éxito en la finalización íntegra del reto.",
      "70 % de mejora medible en calidad del sueño, capacidad de concentración y reducción de ansiedad.",
      "Extensión del programa a centros educativos a través del CMAPA del Ayuntamiento de Zaragoza.",
      "Publicación científica en la revista ENLACE (Asociación Aragonesa de Psicopedagogía, sep. 2026)."
    ],
    downloads: [
      { title: "Artículo Científico Revista ENLACE AAP (PDF Oficial)", type: "PDF", size: "366 KB", url: "/recursos/enlace-aap-sep2026.pdf" },
      { title: "Plantilla de Pacto y Consentimiento para Familias", type: "Plantilla", size: "180 KB" },
      { title: "Diario de Abordo y Registro de Emociones para Alumnado", type: "Rúbrica", size: "420 KB" },
      { title: "Dossier de Presentación para Operadoras Locales / Patrocinadores", type: "Plantilla", size: "650 KB" }
    ],
    tags: ["Bienestar Digital", "Salud Mental", "ApS", "Familias", "Comunidad", "Zaragoza"]
  },
  {
    id: "cuentos-en-el-aire",
    title: "Cuentos en el Aire",
    subtitle: "Walkie-talkies digitales y relatos interactivos para acompañar a niños hospitalizados",
    category: "Inclusión Social & ApS Hospitalario",
    categoryTheme: {
      bg: "bg-emerald-50 dark:bg-emerald-950/70",
      text: "text-emerald-900 dark:text-emerald-200",
      border: "border-emerald-200 dark:border-emerald-850"
    },
    award: "Iniciativa ApS Destacada con Cobertura Sanitaria y en Medios",
    author: {
      name: "Ricardo Aguado",
      role: "Docente de Tecnología y Coordinador STEAM",
      school: "Colegio Juan de Lanuza",
      location: "Zaragoza, Aragón",
      avatar: "/images/docenteRicardo-aguado-1.jpg",
      teacherPrizeEdition: "National Teacher Prize 2026"
    },
    image: "/images/WhatsApp-Image-2026-04-05-at-09.25.41.jpeg",
    videoUrl: "https://www.youtube.com/watch?v=_f9OhferiS8",
    replicabilityScore: 92,
    replicationsCount: 5,
    studentsImpacted: 410,
    summary: "Los estudiantes programan transmisores de audio digital ('walkie-talkies' educativos con microcontroladores ESP32) y escriben relatos dramatizados e interactivos. A través de ellos, emiten en directo para pacientes infantiles ingresados en el Hospital Infantil Miguel Servet de Zaragoza, transformando las habitaciones de hospital en espacios de fantasía y acompañamiento cálido.",
    pedagogicalObjective: "Vincular el aprendizaje de la expresión oral, la escritura creativa y la programación física con el alivio emocional de niños en situación hospitalaria prolongada.",
    replicability: {
      difficulty: "Baja",
      estimatedBudget: "50 € - 120 € (módulos ESP32 o walkies educativos abiertos)",
      targetStages: ["3º a 6º Primaria", "1º a 3º ESO"],
      duration: "4 a 6 semanas (1 sesión semanal interdisciplinar)",
      externalRequirements: [
        "Contacto previo con el aula hospitalaria o equipo de atención psicopedagógica del hospital pediátrico de referencia.",
        "Protocolo de confidencialidad y autorización de protección de datos de los menores ingresados.",
        "Espacio de emisión tranquilo en el centro (aula de radio o rincón insonorizado básico)."
      ],
      classroomPrep: [
        "Taller de redacción de cuentos interactivos con bifurcaciones de decisión ('elige tu propia aventura').",
        "Ensayos de locución, modulación de voz y efectos sonoros artesanales.",
        "Configuración básica de transmisión segura de audio vía radiofrecuencia o streaming privado."
      ],
      successKeys: [
        "Diseñar historias donde el niño hospitalizado pueda tomar decisiones en la trama por el canal de respuesta.",
        "Coordinar con el personal de enfermería y aula hospitalaria los horarios de medicación y descanso.",
        "Trabajar en el aula ordinaria la empatía y la madurez emocional frente a la enfermedad."
      ]
    },
    stepByStep: [
      {
        phase: "Fase 1",
        title: "Alianza con el Aula Hospitalaria",
        description: "Reunión con los maestros del hospital pediátrico para acordar edades de los pacientes, horarios y protocolos de conexión.",
        duration: "Semana 1"
      },
      {
        phase: "Fase 2",
        title: "Guiones y Efectos Sonoros (Lengua)",
        description: "En clase de Lengua: creación de cuentos participativos, selección musical libre de derechos y diseño de efectos sonoros.",
        duration: "Semanas 2 y 3"
      },
      {
        phase: "Fase 3",
        title: "Programación y Puesta a Punto (Tecnología)",
        description: "Configuración de los transmisores con ESP32, comprobación de cobertura de audio y ensayos de emisión sin latencia.",
        duration: "Semana 4"
      },
      {
        phase: "Fase 4",
        title: "Emisiones en Directo y Evaluación",
        description: "Lectura interactiva en directo y recepción del feedback emocional de los pequeños hospitalizados y sus familias.",
        duration: "Semanas 5 y 6"
      }
    ],
    impactResults: [
      "Decenas de sesiones de acompañamiento emitidas a niños ingresados en el Miguel Servet.",
      "Incremento contrastado en la autoestima y fluidez lectora en los estudiantes emisores.",
      "Reportaje en profundidad en El Periódico de Aragón: 'Cuando aprender también es ayudar'.",
      "Extensión del modelo a centros de mayores del distrito."
    ],
    downloads: [
      { title: "Plantilla de Guiones Radiofónicos Interactivos", type: "Plantilla", size: "320 KB" },
      { title: "Manual de Programación de Audio ESP32 en Scratch/Arduino", type: "Código", size: "1.1 MB" },
      { title: "Protocolo Guía de Coordinación con Aulas Hospitalarias", type: "Guía", size: "450 KB" }
    ],
    tags: ["ApS Hospitalario", "Radio Escolar", "Lengua", "Inclusión", "Bajo Coste", "Salud Infantil"]
  }
];

export interface SynergyMatch {
  id: string;
  sourceProject: string;
  sourceTeacher: string;
  targetCategory: string;
  targetNeed: string;
  matchScore: number;
  pedagogicalSynergy: string;
  actionPact: string;
  benefits: string[];
}

export const REAL_SYNERGIES: SynergyMatch[] = [
  {
    id: "syn-1",
    sourceProject: "Cuentos en el Aire",
    sourceTeacher: "Ricardo Aguado (Colegio Juan de Lanuza)",
    targetCategory: "Lengua, Literatura & Radio Escolar",
    targetNeed: "Colegios e Institutos con proyecto de radio escolar o escritura creativa",
    matchScore: 96,
    pedagogicalSynergy: "Hermanamiento Sonoro con Aulas Hospitalarias: Cualquier centro con radio escolar o taller literario puede grabar sus cuentos o radionovelas y emitirlos a través de la red hacia las áreas pediátricas del Hospital Infantil Miguel Servet o sus hospitales provinciales más cercanos.",
    actionPact: "Grabación conjunta de capítulos cruzados entre alumnos de ambos centros y emisión coordinada con las maestras de hospital.",
    benefits: [
      "Aprendizaje-Servicio real: los alumnos escriben con un propósito humano conmovedor.",
      "Conexión intercentros directa sin necesidad de desplazamientos físicos.",
      "Materialización práctica del currículo de expresión oral y escrita."
    ]
  },
  {
    id: "syn-2",
    sourceProject: "Más Vida, Menos Redes",
    sourceTeacher: "Ricardo Aguado (Colegio Juan de Lanuza)",
    targetCategory: "Convivencia & Bienestar Digital",
    targetNeed: "Institutos y Colegios con problemas de adicción a pantallas y dispersión en el aula",
    matchScore: 94,
    pedagogicalSynergy: "Réplica Simultánea y Comparativa Científica: Los centros replican el reto durante la misma semana (ej. Semana de la Salud Mental o Día de Internet Seguro). Comparten datos anonimizados para multiplicar la muestra y publicar conclusiones conjuntas con impacto mediático.",
    actionPact: "Pacto de claustro interprovincial y negociación unificada para la cesión de terminales básicos con operadoras locales.",
    benefits: [
      "Mayor fuerza ante instituciones públicas y operadoras de telecomunicaciones.",
      "Reducción demostrada del ciberacoso y mejora drástica en el clima de convivencia escolar.",
      "Sensibilización masiva de familias con el respaldo de la Red Nacional."
    ]
  }
];
