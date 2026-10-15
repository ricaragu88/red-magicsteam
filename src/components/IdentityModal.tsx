"use client";

import React, { useState } from "react";
import { X, Award, CheckCircle2, UserCheck, School, ArrowRight, Sparkles } from "lucide-react";

export interface UserProfile {
  name: string;
  role: string;
  school: string;
  location: string;
  award: string;
  email: string;
}

interface IdentityModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSaveProfile: (profile: UserProfile) => void;
  initialInviteContext?: string | null;
  currentProfile?: UserProfile | null;
}

export const IdentityModal: React.FC<IdentityModalProps> = ({
  isOpen,
  onClose,
  onSaveProfile,
  initialInviteContext,
  currentProfile,
}) => {
  const [name, setName] = useState(currentProfile?.name || "");
  const [role, setRole] = useState(currentProfile?.role || "Docente Innovador / Coordinador");
  const [school, setSchool] = useState(currentProfile?.school || "");
  const [location, setLocation] = useState(currentProfile?.location || "");
  const [award, setAward] = useState(
    currentProfile?.award || initialInviteContext || "National Teacher Prize"
  );
  const [email, setEmail] = useState(currentProfile?.email || "");

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const profile: UserProfile = {
      name,
      role,
      school,
      location,
      award,
      email,
    };
    onSaveProfile(profile);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      <div className="fixed inset-0 bg-stone-950/70 backdrop-blur-sm" onClick={onClose} />

      <div className="relative w-full max-w-lg bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-3xl shadow-2xl overflow-hidden z-10 text-stone-900 dark:text-stone-100 my-8 transition-colors">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-stone-200 dark:border-stone-800 bg-white/95 dark:bg-stone-900/90">
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-full bg-amber-100 dark:bg-amber-950 text-amber-900 dark:text-amber-300">
              <Award className="w-4 h-4" />
            </span>
            <span className="text-sm font-bold text-stone-950 dark:text-white">
              Identificación de Docente Galardonado
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
        <div className="p-6 sm:p-8 space-y-5">
          
          {/* Welcome Card if coming from invite */}
          {initialInviteContext ? (
            <div className="p-4 rounded-2xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900/60 space-y-1">
              <span className="inline-flex items-center gap-1.5 text-xs font-bold text-rose-950 dark:text-rose-300">
                <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                ¡Bienvenido a la Red Nacional!
              </span>
              <p className="text-xs text-stone-700 dark:text-stone-300 leading-relaxed">
                Has accedido mediante la invitación para el grupo del <strong className="text-stone-950 dark:text-white">{initialInviteContext}</strong>. Identifícate para activar tu distintivo de <strong className="text-rose-950 dark:text-rose-300">Docente Verificado</strong> y poder publicar y colaborar sin esperas.
              </p>
            </div>
          ) : (
            <div className="space-y-1">
              <h3 className="text-lg font-black text-stone-950 dark:text-white">
                Identifícate como Docente de la Red
              </h3>
              <p className="text-xs text-stone-600 dark:text-stone-400">
                Tu perfil aparecerá como autor en los proyectos que publiques y facilitará que otros compañeros te contacten.
              </p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            <div>
              <label className="block font-bold text-stone-700 dark:text-stone-300 mb-1">Tu Nombre y Apellidos:</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Ej: Carmen Valenzuela"
                className="w-full px-3.5 py-2.5 bg-stone-50 dark:bg-stone-950 border border-stone-300 dark:border-stone-700 rounded-xl text-stone-900 dark:text-white text-xs focus:outline-none focus:border-rose-900"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block font-bold text-stone-700 dark:text-stone-300 mb-1">Colegio / Instituto (IES):</label>
                <input
                  type="text"
                  required
                  value={school}
                  onChange={(e) => setSchool(e.target.value)}
                  placeholder="Ej: IES Ramón y Cajal"
                  className="w-full px-3.5 py-2.5 bg-stone-50 dark:bg-stone-950 border border-stone-300 dark:border-stone-700 rounded-xl text-stone-900 dark:text-white text-xs focus:outline-none focus:border-rose-900"
                />
              </div>

              <div>
                <label className="block font-bold text-stone-700 dark:text-stone-300 mb-1">Ciudad / Provincia:</label>
                <input
                  type="text"
                  required
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="Ej: Zaragoza, Aragón"
                  className="w-full px-3.5 py-2.5 bg-stone-50 dark:bg-stone-950 border border-stone-300 dark:border-stone-700 rounded-xl text-stone-900 dark:text-white text-xs focus:outline-none focus:border-rose-900"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block font-bold text-stone-700 dark:text-stone-300 mb-1">Certamen / Reconocimiento:</label>
                <select
                  value={award}
                  onChange={(e) => setAward(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-stone-50 dark:bg-stone-950 border border-stone-300 dark:border-stone-700 rounded-xl text-stone-900 dark:text-white text-xs focus:outline-none focus:border-rose-900"
                >
                  <option>National Teacher Prize</option>
                  <option>Premios Mentes AMI</option>
                  <option>Premios RetoTech Endesa</option>
                  <option>Premios Educa Abanca</option>
                  <option>Premios SIMO Educación</option>
                  <option>Premios Nacionales MEFP</option>
                  <option>Docente Invitado</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-stone-700 dark:text-stone-300 mb-1">Correo Electrónico:</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="carmen@educa.es"
                  className="w-full px-3.5 py-2.5 bg-stone-50 dark:bg-stone-950 border border-stone-300 dark:border-stone-700 rounded-xl text-stone-900 dark:text-white text-xs focus:outline-none focus:border-rose-900"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded-full text-xs font-bold bg-rose-950 hover:bg-rose-900 dark:bg-rose-900 dark:hover:bg-rose-800 text-white shadow-xs active:scale-95 transition-all cursor-pointer flex items-center justify-center gap-2 mt-4"
            >
              <UserCheck className="w-4 h-4" />
              <span>Guardar Perfil y Activar Insignia Verificada</span>
            </button>
          </form>

        </div>

      </div>
    </div>
  );
};
