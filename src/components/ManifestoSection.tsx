"use client";

import React from "react";
import { Award, ShieldCheck, HeartHandshake, Zap, Compass } from "lucide-react";

export const ManifestoSection: React.FC = () => {
  return (
    <section id="manifiesto-section" className="py-20 bg-stone-100/80 dark:bg-stone-950 text-stone-900 dark:text-stone-100 border-t border-b border-stone-200 dark:border-stone-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 text-xs font-bold text-rose-950 dark:text-rose-300 uppercase tracking-wider shadow-xs">
            <Compass className="w-4 h-4 text-rose-800 dark:text-rose-400" />
            <span>Manifiesto Fundacional</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-stone-950 dark:text-stone-50 tracking-tight">
            Docentes unidos por la transferencia real en las aulas
          </h2>
          <p className="text-stone-600 dark:text-stone-300 text-base sm:text-lg leading-relaxed">
            Un premio educativo debe ser el principio de un movimiento pedagógico, no su punto final. Esta es la declaración de intenciones de nuestra alianza.
          </p>
        </div>

        {/* 4 Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          
          <div className="bg-white dark:bg-stone-900 p-6 rounded-2xl border border-stone-200 dark:border-stone-800 space-y-3 shadow-xs">
            <div className="w-12 h-12 rounded-xl bg-rose-50 dark:bg-rose-950/70 border border-rose-200 dark:border-rose-800 flex items-center justify-center text-rose-950 dark:text-rose-300">
              <Zap className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-stone-950 dark:text-white">1. Romper el Aislamiento</h3>
            <p className="text-xs text-stone-600 dark:text-stone-400 leading-relaxed">
              Muchas de las mejores prácticas pedagógicas de España se quedan encerradas en el aula de su creador. Nuestro objetivo es compartir guías abiertas para que cualquier docente pueda replicarlas con éxito.
            </p>
          </div>

          <div className="bg-white dark:bg-stone-900 p-6 rounded-2xl border border-stone-200 dark:border-stone-800 space-y-3 shadow-xs">
            <div className="w-12 h-12 rounded-xl bg-amber-50 dark:bg-amber-950/70 border border-amber-200 dark:border-amber-800 flex items-center justify-center text-amber-950 dark:text-amber-300">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-stone-950 dark:text-white">2. Índice de Replicabilidad</h3>
            <p className="text-xs text-stone-600 dark:text-stone-400 leading-relaxed">
              Sin recetas mágicas ni adornos: evaluamos con rigor los requisitos previos de aula, costes reales (priorizando 0 € y material reciclado) y alianzas externas necesarias (operadoras, hospitales, familias).
            </p>
          </div>

          <div className="bg-white dark:bg-stone-900 p-6 rounded-2xl border border-stone-200 dark:border-stone-800 space-y-3 shadow-xs">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 dark:bg-emerald-950/70 border border-emerald-200 dark:border-emerald-800 flex items-center justify-center text-emerald-950 dark:text-emerald-300">
              <HeartHandshake className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-stone-950 dark:text-white">3. Hermanamiento Intercentros</h3>
            <p className="text-xs text-stone-600 dark:text-stone-400 leading-relaxed">
              Propiciamos conexiones directas entre centros escolares diversos: conectar aulas ordinarias con plantas pediátricas hospitalarias, o colegios urbanos con institutos de comarcas rurales.
            </p>
          </div>

          <div className="bg-white dark:bg-stone-900 p-6 rounded-2xl border border-stone-200 dark:border-stone-800 space-y-3 shadow-xs">
            <div className="w-12 h-12 rounded-xl bg-sky-50 dark:bg-sky-950/70 border border-sky-200 dark:border-sky-800 flex items-center justify-center text-sky-950 dark:text-sky-300">
              <Award className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-stone-950 dark:text-white">4. Voz Colectiva Independiente</h3>
            <p className="text-xs text-stone-600 dark:text-stone-400 leading-relaxed">
              Un think tank independiente de docentes en activo con premios y trayectoria contrastada, capaces de aportar criterio técnico y humanista ante administraciones, familias y sociedad.
            </p>
          </div>

        </div>

        {/* Collective Quote Callout */}
        <div className="p-8 sm:p-10 rounded-3xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 text-center space-y-3 shadow-xs">
          <p className="text-lg sm:text-xl font-medium text-stone-800 dark:text-stone-200 italic max-w-3xl mx-auto leading-relaxed">
            «La verdadera excelencia docente no reside en el trofeo que descansa en una estantería, sino en los alumnos de otros colegios que aprenden mejor gracias a lo que tú decidiste compartir.»
          </p>
          <p className="text-xs font-bold text-rose-950 dark:text-rose-400 tracking-wider uppercase">
            — Docentes del National Teacher Prize & Ecosistema MagicSTEAM
          </p>
        </div>

      </div>
    </section>
  );
};
