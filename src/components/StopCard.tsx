"use client";

import React from "react";
import Image from "next/image";
import { Stop } from "@/data/routes";
import { MapPin, Clock, Utensils, AlertTriangle, Camera, CheckCircle2, Navigation } from "lucide-react";

interface StopCardProps {
  stop: Stop;
  isLast?: boolean;
}

export default function StopCard({ stop, isLast = false }: StopCardProps) {
  return (
    <div className="relative bg-white dark:bg-zinc-900 rounded-3xl border border-zinc-200/80 dark:border-zinc-800 p-6 md:p-8 shadow-sm hover:shadow-xl transition-all duration-300">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Image & Quick Badges */}
        <div className="lg:col-span-5 relative">
          <div className="relative h-64 sm:h-72 w-full rounded-2xl overflow-hidden shadow-md">
            <Image
              src={stop.image}
              alt={stop.name}
              fill
              sizes="(max-width: 1024px) 100vw, 40vw"
              className="object-cover hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/70 via-transparent to-transparent" />
            
            {/* Day Badge */}
            <div className="absolute top-3 left-3 bg-emerald-600 text-white font-bold text-xs uppercase px-3 py-1.5 rounded-full shadow-lg flex items-center gap-1.5">
              <span>Day {stop.day}</span>
            </div>

            {/* Travel Time Tag */}
            {stop.distanceFromPrev > 0 && (
              <div className="absolute bottom-3 left-3 bg-zinc-900/85 backdrop-blur-md text-zinc-100 text-xs px-3 py-1.5 rounded-xl border border-white/10 flex items-center gap-2">
                <Navigation className="w-3.5 h-3.5 text-emerald-400" />
                <span>{stop.distanceFromPrev} km</span>
                <span>•</span>
                <Clock className="w-3.5 h-3.5 text-emerald-400" />
                <span>{stop.drivingTime}</span>
              </div>
            )}
          </div>

          {/* Activity pill */}
          <div className="mt-3 inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/30 text-emerald-800 dark:text-emerald-300 text-xs font-medium border border-emerald-200/50 dark:border-emerald-800/30">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span>{stop.activity}</span>
          </div>
        </div>

        {/* Right Column: Detailed Info */}
        <div className="lg:col-span-7 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 mb-1">
              <MapPin className="w-4 h-4" />
              <span>{stop.region}</span>
            </div>

            <h3 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 tracking-tight mb-2">
              {stop.name}
            </h3>

            <p className="text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed mb-5">
              {stop.description}
            </p>

            {/* Highlights List */}
            <div className="mb-5">
              <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-400 mb-2.5">
                Top Experiences & Sights
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {stop.highlights.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-xs text-zinc-700 dark:text-zinc-300 font-medium">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Scenic Spot Box */}
            <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200/70 dark:border-zinc-800 mb-4">
              <Camera className="w-5 h-5 text-teal-600 flex-shrink-0 mt-0.5" />
              <div>
                <div className="text-xs font-bold text-zinc-900 dark:text-zinc-100 uppercase tracking-wider">
                  Scenic Photography Spot
                </div>
                <div className="text-xs text-zinc-600 dark:text-zinc-300 mt-0.5">
                  {stop.scenicSpot}
                </div>
              </div>
            </div>

            {/* Must Try Food */}
            <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-amber-50/70 dark:bg-amber-950/20 border border-amber-200/60 dark:border-amber-900/40 mb-4">
              <Utensils className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
              <div>
                <div className="text-xs font-bold text-amber-900 dark:text-amber-300 uppercase tracking-wider">
                  Must-Try Local Food
                </div>
                <div className="text-xs text-amber-800 dark:text-amber-200 mt-0.5 font-medium">
                  {stop.mustTryFood.join(" • ")}
                </div>
              </div>
            </div>

            {/* Driving tip */}
            <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-blue-50/60 dark:bg-blue-950/20 border border-blue-200/60 dark:border-blue-900/30">
              <AlertTriangle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
              <div>
                <div className="text-xs font-bold text-blue-900 dark:text-blue-300 uppercase tracking-wider">
                  Road & Driver Tip
                </div>
                <div className="text-xs text-blue-800 dark:text-blue-200 mt-0.5">
                  {stop.drivingTip}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
