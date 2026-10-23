"use client";

import React, { useState, useMemo } from "react";
import { ProjectItem, THEMATIC_CATEGORIES } from "@/data/projects";
import { ProjectCard } from "./ProjectCard";
import { Search, Sparkles, FilePlus, Heart, Filter } from "lucide-react";

interface ProjectsExplorerProps {
  projects: ProjectItem[];
  onSelectProject: (project: ProjectItem) => void;
  onReplicateProject: (project: ProjectItem) => void;
  onContactProject?: (project: ProjectItem) => void;
  onOpenPublish: () => void;
  onToggleMatch?: (project: ProjectItem) => void;
  matchedProjectIds?: string[];
}

export const ProjectsExplorer: React.FC<ProjectsExplorerProps> = ({
  projects,
  onSelectProject,
  onReplicateProject,
  onContactProject,
  onOpenPublish,
  onToggleMatch,
  matchedProjectIds = [],
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      const matchesSearch =
        project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.subtitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.author.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.author.school.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.tags.some((t) => t.toLowerCase().includes(searchTerm.toLowerCase()));

      if (selectedCategory === "matches") {
        return matchesSearch && matchedProjectIds.includes(project.id);
      }

      const matchesCategory =
        selectedCategory === "all" || project.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [projects, searchTerm, selectedCategory, matchedProjectIds]);

  return (
    <section id="proyectos-section" className="py-16 bg-stone-100/70 dark:bg-stone-950 text-stone-900 dark:text-stone-100 transition-colors border-b border-stone-200 dark:border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-stone-200 dark:border-stone-800 pb-6">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-rose-900 dark:text-rose-400 mb-2">
              <span className="w-2 h-2 rounded-full bg-rose-600" />
              <span>Ecosistema de Transferencia Pedagógica</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-stone-950 dark:text-stone-50 tracking-tight">
              Proyectos de Aula y Temas Replicables
            </h2>
            <p className="text-stone-600 dark:text-stone-400 text-sm sm:text-base mt-1 max-w-2xl leading-relaxed">
              Iniciativas contrastadas de aula a aula, sin importar de qué centro o certamen provengan. Haz <strong>Match</strong> con los proyectos que te interesen para hermanar aulas o aporta tu propio tema.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onOpenPublish}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold bg-rose-950 hover:bg-rose-900 text-white shadow-xs active:scale-95 transition-all cursor-pointer"
            >
              <FilePlus className="w-4 h-4" />
              <span>Aportar mi Proyecto / Tema</span>
            </button>
          </div>
        </div>

        {/* Search & Category Filter */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          
          {/* Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none text-xs w-full sm:w-auto">
            {THEMATIC_CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2 rounded-full font-bold transition-all whitespace-nowrap cursor-pointer shadow-xs ${
                  selectedCategory === cat.id
                    ? "bg-rose-950 text-white dark:bg-rose-900 border border-rose-950 dark:border-rose-900"
                    : "bg-white dark:bg-stone-900 text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800 border border-stone-300 dark:border-stone-700"
                }`}
              >
                {cat.name}
              </button>
            ))}

            {/* Mis Matches Tab */}
            <button
              onClick={() => setSelectedCategory("matches")}
              className={`px-4 py-2 rounded-full font-bold transition-all whitespace-nowrap cursor-pointer shadow-xs flex items-center gap-1.5 ${
                selectedCategory === "matches"
                  ? "bg-rose-950 text-white dark:bg-rose-900 border border-rose-950 dark:border-rose-900"
                  : "bg-white dark:bg-stone-900 text-rose-900 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 border border-rose-200 dark:border-rose-800"
              }`}
            >
              <Heart className={`w-3.5 h-3.5 ${selectedCategory === "matches" ? "fill-white" : "fill-rose-600 text-rose-600"}`} />
              <span>Mis Matches ({matchedProjectIds.length})</span>
            </button>
          </div>

          {/* Quick search input */}
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              placeholder="Buscar por título, centro, tema..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-3 py-2 bg-white dark:bg-stone-900 border border-stone-300 dark:border-stone-700 rounded-full text-stone-900 dark:text-stone-100 placeholder-stone-400 text-xs focus:outline-none focus:border-rose-900 shadow-xs"
            />
          </div>

        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredProjects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onSelect={onSelectProject}
              onReplicate={onReplicateProject}
              onContactAuthor={onContactProject}
              onToggleMatch={onToggleMatch}
              isMatched={matchedProjectIds.includes(project.id)}
            />
          ))}

          {/* Empty state when filtering matches */}
          {filteredProjects.length === 0 && selectedCategory === "matches" && (
            <div className="col-span-full py-12 text-center bg-white dark:bg-stone-900 rounded-3xl border border-stone-200 dark:border-stone-800 p-8 space-y-3">
              <Heart className="w-12 h-12 text-rose-300 mx-auto" />
              <h3 className="text-lg font-bold text-stone-900 dark:text-white">Aún no has hecho Match con ningún proyecto</h3>
              <p className="text-xs text-stone-500 max-w-md mx-auto">
                Explora el proyecto de referencia o los temas aportados y pulsa en "Hacer Match" para conectar con los docentes y proponer colaboraciones de aula.
              </p>
              <button
                onClick={() => setSelectedCategory("all")}
                className="px-5 py-2 rounded-full text-xs font-bold bg-rose-950 text-white cursor-pointer mt-2"
              >
                Ver todos los proyectos
              </button>
            </div>
          )}

          {/* Propose Topic Card (Open for all teachers) */}
          <div className="bg-white/70 dark:bg-stone-900/40 border-2 border-dashed border-stone-300 dark:border-stone-700 rounded-3xl p-6 sm:p-8 flex flex-col justify-between text-center space-y-4 hover:border-rose-900 dark:hover:border-rose-500 transition-colors shadow-xs">
            <div className="space-y-3 my-auto">
              <div className="w-12 h-12 rounded-full bg-rose-100 dark:bg-rose-950/60 text-rose-900 dark:text-rose-300 flex items-center justify-center mx-auto border border-rose-200 dark:border-rose-800">
                <FilePlus className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-extrabold text-stone-950 dark:text-white">
                ¿Tienes una propuesta en tu aula?
              </h3>
              <p className="text-xs text-stone-600 dark:text-stone-400 max-w-xs mx-auto leading-relaxed">
                Aporta tu iniciativa a la red abierta: comparte tu experiencia para que otros centros puedan hacer Match, colaborar y replicarla juntos.
              </p>
            </div>

            <button
              onClick={onOpenPublish}
              className="w-full py-3 px-4 rounded-full text-xs font-bold bg-rose-950 hover:bg-rose-900 dark:bg-rose-900 dark:hover:bg-rose-800 text-white shadow-xs active:scale-95 transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              <FilePlus className="w-4 h-4" />
              <span>Aportar Proyecto o Tema</span>
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};
