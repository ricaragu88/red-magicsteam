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
} from "lucide-react";

interface ProjectModalProps {
  project: ProjectItem | null;
  onClose: () => void;
  onReplicate: (project: ProjectItem) => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({
  project,
  onClose,
  onReplicate,
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

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-stone-950/70 backdrop-blur-sm transition-opacity"
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
            <span className="text-xs text-stone-500 font-medium hidden sm:inline">
              Ref: #{project.id}
            </span>
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
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-50 dark:bg-amber-950/80 text-amber-900 dark:text-amber-200 border border-amber-200 dark:border-amber-800 shadow-xs">
                <Award className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                {project.award}
              </span>
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

            {/* Author card badge */}
            <div className="flex items-center gap-3 pt-2">
              <img
                src={project.author.avatar}
                alt={project.author.name}
                className="w-12 h-12 rounded-full object-cover border border-stone-200 dark:border-stone-700 shadow-xs"
              />
              <div>
                <p className="font-extrabold text-stone-950 dark:text-white text-sm">{project.author.name}</p>
                <p className="text-xs text-stone-500 dark:text-stone-400">{project.author.role} · {project.author.school}</p>
                <p className="text-[11px] text-rose-900 dark:text-rose-400 font-bold">{project.author.teacherPrizeEdition}</p>
              </div>
            </div>
          </div>

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
                    Calculado según viabilidad presupuestaria, requisitos externos y preparación previa en aula.
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div>
                  <span className="text-[10px] text-stone-400 font-bold uppercase">Centros réplica</span>
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
                  <GraduationCap className="w-4 h-4 text-indigo-700 dark:text-indigo-400" />
                  <span className="font-bold text-stone-700 dark:text-stone-300">Etapas</span>
                </div>
                <p className="font-extrabold text-stone-900 dark:text-white text-xs sm:text-sm">{project.replicability.targetStages.join(", ")}</p>
              </div>

              <div className="bg-white dark:bg-stone-900 p-3.5 rounded-xl border border-stone-200 dark:border-stone-800">
                <div className="flex items-center gap-1.5 text-stone-500 mb-1">
                  <ShieldCheck className="w-4 h-4 text-rose-800 dark:text-rose-400" />
                  <span className="font-bold text-stone-700 dark:text-stone-300">Dificultad</span>
                </div>
                <p className="font-extrabold text-stone-900 dark:text-white text-xs sm:text-sm">{project.replicability.difficulty}</p>
              </div>
            </div>

            {/* Requirements & Keys */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
              <div className="bg-white dark:bg-stone-900 p-4 rounded-xl border border-stone-200 dark:border-stone-800 space-y-2">
                <div className="flex items-center gap-1.5 text-rose-900 dark:text-rose-300 font-bold text-xs uppercase tracking-wider">
                  <AlertCircle className="w-4 h-4" />
                  <span>Requisitos y Alianzas Externas</span>
                </div>
                <ul className="text-xs text-stone-600 dark:text-stone-300 space-y-1.5 list-disc pl-4 leading-relaxed">
                  {project.replicability.externalRequirements.map((req, i) => (
                    <li key={i}>{req}</li>
                  ))}
                </ul>
              </div>

              <div className="bg-white dark:bg-stone-900 p-4 rounded-xl border border-stone-200 dark:border-stone-800 space-y-2">
                <div className="flex items-center gap-1.5 text-emerald-900 dark:text-emerald-300 font-bold text-xs uppercase tracking-wider">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Preparación Previa en el Aula</span>
                </div>
                <ul className="text-xs text-stone-600 dark:text-stone-300 space-y-1.5 list-disc pl-4 leading-relaxed">
                  {project.replicability.classroomPrep.map((prep, i) => (
                    <li key={i}>{prep}</li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Success keys tip */}
            <div className="p-4 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 text-xs text-amber-950 dark:text-amber-200 flex items-start gap-2.5">
              <Sparkles className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
              <div>
                <strong className="font-bold">Clave de éxito para evitar el abandono:</strong>{" "}
                {project.replicability.successKeys.join(" ")}
              </div>
            </div>
          </div>

          {/* Description & Objective */}
          <div className="space-y-3">
            <h3 className="text-lg font-bold text-stone-950 dark:text-white">¿Por qué y cómo funciona?</h3>
            <p className="text-sm text-stone-700 dark:text-stone-300 leading-relaxed">
              {project.summary}
            </p>
            <div className="p-3.5 rounded-xl bg-stone-50 dark:bg-stone-950 border-l-4 border-rose-900 dark:border-rose-500 text-xs text-stone-700 dark:text-stone-300">
              <strong className="text-stone-950 dark:text-white font-bold">Objetivo Pedagógico Central:</strong> {project.pedagogicalObjective}
            </div>
          </div>

          {/* Step by step timeline */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-stone-950 dark:text-white flex items-center gap-2">
              <Calendar className="w-5 h-5 text-rose-900 dark:text-rose-400" />
              <span>Hoja de Ruta Paso a Paso para tu Centro</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {project.stepByStep.map((step, idx) => (
                <div
                  key={idx}
                  className="bg-stone-50 dark:bg-stone-950 p-4 rounded-xl border border-stone-200 dark:border-stone-800 space-y-1.5"
                >
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-extrabold text-rose-900 dark:text-rose-400 uppercase tracking-wider">
                      {step.phase}
                    </span>
                    <span className="text-stone-500 font-semibold">{step.duration}</span>
                  </div>
                  <h4 className="font-bold text-stone-950 dark:text-white text-sm">{step.title}</h4>
                  <p className="text-xs text-stone-600 dark:text-stone-400 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Impact Results */}
          <div className="space-y-3">
            <h3 className="text-lg font-bold text-stone-950 dark:text-white">Resultados Medibles y Evidencias</h3>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs text-stone-700 dark:text-stone-300">
              {project.impactResults.map((result, i) => (
                <li
                  key={i}
                  className="flex items-start gap-2 bg-stone-50 dark:bg-stone-950 p-3 rounded-xl border border-stone-200 dark:border-stone-800"
                >
                  <CheckCircle2 className="w-4 h-4 text-emerald-700 dark:text-emerald-400 shrink-0 mt-0.5" />
                  <span>{result}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Downloads section */}
          <div className="space-y-3">
            <h3 className="text-lg font-bold text-stone-950 dark:text-white flex items-center gap-2">
              <Download className="w-5 h-5 text-indigo-700 dark:text-indigo-400" />
              <span>Documentos y Recursos de Libre Descarga</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {project.downloads.map((doc, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between p-3.5 rounded-xl bg-white dark:bg-stone-950 border border-stone-200 dark:border-stone-800 hover:border-stone-400 dark:hover:border-stone-700 transition-colors shadow-xs"
                >
                  <div className="text-xs space-y-0.5">
                    <p className="font-bold text-stone-900 dark:text-stone-100 truncate max-w-[240px] sm:max-w-[280px]">
                      {doc.title}
                    </p>
                    <p className="text-[11px] text-stone-500">
                      Formato: {doc.type} · {doc.size}
                    </p>
                  </div>
                  {doc.url ? (
                    <a
                      href={doc.url}
                      download
                      className="p-2 rounded-lg bg-stone-100 hover:bg-stone-200 dark:bg-stone-800 dark:hover:bg-stone-700 text-stone-700 dark:text-stone-200 transition-colors cursor-pointer"
                      title="Descargar archivo"
                    >
                      <Download className="w-4 h-4" />
                    </a>
                  ) : (
                    <button
                      onClick={() => alert(`Iniciando descarga: ${doc.title}`)}
                      className="p-2 rounded-lg bg-stone-100 hover:bg-stone-200 dark:bg-stone-800 dark:hover:bg-stone-700 text-stone-700 dark:text-stone-200 transition-colors cursor-pointer"
                      title="Descargar archivo"
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
            ¿Quieres replicar este proyecto en tu centro escolar?
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              onClick={onClose}
              className="flex-1 sm:flex-none px-5 py-2.5 rounded-full text-xs font-bold bg-stone-100 hover:bg-stone-200 dark:bg-stone-800 dark:hover:bg-stone-700 text-stone-700 dark:text-stone-300 transition-colors cursor-pointer"
            >
              Cerrar
            </button>

            <button
              onClick={() => onReplicate(project)}
              className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-full text-xs sm:text-sm font-bold bg-rose-950 hover:bg-rose-900 dark:bg-rose-900 dark:hover:bg-rose-800 text-white shadow-xs active:scale-95 transition-all cursor-pointer whitespace-nowrap"
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
