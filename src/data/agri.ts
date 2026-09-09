export type Crop = {
  id: string;
  name: string;
  category: "Cereal" | "Pulse" | "Vegetable" | "Cash Crop" | "Oilseed";
  season: "Kharif" | "Rabi" | "Zaid" | "Year-round";
  emoji: string;
  summary: string;
  durationDays: number;
  waterNeed: "Low" | "Medium" | "High";
  yieldPerAcre: string;
  soil: { type: string; ph: string; prep: string };
  stages: { name: string; days: string; note: string }[];
  irrigation: string[];
  pests: { name: string; sign: string; control: string }[];
  diseases: string[];
  tips: string[];
};

export const crops: Crop[] = [
  {
    id: "wheat",
    name: "Wheat",
    category: "Cereal",
    season: "Rabi",
    emoji: "🌾",
    summary: "Cool-season cereal grown for grain; thrives with 4-6 light irrigations.",
    durationDays: 140,
    waterNeed: "Medium",
    yieldPerAcre: "18-22 quintal",
    soil: {
      type: "Well-drained loam to clay loam",
      ph: "6.0 - 7.5",
      prep: "Two harrowings after pre-sowing irrigation; level the field for uniform moisture.",
    },
    stages: [
      { name: "Sowing", days: "0-7", note: "Seed rate 40 kg/acre at 5 cm depth." },
      { name: "Tillering", days: "20-45", note: "First irrigation at crown root stage (21 days)." },
      { name: "Jointing & Booting", days: "45-80", note: "Top-dress nitrogen after irrigation." },
      { name: "Flowering", days: "80-100", note: "Avoid water stress; critical for grain set." },
      { name: "Grain filling & Harvest", days: "100-140", note: "Harvest at 12-14% grain moisture." },
    ],
    irrigation: [
      "Crown root initiation — 21 days after sowing",
      "Tillering — 45 days",
      "Flowering — 85 days",
      "Milk stage — 105 days",
    ],
    pests: [
      { name: "Aphid", sign: "Sticky leaves, curling tips", control: "Imidacloprid spray at first colony" },
      { name: "Termite", sign: "Wilting seedlings, hollow stems", control: "Chlorpyriphos seed treatment" },
    ],
    diseases: ["Yellow rust", "Loose smut", "Powdery mildew"],
    tips: ["Sow between 1-20 November for best yield", "Rotate with legumes to restore nitrogen"],
  },
  {
    id: "rice",
    name: "Rice",
    category: "Cereal",
    season: "Kharif",
    emoji: "🌾",
    summary: "Monsoon staple grown in puddled fields with standing water.",
    durationDays: 125,
    waterNeed: "High",
    yieldPerAcre: "24-28 quintal",
    soil: {
      type: "Clay or clay loam with good water retention",
      ph: "5.5 - 6.5",
      prep: "Puddle the field and level; maintain strong bunds to hold 5 cm water.",
    },
    stages: [
      { name: "Nursery", days: "0-25", note: "Raise healthy 25-day seedlings." },
      { name: "Transplanting", days: "25-30", note: "2-3 seedlings per hill at 20x15 cm." },
      { name: "Tillering", days: "30-60", note: "Keep 2-5 cm standing water." },
      { name: "Panicle initiation", days: "60-85", note: "Apply potash; never let the field dry." },
      { name: "Ripening & Harvest", days: "85-125", note: "Drain 10 days before harvest." },
    ],
    irrigation: ["Maintain 5 cm standing water till dough stage", "Alternate wetting and drying saves 20% water"],
    pests: [
      { name: "Stem borer", sign: "Dead hearts and white ears", control: "Cartap hydrochloride granules" },
      { name: "Brown plant hopper", sign: "Hopper burn patches", control: "Pymetrozine spray at base of plants" },
    ],
    diseases: ["Bacterial leaf blight", "Blast", "Sheath rot"],
    tips: ["Use certified seed to avoid blast carryover", "Add azolla to cut nitrogen use"],
  },
  {
    id: "cotton",
    name: "Cotton",
    category: "Cash Crop",
    season: "Kharif",
    emoji: "🌱",
    summary: "Long-duration fibre crop needing warm days and careful pest scouting.",
    durationDays: 180,
    waterNeed: "Medium",
    yieldPerAcre: "8-12 quintal",
    soil: {
      type: "Deep black cotton soil",
      ph: "6.0 - 8.0",
      prep: "Deep ploughing once every three years; form ridges and furrows.",
    },
    stages: [
      { name: "Sowing", days: "0-10", note: "Spacing 90x60 cm, one seed per hill." },
      { name: "Vegetative", days: "10-55", note: "Two weedings; monitor sucking pests weekly." },
      { name: "Square & Flowering", days: "55-100", note: "Peak nutrient demand." },
      { name: "Boll development", days: "100-150", note: "Avoid moisture stress for bigger bolls." },
      { name: "Picking", days: "150-180", note: "Pick dry, fully opened bolls in 3-4 rounds." },
    ],
    irrigation: ["Every 12-15 days in vegetative phase", "Critical at flowering and boll formation"],
    pests: [
      { name: "Pink bollworm", sign: "Rosetted flowers, damaged seeds", control: "Pheromone traps + timely spray" },
      { name: "Whitefly", sign: "Sooty mould on leaves", control: "Diafenthiuron spray, remove alternate hosts" },
    ],
    diseases: ["Wilt", "Leaf curl virus", "Alternaria leaf spot"],
    tips: ["Install 8 pheromone traps per acre", "Destroy crop residues to break pest cycle"],
  },
  {
    id: "tomato",
    name: "Tomato",
    category: "Vegetable",
    season: "Year-round",
    emoji: "🍅",
    summary: "High-value vegetable; staking and steady moisture drive fruit quality.",
    durationDays: 110,
    waterNeed: "Medium",
    yieldPerAcre: "100-140 quintal",
    soil: {
      type: "Sandy loam rich in organic matter",
      ph: "6.0 - 7.0",
      prep: "Add 8 tonnes farmyard manure per acre; make raised beds for drainage.",
    },
    stages: [
      { name: "Nursery", days: "0-25", note: "Treat seed with Trichoderma before sowing." },
      { name: "Transplanting", days: "25-30", note: "60x45 cm on raised beds." },
      { name: "Vegetative", days: "30-55", note: "Stake plants and remove lower leaves." },
      { name: "Flowering & fruit set", days: "55-80", note: "Boron spray improves fruit set." },
      { name: "Harvest", days: "80-110", note: "Pick at breaker stage for distant markets." },
    ],
    irrigation: ["Drip 4-6 litres per plant per day", "Avoid overhead watering to reduce blight"],
    pests: [
      { name: "Fruit borer", sign: "Bored holes in fruit", control: "Bt spray or emamectin benzoate" },
      { name: "Leaf miner", sign: "Silvery serpentine trails", control: "Neem oil 3 ml/litre" },
    ],
    diseases: ["Early blight", "Late blight", "Bacterial wilt", "Leaf curl virus"],
    tips: ["Mulch with straw to stabilise soil moisture", "Rotate away from potato and chilli"],
  },
  {
    id: "potato",
    name: "Potato",
    category: "Vegetable",
    season: "Rabi",
    emoji: "🥔",
    summary: "Cool-weather tuber crop; earthing up and blight watch are essential.",
    durationDays: 95,
    waterNeed: "Medium",
    yieldPerAcre: "90-120 quintal",
    soil: {
      type: "Loose sandy loam",
      ph: "5.5 - 6.5",
      prep: "Fine tilth with ridges 60 cm apart; ensure no clods over the seed tubers.",
    },
    stages: [
      { name: "Planting", days: "0-10", note: "Well-sprouted seed tubers 20 cm apart." },
      { name: "Sprout emergence", days: "10-25", note: "Light irrigation; first earthing up." },
      { name: "Tuber initiation", days: "25-50", note: "Second earthing up plus nitrogen." },
      { name: "Tuber bulking", days: "50-80", note: "Keep soil evenly moist; scout for blight." },
      { name: "Maturity & harvest", days: "80-95", note: "Dehaulm 10 days before digging." },
    ],
    irrigation: ["Light irrigation every 7-10 days", "Stop irrigation 10 days before harvest"],
    pests: [
      { name: "Potato tuber moth", sign: "Tunnels in stored tubers", control: "Store cool; use pheromone traps" },
      { name: "Cutworm", sign: "Cut seedlings at soil line", control: "Evening chlorpyriphos drench" },
    ],
    diseases: ["Late blight", "Black scurf", "Common scab"],
    tips: ["Spray mancozeb preventively in foggy weather", "Use disease-free certified seed each season"],
  },
  {
    id: "maize",
    name: "Maize",
    category: "Cereal",
    season: "Kharif",
    emoji: "🌽",
    summary: "Fast-growing cereal for grain, fodder and silage in many seasons.",
    durationDays: 100,
    waterNeed: "Medium",
    yieldPerAcre: "22-28 quintal",
    soil: {
      type: "Well-drained fertile loam",
      ph: "5.8 - 7.5",
      prep: "One deep ploughing plus two harrowings; provide drainage channels.",
    },
    stages: [
      { name: "Sowing", days: "0-7", note: "60x20 cm spacing, 8 kg seed per acre." },
      { name: "Knee-high", days: "20-35", note: "Top dress nitrogen and earth up." },
      { name: "Tasselling", days: "45-60", note: "Most water-sensitive stage." },
      { name: "Grain filling", days: "60-85", note: "Watch for fall armyworm windows." },
      { name: "Harvest", days: "85-100", note: "Harvest when husks dry and kernels dent." },
    ],
    irrigation: ["Irrigate every 8-10 days", "Never stress at tasselling and silking"],
    pests: [
      { name: "Fall armyworm", sign: "Ragged whorl leaves, moist frass", control: "Spinetoram in the whorl at dusk" },
      { name: "Shoot fly", sign: "Dead heart in young plants", control: "Seed treatment with thiamethoxam" },
    ],
    diseases: ["Turcicum leaf blight", "Downy mildew", "Charcoal rot"],
    tips: ["Intercrop with cowpea for soil health", "Avoid waterlogging — maize hates standing water"],
  },
  {
    id: "sugarcane",
    name: "Sugarcane",
    category: "Cash Crop",
    season: "Year-round",
    emoji: "🎋",
    summary: "Long-duration cane crop with heavy water and nutrient demand.",
    durationDays: 330,
    waterNeed: "High",
    yieldPerAcre: "350-420 quintal",
    soil: {
      type: "Deep medium-heavy loam",
      ph: "6.5 - 7.5",
      prep: "Deep ploughing and furrows 90 cm apart with generous organic matter.",
    },
    stages: [
      { name: "Germination", days: "0-45", note: "Three-budded setts treated against scale." },
      { name: "Tillering", days: "45-120", note: "Earth up and apply nitrogen in splits." },
      { name: "Grand growth", days: "120-270", note: "Peak water demand; propping prevents lodging." },
      { name: "Maturity", days: "270-330", note: "Withhold water 3 weeks before harvest." },
    ],
    irrigation: ["Every 7 days in summer, 15 days in winter", "Trench planting saves 30% water"],
    pests: [
      { name: "Early shoot borer", sign: "Dead heart with rotten smell", control: "Trash mulching + chlorantraniliprole" },
      { name: "Pyrilla", sign: "Sooty mould, honeydew", control: "Release Epiricania parasitoid" },
    ],
    diseases: ["Red rot", "Smut", "Grassy shoot"],
    tips: ["Replace seed cane every 3 years", "Trash mulch conserves moisture and blocks weeds"],
  },
  {
    id: "onion",
    name: "Onion",
    category: "Vegetable",
    season: "Rabi",
    emoji: "🧅",
    summary: "Bulb crop that needs steady moisture early and dry curing at the end.",
    durationDays: 120,
    waterNeed: "Medium",
    yieldPerAcre: "100-130 quintal",
    soil: {
      type: "Friable sandy loam",
      ph: "6.0 - 7.0",
      prep: "Fine tilth flat beds; avoid fresh manure which causes thick necks.",
    },
    stages: [
      { name: "Nursery", days: "0-40", note: "Raised nursery beds; thin seedlings for strength." },
      { name: "Transplanting", days: "40-50", note: "15x10 cm spacing on flat beds." },
      { name: "Vegetative", days: "50-80", note: "Two weedings; sulphur boosts pungency." },
      { name: "Bulb development", days: "80-105", note: "Keep soil moist but never soggy." },
      { name: "Maturity & curing", days: "105-120", note: "Harvest at 50% neck fall; cure in shade 10 days." },
    ],
    irrigation: ["Every 8-10 days", "Stop 15 days before harvest for better storage"],
    pests: [
      { name: "Thrips", sign: "Silvery streaks, twisted leaves", control: "Fipronil with sticker spray" },
      { name: "Onion maggot", sign: "Wilted seedlings, rotting bulb base", control: "Soil drench and crop rotation" },
    ],
    diseases: ["Purple blotch", "Stemphylium blight", "Basal rot"],
    tips: ["Add sticker to sprays — onion leaves shed water", "Cure well before storage to cut losses"],
  },
];

