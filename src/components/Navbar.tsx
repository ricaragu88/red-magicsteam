"use client";

import React from "react";
import { Award, UserPlus, FilePlus, Sparkles, Sun, Moon } from "lucide-react";

interface NavbarProps {
  onOpenInvite: () => void;
  onOpenPublish: () => void;
  activeSection: string;
  setActiveSection: (section: string) => void;
  theme: "light" | "dark";
  onToggleTheme: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenInvite,
  onOpenPublish,
  activeSection,
  setActiveSection,
  theme,
  onToggleTheme,
}) => {
  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-white/95 dark:bg-stone-950/95 border-b border-stone-200 dark:border-stone-800 text-stone-900 dark:text-stone-100 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo & Brand Identity */}
          <div className="flex items-center gap-3">
            <div className="relative w-10 h-10 sm:w-11 sm:h-11 rounded-full overflow-hidden ring-2 ring-rose-900/20 dark:ring-rose-400/30 shadow-xs shrink-0">
              <img
                src="/images/docenteRicardo-aguado-1.jpg"
                alt="Docente Innovador"
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold tracking-tight text-lg text-stone-950 dark:text-stone-50">
                  Red Nacional de Innovación Docente
                </span>
                <span className="hidden sm:inline-block px-2.5 py-0.5 text-xs font-bold rounded-full bg-rose-100 dark:bg-rose-950/80 text-rose-950 dark:text-rose-200 border border-rose-200 dark:border-rose-800">
                  red.magicsteam.org
                </span>
              </div>
              <p className="text-xs text-stone-600 dark:text-stone-400 hidden sm:block">
                Ecosistema de proyectos replicables · National Teacher Prize & Docentes Galardonados
              </p>
            </div>
          </div>

          {/* Nav Links styled like Tecnodivergente */}
          <nav className="hidden lg:flex items-center gap-1.5" aria-label="Navegación">
            <button
              onClick={() => setActiveSection("proyectos")}
              className={`px-3.5 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                activeSection === "proyectos"
                  ? "bg-rose-950 text-white dark:bg-rose-900 shadow-xs"
                  : "text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-900 hover:text-stone-950 dark:hover:text-white"
              }`}
            >
              Proyectos Replicables
            </button>

            <button
              onClick={() => setActiveSection("sinergias")}
              className={`px-3.5 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
                activeSection === "sinergias"
                  ? "bg-rose-950 text-white dark:bg-rose-900 shadow-xs"
                  : "text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-900 hover:text-stone-950 dark:hover:text-white"
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span>Hermanamientos & Sinergias</span>
            </button>

            <button
              onClick={() => setActiveSection("manifiesto")}
              className={`px-3.5 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                activeSection === "manifiesto"
                  ? "bg-rose-950 text-white dark:bg-rose-900 shadow-xs"
                  : "text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-900 hover:text-stone-950 dark:hover:text-white"
              }`}
            >
              Manifiesto
            </button>
          </nav>

          {/* Action Buttons & Theme Toggle */}
          <div className="flex items-center gap-2.5">
            {/* Theme Toggle Button */}
            <button
              type="button"
              onClick={onToggleTheme}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold text-stone-700 dark:text-stone-300 bg-stone-100 dark:bg-stone-900 hover:bg-stone-200 dark:hover:bg-stone-850 border border-stone-300 dark:border-stone-700 transition-colors cursor-pointer"
              title="Alternar entre modo Día y modo Noche"
              aria-label="Cambiar tema de color"
            >
              {theme === "dark" ? (
                <>
                  <Sun className="w-3.5 h-3.5 text-amber-400" />
                  <span className="hidden sm:inline">Modo Día</span>
                </>
              ) : (
                <>
                  <Moon className="w-3.5 h-3.5 text-stone-700" />
                  <span className="hidden sm:inline">Modo Noche</span>
                </>
              )}
            </button>

            {/* Invite button */}
            <button
              onClick={onOpenInvite}
              className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs font-bold bg-stone-100 dark:bg-stone-900 hover:bg-stone-200 dark:hover:bg-stone-800 text-stone-800 dark:text-stone-200 border border-stone-300 dark:border-stone-700 transition-all cursor-pointer shadow-xs active:scale-95"
              title="Invitar a otro docente del grupo"
            >
              <UserPlus className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
              <span>Invitar Galardonado</span>
            </button>

            {/* Publish button */}
            <button
              onClick={onOpenPublish}
              className="inline-flex items-center gap-2 px-4 sm:px-5 py-2 rounded-full text-xs sm:text-sm font-bold bg-rose-950 hover:bg-rose-900 dark:bg-rose-900 dark:hover:bg-rose-800 text-white shadow-xs active:scale-95 transition-all cursor-pointer"
            >
              <FilePlus className="w-4 h-4" />
              <span>Publicar Proyecto</span>
            </button>
          </div>

        </div>
      </div>
    </header>
  );
};
