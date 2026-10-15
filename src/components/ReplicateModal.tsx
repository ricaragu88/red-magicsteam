"use client";

import React, { useState } from "react";
import { ProjectItem } from "@/data/projects";
import { X, CheckCircle2, ArrowRight, School, Download } from "lucide-react";

interface ReplicateModalProps {
  project: ProjectItem | null;
  onClose: () => void;
  onSuccess: (project: ProjectItem, centerName: string) => void;
}

export const ReplicateModal: React.FC<ReplicateModalProps> = ({
  project,
  onClose,
  onSuccess,
}) => {
  const [teacherName, setTeacherName] = useState("");
  const [email, setEmail] = useState("");
  const [schoolName, setSchoolName] = useState("");
  const [city, setCity] = useState("");
  const [studentsCount, setStudentsCount] = useState("60");
  const [comments, setComments] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!project) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    onSuccess(project, schoolName);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      <div className="fixed inset-0 bg-stone-950/70 backdrop-blur-sm" onClick={onClose} />

      <div className="relative w-full max-w-xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-3xl shadow-2xl overflow-hidden z-10 text-stone-900 dark:text-stone-100 my-8 transition-colors">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-stone-200 dark:border-stone-800 bg-white/95 dark:bg-stone-900/90">
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-full bg-rose-100 dark:bg-rose-950 text-rose-900 dark:text-rose-300">
              <School className="w-4 h-4" />
            </span>
            <span className="text-sm font-bold text-stone-950 dark:text-white">
              Registro de Réplica en Centro Escolar
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-stone-100 dark:hover:bg-stone-800 text-stone-500 hover:text-stone-900 dark:hover:text-white cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 sm:p-8 space-y-6">
          {!isSubmitted ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <span className="text-xs font-bold text-rose-900 dark:text-rose-400 uppercase tracking-wider">
                  Proyecto seleccionado:
                </span>
                <h3 className="text-xl font-black text-stone-950 dark:text-white">{project.title}</h3>
                <p className="text-xs text-stone-500 dark:text-stone-400">
                  Creado por {project.author.name} ({project.author.school})
                </p>
              </div>

              <div className="bg-stone-50 dark:bg-stone-950 p-4 rounded-2xl border border-stone-200 dark:border-stone-800 text-xs text-stone-600 dark:text-stone-300 space-y-1">
                <p className="font-bold text-stone-950 dark:text-stone-100">
                  ¿Por qué registrar tu réplica?
                </p>
                <p>
                  Nos permite medir el impacto de la red en toda España, enviarte las guías completas actualizadas y ponerte en contacto directo con {project.author.name} para resolver dudas durante el proceso.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 mb-1">
                    Tu Nombre y Apellidos:
                  </label>
                  <input
                    type="text"
                    required
                    value={teacherName}
                    onChange={(e) => setTeacherName(e.target.value)}
                    placeholder="Ej: Laura Martínez"
                    className="w-full px-3.5 py-2.5 bg-stone-50 dark:bg-stone-950 border border-stone-300 dark:border-stone-700 rounded-xl text-sm text-stone-900 dark:text-white focus:outline-none focus:border-rose-900"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 mb-1">
                    Tu Correo Docente:
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="profe@educa.es"
                    className="w-full px-3.5 py-2.5 bg-stone-50 dark:bg-stone-950 border border-stone-300 dark:border-stone-700 rounded-xl text-sm text-stone-900 dark:text-white focus:outline-none focus:border-rose-900"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 mb-1">
                    Nombre del Colegio / IES:
                  </label>
                  <input
                    type="text"
                    required
                    value={schoolName}
                    onChange={(e) => setSchoolName(e.target.value)}
                    placeholder="IES Sierra de Guadarrama"
                    className="w-full px-3.5 py-2.5 bg-stone-50 dark:bg-stone-950 border border-stone-300 dark:border-stone-700 rounded-xl text-sm text-stone-900 dark:text-white focus:outline-none focus:border-rose-900"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 mb-1">
                    Localidad y Provincia:
                  </label>
                  <input
                    type="text"
                    required
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="Zaragoza, Aragón"
                    className="w-full px-3.5 py-2.5 bg-stone-50 dark:bg-stone-950 border border-stone-300 dark:border-stone-700 rounded-xl text-sm text-stone-900 dark:text-white focus:outline-none focus:border-rose-900"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 mb-1">
                  Alumnos Estimados que Participarán:
                </label>
                <input
                  type="number"
                  min="5"
                  value={studentsCount}
                  onChange={(e) => setStudentsCount(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-stone-50 dark:bg-stone-950 border border-stone-300 dark:border-stone-700 rounded-xl text-sm text-stone-900 dark:text-white focus:outline-none focus:border-rose-900"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 mb-1">
                  Mensaje o Consulta para el Autor (Opcional):
                </label>
                <textarea
                  rows={2}
                  value={comments}
                  onChange={(e) => setComments(e.target.value)}
                  placeholder="Ej: ¿Qué consejos nos das para el primer contacto con las familias?"
                  className="w-full px-3.5 py-2.5 bg-stone-50 dark:bg-stone-950 border border-stone-300 dark:border-stone-700 rounded-xl text-sm text-stone-900 dark:text-white focus:outline-none focus:border-rose-900"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-full text-sm font-bold bg-rose-950 hover:bg-rose-900 dark:bg-rose-900 dark:hover:bg-rose-800 text-white shadow-xs active:scale-95 transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                <span>Registrar Réplica y Obtener Pack Completo</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          ) : (
            <div className="text-center py-6 space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 flex items-center justify-center mx-auto border border-emerald-200 dark:border-emerald-800">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-black text-stone-950 dark:text-white">¡Réplica Registrada con Éxito!</h3>
              <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-300 max-w-md mx-auto leading-relaxed">
                Hemos registrado a <strong className="text-stone-950 dark:text-white">{schoolName || "tu centro"}</strong> como centro replicador oficial de{" "}
                <strong className="text-rose-950 dark:text-rose-400">{project.title}</strong>. El autor ({project.author.name}) ha recibido tu notificación.
              </p>

              <div className="bg-stone-50 dark:bg-stone-950 p-4 rounded-2xl border border-stone-200 dark:border-stone-800 text-left space-y-2 text-xs">
                <span className="font-bold text-stone-900 dark:text-white block">Tu kit de materiales está listo:</span>
                <p className="text-stone-600 dark:text-stone-300">
                  Incluye las guías de replicabilidad, cartas a familias, dossieres y rúbricas.
                </p>
                <button
                  onClick={() => alert("Descargando pack de réplica...")}
                  className="w-full py-2.5 rounded-full bg-stone-900 hover:bg-stone-800 dark:bg-stone-100 dark:hover:bg-white text-white dark:text-stone-900 font-bold flex items-center justify-center gap-2 cursor-pointer mt-2 shadow-xs"
                >
                  <Download className="w-4 h-4" />
                  <span>Descargar Pack de Replicabilidad</span>
                </button>
              </div>

              <button
                onClick={onClose}
                className="px-6 py-2 rounded-full text-xs font-bold bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 cursor-pointer"
              >
                Volver a la Red
              </button>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
