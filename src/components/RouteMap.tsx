"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { Route, Stop, KERALA_14_DISTRICTS, DistrictLandmark } from "@/data/routes";
import {
  MapPin,
  Navigation,
  Compass,
  ExternalLink,
  Landmark,
  Sparkles,
  Mountain,
  Utensils,
  Calendar,
  Fuel,
  Car,
  ChevronRight,
  Layers,
  Search,
  Clock,
  Gauge,
  Milestone,
  Flag,
  CheckCircle2,
  Route as RouteIcon,
  AlertCircle
} from "lucide-react";

interface RouteMapProps {
  route?: Route;
}

export default function RouteMap({ route }: RouteMapProps) {
  // If route is passed with stops, default to route mode; otherwise 14-districts atlas
  const hasRouteStops = Boolean(route && route.stops && route.stops.length > 0);
  const [viewMode, setViewMode] = useState<"route" | "districts">(
    hasRouteStops ? "route" : "districts"
  );
  const [mapMode, setMapMode] = useState<"leaflet" | "schematic">("leaflet");

  // Active indices
  const [activeStopIndex, setActiveStopIndex] = useState<number>(0);
  const [activeDistrictIndex, setActiveDistrictIndex] = useState<number>(() => {
    if (route) {
      const matchIdx = KERALA_14_DISTRICTS.findIndex(
        (d) =>
          route.stops.some(
            (s) =>
              s.district?.toLowerCase() === d.district.toLowerCase() ||
              s.name.toLowerCase().includes(d.district.toLowerCase()) ||
              d.landmark.toLowerCase().includes(s.name.toLowerCase().split(" ")[0])
          ) || d.routeSlug === route.slug
      );
      if (matchIdx !== -1) return matchIdx;
    }
    return 0;
  });

  const [regionFilter, setRegionFilter] = useState<"all" | "north" | "central" | "south">("all");
  const [vehicleType, setVehicleType] = useState<"hatchback" | "suv" | "ev">("suv");

  const leafletContainerRef = useRef<HTMLDivElement>(null);
  const leafletMapRef = useRef<any>(null);
  const markersRef = useRef<any[]>([]);
  const polylineRef = useRef<any>(null);

  // Active items
  const activeStop: Stop | undefined =
    route?.stops && route.stops[activeStopIndex] ? route.stops[activeStopIndex] : undefined;
  const activeLandmark: DistrictLandmark =
    KERALA_14_DISTRICTS[activeDistrictIndex] || KERALA_14_DISTRICTS[0];

  // Group districts by region
  const northDistricts = ["Kasaragod", "Kannur", "Wayanad", "Kozhikode"];
  const centralDistricts = ["Malappuram", "Palakkad", "Thrissur", "Ernakulam", "Idukki"];
  const southDistricts = ["Kottayam", "Alappuzha", "Pathanamthitta", "Kollam", "Thiruvananthapuram"];

  const filteredDistricts = KERALA_14_DISTRICTS.filter((d) => {
    if (regionFilter === "north") return northDistricts.includes(d.district);
    if (regionFilter === "central") return centralDistricts.includes(d.district);
    if (regionFilter === "south") return southDistricts.includes(d.district);
    return true;
  });

  // Distance & vehicle fuel calculations
  const totalTravelKm =
    viewMode === "route" && route ? route.distanceKm : 1180; // Route distance or 14-district cross-Kerala distance
  const vehicleStats = {
    hatchback: { name: "Compact Car", mileage: 18, rate: 108, unit: "Petrol/Diesel" },
    suv: { name: "SUV / Crossover", mileage: 13, rate: 108, unit: "Petrol/Diesel" },
    ev: { name: "Electric Vehicle (EV)", mileage: 6.5, rate: 22, unit: "kWh / Fast Charger" }
  };
  const selectedStats = vehicleStats[vehicleType];
  const calculatedCost = Math.round((totalTravelKm / selectedStats.mileage) * selectedStats.rate);

  // Initialize and update Leaflet Map
  useEffect(() => {
    let isMounted = true;

    if (mapMode !== "leaflet") return;

    async function initLeaflet() {
      if (!leafletContainerRef.current) return;

      const L = (await import("leaflet")).default;

      if (!isMounted) return;

      // Clean existing map instance if any
      if (leafletMapRef.current) {
        leafletMapRef.current.remove();
        leafletMapRef.current = null;
      }
      markersRef.current = [];
      polylineRef.current = null;

      const initialCenter: [number, number] =
        viewMode === "route" && activeStop
          ? [activeStop.coordinates.lat, activeStop.coordinates.lng]
          : [activeLandmark.coordinates.lat, activeLandmark.coordinates.lng];

      const map = L.map(leafletContainerRef.current, {
        center: initialCenter,
        zoom: viewMode === "route" ? 9 : 8,
        scrollWheelZoom: false,
      });

      // Standard OpenStreetMap tiles (Reliable & fast)
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        maxZoom: 19,
      }).addTo(map);

      if (viewMode === "route" && route && route.stops.length > 0) {
        // --- ROUTE MODE: Render Route Waypoints & Polyline ---
        const routeCoords: [number, number][] = route.stops.map((s) => [
          s.coordinates.lat,
          s.coordinates.lng,
        ]);

        // Route Polyline - Casing line for high-contrast visibility
        L.polyline(routeCoords, {
          color: "#064e3b",
          weight: 7,
          opacity: 0.6,
          lineCap: "round",
          lineJoin: "round",
        }).addTo(map);

        // Route Polyline - Main vibrant emerald line
        const polyline = L.polyline(routeCoords, {
          color: "#10b981",
          weight: 4,
          opacity: 0.95,
          dashArray: "8, 8",
          lineCap: "round",
          lineJoin: "round",
        }).addTo(map);
        polylineRef.current = polyline;

        // Render Stop Markers
        route.stops.forEach((stop, idx) => {
          const isSelected = idx === activeStopIndex;
          const isStart = idx === 0;
          const isFinish = idx === route.stops.length - 1;
          const stopNumber = idx + 1;

          let badgeColor = "#0f172a";
          let ringColor = "#10b981";
          let labelText = `${stopNumber}`;

          if (isStart) {
            badgeColor = "#059669";
            ringColor = "#34d399";
            labelText = "A";
          } else if (isFinish) {
            badgeColor = "#d97706";
            ringColor = "#fbbf24";
            labelText = "B";
          }

          if (isSelected) {
            badgeColor = "#2563eb";
            ringColor = "#60a5fa";
          }

          const icon = L.divIcon({
            className: "route-stop-pin",
            html: `
              <div id="route-pin-${stopNumber}" style="position: relative; display: flex; align-items: center; justify-content: center; width: 40px; height: 40px; cursor: pointer;">
                <div style="position: absolute; inset: -4px; border-radius: 9999px; background-color: ${ringColor}; opacity: ${
                  isSelected ? "0.75" : "0.3"
                }; animation: ${isSelected ? "pulse 2s infinite" : "none"};"></div>
                <div style="width: 32px; height: 32px; border-radius: 9999px; background-color: ${badgeColor}; color: white; display: flex; align-items: center; justify-content: center; font-size: 12px; font-weight: 800; border: 2.5px solid white; box-shadow: 0 4px 12px rgba(0,0,0,0.45);">
                  ${labelText}
                </div>
                ${
                  isStart
                    ? `<span style="position: absolute; -top: 14px; background: #059669; color: white; font-size: 9px; font-weight: 800; padding: 1px 5px; border-radius: 4px; box-shadow: 0 2px 4px rgba(0,0,0,0.3); text-transform: uppercase;">START</span>`
                    : ""
                }
                ${
                  isFinish
                    ? `<span style="position: absolute; -top: 14px; background: #d97706; color: white; font-size: 9px; font-weight: 800; padding: 1px 5px; border-radius: 4px; box-shadow: 0 2px 4px rgba(0,0,0,0.3); text-transform: uppercase;">FINISH</span>`
                    : ""
                }
              </div>
            `,
            iconSize: [40, 40],
            iconAnchor: [20, 20],
          });

          const marker = L.marker([stop.coordinates.lat, stop.coordinates.lng], { icon }).addTo(map);

          const popupContent = `
            <div style="width: 270px; font-family: system-ui, sans-serif;">
              <div style="position: relative; height: 110px; width: 100%; overflow: hidden; border-radius: 12px 12px 0 0; background: #0f172a;">
                <img src="${stop.image}" alt="${stop.name}" style="width: 100%; height: 100%; object-fit: cover;" />
                <div style="position: absolute; top: 8px; left: 8px; background: ${isStart ? "#059669" : isFinish ? "#d97706" : "#2563eb"}; color: white; font-size: 10px; font-weight: 800; padding: 2px 8px; border-radius: 9999px; text-transform: uppercase;">
                  ${isStart ? "🏁 Start Point" : isFinish ? "🏁 Destination" : `📍 Stop ${stopNumber}`} • Day ${stop.day}
                </div>
              </div>
              <div style="padding: 10px 12px;">
                <div style="font-size: 14px; font-weight: 800; color: #1e293b; line-height: 1.3;">
                  ${stop.name}
                </div>
                <div style="font-size: 11px; color: #64748b; margin-top: 3px;">
                  ${stop.region}
                </div>
                <div style="margin-top: 8px; display: flex; gap: 8px; font-size: 11px; font-weight: 700; color: #059669;">
                  <span>⏱️ ${stop.drivingTime}</span>
                  <span>•</span>
                  <span>🛣️ ${stop.distanceFromPrev > 0 ? `${stop.distanceFromPrev} km from prev` : "Departure Base"}</span>
                </div>
                <div style="margin-top: 6px; font-size: 11px; color: #d97706; font-weight: 600;">
                  🍲 ${stop.mustTryFood?.[0] || "Regional specialty available"}
                </div>
                <div style="margin-top: 10px; padding-top: 8px; border-top: 1px solid #f1f5f9; display: flex; justify-content: space-between; align-items: center;">
                  <button id="btn-select-stop-${idx}" style="background: none; border: none; font-size: 11px; font-weight: 800; color: #2563eb; cursor: pointer; padding: 0;">
                    Select Dossier ↓
                  </button>
                  <a href="https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(stop.name + " Kerala")}" target="_blank" style="font-size: 11px; font-weight: 700; color: #0284c7; text-decoration: none;">
                    Open GPS ↗
                  </a>
                </div>
              </div>
            </div>
          `;

          marker.bindPopup(popupContent, { maxWidth: 290 });

          marker.on("click", () => {
            setActiveStopIndex(idx);
          });

          markersRef.current.push(marker);
        });

        // Fit map bounds to encompass the full road trip route
        if (routeCoords.length > 0) {
          map.fitBounds(L.latLngBounds(routeCoords), { padding: [50, 50] });
        }
      } else {
        // --- 14 DISTRICTS ATLAS MODE ---
        const allCoords: [number, number][] = [];

        KERALA_14_DISTRICTS.forEach((d, idx) => {
          const isSelected = idx === activeDistrictIndex;
          const districtNumber = idx + 1;
          allCoords.push([d.coordinates.lat, d.coordinates.lng]);

          const icon = L.divIcon({
            className: "district-landmark-pin",
            html: `
              <div id="district-pin-${districtNumber}" style="position: relative; display: flex; align-items: center; justify-content: center; width: 38px; height: 38px; cursor: pointer;">
                <div style="position: absolute; inset: -4px; border-radius: 9999px; background-color: ${isSelected ? "#f59e0b" : "#10b981"}; opacity: ${isSelected ? "0.6" : "0.25"}; animation: ${isSelected ? "pulse 2s infinite" : "none"};"></div>
                <div style="width: 30px; height: 30px; border-radius: 9999px; background-color: ${isSelected ? "#d97706" : "#0f172a"}; color: white; display: flex; align-items: center; justify-content: center; font-size: 12px; font-weight: 800; border: 2.5px solid white; box-shadow: 0 4px 10px rgba(0,0,0,0.4);">
                  ${districtNumber}
                </div>
              </div>
            `,
            iconSize: [38, 38],
            iconAnchor: [19, 19],
          });

          const marker = L.marker([d.coordinates.lat, d.coordinates.lng], { icon }).addTo(map);

          const popupContent = `
            <div style="width: 260px; font-family: system-ui, sans-serif;">
              <div style="position: relative; height: 110px; width: 100%; overflow: hidden; border-radius: 12px 12px 0 0; background: #0f172a;">
                <img src="${d.image}" alt="${d.landmark}" style="width: 100%; height: 100%; object-fit: cover;" />
                <div style="position: absolute; top: 8px; left: 8px; background: #d97706; color: white; font-size: 10px; font-weight: 800; padding: 2px 8px; border-radius: 9999px; text-transform: uppercase;">
                  🏛️ ${d.district} (#${districtNumber})
                </div>
              </div>
              <div style="padding: 10px 12px;">
                <div style="font-size: 13px; font-weight: 800; color: #1e293b; line-height: 1.3;">
                  ${d.landmark}
                </div>
                <div style="font-size: 11px; color: #64748b; margin-top: 4px; line-height: 1.4;">
                  ${d.tagline}
                </div>
                <div style="margin-top: 8px; font-size: 10px; color: #d97706; font-weight: 700;">
                  🍲 ${d.mustTryFood}
                </div>
                <div style="margin-top: 8px; padding-top: 6px; border-top: 1px solid #f1f5f9; display: flex; justify-content: space-between; align-items: center;">
                  <span style="font-size: 10px; color: #059669; font-weight: 700;">${d.bestTime}</span>
                  <a href="https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(d.landmark + " " + d.district + " Kerala")}" target="_blank" style="font-size: 10px; font-weight: 700; color: #0284c7; text-decoration: none;">
                    Open GPS ↗
                  </a>
                </div>
              </div>
            </div>
          `;

          marker.bindPopup(popupContent, { maxWidth: 280 });

          marker.on("click", () => {
            setActiveDistrictIndex(idx);
          });

          markersRef.current.push(marker);
        });

        // Fit bounds to entire Kerala
        if (allCoords.length > 0) {
          map.fitBounds(L.latLngBounds(allCoords), { padding: [40, 40] });
        }
      }

      leafletMapRef.current = map;

      // Invalidate size on mount to ensure tiles render seamlessly
      setTimeout(() => {
        if (isMounted && map) {
          map.invalidateSize();
        }
      }, 250);
    }

    initLeaflet();

    return () => {
      isMounted = false;
      if (leafletMapRef.current) {
        leafletMapRef.current.remove();
        leafletMapRef.current = null;
      }
      markersRef.current = [];
      polylineRef.current = null;
    };
  }, [mapMode, viewMode, route]);

  // Center leaflet on active item when selected without recreating the whole map
  useEffect(() => {
    if (!leafletMapRef.current) return;

    if (viewMode === "route" && activeStop) {
      leafletMapRef.current.panTo([activeStop.coordinates.lat, activeStop.coordinates.lng], {
        animate: true,
        duration: 0.8,
      });
      // Open popup for corresponding marker if present
      const marker = markersRef.current[activeStopIndex];
      if (marker && !marker.isPopupOpen()) {
        marker.openPopup();
      }
    } else if (viewMode === "districts" && activeLandmark) {
      leafletMapRef.current.panTo(
        [activeLandmark.coordinates.lat, activeLandmark.coordinates.lng],
        { animate: true, duration: 0.8 }
      );
      const marker = markersRef.current[activeDistrictIndex];
      if (marker && !marker.isPopupOpen()) {
        marker.openPopup();
      }
    }
  }, [activeStopIndex, activeDistrictIndex, viewMode, activeStop, activeLandmark]);

  // Schematic coordinate projection for Kerala (8.2°N to 12.6°N, 74.8°E to 77.5°E)
  const minLat = 8.2;
  const maxLat = 12.6;
  const minLng = 74.8;
  const maxLng = 77.5;

  const projectCoord = (lat: number, lng: number) => {
    const x = ((lng - minLng) / (maxLng - minLng)) * 80 + 10;
    const y = ((maxLat - lat) / (maxLat - minLat)) * 80 + 10;
    return { x, y };
  };

  const landmarkPoints = KERALA_14_DISTRICTS.map((d, idx) => {
    const pt = projectCoord(d.coordinates.lat, d.coordinates.lng);
    return { ...pt, landmark: d, index: idx };
  });

  const routePoints =
    route?.stops.map((s, idx) => {
      const pt = projectCoord(s.coordinates.lat, s.coordinates.lng);
      return { ...pt, stop: s, index: idx };
    }) || [];

  const schematicPolylinePoints = routePoints.map((pt) => `${pt.x},${pt.y}`).join(" ");

  // External GPS Link for the active item
  const activeGpsUrl =
    viewMode === "route" && activeStop
      ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
          activeStop.name + " " + activeStop.region + " Kerala"
        )}`
      : `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
          activeLandmark.landmark + " " + activeLandmark.district + " Kerala"
        )}`;

  return (
    <div className="bg-white dark:bg-zinc-900 rounded-3xl border border-zinc-200/90 dark:border-zinc-800 p-6 md:p-8 shadow-xl">
      {/* Map Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-zinc-100 dark:border-zinc-800">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
            {viewMode === "route" ? (
              <>
                <RouteIcon className="w-4 h-4 text-emerald-500" />
                <span>Interactive Route Highway Navigator</span>
              </>
            ) : (
              <>
                <Landmark className="w-4 h-4 text-amber-500" />
                <span>14 Districts of Kerala • Main Landmark Map</span>
              </>
            )}
          </div>
          <h2 className="text-2xl font-black text-zinc-900 dark:text-zinc-100 mt-1">
            {viewMode === "route" && route
              ? `${route.title} • Waypoint Map`
              : "Kerala 14 Districts Iconic Landmark Atlas"}
          </h2>
          <p className="text-xs sm:text-sm text-zinc-500 mt-0.5">
            {viewMode === "route" && route
              ? `Connected GPS driving route with ${route.stops.length} waypoints, elevation highlights, and driving times`
              : "Every district's #1 flagship landmark plotted with real GPS coordinates (Kasargod to Thiruvananthapuram)"}
          </p>
        </div>

        {/* View Mode & Map Renderer Toggles */}
        <div className="flex flex-wrap items-center gap-2.5 self-start md:self-auto">
          {/* Primary View Switcher: Route Waypoints vs 14 Districts Atlas (if route exists) */}
          {hasRouteStops && (
            <div className="flex items-center p-1 rounded-2xl bg-zinc-100 dark:bg-zinc-800 text-xs font-semibold">
              <button
                onClick={() => setViewMode("route")}
                className={`px-3 py-1.5 rounded-xl transition-all flex items-center gap-1.5 ${
                  viewMode === "route"
                    ? "bg-emerald-600 text-white shadow-sm font-bold"
                    : "text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-200"
                }`}
              >
                <RouteIcon className="w-3.5 h-3.5" />
                <span>Route Stops ({route?.stops.length})</span>
              </button>
              <button
                onClick={() => setViewMode("districts")}
                className={`px-3 py-1.5 rounded-xl transition-all flex items-center gap-1.5 ${
                  viewMode === "districts"
                    ? "bg-amber-600 text-white shadow-sm font-bold"
                    : "text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-200"
                }`}
              >
                <Landmark className="w-3.5 h-3.5" />
                <span>14 Districts Atlas</span>
              </button>
            </div>
          )}

          {/* Leaflet vs Schematic Toggle */}
          <div className="flex items-center p-1 rounded-2xl bg-zinc-100 dark:bg-zinc-800 text-xs font-semibold">
            <button
              onClick={() => setMapMode("leaflet")}
              className={`px-3 py-1.5 rounded-xl transition-all ${
                mapMode === "leaflet"
                  ? "bg-white dark:bg-zinc-900 text-emerald-600 dark:text-emerald-400 shadow-sm font-bold"
                  : "text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-200"
              }`}
            >
              Real Map
            </button>
            <button
              onClick={() => setMapMode("schematic")}
              className={`px-3 py-1.5 rounded-xl transition-all ${
                mapMode === "schematic"
                  ? "bg-white dark:bg-zinc-900 text-emerald-600 dark:text-emerald-400 shadow-sm font-bold"
                  : "text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-200"
              }`}
            >
              Schematic
            </button>
          </div>

          {/* External GPS Link */}
          <a
            href={activeGpsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 font-bold text-xs border border-emerald-300/40 hover:bg-emerald-100 dark:hover:bg-emerald-900/50 transition-colors shadow-sm"
          >
            <span>Open in GPS</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>

      {/* Sub-Header Strip: Filter or Route Stats */}
      <div className="flex items-center justify-between gap-3 pt-4 pb-2 border-b border-zinc-100 dark:border-zinc-800/80">
        {viewMode === "route" && route ? (
          <div className="flex flex-wrap items-center gap-3 text-xs font-semibold text-zinc-600 dark:text-zinc-400">
            <span className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400 font-bold">
              <Milestone className="w-3.5 h-3.5" />
              <span>{route.startPoint} → {route.endPoint}</span>
            </span>
            <span className="text-zinc-300 dark:text-zinc-700">•</span>
            <span>{route.distanceKm} km total highway stretch</span>
            <span className="text-zinc-300 dark:text-zinc-700">•</span>
            <span>{route.durationDays} Days Itinerary</span>
          </div>
        ) : (
          <div className="flex items-center gap-1.5 text-xs font-semibold text-zinc-500">
            <span>Filter Region:</span>
            <div className="flex items-center gap-1">
              <button
                onClick={() => setRegionFilter("all")}
                className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
                  regionFilter === "all"
                    ? "bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900"
                    : "bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200"
                }`}
              >
                All 14
              </button>
              <button
                onClick={() => setRegionFilter("north")}
                className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
                  regionFilter === "north"
                    ? "bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900"
                    : "bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200"
                }`}
              >
                North (4)
              </button>
              <button
                onClick={() => setRegionFilter("central")}
                className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
                  regionFilter === "central"
                    ? "bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900"
                    : "bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200"
                }`}
              >
                Central (5)
              </button>
              <button
                onClick={() => setRegionFilter("south")}
                className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
                  regionFilter === "south"
                    ? "bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900"
                    : "bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200"
                }`}
              >
                South (5)
              </button>
            </div>
          </div>
        )}

        <span className="text-[11px] font-mono text-zinc-400 hidden sm:inline">
          {viewMode === "route" && activeStop
            ? `Stop #${activeStopIndex + 1} Selected • ${activeStop.name}`
            : `Pin #${activeDistrictIndex + 1} Selected • ${activeLandmark.district}`}
        </span>
      </div>

      {/* Main Grid: Interactive Map Visualizer + Selected Focus Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-6">
        {/* Left Column: Map Visualizer (Leaflet or Schematic) */}
        <div className="lg:col-span-7 flex flex-col justify-between">
          <div className="relative rounded-2xl overflow-hidden border border-zinc-200/80 dark:border-zinc-800 shadow-inner min-h-[480px] bg-zinc-950">
            {mapMode === "leaflet" ? (
              <div ref={leafletContainerRef} className="w-full h-[480px] z-0" />
            ) : (
              <div className="w-full h-[480px] p-5 flex flex-col justify-between bg-gradient-to-b from-emerald-950/80 via-zinc-900 to-zinc-950">
                <div className="flex items-center justify-between text-xs text-emerald-200/70 font-mono z-10">
                  <span className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                    ARABIAN SEA (WEST COAST)
                  </span>
                  <span className="flex items-center gap-1">
                    <Mountain className="w-3.5 h-3.5 text-emerald-400" />
                    WESTERN GHATS (EAST)
                  </span>
                </div>

                {/* SVG Schematic Canvas */}
                <svg
                  viewBox="0 0 100 100"
                  className="w-full h-full max-h-[380px] drop-shadow-2xl select-none"
                  preserveAspectRatio="xMidYMid meet"
                >
                  {/* Subtle Kerala Coastline silhouette */}
                  <path
                    d="M 28 8 Q 20 45 35 92"
                    fill="none"
                    stroke="rgba(16, 185, 129, 0.2)"
                    strokeWidth="1.5"
                    strokeDasharray="2 3"
                  />

                  {viewMode === "route" ? (
                    <>
                      {/* Connected Route Polyline */}
                      {schematicPolylinePoints && (
                        <polyline
                          points={schematicPolylinePoints}
                          fill="none"
                          stroke="#10b981"
                          strokeWidth="2.5"
                          strokeDasharray="3 2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      )}
                      {routePoints.map((pt) => {
                        const isActive = pt.index === activeStopIndex;
                        const isStart = pt.index === 0;
                        const isFinish = pt.index === routePoints.length - 1;
                        return (
                          <g
                            key={pt.stop.id}
                            onClick={() => setActiveStopIndex(pt.index)}
                            className="cursor-pointer group"
                          >
                            {isActive && (
                              <circle cx={pt.x} cy={pt.y} r="6.5" fill="rgba(16, 185, 129, 0.4)" />
                            )}
                            <circle
                              cx={pt.x}
                              cy={pt.y}
                              r={isActive ? "4.5" : "3.2"}
                              fill={isActive ? "#10b981" : isStart ? "#059669" : isFinish ? "#d97706" : "#0f172a"}
                              stroke={isActive ? "#ffffff" : isStart ? "#34d399" : isFinish ? "#fbbf24" : "#10b981"}
                              strokeWidth="1.2"
                            />
                            <text
                              x={pt.x}
                              y={pt.y + 0.8}
                              fontSize="2.4"
                              fontWeight="bold"
                              textAnchor="middle"
                              dominantBaseline="middle"
                              fill="#ffffff"
                            >
                              {pt.index + 1}
                            </text>
                          </g>
                        );
                      })}
                    </>
                  ) : (
                    landmarkPoints.map((pt) => {
                      const isActive = pt.index === activeDistrictIndex;
                      return (
                        <g
                          key={pt.landmark.district}
                          onClick={() => setActiveDistrictIndex(pt.index)}
                          className="cursor-pointer group"
                        >
                          {isActive && (
                            <circle cx={pt.x} cy={pt.y} r="6.5" fill="rgba(245, 158, 11, 0.4)" />
                          )}
                          <circle
                            cx={pt.x}
                            cy={pt.y}
                            r={isActive ? "4.2" : "3"}
                            fill={isActive ? "#f59e0b" : "#0f172a"}
                            stroke={isActive ? "#ffffff" : "#d97706"}
                            strokeWidth="1.2"
                          />
                          <text
                            x={pt.x}
                            y={pt.y + 1}
                            fontSize="2.4"
                            fontWeight="bold"
                            textAnchor="middle"
                            dominantBaseline="middle"
                            fill={isActive ? "#ffffff" : "#fef3c7"}
                          >
                            {pt.index + 1}
                          </text>
                        </g>
                      );
                    })
                  )}
                </svg>

                <div className="text-center text-[10px] text-zinc-400">
                  {viewMode === "route"
                    ? "Interactive Route Polyline • Click any waypoint (1 to " + (route?.stops.length || 0) + ")"
                    : "Click any landmark node (1-14) or switch to Real Map above"}
                </div>
              </div>
            )}
          </div>

          {/* Horizontal Selector Pills (Stops or Districts) */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 pt-3 scrollbar-none">
            {viewMode === "route" && route ? (
              route.stops.map((s, idx) => {
                const isActive = idx === activeStopIndex;
                const isStart = idx === 0;
                const isFinish = idx === route.stops.length - 1;
                return (
                  <button
                    key={s.id}
                    onClick={() => setActiveStopIndex(idx)}
                    className={`flex-shrink-0 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 ${
                      isActive
                        ? "bg-emerald-600 text-white shadow-md shadow-emerald-600/30 scale-105 font-bold"
                        : "bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-700"
                    }`}
                  >
                    <span
                      className={`w-4 h-4 rounded-full flex items-center justify-center text-[10px] font-bold ${
                        isActive
                          ? "bg-white text-emerald-800"
                          : isStart
                          ? "bg-emerald-500 text-white"
                          : isFinish
                          ? "bg-amber-500 text-white"
                          : "bg-zinc-200 dark:bg-zinc-700 text-zinc-700 dark:text-zinc-300"
                      }`}
                    >
                      {idx + 1}
                    </span>
                    <span className="truncate max-w-[120px]">{s.name.split(" ")[0]}</span>
                    <span className="text-[10px] opacity-75 font-mono">D{s.day}</span>
                  </button>
                );
              })
            ) : (
              filteredDistricts.map((d) => {
                const originalIndex = KERALA_14_DISTRICTS.findIndex((item) => item.district === d.district);
                const isActive = originalIndex === activeDistrictIndex;
                return (
                  <button
                    key={d.district}
                    onClick={() => setActiveDistrictIndex(originalIndex)}
                    className={`flex-shrink-0 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 ${
                      isActive
                        ? "bg-amber-500 text-white shadow-md shadow-amber-500/30 scale-105 font-bold"
                        : "bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-700"
                    }`}
                  >
                    <span
                      className={`w-4 h-4 rounded-full flex items-center justify-center text-[10px] font-bold ${
                        isActive
                          ? "bg-white text-amber-700"
                          : "bg-zinc-200 dark:bg-zinc-700 text-zinc-700 dark:text-zinc-300"
                      }`}
                    >
                      {originalIndex + 1}
                    </span>
                    <span>{d.district}</span>
                  </button>
                );
              })
            )}
          </div>
        </div>

        {/* Right Column: Selected Spotlight Dossier (Stop or District) */}
        <div className="lg:col-span-5 flex flex-col justify-between bg-zinc-50 dark:bg-zinc-800/40 rounded-3xl p-6 border border-zinc-200/80 dark:border-zinc-800 shadow-sm">
          {viewMode === "route" && activeStop ? (
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border border-emerald-300/40 flex items-center gap-1.5">
                  <Milestone className="w-3.5 h-3.5 text-emerald-600" />
                  <span>
                    Day {activeStop.day} • Stop {activeStopIndex + 1} of {route?.stops.length}
                  </span>
                </span>
                <span className="text-xs font-mono text-zinc-400">
                  {activeStop.coordinates.lat.toFixed(4)}°N, {activeStop.coordinates.lng.toFixed(4)}°E
                </span>
              </div>

              {/* Stop Image */}
              <div className="relative h-48 w-full rounded-2xl overflow-hidden mb-4 shadow-md bg-zinc-900">
                <Image
                  src={activeStop.image}
                  alt={activeStop.name}
                  fill
                  sizes="(max-width: 1024px) 100vw, 30vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/85 via-zinc-950/25 to-transparent" />
                <div className="absolute bottom-3 left-3 right-3 text-white">
                  <div className="text-xs font-medium text-emerald-300">{activeStop.region}</div>
                  <div className="text-lg font-bold leading-tight">{activeStop.name}</div>
                </div>
              </div>

              <p className="text-xs text-zinc-600 dark:text-zinc-300 leading-relaxed mb-4">
                {activeStop.description}
              </p>

              {/* Travel Metrics Grid */}
              <div className="grid grid-cols-2 gap-2 text-xs mb-4">
                <div className="p-2.5 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200/60 dark:border-zinc-800">
                  <span className="text-zinc-400 block font-medium flex items-center gap-1">
                    <Clock className="w-3 h-3 text-emerald-500" /> Driving Time
                  </span>
                  <span className="text-xs font-bold text-zinc-800 dark:text-zinc-100 mt-0.5 block truncate">
                    {activeStop.drivingTime}
                  </span>
                </div>
                <div className="p-2.5 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200/60 dark:border-zinc-800">
                  <span className="text-zinc-400 block font-medium flex items-center gap-1">
                    <Gauge className="w-3 h-3 text-amber-500" /> Leg Distance
                  </span>
                  <span className="text-xs font-bold text-zinc-800 dark:text-zinc-100 mt-0.5 block truncate">
                    {activeStop.distanceFromPrev > 0 ? `${activeStop.distanceFromPrev} km from prev` : "Starting Leg"}
                  </span>
                </div>
              </div>

              {/* Scenic Spot Highlight */}
              <div className="p-3 rounded-xl bg-emerald-50/80 dark:bg-emerald-950/30 border border-emerald-200/60 dark:border-emerald-900/40 text-xs text-emerald-900 dark:text-emerald-200 mb-3">
                <strong className="font-semibold flex items-center gap-1.5 mb-0.5 text-emerald-800 dark:text-emerald-300">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Scenic Lookout Spot:</span>
                </strong>
                <span>{activeStop.scenicSpot}</span>
              </div>

              {/* Must-Try Regional Food */}
              {activeStop.mustTryFood && activeStop.mustTryFood.length > 0 && (
                <div className="p-3 rounded-xl bg-amber-50/80 dark:bg-amber-950/30 border border-amber-200/60 dark:border-amber-900/40 text-xs text-amber-900 dark:text-amber-200 mb-3">
                  <strong className="font-semibold flex items-center gap-1.5 mb-0.5 text-amber-800 dark:text-amber-300">
                    <Utensils className="w-3.5 h-3.5" />
                    <span>Must-Try Local Flavors:</span>
                  </strong>
                  <span>{activeStop.mustTryFood.join(" • ")}</span>
                </div>
              )}

              {/* Pro Driver Tip */}
              {activeStop.drivingTip && (
                <div className="p-3 rounded-xl bg-zinc-100 dark:bg-zinc-900/80 border border-zinc-200/60 dark:border-zinc-800 text-xs text-zinc-700 dark:text-zinc-300">
                  <strong className="font-semibold flex items-center gap-1.5 mb-0.5 text-amber-600 dark:text-amber-400">
                    <AlertCircle className="w-3.5 h-3.5" />
                    <span>Local Driver Advisory:</span>
                  </strong>
                  {activeStop.drivingTip}
                </div>
              )}
            </div>
          ) : (
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 border border-amber-300/40 flex items-center gap-1.5">
                  <Landmark className="w-3.5 h-3.5" />
                  <span>
                    District {activeDistrictIndex + 1} of 14 • {activeLandmark.district}
                  </span>
                </span>
                <span className="text-xs font-mono text-zinc-400">
                  {activeLandmark.coordinates.lat.toFixed(4)}°N, {activeLandmark.coordinates.lng.toFixed(4)}°E
                </span>
              </div>

              {/* Landmark Image */}
              <div className="relative h-48 w-full rounded-2xl overflow-hidden mb-4 shadow-md bg-zinc-900">
                <Image
                  src={activeLandmark.image}
                  alt={activeLandmark.landmark}
                  fill
                  sizes="(max-width: 1024px) 100vw, 30vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/85 via-zinc-950/20 to-transparent" />
                <div className="absolute bottom-3 left-3 right-3 text-white">
                  <div className="text-xs font-medium text-amber-300">Flagship Landmark</div>
                  <div className="text-lg font-bold leading-tight">{activeLandmark.landmark}</div>
                </div>
              </div>

              <p className="text-xs text-zinc-600 dark:text-zinc-300 leading-relaxed mb-4">
                {activeLandmark.tagline}
              </p>

              {/* Landmark Highlights & Best Time */}
              <div className="grid grid-cols-2 gap-2 text-xs mb-4">
                <div className="p-2.5 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200/60 dark:border-zinc-800">
                  <span className="text-zinc-400 block font-medium flex items-center gap-1">
                    <Calendar className="w-3 h-3 text-amber-500" /> Best Season
                  </span>
                  <span className="text-xs font-bold text-zinc-800 dark:text-zinc-100 mt-0.5 block truncate">
                    {activeLandmark.bestTime}
                  </span>
                </div>
                <div className="p-2.5 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200/60 dark:border-zinc-800">
                  <span className="text-zinc-400 block font-medium flex items-center gap-1">
                    <Sparkles className="w-3 h-3 text-emerald-500" /> Crown Attraction
                  </span>
                  <span className="text-xs font-bold text-zinc-800 dark:text-zinc-100 mt-0.5 block truncate">
                    {activeLandmark.landmark.split("&")[0]}
                  </span>
                </div>
              </div>

              {/* Must-Try Regional Food */}
              <div className="p-3 rounded-xl bg-amber-50/80 dark:bg-amber-950/30 border border-amber-200/60 dark:border-amber-900/40 text-xs text-amber-900 dark:text-amber-200 mb-3">
                <strong className="font-semibold flex items-center gap-1.5 mb-0.5 text-amber-800 dark:text-amber-300">
                  <Utensils className="w-3.5 h-3.5" />
                  <span>{activeLandmark.district} Culinary Specialty:</span>
                </strong>
                <span>{activeLandmark.mustTryFood}</span>
              </div>

              {/* Highlight Experience Note */}
              <div className="p-3 rounded-xl bg-zinc-100 dark:bg-zinc-900/80 border border-zinc-200/60 dark:border-zinc-800 text-xs text-zinc-700 dark:text-zinc-300">
                <strong className="block font-semibold mb-0.5 text-emerald-600 dark:text-emerald-400">
                  Landmark Experience:
                </strong>
                {activeLandmark.highlight}
              </div>
            </div>
          )}

          {/* Action buttons */}
          <div className="mt-5 pt-4 border-t border-zinc-200/70 dark:border-zinc-800 space-y-2">
            <a
              href={activeGpsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={`w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-white font-bold text-xs uppercase tracking-wider transition-colors shadow-sm ${
                viewMode === "route" ? "bg-emerald-600 hover:bg-emerald-700" : "bg-amber-600 hover:bg-amber-700"
              }`}
            >
              <Navigation className="w-4 h-4" />
              <span>
                Drive to {viewMode === "route" && activeStop ? activeStop.name.split("(")[0] : activeLandmark.landmark.split("&")[0]} (GPS)
              </span>
            </a>

            {viewMode === "route" ? (
              <a
                href="#stops-section"
                className="w-full inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-white dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300 hover:text-emerald-600 dark:hover:text-emerald-400 font-bold text-xs border border-zinc-200/60 dark:border-zinc-800 transition-colors"
              >
                <span>Jump to In-Depth Dossiers Below</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </a>
            ) : (
              activeLandmark.routeSlug && (
                <Link
                  href={`/routes/${activeLandmark.routeSlug}`}
                  className="w-full inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-white dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300 hover:text-amber-600 dark:hover:text-amber-400 font-bold text-xs border border-zinc-200/60 dark:border-zinc-800 transition-colors"
                >
                  <span>View Complete Itinerary Route</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </Link>
              )
            )}
          </div>
        </div>
      </div>

      {/* Cross-District Highway Driving & Fuel Budget */}
      <div className="mt-8 pt-6 border-t border-zinc-100 dark:border-zinc-800">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
          <div>
            <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
              <Fuel className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              <span>
                {viewMode === "route" && route
                  ? `${route.title} • Highway Fuel & Energy Estimator`
                  : "Cross-Kerala Highway Fuel & Energy Estimator"}
              </span>
            </h3>
            <p className="text-xs text-zinc-500">
              Estimated for {totalTravelKm} km highway voyage based on current Kerala highway fuel prices and mountain grades
            </p>
          </div>

          {/* Vehicle Selector Tabs */}
          <div className="flex items-center gap-1.5 p-1 rounded-xl bg-zinc-100 dark:bg-zinc-800/80 self-start sm:self-auto">
            <button
              onClick={() => setVehicleType("hatchback")}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                vehicleType === "hatchback"
                  ? "bg-white dark:bg-zinc-900 text-emerald-600 shadow-sm font-bold"
                  : "text-zinc-600 dark:text-zinc-400"
              }`}
            >
              Hatchback
            </button>
            <button
              onClick={() => setVehicleType("suv")}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                vehicleType === "suv"
                  ? "bg-white dark:bg-zinc-900 text-emerald-600 shadow-sm font-bold"
                  : "text-zinc-600 dark:text-zinc-400"
              }`}
            >
              SUV / Crossover
            </button>
            <button
              onClick={() => setVehicleType("ev")}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                vehicleType === "ev"
                  ? "bg-white dark:bg-zinc-900 text-emerald-600 shadow-sm font-bold"
                  : "text-zinc-600 dark:text-zinc-400"
              }`}
            >
              EV (Electric)
            </button>
          </div>
        </div>

        {/* Calculation Summary Bar */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200/60 dark:border-zinc-800">
          <div>
            <span className="text-xs text-zinc-400 block font-medium">Vehicle Class</span>
            <span className="text-sm font-bold text-zinc-800 dark:text-zinc-200 mt-0.5 block">
              {selectedStats.name}
            </span>
          </div>
          <div>
            <span className="text-xs text-zinc-400 block font-medium">Highway Mileage</span>
            <span className="text-sm font-bold text-zinc-800 dark:text-zinc-200 mt-0.5 block">
              {selectedStats.mileage} {vehicleType === "ev" ? "km / kWh" : "km / Litre"}
            </span>
          </div>
          <div>
            <span className="text-xs text-zinc-400 block font-medium">Estimated Travel Cost</span>
            <span className="text-base font-extrabold text-emerald-600 dark:text-emerald-400 mt-0.5 block">
              ₹{calculatedCost.toLocaleString()} INR
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
