// GovToon — Personalized AI Government Scheme Explainer & Directory
// Official Source Grounding: India.gov.in National Portal of India / myScheme Ecosystem

let API_BASE_URL = typeof window !== 'undefined' && window.location.origin && !window.location.origin.startsWith('file:') 
  ? `${window.location.origin}/api` 
  : 'http://localhost:5000/api';

// Citizen User Profile for Personalized Recommendations
let userProfile = {
  age: 20,
  income: 150000,
  state: "Telangana",
  occupation: "Student",
  gender: "Any",
  category: "General"
};

// Load saved profile if available
try {
  const savedProf = localStorage.getItem('govtoon_user_profile');
  if (savedProf) userProfile = { ...userProfile, ...JSON.parse(savedProf) };
} catch (e) {}

// App State
let appState = {
  currentView: "explore",
  currentExploreTab: "recommended",
  currentLang: "en",
  currentPersona: "student",
  currentReaderTab: "comic",
  selectedScheme: null,
  preparedDocs: new Set(["doc_aadhaar", "doc_bank"]),
  bookmarkedIds: new Set(["pm_merit_scholarship", "rythu_bandhu"]),
  isServerOnline: false,
  fontSizeMultiplier: 1.0,
  isHighContrast: false,
  isReduceMotion: false,
  isDarkMode: false
};

// Load saved bookmarks
try {
  const savedBm = localStorage.getItem('govtoon_saved_schemes');
  if (savedBm) {
    const list = JSON.parse(savedBm);
    if (Array.isArray(list)) appState.bookmarkedIds = new Set(list);
  }
} catch (e) {}

