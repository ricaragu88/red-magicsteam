"use client";

import React, { useState, useRef } from "react";
import { ProjectItem } from "@/data/projects";
import { UserProfile } from "./IdentityModal";
import { X, FilePlus, Sparkles, CheckCircle2, ArrowRight, Zap, Image as ImageIcon, Upload, Trash2 } from "lucide-react";

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
  const [award, setAward] = useState(currentUser?.award || "National Teacher Prize 2026");
  const [authorName, setAuthorName] = useState(currentUser?.name || "");
  const [school, setSchool] = useState(currentUser?.school ? `${currentUser.school} (${currentUser.location})` : "");
  const [budget, setBudget] = useState("0 € (materiales reciclados o cesión)");
  const [duration, setDuration] = useState("4 semanas");
  const [externalReqs, setExternalReqs] = useState("");
  const [classroomPrep, setClassroomPrep] = useState("");
  const [summary, setSummary] = useState("");

  // Image Upload state
  const [imagePreview, setImagePreview] = useState<string>("/images/portadaTecnodivergente.jpg");
  const [imageName, setImageName] = useState<string>("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [score, setScore] = useState<number | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);

  if (!isOpen) return null;

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

  const handleCalculateScore = () => {
    setIsCalculating(true);
    setTimeout(() => {
      setIsCalculating(false);
      let calculated = 85;
      if (budget.includes("0 €") || budget.includes("Bajo")) calculated += 6;
      if (classroomPrep.length > 25) calculated += 4;
      setScore(Math.min(98, calculated));
    }, 500);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newProject: ProjectItem = {
      id: title.toLowerCase().replace(/\s+/g, "-"),
      title,
      subtitle,
      category,
      categoryTheme: {
        bg: "bg-rose-50 dark:bg-rose-950/70",
        text: "text-rose-900 dark:text-rose-200",
        border: "border-rose-200 dark:border-rose-800"
      },
      award,
      author: {
        name: authorName || "Docente de la Red",
        role: "Docente Galardonado",
        school: school || "Centro Educativo",
        location: "España",
        avatar: "/images/docenteRicardo-aguado-1.jpg",
        teacherPrizeEdition: currentUser?.award || "Docente Galardonado"
      },
      image: imagePreview || "/images/portadaTecnodivergente.jpg",
      replicabilityScore: score || 88,
      replicationsCount: 1,
      studentsImpacted: 90,
      summary,
      pedagogicalObjective: "Transferir innovación contrastada con metodologías activas y servicio a la comunidad.",
      replicability: {
        difficulty: "Media",
        estimatedBudget: budget,
        targetStages: ["Primaria", "Secundaria"],
        duration,
        externalRequirements: externalReqs ? [externalReqs] : ["Acuerdo voluntario de centro y familias"],
        classroomPrep: classroomPrep ? [classroomPrep] : ["2 sesiones de sensibilización previa con el alumnado"],
        successKeys: ["Involucrar activamente al equipo directivo y familias desde el inicio."]
      },
      stepByStep: [
        { phase: "Fase 1", title: "Diagnóstico y Preparación", description: "Sensibilización de alumnos y pacto de aula.", duration: "Semana 1" },
        { phase: "Fase 2", title: "Puesta en Marcha", description: "Ejecución de actividades y dinámicas colaborativas.", duration: "Semanas 2 y 3" },
        { phase: "Fase 3", title: "Evaluación y Difusión", description: "Medición de impacto y conclusiones comunitarias.", duration: "Semana 4" }
      ],
      impactResults: [
        "Metodología validada con alta satisfacción del alumnado y familias.",
        "Generación de evidencias pedagógicas transferibles a otros colegios."
      ],
      downloads: [
        { title: "Guía de Replicabilidad Rápida (PDF)", type: "Guía", size: "1.2 MB" },
        { title: "Rúbrica de Evaluación Curricular", type: "Rúbrica", size: "250 KB" }
      ],
      tags: ["Innovación", "Replicable", "Comunidad"]
    };

    onAddProject(newProject);
    alert("¡Proyecto publicado con éxito en la Red!");
    onClose();
  };

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
            <span className="text-sm font-bold text-stone-950 dark:text-white">
              Publicar Nuevo Playbook Replicable
            </span>
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
            <h3 className="text-lg font-black text-stone-950 dark:text-white">
              Comparte tu proyecto premiado con otros docentes
            </h3>
            <p className="text-stone-600 dark:text-stone-400">
              Rellena los aspectos prácticos y añade una fotografía para que otros centros puedan conocerlo y replicarlo.
            </p>
          </div>

          {/* Image Uploader & Preview */}
          <div className="space-y-2">
            <label className="block font-bold text-stone-700 dark:text-stone-300">
              Fotografía de Portada del Proyecto:
            </label>
            
            <div className="flex flex-col sm:flex-row items-center gap-4 p-4 rounded-2xl bg-stone-50 dark:bg-stone-950 border border-stone-200 dark:border-stone-800">
              {/* Preview Box */}
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

              {/* Upload Controls */}
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

                {/* Preset Options */}
                <div className="text-[11px] text-stone-500">
                  <span>O usa una foto del archivo: </span>
                  <button
                    type="button"
                    onClick={() => handleSelectPreset("/images/masvidamenosredes.jpg", "Móviles y Aula")}
                    className="text-rose-950 dark:text-rose-400 font-bold hover:underline ml-1 cursor-pointer"
                  >
                    Aula y Convivencia
                  </button>
                  <span className="mx-1">·</span>
                  <button
                    type="button"
                    onClick={() => handleSelectPreset("/images/kit-lanuza.jpg", "Kit Robótica")}
                    className="text-rose-950 dark:text-rose-400 font-bold hover:underline cursor-pointer"
                  >
                    STEAM & Kits
                  </button>
                  <span className="mx-1">·</span>
                  <button
                    type="button"
                    onClick={() => handleSelectPreset("/images/reciclaje.jpg", "Reciclaje")}
                    className="text-rose-950 dark:text-rose-400 font-bold hover:underline cursor-pointer"
                  >
                    Medioambiente
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Form Fields */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block font-bold text-stone-700 dark:text-stone-300 mb-1">Título del Proyecto:</label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Ej: Radio Escolar Inclusiva"
                className="w-full px-3.5 py-2.5 bg-stone-50 dark:bg-stone-950 border border-stone-300 dark:border-stone-700 rounded-xl text-stone-900 dark:text-white text-xs focus:outline-none focus:border-rose-900"
              />
            </div>

            <div>
              <label className="block font-bold text-stone-700 dark:text-stone-300 mb-1">Subtítulo de 1 línea:</label>
              <input
                type="text"
                required
                value={subtitle}
                onChange={(e) => setSubtitle(e.target.value)}
                placeholder="Ej: Podcast colaborativo intergeneracional"
                className="w-full px-3.5 py-2.5 bg-stone-50 dark:bg-stone-950 border border-stone-300 dark:border-stone-700 rounded-xl text-stone-900 dark:text-white text-xs focus:outline-none focus:border-rose-900"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block font-bold text-stone-700 dark:text-stone-300 mb-1">Certamen o Premio:</label>
              <input
                type="text"
                required
                value={award}
                onChange={(e) => setAward(e.target.value)}
                placeholder="Ej: National Teacher Prize 2026"
                className="w-full px-3.5 py-2.5 bg-stone-50 dark:bg-stone-950 border border-stone-300 dark:border-stone-700 rounded-xl text-stone-900 dark:text-white text-xs focus:outline-none focus:border-rose-900"
              />
            </div>

            <div>
              <label className="block font-bold text-stone-700 dark:text-stone-300 mb-1">Categoría Pedagógica:</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-stone-50 dark:bg-stone-950 border border-stone-300 dark:border-stone-700 rounded-xl text-stone-900 dark:text-white text-xs focus:outline-none focus:border-rose-900"
              >
                <option>Bienestar Digital & Convivencia</option>
                <option>Inclusión Social & ApS Hospitalario</option>
                <option>Smart Cities, Inclusión & Sensores IoT</option>
                <option>Inteligencia Artificial Práctica & Medioambiente</option>
                <option>Software Libre & Soberanía Tecnológica Docente</option>
                <option>Ciencia Ciudadana & Hardware Abierto</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block font-bold text-stone-700 dark:text-stone-300 mb-1">Tu Nombre y Apellidos:</label>
              <input
                type="text"
                required
                value={authorName}
                onChange={(e) => setAuthorName(e.target.value)}
                placeholder="Ej: Carmen Valenzuela"
                className="w-full px-3.5 py-2.5 bg-stone-50 dark:bg-stone-950 border border-stone-300 dark:border-stone-700 rounded-xl text-stone-900 dark:text-white text-xs focus:outline-none focus:border-rose-900"
              />
            </div>

            <div>
              <label className="block font-bold text-stone-700 dark:text-stone-300 mb-1">Colegio / IES y Localidad:</label>
              <input
                type="text"
                required
                value={school}
                onChange={(e) => setSchool(e.target.value)}
                placeholder="Ej: IES Ramón y Cajal (Madrid)"
                className="w-full px-3.5 py-2.5 bg-stone-50 dark:bg-stone-950 border border-stone-300 dark:border-stone-700 rounded-xl text-stone-900 dark:text-white text-xs focus:outline-none focus:border-rose-900"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block font-bold text-stone-700 dark:text-stone-300 mb-1">Presupuesto Estimado por Centro:</label>
              <input
                type="text"
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
                placeholder="Ej: 0 € o Menos de 40 €"
                className="w-full px-3.5 py-2.5 bg-stone-50 dark:bg-stone-950 border border-stone-300 dark:border-stone-700 rounded-xl text-stone-900 dark:text-white text-xs focus:outline-none focus:border-rose-900"
              />
            </div>

            <div>
              <label className="block font-bold text-stone-700 dark:text-stone-300 mb-1">Duración Recomendada:</label>
              <input
                type="text"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                placeholder="Ej: 4 semanas (1 sesión/semana)"
                className="w-full px-3.5 py-2.5 bg-stone-50 dark:bg-stone-950 border border-stone-300 dark:border-stone-700 rounded-xl text-stone-900 dark:text-white text-xs focus:outline-none focus:border-rose-900"
              />
            </div>
          </div>

          <div>
            <label className="block font-bold text-stone-700 dark:text-stone-300 mb-1">
              Requisitos Externos Clave (Operadora, Ayuntamiento, Hospital, etc.):
            </label>
            <input
              type="text"
              value={externalReqs}
              onChange={(e) => setExternalReqs(e.target.value)}
              placeholder="Ej: Contactar con una operadora local o solicitar permiso al hospital"
              className="w-full px-3.5 py-2.5 bg-stone-50 dark:bg-stone-950 border border-stone-300 dark:border-stone-700 rounded-xl text-stone-900 dark:text-white text-xs focus:outline-none focus:border-rose-900"
            />
          </div>

          <div>
            <label className="block font-bold text-stone-700 dark:text-stone-300 mb-1">
              Preparación Previa en Aula con los Alumnos:
            </label>
            <input
              type="text"
              value={classroomPrep}
              onChange={(e) => setClassroomPrep(e.target.value)}
              placeholder="Ej: 2 semanas de debate sobre tiempo de pantallas y redacción de diarios"
              className="w-full px-3.5 py-2.5 bg-stone-50 dark:bg-stone-950 border border-stone-300 dark:border-stone-700 rounded-xl text-stone-900 dark:text-white text-xs focus:outline-none focus:border-rose-900"
            />
          </div>

          <div>
            <label className="block font-bold text-stone-700 dark:text-stone-300 mb-1">
              Descripción del Proyecto y Cómo Funciona:
            </label>
            <textarea
              rows={3}
              required
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
              placeholder="Explica qué hicieron los estudiantes, cómo se organizó el trabajo y por qué los resultados fueron tan positivos..."
              className="w-full px-3.5 py-2.5 bg-stone-50 dark:bg-stone-950 border border-stone-300 dark:border-stone-700 rounded-xl text-stone-900 dark:text-white text-xs focus:outline-none focus:border-rose-900"
            />
          </div>

          {/* Replicability Evaluator */}
          <div className="bg-stone-50 dark:bg-stone-950 p-4 rounded-2xl border border-stone-200 dark:border-stone-800 flex items-center justify-between gap-3">
            <div>
              <span className="font-bold text-stone-900 dark:text-white block flex items-center gap-1.5">
                <Zap className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                Cálculo de Replicabilidad
              </span>
              <p className="text-[11px] text-stone-500">
                Calcula el porcentaje orientativo de transferencia según coste y requisitos.
              </p>
            </div>

            <div className="flex items-center gap-3">
              {score && (
                <span className="px-3 py-1 rounded-full text-xs font-black bg-emerald-100 dark:bg-emerald-950 text-emerald-900 dark:text-emerald-200 border border-emerald-300 dark:border-emerald-800">
                  {score}% Replicabilidad
                </span>
              )}

              <button
                type="button"
                onClick={handleCalculateScore}
                disabled={isCalculating}
                className="px-4 py-2 rounded-full text-xs font-bold bg-stone-900 hover:bg-stone-800 dark:bg-stone-100 dark:hover:bg-white text-white dark:text-stone-900 cursor-pointer disabled:opacity-50 shadow-xs"
              >
                {isCalculating ? "Calculando..." : "Calcular Índice"}
              </button>
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full py-3.5 rounded-full text-sm font-bold bg-rose-950 hover:bg-rose-900 dark:bg-rose-900 dark:hover:bg-rose-800 text-white shadow-xs active:scale-95 transition-all cursor-pointer flex items-center justify-center gap-2"
          >
            <span>Publicar Playbook en la Red</span>
            <ArrowRight className="w-4 h-4" />
          </button>

        </form>

      </div>
    </div>
  );
};
