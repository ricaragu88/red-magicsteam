"use client";

import React, { useEffect } from "react";
import { ProjectItem } from "@/data/projects";
import {
  X,
  Award,
  Zap,
  Clock,
  Euro,
  GraduationCap,
  AlertCircle,
  CheckCircle2,
  Download,
  Calendar,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  FileText,
  Mail,
  Heart,
  Play,
  School,
  Users,
  Check,
  BookOpen,
  Edit3,
} from "lucide-react";

interface ProjectModalProps {
  project: ProjectItem | null;
  onClose: () => void;
  onReplicate: (project: ProjectItem) => void;
  onContactAuthor?: (project: ProjectItem) => void;
  onToggleMatch?: (project: ProjectItem) => void;
  isMatched?: boolean;
  isAuthor?: boolean;
  onEdit?: (project: ProjectItem) => void;
  onOpenIdentity?: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({
  project,
  onClose,
  onReplicate,
  onContactAuthor,
  onToggleMatch,
  isMatched = false,
  isAuthor = false,
  onEdit,
  onOpenIdentity,
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (project) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [project, onClose]);

  if (!project) return null;

  // Extract YouTube ID if present
  const getYouTubeEmbedUrl = (url?: string) => {
    if (!url) return null;
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    return match && match[2].length === 11
      ? `https://www.youtube-nocookie.com/embed/${match[2]}`
      : null;
  };

  const embedUrl = getYouTubeEmbedUrl(project.videoUrl);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-stone-950/75 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-4xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-3xl shadow-2xl overflow-hidden z-10 my-8 text-stone-900 dark:text-stone-100 max-h-[92vh] flex flex-col transition-colors">
        
        {/* Sticky Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-stone-200 dark:border-stone-800 bg-white/95 dark:bg-stone-900/95 sticky top-0 z-20 backdrop-blur-sm">
          <div className="flex items-center gap-2">
            <span className={`px-3 py-1 rounded-full text-xs font-bold border ${project.categoryTheme.bg} ${project.categoryTheme.text} ${project.categoryTheme.border}`}>
              Playbook de Replicabilidad
            </span>
            {project.isFlagship && (
              <span className="hidden sm:inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-amber-100 dark:bg-amber-950/80 text-amber-900 dark:text-amber-200 border border-amber-300 dark:border-amber-800">
                <Sparkles className="w-3 h-3 text-amber-500" />
                Proyecto Referencia Validado
              </span>
            )}
            {isAuthor && onEdit && (
              <button
                onClick={() => onEdit(project)}
                className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-amber-100 hover:bg-amber-200 dark:bg-amber-950 dark:hover:bg-amber-900 text-amber-950 dark:text-amber-200 border border-amber-300 dark:border-amber-700 shadow-xs cursor-pointer active:scale-95 transition-all"
                title="Editar datos, vídeos y descargas"
              >
                <Edit3 className="w-3.5 h-3.5 text-amber-700 dark:text-amber-400" />
                <span>Editar Mi Proyecto</span>
              </button>
            )}
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-stone-100 dark:hover:bg-stone-800 text-stone-500 hover:text-stone-900 dark:hover:text-white transition-colors cursor-pointer"
            aria-label="Cerrar modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="overflow-y-auto p-6 sm:p-8 space-y-8">
          
          {/* Header Banner */}
          <div className="space-y-4">
            <div className="flex flex-wrap items-center gap-2">
              {project.recognition && (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-50 dark:bg-amber-950/80 text-amber-900 dark:text-amber-200 border border-amber-200 dark:border-amber-800 shadow-xs">
                  <Award className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                  {project.recognition}
                </span>
              )}
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300">
                {project.category}
              </span>
            </div>

            <h2 className="text-2xl sm:text-4xl font-extrabold text-stone-950 dark:text-stone-50 tracking-tight leading-tight">
              {project.title}
            </h2>
            <p className="text-base sm:text-lg text-stone-600 dark:text-stone-300 leading-relaxed">
              {project.subtitle}
            </p>

            {/* Author team & Match CTA Bar */}
            <div className="p-4 rounded-2xl bg-stone-50 dark:bg-stone-950 border border-stone-200 dark:border-stone-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3.5">
                <img
                  src={project.author.avatar}
                  alt={project.author.name}
                  className="w-13 h-13 rounded-full object-cover border border-stone-200 dark:border-stone-700 shadow-xs shrink-0"
                />
                <div>
                  <p className="font-extrabold text-stone-950 dark:text-white text-sm">
                    {project.author.name}
                  </p>
                  <p className="text-xs text-stone-600 dark:text-stone-300">
                    {project.author.role} · {project.author.school}
                  </p>
                  {project.author.coAuthors && (
                    <p className="text-[11px] text-stone-500 dark:text-stone-400 mt-0.5">
                      <strong>Equipo docente impulsor:</strong> {project.author.coAuthors.join(", ")}
                    </p>
                  )}
                </div>
              </div>

              {/* Top Action Buttons (Match & Contact & Edit) */}
              <div className="flex flex-wrap items-center gap-2 shrink-0">
                {isAuthor && onEdit && (
                  <button
                    onClick={() => onEdit(project)}
                    className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-full text-xs font-bold bg-amber-100 hover:bg-amber-200 dark:bg-amber-950 dark:hover:bg-amber-900 text-amber-950 dark:text-amber-200 border border-amber-300 dark:border-amber-700 shadow-xs cursor-pointer active:scale-95 transition-all"
                    title="Editar datos, vídeos y descargas"
                  >
                    <Edit3 className="w-3.5 h-3.5 text-amber-700 dark:text-amber-400" />
                    <span>Editar Mi Proyecto</span>
                  </button>
                )}

                {!isAuthor && project.id === "mas-vida-menos-redes" && onOpenIdentity && (
                  <button
                    onClick={onOpenIdentity}
                    className="inline-flex items-center gap-1 px-3 py-2 rounded-full text-xs font-semibold text-stone-600 dark:text-stone-300 hover:text-stone-900 dark:hover:text-white bg-stone-100 hover:bg-stone-200 dark:bg-stone-850 border border-stone-200 dark:border-stone-700 cursor-pointer transition-colors"
                  >
                    <Edit3 className="w-3 h-3 text-rose-700" />
                    <span>¿Eres Ricardo? Identifícate para editar</span>
                  </button>
                )}

                {onToggleMatch && (
                  <button
                    onClick={() => onToggleMatch(project)}
                    className={`inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full text-xs font-bold transition-all cursor-pointer shadow-xs active:scale-95 ${
                      isMatched
                        ? "bg-rose-100 dark:bg-rose-950 text-rose-950 dark:text-rose-200 border border-rose-300 dark:border-rose-800"
                        : "bg-white dark:bg-stone-900 hover:bg-rose-50 text-stone-800 dark:text-stone-200 border border-stone-300 dark:border-stone-700"
                    }`}
                  >
                    <Heart className={`w-4 h-4 ${isMatched ? "fill-rose-700 text-rose-700" : "text-rose-800 dark:text-rose-400"}`} />
                    <span>{isMatched ? "¡Match Activo!" : "Hacer Match"}</span>
                    <span className="text-[10px] font-mono opacity-80">({project.matchesCount})</span>
                  </button>
                )}

                {onContactAuthor && (
                  <button
                    onClick={() => onContactAuthor(project)}
                    className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full text-xs font-bold bg-white dark:bg-stone-900 hover:bg-stone-100 dark:hover:bg-stone-800 text-stone-800 dark:text-stone-200 border border-stone-300 dark:border-stone-700 shadow-xs cursor-pointer active:scale-95 transition-all"
                  >
                    <Mail className="w-4 h-4 text-rose-900 dark:text-rose-400" />
                    <span className="hidden sm:inline">Contactar</span>
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Scientific Validation & Empirical Evidence Banner (AAP Magazine) */}
          {project.scientificValidation && (
            <div className="p-5 rounded-2xl bg-rose-50/80 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900/60 space-y-3">
              <div className="flex items-center gap-2 text-rose-950 dark:text-rose-200 font-extrabold text-sm">
                <BookOpen className="w-4 h-4 text-rose-800 dark:text-rose-400" />
                <span>Documentación y Validación Científica: Asociación Aragonesa de Psicopedagogía</span>
              </div>
              
              <p className="text-xs text-stone-700 dark:text-stone-300 leading-relaxed">
                Este proyecto cuenta con evaluación psicopedagógica documentada y publicada en la <strong>Revista ENLACE Nº 36</strong> (septiembre 2026, págs. 66-68). El estudio analiza cómo el <strong>80% del alumnado reconocía conductas de dependencia digital</strong> y un <strong>30% utilizaba el móvil durante la noche restando horas vitales de sueño</strong>. Tras el reto de 7 días, el <strong>83% completó la experiencia con éxito</strong> y más del <strong>70% experimentó mejoras medibles en descanso, tranquilidad y capacidad de concentración</strong>.
              </p>

              {/* Collaborating Schools Badges */}
              {project.collaboratingSchools && (
                <div className="pt-2 border-t border-rose-200 dark:border-rose-900/40 flex flex-wrap items-center gap-2 text-xs">
                  <span className="font-bold text-rose-950 dark:text-rose-300">Centros en red de réplica:</span>
                  {project.collaboratingSchools.map((schoolName, i) => (
                    <span key={i} className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-white dark:bg-stone-900 border border-rose-200 dark:border-rose-800 text-stone-800 dark:text-stone-200">
                      <School className="w-3 h-3 text-rose-700 dark:text-rose-400" />
                      <span>{schoolName}</span>
                    </span>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Video Section (if URL available) */}
          {project.videoUrl && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-base sm:text-lg font-bold text-stone-950 dark:text-white flex items-center gap-2">
                  <Play className="w-4 h-4 text-rose-900 dark:text-rose-400 fill-current" />
                  <span>Vídeo del Proyecto y Testimonios</span>
                </h3>
                <a
                  href={project.videoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-bold text-rose-900 dark:text-rose-400 hover:underline flex items-center gap-1"
                >
                  Abrir en YouTube <ArrowRight className="w-3 h-3" />
                </a>
              </div>

              {embedUrl ? (
                <div className="relative w-full aspect-video rounded-2xl overflow-hidden bg-black shadow-md border border-stone-200 dark:border-stone-800">
                  <iframe
                    src={embedUrl}
                    title={project.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full h-full"
                  />
                </div>
              ) : (
                <a
                  href={project.videoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-4 rounded-2xl bg-stone-100 hover:bg-stone-200 dark:bg-stone-800 dark:hover:bg-stone-700 flex items-center justify-between transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-red-600 text-white flex items-center justify-center">
                      <Play className="w-5 h-5 fill-current" />
                    </div>
                    <div>
                      <p className="font-bold text-stone-900 dark:text-white text-xs">Ver reportaje del proyecto</p>
                      <p className="text-[11px] text-stone-500 truncate max-w-sm">{project.videoUrl}</p>
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-stone-400" />
                </a>
              )}
            </div>
          )}

          {/* Replicability Breakdown Box */}
          <div className="bg-stone-50 dark:bg-stone-950 border border-stone-200 dark:border-stone-800 rounded-2xl p-6 space-y-6 shadow-xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-200 dark:border-stone-800 pb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-rose-100 dark:bg-rose-950 text-rose-900 dark:text-rose-200 border border-rose-200 dark:border-rose-800 flex items-center justify-center shrink-0">
                  <Zap className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-black text-stone-950 dark:text-white">
                    Índice de Replicabilidad: {project.replicabilityScore}%
                  </h3>
                  <p className="text-xs text-stone-500 dark:text-stone-400">
                    Calculado según viabilidad presupuestaria (0 €), sencillez de adaptación e impacto comunitario.
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div>
                  <span className="text-[10px] text-stone-400 font-bold uppercase">Centros colaboradores</span>
                  <p className="text-lg font-black text-stone-950 dark:text-white">{project.replicationsCount} centros</p>
                </div>
                <div className="pl-4 border-l border-stone-200 dark:border-stone-800">
                  <span className="text-[10px] text-stone-400 font-bold uppercase">Alumnos</span>
                  <p className="text-lg font-black text-emerald-800 dark:text-emerald-400">{project.studentsImpacted}</p>
                </div>
              </div>
            </div>

            {/* Quick Metrics Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
              <div className="bg-white dark:bg-stone-900 p-3.5 rounded-xl border border-stone-200 dark:border-stone-800">
                <div className="flex items-center gap-1.5 text-stone-500 mb-1">
                  <Euro className="w-4 h-4 text-emerald-700 dark:text-emerald-400" />
                  <span className="font-bold text-stone-700 dark:text-stone-300">Coste</span>
                </div>
                <p className="font-extrabold text-stone-900 dark:text-white text-xs sm:text-sm">{project.replicability.estimatedBudget}</p>
              </div>

              <div className="bg-white dark:bg-stone-900 p-3.5 rounded-xl border border-stone-200 dark:border-stone-800">
                <div className="flex items-center gap-1.5 text-stone-500 mb-1">
                  <Clock className="w-4 h-4 text-amber-700 dark:text-amber-400" />
                  <span className="font-bold text-stone-700 dark:text-stone-300">Duración</span>
                </div>
                <p className="font-extrabold text-stone-900 dark:text-white text-xs sm:text-sm">{project.replicability.duration}</p>
              </div>

              <div className="bg-white dark:bg-stone-900 p-3.5 rounded-xl border border-stone-200 dark:border-stone-800">
                <div className="flex items-center gap-1.5 text-stone-500 mb-1">
                  <GraduationCap className="w-4 h-4 text-rose-800 dark:text-rose-400" />
                  <span className="font-bold text-stone-700 dark:text-stone-300">Etapa</span>
                </div>
                <p className="font-extrabold text-stone-900 dark:text-white text-xs sm:text-sm">{project.replicability.targetStages[0]}</p>
              </div>

              <div className="bg-white dark:bg-stone-900 p-3.5 rounded-xl border border-stone-200 dark:border-stone-800">
                <div className="flex items-center gap-1.5 text-stone-500 mb-1">
                  <ShieldCheck className="w-4 h-4 text-sky-700 dark:text-sky-400" />
                  <span className="font-bold text-stone-700 dark:text-stone-300">Dificultad</span>
                </div>
                <p className="font-extrabold text-stone-900 dark:text-white text-xs sm:text-sm">{project.replicability.difficulty}</p>
              </div>
            </div>

            {/* Replicability requirements & keys */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs pt-2">
              <div className="space-y-2 bg-white dark:bg-stone-900 p-4 rounded-xl border border-stone-200 dark:border-stone-800">
                <h4 className="font-bold text-stone-900 dark:text-stone-100 flex items-center gap-1.5">
                  <AlertCircle className="w-4 h-4 text-amber-600" />
                  Requisitos Previos de Centro y Familias:
                </h4>
                <ul className="space-y-1.5 pl-4 list-disc text-stone-600 dark:text-stone-300 leading-relaxed">
                  {project.replicability.externalRequirements.map((req, i) => (
                    <li key={i}>{req}</li>
                  ))}
                </ul>
              </div>

              <div className="space-y-2 bg-white dark:bg-stone-900 p-4 rounded-xl border border-stone-200 dark:border-stone-800">
                <h4 className="font-bold text-stone-900 dark:text-stone-100 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  Claves de Éxito Metodológicas:
                </h4>
                <ul className="space-y-1.5 pl-4 list-disc text-stone-600 dark:text-stone-300 leading-relaxed">
                  {project.replicability.successKeys.map((key, i) => (
                    <li key={i}>{key}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Pedagogical Concept & Objectives */}
          <div className="space-y-3">
            <h3 className="text-lg font-black text-stone-950 dark:text-white">
              Fundamentación Pedagógica: {project.pedagogicalConcept || "Propósito de Aprendizaje"}
            </h3>
            <p className="text-xs sm:text-sm text-stone-700 dark:text-stone-300 leading-relaxed">
              {project.summary}
            </p>
          </div>

          {/* Step-by-Step Playbook implementation */}
          <div className="space-y-4">
            <h3 className="text-lg font-black text-stone-950 dark:text-white">
              Guía de Implementación Paso a Paso
            </h3>
            <div className="space-y-3">
              {project.stepByStep.map((step, idx) => (
                <div
                  key={idx}
                  className="bg-stone-50 dark:bg-stone-950 p-4 rounded-xl border border-stone-200 dark:border-stone-800 flex flex-col sm:flex-row sm:items-start gap-3 sm:gap-4 text-xs"
                >
                  <span className="px-3 py-1 rounded-full bg-rose-950 text-white font-mono font-bold text-[11px] shrink-0 self-start">
                    {step.phase}
                  </span>
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center justify-between gap-2">
                      <h4 className="font-extrabold text-stone-950 dark:text-white text-sm">
                        {step.title}
                      </h4>
                      <span className="text-[11px] font-semibold text-stone-500 shrink-0">
                        {step.duration}
                      </span>
                    </div>
                    <p className="text-stone-600 dark:text-stone-300 leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Results and Measured Impact */}
          <div className="space-y-3">
            <h3 className="text-lg font-black text-stone-950 dark:text-white">
              Evidencias Medidas y Resultados de Impacto
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {project.impactResults.map((result, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-2.5 p-3 rounded-xl bg-emerald-50/70 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-900/60 text-xs text-stone-800 dark:text-stone-200"
                >
                  <CheckCircle2 className="w-4 h-4 text-emerald-700 dark:text-emerald-400 shrink-0 mt-0.5" />
                  <span className="leading-snug">{result}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Free Downloads & Official Documentation */}
          <div className="space-y-3">
            <h3 className="text-lg font-black text-stone-950 dark:text-white flex items-center justify-between">
              <span>Recursos y Descargas Oficiales</span>
              <span className="text-xs font-normal text-stone-500">Acceso libre sin registro</span>
            </h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {project.downloads.map((doc, idx) => (
                <div
                  key={idx}
                  className="bg-stone-50 dark:bg-stone-950 p-4 rounded-xl border border-stone-200 dark:border-stone-800 flex items-center justify-between gap-3 text-xs"
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <FileText className="w-5 h-5 text-rose-800 dark:text-rose-400 shrink-0" />
                    <div className="min-w-0">
                      <p className="font-bold text-stone-900 dark:text-stone-100 truncate">{doc.title}</p>
                      <p className="text-[11px] text-stone-500">{doc.type} · {doc.size}</p>
                    </div>
                  </div>

                  {doc.url ? (
                    <a
                      href={doc.url}
                      download
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2.5 rounded-lg bg-rose-950 hover:bg-rose-900 text-white transition-colors cursor-pointer shrink-0"
                      title="Descargar documento oficial"
                    >
                      <Download className="w-4 h-4" />
                    </a>
                  ) : (
                    <button
                      onClick={() => alert(`Iniciando descarga: ${doc.title}`)}
                      className="p-2 rounded-lg bg-stone-100 hover:bg-stone-200 dark:bg-stone-800 dark:hover:bg-stone-700 text-stone-700 dark:text-stone-200 transition-colors cursor-pointer shrink-0"
                      title="Descargar recurso"
                    >
                      <Download className="w-4 h-4" />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Modal Sticky Footer */}
        <div className="p-4 sm:p-6 border-t border-stone-200 dark:border-stone-800 bg-white/95 dark:bg-stone-900/95 sticky bottom-0 z-20 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="text-xs text-stone-500 dark:text-stone-400 hidden sm:block">
            ¿Quieres conectar tu centro para replicar este proyecto?
          </div>

          <div className="flex items-center gap-2.5 w-full sm:w-auto">
            <button
              onClick={onClose}
              className="px-4 py-2.5 rounded-full text-xs font-bold bg-stone-100 hover:bg-stone-200 dark:bg-stone-800 dark:hover:bg-stone-700 text-stone-700 dark:text-stone-300 transition-colors cursor-pointer"
            >
              Cerrar
            </button>

            {onToggleMatch && (
              <button
                onClick={() => onToggleMatch(project)}
                className={`inline-flex items-center justify-center gap-1.5 px-5 py-2.5 rounded-full text-xs font-bold transition-all cursor-pointer shadow-xs active:scale-95 whitespace-nowrap ${
                  isMatched
                    ? "bg-rose-100 dark:bg-rose-950 text-rose-950 dark:text-rose-200 border border-rose-300 dark:border-rose-800"
                    : "bg-white dark:bg-stone-900 hover:bg-rose-50 text-stone-800 dark:text-stone-200 border border-stone-300 dark:border-stone-700"
                }`}
              >
                <Heart className={`w-4 h-4 ${isMatched ? "fill-rose-700 text-rose-700" : "text-rose-800 dark:text-rose-400"}`} />
                <span>{isMatched ? "¡Match Hecho!" : "Hacer Match"}</span>
              </button>
            )}

            {onContactAuthor && (
              <button
                onClick={() => onContactAuthor(project)}
                className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-full text-xs font-bold bg-stone-100 hover:bg-stone-200 dark:bg-stone-800 dark:hover:bg-stone-700 text-stone-800 dark:text-stone-200 border border-stone-300 dark:border-stone-700 transition-colors cursor-pointer whitespace-nowrap shadow-xs"
              >
                <Mail className="w-4 h-4 text-rose-900 dark:text-rose-400" />
                <span>Contactar</span>
              </button>
            )}

            {isAuthor && onEdit && (
              <button
                onClick={() => onEdit(project)}
                className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-full text-xs font-bold bg-amber-100 hover:bg-amber-200 dark:bg-amber-950 dark:hover:bg-amber-900 text-amber-950 dark:text-amber-200 border border-amber-300 dark:border-amber-700 transition-colors cursor-pointer whitespace-nowrap shadow-xs"
              >
                <Edit3 className="w-3.5 h-3.5 text-amber-700 dark:text-amber-400" />
                <span>Editar Proyecto</span>
              </button>
            )}

            <button
              onClick={() => onReplicate(project)}
              className="inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-full text-xs sm:text-sm font-bold bg-rose-950 hover:bg-rose-900 text-white shadow-xs active:scale-95 transition-all cursor-pointer whitespace-nowrap"
            >
              <span>Replicar en mi centro</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
