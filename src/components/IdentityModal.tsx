"use client";

import React, { useState, useEffect } from "react";
import {
  X,
  Award,
  CheckCircle2,
  UserCheck,
  School,
  ArrowRight,
  Sparkles,
  LogOut,
  User,
  Mail,
  MapPin,
  Lock,
  KeyRound,
  ShieldCheck,
  AlertCircle
} from "lucide-react";

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

  // Author PIN verification state
  const [pinInput, setPinInput] = useState("");
  const [pinError, setPinError] = useState("");
  const [showPinPrompt, setShowPinPrompt] = useState(false);
  const [customPinInput, setCustomPinInput] = useState("");
  const [pinChangeMsg, setPinChangeMsg] = useState("");

  const getStoredPin = () => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("red_author_pin") || "2026";
    }
    return "2026";
  };

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
    setPinInput("");
    setPinError("");
    setShowPinPrompt(false);
  }, [currentProfile, isOpen]);

  if (!isOpen) return null;

  const handleVerifyAuthorPin = (e: React.FormEvent) => {
    e.preventDefault();
    const correctPin = getStoredPin();

    if (pinInput.trim() === correctPin) {
      const ricardoProfile: UserProfile = {
        name: "Ricardo Aguado",
        role: "Docente de Tecnología y Coordinador de Innovación",
        school: "Colegio Juan de Lanuza",
        location: "Zaragoza, Aragón",
        award: "Colegio Juan de Lanuza",
        email: "info@tecnodivergente.es",
      };
      onSaveProfile(ricardoProfile);
      setPinError("");
      setShowPinPrompt(false);
      onClose();
    } else {
      setPinError("PIN incorrecto. Introduce la clave correcta de autor.");
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const isClaimingRicardo =
      (name.trim().toLowerCase().includes("ricardo") && name.trim().toLowerCase().includes("aguado")) ||
      email.trim().toLowerCase() === "info@tecnodivergente.es";

    // If attempting to save as Ricardo Aguado without being already verified
    if (isClaimingRicardo && (!currentProfile || !currentProfile.email.includes("tecnodivergente.es"))) {
      if (pinInput.trim() !== getStoredPin()) {
        setShowPinPrompt(true);
        setPinError("Para identificarte como autor de Más Vida, Menos Redes debes introducir el PIN de seguridad.");
        return;
      }
    }

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

  const handleLogout = () => {
    onSaveProfile(null);
    setName("");
    setSchool("");
    setLocation("");
    setEmail("");
    setPinInput("");
    setPinError("");
    onClose();
  };

  const handleChangePin = (e: React.FormEvent) => {
    e.preventDefault();
    if (customPinInput.trim().length >= 4) {
      localStorage.setItem("red_author_pin", customPinInput.trim());
      setPinChangeMsg("¡PIN actualizado con éxito!");
      setCustomPinInput("");
      setTimeout(() => setPinChangeMsg(""), 3000);
    } else {
      setPinChangeMsg("El PIN debe tener al menos 4 caracteres.");
    }
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
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900/60 flex items-center justify-between gap-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-10 h-10 rounded-full bg-emerald-100 dark:bg-emerald-900/80 flex items-center justify-center text-emerald-800 dark:text-emerald-200 font-bold text-sm">
                    {currentProfile.name.charAt(0)}
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <p className="font-extrabold text-stone-900 dark:text-stone-100 text-xs sm:text-sm">
                        {currentProfile.name}
                      </p>
                      {currentProfile.email === "info@tecnodivergente.es" && (
                        <span className="text-[10px] bg-amber-100 dark:bg-amber-950 text-amber-900 dark:text-amber-200 font-bold px-1.5 py-0.5 rounded-full border border-amber-300 dark:border-amber-700">
                          Administrador
                        </span>
                      )}
                    </div>
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
                  <span>Salir</span>
                </button>
              </div>

              {/* Author PIN customization for Ricardo */}
              {currentProfile.email === "info@tecnodivergente.es" && (
                <div className="p-3.5 rounded-2xl bg-stone-50 dark:bg-stone-950 border border-stone-200 dark:border-stone-800 space-y-2 text-xs">
                  <div className="flex items-center gap-1.5 text-stone-700 dark:text-stone-300 font-bold">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Seguridad: Cambiar PIN de Administrador</span>
                  </div>
                  <form onSubmit={handleChangePin} className="flex gap-2">
                    <input
                      type="password"
                      placeholder="Nuevo PIN (ej. 2026)"
                      value={customPinInput}
                      onChange={(e) => setCustomPinInput(e.target.value)}
                      className="flex-1 px-3 py-1.5 bg-white dark:bg-stone-900 border border-stone-300 dark:border-stone-700 rounded-xl text-xs focus:outline-none focus:border-rose-900"
                    />
                    <button
                      type="submit"
                      className="px-3.5 py-1.5 rounded-xl bg-stone-800 hover:bg-stone-700 text-white font-bold text-xs cursor-pointer"
                    >
                      Actualizar
                    </button>
                  </form>
                  {pinChangeMsg && (
                    <p className="text-[11px] text-emerald-700 dark:text-emerald-400 font-semibold">{pinChangeMsg}</p>
                  )}
                </div>
              )}
            </div>
          ) : (
            /* Protected Admin Login Box with PIN */
            <div className="p-4 rounded-2xl bg-gradient-to-r from-rose-50 to-amber-50 dark:from-rose-950/40 dark:to-amber-950/40 border border-rose-200 dark:border-rose-900/60 space-y-3">
              <div className="flex items-center justify-between gap-2">
                <span className="inline-flex items-center gap-1.5 text-xs font-bold text-rose-950 dark:text-rose-300">
                  <Lock className="w-3.5 h-3.5 text-amber-600" />
                  Acceso de Administración
                </span>
                <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded-full bg-amber-100 dark:bg-amber-950 text-amber-900 dark:text-amber-300 font-bold border border-amber-300 dark:border-amber-800">
                  PIN Requerido
                </span>
              </div>

              <p className="text-xs text-stone-700 dark:text-stone-300 leading-relaxed">
                Introduce el <strong>PIN de Administrador</strong> para acceder a las herramientas de gestión y edición del proyecto de referencia.
              </p>

              {showPinPrompt ? (
                <form onSubmit={handleVerifyAuthorPin} className="space-y-2">
                  <div className="flex gap-2">
                    <div className="relative flex-1">
                      <KeyRound className="w-3.5 h-3.5 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                      <input
                        type="password"
                        required
                        autoFocus
                        placeholder="Introduce el PIN (por defecto: 2026)"
                        value={pinInput}
                        onChange={(e) => {
                          setPinInput(e.target.value);
                          setPinError("");
                        }}
                        className="w-full pl-9 pr-3 py-2 bg-white dark:bg-stone-900 border border-stone-300 dark:border-stone-700 rounded-xl text-stone-900 dark:text-white text-xs focus:outline-none focus:border-rose-900 font-mono"
                      />
                    </div>
                    <button
                      type="submit"
                      className="px-4 py-2 rounded-xl text-xs font-bold bg-rose-950 hover:bg-rose-900 text-white shadow-xs cursor-pointer active:scale-95 transition-all"
                    >
                      Verificar
                    </button>
                  </div>

                  {pinError && (
                    <p className="text-[11px] text-rose-700 dark:text-rose-400 font-bold flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5" />
                      <span>{pinError}</span>
                    </p>
                  )}
                </form>
              ) : (
                <button
                  type="button"
                  onClick={() => setShowPinPrompt(true)}
                  className="w-full py-2.5 px-4 rounded-xl text-xs font-bold bg-rose-950 hover:bg-rose-900 text-white shadow-xs cursor-pointer flex items-center justify-center gap-2 active:scale-95 transition-all"
                >
                  <Lock className="w-3.5 h-3.5 text-amber-400" />
                  <span>Acceso Administrador (Requiere PIN)</span>
                </button>
              )}
            </div>
          )}

          <div className="space-y-1">
            <h3 className="text-sm font-black text-stone-950 dark:text-white">
              {currentProfile ? "Actualizar mis Datos Docentes" : "O identifícate como Docente / Visitante:"}
            </h3>
            <p className="text-xs text-stone-600 dark:text-stone-400">
              Cualquier compañero puede identificarse para aportar sus propios temas o hacer match.
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
                <span>Correo Electrónico (para contacto entre docentes):</span>
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
