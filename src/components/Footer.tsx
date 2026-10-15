"use client";

import React from "react";
import { Award, Heart, ExternalLink } from "lucide-react";

export const Footer: React.FC = () => {
  return (
    <footer className="bg-white dark:bg-stone-950 text-stone-600 dark:text-stone-400 border-t border-stone-200 dark:border-stone-850 py-12 text-xs transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Award className="w-5 h-5 text-amber-600 dark:text-amber-400" />
              <span className="text-stone-950 dark:text-white font-extrabold text-base">
                Red Nacional de Innovación Docente
              </span>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-rose-100 dark:bg-rose-950/80 text-rose-950 dark:text-rose-200 border border-rose-200 dark:border-rose-800">
                red.magicsteam.org
              </span>
            </div>
            <p className="text-stone-500 dark:text-stone-400 max-w-md leading-relaxed">
              Iniciativa comunitaria de transferencia pedagógica y hermanamientos entre colegios e institutos impulsada por docentes galardonados en el National Teacher Prize y convocatorias de innovación educativa.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4 text-xs font-semibold">
            <a
              href="https://magicsteam.org"
              target="_blank"
              rel="noopener noreferrer"
              className="text-stone-700 dark:text-stone-300 hover:text-rose-900 dark:hover:text-rose-400 transition-colors flex items-center gap-1"
            >
              <span>magicsteam.org</span>
              <ExternalLink className="w-3.5 h-3.5 text-stone-400" />
            </a>
            <a
              href="https://tecnodivergente.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-stone-700 dark:text-stone-300 hover:text-rose-900 dark:hover:text-rose-400 transition-colors flex items-center gap-1"
            >
              <span>tecnodivergente.com</span>
              <ExternalLink className="w-3.5 h-3.5 text-stone-400" />
            </a>
            <span className="text-stone-300 dark:text-stone-700">·</span>
            <span className="text-stone-500">Filosofía de Acceso Abierto & Soberanía Docente</span>
          </div>
        </div>

        <div className="pt-6 border-t border-stone-200 dark:border-stone-850 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-stone-500">
          <p>
            © 2026 Red Nacional de Innovación Docente. Servicio educativo abierto y sin ánimo de lucro.
          </p>
          <p className="flex items-center gap-1">
            Conectando aulas y proyectos con <Heart className="w-3.5 h-3.5 text-rose-600 fill-rose-600" /> en toda España.
          </p>
        </div>

      </div>
    </footer>
  );
};
