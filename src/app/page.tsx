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
import { ContactModal } from "@/components/ContactModal";
import { IdentityModal, UserProfile } from "@/components/IdentityModal";
import { AISynergyEngine } from "@/components/AISynergyEngine";
import { ManifestoSection } from "@/components/ManifestoSection";
import { Footer } from "@/components/Footer";

export default function Home() {
  const [projects, setProjects] = useState<ProjectItem[]>(REAL_PROJECTS_DATA);
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
  const [replicatingProject, setReplicatingProject] = useState<ProjectItem | null>(null);
  
  // Modals state
  const [isInviteOpen, setIsInviteOpen] = useState(false);
  const [isPublishOpen, setIsPublishOpen] = useState(false);
  const [isIdentityOpen, setIsIdentityOpen] = useState(false);
  const [inviteContext, setInviteContext] = useState<string | null>(null);

  // User identity state (teacher credentials)
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(null);

  // Contact modal state
  const [contactState, setContactState] = useState<{
    isOpen: boolean;
    authorName: string;
    authorEmail: string;
    school: string;
    projectTitle: string;
    initialMessage?: string;
  }>({
    isOpen: false,
    authorName: "Ricardo Aguado",
    authorEmail: "info@tecnodivergente.es",
    school: "Colegio Juan de Lanuza",
    projectTitle: "",
    initialMessage: "",
  });

  const [activeSection, setActiveSection] = useState("proyectos");
  
  // Theme state: defaults to light (pure white background matching tecnodivergente.com)
  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    // 1. Theme configuration
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      setTheme("dark");
      document.documentElement.classList.add("dark");
    } else {
      setTheme("light");
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }

    // 2. Load saved teacher profile from local storage
    try {
      const savedProfile = localStorage.getItem("red_teacher_profile");
      if (savedProfile) {
        setCurrentUser(JSON.parse(savedProfile));
      }
    } catch (e) {
      console.error(e);
    }

    // 3. Detect invitation token (?invitacion=... or ?premio=...)
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const inviteToken = params.get("invitacion") || params.get("premio");
      if (inviteToken) {
        setInviteContext(inviteToken);
        const savedProfile = localStorage.getItem("red_teacher_profile");
        if (!savedProfile) {
          // Auto-prompt onboarding modal so the invited teacher can identify themselves
          setIsIdentityOpen(true);
        }
      }
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

  const handleSaveProfile = (profile: UserProfile) => {
    setCurrentUser(profile);
    localStorage.setItem("red_teacher_profile", JSON.stringify(profile));
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

  const handleOpenContactForProject = (project: ProjectItem) => {
    setContactState({
      isOpen: true,
      authorName: project.author.name,
      authorEmail: project.author.email || "info@tecnodivergente.es",
      school: project.author.school,
      projectTitle: project.title,
    });
  };

  const handleOpenContactCustom = (target: {
    authorName: string;
    authorEmail: string;
    school: string;
    projectTitle: string;
    initialMessage?: string;
  }) => {
    setContactState({
      isOpen: true,
      authorName: target.authorName,
      authorEmail: target.authorEmail,
      school: target.school,
      projectTitle: target.projectTitle,
      initialMessage: target.initialMessage,
    });
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
        onOpenIdentity={() => setIsIdentityOpen(true)}
        currentUser={currentUser}
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
          onContactProject={handleOpenContactForProject}
          onOpenPublish={() => setIsPublishOpen(true)}
        />

        {/* Hermanamientos & Sinergias Pedagógicas */}
        <AISynergyEngine onContactAuthor={handleOpenContactCustom} />

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
        onContactAuthor={handleOpenContactForProject}
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
        currentUser={currentUser}
      />

      <IdentityModal
        isOpen={isIdentityOpen}
        onClose={() => setIsIdentityOpen(false)}
        onSaveProfile={handleSaveProfile}
        initialInviteContext={inviteContext}
        currentProfile={currentUser}
      />

      <ContactModal
        isOpen={contactState.isOpen}
        onClose={() => setContactState((prev) => ({ ...prev, isOpen: false }))}
        targetAuthorName={contactState.authorName}
        targetAuthorEmail={contactState.authorEmail}
        targetSchool={contactState.school}
        targetProjectTitle={contactState.projectTitle}
        initialMessage={contactState.initialMessage}
        currentUser={currentUser}
      />
    </div>
  );
}
