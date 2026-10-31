"use client";

import React from "react";
import { Bot, Sparkles } from "lucide-react";
import { triggerAiAssistant } from "./AiAssistantGlobalProvider";

interface CustomizeWithAiButtonProps {
  routeTitle: string;
  durationDays: number;
  className?: string;
}

export default function CustomizeWithAiButton({
  routeTitle,
  durationDays,
  className = "",
}: CustomizeWithAiButtonProps) {
  const handleClick = () => {
    triggerAiAssistant(
      `I want to plan or customize the "${routeTitle}" (${durationDays} Days). Can you help me adapt this schedule, suggest best local stops, and check road conditions?`
    );
  };

  return (
    <button
      onClick={handleClick}
      className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 hover:from-emerald-500 hover:to-teal-500 text-white text-xs font-bold uppercase tracking-wider transition-all shadow-md active:scale-95 ${className}`}
    >
      <Bot className="w-3.5 h-3.5 text-emerald-200" />
      <span>AI Schedule Mode</span>
      <Sparkles className="w-3 h-3 text-amber-300" />
    </button>
  );
}

