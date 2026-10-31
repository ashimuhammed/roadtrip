"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  X,
  Sparkles,
  Send,
  Calendar,
  Compass,
  MapPin,
  Car,
  Clock,
  Settings,
  RefreshCw,
  SlidersHorizontal,
  MessageSquare,
  ChevronRight,
  ShieldCheck,
  CheckCircle2,
  Zap,
  Mountain,
  Waves,
  Sun,
  Trees,
  Utensils,
  Printer
} from "lucide-react";
import {
  TripPreferences,
  ScheduledTripPlan,
  ChatMessage,
  generateSmartTripSchedule,
  KERALA_STARTING_HUBS,
  TRIP_THEMES,
  QUICK_AI_PROMPTS
} from "@/lib/ai-trip-planner";
import { generateSchedulePdf } from "@/lib/pdf-generator";
import ScheduleTimelineView from "./ScheduleTimelineView";

interface AiTripAssistantModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialPrompt?: string;
}

export default function AiTripAssistantModal({
  isOpen,
  onClose,
  initialPrompt
}: AiTripAssistantModalProps) {
  const [activeTab, setActiveTab] = useState<"chat" | "wizard" | "schedule">("chat");
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputText, setInputText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [currentPlan, setCurrentPlan] = useState<ScheduledTripPlan | null>(null);
  const [showSettings, setShowSettings] = useState(false);
  const [customApiKey, setCustomApiKey] = useState("");
  const chatBottomRef = useRef<HTMLDivElement>(null);
  const promptSentRef = useRef<string | null>(null);

  // Wizard state
  const [selectedHub, setSelectedHub] = useState("Kochi");
  const [selectedDays, setSelectedDays] = useState(4);
  const [selectedTheme, setSelectedTheme] = useState<TripPreferences["theme"]>("highlands");
  const [selectedVehicle, setSelectedVehicle] = useState<TripPreferences["vehicle"]>("suv");
  const [selectedGroup, setSelectedGroup] = useState<TripPreferences["travelGroup"]>("couple");
  const [selectedPace, setSelectedPace] = useState<TripPreferences["pace"]>("balanced");

  // Load custom key from localStorage
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedKey = localStorage.getItem("kerala_gemini_api_key");
      if (storedKey) setCustomApiKey(storedKey);
    }
  }, []);

  // Initial welcome message
  useEffect(() => {
    if (messages.length === 0) {
      const defaultPlan = generateSmartTripSchedule({
        startCity: "Kochi",
        durationDays: 4,
        theme: "highlands",
        travelGroup: "couple",
        vehicle: "suv",
        pace: "balanced"
      });
      setCurrentPlan(defaultPlan);

      setMessages([
        {
          id: "welcome-1",
          sender: "assistant",
          text: `Namaskaram! 🌴 I am your **Kerala Roadtrip AI Assistant**.\n\nTell me where you want to go, your travel style, or duration — and I will generate an optimized, day-by-day road itinerary complete with driving times, ghat warnings, local food stops, and scenic checkpoints!`,
          timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
          suggestedPlan: defaultPlan
        }
      ]);
    }
  }, [messages.length]);

  // Handle initial prompt passed from external triggers without duplicating
  useEffect(() => {
    if (initialPrompt && isOpen && promptSentRef.current !== initialPrompt) {
      promptSentRef.current = initialPrompt;
      handleSendMessage(initialPrompt);
    }
  }, [initialPrompt, isOpen]);

  // Handle Escape key to close modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  // Auto scroll chat
  useEffect(() => {
    if (activeTab === "chat") {
      chatBottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isLoading, activeTab]);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const handleSaveApiKey = (key: string) => {
    setCustomApiKey(key);
    if (typeof window !== "undefined") {
      if (key) {
        localStorage.setItem("kerala_gemini_api_key", key);
      } else {
        localStorage.removeItem("kerala_gemini_api_key");
      }
    }
    setShowSettings(false);
  };

  const handleSendMessage = async (customText?: string) => {
    const textToSend = customText || inputText;
    if (!textToSend.trim() || isLoading) return;

    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: "user",
      text: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    };

    setMessages((prev) => [...prev, userMessage]);
    if (!customText) setInputText("");
    setIsLoading(true);

    try {
      const res = await fetch("/api/trip-assistant", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: textToSend,
          customApiKey: customApiKey || undefined
        })
      });

      if (!res.ok) {
        throw new Error("Failed response from server");
      }

      const data = await res.json();
      const plan: ScheduledTripPlan = data.plan;

      setCurrentPlan(plan);

      const assistantMessage: ChatMessage = {
        id: `assistant-${Date.now()}`,
        sender: "assistant",
        text: data.text,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        suggestedPlan: plan
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (err) {
      console.error(err);
      // Fallback local response
      const fallbackPlan = generateSmartTripSchedule({
        startCity: selectedHub,
        durationDays: selectedDays,
        theme: selectedTheme,
        travelGroup: selectedGroup,
        vehicle: selectedVehicle,
        pace: selectedPace,
        customNotes: textToSend
      });
      setCurrentPlan(fallbackPlan);

      const fallbackMsg: ChatMessage = {
        id: `assistant-${Date.now()}`,
        sender: "assistant",
        text: `I've prepared a customized schedule for **${fallbackPlan.tripTitle}** covering ~${fallbackPlan.totalDistanceKm} km with scenic stopovers and food checkpoints! Check the schedule timetable below.`,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        suggestedPlan: fallbackPlan
      };
      setMessages((prev) => [...prev, fallbackMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGenerateFromWizard = () => {
    setIsLoading(true);
    const plan = generateSmartTripSchedule({
      startCity: selectedHub,
      durationDays: selectedDays,
      theme: selectedTheme,
      travelGroup: selectedGroup,
      vehicle: selectedVehicle,
      pace: selectedPace
    });

    setCurrentPlan(plan);

    const generatedMsg: ChatMessage = {
      id: `assistant-${Date.now()}`,
      sender: "assistant",
      text: `✨ Generated your **${selectedDays}-Day ${plan.tripTitle}** departing from **${selectedHub}** tailored for ${selectedGroup} in a ${selectedVehicle.toUpperCase()}.\n\nEstimated route distance is **~${plan.totalDistanceKm} km** with **${plan.hairpinCount} scenic hairpin turns**!`,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      suggestedPlan: plan
    };

    setMessages((prev) => [...prev, generatedMsg]);
    setActiveTab("schedule");
    setIsLoading(false);
  };

  if (!isOpen) return null;

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 bg-black/80 backdrop-blur-md animate-in fade-in duration-200"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-5xl h-[92vh] max-h-[900px] bg-zinc-950 border border-zinc-800 rounded-3xl shadow-2xl flex flex-col overflow-hidden text-zinc-100"
      >
        {/* Top Header Bar */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-zinc-800/80 bg-zinc-900/60 backdrop-blur-md">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-emerald-600 via-teal-600 to-green-500 flex items-center justify-center text-white shadow-lg shadow-emerald-600/30">
              <Compass className="w-5 h-5 animate-pulse-slow" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base sm:text-lg font-black tracking-tight text-white">
                  Kerala Roadtrip <span className="text-emerald-400">AI Assistant</span>
                </h2>
                <span className="hidden sm:inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-[10px] font-bold text-emerald-300">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                  <span>Schedule Trip Mode Active</span>
                </span>
              </div>
              <p className="text-[11px] text-zinc-400">
                Curating turn-by-turn road schedules, ghat safety, and highway dining across Kerala
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowSettings(!showSettings)}
              title="Assistant Settings / Gemini Key"
              className="p-2 rounded-xl text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
            >
              <Settings className="w-4 h-4" />
            </button>

            <button
              onClick={onClose}
              className="p-2 rounded-xl text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Optional Custom API Key Drawer */}
        {showSettings && (
          <div className="px-5 py-3.5 bg-zinc-900/90 border-b border-zinc-800 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs animate-in slide-in-from-top-2">
            <div className="flex items-center gap-2 text-zinc-300">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>
                Optional: Supply custom Google Gemini API Key for deep conversational analysis
              </span>
            </div>
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <input
                type="password"
                placeholder="AIzaSy..."
                value={customApiKey}
                onChange={(e) => setCustomApiKey(e.target.value)}
                className="px-3 py-1.5 rounded-xl bg-zinc-800 border border-zinc-700 text-white text-xs w-full sm:w-56 focus:outline-none focus:border-emerald-500"
              />
              <button
                onClick={() => handleSaveApiKey(customApiKey)}
                className="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs"
              >
                Save
              </button>
            </div>
          </div>
        )}

        {/* Mode Navigation Tabs */}
        <div className="flex items-center justify-between px-5 py-2.5 border-b border-zinc-800/80 bg-zinc-950/40">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab("chat")}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                activeTab === "chat"
                  ? "bg-emerald-600 text-white shadow-sm"
                  : "text-zinc-400 hover:text-white hover:bg-zinc-800"
              }`}
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>AI Chat & Prompts</span>
            </button>

            <button
              onClick={() => setActiveTab("wizard")}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                activeTab === "wizard"
                  ? "bg-emerald-600 text-white shadow-sm"
                  : "text-zinc-400 hover:text-white hover:bg-zinc-800"
              }`}
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span>Trip Wizard</span>
            </button>

            {currentPlan && (
              <button
                onClick={() => setActiveTab("schedule")}
                className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  activeTab === "schedule"
                    ? "bg-teal-600 text-white shadow-sm"
                    : "text-teal-400 hover:text-teal-300 hover:bg-zinc-800"
                }`}
              >
                <Calendar className="w-3.5 h-3.5" />
                <span>Schedule Timetable ({currentPlan.days.length}D)</span>
              </button>
            )}
          </div>

          {currentPlan && activeTab !== "schedule" && (
            <button
              onClick={() => setActiveTab("schedule")}
              className="text-xs font-bold text-emerald-400 hover:text-emerald-300 flex items-center gap-1"
            >
              <span>View Itinerary</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Main Content Area */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6">
          {/* TAB 1: CONVERSATIONAL AI CHAT */}
          {activeTab === "chat" && (
            <div className="max-w-4xl mx-auto space-y-6">
              {/* Quick Prompt Starters */}
              <div className="space-y-2">
                <span className="text-[11px] font-bold uppercase tracking-wider text-zinc-400 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                  <span>Popular Roadtrip Prompts:</span>
                </span>
                <div className="flex flex-wrap gap-2">
                  {QUICK_AI_PROMPTS.map((qp, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleSendMessage(qp.prompt)}
                      className="px-3 py-1.5 rounded-xl bg-zinc-900 hover:bg-emerald-950/70 hover:border-emerald-500/50 border border-zinc-800 text-xs font-medium text-zinc-300 hover:text-emerald-300 transition-all text-left"
                    >
                      {qp.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Chat Messages */}
              <div className="space-y-4 pt-2">
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex flex-col ${
                      msg.sender === "user" ? "items-end" : "items-start"
                    }`}
                  >
                    <div
                      className={`max-w-[88%] sm:max-w-[80%] rounded-2xl p-4 text-xs sm:text-sm leading-relaxed ${
                        msg.sender === "user"
                          ? "bg-emerald-600 text-white font-medium rounded-tr-none"
                          : "bg-zinc-900 border border-zinc-800 text-zinc-200 rounded-tl-none shadow-lg"
                      }`}
                    >
                      <div className="whitespace-pre-line">{msg.text}</div>

                      {/* Attached Plan preview button */}
                      {msg.suggestedPlan && (
                        <div className="mt-4 pt-3 border-t border-zinc-700/60 flex items-center justify-between gap-3">
                          <div>
                            <div className="text-xs font-bold text-emerald-400">
                              🚗 {msg.suggestedPlan.tripTitle}
                            </div>
                            <div className="text-[11px] text-zinc-400">
                              {msg.suggestedPlan.days.length} Days • ~{msg.suggestedPlan.totalDistanceKm} km • {msg.suggestedPlan.hairpinCount} Hairpins
                            </div>
                          </div>
                          <div className="flex items-center gap-1.5 flex-wrap">
                            <button
                              onClick={() => generateSchedulePdf(msg.suggestedPlan!)}
                              title="Download Itinerary PDF"
                              className="px-2.5 py-1.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-emerald-300 font-bold text-xs flex items-center gap-1 border border-emerald-500/30 transition-all active:scale-95"
                            >
                              <Printer className="w-3.5 h-3.5 text-emerald-400" />
                              <span>PDF</span>
                            </button>

                            <button
                              onClick={() => {
                                setCurrentPlan(msg.suggestedPlan!);
                                setActiveTab("schedule");
                              }}
                              className="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center gap-1 transition-all active:scale-95 shadow-md"
                            >
                              <span>Inspect Schedule</span>
                              <ChevronRight className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                    <span className="text-[10px] text-zinc-500 mt-1 px-1">
                      {msg.timestamp}
                    </span>
                  </div>
                ))}

                {isLoading && (
                  <div className="flex items-center gap-2 p-3 rounded-2xl bg-zinc-900/80 border border-zinc-800 w-fit text-xs text-zinc-400 animate-pulse">
                    <Compass className="w-4 h-4 text-emerald-400 animate-spin" />
                    <span>AI Roadtrip Specialist is calculating optimal driving corridors & food stops...</span>
                  </div>
                )}
                <div ref={chatBottomRef} />
              </div>
            </div>
          )}

          {/* TAB 2: TRIP WIZARD FORM */}
          {activeTab === "wizard" && (
            <div className="max-w-3xl mx-auto space-y-6">
              <div className="border-b border-zinc-800 pb-4">
                <h3 className="text-xl font-bold text-white">
                  Design Your Kerala Roadtrip Schedule
                </h3>
                <p className="text-xs text-zinc-400 mt-1">
                  Select your preferences below to have our AI generate a balanced day-by-day timetable.
                </p>
              </div>

              {/* 1. Starting Hub */}
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-zinc-400 block mb-2">
                  1. Starting Point / Gateway City
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {KERALA_STARTING_HUBS.map((hub) => (
                    <button
                      key={hub.id}
                      onClick={() => setSelectedHub(hub.id)}
                      className={`p-3 rounded-2xl border text-left transition-all ${
                        selectedHub === hub.id
                          ? "bg-emerald-950/60 border-emerald-500 text-white shadow-md"
                          : "bg-zinc-900 border-zinc-800 text-zinc-300 hover:bg-zinc-800/80"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold">{hub.name}</span>
                        <span className="text-[10px] px-1.5 py-0.5 rounded bg-zinc-800 text-emerald-400 font-mono">
                          {hub.airport}
                        </span>
                      </div>
                      <div className="text-[11px] text-zinc-400 mt-1">{hub.desc}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* 2. Duration & Vehicle */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-zinc-400 block mb-2">
                    2. Duration: <span className="text-emerald-400">{selectedDays} Days</span>
                  </label>
                  <div className="flex gap-1.5 p-1 bg-zinc-900 border border-zinc-800 rounded-2xl">
                    {[2, 3, 4, 5, 7].map((d) => (
                      <button
                        key={d}
                        onClick={() => setSelectedDays(d)}
                        className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all ${
                          selectedDays === d
                            ? "bg-emerald-600 text-white shadow"
                            : "text-zinc-400 hover:text-white"
                        }`}
                      >
                        {d} Days
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-zinc-400 block mb-2">
                    3. Vehicle Class
                  </label>
                  <div className="grid grid-cols-4 gap-1.5">
                    {[
                      { id: "suv", label: "SUV / 4x4", icon: Car },
                      { id: "hatchback", label: "Hatchback", icon: Car },
                      { id: "ev", label: "Electric EV", icon: Zap },
                      { id: "bike", label: "Motorcycle", icon: Compass }
                    ].map((v) => {
                      const VIcon = v.icon;
                      return (
                        <button
                          key={v.id}
                          onClick={() => setSelectedVehicle(v.id as any)}
                          className={`p-2 rounded-xl border text-center transition-all ${
                            selectedVehicle === v.id
                              ? "bg-emerald-600 border-emerald-500 text-white"
                              : "bg-zinc-900 border-zinc-800 text-zinc-400 hover:text-white"
                          }`}
                        >
                          <VIcon className="w-4 h-4 mx-auto mb-1" />
                          <span className="text-[10px] font-bold block">{v.label}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* 3. Theme & Terrain */}
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-zinc-400 block mb-2">
                  4. Primary Vibe & Terrains
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5">
                  {TRIP_THEMES.map((th) => (
                    <button
                      key={th.id}
                      onClick={() => setSelectedTheme(th.id as any)}
                      className={`p-3 rounded-2xl border text-left transition-all ${
                        selectedTheme === th.id
                          ? "bg-emerald-950/60 border-emerald-500 text-white shadow-md"
                          : "bg-zinc-900 border-zinc-800 text-zinc-300 hover:bg-zinc-800/80"
                      }`}
                    >
                      <div className="text-xs font-bold flex items-center gap-1.5">
                        <span>{th.label}</span>
                      </div>
                      <div className="text-[11px] text-zinc-400 mt-1 leading-snug">
                        {th.desc}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* 4. Travel Group & Pace */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-zinc-400 block mb-2">
                    5. Travel Companions
                  </label>
                  <div className="grid grid-cols-4 gap-1.5 p-1 bg-zinc-900 border border-zinc-800 rounded-2xl">
                    {[
                      { id: "solo", label: "Solo" },
                      { id: "couple", label: "Couple" },
                      { id: "family", label: "Family" },
                      { id: "friends", label: "Friends" }
                    ].map((g) => (
                      <button
                        key={g.id}
                        onClick={() => setSelectedGroup(g.id as any)}
                        className={`py-2 text-xs font-bold rounded-xl transition-all ${
                          selectedGroup === g.id
                            ? "bg-emerald-600 text-white"
                            : "text-zinc-400 hover:text-white"
                        }`}
                      >
                        {g.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-zinc-400 block mb-2">
                    6. Driving Pace
                  </label>
                  <div className="grid grid-cols-3 gap-1.5 p-1 bg-zinc-900 border border-zinc-800 rounded-2xl">
                    {[
                      { id: "relaxed", label: "Relaxed" },
                      { id: "balanced", label: "Balanced" },
                      { id: "thrilling", label: "Fast-Paced" }
                    ].map((p) => (
                      <button
                        key={p.id}
                        onClick={() => setSelectedPace(p.id as any)}
                        className={`py-2 text-xs font-bold rounded-xl transition-all ${
                          selectedPace === p.id
                            ? "bg-emerald-600 text-white"
                            : "text-zinc-400 hover:text-white"
                        }`}
                      >
                        {p.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <div className="pt-4">
                <button
                  onClick={handleGenerateFromWizard}
                  className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 hover:from-emerald-500 hover:to-teal-600 text-white font-extrabold text-sm uppercase tracking-wider transition-all shadow-lg shadow-emerald-600/30 flex items-center justify-center gap-2 active:scale-98"
                >
                  <Sparkles className="w-4 h-4 text-amber-300" />
                  <span>Synthesize Complete Day-by-Day Roadtrip Schedule</span>
                </button>
              </div>
            </div>
          )}

          {/* TAB 3: VISUAL SCHEDULE TIMELINE VIEW */}
          {activeTab === "schedule" && (
            <div className="max-w-4xl mx-auto">
              {currentPlan ? (
                <ScheduleTimelineView
                  plan={currentPlan}
                  onRefineWithPrompt={(promptText) => {
                    setActiveTab("chat");
                    handleSendMessage(promptText);
                  }}
                />
              ) : (
                <div className="text-center p-12 text-zinc-500">
                  No plan generated yet. Use the Wizard or Chat to create your custom schedule!
                </div>
              )}
            </div>
          )}
        </div>

        {/* Bottom Input Box (Shown only in Chat mode) */}
        {activeTab === "chat" && (
          <div className="p-3 sm:p-4 bg-zinc-900/90 border-t border-zinc-800/80">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="flex items-center gap-2 max-w-4xl mx-auto"
            >
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Ask e.g. 'Plan a 4-day monsoon roadtrip starting from Kochi to Munnar & Alleppey'..."
                className="flex-1 py-3 px-4 rounded-2xl bg-zinc-800/90 border border-zinc-700 text-white text-xs sm:text-sm focus:outline-none focus:border-emerald-500 placeholder:text-zinc-500"
              />
              <button
                type="submit"
                disabled={!inputText.trim() || isLoading}
                className="px-5 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white font-bold text-xs uppercase tracking-wider transition-all flex items-center gap-1.5 shadow-md flex-shrink-0"
              >
                <span>Ask AI</span>
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}

