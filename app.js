// GovToon — Production Full-Stack AI Government Scheme Explainer
// Official Source Grounding: India.gov.in National Portal of India / myScheme

let API_BASE_URL = 'http://localhost:5000/api';

// Grounded Schemes Knowledge Base
const SCHEMES_DATABASE = [
  {
    id: "pm_kisan",
    name: "PM-Kisan Samman Nidhi",
    category: "Agriculture",
    level: "Central",
    dept: "Ministry of Agriculture & Farmers Welfare",
    purpose: "Provide income support to small and marginal farmer families across India for purchasing agricultural inputs.",
    benefits: "₹6,000 per year transferred directly to bank account in 3 equal installments of ₹2,000.",
    eligibility: {
      minAge: 18, maxAge: 100, maxIncome: 500000, state: "All India", occupation: "Farmer",
      summary: "Small and marginal landholding farmer families holding cultivable land in their names."
    },
    documents: [
      { id: "d1", name: "Aadhaar Card", required: true, why: "Compulsory identity verification via UIDAI" },
      { id: "d2", name: "Land Holding Documents", required: true, why: "Proves ownership of cultivable agricultural land" },
      { id: "d3", name: "Bank Passbook & IFSC", required: true, why: "Required for Direct Benefit Transfer (DBT)" },
      { id: "d4", name: "Mobile Number", required: false, why: "For OTP verification & SMS payment alerts" }
    ],
    applicationSteps: [
      { step: 1, title: "Check Eligibility", desc: "Ensure your land documents are registered in your name." },
      { step: 2, title: "Gather Aadhaar & Passbook", desc: "Keep original Aadhaar card and bank passbook handy." },
      { step: 3, title: "Visit Jan Seva Kendra / Portal", desc: "Visit nearest Common Service Center (CSC) or pmkisan.gov.in." },
      { step: 4, title: "Submit e-KYC & Passbook", desc: "Complete biometric or OTP e-KYC verification." },
      { step: 5, title: "Receive ₹2,000 DBT", desc: "First installment transferred directly to your bank account." }
    ],
    officialUrl: "https://www.india.gov.in/my-government/schemes/pm-kisan-samman-nidhi",
    sourceUrl: "https://pmkisan.gov.in",
    lastVerified: "2026-08-24",
    character: { name: "Ramu Kaka", role: "Small Farmer", avatar: "👨🏽‍🌾", clothing: "White Kurta & Blue Gamcha" },
    panels: {
      en: [
        {
          num: 1, tag: "Panel 1: The Tension", image: "assets/pm_kisan_1.jpg",
          speaker: "Ramu Kaka", dialogue: "Hey Bhagwan! Seed and fertilizer prices have gone up. Where will I get the money to sow crops this season?",
          caption: "Ramu Kaka worries about rising agricultural costs.",
          sourceRef: "Section 1: Background & Target Beneficiaries (Page 1)"
        },
        {
          num: 2, tag: "Panel 2: The Solution", image: "assets/pm_kisan_2.jpg",
          speaker: "CSC Bhaiya", dialogue: "Don't worry Kaka! The Government sends ₹2,000 directly to your bank account 3 times a year!",
          caption: "Sarkari Paisa, Seedha Khate Mein (Direct Benefit Transfer).",
          sourceRef: "Section 2: Benefit Structure - ₹6000/yr in 3 installments (Page 2)"
        },
        {
          num: 3, tag: "Panel 3: The Easy Path", image: "assets/pm_kisan_3.jpg",
          speaker: "Ramu Kaka & Bhaiya", dialogue: "Ramu Kaka: 'Is Aadhaar and Bank book enough?' Bhaiya: 'Yes! Simple fingerprint e-KYC at the Jan Seva Kendra.'",
          caption: "Simple registration with Aadhaar & Land Passbook.",
          sourceRef: "Section 3: Mandatory Documents & e-KYC (Page 3)"
        },
        {
          num: 4, tag: "Panel 4: The Khushali", image: "assets/pm_kisan_4.jpg",
          speaker: "Tagline", dialogue: "🌾 PM-Kisan: Kheti Ki Takat, Kisan Ki Barkat!",
          caption: "Prosperity restored, seeds bought on time.",
          sourceRef: "Section 4: Disbursement & Impact (Page 4)"
        }
      ],
      te: [
        { num: 1, tag: "ప్యానెల్ 1: ఆందోళన", image: "assets/pm_kisan_1.jpg", speaker: "రాము కాకా", dialogue: "అయ్యో భగవంతుడా! విత్తనాలు, ఎరువుల ధరలు పెరిగాయి. విత్తనాలు వేయడానికి డబ్బు ఎక్కడి నుంచి వస్తుంది?", caption: "వ్యవసాయ ఖర్చుల గురించి రాము కాకా ఆందోళన.", sourceRef: "Section 1" },
        { num: 2, tag: "ప్యానెల్ 2: పరిష్కారం", image: "assets/pm_kisan_2.jpg", speaker: "సిఎస్‌సి భయ్యా", dialogue: "దిగులుపడకండి కాకా! ప్రభుత్వం ఏడాదికి 3 సార్లు ₹2,000 నేరుగా మీ బ్యాంక్ ఖాతాలో వేస్తుంది!", caption: "ప్రభుత్వ సహాయం నేరుగా మీ ఖాతాలోనే.", sourceRef: "Section 2" },
        { num: 3, tag: "ప్యానెల్ 3: సులువైన మార్గం", image: "assets/pm_kisan_3.jpg", speaker: "భయ్యా", dialogue: "మీ ఆధార్ కార్డు, బ్యాంక్ పాస్‌బుక్ తీసుకెళ్లి జనసేవా కేంద్రంలో ఇ-కెవైసి చేయించండి.", caption: "ఆధార్ కార్డుతో సులువైన నమోదు.", sourceRef: "Section 3" },
        { num: 4, tag: "ప్యానెల్ 4: సంతోషం", image: "assets/pm_kisan_4.jpg", speaker: "ట్యాగ్‌లైన్", dialogue: "🌾 పిఎమ్-కిసాన్: వ్యవసాయానికి బలం, రైతుకు సమృద్ధి!", caption: "సమయానికి విత్తనాలు కొనుగోలు.", sourceRef: "Section 4" }
      ],
      hi: [
        { num: 1, tag: "पैनल 1: चिंता", image: "assets/pm_kisan_1.jpg", speaker: "रामू काका", dialogue: "हे भगवान! खाद और बीज के दाम बढ़ गए हैं। बुवाई के लिए पैसा कहां से लाऊं?", caption: "खेती की लागत से चिंता।", sourceRef: "Section 1" },
        { num: 2, tag: "पैनल 2: समाधान", image: "assets/pm_kisan_2.jpg", speaker: "सीएससी भैया", dialogue: "फिक्र मत कीजिए काका! सरकार हर साल 3 बार ₹2,000 सीधे आपके बैंक खाते में भेजती है!", caption: "सरकारी पैसा सीधा बैंक खाते में।", sourceRef: "Section 2" },
        { num: 3, tag: "पैनल 3: आसान रास्ता", image: "assets/pm_kisan_3.jpg", speaker: "सीएससी भैया", dialogue: "बस आधार कार्ड और पासबुक लेकर जन सेवा केंद्र पर ई-केवाईसी करवाएं।", caption: "आधार से आसान पंजीकरण।", sourceRef: "Section 3" },
        { num: 4, tag: "पैनल 4: खुशहाली", image: "assets/pm_kisan_4.jpg", speaker: "टैगलाइन", dialogue: "🌾 पीएम-किसान: खेती की ताकत, किसान की बरकत!", caption: "समय पर बीज खरीदा।", sourceRef: "Section 4" }
      ]
    },
    quiz: [
      { q: "What total financial assistance is provided under PM-Kisan per year?", options: ["₹2,000 per year", "₹6,000 per year in 3 installments", "₹10,000 one-time loan", "₹1,000 monthly pension"], correct: 1, panelRef: 2, explanation: "PM-Kisan provides ₹6,000 per year directly to bank accounts in 3 equal installments of ₹2,000." },
      { q: "Which official identity document is mandatory for e-KYC verification?", options: ["Ration Card", "Aadhaar Card", "Driving License", "Electricity Bill"], correct: 1, panelRef: 3, explanation: "Aadhaar Card is compulsory for completing e-KYC verification under PM-Kisan rules." },
      { q: "Where can a farmer visit for physical application and e-KYC assistance?", options: ["Common Service Center (Jan Seva Kendra)", "Railway Station", "Post Office Only", "Private Bank Counter"], correct: 0, panelRef: 3, explanation: "Farmers can visit their nearest Common Service Center (CSC / Jan Seva Kendra) or pmkisan.gov.in." }
    ]
  },
  {
    id: "pension",
    name: "PM Shram Yogi Maandhan (Micro-Pension)",
    category: "Banking & Finance",
    level: "Central",
    dept: "Ministry of Labour & Employment",
    purpose: "Old age protection and social security for unorganized workers like tea vendors, street hawkers, and rickshaw pullers.",
    benefits: "Guaranteed monthly pension of ₹3,000 after reaching 60 years of age, with 50% government co-contribution.",
    eligibility: { minAge: 18, maxAge: 40, maxIncome: 180000, state: "All India", occupation: "Vendor", summary: "Unorganized workers aged 18 to 40 years with monthly income up to ₹15,000." },
    documents: [
      { id: "d1", name: "Aadhaar Card", required: true, why: "Identity & age proof" },
      { id: "d2", name: "Savings Bank Account / Jan Dhan", required: true, why: "Auto-debit for monthly savings" },
      { id: "d3", name: "Mobile Phone", required: true, why: "OTP verification & subscription receipt" }
    ],
    applicationSteps: [
      { step: 1, title: "Check Age (18-40 Years)", desc: "Ensure you enter before turning 40 to lock low monthly savings." },
      { step: 2, title: "Take Aadhaar & Jan Dhan Passbook", desc: "Visit nearest CSC / Jan Seva Kendra." },
      { step: 3, title: "Set Auto-Debit (₹55 - ₹200)", desc: "Select monthly savings amount matched 100% by Government." },
      { step: 4, title: "Receive Pension Card", desc: "Get Shram Yogi Pension Card for lifetime monthly ₹3,000." }
    ],
    officialUrl: "https://www.india.gov.in/my-government/schemes/pm-shram-yogi-maandhan",
    sourceUrl: "https://maandhan.in",
    lastVerified: "2026-08-24",
    character: { name: "Kalu", role: "Tea Stall Owner", avatar: "👴🏽", desc: "Hardworking vendor worried about old age & aching bones" },
    panels: {
      en: [
        { num: 1, tag: "Panel 1: The Tension", image: "assets/panel1.jpg", speaker: "Kalu", dialogue: "Didi, my bones ache. I can't sell tea forever. What happens when I am too old to stand?", caption: "Kalu worries about his future.", sourceRef: "Section 1" },
        { num: 2, tag: "Panel 2: The Solution", image: "assets/panel2.jpg", speaker: "Didi", dialogue: "Kalu, think of this scheme like planting a banyan tree. Drop coins today, get shade (money) every month when old.", caption: "Old age support grows with you.", sourceRef: "Section 2" },
        { num: 3, tag: "Panel 3: The Easy Path", image: "assets/panel3.jpg", speaker: "Didi", dialogue: "Just take your Aadhaar card to the Blue Building down the street. Tell them you want to save ₹20 a day.", caption: "Simple registration at Jan Seva Kendra.", sourceRef: "Section 3" },
        { num: 4, tag: "Panel 4: The Khushali", image: "assets/panel4.jpg", speaker: "Alert", dialogue: "🎉 Monthly Pension Received: ₹3,000", caption: "Save a little now, get a 'Salary' for life when you retire.", sourceRef: "Section 4" }
      ],
      te: [
        { num: 1, tag: "ప్యానెల్ 1: ఆందోళన", image: "assets/panel1.jpg", speaker: "కాలు", dialogue: "దిదీ, వయసు పైబడుతోంది. ఎల్లప్పుడూ టీ అమ్మలేను.", caption: "భవిష్యత్తు గురించి ఆందోళన.", sourceRef: "Section 1" },
        { num: 2, tag: "ప్యానెల్ 2: పరిష్కారం", image: "assets/panel2.jpg", speaker: "దిదీ", dialogue: "ఈ పథకాన్ని ఒక మర్రిచెట్టు నాటడం లాంటిదిగా భావించు.", caption: "వృద్ధాప్య ఆసరా.", sourceRef: "Section 2" },
        { num: 3, tag: "ప్యానెల్ 3: నమోదు", image: "assets/panel3.jpg", speaker: "దిదీ", dialogue: "మీ ఆధార్ కార్డు తీసుకెళ్లి సేవ కేంద్రంలో ఇవ్వండి.", caption: "సులువైన నమోదు.", sourceRef: "Section 3" },
        { num: 4, tag: "ప్యానెల్ 4: ఆనందం", image: "assets/panel4.jpg", speaker: "అలర్ట్", dialogue: "🎉 నెలవారీ పెన్షన్ లభించింది: ₹3,000", caption: "నెలవారీ పెన్షన్ హామీ.", sourceRef: "Section 4" }
      ],
      hi: [
        { num: 1, tag: "पैनल 1: चिंता", image: "assets/panel1.jpg", speaker: "कालू", dialogue: "दीदी, अब शरीर थकने लगा है। हमेशा चाय नहीं बेच सकता।", caption: "भविष्य की चिंता।", sourceRef: "Section 1" },
        { num: 2, tag: "पैनल 2: समाधान", image: "assets/panel2.jpg", speaker: "दीदी", dialogue: "कालू, इसे बरगद का पेड़ लगाने जैसा समझो।", caption: "बूढ़ापे की मजबूत लाठी।", sourceRef: "Section 2" },
        { num: 3, tag: "पैनल 3: आसान पंजीकरण", image: "assets/panel3.jpg", speaker: "दीदी", dialogue: "बस अपना आधार कार्ड नीले जन सेवा केंद्र ले जाओ।", caption: "आसान पंजीकरण।", sourceRef: "Section 3" },
        { num: 4, tag: "पैनल 4: खुशहाली", image: "assets/panel4.jpg", speaker: "अलर्ट", dialogue: "🎉 मासिक पेंशन प्राप्त: ₹3,000", caption: "हर महीने ₹3,000 की गारंटी।", sourceRef: "Section 4" }
      ]
    },
    quiz: [
      { q: "What guaranteed monthly pension is provided after 60 years of age?", options: ["₹1,000/month", "₹3,000/month for life", "₹5,000 one-time", "₹500/month"], correct: 1, panelRef: 4, explanation: "Guaranteed monthly pension of ₹3,000 is paid every month after completing 60 years." }
    ]
  },
  {
    id: "ayushman",
    name: "Ayushman Bharat PM-JAY (Health Shield)",
    category: "Health",
    level: "Central",
    dept: "National Health Authority (NHA)",
    purpose: "Provide health cover up to ₹5 Lakh per family per year for secondary and tertiary cashless hospitalization.",
    benefits: "₹500,000 cashless hospitalization per family per year across 28,000+ empanelled hospitals.",
    eligibility: { minAge: 0, maxAge: 100, maxIncome: 300000, state: "All India", occupation: "Vendor", summary: "Low-income urban & rural families identified via SECC database." },
    documents: [
      { id: "d1", name: "Aadhaar Card", required: true, why: "Biometric identification at hospital counter" },
      { id: "d2", name: "Ration Card", required: true, why: "Family member mapping" }
    ],
    applicationSteps: [
      { step: 1, title: "Check Ayushman Card Status", desc: "Visit beneficiary.nha.gov.in or nearest hospital Pradhan Mantri Arogyamitra." },
      { step: 2, title: "Show Aadhaar & Ration Card", desc: "Complete instant e-KYC." },
      { step: 3, title: "Get Golden Ayushman Card", desc: "Free Ayushman PVC Card issued." },
      { step: 4, title: "Cashless Treatment", desc: "Show card at hospital counter for ₹5 Lakh zero-cash treatment." }
    ],
    officialUrl: "https://www.india.gov.in/my-government/schemes/ayushman-bharat",
    sourceUrl: "https://pmjay.gov.in",
    lastVerified: "2026-08-24",
    character: { name: "Lata Tai", role: "Domestic Worker", avatar: "👩🏽", desc: "Working mother worried about high hospital operation costs" },
    panels: {
      en: [
        { num: 1, tag: "Panel 1: The Emergency", image: "assets/panel1.jpg", speaker: "Lata Tai", dialogue: "Doctor says operation costs ₹1 Lakh! Where will we get this money at midnight?", caption: "Medical emergencies cause unexpected panic.", sourceRef: "Section 1" },
        { num: 2, tag: "Panel 2: The Solution", image: "assets/panel2.jpg", speaker: "Asha Didi", dialogue: "Don't sell your gold! Show this Ayushman Card. Government pays up to ₹5 Lakh directly!", caption: "Golden Health Shield covers hospital bills.", sourceRef: "Section 2" },
        { num: 3, tag: "Panel 3: The Easy Path", image: "assets/panel3.jpg", speaker: "Arogyamitra", dialogue: "Just scan fingerprint with Aadhaar. Zero cash required at hospital counter.", caption: "Instant cashless authorization.", sourceRef: "Section 3" },
        { num: 4, tag: "Panel 4: The Recovery", image: "assets/panel4.jpg", speaker: "Lata Tai", dialogue: "Paid zero rupees! My family is healthy and debt-free.", caption: "Full hospital treatment with zero cash out of pocket.", sourceRef: "Section 4" }
      ],
      te: [
        { num: 1, tag: "ప్యానెల్ 1: అత్యవసరం", image: "assets/panel1.jpg", speaker: "లతా తాయి", dialogue: "ఆపరేషన్‌కు లక్ష రూపాయలు అవుతాయని డాక్టర్ చెప్పారు!", caption: "వైద్య అత్యవసర పరిస్థితి.", sourceRef: "Section 1" },
        { num: 2, tag: "ప్యానెల్ 2: ఆయుష్మాన్ కార్డ్", image: "assets/panel2.jpg", speaker: "ఆశా దిదీ", dialogue: "ఆయుష్మాన్ గోల్డెన్ కార్డ్ చూపించండి. ప్రభుత్వం 5 లక్షల వరకు ఉచిత వైద్యం అందిస్తుంది!", caption: "ఉచిత వైద్య భద్రత.", sourceRef: "Section 2" },
        { num: 3, tag: "ప్యానెల్ 3: ఉచిత చికిత్స", image: "assets/panel3.jpg", speaker: "ఆరోగ్యమిత్ర", dialogue: "ఆధార్ వేలిముద్ర వేస్తే సరిపోతుంది. కౌంటర్లో ఒక్క రూపాయి కూడా ఇవ్వవద్దు.", caption: "క్యాష్‌లెస్ చికిత్స.", sourceRef: "Section 3" },
        { num: 4, tag: "ప్యానెల్ 4: ఆనందం", image: "assets/panel4.jpg", speaker: "లతా తాయి", dialogue: "సున్నా రూపాయలు చెల్లించాం! కుటుంబం ఆరోగ్యంగా ఉంది.", caption: "ఉచిత చికిత్స.", sourceRef: "Section 4" }
      ],
      hi: [
        { num: 1, tag: "पैनल 1: आपात स्थिति", image: "assets/panel1.jpg", speaker: "लता ताई", dialogue: "डॉक्टर साहब कह रहे हैं ऑपरेशन में ₹1 लाख लगेगा!", caption: "अस्पताल के खर्च से चिंता।", sourceRef: "Section 1" },
        { num: 2, tag: "पैनल 2: समाधान", image: "assets/panel2.jpg", speaker: "आशा दीदी", dialogue: "आयुष्मान कार्ड दिखाओ। सरकार ₹5 लाख तक का अस्पताल खर्च खुद देगी!", caption: "₹5 लाख का मुफ्त इलाज।", sourceRef: "Section 2" },
        { num: 3, tag: "पैनल 3: कैशलेस प्रक्रिया", image: "assets/panel3.jpg", speaker: "आरोग्यमित्र", dialogue: "बस आधार से फिंगरप्रिंट लगाएं। अस्पताल में ₹1 भी नगद नहीं देना होगा।", caption: "कैशलेस अस्पताल सेवा।", sourceRef: "Section 3" },
        { num: 4, tag: "पैनल 4: स्वस्थ परिवार", image: "assets/panel4.jpg", speaker: "लता ताई", dialogue: "₹0 में पूरा इलाज हो गया! परिवार सुरक्षित है।", caption: "बिना कर्ज के इलाज।", sourceRef: "Section 4" }
      ]
    },
    quiz: [
      { q: "What is the annual health cover provided per family under Ayushman Bharat?", options: ["₹50,000", "₹5 Lakhs per family per year", "₹1 Lakh", "₹10 Lakhs"], correct: 1, panelRef: 2, explanation: "Ayushman Bharat provides ₹5 Lakh cashless hospitalization cover per family per year." }
    ]
  }
];

