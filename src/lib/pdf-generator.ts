import { ScheduledTripPlan } from "./ai-trip-planner";

export function generateSchedulePdf(plan: ScheduledTripPlan) {
  const printWindow = window.open("", "_blank");
  if (!printWindow) {
    alert("Please allow popups to download and print the itinerary PDF.");
    return;
  }

  const dateStr = new Date().toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  const passId = `KL-EXP-${Math.floor(100000 + Math.random() * 900000)}`;

  const html = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>${plan.tripTitle} - Official Kerala Roadtrip Schedule</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');

    @page {
      size: A4;
      margin: 14mm 14mm 14mm 14mm;
    }

    * {
      box-sizing: border-box;
      -webkit-print-color-adjust: exact !important;
      print-color-adjust: exact !important;
    }

    body {
      font-family: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      color: #0f172a;
      background: #ffffff;
      margin: 0;
      padding: 0;
      font-size: 11pt;
      line-height: 1.5;
    }

    .no-print {
      display: flex;
      justify-content: space-between;
      align-items: center;
      background: #064e3b;
      color: #ffffff;
      padding: 12px 20px;
      font-size: 13px;
      position: sticky;
      top: 0;
      z-index: 100;
    }

    .no-print button {
      background: #10b981;
      color: #ffffff;
      border: none;
      padding: 8px 16px;
      border-radius: 8px;
      font-weight: 700;
      font-size: 12px;
      cursor: pointer;
      box-shadow: 0 2px 6px rgba(0,0,0,0.2);
    }

    .no-print button:hover {
      background: #059669;
    }

    @media print {
      .no-print {
        display: none !important;
      }
    }

    .pass-container {
      max-width: 800px;
      margin: 0 auto;
      padding: 10px 0;
    }

    /* Header Passport Section */
    .header-card {
      background: linear-gradient(135deg, #022c22 0%, #064e3b 50%, #0f766e 100%);
      color: #ffffff;
      padding: 24px;
      border-radius: 16px;
      margin-bottom: 20px;
      border: 1px solid #134e4a;
    }

    .header-top {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      border-bottom: 1px solid rgba(255, 255, 255, 0.2);
      padding-bottom: 12px;
      margin-bottom: 14px;
    }

    .brand-title {
      font-size: 12px;
      font-weight: 800;
      letter-spacing: 2px;
      text-transform: uppercase;
      color: #6ee7b7;
      display: flex;
      align-items: center;
      gap: 6px;
    }

    .pass-tag {
      background: rgba(245, 158, 11, 0.2);
      border: 1px solid #f59e0b;
      color: #fef3c7;
      padding: 3px 8px;
      border-radius: 6px;
      font-size: 10px;
      font-weight: 700;
      letter-spacing: 1px;
    }

    .trip-title {
      font-size: 24pt;
      font-weight: 800;
      margin: 0 0 6px 0;
      line-height: 1.15;
      color: #ffffff;
    }

    .trip-tagline {
      font-size: 11pt;
      color: #a7f3d0;
      margin: 0;
      line-height: 1.4;
    }

    /* Key Stats Grid */
    .stats-grid {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 10px;
      margin-top: 18px;
    }

    .stat-box {
      background: rgba(0, 0, 0, 0.35);
      border: 1px solid rgba(255, 255, 255, 0.15);
      padding: 10px;
      border-radius: 10px;
      text-align: center;
    }

    .stat-label {
      font-size: 8pt;
      text-transform: uppercase;
      color: #93c5fd;
      font-weight: 700;
      letter-spacing: 0.5px;
    }

    .stat-val {
      font-size: 13pt;
      font-weight: 800;
      color: #ffffff;
      margin-top: 2px;
    }

    .stat-sub {
      font-size: 7.5pt;
      color: #cbd5e1;
    }

    /* Day Block */
    .day-card {
      background: #f8fafc;
      border: 1px solid #e2e8f0;
      border-radius: 14px;
      padding: 18px;
      margin-bottom: 20px;
      page-break-inside: avoid;
    }

    .day-header {
      display: flex;
      justify-content: space-between;
      align-items: baseline;
      border-bottom: 2px solid #cbd5e1;
      padding-bottom: 8px;
      margin-bottom: 12px;
    }

    .day-badge {
      background: #047857;
      color: #ffffff;
      font-weight: 800;
      font-size: 9pt;
      padding: 3px 8px;
      border-radius: 6px;
      text-transform: uppercase;
      letter-spacing: 1px;
    }

    .day-title {
      font-size: 13pt;
      font-weight: 800;
      color: #0f172a;
      margin: 0;
      display: inline-block;
      margin-left: 8px;
    }

    .day-route {
      font-size: 9pt;
      font-weight: 600;
      color: #047857;
      margin-top: 4px;
    }

    .day-metrics {
      font-size: 8.5pt;
      color: #64748b;
      font-weight: 700;
    }

    /* Timetable Table */
    .timeline-table {
      width: 100%;
      border-collapse: collapse;
      margin-top: 10px;
      font-size: 9.5pt;
    }

    .timeline-table th {
      background: #e2e8f0;
      color: #334155;
      text-align: left;
      padding: 6px 10px;
      font-size: 8pt;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }

    .timeline-table td {
      padding: 8px 10px;
      border-bottom: 1px solid #e2e8f0;
      vertical-align: top;
    }

    .time-badge {
      font-family: monospace;
      font-weight: 800;
      color: #047857;
      font-size: 9pt;
      white-space: nowrap;
    }

    .cat-badge {
      display: inline-block;
      padding: 2px 6px;
      border-radius: 4px;
      font-size: 7.5pt;
      font-weight: 700;
      text-transform: uppercase;
      background: #f1f5f9;
      color: #475569;
      border: 1px solid #cbd5e1;
    }

    .cat-drive { background: #eff6ff; color: #1d4ed8; border-color: #bfdbfe; }
    .cat-food { background: #fffbeb; color: #b45309; border-color: #fde68a; }
    .cat-scenic { background: #ecfdf5; color: #047857; border-color: #a7f3d0; }
    .cat-attraction { background: #faf5ff; color: #7e22ce; border-color: #e9d5ff; }
    .cat-stay { background: #f0fdfa; color: #0f766e; border-color: #99f6e4; }

    .seg-title {
      font-weight: 700;
      color: #0f172a;
    }

    .seg-loc {
      font-size: 8pt;
      color: #64748b;
      font-weight: 600;
    }

    .seg-desc {
      color: #334155;
      margin-top: 3px;
      font-size: 8.5pt;
      line-height: 1.35;
    }

    .seg-tip {
      color: #b45309;
      background: #fffbeb;
      padding: 2px 6px;
      border-radius: 4px;
      margin-top: 4px;
      font-size: 8pt;
      display: inline-block;
      font-weight: 600;
    }

    /* Day Highlights and Food Box */
    .day-callouts {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 10px;
      margin-top: 10px;
      font-size: 8.5pt;
    }

    .callout-box {
      padding: 8px 12px;
      border-radius: 8px;
      background: #ffffff;
      border: 1px solid #e2e8f0;
    }

    .callout-food {
      border-left: 3px solid #f59e0b;
    }

    .callout-drive {
      border-left: 3px solid #0284c7;
    }

    .callout-title {
      font-weight: 800;
      font-size: 8pt;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      margin-bottom: 2px;
    }

    .callout-food .callout-title { color: #b45309; }
    .callout-drive .callout-title { color: #0284c7; }

    /* Footer Notes */
    .footer-section {
      background: #0f172a;
      color: #cbd5e1;
      padding: 16px 20px;
      border-radius: 12px;
      margin-top: 24px;
      font-size: 8pt;
      page-break-inside: avoid;
    }

    .footer-grid {
      display: grid;
      grid-template-columns: 2fr 1fr;
      gap: 16px;
    }

    .footer-title {
      font-weight: 800;
      color: #ffffff;
      font-size: 9pt;
      text-transform: uppercase;
      margin-bottom: 6px;
      letter-spacing: 0.5px;
    }

    .disclaimer {
      border-top: 1px solid #334155;
      padding-top: 10px;
      margin-top: 12px;
      color: #94a3b8;
      font-size: 7.5pt;
      display: flex;
      justify-content: space-between;
    }
  </style>
</head>
<body>
  <div class="no-print">
    <div>
      <strong>Kerala Roadtrip Official Itinerary Pass</strong> — Ready to Save as PDF
    </div>
    <div>
      <button onclick="window.print()">🖨️ Print / Save as PDF</button>
    </div>
  </div>

  <div class="pass-container">
    <!-- Header Passport Card -->
    <div class="header-card">
      <div class="header-top">
        <div class="brand-title">
          <span>🌴 KERALA ROADTRIP ATLAS</span>
          <span>•</span>
          <span>OFFICIAL TRAVEL ITINERARY</span>
        </div>
        <div class="pass-tag">
          PASS ID: ${passId}
        </div>
      </div>

      <h1 class="trip-title">${plan.tripTitle}</h1>
      <p class="trip-tagline">${plan.tagline}</p>

      <div class="stats-grid">
        <div class="stat-box">
          <div class="stat-label">Total Distance</div>
          <div class="stat-val">~${plan.totalDistanceKm} km</div>
          <div class="stat-sub">${plan.days.length} Days Itinerary</div>
        </div>
        <div class="stat-box">
          <div class="stat-label">Driving Time</div>
          <div class="stat-val">${plan.totalDrivingHours}</div>
          <div class="stat-sub">Across Kerala Highways</div>
        </div>
        <div class="stat-box">
          <div class="stat-label">Hairpin Passes</div>
          <div class="stat-val">${plan.hairpinCount} Curves</div>
          <div class="stat-sub">Scenic Western Ghats</div>
        </div>
        <div class="stat-box">
          <div class="stat-label">Projected Budget</div>
          <div class="stat-val">₹${(plan.estimatedFuelCost + plan.estimatedStayBudget + plan.estimatedFoodBudget).toLocaleString()}</div>
          <div class="stat-sub">Fuel, Stay & Cuisine</div>
        </div>
      </div>
    </div>

    <!-- Day-by-day Itinerary -->
    ${plan.days
      .map(
        (day) => `
      <div class="day-card">
        <div class="day-header">
          <div>
            <span class="day-badge">Day ${day.dayNumber}</span>
            <h2 class="day-title">${day.title}</h2>
            <div class="day-route">Route: ${day.route}</div>
          </div>
          <div class="day-metrics">
            ${day.distanceKm} km • ${day.driveTime}
          </div>
        </div>

        <table class="timeline-table">
          <thead>
            <tr>
              <th style="width: 15%;">Time</th>
              <th style="width: 15%;">Type</th>
              <th style="width: 70%;">Scheduled Activity & Stop Details</th>
            </tr>
          </thead>
          <tbody>
            ${day.segments
              .map(
                (seg) => `
              <tr>
                <td class="time-badge">${seg.time}</td>
                <td>
                  <span class="cat-badge cat-${seg.type}">${seg.type}</span>
                </td>
                <td>
                  <div class="seg-title">${seg.title}</div>
                  <div class="seg-loc">📍 ${seg.location}</div>
                  <div class="seg-desc">${seg.description}</div>
                  ${seg.tips ? `<div class="seg-tip">💡 Tip: ${seg.tips}</div>` : ""}
                </td>
              </tr>
            `
              )
              .join("")}
          </tbody>
        </table>

        <div class="day-callouts">
          <div class="callout-box callout-food">
            <div class="callout-title">🍲 Must-Try Gastronomy:</div>
            <div>${day.localFoodSpecialty}</div>
          </div>
          <div class="callout-box callout-drive">
            <div class="callout-title">⚠️ Driving Advisory:</div>
            <div>${day.drivingAdvice}</div>
          </div>
        </div>

        <div style="margin-top: 8px; font-size: 8pt; color: #475569; font-weight: 600;">
          🏨 Recommended Overnight: <strong>${day.stayRecommendation}</strong>
        </div>
      </div>
    `
      )
      .join("")}

    <!-- Packing & Safety Section -->
    <div class="footer-section">
      <div class="footer-grid">
        <div>
          <div class="footer-title">Roadtrip Essentials Checklist</div>
          <ul style="margin: 0; padding-left: 16px; line-height: 1.6;">
            ${plan.packingTips.map((tip) => `<li>${tip}</li>`).join("")}
          </ul>
        </div>
        <div>
          <div class="footer-title">Emergency Highway Helplines</div>
          <div style="line-height: 1.8;">
            <div>🚔 Police Control: <strong>112</strong></div>
            <div>🚑 Ambulance: <strong>108</strong></div>
            <div>🛣️ Highway Patrol: <strong>9846 100 100</strong></div>
            <div>⚡ KSEB EV Helpline: <strong>1912</strong></div>
          </div>
        </div>
      </div>

      <div class="disclaimer">
        <span>Generated by Kerala Roadtrip AI Assistant • Issue Date: ${dateStr}</span>
        <span>Always verify real-time ghat weather & monsoon advisories before driving.</span>
      </div>
    </div>
  </div>

  <script>
    // Trigger print preview automatically once loaded across all browsers
    function triggerPrint() {
      setTimeout(function() {
        try {
          window.print();
        } catch(e) {
          console.error("Auto print failed:", e);
        }
      }, 400);
    }
    if (document.readyState === 'complete') {
      triggerPrint();
    } else {
      window.addEventListener('load', triggerPrint);
    }
  </script>
</body>
</html>
  `;

  printWindow.document.open();
  printWindow.document.write(html);
  printWindow.document.close();
}

