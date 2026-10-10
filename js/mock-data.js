/**
 * Centralized mock data for Nigerian Adult Relationship Directory
 * All profiles are fictional adults 18+.
 * Future backend integration points marked with // TODO: API
 */

const NIGERIAN_STATES = {
  abia: { name: "Abia", cities: ["Umuahia", "Aba", "Arochukwu"] },
  adamawa: { name: "Adamawa", cities: ["Yola", "Mubi", "Jimeta"] },
  akwaibom: { name: "Akwa Ibom", cities: ["Uyo", "Eket", "Ikot Ekpene"] },
  anambra: { name: "Anambra", cities: ["Awka", "Onitsha", "Nnewi"] },
  bauchi: { name: "Bauchi", cities: ["Bauchi", "Azare"] },
  bayelsa: { name: "Bayelsa", cities: ["Yenagoa", "Brass"] },
  benue: { name: "Benue", cities: ["Makurdi", "Gboko"] },
  borno: { name: "Borno", cities: ["Maiduguri", "Biu"] },
  crossriver: { name: "Cross River", cities: ["Calabar", "Ikom"] },
  delta: { name: "Delta", cities: ["Asaba", "Warri", "Sapele", "Ughelli"] },
  ebonyi: { name: "Ebonyi", cities: ["Abakaliki", "Afikpo"] },
  edo: { name: "Edo", cities: ["Benin City", "Auchi", "Ekpoma"] },
  ekiti: { name: "Ekiti", cities: ["Ado-Ekiti", "Ikere"] },
  enugu: { name: "Enugu", cities: ["Enugu", "Nsukka"] },
  fct: { name: "FCT", cities: ["Abuja", "Wuse", "Gwarinpa", "Maitama", "Garki", "Asokoro"] },
  gombe: { name: "Gombe", cities: ["Gombe"] },
  imo: { name: "Imo", cities: ["Owerri", "Orlu"] },
  jigawa: { name: "Jigawa", cities: ["Dutse", "Hadejia"] },
  kaduna: { name: "Kaduna", cities: ["Kaduna", "Zaria", "Kafanchan"] },
  kano: { name: "Kano", cities: ["Kano", "Nassarawa"] },
  katsina: { name: "Katsina", cities: ["Katsina", "Daura"] },
  kebbi: { name: "Kebbi", cities: ["Birnin Kebbi", "Argungu"] },
  kogi: { name: "Kogi", cities: ["Lokoja", "Okene"] },
  kwara: { name: "Kwara", cities: ["Ilorin", "Offa"] },
  lagos: { name: "Lagos", cities: ["Ikeja", "Lekki", "Ajah", "Surulere", "Victoria Island", "Yaba", "Ikoyi", "Apapa", "Maryland"] },
  nasarawa: { name: "Nasarawa", cities: ["Lafia", "Keffi"] },
  niger: { name: "Niger", cities: ["Minna", "Suleja"] },
  ogun: { name: "Ogun", cities: ["Abeokuta", "Ijebu Ode", "Sango Ota"] },
  ondo: { name: "Ondo", cities: ["Akure", "Ondo", "Owo"] },
  osun: { name: "Osun", cities: ["Osogbo", "Ile-Ife"] },
  oyo: { name: "Oyo", cities: ["Ibadan", "Ogbomosho", "Oyo"] },
  plateau: { name: "Plateau", cities: ["Jos", "Bukuru"] },
  rivers: { name: "Rivers", cities: ["Port Harcourt", "Obio-Akpor", "Bonny"] },
  sokoto: { name: "Sokoto", cities: ["Sokoto"] },
  taraba: { name: "Taraba", cities: ["Jalingo"] },
  yobe: { name: "Yobe", cities: ["Damaturu"] },
  zamfara: { name: "Zamfara", cities: ["Gusau"] }
};

const RELATIONSHIP_INTERESTS = [
  { id: "sugar-dating", label: "Sugar Dating", description: "Mutually beneficial arrangements" },
  { id: "companionship", label: "Companionship", description: "Quality time and shared experiences" },
  { id: "dating", label: "Dating", description: "Traditional or modern dating" },
  { id: "casual", label: "Casual Connections", description: "Relaxed, no-pressure interactions" },
  { id: "travel", label: "Travel Companion", description: "Explore together" },
  { id: "mentorship", label: "Mentorship", description: "Guidance and support" },
  { id: "lifestyle", label: "Lifestyle Partner", description: "Shared luxury and experiences" }
];