export type Pesticide = {
  id: string;
  name: string;
  activeIngredient: string;
  type: "Insecticide" | "Fungicide" | "Herbicide" | "Bio-pesticide";
  crops: string[];
  targets: string[];
  dosagePerAcre: string;
  interval: string;
  phi: string;
  toxicity: "Low" | "Moderate" | "High";
  safety: string[];
};

export const pesticides: Pesticide[] = [
  {
    id: "imidacloprid",
    name: "Imidacloprid 17.8% SL",
    activeIngredient: "Imidacloprid",
    type: "Insecticide",
    crops: ["Wheat", "Cotton", "Rice"],
    targets: ["Aphid", "Jassid", "Whitefly"],
    dosagePerAcre: "60-80 ml in 200 litres water",
    interval: "Repeat after 15 days if pests persist",
    phi: "Pre-harvest interval 21 days",
    toxicity: "Moderate",
    safety: [
      "Wear gloves, mask and full sleeves while mixing",
      "Do not spray during bee foraging hours",
      "Bathe and change clothes after application",
    ],
  },
  {
    id: "spinetoram",
    name: "Spinetoram 11.7% SC",
    activeIngredient: "Spinetoram",
    type: "Insecticide",
    crops: ["Maize", "Tomato", "Onion"],
    targets: ["Fall armyworm", "Thrips", "Fruit borer"],
    dosagePerAcre: "180 ml in 200 litres water",
    interval: "Two sprays 12 days apart",
    phi: "Pre-harvest interval 5 days",
    toxicity: "Low",
    safety: [
      "Spray directly into the whorl at dusk for armyworm",
      "Avoid drift onto water bodies",
      "Keep livestock out of the field for 24 hours",
    ],
  },
  {
    id: "mancozeb",
    name: "Mancozeb 75% WP",
    activeIngredient: "Mancozeb",
    type: "Fungicide",
    crops: ["Potato", "Tomato", "Onion", "Wheat"],
    targets: ["Late blight", "Early blight", "Purple blotch", "Rust"],
    dosagePerAcre: "600-800 g in 200 litres water",
    interval: "Preventive spray every 10 days in humid weather",
    phi: "Pre-harvest interval 7 days",
    toxicity: "Low",
    safety: [
      "Add a sticker in rainy weather",
      "Do not mix with alkaline solutions",
      "Wash sprayer thoroughly after use",
    ],
  },
  {
    id: "chlorantraniliprole",
    name: "Chlorantraniliprole 18.5% SC",
    activeIngredient: "Chlorantraniliprole",
    type: "Insecticide",
    crops: ["Rice", "Sugarcane", "Cotton", "Tomato"],
    targets: ["Stem borer", "Early shoot borer", "Pink bollworm"],
    dosagePerAcre: "60 ml in 200 litres water",
    interval: "Single spray at pest threshold, repeat after 20 days",
    phi: "Pre-harvest interval 15 days",
    toxicity: "Low",
    safety: [
      "Ensure thorough stem and base coverage",
      "Safe to most natural enemies at label dose",
      "Store in original container away from food",
    ],
  },
  {
    id: "neem",
    name: "Neem oil 1500 ppm",
    activeIngredient: "Azadirachtin",
    type: "Bio-pesticide",
    crops: ["Tomato", "Onion", "Potato", "Cotton"],
    targets: ["Leaf miner", "Aphid", "Mite", "Early larvae"],
    dosagePerAcre: "600 ml in 200 litres water with soap emulsifier",
    interval: "Every 7-10 days as a rotation partner",
    phi: "No waiting period needed",
    toxicity: "Low",
    safety: [
      "Spray in the evening to avoid leaf burn",
      "Emulsify well or oil will separate in the tank",
      "Safe for organic certified plots",
    ],
  },
  {
    id: "pymetrozine",
    name: "Pymetrozine 50% WG",
    activeIngredient: "Pymetrozine",
    type: "Insecticide",
    crops: ["Rice"],
    targets: ["Brown plant hopper", "White backed plant hopper"],
    dosagePerAcre: "120 g in 200 litres water",
    interval: "Once at hopper build-up; second only if needed",
    phi: "Pre-harvest interval 14 days",
    toxicity: "Low",
    safety: [
      "Direct the spray to the base of the plants",
      "Drain excess water before spraying",
      "Do not overuse — rotate chemical groups",
    ],
  },
  {
    id: "glyphosate",
    name: "Glyphosate 41% SL",
    activeIngredient: "Glyphosate",
    type: "Herbicide",
    crops: ["Sugarcane", "Cotton"],
    targets: ["Perennial grasses", "Broadleaf weeds"],
    dosagePerAcre: "1.0-1.6 litres in 150 litres water",
    interval: "Non-selective — apply only on weeds between rows",
    phi: "Do not apply within 15 days of harvest",
    toxicity: "Moderate",
    safety: [
      "Use a hood or shield to prevent crop drift",
      "Never spray on windy days",
      "Wear goggles — the spray irritates eyes",
    ],
  },
  {
    id: "trichoderma",
    name: "Trichoderma viride 1% WP",
    activeIngredient: "Trichoderma viride",
    type: "Bio-pesticide",
    crops: ["Tomato", "Potato", "Wheat", "Onion"],
    targets: ["Damping off", "Wilt", "Root rot"],
    dosagePerAcre: "2 kg mixed with 100 kg farmyard manure",
    interval: "Apply at land preparation and again at 40 days",
    phi: "No waiting period needed",
    toxicity: "Low",
    safety: [
      "Do not mix with chemical fungicides",
      "Store below 30°C away from sunlight",
      "Apply to moist soil for best colonisation",
    ],
  },
];

