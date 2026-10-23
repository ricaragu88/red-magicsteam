"use client";

import React, { useState, useEffect } from "react";
import { X, Award, CheckCircle2, UserCheck, School, ArrowRight, Sparkles, LogOut, User, Mail, MapPin } from "lucide-react";

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
  onSaveProfile: (profile: UserProfile | null) => void;
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
    currentProfile?.award || initialInviteContext || "Docente Innovador"
  );
  const [email, setEmail] = useState(currentProfile?.email || "");

  useEffect(() => {
    if (currentProfile) {
      setName(currentProfile.name);
      setRole(currentProfile.role);
      setSchool(currentProfile.school);
      setLocation(currentProfile.location);
      setAward(currentProfile.award);
      setEmail(currentProfile.email);
    } else {
      setName("");
      setSchool("");
      setLocation("");
      setEmail("");
    }
  }, [currentProfile, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const profile: UserProfile = {
      name: name.trim(),
      role: role.trim() || "Docente",
      school: school.trim(),
      location: location.trim(),
      award: award.trim() || "Docente",
      email: email.trim(),
    };
    onSaveProfile(profile);
    onClose();
  };

  const handleQuickLoginRicardo = () => {
    const ricardoProfile: UserProfile = {
      name: "Ricardo Aguado",
      role: "Docente de Tecnología y Coordinador de Innovación",
      school: "Colegio Juan de Lanuza",
      location: "Zaragoza, Aragón",
      award: "Colegio Juan de Lanuza",
      email: "info@tecnodivergente.es",
    };
    onSaveProfile(ricardoProfile);
    onClose();
  };

  const handleLogout = () => {
    onSaveProfile(null);
    setName("");
    setSchool("");
    setLocation("");
    setEmail("");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      <div className="fixed inset-0 bg-stone-950/70 backdrop-blur-sm" onClick={onClose} />

      <div className="relative w-full max-w-lg bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-3xl shadow-2xl overflow-hidden z-10 text-stone-900 dark:text-stone-100 my-8 transition-colors">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-stone-200 dark:border-stone-800 bg-white/95 dark:bg-stone-900/90">
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-full bg-rose-100 dark:bg-rose-950 text-rose-900 dark:text-rose-300">
              <UserCheck className="w-4 h-4" />
            </span>
            <span className="text-sm font-bold text-stone-950 dark:text-white">
              Identificación y Acceso Docente
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
          
          {/* Active Session Info if already logged in */}
          {currentProfile ? (
            <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900/60 flex items-center justify-between gap-3">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-full bg-emerald-100 dark:bg-emerald-900/80 flex items-center justify-center text-emerald-800 dark:text-emerald-200 font-bold text-sm">
                  {currentProfile.name.charAt(0)}
                </div>
                <div>
                  <p className="font-extrabold text-stone-900 dark:text-stone-100 text-xs sm:text-sm">
                    {currentProfile.name}
                  </p>
                  <p className="text-[11px] text-stone-500 dark:text-stone-400">
                    {currentProfile.school} · {currentProfile.email}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={handleLogout}
                className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-bold text-rose-900 dark:text-rose-300 bg-rose-100 hover:bg-rose-200 dark:bg-rose-950 dark:hover:bg-rose-900 transition-colors cursor-pointer shrink-0"
                title="Cerrar sesión actual"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Cerrar Sesión</span>
              </button>
            </div>
          ) : (
            /* 1-Click Quick Login for Ricardo Aguado */
            <div className="p-4 rounded-2xl bg-gradient-to-r from-rose-50 to-amber-50 dark:from-rose-950/40 dark:to-amber-950/40 border border-rose-200 dark:border-rose-900/60 space-y-2">
              <div className="flex items-center justify-between gap-2">
                <span className="inline-flex items-center gap-1.5 text-xs font-bold text-rose-950 dark:text-rose-300">
                  <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                  Acceso Rápido para el Autor
                </span>
                <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded-full bg-rose-100 dark:bg-rose-900 text-rose-900 dark:text-rose-200 font-bold">
                  1-Clic
                </span>
              </div>
              <p className="text-xs text-stone-700 dark:text-stone-300 leading-relaxed">
                ¿Eres <strong>Ricardo Aguado</strong>? Pulsa para identificarte al instante con tu perfil docente y activar los permisos de edición sobre <em>Más Vida, Menos Redes</em>.
              </p>
              <button
                type="button"
                onClick={handleQuickLoginRicardo}
                className="w-full py-2.5 px-4 rounded-xl text-xs font-bold bg-rose-950 hover:bg-rose-900 text-white shadow-xs cursor-pointer flex items-center justify-center gap-2 active:scale-95 transition-all"
              >
                <UserCheck className="w-4 h-4 text-emerald-400" />
                <span>Entrar como Ricardo Aguado (Colegio Juan de Lanuza)</span>
              </button>
            </div>
          )}

          <div className="space-y-1">
            <h3 className="text-sm font-black text-stone-950 dark:text-white">
              {currentProfile ? "Actualizar mis Datos Docentes" : "O identifícate con tus datos de centro:"}
            </h3>
            <p className="text-xs text-stone-600 dark:text-stone-400">
              Tu nombre y centro aparecerán como autor de los proyectos que aportes o te permitirán editar tus publicaciones.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-3.5 text-xs">
            <div>
              <label className="block font-bold text-stone-700 dark:text-stone-300 mb-1 flex items-center gap-1.5">
                <User className="w-3.5 h-3.5 text-rose-700" />
                <span>Tu Nombre y Apellidos:</span>
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Ej: Carmen Valenzuela"
                className="w-full px-3.5 py-2.5 bg-stone-50 dark:bg-stone-950 border border-stone-300 dark:border-stone-700 rounded-xl text-stone-900 dark:text-white text-xs focus:outline-none focus:border-rose-900 font-medium"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block font-bold text-stone-700 dark:text-stone-300 mb-1 flex items-center gap-1.5">
                  <School className="w-3.5 h-3.5 text-rose-700" />
                  <span>Centro Educativo (Colegio / IES):</span>
                </label>
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
                <label className="block font-bold text-stone-700 dark:text-stone-300 mb-1 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-rose-700" />
                  <span>Ciudad / Provincia:</span>
                </label>
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

            <div>
              <label className="block font-bold text-stone-700 dark:text-stone-300 mb-1 flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-rose-700" />
                <span>Correo Electrónico (para recibir propuestas de Match):</span>
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="tu.correo@educa.es"
                className="w-full px-3.5 py-2.5 bg-stone-50 dark:bg-stone-950 border border-stone-300 dark:border-stone-700 rounded-xl text-stone-900 dark:text-white text-xs focus:outline-none focus:border-rose-900 font-medium"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded-full text-xs font-bold bg-rose-950 hover:bg-rose-900 dark:bg-rose-900 dark:hover:bg-rose-800 text-white shadow-xs active:scale-95 transition-all cursor-pointer flex items-center justify-center gap-2 mt-4"
            >
              <UserCheck className="w-4 h-4" />
              <span>{currentProfile ? "Actualizar Mi Perfil Docente" : "Guardar Perfil y Activar Acceso"}</span>
            </button>
          </form>

        </div>

      </div>
    </div>
  );
};