const MOCK_PROFILES = [
  {
    id: "adaeze-001",
    displayName: "Adaeze",
    age: 26,
    state: "lagos",
    city: "Lekki",
    bio: "Creative professional who enjoys fine dining, art exhibitions, and meaningful conversations. Looking for a respectful gentleman who values quality time and genuine connection.",
    interests: ["sugar-dating", "companionship", "lifestyle"],
    languages: ["English", "Igbo", "Yoruba"],
    verified: true,
    contactEnabled: true,
    whatsappEnabled: true,
    phoneVisible: false,
    photos: [
      "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=400&h=500&fit=crop&crop=face",
      "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=400&h=500&fit=crop&crop=face"
    ],
    shortIntro: "Elegant, ambitious, and always ready for new experiences.",
    joined: "2025-11",
    status: "active"
  },
  {
    id: "chioma-002",
    displayName: "Chioma",
    age: 24,
    state: "fct",
    city: "Maitama",
    bio: "Finance graduate living in Abuja. I love weekend getaways, good books, and deep conversations over wine. Seeking a mature partner who appreciates discretion and class.",
    interests: ["sugar-dating", "dating", "travel"],
    languages: ["English", "Igbo"],
    verified: true,
    contactEnabled: true,
    whatsappEnabled: true,
    phoneVisible: false,
    photos: [
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=500&fit=crop&crop=face",
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=500&fit=crop&crop=face"
    ],
    shortIntro: "Sophisticated Abuja-based professional seeking genuine connection.",
    joined: "2025-12",
    status: "active"
  },
  {
    id: "funke-003",
    displayName: "Funke",
    age: 29,
    state: "lagos",
    city: "Victoria Island",
    bio: "Entrepreneur and lifestyle enthusiast. I value honesty, ambition, and mutual respect. Looking for someone who enjoys the finer things and can keep up with my energy.",
    interests: ["companionship", "lifestyle", "travel"],
    languages: ["English", "Yoruba"],
    verified: true,
    contactEnabled: true,
    whatsappEnabled: true,
    phoneVisible: true,
    photos: [
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=500&fit=crop&crop=face",
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=500&fit=crop&crop=face"
    ],
    shortIntro: "VI-based entrepreneur who loves travel and fine living.",
    joined: "2025-10",
    status: "active"
  },
  {
    id: "amara-004",
    displayName: "Amara",
    age: 22,
    state: "rivers",
    city: "Port Harcourt",
    bio: "University student with a passion for fashion and photography. Seeking a supportive companion who understands ambition and enjoys exploring the city together.",
    interests: ["sugar-dating", "companionship", "casual"],
    languages: ["English", "Igbo"],
    verified: false,
    contactEnabled: true,
    whatsappEnabled: true,
    phoneVisible: false,
    photos: [
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&h=500&fit=crop&crop=face",
      "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=400&h=500&fit=crop&crop=face"
    ],
    shortIntro: "Creative student in Port Harcourt seeking genuine support.",
    joined: "2026-01",
    status: "active"
  },
  {
    id: "blessing-005",
    displayName: "Blessing",
    age: 31,
    state: "oyo",
    city: "Ibadan",
    bio: "Businesswoman and mother of one. I appreciate mature conversations, quiet evenings, and occasional luxury escapes. Looking for a respectful and understanding partner.",
    interests: ["companionship", "dating", "mentorship"],
    languages: ["English", "Yoruba"],
    verified: true,
    contactEnabled: true,
    whatsappEnabled: false,
    phoneVisible: false,
    photos: [
      "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=400&h=500&fit=crop&crop=face",
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=500&fit=crop&crop=face"
    ],
    shortIntro: "Mature professional in Ibadan seeking quality companionship.",
    joined: "2025-09",
    status: "active"
  },
  {
    id: "nneka-006",
    displayName: "Nneka",
    age: 27,
    state: "enugu",
    city: "Enugu",
    bio: "Architect with a love for design, good food, and weekend road trips. Seeking someone who values intelligence, humor, and shared adventures.",
    interests: ["dating", "companionship", "travel"],
    languages: ["English", "Igbo"],
    verified: true,
    contactEnabled: true,
    whatsappEnabled: true,
    phoneVisible: false,
    photos: [
      "https://images.unsplash.com/photo-1521119989659-a83eee488004?w=400&h=500&fit=crop&crop=face",
      "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=400&h=500&fit=crop&crop=face"
    ],
    shortIntro: "Design-loving professional from Enugu ready for adventure.",
    joined: "2025-11",
    status: "active"
  },
  {
    id: "tola-007",
    displayName: "Tola",
    age: 25,
    state: "lagos",
    city: "Ikeja",
    bio: "Content creator and fashion lover. I enjoy nightlife, beach days, and meaningful talks. Looking for a generous and fun-loving partner who respects boundaries.",
    interests: ["sugar-dating", "casual", "lifestyle"],
    languages: ["English", "Yoruba"],
    verified: false,
    contactEnabled: true,
    whatsappEnabled: true,
    phoneVisible: false,
    photos: [
      "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=400&h=500&fit=crop&crop=face",
      "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=400&h=500&fit=crop&crop=face"
    ],
    shortIntro: "Vibrant content creator based in Ikeja.",
    joined: "2026-02",
    status: "active"
  },
  {
    id: "zainab-008",
    displayName: "Zainab",
    age: 28,
    state: "kano",
    city: "Kano",
    bio: "Educator and community advocate. I value culture, respect, and intellectual stimulation. Seeking a mature partner who appreciates traditional values with a modern outlook.",
    interests: ["dating", "companionship", "mentorship"],
    languages: ["English", "Hausa"],
    verified: true,
    contactEnabled: true,
    whatsappEnabled: true,
    phoneVisible: false,
    photos: [
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=500&fit=crop&crop=face",
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=500&fit=crop&crop=face"
    ],
    shortIntro: "Thoughtful educator from Kano seeking meaningful connection.",
    joined: "2025-08",
    status: "active"
  },
  {
    id: "ifeoma-009",
    displayName: "Ifeoma",
    age: 23,
    state: "anambra",
    city: "Onitsha",
    bio: "Fashion designer in training. Passionate about style, music, and exploring new places. Looking for a supportive partner who encourages growth.",
    interests: ["sugar-dating", "companionship", "travel"],
    languages: ["English", "Igbo"],
    verified: false,
    contactEnabled: true,
    whatsappEnabled: true,
    phoneVisible: false,
    photos: [
      "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=400&h=500&fit=crop&crop=face",
      "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=400&h=500&fit=crop&crop=face"
    ],
    shortIntro: "Aspiring designer from Onitsha with big dreams.",
    joined: "2026-01",
    status: "active"
  },
  {
    id: "esther-010",
    displayName: "Esther",
    age: 33,
    state: "edo",
    city: "Benin City",
    bio: "Healthcare professional who enjoys quiet evenings, good wine, and occasional city escapes. Seeking a respectful gentleman for companionship and shared experiences.",
    interests: ["companionship", "dating", "lifestyle"],
    languages: ["English", "Edo"],
    verified: true,
    contactEnabled: true,
    whatsappEnabled: true,
    phoneVisible: false,
    photos: [
      "https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=400&h=500&fit=crop&crop=face",
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=500&fit=crop&crop=face"
    ],
    shortIntro: "Graceful professional from Benin City seeking quality time.",
    joined: "2025-07",
    status: "active"
  },
  {
    id: "peace-011",
    displayName: "Peace",
    age: 21,
    state: "delta",
    city: "Warri",
    bio: "University student studying business. I love music, dancing, and making new friends. Looking for a kind and generous companion who enjoys fun outings.",
    interests: ["sugar-dating", "casual", "companionship"],
    languages: ["English", "Urhobo"],
    verified: false,
    contactEnabled: true,
    whatsappEnabled: true,
    phoneVisible: false,
    photos: [
      "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=400&h=500&fit=crop&crop=face",
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&h=500&fit=crop&crop=face"
    ],
    shortIntro: "Energetic student from Warri ready for new experiences.",
    joined: "2026-03",
    status: "active"
  },
  {
    id: "halima-012",
    displayName: "Halima",
    age: 30,
    state: "kaduna",
    city: "Kaduna",
    bio: "Civil servant with a passion for literature and travel. Seeking a mature, discreet partner who values intellectual conversation and mutual respect.",
    interests: ["companionship", "dating", "travel"],
    languages: ["English", "Hausa"],
    verified: true,
    contactEnabled: true,
    whatsappEnabled: false,
    phoneVisible: false,
    photos: [
      "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=400&h=500&fit=crop&crop=face",
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=500&fit=crop&crop=face"
    ],
    shortIntro: "Thoughtful professional from Kaduna seeking meaningful bonds.",
    joined: "2025-06",
    status: "active"
  },
  {
    id: "yetunde-013",
    displayName: "Yetunde",
    age: 26,
    state: "ogun",
    city: "Abeokuta",
    bio: "Marketing specialist who enjoys beach trips, good food, and lively conversations. Looking for someone fun, generous, and ready to explore together.",
    interests: ["sugar-dating", "lifestyle", "travel"],
    languages: ["English", "Yoruba"],
    verified: true,
    contactEnabled: true,
    whatsappEnabled: true,
    phoneVisible: false,
    photos: [
      "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=400&h=500&fit=crop&crop=face",
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=500&fit=crop&crop=face"
    ],
    shortIntro: "Outgoing marketer from Abeokuta with a love for adventure.",
    joined: "2025-12",
    status: "active"
  },
  {
    id: "chidinma-014",
    displayName: "Chidinma",
    age: 24,
    state: "imo",
    city: "Owerri",
    bio: "Graduate waiting for the next opportunity. I enjoy cooking, movies, and quiet days. Seeking a supportive partner who believes in growth and mutual care.",
    interests: ["companionship", "sugar-dating", "dating"],
    languages: ["English", "Igbo"],
    verified: false,
    contactEnabled: true,
    whatsappEnabled: true,
    phoneVisible: false,
    photos: [
      "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=400&h=500&fit=crop&crop=face",
      "https://images.unsplash.com/photo-1521119989659-a83eee488004?w=400&h=500&fit=crop&crop=face"
    ],
    shortIntro: "Warm-hearted graduate from Owerri seeking support and connection.",
    joined: "2026-02",
    status: "active"
  },
  {
    id: "aisha-015",
    displayName: "Aisha",
    age: 27,
    state: "fct",
    city: "Gwarinpa",
    bio: "Tech professional living in Abuja. I love coding, coffee, and occasional luxury. Looking for a like-minded partner who values ambition and downtime equally.",
    interests: ["dating", "companionship", "lifestyle"],
    languages: ["English", "Hausa", "Yoruba"],
    verified: true,
    contactEnabled: true,
    whatsappEnabled: true,
    phoneVisible: false,
    photos: [
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=500&fit=crop&crop=face",
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=500&fit=crop&crop=face"
    ],
    shortIntro: "Ambitious tech lady in Gwarinpa seeking balance and connection.",
    joined: "2025-10",
    status: "active"
  }
];

