"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { AlertTriangle, RotateCcw, Home } from "lucide-react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // If the error is a ChunkLoadError (timeout or stale hash), automatically reload fresh assets
    if (
      error?.name === "ChunkLoadError" ||
      error?.message?.includes("ChunkLoadError") ||
      error?.message?.includes("Loading chunk")
    ) {
      console.warn("Chunk loading error detected. Auto-reloading page...", error);
      window.location.reload();
    }
  }, [error]);

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-16">
      <div className="max-w-md w-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-8 text-center shadow-xl">
        <div className="w-14 h-14 mx-auto mb-5 rounded-2xl bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center">
          <AlertTriangle className="w-7 h-7" />
        </div>

        <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 mb-2">
          Temporary Loading Glitch
        </h2>
        <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-6">
          A script chunk took too long to load or was updated. Reloading the page will fetch the latest assets.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={() => window.location.reload()}
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-sm transition-colors shadow-md shadow-emerald-600/20"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Reload Page</span>
          </button>

          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-300 font-semibold text-sm transition-colors"
          >
            <Home className="w-4 h-4" />
            <span>Go Home</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
