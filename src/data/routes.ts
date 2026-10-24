export interface Stop {
  id: string;
  name: string;
  day: number;
  region: string;
  district?: string;
  landmark?: string;
  distanceFromPrev: number; // in km
  drivingTime: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  description: string;
  highlights: string[];
  mustTryFood: string[];
  scenicSpot: string;
  drivingTip: string;
  image: string;
  activity: string;
}

export interface DistrictLandmark {
  district: string;
  landmark: string;
  tagline: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  image: string;
  mustTryFood: string;
  highlight: string;
  routeSlug: string;
  bestTime: string;
}

export const KERALA_14_DISTRICTS: DistrictLandmark[] = [
  {
    district: "Kasaragod",
    landmark: "Bekal Fort & Coastal Ramparts",
    tagline: "Gigantic 300-year-old keyhole-shaped sea fort rising over the Arabian waves.",
    coordinates: { lat: 12.3926, lng: 75.0326 },
    image: "/images/places/bekal-fort.jpg",
    mustTryFood: "Kasaragod Mutton Curry with Coin Parottas",
    highlight: "Climbing the seaside observation tower with 360° ocean and beach views.",
    routeSlug: "grand-14-districts-kerala-odyssey",
    bestTime: "October to March"
  },
  {
    district: "Kannur",
    landmark: "Muzhappilangad Drive-in Beach",
    tagline: "Asia's longest drive-in beach stretching across 4 kilometers of golden hard-packed sand.",
    coordinates: { lat: 11.7947, lng: 75.4529 },
    image: "/images/places/muzhappilangad-drive-in-beach.jpg",
    mustTryFood: "Thalassery Biryani & Stuffed Mussels (Kallummakkaya Nirachathu)",
    highlight: "Cruising your own car or motorcycle directly against roaring ocean surf.",
    routeSlug: "grand-14-districts-kerala-odyssey",
    bestTime: "September to April"
  },
  {
    district: "Wayanad",
    landmark: "Banasura Sagar Dam & Lakkidi Viewpoint",
    tagline: "India's largest earthen dam and misty Western Ghats mountain coils.",
    coordinates: { lat: 11.6698, lng: 75.9575 },
    image: "/images/places/wayanad-banasura-dam.jpg",
    mustTryFood: "Bamboo Rice Payasam & Wayanadan Pepper Chicken",
    highlight: "Speedboating between floating islands and negotiating 9 hairpin coils.",
    routeSlug: "grand-14-districts-kerala-odyssey",
    bestTime: "October to May"
  },
  {
    district: "Kozhikode",
    landmark: "Kozhikode Beach & S.M. Street (Mittai Theruvu)",
    tagline: "Historic spice port of Vasco da Gama, celebrated UNESCO City of Literature and culinary haven.",
    coordinates: { lat: 11.2588, lng: 75.7804 },
    image: "/images/places/kozhikode-beach-pier.jpg",
    mustTryFood: "Authentic Kozhikodan Dum Biryani & Famous Black Halwa",
    highlight: "Strolling the 150-year-old collapsed sea piers at sunset and sweets bazaar tasting.",
    routeSlug: "grand-14-districts-kerala-odyssey",
    bestTime: "October to March"
  },
  {
    district: "Malappuram",
    landmark: "Nilambur Teak Museum & Conolly's Plot",
    tagline: "The world's oldest teak plantation and unique bio-heritage forest reserve.",
    coordinates: { lat: 11.2750, lng: 76.2260 },
    image: "/images/places/nilambur-teak-bridge.jpg",
    mustTryFood: "Malappuram Erachi Choru & Unnakaya banana sweet",
    highlight: "Crossing the suspension bridge over Chaliyar river to touch 180-year-old giant teak trees.",
    routeSlug: "grand-14-districts-kerala-odyssey",
    bestTime: "September to March"
  },
  {
    district: "Palakkad",
    landmark: "Palakkad Fort (Tipu's Fort) & Malampuzha Dam",
    tagline: "Best-preserved 18th-century granite moat fortress and lush mountain reservoir gardens.",
    coordinates: { lat: 10.7667, lng: 76.6547 },
    image: "/images/places/palakkad-fort.jpg",
    mustTryFood: "Ramassery Idli with Podi & Palakkadan Matta Sadhya",
    highlight: "Walking the granite ramparts and taking the Malampuzha passenger ropeway.",
    routeSlug: "grand-14-districts-kerala-odyssey",
    bestTime: "October to February"
  },
  {
    district: "Thrissur",
    landmark: "Athirappilly Waterfalls",
    tagline: "The 80-ft roaring cascade famously heralded as 'The Niagara of India'.",
    coordinates: { lat: 10.2851, lng: 76.5698 },
    image: "/images/places/athirappilly-waterfalls.jpg",
    mustTryFood: "Thrissur Vellayappam with spicy meat roast",
    highlight: "Hiking down through rainforest bamboo groves to stand in the waterfall mist.",
    routeSlug: "mist-and-tea-trail",
    bestTime: "June to January"
  },
  {
    district: "Ernakulam",
    landmark: "Fort Kochi & Chinese Fishing Nets",
    tagline: "Centuries-old maritime trading capital where Portuguese, Dutch, and Arab histories converge.",
    coordinates: { lat: 9.9656, lng: 76.2421 },
    image: "/images/places/fort-kochi-nets.jpg",
    mustTryFood: "Karimeen Pollichathu & Fort Kochi Spiced Sulaimani",
    highlight: "Watching traditional cantilevered Chinese nets dip into harbor waters at sunset.",
    routeSlug: "classic-backwaters-and-cliffs",
    bestTime: "All Year"
  },
  {
    district: "Idukki",
    landmark: "Idukki Arch Dam & Munnar Tea Hills",
    tagline: "Asia's highest 555-ft parabolic arch dam and 1,800m cloud-kissed mountain tea estates.",
    coordinates: { lat: 9.8519, lng: 76.9744 },
    image: "/images/places/idukki-arch-dam.jpg",
    mustTryFood: "Highland Cardamom Tea & Idukki Spiced Beef/Mushroom Fry",
    highlight: "Looking straight down 555 feet from the arch dam and conquering 40 hairpin curves.",
    routeSlug: "idukki-wild-and-arch-dam-odyssey",
    bestTime: "August to May"
  },
  {
    district: "Kottayam",
    landmark: "Kumarakom Bird Sanctuary & Vembanad Lake",
    tagline: "World-renowned wetland archipelago on India's longest freshwater lake.",
    coordinates: { lat: 9.6175, lng: 76.4301 },
    image: "/images/places/kumarakom-backwaters.jpg",
    mustTryFood: "Kottayam Duck Roast & Meen Vevichathu (Fiery clay-pot fish curry)",
    highlight: "Sunrise canoe paddling through labyrinthine canals as migratory birds take flight.",
    routeSlug: "kuttanad-waterways-and-kumarakom",
    bestTime: "November to March"
  },
  {
    district: "Alappuzha",
    landmark: "Alleppey Backwaters & Kuttanad Polders",
    tagline: "The Venice of the East with houseboats gliding over below-sea-level paddy waterlands.",
    coordinates: { lat: 9.4981, lng: 76.3388 },
    image: "/images/places/alleppey-houseboat.jpg",
    mustTryFood: "Pearl Spot Fish (Karimeen) Fry & Kuttanad Chatti Choru",
    highlight: "Sailing aboard a thatched wooden houseboat on Punnamada Lake.",
    routeSlug: "classic-backwaters-and-cliffs",
    bestTime: "October to March"
  },
  {
    district: "Pathanamthitta",
    landmark: "Gavi Rainforest & Konni Elephant Reserve",
    tagline: "Pristine tropical evergreen corridor in Periyar tiger reserve and historic elephant kraal.",
    coordinates: { lat: 9.4390, lng: 77.1650 },
    image: "/images/places/gavi-rainforest.jpg",
    mustTryFood: "Traditional Pathanamthitta Appam with Vegetable & Chicken Stew",
    highlight: "Spotting wild elephants, Nilgiri Tahr, and hornbills along remote jungle tracks.",
    routeSlug: "grand-14-districts-kerala-odyssey",
    bestTime: "September to April"
  },
  {
    district: "Kollam",
    landmark: "Jatayu Earth's Center & Munroe Island",
    tagline: "The world's largest bird sculpture (200 ft) atop a 1,000-ft rock hill and 8-island canal maze.",
    coordinates: { lat: 8.8637, lng: 76.8687 },
    image: "/images/places/munroe-island-canals.jpg",
    mustTryFood: "Kollam Roasted Cashews & Ashtamudi Crab Curry",
    highlight: "Riding the cable car up to the massive mythical sculpture and silent canal canoe tour.",
    routeSlug: "ponmudi-and-thenmala-eco-trail",
    bestTime: "October to March"
  },
  {
    district: "Thiruvananthapuram",
    landmark: "Sree Padmanabhaswamy Temple & Kovalam",
    tagline: "World's richest temple architectural wonder and crescent lighthouse beaches.",
    coordinates: { lat: 8.4828, lng: 76.9436 },
    image: "https://images.unsplash.com/photo-1586030138336-4a854c6ddb5f?auto=format&fit=crop&w=1000&q=80",
    mustTryFood: "Trivandrum Sweet Boli with warm Palada Payasam",
    highlight: "Marveling at the 16th-century Gopuram and climbing Kovalam's red-and-white lighthouse.",
    routeSlug: "ponmudi-and-thenmala-eco-trail",
    bestTime: "October to March"
  }
];