export type Fertilizer = {
  id: string;
  name: string;
  category: "Organic" | "Inorganic" | "Biofertilizer";
  nutrients: string;
  dosePerAcre: string;
  timing: string;
  bestFor: string[];
  notes: string;
};

export const fertilizers: Fertilizer[] = [
  {
    id: "fym",
    name: "Farmyard Manure",
    category: "Organic",
    nutrients: "0.5% N, 0.2% P, 0.5% K + organic carbon",
    dosePerAcre: "8-10 tonnes",
    timing: "3 weeks before sowing, incorporated into soil",
    bestFor: ["Tomato", "Potato", "Onion", "Sugarcane"],
    notes: "Use only fully decomposed manure — raw manure attracts termites and weed seeds.",
  },
  {
    id: "vermicompost",
    name: "Vermicompost",
    category: "Organic",
    nutrients: "1.5% N, 1% P, 1.2% K + microbes",
    dosePerAcre: "2 tonnes",
    timing: "At final land preparation or as a top dressing",
    bestFor: ["Tomato", "Onion", "Vegetables"],
    notes: "Improves soil structure and water holding; excellent for nursery mixes.",
  },
  {
    id: "greenmanure",
    name: "Green Manure (Sunhemp)",
    category: "Organic",
    nutrients: "Adds 25-30 kg N per acre",
    dosePerAcre: "20 kg seed, incorporate at 45 days",
    timing: "Pre-season, before the main crop",
    bestFor: ["Rice", "Sugarcane", "Maize"],
    notes: "Cheapest way to lift organic carbon in tired soils.",
  },
  {
    id: "urea",
    name: "Urea (46% N)",
    category: "Inorganic",
    nutrients: "46% Nitrogen",
    dosePerAcre: "50-110 kg depending on crop",
    timing: "Split doses — basal, tillering and flowering",
    bestFor: ["Wheat", "Rice", "Maize", "Sugarcane"],
    notes: "Apply to moist soil and irrigate lightly to limit volatilisation losses.",
  },
  {
    id: "dap",
    name: "DAP (18-46-0)",
    category: "Inorganic",
    nutrients: "18% N, 46% Phosphorus",
    dosePerAcre: "50-60 kg",
    timing: "Full dose as basal at sowing",
    bestFor: ["Wheat", "Cotton", "Potato", "Maize"],
    notes: "Place below seed level; never broadcast on the surface.",
  },
  {
    id: "mop",
    name: "Muriate of Potash",
    category: "Inorganic",
    nutrients: "60% Potassium",
    dosePerAcre: "25-40 kg",
    timing: "Basal plus one top dressing at fruit or tuber set",
    bestFor: ["Potato", "Tomato", "Sugarcane", "Onion"],
    notes: "Improves fruit firmness, tuber quality and disease tolerance.",
  },
  {
    id: "zinc",
    name: "Zinc Sulphate",
    category: "Inorganic",
    nutrients: "21% Zinc",
    dosePerAcre: "10 kg soil or 0.5% foliar spray",
    timing: "Basal, or foliar at first deficiency symptoms",
    bestFor: ["Rice", "Wheat", "Maize"],
    notes: "Interveinal yellowing in young leaves usually means zinc, not nitrogen.",
  },
  {
    id: "rhizobium",
    name: "Rhizobium Culture",
    category: "Biofertilizer",
    nutrients: "Fixes atmospheric nitrogen in legume roots",
    dosePerAcre: "200 g per 10 kg seed",
    timing: "Seed treatment just before sowing",
    bestFor: ["Pulses", "Groundnut", "Cowpea"],
    notes: "Keep treated seed in the shade and sow the same day.",
  },
  {
    id: "azotobacter",
    name: "Azotobacter",
    category: "Biofertilizer",
    nutrients: "Free-living nitrogen fixer, 15-20 kg N per acre",
    dosePerAcre: "2 kg with farmyard manure",
    timing: "Soil application at sowing",
    bestFor: ["Wheat", "Maize", "Cotton", "Tomato"],
    notes: "Works best when soil organic carbon is above 0.5%.",
  },
  {
    id: "psb",
    name: "Phosphate Solubilising Bacteria",
    category: "Biofertilizer",
    nutrients: "Releases locked soil phosphorus",
    dosePerAcre: "2 kg with compost",
    timing: "At land preparation",
    bestFor: ["Wheat", "Potato", "Onion", "Pulses"],
    notes: "Can cut phosphorus fertiliser needs by about 25%.",
  },
  {
    id: "mycorrhiza",
    name: "Mycorrhiza (VAM)",
    category: "Biofertilizer",
    nutrients: "Extends root reach for water and nutrients",
    dosePerAcre: "4 kg granules in the root zone",
    timing: "At transplanting",
    bestFor: ["Tomato", "Onion", "Sugarcane"],
    notes: "Especially valuable in sandy soils and under drought stress.",
  },
];

