"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense } from "react";

function UnirseRedirectContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const premio = searchParams.get("premio") || searchParams.get("invitacion") || "National Teacher Prize";
    router.replace(`/?invitacion=${encodeURIComponent(premio)}`);
  }, [router, searchParams]);

  return (
    <div className="min-h-screen bg-white dark:bg-stone-950 flex items-center justify-center p-6 text-stone-800 dark:text-stone-200">
      <div className="text-center space-y-3">
        <div className="w-10 h-10 border-4 border-rose-900 border-t-transparent rounded-full animate-spin mx-auto" />
        <p className="text-sm font-bold">Conectando con la Red Nacional de Innovación Docente...</p>
      </div>
    </div>
  );
}

export default function UnirsePage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-white" />}>
      <UnirseRedirectContent />
    </Suspense>
  );
}
