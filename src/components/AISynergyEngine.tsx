"use client";

import React, { useState } from "react";
import { REAL_SYNERGIES, SynergyMatch } from "@/data/projects";
import { Network, ArrowRight, Zap, CheckCircle2, MessageSquare, Send, Sparkles, RefreshCw, School, Users } from "lucide-react";

interface AISynergyEngineProps {
  onContactAuthor?: (target: {
    authorName: string;
    authorEmail: string;
    school: string;
    projectTitle: string;
    initialMessage?: string;
  }) => void;
}

export const AISynergyEngine: React.FC<AISynergyEngineProps> = ({ onContactAuthor }) => {
  const [activeTab, setActiveTab] = useState<"detected" | "custom">("detected");
  
  // Custom query state
  const [userStage, setUserStage] = useState("Secundaria (1º a 4º ESO)");
  const [userChallenge, setUserChallenge] = useState("Queremos hacer un proyecto de concienciación sobre el uso compulsivo de pantallas y móviles en el instituto");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [generatedSynergy, setGeneratedSynergy] = useState<{
    recommendedProject: string;
    mentorTeacher: string;
    compatibility: number;
    adaptationPlan: string;
    suggestedEmail: string;
  } | null>(null);

  const handleAnalyze = () => {
    setIsAnalyzing(true);
    setGeneratedSynergy(null);

    setTimeout(() => {
      setIsAnalyzing(false);
      const isMobile = userChallenge.toLowerCase().includes("pantalla") || userChallenge.toLowerCase().includes("móvil") || userChallenge.toLowerCase().includes("redes");
      const isRadio = userChallenge.toLowerCase().includes("radio") || userChallenge.toLowerCase().includes("cuento") || userChallenge.toLowerCase().includes("hospital") || userChallenge.toLowerCase().includes("lengua");
      const isCO2 = userChallenge.toLowerCase().includes("aire") || userChallenge.toLowerCase().includes("salud") || userChallenge.toLowerCase().includes("co2") || userChallenge.toLowerCase().includes("ventilación");

      if (isRadio) {
        setGeneratedSynergy({
          recommendedProject: "Cuentos en el Aire (Walkie-talkies y relatos en pediatría)",
          mentorTeacher: "Ricardo Aguado (Colegio Juan de Lanuza · National Teacher Prize)",
          compatibility: 96,
          adaptationPlan: "Tu centro puede adaptar este proyecto grabando cuentos interactivos o dramatizaciones sonoras en el aula de lengua para emitirlos en directo a las aulas hospitalarias infantiles de tu provincia.",
          suggestedEmail: "Estimado Ricardo, te escribo desde la Red Nacional de Innovación Docente. En nuestro colegio queremos replicar 'Cuentos en el Aire' para acompañar a los niños ingresados en nuestro hospital local. ¿Podríamos comentar brevemente cómo coordinasteis la primera toma de contacto con el aula hospitalaria?"
        });
      } else if (isCO2) {
        setGeneratedSynergy({
          recommendedProject: "ZierzO2: Medidor de Calidad del Aire y CO2",
          mentorTeacher: "Ricardo Aguado (Colegio Juan de Lanuza · National Teacher Prize)",
          compatibility: 95,
          adaptationPlan: "Un proyecto directo para trabajar ciencia ciudadana y salud preventiva: los alumnos montan sensores NDIR de CO2 con ESP32 para monitorizar el aula y aprender sobre calidad ambiental sin coste privativo.",
          suggestedEmail: "Hola Ricardo, queremos montar los medidores de CO2 ZierzO2 en las aulas de ciencias de nuestro centro. ¿Sigue disponible el código abierto de calibración y el listado de componentes recomendados?"
        });
      } else {
        setGeneratedSynergy({
          recommendedProject: "Más Vida, Menos Redes (Reto de desconexión digital voluntaria)",
          mentorTeacher: "Ricardo Aguado, Alba Tardío, Lise Baiget y Juan Carlos Soler (Colegio Juan de Lanuza)",
          compatibility: 98,
          adaptationPlan: "Replicar el reto de 1 semana sin smartphone sustituyéndolos por móviles básicos de teclas (con el apoyo del Colegio Juan de Lanuza, IES Ramón Pignatelli e IES Valdespartera). Iniciar con 2 semanas de debate sobre tiempo de pantalla en tutorías y sumar a las familias mediante el pacto voluntario.",
          suggestedEmail: "Hola Ricardo y equipo de Más Vida, Menos Redes: hemos descubierto vuestro proyecto en la Red de Innovación Docente y queremos plantear una réplica en nuestro centro. ¿Podríais facilitarnos los instrumentos validados por la Asociación Aragonesa de Psicopedagogía y orientarnos sobre la alianza con operadoras locales para los terminales de teclas?"
        });
      }
    }, 700);
  };

  return (
    <section id="sinergias-section" className="py-20 bg-white dark:bg-stone-900 border-b border-stone-200 dark:border-stone-800 text-stone-900 dark:text-stone-100 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-rose-50 dark:bg-rose-950/70 border border-rose-200 dark:border-rose-800 text-rose-900 dark:text-rose-200 text-xs font-bold uppercase tracking-wider">
            <Network className="w-4 h-4 text-rose-800 dark:text-rose-400" />
            <span>Conector de Hermanamientos entre Centros</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-stone-950 dark:text-stone-50 tracking-tight">
            Colaboraciones reales de aula a aula
          </h2>
          <p className="text-stone-600 dark:text-stone-300 text-sm sm:text-base leading-relaxed">
            Un sistema de correspondencia pedagógica que detecta afinidades metodológicas entre colegios para propiciar hermanamientos, proyectos intercentros y transferencia directa.
          </p>

          {/* Tab Selector */}
          <div className="inline-flex p-1 rounded-full bg-stone-100 dark:bg-stone-950 border border-stone-300 dark:border-stone-800 text-xs font-bold mt-4">
            <button
              onClick={() => setActiveTab("detected")}
              className={`px-5 py-2 rounded-full transition-all cursor-pointer ${
                activeTab === "detected"
                  ? "bg-rose-950 text-white dark:bg-rose-900 shadow-xs"
                  : "text-stone-600 dark:text-stone-400 hover:text-stone-950 dark:hover:text-white"
              }`}
            >
              Hermanamientos Propuestos
            </button>
            <button
              onClick={() => setActiveTab("custom")}
              className={`px-5 py-2 rounded-full transition-all cursor-pointer flex items-center gap-1.5 ${
                activeTab === "custom"
                  ? "bg-rose-950 text-white dark:bg-rose-900 shadow-xs"
                  : "text-stone-600 dark:text-stone-400 hover:text-stone-950 dark:hover:text-white"
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span>Buscar Conexión para Mi Centro</span>
            </button>
          </div>
        </div>

        {/* Tab 1: Hermanamientos Propuestos */}
        {activeTab === "detected" && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 pt-4">
            {REAL_SYNERGIES.map((syn) => (
              <div
                key={syn.id}
                className="bg-stone-50 dark:bg-stone-950 border border-stone-200 dark:border-stone-800 rounded-2xl p-6 space-y-5 hover:border-stone-300 dark:hover:border-stone-700 transition-all flex flex-col justify-between shadow-xs"
              >
                <div className="space-y-4">
                  
                  {/* Top Bar */}
                  <div className="flex items-center justify-between gap-2 border-b border-stone-200 dark:border-stone-800 pb-3">
                    <span className="text-xs font-bold text-stone-500 dark:text-stone-400 uppercase tracking-wider flex items-center gap-1.5">
                      <School className="w-3.5 h-3.5 text-rose-800 dark:text-rose-400" />
                      Hermanamiento
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full text-xs font-black bg-emerald-100 dark:bg-emerald-950/80 text-emerald-900 dark:text-emerald-200 border border-emerald-200 dark:border-emerald-800">
                      {syn.matchScore}% Afinidad
                    </span>
                  </div>

                  {/* Connected Projects */}
                  <div className="space-y-2 text-xs">
                    <div className="bg-white dark:bg-stone-900 p-3 rounded-xl border border-stone-200 dark:border-stone-800">
                      <span className="text-[10px] text-stone-400 font-bold uppercase">Proyecto de Referencia</span>
                      <p className="font-extrabold text-stone-900 dark:text-white text-sm">{syn.sourceProject}</p>
                      <p className="text-stone-500 text-[11px]">{syn.sourceTeacher}</p>
                    </div>

                    <div className="bg-white dark:bg-stone-900 p-3 rounded-xl border border-stone-200 dark:border-stone-800">
                      <span className="text-[10px] text-stone-400 font-bold uppercase">Centros Destinatarios</span>
                      <p className="font-bold text-stone-900 dark:text-white text-xs">{syn.targetNeed}</p>
                    </div>
                  </div>

                  {/* Rationale */}
                  <div className="space-y-1.5 text-xs">
                    <strong className="text-stone-900 dark:text-stone-100 font-bold block">Fundamento Pedagógico:</strong>
                    <p className="text-stone-600 dark:text-stone-300 leading-relaxed">{syn.pedagogicalSynergy}</p>
                  </div>

                  {/* Action Pact */}
                  <div className="p-3.5 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900/60 text-xs space-y-1">
                    <strong className="text-rose-950 dark:text-rose-200 font-bold block">
                      Propuesta de Colaboración:
                    </strong>
                    <p className="text-stone-700 dark:text-stone-300 leading-relaxed">{syn.actionPact}</p>
                  </div>

                  {/* Benefits */}
                  <div className="space-y-1 text-xs">
                    <span className="text-stone-500 font-bold">Beneficios directos:</span>
                    <ul className="space-y-1 pl-4 list-disc text-stone-600 dark:text-stone-300">
                      {syn.benefits.map((b, i) => (
                        <li key={i}>{b}</li>
                      ))}
                    </ul>
                  </div>

                </div>

                <div className="pt-4 border-t border-stone-200 dark:border-stone-800 flex items-center justify-between gap-3">
                  <span className="text-[11px] text-stone-500">¿Interesado en participar?</span>
                  <button
                    onClick={() => {
                      if (onContactAuthor) {
                        onContactAuthor({
                          authorName: "Ricardo Aguado",
                          authorEmail: "info@tecnodivergente.es",
                          school: "Colegio Juan de Lanuza",
                          projectTitle: syn.sourceProject,
                          initialMessage: `Hola Ricardo,\n\nTe contacto desde la Red Nacional de Innovación Docente. Hemos visto la propuesta de hermanamiento pedagógico en torno a "${syn.sourceProject}" (${syn.actionPact}).\n\nNos gustaría sumarnos desde nuestro centro educativo para colaborar de aula a aula.\n\n¿Podríamos ponernos en contacto para coordinar los primeros pasos?\n\nUn cordial saludo,`
                        });
                      } else {
                        alert("Propuesta registrada: Notificaremos a los coordinadores de la red para facilitar el hermanamiento con tu centro.");
                      }
                    }}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold bg-stone-900 hover:bg-stone-800 dark:bg-stone-100 dark:hover:bg-white text-white dark:text-stone-900 transition-all cursor-pointer shadow-xs active:scale-95"
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>Conectar</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Tab 2: Custom Matching Form */}
        {activeTab === "custom" && (
          <div className="max-w-3xl mx-auto bg-stone-50 dark:bg-stone-950 border border-stone-200 dark:border-stone-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xs">
            <div className="space-y-2">
              <h3 className="text-xl font-bold text-stone-950 dark:text-stone-50 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-amber-500" />
                <span>¿Qué reto o proyecto buscas para tu centro?</span>
              </h3>
              <p className="text-xs text-stone-600 dark:text-stone-400">
                Selecciona la etapa de tu alumnado y describe el problema que deseas abordar. El conector te sugerirá el proyecto contrastado y te facilitará el primer contacto.
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 mb-1.5">
                  Etapa Educativa de tus Alumnos:
                </label>
                <select
                  value={userStage}
                  onChange={(e) => setUserStage(e.target.value)}
                  className="w-full px-4 py-2.5 bg-white dark:bg-stone-900 border border-stone-300 dark:border-stone-700 rounded-xl text-stone-900 dark:text-stone-100 text-sm focus:outline-none focus:border-rose-900"
                >
                  <option>4º a 6º Primaria</option>
                  <option>Secundaria (1º a 4º ESO)</option>
                  <option>Bachillerato</option>
                  <option>Formación Profesional</option>
                  <option>Educación Especial & Inclusión</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 mb-1.5">
                  ¿Qué necesidad educativa o reto de aula quieres resolver?
                </label>
                <textarea
                  rows={3}
                  value={userChallenge}
                  onChange={(e) => setUserChallenge(e.target.value)}
                  placeholder="Ej: 'Buscamos un proyecto para reducir el uso del móvil', 'Queremos hacer radio escolar solidaria con hospitales', 'Queremos medir la calidad del aire'..."
                  className="w-full px-4 py-2.5 bg-white dark:bg-stone-900 border border-stone-300 dark:border-stone-700 rounded-xl text-stone-900 dark:text-stone-100 text-sm focus:outline-none focus:border-rose-900"
                />
              </div>

              <button
                onClick={handleAnalyze}
                disabled={isAnalyzing}
                className="w-full py-3.5 rounded-full text-sm font-bold bg-rose-950 hover:bg-rose-900 dark:bg-rose-900 dark:hover:bg-rose-800 text-white shadow-xs active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                {isAnalyzing ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin text-white" />
                    <span>Buscando afinidades y proyectos transferibles...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 text-amber-400" />
                    <span>Buscar Proyecto y Plan de Adaptación</span>
                  </>
                )}
              </button>
            </div>

            {/* Generated Result */}
            {generatedSynergy && (
              <div className="pt-6 border-t border-stone-200 dark:border-stone-800 space-y-4 animate-in fade-in duration-300">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="p-1.5 bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 rounded-lg">
                      <CheckCircle2 className="w-5 h-5" />
                    </span>
                    <div>
                      <h4 className="font-bold text-stone-950 dark:text-white text-base">Proyecto Idóneo Encontrado</h4>
                      <p className="text-xs text-stone-500">Sugerencia basada en tus necesidades de aula</p>
                    </div>
                  </div>
                  <span className="px-3 py-1 rounded-full text-xs font-black bg-emerald-100 dark:bg-emerald-950 text-emerald-900 dark:text-emerald-200 border border-emerald-300 dark:border-emerald-800">
                    {generatedSynergy.compatibility}% Afinidad
                  </span>
                </div>

                <div className="bg-white dark:bg-stone-900 p-4 rounded-xl border border-stone-200 dark:border-stone-800 space-y-2 text-xs">
                  <div>
                    <span className="text-stone-500 font-bold">Proyecto de Referencia:</span>
                    <p className="font-extrabold text-stone-900 dark:text-white text-sm">{generatedSynergy.recommendedProject}</p>
                  </div>
                  <div>
                    <span className="text-stone-500 font-bold">Docente Coordinador:</span>
                    <p className="font-bold text-stone-800 dark:text-stone-200">{generatedSynergy.mentorTeacher}</p>
                  </div>
                  <div className="pt-2 border-t border-stone-100 dark:border-stone-800">
                    <span className="text-stone-500 font-bold">Plan de Adaptación para tu Aula:</span>
                    <p className="text-stone-700 dark:text-stone-300 leading-relaxed mt-1">{generatedSynergy.adaptationPlan}</p>
                  </div>
                </div>

                <div className="bg-stone-100 dark:bg-stone-900 p-4 rounded-xl border border-stone-200 dark:border-stone-800 space-y-2">
                  <span className="text-xs font-bold text-stone-800 dark:text-stone-200 flex items-center gap-1.5">
                    <MessageSquare className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
                    Borrador de Contacto Directo:
                  </span>
                  <div className="p-3 bg-white dark:bg-stone-950 rounded-lg text-xs font-sans text-stone-700 dark:text-stone-300 select-all border border-stone-200 dark:border-stone-800">
                    {generatedSynergy.suggestedEmail}
                  </div>
                  <div className="flex items-center justify-between gap-2 pt-1">
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(generatedSynergy.suggestedEmail);
                        alert("Borrador copiado al portapapeles");
                      }}
                      className="text-xs font-bold text-stone-600 dark:text-stone-400 hover:underline cursor-pointer"
                    >
                      Copiar texto
                    </button>

                    {onContactAuthor && (
                      <button
                        onClick={() => {
                          onContactAuthor({
                            authorName: "Ricardo Aguado",
                            authorEmail: "info@tecnodivergente.es",
                            school: "Colegio Juan de Lanuza",
                            projectTitle: generatedSynergy.recommendedProject,
                            initialMessage: generatedSynergy.suggestedEmail,
                          });
                        }}
                        className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold bg-rose-950 hover:bg-rose-900 text-white shadow-xs transition-all cursor-pointer"
                      >
                        <Send className="w-3.5 h-3.5" />
                        <span>Contactar con el Autor</span>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            )}

          </div>
        )}

      </div>
    </section>
  );
};