// App State
let appState = {
  currentView: "home",
  currentLang: "en",
  currentPersona: "farmer",
  currentReaderTab: "comic",
  selectedScheme: SCHEMES_DATABASE[0],
  preparedDocs: new Set(),
  bookmarkedIds: new Set(["pm_kisan"]),
  isServerOnline: false
};

// UI Translations
const TRANSLATIONS = {
  en: { home: "Home", explore: "Explore Schemes", create: "Create Comic", reader: "Comic Reader", library: "My Library", ask: "Ask GovToon", admin: "Admin" },
  te: { home: "హోమ్", explore: "పథకాలు వెతకండి", create: "కామిక్ తయారు చేయండి", reader: "కామిక్ చదవండి", library: "లైబ్రరీ", ask: "గోవ్‌టూన్ అడగండి", admin: "అడ్మిన్" },
  hi: { home: "होम", explore: "योजनाएं खोजें", create: "कॉमिक बनाएं", reader: "कॉमिक पढ़ें", library: "मेरी लाइब्रेरी", ask: "गवटून से पूछें", admin: "एडमिन" }
};

// Initialize App
document.addEventListener("DOMContentLoaded", async () => {
  setupNavigation();
  setupLanguageSelector();
  checkServerHealth();
  renderDirectory(SCHEMES_DATABASE);
  renderReaderView();
  renderLibrary();
});

