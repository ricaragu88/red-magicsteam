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
import { MatchModal } from "@/components/MatchModal";
import { EditProjectModal } from "@/components/EditProjectModal";
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
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<ProjectItem | null>(null);
  const [isMatchModalOpen, setIsMatchModalOpen] = useState(false);
  const [matchModalProject, setMatchModalProject] = useState<ProjectItem | null>(null);
  const [inviteContext, setInviteContext] = useState<string | null>(null);

  // Match system state
  const [matchedProjectIds, setMatchedProjectIds] = useState<string[]>([]);

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

    // 3. Load saved matches
    try {
      const savedMatches = localStorage.getItem("red_matched_projects");
      if (savedMatches) {
        setMatchedProjectIds(JSON.parse(savedMatches));
      }
    } catch (e) {
      console.error(e);
    }

    // 4. Load projects (flagship with potential author overrides + community projects)
    try {
      let baseProjects = [...REAL_PROJECTS_DATA];
      const flagshipOverride = localStorage.getItem("red_project_flagship_override");
      if (flagshipOverride) {
        const parsedOverride: ProjectItem = JSON.parse(flagshipOverride);
        baseProjects = baseProjects.map(p => p.id === parsedOverride.id ? parsedOverride : p);
      }

      const savedCommunity = localStorage.getItem("red_community_projects");
      if (savedCommunity) {
        const parsed: ProjectItem[] = JSON.parse(savedCommunity);
        const existingIds = new Set(baseProjects.map(p => p.id));
        const customFiltered = parsed.filter(p => !existingIds.has(p.id));
        setProjects([...customFiltered, ...baseProjects]);
      } else {
        setProjects(baseProjects);
      }
    } catch (e) {
      console.error(e);
    }

    // 5. Detect invitation token (?invitacion=... or ?premio=...)
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const inviteToken = params.get("invitacion") || params.get("premio");
      if (inviteToken) {
        setInviteContext(inviteToken);
        const savedProfile = localStorage.getItem("red_teacher_profile");
        if (!savedProfile) {
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

  const handleSaveProfile = (profile: UserProfile | null) => {
    setCurrentUser(profile);
    if (profile) {
      localStorage.setItem("red_teacher_profile", JSON.stringify(profile));
    } else {
      localStorage.removeItem("red_teacher_profile");
    }
  };

  // Helper to determine if the currently logged-in user is the author of a project
  const checkIsAuthor = (project: ProjectItem, user: UserProfile | null): boolean => {
    if (!user) return false;
    const userEmail = user.email?.trim().toLowerCase();
    const authorEmail = project.author.email?.trim().toLowerCase();
    if (userEmail && authorEmail && userEmail === authorEmail) return true;

    const userName = user.name?.trim().toLowerCase();
    const authorName = project.author.name?.trim().toLowerCase();
    if (userName && authorName && (userName === authorName || authorName.includes(userName) || userName.includes(authorName))) {
      return true;
    }

    // Ricardo Aguado verification on "Más Vida, Menos Redes"
    if (
      project.id === "mas-vida-menos-redes" &&
      (userName?.includes("ricardo") || userEmail?.includes("tecnodivergente"))
    ) {
      return true;
    }

    return false;
  };

  const handleEditProject = (project: ProjectItem) => {
    setEditingProject(project);
    setIsEditOpen(true);
  };

  const handleSaveProjectEdit = (updatedProject: ProjectItem) => {
    setProjects((prev) =>
      prev.map((p) => (p.id === updatedProject.id ? updatedProject : p))
    );

    if (selectedProject?.id === updatedProject.id) {
      setSelectedProject(updatedProject);
    }

    if (updatedProject.id === "mas-vida-menos-redes") {
      try {
        localStorage.setItem("red_project_flagship_override", JSON.stringify(updatedProject));
      } catch (e) {
        console.error(e);
      }
    } else {
      try {
        const savedCommunity = localStorage.getItem("red_community_projects");
        if (savedCommunity) {
          const list: ProjectItem[] = JSON.parse(savedCommunity);
          const updatedList = list.map((p) => (p.id === updatedProject.id ? updatedProject : p));
          localStorage.setItem("red_community_projects", JSON.stringify(updatedList));
        }
      } catch (e) {
        console.error(e);
      }
    }

    alert("¡Tu proyecto ha sido actualizado con éxito! Los cambios y enlaces de descarga están guardados.");
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

  // Toggle Match handler with celebration modal
  const handleToggleMatch = (project: ProjectItem) => {
    const alreadyMatched = matchedProjectIds.includes(project.id);
    let updated: string[];
    
    if (alreadyMatched) {
      updated = matchedProjectIds.filter((id) => id !== project.id);
      setMatchedProjectIds(updated);
    } else {
      updated = [...matchedProjectIds, project.id];
      setMatchedProjectIds(updated);
      setMatchModalProject(project);
      setIsMatchModalOpen(true);
      // Increment local count
      setProjects((prev) =>
        prev.map((p) =>
          p.id === project.id ? { ...p, matchesCount: (p.matchesCount || 0) + 1 } : p
        )
      );
    }

    try {
      localStorage.setItem("red_matched_projects", JSON.stringify(updated));
    } catch (e) {
      console.error(e);
    }
  };

  const handleAddProject = (newProject: ProjectItem) => {
    setProjects((prev) => [newProject, ...prev]);
    try {
      const savedCommunity = localStorage.getItem("red_community_projects");
      const currentList: ProjectItem[] = savedCommunity ? JSON.parse(savedCommunity) : [];
      localStorage.setItem("red_community_projects", JSON.stringify([newProject, ...currentList]));
    } catch (e) {
      console.error(e);
    }
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
        onOpenMatches={() => {
          document.getElementById("proyectos-section")?.scrollIntoView({ behavior: "smooth" });
        }}
        matchedCount={matchedProjectIds.length}
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
          onOpenPublish={() => setIsPublishOpen(true)}
        />

        {/* Projects Explorer with ONLY "Más Vida, Menos Redes" + Community Added Topics */}
        <ProjectsExplorer
          projects={projects}
          onSelectProject={handleSelectProject}
          onReplicateProject={handleReplicateProject}
          onContactProject={handleOpenContactForProject}
          onOpenPublish={() => setIsPublishOpen(true)}
          onToggleMatch={handleToggleMatch}
          matchedProjectIds={matchedProjectIds}
          currentUser={currentUser}
          onEditProject={handleEditProject}
          onOpenIdentity={() => setIsIdentityOpen(true)}
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
        onToggleMatch={handleToggleMatch}
        isMatched={selectedProject ? matchedProjectIds.includes(selectedProject.id) : false}
        isAuthor={selectedProject ? checkIsAuthor(selectedProject, currentUser) : false}
        onEdit={handleEditProject}
        onOpenIdentity={() => setIsIdentityOpen(true)}
      />

      <EditProjectModal
        isOpen={isEditOpen}
        onClose={() => setIsEditOpen(false)}
        project={editingProject}
        onSave={handleSaveProjectEdit}
      />

      <ReplicateModal
        project={replicatingProject}
        onClose={() => setReplicatingProject(null)}
        onSuccess={handleReplicateSuccess}
      />

      <MatchModal
        isOpen={isMatchModalOpen}
        onClose={() => setIsMatchModalOpen(false)}
        project={matchModalProject}
        currentUser={currentUser}
        onOpenIdentity={() => setIsIdentityOpen(true)}
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