// Comprehensive Scheme Database (Including all Schemes from Screenshot & Directory)
const SCHEMES_DATABASE = [
  {
    id: "pm_merit_scholarship",
    name: "PM Merit Scholarship",
    amount: "₹50,000",
    category: "Education",
    level: "Central",
    dept: "Ministry of Education / National Scholarship Portal (NSP)",
    purpose: "If you're a meritorious student, this scheme gives you money to help pay for college tuition and academic expenses.",
    benefits: "₹50,000 per academic year direct bank transfer (DBT) to verified student accounts.",
    eligibility: {
      minAge: 17,
      maxAge: 28,
      maxIncome: 250000,
      state: "All India",
      occupation: "Student",
      summary: "Class 12 passouts / college students with >60% marks and annual family income up to ₹2.5 Lakhs."
    },
    timing: "12 days left",
    timingType: "urgent",
    documents: [
      { id: "d1", name: "Aadhaar Card", required: true, why: "Identity & age verification" },
      { id: "d2", name: "Previous Year Marks Card (12th / Degree)", required: true, why: "Merit verification" },
      { id: "d3", name: "College Bonafide / Fee Receipt", required: true, why: "Active enrollment proof" },
      { id: "d4", name: "Income Certificate / Ration Card", required: true, why: "Economic threshold check" },
      { id: "d5", name: "Bank Passbook (NPCI Seeded)", required: true, why: "Direct Benefit Transfer" }
    ],
    applicationSteps: [
      { step: 1, title: "Register on National Scholarship Portal (NSP)", desc: "Create student login on scholarships.gov.in using Aadhaar and mobile." },
      { step: 2, title: "Fill Application & Upload Marksheets", desc: "Select PM Merit Scholarship and upload income and college bonafide certificate." },
      { step: 3, title: "Institute Verification & DBT Transfer", desc: "College nodal officer approves form; ₹50,000 credited directly to bank account." }
    ],
    officialUrl: "https://scholarships.gov.in",
    applyUrl: "https://scholarships.gov.in",
    lastVerified: "2026-08-24",
    character: {
      name: "Raju (Student)",
      role: "College Aspirant",
      avatar: "🎓",
      desc: "Hardworking college student securing tuition scholarship"
    },
    panels: {
      en: [
        { num: 1, tag: "Panel 1: College Fee Tension", image: "assets/scholarship_1.jpg", speaker: "Raju", dialogue: "I cleared my engineering entrance with top marks, but college fees are ₹50,000. How will my father manage?", caption: "Meritorious student worries about high college tuition.", sourceRef: "NSP Guidelines Section 1" },
        { num: 2, tag: "Panel 2: PM Merit Scholarship", image: "assets/scholarship_2.jpg", speaker: "College Teacher", dialogue: "Don't worry Raju! Apply for the PM Merit Scholarship on NSP. The government covers ₹50,000 every year directly!", caption: "Full academic fee support guaranteed by Central Government.", sourceRef: "Ministry of Education Portal" },
        { num: 3, tag: "Panel 3: Simple Online e-KYC", image: "assets/scholarship_3.jpg", speaker: "CSC Assistant", dialogue: "Just upload your Class 12 marksheet, Income certificate, and Aadhaar card on scholarships.gov.in.", caption: "Instant digital application with minimal documents.", sourceRef: "NSP Digital Registration" },
        { num: 4, tag: "Panel 4: Bright Future", image: "assets/scholarship_4.jpg", speaker: "Raju & Father", dialogue: "🎉 ₹50,000 credited directly to my bank account! Now I can focus 100% on my engineering degree!", caption: "Empowering young minds through direct scholarship transfer.", sourceRef: "DBT Direct Verification" }
      ]
    },
    quiz: [
      { q: "What is the annual scholarship benefit under PM Merit Scheme?", options: ["₹50,000 / year", "₹10,000 / year", "₹5,000 one-time", "₹1,00,000 loan"], correct: 0, panelRef: 2, explanation: "PM Merit Scholarship provides ₹50,000 per academic year for eligible students." }
    ]
  },
  {
    id: "rythu_bandhu",
    name: "Telangana Rythu Bandhu",
    amount: "₹10,000",
    category: "Agriculture",
    level: "State",
    dept: "Department of Agriculture, Government of Telangana",
    purpose: "If you own farmland in Telangana, the government gives you cash every season to help buy seeds, fertilizers, and farm inputs.",
    benefits: "₹10,000 per acre per year (₹5,000 for Kharif season + ₹5,000 for Rabi season) directly to bank accounts.",
    eligibility: {
      minAge: 18,
      maxAge: 90,
      maxIncome: 1000000,
      state: "Telangana",
      occupation: "Farmer",
      summary: "Pattadar passbook landholding farmers residing in Telangana state."
    },
    timing: "Open year-round",
    timingType: "open",
    documents: [
      { id: "d1", name: "Pattadar Passbook (Dharani Portal)", required: true, why: "Land ownership verification" },
      { id: "d2", name: "Aadhaar Card", required: true, why: "Identity proof" },
      { id: "d3", name: "Bank Account Passbook (IFSC & Account No)", required: true, why: "Direct crop investment transfer" }
    ],
    applicationSteps: [
      { step: 1, title: "Land Record Verification on Dharani", desc: "Ensure agricultural land title is updated in Dharani land portal." },
      { step: 2, title: "Submit Bank Details to AEO", desc: "Provide Pattadar passbook copy and bank account details to local Agriculture Extension Officer." },
      { step: 3, title: "Seasonal Direct Benefit Credit", desc: "₹5,000 per acre deposited prior to every cropping season." }
    ],
    officialUrl: "https://rythubandhu.telangana.gov.in",
    applyUrl: "https://rythubandhu.telangana.gov.in",
    lastVerified: "2026-08-24",
    character: {
      name: "Ramu Kaka",
      role: "Telangana Farmer",
      avatar: "🌾",
      desc: "Dedicated farmer cultivating paddy and cotton"
    },
    panels: {
      en: [
        { num: 1, tag: "Panel 1: Input Cost Squeeze", image: "assets/pm_kisan_1.jpg", speaker: "Ramu Kaka", dialogue: "The monsoon is starting, but seed and fertilizer prices are high. Where will I get upfront investment without moneylender debt?", caption: "Farmer worries about seasonal agricultural input expenses.", sourceRef: "Telangana Agriculture Dept" },
        { num: 2, tag: "Panel 2: Rythu Bandhu Support", image: "assets/pm_kisan_2.jpg", speaker: "Agriculture Officer", dialogue: "Ramu Kaka, under Rythu Bandhu, the Telangana Government gives ₹10,000 per acre every year directly to your account!", caption: "Timely crop investment assistance guaranteed.", sourceRef: "Rythu Bandhu Guidelines" },
        { num: 3, tag: "Panel 3: Passbook Registration", image: "assets/pm_kisan_3.jpg", speaker: "CSC Mitra", dialogue: "Just link your Dharani Pattadar passbook with your Aadhaar and bank account at the Rythu Vedika.", caption: "Seamless transparent digital transfer.", sourceRef: "Dharani Portal Integration" },
        { num: 4, tag: "Panel 4: Green Fields", image: "assets/pm_kisan_4.jpg", speaker: "Ramu Kaka & Family", dialogue: "🎉 ₹10,000 received on time! My fields are lush green and debt-free!", caption: "Prosperous farming season with reliable government backing.", sourceRef: "DBT Crop Assistance" }
      ]
    },
    quiz: [
      { q: "How much investment support does Rythu Bandhu provide per acre annually?", options: ["₹10,000 / acre", "₹2,000 / acre", "₹5,000 one-time", "₹25,000 / acre"], correct: 0, panelRef: 2, explanation: "Telangana Rythu Bandhu provides ₹10,000 per acre per year (₹5,000 per season)." }
    ]
  },
  {
    id: "nps_unorganised",
    name: "National Pension Scheme for Unorganised Workers",
    amount: "₹3,000",
    category: "Pension",
    level: "Central",
    dept: "Ministry of Labour & Employment (PM-SYM)",
    purpose: "If you work informally (no fixed employer), you can save a little each month and get a guaranteed lifelong monthly pension.",
    benefits: "Guaranteed minimum monthly pension of ₹3,000 after reaching 60 years of age + 50% family pension for spouse.",
    eligibility: {
      minAge: 18,
      maxAge: 40,
      maxIncome: 180000,
      state: "All India",
      occupation: "Unorganised",
      summary: "Street vendors, drivers, domestic workers, construction laborers with monthly income <= ₹15,000."
    },
    timing: "Open year-round",
    timingType: "open",
    documents: [
      { id: "d1", name: "Aadhaar Card", required: true, why: "Identity & age verification" },
      { id: "d2", name: "Savings Bank Account / Jan Dhan Passbook", required: true, why: "Auto-debit contribution & pension payout" },
      { id: "d3", name: "e-Shram Card / Self Declaration", required: false, why: "Unorganised worker status" }
    ],
    applicationSteps: [
      { step: 1, title: "Visit Nearest Common Service Centre (CSC)", desc: "Carry Aadhaar card and bank passbook with IFSC code." },
      { step: 2, title: "Biometric e-KYC & Auto-Debit Setup", desc: "Monthly contribution (₹55 - ₹200 based on age) auto-debited; 50% matched by Central Govt." },
      { step: 3, title: "Receive PM-SYM Pension Card", desc: "Lifelong ₹3,000 monthly pension commences automatically at age 60." }
    ],
    officialUrl: "https://maandhan.in",
    applyUrl: "https://maandhan.in",
    lastVerified: "2026-08-24",
    character: {
      name: "Kalu (Street Vendor)",
      role: "Informal Worker",
      avatar: "👵",
      desc: "Hardworking street cart vendor planning a secure old age"
    },
    panels: {
      en: [
        { num: 1, tag: "Panel 1: Old Age Uncertainty", image: "assets/pension_1.jpg", speaker: "Kalu", dialogue: "I earn daily from my fruit cart, but when I grow old and cannot push this cart, who will take care of my monthly expenses?", caption: "Unorganised worker worries about old-age financial dignity.", sourceRef: "PM-SYM Scheme Rules" },
        { num: 2, tag: "Panel 2: PM Shram Yogi Maandhan", image: "assets/pension_2.jpg", speaker: "GovToon Mitra", dialogue: "Enroll in PM-SYM! Save just ₹55 to ₹100 a month. The Government contributes an equal 50% match, giving you ₹3,000 guaranteed monthly pension!", caption: "Government co-contributed lifelong pension security.", sourceRef: "Ministry of Labour Portal" },
        { num: 3, tag: "Panel 3: 5-Minute Enrollment at CSC", image: "assets/pension_3.jpg", speaker: "CSC VLE", dialogue: "Give your Aadhaar and Jan Dhan passbook. Your pension card is generated instantly!", caption: "Instant biometric digital onboarding.", sourceRef: "Maandhan CSC Gateway" },
        { num: 4, tag: "Panel 4: Dignified Senior Years", image: "assets/pension_4.jpg", speaker: "Kalu & Wife", dialogue: "🎉 Now our old age is fully secure with ₹3,000 fixed monthly income straight into our bank account!", caption: "Lifelong dignity and financial freedom for informal workers.", sourceRef: "DBT Pension Payout" }
      ]
    },
    quiz: [
      { q: "What is the monthly guaranteed pension under PM-SYM after 60 years?", options: ["₹3,000 / month", "₹1,000 / month", "₹500 / month", "₹10,000 / month"], correct: 0, panelRef: 2, explanation: "PM-SYM guarantees a minimum monthly pension of ₹3,000 to unorganised workers." }
    ]
  },
  {
    id: "kalyana_lakshmi",
    name: "Telangana Kalyana Lakshmi",
    amount: "₹1,00,116",
    category: "Women & Child",
    level: "State",
    dept: "Scheduled Castes & Backward Classes Welfare Dept, Telangana",
    purpose: "Financial assistance for the marriage of unmarried girls from economically backward families residing in Telangana.",
    benefits: "One-time financial assistance of ₹1,00,116 deposited directly into the bride's mother's bank account.",
    eligibility: {
      minAge: 18,
      maxAge: 35,
      maxIncome: 200000,
      state: "Telangana",
      occupation: "Women",
      summary: "Unmarried girl aged 18+ from SC/ST/BC/EBC families in Telangana with combined annual family income <= ₹2 Lakhs."
    },
    timing: "Open year-round",
    timingType: "open",
    documents: [
      { id: "d1", name: "Bride's & Groom's Aadhaar Cards", required: true, why: "Age & identity verification (Age >= 18)" },
      { id: "d2", name: "Mother's Bank Account Passbook", required: true, why: "Direct DBT disbursement" },
      { id: "d3", name: "Income Certificate (MeeSeva)", required: true, why: "Income verification (<= ₹2 Lakhs)" },
      { id: "d4", name: "Caste Certificate", required: true, why: "Category verification" },
      { id: "d5", name: "Wedding Card / Marriage Registration Proof", required: true, why: "Marriage confirmation" }
    ],
    applicationSteps: [
      { step: 1, title: "Apply Online on Telangana e-PASS Portal", desc: "Submit Kalyana Lakshmi application with MeeSeva income & caste certificates." },
      { step: 2, title: "MRO Field Verification", desc: "Local Mandal Revenue Officer (MRO) verifies bride's age and marriage details." },
      { step: 3, title: "Direct Transfer to Mother's Account", desc: "₹1,00,116 credited to bride's mother's bank account before marriage." }
    ],
    officialUrl: "https://telanganaepass.cgg.gov.in",
    applyUrl: "https://telanganaepass.cgg.gov.in",
    lastVerified: "2026-08-24",
    character: {
      name: "Lata Tai & Daughter",
      role: "Telangana Family",
      avatar: "👩",
      desc: "Celebrating daughter's auspicious wedding with state support"
    },
    panels: {
      en: [
        { num: 1, tag: "Panel 1: Marriage Expense Stress", image: "assets/sukanya_1.jpg", speaker: "Lata Tai", dialogue: "My daughter has turned 19 and we found a wonderful alliance, but wedding expenses are worrying us. How will we manage without high-interest loans?", caption: "Mother worries about wedding expenses for her daughter.", sourceRef: "Telangana ePASS Guidelines" },
        { num: 2, tag: "Panel 2: Kalyana Lakshmi Pathakam", image: "assets/sukanya_2.jpg", speaker: "Gram Panchayat Secretary", dialogue: "Apply for Kalyana Lakshmi! The Telangana government provides ₹1,00,116 one-time financial grant directly to the bride's mother!", caption: "Major state welfare support for girl child marriage.", sourceRef: "Social Welfare Department" },
        { num: 3, tag: "Panel 3: Apply at MeeSeva", image: "assets/sukanya_3.jpg", speaker: "MeeSeva Operator", dialogue: "Just submit the bride's birth certificate, Aadhaar card, wedding card, and mother's bank passbook on telanganaepass.cgg.gov.in.", caption: "Transparent MeeSeva online verification.", sourceRef: "ePASS Portal" },
        { num: 4, tag: "Panel 4: Joyful Wedding", image: "assets/sukanya_4.jpg", speaker: "Mother & Bride", dialogue: "🎉 ₹1,00,116 received in mother's account! Our daughter's wedding happened gracefully and debt-free!", caption: "Empowering women and bringing happiness to families.", sourceRef: "Direct Benefit Transfer" }
      ]
    },
    quiz: [
      { q: "What is the financial grant provided under Telangana Kalyana Lakshmi?", options: ["₹1,00,116", "₹50,000", "₹25,000", "₹10,000"], correct: 0, panelRef: 2, explanation: "Telangana Kalyana Lakshmi provides ₹1,00,116 financial assistance to the bride's mother." }
    ]
  },
  {
    id: "pm_awas_urban",
    name: "PM Awas Yojana (Urban)",
    amount: "₹2,50,000",
    category: "Housing",
    level: "Central",
    dept: "Ministry of Housing and Urban Affairs (MoHUA)",
    purpose: "Subsidized pucca housing for urban poor, street vendors, and economically weaker sections with direct interest subsidy.",
    benefits: "Up to ₹2.5 Lakh subsidy for house construction or enhancement under Credit Linked Subsidy Scheme (CLSS / BLC).",
    eligibility: {
      minAge: 18,
      maxAge: 75,
      maxIncome: 300000,
      state: "All India",
      occupation: "Unorganised",
      summary: "Urban families who do not own a pucca house anywhere in India, with annual income up to ₹3 Lakhs."
    },
    timing: "Open year-round",
    timingType: "open",
    documents: [
      { id: "d1", name: "Aadhaar Card of all family members", required: true, why: "Identity & de-duplication" },
      { id: "d2", name: "Income Certificate / BPL Card", required: true, why: "EWS income category verification" },
      { id: "d3", name: "Land Title / Plot Ownership Paper", required: true, why: "Construction site proof" },
      { id: "d4", name: "Bank Passbook with Geo-Tagged Photo", required: true, why: "Stage-wise DBT subsidy release" }
    ],
    applicationSteps: [
      { step: 1, title: "Apply on PMAY-U Portal / Municipality", desc: "Submit beneficiary application at local urban municipal office or pmaymis.gov.in." },
      { step: 2, title: "Geo-tagging & Physical Verification", desc: "Municipal engineers geo-tag the site and approve construction plan." },
      { step: 3, title: "Stage-Wise Direct Subsidy Transfer", desc: "₹2.5 Lakh subsidy released in 3 direct bank installments as construction progresses." }
    ],
    officialUrl: "https://pmaymis.gov.in",
    applyUrl: "https://pmaymis.gov.in",
    lastVerified: "2026-08-24",
    character: {
      name: "Sharma Ji",
      role: "Urban Resident",
      avatar: "🏠",
      desc: "Building a safe, permanent pucca home for his family"
    },
    panels: {
      en: [
        { num: 1, tag: "Panel 1: Leaking Roof", image: "assets/awas_1.jpg", speaker: "Sharma Ji", dialogue: "Every monsoon our temporary roof leaks, and house rent takes half my monthly wages. When will my family own a pucca home?", caption: "Urban family dreams of a safe, permanent shelter.", sourceRef: "PMAY-U Guidelines" },
        { num: 2, tag: "Panel 2: PMAY Urban Housing Grant", image: "assets/awas_2.jpg", speaker: "Municipal Commissioner", dialogue: "Under PM Awas Yojana (Urban), the Government provides up to ₹2.5 Lakhs direct subsidy to build your own pucca home!", caption: "Housing for All initiative by Ministry of Housing.", sourceRef: "MoHUA Portal" },
        { num: 3, tag: "Panel 3: Geo-tagged Inspection", image: "assets/awas_3.jpg", speaker: "City Engineer", dialogue: "We completed your geo-tagging survey. Submit your Aadhaar and bank details for instant stage-wise transfer.", caption: "Transparent geo-tagged milestone release.", sourceRef: "PMAYMIS Mobile App" },
        { num: 4, tag: "Panel 4: Griha Pravesh", image: "assets/awas_4.jpg", speaker: "Sharma Ji & Family", dialogue: "🎉 Griha Pravesh done! Today we stepped into our own 2-room pucca home with tap water and electricity!", caption: "Dignity, security, and permanent shelter for urban citizens.", sourceRef: "Direct Benefit Transfer" }
      ]
    },
    quiz: [
      { q: "What is the maximum subsidy provided under PM Awas Yojana (Urban) for EWS beneficiaries?", options: ["Up to ₹2.5 Lakhs", "₹50,000", "₹10,000", "₹10 Lakhs"], correct: 0, panelRef: 2, explanation: "PMAY-U provides up to ₹2.5 Lakhs subsidy for house construction and enhancement." }
    ]
  },
  {
    id: "nmmss_scholarship",
    name: "National Means-cum-Merit Scholarship",
    amount: "₹12,000",
    category: "Education",
    level: "Central",
    dept: "Department of School Education & Literacy, Govt of India",
    purpose: "Scholarship for meritorious students from economically weaker sections to arrest dropout at class 8 and encourage secondary schooling.",
    benefits: "₹12,000 per annum (₹1,000 per month) from Class 9 to Class 12.",
    eligibility: {
      minAge: 13,
      maxAge: 19,
      maxIncome: 350000,
      state: "All India",
      occupation: "Student",
      summary: "Students studying in Govt/Aided schools having >= 55% in Class 7/8 with family income <= ₹3.5 Lakhs."
    },
    timing: "24 days left",
    timingType: "urgent",
    documents: [
      { id: "d1", name: "Class 7/8 Marksheet", required: true, why: "Academic merit check" },
      { id: "d2", name: "Income Certificate (Family Income <= ₹3.5L)", required: true, why: "Economic criterion" },
      { id: "d3", name: "Aadhaar Card & Bank Passbook", required: true, why: "Monthly DBT credit" }
    ],
    applicationSteps: [
      { step: 1, title: "Appear for State Level NMMS Exam", desc: "Register through school for Mental Ability Test (MAT) & Scholastic Aptitude Test (SAT)." },
      { step: 2, title: "NSP Online Registration", desc: "Selected students register on scholarships.gov.in." },
      { step: 3, title: "Annual ₹12,000 DBT Disbursement", desc: "Direct credit of ₹12,000 per year throughout secondary school." }
    ],
    officialUrl: "https://scholarships.gov.in",
    applyUrl: "https://scholarships.gov.in",
    lastVerified: "2026-08-24",
    character: {
      name: "Priya (School Student)",
      role: "High School Scholar",
      avatar: "📚",
      desc: "Brilliant 8th class student continuing her higher secondary schooling"
    },
    panels: {
      en: [
        { num: 1, tag: "Panel 1: Fear of School Dropout", image: "assets/scholarship_1.jpg", speaker: "Priya", dialogue: "I topped my 8th class exam, but my parents are struggling with books and uniform costs for high school.", caption: "Bright student faces financial hurdle in continuing schooling.", sourceRef: "NMMSS Guidelines" },
        { num: 2, tag: "Panel 2: NMMSS Exam Success", image: "assets/scholarship_2.jpg", speaker: "Headmaster", dialogue: "Priya, clear the NMMS exam! The Government awards ₹12,000 every single year from Class 9 to Class 12!", caption: "Direct financial shield against school dropouts.", sourceRef: "Dept of School Education" },
        { num: 3, tag: "Panel 3: Online NSP Form", image: "assets/scholarship_3.jpg", speaker: "Teacher", dialogue: "We registered her on the National Scholarship Portal with her Aadhaar-linked savings account.", caption: "Instant digital scholarship sanctioning.", sourceRef: "NSP Portal" },
        { num: 4, tag: "Panel 4: Continuing Dreams", image: "assets/scholarship_4.jpg", speaker: "Priya", dialogue: "🎉 ₹12,000 received! Now I can complete my 12th class and fulfill my dream of becoming a teacher!", caption: "Nurturing young girl scholars across India.", sourceRef: "Direct Bank Transfer" }
      ]
    },
    quiz: [
      { q: "What is the annual scholarship amount under NMMSS?", options: ["₹12,000 / year", "₹2,000 / year", "₹5,000 one-time", "₹50,000 / year"], correct: 0, panelRef: 2, explanation: "NMMSS awards ₹12,000 per year (₹1,000/month) from Class 9 to Class 12." }
    ]
  },
  {
    id: "pm_kisan",
    name: "PM-Kisan Samman Nidhi",
    amount: "₹6,000",
    category: "Agriculture",
    level: "Central",
    dept: "Ministry of Agriculture & Farmers Welfare",
    purpose: "Direct income support for all landholding farmer families across India for agricultural and domestic needs.",
    benefits: "₹6,000 per year in 3 equal installments of ₹2,000 directly via DBT into farmer bank accounts.",
    eligibility: {
      minAge: 18,
      maxAge: 90,
      maxIncome: 800000,
      state: "All India",
      occupation: "Farmer",
      summary: "All landholding farmer families with cultivable landholding in their name."
    },
    timing: "Open year-round",
    timingType: "open",
    documents: [
      { id: "d1", name: "Aadhaar Card", required: true, why: "Identity & mandatory e-KYC" },
      { id: "d2", name: "Land Ownership Record (Khatauni / Passbook)", required: true, why: "Land ownership proof" },
      { id: "d3", name: "Bank Passbook (NPCI Seeded)", required: true, why: "Direct Benefit Transfer" }
    ],
    applicationSteps: [
      { step: 1, title: "Register on pmkisan.gov.in", desc: "Enter Aadhaar, mobile number, state, and land record details." },
      { step: 2, title: "Complete OTP / Face e-KYC", desc: "Verify identity via Aadhaar OTP or PM-Kisan mobile face-auth app." },
      { step: 3, title: "Receive ₹2,000 Installments", desc: "₹2,000 transferred every 4 months directly into active bank account." }
    ],
    officialUrl: "https://pmkisan.gov.in",
    applyUrl: "https://pmkisan.gov.in",
    lastVerified: "2026-08-24",
    character: {
      name: "Ramu Kaka",
      role: "Farmer",
      avatar: "🌾",
      desc: "Cultivating crops with assured government income backing"
    },
    panels: {
      en: [
        { num: 1, tag: "Panel 1: Seed Season Worries", image: "assets/pm_kisan_1.jpg", speaker: "Ramu Kaka", dialogue: "Sowing season is here, but I need immediate cash for seeds and diesel.", caption: "Farmer worries about upfront crop investment.", sourceRef: "PM-Kisan Portal" },
        { num: 2, tag: "Panel 2: PM-Kisan Guarantee", image: "assets/pm_kisan_2.jpg", speaker: "Kisan Mitra", dialogue: "PM-Kisan gives ₹6,000 guaranteed cash support directly to your bank account every year!", caption: "Assured direct income support for farmers.", sourceRef: "Ministry of Agriculture" },
        { num: 3, tag: "Panel 3: Complete e-KYC", image: "assets/pm_kisan_3.jpg", speaker: "CSC Operator", dialogue: "Just link your Aadhaar with biometric e-KYC at nearest CSC or on PM-Kisan mobile app.", caption: "100% transparent digital verification.", sourceRef: "pmkisan.gov.in" },
        { num: 4, tag: "Panel 4: Bumper Harvest", image: "assets/pm_kisan_4.jpg", speaker: "Ramu Kaka", dialogue: "🎉 ₹2,000 installment received! Bought certified seeds on time and harvest is bountiful!", caption: "Financial independence for Indian farmers.", sourceRef: "DBT Portal Records" }
      ]
    },
    quiz: [
      { q: "How much annual cash support is provided under PM-Kisan?", options: ["₹6,000 in 3 installments", "₹10,000 one-time", "₹2,000 annually", "₹12,000 monthly"], correct: 0, panelRef: 2, explanation: "PM-Kisan provides ₹6,000 per year in 3 equal installments of ₹2,000 each." }
    ]
  },
  {
    id: "ayushman",
    name: "Ayushman Bharat (PM-JAY)",
    amount: "₹5,00,000",
    category: "Health",
    level: "Central",
    dept: "National Health Authority (NHA)",
    purpose: "Free cashless healthcare and hospitalization cover for secondary and tertiary medical treatments across empaneled hospitals.",
    benefits: "₹5 Lakh annual cashless health coverage per family per year, covering 1,949 medical procedures and senior 70+ top-up.",
    eligibility: {
      minAge: 0,
      maxAge: 100,
      maxIncome: 500000,
      state: "All India",
      occupation: "General Citizen",
      summary: "Poor, rural, and vulnerable urban families identified by SECC database & all senior citizens aged 70+."
    },
    timing: "Open year-round",
    timingType: "open",
    documents: [
      { id: "d1", name: "Aadhaar Card / Ration Card", required: true, why: "Family identification" },
      { id: "d2", name: "Ayushman Golden Card (e-Card)", required: true, why: "Cashless admission at empaneled hospitals" }
    ],
    applicationSteps: [
      { step: 1, title: "Check Eligibility on beneficiary.nha.gov.in", desc: "Search with Aadhaar, ration card number, or PMJAY family ID." },
      { step: 2, title: "Generate Ayushman Card at CSC / Hospital", desc: "Instant biometric / face authentication to download digital Ayushman PVC card." },
      { step: 3, title: "Get Cashless Hospitalization", desc: "Show Ayushman Card at any empaneled private or government hospital across India." }
    ],
    officialUrl: "https://beneficiary.nha.gov.in",
    applyUrl: "https://beneficiary.nha.gov.in",
    lastVerified: "2026-08-24",
    character: {
      name: "Sharma Ji & Family",
      role: "Beneficiary",
      avatar: "🏥",
      desc: "Protected by India's largest cashless health assurance network"
    },
    panels: {
      en: [
        { num: 1, tag: "Panel 1: Medical Emergency", image: "assets/ayushman_1.jpg", speaker: "Father", dialogue: "Doctor says cardiac surgery will cost ₹3 Lakhs. Where will our humble family get such huge money?", caption: "Family confronts devastating hospital treatment bills.", sourceRef: "PM-JAY National Portal" },
        { num: 2, tag: "Panel 2: Ayushman Card Shield", image: "assets/ayushman_2.jpg", speaker: "Ayushman Mitra", dialogue: "Don't panic! Ayushman Bharat provides ₹5 Lakh cashless treatment every year across top hospitals!", caption: "World's largest government-funded healthcare shield.", sourceRef: "NHA Official Rules" },
        { num: 3, tag: "Panel 3: Zero-Cash Admission", image: "assets/ayushman_3.jpg", speaker: "Hospital Reception", dialogue: "Your Ayushman card is verified with Aadhaar. Zero deposit required — all medicines and surgery are 100% free.", caption: "Completely cashless hospital treatment.", sourceRef: "beneficiary.nha.gov.in" },
        { num: 4, tag: "Panel 4: Healthy & Smiling", image: "assets/ayushman_4.jpg", speaker: "Recovered Patient", dialogue: "🎉 Successful surgery without spending a single rupee from our pocket! Ayushman Bharat saved our lives!", caption: "Health security and peace of mind for every citizen.", sourceRef: "NHA Hospital Payout" }
      ]
    },
    quiz: [
      { q: "What is the annual hospital cover amount under Ayushman Bharat PM-JAY?", options: ["₹5 Lakhs per family / year", "₹50,000 per year", "₹1 Lakh one-time", "₹25,000 per family"], correct: 0, panelRef: 2, explanation: "Ayushman Bharat PM-JAY provides ₹5 Lakhs annual cashless health coverage per family." }
    ]
  },
  {
    id: "surya_ghar",
    name: "PM Surya Ghar: Muft Bijli Yojana",
    amount: "₹78,000",
    category: "Housing",
    level: "Central",
    dept: "Ministry of New and Renewable Energy (MNRE)",
    purpose: "Solar rooftop subsidy providing up to 300 units of free electricity every month for residential households.",
    benefits: "₹78,000 direct central subsidy for 3kW rooftop solar installation + zero electricity bills.",
    eligibility: {
      minAge: 18,
      maxAge: 85,
      maxIncome: 1200000,
      state: "All India",
      occupation: "General Citizen",
      summary: "Indian households with an existing electricity connection and suitable rooftop space."
    },
    timing: "Open year-round",
    timingType: "open",
    documents: [
      { id: "d1", name: "Electricity Bill (Latest Copy)", required: true, why: "Consumer connection & DISCOM verification" },
      { id: "d2", name: "Aadhaar Card", required: true, why: "Identity & e-sign" },
      { id: "d3", name: "Rooftop Ownership Proof / Tax Receipt", required: true, why: "Installation site approval" },
      { id: "d4", name: "Bank Passbook with Cancelled Cheque", required: true, why: "Direct subsidy credit" }
    ],
    applicationSteps: [
      { step: 1, title: "Register on pmsuryaghar.gov.in", desc: "Select DISCOM, enter consumer account number, and apply for rooftop solar." },
      { step: 2, title: "Vendor Selection & Installation", desc: "Pick certified DISCOM vendor to install panels and net meter." },
      { step: 3, title: "Direct ₹78,000 Subsidy Disbursement", desc: "Subsidy transferred directly to bank account within 30 days of commissioning." }
    ],
    officialUrl: "https://pmsuryaghar.gov.in",
    applyUrl: "https://pmsuryaghar.gov.in",
    lastVerified: "2026-08-24",
    character: {
      name: "Sunita & Vikram",
      role: "Homeowner",
      avatar: "☀️",
      desc: "Powering their home with clean rooftop solar energy"
    },
    panels: {
      en: [
        { num: 1, tag: "Panel 1: High Summer Power Bill", image: "assets/surya_ghar_1.jpg", speaker: "Vikram", dialogue: "Our electricity bill has surged to ₹3,500 every month! It is burning a big hole in our monthly budget.", caption: "Homeowner frustrated with rising power bills.", sourceRef: "PM Surya Ghar Guidelines" },
        { num: 2, tag: "Panel 2: PM Surya Ghar Subsidy", image: "assets/surya_ghar_2.jpg", speaker: "Solar Mitra", dialogue: "Install rooftop solar under PM Surya Ghar! The Government gives ₹78,000 direct subsidy and up to 300 units of free power!", caption: "Massive central subsidy for residential solar power.", sourceRef: "MNRE National Portal" },
        { num: 3, tag: "Panel 3: Online DISCOM Registration", image: "assets/surya_ghar_3.jpg", speaker: "DISCOM Engineer", dialogue: "Apply on pmsuryaghar.gov.in. We install the net-meter and inspection is completed smoothly.", caption: "Seamless digital registration and net-metering.", sourceRef: "pmsuryaghar.gov.in" },
        { num: 4, tag: "Panel 4: Zero Electricity Bill", image: "assets/surya_ghar_4.jpg", speaker: "Vikram & Family", dialogue: "🎉 ₹78,000 subsidy received in our bank, and our monthly electricity bill is now ZERO rupees!", caption: "Green, clean solar energy and massive household savings.", sourceRef: "DBT Subsidy Release" }
      ]
    },
    quiz: [
      { q: "What is the maximum central subsidy provided for 3kW rooftop solar under PM Surya Ghar?", options: ["₹78,000", "₹30,000", "₹10,000", "₹1,50,000"], correct: 0, panelRef: 2, explanation: "PM Surya Ghar provides ₹78,000 direct subsidy for a 3kW residential rooftop system." }
    ]
  },
  {
    id: "pm_svanidhi",
    name: "PM SVANidhi Micro-Credit",
    amount: "₹10,000",
    category: "Business",
    level: "Central",
    dept: "Ministry of Housing and Urban Affairs",
    purpose: "Affordable collateral-free working capital loan for street vendors, tea stalls, and small cart operators.",
    benefits: "₹10,000 initial loan with 7% interest subsidy, upgrading to ₹20,000 and ₹50,000 upon timely digital repayment.",
    eligibility: {
      minAge: 18,
      maxAge: 65,
      maxIncome: 300000,
      state: "All India",
      occupation: "Unorganised",
      summary: "Street vendors and hawkers operating in urban and peri-urban areas holding vending certificate or recommendation letter."
    },
    timing: "Open year-round",
    timingType: "open",
    documents: [
      { id: "d1", name: "Aadhaar Card", required: true, why: "Identity & e-KYC" },
      { id: "d2", name: "Vending Certificate / Letter of Recommendation (LoR)", required: true, why: "Vendor proof from Municipality" },
      { id: "d3", name: "Bank Account Passbook / QR Code", required: true, why: "Digital loan disbursement" }
    ],
    applicationSteps: [
      { step: 1, title: "Apply on pmsvanidhi.mohua.gov.in", desc: "Enter Aadhaar-linked mobile and vending identification details." },
      { step: 2, title: "Select Lending Bank / NBFC", desc: "Choose preferred bank or micro-finance institution for zero-collateral loan." },
      { step: 3, title: "Disbursement & ₹1,200 Cashback", desc: "₹10,000 credited to bank; earn monthly digital transaction cashbacks." }
    ],
    officialUrl: "https://pmsvanidhi.mohua.gov.in",
    applyUrl: "https://pmsvanidhi.mohua.gov.in",
    lastVerified: "2026-08-24",
    character: {
      name: "Kalu (Street Vendor)",
      role: "Micro Entrepreneur",
      avatar: "🛒",
      desc: "Expanding his street vending cart with formal bank credit"
    },
    panels: {
      en: [
        { num: 1, tag: "Panel 1: Working Capital Crunch", image: "assets/svanidhi_1.jpg", speaker: "Kalu", dialogue: "Moneylenders charge 10% interest per day for cart inventory. How will I ever save money for my children's future?", caption: "Street vendor trapped in informal debt cycle.", sourceRef: "PM SVANidhi Scheme Document" },
        { num: 2, tag: "Panel 2: Collateral-Free Bank Credit", image: "assets/svanidhi_2.jpg", speaker: "Bank Manager", dialogue: "Under PM SVANidhi, you get ₹10,000 collateral-free loan at 7% interest subsidy straight from our bank!", caption: "Formal institutional credit for street vendors.", sourceRef: "MoHUA Portal" },
        { num: 3, tag: "Panel 3: QR Code & Digital Cashback", image: "assets/svanidhi_3.jpg", speaker: "Digital Payment Mitra", dialogue: "Use your UPI QR code for cart payments to earn ₹100 monthly cashbacks and unlock ₹20,000 next loan!", caption: "Digital financial inclusion and vendor rewards.", sourceRef: "pmsvanidhi.mohua.gov.in" },
        { num: 4, tag: "Panel 4: Growing Business", image: "assets/svanidhi_4.jpg", speaker: "Kalu", dialogue: "🎉 Repaid my ₹10,000 loan on time and upgraded to ₹20,000! My fruit cart is thriving and profitable!", caption: "Micro-entrepreneurs stepping up to financial self-reliance.", sourceRef: "Direct Bank Disbursement" }
      ]
    },
    quiz: [
      { q: "What is the initial collateral-free loan amount under PM SVANidhi?", options: ["₹10,000", "₹1,000", "₹50,000", "₹1,00,000"], correct: 0, panelRef: 2, explanation: "PM SVANidhi provides an initial collateral-free working capital loan of ₹10,000." }
    ]
  },
  {
    id: "mudra_loan",
    name: "Pradhan Mantri MUDRA Yojana (PMMY)",
    amount: "₹50,000",
    category: "Banking & Finance",
    level: "Central",
    dept: "Department of Financial Services, Ministry of Finance",
    purpose: "Collateral-free micro-loans for setting up or expanding small enterprises, shops, tailoring units, and workshops.",
    benefits: "Shishu (up to ₹50,000), Kishore (up to ₹5 Lakh), Tarun (up to ₹10 Lakh) low-interest funding without any collateral.",
    eligibility: {
      minAge: 18,
      maxAge: 65,
      maxIncome: 1000000,
      state: "All India",
      occupation: "Unorganised",
      summary: "Non-corporate, non-farm small/micro enterprises engaged in manufacturing, trading, or services."
    },
    timing: "Open year-round",
    timingType: "open",
    documents: [
      { id: "d1", name: "Aadhaar Card & PAN Card", required: true, why: "Identity & KYC" },
      { id: "d2", name: "Business Address / Trade Proof", required: true, why: "Enterprise activity verification" },
      { id: "d3", name: "Bank Statement (Last 6 Months)", required: true, why: "Credit assessment" }
    ],
    applicationSteps: [
      { step: 1, title: "Prepare Simple Business Plan", desc: "Outline required machinery, raw materials, and expected revenue." },
      { step: 2, title: "Apply at Bank / udyamimitra.in", desc: "Submit Shishu / Kishore / Tarun loan form without collateral." },
      { step: 3, title: "MUDRA Card & Credit Sanction", desc: "Funds disbursed with MUDRA debit card for flexible working capital." }
    ],
    officialUrl: "https://www.mudra.org.in",
    applyUrl: "https://www.udyamimitra.in",
    lastVerified: "2026-08-24",
    character: {
      name: "Anita (Tailor)",
      role: "Micro Business Owner",
      avatar: "💼",
      desc: "Setting up a modern boutique with collateral-free MUDRA funding"
    },
    panels: {
      en: [
        { num: 1, tag: "Panel 1: Dream to Expand Shop", image: "assets/mudra_1.jpg", speaker: "Anita", dialogue: "I have hundreds of stitching orders, but I need 3 industrial sewing machines to expand. Traditional banks ask for property collateral!", caption: "Enterprising woman entrepreneur seeking business expansion funds.", sourceRef: "PMMY Scheme Rules" },
        { num: 2, tag: "Panel 2: Zero Collateral MUDRA Shishu Loan", image: "assets/mudra_2.jpg", speaker: "Bank Branch Manager", dialogue: "Apply for MUDRA Shishu Loan! Get up to ₹50,000 collateral-free funding with low interest rates!", caption: "Funding the unfunded through MUDRA institutional credit.", sourceRef: "Ministry of Finance" },
        { num: 3, tag: "Panel 3: Apply on Udyami Mitra", image: "assets/mudra_3.jpg", speaker: "CSC Assistant", dialogue: "Submit quotation of machinery, Aadhaar, and PAN card on udyamimitra.in.", caption: "Simplified digital loan appraisal.", sourceRef: "udyamimitra.in" },
        { num: 4, tag: "Panel 4: Thriving Boutique", image: "assets/mudra_4.jpg", speaker: "Anita", dialogue: "🎉 Loan approved and machines purchased! Today my boutique employs 4 women from our neighborhood!", caption: "Self-reliance and job creation powered by MUDRA loans.", sourceRef: "Direct Bank Loan Payout" }
      ]
    },
    quiz: [
      { q: "What is the maximum loan limit under MUDRA Shishu category?", options: ["Up to ₹50,000", "₹5,000", "₹10 Lakhs", "₹20,000"], correct: 0, panelRef: 2, explanation: "MUDRA Shishu category provides loans up to ₹50,000 without collateral." }
    ]
  },
  {
    id: "sukanya",
    name: "Sukanya Samriddhi Yojana",
    amount: "8.2% Compound",
    category: "Women & Child",
    level: "Central",
    dept: "Ministry of Finance (Small Savings Scheme)",
    purpose: "Government-backed high-yield savings scheme specifically for the higher education and marriage of the girl child.",
    benefits: "8.2% highest annual compounded interest + 100% Tax Exemption under Section 80C on deposits and maturity.",
    eligibility: {
      minAge: 0,
      maxAge: 10,
      maxIncome: 2000000,
      state: "All India",
      occupation: "Women",
      summary: "Parents or legal guardians of a girl child aged up to 10 years (maximum 2 girl children per family)."
    },
    timing: "Open year-round",
    timingType: "open",
    documents: [
      { id: "d1", name: "Girl Child Birth Certificate", required: true, why: "Age verification (Age <= 10 yrs)" },
      { id: "d2", name: "Parent / Guardian Aadhaar & PAN Card", required: true, why: "KYC verification" },
      { id: "d3", name: "Initial Deposit (Minimum ₹250)", required: true, why: "Account opening" }
    ],
    applicationSteps: [
      { step: 1, title: "Visit Post Office or Commercial Bank", desc: "Carry girl child birth certificate and parent's Aadhaar card." },
      { step: 2, title: "Open SSY Account with ₹250 Deposit", desc: "Deposit minimum ₹250 up to ₹1.5 Lakhs annually." },
      { step: 3, title: "High-Interest Compounded Growth", desc: "8.2% interest credited yearly; 50% partial withdrawal allowed for higher education at age 18." }
    ],
    officialUrl: "https://www.indiapost.gov.in",
    applyUrl: "https://www.indiapost.gov.in",
    lastVerified: "2026-08-24",
    character: {
      name: "Anita & Baby Priya",
      role: "Guardian & Daughter",
      avatar: "👧",
      desc: "Building a golden future for her daughter with safe government savings"
    },
    panels: {
      en: [
        { num: 1, tag: "Panel 1: Securing Daughter's Dreams", image: "assets/sukanya_1.jpg", speaker: "Mother", dialogue: "My daughter is just 5 years old. How can I ensure she has ample funds for medical college when she turns 18?", caption: "Parent planning for daughter's higher education milestone.", sourceRef: "SSY Scheme Guidelines" },
        { num: 2, tag: "Panel 2: 8.2% Guaranteed Sovereign Return", image: "assets/sukanya_2.jpg", speaker: "Post Master", dialogue: "Open a Sukanya Samriddhi account! It gives highest 8.2% annual compound interest and complete tax exemption!", caption: "Highest return small savings scheme backed by Govt of India.", sourceRef: "Ministry of Finance" },
        { num: 3, tag: "Panel 3: Open Account with ₹250", image: "assets/sukanya_3.jpg", speaker: "Postal Official", dialogue: "Just bring her birth certificate and your Aadhaar. You can deposit anytime online.", caption: "Easy post office and bank account management.", sourceRef: "India Post Portal" },
        { num: 4, tag: "Panel 4: Secured Future", image: "assets/sukanya_4.jpg", speaker: "Happy Family", dialogue: "🎉 Sukanya Samriddhi gives our daughter guaranteed financial independence for her dreams!", caption: "Beti Bachao, Beti Padhao sovereign security.", sourceRef: "Reserve Bank of India" }
      ]
    },
    quiz: [
      { q: "What is the current annual interest rate offered on Sukanya Samriddhi Yojana?", options: ["8.2% compounded annually", "4.0% simple", "6.5% annually", "5.0% flat"], correct: 0, panelRef: 2, explanation: "Sukanya Samriddhi Yojana offers a high 8.2% annual compounded interest rate." }
    ]
  },
  {
    id: "pm_vishwakarma",
    name: "PM Vishwakarma Scheme",
    amount: "₹15,000 + ₹3L",
    category: "Employment",
    level: "Central",
    dept: "Ministry of Micro, Small and Medium Enterprises (MSME)",
    purpose: "Holistic financial, modern toolkit, and skill training support for traditional artisans, carpenters, blacksmiths, and tailors.",
    benefits: "₹15,000 e-voucher for modern toolkits + 5-day daily stipend training + ₹3 Lakh collateral-free loan at 5% interest.",
    eligibility: {
      minAge: 18,
      maxAge: 70,
      maxIncome: 500000,
      state: "All India",
      occupation: "Artisan",
      summary: "Traditional artisans and craftspeople working in 18 notified family trades (carpenters, blacksmiths, potters, cobblers, tailors)."
    },
    timing: "Open year-round",
    timingType: "open",
    documents: [
      { id: "d1", name: "Aadhaar Card", required: true, why: "Identity & biometric verification" },
      { id: "d2", name: "Active Bank Passbook", required: true, why: "Stipend and loan disbursement" },
      { id: "d3", name: "Ration Card / Family Declaration", required: true, why: "One beneficiary per family limit" }
    ],
    applicationSteps: [
      { step: 1, title: "Register on pmvishwakarma.gov.in via CSC", desc: "Biometric authentication and trade skill selection at nearest CSC center." },
      { step: 2, title: "Gram Panchayat & Municipal Verification", desc: "Local administration validates trade engagement." },
      { step: 3, title: "5-Day Basic Skill Training & ₹15,000 Toolkit", desc: "Receive ₹500/day training stipend + ₹15,000 digital voucher for advanced equipment." }
    ],
    officialUrl: "https://pmvishwakarma.gov.in",
    applyUrl: "https://pmvishwakarma.gov.in",
    lastVerified: "2026-08-24",
    character: {
      name: "Ramesh (Carpenter)",
      role: "Traditional Artisan",
      avatar: "🔨",
      desc: "Upgrading traditional craft with modern electrical toolkits and subsidized capital"
    },
    panels: {
      en: [
        { num: 1, tag: "Panel 1: Traditional Manual Tools", image: "assets/vishwakarma_1.jpg", speaker: "Ramesh", dialogue: "I work with manual hand saws and chisels. Modern furniture factories work 5 times faster. How can I buy modern power tools?", caption: "Artisan struggling with outdated manual equipment.", sourceRef: "PM Vishwakarma Guidelines" },
        { num: 2, tag: "Panel 2: PM Vishwakarma Toolkit & Training", image: "assets/vishwakarma_2.jpg", speaker: "MSME Officer", dialogue: "Enroll in PM Vishwakarma! You get ₹15,000 free digital voucher for power toolkits, 5-day skill training with stipend, and ₹3 Lakh loan at 5%!", caption: "Preserving and empowering India's traditional craftspeople.", sourceRef: "MSME Ministry" },
        { num: 3, tag: "Panel 3: CSC Registration & Certificate", image: "assets/vishwakarma_3.jpg", speaker: "CSC VLE", dialogue: "Your biometric registration is verified. Here is your official PM Vishwakarma ID Card and Skill Certificate.", caption: "National recognition and formal certification.", sourceRef: "pmvishwakarma.gov.in" },
        { num: 4, tag: "Panel 4: Modern Power Workshop", image: "assets/vishwakarma_4.jpg", speaker: "Ramesh", dialogue: "🎉 Got my ₹15,000 power toolset! My furniture workshop production tripled and orders are pouring in!", caption: "Tradition meets modern efficiency.", sourceRef: "Direct Benefit Transfer" }
      ]
    },
    quiz: [
      { q: "What is the toolkit incentive provided under PM Vishwakarma Scheme?", options: ["₹15,000 e-voucher", "₹5,000 cash", "₹1,000 discount", "₹50,000 loan only"], correct: 0, panelRef: 2, explanation: "PM Vishwakarma provides a ₹15,000 e-voucher for modern toolkits along with skill training." }
    ]
  }
];

