"use client";

import React, { useState } from "react";
import { X, Mail, MessageCircle, Copy, Check, Send, School, User, ArrowRight } from "lucide-react";

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  targetAuthorName: string;
  targetAuthorEmail: string;
  targetSchool: string;
  targetProjectTitle: string;
  currentUser?: {
    name: string;
    school: string;
    email: string;
  } | null;
  initialMessage?: string;
}

export const ContactModal: React.FC<ContactModalProps> = ({
  isOpen,
  onClose,
  targetAuthorName,
  targetAuthorEmail,
  targetSchool,
  targetProjectTitle,
  initialMessage,
  currentUser,
}) => {
  const [senderName, setSenderName] = useState(currentUser?.name || "");
  const [senderSchool, setSenderSchool] = useState(currentUser?.school || "");
  const [senderEmail, setSenderEmail] = useState(currentUser?.email || "");
  const [message, setMessage] = useState(
    initialMessage ||
    `Hola ${targetAuthorName},\n\nTe contacto desde la Red Nacional de Innovación Docente (red.magicsteam.org). En mi centro estamos muy interesados en vuestro proyecto "${targetProjectTitle}" y nos gustaría consultaros unas dudas sobre los requisitos previos para plantear una réplica en nuestras aulas.\n\n¿Sería posible conectar brevemente por correo o llamada para intercambiar impresiones?\n\nUn cordial saludo,\n${currentUser?.name || "[Tu Nombre]"}\n${currentUser?.school || "[Tu Centro]"}`
  );

  React.useEffect(() => {
    if (initialMessage) {
      setMessage(initialMessage);
    } else {
      setMessage(`Hola ${targetAuthorName},\n\nTe contacto desde la Red Nacional de Innovación Docente (red.magicsteam.org). En mi centro estamos muy interesados en vuestro proyecto "${targetProjectTitle}" y nos gustaría consultaros unas dudas sobre los requisitos previos para plantear una réplica en nuestras aulas.\n\n¿Sería posible conectar brevemente por correo o llamada para intercambiar impresiones?\n\nUn cordial saludo,\n${currentUser?.name || "[Tu Nombre]"}\n${currentUser?.school || "[Tu Centro]"}`);
    }
  }, [initialMessage, targetAuthorName, targetProjectTitle, currentUser]);

  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  // Build mailto and whatsapp URLs
  const mailtoSubject = encodeURIComponent(`[Red MagicSTEAM] Consulta sobre réplica: ${targetProjectTitle}`);
  const mailtoBody = encodeURIComponent(message);
  const mailtoUrl = `mailto:${targetAuthorEmail || "info@tecnodivergente.es"}?subject=${mailtoSubject}&body=${mailtoBody}`;
  const whatsappDirectUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(message)}`;

  const handleCopyWhatsApp = () => {
    navigator.clipboard.writeText(message);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleOpenEmail = () => {
    window.location.href = mailtoUrl;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      <div className="fixed inset-0 bg-stone-950/70 backdrop-blur-sm" onClick={onClose} />

      <div className="relative w-full max-w-xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-3xl shadow-2xl overflow-hidden z-10 text-stone-900 dark:text-stone-100 my-8 transition-colors">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-stone-200 dark:border-stone-800 bg-white/95 dark:bg-stone-900/90">
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-full bg-rose-100 dark:bg-rose-950 text-rose-900 dark:text-rose-300">
              <Mail className="w-4 h-4" />
            </span>
            <span className="text-sm font-bold text-stone-950 dark:text-white">
              Contactar con el Autor
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
          
          {/* Target recipient info */}
          <div className="bg-stone-50 dark:bg-stone-950 p-4 rounded-2xl border border-stone-200 dark:border-stone-800 space-y-1">
            <span className="text-[11px] font-bold text-rose-950 dark:text-rose-400 uppercase tracking-wider">
              Destinatario:
            </span>
            <h4 className="text-base font-extrabold text-stone-950 dark:text-white">
              {targetAuthorName} ({targetSchool})
            </h4>
            <p className="text-xs text-stone-600 dark:text-stone-400">
              Proyecto de referencia: <strong className="text-stone-900 dark:text-stone-200">{targetProjectTitle}</strong> · Email: <span className="font-mono text-stone-700 dark:text-stone-300">{targetAuthorEmail || "info@tecnodivergente.es"}</span>
            </p>
          </div>

          {/* Sender inputs (if not logged in) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div>
              <label className="block font-bold text-stone-700 dark:text-stone-300 mb-1">Tu Nombre:</label>
              <input
                type="text"
                value={senderName}
                onChange={(e) => setSenderName(e.target.value)}
                placeholder="Ej: Carmen Valenzuela"
                className="w-full px-3 py-2 bg-stone-50 dark:bg-stone-950 border border-stone-300 dark:border-stone-700 rounded-xl text-stone-900 dark:text-white text-xs focus:outline-none focus:border-rose-900"
              />
            </div>
            <div>
              <label className="block font-bold text-stone-700 dark:text-stone-300 mb-1">Tu Colegio / IES:</label>
              <input
                type="text"
                value={senderSchool}
                onChange={(e) => setSenderSchool(e.target.value)}
                placeholder="Ej: IES Ramón y Cajal"
                className="w-full px-3 py-2 bg-stone-50 dark:bg-stone-950 border border-stone-300 dark:border-stone-700 rounded-xl text-stone-900 dark:text-white text-xs focus:outline-none focus:border-rose-900"
              />
            </div>
          </div>

          {/* Editable Message Box */}
          <div className="space-y-1 text-xs">
            <label className="block font-bold text-stone-700 dark:text-stone-300">
              Mensaje preparado para el autor:
            </label>
            <textarea
              rows={6}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full p-3.5 bg-stone-50 dark:bg-stone-950 border border-stone-300 dark:border-stone-700 rounded-2xl text-stone-800 dark:text-stone-200 text-xs font-sans leading-relaxed focus:outline-none focus:border-rose-900"
            />
          </div>

          {/* Direct Action Buttons */}
          <div className="space-y-3 pt-2">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {/* Mailto button */}
              <button
                type="button"
                onClick={handleOpenEmail}
                className="py-3 px-4 rounded-full text-xs font-bold bg-rose-950 hover:bg-rose-900 dark:bg-rose-900 dark:hover:bg-rose-800 text-white shadow-xs active:scale-95 transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                <Mail className="w-4 h-4" />
                <span>Abrir en mi Correo (Gmail/Outlook)</span>
              </button>

              {/* Direct WhatsApp button */}
              <a
                href={whatsappDirectUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="py-3 px-4 rounded-full text-xs font-bold bg-emerald-700 hover:bg-emerald-800 text-white shadow-xs active:scale-95 transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Abrir en WhatsApp</span>
              </a>
            </div>

            {/* Copy button */}
            <button
              type="button"
              onClick={handleCopyWhatsApp}
              className="w-full py-2.5 px-4 rounded-full text-xs font-bold bg-stone-100 hover:bg-stone-200 dark:bg-stone-800 dark:hover:bg-stone-700 text-stone-800 dark:text-stone-200 border border-stone-300 dark:border-stone-700 shadow-xs active:scale-95 transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
              <span>{copied ? "¡Mensaje copiado al portapapeles!" : "Copiar mensaje completo al portapapeles"}</span>
            </button>

            <p className="text-[11px] text-stone-500 text-center">
              Al pulsar "Abrir en mi Correo", se abrirá tu cliente de correo (Gmail, Outlook, Mail) con la dirección de {targetAuthorName} ({targetAuthorEmail || "info@tecnodivergente.es"}) y el asunto ya preparados.
            </p>
          </div>

        </div>

      </div>
    </div>
  );
};
