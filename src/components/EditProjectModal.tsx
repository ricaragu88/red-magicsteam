"use client";

import React, { useState, useEffect } from "react";
import { ProjectItem, ProjectDownload, THEMATIC_CATEGORIES } from "@/data/projects";
import {
  X,
  Edit3,
  CheckCircle2,
  Trash2,
  Plus,
  FileText,
  Video,
  Sparkles,
  School,
  ExternalLink,
  Save,
  HelpCircle
} from "lucide-react";

interface EditProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  project: ProjectItem | null;
  onSave: (updatedProject: ProjectItem) => void;
}

export const EditProjectModal: React.FC<EditProjectModalProps> = ({
  isOpen,
  onClose,
  project,
  onSave,
}) => {
  const [formData, setFormData] = useState<ProjectItem | null>(null);
  
  // State for adding a new document download
  const [newDocTitle, setNewDocTitle] = useState("");
  const [newDocType, setNewDocType] = useState<"PDF" | "Guía" | "Rúbrica" | "Plantilla" | "Código" | "ZIP">("PDF");
  const [newDocUrl, setNewDocUrl] = useState("");
  const [newDocSize, setNewDocSize] = useState("PDF");

  // State for adding a new impact result
  const [newImpactResult, setNewImpactResult] = useState("");

  // Sync state when project changes or modal opens
  useEffect(() => {
    if (project) {
      setFormData(JSON.parse(JSON.stringify(project)));
    }
  }, [project, isOpen]);

  if (!isOpen || !formData) return null;

  const handleFieldChange = (field: keyof ProjectItem, value: any) => {
    setFormData((prev) => (prev ? { ...prev, [field]: value } : null));
  };

  const handleReplicabilityChange = (field: string, value: any) => {
    setFormData((prev) => {
      if (!prev) return null;
      return {
        ...prev,
        replicability: {
          ...prev.replicability,
          [field]: value,
        },
      };
    });
  };

  // Remove a download document
  const handleRemoveDownload = (indexToRemove: number) => {
    setFormData((prev) => {
      if (!prev) return null;
      return {
        ...prev,
        downloads: prev.downloads.filter((_, idx) => idx !== indexToRemove),
      };
    });
  };

  // Add a new download document
  const handleAddDownload = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newDocTitle.trim()) return;

    const newDownload: ProjectDownload = {
      title: newDocTitle.trim(),
      type: newDocType,
      size: newDocSize.trim() || "Descarga",
      url: newDocUrl.trim() || undefined,
    };

    setFormData((prev) => {
      if (!prev) return null;
      return {
        ...prev,
        downloads: [...prev.downloads, newDownload],
      };
    });

    setNewDocTitle("");
    setNewDocUrl("");
    setNewDocSize("PDF");
  };

  // Remove an impact result
  const handleRemoveImpact = (indexToRemove: number) => {
    setFormData((prev) => {
      if (!prev) return null;
      return {
        ...prev,
        impactResults: prev.impactResults.filter((_, idx) => idx !== indexToRemove),
      };
    });
  };

  // Add an impact result
  const handleAddImpact = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newImpactResult.trim()) return;

    setFormData((prev) => {
      if (!prev) return null;
      return {
        ...prev,
        impactResults: [...prev.impactResults, newImpactResult.trim()],
      };
    });

    setNewImpactResult("");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData) return;
    onSave(formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div className="fixed inset-0 bg-stone-950/75 backdrop-blur-sm" onClick={onClose} />

      {/* Modal Window */}
      <div className="relative w-full max-w-3xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-3xl shadow-2xl overflow-hidden z-10 text-stone-900 dark:text-stone-100 my-8 max-h-[92vh] flex flex-col transition-colors">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-stone-200 dark:border-stone-800 bg-white/95 dark:bg-stone-900/95 sticky top-0 z-20 backdrop-blur-sm">
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-full bg-rose-100 dark:bg-rose-950 text-rose-900 dark:text-rose-300">
              <Edit3 className="w-4 h-4" />
            </span>
            <div>
              <span className="text-sm font-bold text-stone-950 dark:text-white block">
                Editor del Autor: {formData.title}
              </span>
              <span className="text-[11px] text-stone-500">
                Modifica los datos de tu proyecto, enlaces de vídeo y gestiona los documentos descargables
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
          
          {/* Section 1: General Info */}
          <div className="space-y-4">
            <div className="border-b border-stone-200 dark:border-stone-800 pb-2">
              <h3 className="text-sm font-black text-stone-950 dark:text-white flex items-center gap-2">
                <span>1. Información Principal del Proyecto</span>
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="sm:col-span-2">
                <label className="block font-bold text-stone-700 dark:text-stone-300 mb-1">
                  Título del Proyecto:
                </label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => handleFieldChange("title", e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-stone-50 dark:bg-stone-950 border border-stone-300 dark:border-stone-700 rounded-xl text-stone-900 dark:text-white text-xs focus:outline-none focus:border-rose-900 font-semibold"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block font-bold text-stone-700 dark:text-stone-300 mb-1">
                  Subtítulo / Lema de Aula:
                </label>
                <input
                  type="text"
                  required
                  value={formData.subtitle}
                  onChange={(e) => handleFieldChange("subtitle", e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-stone-50 dark:bg-stone-950 border border-stone-300 dark:border-stone-700 rounded-xl text-stone-900 dark:text-white text-xs focus:outline-none focus:border-rose-900"
                />
              </div>

              <div>
                <label className="block font-bold text-stone-700 dark:text-stone-300 mb-1">
                  Categoría Temática:
                </label>
                <select
                  value={formData.category}
                  onChange={(e) => handleFieldChange("category", e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-stone-50 dark:bg-stone-950 border border-stone-300 dark:border-stone-700 rounded-xl text-stone-900 dark:text-white text-xs focus:outline-none focus:border-rose-900 font-medium"
                >
                  {THEMATIC_CATEGORIES.filter((c) => c.id !== "all").map((cat) => (
                    <option key={cat.id} value={cat.name}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-bold text-stone-700 dark:text-stone-300 mb-1 flex items-center gap-1.5">
                  <Video className="w-3.5 h-3.5 text-rose-600" />
                  <span>Enlace a Vídeo (YouTube):</span>
                </label>
                <input
                  type="url"
                  placeholder="https://www.youtube.com/watch?v=..."
                  value={formData.videoUrl || ""}
                  onChange={(e) => handleFieldChange("videoUrl", e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-stone-50 dark:bg-stone-950 border border-stone-300 dark:border-stone-700 rounded-xl text-stone-900 dark:text-white text-xs focus:outline-none focus:border-rose-900"
                />
              </div>
            </div>

            <div>
              <label className="block font-bold text-stone-700 dark:text-stone-300 mb-1">
                Resumen de la Experiencia:
              </label>
              <textarea
                rows={4}
                required
                value={formData.summary}
                onChange={(e) => handleFieldChange("summary", e.target.value)}
                className="w-full px-3.5 py-2.5 bg-stone-50 dark:bg-stone-950 border border-stone-300 dark:border-stone-700 rounded-xl text-stone-900 dark:text-white text-xs focus:outline-none focus:border-rose-900 leading-relaxed"
              />
            </div>

            <div>
              <label className="block font-bold text-stone-700 dark:text-stone-300 mb-1">
                Objetivo Pedagógico Central:
              </label>
              <textarea
                rows={2}
                required
                value={formData.pedagogicalObjective}
                onChange={(e) => handleFieldChange("pedagogicalObjective", e.target.value)}
                className="w-full px-3.5 py-2.5 bg-stone-50 dark:bg-stone-950 border border-stone-300 dark:border-stone-700 rounded-xl text-stone-900 dark:text-white text-xs focus:outline-none focus:border-rose-900 leading-relaxed"
              />
            </div>

            {formData.pedagogicalConcept !== undefined && (
              <div>
                <label className="block font-bold text-stone-700 dark:text-stone-300 mb-1">
                  Concepto Pedagógico Clave (ej. Innovación por sustracción):
                </label>
                <input
                  type="text"
                  value={formData.pedagogicalConcept || ""}
                  onChange={(e) => handleFieldChange("pedagogicalConcept", e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-stone-50 dark:bg-stone-950 border border-stone-300 dark:border-stone-700 rounded-xl text-stone-900 dark:text-white text-xs focus:outline-none focus:border-rose-900"
                />
              </div>
            )}
          </div>

          {/* Section 2: Replicability & Classroom Prep */}
          <div className="space-y-4">
            <div className="border-b border-stone-200 dark:border-stone-800 pb-2">
              <h3 className="text-sm font-black text-stone-950 dark:text-white">
                2. Factores de Replicabilidad en el Aula
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block font-bold text-stone-700 dark:text-stone-300 mb-1">Dificultad:</label>
                <select
                  value={formData.replicability.difficulty}
                  onChange={(e) => handleReplicabilityChange("difficulty", e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-stone-50 dark:bg-stone-950 border border-stone-300 dark:border-stone-700 rounded-xl text-stone-900 dark:text-white text-xs focus:outline-none focus:border-rose-900"
                >
                  <option value="Baja">Baja</option>
                  <option value="Media">Media</option>
                  <option value="Media-Alta">Media-Alta</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-stone-700 dark:text-stone-300 mb-1">Presupuesto Estimado:</label>
                <input
                  type="text"
                  value={formData.replicability.estimatedBudget}
                  onChange={(e) => handleReplicabilityChange("estimatedBudget", e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-stone-50 dark:bg-stone-950 border border-stone-300 dark:border-stone-700 rounded-xl text-stone-900 dark:text-white text-xs focus:outline-none focus:border-rose-900"
                />
              </div>

              <div>
                <label className="block font-bold text-stone-700 dark:text-stone-300 mb-1">Duración:</label>
                <input
                  type="text"
                  value={formData.replicability.duration}
                  onChange={(e) => handleReplicabilityChange("duration", e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-stone-50 dark:bg-stone-950 border border-stone-300 dark:border-stone-700 rounded-xl text-stone-900 dark:text-white text-xs focus:outline-none focus:border-rose-900"
                />
              </div>
            </div>
          </div>

          {/* Section 3: Official Downloads (Direct management of documents) */}
          <div className="space-y-4">
            <div className="border-b border-stone-200 dark:border-stone-800 pb-2 flex items-center justify-between">
              <div>
                <h3 className="text-sm font-black text-stone-950 dark:text-white flex items-center gap-1.5">
                  <FileText className="w-4 h-4 text-rose-800 dark:text-rose-400" />
                  <span>3. Documentos y Recursos Descargables</span>
                </h3>
                <p className="text-[11px] text-stone-500">
                  Gestiona los documentos reales disponibles para descarga. Elimina documentos inexistentes o añade nuevos enlaces.
                </p>
              </div>
            </div>

            {/* Existing Documents List */}
            <div className="space-y-2">
              {formData.downloads.length === 0 ? (
                <div className="p-4 rounded-xl bg-stone-50 dark:bg-stone-950 border border-dashed border-stone-300 dark:border-stone-800 text-center text-stone-500">
                  No hay documentos descargables adjuntos actualmente.
                </div>
              ) : (
                formData.downloads.map((doc, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between gap-3 p-3 rounded-xl bg-stone-50 dark:bg-stone-950 border border-stone-200 dark:border-stone-800"
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <span className="p-1.5 rounded-lg bg-rose-100 dark:bg-rose-950 text-rose-900 dark:text-rose-300 shrink-0 font-bold text-[10px]">
                        {doc.type}
                      </span>
                      <div className="min-w-0">
                        <p className="font-bold text-stone-900 dark:text-stone-100 truncate">{doc.title}</p>
                        <p className="text-[11px] text-stone-500">
                          {doc.size} {doc.url ? `· Enlace: ${doc.url}` : "· (Sin URL directa)"}
                        </p>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => handleRemoveDownload(idx)}
                      className="p-2 rounded-lg text-rose-700 hover:bg-rose-100 dark:hover:bg-rose-950/60 transition-colors cursor-pointer shrink-0"
                      title="Eliminar este documento de la lista"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))
              )}
            </div>

            {/* Add New Document Subform */}
            <div className="p-4 rounded-2xl bg-stone-50 dark:bg-stone-950 border border-stone-200 dark:border-stone-800 space-y-3">
              <span className="font-bold text-stone-800 dark:text-stone-200 block text-xs">
                Añadir Nuevo Documento Descargable:
              </span>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                <div className="sm:col-span-2">
                  <input
                    type="text"
                    placeholder="Título del documento (ej. Guía Metodológica en PDF)"
                    value={newDocTitle}
                    onChange={(e) => setNewDocTitle(e.target.value)}
                    className="w-full px-3 py-2 bg-white dark:bg-stone-900 border border-stone-300 dark:border-stone-700 rounded-xl text-stone-900 dark:text-white text-xs focus:outline-none focus:border-rose-900"
                  />
                </div>

                <div>
                  <select
                    value={newDocType}
                    onChange={(e) => setNewDocType(e.target.value as any)}
                    className="w-full px-3 py-2 bg-white dark:bg-stone-900 border border-stone-300 dark:border-stone-700 rounded-xl text-stone-900 dark:text-white text-xs focus:outline-none focus:border-rose-900"
                  >
                    <option value="PDF">PDF</option>
                    <option value="Guía">Guía</option>
                    <option value="Rúbrica">Rúbrica</option>
                    <option value="Plantilla">Plantilla</option>
                    <option value="Código">Código</option>
                    <option value="ZIP">ZIP</option>
                  </select>
                </div>

                <div className="sm:col-span-2">
                  <input
                    type="text"
                    placeholder="URL del archivo (ej. /recursos/documento.pdf o enlace web)"
                    value={newDocUrl}
                    onChange={(e) => setNewDocUrl(e.target.value)}
                    className="w-full px-3 py-2 bg-white dark:bg-stone-900 border border-stone-300 dark:border-stone-700 rounded-xl text-stone-900 dark:text-white text-xs focus:outline-none focus:border-rose-900"
                  />
                </div>

                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Tamaño (ej. 350 KB)"
                    value={newDocSize}
                    onChange={(e) => setNewDocSize(e.target.value)}
                    className="w-full px-3 py-2 bg-white dark:bg-stone-900 border border-stone-300 dark:border-stone-700 rounded-xl text-stone-900 dark:text-white text-xs focus:outline-none focus:border-rose-900"
                  />
                  <button
                    type="button"
                    onClick={handleAddDownload}
                    className="px-3.5 py-2 rounded-xl bg-stone-800 hover:bg-stone-700 text-white font-bold text-xs flex items-center gap-1 cursor-pointer shrink-0"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Añadir</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Section 4: Impact Results & Scientific Validation */}
          <div className="space-y-4">
            <div className="border-b border-stone-200 dark:border-stone-800 pb-2">
              <h3 className="text-sm font-black text-stone-950 dark:text-white">
                4. Evidencias de Impacto y Validación Científica
              </h3>
            </div>

            {formData.scientificValidation !== undefined && (
              <div>
                <label className="block font-bold text-stone-700 dark:text-stone-300 mb-1">
                  Validación Científica / Publicación en Revistas:
                </label>
                <input
                  type="text"
                  value={formData.scientificValidation || ""}
                  onChange={(e) => handleFieldChange("scientificValidation", e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-stone-50 dark:bg-stone-950 border border-stone-300 dark:border-stone-700 rounded-xl text-stone-900 dark:text-white text-xs focus:outline-none focus:border-rose-900"
                />
              </div>
            )}

            {/* Impact Results list */}
            <div className="space-y-2">
              <label className="block font-bold text-stone-700 dark:text-stone-300">
                Puntos de Evidencia / Resultados Medidos:
              </label>

              {formData.impactResults.map((result, idx) => (
                <div
                  key={idx}
                  className="flex items-start justify-between gap-2 p-2.5 rounded-xl bg-stone-50 dark:bg-stone-950 border border-stone-200 dark:border-stone-800 text-xs"
                >
                  <span className="text-stone-800 dark:text-stone-200 leading-relaxed">• {result}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveImpact(idx)}
                    className="p-1 text-rose-700 hover:bg-rose-100 dark:hover:bg-rose-950/60 rounded cursor-pointer shrink-0"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}

              <div className="flex gap-2 pt-1">
                <input
                  type="text"
                  placeholder="Añadir nueva evidencia empírica..."
                  value={newImpactResult}
                  onChange={(e) => setNewImpactResult(e.target.value)}
                  className="flex-1 px-3 py-2 bg-stone-50 dark:bg-stone-950 border border-stone-300 dark:border-stone-700 rounded-xl text-stone-900 dark:text-white text-xs focus:outline-none focus:border-rose-900"
                />
                <button
                  type="button"
                  onClick={handleAddImpact}
                  className="px-4 py-2 rounded-xl bg-stone-800 hover:bg-stone-700 text-white font-bold text-xs flex items-center gap-1 cursor-pointer shrink-0"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Añadir</span>
                </button>
              </div>
            </div>
          </div>

          {/* Sticky Bottom Actions */}
          <div className="pt-4 border-t border-stone-200 dark:border-stone-800 flex items-center justify-end gap-3 sticky bottom-0 bg-white/95 dark:bg-stone-900/95 py-2">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 rounded-full border border-stone-300 dark:border-stone-700 text-stone-700 dark:text-stone-300 font-bold hover:bg-stone-100 dark:hover:bg-stone-800 cursor-pointer"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 rounded-full bg-rose-950 hover:bg-rose-900 text-white font-bold flex items-center gap-2 cursor-pointer shadow-xs active:scale-95 transition-all"
            >
              <Save className="w-4 h-4" />
              <span>Guardar Cambios del Proyecto</span>
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};
