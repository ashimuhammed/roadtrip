export interface TripPreferences {
  startCity: string;
  durationDays: number;
  theme: "highlands" | "backwaters" | "coastal" | "wildlife" | "culinary" | "complete";
  travelGroup: "solo" | "couple" | "family" | "friends";
  vehicle: "suv" | "hatchback" | "ev" | "bike";
  pace: "relaxed" | "balanced" | "thrilling";
  customNotes?: string;
}

export interface DaySegment {
  time: string;
  title: string;
  location: string;
  type: "drive" | "attraction" | "food" | "scenic" | "stay";
  description: string;
  tips?: string;
}

export interface DayPlan {
  dayNumber: number;
  title: string;
  route: string;
  distanceKm: number;
  driveTime: string;
  segments: DaySegment[];
  stayRecommendation: string;
  localFoodSpecialty: string;
  drivingAdvice: string;
}

export interface ScheduledTripPlan {
  id: string;
  tripTitle: string;
  tagline: string;
  summary: string;
  totalDistanceKm: number;
  totalDrivingHours: string;
  recommendedVehicle: string;
  estimatedFuelCost: number;
  estimatedStayBudget: number;
  estimatedFoodBudget: number;
  bestTimeToDrive: string;
  routeHighlights: string[];
  hairpinCount: number;
  evChargingAdvice?: string;
  packingTips: string[];
  days: DayPlan[];
}

export interface ChatMessage {
  id: string;
  sender: "user" | "assistant";
  text: string;
  timestamp: string;
  suggestedPlan?: ScheduledTripPlan;
}

// Preset cities and options
export const KERALA_STARTING_HUBS = [
  { id: "Kochi", name: "Kochi (Cochin)", airport: "COK", desc: "Central Hub • Gateway to Munnar & Alleppey" },
  { id: "Trivandrum", name: "Thiruvananthapuram", airport: "TRV", desc: "South Hub • Gateway to Varkala, Kovalam & Ponmudi" },
  { id: "Kozhikode", name: "Kozhikode (Calicut)", airport: "CCJ", desc: "North Hub • Gateway to Wayanad & Kannur Drive-in" },
  { id: "Kannur", name: "Kannur", airport: "CNN", desc: "Far North • Drive-in Beach & Bekal Fort" },
  { id: "Coimbatore", name: "Coimbatore / Palakkad", airport: "CJB", desc: "Gap Entry • Valparai & Silent Valley Access" },
];

export const TRIP_THEMES = [
  { id: "highlands", label: "Misty Highlands & Ghats", icon: "Mountain", desc: "Tea gardens, hairpin bends, waterfalls & crisp air" },
  { id: "backwaters", label: "Backwaters & Waterways", icon: "Waves", desc: "Houseboats, below-sea-level canals & village life" },
  { id: "coastal", label: "Coastal Cliffs & Drive-in Beaches", icon: "Sun", desc: "Varkala red cliffs, Kannur drive-in beach & seafood" },
  { id: "wildlife", label: "Rainforests & Wildlife Safaris", icon: "Trees", desc: "Periyar tigers, Wayanad elephants & jungle trails" },
  { id: "culinary", label: "Foodie Highway & Toddy Trails", icon: "Utensils", desc: "Thalassery biryani, Karimeen fry & Malabar snacks" },
  { id: "complete", label: "The Grand All-Kerala Circuit", icon: "Compass", desc: "The balanced mix of mountains, backwaters and coasts" },
];

// Calculation of estimated budget
export function calculateBudget(
  durationDays: number,
  travelGroup: string,
  vehicle: string,
  totalKm: number
) {
  const travelers = travelGroup === "solo" ? 1 : travelGroup === "couple" ? 2 : travelGroup === "family" ? 4 : 4;
  
  const mileage = vehicle === "hatchback" ? 17 : vehicle === "suv" ? 12 : vehicle === "bike" ? 35 : 6.5;
  const unitRate = vehicle === "ev" ? 22 : vehicle === "bike" ? 106 : 108;
  const estimatedFuel = Math.round((totalKm / mileage) * unitRate);

  const stayPerNight = travelers === 1 ? 2200 : travelers === 2 ? 3800 : 6500;
  const estimatedStay = durationDays * stayPerNight;

  const foodPerDayPerPerson = 900;
  const estimatedFood = durationDays * travelers * foodPerDayPerPerson;

  return { estimatedFuel, estimatedStay, estimatedFood, totalBudget: estimatedFuel + estimatedStay + estimatedFood };
}

