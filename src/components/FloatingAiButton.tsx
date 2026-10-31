"use client";

import React, { useState, useEffect } from "react";
import { Sparkles, Compass, MessageSquare, Bot } from "lucide-react";

interface FloatingAiButtonProps {
  onClick: () => void;
}

export default function FloatingAiButton({ onClick }: FloatingAiButtonProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Show after slight scroll or 1.5 seconds
    const timer = setTimeout(() => setIsVisible(true), 1200);
    return () => clearTimeout(timer);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-40 animate-in fade-in slide-in-from-bottom-4 duration-300">
      <button
        onClick={onClick}
        className="group relative flex items-center gap-2.5 px-4 py-3 rounded-full bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 hover:from-emerald-500 hover:to-teal-500 text-white shadow-2xl shadow-emerald-900/60 border border-emerald-400/30 hover:scale-105 active:scale-95 transition-all duration-300"
        aria-label="Open Kerala Roadtrip AI Assistant"
      >
        {/* Glow halo */}
        <div className="absolute -inset-1 rounded-full bg-emerald-500/25 blur-md group-hover:bg-emerald-400/40 transition-all pointer-events-none" />

        {/* Icon with ping */}
        <div className="relative w-8 h-8 rounded-full bg-black/30 flex items-center justify-center">
          <Bot className="w-4 h-4 text-emerald-300 group-hover:rotate-12 transition-transform duration-300" />
          <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-amber-400 border-2 border-emerald-700 animate-ping" />
        </div>

        {/* Text */}
        <div className="text-left pr-1">
          <div className="flex items-center gap-1.5">
            <span className="text-xs font-black tracking-wide uppercase text-white">
              AI Schedule Trip
            </span>
            <span className="text-[9px] font-bold px-1.5 py-0.2 rounded bg-amber-400 text-zinc-950">
              NEW
            </span>
          </div>
          <div className="text-[10px] text-emerald-100 font-medium">
            Plan custom route in seconds
          </div>
        </div>

        <Sparkles className="w-3.5 h-3.5 text-amber-300 animate-pulse ml-0.5" />
      </button>
    </div>
  );
}

