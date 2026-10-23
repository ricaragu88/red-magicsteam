"use client";

import React from "react";
import { ArrowRight, School, Users, CheckCircle2, BookOpen, Sparkles, FilePlus, Heart } from "lucide-react";

interface HeroProps {
  onExploreProjects: () => void;
  onOpenAISynergy: () => void;
  onOpenPublish?: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExploreProjects, onOpenAISynergy, onOpenPublish }) => {
  return (
    <section className="relative overflow-hidden bg-white dark:bg-stone-950 text-stone-900 dark:text-stone-100 py-16 sm:py-24 border-b border-stone-200 dark:border-stone-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Collective Pill */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 text-xs font-bold text-stone-700 dark:text-stone-300 mb-6 shadow-xs">
          <span className="flex h-2 w-2 rounded-full bg-rose-600 animate-pulse" />
          <span className="text-rose-950 dark:text-rose-300 font-extrabold">Ecosistema Abierto de Colaboración Docente</span>
          <span className="text-stone-400">·</span>
          <span>Innovación de aula a aula, transferible y sin jerarquías</span>
        </div>

        {/* Main Title & Subtitle */}
        <div className="max-w-4xl space-y-5">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-stone-950 dark:text-stone-50 leading-tight">
            Proyectos pedagógicos de aula con{" "}
            <span className="text-rose-900 dark:text-rose-400 underline decoration-rose-300 dark:decoration-rose-700 underline-offset-8">
              impacto contrastado y réplica directa.
            </span>
          </h1>
          <p className="text-base sm:text-xl text-stone-600 dark:text-stone-300 leading-relaxed font-normal max-w-3xl">
            Un espacio horizontal donde los profesores abrimos nuestras aulas: compartimos <strong className="font-semibold text-stone-900 dark:text-white">playbooks de replicabilidad</strong>, aportamos temas y hacemos <strong className="font-semibold text-stone-900 dark:text-white">Match pedagógico</strong> para hermanar colegios e institutos sin importar de dónde provenga la iniciativa.
          </p>
        </div>

        {/* Call to action buttons */}
        <div className="mt-8 flex flex-wrap items-center gap-3 sm:gap-4">
          <button
            onClick={onExploreProjects}
            className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-full font-bold text-sm sm:text-base bg-rose-950 hover:bg-rose-900 dark:bg-rose-900 dark:hover:bg-rose-800 text-white shadow-sm active:scale-95 transition-all cursor-pointer"
          >
            <span>Explorar Proyectos Replicables</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          {onOpenPublish && (
            <button
              onClick={onOpenPublish}
              className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-full font-bold text-sm sm:text-base bg-white dark:bg-stone-900 hover:bg-stone-100 dark:hover:bg-stone-800 text-stone-800 dark:text-stone-200 border border-stone-300 dark:border-stone-700 shadow-xs transition-all cursor-pointer"
            >
              <FilePlus className="w-4 h-4 text-rose-900 dark:text-rose-400" />
              <span>Aportar mi Proyecto o Tema</span>
            </button>
          )}

          <button
            onClick={onOpenAISynergy}
            className="inline-flex items-center gap-2.5 px-5 py-3.5 rounded-full font-bold text-sm sm:text-base text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-900 transition-all cursor-pointer"
          >
            <Sparkles className="w-4 h-4 text-amber-500" />
            <span>Conector de Hermanamientos</span>
          </button>
        </div>

        {/* Real Metrics Bar */}
        <div className="mt-14 pt-8 border-t border-stone-200 dark:border-stone-800/80 grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          <div className="bg-white dark:bg-stone-900 p-5 rounded-2xl border border-stone-200 dark:border-stone-800 shadow-xs">
            <div className="flex items-center gap-2 text-rose-900 dark:text-rose-400 mb-1">
              <School className="w-5 h-5" />
              <span className="text-2xl sm:text-3xl font-black text-stone-950 dark:text-white">100%</span>
            </div>
            <p className="text-xs sm:text-sm text-stone-800 dark:text-stone-200 font-bold">Proyectos Reales de Aula</p>
            <p className="text-[11px] text-stone-500">Testados con alumnos y evidencias</p>
          </div>

          <div className="bg-white dark:bg-stone-900 p-5 rounded-2xl border border-stone-200 dark:border-stone-800 shadow-xs">
            <div className="flex items-center gap-2 text-emerald-800 dark:text-emerald-400 mb-1">
              <BookOpen className="w-5 h-5" />
              <span className="text-2xl sm:text-3xl font-black text-stone-950 dark:text-white">AAP</span>
            </div>
            <p className="text-xs sm:text-sm text-stone-800 dark:text-stone-200 font-bold">Evidencias Científicas</p>
            <p className="text-[11px] text-stone-500">Asociación Aragonesa Psicopedagogía</p>
          </div>

          <div className="bg-white dark:bg-stone-900 p-5 rounded-2xl border border-stone-200 dark:border-stone-800 shadow-xs">
            <div className="flex items-center gap-2 text-amber-800 dark:text-amber-400 mb-1">
              <CheckCircle2 className="w-5 h-5" />
              <span className="text-2xl sm:text-3xl font-black text-stone-950 dark:text-white">83%</span>
            </div>
            <p className="text-xs sm:text-sm text-stone-800 dark:text-stone-200 font-bold">Éxito en Desconexión</p>
            <p className="text-[11px] text-stone-500">&gt;70% mejora en descanso y concentración</p>
          </div>

          <div className="bg-white dark:bg-stone-900 p-5 rounded-2xl border border-stone-200 dark:border-stone-800 shadow-xs">
            <div className="flex items-center gap-2 text-sky-800 dark:text-sky-400 mb-1">
              <Heart className="w-5 h-5 text-rose-600 fill-rose-600" />
              <span className="text-2xl sm:text-3xl font-black text-stone-950 dark:text-white">Match</span>
            </div>
            <p className="text-xs sm:text-sm text-stone-800 dark:text-stone-200 font-bold">Hermanamiento Intercentros</p>
            <p className="text-[11px] text-stone-500">Conecta tu colegio con otros centros</p>
          </div>
        </div>

      </div>
    </section>
  );
};