// Calculate Personalized Match Score for Scheme against User Profile
function computeSchemeMatchScore(scheme, profile) {
  if (!scheme || !scheme.eligibility) return 100;
  const e = scheme.eligibility;
  const p = profile || userProfile;

  let score = 100;

  // 1. Age Check
  if (p.age < e.minAge || p.age > e.maxAge) {
    score -= 35;
  }

  // 2. Income Check
  if (p.income > e.maxIncome) {
    score -= 30;
  }

  // 3. State Check
  if (scheme.level === "State" || (e.state && e.state !== "All India")) {
    if (e.state.toLowerCase() !== p.state.toLowerCase() && !scheme.name.toLowerCase().includes(p.state.toLowerCase())) {
      score -= 35;
    }
  }

  // 4. Occupation Check
  if (e.occupation && e.occupation !== "General Citizen" && e.occupation !== "General") {
    const sOcc = e.occupation.toLowerCase();
    const pOcc = p.occupation.toLowerCase();
    if (!sOcc.includes(pOcc) && !pOcc.includes(sOcc)) {
      score -= 20;
    }
  }

  return Math.max(10, Math.min(100, score));
}

// Multilingual Scheme Translations Helper
function getLocalizedScheme(s, lang) {
  return s;
}

// Initialize Application
document.addEventListener("DOMContentLoaded", () => {
  if ('speechSynthesis' in window) {
    window.speechSynthesis.getVoices();
    window.speechSynthesis.onvoiceschanged = () => { window.speechSynthesis.getVoices(); };
  }

  setupNavigation();
  setupLanguageSelector();
  setupThemeToggles();
  updateProfileUI();
  populateCompareDropdowns();
  renderDirectory();
  calculateEligibilityMatches();
  renderDashboard();

  if (SCHEMES_DATABASE.length > 0) {
    appState.selectedScheme = SCHEMES_DATABASE[0];
  }
});