export type Forecast = {
  day: string;
  date: string;
  condition: "Sunny" | "Partly Cloudy" | "Cloudy" | "Rain" | "Thunderstorm";
  high: number;
  low: number;
  rainChance: number;
  humidity: number;
  wind: number;
  advisory: string;
};

export const forecast: Forecast[] = [
  {
    day: "Today",
    date: "Wed 9 Sep",
    condition: "Partly Cloudy",
    high: 32,
    low: 24,
    rainChance: 20,
    humidity: 68,
    wind: 11,
    advisory: "Good window for spraying before noon. Wind is calm and skies are clearing.",
  },
  {
    day: "Thursday",
    date: "Thu 10 Sep",
    condition: "Rain",
    high: 29,
    low: 23,
    rainChance: 80,
    humidity: 84,
    wind: 16,
    advisory: "Skip irrigation and fertiliser application — rain will wash nutrients away.",
  },
  {
    day: "Friday",
    date: "Fri 11 Sep",
    condition: "Thunderstorm",
    high: 28,
    low: 22,
    rainChance: 90,
    humidity: 88,
    wind: 24,
    advisory: "Stake tall crops and clear drainage channels. High blight risk in tomato and potato.",
  },
  {
    day: "Saturday",
    date: "Sat 12 Sep",
    condition: "Cloudy",
    high: 30,
    low: 23,
    rainChance: 40,
    humidity: 79,
    wind: 13,
    advisory: "Humid and still — scout for fungal spots on lower leaves.",
  },
  {
    day: "Sunday",
    date: "Sun 13 Sep",
    condition: "Sunny",
    high: 34,
    low: 25,
    rainChance: 5,
    humidity: 58,
    wind: 9,
    advisory: "Ideal for harvesting and drying. Resume irrigation in the evening.",
  },
];

