"use client";

import React, { useState, useMemo } from "react";
import { ProjectItem } from "@/data/projects";
import { ProjectCard } from "./ProjectCard";
import { Search, Sparkles, FilePlus } from "lucide-react";

interface ProjectsExplorerProps {
  projects: ProjectItem[];
  onSelectProject: (project: ProjectItem) => void;
  onReplicateProject: (project: ProjectItem) => void;
  onContactProject?: (project: ProjectItem) => void;
  onOpenPublish: () => void;
}

export const ProjectsExplorer: React.FC<ProjectsExplorerProps> = ({
  projects,
  onSelectProject,
  onReplicateProject,
  onContactProject,
  onOpenPublish,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const categories = useMemo(() => {
    return [
      { id: "all", name: "Todos los proyectos (2)" },
      { id: "Bienestar Digital & Convivencia", name: "Bienestar Digital & Pantallas" },
      { id: "Inclusión Social & ApS Hospitalario", name: "ApS Hospitalario & Inclusión" },
    ];
  }, []);

  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      const matchesSearch =
        project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.subtitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.author.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.tags.some((t) => t.toLowerCase().includes(searchTerm.toLowerCase()));

      const matchesCategory =
        selectedCategory === "all" || project.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [projects, searchTerm, selectedCategory]);

  return (
    <section id="proyectos-section" className="py-16 bg-stone-100/70 dark:bg-stone-950 text-stone-900 dark:text-stone-100 transition-colors border-b border-stone-200 dark:border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-stone-200 dark:border-stone-800 pb-6">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-rose-900 dark:text-rose-400 mb-2">
              <span className="w-2 h-2 rounded-full bg-rose-600" />
              <span>Proyectos de Referencia para Réplica</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-stone-950 dark:text-stone-50 tracking-tight">
              Playbooks de Aula Validados
            </h2>
            <p className="text-stone-600 dark:text-stone-400 text-sm sm:text-base mt-1 max-w-2xl">
              Iniciativas reales testadas en centros educativos con evidencias científicas y reconocimiento nacional, preparadas paso a paso para ser replicadas en tu colegio o instituto.
            </p>
          </div>

          <div className="text-right hidden md:block">
            <span className="text-xs text-stone-500 font-semibold">Mostrando</span>
            <p className="text-2xl font-black text-rose-950 dark:text-rose-400">
              {filteredProjects.length} proyectos
            </p>
          </div>
        </div>

        {/* Search & Category Filter */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          
          {/* Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none text-xs w-full sm:w-auto">
            {categories.map((cat) => (
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
          </div>

          {/* Quick search input */}
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              placeholder="Buscar en playbooks..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-3 py-2 bg-white dark:bg-stone-900 border border-stone-300 dark:border-stone-700 rounded-full text-stone-900 dark:text-stone-100 placeholder-stone-400 text-xs focus:outline-none focus:border-rose-900 shadow-xs"
            />
          </div>

        </div>

        {/* Projects Grid: Exactly the 2 requested projects + 1 invitation card */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredProjects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onSelect={onSelectProject}
              onReplicate={onReplicateProject}
              onContactAuthor={onContactProject}
            />
          ))}

          {/* Invitation Card for Fellow Awardees */}
          <div className="bg-white/60 dark:bg-stone-900/40 border-2 border-dashed border-stone-300 dark:border-stone-700 rounded-2xl p-6 sm:p-8 flex flex-col justify-between text-center space-y-4 hover:border-rose-900 dark:hover:border-rose-500 transition-colors shadow-xs">
            <div className="space-y-3 my-auto">
              <div className="w-12 h-12 rounded-full bg-rose-100 dark:bg-rose-950/60 text-rose-900 dark:text-rose-300 flex items-center justify-center mx-auto border border-rose-200 dark:border-rose-800">
                <FilePlus className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-extrabold text-stone-950 dark:text-white">
                ¿Eres docente galardonado?
              </h3>
              <p className="text-xs text-stone-600 dark:text-stone-400 max-w-xs mx-auto leading-relaxed">
                Este espacio está reservado para los proyectos de los compañeros del National Teacher Prize y otros certámenes. Comparte tu playbook y ayuda a otros colegios a replicarlo.
              </p>
            </div>

            <button
              onClick={onOpenPublish}
              className="w-full py-3 px-4 rounded-full text-xs font-bold bg-rose-950 hover:bg-rose-900 dark:bg-rose-900 dark:hover:bg-rose-800 text-white shadow-xs active:scale-95 transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              <FilePlus className="w-4 h-4" />
              <span>Publicar Proyecto en la Red</span>
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};