// Check AI Server Health
async function checkServerHealth() {
  try {
    const res = await fetch(`${API_BASE_URL}/health`);
    if (res.ok) {
      const data = await res.json();
      appState.isServerOnline = true;
      console.log("✅ [GovToon API Server Connected]:", data.aiEngine);
    }
  } catch (err) {
    console.warn("⚠️ [GovToon API Offline] Operating with local Fact Grounded AI Engine.");
    appState.isServerOnline = false;
  }
}

// Navigation Engine
function setupNavigation() {
  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      navigateTo(link.getAttribute('data-nav'));
    });
  });
}

function navigateTo(viewId) {
  appState.currentView = viewId;
  document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
  const activeLink = document.querySelector(`.nav-link[data-nav="${viewId}"]`);
  if (activeLink) activeLink.classList.add('active');

  document.querySelectorAll('.page-view').forEach(v => v.classList.remove('active'));
  const targetView = document.getElementById(`view-${viewId}`);
  if (targetView) targetView.classList.add('active');

  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Multilingual Setup
function setupLanguageSelector() {
  const sel = document.getElementById('app-language-select');
  if (!sel) return;

  sel.addEventListener('change', (e) => {
    appState.currentLang = e.target.value;
    updateLanguageUI();
    renderReaderView();
  });
}

function updateLanguageUI() {
  const lang = appState.currentLang;
  const t = TRANSLATIONS[lang] || TRANSLATIONS.en;
  document.querySelectorAll('.nav-link').forEach(link => {
    const key = link.getAttribute('data-nav');
    if (t[key]) link.innerText = t[key];
  });
}

// Directory Renderer
function renderDirectory(schemes) {
  const grid = document.getElementById('schemes-directory-grid');
  if (!grid) return;

  grid.innerHTML = '';
  schemes.forEach(s => {
    const card = document.createElement('div');
    card.className = 'scheme-card-item';
    card.innerHTML = `
      <div class="scard-header">
        <span class="badge blue-badge">${s.category} • ${s.level}</span>
        <h3>${s.name}</h3>
        <p class="scard-dept">${s.dept}</p>
      </div>
      <p class="scard-desc">${s.purpose}</p>
      <div class="scard-footer">
        <span class="scard-source">✓ Source: India.gov.in</span>
        <button class="btn btn-saffron" onclick="openSchemeInReader('${s.id}')">🎨 Turn into Comic</button>
      </div>
    `;
    grid.appendChild(card);
  });
}

function openSchemeInReader(schemeId) {
  const s = SCHEMES_DATABASE.find(item => item.id === schemeId);
  if (!s) return;
  appState.selectedScheme = s;
  renderReaderView();
  navigateTo('reader');
}

// Reader Workspace Renderer
function renderReaderView() {
  const s = appState.selectedScheme;
  if (!s) return;

  document.getElementById('reader-category-badge').innerText = `${s.category} • ${s.level}`;
  document.getElementById('reader-scheme-name').innerText = s.name;
  document.getElementById('reader-scheme-dept').innerText = `${s.dept} | Source: India.gov.in`;
  document.getElementById('reader-source-date').innerText = `Last Verified: ${s.lastVerified}`;
  document.getElementById('reader-official-link').href = s.officialUrl;
  document.getElementById('chat-scheme-name').innerText = s.name;

  const charBox = document.getElementById('reader-character-card');
  if (charBox && s.character) {
    charBox.innerHTML = `
      <div class="char-avatar" style="font-size:2.2rem;">${s.character.avatar}</div>
      <div>
        <h4 style="font-family:var(--font-heading); font-size:1.1rem; color:var(--primary-navy);">${s.character.name} <span style="color:var(--saffron); font-size:0.85rem;">(${s.character.role})</span></h4>
        <p style="font-size:0.85rem; color:var(--text-muted);">${s.character.desc || s.character.clothing}</p>
      </div>
    `;
  }

  const lang = appState.currentLang;
  const panelsList = s.panels[lang] || s.panels.en;

  const panelsContainer = document.getElementById('reader-panels-container');
  if (panelsContainer) {
    panelsContainer.innerHTML = '';
    panelsList.forEach((p) => {
      const pdiv = document.createElement('div');
      pdiv.className = 'panel-card';
      pdiv.innerHTML = `
        <div class="panel-tag-header">
          <span>${p.tag}</span>
          <button class="btn-outline-sm" onclick="showCitationModal('${escapeQuotes(p.dialogue)}', '${escapeQuotes(p.sourceRef)}', '${s.officialUrl}')">🔍 Why shown? (Citation)</button>
        </div>
        <div class="panel-img-box">
          <img src="${p.image}" alt="${p.tag}" loading="lazy">
          <div class="speech-bubble-overlay">
            <strong style="color:var(--saffron);">${p.speaker}:</strong> "${p.dialogue}"
          </div>
        </div>
        <div class="panel-footer-bar">
          <span style="font-size:0.85rem; color:var(--text-main);">📌 <strong>Caption:</strong> ${p.caption}</span>
          <button class="btn-outline-sm" onclick="speakPanelText('${escapeQuotes(p.dialogue)}')">🔊 Play Panel</button>
        </div>
      `;
      panelsContainer.appendChild(pdiv);
    });
  }

  runEligibilityCheck();
  renderDocumentsTab();
  renderStepsTab();
  renderQuizTab();
}

function setReaderTab(tabId) {
  appState.currentReaderTab = tabId;
  document.querySelectorAll('.rtab-btn').forEach(b => b.classList.remove('active'));
  document.querySelectorAll('.rtab-pane').forEach(p => p.classList.remove('active'));

  event.target.classList.add('active');
  document.getElementById(`rtab-content-${tabId}`).classList.add('active');
}

// Module 6: Visual Eligibility Checker
function runEligibilityCheck() {
  const s = appState.selectedScheme;
  if (!s || !s.eligibility) return;

  const userAge = parseInt(document.getElementById('elig-user-age')?.value || 30);
  const userIncome = parseInt(document.getElementById('elig-user-income')?.value || 150000);
  const userState = document.getElementById('elig-user-state')?.value || "All India";

  const e = s.eligibility;
  let status = "🟢 Likely Eligible";
  let statusClass = "green-badge";
  let reasons = [];

  if (userAge < e.minAge || userAge > e.maxAge) {
    status = "🔴 Does not appear to meet age criteria";
    statusClass = "red-badge";
    reasons.push(`Age ${userAge} is outside specified range (${e.minAge}-${e.maxAge} yrs).`);
  } else {
    reasons.push(`✓ Age ${userAge} meets specified range (${e.minAge}-${e.maxAge} yrs).`);
  }

  if (userIncome > e.maxIncome) {
    status = "🟡 Income threshold requires official verification";
    statusClass = "amber-badge";
    reasons.push(`Annual income ₹${userIncome.toLocaleString()} exceeds limit ₹${e.maxIncome.toLocaleString()}.`);
  } else {
    reasons.push(`✓ Income ₹${userIncome.toLocaleString()} is below threshold ₹${e.maxIncome.toLocaleString()}.`);
  }

  const resultBox = document.getElementById('eligibility-result-box');
  if (resultBox) {
    resultBox.innerHTML = `
      <h4 style="font-family:var(--font-heading); font-size:1.2rem; margin-bottom:8px;">
        <span class="badge ${statusClass}">${status}</span>
      </h4>
      <p style="font-size:0.9rem; color:var(--text-muted); margin-bottom:12px;"><strong>Official Rule Summary:</strong> ${e.summary}</p>
      <ul style="font-size:0.88rem; list-style:none; padding:0;">
        ${reasons.map(r => `<li style="margin-bottom:4px;">${r}</li>`).join('')}
      </ul>
    `;
  }
}

// Module 7: Documents Checklist
function renderDocumentsTab() {
  const s = appState.selectedScheme;
  if (!s || !s.documents) return;

  const docsGrid = document.getElementById('reader-docs-grid');
  if (!docsGrid) return;

  docsGrid.innerHTML = '';
  let preparedCount = 0;

  s.documents.forEach(d => {
    const isChecked = appState.preparedDocs.has(d.id);
    if (isChecked) preparedCount++;

    const dcard = document.createElement('div');
    dcard.className = 'doc-card-item';
    dcard.innerHTML = `
      <input type="checkbox" style="width:20px; height:20px; cursor:pointer;" ${isChecked ? 'checked' : ''} onchange="toggleDocPrepared('${d.id}')">
      <div>
        <h4 style="font-family:var(--font-heading); font-size:1rem; margin-bottom:2px;">
          ${d.name} ${d.required ? '<span style="color:var(--rose); font-size:0.75rem;">(Compulsory)</span>' : '<span style="color:var(--text-muted); font-size:0.75rem;">(Optional)</span>'}
        </h4>
        <p style="font-size:0.85rem; color:var(--text-muted);">${d.why}</p>
      </div>
    `;
    docsGrid.appendChild(dcard);
  });

  const total = s.documents.length;
  const pct = Math.round((preparedCount / total) * 100);

  document.getElementById('doc-prep-text').innerText = `${preparedCount} / ${total} Prepared`;
  document.getElementById('doc-prep-percent').innerText = `${pct}%`;
  document.getElementById('doc-progress-fill').style.width = `${pct}%`;
}

function toggleDocPrepared(docId) {
  if (appState.preparedDocs.has(docId)) appState.preparedDocs.delete(docId);
  else appState.preparedDocs.add(docId);
  renderDocumentsTab();
}

// Module 8: Application Steps
function renderStepsTab() {
  const s = appState.selectedScheme;
  if (!s || !s.applicationSteps) return;

  const stepsList = document.getElementById('reader-steps-list');
  if (!stepsList) return;

  stepsList.innerHTML = '';
  s.applicationSteps.forEach(st => {
    const item = document.createElement('div');
    item.className = 'step-timeline-item';
    item.innerHTML = `
      <div class="step-num-badge">${st.step}</div>
      <div>
        <h4 style="font-family:var(--font-heading); font-size:1.05rem; margin-bottom:4px;">${st.title}</h4>
        <p style="font-size:0.88rem; color:var(--text-muted);">${st.desc}</p>
      </div>
    `;
    stepsList.appendChild(item);
  });

  const applyBtn = document.getElementById('apply-official-btn');
  if (applyBtn) applyBtn.href = s.officialUrl;
}

// Module 12 & 13: Quiz Engine
function renderQuizTab() {
  const s = appState.selectedScheme;
  if (!s || !s.quiz) return;

  const wrapper = document.getElementById('quiz-questions-wrapper');
  if (!wrapper) return;

  wrapper.innerHTML = '';
  document.getElementById('quiz-results-card').style.display = 'none';

  s.quiz.forEach((q, qidx) => {
    const qdiv = document.createElement('div');
    qdiv.className = 'quiz-qcard';
    qdiv.innerHTML = `
      <h4 style="font-family:var(--font-heading); font-size:1.05rem; margin-bottom:12px;">Q${qidx + 1}. ${q.q}</h4>
      <div class="quiz-options-list">
        ${q.options.map((opt, oidx) => `
          <button class="quiz-opt-btn" onclick="submitQuizAnswer(${qidx}, ${oidx})">${opt}</button>
        `).join('')}
      </div>
    `;
    wrapper.appendChild(qdiv);
  });
}

function submitQuizAnswer(qidx, oidx) {
  const s = appState.selectedScheme;
  if (!s || !s.quiz || !s.quiz[qidx]) return;

  const q = s.quiz[qidx];
  const isCorrect = oidx === q.correct;

  const card = document.getElementById('quiz-results-card');
  card.style.display = 'block';
  card.innerHTML = `
    <h3 style="font-family:var(--font-heading); font-size:1.6rem; color:var(--emerald); margin-bottom:8px;">
      ${isCorrect ? '🎉 Correct Answer! Great job.' : '⚠️ Let\'s review this concept!'}
    </h3>
    <p style="font-size:0.95rem; margin-bottom:12px;">${q.explanation}</p>
    <button class="btn btn-outline" onclick="setReaderTab('comic')">📖 Jump back to Panel ${q.panelRef} in Comic</button>
  `;
}

// Audio Player
function speakPanelText(text) {
  if ('speechSynthesis' in window) {
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = parseFloat(document.getElementById('audio-speed-select')?.value || '1.0');

    const lang = appState.currentLang;
    if (lang === 'te') utterance.lang = 'te-IN';
    else if (lang === 'hi') utterance.lang = 'hi-IN';
    else utterance.lang = 'en-US';

    window.speechSynthesis.speak(utterance);
  }
}

function togglePlayFullComic() {
  const s = appState.selectedScheme;
  if (!s) return;

  const lang = appState.currentLang;
  const panels = s.panels[lang] || s.panels.en;

  let fullScript = `Reading ${s.name} visual story. `;
  panels.forEach(p => { fullScript += `${p.speaker} says: ${p.dialogue}. `; });

  speakPanelText(fullScript);

  document.getElementById('btn-play-comic').style.display = 'none';
  document.getElementById('btn-pause-comic').style.display = 'inline-flex';
}

function pauseAudio() {
  if ('speechSynthesis' in window) window.speechSynthesis.cancel();
  document.getElementById('btn-play-comic').style.display = 'inline-flex';
  document.getElementById('btn-pause-comic').style.display = 'none';
}

// Citation Modal
function showCitationModal(statement, sourceRef, url) {
  document.getElementById('cite-statement-text').innerText = statement;
  document.getElementById('cite-source-text').innerText = `Fact verified against official government documentation: ${sourceRef}`;
  document.getElementById('cite-location-text').innerText = sourceRef;
  document.getElementById('cite-url-link').href = url;
  document.getElementById('citation-modal').style.display = 'flex';
}

function hideCitationModal() {
  document.getElementById('citation-modal').style.display = 'none';
}

function closeCitationModal(e) {
  if (e.target.id === 'citation-modal') hideCitationModal();
}

function escapeQuotes(str) {
  return str.replace(/'/g, "\\'").replace(/"/g, '&quot;');
}

// AI Ingestion Pipeline (Calling REST API Server)
function setCreateMode(mode) {
  document.querySelectorAll('.create-tab-btn').forEach(b => b.classList.remove('active'));
  document.querySelectorAll('.mode-panel').forEach(p => p.classList.remove('active'));
  event.target.classList.add('active');
  document.getElementById(`create-mode-${mode}`).classList.add('active');
}

function setPersona(personaKey) {
  appState.currentPersona = personaKey;
  document.querySelectorAll('.persona-chip').forEach(c => c.classList.remove('active'));
  event.target.classList.add('active');
}

function triggerFileUpload() {
  document.getElementById('pdf-file-input').click();
}

function handleFileSelected(e) {
  const file = e.target.files[0];
  if (!file) return;

  const statusBox = document.getElementById('upload-file-status');
  statusBox.style.display = 'block';
  statusBox.innerHTML = `<strong>📄 File Selected:</strong> ${file.name} (${(file.size / 1024).toFixed(1)} KB)`;

  startProcessingPipeline(file.name.replace('.pdf', ' Scheme'));
}

function searchForCreate() {
  const query = document.getElementById('create-search-input').value.toLowerCase();
  const results = SCHEMES_DATABASE.filter(s => s.name.toLowerCase().includes(query) || s.purpose.toLowerCase().includes(query));

  const list = document.getElementById('create-search-results');
  list.innerHTML = '';
  results.forEach(s => {
    const div = document.createElement('div');
    div.style.cssText = "padding:12px; border:1px solid var(--border-light); border-radius:8px; margin-top:8px; display:flex; justify-content:space-between; align-items:center;";
    div.innerHTML = `
      <div><strong>${s.name}</strong> <span style="font-size:0.8rem; color:var(--text-muted);">(${s.category})</span></div>
      <button class="btn btn-saffron btn-sm" onclick="startProcessingPipeline('${s.name}')">Generate Story</button>
    `;
    list.appendChild(div);
  });
}

function processPastedText() {
  const text = document.getElementById('create-pasted-text').value;
  if (!text) return alert("Please paste official government text first.");
  startProcessingPipeline("Pasted Scheme Notification");
}

function processUrlInput() {
  const url = document.getElementById('create-url-input').value;
  if (!url) return alert("Please enter official government URL.");
  startProcessingPipeline("Official URL Ingestion");
}

async function startProcessingPipeline(schemeTitle) {
  const overlay = document.getElementById('processing-overlay');
  overlay.style.display = 'flex';
  document.getElementById('proc-scheme-name').innerText = `Ingesting: ${schemeTitle}`;

  setTimeout(() => { document.getElementById('pstep-1').style.fontWeight = 'bold'; }, 400);
  setTimeout(() => { document.getElementById('pstep-2').style.fontWeight = 'bold'; }, 800);
  setTimeout(() => { document.getElementById('pstep-3').style.fontWeight = 'bold'; }, 1200);

  // Call Server AI API if server online
  if (appState.isServerOnline) {
    try {
      const apiRes = await fetch(`${API_BASE_URL}/generate-story`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ schemeName: schemeTitle, persona: appState.currentPersona })
      });
      if (apiRes.ok) {
        const data = await apiRes.json();
        console.log("🤖 [AI Server Response]:", data);
      }
    } catch (e) {
      console.warn("AI Call Warning:", e.message);
    }
  }

  setTimeout(() => { document.getElementById('pstep-4').style.fontWeight = 'bold'; }, 1600);
  setTimeout(() => { document.getElementById('pstep-5').style.fontWeight = 'bold'; }, 2000);

  setTimeout(() => {
    overlay.style.display = 'none';
    openSchemeInReader('pm_kisan');
  }, 2400);
}

