"use client";

import React, { useState } from "react";
import { X, UserPlus, Copy, Check, MessageCircle, Sparkles } from "lucide-react";

interface InviteModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const InviteModal: React.FC<InviteModalProps> = ({ isOpen, onClose }) => {
  const [awardType, setAwardType] = useState("National Teacher Prize");
  const [copiedLink, setCopiedLink] = useState(false);
  const [copiedMessage, setCopiedMessage] = useState(false);

  if (!isOpen) return null;

  const inviteLink = `https://red.magicsteam.org/?invitacion=${encodeURIComponent(awardType)}`;

  const whatsappMessage = `👋 ¡Hola compañeros de ${awardType}!
Os comparto la iniciativa que estamos poniendo en marcha entre docentes galardonados: la Red Nacional de Innovación Docente (red.magicsteam.org).
El objetivo es publicar nuestros proyectos en formato 'Playbook Replicable' para que podamos conocerlos, replicarlos en nuestros centros y propiciar hermanamientos entre aulas.
Podéis verla y compartir vuestro proyecto desde esta invitación exclusiva:
👉 ${inviteLink}`;

  const whatsappDirectUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(whatsappMessage)}`;

  const copyToClipboard = (text: string, isMsg: boolean) => {
    navigator.clipboard.writeText(text);
    if (isMsg) {
      setCopiedMessage(true);
      setTimeout(() => setCopiedMessage(false), 2000);
    } else {
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      <div className="fixed inset-0 bg-stone-950/70 backdrop-blur-sm" onClick={onClose} />

      <div className="relative w-full max-w-xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-3xl shadow-2xl overflow-hidden z-10 text-stone-900 dark:text-stone-100 my-8 transition-colors">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-stone-200 dark:border-stone-800 bg-white/95 dark:bg-stone-900/90">
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-full bg-amber-100 dark:bg-amber-950 text-amber-900 dark:text-amber-300">
              <UserPlus className="w-4 h-4" />
            </span>
            <span className="text-sm font-bold text-stone-950 dark:text-white">
              Invitar a Docentes Galardonados
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
          <div className="space-y-1">
            <h3 className="text-lg font-black text-stone-950 dark:text-white">
              Suma a tus compañeros de certamen
            </h3>
            <p className="text-xs text-stone-600 dark:text-stone-400">
              Genera una invitación personalizada para compartir en el grupo de WhatsApp del premio o por correo.
            </p>
          </div>

          <div>
            <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 mb-1.5">
              Certamen o Reconocimiento del Grupo a Invitar:
            </label>
            <select
              value={awardType}
              onChange={(e) => setAwardType(e.target.value)}
              className="w-full px-4 py-2.5 bg-stone-50 dark:bg-stone-950 border border-stone-300 dark:border-stone-700 rounded-xl text-stone-900 dark:text-stone-100 text-sm focus:outline-none focus:border-rose-900"
            >
              <option>National Teacher Prize</option>
              <option>Premios Mentes AMI (Atresmedia / Mutua Madrileña)</option>
              <option>Premios RetoTech (Fundación Endesa)</option>
              <option>Premios Educa Abanca (Mejor Docente de España)</option>
              <option>SIMO Educación Innovación</option>
              <option>Premios Nacionales del Ministerio de Educación</option>
            </select>
          </div>

          {/* Invitation Link Box */}
          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-stone-700 dark:text-stone-300">
              Enlace de Invitación Exclusivo:
            </label>
            <div className="flex items-center gap-2">
              <input
                type="text"
                readOnly
                value={inviteLink}
                className="flex-1 px-3.5 py-2.5 bg-stone-50 dark:bg-stone-950 border border-stone-300 dark:border-stone-700 rounded-xl text-xs font-mono text-stone-700 dark:text-stone-300 select-all"
              />
              <button
                onClick={() => copyToClipboard(inviteLink, false)}
                className="px-4 py-2.5 rounded-xl text-xs font-bold bg-stone-900 hover:bg-stone-800 dark:bg-stone-100 dark:hover:bg-white text-white dark:text-stone-900 flex items-center gap-1.5 shrink-0 cursor-pointer shadow-xs"
              >
                {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedLink ? "Copiado" : "Copiar"}</span>
              </button>
            </div>
          </div>

          {/* WhatsApp / Telegram Message Card */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-stone-700 dark:text-stone-300 flex items-center gap-1.5">
                <MessageCircle className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                Mensaje listo para pegar en WhatsApp:
              </label>
              <button
                onClick={() => copyToClipboard(whatsappMessage, true)}
                className="text-xs font-bold text-rose-900 dark:text-rose-400 hover:underline flex items-center gap-1 cursor-pointer"
              >
                {copiedMessage ? <Check className="w-3 h-3 text-emerald-500" /> : <Copy className="w-3 h-3" />}
                <span>{copiedMessage ? "¡Copiado!" : "Copiar mensaje"}</span>
              </button>
            </div>

            <div className="p-4 bg-stone-50 dark:bg-stone-950 border border-stone-200 dark:border-stone-800 rounded-2xl text-xs text-stone-700 dark:text-stone-300 leading-relaxed font-sans whitespace-pre-wrap">
              {whatsappMessage}
            </div>

            <div className="flex items-center justify-end pt-1">
              <a
                href={whatsappDirectUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold bg-emerald-700 hover:bg-emerald-800 text-white shadow-xs transition-all cursor-pointer"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>Abrir en WhatsApp Web / App</span>
              </a>
            </div>
          </div>

          {/* Verified Awardee Badge Note */}
          <div className="p-3.5 bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900/60 rounded-xl text-xs text-rose-950 dark:text-rose-200 flex items-start gap-2">
            <Sparkles className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
            <p>
              Los docentes que accedan con esta invitación obtendrán el distintivo de <strong>Docente Galardonado Verificado</strong> para publicar sus playbooks directamente.
            </p>
          </div>

        </div>

      </div>
    </div>
  );
};