// Helper functions for mock data access
// TODO: API - replace with fetch calls to backend endpoints

function getProfileById(id) {
  return MOCK_PROFILES.find(p => p.id === id) || null;
}

function getProfilesByState(stateSlug) {
  return MOCK_PROFILES.filter(p => p.state === stateSlug && p.status === "active");
}

function getProfilesByCity(stateSlug, city) {
  return MOCK_PROFILES.filter(p => p.state === stateSlug && p.city.toLowerCase() === city.toLowerCase() && p.status === "active");
}

function getProfilesByInterest(interestId) {
  return MOCK_PROFILES.filter(p => p.interests.includes(interestId) && p.status === "active");
}

function getFeaturedProfiles(limit = 6) {
  return MOCK_PROFILES.filter(p => p.verified && p.status === "active").slice(0, limit);
}

function getAllActiveProfiles() {
  return MOCK_PROFILES.filter(p => p.status === "active");
}

function getStateName(slug) {
  return NIGERIAN_STATES[slug] ? NIGERIAN_STATES[slug].name : slug;
}

function getInterestLabel(id) {
  const interest = RELATIONSHIP_INTERESTS.find(i => i.id === id);
  return interest ? interest.label : id;
}

// Export for use in other modules (browser global)
window.MockData = {
  NIGERIAN_STATES,
  RELATIONSHIP_INTERESTS,
  MOCK_PROFILES,
  getProfileById,
  getProfilesByState,
  getProfilesByCity,
  getProfilesByInterest,
  getFeaturedProfiles,
  getAllActiveProfiles,
  getStateName,
  getInterestLabel
};