// Generate rich, realistic day-by-day schedules customized to user inputs
export function generateSmartTripSchedule(prefs: TripPreferences): ScheduledTripPlan {
  const { startCity, durationDays, theme, travelGroup, vehicle, pace } = prefs;

  // Tailored generation based on starting hub and theme
  let tripTitle = "";
  let tagline = "";
  let summary = "";
  let days: DayPlan[] = [];
  let hairpinCount = 0;
  let highlights: string[] = [];

  const isEV = vehicle === "ev";
  const evAdvice = isEV 
    ? "Fast DC Chargers available via KSEB app at Kochi Edappally, Munnar town entrance, Alleppey bypass, and Highway NH 66 plazas." 
    : undefined;

  // Branch 1: Starting Kochi / Central Highlands
  if (startCity === "Kochi" || theme === "highlands" || theme === "complete") {
    tripTitle = durationDays <= 3 ? "Munnar Tea Cloud & Waterfalls Sprint" : "Highland Ghats & Backwater Serenade";
    tagline = "From coastal spice docks to 1,880m mist-shrouded tea summits and placid lagoons";
    summary = `A handcrafted ${durationDays}-day road voyage starting from ${startCity}, tailored for ${travelGroup} in a ${vehicle.toUpperCase()}. Balances exhilarating ghat driving, scenic mountain stops, authentic Malabar dining, and tranquil sunset waters.`;
    hairpinCount = 40;
    highlights = [
      "Cheeyappara & Valara cascading highway falls",
      "Gap Road 180° cliffside driving corridor",
      "Kolukkumalai offroad sunrise tea expedition",
      "Periyar lake sanctuary boat safari or Alleppey canal sunset",
      "Authentic Kerala Sadhya on banana leaf & hot spiced chai"
    ];

    // Day 1
    days.push({
      dayNumber: 1,
      title: "Climbing from Sea Plains to Munnar Clouds",
      route: `${startCity} → Kothamangalam → Neriamangalam Forest → Munnar`,
      distanceKm: 128,
      driveTime: "3.5 to 4.5 hours",
      stayRecommendation: "Heritage Tea Estate Bungalow in Old Munnar / Devikulam",
      localFoodSpecialty: "Hot Thattukada Kerala Parotta with Spiced Beef or Kadala Curry",
      drivingAdvice: "Drive alert on the Neriamangalam stretch; narrow bridges and lush tree canopies. Use lower gear on climbs.",
      segments: [
        {
          time: "07:30 AM",
          title: "Early Morning Coastal Departure",
          location: `${startCity} Outskirts`,
          type: "drive",
          description: "Beat morning city traffic by heading out on NH 85 towards the Western Ghats foothills.",
          tips: "Fuel up full before hitting the hill stretches."
        },
        {
          time: "09:30 AM",
          title: "Authentic Highway Breakfast",
          location: "Kothamangalam Highway Stop",
          type: "food",
          description: "Relish soft fluffy Appam with fragrant coconut vegetable stew and steaming filter coffee.",
          tips: "Look for traditional tea stalls serving freshly fried banana fritters (Pazham Pori)."
        },
        {
          time: "11:30 AM",
          title: "Cheeyappara & Valara Waterfalls Pause",
          location: "NH 85 Mountain Edge",
          type: "scenic",
          description: "Watch milky seven-tier waterfalls cascading directly beside your vehicle along the mountain rock face.",
          tips: "Great photography spot; park only in designated safe gravel pullouts."
        },
        {
          time: "01:30 PM",
          title: "Munnar Town Check-in & Plantation Lunch",
          location: "Munnar High Street",
          type: "food",
          description: "Fresh hot Kerala Meals with spiced fish curry or paneer ghee roast, overlooking mist rolling across tea plantations.",
        },
        {
          time: "04:30 PM",
          title: "Gap Road Panoramic Sunset Cruise",
          location: "Gap Road Mountain Corridor",
          type: "drive",
          description: "Drive along one of South India's most scenic paved skyways flanked by vertical rock walls and 3,000-ft drop valley panoramas.",
          tips: "Golden hour light here between 4:45 PM and 5:30 PM is phenomenal for landscape photos."
        },
        {
          time: "07:30 PM",
          title: "Cozy Highland Dinner & Campfire",
          location: "Tea Estate Retreat",
          type: "stay",
          description: "Relax by a warm hearth with freshly brewed Cardamom tea and warm Kerala spiced dinner."
        }
      ]
    });

    // Day 2
    days.push({
      dayNumber: 2,
      title: "Alpine Horizons, Top Station & Tea Museum",
      route: "Munnar → Mattupetty Dam → Kundala Lake → Top Station",
      distanceKm: 76,
      driveTime: "2.5 to 3 hours total driving",
      stayRecommendation: "Munnar Valley Resort or Thekkady Spice Homestay",
      localFoodSpecialty: "Fresh Organic Cardamom Spiced Tea & Warm Kerala Ela Ada",
      drivingAdvice: "Watch for occasional mist pockets and wild elephant warning boards near Mattupetty forest fringes.",
      segments: [
        {
          time: "06:00 AM",
          title: "Sunrise Over Tea Horizons",
          location: "Kolukkumalai / Pothamedu Viewpoint",
          type: "scenic",
          description: "Witness golden morning sunlight pierce rolling carpets of emerald tea bushes under floating clouds.",
        },
        {
          time: "08:30 AM",
          title: "Breakfast & Fresh Farm Coffee",
          location: "Hilltop Cafe",
          type: "food",
          description: "Puttu with spicy Kadala curry, fresh farm eggs, and fresh highland fruits.",
        },
        {
          time: "10:30 AM",
          title: "Mattupetty Reservoir & Kundala Speedboating",
          location: "Mattupetty Lake",
          type: "attraction",
          description: "Scenic lakeside drive along calm reservoir waters bordered by Anamudi Shola national park pines.",
          tips: "Stop at Echo Point for local roasted spiced corn and pine fruit."
        },
        {
          time: "02:00 PM",
          title: "KDHP Tea Museum & Artisan Factory Tour",
          location: "Nullatanni Estate",
          type: "attraction",
          description: "Learn 140-year colonial tea-making heritage, CTC processing, and artisan tea tasting session.",
        },
        {
          time: "05:00 PM",
          title: "Sunset Walk Through Blossom Hydrangeas",
          location: "Old Munnar Blossom Park",
          type: "scenic",
          description: "Soak in chilly evening mountain air and shop for export-grade green tea and freshly harvested spices.",
        },
        {
          time: "07:30 PM",
          title: "Traditional Kerala Dindigul / Claypot Dinner",
          location: "Rapsy / Hillside Eatery",
          type: "food",
          description: "Warm Kerala Malabar biryani and spicy pepper soup.",
        }
      ]
    });

    // Day 3
    if (durationDays >= 3) {
      if (theme === "highlands" && durationDays === 3) {
        days.push({
          dayNumber: 3,
          title: "Vagamon Pine Meadows & Valley Descent",
          route: "Munnar → Pooppara → Nedumkandam → Vagamon → Return",
          distanceKm: 145,
          driveTime: "4 to 4.5 hours",
          stayRecommendation: `Return to ${startCity} or Vagamon Eco-Cottage`,
          localFoodSpecialty: "Thodupuzha Tapioca & Spicy Fish Curry (Kappa & Meen Curry)",
          drivingAdvice: "Smooth descents; use engine braking rather than riding brakes continuously on long slopes.",
          segments: [
            {
              time: "08:00 AM",
              title: "Departing via Lock Heart Gap",
              location: "Lock Heart Valley",
              type: "drive",
              description: "Scenic mountain pass drive overlooking the Bison Valley terrace farms.",
            },
            {
              time: "11:00 AM",
              title: "Vagamon Pine Forest Stroll",
              location: "Kolahalamedu Pine Valley",
              type: "scenic",
              description: "Walk beneath towering pine tree forest needles and misty rolling Kurisumala green meadows.",
            },
            {
              time: "01:30 PM",
              title: "Foothills Countryside Lunch",
              location: "Thodupuzha Highway Haven",
              type: "food",
              description: "Steaming steamed tapioca (Kappa) served with fiery red fish curry and crushed bird's eye chilies.",
            },
            {
              time: "05:30 PM",
              title: `Return Cruise to ${startCity}`,
              location: `${startCity}`,
              type: "drive",
              description: "Smooth evening highway cruise completing your memorable mountain loop.",
            }
          ]
        });
      } else {
        days.push({
          dayNumber: 3,
          title: "Periyar Spice Valleys & Wildlife Lake Cruise",
          route: "Munnar → Pooppara → Kumily (Thekkady)",
          distanceKm: 92,
          driveTime: "3 hours",
          stayRecommendation: "Spice Plantation Bungalow in Kumily",
          localFoodSpecialty: "Fresh Periyar Cardamom Chicken Curry & Coconut Idiyappam",
          drivingAdvice: "Drive slowly through cardamom estates; watch for spice garden tractor entries.",
          segments: [
            {
              time: "08:30 AM",
              title: "Scenic Spice Route Drive",
              location: "Cardamom Hills Highway",
              type: "drive",
              description: "Drive through dense cardamom, pepper and clove canopies with windows rolled down to smell the spice blossoms.",
            },
            {
              time: "11:30 AM",
              title: "Spice Garden Sensory Walk",
              location: "Thekkady Organic Plantation",
              type: "attraction",
              description: "Guided touch-and-smell tour of vanilla vines, cinnamon barks, nutmeg, and allspice trees.",
            },
            {
              time: "01:30 PM",
              title: "Thekkady Traditional Claypot Lunch",
              location: "Kumily Town",
              type: "food",
              description: "Fluffy string hoppers (Idiyappam) with aromatic coconut egg or vegetable curry.",
            },
            {
              time: "03:30 PM",
              title: "Periyar Tiger Reserve Boat Safari",
              location: "Periyar Lake Sanctuary",
              type: "scenic",
              description: "Cruise submerged tree stumps across the lake; look for wild Asian elephant herds, otters, and gaurs drinking at the banks.",
              tips: "Book KTDC boat slot online beforehand to skip gate queues."
            },
            {
              time: "06:30 PM",
              title: "Ancient Kalaripayattu Martial Arts Show",
              location: "Kadathanadan Kalari Centre",
              type: "attraction",
              description: "Watch Kerala's 3,000-year-old warrior martial arts demonstration of agility, swords, and fire acrobatics.",
            }
          ]
        });
      }
    }

    // Day 4
    if (durationDays >= 4) {
      days.push({
        dayNumber: 4,
        title: "Descent to the Emerald Backwaters of Alleppey",
        route: "Thekkady → Kanjirappally → Changanassery → Alappuzha (Alleppey)",
        distanceKm: 135,
        driveTime: "3.5 to 4 hours",
        stayRecommendation: "Traditional Alleppey Backwater Heritage Homestay or Private Houseboat",
        localFoodSpecialty: "Karimeen Pollichathu (Pearl Spot fish marinated in shallot-chili paste baked in banana leaf)",
        drivingAdvice: "NH 183 descent is scenic and broad; enter Kuttanad canal roads with care due to bicycle and pedestrian traffic.",
        segments: [
          {
            time: "08:00 AM",
            title: "Descent Through Rubber & Coffee Country",
            location: "Kottayam - Thekkady Highway",
            type: "drive",
            description: "Descend from 1,000m altitude to sea-level plains across manicured rubber plantations.",
          },
          {
            time: "10:30 AM",
            title: "Traditional Syrian Catholic Bakeries Pause",
            location: "Pala / Kanjirappally",
            type: "food",
            description: "Try famous Kerala fruit cakes, fresh banana chips roasted in pure coconut oil, and cardamom biscuits.",
          },
          {
            time: "01:00 PM",
            title: "Boarding the Backwater Shikara / Houseboat",
            location: "Punnamada Lake / Alleppey Finishing Point",
            type: "attraction",
            description: "Step aboard a traditional wood-and-thatch houseboat cruising through vast Vembanad Lake and palm-fringed canals.",
            tips: "Opt for a smaller country wooden canoe (shikara) to navigate the intimate, quiet side canals where large boats cannot go."
          },
          {
            time: "04:30 PM",
            title: "Kuttanad Below-Sea-Level Polder Drive",
            location: "AC Canal Road (Alappuzha - Changanassery)",
            type: "scenic",
            description: "Drive directly flanked on both sides by gleaming waterways and emerald paddy fields grown 2 meters below sea level.",
          },
          {
            time: "07:30 PM",
            title: "Canalside Seafood Feast",
            location: "Canalside Heritage Tavern",
            type: "food",
            description: "Savor spicy prawn roast (Chemmeen Ularthiyathu), Karimeen pollichathu, and hot appams.",
          }
        ]
      });
    }

    // Day 5
    if (durationDays >= 5) {
      days.push({
        dayNumber: 5,
        title: "Marari Sands & Fort Kochi Colonial Heritage",
        route: "Alleppey → Mararikulam Beach → Coastal Highway NH 66 → Fort Kochi",
        distanceKm: 65,
        driveTime: "2 hours",
        stayRecommendation: "Colonial Boutique Hotel in Fort Kochi / Mattancherry",
        localFoodSpecialty: "Fresh Catch Fish Fry from Chinese Nets & Sulaimani Spiced Tea",
        drivingAdvice: "NH 66 Coastal corridor has multiple pedestrian crossings; maintain a relaxed 50-60 km/h cruising speed.",
        segments: [
          {
            time: "07:00 AM",
            title: "Sunrise at Marari Fisherman Beach",
            location: "Mararikulam Beach",
            type: "scenic",
            description: "Watch traditional wooden catamarans returning with early morning catches along coconut groves.",
          },
          {
            time: "09:30 AM",
            title: "Coastal Breakfast & Tender Coconut Water",
            location: "Marari Village Shacks",
            type: "food",
            description: "Sweet tender coconut directly cut from coastal palms and traditional soft Idlis with spicy tomato chutney.",
          },
          {
            time: "12:30 PM",
            title: "Fort Kochi Colonial Promenade",
            location: "Fort Kochi",
            type: "attraction",
            description: "Walk past the 500-year-old giant Chinese Fishing Nets, St. Francis Church (Vasco da Gama's original burial site), and Dutch mansions.",
          },
          {
            time: "03:30 PM",
            title: "Jew Town & Mattancherry Spice Warehouses",
            location: "Jew Town Road",
            type: "attraction",
            description: "Explore antique shops, hand-painted Paradesi Synagogue tiles, and 400-year-old ginger and pepper drying yards.",
          },
          {
            time: "06:00 PM",
            title: "Sunset Cruise across Arabian Sea Harbour",
            location: "Vasco da Gama Square",
            type: "scenic",
            description: "Sip spiced Sulaimani black tea as container ships and traditional dhows pass against the fiery Arabian sea sunset.",
          }
        ]
      });
    }

    // Day 6 & 7 (Extended)
    if (durationDays >= 6) {
      days.push({
        dayNumber: 6,
        title: "Athirappilly Rainforest Waterfalls & Valparai Ghats",
        route: "Kochi → Chalakudy → Athirappilly Falls → Vazhachal Rainforest",
        distanceKm: 98,
        driveTime: "2.5 to 3 hours",
        stayRecommendation: "Rainforest Resort facing the Waterfalls or Chalakudy Riverside",
        localFoodSpecialty: "Chalakudy River Meen Pollichathu & Kappa Biryani",
        drivingAdvice: "Sholayar forest reserve road is protected; adhere to forest department speed limits and do not feed wild monkeys.",
        segments: [
          {
            time: "08:00 AM",
            title: "Drive to the 'Niagara of India'",
            location: "Chalakudy River Valley",
            type: "drive",
            description: "Drive through dense bamboo and teak forests following the Chalakudy river upstream.",
          },
          {
            time: "10:30 AM",
            title: "Athirappilly Waterfalls Observation Deck",
            location: "Athirappilly Waterfall",
            type: "scenic",
            description: "Stand before the 80-foot wide thundering cataract crashing into the rocky gorge enveloped in cool spray.",
            tips: "Trek the forest trail down to the spray basin for majestic perspective."
          },
          {
            time: "01:30 PM",
            title: "Jungle Riverside Lunch",
            location: "Athirappilly Rainforest Cafe",
            type: "food",
            description: "Traditional Kerala Sadhya with crispy banana chips, avial, sambar, and payasam.",
          },
          {
            time: "03:30 PM",
            title: "Vazhachal & Charpa Cascades Drive",
            location: "Vazhachal Forest Range",
            type: "scenic",
            description: "Gentle rapids and rare Great Indian Hornbill birding territory in the Western Ghats bio-reserve.",
          }
        ]
      });
    }

    if (durationDays >= 7) {
      days.push({
        dayNumber: 7,
        title: "Grand Finale: Spice Souvenirs & Airport Farewell",
        route: "Athirappilly → Kalady → Kochi International Airport (COK)",
        distanceKm: 55,
        driveTime: "1.5 hours",
        stayRecommendation: "Trip Completion / Airport Transit",
        localFoodSpecialty: "Kalady Famous Malabar Ghee Rice & Coconut Cashew Halwa",
        drivingAdvice: "Easy drive back to NH 544 and direct access to Nedumbassery airport terminal.",
        segments: [
          {
            time: "09:00 AM",
            title: "Leisurely Morning by Riverbanks",
            location: "Periyar River Valley",
            type: "scenic",
            description: "Final peaceful morning listening to forest birds and river flows.",
          },
          {
            time: "11:30 AM",
            title: "Final Kerala Spice & Tea Shopping",
            location: "Angamaly / Kochi Outskirts",
            type: "attraction",
            description: "Stock up on export grade Tellicherry black pepper, cardamom pods, and organic coconut oil.",
          },
          {
            time: "02:00 PM",
            title: "Farewell Feast & Homeward Journey",
            location: "Kochi Gateway",
            type: "food",
            description: "Wrap up the ultimate Kerala road adventure with fond memories and your saved digital log.",
          }
        ]
      });
    }
  } 
  // Branch 2: Coastal / South Kerala (Trivandrum / Varkala)
  else if (startCity === "Trivandrum" || theme === "coastal") {
    tripTitle = durationDays <= 3 ? "South Kerala Cliffs & Backwater Sprint" : "The Sun, Surf & Red Cliffs Odyssey";
    tagline = "Varkala red sandstone ocean cliffs, Munroe island canals & Kovalam crescent shores";
    summary = `A stunning coastal journey curated for ${travelGroup} covering South Kerala's world-famous cliff sunsets, serene estuary waterways, and the world's largest bird sculpture.`;
    hairpinCount = 12;
    highlights = [
      "Varkala red sandstone cliff promenade & Tibetan cafes",
      "Munroe Island quiet canal canoe safari",
      "Jatayu Earth's Centre (World's largest 200ft bird sculpture)",
      "Kovalam lighthouse beach sunset view",
      "Freshly grilled kingfish and Malabar coastal curry"
    ];

    days.push({
      dayNumber: 1,
      title: "Cliffs of Varkala & Sunset Promenade",
      route: `${startCity} → Attingal → Varkala North Cliff`,
      distanceKm: 52,
      driveTime: "1.5 hours",
      stayRecommendation: "Cliffside Boutique Villa at Varkala North Cliff",
      localFoodSpecialty: "Fresh Lemon Garlic Butter Tiger Prawns & Shakshuka Cafe Breakfast",
      drivingAdvice: "Coastal road SH 46 is scenic. Park in designated beach parking lots near the cliff helipad.",
      segments: [
        {
          time: "09:00 AM",
          title: "Departure from Trivandrum",
          location: startCity,
          type: "drive",
          description: "Head north past coconut lagoons on the coastal highway towards Varkala.",
        },
        {
          time: "11:00 AM",
          title: "Varkala North Cliff Check-in",
          location: "Varkala North Cliff",
          type: "attraction",
          description: "Walk the cliff edge directly overlooking crashing Arabian sea breakers below.",
        },
        {
          time: "01:00 PM",
          title: "Cliff Cafe Lunch",
          location: "Cafe del Mar / Darjeeling Cafe",
          type: "food",
          description: "Seafood specials, Italian stone oven pizzas, and iced mint tea with a panoramic ocean view.",
        },
        {
          time: "04:30 PM",
          title: "Papanasam Holy Beach & Black Sand Bay",
          location: "Papanasam Beach",
          type: "scenic",
          description: "Descend the stone stairs to the sacred natural mineral spring and swim in safe bay waves.",
        },
        {
          time: "06:30 PM",
          title: "Varkala Fiery Golden Sunset",
          location: "North Cliff Lookout",
          type: "scenic",
          description: "Watch the sun sink into the Arabian sea as cliff lanterns light up with chill acoustic tunes.",
        }
      ]
    });

    days.push({
      dayNumber: 2,
      title: "Jatayu's Colossus & Munroe Island Canals",
      route: "Varkala → Chadayamangalam (Jatayu) → Munroe Island → Kollam",
      distanceKm: 88,
      driveTime: "2.5 hours",
      stayRecommendation: "Munroe Island Waterway Cottages",
      localFoodSpecialty: "Kollam Cashew Roasted Chicken & Country Prawn Roast",
      drivingAdvice: "Main Central Road (SH 1) has smooth dual lanes; take the scenic ferry across to Munroe Island.",
      segments: [
        {
          time: "08:30 AM",
          title: "Drive to Jatayu Earth's Centre",
          location: "Chadayamangalam",
          type: "drive",
          description: "Scenic countryside drive inland towards the mammoth granite rock sculpture.",
        },
        {
          time: "10:00 AM",
          title: "Cable Car Ride to World's Largest Bird Sculpture",
          location: "Jatayu Rock",
          type: "attraction",
          description: "Cable car ascent to the 200-foot mythical eagle sculpture perched atop 1,000ft granite crags.",
          tips: "Wear sunglasses and walking shoes; the granite top has minimal shade."
        },
        {
          time: "01:30 PM",
          title: "Authentic Kollam Sadhya Lunch",
          location: "Kollam Town",
          type: "food",
          description: "Traditional feast highlighting world-renowned Kollam cashew nuts and red matta rice.",
        },
        {
          time: "04:00 PM",
          title: "Munroe Island Narrow Canal Canoe Tour",
          location: "Munroe Island",
          type: "scenic",
          description: "Glide beneath low hanging coconut trees, mangrove arches, and village lotus ponds on a quiet pole-punted canoe.",
        }
      ]
    });

    if (durationDays >= 3) {
      days.push({
        dayNumber: 3,
        title: "Kovalam Lighthouse Beach & Padmanabhaswamy Grandeur",
        route: "Munroe Island → Kollam Coastal Highway → Trivandrum / Kovalam",
        distanceKm: 94,
        driveTime: "2.5 hours",
        stayRecommendation: "Kovalam Beachfront Resort",
        localFoodSpecialty: "Trivandrum Neyyattinkara Mutton Fry with Porotta & Boli with Payasam",
        drivingAdvice: "NH 66 coastal corridor connects Kollam and Trivandrum with breezy seaside straights.",
        segments: [
          {
            time: "08:00 AM",
            title: "Morning Island Stroll",
            location: "Munroe Island",
            type: "scenic",
            description: "Watch local coir yarn spinners and duck farmers at work on calm waters.",
          },
          {
            time: "11:30 AM",
            title: "Historic Padmanabhaswamy Temple Corridor",
            location: "Thiruvananthapuram City",
            type: "attraction",
            description: "Marvel at the towering Dravidian gopuram and royal Travancore palaces.",
          },
          {
            time: "01:30 PM",
            title: "Famous Boli & Payasam Tasting",
            location: "East Fort Heritage Stalls",
            type: "food",
            description: "Trivandrum's sweetest treat: golden yellow lentil Boli dipped in hot creamy Ada Pradhaman payasam.",
          },
          {
            time: "04:30 PM",
            title: "Climb Kovalam Red-and-White Lighthouse",
            location: "Kovalam Lighthouse Beach",
            type: "scenic",
            description: "Spiral to the 118ft lighthouse summit for an unobstructed 360° vantage over crescent sand bays and rolling ocean swells.",
          }
        ]
      });
    }

    if (durationDays >= 4) {
      days.push({
        dayNumber: 4,
        title: "Ponmudi Golden Valley & 22 Hairpin Skyway",
        route: "Trivandrum → Nedumangad → Kallar River → Ponmudi Peak",
        distanceKm: 62,
        driveTime: "2 hours",
        stayRecommendation: "Ponmudi Mountain Resort or Return to Trivandrum",
        localFoodSpecialty: "Nedumangad Chicken Varutharacha Curry with Appam",
        drivingAdvice: "Ponmudi has 22 tight hairpins; blow horn on blind bends and maintain low gear.",
        segments: [
          {
            time: "08:00 AM",
            title: "Climb through Western Ghats Cloud Foothills",
            location: "Kallar River Valley",
            type: "drive",
            description: "Drive through bamboo grooves and crystal-clear mountain streams of Golden Valley.",
          },
          {
            time: "11:00 AM",
            title: "Ponmudi High Peak Ridge Walk",
            location: "Ponmudi Hill Top (1,100m)",
            type: "scenic",
            description: "Walk the windy grassy ridgeline shrouded in sweeping sea-breeze clouds.",
          },
          {
            time: "02:00 PM",
            title: "Mountain Rest Stop & Fresh Chai",
            location: "KTDC Hill View",
            type: "food",
            description: "Hot tea and freshly fried banana fritters looking out over deep valley slopes.",
          },
          {
            time: "05:00 PM",
            title: "Descent & Sunset Departure",
            location: `${startCity}`,
            type: "drive",
            description: "Smooth return concluding your southern Kerala odyssey.",
          }
        ]
      });
    }
  } 
  // Branch 3: North Malabar / Wayanad / Kannur
  else {
    tripTitle = durationDays <= 3 ? "Wayanad Clouds & Malabar Spice Trail" : "The Grand North Malabar Expedition";
    tagline = "Wayanad 9 hairpin pass, Asia's drive-in beach, and historic Kozhikode food streets";
    summary = `Curated for ${travelGroup} navigating ${startCity} into the mist-clad heights of Wayanad, spice plantations, and the hard-packed surf of Muzhappilangad Drive-in Beach.`;
    hairpinCount = 20;
    highlights = [
      "Thamarassery Churam 9 Hairpin mountain bends",
      "Banasura Sagar Dam island speedboating",
      "Muzhappilangad 4km beach drive directly into ocean waves",
      "Legendary Kozhikode Paragon Dum Biryani & Black Halwa",
      "Bekal Fort 300-year-old keyhole ocean ramparts"
    ];

    days.push({
      dayNumber: 1,
      title: "Thamarassery Churam 9 Hairpins & Wayanad Rainforest",
      route: `${startCity} → Thamarassery → Lakkidi Pass → Vythiri → Kalpetta`,
      distanceKm: 75,
      driveTime: "2.5 hours",
      stayRecommendation: "Rainforest Eco Treehouse / Coffee Estate in Vythiri",
      localFoodSpecialty: "Kozhikode Dum Biryani & Steamed Sulaimani with Mint",
      drivingAdvice: "Thamarassery Churam has 9 steep hairpin loops; give way to climbing heavy vehicles on corners.",
      segments: [
        {
          time: "08:00 AM",
          title: `Departing ${startCity}`,
          location: startCity,
          type: "drive",
          description: "Head inland towards the colossal mountain wall of the Western Ghats on NH 766.",
        },
        {
          time: "10:30 AM",
          title: "Tackling the 9 Hairpin Bends of Thamarassery Churam",
          location: "Lakkidi Viewpoint",
          type: "scenic",
          description: "Ascend 2,300ft through scenic forest hairpins; pause at Lakkidi for sweeping views of the plains below.",
          tips: "Watch out for mischievous road monkeys at the summit viewpoint; keep car windows rolled up."
        },
        {
          time: "01:00 PM",
          title: "Wayanadan Claypot Pepper Chicken Lunch",
          location: "Kalpetta Town",
          type: "food",
          description: "Aromatic Malabar parottas with authentic Wayanad black pepper chicken.",
        },
        {
          time: "03:30 PM",
          title: "Pookode Natural Freshwater Lake",
          location: "Vythiri",
          type: "attraction",
          description: "Pedal-boat across the lotus-filled evergreen lake surrounded by untouched forest canopies.",
        }
      ]
    });

    days.push({
      dayNumber: 2,
      title: "Banasura Sagar Dam & Edakkal Stone Age Caves",
      route: "Kalpetta → Banasura Sagar Dam → Sultan Bathery → Edakkal Caves",
      distanceKm: 85,
      driveTime: "2.5 hours",
      stayRecommendation: "Lakeside Glamping / Heritage Homestay in Sultan Bathery",
      localFoodSpecialty: "Bamboo Rice Payasam & Wayanadan Kanthari Fish Curry",
      drivingAdvice: "Winding village roads; watch for occasional forest road deer crossings in early morning/dusk.",
      segments: [
        {
          time: "08:30 AM",
          title: "Drive to India's Largest Earthen Dam",
          location: "Banasura Sagar Dam",
          type: "drive",
          description: "Picturesque drive along rural Wayanad paddy and coffee valleys.",
        },
        {
          time: "09:30 AM",
          title: "Speedboating Across Banasura Floating Islands",
          location: "Banasura Dam Reservoir",
          type: "attraction",
          description: "Zoom through crystal waters between submerged hill islands against the mighty Banasura peak.",
        },
        {
          time: "01:00 PM",
          title: "Traditional Malabar Farm Feast",
          location: "Padinjarathara Country Kitchen",
          type: "food",
          description: "Nutritious Bamboo rice cooked with sweet coconut milk and jaggery.",
        },
        {
          time: "03:30 PM",
          title: "Edakkal Caves Prehistoric Petroglyph Trek",
          location: "Ambikuthi Mala",
          type: "attraction",
          description: "Hike up the rocky trail to observe 7,000-year-old Neolithic carvings engraved into cavern granite.",
        }
      ]
    });

    if (durationDays >= 3) {
      days.push({
        dayNumber: 3,
        title: "Asia's Longest Drive-in Beach at Muzhappilangad",
        route: "Wayanad → Mananthavady → Kannur Coastal Highway → Muzhappilangad Beach",
        distanceKm: 110,
        driveTime: "3.5 hours",
        stayRecommendation: "Beachfront Chalet in Kannur / Bekal",
        localFoodSpecialty: "Thalassery Dum Biryani with Dates Pickle & Stuffed Mussels (Kallummakkaya Nirachathu)",
        drivingAdvice: "Drive on hard-packed sand within the wet tide zone; avoid soft dry sand near the coconut trees to prevent wheel spin.",
        segments: [
          {
            time: "08:00 AM",
            title: "Descent from Wayanad Mountains to North Malabar Coast",
            location: "Koothuparamba Highway",
            type: "drive",
            description: "Descend from cloud forests into the historic coastal kingdom of the Kolathiri Rajas.",
          },
          {
            time: "12:30 PM",
            title: "The Ultimate Thalassery Biryani Experience",
            location: "Paris Restaurant / Rara Avis, Thalassery",
            type: "food",
            description: "World-famous fragrant small-grain Kaima rice cooked with tender mutton, fried onions, and cashew nuts.",
          },
          {
            time: "03:30 PM",
            title: "Drive Your Car Directly on Muzhappilangad Beach",
            location: "Muzhappilangad Beach",
            type: "drive",
            description: "Cruise 4 full kilometers directly against roaring Arabian ocean surf on Asia's premier drive-in beach.",
            tips: "Wash the vehicle undercarriage with fresh water at a nearby wash station afterwards to remove sea salt."
          },
          {
            time: "06:00 PM",
            title: "Sunset over Dharmadam Island",
            location: "Dharmadam Point",
            type: "scenic",
            description: "Golden rays illuminating the private island accessible by foot during low tides.",
          }
        ]
      });
    }

    if (durationDays >= 4) {
      days.push({
        dayNumber: 4,
        title: "The Colossal Sea Ramparts of Bekal Fort",
        route: "Kannur → Kasaragod Coastal Highway → Bekal Fort",
        distanceKm: 85,
        driveTime: "2.5 hours",
        stayRecommendation: "Bekal Luxury Beach Resort or Homeward Departure",
        localFoodSpecialty: "Kasaragod Coin Parottas with Spiced Mutton Curry",
        drivingAdvice: "Smooth NH 66 driving along northern coastline estuaries.",
        segments: [
          {
            time: "08:30 AM",
            title: "Coastal Drive through Northern Estuaries",
            location: "NH 66 North",
            type: "drive",
            description: "Breezy drive crossing bridges over Nileshwaram and Chandragiri backwater lagoons.",
          },
          {
            time: "11:00 AM",
            title: "Explore 300-Year-Old Keyhole Bekal Fort",
            location: "Bekal Fort",
            type: "attraction",
            description: "Walk the massive laterite ramparts rising directly out of crashing ocean waves.",
          },
          {
            time: "02:00 PM",
            title: "Kasaragod Coastal Lunch",
            location: "Bekal Beach Haven",
            type: "food",
            description: "Crispy coin parottas with spicy coconut mutton gravy.",
          },
          {
            time: "05:00 PM",
            title: "Observation Tower Sunset & Roadtrip Wrap-up",
            location: "Bekal Observation Tower",
            type: "scenic",
            description: "Take in the grand 360-degree vista of sea, palms, and ramparts concluding your expedition.",
          }
        ]
      });
    }
  }

  // Calculate totals
  const totalKm = days.reduce((acc, d) => acc + d.distanceKm, 0);
  const totalDriveHours = `${(totalKm / 40).toFixed(1)} hrs total`;
  const { estimatedFuel, estimatedStay, estimatedFood } = calculateBudget(
    durationDays,
    travelGroup,
    vehicle,
    totalKm
  );

  return {
    id: `trip-${Date.now()}`,
    tripTitle,
    tagline,
    summary,
    totalDistanceKm: totalKm,
    totalDrivingHours: totalDriveHours,
    recommendedVehicle: vehicle === "suv" ? "Compact SUV / 4x4 (High Ground Clearance)" : vehicle === "ev" ? "Electric Vehicle (Fast DC Charging Accessible)" : vehicle === "bike" ? "Touring Cruiser Motorcycle" : "Hatchback / Sedan",
    estimatedFuelCost: estimatedFuel,
    estimatedStayBudget: estimatedStay,
    estimatedFoodBudget: estimatedFood,
    bestTimeToDrive: "October to April (Crisp mountain air & calm seas)",
    routeHighlights: highlights,
    hairpinCount,
    evChargingAdvice: evAdvice,
    packingTips: [
      "Light jacket/fleece for mountain altitudes (12°C - 16°C in Munnar/Wayanad)",
      "Motion sickness tablets for winding ghat bends",
      "Fastag auto-recharge and downloaded offline Google Maps",
      "Umbrella & waterproof pouch (monsoon or misty showers)",
      "Vehicle check: tire pressure, brake fluid, windshield washer water"
    ],
    days
  };
}

// Quick Starter Prompts for AI Chat
export const QUICK_AI_PROMPTS = [
  {
    label: "⛰️ 3-Day Munnar Ghats & Tea Trail",
    prompt: "Plan a 3-day road trip from Kochi to Munnar focusing on tea plantations, hairpin bends, waterfalls, and local food."
  },
  {
    label: "🛶 4-Day Backwaters & Varkala Cliffs",
    prompt: "I want a 4-day road trip from Kochi covering Alleppey houseboats, Kuttanad canal drive, and Varkala cliff sunsets."
  },
  {
    label: "🚗 3-Day North Kerala Drive-in Beach",
    prompt: "Create a 3-day itinerary from Kozhikode to Wayanad and Kannur Muzhappilangad drive-in beach with authentic Thalassery biryani stops."
  },
  {
    label: "⚡ 5-Day EV-Friendly All Kerala Tour",
    prompt: "Plan a 5-day road trip suitable for an Electric Vehicle with verified charging points covering mountains and backwaters."
  },
  {
    label: "🏍️ Thrilling 40 Hairpin Ghats Bike Circuit",
    prompt: "Design a high-thrill motorcycle road trip through Munnar Gap Road, Athirappilly waterfalls, and Valparai ghats."
  }
];