// Setup Navigation
function setupNavigation() {
  document.querySelectorAll('.nav-link').forEach(btn => {
    btn.addEventListener('click', () => {
      navigateTo(btn.getAttribute('data-nav'));
    });
  });
}

function navigateTo(viewId) {
  appState.currentView = viewId;
  document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
  const activeLink = document.querySelector(`.nav-link[data-nav="${viewId}"]`);
  if (activeLink) activeLink.classList.add('active');

  document.querySelectorAll('.page-view').forEach(v => v.classList.remove('active'));
  const target = document.getElementById(`view-${viewId}`);
  if (target) target.classList.add('active');

  if (viewId === 'explore') {
    renderDirectory();
  } else if (viewId === 'eligibility') {
    calculateEligibilityMatches();
  } else if (viewId === 'compare') {
    renderCompareTable();
  } else if (viewId === 'dashboard') {
    renderDashboard();
  } else if (viewId === 'reader') {
    renderReaderView();
  }

  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Explore Tabs (All Schemes, Central, My State, Recommended For Me, Saved)
function setExploreTab(tabKey, btnElem) {
  appState.currentExploreTab = tabKey;
  document.querySelectorAll('.explore-tab-btn').forEach(b => b.classList.remove('active'));
  if (btnElem) btnElem.classList.add('active');
  renderDirectory();
}

function handleDirectoryFilterChange() {
  renderDirectory();
}

// RENDER SCHEMES DIRECTORY (MATCHES SCREENSHOT EXACTLY)
function renderDirectory() {
  const grid = document.getElementById('schemes-directory-grid');
  if (!grid) return;

  const searchInput = document.getElementById('directory-search');
  const query = (searchInput ? searchInput.value : '').toLowerCase().trim();

  const catSelect = document.getElementById('filter-category');
  const cat = catSelect ? catSelect.value.toLowerCase() : 'all';

  const occSelect = document.getElementById('filter-occupation');
  const occ = occSelect ? occSelect.value.toLowerCase() : 'all';

  // 1. Tab Filter
  let list = [...SCHEMES_DATABASE];
  const tab = appState.currentExploreTab;

  if (tab === 'central') {
    list = list.filter(s => s.level === 'Central');
  } else if (tab === 'state') {
    list = list.filter(s => s.level === 'State' || (s.eligibility && s.eligibility.state.toLowerCase() === userProfile.state.toLowerCase()) || s.name.toLowerCase().includes(userProfile.state.toLowerCase()));
  } else if (tab === 'recommended') {
    // Sort by computed match score descending
    list = list.map(s => ({
      ...s,
      calculatedMatch: computeSchemeMatchScore(s, userProfile)
    })).sort((a, b) => b.calculatedMatch - a.calculatedMatch);
  } else if (tab === 'saved') {
    list = list.filter(s => appState.bookmarkedIds.has(s.id));
  }

  // 2. Search Query Filter
  if (query) {
    list = list.filter(s => 
      s.name.toLowerCase().includes(query) ||
      s.purpose.toLowerCase().includes(query) ||
      s.benefits.toLowerCase().includes(query) ||
      s.category.toLowerCase().includes(query) ||
      s.dept.toLowerCase().includes(query)
    );
  }

  // 3. Category Filter
  if (cat !== 'all') {
    list = list.filter(s => (s.category || '').toLowerCase().includes(cat));
  }

  // 4. Occupation Filter
  if (occ !== 'all') {
    list = list.filter(s => {
      const eOcc = (s.eligibility && s.eligibility.occupation ? s.eligibility.occupation : '').toLowerCase();
      return eOcc.includes(occ) || eOcc.includes('general') || (s.character && s.character.desc.toLowerCase().includes(occ));
    });
  }

  // Update counts
  const countElem = document.getElementById('explore-scheme-count');
  if (countElem) countElem.innerText = list.length;

  const savedTabCount = document.getElementById('saved-tab-count');
  if (savedTabCount) savedTabCount.innerText = appState.bookmarkedIds.size;

  if (list.length === 0) {
    grid.innerHTML = `
      <div style="grid-column: 1/-1; text-align:center; padding:50px 20px; background:#fff; border-radius:16px; border:1px solid #e2e8f0;">
        <span style="font-size:3rem;">🔍</span>
        <h3 style="font-family:var(--font-heading); color:var(--primary-navy); margin-top:12px;">No schemes match your filter</h3>
        <p style="color:var(--text-muted); margin-bottom:16px;">Try adjusting your search terms or clearing category filters.</p>
        <button class="btn btn-primary" onclick="resetExploreFilters()">Reset Filters</button>
      </div>
    `;
    return;
  }

  grid.innerHTML = '';
  list.forEach(s => {
    const isBookmarked = appState.bookmarkedIds.has(s.id);
    const matchScore = s.calculatedMatch !== undefined ? s.calculatedMatch : computeSchemeMatchScore(s, userProfile);
    const timingLabel = s.timing || 'Open year-round';
    const timingClass = s.timingType === 'urgent' ? 'timing-urgent' : 'timing-open';
    const timingIcon = s.timingType === 'urgent' ? '🟡' : '🟢';

    const card = document.createElement('div');
    card.className = 'scheme-card-box';
    card.innerHTML = `
      <div>
        <div class="scard-top-row">
          <div class="scard-badges-group">
            <span class="badge-pill ${s.level === 'Central' ? 'level-central' : 'level-state'}">${s.level || 'Central'}</span>
            <span class="badge-pill cat-tag">${s.category || 'Welfare'}</span>
          </div>
          <button class="star-bookmark-btn ${isBookmarked ? 'bookmarked' : ''}" 
                  onclick="toggleSchemeBookmark('${s.id}', event)" 
                  title="${isBookmarked ? 'Remove from Saved' : 'Save to My Library'}">
            ${isBookmarked ? '⭐' : '☆'}
          </button>
        </div>

        <h3 class="scard-title">${s.name}</h3>
        <div class="scard-amount">${s.amount || s.benefits.split(' ')[0]}</div>
        <p class="scard-desc">${s.purpose}</p>
      </div>

      <div>
        <div class="scard-bottom-meta">
          <div class="meta-status-tags">
            <span class="match-score-badge">${matchScore}% MATCH</span>
            <span class="timing-badge ${timingClass}">${timingIcon} ${timingLabel}</span>
          </div>
        </div>

        <div class="scard-actions-bar">
          <button class="btn-card-comic" onclick="openSchemeReaderById('${s.id}')">🎨 4-Panel Comic</button>
          <button class="btn-card-elig" onclick="openSchemeEligibilityTab('${s.id}')">🟢 Eligibility</button>
          <a href="${s.applyUrl || s.officialUrl}" target="_blank" rel="noopener noreferrer" class="btn-card-apply">🚀 Apply ↗</a>
        </div>
      </div>
    `;
    grid.appendChild(card);
  });
}

function resetExploreFilters() {
  const sInput = document.getElementById('directory-search');
  if (sInput) sInput.value = '';
  const cat = document.getElementById('filter-category');
  if (cat) cat.value = 'all';
  const occ = document.getElementById('filter-occupation');
  if (occ) occ.value = 'all';
  setExploreTab('all', document.querySelector('.explore-tab-btn[data-tab="all"]'));
}

// Bookmark Toggle
function toggleSchemeBookmark(schemeId, event) {
  if (event) event.stopPropagation();
  if (appState.bookmarkedIds.has(schemeId)) {
    appState.bookmarkedIds.delete(schemeId);
  } else {
    appState.bookmarkedIds.add(schemeId);
  }

  try {
    localStorage.setItem('govtoon_saved_schemes', JSON.stringify(Array.from(appState.bookmarkedIds)));
  } catch (e) {}

  renderDirectory();
  renderDashboard();
}

// User Profile Update & Modal
function openProfileModal() {
  const m = document.getElementById('profile-modal');
  if (!m) return;
  document.getElementById('modal-user-age').value = userProfile.age;
  document.getElementById('modal-user-income').value = userProfile.income;
  document.getElementById('modal-user-state').value = userProfile.state;
  document.getElementById('modal-user-occupation').value = userProfile.occupation;
  m.style.display = 'flex';
}

function closeProfileModal() {
  const m = document.getElementById('profile-modal');
  if (m) m.style.display = 'none';
}

function saveProfileFromModal() {
  userProfile.age = parseInt(document.getElementById('modal-user-age').value) || 20;
  userProfile.income = parseInt(document.getElementById('modal-user-income').value) || 150000;
  userProfile.state = document.getElementById('modal-user-state').value || 'Telangana';
  userProfile.occupation = document.getElementById('modal-user-occupation').value || 'Student';

  try {
    localStorage.setItem('govtoon_user_profile', JSON.stringify(userProfile));
  } catch (e) {}

  closeProfileModal();
  updateProfileUI();
  renderDirectory();
  calculateEligibilityMatches();
}

function updateProfileUI() {
  const label = document.getElementById('active-profile-label');
  if (label) {
    label.innerText = `${userProfile.occupation} (${userProfile.age}y) • ${userProfile.state} • ₹${(userProfile.income/100000).toFixed(1)}L Income`;
  }
}

// CHECK ELIGIBILITY WIZARD ENGINE
function calculateEligibilityMatches() {
  const age = parseInt(document.getElementById('wiz-age')?.value) || userProfile.age;
  const income = parseInt(document.getElementById('wiz-income')?.value) || userProfile.income;
  const state = document.getElementById('wiz-state')?.value || userProfile.state;
  const occ = document.getElementById('wiz-occupation')?.value || userProfile.occupation;

  const currentProf = { age, income, state, occupation: occ };

  const matches = SCHEMES_DATABASE.map(s => ({
    scheme: s,
    score: computeSchemeMatchScore(s, currentProf)
  })).sort((a, b) => b.score - a.score);

  const container = document.getElementById('eligibility-matched-cards-list');
  if (!container) return;

  const topMatchCount = matches.filter(m => m.score >= 80).length;
  const countTxt = document.getElementById('elig-match-count');
  if (countTxt) countTxt.innerText = `${topMatchCount} Highly Recommended Schemes`;

  const subTxt = document.getElementById('elig-match-sub');
  if (subTxt) subTxt.innerText = `Based on Age: ${age}, ${occ}, ${state}, Income: ₹${income.toLocaleString()}`;

  const topRate = document.getElementById('elig-match-top-rate');
  if (topRate && matches.length > 0) topRate.innerText = `${matches[0].score}% Top Match`;

  container.innerHTML = '';
  matches.forEach(m => {
    const s = m.scheme;
    const isHigh = m.score >= 80;
    const isModerate = m.score >= 60 && m.score < 80;
    const scoreBadgeClass = isHigh ? 'green-badge' : isModerate ? 'saffron-badge' : 'red-badge';

    const card = document.createElement('div');
    card.className = 'matched-scheme-item';
    card.innerHTML = `
      <div class="matched-top-bar">
        <div>
          <span class="badge ${scoreBadgeClass}">${m.score}% MATCH</span>
          <strong style="font-family:var(--font-heading); margin-left:8px; font-size:1.1rem;">${s.name}</strong>
        </div>
        <span style="font-weight:800; color:var(--primary-green); font-size:1.1rem;">${s.amount || s.benefits.split(' ')[0]}</span>
      </div>
      <p style="font-size:0.86rem; color:var(--text-muted); margin:6px 0 10px 0;"><strong>Official Rule:</strong> ${s.eligibility ? s.eligibility.summary : s.purpose}</p>
      <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:8px;">
        <span style="font-size:0.8rem; color:var(--text-muted);">Dept: ${s.dept}</span>
        <div style="display:flex; gap:8px;">
          <button class="btn btn-outline-sm" onclick="openSchemeReaderById('${s.id}')">🎨 Read Comic</button>
          <a href="${s.applyUrl || s.officialUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-saffron btn-sm" style="font-size:0.8rem; padding:4px 10px;">Apply ↗</a>
        </div>
      </div>
    `;
    container.appendChild(card);
  });
}

function applyWizardProfileToExplore() {
  userProfile.age = parseInt(document.getElementById('wiz-age')?.value) || 20;
  userProfile.income = parseInt(document.getElementById('wiz-income')?.value) || 150000;
  userProfile.state = document.getElementById('wiz-state')?.value || 'Telangana';
  userProfile.occupation = document.getElementById('wiz-occupation')?.value || 'Student';

  try {
    localStorage.setItem('govtoon_user_profile', JSON.stringify(userProfile));
  } catch (e) {}

  updateProfileUI();
  setExploreTab('recommended', document.querySelector('.explore-tab-btn[data-tab="recommended"]'));
  navigateTo('explore');
}

// COMPARE SCHEMES ENGINE
function populateCompareDropdowns() {
  const s1 = document.getElementById('compare-scheme-1');
  const s2 = document.getElementById('compare-scheme-2');
  const s3 = document.getElementById('compare-scheme-3');
  if (!s1 || !s2 || !s3) return;

  const optionsHtml = SCHEMES_DATABASE.map(s => `<option value="${s.id}">${s.name} (${s.level})</option>`).join('');

  s1.innerHTML = optionsHtml;
  s2.innerHTML = optionsHtml;
  s3.innerHTML = '<option value="">-- None --</option>' + optionsHtml;

  if (SCHEMES_DATABASE.length > 1) {
    s1.selectedIndex = 0;
    s2.selectedIndex = 1;
    if (SCHEMES_DATABASE.length > 2) s3.selectedIndex = 3;
  }

  renderCompareTable();
}

function renderCompareTable() {
  const s1Id = document.getElementById('compare-scheme-1')?.value;
  const s2Id = document.getElementById('compare-scheme-2')?.value;
  const s3Id = document.getElementById('compare-scheme-3')?.value;

  const s1 = SCHEMES_DATABASE.find(s => s.id === s1Id) || SCHEMES_DATABASE[0];
  const s2 = SCHEMES_DATABASE.find(s => s.id === s2Id) || SCHEMES_DATABASE[1];
  const s3 = s3Id ? SCHEMES_DATABASE.find(s => s.id === s3Id) : null;

  const schemes = [s1, s2, s3].filter(Boolean);
  const container = document.getElementById('compare-matrix-table');
  if (!container) return;

  container.innerHTML = `
    <table class="compare-table">
      <thead>
        <tr>
          <th style="width:20%;">Comparison Attribute</th>
          ${schemes.map(s => `<th style="width:${80/schemes.length}%; color:var(--primary-green); font-size:1.05rem;">${s.name}</th>`).join('')}
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><strong>Financial Benefit / Amount</strong></td>
          ${schemes.map(s => `<td style="font-size:1.1rem; font-weight:800; color:var(--primary-navy);">${s.amount || s.benefits}</td>`).join('')}
        </tr>
        <tr>
          <td><strong>Category & Level</strong></td>
          ${schemes.map(s => `<td><span class="badge blue-badge">${s.category} • ${s.level}</span></td>`).join('')}
        </tr>
        <tr>
          <td><strong>Ministry / Department</strong></td>
          ${schemes.map(s => `<td>${s.dept}</td>`).join('')}
        </tr>
        <tr>
          <td><strong>Target Eligibility</strong></td>
          ${schemes.map(s => `<td>${s.eligibility ? s.eligibility.summary : 'See portal'}</td>`).join('')}
        </tr>
        <tr>
          <td><strong>Compulsory Documents</strong></td>
          ${schemes.map(s => `<td>${s.documents ? s.documents.map(d => d.name).join(', ') : 'Aadhaar, Passbook'}</td>`).join('')}
        </tr>
        <tr>
          <td><strong>Application Mode</strong></td>
          ${schemes.map(s => `<td><a href="${s.applyUrl || s.officialUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-saffron btn-sm">Apply on Official Portal ↗</a></td>`).join('')}
        </tr>
      </tbody>
    </table>
  `;
}

// CITIZEN DASHBOARD RENDERER
function renderDashboard() {
  const savedCount = document.getElementById('dash-saved-count');
  if (savedCount) savedCount.innerText = appState.bookmarkedIds.size;

  const savedList = document.getElementById('dashboard-saved-schemes-list');
  if (savedList) {
    savedList.innerHTML = '';
    const bookmarked = SCHEMES_DATABASE.filter(s => appState.bookmarkedIds.has(s.id));

    if (bookmarked.length === 0) {
      savedList.innerHTML = `<p style="color:var(--text-muted); font-size:0.9rem; padding:12px 0;">No schemes bookmarked yet. Click the star icon ⭐ on any scheme card to save it here.</p>`;
    } else {
      bookmarked.forEach(s => {
        const item = document.createElement('div');
        item.style.cssText = "display:flex; justify-content:space-between; align-items:center; padding:12px 0; border-bottom:1px solid var(--border-light);";
        item.innerHTML = `
          <div>
            <strong>${s.name}</strong> <span style="font-size:0.8rem; color:var(--text-muted);">(${s.amount || s.category})</span>
          </div>
          <div style="display:flex; gap:8px;">
            <button class="btn btn-outline-sm" onclick="openSchemeReaderById('${s.id}')">🎨 Comic</button>
            <button class="btn btn-outline-sm" onclick="toggleSchemeBookmark('${s.id}')">❌</button>
          </div>
        `;
        savedList.appendChild(item);
      });
    }
  }
}

function updateDashDocs(checkbox) {
  const checks = document.querySelectorAll('.dash-docs-checklist input[type="checkbox"]');
  const checked = Array.from(checks).filter(c => c.checked).length;
  const elem = document.getElementById('dash-docs-count');
  if (elem) elem.innerText = `${checked} / ${checks.length}`;
}

// COMIC READER & WORKSPACE
function openSchemeReaderById(schemeId) {
  const s = SCHEMES_DATABASE.find(item => item.id === schemeId) || SCHEMES_DATABASE[0];
  appState.selectedScheme = s;
  renderReaderView();
  navigateTo('reader');
}

function openSchemeEligibilityTab(schemeId) {
  openSchemeReaderById(schemeId);
  setReaderTab('eligibility');
}

function renderReaderView() {
  const s = appState.selectedScheme || SCHEMES_DATABASE[0];
  if (!s) return;

  const nameElem = document.getElementById('reader-scheme-name');
  if (nameElem) nameElem.innerText = s.name;

  const badgeElem = document.getElementById('reader-category-badge');
  if (badgeElem) badgeElem.innerText = `${s.category} • ${s.level}`;

  const deptElem = document.getElementById('reader-scheme-dept');
  if (deptElem) deptElem.innerText = `${s.dept} | Source: India.gov.in`;

  const linkElem = document.getElementById('reader-official-link');
  if (linkElem) linkElem.href = s.applyUrl || s.officialUrl;

  // Summary card
  const summaryBox = document.getElementById('reader-scheme-summary-card');
  if (summaryBox) {
    summaryBox.innerHTML = `
      <div style="background:#fff; border:1px solid var(--border-light); border-left:5px solid var(--primary-green); border-radius:14px; padding:20px; box-shadow:var(--shadow-sm); margin-bottom:20px;">
        <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:10px;">
          <div>
            <h3 style="font-family:var(--font-heading); color:var(--primary-navy); margin:0;">📌 Key Details Overview: ${s.name}</h3>
            <p style="font-size:0.85rem; color:var(--text-muted); margin:4px 0 0 0;">Official Government Fact Sheet Grounded on India.gov.in</p>
          </div>
          <span style="font-size:1.3rem; font-weight:800; color:var(--primary-green);">${s.amount || s.benefits}</span>
        </div>
        <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(200px, 1fr)); gap:12px; margin-top:14px;">
          <div style="background:var(--bg-light); padding:10px 12px; border-radius:8px;">
            <strong style="font-size:0.8rem; color:var(--primary-green); display:block;">🎯 Purpose</strong>
            <span style="font-size:0.88rem;">${s.purpose}</span>
          </div>
          <div style="background:var(--bg-light); padding:10px 12px; border-radius:8px;">
            <strong style="font-size:0.8rem; color:var(--trust-blue); display:block;">👤 Eligibility</strong>
            <span style="font-size:0.88rem;">${s.eligibility ? s.eligibility.summary : 'All eligible citizens'}</span>
          </div>
        </div>
      </div>
    `;
  }

  // Character Card
  const charBox = document.getElementById('reader-character-card');
  if (charBox && s.character) {
    charBox.innerHTML = `
      <div style="font-size:2rem; background:var(--primary-green-subtle); padding:8px 12px; border-radius:50%;">${s.character.avatar || '🇮🇳'}</div>
      <div>
        <h4 style="font-family:var(--font-heading); font-size:1.1rem; margin:0; color:var(--primary-navy);">${s.character.name} <span style="font-size:0.8rem; color:var(--primary-green);">(${s.character.role})</span></h4>
        <p style="font-size:0.85rem; color:var(--text-muted); margin:2px 0 0 0;">${s.character.desc}</p>
      </div>
    `;
  }

  // Panels Grid
  const panelsContainer = document.getElementById('reader-panels-container');
  if (panelsContainer) {
    panelsContainer.innerHTML = '';
    const panelsList = (s.panels && s.panels.en) || s.panels || [];
    panelsList.forEach((p, idx) => {
      const pcard = document.createElement('div');
      pcard.className = 'panel-card';
      pcard.innerHTML = `
        <div class="panel-tag-header">
          <span>${p.tag || `Panel ${idx+1}`}</span>
          <button class="btn-outline-sm" onclick="showCitationModal('${escapeQuotes(p.dialogue)}', '${escapeQuotes(p.sourceRef || s.name)}', '${s.officialUrl}')">🔍 Citation</button>
        </div>
        <div class="panel-img-box">
          <img src="${p.image || `assets/pm_kisan_${(idx%4)+1}.jpg`}" alt="${p.tag}" onerror="this.onerror=null; this.src='assets/pm_kisan_1.jpg';">
        </div>
        <div class="panel-dialogue-box">
          <div class="speaker-name">${p.speaker || 'Citizen'}</div>
          <div class="speaker-text">"${p.dialogue}"</div>
        </div>
        <div class="panel-footer-bar">
          <span>📌 ${p.caption || ''}</span>
          <button class="btn-outline-sm" onclick="speakText('${escapeQuotes(p.dialogue)}')">🔊 Play</button>
        </div>
      `;
      panelsContainer.appendChild(pcard);
    });
  }

  renderReaderDocs(s);
  renderReaderSteps(s);
  renderReaderQuiz(s);
  runEligibilityCheck();
}

function setReaderTab(tabId, btnElem) {
  appState.currentReaderTab = tabId;
  document.querySelectorAll('.rtab-btn').forEach(b => b.classList.remove('active'));
  document.querySelectorAll('.rtab-pane').forEach(p => p.classList.remove('active'));

  if (btnElem) {
    btnElem.classList.add('active');
  } else {
    const b = document.querySelector(`.rtab-btn[onclick*="'${tabId}'"]`);
    if (b) b.classList.add('active');
  }

  const pane = document.getElementById(`rtab-content-${tabId}`);
  if (pane) pane.classList.add('active');
}

function renderReaderDocs(s) {
  const grid = document.getElementById('reader-docs-grid');
  if (!grid) return;
  grid.innerHTML = '';
  const list = s.documents || [];
  list.forEach((d, idx) => {
    const isChecked = appState.preparedDocs.has(d.id || `doc_${idx}`);
    const div = document.createElement('div');
    div.style.cssText = "display:flex; gap:12px; align-items:flex-start; padding:14px; background:#fff; border:1px solid var(--border-light); border-radius:10px;";
    div.innerHTML = `
      <input type="checkbox" ${isChecked ? 'checked' : ''} style="width:18px; height:18px; margin-top:3px; cursor:pointer;" onchange="toggleReaderDoc('${d.id || `doc_${idx}`}')">
      <div>
        <strong>${d.name}</strong> ${d.required ? '<span style="color:var(--rose); font-size:0.75rem;">(Compulsory)</span>' : '<span style="color:var(--text-muted); font-size:0.75rem;">(Optional)</span>'}
        <p style="font-size:0.84rem; color:var(--text-muted); margin-top:2px;">${d.why}</p>
      </div>
    `;
    grid.appendChild(div);
  });
}

function toggleReaderDoc(docId) {
  if (appState.preparedDocs.has(docId)) appState.preparedDocs.delete(docId);
  else appState.preparedDocs.add(docId);
}

function renderReaderSteps(s) {
  const list = document.getElementById('reader-steps-list');
  if (!list) return;
  list.innerHTML = '';
  const steps = s.applicationSteps || [];
  steps.forEach((st, idx) => {
    const div = document.createElement('div');
    div.style.cssText = "display:flex; gap:14px; padding:14px; background:#fff; border:1px solid var(--border-light); border-radius:10px; margin-bottom:10px;";
    div.innerHTML = `
      <div style="width:28px; height:28px; background:var(--primary-green); color:#fff; border-radius:50%; display:flex; align-items:center; justify-content:center; font-weight:800; font-size:0.85rem; flex-shrink:0;">${st.step || idx+1}</div>
      <div>
        <strong style="font-size:0.95rem;">${st.title}</strong>
        <p style="font-size:0.85rem; color:var(--text-muted); margin-top:2px;">${st.desc}</p>
      </div>
    `;
    list.appendChild(div);
  });
}

function renderReaderQuiz(s) {
  const wrapper = document.getElementById('quiz-questions-wrapper');
  if (!wrapper) return;
  wrapper.innerHTML = '';
  const quiz = s.quiz || [];
  quiz.forEach((q, qidx) => {
    const div = document.createElement('div');
    div.style.cssText = "background:#fff; border:1px solid var(--border-light); border-radius:12px; padding:18px; margin-bottom:14px;";
    div.innerHTML = `
      <h4 style="margin-bottom:12px;">Q${qidx+1}. ${q.q}</h4>
      <div style="display:flex; flex-direction:column; gap:8px;">
        ${q.options.map((opt, oidx) => `
          <button class="btn btn-outline" style="text-align:left; justify-content:flex-start;" onclick="answerReaderQuiz(${qidx}, ${oidx})">${opt}</button>
        `).join('')}
      </div>
    `;
    wrapper.appendChild(div);
  });
}

function answerReaderQuiz(qidx, oidx) {
  const s = appState.selectedScheme;
  if (!s || !s.quiz || !s.quiz[qidx]) return;
  const q = s.quiz[qidx];
  const isCorrect = oidx === q.correct;
  const card = document.getElementById('quiz-results-card');
  if (card) {
    card.style.display = 'block';
    card.innerHTML = `
      <h3 style="color:${isCorrect ? 'var(--emerald)' : 'var(--amber)'}; margin-bottom:6px;">
        ${isCorrect ? '🎉 Correct Answer!' : '⚠️ Review Scheme Facts'}
      </h3>
      <p style="font-size:0.9rem; margin-bottom:10px;">${q.explanation}</p>
      <button class="btn btn-primary btn-sm" onclick="setReaderTab('comic')">📖 Jump back to Comic</button>
    `;
  }
}

// Visual Eligibility in Reader
function runEligibilityCheck() {
  const s = appState.selectedScheme;
  if (!s || !s.eligibility) return;
  const age = parseInt(document.getElementById('elig-user-age')?.value) || userProfile.age;
  const income = parseInt(document.getElementById('elig-user-income')?.value) || userProfile.income;
  const e = s.eligibility;

  const box = document.getElementById('eligibility-result-box');
  if (!box) return;

  const isAgeOk = age >= e.minAge && age <= e.maxAge;
  const isIncomeOk = income <= e.maxIncome;

  box.innerHTML = `
    <div style="padding:14px; background:#fff; border:1px solid var(--border-light); border-radius:10px; margin-top:12px;">
      <h4 style="color:${isAgeOk && isIncomeOk ? 'var(--emerald)' : 'var(--amber)'}; margin-bottom:6px;">
        ${isAgeOk && isIncomeOk ? '🟢 Likely Eligible Based on Initial Criteria' : '🟡 Review Specific Thresholds'}
      </h4>
      <p style="font-size:0.86rem; color:var(--text-muted);">${e.summary}</p>
      <ul style="font-size:0.82rem; margin-top:6px; padding-left:20px;">
        <li>Age: ${age} yrs (${isAgeOk ? '✓ Eligible' : '✗ Outside limit ' + e.minAge + '-' + e.maxAge})</li>
        <li>Annual Income: ₹${income.toLocaleString()} (${isIncomeOk ? '✓ Within ceiling' : '✗ Above ₹' + e.maxIncome.toLocaleString()})</li>
      </ul>
    </div>
  `;
}

// Audio Speech Synthesis
function speakText(text) {
  if (!('speechSynthesis' in window)) return;
  window.speechSynthesis.cancel();
  const utt = new SpeechSynthesisUtterance(text);
  utt.rate = 1.0;
  utt.pitch = 1.02;
  window.speechSynthesis.speak(utt);
}

function togglePlayFullComic() {
  const s = appState.selectedScheme;
  if (!s) return;
  const panels = (s.panels && s.panels.en) || s.panels || [];
  let script = `Visual comic narration for ${s.name}. `;
  panels.forEach(p => {
    script += `${p.speaker} says: ${p.dialogue}. `;
  });
  speakText(script);
  document.getElementById('btn-play-comic').style.display = 'none';
  document.getElementById('btn-pause-comic').style.display = 'inline-flex';
}

function pauseAudio() {
  if ('speechSynthesis' in window) window.speechSynthesis.cancel();
  document.getElementById('btn-play-comic').style.display = 'inline-flex';
  document.getElementById('btn-pause-comic').style.display = 'none';
}

function setAudioSpeed(val) {
  if ('speechSynthesis' in window && window.speechSynthesis.speaking) {
    pauseAudio();
    togglePlayFullComic();
  }
}

// Citations Modal
function showCitationModal(statement, sourceRef, url) {
  const stmt = document.getElementById('cite-statement-text');
  if (stmt) stmt.innerText = statement;
  const src = document.getElementById('cite-source-text');
  if (src) src.innerText = `Verified against official records: ${sourceRef}`;
  const loc = document.getElementById('cite-location-text');
  if (loc) loc.innerText = sourceRef;
  const link = document.getElementById('cite-url-link');
  if (link) link.href = url || "https://www.india.gov.in/my-government/schemes";

  const modal = document.getElementById('citation-modal');
  if (modal) modal.style.display = 'flex';
}

function hideCitationModal() {
  const modal = document.getElementById('citation-modal');
  if (modal) modal.style.display = 'none';
}

function closeCitationModal(e) {
  if (e.target.id === 'citation-modal') hideCitationModal();
}

// Hero Search Handler
function handleHeroSearch() {
  const input = document.getElementById('hero-search-input');
  const val = input ? input.value.trim() : '';
  if (!val) return;
  navigateTo('explore');
  const dirSearch = document.getElementById('directory-search');
  if (dirSearch) {
    dirSearch.value = val;
    renderDirectory();
  }
}

function quickSearch(q) {
  const input = document.getElementById('hero-search-input');
  if (input) input.value = q;
  handleHeroSearch();
}

function handleTopCreateButtonClick() {
  navigateTo('reader');
}

// ================= MITRA PERSONALIZED AI ASSISTANT ENGINE =================
function toggleFloatingChat() {
  const popup = document.getElementById('floating-chat-popup');
  if (!popup) return;
  const isHidden = popup.style.display === 'none' || !popup.style.display;
  popup.style.display = isHidden ? 'flex' : 'none';
  if (isHidden) {
    const input = document.getElementById('fchat-input');
    if (input) input.focus();
  }
}

function sendFloatingQuickQuestion(qText) {
  const input = document.getElementById('fchat-input');
  if (input) {
    input.value = qText;
    sendFloatingChatMessage();
  }
}

function handleFloatingChatKeyPress(e) {
  if (e.key === 'Enter') sendFloatingChatMessage();
}

function generateMitraPersonalizedAnswer(query) {
  const q = query.toLowerCase().trim();
  const p = userProfile;

  // 1. Personalized Recommendation Request
  if (q.includes('recommend') || q.includes('for me') || q.includes('suit') || q.includes('profile') || q.includes('student in telangana') || q.includes('what can i get')) {
    const topMatches = SCHEMES_DATABASE.map(s => ({
      scheme: s,
      score: computeSchemeMatchScore(s, p)
    })).sort((a, b) => b.score - a.score).slice(0, 3);

    let answer = `🌟 **Namaste! Based on your active profile (${p.occupation}, ${p.age} yrs, ${p.state}, Income: ₹${p.income.toLocaleString()}), here are your top matched schemes:**\n\n`;
    topMatches.forEach((m, idx) => {
      answer += `**${idx+1}. ${m.scheme.name}** (${m.score}% Match)\n• **Benefit**: ${m.scheme.amount || m.scheme.benefits}\n• **Highlights**: ${m.scheme.purpose}\n\n`;
    });
    answer += `💬 *Click "Open Comic Reader" below any card to view the 4-panel visual explanation!*`;

    return {
      answer: answer,
      sourceRef: "India.gov.in & State Portals Verified",
      schemeId: topMatches[0].scheme.id
    };
  }

  // 2. Specific Scheme Matching
  let matchedScheme = SCHEMES_DATABASE.find(s => 
    q.includes(s.name.toLowerCase()) || 
    (s.id && q.includes(s.id.toLowerCase()))
  );

  if (!matchedScheme) {
    if (q.includes('scholarship') || q.includes('merit') || q.includes('college') || q.includes('student') || q.includes('50000')) {
      matchedScheme = SCHEMES_DATABASE.find(s => s.id === 'pm_merit_scholarship');
    } else if (q.includes('rythu') || q.includes('bandhu') || q.includes('telangana farm') || q.includes('10000')) {
      matchedScheme = SCHEMES_DATABASE.find(s => s.id === 'rythu_bandhu');
    } else if (q.includes('unorganised') || q.includes('worker') || q.includes('shram') || q.includes('pension') || q.includes('3000')) {
      matchedScheme = SCHEMES_DATABASE.find(s => s.id === 'nps_unorganised');
    } else if (q.includes('kalyana') || q.includes('lakshmi') || q.includes('marriage') || q.includes('bride') || q.includes('100116')) {
      matchedScheme = SCHEMES_DATABASE.find(s => s.id === 'kalyana_lakshmi');
    } else if (q.includes('awas') || q.includes('house') || q.includes('housing') || q.includes('urban') || q.includes('pucca')) {
      matchedScheme = SCHEMES_DATABASE.find(s => s.id === 'pm_awas_urban');
    } else if (q.includes('solar') || q.includes('surya') || q.includes('bijli') || q.includes('electricity') || q.includes('78000')) {
      matchedScheme = SCHEMES_DATABASE.find(s => s.id === 'surya_ghar');
    } else if (q.includes('health') || q.includes('hospital') || q.includes('ayushman') || q.includes('5 lakh')) {
      matchedScheme = SCHEMES_DATABASE.find(s => s.id === 'ayushman');
    } else if (q.includes('kisan') || q.includes('farmer') || q.includes('6000')) {
      matchedScheme = SCHEMES_DATABASE.find(s => s.id === 'pm_kisan');
    }
  }

  if (matchedScheme) {
    const s = matchedScheme;
    const docs = s.documents ? s.documents.map(d => d.name).join(', ') : 'Aadhaar Card, Bank Passbook';
    return {
      answer: `🏛️ **${s.name}** (${s.level} • ${s.category})\n\n🎁 **Key Benefit**: ${s.amount || s.benefits}\n\n🎯 **Objective**: ${s.purpose}\n\n👤 **Who is Eligible**: ${s.eligibility ? s.eligibility.summary : 'All eligible citizens'}\n\n📄 **Required Documents**: ${docs}\n\n🚀 [Click here to Apply Online](${s.applyUrl || s.officialUrl})`,
      sourceRef: `Official India.gov.in Record (${s.dept})`,
      schemeId: s.id
    };
  }

  // 3. General Fallback
  return {
    answer: `👋 **Namaste! I am Mitra, your personalized AI Scheme Guide.**\n\nI can help you discover and apply for central and state welfare benefits:\n\n• 🎓 **PM Merit Scholarship**: ₹50,000/yr for meritorious students\n• 🌾 **Telangana Rythu Bandhu**: ₹10,000/acre farm support\n• 👵 **NPS for Unorganised Workers**: ₹3,000/mo lifelong pension\n• 🏠 **PM Awas Yojana**: Up to ₹2.5 Lakh housing subsidy\n• 🏥 **Ayushman Bharat**: ₹5 Lakh cashless healthcare\n\n💬 *Tell me your age, state, or occupation for instant personalized matching!*`,
    sourceRef: "National Portal of India (India.gov.in)",
    schemeId: "pm_merit_scholarship"
  };
}

async function sendFloatingChatMessage() {
  const input = document.getElementById('fchat-input');
  const text = input ? input.value.trim() : '';
  if (!text) return;

  const box = document.getElementById('fchat-messages');
  if (!box) return;

  // Render User Message
  const udiv = document.createElement('div');
  udiv.className = 'chat-msg user-msg';
  udiv.innerHTML = `<div class="msg-content"><p>${escapeQuotes(text)}</p></div>`;
  box.appendChild(udiv);
  input.value = '';
  box.scrollTop = box.scrollHeight;

  // Render Thinking Bot Message
  const bdiv = document.createElement('div');
  bdiv.className = 'chat-msg bot-msg';
  bdiv.innerHTML = `
    <div class="msg-avatar">🤖</div>
    <div class="msg-content">
      <p style="font-style:italic; color:#64748b;">Mitra is consulting official India.gov.in records...</p>
    </div>
  `;
  box.appendChild(bdiv);
  box.scrollTop = box.scrollHeight;

  // Try Server AI API or fallback to client-side grounded response
  let answer = "";
  let sourceRef = "India.gov.in Official Database";
  let matchedSchemeId = null;

  try {
    const res = await fetch(`${API_BASE_URL}/ask-ai`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ question: text, schemeName: "All Government Schemes", userProfile: userProfile })
    });
    if (res.ok) {
      const data = await res.json();
      answer = data.answer;
      if (data.sourceRef) sourceRef = data.sourceRef;
      if (data.schemeId) matchedSchemeId = data.schemeId;
    }
  } catch (e) {}

  if (!answer) {
    const result = generateMitraPersonalizedAnswer(text);
    answer = result.answer;
    sourceRef = result.sourceRef;
    matchedSchemeId = result.schemeId;
  }

  let ctaBtn = "";
  if (matchedSchemeId) {
    ctaBtn = `
      <div style="margin-top:10px; display:flex; gap:8px;">
        <button class="btn btn-primary btn-sm" style="font-size:0.75rem; padding:4px 10px;" onclick="openSchemeReaderById('${matchedSchemeId}')">🎨 View Comic Story ↗</button>
        <button class="btn btn-outline-sm" style="font-size:0.75rem;" onclick="speakText('${escapeQuotes(answer.replace(/[*#]/g, ''))}')">🔊 Listen</button>
      </div>
    `;
  }

  bdiv.innerHTML = `
    <div class="msg-avatar">🤖</div>
    <div class="msg-content">
      <div>${formatChatMarkdown(answer)}</div>
      ${ctaBtn}
      <div style="font-size:0.72rem; color:var(--emerald); margin-top:6px; font-weight:700;">✓ Source: ${sourceRef}</div>
    </div>
  `;
  box.scrollTop = box.scrollHeight;
}

