import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDistance(km: number): string {
  return `${km.toLocaleString()} km`;
}

export function formatDuration(days: number): string {
  return days === 1 ? "1 Day" : `${days} Days`;
}

export function calculateEstimatedFuel(totalKm: number, avgMileageKmPerLitre: number = 14, fuelPricePerLitre: number = 108): number {
  const litresNeeded = totalKm / avgMileageKmPerLitre;
  return Math.round(litresNeeded * fuelPricePerLitre);
}