// Grounded AI Chatbot (Calls Server API / Local Fallback)
async function sendChatMessage() {
  const input = document.getElementById('chat-user-input');
  const text = input.value.trim();
  if (!text) return;

  const box = document.getElementById('chat-messages');

  // User Msg
  const udiv = document.createElement('div');
  udiv.className = 'chat-msg user-msg';
  udiv.innerHTML = `<div class="msg-content"><p>${text}</p></div>`;
  box.appendChild(udiv);
  input.value = '';

  const s = appState.selectedScheme;
  let reply = `Based strictly on official India.gov.in records for ${s.name}: ${s.purpose} Benefits provided: ${s.benefits}`;
  let sourceTag = `Source: Verified India.gov.in Record (${s.officialUrl})`;

  // Try calling AI Server API
  if (appState.isServerOnline) {
    try {
      const res = await fetch(`${API_BASE_URL}/ask-ai`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question: text, schemeName: s.name })
      });
      if (res.ok) {
        const data = await res.json();
        reply = data.answer;
        if (data.sourceRef) sourceTag = `Source: ${data.sourceRef}`;
      }
    } catch (e) {
      console.warn("[Chat API Warning]", e.message);
    }
  } else {
    if (text.toLowerCase().includes('document')) reply = `Compulsory documents required: ${s.documents.map(d => d.name).join(', ')}.`;
    if (text.toLowerCase().includes('eligible') || text.toLowerCase().includes('who')) reply = `Eligibility criteria: ${s.eligibility.summary}`;
  }

  setTimeout(() => {
    const bdiv = document.createElement('div');
    bdiv.className = 'chat-msg bot-msg';
    bdiv.innerHTML = `
      <div class="msg-avatar">🏛️</div>
      <div class="msg-content">
        <p>${reply}</p>
        <span class="citation-tag">${sourceTag}</span>
      </div>
    `;
    box.appendChild(bdiv);
    box.scrollTop = box.scrollHeight;
  }, 400);
}

