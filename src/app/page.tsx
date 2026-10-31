"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import dynamic from "next/dynamic";
import { KERALA_ROUTES, KERALA_TRAVEL_TIPS } from "@/data/routes";
import RouteCard from "@/components/RouteCard";
import ScheduleTripSection from "@/components/ScheduleTripSection";
import { triggerAiAssistant } from "@/components/AiAssistantGlobalProvider";

const MasterKeralaMap = dynamic(() => import("@/components/MasterKeralaMap"), {
  ssr: false,
  loading: () => (
    <div className="h-[520px] rounded-3xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-400">
      <div className="flex items-center gap-2">
        <Compass className="w-6 h-6 animate-spin text-emerald-500" />
        <span className="text-sm font-semibold">Loading Interactive Kerala Roadtrip Atlas...</span>
      </div>
    </div>
  ),
});
import {
  Compass,
  MapPin,
  Calendar,
  Mountain,
  Waves,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Navigation,
  Car,
  Fuel,
  CloudRain,
  Coffee,
  Sun,
  Flame,
  Zap,
  SlidersHorizontal,
  ChevronRight,
  Search,
  Users,
  Bot
} from "lucide-react";

export default function HomePage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [selectedDuration, setSelectedDuration] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");

  // Budget Calculator state
  const [calcVehicle, setCalcVehicle] = useState<"hatchback" | "suv" | "ev">("suv");
  const [calcDays, setCalcDays] = useState<number>(4);
  const [calcTravelers, setCalcTravelers] = useState<number>(2);

  const categories = [
    { id: "All", label: "All Routes" },
    { id: "High Ranges", label: "High Ranges & Ghats", icon: Mountain },
    { id: "Backwaters", label: "Backwaters & Waterways", icon: Waves },
    { id: "Coastal & Beaches", label: "Coastal & Beaches", icon: Sun },
    { id: "Wildlife & Eco", label: "Wildlife & Rainforests", icon: Sparkles },
    { id: "Culinary", label: "Food Trails", icon: Coffee },
  ];

  const filteredRoutes = KERALA_ROUTES.filter((route) => {
    // Category filter
    let matchesCategory = true;
    if (selectedCategory === "High Ranges") matchesCategory = route.tags.some(t => ["Mountains", "Tea Estates", "Hairpin Bends"].includes(t));
    if (selectedCategory === "Backwaters") matchesCategory = route.tags.some(t => ["Backwaters", "Waterways"].includes(t));
    if (selectedCategory === "Coastal & Beaches") matchesCategory = route.tags.some(t => ["Beaches", "Coastal Highway", "Drive-in Beach"].includes(t));
    if (selectedCategory === "Wildlife & Eco") matchesCategory = route.tags.some(t => ["Wildlife", "Forests", "Rainforest"].includes(t));
    if (selectedCategory === "Culinary") matchesCategory = route.tags.some(t => ["Culinary", "Drive-in Beach"].includes(t));

    // Duration filter
    let matchesDuration = true;
    if (selectedDuration === "3") matchesDuration = route.durationDays === 3;
    if (selectedDuration === "4-5") matchesDuration = route.durationDays >= 4;

    // Search query filter
    let matchesSearch = true;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      matchesSearch =
        route.title.toLowerCase().includes(q) ||
        route.subtitle.toLowerCase().includes(q) ||
        route.stops.some(s => s.name.toLowerCase().includes(q) || s.region.toLowerCase().includes(q));
    }

    return matchesCategory && matchesDuration && matchesSearch;
  });

  // Budget calculator formula
  const vehicleMileage = { hatchback: 18, suv: 13, ev: 6.5 }[calcVehicle];
  const fuelUnitCost = { hatchback: 108, suv: 108, ev: 22 }[calcVehicle];
  const avgTotalKm = calcDays * 110;
  const estimatedFuelCost = Math.round((avgTotalKm / vehicleMileage) * fuelUnitCost);
  const estimatedStayCost = calcDays * (calcTravelers > 2 ? 4500 : 3200);
  const estimatedFoodCost = calcDays * calcTravelers * 900;
  const totalTripEstimate = estimatedFuelCost + estimatedStayCost + estimatedFoodCost;

  const marqueeHighlights = [
    "⛰️ 40 Hairpin Bends of Munnar & Valparai",
    "🚗 Asia's Longest Drive-in Beach at Muzhappilangad (Kannur)",
    "🌊 Red Sandstone Cliffs of Varkala",
    "🛶 Below-Sea-Level AC Canal Road in Kuttanad",
    "☕ World's Highest Organic Tea Estate at Kolukkumalai (1,880m)",
    "🦅 200-ft Colossal Jatayu Rock Sculpture (World's Largest)",
    "🐘 Periyar Tiger Reserve Lake Safari",
    "🍲 Legendary Malabar Dum Biryani & Toddy Shop Karimeen",
    "💧 Athirappilly Waterfall: The Niagara of India"
  ];

  return (
    <div className="space-y-24 pb-20 overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative min-h-[92vh] flex items-center justify-center bg-zinc-950 text-white overflow-hidden px-4 sm:px-6 lg:px-8 pt-24 pb-16">
        {/* Background Image with Deep Gradient Mesh */}
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1491497895121-1334fc14d8c9?auto=format&fit=crop&w=2200&q=85"
            alt="Misty tea gardens of Munnar Kerala by Vivek Kumar"
            fill
            priority
            sizes="100vw"
            className="object-cover opacity-40 scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/70 to-zinc-950/40" />
          <div className="absolute inset-0 bg-gradient-to-r from-zinc-950/95 via-transparent to-zinc-950/90" />
        </div>

        {/* Hero Content Container */}
        <div className="relative z-10 max-w-5xl mx-auto text-center space-y-7">
          {/* Animated Catchy Pill */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/15 border border-emerald-400/40 backdrop-blur-xl text-emerald-300 text-xs sm:text-sm font-bold tracking-wide shadow-glow-emerald">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span>2025 Kerala Driving Guide • 6 Handpicked Circuits</span>
          </div>

          {/* Headline */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight leading-[1.08]">
            Drive Through{" "}
            <span className="gradient-text-emerald">
              God&apos;s Own Country
            </span>
          </h1>

          {/* Subtitle */}
          <p className="max-w-3xl mx-auto text-base sm:text-lg text-zinc-300 font-normal leading-relaxed">
            From mist-swirled tea hairpin passes and roaring jungle falls to sun-drenched cliff beaches and below-sea-level backwaters. Day-by-day itineraries with tested drive times and local foodie stops.
          </p>

          {/* Quick Action Badges */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-1">
            <button
              onClick={() => triggerAiAssistant()}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 hover:from-emerald-500 hover:to-teal-500 text-white font-extrabold text-xs uppercase tracking-wider shadow-lg shadow-emerald-600/30 hover:scale-105 active:scale-95 transition-all"
            >
              <Bot className="w-4 h-4 text-emerald-300 animate-pulse" />
              <span>Schedule Trip with AI Assistant</span>
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            </button>

            <a
              href="#schedule-trip-ai"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-zinc-900/80 hover:bg-zinc-800 border border-zinc-700/80 text-zinc-200 font-bold text-xs uppercase tracking-wider transition-all hover:scale-105"
            >
              <Calendar className="w-4 h-4 text-emerald-400" />
              <span>Open Schedule Mode</span>
            </a>

            <a
              href="#kerala-map"
              className="inline-flex items-center gap-2 px-4 py-3 rounded-2xl bg-zinc-900/60 hover:bg-zinc-800/80 border border-zinc-800 text-zinc-300 font-bold text-xs uppercase tracking-wider transition-all"
            >
              <MapPin className="w-3.5 h-3.5 text-teal-400" />
              <span>Interactive Atlas</span>
            </a>
          </div>

          {/* 1-Click Interactive Trip Finder Box */}
          <div id="route-finder" className="max-w-3xl mx-auto mt-6 p-4 sm:p-5 rounded-3xl bg-zinc-900/90 border border-zinc-700/80 backdrop-blur-xl shadow-2xl text-left space-y-4">
            <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-1.5">
                <SlidersHorizontal className="w-4 h-4" />
                <span>Instant Route Finder</span>
              </span>
              <span className="text-xs font-semibold text-zinc-400">
                {filteredRoutes.length} of {KERALA_ROUTES.length} Routes Match
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {/* Duration filter buttons */}
              <div>
                <label className="text-[11px] font-bold uppercase text-zinc-400 block mb-1.5">
                  Trip Duration
                </label>
                <div className="flex gap-1.5 p-1 bg-zinc-800/80 rounded-xl">
                  {["All", "3", "4-5"].map((d) => (
                    <button
                      key={d}
                      onClick={() => setSelectedDuration(d)}
                      className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition-all ${
                        selectedDuration === d
                          ? "bg-emerald-600 text-white shadow-sm"
                          : "text-zinc-400 hover:text-white"
                      }`}
                    >
                      {d === "All" ? "Any" : d === "3" ? "3 Days" : "4-5 Days"}
                    </button>
                  ))}
                </div>
              </div>

              {/* Terrain filter buttons */}
              <div>
                <label className="text-[11px] font-bold uppercase text-zinc-400 block mb-1.5">
                  Terrain Vibe
                </label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full py-2 px-3 text-xs font-bold rounded-xl bg-zinc-800 text-zinc-200 border border-zinc-700 focus:outline-none focus:border-emerald-500"
                >
                  <option value="All">All Terrains</option>
                  <option value="High Ranges">Misty High Ranges & Ghats</option>
                  <option value="Backwaters">Calm Backwaters & Waterways</option>
                  <option value="Coastal & Beaches">Beaches & Coastal Highway</option>
                  <option value="Wildlife & Eco">Wildlife & Rainforests</option>
                  <option value="Culinary">Foodie Highway Trails</option>
                </select>
              </div>

              {/* Destination Search */}
              <div>
                <label className="text-[11px] font-bold uppercase text-zinc-400 block mb-1.5">
                  Search Destination
                </label>
                <div className="relative">
                  <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-zinc-500" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Munnar, Varkala, Kannur..."
                    className="w-full py-2 pl-9 pr-3 text-xs rounded-xl bg-zinc-800 text-zinc-200 border border-zinc-700 focus:outline-none focus:border-emerald-500 placeholder:text-zinc-500"
                  />
                </div>
              </div>
            </div>

            {/* Jump to results button */}
            <div className="pt-2 flex items-center justify-between">
              <span className="text-xs text-zinc-400 hidden sm:inline">
                Instant filtering applies to route cards below
              </span>
              <a
                href="#routes"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs uppercase tracking-wider transition-all shadow-md"
              >
                <span>View {filteredRoutes.length} Matching Routes</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Quick Metrics Counter */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 max-w-4xl mx-auto pt-6 border-t border-zinc-800/80">
            <div className="p-3.5 rounded-2xl bg-zinc-900/60 border border-zinc-800 backdrop-blur-sm">
              <div className="text-2xl sm:text-3xl font-black text-emerald-400">6 Routes</div>
              <div className="text-xs text-zinc-400 mt-0.5">Tested Road Circuits</div>
            </div>
            <div className="p-3.5 rounded-2xl bg-zinc-900/60 border border-zinc-800 backdrop-blur-sm">
              <div className="text-2xl sm:text-3xl font-black text-teal-400">40 Hairpins</div>
              <div className="text-xs text-zinc-400 mt-0.5">Scenic Ghat Ascents</div>
            </div>
            <div className="p-3.5 rounded-2xl bg-zinc-900/60 border border-zinc-800 backdrop-blur-sm">
              <div className="text-2xl sm:text-3xl font-black text-amber-400">1,880 m</div>
              <div className="text-xs text-zinc-400 mt-0.5">Top Skyway Elevation</div>
            </div>
            <div className="p-3.5 rounded-2xl bg-zinc-900/60 border border-zinc-800 backdrop-blur-sm">
              <div className="text-2xl sm:text-3xl font-black text-blue-400">-2 m</div>
              <div className="text-xs text-zinc-400 mt-0.5">Below-Sea-Level Polders</div>
            </div>
          </div>
        </div>
      </section>

      {/* Catchy Continuous Scrolling Marquee Ticker */}
      <div className="w-full bg-emerald-950/70 border-y border-emerald-800/50 py-3.5 overflow-hidden">
        <div className="marquee-container">
          <div className="marquee-content flex items-center gap-10 text-xs font-bold uppercase tracking-wider text-emerald-200">
            {marqueeHighlights.concat(marqueeHighlights).map((item, idx) => (
              <span key={idx} className="flex items-center gap-3 whitespace-nowrap">
                <span>{item}</span>
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400 inline-block" />
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Interactive Master Kerala Roadtrip Map Section */}
      <section id="kerala-map" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-28">
        <MasterKeralaMap />
      </section>

      {/* AI Schedule Trip Mode Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScheduleTripSection onOpenFullModal={(prompt) => triggerAiAssistant(prompt)} />
      </div>

      {/* Featured Routes Section */}
      <section id="routes" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-28">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 mb-2">
              <Compass className="w-4 h-4" />
              <span>Handpicked Road Expeditions</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-zinc-900 dark:text-zinc-100 tracking-tight">
              Select Your Kerala Road Adventure
            </h2>
            <p className="text-zinc-600 dark:text-zinc-400 text-sm sm:text-base mt-2 max-w-2xl">
              Showing {filteredRoutes.length} curated road trip itineraries with turn-by-turn waypoints, fuel estimates, and regional food tips.
            </p>
          </div>

          {/* Quick Category Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`flex-shrink-0 px-4 py-2 rounded-2xl text-xs font-bold uppercase tracking-wider transition-all ${
                  selectedCategory === cat.id
                    ? "bg-emerald-600 text-white shadow-md shadow-emerald-600/30 scale-105"
                    : "bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-700"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Route Cards Grid */}
        {filteredRoutes.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredRoutes.map((route) => (
              <RouteCard key={route.slug} route={route} />
            ))}
          </div>
        ) : (
          <div className="p-12 text-center rounded-3xl bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 space-y-4">
            <Compass className="w-10 h-10 text-zinc-400 mx-auto" />
            <h3 className="text-lg font-bold text-zinc-800 dark:text-zinc-200">No matching routes found</h3>
            <p className="text-xs text-zinc-500">Try clearing your search query or setting the duration filter to &quot;Any&quot;.</p>
            <button
              onClick={() => {
                setSelectedCategory("All");
                setSelectedDuration("All");
                setSearchQuery("");
              }}
              className="px-5 py-2.5 rounded-xl bg-emerald-600 text-white text-xs font-bold uppercase tracking-wider"
            >
              Reset All Filters
            </button>
          </div>
        )}
      </section>

      {/* Interactive Trip Budget & Fuel Calculator Section */}
      <section id="budget-calculator" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-28">
        <div className="bg-gradient-to-br from-zinc-900 via-zinc-900 to-emerald-950 text-white rounded-3xl p-8 sm:p-12 border border-zinc-800 relative overflow-hidden shadow-2xl">
          <div className="max-w-3xl mb-8">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-1.5 mb-2">
              <Fuel className="w-4 h-4" />
              <span>Interactive Travel Tool</span>
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
              Kerala Roadtrip Budget & Fuel Estimator
            </h2>
            <p className="text-xs sm:text-sm text-zinc-300 mt-1">
              Adjust vehicle type, road trip days, and passengers to instantly forecast your total journey costs across Kerala highways.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Controls */}
            <div className="lg:col-span-7 space-y-6">
              {/* Vehicle Type Picker */}
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-zinc-400 block mb-2">
                  1. Choose Vehicle Class
                </label>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    onClick={() => setCalcVehicle("hatchback")}
                    className={`p-3 rounded-2xl border text-center transition-all ${
                      calcVehicle === "hatchback"
                        ? "bg-emerald-600 border-emerald-500 text-white shadow-md"
                        : "bg-zinc-800/80 border-zinc-700 text-zinc-300 hover:bg-zinc-700/80"
                    }`}
                  >
                    <Car className="w-5 h-5 mx-auto mb-1" />
                    <span className="text-xs font-bold block">Hatchback</span>
                    <span className="text-[10px] opacity-75">18 km/l</span>
                  </button>

                  <button
                    onClick={() => setCalcVehicle("suv")}
                    className={`p-3 rounded-2xl border text-center transition-all ${
                      calcVehicle === "suv"
                        ? "bg-emerald-600 border-emerald-500 text-white shadow-md"
                        : "bg-zinc-800/80 border-zinc-700 text-zinc-300 hover:bg-zinc-700/80"
                    }`}
                  >
                    <Car className="w-5 h-5 mx-auto mb-1" />
                    <span className="text-xs font-bold block">SUV / Crossover</span>
                    <span className="text-[10px] opacity-75">13 km/l</span>
                  </button>

                  <button
                    onClick={() => setCalcVehicle("ev")}
                    className={`p-3 rounded-2xl border text-center transition-all ${
                      calcVehicle === "ev"
                        ? "bg-emerald-600 border-emerald-500 text-white shadow-md"
                        : "bg-zinc-800/80 border-zinc-700 text-zinc-300 hover:bg-zinc-700/80"
                    }`}
                  >
                    <Zap className="w-5 h-5 mx-auto mb-1 text-amber-400" />
                    <span className="text-xs font-bold block">Electric (EV)</span>
                    <span className="text-[10px] opacity-75">₹22 / kWh</span>
                  </button>
                </div>
              </div>

              {/* Sliders for Days and Travelers */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-2xl bg-zinc-800/60 border border-zinc-700/70">
                  <div className="flex justify-between text-xs font-bold mb-2">
                    <span className="text-zinc-400">Trip Duration</span>
                    <span className="text-emerald-400">{calcDays} Days</span>
                  </div>
                  <input
                    type="range"
                    min="3"
                    max="7"
                    value={calcDays}
                    onChange={(e) => setCalcDays(Number(e.target.value))}
                    className="w-full accent-emerald-500 cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-zinc-500 mt-1">
                    <span>3 Days</span>
                    <span>7 Days</span>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-zinc-800/60 border border-zinc-700/70">
                  <div className="flex justify-between text-xs font-bold mb-2">
                    <span className="text-zinc-400">Total Travelers</span>
                    <span className="text-emerald-400">{calcTravelers} Persons</span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="6"
                    value={calcTravelers}
                    onChange={(e) => setCalcTravelers(Number(e.target.value))}
                    className="w-full accent-emerald-500 cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-zinc-500 mt-1">
                    <span>Solo / Couple</span>
                    <span>Group (6)</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Output Card */}
            <div className="lg:col-span-5 p-6 rounded-3xl bg-zinc-950/90 border border-emerald-900/60 shadow-xl space-y-4">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 block">
                Estimated Trip Budget Breakdown
              </span>

              <div className="space-y-3 text-xs">
                <div className="flex justify-between py-2 border-b border-zinc-800">
                  <span className="text-zinc-400 flex items-center gap-1.5">
                    <Fuel className="w-3.5 h-3.5 text-emerald-400" /> Fuel & Energy ({avgTotalKm} km)
                  </span>
                  <span className="font-bold text-white">₹{estimatedFuelCost.toLocaleString()}</span>
                </div>

                <div className="flex justify-between py-2 border-b border-zinc-800">
                  <span className="text-zinc-400 flex items-center gap-1.5">
                    <Mountain className="w-3.5 h-3.5 text-teal-400" /> Stays & Homestays ({calcDays} nights)
                  </span>
                  <span className="font-bold text-white">₹{estimatedStayCost.toLocaleString()}</span>
                </div>

                <div className="flex justify-between py-2 border-b border-zinc-800">
                  <span className="text-zinc-400 flex items-center gap-1.5">
                    <Coffee className="w-3.5 h-3.5 text-amber-400" /> Food & Highway Dhabas
                  </span>
                  <span className="font-bold text-white">₹{estimatedFoodCost.toLocaleString()}</span>
                </div>
              </div>

              <div className="pt-2">
                <div className="text-[11px] text-zinc-400 uppercase tracking-wider">Total Projected Budget</div>
                <div className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-green-300 mt-1">
                  ₹{totalTripEstimate.toLocaleString()} INR
                </div>
                <p className="text-[11px] text-zinc-500 mt-1">
                  Approx. ₹{Math.round(totalTripEstimate / calcTravelers).toLocaleString()} per person for {calcTravelers} travelers
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Kerala Highway Driving Guide Section */}
      <section id="highway-guide" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-28">
        <div className="bg-zinc-100 dark:bg-zinc-900 rounded-3xl p-8 sm:p-12 border border-zinc-200/80 dark:border-zinc-800 shadow-sm space-y-8">
          <div className="max-w-3xl">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 flex items-center gap-2 mb-2">
              <ShieldCheck className="w-4 h-4" />
              <span>Driver Handbook & Practical Advice</span>
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-zinc-900 dark:text-zinc-100 tracking-tight">
              Highway Wisdom for Driving in Kerala
            </h2>
            <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400 mt-2">
              Kerala&apos;s roads are remarkably scenic and well-connected, but mountain hairpin turns and tropical rain require sensible driver etiquette.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {KERALA_TRAVEL_TIPS.map((tip, idx) => (
              <div
                key={idx}
                className="bg-white dark:bg-zinc-800/80 rounded-2xl p-6 border border-zinc-200/80 dark:border-zinc-700/80 hover:border-emerald-500/60 shadow-sm hover:shadow-md transition-all hover:-translate-y-1"
              >
                <div className="w-10 h-10 rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mb-4 shadow-sm">
                  {idx === 0 && <Mountain className="w-5 h-5" />}
                  {idx === 1 && <CloudRain className="w-5 h-5" />}
                  {idx === 2 && <Fuel className="w-5 h-5" />}
                  {idx === 3 && <Coffee className="w-5 h-5" />}
                </div>
                <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100 mb-2">{tip.title}</h3>
                <p className="text-xs text-zinc-600 dark:text-zinc-300 leading-relaxed">{tip.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 text-white rounded-3xl p-8 sm:p-12 flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl shadow-emerald-700/20">
          <div className="space-y-3 text-center md:text-left z-10">
            <h2 className="text-2xl sm:text-4xl font-black tracking-tight">
              Ready to start your road trip?
            </h2>
            <p className="text-emerald-100 text-sm sm:text-base max-w-xl">
              Choose any route to access interactive waypoints, GPS coordinates, day-by-day logs, and recommended tea stalls.
            </p>
          </div>
          <Link
            href="/routes/mist-and-tea-trail"
            className="flex-shrink-0 inline-flex items-center gap-2.5 px-8 py-4 rounded-2xl bg-zinc-950 text-white hover:bg-zinc-900 font-bold text-sm sm:text-base shadow-xl hover:scale-105 transition-all z-10"
          >
            <Car className="w-5 h-5 text-emerald-400" />
            <span>Launch The Mist & Tea Trail</span>
          </Link>
        </div>
      </section>
    </div>
  );
}
