import React from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { KERALA_ROUTES } from "@/data/routes";
import RouteMap from "@/components/RouteMap";
import ItineraryTimeline from "@/components/ItineraryTimeline";
import StopCard from "@/components/StopCard";
import { calculateEstimatedFuel } from "@/lib/utils";
import {
  Clock,
  Gauge,
  Mountain,
  Car,
  Compass,
  ArrowLeft,
  Calendar,
  CheckCircle2,
  AlertCircle,
  Fuel,
  Share2,
  ChevronRight,
  ShieldAlert,
  Luggage,
  Sparkles
} from "lucide-react";

interface PageProps {
  params: {
    slug: string;
  };
}

export function generateStaticParams() {
  return KERALA_ROUTES.map((route) => ({
    slug: route.slug,
  }));
}

export function generateMetadata({ params }: PageProps) {
  const route = KERALA_ROUTES.find((r) => r.slug === params.slug);
  if (!route) return { title: "Route Not Found" };

  return {
    title: `${route.title} (${route.durationDays} Days, ${route.distanceKm} km) | Kerala Roadtrips`,
    description: route.description,
  };
}

export default function RouteDetailPage({ params }: PageProps) {
  const route = KERALA_ROUTES.find((r) => r.slug === params.slug);

  if (!route) {
    notFound();
  }

  const estimatedFuel = calculateEstimatedFuel(route.distanceKm);

  return (
    <div className="space-y-14 pb-20">
      {/* Route Hero Header */}
      <div className="relative min-h-[50vh] md:min-h-[60vh] flex items-end bg-zinc-950 text-white overflow-hidden pb-12 pt-28">
        <Image
          src={route.heroImage}
          alt={route.title}
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-45 scale-100"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/60 to-transparent" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          {/* Breadcrumbs */}
          <div className="flex items-center gap-2 text-xs text-zinc-300 font-medium mb-4">
            <Link href="/" className="hover:text-emerald-400 transition-colors flex items-center gap-1">
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>All Roadtrips</span>
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-zinc-500" />
            <span className="text-emerald-400">{route.title}</span>
          </div>

          <div className="max-w-4xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 text-xs font-semibold backdrop-blur-md">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{route.subtitle}</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight">
              {route.title}
            </h1>

            <p className="text-base sm:text-lg text-zinc-200 max-w-3xl leading-relaxed">
              {route.tagline}
            </p>
          </div>

          {/* Quick Metrics Badges Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mt-8 pt-6 border-t border-white/15">
            <div className="p-3 sm:p-4 rounded-2xl bg-zinc-900/80 backdrop-blur-md border border-white/10">
              <div className="flex items-center gap-1.5 text-xs text-zinc-400">
                <Clock className="w-3.5 h-3.5 text-emerald-400" /> Duration
              </div>
              <div className="text-lg sm:text-xl font-bold text-white mt-1">
                {route.durationDays} Days
              </div>
            </div>

            <div className="p-3 sm:p-4 rounded-2xl bg-zinc-900/80 backdrop-blur-md border border-white/10">
              <div className="flex items-center gap-1.5 text-xs text-zinc-400">
                <Gauge className="w-3.5 h-3.5 text-emerald-400" /> Total Distance
              </div>
              <div className="text-lg sm:text-xl font-bold text-white mt-1">
                {route.distanceKm} km
              </div>
            </div>

            <div className="p-3 sm:p-4 rounded-2xl bg-zinc-900/80 backdrop-blur-md border border-white/10">
              <div className="flex items-center gap-1.5 text-xs text-zinc-400">
                <Mountain className="w-3.5 h-3.5 text-emerald-400" /> Elevation
              </div>
              <div className="text-lg sm:text-xl font-bold text-white mt-1 truncate">
                {route.elevationGain.split("(")[0]}
              </div>
            </div>

            <div className="p-3 sm:p-4 rounded-2xl bg-zinc-900/80 backdrop-blur-md border border-white/10">
              <div className="flex items-center gap-1.5 text-xs text-zinc-400">
                <Fuel className="w-3.5 h-3.5 text-emerald-400" /> Est. Fuel
              </div>
              <div className="text-lg sm:text-xl font-bold text-emerald-400 mt-1">
                ₹{estimatedFuel.toLocaleString()}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Scannable Sticky Section Jump Bar */}
        <div className="sticky top-20 z-40 p-2 rounded-2xl glass-island flex items-center justify-between gap-2 overflow-x-auto shadow-md">
          <div className="flex items-center gap-1 text-xs font-bold uppercase tracking-wider">
            <a
              href="#overview"
              className="px-3 py-2 rounded-xl hover:bg-emerald-50 dark:hover:bg-zinc-800 text-zinc-700 dark:text-zinc-200 transition-colors whitespace-nowrap"
            >
              Overview
            </a>
            <a
              href="#map-section"
              className="px-3 py-2 rounded-xl hover:bg-emerald-50 dark:hover:bg-zinc-800 text-zinc-700 dark:text-zinc-200 transition-colors whitespace-nowrap"
            >
              Map & Waypoints
            </a>
            <a
              href="#timeline-section"
              className="px-3 py-2 rounded-xl hover:bg-emerald-50 dark:hover:bg-zinc-800 text-zinc-700 dark:text-zinc-200 transition-colors whitespace-nowrap"
            >
              Day Schedule
            </a>
            <a
              href="#stops-section"
              className="px-3 py-2 rounded-xl hover:bg-emerald-50 dark:hover:bg-zinc-800 text-zinc-700 dark:text-zinc-200 transition-colors whitespace-nowrap"
            >
              Stops & Food
            </a>
            <a
              href="#packing-section"
              className="px-3 py-2 rounded-xl hover:bg-emerald-50 dark:hover:bg-zinc-800 text-zinc-700 dark:text-zinc-200 transition-colors whitespace-nowrap"
            >
              Checklist
            </a>
          </div>

          <a
            href={`https://www.google.com/maps/dir/${route.stops.map(s => `${s.coordinates.lat},${s.coordinates.lng}`).join("/")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold uppercase tracking-wider transition-all shadow-sm flex-shrink-0"
          >
            <Compass className="w-3.5 h-3.5" />
            <span>Launch Route GPS</span>
          </a>
        </div>

        {/* Route Overview & Practical Info */}
        <div id="overview" className="grid grid-cols-1 lg:grid-cols-12 gap-8 scroll-mt-36">
          {/* Left Column: Story & Overview */}
          <div className="lg:col-span-8 bg-white dark:bg-zinc-900 rounded-3xl p-6 sm:p-8 border border-zinc-200/80 dark:border-zinc-800 shadow-sm space-y-6">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                Route Story & Terrain
              </span>
              <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 mt-1">
                The Driving Experience
              </h2>
            </div>

            <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-300 leading-relaxed">
              {route.overview}
            </p>

            {/* Highlights List */}
            <div>
              <h3 className="text-sm font-bold uppercase tracking-wider text-zinc-400 mb-3">
                Key Trip Highlights
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {route.highlights.map((h, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-zinc-700 dark:text-zinc-200 font-medium">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                    <span>{h}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Driver Spec Sheet */}
          <div className="lg:col-span-4 bg-zinc-50 dark:bg-zinc-800/40 rounded-3xl p-6 border border-zinc-200/80 dark:border-zinc-800 shadow-sm space-y-5">
            <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100">
              Route Driver Spec Sheet
            </h3>

            <div className="space-y-4 text-xs sm:text-sm">
              <div className="p-3.5 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200/60 dark:border-zinc-800">
                <span className="text-zinc-400 block font-medium">Recommended Vehicle</span>
                <span className="font-bold text-zinc-800 dark:text-zinc-100 mt-0.5 block flex items-center gap-1.5">
                  <Car className="w-4 h-4 text-emerald-600" />
                  {route.recommendedVehicle}
                </span>
              </div>

              <div className="p-3.5 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200/60 dark:border-zinc-800">
                <span className="text-zinc-400 block font-medium">Road & Tarmac Quality</span>
                <span className="font-medium text-zinc-700 dark:text-zinc-300 mt-0.5 block">
                  {route.roadConditions}
                </span>
              </div>

              <div className="p-3.5 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200/60 dark:border-zinc-800">
                <span className="text-zinc-400 block font-medium">Best Travel Window</span>
                <span className="font-semibold text-emerald-700 dark:text-emerald-400 mt-0.5 block">
                  {route.bestSeason}
                </span>
              </div>

              <div className="p-3.5 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200/60 dark:border-zinc-800">
                <span className="text-zinc-400 block font-medium">Start & Finish</span>
                <span className="font-medium text-zinc-800 dark:text-zinc-200 mt-0.5 block">
                  {route.startPoint} → {route.endPoint}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Interactive Waypoint Navigator Map */}
        <section id="map-section" className="scroll-mt-36">
          <RouteMap route={route} />
        </section>

        {/* Day-by-Day Itinerary Timeline */}
        <section id="timeline-section" className="scroll-mt-36">
          <ItineraryTimeline route={route} />
        </section>

        {/* Detailed Stop Cards */}
        <section id="stops-section" className="space-y-8 scroll-mt-36">
          <div className="text-center max-w-2xl mx-auto">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
              In-Depth Destination Dossiers
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-zinc-900 dark:text-zinc-100 mt-1">
              Every Stop Along the Way
            </h2>
            <p className="text-xs sm:text-sm text-zinc-500 mt-1">
              Sightseeing spots, regional culinary must-eats, and local driver tips
            </p>
          </div>

          <div className="space-y-6">
            {route.stops.map((stop, idx) => (
              <StopCard key={stop.id} stop={stop} isLast={idx === route.stops.length - 1} />
            ))}
          </div>
        </section>

        {/* Packing & Roadtrip Essentials Checklist */}
        <section id="packing-section" className="scroll-mt-36 bg-gradient-to-br from-emerald-50/70 via-teal-50/40 to-green-50/70 dark:from-zinc-900 dark:via-zinc-900 dark:to-emerald-950/40 rounded-3xl p-6 sm:p-10 border border-emerald-200/60 dark:border-zinc-800 shadow-lg">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-8">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400 flex items-center gap-1.5 mb-1">
                <Luggage className="w-4 h-4" />
                <span>Pre-Departure Checklist</span>
              </span>
              <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">
                Recommended Packing & Gear for {route.title}
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {route.packingEssentials.map((item, idx) => (
              <div
                key={idx}
                className="flex items-start gap-3 p-4 rounded-2xl bg-white dark:bg-zinc-800/80 border border-emerald-100 dark:border-zinc-700 shadow-sm"
              >
                <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                <span className="text-xs sm:text-sm text-zinc-800 dark:text-zinc-200 font-medium">
                  {item}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* Next Route Navigation */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-zinc-200 dark:border-zinc-800">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-semibold text-zinc-600 dark:text-zinc-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to All Roadtrips</span>
          </Link>

          <Link
            href={`/routes/${KERALA_ROUTES.find(r => r.slug !== route.slug)?.slug || "mist-and-tea-trail"}`}
            className="inline-flex items-center gap-2 text-sm font-semibold text-emerald-600 dark:text-emerald-400 hover:underline"
          >
            <span>Explore Next Roadtrip Circuit</span>
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