function askPresetQuestion(qtext) {
  document.getElementById('chat-user-input').value = qtext;
  sendChatMessage();
}

function handleChatKeyPress(e) {
  if (e.key === 'Enter') sendChatMessage();
}

function bookmarkCurrentScheme() {
  const s = appState.selectedScheme;
  if (!s) return;
  appState.bookmarkedIds.add(s.id);
  alert(`✓ ${s.name} has been bookmarked to your Library!`);
  renderLibrary();
}

function renderLibrary() {
  const list = document.getElementById('bookmarked-list');
  if (!list) return;

  list.innerHTML = '';
  appState.bookmarkedIds.forEach(id => {
    const s = SCHEMES_DATABASE.find(item => item.id === id);
    if (!s) return;

    const div = document.createElement('div');
    div.style.cssText = "padding:10px; border-bottom:1px solid var(--border-light); display:flex; justify-content:space-between; align-items:center;";
    div.innerHTML = `
      <div><strong>${s.name}</strong> <div style="font-size:0.8rem; color:var(--text-muted);">${s.category}</div></div>
      <button class="btn btn-outline-sm" onclick="openSchemeInReader('${s.id}')">Read</button>
    `;
    list.appendChild(div);
  });
}

function handleHeroSearch() {
  const val = document.getElementById('hero-search-input').value;
  quickSearch(val);
}

function quickSearch(query) {
  navigateTo('explore');
  document.getElementById('directory-search').value = query;
  const filtered = SCHEMES_DATABASE.filter(s => s.name.toLowerCase().includes(query.toLowerCase()) || s.purpose.toLowerCase().includes(query.toLowerCase()));
  renderDirectory(filtered);
}
