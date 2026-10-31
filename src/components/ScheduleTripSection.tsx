"use client";

import React, { useState } from "react";
import {
  Sparkles,
  Compass,
  Calendar,
  Clock,
  Car,
  MapPin,
  Send,
  Zap,
  SlidersHorizontal,
  Bot,
  ArrowRight,
  Mountain,
  Waves,
  Sun,
  ShieldCheck,
  CheckCircle2,
  RefreshCw,
  MessageSquare
} from "lucide-react";
import {
  TripPreferences,
  ScheduledTripPlan,
  generateSmartTripSchedule,
  KERALA_STARTING_HUBS,
  TRIP_THEMES,
  QUICK_AI_PROMPTS
} from "@/lib/ai-trip-planner";
import ScheduleTimelineView from "./ScheduleTimelineView";

interface ScheduleTripSectionProps {
  onOpenFullModal?: (promptText?: string) => void;
}

export default function ScheduleTripSection({ onOpenFullModal }: ScheduleTripSectionProps) {
  const [selectedHub, setSelectedHub] = useState("Kochi");
  const [selectedDays, setSelectedDays] = useState(4);
  const [selectedTheme, setSelectedTheme] = useState<TripPreferences["theme"]>("highlands");
  const [selectedVehicle, setSelectedVehicle] = useState<TripPreferences["vehicle"]>("suv");
  const [selectedGroup, setSelectedGroup] = useState<TripPreferences["travelGroup"]>("couple");
  const [selectedPace, setSelectedPace] = useState<TripPreferences["pace"]>("balanced");
  const [customInput, setCustomInput] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [currentPlan, setCurrentPlan] = useState<ScheduledTripPlan | null>(() =>
    generateSmartTripSchedule({
      startCity: "Kochi",
      durationDays: 4,
      theme: "highlands",
      travelGroup: "couple",
      vehicle: "suv",
      pace: "balanced"
    })
  );

  const handleGenerate = (customPromptText?: string) => {
    setIsGenerating(true);
    setTimeout(() => {
      const plan = generateSmartTripSchedule({
        startCity: selectedHub,
        durationDays: selectedDays,
        theme: selectedTheme,
        travelGroup: selectedGroup,
        vehicle: selectedVehicle,
        pace: selectedPace,
        customNotes: customPromptText || customInput
      });
      setCurrentPlan(plan);
      setIsGenerating(false);
    }, 400);
  };

  const handleQuickPrompt = (prompt: string) => {
    setCustomInput(prompt);
    if (onOpenFullModal) {
      onOpenFullModal(prompt);
    } else {
      handleGenerate(prompt);
    }
  };

  return (
    <section id="schedule-trip-ai" className="scroll-mt-28">
      <div className="bg-gradient-to-b from-zinc-950 via-zinc-900 to-zinc-950 text-white rounded-3xl p-6 sm:p-10 lg:p-12 border border-zinc-800 shadow-2xl relative overflow-hidden">
        {/* Glow ambient */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-emerald-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-10 w-96 h-96 bg-teal-600/10 rounded-full blur-3xl pointer-events-none" />

        {/* Section Header */}
        <div className="relative z-10 max-w-3xl mx-auto text-center space-y-4 mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/15 border border-emerald-500/40 text-emerald-300 text-xs font-bold tracking-wide shadow-glow-emerald">
            <Bot className="w-4 h-4 text-emerald-400" />
            <span>AI Schedule Trip Mode</span>
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-ping" />
          </div>

          <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white leading-tight">
            Schedule Your Ideal{" "}
            <span className="gradient-text-emerald">Kerala Roadtrip</span> with AI
          </h2>

          <p className="text-sm sm:text-base text-zinc-300 max-w-2xl mx-auto leading-relaxed">
            Our intelligent assistant synthesizes a custom day-by-day driving schedule with realistic transit times, hairpin alerts, scenic stops, and authentic highway dining.
          </p>

          {/* Quick starter chips */}
          <div className="pt-2 flex flex-wrap items-center justify-center gap-2">
            <span className="text-[11px] font-bold text-zinc-400 mr-1 flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" /> Quick Prompts:
            </span>
            {QUICK_AI_PROMPTS.slice(0, 3).map((qp, idx) => (
              <button
                key={idx}
                onClick={() => handleQuickPrompt(qp.prompt)}
                className="px-3 py-1.5 rounded-xl bg-zinc-800/80 hover:bg-emerald-950/70 border border-zinc-700/60 hover:border-emerald-500/50 text-[11px] font-medium text-zinc-300 hover:text-emerald-300 transition-all text-left"
              >
                {qp.label}
              </button>
            ))}
          </div>
        </div>

        {/* Scheduler Control Panel */}
        <div className="relative z-10 p-5 sm:p-7 rounded-3xl bg-zinc-900/90 border border-zinc-800 backdrop-blur-xl shadow-xl max-w-5xl mx-auto mb-10 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-zinc-800 pb-4">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-400">
              <SlidersHorizontal className="w-4 h-4" />
              <span>Configure Your Trip Parameters</span>
            </div>

            {onOpenFullModal && (
              <button
                onClick={() => onOpenFullModal()}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-400 hover:text-amber-300 transition-colors"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>Open Conversational Chat Mode</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Hub */}
            <div>
              <label className="text-[11px] font-bold uppercase text-zinc-400 block mb-1.5">
                Starting City
              </label>
              <select
                value={selectedHub}
                onChange={(e) => setSelectedHub(e.target.value)}
                className="w-full py-2.5 px-3 text-xs font-bold rounded-xl bg-zinc-800 text-zinc-200 border border-zinc-700 focus:outline-none focus:border-emerald-500"
              >
                {KERALA_STARTING_HUBS.map((h) => (
                  <option key={h.id} value={h.id}>
                    {h.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Duration */}
            <div>
              <label className="text-[11px] font-bold uppercase text-zinc-400 block mb-1.5">
                Duration ({selectedDays} Days)
              </label>
              <div className="flex gap-1 p-1 bg-zinc-800 rounded-xl">
                {[2, 3, 4, 5, 7].map((d) => (
                  <button
                    key={d}
                    onClick={() => setSelectedDays(d)}
                    className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition-all ${
                      selectedDays === d
                        ? "bg-emerald-600 text-white shadow"
                        : "text-zinc-400 hover:text-white"
                    }`}
                  >
                    {d}D
                  </button>
                ))}
              </div>
            </div>

            {/* Theme */}
            <div>
              <label className="text-[11px] font-bold uppercase text-zinc-400 block mb-1.5">
                Travel Theme
              </label>
              <select
                value={selectedTheme}
                onChange={(e) => setSelectedTheme(e.target.value as any)}
                className="w-full py-2.5 px-3 text-xs font-bold rounded-xl bg-zinc-800 text-zinc-200 border border-zinc-700 focus:outline-none focus:border-emerald-500"
              >
                {TRIP_THEMES.map((t) => (
                  <option key={t.id} value={t.id}>
                    {t.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Vehicle */}
            <div>
              <label className="text-[11px] font-bold uppercase text-zinc-400 block mb-1.5">
                Vehicle Type
              </label>
              <select
                value={selectedVehicle}
                onChange={(e) => setSelectedVehicle(e.target.value as any)}
                className="w-full py-2.5 px-3 text-xs font-bold rounded-xl bg-zinc-800 text-zinc-200 border border-zinc-700 focus:outline-none focus:border-emerald-500"
              >
                <option value="suv">SUV / Crossover (4x4 Ground Clearance)</option>
                <option value="hatchback">Hatchback / Sedan (Smooth Highway)</option>
                <option value="ev">Electric Vehicle (EV with Charging)</option>
                <option value="bike">Cruiser Motorcycle (Ghat Thrills)</option>
              </select>
            </div>
          </div>

          {/* Action Row */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
            <div className="flex items-center gap-3 text-xs text-zinc-400 w-full sm:w-auto">
              <span>Companions:</span>
              <div className="flex gap-1">
                {(["solo", "couple", "family", "friends"] as const).map((g) => (
                  <button
                    key={g}
                    onClick={() => setSelectedGroup(g)}
                    className={`px-2.5 py-1 rounded-lg text-[11px] font-bold capitalize transition-all ${
                      selectedGroup === g
                        ? "bg-zinc-700 text-white"
                        : "text-zinc-500 hover:text-zinc-300"
                    }`}
                  >
                    {g}
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={() => handleGenerate()}
              disabled={isGenerating}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-2xl bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 hover:from-emerald-500 hover:to-teal-500 text-white font-black text-xs uppercase tracking-wider transition-all shadow-lg shadow-emerald-600/30 active:scale-95 disabled:opacity-50"
            >
              {isGenerating ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin text-white" />
                  <span>Synthesizing Optimal Schedule...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 text-amber-300" />
                  <span>Update & Schedule Itinerary</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Generated Schedule Timeline View */}
        {currentPlan && (
          <div className="relative z-10 max-w-5xl mx-auto">
            <ScheduleTimelineView
              plan={currentPlan}
              onRefineWithPrompt={(promptText) => {
                if (onOpenFullModal) {
                  onOpenFullModal(promptText);
                } else {
                  handleGenerate(promptText);
                }
              }}
            />
          </div>
        )}
      </div>
    </section>
  );
}