export const weatherNow = {
  location: "Warangal, Telangana",
  temp: 31,
  feelsLike: 34,
  condition: "Partly Cloudy",
  humidity: 68,
  wind: 11,
  rainfall: 4.2,
  uv: 7,
  soilMoisture: 62,
  sunrise: "6:02 AM",
  sunset: "6:24 PM",
};

export type Alert = {
  id: string;
  title: string;
  detail: string;
  category: "Weather" | "Pest" | "Irrigation" | "Task" | "Market";
  severity: "Critical" | "Warning" | "Info";
  time: string;
  read: boolean;
};

export const alerts: Alert[] = [
  {
    id: "a1",
    title: "Heavy rain warning for Friday",
    detail: "90% chance of thunderstorms with 24 km/h winds. Clear drains and stake tall crops today.",
    category: "Weather",
    severity: "Critical",
    time: "20 minutes ago",
    read: false,
  },
  {
    id: "a2",
    title: "Fall armyworm threshold crossed in Field B",
    detail: "6 of 20 maize plants show fresh whorl damage. Spray spinetoram at dusk within 48 hours.",
    category: "Pest",
    severity: "Critical",
    time: "2 hours ago",
    read: false,
  },
  {
    id: "a3",
    title: "Late blight risk high for tomato",
    detail: "Humidity above 85% for three nights. Apply a preventive mancozeb spray before the rain.",
    category: "Pest",
    severity: "Warning",
    time: "5 hours ago",
    read: false,
  },
  {
    id: "a4",
    title: "Skip today's irrigation in Field A",
    detail: "Soil moisture is 62% and rain is expected tomorrow. Delay watering by two days.",
    category: "Irrigation",
    severity: "Info",
    time: "Yesterday",
    read: true,
  },
  {
    id: "a5",
    title: "Nitrogen top dressing due for wheat",
    detail: "Field C wheat reaches tillering in 3 days. Keep 30 kg urea per acre ready.",
    category: "Task",
    severity: "Warning",
    time: "Yesterday",
    read: true,
  },
  {
    id: "a6",
    title: "Onion prices up 12% this week",
    detail: "Local mandi average is ₹2,240 per quintal. Consider staggering your sale.",
    category: "Market",
    severity: "Info",
    time: "2 days ago",
    read: true,
  },
];

