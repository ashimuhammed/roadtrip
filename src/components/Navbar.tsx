"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Compass, Menu, X, Car, Mountain, MapPin, ChevronDown, Sparkles, Search } from "lucide-react";
import { KERALA_ROUTES } from "@/data/routes";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [routesDropdownOpen, setRoutesDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const matchingRoutes = searchQuery.trim()
    ? KERALA_ROUTES.filter((r) =>
        r.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        r.stops.some((s) => s.name.toLowerCase().includes(searchQuery.toLowerCase()))
      )
    : [];

  return (
    <header className="sticky top-0 z-50 w-full pt-3 px-3 sm:px-6 pointer-events-none">
      <div className="max-w-7xl mx-auto pointer-events-auto">
        <nav className="glass-island rounded-3xl transition-all duration-300 px-4 sm:px-6 py-3 border border-white/60 dark:border-zinc-800/80 shadow-xl shadow-zinc-900/5">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 group">
              <div className="relative w-10 h-10 rounded-2xl bg-gradient-to-tr from-emerald-600 via-teal-600 to-green-500 flex items-center justify-center text-white shadow-lg shadow-emerald-600/30 group-hover:scale-105 group-hover:rotate-6 transition-all duration-300">
                <Compass className="w-5 h-5 animate-pulse-slow" />
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-amber-400 rounded-full border-2 border-white dark:border-zinc-900" />
              </div>
              <div>
                <span className="text-lg font-black tracking-tight text-zinc-900 dark:text-white flex items-center gap-1">
                  Kerala<span className="text-emerald-600 dark:text-emerald-400">Roadtrip</span>
                </span>
                <div className="flex items-center gap-1.5 -mt-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
                  <span className="text-[10px] text-zinc-500 dark:text-zinc-400 font-semibold uppercase tracking-wider">
                    God&apos;s Own By Wheel
                  </span>
                </div>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-6">
              <Link
                href="/#route-finder"
                className="text-xs font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-200 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors flex items-center gap-1.5"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                <span>Trip Finder</span>
              </Link>

              <a
                href="/#kerala-map"
                className="text-xs font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-200 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors flex items-center gap-1.5"
              >
                <MapPin className="w-3.5 h-3.5 text-emerald-500" />
                <span>Interactive Map</span>
              </a>

              {/* Routes Dropdown */}
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setRoutesDropdownOpen(!routesDropdownOpen)}
                  onBlur={() => setTimeout(() => setRoutesDropdownOpen(false), 200)}
                  className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-200 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors py-1.5"
                >
                  <span>All 6 Routes</span>
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${routesDropdownOpen ? "rotate-180" : ""}`} />
                </button>

                {routesDropdownOpen && (
                  <div className="absolute top-full left-0 mt-3 w-84 max-h-[440px] overflow-y-auto rounded-3xl bg-white/95 dark:bg-zinc-900/95 backdrop-blur-xl shadow-2xl border border-zinc-200/80 dark:border-zinc-800 p-2 z-50 animate-in fade-in slide-in-from-top-2">
                    <div className="px-3 py-2 text-[10px] font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 border-b border-zinc-100 dark:border-zinc-800 mb-1">
                      Choose Your Driving Corridor
                    </div>
                    {KERALA_ROUTES.map((route) => (
                      <Link
                        key={route.slug}
                        href={`/routes/${route.slug}`}
                        className="block p-3 rounded-2xl hover:bg-emerald-50 dark:hover:bg-zinc-800/80 transition-all group"
                        onClick={() => setRoutesDropdownOpen(false)}
                      >
                        <div className="text-xs font-bold text-zinc-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 flex items-center justify-between">
                          <span>{route.title}</span>
                          <span className="text-[10px] px-2 py-0.5 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 font-semibold">
                            {route.durationDays}D
                          </span>
                        </div>
                        <div className="text-[11px] text-zinc-500 dark:text-zinc-400 flex items-center gap-2 mt-1">
                          <span>{route.distanceKm} km</span>
                          <span>•</span>
                          <span className="truncate max-w-[170px]">{route.stops.slice(0, 3).map(s => s.name.split(" ")[0]).join(" → ")}</span>
                        </div>
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              <a
                href="/#highway-guide"
                className="text-xs font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-200 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
              >
                Driving Guide
              </a>

              <a
                href="/#budget-calculator"
                className="text-xs font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-200 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
              >
                Fuel Calc
              </a>
            </div>

            {/* Quick Status & CTA */}
            <div className="hidden sm:flex items-center gap-3">
              <div className="hidden xl:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200/50 dark:border-emerald-800/40 text-[11px] font-semibold text-emerald-800 dark:text-emerald-300">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>Prime Driving Season Open</span>
              </div>

              <Link
                href="/#routes"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl text-xs font-bold uppercase tracking-wider text-white bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 hover:from-emerald-700 hover:to-teal-800 shadow-md shadow-emerald-600/25 hover:shadow-glow-emerald hover:scale-105 transition-all duration-200"
              >
                <Car className="w-3.5 h-3.5" />
                <span>Explore Routes</span>
              </Link>
            </div>

            {/* Mobile menu toggle */}
            <div className="flex lg:hidden items-center">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-2xl text-zinc-700 dark:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800 focus:outline-none"
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {/* Mobile slide-out drawer */}
          {mobileMenuOpen && (
            <div className="lg:hidden mt-3 pt-3 border-t border-zinc-200 dark:border-zinc-800 space-y-3 pb-2 animate-in fade-in slide-in-from-top-2">
              <Link
                href="/#route-finder"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-bold uppercase text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40"
              >
                <Sparkles className="w-4 h-4" />
                <span>Interactive Route Finder</span>
              </Link>

              <div className="space-y-1">
                <div className="px-3 text-[10px] font-bold uppercase text-zinc-400">All 6 Roadtrip Circuits</div>
                <div className="grid grid-cols-1 gap-1 max-h-56 overflow-y-auto pl-2">
                  {KERALA_ROUTES.map((route) => (
                    <Link
                      key={route.slug}
                      href={`/routes/${route.slug}`}
                      onClick={() => setMobileMenuOpen(false)}
                      className="flex items-center justify-between px-3 py-1.5 rounded-lg text-xs font-medium text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800"
                    >
                      <span className="truncate">{route.title}</span>
                      <span className="text-[10px] text-emerald-600 font-bold">{route.durationDays}D</span>
                    </Link>
                  ))}
                </div>
              </div>

              <div className="flex gap-2 pt-2 border-t border-zinc-200 dark:border-zinc-800">
                <a
                  href="/#highway-guide"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex-1 text-center py-2 text-xs font-semibold rounded-xl bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300"
                >
                  Driving Guide
                </a>
                <a
                  href="/#budget-calculator"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex-1 text-center py-2 text-xs font-semibold rounded-xl bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300"
                >
                  Fuel Calculator
                </a>
              </div>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
}