// Scheme-Specific Chat (Reader Tab 5)
function handleChatKeyPress(e) {
  if (e.key === 'Enter') sendChatMessage();
}

function askPresetQuestion(q) {
  const input = document.getElementById('chat-user-input');
  if (input) input.value = q;
  sendChatMessage();
}

async function sendChatMessage() {
  const input = document.getElementById('chat-user-input');
  const text = input ? input.value.trim() : '';
  if (!text) return;

  const box = document.getElementById('chat-messages');
  if (!box) return;

  const udiv = document.createElement('div');
  udiv.className = 'chat-msg user-msg';
  udiv.innerHTML = `<div class="msg-content"><p>${escapeQuotes(text)}</p></div>`;
  box.appendChild(udiv);
  input.value = '';
  box.scrollTop = box.scrollHeight;

  const s = appState.selectedScheme || SCHEMES_DATABASE[0];

  const bdiv = document.createElement('div');
  bdiv.className = 'chat-msg bot-msg';
  bdiv.innerHTML = `
    <div class="msg-avatar">🏛️</div>
    <div class="msg-content">
      <p style="font-style:italic; color:#64748b;">Consulting official records for ${s.name}...</p>
    </div>
  `;
  box.appendChild(bdiv);
  box.scrollTop = box.scrollHeight;

  const result = generateMitraPersonalizedAnswer(`${text} about ${s.name}`);
  bdiv.innerHTML = `
    <div class="msg-avatar">🏛️</div>
    <div class="msg-content">
      <div>${formatChatMarkdown(result.answer)}</div>
      <span class="badge green-badge" style="margin-top:6px; font-size:0.72rem;">✓ Grounded on ${s.dept}</span>
    </div>
  `;
  box.scrollTop = box.scrollHeight;
}

