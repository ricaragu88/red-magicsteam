"use client";

import React, { useState, useEffect } from "react";
import { REAL_PROJECTS_DATA, ProjectItem } from "@/data/projects";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { ProjectsExplorer } from "@/components/ProjectsExplorer";
import { ProjectModal } from "@/components/ProjectModal";
import { ReplicateModal } from "@/components/ReplicateModal";
import { InviteModal } from "@/components/InviteModal";
import { PublishModal } from "@/components/PublishModal";
import { AISynergyEngine } from "@/components/AISynergyEngine";
import { ManifestoSection } from "@/components/ManifestoSection";
import { Footer } from "@/components/Footer";

export default function Home() {
  const [projects, setProjects] = useState<ProjectItem[]>(REAL_PROJECTS_DATA);
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
  const [replicatingProject, setReplicatingProject] = useState<ProjectItem | null>(null);
  const [isInviteOpen, setIsInviteOpen] = useState(false);
  const [isPublishOpen, setIsPublishOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("proyectos");
  
  // Theme state: defaults to light (white background like tecnodivergente.com)
  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    // Check saved theme or preference; default is strictly 'light'
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      setTheme("dark");
      document.documentElement.classList.add("dark");
    } else {
      setTheme("light");
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, []);

  const handleToggleTheme = () => {
    const isCurrentlyDark = document.documentElement.classList.contains("dark");
    const willBeDark = !isCurrentlyDark;
    setTheme(willBeDark ? "dark" : "light");
    localStorage.setItem("theme", willBeDark ? "dark" : "light");
    if (willBeDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  const handleSelectProject = (project: ProjectItem) => {
    setSelectedProject(project);
  };

  const handleReplicateProject = (project: ProjectItem) => {
    setSelectedProject(null);
    setReplicatingProject(project);
  };

  const handleReplicateSuccess = (project: ProjectItem, centerName: string) => {
    setProjects((prev) =>
      prev.map((p) =>
        p.id === project.id
          ? {
              ...p,
              replicationsCount: p.replicationsCount + 1,
              studentsImpacted: p.studentsImpacted + 60,
            }
          : p
      )
    );
  };

  const handleAddProject = (newProject: ProjectItem) => {
    setProjects((prev) => [newProject, ...prev]);
  };

  const handleNavigateSection = (section: string) => {
    setActiveSection(section);
    if (section === "proyectos") {
      document.getElementById("proyectos-section")?.scrollIntoView({ behavior: "smooth" });
    } else if (section === "sinergias") {
      document.getElementById("sinergias-section")?.scrollIntoView({ behavior: "smooth" });
    } else if (section === "manifiesto") {
      document.getElementById("manifiesto-section")?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-stone-950 text-stone-900 dark:text-stone-100 flex flex-col font-sans transition-colors selection:bg-rose-900 selection:text-white">
      {/* Navigation */}
      <Navbar
        onOpenInvite={() => setIsInviteOpen(true)}
        onOpenPublish={() => setIsPublishOpen(true)}
        activeSection={activeSection}
        setActiveSection={handleNavigateSection}
        theme={theme}
        onToggleTheme={handleToggleTheme}
      />

      {/* Main Content */}
      <main className="flex-1">
        {/* Hero */}
        <Hero
          onExploreProjects={() => handleNavigateSection("proyectos")}
          onOpenAISynergy={() => handleNavigateSection("sinergias")}
        />

        {/* Projects Explorer with ONLY the 2 requested projects */}
        <ProjectsExplorer
          projects={projects}
          onSelectProject={handleSelectProject}
          onReplicateProject={handleReplicateProject}
          onOpenPublish={() => setIsPublishOpen(true)}
        />

        {/* Hermanamientos & Sinergias Pedagógicas */}
        <AISynergyEngine />

        {/* Manifesto */}
        <ManifestoSection />
      </main>

      {/* Footer */}
      <Footer />

      {/* Modals */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
        onReplicate={handleReplicateProject}
      />

      <ReplicateModal
        project={replicatingProject}
        onClose={() => setReplicatingProject(null)}
        onSuccess={handleReplicateSuccess}
      />

      <InviteModal
        isOpen={isInviteOpen}
        onClose={() => setIsInviteOpen(false)}
      />

      <PublishModal
        isOpen={isPublishOpen}
        onClose={() => setIsPublishOpen(false)}
        onAddProject={handleAddProject}
      />
    </div>
  );
}