export interface Route {
  slug: string;
  title: string;
  subtitle: string;
  tagline: string;
  durationDays: number;
  distanceKm: number;
  difficulty: "Easy" | "Moderate" | "Challenging";
  bestSeason: string;
  startPoint: string;
  endPoint: string;
  heroImage: string;
  description: string;
  overview: string;
  highlights: string[];
  roadConditions: string;
  recommendedVehicle: string;
  elevationGain: string;
  tags: string[];
  stops: Stop[];
  packingEssentials: string[];
}

export const KERALA_ROUTES: Route[] = [
  {
    slug: "mist-and-tea-trail",
    title: "The Mist & Tea Trail",
    subtitle: "Western Ghats Mountain Skyway",
    tagline: "Hairpin bends, emerald tea carpeted peaks, cascading waterfalls, and spice valleys.",
    durationDays: 5,
    distanceKm: 510,
    difficulty: "Moderate",
    bestSeason: "September to March",
    startPoint: "Kochi",
    endPoint: "Kochi",
    heroImage: "https://images.unsplash.com/photo-1491497895121-1334fc14d8c9?auto=format&fit=crop&w=1600&q=80",
    description: "An exhilarating alpine adventure climbing from the Arabian sea coast up into the clouds of Munnar, traversing 40 famed hairpin turns, cloud-kissed spice plantations of Thekkady, and the pine forests of Vagamon.",
    overview: "This iconic circuit is Kerala's favorite highland road trip. You will leave the humid plains of Kochi, stop by the roaring Athirappilly Waterfalls (India's Niagara), negotiate scenic hairpin curves, wake up to crisp 14°C mountain air in Munnar, spot elephants in Periyar, and drive through emerald tea hills.",
    highlights: [
      "Roaring Athirappilly Waterfalls",
      "Endless green horizons of Kolukkumalai & Mattupetty",
      "Periyar Wildlife Sanctuary boat safari",
      "Pine forest walks & offroad trails in Vagamon",
      "Authentic Kerala spiced tea & freshly roasted cardamoms"
    ],
    roadConditions: "Well-paved state highways with scenic twists; narrow ghat roads near Munnar requiring alert cornering.",
    recommendedVehicle: "Hatchback, Compact SUV, or Cruiser Motorcycle with good low-end torque.",
    elevationGain: "Sea level (0m) to Top Station (1,880m)",
    tags: ["Mountains", "Tea Estates", "Waterfalls", "Hairpin Bends"],
    packingEssentials: [
      "Light jacket & fleece for cool Munnar evenings (12°C - 18°C)",
      "Fog lights check & rain gear",
      "Motion sickness tablets for winding ghat bends",
      "Good hiking shoes for tea garden walks",
      "Fastag & offline GPS maps"
    ],
    stops: [
      {
        id: "kochi",
        name: "Kochi (Cochin)",
        day: 1,
        region: "Ernakulam Coast",
        distanceFromPrev: 0,
        drivingTime: "Start",
        coordinates: { lat: 9.9312, lng: 76.2673 },
        description: "The historic port city where Chinese fishing nets, colonial Portuguese bungalows, and aromatic spice warehouses meet the sea.",
        highlights: ["Fort Kochi Heritage Walk", "Jew Town & Mattancherry Palace", "Sunset at Princess Street"],
        mustTryFood: ["Kerala Porotta with Beef/Mushroom Roast", "Sulaimani with Banana Fritters (Pazham Pori)"],
        scenicSpot: "Fort Kochi promenade overlooking cargo ships and Chinese nets.",
        drivingTip: "Beat morning container traffic by hitting NH 544 before 7:30 AM.",
        image: "/images/places/fort-kochi-nets.jpg",
        activity: "Heritage café hopping & spice bazaar stroll"
      },
      {
        id: "athirappilly",
        name: "Athirappilly Waterfalls",
        day: 1,
        region: "Chalakudy River Basin",
        distanceFromPrev: 75,
        drivingTime: "1h 45m",
        coordinates: { lat: 10.3168, lng: 76.5499 },
        description: "An 80-foot majestic curtain of roaring white water cutting through dense Sholayar rainforests, famously showcased in Mani Ratnam's films.",
        highlights: ["Trek to the bottom pool", "Vazhachal Rapids downstream", "Hornbill sightings in the canopy"],
        mustTryFood: ["Fresh river fish curry with hot red boiled rice (Matta) at riverside dhabas"],
        scenicSpot: "The bamboo-railed overlook right as the Chalakudy river plummets into the gorge.",
        drivingTip: "Drive carefully through the jungle stretch; forest monkeys often gather on road edges.",
        image: "/images/places/athirappilly-waterfalls.jpg",
        activity: "Nature photography and forest bathing"
      },
      {
        id: "munnar",
        name: "Munnar Highlands",
        day: 2,
        region: "Idukki District",
        distanceFromPrev: 130,
        drivingTime: "3h 45m",
        coordinates: { lat: 10.0889, lng: 77.0595 },
        description: "Sprawling tea gardens blanketing steep emerald slopes, crisp cool mountain breezes, and misty valleys nestled at 1,600m above sea level.",
        highlights: ["Kolukkumalai Sunrise (World's highest organic tea estate)", "Mattupetty Dam & Eco Point", "Eravikulam National Park (Nilgiri Tahr)"],
        mustTryFood: ["Steaming Ela Ada (sweet rice parcels)", "Kerala Appam with Spiced Vegetable/Chicken Stew"],
        scenicSpot: "Lockhart Gap viewpoint looking down into misty valleys covered in tea bushes.",
        drivingTip: "Stay in 2nd/3rd gear on the downhill slopes to avoid overheating brake pads.",
        image: "https://images.unsplash.com/photo-1491497895121-1334fc14d8c9?auto=format&fit=crop&w=1000&q=80",
        activity: "Tea tasting & factory tour"
      },
      {
        id: "thekkady",
        name: "Thekkady (Periyar)",
        day: 3,
        region: "Cardamom Hills",
        distanceFromPrev: 85,
        drivingTime: "2h 30m",
        coordinates: { lat: 9.6031, lng: 77.1615 },
        description: "The aromatic heart of India's spice country, bordering the Periyar Tiger Reserve lake where wild elephants come down to bathe.",
        highlights: ["Periyar Lake bamboo rafting or motorboat cruise", "Cardamom & pepper plantation guided walk", "Kalaripayattu martial art performance"],
        mustTryFood: ["Fresh cardamom spiced black coffee", "Kerala Sadya served on a clean banana leaf"],
        scenicSpot: "Boat jetty overlook watching sambar deer on the lake islands.",
        drivingTip: "The Anakkara-Kumily stretch has sharp curves; honk politely at blind bends.",
        image: "https://images.unsplash.com/photo-1669474643308-bd08062d8ca6?auto=format&fit=crop&w=1000&q=80",
        activity: "Spice garden tour & night forest watch"
      },
      {
        id: "vagamon",
        name: "Vagamon Meadows",
        day: 4,
        region: "Kottayam-Idukki Border",
        distanceFromPrev: 45,
        drivingTime: "1h 30m",
        coordinates: { lat: 9.6897, lng: 76.9056 },
        description: "A tranquil highland haven known for velvety rolling green meadows, mist-shrouded pine forests, and cool mountain lakes.",
        highlights: ["Vagamon Pine Forest walk", "Kurisumala Ashram ridge view", "Suicide Point & Kurisumala misty hills"],
        mustTryFood: ["Hot tapioca (Kappa) with spicy crushed shallot-chilli chammanthi"],
        scenicSpot: "The sweeping velvet green knolls at Vagamon Pine valley.",
        drivingTip: "Afternoon fog can descend rapidly; ensure hazard and fog lights are functioning.",
        image: "https://images.unsplash.com/photo-1511497584788-87676104235f?auto=format&fit=crop&w=1000&q=80",
        activity: "Paragliding over the tea valleys"
      },
      {
        id: "kochi-return",
        name: "Return via Pala & Thodupuzha to Kochi",
        day: 5,
        region: "Central Kerala",
        distanceFromPrev: 105,
        drivingTime: "3h 00m",
        coordinates: { lat: 9.9312, lng: 76.2673 },
        description: "A relaxed descent through lush rubber plantations, rustic country bridges, and spice towns leading back to the coast.",
        highlights: ["Pala rubber estates", "Historic churches of Kottayam", "Sunset cruise in Kochi harbour"],
        mustTryFood: ["Karimeen (Pearl Spot) Fry with cold tender coconut water"],
        scenicSpot: "River crossing over Muvattupuzha river at twilight.",
        drivingTip: "Fill up fuel at reputable BPCL/IOC stations along the SH 8 expressway.",
        image: "/images/places/fort-kochi-nets.jpg",
        activity: "Souvenir shopping for pure spices & cashew nuts"
      }
    ]
  },
  {
    slug: "classic-backwaters-and-cliffs",
    title: "Arabian Sea & Backwaters Coastal Trail",
    subtitle: "Sun-drenched Cliffs, Palms & Houseboats",
    tagline: "Drive along the whispering Arabian coastline from historic Fort Kochi to dramatic red laterite cliffs of Varkala.",
    durationDays: 4,
    distanceKm: 290,
    difficulty: "Easy",
    bestSeason: "October to April",
    startPoint: "Kochi",
    endPoint: "Kovalam / Trivandrum",
    heroImage: "/images/places/alleppey-houseboat.jpg",
    description: "Cruise along palm-fringed coastal highways, glide through emerald backwaters on a traditional wooden kettuvallam, and watch the sun melt into the ocean from high laterite cliffs.",
    overview: "This is Kerala's quintessential coastal road trip. Connecting centuries-old maritime ports, serene backwater villages, and bohemian cliffside beaches, it features easy, flat driving, warm sea breezes, and the finest fresh seafood in South Asia.",
    highlights: [
      "Serene Alappuzha backwaters houseboat experience",
      "Pristine white sands of Marari Beach",
      "Iconic red sandstone cliffs and bohemian cafés of Varkala",
      "Lighthouse Beach sunsets in Kovalam",
      "Fresh catch-of-the-day grilled on coconut embers"
    ],
    roadConditions: "Smooth coastal NH 66 and scenic beach-side connecting roads; occasional highway widening diversions.",
    recommendedVehicle: "Sedan, Electric Vehicle (EV), or Compact Hatchback.",
    elevationGain: "Sea level coastal drive (0m - 50m)",
    tags: ["Beaches", "Backwaters", "Coastal Highway", "Seafood"],
    packingEssentials: [
      "Sun protection (SPF 50, polarized sunglasses, linen wear)",
      "Swimwear & flip-flops for beach hopping",
      "Mosquito repellent for evening backwater cruises",
      "Fast charging cable for EV drivers"
    ],
    stops: [
      {
        id: "kochi-coast",
        name: "Fort Kochi",
        day: 1,
        region: "Ernakulam",
        distanceFromPrev: 0,
        drivingTime: "Start",
        coordinates: { lat: 9.9656, lng: 76.2421 },
        description: "Colonial alleys, vibrant graffiti art, and timeless cantilevered Chinese fishing nets along the harbour mouth.",
        highlights: ["St. Francis Church", "Art cafés on Burgher Street", "Ferry ride across the backwaters"],
        mustTryFood: ["Cold pressed ginger lime juice", "Grilled red snapper with crushed pepper"],
        scenicSpot: "Vasco da Gama square at sunset.",
        drivingTip: "Take the coastal road via Chellanam for picturesque shrimp farm views.",
        image: "/images/places/fort-kochi-nets.jpg",
        activity: "Bicycle rental around colonial quarters"
      },
      {
        id: "marari",
        name: "Marari Beach",
        day: 1,
        region: "Alappuzha",
        distanceFromPrev: 42,
        drivingTime: "1h 10m",
        coordinates: { lat: 9.6015, lng: 76.2974 },
        description: "An unspoiled stretch of golden sand lined with coconut groves and authentic fisherman hamlets.",
        highlights: ["Quiet uncrowded shoreline", "Traditional coir making village", "Sunset yoga on the sand"],
        mustTryFood: ["Tender coconut water straight from local farm trees"],
        scenicSpot: "The endless line of painted fishing boats anchored along the shoreline.",
        drivingTip: "Drive slow through the sleepy village lanes; watch for drying fishing nets.",
        image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1000&q=80",
        activity: "Barefoot beachcombing"
      },
      {
        id: "alappuzha",
        name: "Alappuzha (Alleppey)",
        day: 2,
        region: "Kuttanad Waterlands",
        distanceFromPrev: 18,
        drivingTime: "35m",
        coordinates: { lat: 9.4981, lng: 76.3388 },
        description: "The Venice of the East, famous for its maze of tranquil canals, duck farming, and thatched-roof houseboats.",
        highlights: ["Private houseboat cruise through Vembanad Lake", "Kuttanad below-sea-level paddy fields", "Alleppey Lighthouse"],
        mustTryFood: ["Karimeen Pollichathu (Pearl spot fish wrapped in banana leaf)", "Duck Roast with Appam"],
        scenicSpot: "Middle of Vembanad lake watching Chinese fishing nets glint in golden afternoon light.",
        drivingTip: "Pre-book secure parking at the Punnamada boat jetty if staying overnight on a boat.",
        image: "/images/places/alleppey-houseboat.jpg",
        activity: "Overnight backwaters houseboat stay"
      },
      {
        id: "varkala",
        name: "Varkala Cliff",
        day: 3,
        region: "Trivandrum Coast",
        distanceFromPrev: 115,
        drivingTime: "2h 45m",
        coordinates: { lat: 8.7379, lng: 76.7163 },
        description: "Dramatic red laterite cliffs rising directly above the Arabian Sea, dotted with cliffside seafood cafés and yoga retreats.",
        highlights: ["North Cliff boardwalk walk", "Papanasam Beach mineral springs", "Janardhana Swamy 2000-year-old temple"],
        mustTryFood: ["Fresh Tiger Prawns sizzler", "Iced cardamom cold brew coffee"],
        scenicSpot: "North Cliff edge watching the horizon turn violet and fiery orange at dusk.",
        drivingTip: "Park your vehicle in the designated Helipad parking area before walking down the cliff.",
        image: "https://images.unsplash.com/photo-1610817201767-793a9130ce07?auto=format&fit=crop&w=1000&q=80",
        activity: "Surfing lessons and sunset café lounging"
      },
      {
        id: "kovalam",
        name: "Kovalam & Lighthouse Beach",
        day: 4,
        region: "Thiruvananthapuram",
        distanceFromPrev: 55,
        drivingTime: "1h 30m",
        coordinates: { lat: 8.4021, lng: 76.9787 },
        description: "Crescent-shaped sandy beaches flanked by a striking red-and-white striped lighthouse standing tall over palm-clad bluffs.",
        highlights: ["Climb to the top of Vizhinjam Lighthouse", "Hawa Beach rocky headlands", "Ayurvedic massage center"],
        mustTryFood: ["Kerala Fish Moilee (Mild coconut milk stew with kingfish)"],
        scenicSpot: "The 360-degree panoramic balcony atop the 118-foot lighthouse.",
        drivingTip: "NH 66 bypass makes driving into Kovalam straightforward with smooth 4-lane segments.",
        image: "https://images.unsplash.com/photo-1586030138336-4a854c6ddb5f?auto=format&fit=crop&w=1000&q=80",
        activity: "Lighthouse climb and Ayurveda rejuvenation"
      }
    ]
  },
  {
    slug: "malabar-heritage-and-wilderness",
    title: "Malabar Spice, Drive-in Beach & Wayanad",
    subtitle: "North Kerala Culinary & High Range Expedition",
    tagline: "Savor world-renowned Malabar cuisine, drive directly on ocean waves at Muzhappilangad, and climb the misty Churam.",
    durationDays: 5,
    distanceKm: 420,
    difficulty: "Moderate",
    bestSeason: "October to May",
    startPoint: "Kozhikode (Calicut)",
    endPoint: "Bekal / Kasaragod",
    heroImage: "/images/places/muzhappilangad-drive-in-beach.jpg",
    description: "Traverse the legendary spice coast of Vasco da Gama, conquer the 9 hairpin turns of Thamarassery Churam into Wayanad's rainforests, drive on Asia's longest drive-in beach, and discover the seaside ramparts of Bekal Fort.",
    overview: "North Kerala offers a road trip steeped in spice trade history, fiery culinary delicacies, wild elephant corridors, and dramatic coastal driveways. You'll drive across smooth sandy beaches where cars are legally permitted on the shoreline, through lush coffee estates, and ancient stone fortresses.",
    highlights: [
      "Authentic Kozhikode Dum Biryani and historic SM Street halwa",
      "9 thrilling hairpin turns of Thamarassery Churam",
      "Driving right along the ocean tide at Muzhappilangad Beach",
      "Trek to Banasura Sagar (India's largest earthen dam)",
      "Seaside ramparts and observation towers of 17th century Bekal Fort"
    ],
    roadConditions: "Scenic hill roads with hairpin passes; coastal NH 66; driveable hard-packed sand at Muzhappilangad.",
    recommendedVehicle: "Any reliable car (4x4 recommended if taking off-road Wayanad trails).",
    elevationGain: "Sea level to Chembra Peak foothills (900m)",
    tags: ["Drive-in Beach", "Culinary", "Rainforest", "Historic Forts"],
    packingEssentials: [
      "Car tire pressure gauge for sand driving",
      "Binoculars for wildlife sightings in Wayanad",
      "Gourmet container for buying Malabar Halwa & spices",
      "Trekking shoes for Wayanad peaks"
    ],
    stops: [
      {
        id: "kozhikode",
        name: "Kozhikode (Calicut)",
        day: 1,
        region: "Malabar Coast",
        distanceFromPrev: 0,
        drivingTime: "Start",
        coordinates: { lat: 11.2588, lng: 75.7804 },
        description: "The food capital of Kerala, historic landing port of Vasco da Gama, renowned for hospitality, sweet stalls, and beach sunsets.",
        highlights: ["Kozhikode Beach & Old Pier", "Mananchira Square", "Sweet Meat Street (S.M. Street) shopping"],
        mustTryFood: ["Authentic Kozhikode Dum Biryani with dates pickle", "Kozhikodan Halwa", "Ice Orathi at the beach"],
        scenicSpot: "The 150-year-old collapsed sea piers jutting out into the ocean at Calicut beach.",
        drivingTip: "City traffic can be busy on Mavoor road; early morning start is highly recommended.",
        image: "/images/places/kozhikode-beach-pier.jpg",
        activity: "Food trail across Paragon and Zains heritage kitchen"
      },
      {
        id: "wayanad",
        name: "Wayanad Highlands",
        day: 2,
        region: "Western Ghats",
        distanceFromPrev: 85,
        drivingTime: "2h 45m",
        coordinates: { lat: 11.6854, lng: 76.1320 },
        description: "Misty highland plateau carpeted with robusta coffee estates, bamboo forests, tribal heritage, and cool rainforest trails.",
        highlights: ["Banasura Sagar Dam", "Edakkal Caves prehistoric stone carvings", "Lakkidi Viewpoint"],
        mustTryFood: ["Bamboo rice payasam", "Malabar Pathiri with spicy chicken curry"],
        scenicSpot: "Lakkidi Viewpoint overlooking the dramatic 9 hairpin coils of the Churam.",
        drivingTip: "Do not stop on the Churam curves; use designated scenic parking bays near hairpin 9.",
        image: "/images/places/wayanad-banasura-dam.jpg",
        activity: "Speleology hike at Edakkal Caves"
      },
      {
        id: "kannur-drive-in",
        name: "Kannur & Muzhappilangad Drive-in Beach",
        day: 3,
        region: "Kannur Coast",
        distanceFromPrev: 110,
        drivingTime: "3h 00m",
        coordinates: { lat: 11.7947, lng: 75.4529 },
        description: "Asia's longest drive-in beach where you can cruise your car along 4 kilometers of firm golden sand against crashing ocean waves.",
        highlights: ["Drive directly along the shoreline", "Theyyam ritual performance experience", "St. Angelo Fort"],
        mustTryFood: ["Thalassery Biryani with short-grain Kaima rice", "Kallummakkaya (Stuffed mussels) Nirachathu"],
        scenicSpot: "Your vehicle parked at the shoreline with sea waves brushing against the tires.",
        drivingTip: "Drive only on the dark, hard-packed wet sand; avoid soft dry sand near the dunes to prevent getting stuck.",
        image: "/images/places/muzhappilangad-drive-in-beach.jpg",
        activity: "Shoreline vehicle cruise & beach drift"
      },
      {
        id: "bekal",
        name: "Bekal Fort & Nileshwar",
        day: 4,
        region: "Kasaragod",
        distanceFromPrev: 80,
        drivingTime: "2h 00m",
        coordinates: { lat: 12.3926, lng: 75.0326 },
        description: "A gigantic keyhole-shaped red laterite fort rising over the sea, celebrated for its ramparts, spyholes, and dramatic sunset views.",
        highlights: ["Bekal Fort observation tower", "Nileshwar backwaters houseboat", "Ananthapura Lake Temple"],
        mustTryFood: ["Kasaragod mutton curry with soft coin parottas"],
        scenicSpot: "The seaside bastion where waves crash against centuries-old stone walls.",
        drivingTip: "Ample parking available at the Kerala Tourism entrance at Bekal.",
        image: "/images/places/bekal-fort.jpg",
        activity: "Sunset photography on the castle bastions"
      }
    ]
  },
  {
    slug: "ponmudi-and-thenmala-eco-trail",
    title: "The Southern Hills & Thenmala Eco-Trail",
    subtitle: "Ponmudi 22 Hairpins, Ecotourism & Palaruvi Falls",
    tagline: "Climb Ponmudi's 22 hairpin turns, walk the elevated canopy walkways of Thenmala, and marvel at the colossal Jatayu sculpture.",
    durationDays: 3,
    distanceKm: 270,
    difficulty: "Moderate",
    bestSeason: "October to March",
    startPoint: "Thiruvananthapuram",
    endPoint: "Kollam / Trivandrum",
    heroImage: "https://images.unsplash.com/photo-1742107939655-4f8af7484dfa?auto=format&fit=crop&w=1600&q=80",
    description: "A journey through the lush southern tip of the Western Ghats, starting from Kerala's capital through winding hairpin hills of Ponmudi, India's first planned ecotourism sanctuary in Thenmala, and the world's largest bird sculpture at Jatayu Earth's Center.",
    overview: "This route provides an intoxicating blend of misty altitude, cascading forest waterfalls, and world-class ecotourism. From Trivandrum, you climb the 22 winding hairpin curves of Ponmudi, follow the scenic Aryankavu mountain pass, marvel at the roaring Palaruvi falls, and discover the legendary rocky peaks of Chadayamangalam.",
    highlights: [
      "Conquering Ponmudi's famous 22 hairpin bends",
      "Kallar River freshwater crystal pools and riverbed rocks",
      "Thenmala canopy walkway and musical dancing fountains",
      "Palaruvi Waterfalls ('Stream of Milk') in dense Shendurney forest",
      "Jatayu Earth's Center cable car ride and colossal 200-foot mythical sculpture"
    ],
    roadConditions: "Smooth state highways with narrow, exhilarating mountain ghat curves climbing Ponmudi; well-marked national highway sections on MC Road.",
    recommendedVehicle: "Hatchback, Compact SUV, or Cruiser Motorcycle.",
    elevationGain: "Sea level (Trivandrum, 15m) to Ponmudi Peak (1,100m)",
    tags: ["Mountains", "Wildlife", "Waterfalls", "Hairpin Bends"],
    packingEssentials: [
      "Light jacket for cool Ponmudi peak breezes",
      "Swimwear or change of clothes for freshwater river dips at Kallar",
      "Comfortable grip shoes for rocky climbs at Jatayu Nature Park",
      "Camera with wide-angle lens for the colossal Jatayu sculpture"
    ],
    stops: [
      {
        id: "trivandrum",
        name: "Thiruvananthapuram (Trivandrum)",
        day: 1,
        region: "Travancore Capital",
        distanceFromPrev: 0,
        drivingTime: "Start",
        coordinates: { lat: 8.5241, lng: 76.9366 },
        description: "The historic capital of Travancore, famed for the colossal golden Sree Padmanabhaswamy Temple, royal palaces, and stately tree-lined boulevards.",
        highlights: ["Padmanabhaswamy Temple architectural view", "Napier Museum & Art Gallery", "Kowdiar Palace heritage drive"],
        mustTryFood: ["Boli with warm Palada Payasam", "Spicy Trivandrum Chicken Fry with soft layered parotta"],
        scenicSpot: "The grand stone arches and lush gardens surrounding Napier Museum.",
        drivingTip: "Hit the Nedumangad road before 8:00 AM to avoid city morning commute traffic.",
        image: "https://images.unsplash.com/photo-1644773182204-f0bf03cae0cb?auto=format&fit=crop&w=1000&q=80",
        activity: "Royal heritage drive and sweet bazaar tasting"
      },
      {
        id: "ponmudi",
        name: "Ponmudi (The Golden Peak)",
        day: 1,
        region: "Peppara Wildlife Range",
        distanceFromPrev: 56,
        drivingTime: "1h 45m",
        coordinates: { lat: 8.7601, lng: 77.1162 },
        description: "A tranquil hill station nestled in the clouds with 22 thrilling hairpin bends, rolling velvet meadows, and tea plantations.",
        highlights: ["Conquering the 22 hairpin passes", "Kallar Golden Valley stream", "Ponmudi upper sanatorium ridge walks"],
        mustTryFood: ["Hot steaming cardamom tea and piping hot vegetable pakoras at top ridge stalls"],
        scenicSpot: "Hairpin Bend 22 overlooking the misty green valleys stretching into the horizon.",
        drivingTip: "Drive carefully on Hairpins 14-20; honk before entering blind turns and stay in 2nd gear.",
        image: "https://images.unsplash.com/photo-1742107939655-4f8af7484dfa?auto=format&fit=crop&w=1000&q=80",
        activity: "Cloud-walking along the summit ridge"
      },
      {
        id: "thenmala",
        name: "Thenmala & Palaruvi Falls",
        day: 2,
        region: "Shendurney Wildlife Sanctuary",
        distanceFromPrev: 78,
        drivingTime: "2h 15m",
        coordinates: { lat: 8.9583, lng: 77.0622 },
        description: "India's first planned eco-tourism destination surrounded by deep teak forests, a lake reservoir, elevated suspension bridge, and the 300-ft Palaruvi cascade.",
        highlights: ["Thenmala canopy walkway & deer rehabilitation center", "Suspension bridge across Kallada river", "Palaruvi Waterfalls spray pool"],
        mustTryFood: ["Authentic Travancore style Kappa & fish curry with bird's eye chilli (Kanthari) dip"],
        scenicSpot: "The observation deck facing the roaring Palaruvi white water cascade.",
        drivingTip: "State Highway 8 passes through elephant movement corridors; observe forest department speed limits of 30 km/h.",
        image: "/images/places/gavi-rainforest.jpg",
        activity: "Canopy walking & butterfly safari"
      },
      {
        id: "jatayu",
        name: "Jatayu Earth's Center (Chadayamangalam)",
        day: 3,
        region: "Kollam Foothills",
        distanceFromPrev: 52,
        drivingTime: "1h 20m",
        coordinates: { lat: 8.8637, lng: 76.8687 },
        description: "The world's largest bird sculpture perched atop a dramatic 1,000-ft rock hill, celebrating women's safety and mythical valor.",
        highlights: ["State-of-the-art cable car ropeway", "Exploring the 200-ft Jatayu sculpture interior museum", "Adventure rock climbing activities"],
        mustTryFood: ["Fresh cashew nut halwa and tender coconut water"],
        scenicSpot: "The panoramic observation terrace right at the beak of the mythical bird sculpture.",
        drivingTip: "Convenient multi-level parking is available directly at the ticket counter plaza on MC Road.",
        image: "https://images.unsplash.com/photo-1660790608920-2e6cadb19460?auto=format&fit=crop&w=1000&q=80",
        activity: "Cable car ascent & sculpture exploration"
      }
    ]
  },
  {
    slug: "idukki-wild-and-arch-dam-odyssey",
    title: "High Range Wilderness & Arch Dam Trail",
    subtitle: "Asia's Largest Arch Dam, Wild Gavi & Ramakkalmedu Winds",
    tagline: "Witness the sheer scale of Idukki Arch Dam, stand in the howling gale-force winds of Ramakkalmedu, and explore the mist-clad wilderness of Kuttikkanam.",
    durationDays: 4,
    distanceKm: 380,
    difficulty: "Challenging",
    bestSeason: "September to May",
    startPoint: "Kochi",
    endPoint: "Kottayam / Kochi",
    heroImage: "/images/places/idukki-arch-dam.jpg",
    description: "An awe-inspiring circuit carving deep into the rugged heart of Idukki district. Cross Asia's highest parabolic arch dam, experience the howling 35 km/h gale-force winds of Ramakkalmedu overlooking the plains of Tamil Nadu, and navigate virgin pine forests.",
    overview: "This is Kerala's ultimate engineering and wilderness showcase. Leaving the lowlands via Thattekad's bird haven, you climb deep into the rocky gorges of the Periyar river to behold the 555-foot Idukki Arch Dam built between the legendary Kuravan and Kurathi mountain peaks. You will stand in constant winds at Ramakkalmedu and wind down through cool tea valleys of Kuttikkanam.",
    highlights: [
      "Colossal 555-ft Idukki Arch Dam and Cheruthoni reservoir cruise",
      "Thattekad Bird Sanctuary (Dr. Salim Ali's favorite lowland rainforest)",
      "Howling gale-force winds & giant Kuravan statue at Ramakkalmedu",
      "Panoramic views of Tamil Nadu agricultural plains from 1,200m ridge",
      "Historic colonial tea bungalows and pine valleys of Kuttikkanam"
    ],
    roadConditions: "Challenging mountain stretches with sharp climbs, rocky road shoulders near reservoir borders, and steep descents.",
    recommendedVehicle: "SUV, Crossover, or 4x4 with strong torque and high ground clearance.",
    elevationGain: "Lowlands (50m) to Ramakkalmedu Ridge (1,250m)",
    tags: ["Mountains", "Wildlife", "Forests", "Waterfalls"],
    packingEssentials: [
      "Windbreaker jacket for gale-force winds at Ramakkalmedu",
      "Binoculars for Thattekad bird watching and wildlife viewing",
      "Tire puncture repair kit and portable inflator for remote high range passes",
      "Sturdy walking boots for dam trail treks"
    ],
    stops: [
      {
        id: "thattekad",
        name: "Thattekad Bird Sanctuary & Bhoothathankettu",
        day: 1,
        region: "Periyar River Basin",
        distanceFromPrev: 0,
        drivingTime: "Start from Kochi (1h 30m)",
        coordinates: { lat: 10.1333, lng: 76.6833 },
        description: "Dense lowland evergreen tropical rainforest famed as the richest bird habitat in peninsular India, bordered by the scenic Bhoothathankettu dam.",
        highlights: ["Ceylon Frogmouth & Malabar Grey Hornbill spotting", "Bhoothathankettu reservoir boat pedal", "Salim Ali nature trail"],
        mustTryFood: ["Fresh river pearl spot fry with hot kappa and crushed green chilli chammanthi"],
        scenicSpot: "The mist-covered Periyar riverbank at dawn as hornbills take flight across the canopy.",
        drivingTip: "Watch for early morning deer crossings on the forested Kothamangalam-Thattekad road.",
        image: "/images/places/nilambur-teak-bridge.jpg",
        activity: "Early morning guided birdwatching trek"
      },
      {
        id: "idukki-dam",
        name: "Idukki Arch Dam & Cheruthoni",
        day: 2,
        region: "Idukki High Range",
        distanceFromPrev: 85,
        drivingTime: "2h 45m",
        coordinates: { lat: 9.8519, lng: 76.9744 },
        description: "One of the highest parabolic arch dams in Asia, standing 555 feet tall between two monolithic granite hills named Kuravan and Kurathi.",
        highlights: ["Electric buggy ride across the arch dam crest", "Panoramic reservoir boat cruise", "Hill View Park overlooking wild elephants"],
        mustTryFood: ["Spicy Idukki cardamom beef/mushroom fry with hot flaky parottas"],
        scenicSpot: "The dizzying view from the center of the arch dam looking straight down 555 feet into the gorge.",
        drivingTip: "Cameras and mobiles are strictly regulated at the dam entry gate; follow security directives.",
        image: "/images/places/idukki-arch-dam.jpg",
        activity: "Buggy ride across Asia's largest arch dam"
      },
      {
        id: "ramakkalmedu",
        name: "Ramakkalmedu Wind Ridges",
        day: 3,
        region: "Nedumkandam Range",
        distanceFromPrev: 65,
        drivingTime: "2h 00m",
        coordinates: { lat: 9.8000, lng: 77.2400 },
        description: "A windswept mountain ridge where non-stop 35 km/h winds whistle through giant wind turbine farms, offering dramatic bird's-eye views of Tamil Nadu.",
        highlights: ["Standing in the famous gale-force wind corridor", "Kuruvan & Kurathi monumental hill statue", "Tortoise Rock natural viewpoint"],
        mustTryFood: ["Locally brewed ginger lemon tea with hot spicy banana bondas"],
        scenicSpot: "The edge of the cliff looking down at the patchwork green farms of Cumbum and Theni.",
        drivingTip: "Hold car doors firmly when opening in the parking area due to extreme wind gusts.",
        image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1000&q=80",
        activity: "Wind turbine trail walk & cliff gazing"
      },
      {
        id: "kuttikkanam",
        name: "Kuttikkanam & Peerumedu",
        day: 4,
        region: "Kottayam Hills",
        distanceFromPrev: 58,
        drivingTime: "1h 45m",
        coordinates: { lat: 9.5800, lng: 76.9700 },
        description: "A tranquil colonial summer retreat blessed with cool mist, pine forests, organic cardamom estates, and panoramic valley viewpoints.",
        highlights: ["Kuttikkanam Pine Forest walk", "Ashley Bungalow colonial heritage", "Panchalimedu misty ridge"],
        mustTryFood: ["Steaming hot Pazham Pori with freshly brewed highland estate coffee"],
        scenicSpot: "The sunbeams piercing through the dense canopy in Kuttikkanam pine forest.",
        drivingTip: "KK Road (Kottayam-Kumily Highway) provides smooth, well-banked curves for a pleasant descent.",
        image: "https://images.unsplash.com/photo-1511497584788-87676104235f?auto=format&fit=crop&w=1000&q=80",
        activity: "Pine forest hiking & colonial tea bungalow tour"
      }
    ]
  },
  {
    slug: "kuttanad-waterways-and-kumarakom",
    title: "Kuttanad Waterways & Vembanad Rim",
    subtitle: "Below-Sea-Level Paddy Roads, Island Ferries & Toddy Cuisine",
    tagline: "Drive along water-bound village dykes below sea level, catch tranquil sunset canoe rides, and taste fiery duck roast and fresh toddy delicacies.",
    durationDays: 3,
    distanceKm: 220,
    difficulty: "Easy",
    bestSeason: "November to March",
    startPoint: "Kochi",
    endPoint: "Kollam / Kumarakom",
    heroImage: "/images/places/kumarakom-backwaters.jpg",
    description: "An authentic culinary and coastal waterway road trip exploring the unique delta where farming is conducted below sea level, criss-crossing quiet country roads flanked by endless backwaters, lotus fields, and village toddy parlours.",
    overview: "This route celebrates the calm water-world of Central Kerala. Experience driving along narrow reclaimed dyke roads of Kuttanad, hop onto vehicle ferries crossing Vembanad lake, watch traditional snake boats practicing on the Pampa river, and indulge in legendary highway culinary feasts of duck roast, pearl spot fish, and tender coconut puddings.",
    highlights: [
      "Driving below sea level along the scenic Kuttanad AC Canal road",
      "Kumarakom Bird Sanctuary and migratory waterbird watching",
      "Traditional wooden canoe exploration through narrow village waterways",
      "Historic Champakulam Kalloorkad St. Mary's Forane Church (built 427 AD)",
      "Tasting legendary backwater toddy shop delicacies (Karimeen, Crab & Duck)"
    ],
    roadConditions: "Flat, smooth scenic village and coastal roads; narrow stretches alongside canals requiring courteous passing.",
    recommendedVehicle: "Any Sedan, Hatchback, or Electric Vehicle (EV).",
    elevationGain: "Sea level and below (-2m to 20m)",
    tags: ["Beaches", "Backwaters", "Culinary", "Waterways"],
    packingEssentials: [
      "Polarized sunglasses to cut water glare while driving along canals",
      "Mosquito repellent for twilight lakeside dining",
      "Loose linen clothes for tropical warmth",
      "Appetite for authentic spicy Syrian Christian & backwater cuisine"
    ],
    stops: [
      {
        id: "kumbalangi",
        name: "Kumbalangi Model Tourism Village",
        day: 1,
        region: "Kochi Island Suburbs",
        distanceFromPrev: 0,
        drivingTime: "Start (25m from Fort Kochi)",
        coordinates: { lat: 9.8789, lng: 76.2867 },
        description: "India's first designated eco-tourism village surrounded by tranquil backwaters, mangrove fish farms, and cantilevered Chinese fishing nets.",
        highlights: ["Crab farming and coir spinning demonstration", "Country boat sunset cruise", "Bioluminescence (Kavaru) night tour in season"],
        mustTryFood: ["Fresh crab roast with piping hot coconut-laced Appams"],
        scenicSpot: "The village bridge viewpoint at sunset as local fishermen cast nets under pink skies.",
        drivingTip: "Drive slow through the village; local narrow bridges have single-lane passage.",
        image: "/images/places/fort-kochi-nets.jpg",
        activity: "Village crab catching & canoe paddling"
      },
      {
        id: "kumarakom",
        name: "Kumarakom & Vembanad Lakeside",
        day: 1,
        region: "Kottayam Backwaters",
        distanceFromPrev: 54,
        drivingTime: "1h 25m",
        coordinates: { lat: 9.6175, lng: 76.4301 },
        description: "A cluster of little islands on Vembanad Lake, world-renowned for migratory birds, luxury lakeside heritage retreats, and calm waters.",
        highlights: ["Kumarakom Bird Sanctuary morning walk", "Sunset motorboat cruise across Vembanad Lake", "Aruvikkuzhi Waterfalls pitstop"],
        mustTryFood: ["Karimeen Pollichathu (Spiced pearl spot fish roasted in banana leaves)", "Steamed tapioca with spicy fish curry"],
        scenicSpot: "The resort jetty facing the infinite horizon of Vembanad lake in the evening breeze.",
        drivingTip: "The road from Cherthala to Kumarakom has picturesque coconut canopies; great for windows-down cruising.",
        image: "/images/places/kumarakom-backwaters.jpg",
        activity: "Sunset lake cruise & migratory bird watching"
      },
      {
        id: "champakulam",
        name: "Champakulam & Kuttanad Polders",
        day: 2,
        region: "Kuttanad Delta",
        distanceFromPrev: 32,
        drivingTime: "50m",
        coordinates: { lat: 9.4000, lng: 76.4167 },
        description: "The heart of Kuttanad's 'Rice Bowl', where farming is famously carried out 4 to 10 feet below sea level flanked by the sacred Pampa river.",
        highlights: ["Champakulam snake boat (Chundan Vallam) shed", "Historic St. Mary's Church (427 AD)", "Driving on the dyke roads below sea level"],
        mustTryFood: ["Kuttanadan Duck Roast with crispy Vattayappam"],
        scenicSpot: "The banks of Pampa river where massive 130-foot snake boats rest under thatched sheds.",
        drivingTip: "The AC Road (Alappuzha-Changanassery) is newly elevated with beautiful modern water-bridges.",
        image: "/images/places/alleppey-houseboat.jpg",
        activity: "Snake boat shed tour & heritage church visit"
      },
      {
        id: "munroe-island",
        name: "Munroe Island & Ashtamudi Lake",
        day: 3,
        region: "Kollam Backwaters",
        distanceFromPrev: 65,
        drivingTime: "1h 45m",
        coordinates: { lat: 8.9950, lng: 76.6110 },
        description: "A tranquil archipelago of 8 islands located at the confluence of Ashtamudi Lake and the Kallada River, renowned for canal networks.",
        highlights: ["Morning narrow canal canoe cruise", "Mangrove archway tunnels", "S-Curve viewpoint at Ashtamudi Lake"],
        mustTryFood: ["Fresh river prawns fry with spicy Chemmeen chammanthi"],
        scenicSpot: "The narrow mangrove canal tunnel where tree branches form a natural green vault over the water.",
        drivingTip: "Vehicle ferry across Kallada river operates continuously from 6 AM to 9 PM.",
        image: "/images/places/munroe-island-canals.jpg",
        activity: "Silent canal canoe exploration"
      }
    ]
  },
  {
    slug: "grand-14-districts-kerala-odyssey",
    title: "The Grand 14-District Kerala Odyssey",
    subtitle: "Complete State Circuit: Kasaragod to Trivandrum",
    tagline: "The definitive cross-Kerala road trip hitting the #1 iconic landmark across all 14 districts in one epic highway voyage.",
    durationDays: 14,
    distanceKm: 1180,
    difficulty: "Moderate",
    bestSeason: "October to April",
    startPoint: "Bekal (Kasaragod)",
    endPoint: "Kovalam (Thiruvananthapuram)",
    heroImage: "/images/places/bekal-fort.jpg",
    description: "The grandest motoring voyage across God's Own Country. Spanning 1,180 km from the ancient keyhole sea fort in northernmost Kasaragod down to the sacred golden spires of Thiruvananthapuram, this route visits the crowning landmark of every single one of Kerala's 14 districts.",
    overview: "Designed for wanderers who want to experience the complete spectrum of Kerala. You will drift on Asia's longest drive-in beach in Kannur, conquer the 9 hairpin curves of Wayanad, savor legendary biryani in Kozhikode, walk through the world's oldest teak woods in Malappuram, explore Tipu's granite moat fort in Palakkad, hear the roar of Athirappilly falls in Thrissur, stroll colonial Fort Kochi, stand atop the 555-foot arch dam in Idukki, cruise through Kumarakom's bird haven in Kottayam, navigate the below-sea-level waterways of Alappuzha, explore virgin Gavi rainforests in Pathanamthitta, ascend the cable car to Jatayu's 200-ft mountain sculpture in Kollam, and watch the sunset behind Padmanabhaswamy temple and Kovalam lighthouse in Trivandrum.",
    highlights: [
      "All 14 districts covered in a seamless north-to-south itinerary",
      "Kasaragod: Bekal Fort ocean bastions",
      "Kannur: Muzhappilangad Drive-in Beach sand drift",
      "Wayanad: Banasura Sagar Dam & Lakkidi Viewpoint",
      "Kozhikode: Historic beach pier & SM Street halwa bazaar",
      "Malappuram: Nilambur Teak Museum & Conolly's Plot",
      "Palakkad: 18th-century Tipu Sultan Granite Fort",
      "Thrissur: Athirappilly Waterfalls (The Niagara of India)",
      "Ernakulam: Fort Kochi Chinese Fishing Nets",
      "Idukki: 555-ft Idukki Arch Dam & Munnar tea peaks",
      "Kottayam: Kumarakom Bird Sanctuary on Vembanad Lake",
      "Alappuzha: Kuttanad below-sea-level paddy dykes & houseboats",
      "Pathanamthitta: Gavi Rainforest & Konni Elephant Reserve",
      "Kollam: Jatayu Earth's Center 200-ft mountain bird sculpture",
      "Thiruvananthapuram: Sree Padmanabhaswamy Temple & Kovalam Lighthouse"
    ],
    roadConditions: "A scenic combination of newly 4-laned NH 66, mountain ghat passes (Wayanad Churam & High Ranges), and peaceful backwater dyke roads.",
    recommendedVehicle: "Any reliable Sedan, SUV, or Cruiser Motorcycle with good fuel range.",
    elevationGain: "Sea level coastal cruising to 1,200m Western Ghat passes",
    tags: ["All 14 Districts", "Heritage", "Mountains", "Beaches", "Waterfalls", "Wildlife", "Culinary"],
    packingEssentials: [
      "Fastag and offline GPS maps downloaded for all 14 districts",
      "Both lightweight beach wear and mountain fleece for high ranges",
      "Comfortable walking shoes for forts and rainforest trails",
      "Tire pressure gauge and emergency tyre inflator"
    ],
    stops: [
      {
        id: "kasaragod-bekal",
        name: "Bekal Fort & Sea Ramparts",
        day: 1,
        region: "North Malabar",
        district: "Kasaragod",
        landmark: "Bekal Fort",
        distanceFromPrev: 0,
        drivingTime: "Start",
        coordinates: { lat: 12.3926, lng: 75.0326 },
        description: "Gigantic 300-year-old keyhole-shaped red laterite fort rising dramatically over the crashing Arabian waves.",
        highlights: ["Observation tower overlooking the coast", "Seaside ramparts & water tank", "Bekal beach park walk"],
        mustTryFood: ["Kasaragod Mutton Curry with soft coin parottas"],
        scenicSpot: "The westernmost bastion where ocean waves explode against stone fortress walls.",
        drivingTip: "Hit the road early to enjoy the morning sea breeze on the fort ramparts.",
        image: "/images/places/bekal-fort.jpg",
        activity: "Fort rampart photography & beach stroll"
      },
      {
        id: "kannur-muzhappilangad",
        name: "Muzhappilangad Drive-in Beach",
        day: 2,
        region: "Kannur Coast",
        district: "Kannur",
        landmark: "Muzhappilangad Drive-in Beach",
        distanceFromPrev: 82,
        drivingTime: "2h 10m",
        coordinates: { lat: 11.7947, lng: 75.4529 },
        description: "Asia's longest drive-in beach where vehicles cruise across 4 kilometers of firm golden sand against crashing surf.",
        highlights: ["Driving directly along the sea shoreline", "Theyyam ritual performance centers nearby", "St. Angelo Fort in Kannur"],
        mustTryFood: ["Thalassery Biryani with short-grain Kaima rice & Stuffed Mussels (Kallummakkaya Nirachathu)"],
        scenicSpot: "Your vehicle parked at the water's edge at sunset with waves touching the wheels.",
        drivingTip: "Drive strictly on the hard-packed dark wet sand; avoid soft dry sand near the dunes.",
        image: "/images/places/muzhappilangad-drive-in-beach.jpg",
        activity: "Beach driving & ocean wave splash"
      },
      {
        id: "wayanad-banasura",
        name: "Banasura Sagar Dam & Lakkidi Viewpoint",
        day: 3,
        region: "Wayanad Highlands",
        district: "Wayanad",
        landmark: "Banasura Sagar Dam",
        distanceFromPrev: 95,
        drivingTime: "2h 45m",
        coordinates: { lat: 11.6698, lng: 75.9575 },
        description: "India's largest earthen dam set against the towering Banasura peak, featuring floating island hillocks and cool mountain passes.",
        highlights: ["Speedboat rides between reservoir islands", "Negotiating Wayanad Churam's 9 hairpin curves", "Edakkal Caves prehistoric stone carvings"],
        mustTryFood: ["Bamboo Rice Payasam & Wayanadan Pepper Chicken"],
        scenicSpot: "Lakkidi viewpoint gazing down at the 9 hairpin coils winding through misty valley floor.",
        drivingTip: "Use engine braking in 2nd gear on the steep descent down Wayanad ghat pass.",
        image: "/images/places/wayanad-banasura-dam.jpg",
        activity: "Speedboat reservoir safari & cave exploration"
      },
      {
        id: "kozhikode-beach",
        name: "Kozhikode Beach & S.M. Street",
        day: 4,
        region: "Malabar Maritime Coast",
        district: "Kozhikode",
        landmark: "Kozhikode Beach & S.M. Street",
        distanceFromPrev: 75,
        drivingTime: "2h 15m",
        coordinates: { lat: 11.2588, lng: 75.7804 },
        description: "Historic spice port where Vasco da Gama landed in 1498; celebrated UNESCO City of Literature and culinary crown of Malabar.",
        highlights: ["Sunset walk by the 150-yr-old collapsed sea piers", "Sweet Meat Street (Mittai Theruvu) shopping", "Mananchira Square heritage tank"],
        mustTryFood: ["Authentic Kozhikodan Mutton Dum Biryani & Famous Black Halwa"],
        scenicSpot: "The glowing twilight horizon of the Arabian sea behind the historic wooden pier ruins.",
        drivingTip: "Parking near SM street is best found at the Mananchira municipal parking lot.",
        image: "/images/places/kozhikode-beach-pier.jpg",
        activity: "Historic food trail & halwa bazaar walk"
      },
      {
        id: "malappuram-nilambur",
        name: "Nilambur Teak Museum & Conolly's Plot",
        day: 5,
        region: "Chaliyar Valley",
        district: "Malappuram",
        landmark: "Nilambur Teak Museum & Conolly's Plot",
        distanceFromPrev: 72,
        drivingTime: "2h 00m",
        coordinates: { lat: 11.2750, lng: 76.2260 },
        description: "The world's oldest teak plantation and only teak museum, featuring 180-year-old colossal trees and a scenic river suspension bridge.",
        highlights: ["Walking through Conolly's Plot giant teak groves", "Hanging suspension bridge across Chaliyar river", "Kottakkunnu hill garden in Malappuram town"],
        mustTryFood: ["Malappuram Erachi Choru & sweet Unnakaya with cardamom tea"],
        scenicSpot: "The center of the suspension bridge looking at the emerald Chaliyar river reflecting dense jungle trees.",
        drivingTip: "The State Highway 28 through Nilambur passes through scenic bamboo forests; watch for seasonal elephant herds.",
        image: "/images/places/nilambur-teak-bridge.jpg",
        activity: "Oldest teak forest walk & suspension bridge crossing"
      },
      {
        id: "palakkad-fort",
        name: "Palakkad Fort (Tipu's Fort) & Malampuzha",
        day: 6,
        region: "Palakkad Gap",
        district: "Palakkad",
        landmark: "Palakkad Fort",
        distanceFromPrev: 88,
        drivingTime: "2h 20m",
        coordinates: { lat: 10.7667, lng: 76.6547 },
        description: "One of the best-preserved granite moat forts in South India built by Hyder Ali in 1766, and the mountain backdrop of Malampuzha Dam.",
        highlights: ["Strolling the massive granite ramparts & water moat", "Malampuzha Dam reservoir gardens & passenger ropeway", "Historic Sub-Jail & temple inside fort"],
        mustTryFood: ["Famous Ramassery Idli with spicy Gunpowder Podi & Palakkadan Matta feast"],
        scenicSpot: "The fortress moat at sunrise with the Western Ghats mountain silhouettes reflecting in still waters.",
        drivingTip: "NH 544 from Thrissur through the Palakkad Gap offers smooth 6-lane cruising.",
        image: "/images/places/palakkad-fort.jpg",
        activity: "Fort moat walk & ropeway ride over reservoir"
      },
      {
        id: "thrissur-athirappilly",
        name: "Athirappilly Waterfalls",
        day: 7,
        region: "Cultural Capital / Chalakudy Basin",
        district: "Thrissur",
        landmark: "Athirappilly Waterfalls",
        distanceFromPrev: 96,
        drivingTime: "2h 30m",
        coordinates: { lat: 10.2851, lng: 76.5698 },
        description: "Kerala's largest waterfall, an 80-foot wide thundering cataract heralded as 'The Niagara of India' surrounded by pristine rainforests.",
        highlights: ["Hiking down to the base of the roaring falls", "Vazhachal rapids & botanical garden", "Vadakkumnathan Temple in Thrissur town"],
        mustTryFood: ["Thrissur Vellayappam with rich roasted meat curry"],
        scenicSpot: "The spray deck directly opposite the waterfall crest as rainbows form in the morning mist.",
        drivingTip: "Drive cautiously on the Chalakudy-Anamudi forest corridor; speed limits are enforced for wildlife protection.",
        image: "/images/places/athirappilly-waterfalls.jpg",
        activity: "Rainforest waterfall hike & spray bathing"
      },
      {
        id: "ernakulam-fort-kochi",
        name: "Fort Kochi & Chinese Fishing Nets",
        day: 8,
        region: "Central Coast",
        district: "Ernakulam",
        landmark: "Fort Kochi & Chinese Fishing Nets",
        distanceFromPrev: 75,
        drivingTime: "2h 00m",
        coordinates: { lat: 9.9656, lng: 76.2421 },
        description: "The Queen of the Arabian Sea where cantilevered 14th-century Chinese fishing nets, Portuguese churches, and spice bazaars meet.",
        highlights: ["Cantilevered Chinese fishing nets demonstration", "St. Francis Church & Santa Cruz Basilica", "Jew Town & Mattancherry Dutch Palace"],
        mustTryFood: ["Fresh catch-of-the-day fish fry at the seaside promenade with ginger tea"],
        scenicSpot: "Vasco da Gama square at sunset as massive cargo ships glide past wooden fishing nets.",
        drivingTip: "Park at the Fort Kochi bus stand parking area and explore the historic quarters on foot or bicycle.",
        image: "/images/places/fort-kochi-nets.jpg",
        activity: "Heritage café hopping & spice warehouse stroll"
      },
      {
        id: "idukki-arch-dam",
        name: "Idukki Arch Dam & Munnar Tea Horizons",
        day: 9,
        region: "High Range Highlands",
        district: "Idukki",
        landmark: "Idukki Arch Dam",
        distanceFromPrev: 110,
        drivingTime: "3h 15m",
        coordinates: { lat: 9.8519, lng: 76.9744 },
        description: "Asia's highest parabolic double-curvature arch dam standing 555 feet tall between two monolithic granite peaks named Kuravan and Kurathi.",
        highlights: ["Electric buggy ride across the colossal 555-ft dam crest", "Speedboat safari across the reservoir", "Panoramic tea estate viewpoints of Munnar"],
        mustTryFood: ["Fresh cardamom spiced highland tea with spicy Idukki beef/mushroom fry"],
        scenicSpot: "The dizzying view from the center of the arch dam looking straight down 555 feet into the rocky gorge.",
        drivingTip: "Mountain curves on SH 33 are steep and narrow; honk around blind bends and drive in daytime.",
        image: "/images/places/idukki-arch-dam.jpg",
        activity: "Arch dam buggy tour & reservoir boating"
      },
      {
        id: "kottayam-kumarakom",
        name: "Kumarakom Bird Sanctuary & Vembanad Lake",
        day: 10,
        region: "Vembanad Rim",
        district: "Kottayam",
        landmark: "Kumarakom Bird Sanctuary",
        distanceFromPrev: 85,
        drivingTime: "2h 30m",
        coordinates: { lat: 9.6175, lng: 76.4301 },
        description: "A world-renowned 14-acre wetland bird paradise along the banks of India's longest lake, famed for migratory Siberian cranes and herons.",
        highlights: ["Morning birdwatching canopy trek", "Sunset motorboat cruise across Vembanad Lake", "Illikkal Kallu high peak mountain views"],
        mustTryFood: ["Kottayam Duck Roast with Appam & Meen Vevichathu (Fiery clay-pot fish curry)"],
        scenicSpot: "The lakeside watchtower looking out over endless blue waters dotted with white egrets.",
        drivingTip: "Drive along the scenic Cherthala-Kumarakom road lined with coconut tree canopies.",
        image: "/images/places/kumarakom-backwaters.jpg",
        activity: "Morning birdwatching & sunset lake cruise"
      },
      {
        id: "alappuzha-backwaters",
        name: "Alleppey Backwaters & Kuttanad Polders",
        day: 11,
        region: "Kuttanad Waterlands",
        district: "Alappuzha",
        landmark: "Alleppey Backwaters",
        distanceFromPrev: 35,
        drivingTime: "1h 00m",
        coordinates: { lat: 9.4981, lng: 76.3388 },
        description: "The Venice of the East where traditional thatched wooden kettuvallam houseboats cruise along canal networks 4 to 10 feet below sea level.",
        highlights: ["Overnight or day cruise on a luxury wooden houseboat", "Kuttanad below-sea-level paddy farming dykes", "Alleppey colonial lighthouse and beach pier"],
        mustTryFood: ["Karimeen Pollichathu (Pearl spot fish roasted in banana leaves) & Chatti Choru"],
        scenicSpot: "The tranquil vastness of Punnamada Lake as houseboats glide against the evening pink sky.",
        drivingTip: "The newly elevated AC Road (Alappuzha-Changanassery) offers smooth driving with wide panoramic water-bridges.",
        image: "/images/places/alleppey-houseboat.jpg",
        activity: "Houseboat cruise & below-sea-level dyke drive"
      },
      {
        id: "pathanamthitta-gavi",
        name: "Gavi Rainforest & Konni Elephant Reserve",
        day: 12,
        region: "Sabari High Range",
        district: "Pathanamthitta",
        landmark: "Gavi Rainforest",
        distanceFromPrev: 85,
        drivingTime: "2h 45m",
        coordinates: { lat: 9.4390, lng: 77.1650 },
        description: "A pristine tropical evergreen rainforest corridor inside Periyar tiger reserve, famed for wildlife safaris, jungle lakes, and the historic Konni elephant kraal.",
        highlights: ["Spotting wild elephants, Nilgiri Tahr, and hornbills", "Canoeing on Gavi lake surrounded by misty forest", "Historic 1800s wooden elephant cage (Kraal) at Konni"],
        mustTryFood: ["Traditional Pathanamthitta Appam with Vegetable & Chicken Stew"],
        scenicSpot: "Gavi lake viewpoint in early morning mist as wild sambar deer come to drink water.",
        drivingTip: "Passes from the Forest Department are required for Gavi; book online via KFDC in advance.",
        image: "/images/places/gavi-rainforest.jpg",
        activity: "Jungle safari & wilderness canoeing"
      },
      {
        id: "kollam-jatayu",
        name: "Jatayu Earth's Center & Munroe Island",
        day: 13,
        region: "Ashtamudi / Travancore Foothills",
        district: "Kollam",
        landmark: "Jatayu Earth's Center",
        distanceFromPrev: 65,
        drivingTime: "2h 00m",
        coordinates: { lat: 8.8637, lng: 76.8687 },
        description: "The world's largest bird sculpture perched atop a dramatic 1,000-ft rock hill, and the tranquil 8-island canal labyrinth of Munroe Island.",
        highlights: ["Cable car ropeway ride to the 200-ft Jatayu sculpture", "Exploring the multi-level sculpture museum", "Silent canal canoe cruise under Munroe Island mangroves"],
        mustTryFood: ["Kollam Roasted Cashews & Ashtamudi Fresh Crab Curry"],
        scenicSpot: "The observation terrace at the wingtip of the colossal Jatayu bird overlooking green Kerala countryside.",
        drivingTip: "Easy parking available at the Jatayu Nature Park complex on MC Road.",
        image: "https://images.unsplash.com/photo-1660790608920-2e6cadb19460?auto=format&fit=crop&w=1000&q=80",
        activity: "Cable car ascent & mangrove canoe paddling"
      },
      {
        id: "trivandrum-padmanabhaswamy",
        name: "Sree Padmanabhaswamy Temple & Kovalam",
        day: 14,
        region: "Capital Coast",
        district: "Thiruvananthapuram",
        landmark: "Sree Padmanabhaswamy Temple",
        distanceFromPrev: 60,
        drivingTime: "1h 45m",
        coordinates: { lat: 8.4828, lng: 76.9436 },
        description: "The world's richest temple with its majestic 16th-century Dravidian Gopuram, finishing at the crescent beaches and red-and-white lighthouse of Kovalam.",
        highlights: ["Padmanabhaswamy Temple architectural heritage walk", "Kovalam Lighthouse Beach sunset", "Napier Museum and Kanakakkunnu Palace drive"],
        mustTryFood: ["Trivandrum Sweet Boli with warm Palada Payasam & Fresh Tender Coconut"],
        scenicSpot: "The top of the Kovalam Lighthouse overlooking crashing waves on the three crescent beaches.",
        drivingTip: "Park near Kovalam Beach road and celebrate the completion of the 14-district cross-Kerala odyssey!",
        image: "https://images.unsplash.com/photo-1644773182204-f0bf03cae0cb?auto=format&fit=crop&w=1000&q=80",
        activity: "Temple heritage stroll & lighthouse sunset celebration"
      }
    ]
  }
];

export const KERALA_TRAVEL_TIPS = [
  {
    title: "Ghat Road Driving Etiquette",
    description: "Always give way to uphill vehicles on ghat sections. Use engine braking in lower gears instead of riding brakes continuously down Munnar and Wayanad passes.",
    icon: "Mountain"
  },
  {
    title: "Monsoon Roadtrip Magic",
    description: "From June to August, Kerala transforms into an emerald paradise. Waterfalls run in full fury. Ensure wiper blades and tire treads are in top shape.",
    icon: "CloudRain"
  },
  {
    title: "Fastag & Fuel Stations",
    description: "All major toll plazas accept Fastag. Premium fuel and EV fast-charging corridors (KSEB & private networks) are well distributed along NH 66 and MC Road.",
    icon: "Fuel"
  },
  {
    title: "Culinary Highway Stops",
    description: "Look for wayside 'Kudumbashree' or heritage Kerala cafés for steaming hot Puttu, Kadala curry, and piping hot Sulaimani (black spiced tea).",
    icon: "Coffee"
  }
];
