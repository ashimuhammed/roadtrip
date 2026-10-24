"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { KERALA_14_DISTRICTS, DistrictLandmark } from "@/data/routes";
import {
  Compass,
  MapPin,
  Layers,
  ExternalLink,
  ChevronRight,
  Maximize2,
  Navigation,
  Car,
  Clock,
  Sparkles,
  Landmark,
  Utensils,
  Calendar,
  Search
} from "lucide-react";

export default function MasterKeralaMap() {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);
  const layersGroupRef = useRef<any>(null);

  const [activeDistrictIndex, setActiveDistrictIndex] = useState<number>(0);
  const [selectedRegion, setSelectedRegion] = useState<"all" | "north" | "central" | "south">("all");
  const [tileTheme, setTileTheme] = useState<"streets" | "satellite" | "topo">("streets");
  const [isMapLoaded, setIsMapLoaded] = useState(false);

  const tileConfigs = {
    streets: {
      url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      maxZoom: 19,
    },
    satellite: {
      url: "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
      attribution: 'Tiles &copy; Esri &mdash; DigitalGlobe, GeoEye, Earthstar Geographics',
      maxZoom: 18,
    },
    topo: {
      url: "https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}",
      attribution: 'Tiles &copy; Esri &mdash; Topographic World Map',
      maxZoom: 18,
    },
  };

  const activeLandmark: DistrictLandmark =
    KERALA_14_DISTRICTS[activeDistrictIndex] || KERALA_14_DISTRICTS[0];

  const northDistricts = ["Kasaragod", "Kannur", "Wayanad", "Kozhikode"];
  const centralDistricts = ["Malappuram", "Palakkad", "Thrissur", "Ernakulam", "Idukki"];
  const southDistricts = ["Kottayam", "Alappuzha", "Pathanamthitta", "Kollam", "Thiruvananthapuram"];

  const filteredDistricts = KERALA_14_DISTRICTS.filter((d) => {
    if (selectedRegion === "north") return northDistricts.includes(d.district);
    if (selectedRegion === "central") return centralDistricts.includes(d.district);
    if (selectedRegion === "south") return southDistricts.includes(d.district);
    return true;
  });

  // Initialize Leaflet Map
  useEffect(() => {
    let isMounted = true;

    async function initMap() {
      if (!mapContainerRef.current) return;

      const L = (await import("leaflet")).default;

      if (!isMounted) return;

      // Clean existing instance if any
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
      }

      // Initialize Leaflet map centered at Central Kerala
      const map = L.map(mapContainerRef.current, {
        center: [10.35, 76.3],
        zoom: 7.5,
        minZoom: 6.5,
        maxZoom: 16,
        scrollWheelZoom: false,
      });

      // Add Base Tile Layer
      const config = tileConfigs[tileTheme];
      L.tileLayer(config.url, {
        attribution: config.attribution,
        maxZoom: config.maxZoom,
      }).addTo(map);

      // Create Layer Group for markers
      const layersGroup = L.layerGroup().addTo(map);
      layersGroupRef.current = layersGroup;
      mapInstanceRef.current = map;

      // Ensure Leaflet calculates bounding container correctly
      setTimeout(() => {
        if (isMounted && map) {
          map.invalidateSize();
        }
      }, 250);

      if (isMounted) {
        setIsMapLoaded(true);
      }
    }

    initMap();

    return () => {
      isMounted = false;
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, [tileTheme]);

  // Render 14 District Main Landmarks (NO route polylines)
  useEffect(() => {
    if (!mapInstanceRef.current || !layersGroupRef.current || !isMapLoaded) return;

    import("leaflet").then((LModule) => {
      const L = LModule.default;
      const map = mapInstanceRef.current;
      const group = layersGroupRef.current;

      group.clearLayers();

      const allCoordinates: [number, number][] = [];

      KERALA_14_DISTRICTS.forEach((d, idx) => {
        const isSelected = idx === activeDistrictIndex;
        const districtNum = idx + 1;
        const isVisibleInRegion = filteredDistricts.some((item) => item.district === d.district);

        allCoordinates.push([d.coordinates.lat, d.coordinates.lng]);

        const customIcon = L.divIcon({
          className: "custom-district-landmark-marker",
          html: `
            <div style="position: relative; display: flex; align-items: center; justify-content: center; width: 36px; height: 36px; cursor: pointer; opacity: ${isVisibleInRegion ? "1" : "0.35"}; transition: all 0.2s;">
              <div style="position: absolute; inset: -4px; border-radius: 9999px; background-color: #f59e0b; opacity: ${isSelected ? 0.65 : 0.2}; animation: ${isSelected ? "pulse 2s infinite" : "none"};"></div>
              <div style="width: 28px; height: 28px; border-radius: 9999px; background-color: ${isSelected ? "#d97706" : "#0f172a"}; color: white; display: flex; align-items: center; justify-content: center; font-size: 11px; font-weight: 800; border: 2.5px solid white; box-shadow: 0 4px 8px -1px rgba(0,0,0,0.4);">
                ${districtNum}
              </div>
            </div>
          `,
          iconSize: [36, 36],
          iconAnchor: [18, 18],
        });

        const marker = L.marker([d.coordinates.lat, d.coordinates.lng], {
          icon: customIcon,
        });

        // Rich Popup Card
        const popupContent = `
          <div style="width: 270px; font-family: system-ui, sans-serif;">
            <div style="position: relative; height: 120px; width: 100%; overflow: hidden; border-radius: 12px 12px 0 0; background: #0f172a;">
              <img src="${d.image}" alt="${d.landmark}" style="width: 100%; height: 100%; object-fit: cover;" />
              <div style="position: absolute; top: 8px; left: 8px; background: #d97706; color: white; font-size: 10px; font-weight: 800; padding: 2px 8px; border-radius: 9999px; text-transform: uppercase;">
                🏛️ ${d.district} (#${districtNum})
              </div>
            </div>
            <div style="padding: 12px 14px;">
              <div style="font-size: 10px; font-weight: 700; color: #f59e0b; text-transform: uppercase; letter-spacing: 0.05em;">
                Flagship Landmark
              </div>
              <div style="font-size: 14px; font-weight: 800; color: #1e293b; margin-top: 2px; line-height: 1.3;">
                ${d.landmark}
              </div>
              <div style="font-size: 11px; color: #64748b; margin-top: 5px; line-height: 1.4;">
                ${d.tagline}
              </div>
              <div style="margin-top: 8px; font-size: 11px; color: #b45309; font-weight: 700;">
                🍲 Must Try: ${d.mustTryFood}
              </div>
              <div style="margin-top: 10px; padding-top: 8px; border-top: 1px solid #f1f5f9; display: flex; justify-content: space-between; align-items: center;">
                <span style="font-size: 10px; color: #059669; font-weight: 700;">${d.bestTime}</span>
                <a href="https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(d.landmark + " " + d.district + " Kerala")}" target="_blank" style="display: inline-flex; align-items: center; gap: 4px; font-size: 11px; font-weight: 700; color: #0284c7; text-decoration: none;">
                  Navigate GPS →
                </a>
              </div>
            </div>
          </div>
        `;

        marker.bindPopup(popupContent, { maxWidth: 285 });

        marker.on("click", () => {
          setActiveDistrictIndex(idx);
        });

        group.addLayer(marker);
      });

      // Fit map to Kerala bounds on initial load
      if (allCoordinates.length > 0 && selectedRegion === "all") {
        const bounds = L.latLngBounds(allCoordinates);
        map.fitBounds(bounds, { padding: [40, 40], maxZoom: 8 });
      }
    });
  }, [isMapLoaded, activeDistrictIndex, selectedRegion]);

  // Fly to active landmark when clicked in the pills or list
  useEffect(() => {
    if (mapInstanceRef.current && activeLandmark) {
      mapInstanceRef.current.flyTo(
        [activeLandmark.coordinates.lat, activeLandmark.coordinates.lng],
        10,
        { duration: 1.2 }
      );
    }
  }, [activeDistrictIndex, activeLandmark]);

  return (
    <div className="bg-white dark:bg-zinc-900 rounded-3xl border border-zinc-200/90 dark:border-zinc-800 p-6 md:p-8 shadow-xl">
      {/* Top Header & Interactive Controls */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-zinc-100 dark:border-zinc-800">
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400 mb-1">
            <Landmark className="w-4 h-4" />
            <span>Interactive State Landmark Navigator</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-zinc-900 dark:text-zinc-100 tracking-tight">
            14 Districts of Kerala • Main Landmark Map
          </h2>
          <p className="text-xs sm:text-sm text-zinc-500 mt-0.5">
            Real GPS highway landmarks plotted across all 14 districts of God&apos;s Own Country. Click any pin to view details and GPS directions.
          </p>
        </div>

        {/* Tile Style Picker */}
        <div className="flex items-center gap-2 self-start lg:self-auto">
          <div className="flex items-center gap-1 p-1 rounded-2xl bg-zinc-100 dark:bg-zinc-800 text-xs font-semibold">
            <button
              onClick={() => setTileTheme("streets")}
              className={`px-3 py-1.5 rounded-xl transition-all ${
                tileTheme === "streets"
                  ? "bg-white dark:bg-zinc-900 text-amber-600 shadow-sm font-bold"
                  : "text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-200"
              }`}
            >
              Roads
            </button>
            <button
              onClick={() => setTileTheme("satellite")}
              className={`px-3 py-1.5 rounded-xl transition-all ${
                tileTheme === "satellite"
                  ? "bg-white dark:bg-zinc-900 text-amber-600 shadow-sm font-bold"
                  : "text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-200"
              }`}
            >
              Satellite
            </button>
            <button
              onClick={() => setTileTheme("topo")}
              className={`px-3 py-1.5 rounded-xl transition-all ${
                tileTheme === "topo"
                  ? "bg-white dark:bg-zinc-900 text-amber-600 shadow-sm font-bold"
                  : "text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-200"
              }`}
            >
              Ghats Topo
            </button>
          </div>
        </div>
      </div>

      {/* Region Filter Selector Pills */}
      <div className="flex items-center gap-2 overflow-x-auto py-3.5 scrollbar-none border-b border-zinc-100 dark:border-zinc-800">
        <button
          onClick={() => setSelectedRegion("all")}
          className={`flex-shrink-0 px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${
            selectedRegion === "all"
              ? "bg-amber-600 text-white shadow-md scale-105"
              : "bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 hover:bg-zinc-200"
          }`}
        >
          🌐 All 14 Districts
        </button>
        <button
          onClick={() => setSelectedRegion("north")}
          className={`flex-shrink-0 px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
            selectedRegion === "north"
              ? "bg-amber-600 text-white shadow-md scale-105"
              : "bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 hover:bg-zinc-200"
          }`}
        >
          North Malabar (4)
        </button>
        <button
          onClick={() => setSelectedRegion("central")}
          className={`flex-shrink-0 px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
            selectedRegion === "central"
              ? "bg-amber-600 text-white shadow-md scale-105"
              : "bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 hover:bg-zinc-200"
          }`}
        >
          Central Kerala (5)
        </button>
        <button
          onClick={() => setSelectedRegion("south")}
          className={`flex-shrink-0 px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
            selectedRegion === "south"
              ? "bg-amber-600 text-white shadow-md scale-105"
              : "bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 hover:bg-zinc-200"
          }`}
        >
          South Travancore (5)
        </button>
      </div>

      {/* 14 District Landmarks Quick Jump Strip */}
      <div className="py-2.5 overflow-x-auto scrollbar-none flex items-center gap-1.5 border-b border-zinc-100 dark:border-zinc-800/80">
        {KERALA_14_DISTRICTS.map((d, idx) => {
          const isActive = idx === activeDistrictIndex;
          const isDimmed = !filteredDistricts.some((item) => item.district === d.district);

          return (
            <button
              key={d.district}
              onClick={() => setActiveDistrictIndex(idx)}
              className={`flex-shrink-0 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 ${
                isActive
                  ? "bg-amber-500 text-white shadow-md shadow-amber-500/30 scale-105 font-bold"
                  : isDimmed
                  ? "bg-zinc-50 dark:bg-zinc-800/50 text-zinc-400 opacity-60"
                  : "bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-200"
              }`}
            >
              <span
                className={`w-4 h-4 rounded-full flex items-center justify-center text-[10px] font-bold ${
                  isActive
                    ? "bg-white text-amber-700"
                    : "bg-zinc-200 dark:bg-zinc-700 text-zinc-700 dark:text-zinc-300"
                }`}
              >
                {idx + 1}
              </span>
              <span>{d.district}</span>
            </button>
          );
        })}
      </div>

      {/* Main Map Canvas + Floating Landmark Spotlight Card */}
      <div className="relative mt-4 rounded-2xl overflow-hidden border border-zinc-200/80 dark:border-zinc-800 shadow-inner min-h-[520px]">
        {/* Leaflet Map DOM Node (NO route polylines) */}
        <div ref={mapContainerRef} className="w-full h-[540px] z-0" />

        {/* Floating Quick Landmark Card on Bottom Left */}
        {activeLandmark && (
          <div className="absolute bottom-4 left-4 z-20 max-w-sm w-full p-4 rounded-2xl bg-zinc-950/90 backdrop-blur-xl border border-white/20 text-white shadow-2xl animate-in fade-in slide-in-from-bottom-2">
            <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-wider text-amber-400 mb-1">
              <span>District {activeDistrictIndex + 1} of 14 • {activeLandmark.district}</span>
              <span className="text-emerald-400">{activeLandmark.bestTime}</span>
            </div>
            <h4 className="text-base font-bold text-white leading-snug">{activeLandmark.landmark}</h4>
            <p className="text-xs text-zinc-300 mt-1 line-clamp-2 leading-relaxed">
              {activeLandmark.tagline}
            </p>
            <div className="mt-2 text-xs text-amber-300 font-semibold flex items-center gap-1.5">
              <Utensils className="w-3.5 h-3.5 flex-shrink-0" />
              <span className="truncate">{activeLandmark.mustTryFood}</span>
            </div>
            <div className="mt-3 flex items-center justify-between pt-2 border-t border-white/10">
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(activeLandmark.landmark + " " + activeLandmark.district + " Kerala")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-xs font-bold text-amber-400 hover:text-amber-300"
              >
                <Navigation className="w-3.5 h-3.5" />
                <span>Open Google Maps</span>
              </a>

              {activeLandmark.routeSlug && (
                <Link
                  href={`/routes/${activeLandmark.routeSlug}`}
                  className="inline-flex items-center gap-1 text-xs font-bold text-emerald-400 hover:underline"
                >
                  <span>Route Guide</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </Link>
              )}
            </div>
          </div>
        )}

        {/* Map Legend on Top Right */}
        <div className="absolute top-4 right-4 z-20 hidden sm:flex flex-col gap-1.5 p-3.5 rounded-2xl bg-zinc-950/85 backdrop-blur-md border border-white/15 text-white text-[11px] shadow-lg pointer-events-none">
          <span className="font-bold text-[10px] uppercase tracking-wider text-amber-400 mb-0.5">
            14 Districts Landmark Atlas
          </span>
          <span className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
            <span>Pin 1-4: North Malabar</span>
          </span>
          <span className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
            <span>Pin 5-9: Central Kerala & Ghats</span>
          </span>
          <span className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-sky-500" />
            <span>Pin 10-14: South Backwaters & Coast</span>
          </span>
          <span className="text-[10px] text-zinc-400 mt-1 border-t border-white/10 pt-1">
            No route lines • Pure landmark coordinates
          </span>
        </div>
      </div>
    </div>
  );
}
