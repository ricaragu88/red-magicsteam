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
  recognition?: string;
  author: {
    name: string;
    role: string;
    school: string;
    location: string;
    avatar: string;
    email?: string;
    coAuthors?: string[];
  };
  collaboratingSchools?: string[];
  scientificValidation?: string;
  partnerEntities?: string[];
  image: string;
  videoUrl?: string;
  replicabilityScore: number;
  replicationsCount: number;
  matchesCount: number;
  studentsImpacted: number;
  summary: string;
  pedagogicalObjective: string;
  pedagogicalConcept?: string; // Ej: "Innovación por sustracción"
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
  isFlagship?: boolean;
}

export const THEMATIC_CATEGORIES = [
  { id: "all", name: "Todos los proyectos" },
  { id: "Bienestar Digital & Convivencia", name: "Bienestar Digital & Convivencia" },
  { id: "Tecnología, STEAM & Robótica", name: "Tecnología, STEAM & Robótica" },
  { id: "Ciencias, Salud & Sostenibilidad", name: "Ciencias, Salud & Sostenibilidad" },
  { id: "Creatividad, Lengua & Arte", name: "Creatividad, Lengua & Arte" },
  { id: "Inclusión, ApS & Comunidad", name: "Inclusión, ApS & Comunidad" },
];

export const SUGGESTED_TOPIC_TAGS: Record<string, string[]> = {
  "Bienestar Digital & Convivencia": [
    "Desconexión Digital",
    "Salud Mental",
    "Uso de Móviles",
    "Tiempo de Pantalla",
    "Pacto con Familias",
    "Prevención Ciberacoso",
    "Autorregulación",
    "Descanso y Sueño"
  ],
  "Tecnología, STEAM & Robótica": [
    "Programación",
    "Robótica Educativa",
    "Microcontroladores ESP32",
    "Mundo Maker",
    "Software Libre",
    "Pensamiento Computacional",
    "Impresión 3D",
    "Inteligencia Artificial"
  ],
  "Ciencias, Salud & Sostenibilidad": [
    "Ciencia Ciudadana",
    "Calidad del Aire y CO2",
    "Huerto Escolar",
    "Sostenibilidad",
    "Economía Circular",
    "Biodiversidad",
    "Alimentación Saludable"
  ],
  "Creatividad, Lengua & Arte": [
    "Radio Escolar",
    "Escritura Creativa",
    "Podcast de Aula",
    "Dramatización",
    "Comunicación y Oratoria",
    "Stop-Motion",
    "Música y Sonido"
  ],
  "Inclusión, ApS & Comunidad": [
    "Aprendizaje-Servicio (ApS)",
    "ApS Hospitalario",
    "Acompañamiento a Mayores",
    "Mentoría entre Iguales",
    "Accesibilidad",
    "Diversidad Funcional",
    "Solidaridad Vecinal"
  ]
};

