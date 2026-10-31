import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import AiAssistantGlobalProvider from "@/components/AiAssistantGlobalProvider";
import Link from "next/link";
import { Compass, Shield, PhoneCall, Heart, Navigation } from "lucide-react";
import { KERALA_ROUTES } from "@/data/routes";

export const metadata: Metadata = {
  title: "Kerala Roadtrips | Scenic Drives, Mountain Ghats & Coastal Trails",
  description:
    "Curated road trips and day-by-day itineraries across Kerala. Explore Munnar's hairpin bends, Alleppey backwaters, Varkala cliffs, and Wayanad rainforests with interactive maps, fuel calculators, and local foodie recommendations.",
  keywords: [
    "Kerala roadtrip",
    "Munnar drive",
    "Alleppey road trip",
    "Varkala cliff drive",
    "Western Ghats driving route",
    "Kerala highway travel guide"
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col font-sans bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100">
        <AiAssistantGlobalProvider>
          <Navbar />
          <main className="flex-1">{children}</main>

          {/* Global Travel Footer */}
          <footer className="bg-zinc-900 text-zinc-300 border-t border-zinc-800 pt-16 pb-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-zinc-800">
              {/* Brand Column */}
              <div className="md:col-span-1 space-y-4">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-emerald-600 flex items-center justify-center text-white">
                    <Compass className="w-5 h-5" />
                  </div>
                  <span className="text-xl font-bold text-white tracking-tight">
                    Kerala<span className="text-emerald-400">Roadtrip</span>
                  </span>
                </div>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  Your quintessential open-source road trip companion for exploring God&apos;s Own Country by car, motorcycle, and EV.
                </p>
                <div className="flex items-center gap-2 text-xs text-zinc-400">
                  <Navigation className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Kochi • Munnar • Alleppey • Wayanad</span>
                </div>
              </div>

              {/* Highway Emergency Numbers */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-400 mb-4 flex items-center gap-1.5">
                  <PhoneCall className="w-3.5 h-3.5" />
                  <span>Emergency Road Helplines</span>
                </h4>
                <ul className="space-y-2 text-xs text-zinc-400">
                  <li>
                    <strong className="text-zinc-200 block">Kerala Highway Police:</strong>
                    <span>9846 100 100 / 112</span>
                  </li>
                  <li>
                    <strong className="text-zinc-200 block">Ambulance Service:</strong>
                    <span>108</span>
                  </li>
                  <li>
                    <strong className="text-zinc-200 block">Kerala Tourism Helpline:</strong>
                    <span>1-800-425-4747 (Toll Free)</span>
                  </li>
                </ul>
              </div>

              {/* Popular Routes */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-400 mb-4">
                  Featured Routes
                </h4>
                <ul className="space-y-2 text-xs text-zinc-400">
                  {KERALA_ROUTES.map((route) => (
                    <li key={route.slug}>
                      <Link href={`/routes/${route.slug}`} className="hover:text-emerald-400 transition-colors">
                        {route.title} ({route.durationDays}D)
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Responsible Travel */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-400 mb-4 flex items-center gap-1.5">
                  <Shield className="w-3.5 h-3.5" />
                  <span>Responsible Touring</span>
                </h4>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  Protect Kerala&apos;s pristine ecosystems. Carry reusable water flasks, strictly avoid plastic littering on ghat passes, and respect wildlife crossings in Periyar and Wayanad reserves.
                </p>
              </div>
            </div>

            <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-zinc-500 gap-4">
              <p>© {new Date().getFullYear()} Kerala Roadtrip Guide. Made for road wanderers.</p>
              <p className="flex items-center gap-1">
                <span>Designed with</span>
                <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
                <span>for Kerala exploration</span>
              </p>
            </div>
          </div>
        </footer>
        </AiAssistantGlobalProvider>
      </body>
    </html>
  );
}