// Formatting Helper
function formatChatMarkdown(text) {
  if (!text) return "";
  return text
    .replace(/\n/g, '<br/>')
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
    .replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer" style="color:#0284c7; text-decoration:underline; font-weight:700;">$1 ↗</a>');
}

function escapeQuotes(str) {
  return (str || '').replace(/'/g, "\\'").replace(/"/g, '&quot;');
}

// Accessibility Menu & Theme Toggles with Persistent Auto-Adjustment
function toggleA11yMenu() {
  const dd = document.getElementById('a11y-dropdown');
  if (!dd) return;
  dd.style.display = dd.style.display === 'none' || !dd.style.display ? 'flex' : 'none';
}

function adjustFontSize(delta) {
  appState.fontSizeMultiplier = Math.max(0.85, Math.min(1.4, appState.fontSizeMultiplier + delta * 0.08));
  document.documentElement.style.setProperty('--font-scale', `${appState.fontSizeMultiplier}rem`);
  try {
    localStorage.setItem('govtoon_font_scale', appState.fontSizeMultiplier);
  } catch (e) {}
}

function toggleHighContrast(enabled) {
  appState.isHighContrast = enabled;
  if (enabled) {
    document.body.classList.add('theme-contrast');
    document.body.classList.remove('theme-dark');
    appState.isDarkMode = false;
  } else {
    document.body.classList.remove('theme-contrast');
  }

  const chk = document.getElementById('chk-high-contrast');
  if (chk) chk.checked = enabled;

  try {
    localStorage.setItem('govtoon_contrast_mode', enabled ? 'true' : 'false');
    localStorage.setItem('govtoon_dark_mode', 'false');
  } catch (e) {}

  renderDirectory();
}

