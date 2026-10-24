"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Route } from "@/data/routes";
import {
  Clock,
  MapPin,
  Gauge,
  Fuel,
  ArrowRight,
  ShieldCheck,
  Sparkles,
  Car,
  ChevronDown,
  Utensils,
  Camera,
  CheckCircle2
} from "lucide-react";
import { calculateEstimatedFuel } from "@/lib/utils";

interface RouteCardProps {
  route: Route;
}

export default function RouteCard({ route }: RouteCardProps) {
  const [showQuickStops, setShowQuickStops] = useState(false);
  const [heroMode, setHeroMode] = useState<"photo" | "map">("photo");
  const [hoveredStop, setHoveredStop] = useState<number | null>(null);
  const estimatedFuel = calculateEstimatedFuel(route.distanceKm);

  // Compute normalized SVG points for this route
  const lats = route.stops.map((s) => s.coordinates.lat);
  const lngs = route.stops.map((s) => s.coordinates.lng);
  const minLat = Math.min(...lats);
  const maxLat = Math.max(...lats);
  const minLng = Math.min(...lngs);
  const maxLng = Math.max(...lngs);
  const latSpan = Math.max(maxLat - minLat, 0.25);
  const lngSpan = Math.max(maxLng - minLng, 0.25);

  const mappedPoints = route.stops.map((stop) => {
    const x = ((stop.coordinates.lng - minLng) / lngSpan) * 68 + 16;
    const y = ((maxLat - stop.coordinates.lat) / latSpan) * 58 + 22;
    return { x, y, stop };
  });

  const pathD = mappedPoints.reduce((acc, curr, idx) => {
    return idx === 0 ? `M ${curr.x} ${curr.y}` : `${acc} L ${curr.x} ${curr.y}`;
  }, "");

  const difficultyConfig = {
    Easy: {
      label: "Easy Scenic Drive",
      color: "bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border-emerald-300/60 dark:border-emerald-700/60",
      dot: "bg-emerald-500",
    },
    Moderate: {
      label: "Moderate Ghat Passes",
      color: "bg-amber-500/15 text-amber-700 dark:text-amber-300 border-amber-300/60 dark:border-amber-700/60",
      dot: "bg-amber-500",
    },
    Challenging: {
      label: "Challenging Mountain Bends",
      color: "bg-rose-500/15 text-rose-700 dark:text-rose-300 border-rose-300/60 dark:border-rose-700/60",
      dot: "bg-rose-500",
    },
  }[route.difficulty];

  return (
    <div className="group relative flex flex-col bg-white dark:bg-zinc-900 rounded-3xl overflow-hidden border border-zinc-200/90 dark:border-zinc-800 shadow-md hover:shadow-2xl hover:border-emerald-500/40 hover:-translate-y-1.5 transition-all duration-300">
      {/* Hero Section: Photo OR Interactive Route Trail Map */}
      <div className="relative h-64 sm:h-72 w-full overflow-hidden bg-zinc-950">
        {heroMode === "photo" ? (
          <>
            <Image
              src={route.heroImage}
              alt={route.title}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
              priority={false}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/45 to-transparent" />
          </>
        ) : (
          <div className="relative w-full h-full p-4 flex flex-col justify-between bg-gradient-to-b from-zinc-900 via-emerald-950/40 to-zinc-950 select-none">
            {/* Background Grid Pattern */}
            <div
              className="absolute inset-0 opacity-15"
              style={{
                backgroundImage:
                  "linear-gradient(to right, #10b981 1px, transparent 1px), linear-gradient(to bottom, #10b981 1px, transparent 1px)",
                backgroundSize: "28px 28px",
              }}
            />

            {/* SVG Interactive Route Path */}
            <svg
              viewBox="0 0 100 100"
              className="w-full h-full relative z-10 drop-shadow-xl"
              preserveAspectRatio="xMidYMid meet"
            >
              {/* Glow underline */}
              <path
                d={pathD}
                fill="none"
                stroke="#059669"
                strokeWidth="6"
                strokeLinecap="round"
                strokeLinejoin="round"
                opacity="0.3"
              />
              {/* Animated Route Trail */}
              <path
                d={pathD}
                fill="none"
                stroke="#34d399"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeDasharray="4 2"
              />
              {/* Waypoint nodes */}
              {mappedPoints.map((pt, idx) => {
                const isHovered = hoveredStop === idx;
                return (
                  <g
                    key={pt.stop.id}
                    onMouseEnter={() => setHoveredStop(idx)}
                    onMouseLeave={() => setHoveredStop(null)}
                    className="cursor-pointer transition-transform"
                  >
                    {isHovered && (
                      <circle cx={pt.x} cy={pt.y} r="8" fill="rgba(52, 211, 153, 0.4)" />
                    )}
                    <circle
                      cx={pt.x}
                      cy={pt.y}
                      r={isHovered ? "4.5" : "3.5"}
                      fill={isHovered ? "#34d399" : "#10b981"}
                      stroke="#ffffff"
                      strokeWidth="1.5"
                    />
                    <text
                      x={pt.x}
                      y={pt.y + (pt.y > 70 ? -6 : 8)}
                      textAnchor="middle"
                      fill="#f4f4f5"
                      fontSize="4.2"
                      fontWeight="bold"
                      className="drop-shadow-md pointer-events-none"
                    >
                      {idx + 1}. {pt.stop.name.split(" ")[0]}
                    </text>
                  </g>
                );
              })}
            </svg>

            {/* Hovered Waypoint Tooltip */}
            <div className="relative z-10 text-[11px] text-zinc-300 flex items-center justify-between border-t border-white/10 pt-1.5">
              <span className="text-emerald-400 font-semibold truncate">
                {hoveredStop !== null
                  ? `Stop ${hoveredStop + 1}: ${route.stops[hoveredStop].name} (${route.stops[hoveredStop].region})`
                  : `Route Corridor: ${route.stops.length} Scenic Waypoints`}
              </span>
              <span className="text-[10px] text-zinc-400 font-mono flex-shrink-0">
                {route.distanceKm} km
              </span>
            </div>
          </div>
        )}

        {/* Top Badges & Photo/Map Switcher */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-2 z-20">
          <span className={`inline-flex items-center gap-1.5 text-[11px] font-bold px-2.5 py-1 rounded-full border backdrop-blur-md shadow-sm ${difficultyConfig.color}`}>
            <span className={`w-2 h-2 rounded-full ${difficultyConfig.dot} animate-pulse`} />
            <span>{difficultyConfig.label}</span>
          </span>

          {/* Photo / Map Switcher Pills */}
          <div className="flex items-center p-0.5 rounded-full bg-zinc-950/80 backdrop-blur-md border border-white/20 shadow-md">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setHeroMode("photo");
              }}
              className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider transition-colors flex items-center gap-1 ${
                heroMode === "photo"
                  ? "bg-emerald-500 text-white shadow-sm"
                  : "text-zinc-300 hover:text-white"
              }`}
            >
              <Camera className="w-3 h-3" />
              <span>Photo</span>
            </button>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setHeroMode("map");
              }}
              className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider transition-colors flex items-center gap-1 ${
                heroMode === "map"
                  ? "bg-emerald-500 text-white shadow-sm"
                  : "text-zinc-300 hover:text-white"
              }`}
            >
              <MapPin className="w-3 h-3" />
              <span>Map</span>
            </button>
          </div>
        </div>

        {/* Floating Season / Vibe pill */}
        <div className="absolute bottom-3 left-3 right-3 z-10 pointer-events-none">
          <div className="inline-flex items-center gap-1.5 text-[10px] font-bold tracking-wider uppercase text-emerald-300 drop-shadow mb-0.5">
            <Sparkles className="w-3 h-3 text-amber-400" />
            <span>{route.subtitle}</span>
          </div>
          <h3 className="text-lg sm:text-xl font-black text-white tracking-tight leading-snug drop-shadow-md">
            {route.title}
          </h3>
        </div>
      </div>

      {/* Content Section */}
      <div className="flex-1 p-5 sm:p-6 flex flex-col justify-between">
        <div>
          {/* Quick Highway Specs Row */}
          <div className="grid grid-cols-3 gap-2 py-3 px-3 rounded-2xl bg-zinc-50 dark:bg-zinc-800/60 border border-zinc-100 dark:border-zinc-800/80 mb-4">
            <div className="flex flex-col items-center justify-center text-center">
              <span className="text-[11px] font-semibold text-zinc-400 flex items-center gap-1">
                <Gauge className="w-3 h-3 text-emerald-600" /> Total Drive
              </span>
              <span className="text-sm font-extrabold text-zinc-900 dark:text-zinc-100 mt-0.5">
                {route.distanceKm} km
              </span>
            </div>

            <div className="flex flex-col items-center justify-center text-center border-x border-zinc-200/60 dark:border-zinc-700/60">
              <span className="text-[11px] font-semibold text-zinc-400 flex items-center gap-1">
                <Fuel className="w-3 h-3 text-amber-500" /> Fuel Est.
              </span>
              <span className="text-sm font-extrabold text-emerald-600 dark:text-emerald-400 mt-0.5">
                ₹{estimatedFuel.toLocaleString()}
              </span>
            </div>

            <div className="flex flex-col items-center justify-center text-center">
              <span className="text-[11px] font-semibold text-zinc-400 flex items-center gap-1">
                <Car className="w-3 h-3 text-blue-500" /> Vehicle
              </span>
              <span className="text-xs font-bold text-zinc-800 dark:text-zinc-200 mt-0.5 truncate max-w-[80px]">
                {route.recommendedVehicle.split(",")[0]}
              </span>
            </div>
          </div>

          {/* Catchy Description */}
          <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-300 line-clamp-2 mb-4 leading-relaxed font-normal">
            {route.description}
          </p>

          {/* Connected Waypoint Chain */}
          <div className="mb-4 p-3 rounded-2xl bg-emerald-50/60 dark:bg-emerald-950/20 border border-emerald-100 dark:border-emerald-900/40">
            <div className="text-[10px] font-bold uppercase tracking-wider text-emerald-800 dark:text-emerald-300 mb-2 flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-emerald-600" />
              <span>Route Corridor ({route.stops.length} Waypoints)</span>
            </div>
            
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none text-xs">
              {route.stops.map((stop, idx) => (
                <React.Fragment key={stop.id}>
                  <span className="flex-shrink-0 font-semibold px-2 py-0.5 rounded-md bg-white dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 border border-zinc-200/50 dark:border-zinc-700/60 shadow-2xs">
                    {stop.name.split(" ")[0]}
                  </span>
                  {idx < route.stops.length - 1 && (
                    <span className="text-emerald-500 font-bold text-[10px]">→</span>
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>

          {/* Inline Quick Stops Drawer Toggle */}
          <div className="mb-4">
            <button
              type="button"
              onClick={() => setShowQuickStops(!showQuickStops)}
              className="w-full flex items-center justify-between text-xs font-bold text-zinc-600 dark:text-zinc-300 hover:text-emerald-600 dark:hover:text-emerald-400 py-1 transition-colors"
            >
              <span className="flex items-center gap-1.5">
                <Utensils className="w-3.5 h-3.5 text-amber-500" />
                <span>{showQuickStops ? "Hide quick stops & food" : "Preview food & stops"}</span>
              </span>
              <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${showQuickStops ? "rotate-180" : ""}`} />
            </button>

            {showQuickStops && (
              <div className="mt-2.5 p-3 rounded-2xl bg-zinc-50 dark:bg-zinc-800/80 border border-zinc-200/60 dark:border-zinc-700/60 text-xs space-y-2 animate-in fade-in duration-200">
                {route.stops.slice(0, 3).map((s) => (
                  <div key={s.id} className="flex items-start gap-2">
                    <span className="font-bold text-emerald-600 text-[11px] whitespace-nowrap">Day {s.day}:</span>
                    <div className="text-[11px]">
                      <strong className="text-zinc-900 dark:text-zinc-100">{s.name.split(" ")[0]}</strong>
                      <span className="text-zinc-500 dark:text-zinc-400"> — {s.mustTryFood[0]}</span>
                    </div>
                  </div>
                ))}
                {route.stops.length > 3 && (
                  <div className="text-[10px] font-semibold text-emerald-600 dark:text-emerald-400 text-center pt-1">
                    +{route.stops.length - 3} more stops in full itinerary
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-1.5 mb-5">
            {route.tags.map((tag) => (
              <span
                key={tag}
                className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 border border-zinc-200/60 dark:border-zinc-700/50"
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>

        {/* Link / CTA */}
        <Link
          href={`/routes/${route.slug}`}
          className="w-full inline-flex items-center justify-center gap-2 py-3.5 px-5 rounded-2xl bg-zinc-900 hover:bg-emerald-600 dark:bg-zinc-100 dark:hover:bg-emerald-500 text-white dark:text-zinc-900 dark:hover:text-white font-bold text-xs uppercase tracking-wider transition-all duration-200 shadow-md group-hover:shadow-glow-emerald"
        >
          <span>Explore Itinerary & Map</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform duration-200" />
        </Link>
      </div>
    </div>
  );
}
