"use client";

import React from "react";
import { ProjectItem } from "@/data/projects";
import { Award, ArrowUpRight, School, Users, FileText, Zap } from "lucide-react";

interface ProjectCardProps {
  project: ProjectItem;
  onSelect: (project: ProjectItem) => void;
  onReplicate: (project: ProjectItem) => void;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project, onSelect, onReplicate }) => {
  const getScoreBadge = (score: number) => {
    if (score >= 90) return "bg-emerald-50 text-emerald-950 dark:bg-emerald-950/80 dark:text-emerald-200 border-emerald-200 dark:border-emerald-800";
    if (score >= 85) return "bg-amber-50 text-amber-950 dark:bg-amber-950/80 dark:text-amber-200 border-amber-200 dark:border-amber-800";
    return "bg-rose-50 text-rose-950 dark:bg-rose-950/80 dark:text-rose-200 border-rose-200 dark:border-rose-800";
  };

  return (
    <article className="group bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 hover:border-stone-400 dark:hover:border-stone-700 rounded-2xl overflow-hidden transition-all duration-200 flex flex-col justify-between shadow-xs hover:shadow-md">
      
      {/* Top Banner with Image & Badges */}
      <div>
        <div className="relative h-48 sm:h-52 w-full overflow-hidden bg-stone-100 dark:bg-stone-950">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-transparent to-transparent" />

          {/* Award Badge top left */}
          <div className="absolute top-3 left-3 right-3 flex items-start justify-between gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-white/95 dark:bg-stone-900/95 text-stone-900 dark:text-stone-100 border border-stone-200 dark:border-stone-700 backdrop-blur-md shadow-xs truncate max-w-[230px]">
              <Award className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400 shrink-0" />
              <span className="truncate">{project.award.split("·")[0]}</span>
            </span>

            {/* Replicability Badge */}
            <span className={`px-2.5 py-1 rounded-full text-xs font-black border backdrop-blur-md flex items-center gap-1 shadow-xs shrink-0 ${getScoreBadge(project.replicabilityScore)}`}>
              <Zap className="w-3 h-3 fill-current" />
              <span>{project.replicabilityScore}% Réplica</span>
            </span>
          </div>

          {/* Category Pill bottom of image */}
          <div className="absolute bottom-3 left-3">
            <span className={`px-2.5 py-1 rounded-md text-[11px] font-bold border backdrop-blur-md shadow-xs ${project.categoryTheme.bg} ${project.categoryTheme.text} ${project.categoryTheme.border}`}>
              {project.category}
            </span>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-5 sm:p-6 space-y-4">
          
          {/* Author info */}
          <div className="flex items-center gap-3">
            <img
              src={project.author.avatar}
              alt={project.author.name}
              className="w-9 h-9 rounded-full object-cover border border-stone-200 dark:border-stone-700 shadow-xs"
            />
            <div className="text-xs leading-tight">
              <p className="font-extrabold text-stone-900 dark:text-stone-100">{project.author.name}</p>
              <p className="text-stone-500 dark:text-stone-400">{project.author.school} · {project.author.location}</p>
            </div>
          </div>

          {/* Title & Subtitle */}
          <div>
            <h3 className="text-lg sm:text-xl font-extrabold text-stone-950 dark:text-stone-50 group-hover:text-rose-950 dark:group-hover:text-rose-400 transition-colors leading-snug">
              {project.title}
            </h3>
            <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-300 line-clamp-2 mt-1 leading-relaxed">
              {project.subtitle}
            </p>
          </div>

          {/* Replicability Breakdown Box */}
          <div className="bg-stone-50 dark:bg-stone-950 p-3.5 rounded-xl border border-stone-200 dark:border-stone-800 space-y-2 text-xs">
            <div className="flex items-center justify-between">
              <span className="font-bold text-stone-700 dark:text-stone-300">Coste estimado:</span>
              <span className="text-emerald-800 dark:text-emerald-400 font-extrabold">{project.replicability.estimatedBudget}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="font-bold text-stone-700 dark:text-stone-300">Dificultad de aula:</span>
              <span className="text-stone-800 dark:text-stone-200 font-semibold">{project.replicability.difficulty}</span>
            </div>
            <div className="text-[11px] text-stone-600 dark:text-stone-400 pt-1.5 border-t border-stone-200 dark:border-stone-800 leading-snug">
              <strong className="text-stone-800 dark:text-stone-200">Requisito clave:</strong>{" "}
              {project.replicability.externalRequirements[0]?.slice(0, 75)}...
            </div>
          </div>

          {/* Social Proof */}
          <div className="flex items-center gap-4 text-xs text-stone-600 dark:text-stone-400 pt-1">
            <span className="inline-flex items-center gap-1.5 font-semibold text-stone-800 dark:text-stone-200">
              <School className="w-3.5 h-3.5 text-rose-800 dark:text-rose-400" />
              {project.replicationsCount} centros réplica
            </span>
            <span className="inline-flex items-center gap-1.5 font-semibold text-stone-800 dark:text-stone-200">
              <Users className="w-3.5 h-3.5 text-amber-700 dark:text-amber-400" />
              {project.studentsImpacted} alumnos
            </span>
          </div>

        </div>
      </div>

      {/* Card Actions */}
      <div className="p-5 sm:p-6 pt-0 border-t border-stone-100 dark:border-stone-800/80 mt-2 flex items-center gap-2">
        <button
          onClick={() => onSelect(project)}
          className="flex-1 inline-flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-full text-xs font-bold bg-stone-100 hover:bg-stone-200 dark:bg-stone-800 dark:hover:bg-stone-700 text-stone-800 dark:text-stone-200 border border-stone-200 dark:border-stone-700 transition-colors cursor-pointer"
        >
          <FileText className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
          <span>Ver Playbook</span>
        </button>

        <button
          onClick={() => onReplicate(project)}
          className="inline-flex items-center justify-center gap-1.5 py-2.5 px-4 rounded-full text-xs font-bold bg-rose-950 hover:bg-rose-900 dark:bg-rose-900 dark:hover:bg-rose-800 text-white shadow-xs active:scale-95 transition-all cursor-pointer whitespace-nowrap"
        >
          <span>Replicar</span>
          <ArrowUpRight className="w-3.5 h-3.5" />
        </button>
      </div>

    </article>
  );
};