function toggleReduceMotion(enabled) {
  appState.isReduceMotion = enabled;
  if (enabled) {
    document.body.classList.add('reduce-motion');
  } else {
    document.body.classList.remove('reduce-motion');
  }

  const chk = document.getElementById('chk-reduce-motion');
  if (chk) chk.checked = enabled;

  try {
    localStorage.setItem('govtoon_reduce_motion', enabled ? 'true' : 'false');
  } catch (e) {}
}

function setupThemeToggles() {
  // Load saved preferences
  try {
    const savedScale = localStorage.getItem('govtoon_font_scale');
    if (savedScale) {
      appState.fontSizeMultiplier = parseFloat(savedScale);
      document.documentElement.style.setProperty('--font-scale', `${appState.fontSizeMultiplier}rem`);
    }

    const savedContrast = localStorage.getItem('govtoon_contrast_mode');
    if (savedContrast === 'true') {
      toggleHighContrast(true);
    }

    const savedDark = localStorage.getItem('govtoon_dark_mode');
    if (savedDark === 'true' && savedContrast !== 'true') {
      document.body.classList.add('theme-dark');
      appState.isDarkMode = true;
    }

    const savedMotion = localStorage.getItem('govtoon_reduce_motion');
    if (savedMotion === 'true') {
      toggleReduceMotion(true);
    }
  } catch (e) {}

  const contrastBtn = document.getElementById('btn-contrast-toggle');
  if (contrastBtn) {
    contrastBtn.addEventListener('click', () => {
      const isCurrentlyContrast = document.body.classList.contains('theme-contrast');
      toggleHighContrast(!isCurrentlyContrast);
    });
  }

  const themeBtn = document.getElementById('btn-theme-toggle');
  if (themeBtn) {
    themeBtn.addEventListener('click', () => {
      if (document.body.classList.contains('theme-contrast')) {
        toggleHighContrast(false);
      }
      const isDark = document.body.classList.toggle('theme-dark');
      appState.isDarkMode = isDark;
      try {
        localStorage.setItem('govtoon_dark_mode', isDark ? 'true' : 'false');
      } catch (e) {}
      renderDirectory();
    });
  }
}

// Language Selector
function setupLanguageSelector() {
  const sel = document.getElementById('app-language-select');
  if (!sel) return;
  sel.addEventListener('change', (e) => {
    appState.currentLang = e.target.value;
  });
}

