"use client";

import React, { useState, useRef } from "react";
import { ProjectItem, THEMATIC_CATEGORIES, SUGGESTED_TOPIC_TAGS } from "@/data/projects";
import { UserProfile } from "./IdentityModal";
import { X, FilePlus, Sparkles, CheckCircle2, ArrowRight, Zap, Image as ImageIcon, Upload, Trash2, Heart, Check, Video, Play } from "lucide-react";

interface PublishModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddProject: (project: ProjectItem) => void;
  currentUser?: UserProfile | null;
}

export const PublishModal: React.FC<PublishModalProps> = ({
  isOpen,
  onClose,
  onAddProject,
  currentUser,
}) => {
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [category, setCategory] = useState("Bienestar Digital & Convivencia");
  const [selectedTags, setSelectedTags] = useState<string[]>(["Desconexión Digital", "Salud Mental"]);
  const [customTagInput, setCustomTagInput] = useState("");
  
  const [authorName, setAuthorName] = useState(currentUser?.name || "");
  const [school, setSchool] = useState(currentUser?.school || "");
  const [location, setLocation] = useState(currentUser?.location || "España");
  const [authorEmail, setAuthorEmail] = useState(currentUser?.email || "");

  const [targetStage, setTargetStage] = useState("Secundaria (1º a 4º ESO)");
  const [budget, setBudget] = useState("0 € (materiales reciclados o recursos del centro)");
  const [duration, setDuration] = useState("3 a 4 semanas");
  const [difficulty, setDifficulty] = useState<"Baja" | "Media" | "Media-Alta">("Media");
  
  const [summary, setSummary] = useState("");
  const [pedagogicalObjective, setPedagogicalObjective] = useState("");
  const [classroomPrep, setClassroomPrep] = useState("");
  const [wantsCollaboration, setWantsCollaboration] = useState(true);

  // Video URL state
  const [videoUrl, setVideoUrl] = useState("");

  // Image Upload state
  const [imagePreview, setImagePreview] = useState<string>("/images/portadaTecnodivergente.jpg");
  const [imageName, setImageName] = useState<string>("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  // Toggle tag selection
  const handleToggleTag = (tag: string) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter((t) => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  const handleAddCustomTag = (e: React.KeyboardEvent | React.MouseEvent) => {
    if ("key" in e && e.key !== "Enter") return;
    e.preventDefault();
    const trimmed = customTagInput.trim();
    if (trimmed && !selectedTags.includes(trimmed)) {
      setSelectedTags([...selectedTags, trimmed]);
      setCustomTagInput("");
    }
  };

  // Handle local image file selection
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageName(file.name);
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setImagePreview(event.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSelectPreset = (url: string, name: string) => {
    setImagePreview(url);
    setImageName(name);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newProject: ProjectItem = {
      id: `propuesta-${Date.now()}`,
      title,
      subtitle: subtitle || summary.slice(0, 95) + "...",
      category,
      categoryTheme: {
        bg: "bg-rose-50 dark:bg-rose-950/70",
        text: "text-rose-900 dark:text-rose-200",
        border: "border-rose-200 dark:border-rose-800"
      },
      recognition: wantsCollaboration ? "Iniciativa de Aula Abierta a Hermanamiento" : "Proyecto de Innovación Docente",
      author: {
        name: authorName || "Docente Innovador",
        role: "Docente / Coordinador de Proyecto",
        school: school || "Centro Educativo",
        location: location || "España",
        avatar: "/images/docenteRicardo-aguado-1.jpg",
        email: authorEmail || "contacto@red.magicsteam.org"
      },
      collaboratingSchools: [school || "Centro Proponente"],
      image: imagePreview || "/images/portadaTecnodivergente.jpg",
      videoUrl: videoUrl.trim() || undefined,
      replicabilityScore: 88,
      replicationsCount: 1,
      matchesCount: 1,
      studentsImpacted: 60,
      summary,
      pedagogicalObjective: pedagogicalObjective || "Facilitar la transferencia metodológica de aula y fomentar el aprendizaje colaborativo intercentros.",
      replicability: {
        difficulty,
        estimatedBudget: budget,
        targetStages: [targetStage],
        duration,
        externalRequirements: ["Compromiso de aula y familias del centro participante"],
        classroomPrep: classroomPrep ? [classroomPrep] : ["Sesión de sensibilización y presentación de la propuesta"],
        successKeys: ["Dinamizar la participación activa del alumnado y documentar las evidencias del proceso."]
      },
      stepByStep: [
        { phase: "Fase 1", title: "Preparación y Diagnóstico", description: "Diseño de actividades y acuerdo inicial de aula.", duration: "Semana 1" },
        { phase: "Fase 2", title: "Puesta en Práctica", description: "Desarrollo de las sesiones de aula y dinámicas con los alumnos.", duration: "Semanas 2 y 3" },
        { phase: "Fase 3", title: "Evaluación y Difusión", description: "Compartir resultados y valorar la réplica con centros colaboradores.", duration: "Semana final" }
      ],
      impactResults: [
        "Iniciativa abierta a la red para facilitar hermanamientos entre centros educativos.",
        "Guía metodológica transferible a cualquier aula interesada."
      ],
      downloads: [
        { title: "Ficha Resumen del Proyecto (PDF)", type: "PDF", size: "350 KB" }
      ],
      tags: selectedTags.length > 0 ? selectedTags : ["Innovación", "Aula Abierta", "Colaboración"],
      isFlagship: false
    };

    onAddProject(newProject);
    alert("¡Tu proyecto ha sido aportado con éxito a la Red! Ya está disponible para que otros docentes hagan Match.");
    onClose();
  };

  const currentSuggestedTags = SUGGESTED_TOPIC_TAGS[category] || [];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      <div className="fixed inset-0 bg-stone-950/70 backdrop-blur-sm" onClick={onClose} />

      <div className="relative w-full max-w-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-3xl shadow-2xl overflow-hidden z-10 text-stone-900 dark:text-stone-100 my-8 max-h-[92vh] flex flex-col transition-colors">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-stone-200 dark:border-stone-800 bg-white/95 dark:bg-stone-900/90 sticky top-0 z-20">
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-full bg-rose-100 dark:bg-rose-950 text-rose-900 dark:text-rose-300">
              <FilePlus className="w-4 h-4" />
            </span>
            <div>
              <span className="text-sm font-bold text-stone-950 dark:text-white block">
                Aportar Proyecto o Tema a la Red
              </span>
              <span className="text-[11px] text-stone-500">
                Inspirado en la filosofía colaborativa entre docentes
              </span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-stone-100 dark:hover:bg-stone-800 text-stone-500 hover:text-stone-900 dark:hover:text-white cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="overflow-y-auto p-6 sm:p-8 space-y-6 text-xs">
          
          <div className="space-y-1">
            <h3 className="text-base sm:text-lg font-black text-stone-950 dark:text-white">
              Comparte tu experiencia de aula con otros colegios
            </h3>
            <p className="text-stone-600 dark:text-stone-400">
              Cualquier docente puede compartir su propuesta. Otros centros podrán hacer <strong>Match</strong> contigo para hermanar aulas o replicar la idea.
            </p>
          </div>

          {/* Form Fields */}
          <div className="space-y-4">
            
            {/* Title */}
            <div>
              <label className="block font-bold text-stone-700 dark:text-stone-300 mb-1">
                Título del Proyecto / Tema: *
              </label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Ej: Detectives del Clima: Ciencia Ciudadana en el Patio"
                className="w-full px-3.5 py-2.5 bg-stone-50 dark:bg-stone-950 border border-stone-300 dark:border-stone-700 rounded-xl text-stone-900 dark:text-white text-xs focus:outline-none focus:border-rose-900"
              />
            </div>

            {/* Subtitle / Short description */}
            <div>
              <label className="block font-bold text-stone-700 dark:text-stone-300 mb-1">
                Subtítulo o Resumen en 1 frase:
              </label>
              <input
                type="text"
                value={subtitle}
                onChange={(e) => setSubtitle(e.target.value)}
                placeholder="Ej: Alumnos de 3º ESO monitorizan la temperatura y crean sombras vegetales para el patio"
                className="w-full px-3.5 py-2.5 bg-stone-50 dark:bg-stone-950 border border-stone-300 dark:border-stone-700 rounded-xl text-stone-900 dark:text-white text-xs focus:outline-none focus:border-rose-900"
              />
            </div>

            {/* Thematic Category */}
            <div>
              <label className="block font-bold text-stone-700 dark:text-stone-300 mb-1">
                Ámbito Temático / Categoría:
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-stone-50 dark:bg-stone-950 border border-stone-300 dark:border-stone-700 rounded-xl text-stone-900 dark:text-white text-xs focus:outline-none focus:border-rose-900"
              >
                {THEMATIC_CATEGORIES.filter(c => c.id !== "all").map(cat => (
                  <option key={cat.id} value={cat.id}>{cat.name}</option>
                ))}
              </select>
            </div>

            {/* Suggested Tags Pill Selector (Style inspired by atencion-educativa) */}
            <div className="space-y-1.5 p-3.5 rounded-2xl bg-stone-50 dark:bg-stone-950 border border-stone-200 dark:border-stone-800">
              <label className="block font-bold text-stone-700 dark:text-stone-300 text-[11px]">
                Etiquetas Temáticas y Competencias (haz clic para activar/desactivar):
              </label>
              
              <div className="flex flex-wrap gap-1.5 pt-1">
                {currentSuggestedTags.map((tag) => {
                  const isSelected = selectedTags.includes(tag);
                  return (
                    <button
                      key={tag}
                      type="button"
                      onClick={() => handleToggleTag(tag)}
                      className={`px-2.5 py-1 rounded-full text-[11px] font-semibold transition-all cursor-pointer flex items-center gap-1 ${
                        isSelected
                          ? "bg-rose-950 text-white dark:bg-rose-900 shadow-xs"
                          : "bg-white dark:bg-stone-900 text-stone-600 dark:text-stone-400 border border-stone-300 dark:border-stone-700 hover:border-stone-400"
                      }`}
                    >
                      {isSelected && <Check className="w-3 h-3 text-rose-300" />}
                      <span>{tag}</span>
                    </button>
                  );
                })}
              </div>

              {/* Add custom tag */}
              <div className="flex items-center gap-2 pt-2">
                <input
                  type="text"
                  value={customTagInput}
                  onChange={(e) => setCustomTagInput(e.target.value)}
                  onKeyDown={handleAddCustomTag}
                  placeholder="Añadir otra etiqueta..."
                  className="px-3 py-1.5 bg-white dark:bg-stone-900 border border-stone-300 dark:border-stone-700 rounded-lg text-[11px] text-stone-800 dark:text-stone-200 flex-1 focus:outline-none focus:border-rose-900"
                />
                <button
                  type="button"
                  onClick={handleAddCustomTag}
                  className="px-3 py-1.5 bg-stone-200 hover:bg-stone-300 dark:bg-stone-800 dark:hover:bg-stone-700 rounded-lg text-[11px] font-bold text-stone-800 dark:text-stone-200 cursor-pointer"
                >
                  Añadir
                </button>
              </div>
            </div>

            {/* Description / Summary */}
            <div>
              <label className="block font-bold text-stone-700 dark:text-stone-300 mb-1">
                Descripción Detallada y Necesidad Educativa que Resuelve: *
              </label>
              <textarea
                rows={4}
                required
                value={summary}
                onChange={(e) => setSummary(e.target.value)}
                placeholder="Explica en qué consiste la actividad, cómo se organizan los alumnos, qué rol tienen las familias o la comunidad y qué resultados habéis observado..."
                className="w-full px-3.5 py-2.5 bg-stone-50 dark:bg-stone-950 border border-stone-300 dark:border-stone-700 rounded-xl text-stone-900 dark:text-white text-xs leading-relaxed focus:outline-none focus:border-rose-900"
              />
            </div>

            {/* Practical replication details */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block font-bold text-stone-700 dark:text-stone-300 mb-1">Etapa Educativa:</label>
                <select
                  value={targetStage}
                  onChange={(e) => setTargetStage(e.target.value)}
                  className="w-full px-3 py-2 bg-stone-50 dark:bg-stone-950 border border-stone-300 dark:border-stone-700 rounded-xl text-stone-900 dark:text-white text-xs focus:outline-none"
                >
                  <option>Infantil y 1º-2º Primaria</option>
                  <option>3º a 6º Primaria</option>
                  <option>Secundaria (1º a 4º ESO)</option>
                  <option>Bachillerato</option>
                  <option>Formación Profesional</option>
                  <option>Educación Especial & Inclusión</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-stone-700 dark:text-stone-300 mb-1">Presupuesto Estimado:</label>
                <input
                  type="text"
                  value={budget}
                  onChange={(e) => setBudget(e.target.value)}
                  placeholder="Ej: 0 € o Bajo (< 50 €)"
                  className="w-full px-3 py-2 bg-stone-50 dark:bg-stone-950 border border-stone-300 dark:border-stone-700 rounded-xl text-stone-900 dark:text-white text-xs focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-bold text-stone-700 dark:text-stone-300 mb-1">Dificultad de Aula:</label>
                <select
                  value={difficulty}
                  onChange={(e) => setDifficulty(e.target.value as any)}
                  className="w-full px-3 py-2 bg-stone-50 dark:bg-stone-950 border border-stone-300 dark:border-stone-700 rounded-xl text-stone-900 dark:text-white text-xs focus:outline-none"
                >
                  <option value="Baja">Baja (fácil implantación)</option>
                  <option value="Media">Media (requiere coordinación)</option>
                  <option value="Media-Alta">Media-Alta (varios agentes)</option>
                </select>
              </div>
            </div>

            {/* Image Uploader & Preview */}
            <div className="space-y-2">
              <label className="block font-bold text-stone-700 dark:text-stone-300">
                Fotografía de Portada del Proyecto:
              </label>
              
              <div className="flex flex-col sm:flex-row items-center gap-4 p-4 rounded-2xl bg-stone-50 dark:bg-stone-950 border border-stone-200 dark:border-stone-800">
                <div className="relative w-36 h-24 rounded-xl overflow-hidden bg-stone-200 dark:bg-stone-800 shrink-0 border border-stone-300 dark:border-stone-700 shadow-xs">
                  {imagePreview ? (
                    <img
                      src={imagePreview}
                      alt="Vista previa"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center text-stone-400 text-[10px]">
                      <ImageIcon className="w-6 h-6 mb-1" />
                      <span>Sin imagen</span>
                    </div>
                  )}
                </div>

                <div className="space-y-2 flex-1 w-full text-center sm:text-left">
                  <input
                    type="file"
                    ref={fileInputRef}
                    accept="image/png, image/jpeg, image/webp"
                    onChange={handleFileChange}
                    className="hidden"
                  />

                  <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="px-4 py-2 rounded-full font-bold text-xs bg-stone-900 hover:bg-stone-800 dark:bg-stone-100 dark:hover:bg-white text-white dark:text-stone-900 flex items-center gap-1.5 shadow-xs cursor-pointer"
                    >
                      <Upload className="w-3.5 h-3.5" />
                      <span>Subir Foto de mi Dispositivo</span>
                    </button>

                    {imageName && (
                      <span className="text-[11px] text-stone-500 font-medium truncate max-w-[180px]">
                        {imageName}
                      </span>
                    )}
                  </div>

                  <div className="text-[11px] text-stone-500">
                    <span>O fotos del archivo: </span>
                    <button
                      type="button"
                      onClick={() => handleSelectPreset("/images/masvidamenosredes.jpg", "Convivencia y Aula")}
                      className="text-rose-950 dark:text-rose-400 font-bold hover:underline cursor-pointer"
                    >
                      Convivencia
                    </button>
                    <span className="mx-1">·</span>
                    <button
                      type="button"
                      onClick={() => handleSelectPreset("/images/kit-lanuza.jpg", "STEAM & Kits")}
                      className="text-rose-950 dark:text-rose-400 font-bold hover:underline cursor-pointer"
                    >
                      Tecnología
                    </button>
                    <span className="mx-1">·</span>
                    <button
                      type="button"
                      onClick={() => handleSelectPreset("/images/reciclaje.jpg", "Sostenibilidad")}
                      className="text-rose-950 dark:text-rose-400 font-bold hover:underline cursor-pointer"
                    >
                      Medio Ambiente
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Video Link */}
            <div className="space-y-1">
              <label className="block font-bold text-stone-700 dark:text-stone-300 flex items-center gap-1.5">
                <Video className="w-3.5 h-3.5 text-rose-900 dark:text-rose-400" />
                <span>Vídeo del Proyecto (YouTube o Vimeo, opcional):</span>
              </label>
              <input
                type="url"
                value={videoUrl}
                onChange={(e) => setVideoUrl(e.target.value)}
                placeholder="https://www.youtube.com/watch?v=..."
                className="w-full px-3.5 py-2.5 bg-stone-50 dark:bg-stone-950 border border-stone-300 dark:border-stone-700 rounded-xl text-stone-900 dark:text-white text-xs focus:outline-none focus:border-rose-900"
              />
              <p className="text-[11px] text-stone-500">
                Si tu proyecto cuenta con un reportaje, vídeo explicativo o testimonios en YouTube/Vimeo, los docentes podrán verlo directamente en su ficha.
              </p>
            </div>

            {/* Author info */}
            <div className="p-4 rounded-2xl bg-stone-50 dark:bg-stone-950 border border-stone-200 dark:border-stone-800 space-y-3">
              <span className="text-[11px] font-bold text-stone-700 dark:text-stone-300 uppercase tracking-wider block">
                Datos del Docente y Centro Proponente:
              </span>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-stone-500 mb-1">Tu Nombre y Apellidos: *</label>
                  <input
                    type="text"
                    required
                    value={authorName}
                    onChange={(e) => setAuthorName(e.target.value)}
                    placeholder="Ej: Carmen Valenzuela"
                    className="w-full px-3 py-2 bg-white dark:bg-stone-900 border border-stone-300 dark:border-stone-700 rounded-xl text-stone-900 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-stone-500 mb-1">Colegio / Instituto (IES): *</label>
                  <input
                    type="text"
                    required
                    value={school}
                    onChange={(e) => setSchool(e.target.value)}
                    placeholder="Ej: IES Ramón y Cajal"
                    className="w-full px-3 py-2 bg-white dark:bg-stone-900 border border-stone-300 dark:border-stone-700 rounded-xl text-stone-900 dark:text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-stone-500 mb-1">Ciudad / Provincia:</label>
                  <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="Ej: Zaragoza, Aragón"
                    className="w-full px-3 py-2 bg-white dark:bg-stone-900 border border-stone-300 dark:border-stone-700 rounded-xl text-stone-900 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-stone-500 mb-1">Correo de Contacto Profesional: *</label>
                  <input
                    type="email"
                    required
                    value={authorEmail}
                    onChange={(e) => setAuthorEmail(e.target.value)}
                    placeholder="carmen@instituto.es"
                    className="w-full px-3 py-2 bg-white dark:bg-stone-900 border border-stone-300 dark:border-stone-700 rounded-xl text-stone-900 dark:text-white"
                  />
                </div>
              </div>

              {/* Collaboration Toggle */}
              <label className="flex items-center gap-2 pt-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={wantsCollaboration}
                  onChange={(e) => setWantsCollaboration(e.target.checked)}
                  className="rounded text-rose-950 focus:ring-rose-900 w-4 h-4 cursor-pointer"
                />
                <span className="font-bold text-stone-800 dark:text-stone-200">
                  Busco centros interesados para hacer <strong>Match</strong>, hermanar aulas y compartir réplicas.
                </span>
              </label>
            </div>

          </div>

          {/* Sticky Form Footer */}
          <div className="pt-4 border-t border-stone-200 dark:border-stone-800 flex items-center justify-end gap-3 sticky bottom-0 bg-white/95 dark:bg-stone-900/95 py-2">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 rounded-full font-bold bg-stone-100 hover:bg-stone-200 dark:bg-stone-800 dark:hover:bg-stone-700 text-stone-700 dark:text-stone-300 cursor-pointer"
            >
              Cancelar
            </button>

            <button
              type="submit"
              className="px-6 py-2.5 rounded-full font-bold bg-rose-950 hover:bg-rose-900 text-white shadow-xs active:scale-95 transition-all cursor-pointer flex items-center gap-2"
            >
              <FilePlus className="w-4 h-4" />
              <span>Aportar Proyecto a la Red</span>
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};