// ÚNICO PROYECTO EJEMPLO OFICIAL: "Más Vida, Menos Redes"
// Documentado exhaustivamente con el artículo de la Revista ENLACE 36 de la Asociación Aragonesa de Psicopedagogía (AAP)
export const REAL_PROJECTS_DATA: ProjectItem[] = [
  {
    id: "mas-vida-menos-redes",
    title: "Más Vida, Menos Redes",
    subtitle: "Reto pionero de desconexión digital voluntaria, salud mental e innovación por sustracción en las aulas",
    category: "Bienestar Digital & Convivencia",
    categoryTheme: {
      bg: "bg-rose-50 dark:bg-rose-950/70",
      text: "text-rose-900 dark:text-rose-200",
      border: "border-rose-200 dark:border-rose-800"
    },
    recognition: "Top 3 Nacional Premios Mentes AMI 2026 (Atresmedia / Mutua) · 35 Mejores Experiencias SIMO Educación 2025",
    author: {
      name: "Ricardo Aguado",
      role: "Docente de Tecnología y Coordinador de Innovación",
      school: "Colegio Juan de Lanuza",
      location: "Zaragoza, Aragón",
      avatar: "/images/docenteRicardo-aguado-1.jpg",
      email: "info@tecnodivergente.es",
      coAuthors: [
        "Alba Tardío (Profesora Colegio Juan de Lanuza)",
        "Lise Baiget (Profesora Colegio Juan de Lanuza)",
        "Juan Carlos Soler (Profesor Colegio Juan de Lanuza)"
      ]
    },
    collaboratingSchools: [
      "Colegio Juan de Lanuza (Centro Impulsor)",
      "IES Ramón Pignatelli (Zaragoza · Centro Público Colaborador)",
      "IES Valdespartera (Zaragoza · Centro Público Colaborador)"
    ],
    scientificValidation: "Asociación Aragonesa de Psicopedagogía (AAP) · Publicación en Revista ENLACE Nº 36 (sep. 2026, pp. 66-68)",
    partnerEntities: [
      "Embou (Operadora de telecomunicaciones · Cesión de terminales básicos de teclas)",
      "Asociación Aragonesa de Psicopedagogía (Asesoramiento psicopedagógico y diseño de instrumentos)"
    ],
    pedagogicalConcept: "Innovación por sustracción: en lugar de incorporar una nueva herramienta tecnológica al aula, se genera una pausa deliberada para observar qué cambia cuando desaparecen los estímulos continuos.",
    image: "/images/masvidamenosredes.jpg",
    videoUrl: "https://www.youtube.com/watch?v=pd3_mC_vYn4",
    replicabilityScore: 92,
    replicationsCount: 3,
    matchesCount: 0,
    studentsImpacted: 840,
    isFlagship: true,
    summary: "Durante una semana completa, el alumnado sustituye voluntariamente sus smartphones por terminales básicos de teclas (facilitados por la operadora aragonesa Embou), eliminando notificaciones, redes sociales y vídeos compulsivos mientras preserva la comunicación esencial con las familias. Mediante Aprendizaje-Servicio (ApS), los estudiantes que viven el reto se convierten en mentores de alumnos de Primaria y de sus familias. El modelo está científicamente documentado por la Asociación Aragonesa de Psicopedagogía y transferido con éxito a centros públicos (IES Ramón Pignatelli e IES Valdespartera).",
    pedagogicalObjective: "Recuperar la soberanía del tiempo y la atención, mitigar la ansiedad digital en adolescentes, mejorar el descanso y la concentración, y crear una cultura comunitaria de bienestar digital sostenida entre centro y hogar.",
    replicability: {
      difficulty: "Media",
      estimatedBudget: "0 € (con cesión de terminales básicos por operadora local o campaña de recogida familiar)",
      targetStages: ["5º-6º Primaria (Mentorizados ApS)", "1º a 4º ESO (Reto central)", "Bachillerato"],
      duration: "3 semanas de preparación y sensibilización + 1 semana intensiva de reto",
      externalRequirements: [
        "Alianza con una operadora de telecomunicaciones local (ej. Embou) o recogida voluntaria de móviles de teclas en desuso de las familias.",
        "Asamblea informativa de familias y firma del pacto voluntario de acompañamiento en el hogar.",
        "Coordinación intercentros (opcional pero muy recomendada, como la red entre Juan de Lanuza, IES Ramón Pignatelli e IES Valdespartera)."
      ],
      classroomPrep: [
        "Fase de reflexión: cuestionarios iniciales de diagnóstico sobre dependencia digital, fatiga de sueño y uso nocturno.",
        "Talleres de neurociencia de la adicción, dopamina, FOMO y afectación en la autoestima por comparación en redes sociales.",
        "Reparto de los diarios de abordo y formularios de seguimiento de descanso, concentración y estado de ánimo.",
        "Dinamización de recreos y descansos con alternativas activas sin pantalla (juegos gigantes, torneos, música, lectura)."
      ],
      successKeys: [
        "Carácter 100% voluntario: nunca plantearlo como imposición o castigo, sino como un laboratorio personal y reto compartido.",
        "Coherencia centro-hogar: que las familias también revisen sus propios hábitos frente a las pantallas esa semana.",
        "Aprender sirviendo (ApS): convertir al alumnado en mentor de Primaria le otorga protagonismo y refuerza su autorregulación sin moralinas adultocéntricas.",
        "Uso de instrumentos rigurosos de medición pre y post reto (facilitados por la Asociación Aragonesa de Psicopedagogía)."
      ]
    },
    stepByStep: [
      {
        phase: "Fase 1: Reflexión y Diagnóstico",
        title: "Sensibilización y Análisis de Hábitos",
        description: "Cuestionarios de partida (80% dependencia digital detectada, 30% uso nocturno). Sesiones en tutorías sobre neurociencia de la atención, autoestima y límites digitales. Asamblea de familias y firma del pacto voluntario.",
        duration: "Semanas 1 y 2"
      },
      {
        phase: "Fase 2: Experiencia (El Reto)",
        title: "7 Días de Desconexión con Móviles de Teclas",
        description: "Sustitución voluntaria del smartphone por terminales básicos Embou. Registro diario de sueño, concentración y relaciones personales. Espacios de diálogo para compartir sensaciones y recreos dinámicos.",
        duration: "Semana 3 (7 días completos)"
      },
      {
        phase: "Fase 3: Transferencia (ApS)",
        title: "El Alumnado como Mentor y Agente de Cambio",
        description: "Mediante Aprendizaje-Servicio, los estudiantes diseñan charlas, talleres y materiales para Primaria y familias, transmitiendo lo aprendido desde su propia experiencia real.",
        duration: "Semana 4 en adelante"
      },
      {
        phase: "Fase 4: Evaluación Científica",
        title: "Medición de Impacto y Validación con la AAP",
        description: "Análisis comparativo de cuestionarios con la Asociación Aragonesa de Psicopedagogía: 83% de finalización con éxito, más del 70% de mejora en descanso y concentración, y mayor presencia en el aula.",
        duration: "Evaluación continua"
      }
    ],
    impactResults: [
      "83% del alumnado completó con éxito el reto de 7 días íntegros sin usar smartphones.",
      "Más del 70% percibió un mejor descanso, mayor concentración en el estudio y bienestar relativo a la tranquilidad.",
      "Recuperación observable de la conversación cara a cara, ocio compartido en recreos y comunicación en el hogar.",
      "Transferencia contrastada entre centros de distinta titularidad: Colegio Juan de Lanuza (privado), IES Ramón Pignatelli (público) e IES Valdespartera (público).",
      "Publicación científica en la Revista ENLACE de la Asociación Aragonesa de Psicopedagogía (Nº 36, sep. 2026).",
      "Reconocimiento nacional en SIMO Educación 2025 y finalista en Premios Mentes AMI 2026."
    ],
    downloads: [
      {
        title: "Artículo Completo Revista ENLACE 36 - AAP (PDF Oficial)",
        type: "PDF",
        size: "366 KB",
        url: "/recursos/enlace-aap-sep2026.pdf"
      }
    ],
    tags: [
      "Bienestar Digital",
      "Salud Mental",
      "ApS",
      "Innovación por Sustracción",
      "Familias",
      "Psicopedagogía",
      "Zaragoza"
    ]
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
    sourceProject: "Más Vida, Menos Redes",
    sourceTeacher: "Ricardo Aguado, Alba Tardío, Lise Baiget y Juan Carlos Soler (Colegio Juan de Lanuza)",
    targetCategory: "Convivencia, Tutoría & Bienestar Digital",
    targetNeed: "Colegios e Institutos que deseen realizar el reto de desconexión simultáneo o mentoría ApS",
    matchScore: 98,
    pedagogicalSynergy: "Hermanamiento para Réplica Simultánea y Comparativa de Evidencias: Vuestro centro y los centros impulsores (Juan de Lanuza, IES Ramón Pignatelli e IES Valdespartera) pueden coordinar la semana sin smartphone en las mismas fechas (ej. Día de Internet Seguro o Semana de la Salud Mental), compartiendo datos de bienestar y diarios de aula.",
    actionPact: "Pacto de colaboración intercentros: intercambio de cuestionarios validados por la Asociación Aragonesa de Psicopedagogía y sesión conjunta online entre alumnos mentores de ambos colegios.",
    benefits: [
      "Apoyo y orientación directa del equipo docente que ya ha vivido y testado el proyecto.",
      "Validación de datos agregados para presentar ante AMPAs, claustros e instituciones locales.",
      "Acceso directo a las guías de contacto con operadoras locales para la cesión de móviles de teclas."
    ]
  }
];