export type Task = {
  id: string;
  title: string;
  field: string;
  due: string;
  priority: "High" | "Medium" | "Low";
  done: boolean;
};

export const tasks: Task[] = [
  { id: "t1", title: "Spray spinetoram on maize whorls", field: "Field B", due: "Today, evening", priority: "High", done: false },
  { id: "t2", title: "Clear drainage channels before storm", field: "All fields", due: "Today", priority: "High", done: false },
  { id: "t3", title: "Preventive mancozeb spray on tomato", field: "Field D", due: "Tomorrow", priority: "Medium", done: false },
  { id: "t4", title: "Second earthing up for potato", field: "Field E", due: "In 3 days", priority: "Medium", done: false },
  { id: "t5", title: "Nitrogen top dressing for wheat", field: "Field C", due: "In 4 days", priority: "Medium", done: false },
  { id: "t6", title: "Refill pheromone trap lures", field: "Field A", due: "This week", priority: "Low", done: true },
];

export const recommendations = [
  {
    title: "Delay irrigation by two days",
    body: "Soil moisture is comfortable at 62% and 80% rain is forecast tomorrow. You will save roughly 40,000 litres.",
    tag: "Water saving",
  },
  {
    title: "Rotate your insecticide group",
    body: "Field B has had two imidacloprid sprays this season. Switch to spinetoram to prevent resistance build-up.",
    tag: "Pest control",
  },
  {
    title: "Add biofertiliser at next top dressing",
    body: "Azotobacter with your compost can replace about 15 kg of urea per acre in wheat and maize.",
    tag: "Soil health",
  },
  {
    title: "Harvest onion at 50% neck fall",
    body: "Field F onion is 104 days old. Stop irrigation now so bulbs cure properly before storage.",
    tag: "Harvest timing",
  },
];

