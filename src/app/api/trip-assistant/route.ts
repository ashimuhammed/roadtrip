import { NextRequest, NextResponse } from "next/server";
import { generateSmartTripSchedule, TripPreferences, ScheduledTripPlan } from "@/lib/ai-trip-planner";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { message, preferences, customApiKey } = body;

    const apiKey = customApiKey || process.env.GEMINI_API_KEY || process.env.NEXT_PUBLIC_GEMINI_API_KEY;

    // Detect preferences from message text if preferences not directly provided
    const text = (message || "").toLowerCase();
    
    // Infer duration
    let days = preferences?.durationDays || 4;
    const daysMatch = text.match(/(\d+)\s*[- ]*(day|days|d)/i);
    if (daysMatch) {
      days = Math.min(Math.max(parseInt(daysMatch[1], 10), 2), 7);
    }

    // Infer start city
    let startCity = preferences?.startCity || "Kochi";
    if (text.includes("trivandrum") || text.includes("thiruvananthapuram") || text.includes("varkala")) {
      startCity = "Trivandrum";
    } else if (text.includes("kozhikode") || text.includes("calicut") || text.includes("wayanad") || text.includes("kannur")) {
      startCity = "Kozhikode";
    } else if (text.includes("coimbatore") || text.includes("palakkad")) {
      startCity = "Coimbatore";
    }

    // Infer theme
    let theme: TripPreferences["theme"] = preferences?.theme || "highlands";
    if (text.includes("beach") || text.includes("cliff") || text.includes("coast") || text.includes("varkala")) {
      theme = "coastal";
    } else if (text.includes("backwater") || text.includes("houseboat") || text.includes("alleppey") || text.includes("alappuzha") || text.includes("kumarakom")) {
      theme = "backwaters";
    } else if (text.includes("wildlife") || text.includes("safari") || text.includes("periyar") || text.includes("tiger") || text.includes("forest")) {
      theme = "wildlife";
    } else if (text.includes("food") || text.includes("biryani") || text.includes("toddy") || text.includes("culinary")) {
      theme = "culinary";
    } else if (text.includes("all") || text.includes("complete") || text.includes("entire kerala")) {
      theme = "complete";
    }

    // Infer vehicle
    let vehicle: TripPreferences["vehicle"] = preferences?.vehicle || "suv";
    if (text.includes("ev") || text.includes("electric") || text.includes("nexon") || text.includes("charge")) {
      vehicle = "ev";
    } else if (text.includes("bike") || text.includes("motorcycle") || text.includes("bullet") || text.includes("himalayan") || text.includes("ride")) {
      vehicle = "bike";
    } else if (text.includes("hatchback") || text.includes("sedan") || text.includes("swift")) {
      vehicle = "hatchback";
    }

    // Infer group
    let travelGroup: TripPreferences["travelGroup"] = preferences?.travelGroup || "couple";
    if (text.includes("solo") || text.includes("myself") || text.includes("alone")) {
      travelGroup = "solo";
    } else if (text.includes("family") || text.includes("kids") || text.includes("parents")) {
      travelGroup = "family";
    } else if (text.includes("friends") || text.includes("buddies") || text.includes("gang")) {
      travelGroup = "friends";
    }

    const resolvedPrefs: TripPreferences = {
      startCity,
      durationDays: days,
      theme,
      travelGroup,
      vehicle,
      pace: preferences?.pace || "balanced",
      customNotes: message,
    };

    // Synthesize plan
    const generatedPlan: ScheduledTripPlan = generateSmartTripSchedule(resolvedPrefs);

    // If Gemini API Key exists, we can optionally enhance the AI explanation
    let aiResponseText = `Namaskaram! I've scheduled your **${generatedPlan.tripTitle}** for **${days} Days** starting from **${startCity}**.\n\n` +
      `🚗 **Estimated Distance:** ~${generatedPlan.totalDistanceKm} km across ${generatedPlan.days.length} curated day legs.\n` +
      `⛰️ **Ghat Alert:** Features ${generatedPlan.hairpinCount} scenic hairpin turns with elevation vistas.\n` +
      `🍲 **Food Highlights:** Curated local stops for hot Appams, Malabar Biryani, and fresh claypot seafood.\n` +
      (vehicle === "ev" ? `⚡ **EV Route:** Verified DC fast charging stations included along the driving corridor.\n` : "") +
      `\nYou can inspect the complete day-by-day timetable below, export your schedule, or refine any stops!`;

    if (apiKey) {
      try {
        const prompt = `You are the ultimate Kerala Road Trip AI Specialist. A traveler asks: "${message}". 
Respond with warm, expert advice in 2-3 concise paragraphs. Mention exact highways (like NH 85, NH 66, Gap Road), scenic viewpoints, road conditions, and must-eat regional food. Keep formatting neat with markdown bullet points.`;

        const geminiRes = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              contents: [{ parts: [{ text: prompt }] }],
            }),
          }
        );

        if (geminiRes.ok) {
          const geminiData = await geminiRes.json();
          const candidateText = geminiData?.candidates?.[0]?.content?.parts?.[0]?.text;
          if (candidateText) {
            aiResponseText = candidateText;
          }
        }
      } catch (err) {
        console.error("Gemini API call failed, fell back to built-in synthesizer:", err);
      }
    }

    return NextResponse.json({
      success: true,
      text: aiResponseText,
      plan: generatedPlan,
    });
  } catch (error: any) {
    console.error("Trip assistant error:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to process trip request" },
      { status: 500 }
    );
  }
}

