"use client";

import React, { useState } from "react";
import { X, Sparkles, Heart, School, Send, MessageCircle, Copy, Check, ArrowRight, Users, BookOpen } from "lucide-react";
import { ProjectItem } from "@/data/projects";

interface MatchModalProps {
  isOpen: boolean;
  onClose: () => void;
  project: ProjectItem | null;
  currentUser?: {
    name: string;
    school: string;
    email: string;
  } | null;
  onOpenIdentity?: () => void;
}

export const MatchModal: React.FC<MatchModalProps> = ({
  isOpen,
  onClose,
  project,
  currentUser,
  onOpenIdentity,
}) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen || !project) return null;

  const senderName = currentUser?.name || "[Tu Nombre]";
  const senderSchool = currentUser?.school || "[Tu Centro Educativo]";

  const collaborationProposal = `¡Hola ${project.author.name}!

Te escribo porque acabamos de hacer MATCH pedagógico con vuestro proyecto "${project.title}" desde la Red de Innovación y Transferencia Docente (red.magicsteam.org).

En nuestro centro (${senderSchool}) estamos muy interesados en colaborar con vosotros:
1. Nos gustaría explorar la posibilidad de replicar el proyecto en nuestras aulas.
2. Plantear un hermanamiento o intercambio de experiencias entre nuestros alumnos y los vuestros.

¿Podríamos tener una breve conversación o intercambio de correos para ver cómo podemos sumar juntos?

Un cordial saludo,
${senderName}
${senderSchool}`;

  const mailtoSubject = encodeURIComponent(`[Match Pedagógico] Propuesta de colaboración intercentros: ${project.title}`);
  const mailtoBody = encodeURIComponent(collaborationProposal);
  const mailtoUrl = `mailto:${project.author.email || "info@tecnodivergente.es"}?subject=${mailtoSubject}&body=${mailtoBody}`;
  const whatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(collaborationProposal)}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(collaborationProposal);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleOpenEmail = () => {
    window.location.href = mailtoUrl;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      <div className="fixed inset-0 bg-stone-950/75 backdrop-blur-sm transition-opacity" onClick={onClose} />

      <div className="relative w-full max-w-xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-3xl shadow-2xl overflow-hidden z-10 text-stone-900 dark:text-stone-100 my-8 transition-colors">
        
        {/* Celebratory Banner */}
        <div className="bg-gradient-to-r from-rose-950 via-rose-900 to-amber-900 text-white p-6 sm:p-7 relative overflow-hidden">
          <div className="absolute top-0 right-0 translate-x-4 -translate-y-4 opacity-10 pointer-events-none">
            <Heart className="w-48 h-48 fill-white" />
          </div>

          <div className="flex items-start justify-between relative z-10">
            <div className="space-y-1">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black bg-white/20 backdrop-blur-md text-amber-200 border border-white/20">
                <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                ¡Match Pedagógico Activo!
              </span>
              <h3 className="text-xl sm:text-2xl font-black tracking-tight text-white pt-1">
                Conexión confirmada con tu centro
              </h3>
              <p className="text-xs sm:text-sm text-rose-100 leading-snug">
                Has conectado con <strong className="text-white font-bold">{project.title}</strong> ({project.author.school})
              </p>
            </div>

            <button
              onClick={onClose}
              className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer shrink-0 ml-2"
              aria-label="Cerrar modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Content */}
        <div className="p-6 sm:p-7 space-y-6 text-xs">
          
          {/* Identity Reminder if not logged in */}
          {!currentUser && onOpenIdentity && (
            <div className="p-3.5 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-300 dark:border-amber-800 flex items-center justify-between gap-3">
              <div className="space-y-0.5">
                <p className="font-bold text-amber-950 dark:text-amber-200">
                  ¿Aún no te has identificado?
                </p>
                <p className="text-[11px] text-stone-600 dark:text-stone-300">
                  Pon tu nombre y colegio para que tu propuesta de colaboración lleve tu firma real.
                </p>
              </div>
              <button
                onClick={() => {
                  onClose();
                  onOpenIdentity();
                }}
                className="px-3 py-1.5 rounded-full text-xs font-bold bg-amber-900 hover:bg-amber-800 text-white shrink-0 cursor-pointer shadow-xs"
              >
                Identificarme
              </button>
            </div>
          )}

          {/* Collaboration Ideas Box */}
          <div className="bg-stone-50 dark:bg-stone-950 p-4 rounded-2xl border border-stone-200 dark:border-stone-800 space-y-3">
            <span className="text-[11px] font-extrabold uppercase tracking-wider text-rose-900 dark:text-rose-400">
              ¿Qué podéis poner en marcha juntos?
            </span>
            
            <ul className="space-y-2 text-stone-700 dark:text-stone-300">
              <li className="flex items-start gap-2">
                <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span><strong>Réplica de aula guiada:</strong> Consultar dudas metodológicas directamente con los autores para adaptar el proyecto a tu centro.</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span><strong>Hermanamiento de alumnos:</strong> Encuentro online entre aulas o intercambio de diarios de abordo y reflexiones del reto.</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span><strong>Evidencias compartidas:</strong> Sumar los datos de vuestro colegio a la investigación de la Asociación Aragonesa de Psicopedagogía.</span>
              </li>
            </ul>
          </div>

          {/* Proposal Message Preview */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label className="font-bold text-stone-700 dark:text-stone-300">
                Mensaje de propuesta listo para enviar a {project.author.name}:
              </label>
              <button
                type="button"
                onClick={handleCopy}
                className="text-rose-900 dark:text-rose-400 font-bold hover:underline inline-flex items-center gap-1 cursor-pointer"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? "¡Copiado!" : "Copiar texto"}</span>
              </button>
            </div>

            <div className="p-3.5 bg-stone-50 dark:bg-stone-950 border border-stone-200 dark:border-stone-800 rounded-xl text-stone-700 dark:text-stone-300 font-sans leading-relaxed whitespace-pre-wrap select-all max-h-40 overflow-y-auto">
              {collaborationProposal}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-2.5 pt-1">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              <button
                type="button"
                onClick={handleOpenEmail}
                className="py-3 px-4 rounded-full font-bold bg-rose-950 hover:bg-rose-900 text-white shadow-xs active:scale-95 transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" />
                <span>Enviar por Correo al Autor</span>
              </button>

              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="py-3 px-4 rounded-full font-bold bg-emerald-700 hover:bg-emerald-800 text-white shadow-xs active:scale-95 transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Proponer por WhatsApp</span>
              </a>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="w-full py-2.5 px-4 rounded-full font-bold text-stone-600 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800 border border-stone-300 dark:border-stone-700 transition-colors cursor-pointer text-center"
            >
              Guardar Match y Seguir Explorando
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