export const farmMetrics = [
  { label: "Total farm area", value: "24 acres", change: "6 active fields", icon: "land" },
  { label: "Active crops", value: "5", change: "Wheat, Maize, Tomato, Potato, Onion", icon: "crop" },
  { label: "Estimated yield", value: "182 qtl", change: "+8% vs last season", icon: "yield" },
  { label: "Soil moisture", value: "62%", change: "Healthy range", icon: "water" },
];

export type Diagnosis = {
  disease: string;
  crop: string;
  confidence: number;
  severity: "Mild" | "Moderate" | "Severe";
  summary: string;
  treatment: string[];
  prevention: string[];
};

export const diagnoses: Diagnosis[] = [
  {
    disease: "Tomato Late Blight",
    crop: "Tomato",
    confidence: 94,
    severity: "Moderate",
    summary:
      "Water-soaked grey-green patches with pale margins on the leaf, typical of Phytophthora infestans spreading in humid weather.",
    treatment: [
      "Remove and burn heavily infected leaves — do not compost them",
      "Spray metalaxyl + mancozeb 600 g per acre immediately",
      "Repeat after 8 days with cymoxanil + mancozeb to avoid resistance",
    ],
    prevention: [
      "Avoid overhead irrigation; switch to drip",
      "Keep 60x45 cm spacing for airflow",
      "Mulch soil to stop spore splash onto lower leaves",
    ],
  },
  {
    disease: "Wheat Yellow Rust",
    crop: "Wheat",
    confidence: 91,
    severity: "Mild",
    summary:
      "Yellow-orange pustules arranged in stripes along the leaf veins — an early yellow rust infection that spreads fast in cool, moist mornings.",
    treatment: [
      "Spray propiconazole 200 ml per acre in 200 litres water",
      "Cover both leaf surfaces; repeat after 15 days if pustules continue",
      "Avoid extra nitrogen while the infection is active",
    ],
    prevention: [
      "Grow rust-resistant varieties next season",
      "Sow on time — late-sown wheat suffers most",
      "Destroy volunteer wheat plants that harbour spores",
    ],
  },
  {
    disease: "Maize Fall Armyworm Damage",
    crop: "Maize",
    confidence: 88,
    severity: "Severe",
    summary:
      "Ragged window-pane feeding in the whorl with moist sawdust-like frass, showing an active fall armyworm larval population.",
    treatment: [
      "Apply spinetoram 180 ml per acre directly into the whorl at dusk",
      "Hand-pick large larvae and egg masses where possible",
      "Follow up with sand + ash whorl application in young plants",
    ],
    prevention: [
      "Install 5 pheromone traps per acre for early detection",
      "Intercrop with pulses to support natural enemies",
      "Scout 20 plants twice a week during vegetative growth",
    ],
  },
  {
    disease: "Potato Early Blight",
    crop: "Potato",
    confidence: 89,
    severity: "Moderate",
    summary:
      "Dark brown lesions with concentric rings and a yellow halo on older leaves — classic Alternaria solani early blight.",
    treatment: [
      "Spray mancozeb 75% WP 800 g per acre",
      "Remove badly affected lower foliage",
      "Alternate with azoxystrobin after 10 days",
    ],
    prevention: [
      "Rotate away from tomato and brinjal",
      "Maintain balanced potash nutrition",
      "Irrigate in the morning so leaves dry by evening",
    ],
  },
];

export const cropNames = crops.map((c) => c.name);
