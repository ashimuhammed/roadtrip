"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Route, Stop } from "@/data/routes";
import { Clock, Navigation, Coffee, Utensils, AlertCircle, ChevronDown, CheckCircle, Sparkles, MapPin } from "lucide-react";

interface ItineraryTimelineProps {
  route: Route;
}

export default function ItineraryTimeline({ route }: ItineraryTimelineProps) {
  // Group stops by day
  const daysMap = route.stops.reduce((acc, stop) => {
    if (!acc[stop.day]) {
      acc[stop.day] = [];
    }
    acc[stop.day].push(stop);
    return acc;
  }, {} as Record<number, Stop[]>);

  const days = Object.keys(daysMap).map(Number).sort((a, b) => a - b);
  const [expandedDays, setExpandedDays] = useState<Record<number, boolean>>({ 1: true });

  const toggleDay = (day: number) => {
    setExpandedDays((prev) => ({
      ...prev,
      [day]: !prev[day],
    }));
  };

  const expandAll = () => {
    const all: Record<number, boolean> = {};
    days.forEach((d) => (all[d] = true));
    setExpandedDays(all);
  };

  const collapseAll = () => {
    setExpandedDays({});
  };

  return (
    <div className="bg-white dark:bg-zinc-900 rounded-3xl border border-zinc-200/80 dark:border-zinc-800 p-6 md:p-8 shadow-xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-zinc-100 dark:border-zinc-800">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
            Day-by-Day Road Log
          </span>
          <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 mt-0.5">
            Complete {route.durationDays}-Day Itinerary Timeline
          </h2>
          <p className="text-sm text-zinc-500">
            Curated daily driving schedule, scenic pauses, and regional gastronomy
          </p>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto">
          <button
            onClick={expandAll}
            className="px-3 py-1.5 rounded-lg text-xs font-semibold text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/40 hover:bg-emerald-100 dark:hover:bg-emerald-900/40 transition-colors"
          >
            Expand All
          </button>
          <button
            onClick={collapseAll}
            className="px-3 py-1.5 rounded-lg text-xs font-semibold text-zinc-600 dark:text-zinc-400 bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors"
          >
            Collapse All
          </button>
        </div>
      </div>

      {/* Timeline flow */}
      <div className="relative mt-8">
        {/* Continuous vertical timeline connector line */}
        <div className="absolute left-6 md:left-8 top-6 bottom-6 w-0.5 bg-gradient-to-b from-emerald-500 via-teal-500 to-emerald-200 dark:to-zinc-800" />

        <div className="space-y-8">
          {days.map((day) => {
            const stopsForDay = daysMap[day];
            const isExpanded = !!expandedDays[day];
            const dayTitle = stopsForDay.map((s) => s.name.split(" ")[0]).join(" → ");
            const totalDayKm = stopsForDay.reduce((sum, s) => sum + s.distanceFromPrev, 0);

            return (
              <div key={day} className="relative pl-14 md:pl-20">
                {/* Timeline node icon */}
                <div
                  onClick={() => toggleDay(day)}
                  className={`absolute left-2 md:left-4 -translate-x-1/2 top-4 w-9 h-9 rounded-2xl flex items-center justify-center font-bold text-sm cursor-pointer shadow-md transition-all ${
                    isExpanded
                      ? "bg-emerald-600 text-white ring-4 ring-emerald-100 dark:ring-emerald-950 scale-110"
                      : "bg-white dark:bg-zinc-800 border-2 border-emerald-500 text-emerald-600 dark:text-emerald-400 hover:scale-105"
                  }`}
                >
                  {day}
                </div>

                {/* Day Card container */}
                <div className="rounded-2xl border border-zinc-200/80 dark:border-zinc-800 bg-zinc-50/60 dark:bg-zinc-800/40 overflow-hidden shadow-sm hover:border-emerald-300/60 transition-all">
                  {/* Collapsible Header */}
                  <div
                    onClick={() => toggleDay(day)}
                    className="p-5 flex items-center justify-between cursor-pointer select-none bg-white dark:bg-zinc-900/60 hover:bg-emerald-50/40 dark:hover:bg-zinc-800/70 transition-colors"
                  >
                    <div className="flex-1 pr-4">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">
                          Day {day} Route Leg
                        </span>
                        <span className="text-zinc-300 dark:text-zinc-700">•</span>
                        <span className="text-xs font-medium text-zinc-500">
                          {stopsForDay.length} {stopsForDay.length === 1 ? "Major Stop" : "Waypoints"}
                        </span>
                      </div>
                      <h3 className="text-lg md:text-xl font-bold text-zinc-900 dark:text-zinc-100">
                        {dayTitle}
                      </h3>
                    </div>

                    <div className="flex items-center gap-3">
                      <ChevronDown
                        className={`w-5 h-5 text-zinc-400 transition-transform duration-200 ${
                          isExpanded ? "rotate-180" : ""
                        }`}
                      />
                    </div>
                  </div>

                  {/* Expanded Content */}
                  {isExpanded && (
                    <div className="p-5 md:p-6 space-y-6 border-t border-zinc-200/70 dark:border-zinc-800">
                      {stopsForDay.map((stop, stopIdx) => (
                        <div
                          key={stop.id}
                          className="p-4 md:p-5 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200/60 dark:border-zinc-800 shadow-sm"
                        >
                          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-3">
                            <div>
                              <div className="flex items-center gap-2 text-xs font-medium text-emerald-600 dark:text-emerald-400">
                                <MapPin className="w-3.5 h-3.5" />
                                <span>{stop.region}</span>
                              </div>
                              <h4 className="text-lg font-bold text-zinc-900 dark:text-zinc-100 mt-0.5">
                                {stop.name}
                              </h4>
                            </div>

                            {stop.distanceFromPrev > 0 && (
                              <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-zinc-100 dark:bg-zinc-800 text-xs font-semibold text-zinc-700 dark:text-zinc-300 self-start">
                                <Navigation className="w-3.5 h-3.5 text-emerald-600" />
                                <span>{stop.distanceFromPrev} km</span>
                                <span>•</span>
                                <Clock className="w-3.5 h-3.5 text-emerald-600" />
                                <span>{stop.drivingTime}</span>
                              </div>
                            )}
                          </div>

                          <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed mb-4">
                            {stop.description}
                          </p>

                          {/* Quick Highlights Pills */}
                          <div className="flex flex-wrap gap-1.5 mb-4">
                            {stop.highlights.map((h, hIdx) => (
                              <span
                                key={hIdx}
                                className="inline-flex items-center gap-1 text-xs px-2.5 py-1 rounded-lg bg-zinc-50 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 border border-zinc-200/60 dark:border-zinc-700/60 font-medium"
                              >
                                <Sparkles className="w-3 h-3 text-emerald-500" />
                                {h}
                              </span>
                            ))}
                          </div>

                          {/* Food & Tip Box */}
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                            <div className="p-3 rounded-xl bg-amber-50/80 dark:bg-amber-950/20 border border-amber-200/50 dark:border-amber-900/30">
                              <span className="font-bold text-amber-900 dark:text-amber-300 flex items-center gap-1.5 mb-1">
                                <Utensils className="w-3.5 h-3.5" /> Must-Try Delicacies:
                              </span>
                              <span className="text-amber-800 dark:text-amber-200">
                                {stop.mustTryFood.join(", ")}
                              </span>
                            </div>

                            <div className="p-3 rounded-xl bg-emerald-50/80 dark:bg-emerald-950/20 border border-emerald-200/50 dark:border-emerald-900/30">
                              <span className="font-bold text-emerald-900 dark:text-emerald-300 flex items-center gap-1.5 mb-1">
                                <Navigation className="w-3.5 h-3.5" /> Highway Pro-Tip:
                              </span>
                              <span className="text-emerald-800 dark:text-emerald-200">
                                {stop.drivingTip}
                              </span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
