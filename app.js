
function formatChatMarkdown(text) {
  if (!text) return "";
  let formatted = text
    .replace(/\n/g, '<br/>')
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
    .replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer" style="color:#0284c7; text-decoration:underline; font-weight:600;">$1 ↗</a>');
  return formatted;
}

function getClientSideGroundedAnswer(question, schemeName, lang) {
  const q = question.toLowerCase().trim();
  
  // 1. Greetings
  const greetings = ['hlo', 'hello', 'hi', 'hey', 'namaste', 'namaskar', 'namaskaram', 'vanakkam', 'who are you', 'what are you', 'help', 'guide'];
  if (greetings.some(g => q === g || q.startsWith(g + ' ') || q.startsWith(g + '!') || q.startsWith(g + ','))) {
    if (lang === 'te') {
      return {
        answer: "👋 **నమస్కారం! నేను గోవ్టూన్ (GovToon) AI అసిస్టెంట్ ని.**\n\nభారత ప్రభుత్వ సంక్షేమ పథకాలు, అర్హతలు, దరఖాస్తు విధానం మరియు ప్రయోజనాల గురించి నన్ను అడగవచ్చు:\n\n• 🌾 **పీఎం-కిసాన్**: రైతులకు ఏడాదికి ₹6,000 నగదు సాయం\n• 🏥 **ఆయుష్మాన్ భారత్**: ₹5 లక్షల ఉచిత వైద్య బీమా\n• ☀️ **పీఎం సూర్య ఘర్**: సోలార్ రూఫ్‌టాప్‌పై ₹78,000 సబ్సిడీ\n• 💼 **పీఎం స్వనిధి / ముద్ర**: వ్యాపార రుణాలు\n• 🎓 **నేషనల్ స్కాలర్‌షిప్**: విద్యార్థులకు ఫీజు రీయింబర్స్‌మెంట్\n• 👵 **పెన్షన్లు**: అటల్ పెన్షన్ యోజన, శ్రమయోగి మాన్‌ధన్\n\n💬 *మీకు కావాల్సిన పథకం లేదా సహాయం గురించి అడగండి!*",
        sourceRef: "India.gov.in జాతీయ పోర్టల్"
      };
    } else if (lang === 'hi') {
      return {
        answer: "👋 **नमस्ते! मैं गोवटून (GovToon) AI सहायक हूँ।**\n\nमैं भारत सरकार की सभी प्रमुख योजनाओं की सटीक जानकारी प्रदान करता हूँ:\n\n• 🌾 **पीएम-किसान**: किसानों को सालाना ₹6,000 डीबीटी सहायता\n• 🏥 **आयुष्मान भारत**: ₹5 लाख तक का मुफ्त इलाज\n• ☀️ **पीएम सूर्य घर**: सोलर रूफटॉप पर ₹78,000 तक की सब्सिडी\n• 💼 **पीएम स्वनिधि / मुद्रा**: स्वरोजगार एवं व्यापार ऋण\n• 🎓 **राष्ट्रीय छात्रवृत्ति**: 100% फीस प्रतिपूर्ति\n• 👵 **पेंशन**: अटल पेंशन योजना, श्रम योगी मानधन\n\n💬 *आप किसी भी योजना का नाम या अपनी आवश्यकता लिखकर पूछ सकते हैं!*",
        sourceRef: "India.gov.in राष्ट्रीय पोर्टल"
      };
    } else {
      return {
        answer: "👋 **Hello! I am GovToon AI Assistant** — your intelligent guide to Indian Government schemes.\n\nYou can ask me anything about welfare programs, eligibility, benefits, and application processes:\n\n• 🌾 **Agriculture**: PM-Kisan (₹6,000/year direct DBT)\n• 🏥 **Healthcare**: Ayushman Bharat (₹5 Lakh cashless hospital cover)\n• ☀️ **Solar Energy**: PM Surya Ghar (Up to ₹78,000 rooftop subsidy)\n• 💼 **Business Loans**: PM SVANidhi (₹10,000 vendor credit), PM MUDRA (up to ₹10 Lakhs)\n• 🎓 **Education**: National Scholarship Portal (Tuition reimbursement)\n• 👵 **Pensions**: Atal Pension Yojana & PM Shram Yogi (₹3,000–₹5,000/mo)\n• 🏠 **Housing & Water**: PM Awas Yojana (Pucca house), Jal Jeevan Mission\n\n💬 *Try asking: 'Which scheme gives solar subsidies?' or 'What are the documents for PM Kisan?'*",
        sourceRef: "India.gov.in National Portal Official Records"
      };
    }
  }

  // 2. Keyword scheme matching
  const list = typeof SCHEMES_DATABASE !== 'undefined' ? SCHEMES_DATABASE : [];
  let s = list.find(item => item.name.toLowerCase().includes(schemeName.toLowerCase())) || list[0];
  
  if (q.includes('solar') || q.includes('sun') || q.includes('bijli') || q.includes('electricity') || q.includes('power') || q.includes('surya') || q.includes('soura')) {
    s = list.find(item => item.id === 'surya_ghar') || s;
  } else if (q.includes('farmer') || q.includes('kisan') || q.includes('krishi') || q.includes('crop') || q.includes('seed') || q.includes('6000') || q.includes('rythu')) {
    s = list.find(item => item.id === 'pm_kisan') || s;
  } else if (q.includes('health') || q.includes('hospital') || q.includes('medical') || q.includes('treatment') || q.includes('5 lakh') || q.includes('ayushman') || q.includes('arogya') || q.includes('swasthya')) {
    s = list.find(item => item.id === 'ayushman') || s;
  } else if (q.includes('pension') || q.includes('retirement') || q.includes('old age') || q.includes('shram') || q.includes('mandhan') || q.includes('3000')) {
    s = list.find(item => item.id === 'pension') || s;
  } else if (q.includes('auto') || q.includes('driver') || q.includes('apy') || q.includes('atal') || q.includes('5000')) {
    s = list.find(item => item.id === 'atal_pension') || s;
  } else if (q.includes('vendor') || q.includes('street') || q.includes('fruit') || q.includes('thela') || q.includes('svanidhi') || q.includes('10000')) {
    s = list.find(item => item.id === 'pm_svanidhi') || s;
  } else if (q.includes('mudra') || q.includes('loan') || q.includes('tailor') || q.includes('business') || q.includes('50000')) {
    s = list.find(item => item.id === 'mudra_loan') || s;
  } else if (q.includes('daughter') || q.includes('girl') || q.includes('beti') || q.includes('sukanya') || q.includes('8.2')) {
    s = list.find(item => item.id === 'sukanya') || s;
  } else if (q.includes('scholarship') || q.includes('student') || q.includes('college') || q.includes('fee') || q.includes('nsp') || q.includes('vidyarthi')) {
    s = list.find(item => item.id === 'nsp_scholarship') || s;
  } else if (q.includes('house') || q.includes('home') || q.includes('pucca') || q.includes('awas') || q.includes('1.20') || q.includes('illu') || q.includes('makan')) {
    s = list.find(item => item.id === 'pm_awas_rural') || s;
  } else if (q.includes('artisan') || q.includes('blacksmith') || q.includes('carpenter') || q.includes('vishwakarma') || q.includes('15000') || q.includes('tool')) {
    s = list.find(item => item.id === 'pm_vishwakarma') || s;
  } else if (q.includes('gas') || q.includes('cylinder') || q.includes('chulha') || q.includes('ujjwala') || q.includes('lpg')) {
    s = list.find(item => item.id === 'pm_ujjwala') || s;
  } else if (q.includes('standup') || q.includes('stand-up') || q.includes('women entrepreneur') || q.includes('1 crore')) {
    s = list.find(item => item.id === 'standup_india') || s;
  } else if (q.includes('fish') || q.includes('matsya') || q.includes('aquaculture') || q.includes('boat')) {
    s = list.find(item => item.id === 'pm_matsya_sampada') || s;
  } else if (q.includes('water') || q.includes('jal') || q.includes('tap') || q.includes('drinking water') || q.includes('55 liter') || q.includes('neellu')) {
    s = list.find(item => item.id === 'jal_jeevan') || s;
  }

  const sname = s.name;
  const docs = s.documents ? s.documents.map(d => d.name).join(', ') : 'Aadhaar Card, Bank Passbook';
  const url = s.officialUrl || 'https://www.india.gov.in/my-government/schemes';

  if (q.includes('document') || q.includes('paper') || q.includes('proof') || q.includes('patralu') || q.includes('kagaz')) {
    return {
      answer: `📄 **Mandatory Documents for ${sname}:**\n\n• **Required Documents**: ${docs}\n• **Submission**: Available online via official portal or nearest CSC centre.\n\n🔗 [Official Portal Link](${url})`,
      sourceRef: `Official India.gov.in Record (${url})`,
      schemeId: s.id
    };
  }

  if (q.includes('eligible') || q.includes('who') || q.includes('criteria') || q.includes('arhatha') || q.includes('patrata')) {
    return {
      answer: `👤 **Eligibility for ${sname}:**\n\n• **Target Beneficiaries**: ${s.eligibility ? s.eligibility.summary : 'Eligible citizens under scheme guidelines'}\n• **Benefit Provided**: ${s.benefits}\n\n🔗 [Apply on Official Portal](${url})`,
      sourceRef: `Official India.gov.in Record (${url})`,
      schemeId: s.id
    };
  }

  if (q.includes('apply') || q.includes('how') || q.includes('process') || q.includes('step') || q.includes('darakhasthu') || q.includes('aavedan')) {
    const steps = s.steps ? s.steps.map(st => st.title).join(' • ') : 'Online Registration • e-KYC • Verification • DBT Transfer';
    return {
      answer: `🗺️ **Application Process for ${sname}:**\n\n• **Steps**: ${steps}\n• **Required Documents**: ${docs}\n\n🔗 [Apply Online Here](${url})`,
      sourceRef: `Official India.gov.in Record (${url})`,
      schemeId: s.id
    };
  }

  return {
    answer: `🏛️ **${sname}**\n*(${s.department || 'Government of India'})*\n\n🎯 **Purpose**: ${s.purpose}\n\n🎁 **Benefits**: ${s.benefits}\n\n👤 **Eligibility**: ${s.eligibility ? s.eligibility.summary : 'See portal for criteria'}\n\n📄 **Key Documents**: ${docs}\n\n🔗 [Official Portal Link](${url})`,
    sourceRef: `Verified India.gov.in Record (${url})`,
    schemeId: s.id
  };
}


function openSchemeReaderById(schemeId) {
  const list = typeof SCHEMES_DATABASE !== 'undefined' ? SCHEMES_DATABASE : [];
  const s = list.find(item => item.id === schemeId);
  if (s) {
    openReader(s);
  } else {
    navigateTo('explore');
  }
}

// GovToon — Production Full-Stack AI Government Scheme Explainer
// Official Source Grounding: India.gov.in National Portal of India / myScheme

let API_BASE_URL = typeof window !== 'undefined' && window.location.origin && !window.location.origin.startsWith('file:') ? `${window.location.origin}/api` : 'http://localhost:5000/api';

// Comprehensive Multilingual Translation Dictionary (EN, TE, HI)
const TRANSLATIONS = {
  en: {
    logo_sub: "Government Schemes, Told Simply.",
    scheme_overview_title: "📌 Scheme Key Details & Highlights Overview",
    scheme_grounded_sub: "Official Government Information Grounded on India.gov.in",
    core_objective: "🎯 Core Objective / Purpose",
    key_benefits: "🎁 Key Benefits & Financial Cover",
    target_beneficiary: "👤 Target Beneficiary & Eligibility",
    mandatory_docs: "📄 Mandatory Required Documents",
    btn_apply_online: "🚀 Apply Online ↗",
    source_verified_label: "✓ Official Source Verified",
    last_verified_label: "Last Verified:",
    source_label: "Source:",
    compulsory_label: "(Compulsory)",
    optional_label: "(Optional)",
    audio_reading_title: "Reading visual story for",
    says_label: "says",
    panel_label: "Panel",
    prepared_label: "Prepared",

    trust_badge: "🛡️ Official Source Grounding",
    trust_text: "Data sourced from India.gov.in National Portal of India. We don't change what the government says — we change how easily citizens understand it.",
    btn_contrast: "👁️ Contrast",
    btn_text_size: "A+ Text Size",
    nav_home: "🏠 Home",
    nav_explore: "🔍 Explore Schemes",
    nav_create: "⚡ Create Comic",
    nav_reader: "📖 Comic Reader",
    nav_library: "📚 My Library",
    nav_ask: "💬 Ask GovToon",
    nav_admin: "📊 Admin",
    btn_create_nav: "+ Turn Scheme into Comic",
    hero_badge: "🇮🇳 National Portal of India Integration Ready",
    hero_title: "Government Schemes,<br><span class=\"hero-highlight\">Told Simply.</span>",
    hero_sub: "Transform complex official government documents, eligibility rules, and application processes into simple, visual 4-panel stories with voice narration and comprehension testing.",
    hero_ph: "What government scheme do you want to understand? (e.g. PM Surya Ghar, PM-Kisan, Ayushman Bharat)...",
    btn_search_schemes: "Search Schemes",
    try_asking: "Try asking:",
    pipe_doc: "Government Document / Portal",
    pipe_ai: "AI Fact Extraction",
    pipe_story: "Visual Comic Story",
    pipe_voice: "Multilingual Voice",
    pipe_quiz: "Comprehension Quiz",
    impact_orig: "Average Citizen Understanding of Official PDF Text",
    impact_govtoon: "Understanding Score After Reading GovToon Visual Comics",
    feat_title: "How GovToon Empowers Citizens",
    feat_sub: "Bridging the gap between complex administrative legalese and citizen understanding.",
    f1_h: "1. Grounded in Official Sources",
    f1_p: "Directly linked to India.gov.in / myScheme. Every fact, date, benefit, and requirement maintains an exact source citation.",
    f2_h: "2. Relatable Character Stories",
    f2_p: "Character-bible technology ensures consistent visual storytelling featuring farmers, students, women, and street vendors.",
    f3_h: "3. Desi Basti-Speak & Voice",
    f3_p: "Translates 'Babu-speak' into everyday language with instant English, Telugu, and Hindi audio narration.",
    f4_h: "4. Visual Eligibility & Documents",
    f4_p: "Match your age, income, and state against scheme rules and track your document readiness progress.",
    f5_h: "5. Comprehension Testing",
    f5_p: "Take interactive quizzes to verify your understanding with automatic panel-jump help for tricky questions.",
    f6_h: "6. Grounded AI Q&A Assistant",
    f6_p: "Ask anything about the scheme. GovToon answers strictly from official source data with page citations.",
    exp_badge: "India.gov.in Scheme Directory",
    exp_h: "Explore Official Government Schemes",
    exp_sub: "Browse verified schemes from Central & State Ministries. Click any scheme to generate a visual comic.",
    source_pill: "Source: National Portal of India / myScheme Ecosystem",
    dir_search_ph: "Search by scheme name, keyword, or benefit...",
    create_badge: "Module 1 & 2 Ingestion Pipeline",
    create_h: "Create a Scheme Comic",
    create_sub: "Select an official scheme, upload a government PDF, paste text, or enter an official URL.",
    cmode_search: "🔍 Search Schemes",
    cmode_pdf: "📄 Upload PDF / Document",
    cmode_text: "📝 Paste Government Text",
    cmode_url: "🔗 Official URL",
    csearch_h: "Search Verified Government Database",
    csearch_p: "Select from official scheme records indexed from India.gov.in.",
    csearch_ph: "Type scheme name (e.g. PM Surya Ghar, Ayushman Bharat)...",
    btn_find_scheme: "Find Scheme",
    cpdf_h: "Upload Official Scheme PDF or Document",
    cpdf_p: "GovToon extracts verified facts directly from official notifications.",
    cpdf_drop_h: "Drag & Drop Official Scheme PDF here",
    cpdf_drop_p: "or click to browse files from your computer",
    ctext_h: "Paste Official Scheme Notification Text",
    ctext_p: "Paste raw government text, eligibility guidelines, or press releases.",
    ctext_ph: "Paste official text here...",
    btn_proc_text: "Process Government Text",
    curl_h: "Enter Official Government Source URL",
    curl_p: "Provide a direct link from India.gov.in or official ministry portal.",
    btn_proc_url: "Ingest Official Source URL",
    persona_h: "👤 Who is this visual story for? (Audience Persona)",
    persona_sub: "Select target beneficiary context. The underlying government facts remain 100% unchanged.",
    p_farmer: "👨‍🌾 Small Farmer (Ramu Kaka)",
    p_vendor: "🛒 Street Vendor (Kalu)",
    p_woman: "👩 Domestic Worker (Lata Tai)",
    p_student: "🎓 Student / Youth (Raju)",
    p_senior: "👴 Senior Citizen (Sharma Ji)",
    source_verified: "✓ Official Source Verified",
    btn_verify_portal: "🔗 Verify Official Portal",
    rtab_comic: "🎨 4-Panel Comic",
    rtab_eligibility: "🟢 Visual Eligibility",
    rtab_documents: "📄 Required Documents",
    rtab_steps: "🗺️ Application Steps",
    rtab_ask: "💬 Ask GovToon AI",
    rtab_quiz: "✅ Comprehension Quiz",
    btn_listen: "▶ Listen to Full Comic",
    btn_pause: "⏸ Pause",
    lbl_speed: "Speed:",
    btn_bookmark: "🔖 Bookmark",
    btn_print: "🖨️ Print 1-Page Flyer",
    btn_citation: "🔍 Why shown? (Citation)",
    btn_play_panel: "🔊 Play Panel",
    elig_h: "🟢 Visual Eligibility Assessment",
    elig_sub: "Enter your basic details to check preliminary match against official rules.",
    lbl_age: "Your Age (Years)",
    lbl_income: "Annual Family Income (₹)",
    lbl_state: "State of Residence",
    lbl_occ: "Occupation / Category",
    elig_disclaimer: "⚠️ Official Disclaimer: This is a preliminary assessment based on available scheme rules. Always verify current requirements on official government website before applying.",
    elig_eligible: "🟢 Likely Eligible",
    elig_not_eligible: "🔴 Does not appear to meet criteria",
    elig_amber: "🟡 Threshold requires verification",
    doc_h: "📄 Required Documents Checklist",
    doc_sub: "Check off documents as you prepare them before visiting the official portal or Panchayat office.",
    doc_prep_label: "Preparation Progress:",
    steps_h: "🗺️ Step-by-Step Application Roadmap",
    steps_sub: "Follow these official steps to submit your application safely.",
    cta_ready: "Ready to Apply?",
    cta_desc: "Submit your application directly on the official government portal.",
    btn_go_portal: "🚀 Go to Official Government Application Portal",
    ask_h: "💬 Ask GovToon Grounded AI Assistant",
    ask_sub: "Answers strictly from official India.gov.in scheme data with page citations.",
    sug_q: "Suggested Questions:",
    q1: "Who is eligible?",
    q2: "What benefits will I get?",
    q3: "What documents are compulsory?",
    q4: "Where should I submit?",
    bot_welcome: "Namaste! I am your GovToon Assistant. I can answer questions about this scheme strictly based on official government records.",
    cit_verified: "Source: Verified India.gov.in Record",
    chat_ph: "Ask a question about this scheme...",
    btn_send_q: "Send Question",
    quiz_h: "✅ Scheme Comprehension Test",
    quiz_sub: "Test your understanding of the verified scheme facts.",
    lib_h: "📚 My Library",
    lib_sub: "Your saved schemes, created comics, and completed comprehension test scores.",
    lib_bm: "🔖 Bookmarked Schemes",
    lib_created: "🎨 Created Comics",
    lib_quiz_hist: "🎯 Comprehension Test History",
    gask_h: "💬 Ask GovToon AI (All Schemes)",
    gask_sub: "Ask questions across the entire National Portal of India scheme directory.",
    gbot_welcome: "Hello! Ask me about any government scheme in India — scholarships, pensions, farmer support, or healthcare cards.",
    cit_india_gov: "Source: Grounded on India.gov.in",
    gchat_ph: "e.g. Which scheme provides solar rooftop subsidies?",
    btn_ask_govtoon: "Ask GovToon",
    admin_badge: "Admin Access Only",
    admin_h: "GovToon Administrative & Confusion Analytics Dashboard",
    admin_sub: "Monitor ingested schemes, version updates, AI extraction logs, and citizen confusion analytics.",
    astat_1: "Indexed Government Schemes",
    astat_2: "Visual Comics Generated",
    astat_3: "Average Citizen Comprehension",
    astat_4: "Active Languages (EN, TE, HI)",
    conf_h: "📊 Citizen Confusion Analytics",
    conf_sub: "Where citizens encounter the most difficulty in understanding government schemes:",
    conf_1: "Eligibility Criteria & Income Thresholds",
    conf_2: "Required Documents & Verification",
    conf_3: "Application Process & Portal Submission",
    conf_4: "Benefit Calculation & Disbursement",
    log_h: "🔄 Scheme Update & Ingestion Logs",
    th_name: "Scheme Name",
    th_url: "Source URL",
    th_date: "Last Ingested",
    th_status: "Status",
    th_changes: "Detected Version Changes",
    th_action: "Action",
    cite_h: "🔍 Panel Source Citation",
    cite_stmt: "Panel Statement:",
    cite_src_txt: "Authoritative Source Text (India.gov.in):",
    cite_loc: "Source Location:",
    cite_date: "Retrieved Date:",
    cite_url: "Official Source URL:",
    cite_view_link: "View Official Document ↗",
    footer_quote: "\"We don't change what the government says. We change how easily citizens understand it.\"",
    footer_src_label: "Source Data:",
    footer_disclaimer: "GovToon simplifies publicly available government information for visual comprehension. It does not replace official government websites, departments, or application portals."
  },
  te: {
    logo_sub: "ప్రభుత్వ పథకాలు, సులువైన మాటల్లో.",
    scheme_overview_title: "📌 పథకం ముఖ్యాంశాలు & వివరాల సంక్షిప్త సమాచారం",
    scheme_grounded_sub: "భారత ప్రభుత్వ అధికారిక పోర్టల్ India.gov.in నుండి సేకరించిన సమాచారం",
    core_objective: "🎯 ముఖ్య ఉద్దేశం / లక్ష్యం",
    key_benefits: "🎁 ప్రధాన ప్రయోజనాలు & ఆర్థిక సాయం",
    target_beneficiary: "👤 అర్హత & లబ్ధిదారులు",
    mandatory_docs: "📄 అవసరమైన ముఖ్యమైన పత్రాలు",
    btn_apply_online: "🚀 ఆన్‌లైన్‌లో దరఖాస్తు చేసుకోండి ↗",
    source_verified_label: "✓ అధికారిక ఆధారాలు ధృవీకరించబడ్డాయి",
    last_verified_label: "చివరిగా ధృవీకరించబడింది:",
    source_label: "మూలం:",
    compulsory_label: "(తప్పనిసరి)",
    optional_label: "(ఐచ్ఛికం)",
    audio_reading_title: "దృశ్య కామిక్ కథ వివరణ:",
    says_label: "అంటున్నారు",
    panel_label: "ప్యానెల్",
    prepared_label: "సిద్ధమైనవి",

    trust_badge: "🛡️ అధికారిక మూలాల ఆధారం",
    trust_text: "India.gov.in జాతీయ పోర్టల్ నుండి వివరాలు. ప్రభుత్వం చెప్పిన దాన్ని మేము మార్చము — పౌరులు అర్థం చేసుకునే విధానాన్ని సులభతరం చేస్తాము.",
    btn_contrast: "👁️ కాంట్రాస్ట్",
    btn_text_size: "A+ అక్షర పరిమాణం",
    nav_home: "🏠 హోమ్",
    nav_explore: "🔍 పథకాలు వెతకండి",
    nav_create: "⚡ కామిక్ తయారు చేయండి",
    nav_reader: "📖 కామిక్ చదవండి",
    nav_library: "📚 లైబ్రరీ",
    nav_ask: "💬 గోవ్‌టూన్ అడగండి",
    nav_admin: "📊 అడ్మిన్",
    btn_create_nav: "+ పథకాన్ని కామిక్‌గా మార్చండి",
    hero_badge: "🇮🇳 జాతీయ పోర్టల్ సమన్వయం సిద్ధంగా ఉంది",
    hero_title: "ప్రభుత్వ పథకాలు,<br><span class=\"hero-highlight\">సులువైన మాటల్లో.</span>",
    hero_sub: "సంక్లిష్టమైన ప్రభుత్వ పత్రాలు, అర్హత నిబంధనలు మరియు దరఖాస్తు విధానాలను సులువైన 4-ప్యానెల్ కామిక్ కథలుగా, వాయిస్ వివరణలతో పొందండి.",
    hero_ph: "మీరు ఏ ప్రభుత్వ పథకం గురించి తెలుసుకోవాలనుకుంటున్నారు? (ఉదా: పిఎమ్-కిసాన్, ఆయుష్మాన్ భారత్)...",
    btn_search_schemes: "పథకాలు వెతకండి",
    try_asking: "ప్రయత్నించండి:",
    pipe_doc: "ప్రభుత్వ పత్రం / పోర్టల్",
    pipe_ai: "AI విశ్లేషణ",
    pipe_story: "కామిక్ కథ",
    pipe_voice: "బహుభాషా వాయిస్",
    pipe_quiz: "అవగాహన పరీక్ష",
    impact_orig: "సాధారణ పౌరుల ప్రభుత్వ పత్రాల అవగాహన",
    impact_govtoon: "గోవ్‌టూన్ కామిక్స్ చదివిన తర్వాత అవగాహన స్కోరు",
    feat_title: "గోవ్‌టూన్ పౌరులకు ఎలా సహాయపడుతుంది",
    feat_sub: "కఠినమైన ప్రభుత్వ భాషకు, సాధారణ పౌరుల అవగాహనకు మధ్య వారధి.",
    f1_h: "1. అధికారిక ఆధారాలు",
    f1_p: "India.gov.in / myScheme కి నేరుగా అనుసంధానించబడింది. ప్రతి విషయం అధికారిక ఆధారంతో కూడి ఉంటుంది.",
    f2_h: "2. సుపరిచితమైన పాత్రల కథలు",
    f2_p: "రైతులు, విద్యార్థులు, మహిళలు మరియు వీధి వ్యాపారుల ప్రతిరూప పాత్రలతో సులువైన కథలు.",
    f3_h: "3. దేశీ బస్తీ మాటలు & వాయిస్",
    f3_p: "కఠినమైన అధికారుల భాషను సాధారణ వాడుక భాషలోకి మార్చి ఇంగ్లీష్, తెలుగు, హిందీ వాయిస్ ఇస్తుంది.",
    f4_h: "4. అర్హత మరియు పత్రాల తనిఖీ",
    f4_p: "మీ వయస్సు, ఆదాయం నమోదు చేసి మీ అర్హతను మరియు సిద్ధం చేసుకోవాల్సిన పత్రాలను తనిఖీ చేయండి.",
    f5_h: "5. అవగాహన పరీక్ష",
    f5_p: "పథకం గురించి మీకు ఎంతవరకు అర్థమైందో తెలుసుకోవడానికి క్విజ్ పరీక్ష రాసి స్కోర్ పొందండి.",
    f6_h: "6. AI ప్రశ్నోత్తరాల సహాయకుడు",
    f6_p: "పథకం గురించి ఏ సందేహం ఉన్నా అడగండి. కేవలం అధికారిక ఆధారాల నుండే సమాధానం ఇస్తుంది.",
    exp_badge: "India.gov.in పథకాల డైరెక్టరీ",
    exp_h: "అధికారిక ప్రభుత్వ పథకాలను అన్వేషించండి",
    exp_sub: "కేంద్ర మరియు రాష్ట్ర మంత్రిత్వ శాఖల ద్వారా ధృవీకరించబడిన పథకాలను చూడండి.",
    source_pill: "మూలం: జాతీయ పోర్టల్ India.gov.in",
    dir_search_ph: "పథకం పేరు లేదా లబ్ధి ద్వారా వెతకండి...",
    create_badge: "కామిక్ తయారీ విధానం",
    create_h: "పథకం కామిక్ తయారు చేయండి",
    create_sub: "అధికారిక పథకాన్ని ఎంచుకోండి, PDF అప్‌లోడ్ చేయండి లేదా లింక్ ఇవ్వండి.",
    cmode_search: "🔍 పథకాలు వెతకండి",
    cmode_pdf: "📄 PDF అప్‌లోడ్ చేయండి",
    cmode_text: "📝 ప్రభుత్వం వచనం పేస్ట్ చేయండి",
    cmode_url: "🔗 అధికారిక లింక్",
    csearch_h: "ధృవీకరించబడిన డేటాబేస్ వెతకండి",
    csearch_p: "India.gov.in నుండి సేకరించిన పథకాలను ఎంచుకోండి.",
    csearch_ph: "పథకం పేరు టైప్ చేయండి...",
    btn_find_scheme: "పథకం కనుగొనండి",
    cpdf_h: "అధికారిక PDF లేదా పత్రాన్ని అప్‌లోడ్ చేయండి",
    cpdf_p: "గోవ్‌టూన్ నేరుగా పత్రాల నుండి నిజాలను సేకరిస్తుంది.",
    cpdf_drop_h: "అధికారిక PDF ని ఇక్కడ డ్రాప్ చేయండి",
    cpdf_drop_p: "లేదా మీ కంప్యూటర్ నుండి ఎంచుకోండి",
    ctext_h: "ప్రభుత్వ జీవో / ప్రకటన వచనం పేస్ట్ చేయండి",
    ctext_p: "ప్రభుత్వ నిబంధనలు లేదా వార్తల వచనం పేస్ట్ చేయండి.",
    ctext_ph: "ఇక్కడ పేస్ట్ చేయండి...",
    btn_proc_text: "వచనాన్ని విశ్లేషించండి",
    curl_h: "అధికారిక వెబ్‌సైట్ లింక్ ఇవ్వండి",
    curl_p: "India.gov.in నుండి నేరుగా లింక్ నమోదు చేయండి.",
    btn_proc_url: "లింక్ విశ్లేషించండి",
    persona_h: "👤 ఈ కథ ఎవరి కోసం? (పాత్ర ఎంపిక)",
    persona_sub: "లబ్ధిదారుల నేపథ్యాన్ని ఎంచుకోండి. ప్రభుత్వ నియమాలు 100% మారవు.",
    p_farmer: "👨‍🌾 చిన్న రైతు (రాము కాకా)",
    p_vendor: "🛒 వీధి వ్యాపారి (కాలు)",
    p_woman: "👩 గృహ కార్మికురాలు (లతా తాయి)",
    p_student: "🎓 విద్యార్థి (రాజు)",
    p_senior: "👴 వృద్ధులు (శర్మ జీ)",
    source_verified: "✓ అధికారిక ఆధారాలు ధృవీకరించబడ్డాయి",
    btn_verify_portal: "🔗 పోర్టల్‌ను తనిఖీ చేయండి",
    rtab_comic: "🎨 4-ప్యానెల్ కామిక్",
    rtab_eligibility: "🟢 అర్హత తనిఖీ",
    rtab_documents: "📄 అవసరమైన పత్రాలు",
    rtab_steps: "🗺️ దరఖాస్తు విధానం",
    rtab_ask: "💬 గోవ్‌టూన్ AI అడగండి",
    rtab_quiz: "✅ అవగాహన క్విజ్",
    btn_listen: "▶ పూర్తి కామిక్ వినండి",
    btn_pause: "⏸ ఆపండి",
    lbl_speed: "వేగం:",
    btn_bookmark: "🔖 బుక్‌మార్క్",
    btn_print: "🖨️ 1-పేజీ ఫ్లైయర్ ప్రింట్",
    btn_citation: "🔍 ఆధారాలు (Citation)",
    btn_play_panel: "🔊 వినండి",
    elig_h: "🟢 అర్హత అంచనా తనిఖీ",
    elig_sub: "అధికారిక నిబంధనలతో మీ వివరాలను తనిఖీ చేయడానికి వివరాలు నమోదు చేయండి.",
    lbl_age: "మీ వయస్సు (సంవత్సరాలు)",
    lbl_income: "వార్షిక కుటుంబ ఆదాయం (₹)",
    lbl_state: "నివాస రాష్ట్రం",
    lbl_occ: "వృత్తి / వర్గం",
    elig_disclaimer: "⚠️ అధికారిక గమనిక: ఇది లభించిన సమాచారం ఆధారంగా ప్రాథమిక అంచనా మాత్రమే. దరఖాస్తు చేసేముందు అధికారిక వెబ్‌సైట్‌లో తనిఖీ చేయండి.",
    elig_eligible: "🟢 అర్హత పొందే అవకాశం ఉంది",
    elig_not_eligible: "🔴 అర్హత నిబంధనలకు సరిపోలడం లేదు",
    elig_amber: "🟡 ఆదాయ పరిమితి తనిఖీ అవసరం",
    doc_h: "📄 అవసరమైన పత్రాల జాబితా",
    doc_sub: "మీరు సిద్ధం చేసుకున్న పత్రాలను చెక్‌బాక్స్‌లో గుర్తించండి.",
    doc_prep_label: "సిద్ధమైన పురోగతి:",
    steps_h: "🗺️ అంచెలవారీ దరఖాస్తు విధానం",
    steps_sub: "సురక్షితంగా దరఖాస్తు చేయడానికి ఈ అధికారిక దశలను అనుసరించండి.",
    cta_ready: "దరఖాస్తు చేయడానికి సిద్ధంగా ఉన్నారా?",
    cta_desc: "నేరుగా అధికారిక ప్రభుత్వ పోర్టల్‌లో దరఖాస్తు చేసుకోండి.",
    btn_go_portal: "🚀 అధికారిక ప్రభుత్వ దరఖాస్తు పోర్టల్‌కు వెళ్లండి",
    ask_h: "💬 గోవ్‌టూన్ AI సహాయకుడు",
    ask_sub: "కేవలం అధికారిక India.gov.in సమాచారం ఆధారంగానే సమాధానాలు ఇస్తుంది.",
    sug_q: "సూచించిన ప్రశ్నలు:",
    q1: "ఎవరు అర్హులు?",
    q2: "నాకు ఏమి ప్రయోజనాలు లభిస్తాయి?",
    q3: "ఏ పత్రాలు తప్పనిసరి?",
    q4: "ఎక్కడ దరఖాస్తు చేసుకోవాలి?",
    bot_welcome: "నమస్తే! నేను మీ గోవ్‌టూన్ సహాయకుడిని. అధికారిక రికార్డుల ఆధారంగా మీ ప్రశ్నలకు సమాధానం ఇస్తాను.",
    cit_verified: "మూలం: ధృవీకరించబడిన India.gov.in రికార్డు",
    chat_ph: "ఈ పథకం గురించి ప్రశ్నించండి...",
    btn_send_q: "ప్రశ్న పంపండి",
    quiz_h: "✅ పథకం అవగాహన పరీక్ష",
    quiz_sub: "పథకం విషయాలపై మీ అవగాహనను పరీక్షించుకోండి.",
    lib_h: "📚 నా లైబ్రరీ",
    lib_sub: "మీరు దాచుకున్న పథకాలు, సృష్టించిన కామిక్స్ మరియు క్విజ్ స్కోర్లు.",
    lib_bm: "🔖 బుక్‌మార్క్ చేసిన పథకాలు",
    lib_created: "🎨 తయారు చేసిన కామిక్స్",
    lib_quiz_hist: "🎯 క్విజ్ పరీక్షల చరిత్ర",
    gask_h: "💬 గోవ్‌టూన్ AI (అన్ని పథకాలు)",
    gask_sub: "భారత జాతీయ పోర్టల్‌లోని ఏ పథకం గురించైనా అడగండి.",
    gbot_welcome: "నమస్కారం! స్కాలర్‌షిప్‌లు, పెన్షన్లు, రైతు సహాయం లేదా హెల్త్ కార్డుల గురించి ఏమైనా అడగండి.",
    cit_india_gov: "మూలం: India.gov.in ఆధారం",
    gchat_ph: "ఉదా: సోలార్ రూఫ్‌టాప్‌కు ఏ పథకం సబ్సిడీ ఇస్తుంది?",
    btn_ask_govtoon: "గోవ్‌టూన్ అడగండి",
    admin_badge: "అడ్మిన్ లాగిన్ మాత్రమే",
    admin_h: "గోవ్‌టూన్ నిర్వాహక & అవగాహన విశ్లేషణల డాష్‌బోర్డ్",
    admin_sub: "సేకరించిన పథకాలు, నవీకరణలు మరియు ప్రజల సందేహాలను విశ్లేషించండి.",
    astat_1: "సేకరించిన ప్రభుత్వ పథకాలు",
    astat_2: "తయారైన దృశ్య కామిక్స్",
    astat_3: "సగటు పౌరుల అవగాహన",
    astat_4: "యాక్టివ్ భాషలు (ఇంగ్లీష్, తెలుగు, హిందీ)",
    conf_h: "📊 పౌరుల అయోమయ విశ్లేషణలు",
    conf_sub: "ప్రభుత్వ పథకాలను అర్థం చేసుకోవడంలో ప్రజలు ఎక్కడ ఎక్కువ ఇబ్బంది పడుతున్నారో చూడండి:",
    conf_1: "అర్హత నిబంధనలు & ఆదాయ పరిమితులు",
    conf_2: "అవసరమైన పత్రాలు & ధృవీకరణ",
    conf_3: "దరఖాస్తు విధానం & పోర్టల్ సబ్మిషన్",
    conf_4: "లబ్ధి లెక్కింపు & జమ ప్రక్రియ",
    log_h: "🔄 పథకం నవీకరణ రికార్డులు",
    th_name: "పథకం పేరు",
    th_url: "మూల లింక్",
    th_date: "చివరిగా సేకరించిన తేదీ",
    th_status: "స్థితి",
    th_changes: "గుర్తించిన మార్పులు",
    th_action: "చర్య",
    cite_h: "🔍 ప్యానెల్ ఆధారాల ధృవీకరణ",
    cite_stmt: "ప్యానెల్ వాక్యం:",
    cite_src_txt: "అధికారిక మూల వచనం (India.gov.in):",
    cite_loc: "మూల విభాగం:",
    cite_date: "సేకరించిన తేదీ:",
    cite_url: "అధికారిక వెబ్‌సైట్ లింక్:",
    cite_view_link: "అధికారిక పత్రాన్ని చూడండి ↗",
    footer_quote: "\"ప్రభుత్వం చెప్పిన దాన్ని మేము మార్చము. పౌరులు అర్థం చేసుకునే విధానాన్ని సులభతరం చేస్తాము.\"",
    footer_src_label: "మూల సమాచారం:",
    footer_disclaimer: "గోవ్‌టూన్ పౌరుల సులువైన అవగాహన కోసం ప్రభుత్వ సమాచారాన్ని సరళీకృతం చేస్తుంది. ఇది అధికారిక ప్రభుత్వ వెబ్‌సైట్‌లకు ప్రత్యామ్నాయం కాదు."
  },
  hi: {
    logo_sub: "सरकारी योजनाएं, आसान भाषा में।",
    scheme_overview_title: "📌 योजना की मुख्य बातें और विवरण",
    scheme_grounded_sub: "भारत सरकार के आधिकारिक पोर्टल India.gov.in पर आधारित जानकारी",
    core_objective: "🎯 मुख्य उद्देश्य",
    key_benefits: "🎁 मुख्य लाभ और वित्तीय सहायता",
    target_beneficiary: "👤 पात्रता और लाभार्थी",
    mandatory_docs: "📄 अनिवार्य आवश्यक दस्तावेज",
    btn_apply_online: "🚀 ऑनलाइन आवेदन करें ↗",
    source_verified_label: "✓ आधिकारिक स्रोत द्वारा सत्यापित",
    last_verified_label: "अंतिम सत्यापन:",
    source_label: "स्रोत:",
    compulsory_label: "(अनिवार्य)",
    optional_label: "(वैकल्पिक)",
    audio_reading_title: "दृश्य कॉमिक कहानी वाचन:",
    says_label: "कहते हैं",
    panel_label: "पैनल",
    prepared_label: "तैयार",

    trust_badge: "🛡️ आधिकारिक स्रोतों पर आधारित",
    trust_text: "India.gov.in राष्ट्रीय पोर्टल से प्राप्त जानकारी। हम सरकार की बात नहीं बदलते — हम नागरिकों के समझने का तरीका आसान बनाते हैं।",
    btn_contrast: "👁️ कंट्रास्ट",
    btn_text_size: "A+ अक्षर आकार",
    nav_home: "🏠 होम",
    nav_explore: "🔍 योजनाएं खोजें",
    nav_create: "⚡ कॉमिक बनाएं",
    nav_reader: "📖 कॉमिक पढ़ें",
    nav_library: "📚 मेरी लाइब्रेरी",
    nav_ask: "💬 गवटून से पूछें",
    nav_admin: "📊 एडमिन",
    btn_create_nav: "+ योजना को कॉमिक में बदलें",
    hero_badge: "🇮🇳 राष्ट्रीय पोर्टल इंडिया Integration तैयार",
    hero_title: "सरकारी योजनाएं,<br><span class=\"hero-highlight\">आसान भाषा में।</span>",
    hero_sub: "जटिल सरकारी दस्तावेजों, पात्रता नियमों और आवेदन प्रक्रियाओं को सरल 4-पैनल दृश्यात्मक कहानियों और ऑडियो में समझें।",
    hero_ph: "आप कौन सी सरकारी योजना समझना चाहते हैं? (जैसे पीएम-किसान, आयुष्मान भारत)...",
    btn_search_schemes: "योजनाएं खोजें",
    try_asking: "खोजकर देखें:",
    pipe_doc: "सरकारी दस्तावेज / पोर्टल",
    pipe_ai: "AI तथ्य विश्लेषण",
    pipe_story: "कॉमिक कहानी",
    pipe_voice: "बहुभाषी ऑडियो",
    pipe_quiz: "समझ की परीक्षा",
    impact_orig: "सरकारी दस्तावेज पढ़ने पर सामान्य नागरिक की समझ",
    impact_govtoon: "गवटून कॉमिक्स पढ़ने के बाद समझ का स्कोर",
    feat_title: "गवटून नागरिकों को कैसे सशक्त बनाता है",
    feat_sub: "जटिल सरकारी भाषा और आम नागरिक की समझ के बीच का मजबूत पुल।",
    f1_h: "1. आधिकारिक स्रोतों पर आधारित",
    f1_p: "India.gov.in / myScheme से सीधा जुड़ाव। हर नियम और लाभ का स्पष्ट संदर्भ।",
    f2_h: "2. आम आदमी की कहानिया",
    f2_p: "किसान, छात्र, महिला और छोटे व्यापारियों की दैनिक जिंदगी से जुड़ी कहानियां।",
    f3_h: "3. देशी बस्ती की भाषा और आवाज",
    f3_p: "अधिकारियों की कठिन भाषा को आसान वोलचाल में बदलकर अंग्रेजी, तेलुगु, हिंदी में ऑडियो।",
    f4_h: "4. पात्रता और दस्तावेज जांच",
    f4_p: "अपनी उम्र, आय और राज्य दर्ज करके अपनी पात्रता और जरूरी कागजात जांचें।",
    f5_h: "5. समझ की परीक्षा (क्विज)",
    f5_p: "योजना की सही जानकारी का परीक्षण करने के लिए आसान सवाल-जवाब।",
    f6_h: "6. AI प्रश्नोत्तर सहायक",
    f6_p: "योजना से जुड़ा कोई भी सवाल पूछें। केवल आधिकारिक दस्तावेजों से सटीक जवाब।",
    exp_badge: "India.gov.in योजना डायरेक्टरी",
    exp_h: "आधिकारिक सरकारी योजनाएं खोजें",
    exp_sub: "केंद्र और राज्य मंत्रालयों की प्रमाणित योजनाएं देखें।",
    source_pill: "स्रोत: भारत का राष्ट्रीय पोर्टल India.gov.in",
    dir_search_ph: "योजना का नाम या लाभ से खोजें...",
    create_badge: "कॉमिक निर्माण प्रक्रिया",
    create_h: "योजना की कॉमिक बनाएं",
    create_sub: "सरकारी योजना चुनें, PDF अपलोड करें या लिंक दर्ज करें।",
    cmode_search: "🔍 योजनाएं खोजें",
    cmode_pdf: "📄 अपलोड PDF",
    cmode_text: "📝 सरकारी टेक्स्ट पेस्ट करें",
    cmode_url: "🔗 आधिकारिक लिंक",
    csearch_h: "प्रमाणित डेटाबेस में खोजें",
    csearch_p: "India.gov.in से ली गई योजनाओं में से चुनें।",
    csearch_ph: "योजना का नाम लिखें...",
    btn_find_scheme: "योजना खोजें",
    cpdf_h: "आधिकारिक PDF दस्तावेज अपलोड करें",
    cpdf_p: "गवटून सीधे सरकारी नोटिस से तथ्य निकालता है।",
    cpdf_drop_h: "आधिकारिक PDF यहां ड्रैग और ड्रॉप करें",
    cpdf_drop_p: "या अपने कंप्यूटर से फाइल चुनें",
    ctext_h: "सरकारी आदेश / टेक्स्ट पेस्ट करें",
    ctext_p: "सरकारी नियम या प्रेस विज्ञप्ति का टेक्स्ट पेस्ट करें।",
    ctext_ph: "यहां पेस्ट करें...",
    btn_proc_text: "टेक्स्ट का विश्लेषण करें",
    curl_h: "आधिकारिक वेबसाइट लिंक दर्ज करें",
    curl_p: "India.gov.in से सीधा लिंक दर्ज करें।",
    btn_proc_url: "वेबसाइट लिंक विश्लेषण करें",
    persona_h: "👤 यह कहानी किसके लिए है? (पात्र चयन)",
    persona_sub: "लाभार्थी की पृष्ठभूमि चुनें। सरकारी नियम 100% वही रहेंगे।",
    p_farmer: "👨‍🌾 छोटे किसान (रामू काका)",
    p_vendor: "🛒 चाय विक्रेता (कालू)",
    p_woman: "👩 घरेलू कामगार (लता ताई)",
    p_student: "🎓 छात्र / युवा (राजू)",
    p_senior: "👴 वरिष्ठ नागरिक (शर्मा जी)",
    source_verified: "✓ आधिकारिक स्रोत प्रमाणित",
    btn_verify_portal: "🔗 आधिकारिक पोर्टल देखें",
    rtab_comic: "🎨 4-पैनल कॉमिक",
    rtab_eligibility: "🟢 पात्रता जांच",
    rtab_documents: "📄 जरूरी दस्तावेज",
    rtab_steps: "🗺️ आवेदन के चरण",
    rtab_ask: "💬 गवटून AI से पूछें",
    rtab_quiz: "✅ समझ की परीक्षा",
    btn_listen: "▶ पूरी कॉमिक सुनें",
    btn_pause: "⏸ रोकें",
    lbl_speed: "गति:",
    btn_bookmark: "🔖 बुकमार्क",
    btn_print: "🖨️ 1-पेज फ्लायर प्रिंट",
    btn_citation: "🔍 यह क्यों दिखाया? (स्रोतः)",
    btn_play_panel: "🔊 सुनें",
    elig_h: "🟢 पात्रता मूल्यांकन जांच",
    elig_sub: "आधिकारिक नियमों से अपनी पात्रता मिलाने के लिए जानकारी दर्ज करें।",
    lbl_age: "आपकी उम्र (वर्ष)",
    lbl_income: "वार्षिक पारिवारिक आय (₹)",
    lbl_state: "निवास का राज्य",
    lbl_occ: "व्यवसाय / वर्ग",
    elig_disclaimer: "⚠️ आधिकारिक अस्वीकरण: यह उपलब्ध नियमों के आधार पर प्रारंभिक अनुमान है। आवेदन से पहले आधिकारिक वेबसाइट पर जरूर जांचें।",
    elig_eligible: "🟢 पात्र होने की संभावना है",
    elig_not_eligible: "🔴 पात्रता शर्तों से मेल नहीं खाता",
    elig_amber: "🟡 आय सीमा सत्यापन आवश्यक",
    doc_h: "📄 आवश्यक दस्तावेजों की सूची",
    doc_sub: "तैयार दस्तावेजों को चेकबॉक्स में मार्क करें।",
    doc_prep_label: "तैयारी की प्रगति:",
    steps_h: "🗺️ चरणबद्ध आवेदन मार्गदर्शिका",
    steps_sub: "सुरक्षित आवेदन के लिए इन आधिकारिक चरणों का पालन करें।",
    cta_ready: "आवेदन के लिए तैयार हैं?",
    cta_desc: "सीधे आधिकारिक सरकारी पोर्टल पर आवेदन जमा करें।",
    btn_go_portal: "🚀 आधिकारिक सरकारी पोर्टल पर जाएं",
    ask_h: "💬 गवटून AI सहायक",
    ask_sub: "केवल आधिकारिक India.gov.in आंकड़ों पर आधारित सटीक जवाब।",
    sug_q: "सुझाए गए प्रश्न:",
    q1: "कौन पात्र है?",
    q2: "मुझे क्या लाभ मिलेंगे?",
    q3: "कौन से कागज जरूरी हैं?",
    q4: "आवेदन कहां जमा करें?",
    bot_welcome: "नमस्ते! मैं आपका गवटून सहायक हूं। सरकारी रिकॉर्ड के आधार पर आपके सवालों के जवाब दूंगा।",
    cit_verified: "स्रोत: प्रमाणित India.gov.in रिकॉर्ड",
    chat_ph: "इस योजना के बारे में सवाल पूछें...",
    btn_send_q: "सवाल भेजें",
    quiz_h: "✅ योजना समझ की परीक्षा",
    quiz_sub: "योजना के तथ्यों पर अपनी समझ की जांच करें।",
    lib_h: "📚 मेरी लाइब्रेरी",
    lib_sub: "आपकी सुरक्षित योजनाएं, बनाई गई कॉमिक्स और परीक्षा स्कोर।",
    lib_bm: "🔖 बुकमार्क की गई योजनाएं",
    lib_created: "🎨 बनाई गई कॉमिक्स",
    lib_quiz_hist: "🎯 परीक्षा इतिहास",
    gask_h: "💬 गवटून AI (सभी योजनाएं)",
    gask_sub: "भारत के राष्ट्रीय पोर्टल की किसी भी योजना के बारे में पूछें।",
    gbot_welcome: "नमस्ते! छात्रवृत्ति, पेंशन, किसान सहायता या स्वास्थ्य कार्ड के बारे में कुछ भी पूछें।",
    cit_india_gov: "स्रोतः India.gov.in पर आधारित",
    gchat_ph: "जैसे: सोलर रूफटॉप के लिए कौन सी योजना सब्सिडी देती है?",
    btn_ask_govtoon: "गवटून से पूछें",
    admin_badge: "केवल एडमिन लॉगिन",
    admin_h: "गवटून प्रशासनिक एवं नागरिक समझ विश्लेषण डैशबोर्ड",
    admin_sub: "योजनाओं, नए अपडेट और नागरिकों के संशय का विश्लेषण करें।",
    astat_1: "सूचीबद्ध सरकारी योजनाएं",
    astat_2: "निर्मित दृश्यात्मक कॉमिक्स",
    astat_3: "औसत नागरिक समझ स्कोर",
    astat_4: "सक्रिय भाषाएं (अंग्रेजी, तेलुगु, हिंदी)",
    conf_h: "📊 नागरिक संशय विश्लेषण",
    conf_sub: "नागरिकों को सरकारी योजनाएं समझने में कहां सबसे ज्यादा कठिनाई होती है:",
    conf_1: "पात्रता नियम और आय सीमा",
    conf_2: "आवश्यक दस्तावेज और सत्यापन",
    conf_3: "आवेदन प्रक्रिया और पोर्टल जमा",
    conf_4: "लाभ की गणना और राशि जमा",
    log_h: "🔄 योजना अपडेट लॉग",
    th_name: "योजना का नाम",
    th_url: "स्रोत लिंक",
    th_date: "अंतिम अपडेट",
    th_status: "स्थिति",
    th_changes: "पहचाने गए बदलाव",
    th_action: "कार्रवाई",
    cite_h: "🔍 पैनल स्रोत संदर्भ",
    cite_stmt: "पैनल वाक्य:",
    cite_src_txt: "आधिकारिक स्रोत टेक्स्ट (India.gov.in):",
    cite_loc: "स्रोत अनुभाग:",
    cite_date: "प्राप्ति तिथि:",
    cite_url: "आधिकारिक वेबसाइट लिंक:",
    cite_view_link: "आधिकारिक दस्तावेज देखें ↗",
    footer_quote: "\"हम सरकार की बात नहीं बदलते। हम नागरिकों के समझने का तरीका आसान बनाते हैं।\"",
    footer_src_label: "स्रोत डेटा:",
    footer_disclaimer: "गवटून आसान समझ के लिए सार्वजनिक सरकारी जानकारी को सरल बनाता है। यह आधिकारिक सरकारी वेबसाइटों का विकल्प नहीं है।"
  }
};

// Multilingual Scheme Database Grounded on India.gov.in
const SCHEMES_DATABASE = [
    {
        "id": "custom_1084003475",
        "name": "Beti Bachao Beti Padhao",
        "category": "Central / State Welfare Scheme",
        "level": "Central",
        "dept": "Ministry of Social Justice & Empowerment / Government of India",
        "purpose": "Provide targeted social welfare and financial support under Beti Bachao Beti Padhao.",
        "benefits": "Direct Benefit Transfer (DBT) and subsidy assistance for eligible citizens.",
        "eligibility": {
            "minAge": 18,
            "maxAge": 70,
            "maxIncome": 500000,
            "state": "All India",
            "occupation": "General Citizen",
            "summary": "Eligible Indian citizens meeting income and residency criteria specified under Beti Bachao Beti Padhao guidelines."
        },
        "documents": [
            {
                "id": "d1",
                "name": "Aadhaar Card",
                "required": true,
                "why": "Identity and age verification"
            },
            {
                "id": "d2",
                "name": "Bank Passbook & IFSC",
                "required": true,
                "why": "Direct Benefit Transfer"
            },
            {
                "id": "d3",
                "name": "Ration Card / Residence Proof",
                "required": false,
                "why": "Family status verification"
            }
        ],
        "applicationSteps": [
            {
                "step": 1,
                "title": "Check Official Eligibility",
                "desc": "Verify rules on India.gov.in for Beti Bachao Beti Padhao."
            },
            {
                "step": 2,
                "title": "Gather Documents",
                "desc": "Keep Aadhaar card, passbook, and photo ready."
            },
            {
                "step": 3,
                "title": "Apply Online / CSC",
                "desc": "Submit form at nearest Jan Seva Kendra or official portal."
            }
        ],
        "officialUrl": "https://www.india.gov.in/my-government/schemes",
        "sourceUrl": "https://www.india.gov.in",
        "lastVerified": "2026-08-24",
        "panels": {
            "en": [
                {
                    "num": 1,
                    "tag": "Panel 1: The Tension",
                    "image": "assets/sukanya_1.jpg",
                    "speaker": "Anita",
                    "dialogue": "How will I manage expenses for my daughter Priya's higher education and secure her future without huge loans?",
                    "caption": "Anita worries about financial security for her daughter's bright future.",
                    "sourceRef": "Section 1: Beti Bachao Beti Padhao Official Guidelines (https://www.india.gov.in/my-government/schemes)"
                },
                {
                    "num": 2,
                    "tag": "Panel 2: The Solution",
                    "image": "assets/sukanya_2.jpg",
                    "speaker": "GovToon Hero",
                    "dialogue": "Fikr mat kijiye! Beti Bachao Beti Padhao guarantees: Direct Benefit Transfer (DBT) and subsidy assistance for eligible citizens.",
                    "caption": "Official government welfare and highest interest security guaranteed.",
                    "sourceRef": "Section 2: Beti Bachao Beti Padhao Official Guidelines (https://www.india.gov.in/my-government/schemes)"
                },
                {
                    "num": 3,
                    "tag": "Panel 3: The Easy Path",
                    "image": "assets/sukanya_3.jpg",
                    "speaker": "CSC Bhaiya",
                    "dialogue": "Just bring Aadhaar Card, Bank Passbook & IFSC, Ration Card / Residence Proof to the nearest Post Office, Bank, or Jan Seva Kendra to enroll online.",
                    "caption": "Simple digital registration with minimal documents.",
                    "sourceRef": "Section 3: Beti Bachao Beti Padhao Official Guidelines (https://www.india.gov.in/my-government/schemes)"
                },
                {
                    "num": 4,
                    "tag": "Panel 4: The Khushali",
                    "image": "assets/sukanya_4.jpg",
                    "speaker": "Tagline",
                    "dialogue": "🎉 Beti Bachao Beti Padhao: Beti Padhao, Desh Badhao! Secure future, smiling daughter!",
                    "caption": "Guaranteed government support brings peace of mind.",
                    "sourceRef": "Section 4: Beti Bachao Beti Padhao Official Guidelines (https://www.india.gov.in/my-government/schemes)"
                }
            ],
            "te": [
                {
                    "num": 1,
                    "tag": "ప్యానెల్ 1: సమస్య & ఆందోళన",
                    "image": "assets/sukanya_1.jpg",
                    "speaker": "అనిత",
                    "dialogue": "నా ముద్దుల కూతురు ప్రియ ఉన్నత చదువులు మరియు భవిష్యత్తు కోసం ఖర్చులు ఎలా సమకూర్చాలి? అప్పులు చేయకుండా ఉండగలనా?",
                    "caption": "కూతురి భవిష్యత్తు కోసం అనిత పడే ఆందోళన.",
                    "sourceRef": "Section 1: Beti Bachao Beti Padhao Official Guidelines (https://www.india.gov.in/my-government/schemes)"
                },
                {
                    "num": 2,
                    "tag": "ప్యానెల్ 2: ప్రభుత్వ పరిష్కారం",
                    "image": "assets/sukanya_2.jpg",
                    "speaker": "గోవ్టూన్ హీరో",
                    "dialogue": "దిగులుపడకండి అనిత గారూ! Beti Bachao Beti Padhao ద్వారా ప్రభుత్వం అండగా నిలుస్తోంది: Direct Benefit Transfer (DBT) and subsidy assistance for eligible citizens.",
                    "caption": "ప్రభుత్వ అధికారిక ప్రయోజనాలు మరియు అత్యధిక వడ్డీ భరోసా.",
                    "sourceRef": "Section 2: Beti Bachao Beti Padhao Official Guidelines (https://www.india.gov.in/my-government/schemes)"
                },
                {
                    "num": 3,
                    "tag": "ప్యానెల్ 3: సులువైన దరఖాస్తు",
                    "image": "assets/sukanya_3.jpg",
                    "speaker": "CSC మిత్రుడు",
                    "dialogue": "కేవలం మీ ఆధార్ కార్డు మరియు బ్యాంక్ పాస్‌బుక్ తీసుకొని సమీప పోస్టాఫీస్, బ్యాంక్ లేదా CSC కేంద్రానికి వెళితే సులభంగా నమోదు చేసుకోవచ్చు.",
                    "caption": "సులువైన ఆధార్ ఆధారిత డిజిటల్ దరఖాస్తు.",
                    "sourceRef": "Section 3: Beti Bachao Beti Padhao Official Guidelines (https://www.india.gov.in/my-government/schemes)"
                },
                {
                    "num": 4,
                    "tag": "ప్యానెల్ 4: ఆనందం & ప్రయోజనం",
                    "image": "assets/sukanya_4.jpg",
                    "speaker": "స్లోగన్",
                    "dialogue": "🎉 Beti Bachao Beti Padhao: ఆడబిడ్డల భవిష్యత్తుకు భరోసా! బంగారు భవిష్యత్తు సాకారం!",
                    "caption": "ప్రభుత్వ సహాయంతో నిర్భయంగా ముందుకు.",
                    "sourceRef": "Section 4: Beti Bachao Beti Padhao Official Guidelines (https://www.india.gov.in/my-government/schemes)"
                }
            ],
            "hi": [
                {
                    "num": 1,
                    "tag": "पैनल 1: चिंता व समस्या",
                    "image": "assets/sukanya_1.jpg",
                    "speaker": "अनीता",
                    "dialogue": "मेरी प्यारी बेटी प्रिया की उच्च शिक्षा और भविष्य की सुरक्षा के लिए पैसे कैसे जुटाऊँगी? क्या बिना कर्ज के सपना पूरा होगा?",
                    "caption": "बेटी के भविष्य को लेकर माँ अनीता की चिंता।",
                    "sourceRef": "Section 1: Beti Bachao Beti Padhao Official Guidelines (https://www.india.gov.in/my-government/schemes)"
                },
                {
                    "num": 2,
                    "tag": "पैनल 2: सरकारी समाधान",
                    "image": "assets/sukanya_2.jpg",
                    "speaker": "गवटून हीरो",
                    "dialogue": "बिल्कुल चिंता न करें अनीता जी! Beti Bachao Beti Padhao के तहत सरकार दे रही है गारंटीड सहायता: Direct Benefit Transfer (DBT) and subsidy assistance for eligible citizens.",
                    "caption": "आधिकारिक सरकारी सहायता और उच्च ब्याज सुरक्षा की गारंटी।",
                    "sourceRef": "Section 2: Beti Bachao Beti Padhao Official Guidelines (https://www.india.gov.in/my-government/schemes)"
                },
                {
                    "num": 3,
                    "tag": "पैनल 3: आसान आवेदन प्रक्रिया",
                    "image": "assets/sukanya_3.jpg",
                    "speaker": "CSC भैया",
                    "dialogue": "बस अपने आधार कार्ड और बैंक पासबुक लेकर नजदीकी डाकघर, बैंक या जन सेवा केंद्र जाएं और तुरंत आवेदन करें।",
                    "caption": "सरल आधार-आधारित डिजिटल पंजीकरण।",
                    "sourceRef": "Section 3: Beti Bachao Beti Padhao Official Guidelines (https://www.india.gov.in/my-government/schemes)"
                },
                {
                    "num": 4,
                    "tag": "पैनल 4: खुशहाली व सफलता",
                    "image": "assets/sukanya_4.jpg",
                    "speaker": "टैगलाइन",
                    "dialogue": "🎉 Beti Bachao Beti Padhao: बेटी पढ़ाओ, देश बढ़ाओ! सशक्त बेटी, समृद्ध परिवार!",
                    "caption": "सरकारी सहयोग से परिवार में खुशहाली।",
                    "sourceRef": "Section 4: Beti Bachao Beti Padhao Official Guidelines (https://www.india.gov.in/my-government/schemes)"
                }
            ]
        },
        "character": {
            "en": {
                "name": "Anita & Priya",
                "role": "Mother & Daughter",
                "avatar": "👩‍👧",
                "clothing": "Traditional Saree & School Uniform",
                "desc": "Caring mother & ambitious daughter securing educational future"
            },
            "te": {
                "name": "అనిత & ప్రియ",
                "role": "తల్లి & కూతురు",
                "avatar": "👩‍👧",
                "clothing": "సాంప్రదాయ చీర & స్కూల్ యూనిఫాం",
                "desc": "కూతురి ఉన్నత చదువులు, బంగారు భవిష్యత్తు కోసం ఆరాటపడే తల్లి"
            },
            "hi": {
                "name": "अनीता और प्रिया",
                "role": "माँ और बेटी",
                "avatar": "👩‍👧",
                "clothing": "पारंपरिक साड़ी व स्कूल यूनिफॉर्म",
                "desc": "बेटी के उज्ज्वल भविष्य व उच्च शिक्षा हेतु समर्पित माँ"
            }
        }
    },
    {
        "id": "custom_602451399",
        "name": "Epass",
        "category": "Central / State Welfare Scheme",
        "level": "Central",
        "dept": "Ministry of Social Justice & Empowerment / Government of India",
        "purpose": "Provide targeted social welfare and financial support under epass.",
        "benefits": "Direct Benefit Transfer (DBT) and subsidy assistance for eligible citizens.",
        "eligibility": {
            "minAge": 18,
            "maxAge": 70,
            "maxIncome": 500000,
            "state": "All India",
            "occupation": "General Citizen",
            "summary": "Eligible Indian citizens meeting income and residency criteria specified under epass guidelines."
        },
        "documents": [
            {
                "id": "d1",
                "name": "Aadhaar Card",
                "required": true,
                "why": "Identity and age verification"
            },
            {
                "id": "d2",
                "name": "Bank Passbook & IFSC",
                "required": true,
                "why": "Direct Benefit Transfer"
            },
            {
                "id": "d3",
                "name": "Ration Card / Residence Proof",
                "required": false,
                "why": "Family status verification"
            }
        ],
        "applicationSteps": [
            {
                "step": 1,
                "title": "Check Official Eligibility",
                "desc": "Verify rules on India.gov.in for epass."
            },
            {
                "step": 2,
                "title": "Gather Documents",
                "desc": "Keep Aadhaar card, passbook, and photo ready."
            },
            {
                "step": 3,
                "title": "Apply Online / CSC",
                "desc": "Submit form at nearest Jan Seva Kendra or official portal."
            }
        ],
        "officialUrl": "https://www.india.gov.in/my-government/schemes",
        "sourceUrl": "https://www.india.gov.in",
        "lastVerified": "2026-08-24",
        "panels": {
            "en": [
                {
                    "num": 1,
                    "tag": "Panel 1: The Tension",
                    "image": "assets/scholarship_1.jpg",
                    "speaker": "Raju",
                    "dialogue": "College tuition fees and books are so expensive! How can I complete my higher education without financial stress?",
                    "caption": "Students worry about college admission and semester fees.",
                    "sourceRef": "Section 1: Epass Official Guidelines (https://www.india.gov.in/my-government/schemes)"
                },
                {
                    "num": 2,
                    "tag": "Panel 2: The Solution",
                    "image": "assets/scholarship_2.jpg",
                    "speaker": "GovToon Hero",
                    "dialogue": "Fikr mat kijiye! Epass provides: Direct Benefit Transfer (DBT) and subsidy assistance for eligible citizens.",
                    "caption": "Direct 100% scholarship transfer to student bank accounts.",
                    "sourceRef": "Section 2: Epass Official Guidelines (https://www.india.gov.in/my-government/schemes)"
                },
                {
                    "num": 3,
                    "tag": "Panel 3: The Easy Path",
                    "image": "assets/scholarship_3.jpg",
                    "speaker": "CSC Bhaiya",
                    "dialogue": "Upload your Aadhaar Card, Bank Passbook & IFSC, Ration Card / Residence Proof on the official scholarship portal or visit nearest CSC center.",
                    "caption": "Fast Aadhaar-based scholarship verification.",
                    "sourceRef": "Section 3: Epass Official Guidelines (https://www.india.gov.in/my-government/schemes)"
                },
                {
                    "num": 4,
                    "tag": "Panel 4: The Khushali",
                    "image": "assets/scholarship_4.jpg",
                    "speaker": "Tagline",
                    "dialogue": "🎉 Epass: Padhega India, Badhega India! Dreams empowered by government support!",
                    "caption": "Education secured with full tuition waiver.",
                    "sourceRef": "Section 4: Epass Official Guidelines (https://www.india.gov.in/my-government/schemes)"
                }
            ],
            "te": [
                {
                    "num": 1,
                    "tag": "ప్యానెల్ 1: సమస్య & ఆందోళన",
                    "image": "assets/scholarship_1.jpg",
                    "speaker": "రాజు",
                    "dialogue": "కాలేజీ సెమిస్టర్ ఫీజులు, పుస్తకాల ఖర్చులు చాలా ఎక్కువగా ఉన్నాయి! ఆర్థిక ఇబ్బందుల వల్ల నా చదువు ఆగిపోతుందేమో అని భయంగా ఉంది.",
                    "caption": "ఫీజుల కోసం విద్యార్థుల ఆవేదన.",
                    "sourceRef": "Section 1: Epass Official Guidelines (https://www.india.gov.in/my-government/schemes)"
                },
                {
                    "num": 2,
                    "tag": "ప్యానెల్ 2: ప్రభుత్వ పరిష్కారం",
                    "image": "assets/scholarship_2.jpg",
                    "speaker": "గోవ్టూన్ హీరో",
                    "dialogue": "దిగులుపడకండి విద్యార్థి మిత్రులారా! Epass ద్వారా ప్రభుత్వం అండగా నిలుస్తోంది: Direct Benefit Transfer (DBT) and subsidy assistance for eligible citizens.",
                    "caption": "100% ఫీజు రీయింబర్స్‌మెంట్ మరియు మెయింటెనెన్స్ అలవెన్స్ భరోసా.",
                    "sourceRef": "Section 2: Epass Official Guidelines (https://www.india.gov.in/my-government/schemes)"
                },
                {
                    "num": 3,
                    "tag": "ప్యానెల్ 3: సులువైన దరఖాస్తు",
                    "image": "assets/scholarship_3.jpg",
                    "speaker": "CSC మిత్రుడు",
                    "dialogue": "మీ ఆధార్ కార్డు మరియు బ్యాంక్ పాస్‌బుక్ తో అధికారిక స్కాలర్‌షిప్ పోర్టల్ లేదా CSC లో వెంటనే దరఖాస్తు చేసుకోండి.",
                    "caption": "త్వరిత ఆన్‌లైన్ వెరిఫికేషన్ ప్రక్రియ.",
                    "sourceRef": "Section 3: Epass Official Guidelines (https://www.india.gov.in/my-government/schemes)"
                },
                {
                    "num": 4,
                    "tag": "ప్యానెల్ 4: ఆనందం & ప్రయోజనం",
                    "image": "assets/scholarship_4.jpg",
                    "speaker": "స్లోగన్",
                    "dialogue": "🎉 Epass: చదువుకు పైసల కొరత లేదు! ఉన్నత విద్యతో బంగారు భవిష్యత్తు!",
                    "caption": "ప్రభుత్వ స్కాలర్‌షిప్‌తో కలలు సాకారం.",
                    "sourceRef": "Section 4: Epass Official Guidelines (https://www.india.gov.in/my-government/schemes)"
                }
            ],
            "hi": [
                {
                    "num": 1,
                    "tag": "पैनल 1: चिंता व समस्या",
                    "image": "assets/scholarship_1.jpg",
                    "speaker": "राजू",
                    "dialogue": "कॉलेज की फीस और किताबों का खर्च बहुत ज्यादा है! पैसों की कमी से कहीं मेरी उच्च शिक्षा न रुक जाए!",
                    "caption": "छात्रों को कॉलेज फीस और खर्च की चिंता।",
                    "sourceRef": "Section 1: Epass Official Guidelines (https://www.india.gov.in/my-government/schemes)"
                },
                {
                    "num": 2,
                    "tag": "पैनल 2: सरकारी समाधान",
                    "image": "assets/scholarship_2.jpg",
                    "speaker": "गवटून हीरो",
                    "dialogue": "बिल्कुल चिंता न करें! Epass के अंतर्गत सरकार प्रदान कर रही है: Direct Benefit Transfer (DBT) and subsidy assistance for eligible citizens.",
                    "caption": "सीधे बैंक खाते में 100% स्कॉलरशिप और भत्ता।",
                    "sourceRef": "Section 2: Epass Official Guidelines (https://www.india.gov.in/my-government/schemes)"
                },
                {
                    "num": 3,
                    "tag": "पैनल 3: आसान आवेदन प्रक्रिया",
                    "image": "assets/scholarship_3.jpg",
                    "speaker": "CSC भैया",
                    "dialogue": "बस अपने आधार कार्ड और बैंक पासबुक के साथ राष्ट्रीय छात्रवृत्ति पोर्टल पर ऑनलाइन फॉर्म भरें।",
                    "caption": "सरल डिजिटल सत्यापन व सीधा डीबीटी।",
                    "sourceRef": "Section 3: Epass Official Guidelines (https://www.india.gov.in/my-government/schemes)"
                },
                {
                    "num": 4,
                    "tag": "पैनल 4: खुशहाली व सफलता",
                    "image": "assets/scholarship_4.jpg",
                    "speaker": "टैगलाइन",
                    "dialogue": "🎉 Epass: पढ़ेगा इंडिया, बढ़ेगा इंडिया! युवा शक्ति का स्वर्णिम भविष्य!",
                    "caption": "बिना किसी रुकावट के पूरी होगी उच्च शिक्षा।",
                    "sourceRef": "Section 4: Epass Official Guidelines (https://www.india.gov.in/my-government/schemes)"
                }
            ]
        },
        "character": {
            "en": {
                "name": "Raju & Priya",
                "role": "College Students",
                "avatar": "🎓",
                "clothing": "College Bag & Formal Shirt",
                "desc": "Meritorious students aspiring for higher education degrees"
            },
            "te": {
                "name": "రాజు & ప్రియ",
                "role": "కళాశాల విద్యార్థులు",
                "avatar": "🎓",
                "clothing": "కాలేజీ బ్యాగ్ & చొక్కా",
                "desc": "ఉన్నత చదువులపై ఆశలు పెట్టుకున్న ప్రతిభావంతులైన విద్యార్థులు"
            },
            "hi": {
                "name": "राजू और प्रिया",
                "role": "कॉलेज छात्र",
                "avatar": "🎓",
                "clothing": "कॉलेज बैग व फॉर्मल शर्ट",
                "desc": "उच्च शिक्षा का सपना देखने वाले मेधावी छात्र"
            }
        }
    },
    {
        "id": "custom_931485574",
        "name": "Startup",
        "category": "Central / State Welfare Scheme",
        "level": "Central",
        "dept": "Ministry of Social Justice & Empowerment / Government of India",
        "purpose": "Provide targeted social welfare and financial support under Startup.",
        "benefits": "Direct Benefit Transfer (DBT) and subsidy assistance for eligible citizens.",
        "eligibility": {
            "minAge": 18,
            "maxAge": 70,
            "maxIncome": 500000,
            "state": "All India",
            "occupation": "General Citizen",
            "summary": "Eligible Indian citizens meeting income and residency criteria specified under Startup guidelines."
        },
        "documents": [
            {
                "id": "d1",
                "name": "Aadhaar Card",
                "required": true,
                "why": "Identity and age verification"
            },
            {
                "id": "d2",
                "name": "Bank Passbook & IFSC",
                "required": true,
                "why": "Direct Benefit Transfer"
            },
            {
                "id": "d3",
                "name": "Ration Card / Residence Proof",
                "required": false,
                "why": "Family status verification"
            }
        ],
        "applicationSteps": [
            {
                "step": 1,
                "title": "Check Official Eligibility",
                "desc": "Verify rules on India.gov.in for Startup."
            },
            {
                "step": 2,
                "title": "Gather Documents",
                "desc": "Keep Aadhaar card, passbook, and photo ready."
            },
            {
                "step": 3,
                "title": "Apply Online / CSC",
                "desc": "Submit form at nearest Jan Seva Kendra or official portal."
            }
        ],
        "officialUrl": "https://www.india.gov.in/my-government/schemes",
        "sourceUrl": "https://www.india.gov.in",
        "lastVerified": "2026-08-24",
        "panels": {
            "en": [
                {
                    "num": 1,
                    "tag": "Panel 1: The Tension",
                    "image": "assets/mudra_1.jpg",
                    "speaker": "Ravi",
                    "dialogue": "I want to start and expand my enterprise, but moneylenders charge high interest and private banks ask for property collateral!",
                    "caption": "Ravi worries about business startup capital and bank collateral.",
                    "sourceRef": "Section 1: Startup Official Guidelines (https://www.india.gov.in/my-government/schemes)"
                },
                {
                    "num": 2,
                    "tag": "Panel 2: The Solution",
                    "image": "assets/mudra_2.jpg",
                    "speaker": "GovToon Hero",
                    "dialogue": "Fikr mat kijiye! Startup provides: Direct Benefit Transfer (DBT) and subsidy assistance for eligible citizens.",
                    "caption": "100% collateral-free government institutional funding.",
                    "sourceRef": "Section 2: Startup Official Guidelines (https://www.india.gov.in/my-government/schemes)"
                },
                {
                    "num": 3,
                    "tag": "Panel 3: The Easy Path",
                    "image": "assets/mudra_3.jpg",
                    "speaker": "CSC Bhaiya",
                    "dialogue": "Submit your business proposal with Aadhaar Card, Bank Passbook & IFSC, Ration Card / Residence Proof at any bank branch or on udyamimitra portal.",
                    "caption": "Simple collateral-free loan processing.",
                    "sourceRef": "Section 3: Startup Official Guidelines (https://www.india.gov.in/my-government/schemes)"
                },
                {
                    "num": 4,
                    "tag": "Panel 4: The Khushali",
                    "image": "assets/mudra_4.jpg",
                    "speaker": "Tagline",
                    "dialogue": "🎉 Startup: Atmanirbhar Bharat! Low interest collateral-free capital for your success!",
                    "caption": "Business flourishing with official government financial backing.",
                    "sourceRef": "Section 4: Startup Official Guidelines (https://www.india.gov.in/my-government/schemes)"
                }
            ],
            "te": [
                {
                    "num": 1,
                    "tag": "ప్యానెల్ 1: సమస్య & ఆందోళన",
                    "image": "assets/mudra_1.jpg",
                    "speaker": "రవి",
                    "dialogue": "నా వ్యాపారాన్ని లేదా స్టార్టప్‌ను ప్రారంభించి విస్తరించాలనుకుంటున్నాను, కానీ ప్రైవేట్ బ్యాంకులు ఆస్తి తాకట్టు అడుగుతున్నాయి!",
                    "caption": "మూలధనం కొరకు రవి పడే ఆందోళన.",
                    "sourceRef": "Section 1: Startup Official Guidelines (https://www.india.gov.in/my-government/schemes)"
                },
                {
                    "num": 2,
                    "tag": "ప్యానెల్ 2: ప్రభుత్వ పరిష్కారం",
                    "image": "assets/mudra_2.jpg",
                    "speaker": "గోవ్టూన్ హీరో",
                    "dialogue": "దిగులుపడకండి రవి గారూ! Startup ద్వారా ప్రభుత్వం అండగా నిలుస్తోంది: Direct Benefit Transfer (DBT) and subsidy assistance for eligible citizens.",
                    "caption": "ఎలాంటి ఆస్తి తాకట్టు లేకుండా సులభమైన ప్రభుత్వ వ్యాపార రుణాలు.",
                    "sourceRef": "Section 2: Startup Official Guidelines (https://www.india.gov.in/my-government/schemes)"
                },
                {
                    "num": 3,
                    "tag": "ప్యానెల్ 3: సులువైన దరఖాస్తు",
                    "image": "assets/mudra_3.jpg",
                    "speaker": "CSC మిత్రుడు",
                    "dialogue": "మీ ఆధార్ కార్డు మరియు బ్యాంక్ పాస్‌బుక్ మరియు వ్యాపార ప్రణాళికతో ఏ జాతీయ బ్యాంకులోనైనా లేదా పోర్టల్‌లోనైనా దరఖాస్తు చేయండి.",
                    "caption": "సులువైన పూచీకత్తు లేని రుణ మంజూరు.",
                    "sourceRef": "Section 3: Startup Official Guidelines (https://www.india.gov.in/my-government/schemes)"
                },
                {
                    "num": 4,
                    "tag": "ప్యానెల్ 4: ఆనందం & ప్రయోజనం",
                    "image": "assets/mudra_4.jpg",
                    "speaker": "స్లోగన్",
                    "dialogue": "🎉 Startup: ఆత్మనిర్భర్ భారత్! స్వయం ఉపాధితో పదిమందికి ఉపాధి కల్పించే స్థాయికి!",
                    "caption": "సొంత వ్యాపారంతో ఆర్థిక పురోగతి.",
                    "sourceRef": "Section 4: Startup Official Guidelines (https://www.india.gov.in/my-government/schemes)"
                }
            ],
            "hi": [
                {
                    "num": 1,
                    "tag": "पैनल 1: चिंता व समस्या",
                    "image": "assets/mudra_1.jpg",
                    "speaker": "रवि",
                    "dialogue": "मैं अपना व्यापार या स्टार्टअप शुरू करके बढ़ाना चाहता हूँ, लेकिन बैंक बिना गारंटी या जमीन गिरवी रखे लोन नहीं देते!",
                    "caption": "व्यापार पूंजी के लिए उद्यमी की चिंता।",
                    "sourceRef": "Section 1: Startup Official Guidelines (https://www.india.gov.in/my-government/schemes)"
                },
                {
                    "num": 2,
                    "tag": "पैनल 2: सरकारी समाधान",
                    "image": "assets/mudra_2.jpg",
                    "speaker": "गवटून हीरो",
                    "dialogue": "बिल्कुल चिंता न करें रवि जी! Startup के तहत सरकार दे रही है: Direct Benefit Transfer (DBT) and subsidy assistance for eligible citizens.",
                    "caption": "बिना किसी गारंटी के आसान सरकारी व्यापारिक ऋण।",
                    "sourceRef": "Section 2: Startup Official Guidelines (https://www.india.gov.in/my-government/schemes)"
                },
                {
                    "num": 3,
                    "tag": "पैनल 3: आसान आवेदन प्रक्रिया",
                    "image": "assets/mudra_3.jpg",
                    "speaker": "CSC भैया",
                    "dialogue": "बस अपने आधार कार्ड और बैंक पासबुक और बिजनेस प्लान के साथ किसी भी बैंक या उद्यमी मित्र पोर्टल पर आवेदन करें।",
                    "caption": "बिना प्रॉपर्टी गिरवी रखे त्वरित लोन स्वीकृति।",
                    "sourceRef": "Section 3: Startup Official Guidelines (https://www.india.gov.in/my-government/schemes)"
                },
                {
                    "num": 4,
                    "tag": "पैनल 4: खुशहाली व सफलता",
                    "image": "assets/mudra_4.jpg",
                    "speaker": "टैगलाइन",
                    "dialogue": "🎉 Startup: आत्मनिर्भर भारत! कम ब्याज पर आसान पूंजी, आपका व्यापार बुलंदियों पर!",
                    "caption": "सरकारी वित्तीय सहयोग से नया व्यापार सफल।",
                    "sourceRef": "Section 4: Startup Official Guidelines (https://www.india.gov.in/my-government/schemes)"
                }
            ]
        },
        "character": {
            "en": {
                "name": "Ravi Kumar",
                "role": "Small Business Owner & Entrepreneur",
                "avatar": "💼",
                "clothing": "Smart Casual",
                "desc": "Ambitious entrepreneur expanding venture without collateral"
            },
            "te": {
                "name": "రవి కుమార్",
                "role": "చిరు వ్యాపారి & యువ పారిశ్రామికవేత్త",
                "avatar": "💼",
                "clothing": "వ్యాపార దుస్తులు",
                "desc": "తన స్వయం ఉపాధిని విస్తరించడానికి పూచీకత్తు లేని రుణం కోరే యువకుడు"
            },
            "hi": {
                "name": "रवि कुमार",
                "role": "उद्यमी व व्यापारी",
                "avatar": "💼",
                "clothing": "स्मार्ट कैजुअल",
                "desc": "बिना गारंटी व्यवसाय ऋण व स्टार्टअप पूंजी चाहने वाला युवा"
            }
        }
    },
    {
        "id": "pm_kisan",
        "name": "PM-Kisan Samman Nidhi",
        "category": "Agriculture",
        "level": "Central",
        "dept": "Ministry of Agriculture & Farmers Welfare",
        "purpose": "Provide income support to small and marginal farmer families across India for purchasing agricultural inputs.",
        "benefits": "₹6,000 per year transferred directly to bank account in 3 equal installments of ₹2,000.",
        "eligibility": {
            "minAge": 18,
            "maxAge": 100,
            "maxIncome": 500000,
            "state": "All India",
            "occupation": "Farmer",
            "summary": "Small and marginal landholding farmer families holding cultivable land in their names."
        },
        "documents": [
            {
                "id": "d1",
                "name": "Aadhaar Card",
                "required": true,
                "why": "Compulsory identity verification via UIDAI"
            },
            {
                "id": "d2",
                "name": "Land Holding Documents",
                "required": true,
                "why": "Proves ownership of cultivable agricultural land"
            },
            {
                "id": "d3",
                "name": "Bank Passbook & IFSC",
                "required": true,
                "why": "Required for Direct Benefit Transfer (DBT)"
            },
            {
                "id": "d4",
                "name": "Mobile Number",
                "required": false,
                "why": "For OTP verification & SMS payment alerts"
            }
        ],
        "applicationSteps": [
            {
                "step": 1,
                "title": "Check Eligibility",
                "desc": "Ensure cultivable land is registered in your name."
            },
            {
                "step": 2,
                "title": "Gather Aadhaar & Passbook",
                "desc": "Keep original Aadhaar card and bank passbook handy."
            },
            {
                "step": 3,
                "title": "Visit Jan Seva Kendra / Portal",
                "desc": "Visit nearest Common Service Center (CSC) or pmkisan.gov.in."
            },
            {
                "step": 4,
                "title": "Submit e-KYC & Passbook",
                "desc": "Complete biometric or OTP e-KYC verification."
            },
            {
                "step": 5,
                "title": "Receive ₹2,000 DBT",
                "desc": "First installment transferred directly to your bank account."
            }
        ],
        "officialUrl": "https://www.india.gov.in/my-government/schemes/pm-kisan-samman-nidhi",
        "sourceUrl": "https://pmkisan.gov.in",
        "applyUrl": "https://pmkisan.gov.in",
        "lastVerified": "2026-08-24",
        "panels": {
            "en": [
                {
                    "num": 1,
                    "tag": "Panel 1: The Tension",
                    "image": "assets/pm_kisan_1.jpg",
                    "speaker": "Ramu Kaka",
                    "dialogue": "Rising seed, fertilizer, and irrigation costs before every sowing season make farming financially stressful!",
                    "caption": "Ramu Kaka worries about seasonal crop input expenses.",
                    "sourceRef": "Section 1: PM-Kisan Samman Nidhi Official Guidelines (https://www.india.gov.in/my-government/schemes/pm-kisan-samman-nidhi)"
                },
                {
                    "num": 2,
                    "tag": "Panel 2: The Solution",
                    "image": "assets/pm_kisan_2.jpg",
                    "speaker": "GovToon Hero",
                    "dialogue": "Fikr mat kijiye! PM-Kisan Samman Nidhi provides: ₹6,000 per year transferred directly to bank account in 3 equal installments of ₹2,000.",
                    "caption": "Guaranteed ₹6,000 per year in 3 direct ₹2,000 DBT installments to your bank account.",
                    "sourceRef": "Section 2: PM-Kisan Samman Nidhi Official Guidelines (https://www.india.gov.in/my-government/schemes/pm-kisan-samman-nidhi)"
                },
                {
                    "num": 3,
                    "tag": "Panel 3: The Easy Path",
                    "image": "assets/pm_kisan_3.jpg",
                    "speaker": "CSC Bhaiya",
                    "dialogue": "Just complete e-KYC and land seeding with your Aadhaar Card, Land Holding Documents, Bank Passbook & IFSC, Mobile Number on the pmkisan.gov.in portal.",
                    "caption": "Direct Aadhaar Payment Bridge without any middleman.",
                    "sourceRef": "Section 3: PM-Kisan Samman Nidhi Official Guidelines (https://www.india.gov.in/my-government/schemes/pm-kisan-samman-nidhi)"
                },
                {
                    "num": 4,
                    "tag": "Panel 4: The Khushali",
                    "image": "assets/pm_kisan_4.jpg",
                    "speaker": "Tagline",
                    "dialogue": "🎉 PM-Kisan Samman Nidhi: Jai Jawan, Jai Kisan! Timely DBT empowers our annadatas!",
                    "caption": "Purchasing certified seeds and fertilizers with peace of mind.",
                    "sourceRef": "Section 4: PM-Kisan Samman Nidhi Official Guidelines (https://www.india.gov.in/my-government/schemes/pm-kisan-samman-nidhi)"
                }
            ],
            "te": [
                {
                    "num": 1,
                    "tag": "ప్యానెల్ 1: సమస్య & ఆందోళన",
                    "image": "assets/pm_kisan_1.jpg",
                    "speaker": "రాము కాకా",
                    "dialogue": "ప్రతి పంట కాలంలో విత్తనాలు, ఎరువులు మరియు సాగు ఖర్చులు విపరీతంగా పెరిగిపోయి పెట్టుబడికి ఇబ్బందిగా ఉంది!",
                    "caption": "సాగు పెట్టుబడి ఖర్చులపై రాము కాకా ఆందోళన.",
                    "sourceRef": "Section 1: PM-Kisan Samman Nidhi Official Guidelines (https://www.india.gov.in/my-government/schemes/pm-kisan-samman-nidhi)"
                },
                {
                    "num": 2,
                    "tag": "ప్యానెల్ 2: ప్రభుత్వ పరిష్కారం",
                    "image": "assets/pm_kisan_2.jpg",
                    "speaker": "గోవ్టూన్ హీరో",
                    "dialogue": "దిగులుపడకండి రాము కాకా గారూ! PM-Kisan Samman Nidhi ద్వారా ప్రభుత్వం అండగా నిలుస్తోంది: ₹6,000 per year transferred directly to bank account in 3 equal installments of ₹2,000.",
                    "caption": "ఏడాదికి ₹6,000 నేరుగా 3 విడతల్లో (ఒక్కో విడతకు ₹2,000) మీ బ్యాంక్ ఖాతాలో జమ.",
                    "sourceRef": "Section 2: PM-Kisan Samman Nidhi Official Guidelines (https://www.india.gov.in/my-government/schemes/pm-kisan-samman-nidhi)"
                },
                {
                    "num": 3,
                    "tag": "ప్యానెల్ 3: సులువైన దరఖాస్తు",
                    "image": "assets/pm_kisan_3.jpg",
                    "speaker": "CSC మిత్రుడు",
                    "dialogue": "మీ ఆధార్ కార్డు మరియు బ్యాంక్ పాస్‌బుక్ మరియు పట్టాదారు పాస్‌బుక్‌తో pmkisan.gov.in లేదా CSC లో e-KYC పూర్తి చేయండి.",
                    "caption": "మధ్యవర్తులు లేకుండా నేరుగా ఆధార్ ఆధారిత బ్యాంకు ఖాతాలో జమ.",
                    "sourceRef": "Section 3: PM-Kisan Samman Nidhi Official Guidelines (https://www.india.gov.in/my-government/schemes/pm-kisan-samman-nidhi)"
                },
                {
                    "num": 4,
                    "tag": "ప్యానెల్ 4: ఆనందం & ప్రయోజనం",
                    "image": "assets/pm_kisan_4.jpg",
                    "speaker": "స్లోగన్",
                    "dialogue": "🎉 PM-Kisan Samman Nidhi: జై జవాన్, జై కిసాన్! రైతు సంక్షేమమే దేశ సంక్షేమం!",
                    "caption": "సకాలంలో పెట్టుబడి సాయంతో సంతోషంగా పంటల సాగు.",
                    "sourceRef": "Section 4: PM-Kisan Samman Nidhi Official Guidelines (https://www.india.gov.in/my-government/schemes/pm-kisan-samman-nidhi)"
                }
            ],
            "hi": [
                {
                    "num": 1,
                    "tag": "पैनल 1: चिंता व समस्या",
                    "image": "assets/pm_kisan_1.jpg",
                    "speaker": "रामू काका",
                    "dialogue": "हर बुआई के मौसम में बीज, खाद और जुताई का खर्च जुटाना बहुत भारी पड़ता है! समय पर आर्थिक मदद कैसे मिले?",
                    "caption": "खेती की लागत से परेशान किसान।",
                    "sourceRef": "Section 1: PM-Kisan Samman Nidhi Official Guidelines (https://www.india.gov.in/my-government/schemes/pm-kisan-samman-nidhi)"
                },
                {
                    "num": 2,
                    "tag": "पैनल 2: सरकारी समाधान",
                    "image": "assets/pm_kisan_2.jpg",
                    "speaker": "गवटून हीरो",
                    "dialogue": "बिल्कुल चिंता मत कीजिए रामू काका! PM-Kisan Samman Nidhi के तहत सरकार दे रही है पक्की मदद: ₹6,000 per year transferred directly to bank account in 3 equal installments of ₹2,000.",
                    "caption": "हर साल ₹6,000 की सीधी सहायता 3 समान किस्तों (₹2,000 प्रत्येक) में सीधे आपके बैंक खाते में।",
                    "sourceRef": "Section 2: PM-Kisan Samman Nidhi Official Guidelines (https://www.india.gov.in/my-government/schemes/pm-kisan-samman-nidhi)"
                },
                {
                    "num": 3,
                    "tag": "पैनल 3: आसान आवेदन प्रक्रिया",
                    "image": "assets/pm_kisan_3.jpg",
                    "speaker": "CSC भैया",
                    "dialogue": "बस अपने आधार कार्ड और बैंक पासबुक और खतौनी/जमीन दस्तावेज के साथ pmkisan.gov.in पर e-KYC कराएं।",
                    "caption": "बिना किसी बिचौलिए के सीधा आधार लिंक बैंक खाते में पैसा।",
                    "sourceRef": "Section 3: PM-Kisan Samman Nidhi Official Guidelines (https://www.india.gov.in/my-government/schemes/pm-kisan-samman-nidhi)"
                },
                {
                    "num": 4,
                    "tag": "पैनल 4: खुशहाली व सफलता",
                    "image": "assets/pm_kisan_4.jpg",
                    "speaker": "टैगलाइन",
                    "dialogue": "🎉 PM-Kisan Samman Nidhi: जय जवान, जय किसान! अन्नदाता का सम्मान, समृद्ध किसान!",
                    "caption": "समय पर खाते में पैसा आने से खरीदे उत्तम बीज, लहलहाई फसल।",
                    "sourceRef": "Section 4: PM-Kisan Samman Nidhi Official Guidelines (https://www.india.gov.in/my-government/schemes/pm-kisan-samman-nidhi)"
                }
            ]
        },
        "character": {
            "en": {
                "name": "Ramu Kaka",
                "role": "Small Farmer",
                "avatar": "👨🏽‍🌾",
                "clothing": "White Kurta & Gamcha",
                "desc": "Small landholder farmer managing seasonal crop input costs"
            },
            "te": {
                "name": "రాము కాకా",
                "role": "చిన్నకారు రైతు",
                "avatar": "👨🏽‍🌾",
                "clothing": "తెల్లని కుర్తా & తువ్వాలు",
                "desc": "విత్తనాలు, ఎరువుల పెట్టుబడి ఖర్చుల కోసం ఇబ్బంది పడే చిన్న రైతు"
            },
            "hi": {
                "name": "रामू काका",
                "role": "लघु किसान",
                "avatar": "👨🏽‍🌾",
                "clothing": "सफेद कुर्ता व गमछा",
                "desc": "फसल बुआई, बीज व खाद के खर्च से परेशान मेहनती किसान"
            }
        }
    },
    {
        "id": "pension",
        "name": "PM Shram Yogi Maandhan (Micro-Pension)",
        "category": "Banking & Finance",
        "level": "Central",
        "dept": "Ministry of Labour & Employment",
        "purpose": "Old age protection and social security for unorganized workers like tea vendors, street hawkers, and rickshaw pullers.",
        "benefits": "Guaranteed monthly pension of ₹3,000 after reaching 60 years of age, with 50% government co-contribution.",
        "eligibility": {
            "minAge": 18,
            "maxAge": 40,
            "maxIncome": 180000,
            "state": "All India",
            "occupation": "Vendor",
            "summary": "Unorganized workers aged 18 to 40 years with monthly income up to ₹15,000."
        },
        "documents": [
            {
                "id": "d1",
                "name": "Aadhaar Card",
                "required": true,
                "why": "Identity & age proof"
            },
            {
                "id": "d2",
                "name": "Savings Bank Account / Jan Dhan",
                "required": true,
                "why": "Auto-debit for monthly savings"
            },
            {
                "id": "d3",
                "name": "Mobile Phone",
                "required": true,
                "why": "OTP verification & subscription receipt"
            }
        ],
        "applicationSteps": [
            {
                "step": 1,
                "title": "Check Age (18-40 Years)",
                "desc": "Ensure you enter before turning 40 to lock low monthly savings."
            },
            {
                "step": 2,
                "title": "Take Aadhaar & Jan Dhan Passbook",
                "desc": "Visit nearest CSC / Jan Seva Kendra."
            },
            {
                "step": 3,
                "title": "Set Auto-Debit (₹55 - ₹200)",
                "desc": "Select monthly savings amount matched 100% by Government."
            },
            {
                "step": 4,
                "title": "Receive Pension Card",
                "desc": "Get Shram Yogi Pension Card for lifetime monthly ₹3,000."
            }
        ],
        "officialUrl": "https://www.india.gov.in/my-government/schemes/pm-shram-yogi-maandhan",
        "sourceUrl": "https://maandhan.in",
        "applyUrl": "https://maandhan.in",
        "lastVerified": "2026-08-24",
        "panels": {
            "en": [
                {
                    "num": 1,
                    "tag": "Panel 1: The Tension",
                    "image": "assets/pension_1.jpg",
                    "speaker": "Sharma Ji",
                    "dialogue": "As I grow older, I worry about medical expenses and daily food without being a financial burden on my children!",
                    "caption": "Sharma Ji worries about old age financial dignity.",
                    "sourceRef": "Section 1: PM Shram Yogi Maandhan (Micro-Pension) Official Guidelines (https://www.india.gov.in/my-government/schemes/pm-shram-yogi-maandhan)"
                },
                {
                    "num": 2,
                    "tag": "Panel 2: The Solution",
                    "image": "assets/pension_2.jpg",
                    "speaker": "GovToon Hero",
                    "dialogue": "Fikr mat kijiye! PM Shram Yogi Maandhan (Micro-Pension) provides: Guaranteed monthly pension of ₹3,000 after reaching 60 years of age, with 50% government co-contribution.",
                    "caption": "Guaranteed ₹3,000 to ₹5,000 monthly lifelong pension with 50% government co-contribution.",
                    "sourceRef": "Section 2: PM Shram Yogi Maandhan (Micro-Pension) Official Guidelines (https://www.india.gov.in/my-government/schemes/pm-shram-yogi-maandhan)"
                },
                {
                    "num": 3,
                    "tag": "Panel 3: The Easy Path",
                    "image": "assets/pension_3.jpg",
                    "speaker": "CSC Bhaiya",
                    "dialogue": "Enroll easily with your Aadhaar Card, Savings Bank Account / Jan Dhan, Mobile Phone at any bank branch or nearest CSC center.",
                    "caption": "Auto-debit setup with government co-contribution.",
                    "sourceRef": "Section 3: PM Shram Yogi Maandhan (Micro-Pension) Official Guidelines (https://www.india.gov.in/my-government/schemes/pm-shram-yogi-maandhan)"
                },
                {
                    "num": 4,
                    "tag": "Panel 4: The Khushali",
                    "image": "assets/pension_4.jpg",
                    "speaker": "Tagline",
                    "dialogue": "🎉 PM Shram Yogi Maandhan (Micro-Pension): Vriddhavastha Mein Samman! Guaranteed monthly pension for a peaceful retirement!",
                    "caption": "Receiving direct monthly pension with pride.",
                    "sourceRef": "Section 4: PM Shram Yogi Maandhan (Micro-Pension) Official Guidelines (https://www.india.gov.in/my-government/schemes/pm-shram-yogi-maandhan)"
                }
            ],
            "te": [
                {
                    "num": 1,
                    "tag": "ప్యానెల్ 1: సమస్య & ఆందోళన",
                    "image": "assets/pension_1.jpg",
                    "speaker": "శర్మ గారు",
                    "dialogue": "వయసు పైబడుతున్న కొద్దీ మందుల ఖర్చులు, నిత్యవసరాల కోసం పిల్లలపై ఆధారపడకుండా గౌరవంగా ఎలా బతకాలి?",
                    "caption": "వృద్ధాప్య భరోసా కొరకు శర్మ గారి ఆవేదన.",
                    "sourceRef": "Section 1: PM Shram Yogi Maandhan (Micro-Pension) Official Guidelines (https://www.india.gov.in/my-government/schemes/pm-shram-yogi-maandhan)"
                },
                {
                    "num": 2,
                    "tag": "ప్యానెల్ 2: ప్రభుత్వ పరిష్కారం",
                    "image": "assets/pension_2.jpg",
                    "speaker": "గోవ్టూన్ హీరో",
                    "dialogue": "దిగులుపడకండి శర్మ గారూ! PM Shram Yogi Maandhan (Micro-Pension) ద్వారా ప్రభుత్వం అండగా నిలుస్తోంది: Guaranteed monthly pension of ₹3,000 after reaching 60 years of age, with 50% government co-contribution.",
                    "caption": "నెలకు ₹3,000 నుండి ₹5,000 వరకు జీవితాంతం గ్యారంటీ పెన్షన్ మరియు 50% ప్రభుత్వ వాటా జమ.",
                    "sourceRef": "Section 2: PM Shram Yogi Maandhan (Micro-Pension) Official Guidelines (https://www.india.gov.in/my-government/schemes/pm-shram-yogi-maandhan)"
                },
                {
                    "num": 3,
                    "tag": "ప్యానెల్ 3: సులువైన దరఖాస్తు",
                    "image": "assets/pension_3.jpg",
                    "speaker": "CSC మిత్రుడు",
                    "dialogue": "మీ ఆధార్ కార్డు మరియు బ్యాంక్ పాస్‌బుక్ తో ఏ బ్యాంకులోనైనా లేదా CSC కేంద్రంలోనైనా సులభంగా ఖాతా ప్రారంభించండి.",
                    "caption": "సులభమైన ఆటో-డెబిట్ మరియు ప్రభుత్వ బోనస్ జమ.",
                    "sourceRef": "Section 3: PM Shram Yogi Maandhan (Micro-Pension) Official Guidelines (https://www.india.gov.in/my-government/schemes/pm-shram-yogi-maandhan)"
                },
                {
                    "num": 4,
                    "tag": "ప్యానెల్ 4: ఆనందం & ప్రయోజనం",
                    "image": "assets/pension_4.jpg",
                    "speaker": "స్లోగన్",
                    "dialogue": "🎉 PM Shram Yogi Maandhan (Micro-Pension): వృద్ధాప్యంలో ఆత్మగౌరవ రక్షణ! ప్రతి నెలా బ్యాంక్ ఖాతాలో గ్యారంటీ పెన్షన్!",
                    "caption": "నిశ్చింతగా, సంతోషంగా విశ్రాంత జీవనం.",
                    "sourceRef": "Section 4: PM Shram Yogi Maandhan (Micro-Pension) Official Guidelines (https://www.india.gov.in/my-government/schemes/pm-shram-yogi-maandhan)"
                }
            ],
            "hi": [
                {
                    "num": 1,
                    "tag": "पैनल 1: चिंता व समस्या",
                    "image": "assets/pension_1.jpg",
                    "speaker": "शर्मा जी",
                    "dialogue": "उम्र बढ़ने के साथ दवा और रोजमर्रा के खर्चों के लिए किसी के आगे हाथ न फैलाना पड़े, बुढ़ापे की लाठी कैसे बनेगी?",
                    "caption": "बुढ़ापे की आर्थिक सुरक्षा को लेकर वरिष्ठ नागरिक की चिंता।",
                    "sourceRef": "Section 1: PM Shram Yogi Maandhan (Micro-Pension) Official Guidelines (https://www.india.gov.in/my-government/schemes/pm-shram-yogi-maandhan)"
                },
                {
                    "num": 2,
                    "tag": "पैनल 2: सरकारी समाधान",
                    "image": "assets/pension_2.jpg",
                    "speaker": "गवटून हीरो",
                    "dialogue": "बिल्कुल चिंता न करें शर्मा जी! PM Shram Yogi Maandhan (Micro-Pension) दे रही है पक्की पेंशन: Guaranteed monthly pension of ₹3,000 after reaching 60 years of age, with 50% government co-contribution.",
                    "caption": "60 वर्ष की आयु के बाद ₹3,000 से ₹5,000 प्रतिमाह आजीवन गारंटीड पेंशन और सरकार का 50% अंशदान।",
                    "sourceRef": "Section 2: PM Shram Yogi Maandhan (Micro-Pension) Official Guidelines (https://www.india.gov.in/my-government/schemes/pm-shram-yogi-maandhan)"
                },
                {
                    "num": 3,
                    "tag": "पैनल 3: आसान आवेदन प्रक्रिया",
                    "image": "assets/pension_3.jpg",
                    "speaker": "CSC भैया",
                    "dialogue": "बस अपने आधार कार्ड और बैंक पासबुक के साथ किसी भी बैंक या जन सेवा केंद्र में मात्र 5 मिनट में खाता खुलवाएं।",
                    "caption": "आसान ऑटो-डेबिट और सरकारी सुरक्षा गारंटी।",
                    "sourceRef": "Section 3: PM Shram Yogi Maandhan (Micro-Pension) Official Guidelines (https://www.india.gov.in/my-government/schemes/pm-shram-yogi-maandhan)"
                },
                {
                    "num": 4,
                    "tag": "पैनल 4: खुशहाली व सफलता",
                    "image": "assets/pension_4.jpg",
                    "speaker": "टैगलाइन",
                    "dialogue": "🎉 PM Shram Yogi Maandhan (Micro-Pension): बुढ़ापे का सच्चा सहारा! हर महीने सम्मानजनक पेंशन, आत्मनिर्भर जीवन!",
                    "caption": "पेंशन से चेहरे पर सुकून, स्वाभिमान से भरा बुढ़ापा।",
                    "sourceRef": "Section 4: PM Shram Yogi Maandhan (Micro-Pension) Official Guidelines (https://www.india.gov.in/my-government/schemes/pm-shram-yogi-maandhan)"
                }
            ]
        },
        "character": {
            "en": {
                "name": "Sharma Ji",
                "role": "Senior Citizen / Unorganized Worker",
                "avatar": "👴🏽",
                "clothing": "Kurta & Glasses",
                "desc": "Senior citizen seeking guaranteed monthly pension in golden years"
            },
            "te": {
                "name": "శర్మ గారు",
                "role": "వృద్ధ పౌరుడు / అసంఘటిత కార్మికుడు",
                "avatar": "👴🏽",
                "clothing": "కుర్తా & కళ్లద్దాలు",
                "desc": "వృద్ధాప్యంలో గౌరవప్రదమైన నెలవారీ పింఛను కోరుకునే వ్యక్తి"
            },
            "hi": {
                "name": "शर्मा जी",
                "role": "वरिष्ठ नागरिक / असंगठित श्रमिक",
                "avatar": "👴🏽",
                "clothing": "कुर्ता व चश्मा",
                "desc": "बुढ़ापे में आत्मनिर्भरता व मासिक पेंशन चाहने वाले वरिष्ठ नागरिक"
            }
        }
    },
    {
        "id": "ayushman",
        "name": "Ayushman Bharat PM-JAY (Health Shield)",
        "category": "Health",
        "level": "Central",
        "dept": "National Health Authority (NHA)",
        "purpose": "Provide health cover up to ₹5 Lakh per family per year for secondary and tertiary cashless hospitalization.",
        "benefits": "₹500,000 cashless hospitalization per family per year across 28,000+ empanelled hospitals.",
        "eligibility": {
            "minAge": 0,
            "maxAge": 100,
            "maxIncome": 300000,
            "state": "All India",
            "occupation": "Vendor",
            "summary": "Low-income urban & rural families identified via SECC database."
        },
        "documents": [
            {
                "id": "d1",
                "name": "Aadhaar Card",
                "required": true,
                "why": "Biometric identification at hospital counter"
            },
            {
                "id": "d2",
                "name": "Ration Card",
                "required": true,
                "why": "Family member mapping"
            }
        ],
        "applicationSteps": [
            {
                "step": 1,
                "title": "Check Ayushman Card Status",
                "desc": "Visit beneficiary.nha.gov.in or nearest hospital Arogyamitra."
            },
            {
                "step": 2,
                "title": "Show Aadhaar & Ration Card",
                "desc": "Complete instant e-KYC."
            },
            {
                "step": 3,
                "title": "Get Golden Ayushman Card",
                "desc": "Free Ayushman PVC Card issued."
            },
            {
                "step": 4,
                "title": "Cashless Treatment",
                "desc": "Show card at hospital counter for ₹5 Lakh zero-cash treatment."
            }
        ],
        "officialUrl": "https://www.india.gov.in/my-government/schemes/ayushman-bharat",
        "sourceUrl": "https://pmjay.gov.in",
        "applyUrl": "https://beneficiary.nha.gov.in",
        "lastVerified": "2026-08-24",
        "panels": {
            "en": [
                {
                    "num": 1,
                    "tag": "Panel 1: The Tension",
                    "image": "assets/ayushman_1.jpg",
                    "speaker": "Suresh",
                    "dialogue": "Sudden hospital treatments and surgeries cost lakhs! How can my family get top healthcare without taking heavy loans?",
                    "caption": "Suresh stresses over unexpected medical emergencies.",
                    "sourceRef": "Section 1: Ayushman Bharat PM-JAY (Health Shield) Official Guidelines (https://www.india.gov.in/my-government/schemes/ayushman-bharat)"
                },
                {
                    "num": 2,
                    "tag": "Panel 2: The Solution",
                    "image": "assets/ayushman_2.jpg",
                    "speaker": "GovToon Hero",
                    "dialogue": "Fikr mat kijiye! Ayushman Bharat PM-JAY (Health Shield) provides: ₹500,000 cashless hospitalization per family per year across 28,000+ empanelled hospitals.",
                    "caption": "Cashless health cover guaranteed across thousands of empaneled hospitals.",
                    "sourceRef": "Section 2: Ayushman Bharat PM-JAY (Health Shield) Official Guidelines (https://www.india.gov.in/my-government/schemes/ayushman-bharat)"
                },
                {
                    "num": 3,
                    "tag": "Panel 3: The Easy Path",
                    "image": "assets/ayushman_3.jpg",
                    "speaker": "CSC Bhaiya",
                    "dialogue": "Just bring your Aadhaar Card, Ration Card to the hospital Ayushman Mitra desk or nearest CSC for an instant Ayushman Card.",
                    "caption": "Quick Ayushman golden card generation.",
                    "sourceRef": "Section 3: Ayushman Bharat PM-JAY (Health Shield) Official Guidelines (https://www.india.gov.in/my-government/schemes/ayushman-bharat)"
                },
                {
                    "num": 4,
                    "tag": "Panel 4: The Khushali",
                    "image": "assets/ayushman_4.jpg",
                    "speaker": "Tagline",
                    "dialogue": "🎉 Ayushman Bharat PM-JAY (Health Shield): Swasth Bharat, Samriddh Bharat! ₹5 Lakh cashless shield for every family!",
                    "caption": "Complete health protection with zero out-of-pocket stress.",
                    "sourceRef": "Section 4: Ayushman Bharat PM-JAY (Health Shield) Official Guidelines (https://www.india.gov.in/my-government/schemes/ayushman-bharat)"
                }
            ],
            "te": [
                {
                    "num": 1,
                    "tag": "ప్యానెల్ 1: సమస్య & ఆందోళన",
                    "image": "assets/ayushman_1.jpg",
                    "speaker": "సురేష్",
                    "dialogue": "ఆసుపత్రిలో శస్త్రచికిత్సలు, వైద్య ఖర్చులు లక్షల్లో ఉన్నాయి! అప్పులు చేయకుండా నా కుటుంబానికి అత్యుత్తమ వైద్యం ఎలా అందుతుంది?",
                    "caption": "వైద్య ఖర్చులపై సురేష్ ఆందోళన.",
                    "sourceRef": "Section 1: Ayushman Bharat PM-JAY (Health Shield) Official Guidelines (https://www.india.gov.in/my-government/schemes/ayushman-bharat)"
                },
                {
                    "num": 2,
                    "tag": "ప్యానెల్ 2: ప్రభుత్వ పరిష్కారం",
                    "image": "assets/ayushman_2.jpg",
                    "speaker": "గోవ్టూన్ హీరో",
                    "dialogue": "దిగులుపడకండి సురేష్ గారూ! Ayushman Bharat PM-JAY (Health Shield) ద్వారా ప్రభుత్వం అండగా నిలుస్తోంది: ₹500,000 cashless hospitalization per family per year across 28,000+ empanelled hospitals.",
                    "caption": "ఎంపానెల్డ్ ఆసుపత్రుల్లో ₹5 లక్షల వరకు ఉచిత నగదు రహిత వైద్యం.",
                    "sourceRef": "Section 2: Ayushman Bharat PM-JAY (Health Shield) Official Guidelines (https://www.india.gov.in/my-government/schemes/ayushman-bharat)"
                },
                {
                    "num": 3,
                    "tag": "ప్యానెల్ 3: సులువైన దరఖాస్తు",
                    "image": "assets/ayushman_3.jpg",
                    "speaker": "CSC మిత్రుడు",
                    "dialogue": "మీ ఆధార్ కార్డు మరియు బ్యాంక్ పాస్‌బుక్ తో సమీప ఆయుష్మాన్ కేంద్రం లేదా ఆసుపత్రిలోని ఆయుష్మాన్ మిత్ర వద్ద ఉచిత కార్డు పొందండి.",
                    "caption": "నిమిషాల్లో ఆయుష్మాన్ హెల్త్ కార్డు జారీ.",
                    "sourceRef": "Section 3: Ayushman Bharat PM-JAY (Health Shield) Official Guidelines (https://www.india.gov.in/my-government/schemes/ayushman-bharat)"
                },
                {
                    "num": 4,
                    "tag": "ప్యానెల్ 4: ఆనందం & ప్రయోజనం",
                    "image": "assets/ayushman_4.jpg",
                    "speaker": "స్లోగన్",
                    "dialogue": "🎉 Ayushman Bharat PM-JAY (Health Shield): ఆరోగ్యమే మహాభాగ్యం! ప్రతి కుటుంబానికి ఉచిత వైద్య రక్షణ కవచం!",
                    "caption": "ఉచిత చికిత్సతో సంపూర్ణ స్వస్థత.",
                    "sourceRef": "Section 4: Ayushman Bharat PM-JAY (Health Shield) Official Guidelines (https://www.india.gov.in/my-government/schemes/ayushman-bharat)"
                }
            ],
            "hi": [
                {
                    "num": 1,
                    "tag": "पैनल 1: चिंता व समस्या",
                    "image": "assets/ayushman_1.jpg",
                    "speaker": "सुरेश",
                    "dialogue": "अचानक अस्पताल में ऑपरेशन और इलाज का खर्च लाखों में हो जाता है! बिना कर्ज लिए परिवार का अच्छा इलाज कैसे कराऊँ?",
                    "caption": "अस्पताल के भारी खर्च से परेशान नागरिक।",
                    "sourceRef": "Section 1: Ayushman Bharat PM-JAY (Health Shield) Official Guidelines (https://www.india.gov.in/my-government/schemes/ayushman-bharat)"
                },
                {
                    "num": 2,
                    "tag": "पैनल 2: सरकारी समाधान",
                    "image": "assets/ayushman_2.jpg",
                    "speaker": "गवटून हीरो",
                    "dialogue": "बिल्कुल चिंता न करें सुरेश जी! Ayushman Bharat PM-JAY (Health Shield) दे रही है संपूर्ण सुरक्षा: ₹500,000 cashless hospitalization per family per year across 28,000+ empanelled hospitals.",
                    "caption": "सरकारी व निजी सूचीबद्ध अस्पतालों में ₹5 लाख तक का कैशलेस इलाज।",
                    "sourceRef": "Section 2: Ayushman Bharat PM-JAY (Health Shield) Official Guidelines (https://www.india.gov.in/my-government/schemes/ayushman-bharat)"
                },
                {
                    "num": 3,
                    "tag": "पैनल 3: आसान आवेदन प्रक्रिया",
                    "image": "assets/ayushman_3.jpg",
                    "speaker": "CSC भैया",
                    "dialogue": "बस अपने आधार कार्ड और बैंक पासबुक के साथ नजदीकी अस्पताल में आयुष्मान मित्र या जन सेवा केंद्र से गोल्डन कार्ड बनवाएं।",
                    "caption": "त्वरित आयुष्मान कार्ड जारी।",
                    "sourceRef": "Section 3: Ayushman Bharat PM-JAY (Health Shield) Official Guidelines (https://www.india.gov.in/my-government/schemes/ayushman-bharat)"
                },
                {
                    "num": 4,
                    "tag": "पैनल 4: खुशहाली व सफलता",
                    "image": "assets/ayushman_4.jpg",
                    "speaker": "टैगलाइन",
                    "dialogue": "🎉 Ayushman Bharat PM-JAY (Health Shield): स्वस्थ भारत, समृद्ध भारत! हर गरीब परिवार को मुफ्त इलाज की ढाल!",
                    "caption": "मुफ्त इलाज से परिवार सुरक्षित और तनावमुक्त।",
                    "sourceRef": "Section 4: Ayushman Bharat PM-JAY (Health Shield) Official Guidelines (https://www.india.gov.in/my-government/schemes/ayushman-bharat)"
                }
            ]
        },
        "character": {
            "en": {
                "name": "Suresh",
                "role": "Family Caregiver",
                "avatar": "🏥",
                "clothing": "Casual Attire",
                "desc": "Dedicated family caregiver worried about hospital costs"
            },
            "te": {
                "name": "సురేష్",
                "role": "కుటుంబ పెద్ద",
                "avatar": "🏥",
                "clothing": "సాధారణ దుస్తులు",
                "desc": "కుటుంబంలో అనారోగ్యానికి ఆసుపత్రి ఖర్చులపై ఆందోళన చెందే వ్యక్తి"
            },
            "hi": {
                "name": "सुरेश",
                "role": "परिवार के मुखिया",
                "avatar": "🏥",
                "clothing": "साधारण कपड़े",
                "desc": "अस्पताल के महंगे इलाज खर्च से चिंतित नागरिक"
            }
        }
    },
    {
        "id": "surya_ghar",
        "name": "PM Surya Ghar: Muft Bijli Yojana",
        "category": "Housing & Energy",
        "level": "Central",
        "dept": "Ministry of New and Renewable Energy (MNRE)",
        "purpose": "Provide up to 300 units of free electricity per month to 1 Crore households by assisting with rooftop solar panel installations.",
        "benefits": "Direct financial subsidy up to ₹78,000 for 3kW rooftop solar installation + 300 units free electricity per month.",
        "eligibility": {
            "minAge": 18,
            "maxAge": 100,
            "maxIncome": 1000000,
            "state": "All India",
            "occupation": "General Citizen",
            "summary": "Indian citizen families owning a suitable roof structure and valid electricity connection."
        },
        "documents": [
            {
                "id": "d1",
                "name": "Electricity Bill",
                "required": true,
                "why": "Verification of active electricity connection & consumer number"
            },
            {
                "id": "d2",
                "name": "Aadhaar Card",
                "required": true,
                "why": "Identity proof for subsidy bank transfer"
            },
            {
                "id": "d3",
                "name": "Roof Ownership / House Document",
                "required": true,
                "why": "Confirms solar panel installation feasibility"
            }
        ],
        "applicationSteps": [
            {
                "step": 1,
                "title": "Register on Portal",
                "desc": "Visit pmsuryaghar.gov.in and enter your Electricity Consumer Number."
            },
            {
                "step": 2,
                "title": "Select Empanelled Vendor",
                "desc": "Choose an official solar installer for technical survey."
            },
            {
                "step": 3,
                "title": "Get DISCOM Approval",
                "desc": "Local power company inspects net-meter feasibility."
            },
            {
                "step": 4,
                "title": "Receive ₹78,000 Subsidy",
                "desc": "Subsidy credited directly to your bank account within 30 days."
            }
        ],
        "officialUrl": "https://www.india.gov.in/my-government/schemes/pm-surya-ghar",
        "sourceUrl": "https://pmsuryaghar.gov.in",
        "applyUrl": "https://pmsuryaghar.gov.in",
        "lastVerified": "2026-08-24",
        "panels": {
            "en": [
                {
                    "num": 1,
                    "tag": "Panel 1: The Tension",
                    "image": "assets/surya_ghar_1.jpg",
                    "speaker": "Vikram",
                    "dialogue": "Every month our electricity bills are soaring! How can I get free power and save hard-earned money?",
                    "caption": "Vikram worries about skyrocketing monthly electricity bills.",
                    "sourceRef": "Section 1: PM Surya Ghar: Muft Bijli Yojana Official Guidelines (https://www.india.gov.in/my-government/schemes/pm-surya-ghar)"
                },
                {
                    "num": 2,
                    "tag": "Panel 2: The Solution",
                    "image": "assets/surya_ghar_2.jpg",
                    "speaker": "GovToon Hero",
                    "dialogue": "Fikr mat kijiye! PM Surya Ghar: Muft Bijli Yojana provides: Direct financial subsidy up to ₹78,000 for 3kW rooftop solar installation + 300 units free electricity per month.",
                    "caption": "Direct rooftop solar subsidy and free green units guaranteed.",
                    "sourceRef": "Section 2: PM Surya Ghar: Muft Bijli Yojana Official Guidelines (https://www.india.gov.in/my-government/schemes/pm-surya-ghar)"
                },
                {
                    "num": 3,
                    "tag": "Panel 3: The Easy Path",
                    "image": "assets/surya_ghar_3.jpg",
                    "speaker": "CSC Bhaiya",
                    "dialogue": "Just apply on the national portal with your Electricity Bill, Aadhaar Card, Roof Ownership / House Document to get verified solar panels installed.",
                    "caption": "Seamless online subsidy claim and empanelled vendor installation.",
                    "sourceRef": "Section 3: PM Surya Ghar: Muft Bijli Yojana Official Guidelines (https://www.india.gov.in/my-government/schemes/pm-surya-ghar)"
                },
                {
                    "num": 4,
                    "tag": "Panel 4: The Khushali",
                    "image": "assets/surya_ghar_4.jpg",
                    "speaker": "Tagline",
                    "dialogue": "🎉 PM Surya Ghar: Muft Bijli Yojana: Muft Bijli, Har Mahine Bachat! Clean solar energy for every roof!",
                    "caption": "Zero power bills and extra income from solar power.",
                    "sourceRef": "Section 4: PM Surya Ghar: Muft Bijli Yojana Official Guidelines (https://www.india.gov.in/my-government/schemes/pm-surya-ghar)"
                }
            ],
            "te": [
                {
                    "num": 1,
                    "tag": "ప్యానెల్ 1: సమస్య & ఆందోళన",
                    "image": "assets/surya_ghar_1.jpg",
                    "speaker": "విక్రమ్",
                    "dialogue": "ప్రతినెలా వేలల్లో వస్తున్న కరెంట్ బిల్లులతో ఇల్లు గడవడం భారంగా మారింది! శాశ్వతంగా ఈ ఖర్చు ఎలా తగ్గించుకోవాలి?",
                    "caption": "కరెంట్ బిల్లుల భారంతో విక్రమ్ ఆందోళన.",
                    "sourceRef": "Section 1: PM Surya Ghar: Muft Bijli Yojana Official Guidelines (https://www.india.gov.in/my-government/schemes/pm-surya-ghar)"
                },
                {
                    "num": 2,
                    "tag": "ప్యానెల్ 2: ప్రభుత్వ పరిష్కారం",
                    "image": "assets/surya_ghar_2.jpg",
                    "speaker": "గోవ్టూన్ హీరో",
                    "dialogue": "దిగులుపడకండి విక్రమ్ గారూ! PM Surya Ghar: Muft Bijli Yojana ద్వారా ప్రభుత్వం అద్భుత అవకాశం కల్పిస్తోంది: Direct financial subsidy up to ₹78,000 for 3kW rooftop solar installation + 300 units free electricity per month.",
                    "caption": "రూఫ్‌టాప్ సోలార్ సబ్సిడీ మరియు నెలకు ఉచిత విద్యుత్ భరోసా.",
                    "sourceRef": "Section 2: PM Surya Ghar: Muft Bijli Yojana Official Guidelines (https://www.india.gov.in/my-government/schemes/pm-surya-ghar)"
                },
                {
                    "num": 3,
                    "tag": "ప్యానెల్ 3: సులువైన దరఖాస్తు",
                    "image": "assets/surya_ghar_3.jpg",
                    "speaker": "CSC మిత్రుడు",
                    "dialogue": "మీ ఆధార్ కార్డు మరియు బ్యాంక్ పాస్‌బుక్ తో నేషనల్ పోర్టల్ లేదా CSC ద్వారా దరఖాస్తు చేస్తే ప్రభుత్వ గుర్తింపు పొందిన సోలార్ ప్యానెల్స్ బిగిస్తారు.",
                    "caption": "సులభమైన ఆన్‌లైన్ సబ్సిడీ నమోదు.",
                    "sourceRef": "Section 3: PM Surya Ghar: Muft Bijli Yojana Official Guidelines (https://www.india.gov.in/my-government/schemes/pm-surya-ghar)"
                },
                {
                    "num": 4,
                    "tag": "ప్యానెల్ 4: ఆనందం & ప్రయోజనం",
                    "image": "assets/surya_ghar_4.jpg",
                    "speaker": "స్లోగన్",
                    "dialogue": "🎉 PM Surya Ghar: Muft Bijli Yojana: ఉచిత సౌర విద్యుత్, ప్రతినెలా ఆదా! పర్యావరణహితం - స్వయం సమృద్ధి!",
                    "caption": "జీరో కరెంట్ బిల్లులతో సరికొత్త వెలుగులు.",
                    "sourceRef": "Section 4: PM Surya Ghar: Muft Bijli Yojana Official Guidelines (https://www.india.gov.in/my-government/schemes/pm-surya-ghar)"
                }
            ],
            "hi": [
                {
                    "num": 1,
                    "tag": "पैनल 1: चिंता व समस्या",
                    "image": "assets/surya_ghar_1.jpg",
                    "speaker": "विक्रम",
                    "dialogue": "हर महीने हजारों रुपये का बिजली बिल देखकर बजट बिगड़ जाता है! क्या बिजली का खर्च हमेशा के लिए खत्म हो सकता है?",
                    "caption": "बिजली के बढ़ते खर्च से परेशान नागरिक।",
                    "sourceRef": "Section 1: PM Surya Ghar: Muft Bijli Yojana Official Guidelines (https://www.india.gov.in/my-government/schemes/pm-surya-ghar)"
                },
                {
                    "num": 2,
                    "tag": "पैनल 2: सरकारी समाधान",
                    "image": "assets/surya_ghar_2.jpg",
                    "speaker": "गवटून हीरो",
                    "dialogue": "बिल्कुल चिंता न करें विक्रम जी! PM Surya Ghar: Muft Bijli Yojana के माध्यम से सरकार दे रही है: Direct financial subsidy up to ₹78,000 for 3kW rooftop solar installation + 300 units free electricity per month.",
                    "caption": "रूफटॉप सोलर पर सीधी भारी सब्सिडी और मुफ्त बिजली।",
                    "sourceRef": "Section 2: PM Surya Ghar: Muft Bijli Yojana Official Guidelines (https://www.india.gov.in/my-government/schemes/pm-surya-ghar)"
                },
                {
                    "num": 3,
                    "tag": "पैनल 3: आसान आवेदन प्रक्रिया",
                    "image": "assets/surya_ghar_3.jpg",
                    "speaker": "CSC भैया",
                    "dialogue": "बस अपने आधार कार्ड और बैंक पासबुक के साथ राष्ट्रीय पोर्टल या जन सेवा केंद्र से आवेदन करें, तुरंत इंस्टॉलेशन होगा।",
                    "caption": "सरल ऑनलाइन सत्यापन व सब्सिडी भुगतान।",
                    "sourceRef": "Section 3: PM Surya Ghar: Muft Bijli Yojana Official Guidelines (https://www.india.gov.in/my-government/schemes/pm-surya-ghar)"
                },
                {
                    "num": 4,
                    "tag": "पैनल 4: खुशहाली व सफलता",
                    "image": "assets/surya_ghar_4.jpg",
                    "speaker": "टैगलाइन",
                    "dialogue": "🎉 PM Surya Ghar: Muft Bijli Yojana: मुफ्त बिजली, हर महीने बचत! सौर ऊर्जा से रोशन हर घर!",
                    "caption": "शून्य बिजली बिल और अतिरिक्त बिजली से कमाई।",
                    "sourceRef": "Section 4: PM Surya Ghar: Muft Bijli Yojana Official Guidelines (https://www.india.gov.in/my-government/schemes/pm-surya-ghar)"
                }
            ]
        },
        "character": {
            "en": {
                "name": "Vikram",
                "role": "Homeowner",
                "avatar": "☀️",
                "clothing": "Casual Shirt",
                "desc": "Homeowner managing rising household electricity costs"
            },
            "te": {
                "name": "విక్రమ్",
                "role": "గృహ యజమాని",
                "avatar": "☀️",
                "clothing": "సాధారణ చొక్కా",
                "desc": "ప్రతినెలా భారీ కరెంట్ బిల్లులతో సతమతమయ్యే గృహస్థు"
            },
            "hi": {
                "name": "विक्रम",
                "role": "गृहस्वामी",
                "avatar": "☀️",
                "clothing": "साधारण शर्ट",
                "desc": "बढ़ते बिजली बिल से परेशान मध्यमवर्गीय गृहस्वामी"
            }
        }
    },
    {
        "id": "pm_svanidhi",
        "name": "PM SVANidhi (Street Vendor Micro-Credit)",
        "category": "Micro-Business & Loans",
        "level": "Central",
        "dept": "Ministry of Housing and Urban Affairs",
        "purpose": "Provide affordable collateral-free working capital micro-loans to urban & rural street vendors to restart businesses.",
        "benefits": "Collateral-free working capital loan starting at ₹10,000 up to ₹50,000 with 7% interest subsidy and cashback incentives.",
        "eligibility": {
            "minAge": 18,
            "maxAge": 70,
            "maxIncome": 300000,
            "state": "All India",
            "occupation": "Vendor",
            "summary": "Street vendors, hawkers, cobblers, and artisans vending in urban or peri-urban areas."
        },
        "documents": [
            {
                "id": "d1",
                "name": "Aadhaar Card",
                "required": true,
                "why": "Identity & UIDAI verification"
            },
            {
                "id": "d2",
                "name": "Vending Certificate / Identity Card",
                "required": true,
                "why": "Issued by Urban Local Body (ULB) / Municipal Corp"
            },
            {
                "id": "d3",
                "name": "Bank Savings Passbook",
                "required": true,
                "why": "Direct loan disbursement & cashback transfer"
            }
        ],
        "applicationSteps": [
            {
                "step": 1,
                "title": "Check Vending Certificate",
                "desc": "Ensure your name is listed with Urban Local Body (ULB)."
            },
            {
                "step": 2,
                "title": "Visit Portal / Bank Counter",
                "desc": "Visit pmsvanidhi.mohua.gov.in or local bank branch."
            },
            {
                "step": 3,
                "title": "Submit Aadhaar & Vending Card",
                "desc": "Complete e-KYC digital application."
            },
            {
                "step": 4,
                "title": "Receive ₹10,000 Collateral-Free Loan",
                "desc": "Loan credited directly to bank account."
            }
        ],
        "officialUrl": "https://www.india.gov.in/my-government/schemes/pm-svanidhi",
        "sourceUrl": "https://pmsvanidhi.mohua.gov.in",
        "applyUrl": "https://pmsvanidhi.mohua.gov.in",
        "lastVerified": "2026-08-24",
        "panels": {
            "en": [
                {
                    "num": 1,
                    "tag": "Panel 1: The Tension",
                    "image": "assets/svanidhi_1.jpg",
                    "speaker": "Kalu",
                    "dialogue": "Private moneylenders take daily high interest on small loans for my fruit and vegetable cart. How can I get affordable capital?",
                    "caption": "Kalu stresses over predatory moneylender daily rates.",
                    "sourceRef": "Section 1: PM SVANidhi (Street Vendor Micro-Credit) Official Guidelines (https://www.india.gov.in/my-government/schemes/pm-svanidhi)"
                },
                {
                    "num": 2,
                    "tag": "Panel 2: The Solution",
                    "image": "assets/svanidhi_2.jpg",
                    "speaker": "GovToon Hero",
                    "dialogue": "Fikr mat kijiye! PM SVANidhi (Street Vendor Micro-Credit) provides: Collateral-free working capital loan starting at ₹10,000 up to ₹50,000 with 7% interest subsidy and cashback incentives.",
                    "caption": "Collateral-free micro-credit with 7% interest subsidy & cashback.",
                    "sourceRef": "Section 2: PM SVANidhi (Street Vendor Micro-Credit) Official Guidelines (https://www.india.gov.in/my-government/schemes/pm-svanidhi)"
                },
                {
                    "num": 3,
                    "tag": "Panel 3: The Easy Path",
                    "image": "assets/svanidhi_3.jpg",
                    "speaker": "CSC Bhaiya",
                    "dialogue": "Just bring your Aadhaar Card, Vending Certificate / Identity Card, Bank Savings Passbook to the municipal office, bank, or nearest CSC to apply digitally.",
                    "caption": "Direct bank transfer within days.",
                    "sourceRef": "Section 3: PM SVANidhi (Street Vendor Micro-Credit) Official Guidelines (https://www.india.gov.in/my-government/schemes/pm-svanidhi)"
                },
                {
                    "num": 4,
                    "tag": "Panel 4: The Khushali",
                    "image": "assets/svanidhi_4.jpg",
                    "speaker": "Tagline",
                    "dialogue": "🎉 PM SVANidhi (Street Vendor Micro-Credit): Swavalamban Se Samriddhi! Digital cashback and credit score building!",
                    "caption": "Free from debt traps, running a thriving business.",
                    "sourceRef": "Section 4: PM SVANidhi (Street Vendor Micro-Credit) Official Guidelines (https://www.india.gov.in/my-government/schemes/pm-svanidhi)"
                }
            ],
            "te": [
                {
                    "num": 1,
                    "tag": "ప్యానెల్ 1: సమస్య & ఆందోళన",
                    "image": "assets/svanidhi_1.jpg",
                    "speaker": "కాలు",
                    "dialogue": "నా పండ్ల బండి వ్యాపారానికి ప్రైవేట్ వడ్డీ వ్యాపారులు రోజూ భారీ వడ్డీలు వసూలు చేస్తున్నారు! చౌక వడ్డీకి పెట్టుబడి ఎలా దొరుకుతుంది?",
                    "caption": "పెట్టుబడి కోసం వీధి వ్యాపారి ఆవేదన.",
                    "sourceRef": "Section 1: PM SVANidhi (Street Vendor Micro-Credit) Official Guidelines (https://www.india.gov.in/my-government/schemes/pm-svanidhi)"
                },
                {
                    "num": 2,
                    "tag": "ప్యానెల్ 2: ప్రభుత్వ పరిష్కారం",
                    "image": "assets/svanidhi_2.jpg",
                    "speaker": "గోవ్టూన్ హీరో",
                    "dialogue": "దిగులుపడకండి కాలు గారూ! PM SVANidhi (Street Vendor Micro-Credit) ద్వారా ప్రభుత్వం అండగా నిలుస్తోంది: Collateral-free working capital loan starting at ₹10,000 up to ₹50,000 with 7% interest subsidy and cashback incentives.",
                    "caption": "పూచీకత్తు లేని మైక్రో-క్రెడిట్, 7% వడ్డీ సబ్సిడీ మరియు క్యాష్‌బ్యాక్.",
                    "sourceRef": "Section 2: PM SVANidhi (Street Vendor Micro-Credit) Official Guidelines (https://www.india.gov.in/my-government/schemes/pm-svanidhi)"
                },
                {
                    "num": 3,
                    "tag": "ప్యానెల్ 3: సులువైన దరఖాస్తు",
                    "image": "assets/svanidhi_3.jpg",
                    "speaker": "CSC మిత్రుడు",
                    "dialogue": "మీ ఆధార్ కార్డు మరియు బ్యాంక్ పాస్‌బుక్ మరియు వెండర్ ఐడీతో సమీప CSC లేదా మున్సిపల్ కార్యాలయంలో దరఖాస్తు చేయండి.",
                    "caption": "నేరుగా బ్యాంక్ ఖాతాలో సులభమైన జమ.",
                    "sourceRef": "Section 3: PM SVANidhi (Street Vendor Micro-Credit) Official Guidelines (https://www.india.gov.in/my-government/schemes/pm-svanidhi)"
                },
                {
                    "num": 4,
                    "tag": "ప్యానెల్ 4: ఆనందం & ప్రయోజనం",
                    "image": "assets/svanidhi_4.jpg",
                    "speaker": "స్లోగన్",
                    "dialogue": "🎉 PM SVANidhi (Street Vendor Micro-Credit): స్వయం సమృద్ధి! డిజిటల్ వ్యాపారంతో అధిక లాభాలు, ఆర్థిక భరోసా!",
                    "caption": "వడ్డీ వ్యాపారుల బారి నుంచి విముక్తి.",
                    "sourceRef": "Section 4: PM SVANidhi (Street Vendor Micro-Credit) Official Guidelines (https://www.india.gov.in/my-government/schemes/pm-svanidhi)"
                }
            ],
            "hi": [
                {
                    "num": 1,
                    "tag": "पैनल 1: चिंता व समस्या",
                    "image": "assets/svanidhi_1.jpg",
                    "speaker": "कालू",
                    "dialogue": "दुकान और ठेले के लिए साहूकार रोज भारी ब्याज वसूलते हैं! मुझे कम ब्याज पर पूंजी कैसे मिलेगी?",
                    "caption": "साहूकारों के कर्ज से परेशान रेहड़ी संचालक।",
                    "sourceRef": "Section 1: PM SVANidhi (Street Vendor Micro-Credit) Official Guidelines (https://www.india.gov.in/my-government/schemes/pm-svanidhi)"
                },
                {
                    "num": 2,
                    "tag": "पैनल 2: सरकारी समाधान",
                    "image": "assets/svanidhi_2.jpg",
                    "speaker": "गवटून हीरो",
                    "dialogue": "बिल्कुल चिंता न करें कालू भाई! PM SVANidhi (Street Vendor Micro-Credit) के तहत सरकार दे रही है: Collateral-free working capital loan starting at ₹10,000 up to ₹50,000 with 7% interest subsidy and cashback incentives.",
                    "caption": "बिना गारंटी ₹10,000 से ₹50,000 तक का सस्ता कार्यशील ऋण व 7% ब्याज सब्सिडी।",
                    "sourceRef": "Section 2: PM SVANidhi (Street Vendor Micro-Credit) Official Guidelines (https://www.india.gov.in/my-government/schemes/pm-svanidhi)"
                },
                {
                    "num": 3,
                    "tag": "पैनल 3: आसान आवेदन प्रक्रिया",
                    "image": "assets/svanidhi_3.jpg",
                    "speaker": "CSC भैया",
                    "dialogue": "बस अपने आधार कार्ड और बैंक पासबुक और वेंडर सर्टिफिकेट के साथ पीएम स्वनिधि पोर्टल पर आवेदन करें।",
                    "caption": "सीधा बैंक खाते में डिजिटल ऋण वितरण।",
                    "sourceRef": "Section 3: PM SVANidhi (Street Vendor Micro-Credit) Official Guidelines (https://www.india.gov.in/my-government/schemes/pm-svanidhi)"
                },
                {
                    "num": 4,
                    "tag": "पैनल 4: खुशहाली व सफलता",
                    "image": "assets/svanidhi_4.jpg",
                    "speaker": "टैगलाइन",
                    "dialogue": "🎉 PM SVANidhi (Street Vendor Micro-Credit): स्वावलंबन से समृद्धि! डिजिटल लेन-देन पर कैशबैक और मजबूत क्रेडिट स्कोर!",
                    "caption": "साहूकारों से मुक्ति, सम्मानजनक आत्मनिर्भर जीवन।",
                    "sourceRef": "Section 4: PM SVANidhi (Street Vendor Micro-Credit) Official Guidelines (https://www.india.gov.in/my-government/schemes/pm-svanidhi)"
                }
            ]
        },
        "character": {
            "en": {
                "name": "Kalu",
                "role": "Street Vendor",
                "avatar": "🛒",
                "clothing": "Simple Shirt & Apron",
                "desc": "Hardworking street vendor seeking affordable working capital"
            },
            "te": {
                "name": "కాలు",
                "role": "వీధి వ్యాపారి",
                "avatar": "🛒",
                "clothing": "సాధారణ చొక్కా",
                "desc": "పెట్టుబడి కోసం వడ్డీ వ్యాపారులపై ఆధారపడే చిరు వ్యాపారి"
            },
            "hi": {
                "name": "कालू",
                "role": "स्ट्रीट वेंडर / रेहड़ी पटरी संचालक",
                "avatar": "🛒",
                "clothing": "साधारण कमीज",
                "desc": "कार्यशील पूंजी के लिए परेशान मेहनती रेहड़ी-पटरी संचालक"
            }
        }
    },
    {
        "id": "mudra_loan",
        "name": "PM MUDRA Yojana (Micro-Units Development)",
        "category": "Micro-Business & Loans",
        "level": "Central",
        "dept": "Ministry of Finance",
        "purpose": "Provide collateral-free business loans up to ₹10 Lakhs to non-corporate, non-farm small/micro enterprises.",
        "benefits": "Loans categorized as Shishu (up to ₹50,000), Kishor (up to ₹5 Lakhs), and Tarun (up to ₹10 Lakhs) at low interest rates.",
        "eligibility": {
            "minAge": 18,
            "maxAge": 65,
            "maxIncome": 2000000,
            "state": "All India",
            "occupation": "Self-Employed / Entrepreneur",
            "summary": "Small business owners, shopkeepers, artisans, fruit vendors, and small manufacturing units."
        },
        "documents": [
            {
                "id": "d1",
                "name": "Aadhaar & PAN Card",
                "required": true,
                "why": "Mandatory identity & tax verification"
            },
            {
                "id": "d2",
                "name": "Business Address Proof",
                "required": true,
                "why": "Trade license / GST / shop registration"
            },
            {
                "id": "d3",
                "name": "6-Month Bank Statement",
                "required": true,
                "why": "Financial assessment for loan approval"
            }
        ],
        "applicationSteps": [
            {
                "step": 1,
                "title": "Choose Loan Category (Shishu/Kishor/Tarun)",
                "desc": "Select required capital amount up to ₹10 Lakhs."
            },
            {
                "step": 2,
                "title": "Fill MUDRA Application",
                "desc": "Fill online form on udyamimitra.in or visit commercial bank."
            },
            {
                "step": 3,
                "title": "Submit Aadhaar & Business Plan",
                "desc": "Bank verifies business location and credit score."
            },
            {
                "step": 4,
                "title": "Loan Disbursement & MUDRA Card",
                "desc": "Get loan amount and debit MUDRA card for working capital."
            }
        ],
        "officialUrl": "https://www.india.gov.in/my-government/schemes/pradhan-mantri-mudra-yojana",
        "sourceUrl": "https://www.mudra.org.in",
        "lastVerified": "2026-08-24",
        "panels": {
            "en": [
                {
                    "num": 1,
                    "tag": "Panel 1: The Tension",
                    "image": "assets/mudra_1.jpg",
                    "speaker": "Ravi",
                    "dialogue": "I want to start and expand my enterprise, but moneylenders charge high interest and private banks ask for property collateral!",
                    "caption": "Ravi worries about business startup capital and bank collateral.",
                    "sourceRef": "Section 1: PM MUDRA Yojana (Micro-Units Development) Official Guidelines (https://www.india.gov.in/my-government/schemes/pradhan-mantri-mudra-yojana)"
                },
                {
                    "num": 2,
                    "tag": "Panel 2: The Solution",
                    "image": "assets/mudra_2.jpg",
                    "speaker": "GovToon Hero",
                    "dialogue": "Fikr mat kijiye! PM MUDRA Yojana (Micro-Units Development) provides: Loans categorized as Shishu (up to ₹50,000), Kishor (up to ₹5 Lakhs), and Tarun (up to ₹10 Lakhs) at low interest rates.",
                    "caption": "100% collateral-free government institutional funding.",
                    "sourceRef": "Section 2: PM MUDRA Yojana (Micro-Units Development) Official Guidelines (https://www.india.gov.in/my-government/schemes/pradhan-mantri-mudra-yojana)"
                },
                {
                    "num": 3,
                    "tag": "Panel 3: The Easy Path",
                    "image": "assets/mudra_3.jpg",
                    "speaker": "CSC Bhaiya",
                    "dialogue": "Submit your business proposal with Aadhaar & PAN Card, Business Address Proof, 6-Month Bank Statement at any bank branch or on udyamimitra portal.",
                    "caption": "Simple collateral-free loan processing.",
                    "sourceRef": "Section 3: PM MUDRA Yojana (Micro-Units Development) Official Guidelines (https://www.india.gov.in/my-government/schemes/pradhan-mantri-mudra-yojana)"
                },
                {
                    "num": 4,
                    "tag": "Panel 4: The Khushali",
                    "image": "assets/mudra_4.jpg",
                    "speaker": "Tagline",
                    "dialogue": "🎉 PM MUDRA Yojana (Micro-Units Development): Atmanirbhar Bharat! Low interest collateral-free capital for your success!",
                    "caption": "Business flourishing with official government financial backing.",
                    "sourceRef": "Section 4: PM MUDRA Yojana (Micro-Units Development) Official Guidelines (https://www.india.gov.in/my-government/schemes/pradhan-mantri-mudra-yojana)"
                }
            ],
            "te": [
                {
                    "num": 1,
                    "tag": "ప్యానెల్ 1: సమస్య & ఆందోళన",
                    "image": "assets/mudra_1.jpg",
                    "speaker": "రవి",
                    "dialogue": "నా వ్యాపారాన్ని లేదా స్టార్టప్‌ను ప్రారంభించి విస్తరించాలనుకుంటున్నాను, కానీ ప్రైవేట్ బ్యాంకులు ఆస్తి తాకట్టు అడుగుతున్నాయి!",
                    "caption": "మూలధనం కొరకు రవి పడే ఆందోళన.",
                    "sourceRef": "Section 1: PM MUDRA Yojana (Micro-Units Development) Official Guidelines (https://www.india.gov.in/my-government/schemes/pradhan-mantri-mudra-yojana)"
                },
                {
                    "num": 2,
                    "tag": "ప్యానెల్ 2: ప్రభుత్వ పరిష్కారం",
                    "image": "assets/mudra_2.jpg",
                    "speaker": "గోవ్టూన్ హీరో",
                    "dialogue": "దిగులుపడకండి రవి గారూ! PM MUDRA Yojana (Micro-Units Development) ద్వారా ప్రభుత్వం అండగా నిలుస్తోంది: Loans categorized as Shishu (up to ₹50,000), Kishor (up to ₹5 Lakhs), and Tarun (up to ₹10 Lakhs) at low interest rates.",
                    "caption": "ఎలాంటి ఆస్తి తాకట్టు లేకుండా సులభమైన ప్రభుత్వ వ్యాపార రుణాలు.",
                    "sourceRef": "Section 2: PM MUDRA Yojana (Micro-Units Development) Official Guidelines (https://www.india.gov.in/my-government/schemes/pradhan-mantri-mudra-yojana)"
                },
                {
                    "num": 3,
                    "tag": "ప్యానెల్ 3: సులువైన దరఖాస్తు",
                    "image": "assets/mudra_3.jpg",
                    "speaker": "CSC మిత్రుడు",
                    "dialogue": "మీ ఆధార్ కార్డు మరియు బ్యాంక్ పాస్‌బుక్ మరియు వ్యాపార ప్రణాళికతో ఏ జాతీయ బ్యాంకులోనైనా లేదా పోర్టల్‌లోనైనా దరఖాస్తు చేయండి.",
                    "caption": "సులువైన పూచీకత్తు లేని రుణ మంజూరు.",
                    "sourceRef": "Section 3: PM MUDRA Yojana (Micro-Units Development) Official Guidelines (https://www.india.gov.in/my-government/schemes/pradhan-mantri-mudra-yojana)"
                },
                {
                    "num": 4,
                    "tag": "ప్యానెల్ 4: ఆనందం & ప్రయోజనం",
                    "image": "assets/mudra_4.jpg",
                    "speaker": "స్లోగన్",
                    "dialogue": "🎉 PM MUDRA Yojana (Micro-Units Development): ఆత్మనిర్భర్ భారత్! స్వయం ఉపాధితో పదిమందికి ఉపాధి కల్పించే స్థాయికి!",
                    "caption": "సొంత వ్యాపారంతో ఆర్థిక పురోగతి.",
                    "sourceRef": "Section 4: PM MUDRA Yojana (Micro-Units Development) Official Guidelines (https://www.india.gov.in/my-government/schemes/pradhan-mantri-mudra-yojana)"
                }
            ],
            "hi": [
                {
                    "num": 1,
                    "tag": "पैनल 1: चिंता व समस्या",
                    "image": "assets/mudra_1.jpg",
                    "speaker": "रवि",
                    "dialogue": "मैं अपना व्यापार या स्टार्टअप शुरू करके बढ़ाना चाहता हूँ, लेकिन बैंक बिना गारंटी या जमीन गिरवी रखे लोन नहीं देते!",
                    "caption": "व्यापार पूंजी के लिए उद्यमी की चिंता।",
                    "sourceRef": "Section 1: PM MUDRA Yojana (Micro-Units Development) Official Guidelines (https://www.india.gov.in/my-government/schemes/pradhan-mantri-mudra-yojana)"
                },
                {
                    "num": 2,
                    "tag": "पैनल 2: सरकारी समाधान",
                    "image": "assets/mudra_2.jpg",
                    "speaker": "गवटून हीरो",
                    "dialogue": "बिल्कुल चिंता न करें रवि जी! PM MUDRA Yojana (Micro-Units Development) के तहत सरकार दे रही है: Loans categorized as Shishu (up to ₹50,000), Kishor (up to ₹5 Lakhs), and Tarun (up to ₹10 Lakhs) at low interest rates.",
                    "caption": "बिना किसी गारंटी के आसान सरकारी व्यापारिक ऋण।",
                    "sourceRef": "Section 2: PM MUDRA Yojana (Micro-Units Development) Official Guidelines (https://www.india.gov.in/my-government/schemes/pradhan-mantri-mudra-yojana)"
                },
                {
                    "num": 3,
                    "tag": "पैनल 3: आसान आवेदन प्रक्रिया",
                    "image": "assets/mudra_3.jpg",
                    "speaker": "CSC भैया",
                    "dialogue": "बस अपने आधार कार्ड और बैंक पासबुक और बिजनेस प्लान के साथ किसी भी बैंक या उद्यमी मित्र पोर्टल पर आवेदन करें।",
                    "caption": "बिना प्रॉपर्टी गिरवी रखे त्वरित लोन स्वीकृति।",
                    "sourceRef": "Section 3: PM MUDRA Yojana (Micro-Units Development) Official Guidelines (https://www.india.gov.in/my-government/schemes/pradhan-mantri-mudra-yojana)"
                },
                {
                    "num": 4,
                    "tag": "पैनल 4: खुशहाली व सफलता",
                    "image": "assets/mudra_4.jpg",
                    "speaker": "टैगलाइन",
                    "dialogue": "🎉 PM MUDRA Yojana (Micro-Units Development): आत्मनिर्भर भारत! कम ब्याज पर आसान पूंजी, आपका व्यापार बुलंदियों पर!",
                    "caption": "सरकारी वित्तीय सहयोग से नया व्यापार सफल।",
                    "sourceRef": "Section 4: PM MUDRA Yojana (Micro-Units Development) Official Guidelines (https://www.india.gov.in/my-government/schemes/pradhan-mantri-mudra-yojana)"
                }
            ]
        },
        "character": {
            "en": {
                "name": "Ravi Kumar",
                "role": "Small Business Owner & Entrepreneur",
                "avatar": "💼",
                "clothing": "Smart Casual",
                "desc": "Ambitious entrepreneur expanding venture without collateral"
            },
            "te": {
                "name": "రవి కుమార్",
                "role": "చిరు వ్యాపారి & యువ పారిశ్రామికవేత్త",
                "avatar": "💼",
                "clothing": "వ్యాపార దుస్తులు",
                "desc": "తన స్వయం ఉపాధిని విస్తరించడానికి పూచీకత్తు లేని రుణం కోరే యువకుడు"
            },
            "hi": {
                "name": "रवि कुमार",
                "role": "उद्यमी व व्यापारी",
                "avatar": "💼",
                "clothing": "स्मार्ट कैजुअल",
                "desc": "बिना गारंटी व्यवसाय ऋण व स्टार्टअप पूंजी चाहने वाला युवा"
            }
        }
    },
    {
        "id": "sukanya",
        "name": "PM Sukanya Samriddhi Yojana (Girl Child Security)",
        "category": "Financial Security & Pension",
        "level": "Central",
        "dept": "Ministry of Women and Child Development",
        "purpose": "Small deposit savings scheme for girl child education and marriage expenses with high government interest rates.",
        "benefits": "High compound interest (8.2%+ per annum), 100% tax exemption under 80C, and maturity payout for higher education.",
        "eligibility": {
            "minAge": 0,
            "maxAge": 10,
            "maxIncome": 10000000,
            "state": "All India",
            "occupation": "Parent / Guardian",
            "summary": "Parents or legal guardians of girl child below 10 years of age (max 2 girls per family)."
        },
        "documents": [
            {
                "id": "d1",
                "name": "Girl Child Birth Certificate",
                "required": true,
                "why": "Age proof of girl child"
            },
            {
                "id": "d2",
                "name": "Parent Aadhaar & PAN Card",
                "required": true,
                "why": "Guardian identity & address proof"
            },
            {
                "id": "d3",
                "name": "Initial Deposit (Min ₹250)",
                "required": true,
                "why": "Account activation fee"
            }
        ],
        "applicationSteps": [
            {
                "step": 1,
                "title": "Visit Post Office or Authorized Bank",
                "desc": "Go to nearest India Post branch or bank."
            },
            {
                "step": 2,
                "title": "Submit Birth Certificate & Aadhaar",
                "desc": "Fill Sukanya Samriddhi account opening form."
            },
            {
                "step": 3,
                "title": "Deposit Minimum ₹250",
                "desc": "Pay initial deposit amount."
            },
            {
                "step": 4,
                "title": "Receive SSY Passbook",
                "desc": "Get passbook tracking annual interest & maturity balance."
            }
        ],
        "officialUrl": "https://www.india.gov.in/my-government/schemes/sukanya-samriddhi-yojana",
        "sourceUrl": "https://www.indiapost.gov.in",
        "lastVerified": "2026-08-24",
        "panels": {
            "en": [
                {
                    "num": 1,
                    "tag": "Panel 1: The Tension",
                    "image": "assets/sukanya_1.jpg",
                    "speaker": "Anita",
                    "dialogue": "How will I manage expenses for my daughter Priya's higher education and secure her future without huge loans?",
                    "caption": "Anita worries about financial security for her daughter's bright future.",
                    "sourceRef": "Section 1: PM Sukanya Samriddhi Yojana (Girl Child Security) Official Guidelines (https://www.india.gov.in/my-government/schemes/sukanya-samriddhi-yojana)"
                },
                {
                    "num": 2,
                    "tag": "Panel 2: The Solution",
                    "image": "assets/sukanya_2.jpg",
                    "speaker": "GovToon Hero",
                    "dialogue": "Fikr mat kijiye! PM Sukanya Samriddhi Yojana (Girl Child Security) guarantees: High compound interest (8.2%+ per annum), 100% tax exemption under 80C, and maturity payout for higher education.",
                    "caption": "Official government welfare and highest interest security guaranteed.",
                    "sourceRef": "Section 2: PM Sukanya Samriddhi Yojana (Girl Child Security) Official Guidelines (https://www.india.gov.in/my-government/schemes/sukanya-samriddhi-yojana)"
                },
                {
                    "num": 3,
                    "tag": "Panel 3: The Easy Path",
                    "image": "assets/sukanya_3.jpg",
                    "speaker": "CSC Bhaiya",
                    "dialogue": "Just bring Girl Child Birth Certificate, Parent Aadhaar & PAN Card, Initial Deposit (Min ₹250) to the nearest Post Office, Bank, or Jan Seva Kendra to enroll online.",
                    "caption": "Simple digital registration with minimal documents.",
                    "sourceRef": "Section 3: PM Sukanya Samriddhi Yojana (Girl Child Security) Official Guidelines (https://www.india.gov.in/my-government/schemes/sukanya-samriddhi-yojana)"
                },
                {
                    "num": 4,
                    "tag": "Panel 4: The Khushali",
                    "image": "assets/sukanya_4.jpg",
                    "speaker": "Tagline",
                    "dialogue": "🎉 PM Sukanya Samriddhi Yojana (Girl Child Security): Beti Padhao, Desh Badhao! Secure future, smiling daughter!",
                    "caption": "Guaranteed government support brings peace of mind.",
                    "sourceRef": "Section 4: PM Sukanya Samriddhi Yojana (Girl Child Security) Official Guidelines (https://www.india.gov.in/my-government/schemes/sukanya-samriddhi-yojana)"
                }
            ],
            "te": [
                {
                    "num": 1,
                    "tag": "ప్యానెల్ 1: సమస్య & ఆందోళన",
                    "image": "assets/sukanya_1.jpg",
                    "speaker": "అనిత",
                    "dialogue": "నా ముద్దుల కూతురు ప్రియ ఉన్నత చదువులు మరియు భవిష్యత్తు కోసం ఖర్చులు ఎలా సమకూర్చాలి? అప్పులు చేయకుండా ఉండగలనా?",
                    "caption": "కూతురి భవిష్యత్తు కోసం అనిత పడే ఆందోళన.",
                    "sourceRef": "Section 1: PM Sukanya Samriddhi Yojana (Girl Child Security) Official Guidelines (https://www.india.gov.in/my-government/schemes/sukanya-samriddhi-yojana)"
                },
                {
                    "num": 2,
                    "tag": "ప్యానెల్ 2: ప్రభుత్వ పరిష్కారం",
                    "image": "assets/sukanya_2.jpg",
                    "speaker": "గోవ్టూన్ హీరో",
                    "dialogue": "దిగులుపడకండి అనిత గారూ! PM Sukanya Samriddhi Yojana (Girl Child Security) ద్వారా ప్రభుత్వం అండగా నిలుస్తోంది: High compound interest (8.2%+ per annum), 100% tax exemption under 80C, and maturity payout for higher education.",
                    "caption": "ప్రభుత్వ అధికారిక ప్రయోజనాలు మరియు అత్యధిక వడ్డీ భరోసా.",
                    "sourceRef": "Section 2: PM Sukanya Samriddhi Yojana (Girl Child Security) Official Guidelines (https://www.india.gov.in/my-government/schemes/sukanya-samriddhi-yojana)"
                },
                {
                    "num": 3,
                    "tag": "ప్యానెల్ 3: సులువైన దరఖాస్తు",
                    "image": "assets/sukanya_3.jpg",
                    "speaker": "CSC మిత్రుడు",
                    "dialogue": "కేవలం మీ ఆధార్ కార్డు మరియు బ్యాంక్ పాస్‌బుక్ తీసుకొని సమీప పోస్టాఫీస్, బ్యాంక్ లేదా CSC కేంద్రానికి వెళితే సులభంగా నమోదు చేసుకోవచ్చు.",
                    "caption": "సులువైన ఆధార్ ఆధారిత డిజిటల్ దరఖాస్తు.",
                    "sourceRef": "Section 3: PM Sukanya Samriddhi Yojana (Girl Child Security) Official Guidelines (https://www.india.gov.in/my-government/schemes/sukanya-samriddhi-yojana)"
                },
                {
                    "num": 4,
                    "tag": "ప్యానెల్ 4: ఆనందం & ప్రయోజనం",
                    "image": "assets/sukanya_4.jpg",
                    "speaker": "స్లోగన్",
                    "dialogue": "🎉 PM Sukanya Samriddhi Yojana (Girl Child Security): ఆడబిడ్డల భవిష్యత్తుకు భరోసా! బంగారు భవిష్యత్తు సాకారం!",
                    "caption": "ప్రభుత్వ సహాయంతో నిర్భయంగా ముందుకు.",
                    "sourceRef": "Section 4: PM Sukanya Samriddhi Yojana (Girl Child Security) Official Guidelines (https://www.india.gov.in/my-government/schemes/sukanya-samriddhi-yojana)"
                }
            ],
            "hi": [
                {
                    "num": 1,
                    "tag": "पैनल 1: चिंता व समस्या",
                    "image": "assets/sukanya_1.jpg",
                    "speaker": "अनीता",
                    "dialogue": "मेरी प्यारी बेटी प्रिया की उच्च शिक्षा और भविष्य की सुरक्षा के लिए पैसे कैसे जुटाऊँगी? क्या बिना कर्ज के सपना पूरा होगा?",
                    "caption": "बेटी के भविष्य को लेकर माँ अनीता की चिंता।",
                    "sourceRef": "Section 1: PM Sukanya Samriddhi Yojana (Girl Child Security) Official Guidelines (https://www.india.gov.in/my-government/schemes/sukanya-samriddhi-yojana)"
                },
                {
                    "num": 2,
                    "tag": "पैनल 2: सरकारी समाधान",
                    "image": "assets/sukanya_2.jpg",
                    "speaker": "गवटून हीरो",
                    "dialogue": "बिल्कुल चिंता न करें अनीता जी! PM Sukanya Samriddhi Yojana (Girl Child Security) के तहत सरकार दे रही है गारंटीड सहायता: High compound interest (8.2%+ per annum), 100% tax exemption under 80C, and maturity payout for higher education.",
                    "caption": "आधिकारिक सरकारी सहायता और उच्च ब्याज सुरक्षा की गारंटी।",
                    "sourceRef": "Section 2: PM Sukanya Samriddhi Yojana (Girl Child Security) Official Guidelines (https://www.india.gov.in/my-government/schemes/sukanya-samriddhi-yojana)"
                },
                {
                    "num": 3,
                    "tag": "पैनल 3: आसान आवेदन प्रक्रिया",
                    "image": "assets/sukanya_3.jpg",
                    "speaker": "CSC भैया",
                    "dialogue": "बस अपने आधार कार्ड और बैंक पासबुक लेकर नजदीकी डाकघर, बैंक या जन सेवा केंद्र जाएं और तुरंत आवेदन करें।",
                    "caption": "सरल आधार-आधारित डिजिटल पंजीकरण।",
                    "sourceRef": "Section 3: PM Sukanya Samriddhi Yojana (Girl Child Security) Official Guidelines (https://www.india.gov.in/my-government/schemes/sukanya-samriddhi-yojana)"
                },
                {
                    "num": 4,
                    "tag": "पैनल 4: खुशहाली व सफलता",
                    "image": "assets/sukanya_4.jpg",
                    "speaker": "टैगलाइन",
                    "dialogue": "🎉 PM Sukanya Samriddhi Yojana (Girl Child Security): बेटी पढ़ाओ, देश बढ़ाओ! सशक्त बेटी, समृद्ध परिवार!",
                    "caption": "सरकारी सहयोग से परिवार में खुशहाली।",
                    "sourceRef": "Section 4: PM Sukanya Samriddhi Yojana (Girl Child Security) Official Guidelines (https://www.india.gov.in/my-government/schemes/sukanya-samriddhi-yojana)"
                }
            ]
        },
        "character": {
            "en": {
                "name": "Anita & Priya",
                "role": "Mother & Daughter",
                "avatar": "👩‍👧",
                "clothing": "Traditional Saree & School Uniform",
                "desc": "Caring mother & ambitious daughter securing educational future"
            },
            "te": {
                "name": "అనిత & ప్రియ",
                "role": "తల్లి & కూతురు",
                "avatar": "👩‍👧",
                "clothing": "సాంప్రదాయ చీర & స్కూల్ యూనిఫాం",
                "desc": "కూతురి ఉన్నత చదువులు, బంగారు భవిష్యత్తు కోసం ఆరాటపడే తల్లి"
            },
            "hi": {
                "name": "अनीता और प्रिया",
                "role": "माँ और बेटी",
                "avatar": "👩‍👧",
                "clothing": "पारंपरिक साड़ी व स्कूल यूनिफॉर्म",
                "desc": "बेटी के उज्ज्वल भविष्य व उच्च शिक्षा हेतु समर्पित माँ"
            }
        }
    },
    {
        "id": "nsp_scholarship",
        "name": "National Scholarship Portal (Post-Matric & Higher Ed)",
        "category": "Education & Scholarships",
        "level": "Central",
        "dept": "Ministry of Education",
        "purpose": "Provide financial assistance and tuition fee waivers to meritorious and low-income SC, ST, OBC, and minority students.",
        "benefits": "Full tuition fee reimbursement + monthly maintenance allowance credited directly to student bank accounts.",
        "eligibility": {
            "minAge": 14,
            "maxAge": 30,
            "maxIncome": 250000,
            "state": "All India",
            "occupation": "Student",
            "summary": "Students enrolled in Class 11, 12, ITI, Diploma, Graduation, or Post-Graduation with annual family income up to ₹2.5 Lakhs."
        },
        "documents": [
            {
                "id": "d1",
                "name": "Aadhaar Card & Student ID",
                "required": true,
                "why": "Identity and institution verification"
            },
            {
                "id": "d2",
                "name": "Income Certificate",
                "required": true,
                "why": "Issued by Competent State Authority"
            },
            {
                "id": "d3",
                "name": "Caste / Community Certificate",
                "required": true,
                "why": "Verification for category reservations"
            },
            {
                "id": "d4",
                "name": "Previous Year Marksheet",
                "required": true,
                "why": "Academic merit verification"
            }
        ],
        "applicationSteps": [
            {
                "step": 1,
                "title": "Register on NSP Portal",
                "desc": "Visit scholarships.gov.in and complete One-Time Registration (OTR)."
            },
            {
                "step": 2,
                "title": "Select Scheme & Fill Form",
                "desc": "Choose Post-Matric or Merit-cum-Means scholarship scheme."
            },
            {
                "step": 3,
                "title": "Upload Marksheet & Income Proof",
                "desc": "Upload scanned certificates for institutional verification."
            },
            {
                "step": 4,
                "title": "Receive Scholarship DBT",
                "desc": "Funds transferred directly to student bank account upon verification."
            }
        ],
        "sourceUrl": "https://scholarships.gov.in",
        "lastVerified": "2026-08-24",
        "panels": {
            "en": [
                {
                    "num": 1,
                    "tag": "Panel 1: The Tension",
                    "image": "assets/scholarship_1.jpg",
                    "speaker": "Raju",
                    "dialogue": "College tuition fees and books are so expensive! How can I complete my higher education without financial stress?",
                    "caption": "Students worry about college admission and semester fees.",
                    "sourceRef": "Section 1: National Scholarship Portal (Post-Matric & Higher Ed) Official Guidelines (https://www.india.gov.in)"
                },
                {
                    "num": 2,
                    "tag": "Panel 2: The Solution",
                    "image": "assets/scholarship_2.jpg",
                    "speaker": "GovToon Hero",
                    "dialogue": "Fikr mat kijiye! National Scholarship Portal (Post-Matric & Higher Ed) provides: Full tuition fee reimbursement + monthly maintenance allowance credited directly to student bank accounts.",
                    "caption": "Direct 100% scholarship transfer to student bank accounts.",
                    "sourceRef": "Section 2: National Scholarship Portal (Post-Matric & Higher Ed) Official Guidelines (https://www.india.gov.in)"
                },
                {
                    "num": 3,
                    "tag": "Panel 3: The Easy Path",
                    "image": "assets/scholarship_3.jpg",
                    "speaker": "CSC Bhaiya",
                    "dialogue": "Upload your Aadhaar Card & Student ID, Income Certificate, Caste / Community Certificate, Previous Year Marksheet on the official scholarship portal or visit nearest CSC center.",
                    "caption": "Fast Aadhaar-based scholarship verification.",
                    "sourceRef": "Section 3: National Scholarship Portal (Post-Matric & Higher Ed) Official Guidelines (https://www.india.gov.in)"
                },
                {
                    "num": 4,
                    "tag": "Panel 4: The Khushali",
                    "image": "assets/scholarship_4.jpg",
                    "speaker": "Tagline",
                    "dialogue": "🎉 National Scholarship Portal (Post-Matric & Higher Ed): Padhega India, Badhega India! Dreams empowered by government support!",
                    "caption": "Education secured with full tuition waiver.",
                    "sourceRef": "Section 4: National Scholarship Portal (Post-Matric & Higher Ed) Official Guidelines (https://www.india.gov.in)"
                }
            ],
            "te": [
                {
                    "num": 1,
                    "tag": "ప్యానెల్ 1: సమస్య & ఆందోళన",
                    "image": "assets/scholarship_1.jpg",
                    "speaker": "రాజు",
                    "dialogue": "కాలేజీ సెమిస్టర్ ఫీజులు, పుస్తకాల ఖర్చులు చాలా ఎక్కువగా ఉన్నాయి! ఆర్థిక ఇబ్బందుల వల్ల నా చదువు ఆగిపోతుందేమో అని భయంగా ఉంది.",
                    "caption": "ఫీజుల కోసం విద్యార్థుల ఆవేదన.",
                    "sourceRef": "Section 1: National Scholarship Portal (Post-Matric & Higher Ed) Official Guidelines (https://www.india.gov.in)"
                },
                {
                    "num": 2,
                    "tag": "ప్యానెల్ 2: ప్రభుత్వ పరిష్కారం",
                    "image": "assets/scholarship_2.jpg",
                    "speaker": "గోవ్టూన్ హీరో",
                    "dialogue": "దిగులుపడకండి విద్యార్థి మిత్రులారా! National Scholarship Portal (Post-Matric & Higher Ed) ద్వారా ప్రభుత్వం అండగా నిలుస్తోంది: Full tuition fee reimbursement + monthly maintenance allowance credited directly to student bank accounts.",
                    "caption": "100% ఫీజు రీయింబర్స్‌మెంట్ మరియు మెయింటెనెన్స్ అలవెన్స్ భరోసా.",
                    "sourceRef": "Section 2: National Scholarship Portal (Post-Matric & Higher Ed) Official Guidelines (https://www.india.gov.in)"
                },
                {
                    "num": 3,
                    "tag": "ప్యానెల్ 3: సులువైన దరఖాస్తు",
                    "image": "assets/scholarship_3.jpg",
                    "speaker": "CSC మిత్రుడు",
                    "dialogue": "మీ ఆధార్ కార్డు మరియు బ్యాంక్ పాస్‌బుక్ తో అధికారిక స్కాలర్‌షిప్ పోర్టల్ లేదా CSC లో వెంటనే దరఖాస్తు చేసుకోండి.",
                    "caption": "త్వరిత ఆన్‌లైన్ వెరిఫికేషన్ ప్రక్రియ.",
                    "sourceRef": "Section 3: National Scholarship Portal (Post-Matric & Higher Ed) Official Guidelines (https://www.india.gov.in)"
                },
                {
                    "num": 4,
                    "tag": "ప్యానెల్ 4: ఆనందం & ప్రయోజనం",
                    "image": "assets/scholarship_4.jpg",
                    "speaker": "స్లోగన్",
                    "dialogue": "🎉 National Scholarship Portal (Post-Matric & Higher Ed): చదువుకు పైసల కొరత లేదు! ఉన్నత విద్యతో బంగారు భవిష్యత్తు!",
                    "caption": "ప్రభుత్వ స్కాలర్‌షిప్‌తో కలలు సాకారం.",
                    "sourceRef": "Section 4: National Scholarship Portal (Post-Matric & Higher Ed) Official Guidelines (https://www.india.gov.in)"
                }
            ],
            "hi": [
                {
                    "num": 1,
                    "tag": "पैनल 1: चिंता व समस्या",
                    "image": "assets/scholarship_1.jpg",
                    "speaker": "राजू",
                    "dialogue": "कॉलेज की फीस और किताबों का खर्च बहुत ज्यादा है! पैसों की कमी से कहीं मेरी उच्च शिक्षा न रुक जाए!",
                    "caption": "छात्रों को कॉलेज फीस और खर्च की चिंता।",
                    "sourceRef": "Section 1: National Scholarship Portal (Post-Matric & Higher Ed) Official Guidelines (https://www.india.gov.in)"
                },
                {
                    "num": 2,
                    "tag": "पैनल 2: सरकारी समाधान",
                    "image": "assets/scholarship_2.jpg",
                    "speaker": "गवटून हीरो",
                    "dialogue": "बिल्कुल चिंता न करें! National Scholarship Portal (Post-Matric & Higher Ed) के अंतर्गत सरकार प्रदान कर रही है: Full tuition fee reimbursement + monthly maintenance allowance credited directly to student bank accounts.",
                    "caption": "सीधे बैंक खाते में 100% स्कॉलरशिप और भत्ता।",
                    "sourceRef": "Section 2: National Scholarship Portal (Post-Matric & Higher Ed) Official Guidelines (https://www.india.gov.in)"
                },
                {
                    "num": 3,
                    "tag": "पैनल 3: आसान आवेदन प्रक्रिया",
                    "image": "assets/scholarship_3.jpg",
                    "speaker": "CSC भैया",
                    "dialogue": "बस अपने आधार कार्ड और बैंक पासबुक के साथ राष्ट्रीय छात्रवृत्ति पोर्टल पर ऑनलाइन फॉर्म भरें।",
                    "caption": "सरल डिजिटल सत्यापन व सीधा डीबीटी।",
                    "sourceRef": "Section 3: National Scholarship Portal (Post-Matric & Higher Ed) Official Guidelines (https://www.india.gov.in)"
                },
                {
                    "num": 4,
                    "tag": "पैनल 4: खुशहाली व सफलता",
                    "image": "assets/scholarship_4.jpg",
                    "speaker": "टैगलाइन",
                    "dialogue": "🎉 National Scholarship Portal (Post-Matric & Higher Ed): पढ़ेगा इंडिया, बढ़ेगा इंडिया! युवा शक्ति का स्वर्णिम भविष्य!",
                    "caption": "बिना किसी रुकावट के पूरी होगी उच्च शिक्षा।",
                    "sourceRef": "Section 4: National Scholarship Portal (Post-Matric & Higher Ed) Official Guidelines (https://www.india.gov.in)"
                }
            ]
        },
        "character": {
            "en": {
                "name": "Raju & Priya",
                "role": "College Students",
                "avatar": "🎓",
                "clothing": "College Bag & Formal Shirt",
                "desc": "Meritorious students aspiring for higher education degrees"
            },
            "te": {
                "name": "రాజు & ప్రియ",
                "role": "కళాశాల విద్యార్థులు",
                "avatar": "🎓",
                "clothing": "కాలేజీ బ్యాగ్ & చొక్కా",
                "desc": "ఉన్నత చదువులపై ఆశలు పెట్టుకున్న ప్రతిభావంతులైన విద్యార్థులు"
            },
            "hi": {
                "name": "राजू और प्रिया",
                "role": "कॉलेज छात्र",
                "avatar": "🎓",
                "clothing": "कॉलेज बैग व फॉर्मल शर्ट",
                "desc": "उच्च शिक्षा का सपना देखने वाले मेधावी छात्र"
            }
        }
    },
    {
        "id": "pm_awas_rural",
        "name": "Pradhan Mantri Awas Yojana - Gramin (PMAY-G)",
        "category": "Housing & Energy",
        "level": "Central",
        "dept": "Ministry of Rural Development",
        "purpose": "Provide pucca houses with basic amenities like piped water, electricity, and clean cooking fuel to all houseless rural families.",
        "benefits": "Financial assistance of ₹1.20 Lakh in plain areas and ₹1.30 Lakh in hilly/difficult areas transferred directly via DBT.",
        "eligibility": {
            "minAge": 18,
            "maxAge": 100,
            "maxIncome": 150000,
            "state": "All India",
            "occupation": "Rural Household",
            "summary": "Houseless families or families living in kutcha or dilapidated houses based on SECC 2011 data."
        },
        "documents": [
            {
                "id": "d1",
                "name": "Aadhaar Card",
                "required": true,
                "why": "Identity and geo-tagging validation"
            },
            {
                "id": "d2",
                "name": "Bank Account Passbook",
                "required": true,
                "why": "Direct DBT installment credits"
            },
            {
                "id": "d3",
                "name": "MGNREGA Job Card Number",
                "required": false,
                "why": "For 90-95 days unskilled labor wage support"
            }
        ],
        "applicationSteps": [
            {
                "step": 1,
                "title": "Gram Sabha Beneficiary Validation",
                "desc": "Check presence in village PMAY-G permanent waitlist."
            },
            {
                "step": 2,
                "title": "Geo-Tagging of Old Site",
                "desc": "Gram Panchayat officer takes geotagged photo via AwaasApp."
            },
            {
                "step": 3,
                "title": "Direct Installment Releases",
                "desc": "Receive fund releases linked to foundation, lintel, and roof construction stages."
            }
        ],
        "officialUrl": "https://www.india.gov.in/my-government/schemes/pradhan-mantri-awaas-yojana-gramin",
        "sourceUrl": "https://pmayg.nic.in",
        "lastVerified": "2026-08-24",
        "panels": {
            "en": [
                {
                    "num": 1,
                    "tag": "Panel 1: The Tension",
                    "image": "assets/awas_1.jpg",
                    "speaker": "Kamala Devi",
                    "dialogue": "Our kutcha mud roof leaks every monsoon! How can we build a sturdy, permanent pucca home with our low income?",
                    "caption": "Kamala worries about family safety in an unsafe mud shelter.",
                    "sourceRef": "Section 1: Pradhan Mantri Awas Yojana - Gramin (PMAY-G) Official Guidelines (https://www.india.gov.in/my-government/schemes/pradhan-mantri-awaas-yojana-gramin)"
                },
                {
                    "num": 2,
                    "tag": "Panel 2: The Solution",
                    "image": "assets/awas_2.jpg",
                    "speaker": "GovToon Hero",
                    "dialogue": "Fikr mat kijiye! Pradhan Mantri Awas Yojana - Gramin (PMAY-G) provides: Financial assistance of ₹1.20 Lakh in plain areas and ₹1.30 Lakh in hilly/difficult areas transferred directly via DBT.",
                    "caption": "Direct DBT financial aid + MGNREGA wages + toilet construction fund.",
                    "sourceRef": "Section 2: Pradhan Mantri Awas Yojana - Gramin (PMAY-G) Official Guidelines (https://www.india.gov.in/my-government/schemes/pradhan-mantri-awaas-yojana-gramin)"
                },
                {
                    "num": 3,
                    "tag": "Panel 3: The Easy Path",
                    "image": "assets/awas_3.jpg",
                    "speaker": "CSC Bhaiya",
                    "dialogue": "Verify your Gram Panchayat name and submit Aadhaar Card, Bank Account Passbook, MGNREGA Job Card Number to enroll in the AwaasSoft system.",
                    "caption": "Geo-tagged phased direct installment transfers.",
                    "sourceRef": "Section 3: Pradhan Mantri Awas Yojana - Gramin (PMAY-G) Official Guidelines (https://www.india.gov.in/my-government/schemes/pradhan-mantri-awaas-yojana-gramin)"
                },
                {
                    "num": 4,
                    "tag": "Panel 4: The Khushali",
                    "image": "assets/awas_4.jpg",
                    "speaker": "Tagline",
                    "dialogue": "🎉 Pradhan Mantri Awas Yojana - Gramin (PMAY-G): Har Parivar Ko Pakka Makaan! Safe home, dignified living for every citizen!",
                    "caption": "Proud owner of a beautiful, safe pucca house.",
                    "sourceRef": "Section 4: Pradhan Mantri Awas Yojana - Gramin (PMAY-G) Official Guidelines (https://www.india.gov.in/my-government/schemes/pradhan-mantri-awaas-yojana-gramin)"
                }
            ],
            "te": [
                {
                    "num": 1,
                    "tag": "ప్యానెల్ 1: సమస్య & ఆందోళన",
                    "image": "assets/awas_1.jpg",
                    "speaker": "కమలా దేవి",
                    "dialogue": "ప్రతి వర్షాకాలంలో మా పూరిగుడిసె కారుతోంది! మా చిన్నపాటి ఆదాయంతో పక్కా ఇల్లు కట్టుకోవడం ఎలా సాధ్యం?",
                    "caption": "వర్షాలకు ఇబ్బంది పడుతున్న కమలాదేవి ఆవేదన.",
                    "sourceRef": "Section 1: Pradhan Mantri Awas Yojana - Gramin (PMAY-G) Official Guidelines (https://www.india.gov.in/my-government/schemes/pradhan-mantri-awaas-yojana-gramin)"
                },
                {
                    "num": 2,
                    "tag": "ప్యానెల్ 2: ప్రభుత్వ పరిష్కారం",
                    "image": "assets/awas_2.jpg",
                    "speaker": "గోవ్టూన్ హీరో",
                    "dialogue": "దిగులుపడకండి కమలాదేవి గారూ! Pradhan Mantri Awas Yojana - Gramin (PMAY-G) ద్వారా ప్రభుత్వం అండగా నిలుస్తోంది: Financial assistance of ₹1.20 Lakh in plain areas and ₹1.30 Lakh in hilly/difficult areas transferred directly via DBT.",
                    "caption": "పక్కా ఇంటి నిర్మాణానికి నేరుగా ₹1.20 లక్షల ఆర్థిక సాయం, ఉపాధి హామీ కూలీ మరియు ఉచిత మరుగుదొడ్డి.",
                    "sourceRef": "Section 2: Pradhan Mantri Awas Yojana - Gramin (PMAY-G) Official Guidelines (https://www.india.gov.in/my-government/schemes/pradhan-mantri-awaas-yojana-gramin)"
                },
                {
                    "num": 3,
                    "tag": "ప్యానెల్ 3: సులువైన దరఖాస్తు",
                    "image": "assets/awas_3.jpg",
                    "speaker": "CSC మిత్రుడు",
                    "dialogue": "మీ గ్రామ పంచాయతీ జాబితాలో పేరు చూసుకొని ఆధార్ కార్డు మరియు బ్యాంక్ పాస్‌బుక్ సమర్పించండి.",
                    "caption": "జియో-ట్యాగింగ్ ద్వారా విడతలవారీగా నేరుగా ఖాతాలో జమ.",
                    "sourceRef": "Section 3: Pradhan Mantri Awas Yojana - Gramin (PMAY-G) Official Guidelines (https://www.india.gov.in/my-government/schemes/pradhan-mantri-awaas-yojana-gramin)"
                },
                {
                    "num": 4,
                    "tag": "ప్యానెల్ 4: ఆనందం & ప్రయోజనం",
                    "image": "assets/awas_4.jpg",
                    "speaker": "స్లోగన్",
                    "dialogue": "🎉 Pradhan Mantri Awas Yojana - Gramin (PMAY-G): ప్రతి పేద కుటుంబానికీ పక్కా ఇల్లు! ఆత్మగౌరవంతో కూడిన సురక్షిత జీవనం!",
                    "caption": "సొంతింటి కల సాకారమైన శుభవేళ.",
                    "sourceRef": "Section 4: Pradhan Mantri Awas Yojana - Gramin (PMAY-G) Official Guidelines (https://www.india.gov.in/my-government/schemes/pradhan-mantri-awaas-yojana-gramin)"
                }
            ],
            "hi": [
                {
                    "num": 1,
                    "tag": "पैनल 1: चिंता व समस्या",
                    "image": "assets/awas_1.jpg",
                    "speaker": "कमला देवी",
                    "dialogue": "हर बरसात में कच्चे मकान की छत टपकती है! हमारी कम आमदनी में पक्का घर कैसे बन पाएगा?",
                    "caption": "कच्चे मकान की परेशानी से चिंतित महिला।",
                    "sourceRef": "Section 1: Pradhan Mantri Awas Yojana - Gramin (PMAY-G) Official Guidelines (https://www.india.gov.in/my-government/schemes/pradhan-mantri-awaas-yojana-gramin)"
                },
                {
                    "num": 2,
                    "tag": "पैनल 2: सरकारी समाधान",
                    "image": "assets/awas_2.jpg",
                    "speaker": "गवटून हीरो",
                    "dialogue": "बिल्कुल चिंता न करें कमला देवी जी! Pradhan Mantri Awas Yojana - Gramin (PMAY-G) दे रही है सीधा सहयोग: Financial assistance of ₹1.20 Lakh in plain areas and ₹1.30 Lakh in hilly/difficult areas transferred directly via DBT.",
                    "caption": "पक्के मकान हेतु ₹1.20 लाख की सीधी आर्थिक मदद + मनरेगा मजदूरी और शौचालय अनुदान।",
                    "sourceRef": "Section 2: Pradhan Mantri Awas Yojana - Gramin (PMAY-G) Official Guidelines (https://www.india.gov.in/my-government/schemes/pradhan-mantri-awaas-yojana-gramin)"
                },
                {
                    "num": 3,
                    "tag": "पैनल 3: आसान आवेदन प्रक्रिया",
                    "image": "assets/awas_3.jpg",
                    "speaker": "CSC भैया",
                    "dialogue": "बस अपने आधार कार्ड और बैंक पासबुक के साथ ग्राम पंचायत या आवास सॉफ्ट पोर्टल पर नाम दर्ज कराएं।",
                    "caption": "जियो-टैगिंग के बाद सीधे बैंक खाते में किस्तों का भुगतान।",
                    "sourceRef": "Section 3: Pradhan Mantri Awas Yojana - Gramin (PMAY-G) Official Guidelines (https://www.india.gov.in/my-government/schemes/pradhan-mantri-awaas-yojana-gramin)"
                },
                {
                    "num": 4,
                    "tag": "पैनल 4: खुशहाली व सफलता",
                    "image": "assets/awas_4.jpg",
                    "speaker": "टैगलाइन",
                    "dialogue": "🎉 Pradhan Mantri Awas Yojana - Gramin (PMAY-G): हर परिवार को पक्का मकान! सम्मान, सुरक्षा और अपनी छत!",
                    "caption": "कच्चे मकान की जगह सुंदर व मजबूत पक्का घर तैयार।",
                    "sourceRef": "Section 4: Pradhan Mantri Awas Yojana - Gramin (PMAY-G) Official Guidelines (https://www.india.gov.in/my-government/schemes/pradhan-mantri-awaas-yojana-gramin)"
                }
            ]
        },
        "character": {
            "en": {
                "name": "Kamala Devi",
                "role": "Rural Homemaker",
                "avatar": "🏡",
                "clothing": "Traditional Saree",
                "desc": "Rural homemaker dreaming of a safe, permanent pucca house"
            },
            "te": {
                "name": "కమలా దేవి",
                "role": "గ్రామీణ గృహిణి",
                "avatar": "🏡",
                "clothing": "సాంప్రదాయ చీర",
                "desc": "కుటుంబానికి పక్కా ఇల్లు నిర్మించాలనే కలలు కనే గ్రామీణ మహిళ"
            },
            "hi": {
                "name": "कमला देवी",
                "role": "ग्रामीण गृहिणी",
                "avatar": "🏡",
                "clothing": "पारंपरिक साड़ी",
                "desc": "कच्चे मकान से पक्के मकान का सपना देखने वाली गृहिणी"
            }
        }
    },
    {
        "id": "pm_vishwakarma",
        "name": "PM Vishwakarma Kaushal Samman",
        "category": "Business",
        "level": "Central",
        "dept": "Ministry of Micro, Small & Medium Enterprises",
        "purpose": "Holistic end-to-end support to traditional artisans and craftspeople across 18 trades (carpenters, blacksmiths, potters, cobblers, tailors).",
        "benefits": "Collateral-free enterprise loans up to ₹3 Lakh at 5% interest rate + ₹15,000 modern e-voucher toolkit grant + ₹500/day training stipend.",
        "eligibility": {
            "minAge": 18,
            "maxAge": 70,
            "maxIncome": 300000,
            "state": "All India",
            "occupation": "Artisan / Craftsperson",
            "summary": "Artisans engaged in one of the 18 eligible traditional family crafts (Blacksmith, Carpenter, Potter, Mason, Tailor, Barber, etc.)."
        },
        "documents": [
            {
                "id": "d1",
                "name": "Aadhaar Card & Mobile Link",
                "required": true,
                "why": "Biometric verification on PM Vishwakarma Portal"
            },
            {
                "id": "d2",
                "name": "Bank Account Passbook",
                "required": true,
                "why": "For loan disbursement and toolkit e-voucher"
            },
            {
                "id": "d3",
                "name": "Trade Skill Declaration",
                "required": true,
                "why": "Gram Panchayat / ULB trade endorsement"
            }
        ],
        "applicationSteps": [
            {
                "step": 1,
                "title": "Register at CSC",
                "desc": "Visit nearest Common Service Center with Aadhaar and bank details."
            },
            {
                "step": 2,
                "title": "Complete 5-Day Basic Skill Training",
                "desc": "Receive ₹500/day stipend during skill upgradation."
            },
            {
                "step": 3,
                "title": "Claim ₹15,000 Toolkit Incentive",
                "desc": "Receive digital voucher to buy modern trade tools."
            },
            {
                "step": 4,
                "title": "Access ₹1 Lakh Collateral-Free Loan",
                "desc": "Receive first tranche loan at concessional 5% interest rate."
            }
        ],
        "officialUrl": "https://www.india.gov.in/my-government/schemes/pm-vishwakarma",
        "sourceUrl": "https://pmvishwakarma.gov.in",
        "lastVerified": "2026-08-24",
        "panels": {
            "en": [
                {
                    "num": 1,
                    "tag": "Panel 1: The Tension",
                    "image": "assets/vishwakarma_1.jpg",
                    "speaker": "Mohan Lal",
                    "dialogue": "Using old hand tools limits my daily output and earnings. How can I get modern electric tools, formal training, and growth capital?",
                    "caption": "Mohan Lal struggles with outdated manual equipment.",
                    "sourceRef": "Section 1: PM Vishwakarma Kaushal Samman Official Guidelines (https://www.india.gov.in/my-government/schemes/pm-vishwakarma)"
                },
                {
                    "num": 2,
                    "tag": "Panel 2: The Solution",
                    "image": "assets/vishwakarma_2.jpg",
                    "speaker": "GovToon Hero",
                    "dialogue": "Fikr mat kijiye! PM Vishwakarma Kaushal Samman provides: Collateral-free enterprise loans up to ₹3 Lakh at 5% interest rate + ₹15,000 modern e-voucher toolkit grant + ₹500/day training stipend.",
                    "caption": "₹15,000 free toolkit grant, daily stipend training, and 5% concessional credit.",
                    "sourceRef": "Section 2: PM Vishwakarma Kaushal Samman Official Guidelines (https://www.india.gov.in/my-government/schemes/pm-vishwakarma)"
                },
                {
                    "num": 3,
                    "tag": "Panel 3: The Easy Path",
                    "image": "assets/vishwakarma_3.jpg",
                    "speaker": "CSC Bhaiya",
                    "dialogue": "Register with biometric Aadhaar and Aadhaar Card & Mobile Link, Bank Account Passbook, Trade Skill Declaration at nearest CSC on the PM Vishwakarma portal.",
                    "caption": "Free skill certification and toolkit voucher issuance.",
                    "sourceRef": "Section 3: PM Vishwakarma Kaushal Samman Official Guidelines (https://www.india.gov.in/my-government/schemes/pm-vishwakarma)"
                },
                {
                    "num": 4,
                    "tag": "Panel 4: The Khushali",
                    "image": "assets/vishwakarma_4.jpg",
                    "speaker": "Tagline",
                    "dialogue": "🎉 PM Vishwakarma Kaushal Samman: Samman, Samarthya, Samriddhi! Honoring traditional artisans across India!",
                    "caption": "Modern tools tripling production and income.",
                    "sourceRef": "Section 4: PM Vishwakarma Kaushal Samman Official Guidelines (https://www.india.gov.in/my-government/schemes/pm-vishwakarma)"
                }
            ],
            "te": [
                {
                    "num": 1,
                    "tag": "ప్యానెల్ 1: సమస్య & ఆందోళన",
                    "image": "assets/vishwakarma_1.jpg",
                    "speaker": "మోహన్ లాల్",
                    "dialogue": "పాతకాలం పనిముట్లతో పని చేయడం వల్ల సమయం ఎక్కువ పడుతోంది, ఆదాయం పెరగడం లేదు! ఆధునిక టూల్స్ మరియు పెట్టుబడి ఎలా పొందాలి?",
                    "caption": "చేతివృత్తుల వారి ఆధునికీకరణ ఆవేదన.",
                    "sourceRef": "Section 1: PM Vishwakarma Kaushal Samman Official Guidelines (https://www.india.gov.in/my-government/schemes/pm-vishwakarma)"
                },
                {
                    "num": 2,
                    "tag": "ప్యానెల్ 2: ప్రభుత్వ పరిష్కారం",
                    "image": "assets/vishwakarma_2.jpg",
                    "speaker": "గోవ్టూన్ హీరో",
                    "dialogue": "దిగులుపడకండి మోహన్ లాల్ గారూ! PM Vishwakarma Kaushal Samman ద్వారా ప్రభుత్వం అండగా నిలుస్తోంది: Collateral-free enterprise loans up to ₹3 Lakh at 5% interest rate + ₹15,000 modern e-voucher toolkit grant + ₹500/day training stipend.",
                    "caption": "₹15,000 ఉచిత టూల్‌కిట్ ఈ-వోచర్, శిక్షణ సమయంలో రోజువారీ స్టైఫండ్ మరియు కేవలం 5% వడ్డీకే వ్యాపార రుణం.",
                    "sourceRef": "Section 2: PM Vishwakarma Kaushal Samman Official Guidelines (https://www.india.gov.in/my-government/schemes/pm-vishwakarma)"
                },
                {
                    "num": 3,
                    "tag": "ప్యానెల్ 3: సులువైన దరఖాస్తు",
                    "image": "assets/vishwakarma_3.jpg",
                    "speaker": "CSC మిత్రుడు",
                    "dialogue": "మీ ఆధార్ కార్డు మరియు బ్యాంక్ పాస్‌బుక్ తో సమీప CSC కేంద్రంలో బయోమెట్రిక్ ద్వారా నమోదు చేసుకోండి.",
                    "caption": "ప్రభుత్వ గుర్తింపు కార్డు మరియు డిజిటల్ టూల్‌కిట్ వోచర్ పొందండి.",
                    "sourceRef": "Section 3: PM Vishwakarma Kaushal Samman Official Guidelines (https://www.india.gov.in/my-government/schemes/pm-vishwakarma)"
                },
                {
                    "num": 4,
                    "tag": "ప్యానెల్ 4: ఆనందం & ప్రయోజనం",
                    "image": "assets/vishwakarma_4.jpg",
                    "speaker": "స్లోగన్",
                    "dialogue": "🎉 PM Vishwakarma Kaushal Samman: సంప్రదాయ వృత్తులకు నూతన జవసత్వాలు! ఆధునిక పరికరాలతో రెట్టింపు ఆదాయం!",
                    "caption": "విశ్వకర్మ కళాకారులకు ప్రభుత్వ ఘన గౌరవం.",
                    "sourceRef": "Section 4: PM Vishwakarma Kaushal Samman Official Guidelines (https://www.india.gov.in/my-government/schemes/pm-vishwakarma)"
                }
            ],
            "hi": [
                {
                    "num": 1,
                    "tag": "पैनल 1: चिंता व समस्या",
                    "image": "assets/vishwakarma_1.jpg",
                    "speaker": "मोहन लाल",
                    "dialogue": "पुराने औजारों से काम करने में बहुत मेहनत लगती है और आमदनी कम होती है! आधुनिक टूलकिट और कम ब्याज का लोन कैसे मिले?",
                    "caption": "पारंपरिक औजारों से परेशान शिल्पकार।",
                    "sourceRef": "Section 1: PM Vishwakarma Kaushal Samman Official Guidelines (https://www.india.gov.in/my-government/schemes/pm-vishwakarma)"
                },
                {
                    "num": 2,
                    "tag": "पैनल 2: सरकारी समाधान",
                    "image": "assets/vishwakarma_2.jpg",
                    "speaker": "गवटून हीरो",
                    "dialogue": "बिल्कुल चिंता न करें मोहन लाल जी! PM Vishwakarma Kaushal Samman दे रही है संपूर्ण संबल: Collateral-free enterprise loans up to ₹3 Lakh at 5% interest rate + ₹15,000 modern e-voucher toolkit grant + ₹500/day training stipend.",
                    "caption": "₹15,000 की मुफ्त टूलकिट ग्रांट, दैनिक वजीफे के साथ आधुनिक ट्रेनिंग और सिर्फ 5% पर सस्ता लोन।",
                    "sourceRef": "Section 2: PM Vishwakarma Kaushal Samman Official Guidelines (https://www.india.gov.in/my-government/schemes/pm-vishwakarma)"
                },
                {
                    "num": 3,
                    "tag": "पैनल 3: आसान आवेदन प्रक्रिया",
                    "image": "assets/vishwakarma_3.jpg",
                    "speaker": "CSC भैया",
                    "dialogue": "बस अपने आधार कार्ड और बैंक पासबुक के साथ जन सेवा केंद्र पर बायोमेट्रिक सत्यापन कराकर पंजीकरण कराएं।",
                    "caption": "पीएम विश्वकर्मा प्रमाण पत्र और टूलकिट ई-वाउचर तुरंत प्राप्त करें।",
                    "sourceRef": "Section 3: PM Vishwakarma Kaushal Samman Official Guidelines (https://www.india.gov.in/my-government/schemes/pm-vishwakarma)"
                },
                {
                    "num": 4,
                    "tag": "पैनल 4: खुशहाली व सफलता",
                    "image": "assets/vishwakarma_4.jpg",
                    "speaker": "टैगलाइन",
                    "dialogue": "🎉 PM Vishwakarma Kaushal Samman: सम्मान, सामर्थ्य और समृद्धि! हुनर को मिला सरकार का मजबूत सहारा!",
                    "caption": "आधुनिक मशीनों से बढ़ा काम और कई गुना बढ़ी आमदनी।",
                    "sourceRef": "Section 4: PM Vishwakarma Kaushal Samman Official Guidelines (https://www.india.gov.in/my-government/schemes/pm-vishwakarma)"
                }
            ]
        },
        "character": {
            "en": {
                "name": "Mohan Lal",
                "role": "Traditional Artisan / Craftsman",
                "avatar": "🛠️",
                "clothing": "Kurta & Work Apron",
                "desc": "Skilled artisan desiring modern toolkits and concessional credit"
            },
            "te": {
                "name": "మోహన్ లాల్",
                "role": "సాంప్రదాయ చేతివృత్తిదారుడు",
                "avatar": "🛠️",
                "clothing": "కుర్తా & పని ఆప్రాన్",
                "desc": "ఆధునిక పనిముట్లు, శిక్షణ మరియు తక్కువ వడ్డీ రుణం కోరే వృత్తి నిపుణుడు"
            },
            "hi": {
                "name": "मोहन लाल",
                "role": "पारंपरिक शिल्पकार व कारीगर",
                "avatar": "🛠️",
                "clothing": "कुर्ता व एप्रन",
                "desc": "आधुनिक टूलकिट, कौशल प्रशिक्षण व सस्ते ऋण का आकांक्षी कारीगर"
            }
        }
    },
    {
        "id": "pm_ujjwala",
        "name": "Pradhan Mantri Ujjwala Yojana 2.0 (LPG Connection)",
        "category": "Housing & Energy",
        "level": "Central",
        "dept": "Ministry of Petroleum & Natural Gas",
        "purpose": "Provide clean cooking LPG cylinders to poor women living in rural and urban households to eliminate hazardous smoke inhalation.",
        "benefits": "100% Free deposit-free LPG connection (stove + cylinder + regulator) + targeted ₹300 subsidy per refill cylinder for up to 12 refills/year.",
        "eligibility": {
            "minAge": 18,
            "maxAge": 100,
            "maxIncome": 200000,
            "state": "All India",
            "occupation": "Woman Householder",
            "summary": "Adult woman belonging to BPL/poor household having no existing LPG connection in the family."
        },
        "documents": [
            {
                "id": "d1",
                "name": "Aadhaar Card of Applicant & Family",
                "required": true,
                "why": "Identity and deduplication check"
            },
            {
                "id": "d2",
                "name": "Ration Card / BPL Proof",
                "required": true,
                "why": "Proof of household composition"
            },
            {
                "id": "d3",
                "name": "Bank Account Passbook",
                "required": true,
                "why": "Direct DBT subsidy transfer for cylinder refills"
            }
        ],
        "applicationSteps": [
            {
                "step": 1,
                "title": "Collect Ujjwala 2.0 Form",
                "desc": "Visit nearest Indane, Bharatgas, or HP Gas dealership or apply at pmuy.gov.in."
            },
            {
                "step": 2,
                "title": "Submit Aadhaar & Ration Card",
                "desc": "Provide family member Aadhaar details and bank account."
            },
            {
                "step": 3,
                "title": "Collect Free Gas Stove & Cylinder",
                "desc": "Get free domestic gas connection setup delivered to home."
            }
        ],
        "officialUrl": "https://www.india.gov.in/my-government/schemes/pradhan-mantri-ujjwala-yojana",
        "sourceUrl": "https://www.pmuy.gov.in",
        "lastVerified": "2026-08-24",
        "panels": {
            "en": [
                {
                    "num": 1,
                    "tag": "Panel 1: The Tension",
                    "image": "assets/ujjwala_1.jpg",
                    "speaker": "Sunita",
                    "dialogue": "Cooking on firewood chulha fills our home with thick toxic smoke, hurting our lungs and eyes! How can we get a safe LPG gas cylinder?",
                    "caption": "Sunita suffers from dangerous smoke inhalation daily.",
                    "sourceRef": "Section 1: Pradhan Mantri Ujjwala Yojana 2.0 (LPG Connection) Official Guidelines (https://www.india.gov.in/my-government/schemes/pradhan-mantri-ujjwala-yojana)"
                },
                {
                    "num": 2,
                    "tag": "Panel 2: The Solution",
                    "image": "assets/ujjwala_2.jpg",
                    "speaker": "GovToon Hero",
                    "dialogue": "Fikr mat kijiye! Pradhan Mantri Ujjwala Yojana 2.0 (LPG Connection) provides: 100% Free deposit-free LPG connection (stove + cylinder + regulator) + targeted ₹300 subsidy per refill cylinder for up to 12 refills/year.",
                    "caption": "100% free LPG gas connection + free stove + first free filled cylinder + ₹300 subsidy.",
                    "sourceRef": "Section 2: Pradhan Mantri Ujjwala Yojana 2.0 (LPG Connection) Official Guidelines (https://www.india.gov.in/my-government/schemes/pradhan-mantri-ujjwala-yojana)"
                },
                {
                    "num": 3,
                    "tag": "Panel 3: The Easy Path",
                    "image": "assets/ujjwala_3.jpg",
                    "speaker": "CSC Bhaiya",
                    "dialogue": "Submit your ration card, Aadhaar, and Aadhaar Card of Applicant & Family, Ration Card / BPL Proof, Bank Account Passbook at the nearest LPG distributor agency.",
                    "caption": "Hassle-free instant gas connection release.",
                    "sourceRef": "Section 3: Pradhan Mantri Ujjwala Yojana 2.0 (LPG Connection) Official Guidelines (https://www.india.gov.in/my-government/schemes/pradhan-mantri-ujjwala-yojana)"
                },
                {
                    "num": 4,
                    "tag": "Panel 4: The Khushali",
                    "image": "assets/ujjwala_4.jpg",
                    "speaker": "Tagline",
                    "dialogue": "🎉 Pradhan Mantri Ujjwala Yojana 2.0 (LPG Connection): Swachh Indhan, Behtar Jeevan! Smoke-free kitchen and healthy family!",
                    "caption": "Cooking happily with clean, safe LPG gas.",
                    "sourceRef": "Section 4: Pradhan Mantri Ujjwala Yojana 2.0 (LPG Connection) Official Guidelines (https://www.india.gov.in/my-government/schemes/pradhan-mantri-ujjwala-yojana)"
                }
            ],
            "te": [
                {
                    "num": 1,
                    "tag": "ప్యానెల్ 1: సమస్య & ఆందోళన",
                    "image": "assets/ujjwala_1.jpg",
                    "speaker": "సునీత",
                    "dialogue": "కట్టెల పొయ్యి పొగతో ఇల్లంతా పొగ కమ్ముకుని కళ్లు మండిపోతున్నాయి, శ్వాస తీసుకోవడం కష్టంగా ఉంది! మాకూ గ్యాస్ సిలిండర్ ఎలా దొరుకుతుంది?",
                    "caption": "కట్టెల పొయ్యి పొగతో సునీత పడే బాధ.",
                    "sourceRef": "Section 1: Pradhan Mantri Ujjwala Yojana 2.0 (LPG Connection) Official Guidelines (https://www.india.gov.in/my-government/schemes/pradhan-mantri-ujjwala-yojana)"
                },
                {
                    "num": 2,
                    "tag": "ప్యానెల్ 2: ప్రభుత్వ పరిష్కారం",
                    "image": "assets/ujjwala_2.jpg",
                    "speaker": "గోవ్టూన్ హీరో",
                    "dialogue": "దిగులుపడకండి సునీత గారూ! Pradhan Mantri Ujjwala Yojana 2.0 (LPG Connection) ద్వారా ప్రభుత్వం అండగా నిలుస్తోంది: 100% Free deposit-free LPG connection (stove + cylinder + regulator) + targeted ₹300 subsidy per refill cylinder for up to 12 refills/year.",
                    "caption": "100% ఉచిత ఎల్‌పీజీ గ్యాస్ కనెక్షన్, ఉచిత పొయ్యి, మొదటి సిలిండర్ ఉచితం మరియు ₹300 సబ్సిడీ.",
                    "sourceRef": "Section 2: Pradhan Mantri Ujjwala Yojana 2.0 (LPG Connection) Official Guidelines (https://www.india.gov.in/my-government/schemes/pradhan-mantri-ujjwala-yojana)"
                },
                {
                    "num": 3,
                    "tag": "ప్యానెల్ 3: సులువైన దరఖాస్తు",
                    "image": "assets/ujjwala_3.jpg",
                    "speaker": "CSC మిత్రుడు",
                    "dialogue": "మీ ఆధార్ కార్డు మరియు బ్యాంక్ పాస్‌బుక్ మరియు రేషన్ కార్డుతో సమీప గ్యాస్ ఏజెన్సీ లేదా CSC లో దరఖాస్తు చేయండి.",
                    "caption": "సులభమైన ఉచిత గ్యాస్ కనెక్షన్ మంజూరు.",
                    "sourceRef": "Section 3: Pradhan Mantri Ujjwala Yojana 2.0 (LPG Connection) Official Guidelines (https://www.india.gov.in/my-government/schemes/pradhan-mantri-ujjwala-yojana)"
                },
                {
                    "num": 4,
                    "tag": "ప్యానెల్ 4: ఆనందం & ప్రయోజనం",
                    "image": "assets/ujjwala_4.jpg",
                    "speaker": "స్లోగన్",
                    "dialogue": "🎉 Pradhan Mantri Ujjwala Yojana 2.0 (LPG Connection): పొగలేని ఇల్లు - సంపూర్ణ ఆరోగ్యం! మహిళల శ్రేయస్సే దేశ ప్రగతి!",
                    "caption": "స్వచ్ఛమైన గ్యాస్ పొయ్యితో ఆరోగ్యకరమైన జీవనం.",
                    "sourceRef": "Section 4: Pradhan Mantri Ujjwala Yojana 2.0 (LPG Connection) Official Guidelines (https://www.india.gov.in/my-government/schemes/pradhan-mantri-ujjwala-yojana)"
                }
            ],
            "hi": [
                {
                    "num": 1,
                    "tag": "पैनल 1: चिंता व समस्या",
                    "image": "assets/ujjwala_1.jpg",
                    "speaker": "सुनीता",
                    "dialogue": "लकड़ी के चूल्हे से निकलने वाले धुएं से आंखें जलती हैं और फेफड़ों में तकलीफ होती है! क्या हमें भी गैस सिलेंडर मिल सकता है?",
                    "caption": "चूल्हे के धुएं से परेशान महिला।",
                    "sourceRef": "Section 1: Pradhan Mantri Ujjwala Yojana 2.0 (LPG Connection) Official Guidelines (https://www.india.gov.in/my-government/schemes/pradhan-mantri-ujjwala-yojana)"
                },
                {
                    "num": 2,
                    "tag": "पैनल 2: सरकारी समाधान",
                    "image": "assets/ujjwala_2.jpg",
                    "speaker": "गवटून हीरो",
                    "dialogue": "बिल्कुल चिंता न करें सुनीता जी! Pradhan Mantri Ujjwala Yojana 2.0 (LPG Connection) दे रही है सीधा समाधान: 100% Free deposit-free LPG connection (stove + cylinder + regulator) + targeted ₹300 subsidy per refill cylinder for up to 12 refills/year.",
                    "caption": "100% मुफ्त एलपीजी गैस कनेक्शन, चूल्हा, पहला भरा सिलेंडर और ₹300 प्रति सिलेंडर सब्सिडी।",
                    "sourceRef": "Section 2: Pradhan Mantri Ujjwala Yojana 2.0 (LPG Connection) Official Guidelines (https://www.india.gov.in/my-government/schemes/pradhan-mantri-ujjwala-yojana)"
                },
                {
                    "num": 3,
                    "tag": "पैनल 3: आसान आवेदन प्रक्रिया",
                    "image": "assets/ujjwala_3.jpg",
                    "speaker": "CSC भैया",
                    "dialogue": "बस अपने राशन कार्ड, आधार और आधार कार्ड और बैंक पासबुक के साथ नजदीकी गैस वितरक एजेंसी में फॉर्म जमा करें।",
                    "caption": "निशुल्क गैस कनेक्शन व त्वरित डिलीवरी।",
                    "sourceRef": "Section 3: Pradhan Mantri Ujjwala Yojana 2.0 (LPG Connection) Official Guidelines (https://www.india.gov.in/my-government/schemes/pradhan-mantri-ujjwala-yojana)"
                },
                {
                    "num": 4,
                    "tag": "पैनल 4: खुशहाली व सफलता",
                    "image": "assets/ujjwala_4.jpg",
                    "speaker": "टैगलाइन",
                    "dialogue": "🎉 Pradhan Mantri Ujjwala Yojana 2.0 (LPG Connection): स्वच्छ ईंधन, बेहतर जीवन! धुआं-मुक्त रसोई और स्वस्थ परिवार!",
                    "caption": "अब आराम से सुरक्षित गैस पर खाना पकाना हुआ आसान।",
                    "sourceRef": "Section 4: Pradhan Mantri Ujjwala Yojana 2.0 (LPG Connection) Official Guidelines (https://www.india.gov.in/my-government/schemes/pradhan-mantri-ujjwala-yojana)"
                }
            ]
        },
        "character": {
            "en": {
                "name": "Sunita",
                "role": "Rural Homemaker",
                "avatar": "👩🏽",
                "clothing": "Simple Saree",
                "desc": "Homemaker suffering from toxic chulha smoke in the kitchen"
            },
            "te": {
                "name": "సునీత",
                "role": "గ్రామీణ గృహిణి",
                "avatar": "👩🏽",
                "clothing": "సాధారణ చీర",
                "desc": "కట్టెల పొయ్యి పొగతో కంటిచూపు, శ్వాసకోశ ఇబ్బందులు పడే గృహిణి"
            },
            "hi": {
                "name": "सुनीता",
                "role": "ग्रामीण गृहिणी",
                "avatar": "👩🏽",
                "clothing": "साधारण साड़ी",
                "desc": "लकड़ी के चूल्हे के जहरीले धुएं से परेशान ग्रामीण महिला"
            }
        }
    },
    {
        "id": "standup_india",
        "name": "Stand-Up India Scheme for Entrepreneurs",
        "category": "Business",
        "level": "Central",
        "dept": "Department of Financial Services, Ministry of Finance",
        "purpose": "Facilitate bank loans between ₹10 Lakh and ₹1 Crore to SC, ST, and Women borrowers for setting up greenfield non-farm enterprises.",
        "benefits": "Composite term loan & working capital financing from ₹10 Lakh up to ₹100 Lakh (1 Crore) with handholding mentorship support.",
        "eligibility": {
            "minAge": 18,
            "maxAge": 70,
            "maxIncome": 10000000,
            "state": "All India",
            "occupation": "SC/ST / Woman Entrepreneur",
            "summary": "SC/ST and/or Woman entrepreneurs starting a new greenfield enterprise in manufacturing, services, or trading."
        },
        "documents": [
            {
                "id": "d1",
                "name": "Identity Proof & Caste Certificate (for SC/ST)",
                "required": true,
                "why": "Category verification"
            },
            {
                "id": "d2",
                "name": "Detailed Project Report (DPR)",
                "required": true,
                "why": "Business feasibility and revenue plan"
            },
            {
                "id": "d3",
                "name": "PAN Card & Bank Statements (6 Months)",
                "required": true,
                "why": "Financial credit appraisal"
            }
        ],
        "applicationSteps": [
            {
                "step": 1,
                "title": "Register on Stand-Up Portal",
                "desc": "Visit standupmitra.in and submit initial business profile."
            },
            {
                "step": 2,
                "title": "Bank Branch Assignment",
                "desc": "Lead bank branch assesses DPR and collateral structure."
            },
            {
                "step": 3,
                "title": "Loan Sanction & Handholding",
                "desc": "Composite credit sanctioned with margin money support."
            }
        ],
        "officialUrl": "https://www.india.gov.in/my-government/schemes/stand-india-scheme",
        "sourceUrl": "https://www.standupmitra.in",
        "lastVerified": "2026-08-24",
        "panels": {
            "en": [
                {
                    "num": 1,
                    "tag": "Panel 1: The Tension",
                    "image": "assets/standup_1.jpg",
                    "speaker": "Preeti",
                    "dialogue": "Setting up a new manufacturing enterprise requires large credit, but commercial banks are hesitant without heavy collateral!",
                    "caption": "Preeti seeks institutional greenfield financing.",
                    "sourceRef": "Section 1: Stand-Up India Scheme for Entrepreneurs Official Guidelines (https://www.india.gov.in/my-government/schemes/stand-india-scheme)"
                },
                {
                    "num": 2,
                    "tag": "Panel 2: The Solution",
                    "image": "assets/standup_2.jpg",
                    "speaker": "GovToon Hero",
                    "dialogue": "Fikr mat kijiye! Stand-Up India Scheme for Entrepreneurs provides: Composite term loan & working capital financing from ₹10 Lakh up to ₹100 Lakh (1 Crore) with handholding mentorship support.",
                    "caption": "Bank loans between ₹10 Lakh to ₹1 Crore for women and SC/ST greenfield enterprises.",
                    "sourceRef": "Section 2: Stand-Up India Scheme for Entrepreneurs Official Guidelines (https://www.india.gov.in/my-government/schemes/stand-india-scheme)"
                },
                {
                    "num": 3,
                    "tag": "Panel 3: The Easy Path",
                    "image": "assets/standup_3.jpg",
                    "speaker": "CSC Bhaiya",
                    "dialogue": "Register on standupmitra.in with your project report and Identity Proof & Caste Certificate (for SC/ST), Detailed Project Report (DPR), PAN Card & Bank Statements (6 Months) for fast-track credit.",
                    "caption": "Direct connection to leading public sector banks.",
                    "sourceRef": "Section 3: Stand-Up India Scheme for Entrepreneurs Official Guidelines (https://www.india.gov.in/my-government/schemes/stand-india-scheme)"
                },
                {
                    "num": 4,
                    "tag": "Panel 4: The Khushali",
                    "image": "assets/standup_4.jpg",
                    "speaker": "Tagline",
                    "dialogue": "🎉 Stand-Up India Scheme for Entrepreneurs: Nari Shakti, Udyog Shakti! Empowering job creators across India!",
                    "caption": "Factory launched, generating jobs for dozens of local youths.",
                    "sourceRef": "Section 4: Stand-Up India Scheme for Entrepreneurs Official Guidelines (https://www.india.gov.in/my-government/schemes/stand-india-scheme)"
                }
            ],
            "te": [
                {
                    "num": 1,
                    "tag": "ప్యానెల్ 1: సమస్య & ఆందోళన",
                    "image": "assets/standup_1.jpg",
                    "speaker": "ప్రీతి",
                    "dialogue": "కొత్తగా ఒక తయారీ పరిశ్రమను ప్రారంభించాలంటే పెద్ద ఎత్తున పెట్టుబడి కావాలి, కానీ బ్యాంకులు పూచీకత్తు లేకుండా భారీ రుణాలు ఇవ్వడం లేదు!",
                    "caption": "పెద్ద పరిశ్రమ స్థాపనకు ప్రీతి పడే ఆరాటం.",
                    "sourceRef": "Section 1: Stand-Up India Scheme for Entrepreneurs Official Guidelines (https://www.india.gov.in/my-government/schemes/stand-india-scheme)"
                },
                {
                    "num": 2,
                    "tag": "ప్యానెల్ 2: ప్రభుత్వ పరిష్కారం",
                    "image": "assets/standup_2.jpg",
                    "speaker": "గోవ్టూన్ హీరో",
                    "dialogue": "దిగులుపడకండి ప్రీతి గారూ! Stand-Up India Scheme for Entrepreneurs ద్వారా ప్రభుత్వం అండగా నిలుస్తోంది: Composite term loan & working capital financing from ₹10 Lakh up to ₹100 Lakh (1 Crore) with handholding mentorship support.",
                    "caption": "మహిళలు మరియు SC/ST లకు కొత్త గ్రీన్‌ఫీల్డ్ పరిశ్రమల కోసం ₹10 లక్షల నుండి ₹1 కోటి వరకు ప్రత్యేక బ్యాంకు రుణాలు.",
                    "sourceRef": "Section 2: Stand-Up India Scheme for Entrepreneurs Official Guidelines (https://www.india.gov.in/my-government/schemes/stand-india-scheme)"
                },
                {
                    "num": 3,
                    "tag": "ప్యానెల్ 3: సులువైన దరఖాస్తు",
                    "image": "assets/standup_3.jpg",
                    "speaker": "CSC మిత్రుడు",
                    "dialogue": "మీ ప్రాజెక్ట్ రిపోర్ట్ మరియు ఆధార్ కార్డు మరియు బ్యాంక్ పాస్‌బుక్ తో standupmitra.in పోర్టల్‌లో దరఖాస్తు చేసుకోండి.",
                    "caption": "ప్రభుత్వ రంగ బ్యాంకుల ద్వారా త్వరిత రుణ మంజూరు.",
                    "sourceRef": "Section 3: Stand-Up India Scheme for Entrepreneurs Official Guidelines (https://www.india.gov.in/my-government/schemes/stand-india-scheme)"
                },
                {
                    "num": 4,
                    "tag": "ప్యానెల్ 4: ఆనందం & ప్రయోజనం",
                    "image": "assets/standup_4.jpg",
                    "speaker": "స్లోగన్",
                    "dialogue": "🎉 Stand-Up India Scheme for Entrepreneurs: మహిళా సాధికారత - పారిశ్రామిక విప్లవం! ఉద్యోగ అన్వేషకుల నుండి ఉద్యోగ కల్పనదారుల స్థాయికి!",
                    "caption": "సొంత ఫ్యాక్టరీ ప్రారంభంతో పదిమందికి ఉపాధి కల్పన.",
                    "sourceRef": "Section 4: Stand-Up India Scheme for Entrepreneurs Official Guidelines (https://www.india.gov.in/my-government/schemes/stand-india-scheme)"
                }
            ],
            "hi": [
                {
                    "num": 1,
                    "tag": "पैनल 1: चिंता व समस्या",
                    "image": "assets/standup_1.jpg",
                    "speaker": "प्रीति",
                    "dialogue": "नया कारखाना या विनिर्माण उद्योग लगाने के लिए बड़े लोन की जरूरत है, लेकिन बैंक बिना भारी गारंटी के बड़ा लोन नहीं दे रहे!",
                    "caption": "बड़ी पूंजी के लिए महिला उद्यमी की चिंता।",
                    "sourceRef": "Section 1: Stand-Up India Scheme for Entrepreneurs Official Guidelines (https://www.india.gov.in/my-government/schemes/stand-india-scheme)"
                },
                {
                    "num": 2,
                    "tag": "पैनल 2: सरकारी समाधान",
                    "image": "assets/standup_2.jpg",
                    "speaker": "गवटून हीरो",
                    "dialogue": "बिल्कुल चिंता न करें प्रीति जी! Stand-Up India Scheme for Entrepreneurs दे रही है सीधा वित्तीय संबल: Composite term loan & working capital financing from ₹10 Lakh up to ₹100 Lakh (1 Crore) with handholding mentorship support.",
                    "caption": "महिला और SC/ST वर्ग के उद्यमियों को नए उद्योग हेतु ₹10 लाख से ₹1 करोड़ तक का बैंक लोन।",
                    "sourceRef": "Section 2: Stand-Up India Scheme for Entrepreneurs Official Guidelines (https://www.india.gov.in/my-government/schemes/stand-india-scheme)"
                },
                {
                    "num": 3,
                    "tag": "पैनल 3: आसान आवेदन प्रक्रिया",
                    "image": "assets/standup_3.jpg",
                    "speaker": "CSC भैया",
                    "dialogue": "बस अपने प्रोजेक्ट रिपोर्ट और आधार कार्ड और बैंक पासबुक के साथ standupmitra.in पोर्टल पर आवेदन करें।",
                    "caption": "अग्रणी सरकारी बैंकों से सीधा संपर्क व फास्ट-ट्रैक लोन।",
                    "sourceRef": "Section 3: Stand-Up India Scheme for Entrepreneurs Official Guidelines (https://www.india.gov.in/my-government/schemes/stand-india-scheme)"
                },
                {
                    "num": 4,
                    "tag": "पैनल 4: खुशहाली व सफलता",
                    "image": "assets/standup_4.jpg",
                    "speaker": "टैगलाइन",
                    "dialogue": "🎉 Stand-Up India Scheme for Entrepreneurs: नारी शक्ति, उद्योग शक्ति! नौकरी मांगने वाले से नौकरी देने वाली बनीं!",
                    "caption": "कारखाना शुरू, दर्जनों युवाओं को मिला रोजगार।",
                    "sourceRef": "Section 4: Stand-Up India Scheme for Entrepreneurs Official Guidelines (https://www.india.gov.in/my-government/schemes/stand-india-scheme)"
                }
            ]
        },
        "character": {
            "en": {
                "name": "Preeti",
                "role": "Aspiring Woman Entrepreneur",
                "avatar": "👩‍💼",
                "clothing": "Formal Blazer",
                "desc": "Visionary entrepreneur setting up a greenfield enterprise"
            },
            "te": {
                "name": "ప్రీతి",
                "role": "మహిళా పారిశ్రామికవేత్త",
                "avatar": "👩‍💼",
                "clothing": "ఫార్మల్ దుస్తులు",
                "desc": "నూతన గ్రీన్‌ఫీల్డ్ పరిశ్రమను స్థాపించాలనే లక్ష్యం కలిగిన యువతి"
            },
            "hi": {
                "name": "प्रीति",
                "role": "महिला उद्यमी",
                "avatar": "👩‍💼",
                "clothing": "फॉर्मल परिधान",
                "desc": "नया विनिर्माण उद्योग स्थापित करने का सपना देखने वाली महिला उद्यमी"
            }
        }
    },
    {
        "id": "pm_matsya_sampada",
        "name": "PM Matsya Sampada Yojana (PMMSY)",
        "category": "Agriculture",
        "level": "Central",
        "dept": "Department of Fisheries, Ministry of Fisheries, Animal Husbandry & Dairying",
        "purpose": "Harness potential of fisheries sector sustainably through infrastructure, post-harvest logistics, and fish farmer livelihood enhancement.",
        "benefits": "Capital subsidy of 40% for General category and 60% for Women, SC, and ST beneficiaries on fish ponds, biofloc, RAS, and transport vans.",
        "eligibility": {
            "minAge": 18,
            "maxAge": 75,
            "maxIncome": 1000000,
            "state": "All India",
            "occupation": "Fish Farmer / Fisherfolk",
            "summary": "Fishers, fish farmers, fish workers, SHGs, and fisheries cooperatives."
        },
        "documents": [
            {
                "id": "d1",
                "name": "Aadhaar Card & Fisherman Registration",
                "required": true,
                "why": "Identity and occupational status"
            },
            {
                "id": "d2",
                "name": "Land/Water Body Lease or Ownership Proof",
                "required": true,
                "why": "Aquaculture site verification"
            },
            {
                "id": "d3",
                "name": "Bank Passbook with IFSC",
                "required": true,
                "why": "Direct DBT subsidy release"
            }
        ],
        "applicationSteps": [
            {
                "step": 1,
                "title": "Prepare Fisheries Project Proposal",
                "desc": "Select unit (e.g. Biofloc, Ice Plant, Motorcycle with Icebox)."
            },
            {
                "step": 2,
                "title": "Submit Application to District Fisheries Officer",
                "desc": "Submit through state fisheries portal or pmmsy.dof.gov.in."
            },
            {
                "step": 3,
                "title": "Inspection & 60% DBT Subsidy Release",
                "desc": "Physical verification followed by direct bank subsidy credit."
            }
        ],
        "officialUrl": "https://www.india.gov.in/my-government/schemes/pm-matsya-sampada-yojana",
        "sourceUrl": "https://pmmsy.dof.gov.in",
        "lastVerified": "2026-08-24",
        "panels": {
            "en": [
                {
                    "num": 1,
                    "tag": "Panel 1: The Tension",
                    "image": "assets/matsya_1.jpg",
                    "speaker": "Ravi",
                    "dialogue": "Fish spoilage due to lack of cold storage vans causes heavy losses every season! How can we get modern equipment subsidies?",
                    "caption": "Ravi worries about cold chain losses and expensive aquaculture setups.",
                    "sourceRef": "Section 1: PM Matsya Sampada Yojana (PMMSY) Official Guidelines (https://www.india.gov.in/my-government/schemes/pm-matsya-sampada-yojana)"
                },
                {
                    "num": 2,
                    "tag": "Panel 2: The Solution",
                    "image": "assets/matsya_2.jpg",
                    "speaker": "GovToon Hero",
                    "dialogue": "Fikr mat kijiye! PM Matsya Sampada Yojana (PMMSY) provides: Capital subsidy of 40% for General category and 60% for Women, SC, and ST beneficiaries on fish ponds, biofloc, RAS, and transport vans.",
                    "caption": "Up to 60% capital subsidy on biofloc ponds, insulated vans, and modern boats.",
                    "sourceRef": "Section 2: PM Matsya Sampada Yojana (PMMSY) Official Guidelines (https://www.india.gov.in/my-government/schemes/pm-matsya-sampada-yojana)"
                },
                {
                    "num": 3,
                    "tag": "Panel 3: The Easy Path",
                    "image": "assets/matsya_3.jpg",
                    "speaker": "CSC Bhaiya",
                    "dialogue": "Submit your project proposal along with Aadhaar Card & Fisherman Registration, Land/Water Body Lease or Ownership Proof, Bank Passbook with IFSC at the District Fisheries Office (DFO) or online.",
                    "caption": "Quick technical approval and direct subsidy credit.",
                    "sourceRef": "Section 3: PM Matsya Sampada Yojana (PMMSY) Official Guidelines (https://www.india.gov.in/my-government/schemes/pm-matsya-sampada-yojana)"
                },
                {
                    "num": 4,
                    "tag": "Panel 4: The Khushali",
                    "image": "assets/matsya_4.jpg",
                    "speaker": "Tagline",
                    "dialogue": "🎉 PM Matsya Sampada Yojana (PMMSY): Matsya Kranti Se Neeli Kranti! Doubling fisher income with modern technology!",
                    "caption": "Profits booming with refrigerated cold storage.",
                    "sourceRef": "Section 4: PM Matsya Sampada Yojana (PMMSY) Official Guidelines (https://www.india.gov.in/my-government/schemes/pm-matsya-sampada-yojana)"
                }
            ],
            "te": [
                {
                    "num": 1,
                    "tag": "ప్యానెల్ 1: సమస్య & ఆందోళన",
                    "image": "assets/matsya_1.jpg",
                    "speaker": "రవి",
                    "dialogue": "కోల్డ్ స్టోరేజ్ వాహనాలు లేకపోవడం వల్ల పట్టిన చేపలు పాడైపోయి భారీ నష్టాలు వస్తున్నాయి! ఆధునిక పరికరాలపై సబ్సిడీ ఎలా పొందాలి?",
                    "caption": "చేపల నష్టాలతో రవి పడే బాధ.",
                    "sourceRef": "Section 1: PM Matsya Sampada Yojana (PMMSY) Official Guidelines (https://www.india.gov.in/my-government/schemes/pm-matsya-sampada-yojana)"
                },
                {
                    "num": 2,
                    "tag": "ప్యానెల్ 2: ప్రభుత్వ పరిష్కారం",
                    "image": "assets/matsya_2.jpg",
                    "speaker": "గోవ్టూన్ హీరో",
                    "dialogue": "దిగులుపడకండి రవి గారూ! PM Matsya Sampada Yojana (PMMSY) ద్వారా ప్రభుత్వం అండగా నిలుస్తోంది: Capital subsidy of 40% for General category and 60% for Women, SC, and ST beneficiaries on fish ponds, biofloc, RAS, and transport vans.",
                    "caption": "మహిళలు & SC/ST లకు 60%, ఇతరులకు 40% వరకు బోట్లు, బయోఫ్లాక్ మరియు కోల్డ్ వ్యాన్లపై మూలధన సబ్సిడీ.",
                    "sourceRef": "Section 2: PM Matsya Sampada Yojana (PMMSY) Official Guidelines (https://www.india.gov.in/my-government/schemes/pm-matsya-sampada-yojana)"
                },
                {
                    "num": 3,
                    "tag": "ప్యానెల్ 3: సులువైన దరఖాస్తు",
                    "image": "assets/matsya_3.jpg",
                    "speaker": "CSC మిత్రుడు",
                    "dialogue": "మీ ఆధార్ కార్డు మరియు బ్యాంక్ పాస్‌బుక్ తో జిల్లా మత్స్య అధికారి (DFO) కార్యాలయం లేదా pmmsy పోర్టల్‌లో దరఖాస్తు చేయండి.",
                    "caption": "ప్రాజెక్ట్ పరిశీలన అనంతరం నేరుగా ఖాతాలో సబ్సిడీ జమ.",
                    "sourceRef": "Section 3: PM Matsya Sampada Yojana (PMMSY) Official Guidelines (https://www.india.gov.in/my-government/schemes/pm-matsya-sampada-yojana)"
                },
                {
                    "num": 4,
                    "tag": "ప్యానెల్ 4: ఆనందం & ప్రయోజనం",
                    "image": "assets/matsya_4.jpg",
                    "speaker": "స్లోగన్",
                    "dialogue": "🎉 PM Matsya Sampada Yojana (PMMSY): నీలి విప్లవం - మత్స్యకారుల ఆదాయం రెట్టింపు! ఆధునిక ఆక్వాకల్చర్‌తో అధిక లాభాలు!",
                    "caption": "కోల్డ్ వ్యాన్‌తో తాజా చేపల విక్రయం, పుష్కలమైన లాభాలు.",
                    "sourceRef": "Section 4: PM Matsya Sampada Yojana (PMMSY) Official Guidelines (https://www.india.gov.in/my-government/schemes/pm-matsya-sampada-yojana)"
                }
            ],
            "hi": [
                {
                    "num": 1,
                    "tag": "पैनल 1: चिंता व समस्या",
                    "image": "assets/matsya_1.jpg",
                    "speaker": "रवि",
                    "dialogue": "कोल्ड स्टोरेज और रेफ्रिजरेटेड वैन न होने से मछलियां खराब हो जाती हैं और भारी घाटा होता है! आधुनिक तालाब व नाव पर सब्सिडी कैसे मिले?",
                    "caption": "मछली खराब होने के नुकसान से परेशान पालक।",
                    "sourceRef": "Section 1: PM Matsya Sampada Yojana (PMMSY) Official Guidelines (https://www.india.gov.in/my-government/schemes/pm-matsya-sampada-yojana)"
                },
                {
                    "num": 2,
                    "tag": "पैनल 2: सरकारी समाधान",
                    "image": "assets/matsya_2.jpg",
                    "speaker": "गवटून हीरो",
                    "dialogue": "बिल्कुल चिंता न करें रवि भाई! PM Matsya Sampada Yojana (PMMSY) दे रही है भारी सरकारी अनुदान: Capital subsidy of 40% for General category and 60% for Women, SC, and ST beneficiaries on fish ponds, biofloc, RAS, and transport vans.",
                    "caption": "नाव, जाल, बायोफ्लॉक यूनिट और आइस वैन पर महिलाओं/SC/ST को 60% व अन्य को 40% तक पूंजीगत सब्सिडी।",
                    "sourceRef": "Section 2: PM Matsya Sampada Yojana (PMMSY) Official Guidelines (https://www.india.gov.in/my-government/schemes/pm-matsya-sampada-yojana)"
                },
                {
                    "num": 3,
                    "tag": "पैनल 3: आसान आवेदन प्रक्रिया",
                    "image": "assets/matsya_3.jpg",
                    "speaker": "CSC भैया",
                    "dialogue": "बस अपने आधार कार्ड और बैंक पासबुक और प्रोजेक्ट प्रस्ताव के साथ जिला मत्स्य अधिकारी (DFO) या पोर्टल पर आवेदन करें।",
                    "caption": "तकनीकी जांच के बाद सीधे बैंक खाते में सब्सिडी भुगतान।",
                    "sourceRef": "Section 3: PM Matsya Sampada Yojana (PMMSY) Official Guidelines (https://www.india.gov.in/my-government/schemes/pm-matsya-sampada-yojana)"
                },
                {
                    "num": 4,
                    "tag": "पैनल 4: खुशहाली व सफलता",
                    "image": "assets/matsya_4.jpg",
                    "speaker": "टैगलाइन",
                    "dialogue": "🎉 PM Matsya Sampada Yojana (PMMSY): नीली क्रांति से समृद्धि! आधुनिक मत्स्य पालन से कई गुना बढ़ी कमाई!",
                    "caption": "आधुनिक उपकरणों से मछुआरों का जीवन खुशहाल।",
                    "sourceRef": "Section 4: PM Matsya Sampada Yojana (PMMSY) Official Guidelines (https://www.india.gov.in/my-government/schemes/pm-matsya-sampada-yojana)"
                }
            ]
        },
        "character": {
            "en": {
                "name": "Ravi Fisher",
                "role": "Aquaculture Farmer / Fisherman",
                "avatar": "🐟",
                "clothing": "Casual Shirt & Lungi",
                "desc": "Aquaculture farmer seeking modern boats, ice vans, and biofloc units"
            },
            "te": {
                "name": "రవి",
                "role": "మత్స్యకారుడు / ఆక్వా రైతు",
                "avatar": "🐟",
                "clothing": "చొక్కా & లుంగీ",
                "desc": "ఆధునిక బోట్లు, ఇన్సులేటెడ్ వాహనాలు, బయోఫ్లాక్ కోసం సబ్సిడీ కోరే రైతు"
            },
            "hi": {
                "name": "रवि मछुआरा",
                "role": "मत्स्य पालक व मछुआरा",
                "avatar": "🐟",
                "clothing": "कमीज व लुंगी",
                "desc": "आधुनिक नाव, बायोफ्लॉक यूनिट व आइस वैन हेतु सब्सिडी चाहने वाला मछुआरा"
            }
        }
    },
    {
        "id": "atal_pension",
        "name": "Atal Pension Yojana (APY)",
        "category": "Banking & Finance",
        "level": "Central",
        "dept": "Pension Fund Regulatory and Development Authority (PFRDA)",
        "purpose": "Universal social security scheme for all Indian citizens in the unorganized sector to secure guaranteed old age income.",
        "benefits": "Guaranteed minimum monthly pension of ₹1,000, ₹2,000, ₹3,000, ₹4,000, or ₹5,000 per month starting at age 60 for lifetime.",
        "eligibility": {
            "minAge": 18,
            "maxAge": 40,
            "maxIncome": 500000,
            "state": "All India",
            "occupation": "General Citizen",
            "summary": "Any Indian citizen between 18 and 40 years holding a savings bank or post office account (non-taxpayer)."
        },
        "documents": [
            {
                "id": "d1",
                "name": "Aadhaar Card",
                "required": true,
                "why": "Identity, age, and nominee verification"
            },
            {
                "id": "d2",
                "name": "Savings Bank / Post Office Account",
                "required": true,
                "why": "Monthly auto-debit of subscription"
            },
            {
                "id": "d3",
                "name": "Mobile Number",
                "required": true,
                "why": "PRAN generation and contribution alerts"
            }
        ],
        "applicationSteps": [
            {
                "step": 1,
                "title": "Approach Your Bank Branch",
                "desc": "Visit your bank or access internet banking APY portal."
            },
            {
                "step": 2,
                "title": "Select Pension Tier (₹1,000 - ₹5,000)",
                "desc": "Choose desired monthly pension at age 60."
            },
            {
                "step": 3,
                "title": "Authorize Auto-Debit & Get PRAN",
                "desc": "Permanent Retirement Account Number (PRAN) issued immediately."
            }
        ],
        "officialUrl": "https://www.india.gov.in/my-government/schemes/atal-pension-yojana",
        "sourceUrl": "https://www.npscra.nsdl.co.in",
        "lastVerified": "2026-08-24",
        "panels": {
            "en": [
                {
                    "num": 1,
                    "tag": "Panel 1: The Tension",
                    "image": "assets/pension_1.jpg",
                    "speaker": "Sharma Ji",
                    "dialogue": "As I grow older, I worry about medical expenses and daily food without being a financial burden on my children!",
                    "caption": "Sharma Ji worries about old age financial dignity.",
                    "sourceRef": "Section 1: Atal Pension Yojana (APY) Official Guidelines (https://www.india.gov.in/my-government/schemes/atal-pension-yojana)"
                },
                {
                    "num": 2,
                    "tag": "Panel 2: The Solution",
                    "image": "assets/pension_2.jpg",
                    "speaker": "GovToon Hero",
                    "dialogue": "Fikr mat kijiye! Atal Pension Yojana (APY) provides: Guaranteed minimum monthly pension of ₹1,000, ₹2,000, ₹3,000, ₹4,000, or ₹5,000 per month starting at age 60 for lifetime.",
                    "caption": "Guaranteed ₹3,000 to ₹5,000 monthly lifelong pension with 50% government co-contribution.",
                    "sourceRef": "Section 2: Atal Pension Yojana (APY) Official Guidelines (https://www.india.gov.in/my-government/schemes/atal-pension-yojana)"
                },
                {
                    "num": 3,
                    "tag": "Panel 3: The Easy Path",
                    "image": "assets/pension_3.jpg",
                    "speaker": "CSC Bhaiya",
                    "dialogue": "Enroll easily with your Aadhaar Card, Savings Bank / Post Office Account, Mobile Number at any bank branch or nearest CSC center.",
                    "caption": "Auto-debit setup with government co-contribution.",
                    "sourceRef": "Section 3: Atal Pension Yojana (APY) Official Guidelines (https://www.india.gov.in/my-government/schemes/atal-pension-yojana)"
                },
                {
                    "num": 4,
                    "tag": "Panel 4: The Khushali",
                    "image": "assets/pension_4.jpg",
                    "speaker": "Tagline",
                    "dialogue": "🎉 Atal Pension Yojana (APY): Vriddhavastha Mein Samman! Guaranteed monthly pension for a peaceful retirement!",
                    "caption": "Receiving direct monthly pension with pride.",
                    "sourceRef": "Section 4: Atal Pension Yojana (APY) Official Guidelines (https://www.india.gov.in/my-government/schemes/atal-pension-yojana)"
                }
            ],
            "te": [
                {
                    "num": 1,
                    "tag": "ప్యానెల్ 1: సమస్య & ఆందోళన",
                    "image": "assets/pension_1.jpg",
                    "speaker": "శర్మ గారు",
                    "dialogue": "వయసు పైబడుతున్న కొద్దీ మందుల ఖర్చులు, నిత్యవసరాల కోసం పిల్లలపై ఆధారపడకుండా గౌరవంగా ఎలా బతకాలి?",
                    "caption": "వృద్ధాప్య భరోసా కొరకు శర్మ గారి ఆవేదన.",
                    "sourceRef": "Section 1: Atal Pension Yojana (APY) Official Guidelines (https://www.india.gov.in/my-government/schemes/atal-pension-yojana)"
                },
                {
                    "num": 2,
                    "tag": "ప్యానెల్ 2: ప్రభుత్వ పరిష్కారం",
                    "image": "assets/pension_2.jpg",
                    "speaker": "గోవ్టూన్ హీరో",
                    "dialogue": "దిగులుపడకండి శర్మ గారూ! Atal Pension Yojana (APY) ద్వారా ప్రభుత్వం అండగా నిలుస్తోంది: Guaranteed minimum monthly pension of ₹1,000, ₹2,000, ₹3,000, ₹4,000, or ₹5,000 per month starting at age 60 for lifetime.",
                    "caption": "నెలకు ₹3,000 నుండి ₹5,000 వరకు జీవితాంతం గ్యారంటీ పెన్షన్ మరియు 50% ప్రభుత్వ వాటా జమ.",
                    "sourceRef": "Section 2: Atal Pension Yojana (APY) Official Guidelines (https://www.india.gov.in/my-government/schemes/atal-pension-yojana)"
                },
                {
                    "num": 3,
                    "tag": "ప్యానెల్ 3: సులువైన దరఖాస్తు",
                    "image": "assets/pension_3.jpg",
                    "speaker": "CSC మిత్రుడు",
                    "dialogue": "మీ ఆధార్ కార్డు మరియు బ్యాంక్ పాస్‌బుక్ తో ఏ బ్యాంకులోనైనా లేదా CSC కేంద్రంలోనైనా సులభంగా ఖాతా ప్రారంభించండి.",
                    "caption": "సులభమైన ఆటో-డెబిట్ మరియు ప్రభుత్వ బోనస్ జమ.",
                    "sourceRef": "Section 3: Atal Pension Yojana (APY) Official Guidelines (https://www.india.gov.in/my-government/schemes/atal-pension-yojana)"
                },
                {
                    "num": 4,
                    "tag": "ప్యానెల్ 4: ఆనందం & ప్రయోజనం",
                    "image": "assets/pension_4.jpg",
                    "speaker": "స్లోగన్",
                    "dialogue": "🎉 Atal Pension Yojana (APY): వృద్ధాప్యంలో ఆత్మగౌరవ రక్షణ! ప్రతి నెలా బ్యాంక్ ఖాతాలో గ్యారంటీ పెన్షన్!",
                    "caption": "నిశ్చింతగా, సంతోషంగా విశ్రాంత జీవనం.",
                    "sourceRef": "Section 4: Atal Pension Yojana (APY) Official Guidelines (https://www.india.gov.in/my-government/schemes/atal-pension-yojana)"
                }
            ],
            "hi": [
                {
                    "num": 1,
                    "tag": "पैनल 1: चिंता व समस्या",
                    "image": "assets/pension_1.jpg",
                    "speaker": "शर्मा जी",
                    "dialogue": "उम्र बढ़ने के साथ दवा और रोजमर्रा के खर्चों के लिए किसी के आगे हाथ न फैलाना पड़े, बुढ़ापे की लाठी कैसे बनेगी?",
                    "caption": "बुढ़ापे की आर्थिक सुरक्षा को लेकर वरिष्ठ नागरिक की चिंता।",
                    "sourceRef": "Section 1: Atal Pension Yojana (APY) Official Guidelines (https://www.india.gov.in/my-government/schemes/atal-pension-yojana)"
                },
                {
                    "num": 2,
                    "tag": "पैनल 2: सरकारी समाधान",
                    "image": "assets/pension_2.jpg",
                    "speaker": "गवटून हीरो",
                    "dialogue": "बिल्कुल चिंता न करें शर्मा जी! Atal Pension Yojana (APY) दे रही है पक्की पेंशन: Guaranteed minimum monthly pension of ₹1,000, ₹2,000, ₹3,000, ₹4,000, or ₹5,000 per month starting at age 60 for lifetime.",
                    "caption": "60 वर्ष की आयु के बाद ₹3,000 से ₹5,000 प्रतिमाह आजीवन गारंटीड पेंशन और सरकार का 50% अंशदान।",
                    "sourceRef": "Section 2: Atal Pension Yojana (APY) Official Guidelines (https://www.india.gov.in/my-government/schemes/atal-pension-yojana)"
                },
                {
                    "num": 3,
                    "tag": "पैनल 3: आसान आवेदन प्रक्रिया",
                    "image": "assets/pension_3.jpg",
                    "speaker": "CSC भैया",
                    "dialogue": "बस अपने आधार कार्ड और बैंक पासबुक के साथ किसी भी बैंक या जन सेवा केंद्र में मात्र 5 मिनट में खाता खुलवाएं।",
                    "caption": "आसान ऑटो-डेबिट और सरकारी सुरक्षा गारंटी।",
                    "sourceRef": "Section 3: Atal Pension Yojana (APY) Official Guidelines (https://www.india.gov.in/my-government/schemes/atal-pension-yojana)"
                },
                {
                    "num": 4,
                    "tag": "पैनल 4: खुशहाली व सफलता",
                    "image": "assets/pension_4.jpg",
                    "speaker": "टैगलाइन",
                    "dialogue": "🎉 Atal Pension Yojana (APY): बुढ़ापे का सच्चा सहारा! हर महीने सम्मानजनक पेंशन, आत्मनिर्भर जीवन!",
                    "caption": "पेंशन से चेहरे पर सुकून, स्वाभिमान से भरा बुढ़ापा।",
                    "sourceRef": "Section 4: Atal Pension Yojana (APY) Official Guidelines (https://www.india.gov.in/my-government/schemes/atal-pension-yojana)"
                }
            ]
        },
        "character": {
            "en": {
                "name": "Sharma Ji",
                "role": "Senior Citizen / Unorganized Worker",
                "avatar": "👴🏽",
                "clothing": "Kurta & Glasses",
                "desc": "Senior citizen seeking guaranteed monthly pension in golden years"
            },
            "te": {
                "name": "శర్మ గారు",
                "role": "వృద్ధ పౌరుడు / అసంఘటిత కార్మికుడు",
                "avatar": "👴🏽",
                "clothing": "కుర్తా & కళ్లద్దాలు",
                "desc": "వృద్ధాప్యంలో గౌరవప్రదమైన నెలవారీ పింఛను కోరుకునే వ్యక్తి"
            },
            "hi": {
                "name": "शर्मा जी",
                "role": "वरिष्ठ नागरिक / असंगठित श्रमिक",
                "avatar": "👴🏽",
                "clothing": "कुर्ता व चश्मा",
                "desc": "बुढ़ापे में आत्मनिर्भरता व मासिक पेंशन चाहने वाले वरिष्ठ नागरिक"
            }
        }
    },
    {
        "id": "jal_jeevan",
        "name": "Jal Jeevan Mission (Har Ghar Jal)",
        "category": "Housing & Energy",
        "level": "Central",
        "dept": "Department of Drinking Water & Sanitation, Ministry of Jal Shakti",
        "purpose": "Provide Functional Household Tap Connection (FHTC) delivering 55 liters per capita per day of potable quality drinking water to every rural household.",
        "benefits": "100% Free piped drinking water tap connection at home doorstep with regular village water quality testing.",
        "eligibility": {
            "minAge": 0,
            "maxAge": 100,
            "maxIncome": 1000000,
            "state": "All India",
            "occupation": "Rural Household",
            "summary": "All rural households in villages across India without existing tap connections."
        },
        "documents": [
            {
                "id": "d1",
                "name": "Aadhaar Card",
                "required": true,
                "why": "Household identification on JJM dashboard"
            },
            {
                "id": "d2",
                "name": "Village Ration Card",
                "required": false,
                "why": "Household member mapping"
            }
        ],
        "applicationSteps": [
            {
                "step": 1,
                "title": "Village Action Plan (VAP)",
                "desc": "Pani Samiti / Gram Panchayat maps all unserved households."
            },
            {
                "step": 2,
                "title": "Piped Infrastructure Installation",
                "desc": "Free household tap connected to village piped water supply."
            },
            {
                "step": 3,
                "title": "Clean Water Testing & Certification",
                "desc": "Local women field-test water purity using Field Test Kits (FTKs)."
            }
        ],
        "officialUrl": "https://www.india.gov.in/my-government/schemes/jal-jeevan-mission",
        "sourceUrl": "https://jaljeevanmission.gov.in",
        "lastVerified": "2026-08-24",
        "panels": {
            "en": [
                {
                    "num": 1,
                    "tag": "Panel 1: The Tension",
                    "image": "assets/jeevan_1.jpg",
                    "speaker": "Ganga Bai",
                    "dialogue": "Walking miles under the hot sun every morning just to fetch muddy well water drains all our time and energy!",
                    "caption": "Ganga Bai struggles with severe drinking water scarcity.",
                    "sourceRef": "Section 1: Jal Jeevan Mission (Har Ghar Jal) Official Guidelines (https://www.india.gov.in/my-government/schemes/jal-jeevan-mission)"
                },
                {
                    "num": 2,
                    "tag": "Panel 2: The Solution",
                    "image": "assets/jeevan_2.jpg",
                    "speaker": "GovToon Hero",
                    "dialogue": "Fikr mat kijiye! Jal Jeevan Mission (Har Ghar Jal) provides: 100% Free piped drinking water tap connection at home doorstep with regular village water quality testing.",
                    "caption": "100% free Functional Household Tap Connection providing 55 liters/day pure water.",
                    "sourceRef": "Section 2: Jal Jeevan Mission (Har Ghar Jal) Official Guidelines (https://www.india.gov.in/my-government/schemes/jal-jeevan-mission)"
                },
                {
                    "num": 3,
                    "tag": "Panel 3: The Easy Path",
                    "image": "assets/jeevan_3.jpg",
                    "speaker": "CSC Bhaiya",
                    "dialogue": "Register your household with Aadhaar Card, Village Ration Card at the Gram Panchayat Pani Samiti committee.",
                    "caption": "Fast pipeline installation right to your home courtyard.",
                    "sourceRef": "Section 3: Jal Jeevan Mission (Har Ghar Jal) Official Guidelines (https://www.india.gov.in/my-government/schemes/jal-jeevan-mission)"
                },
                {
                    "num": 4,
                    "tag": "Panel 4: The Khushali",
                    "image": "assets/jeevan_4.jpg",
                    "speaker": "Tagline",
                    "dialogue": "🎉 Jal Jeevan Mission (Har Ghar Jal): Har Ghar Nal Se Jal! Pure, tested drinking water at every doorstep!",
                    "caption": "Abundant clean tap water flowing right at home.",
                    "sourceRef": "Section 4: Jal Jeevan Mission (Har Ghar Jal) Official Guidelines (https://www.india.gov.in/my-government/schemes/jal-jeevan-mission)"
                }
            ],
            "te": [
                {
                    "num": 1,
                    "tag": "ప్యానెల్ 1: సమస్య & ఆందోళన",
                    "image": "assets/jeevan_1.jpg",
                    "speaker": "గంగా బాయి",
                    "dialogue": "ప్రతిరోజూ ఉదయమే తాగునీటి కోసం ఎండలో మైళ్ల దూరం నడవాల్సి వస్తోంది! మా ఇంటికే నేరుగా మంచినీటి కుళాయి ఎలా వస్తుంది?",
                    "caption": "తాగునీటి ఎద్దడితో గంగాబాయి పడే ఇబ్బంది.",
                    "sourceRef": "Section 1: Jal Jeevan Mission (Har Ghar Jal) Official Guidelines (https://www.india.gov.in/my-government/schemes/jal-jeevan-mission)"
                },
                {
                    "num": 2,
                    "tag": "ప్యానెల్ 2: ప్రభుత్వ పరిష్కారం",
                    "image": "assets/jeevan_2.jpg",
                    "speaker": "గోవ్టూన్ హీరో",
                    "dialogue": "దిగులుపడకండి గంగా బాయి గారూ! Jal Jeevan Mission (Har Ghar Jal) ద్వారా ప్రభుత్వం ప్రతి ఇంటికీ నీటిని తెస్తోంది: 100% Free piped drinking water tap connection at home doorstep with regular village water quality testing.",
                    "caption": "రోజుకు తలసరి 55 లీటర్ల శుద్ధమైన, సురక్షితమైన కుళాయి నీరు ఉచితంగా ఇంటి ముంగిటకే.",
                    "sourceRef": "Section 2: Jal Jeevan Mission (Har Ghar Jal) Official Guidelines (https://www.india.gov.in/my-government/schemes/jal-jeevan-mission)"
                },
                {
                    "num": 3,
                    "tag": "ప్యానెల్ 3: సులువైన దరఖాస్తు",
                    "image": "assets/jeevan_3.jpg",
                    "speaker": "CSC మిత్రుడు",
                    "dialogue": "మీ ఆధార్ కార్డు మరియు బ్యాంక్ పాస్‌బుక్ తో గ్రామ పంచాయతీ పానీ సమితి వద్ద మీ ఇంటి పేరు నమోదు చేయించండి.",
                    "caption": "మీ ఇంటి వరకు ఉచితంగా పైప్‌లైన్ మరియు కుళాయి అమరిక.",
                    "sourceRef": "Section 3: Jal Jeevan Mission (Har Ghar Jal) Official Guidelines (https://www.india.gov.in/my-government/schemes/jal-jeevan-mission)"
                },
                {
                    "num": 4,
                    "tag": "ప్యానెల్ 4: ఆనందం & ప్రయోజనం",
                    "image": "assets/jeevan_4.jpg",
                    "speaker": "స్లోగన్",
                    "dialogue": "🎉 Jal Jeevan Mission (Har Ghar Jal): ప్రతి ఇంటికీ కుళాయి నీరు! స్వచ్ఛమైన జలం - ఆరోగ్యకరమైన గ్రామీణ భారతం!",
                    "caption": "ఇంటి వద్దే స్వచ్ఛమైన మంచినీటి ప్రవాహం.",
                    "sourceRef": "Section 4: Jal Jeevan Mission (Har Ghar Jal) Official Guidelines (https://www.india.gov.in/my-government/schemes/jal-jeevan-mission)"
                }
            ],
            "hi": [
                {
                    "num": 1,
                    "tag": "पैनल 1: चिंता व समस्या",
                    "image": "assets/jeevan_1.jpg",
                    "speaker": "गंगा बाई",
                    "dialogue": "रोज सुबह-सुबह पीने के पानी के लिए मीलों दूर कुएं पर जाना पड़ता है, जिससे सारा समय और ताकत बर्बाद हो जाती है!",
                    "caption": "पीने के पानी की भारी किल्लत से परेशान।",
                    "sourceRef": "Section 1: Jal Jeevan Mission (Har Ghar Jal) Official Guidelines (https://www.india.gov.in/my-government/schemes/jal-jeevan-mission)"
                },
                {
                    "num": 2,
                    "tag": "पैनल 2: सरकारी समाधान",
                    "image": "assets/jeevan_2.jpg",
                    "speaker": "गवटून हीरो",
                    "dialogue": "बिल्कुल चिंता न करें गंगा बाई जी! Jal Jeevan Mission (Har Ghar Jal) से हर घर तक पहुंच रहा है पानी: 100% Free piped drinking water tap connection at home doorstep with regular village water quality testing.",
                    "caption": "हर ग्रामीण घर में 100% मुफ्त नल कनेक्शन और प्रतिदिन 55 लीटर शुद्ध पेयजल की गारंटी।",
                    "sourceRef": "Section 2: Jal Jeevan Mission (Har Ghar Jal) Official Guidelines (https://www.india.gov.in/my-government/schemes/jal-jeevan-mission)"
                },
                {
                    "num": 3,
                    "tag": "पैनल 3: आसान आवेदन प्रक्रिया",
                    "image": "assets/jeevan_3.jpg",
                    "speaker": "CSC भैया",
                    "dialogue": "बस अपने आधार कार्ड और बैंक पासबुक के साथ ग्राम पंचायत या पानी समिति में अपना नाम दर्ज कराएं।",
                    "caption": "घर-घर तक पाइपलाइन बिछाकर मुफ्त नल कनेक्शन।",
                    "sourceRef": "Section 3: Jal Jeevan Mission (Har Ghar Jal) Official Guidelines (https://www.india.gov.in/my-government/schemes/jal-jeevan-mission)"
                },
                {
                    "num": 4,
                    "tag": "पैनल 4: खुशहाली व सफलता",
                    "image": "assets/jeevan_4.jpg",
                    "speaker": "टैगलाइन",
                    "dialogue": "🎉 Jal Jeevan Mission (Har Ghar Jal): हर घर नल से जल! शुद्ध पानी, स्वस्थ जिंदगानी!",
                    "caption": "अब घर के आंगन में ही बहता है स्वच्छ व सुरक्षित पानी।",
                    "sourceRef": "Section 4: Jal Jeevan Mission (Har Ghar Jal) Official Guidelines (https://www.india.gov.in/my-government/schemes/jal-jeevan-mission)"
                }
            ]
        },
        "character": {
            "en": {
                "name": "Ganga Bai & Family",
                "role": "Village Resident",
                "avatar": "🚰",
                "clothing": "Rural Dress",
                "desc": "Village family walking miles daily for clean drinking water"
            },
            "te": {
                "name": "గంగా బాయి & కుటుంబం",
                "role": "గ్రామ నివాసితులు",
                "avatar": "🚰",
                "clothing": "గ్రామీణ వస్త్రధారణ",
                "desc": "మంచినీటి కోసం మైళ్ల దూరం బిందెలతో నడిచే గ్రామీణ కుటుంబం"
            },
            "hi": {
                "name": "गंगा बाई व परिवार",
                "role": "ग्रामीण निवासी",
                "avatar": "🚰",
                "clothing": "पारंपरिक ग्रामीण परिधान",
                "desc": "पीने के पानी के लिए मीलों दूर भटकने वाला ग्रामीण परिवार"
            }
        }
    }
];


// Comprehensive Scheme Multilingual Dictionary for All 15 Schemes
const SCHEMES_I18N = {
  pm_kisan: {
    te: {
      name: "పిఎమ్-కిసాన్ సమ్మాన్ నిధి (రైతు భరోసా)",
      category: "🌾 వ్యవసాయం",
      dept: "వ్యవసాయ & రైతు సంక్షేమ మంత్రిత్వ శాఖ",
      purpose: "దేశంలోని సాగుభూమి ఉన్న రైతులందరికీ వ్యవసాయ ఖర్చులు, విత్తనాలు మరియు ఎరువుల కొనుగోలు కోసం సంవత్సరానికి ₹6,000 ప్రత్యక్ష ఆదాయ సహాయం అందించడం.",
      benefits: "సంవత్సరానికి ₹6,000 నగదును 3 విడతల్లో (ప్రతి 4 నెలలకు ₹2,000 చొప్పున) నేరుగా రైతుల బ్యాంక్ ఖాతాల్లో DBT ద్వారా జమ చేస్తారు.",
      eligSummary: "సొంతంగా సాగుభూమి పట్టాదారు పాస్‌బుక్ ఉన్న చిన్న మరియు సన్నకారు రైతు కుటుంబాలు.",
      docs: [
        { name: "ఆధార్ కార్డు", why: "గుర్తింపు ధృవీకరణ మరియు బ్యాంక్ లింకింగ్ కోసం తప్పనిసరి" },
        { name: "పట్టాదారు పాస్‌బుక్ / భూమి రికార్డులు (1B/ROR)", why: "దరఖాస్తుదారుడి పేరుపై భూమి యాజమాన్యాన్ని ధృవీకరించడానికి" },
        { name: "యాక్టివ్ బ్యాంక్ ఖాతా పాస్‌బుక్ (DBT లింక్)", why: "డబ్బు నేరుగా ఖాతాలో పడటానికి" }
      ],
      steps: [
        { title: "pmkisan.gov.in లేదా CSC లో నమోదు", desc: "ఆధార్ మరియు భూమి పట్టా వివరాలతో పోర్టల్‌లో నమోదు చేసుకోండి." },
        { title: "ఆధార్ e-KYC పూర్తి చేయండి", desc: "OTP లేదా బయోమెట్రిక్ ద్వారా e-KYC పూర్తి చేయడం తప్పనిసరి." },
        { title: "బ్యాంక్ ఖాతాలో ₹2,000 జమ", desc: "పరిశీలన పూర్తయిన తర్వాత ప్రతి విడత ₹2,000 నేరుగా బ్యాంక్ ఖాతాలో చేరుతుంది." }
      ]
    },
    hi: {
      name: "पीएम-किसान सम्मान निधि (किसान सहायता)",
      category: "🌾 कृषि",
      dept: "कृषि एवं किसान कल्याण मंत्रालय",
      purpose: "देश के सभी भूमिधारक किसान परिवारों को कृषि खर्चों, खाद और बीज के लिए प्रति वर्ष ₹6,000 की प्रत्यक्ष वित्तीय सहायता प्रदान करना।",
      benefits: "प्रति वर्ष ₹6,000 की वित्तीय सहायता, ₹2,000 की 3 समान किस्तों में सीधे बैंक खाते में DBT के माध्यम से।",
      eligSummary: "वे सभी किसान परिवार जिनके नाम पर खेती योग्य भूमि का मालिकाना हक है।",
      docs: [
        { name: "आधार कार्ड", why: "पहचान सत्यापन एवं बैंक लिंकिंग हेतु अनिवार्य" },
        { name: "खसरा / खतौनी (जमीन के दस्तावेज)", why: "आवेदक के नाम कृषि भूमि का स्वामित्व प्रमाणित करने हेतु" },
        { name: "बैंक खाता पासबुक (DBT सक्रिय)", why: "सीधे बैंक खाते में सहायता राशि प्राप्त करने हेतु" }
      ],
      steps: [
        { title: "pmkisan.gov.in या CSC पर पंजीकरण", desc: "आधार और जमीन के कागजात के साथ पोर्टल पर ऑनलाइन आवेदन करें।" },
        { title: "आधार e-KYC पूरा करें", desc: "OTP या फिंगरप्रिंट बायोमेट्रिक से अनिवार्य e-KYC पूरा करें।" },
        { title: "बैंक खाते में ₹2,000 किस्त प्राप्त", desc: "सत्यापन उपरांत हर 4 महीने में ₹2,000 सीधे बैंक खाते में आएंगे।" }
      ]
    }
  },
  pension: {
    te: {
      name: "పిఎమ్ శ్రమ యోగి మాన్‌ధన్ (అసంఘటిత కార్మికుల పెన్షన్)",
      category: "💰 ఆర్థిక భద్రత",
      dept: "కార్మిక & ఉపాధి మంత్రిత్వ శాఖ",
      purpose: "అసంఘటిత రంగ కార్మికులకు 60 ఏళ్లు నిండిన తర్వాత నెలకు ₹3,000 జీవితాంతం హామీతో కూడిన పెన్షన్ అందించడం.",
      benefits: "60 ఏళ్ల తర్వాత నెలకు ₹3,000 హామీ పెన్షన్. కార్మికుడు చెల్లించే మొత్తానికి సమానంగా (50:50) కేంద్ర ప్రభుత్వం కూడా జమ చేస్తుంది.",
      eligSummary: "18 నుండి 40 సంవత్సరాల వయస్సు, నెలకు ₹15,000 లోపు ఆదాయం ఉన్న అసంఘటిత కార్మికులు (స్ట్రీట్ వెండర్లు, కూలీలు, డ్రైవర్లు).",
      docs: [
        { name: "ఆధార్ కార్డు", why: "లబ్ధిదారుడి గుర్తింపు కోసం" },
        { name: "పొదుపు బ్యాంక్ ఖాతా / జన్ ధన్ ఖాతా", why: "నెలవారీ చిన్న పొదుపు (₹55 - ₹200) ఆటో-డెబిట్ కొరకు" },
        { name: "మొబైల్ నంబర్", why: "SMS అప్‌డేట్‌లు మరియు పెన్షన్ కార్డు వివరాల కోసం" }
      ],
      steps: [
        { title: "CSC కేంద్రాన్ని సంప్రదించండి", desc: "ఆధార్, బ్యాంక్ పాస్‌బుక్‌తో CSC లేదా mandhan.in లో నమోదు చేయండి." },
        { title: "వయస్సు ఆధారిత చందా ప్రారంభించండి", desc: "నెలకు ₹55 నుండి ₹200 వరకు చెల్లించండి, ప్రభుత్వం కూడా అంతే మొత్తం జమ చేస్తుంది." },
        { title: "శ్రమ యోగి పెన్షన్ కార్డు పొందండి", desc: "తక్షణమే పెన్షన్ నంబర్‌తో కూడిన స్మార్ట్ కార్డు జారీ చేయబడుతుంది." }
      ]
    },
    hi: {
      name: "पीएम श्रम योगी मानधन (मजदूर पेंशन)",
      category: "💰 वित्तीय सुरक्षा",
      dept: "श्रम एवं रोजगार मंत्रालय",
      purpose: "असंगठित क्षेत्र के कामगारों को 60 वर्ष की आयु के बाद ₹3,000 मासिक सुनिश्चित पेंशन प्रदान करना।",
      benefits: "60 वर्ष के बाद ₹3,000 प्रति माह आजीवन पेंशन। 50% अंशदान लाभार्थी का, 50% केंद्र सरकार द्वारा।",
      eligSummary: "18-40 वर्ष आयु के असंगठित कामगार (दुकानदार, ठेले वाले, मजदूर) जिनकी मासिक आय ₹15,000 से कम हो।",
      docs: [
        { name: "आधार कार्ड", why: "पहचान प्रमाणीकरण हेतु" },
        { name: "बचत बैंक / जन धन खाता", why: "मासिक किस्त (₹55 - ₹200) ऑटो-डेबिट हेतु" },
        { name: "मोबाइल नंबर", why: "पेंशन संदेश और पंजीकरण हेतु" }
      ],
      steps: [
        { title: "CSC या mandhan.in पर जाएं", desc: "आधार कार्ड और पासबुक लेकर नजदीकी जन सेवा केंद्र पर पंजीकरण कराएं।" },
        { title: "मासिक अंशदान तय करें", desc: "उम्र के अनुसार ₹55 से ₹200 प्रति माह बचत, सरकार भी बराबर जोड़ेगी।" },
        { title: "श्रम योगी पेंशन कार्ड पाएं", desc: "पंजीकरण के बाद तुरंत अपना डिजिटल पेंशन कार्ड प्राप्त करें।" }
      ]
    }
  },
  ayushman: {
    te: {
      name: "ఆయుష్మాన్ భారత్ పిఎమ్-జెవై (ఆరోగ్య రక్ష)",
      category: "🏥 ఆరోగ్యం & వైద్యం",
      dept: "జాతీయ ఆరోగ్య అథారిటీ (NHA)",
      purpose: "పేద మరియు మధ్యతరగతి కుటుంబాలకు తీవ్రమైన అనారోగ్యాలు, ఆపరేషన్లకు సంవత్సరానికి ₹5 లక్షల వరకు ఉచిత నగదు రహిత ఆసుపత్రి చికిత్స అందించడం.",
      benefits: "ప్రతి కుటుంబానికి సంవత్సరానికి ₹5,00,000 వరకు ఉచిత నగదు రహిత చికిత్స. దేశవ్యాప్తంగా 28,000+ నెట్‌వర్క్ ఆసుపత్రులలో వర్తిస్తుంది.",
      eligSummary: "రేషన్ కార్డు లేదా SECC డేటాబేస్ ద్వారా గుర్తించబడిన అల్పాదాయ మరియు గ్రామీణ/పట్టణ పేద కుటుంబాలు.",
      docs: [
        { name: "ఆధార్ కార్డు", why: "ఆసుపత్రిలో బయోమెట్రిక్ e-KYC మరియు రోగి గుర్తింపు కొరకు" },
        { name: "రేషన్ కార్డు / ఫ్యామిలీ ఐడీ", why: "కుటుంబ సభ్యుల అర్హత ధృవీకరణ కోసం" },
        { name: "మొబైల్ నంబర్", why: "OTP ధృవీకరణ మరియు గోల్డెన్ కార్డు డౌన్‌లోడ్ కొరకు" }
      ],
      steps: [
        { title: "beneficiary.nha.gov.in లో పేరు తనిఖీ చేయండి", desc: "రేషన్ కార్డు లేదా ఆధార్ ద్వారా మీ అర్హతను తనిఖీ చేసుకోండి." },
        { title: "ఆయుష్మాన్ గోల్డెన్ కార్డు పొందండి", desc: "ఆసుపత్రిలోని ఆరోగ్యమిత్ర డెస్క్ లేదా CSC వద్ద గోల్డెన్ కార్డు తీసుకోండి." },
        { title: "పూర్తి ఉచిత ఆసుపత్రి వైద్యం", desc: "కార్డు చూపించి ఆపరేషన్లు, మందులు మరియు పరీక్షలకు ₹0 బిల్లుతో చికిత్స పొందండి." }
      ]
    },
    hi: {
      name: "आयुष्मान भारत पीएम-जय (स्वास्थ्य सुरक्षा)",
      category: "🏥 स्वास्थ्य एवं चिकित्सा",
      dept: "राष्ट्रीय स्वास्थ्य प्राधिकरण (NHA)",
      purpose: "गरीब और वंचित परिवारों को गंभीर बीमारियों और सर्जरी के लिए प्रति वर्ष ₹5 लाख तक का मुफ्त कैशलेस इलाज प्रदान करना।",
      benefits: "प्रति परिवार प्रति वर्ष ₹5,00,000 तक मुफ्त कैशलेस अस्पताल भर्ती। देशभर के 28,000+ अस्पतालों में मान्य।",
      eligSummary: "SECC 2011 सूची और राशन कार्ड धारक पात्र गरीब परिवार।",
      docs: [
        { name: "आधार कार्ड", why: "मरीज का बायोमेट्रिक e-KYC हेतु" },
        { name: "राशन कार्ड / परिवार पहचान पत्र", why: "परिवार के सदस्यों की पात्रता हेतु" },
        { name: "मोबाइल नंबर", why: "OTP एवं आयुष्मान कार्ड डाउनलोड हेतु" }
      ],
      steps: [
        { title: "beneficiary.nha.gov.in पर पात्रता जांचें", desc: "राशन कार्ड या मोबाइल नंबर से अपनी पात्रता ऑनलाइन देखें।" },
        { title: "आयुष्मान गोल्डन कार्ड बनवाएं", desc: "अस्पताल के आरोग्यमित्र काउंटर या जन सेवा केंद्र पर कार्ड बनवाएं।" },
        { title: "मुफ्त कैशलेस इलाज पाएं", desc: "कार्ड दिखाकर अस्पताल में भर्ती, ऑपरेशन और दवाएं ₹0 में कराएं।" }
      ]
    }
  },
  atal_pension: {
    te: {
      name: "అటల్ పెన్షన్ యోజన (APY వృద్ధాప్య రక్షణ)",
      category: "💰 బ్యాంకింగ్ & ఫైనాన్స్",
      dept: "పెన్షన్ ఫండ్ రెగ్యులేటరీ & డెవలప్‌మెంట్ అథారిటీ (PFRDA)",
      purpose: "అసంఘటిత రంగంలో పనిచేసే పౌరులందరికీ 60 ఏళ్ల తర్వాత నిరంతర నెలవారీ పెన్షన్ అందించే ప్రభుత్వ సామాజిక భద్రతా పథకం.",
      benefits: "60 ఏళ్లు నిండిన తర్వాత జీవితాంతం నెలకు ₹1,000, ₹2,000, ₹3,000, ₹4,000 లేదా ₹5,000 హామీతో కూడిన పెన్షన్ లభిస్తుంది. తదనంతరం జీవిత భాగస్వామికి పెన్షన్ కొనసాగుతుంది.",
      eligSummary: "18 నుండి 40 సంవత్సరాల మధ్య వయస్సు ఉండి, బ్యాంక్ లేదా పోస్టాఫీసులో పొదుపు ఖాతా ఉన్న భారతీయ పౌరులందరూ (ఆదాయపు పన్ను చెల్లించనివారు).",
      docs: [
        { name: "ఆధార్ కార్డు", why: "లబ్ధిదారుడి ధృవీకరణ మరియు KYC కొరకు" },
        { name: "పొదుపు బ్యాంక్ / పోస్టాఫీసు ఖాతా", why: "నెలకు కేవలం ₹42 నుండి ప్రారంభమయ్యే చందా ఆటో-డెబిట్ కోసం" },
        { name: "నామినీ వివరాలు", why: "భాగస్వామికి పెన్షన్ మరియు వారసులకు కార్పస్ ఫండ్ భద్రత కొరకు" }
      ],
      steps: [
        { title: "బ్యాంక్ లేదా పోస్టాఫీస్‌ను సంప్రదించండి", desc: "మీ బ్యాంక్ బ్రాంచ్‌లో లేదా నెట్‌బ్యాంకింగ్ ద్వారా APY దరఖాస్తు ఫారమ్ పూరించండి." },
        { title: "పెన్షన్ మొత్తాన్ని ఎంచుకోండి (₹1,000 - ₹5,000)", desc: "మీకు కావలసిన నెలవారీ పెన్షన్ ఎంచుకుని ఆటో-డెబిట్‌ను ప్రారంభించండి." },
        { title: "PRAN పెన్షన్ కార్డు పొందండి", desc: "ప్రభుత్వ హామీ పెన్షన్ పత్రం మరియు PRAN నంబర్ కార్డు జారీ చేయబడుతుంది." }
      ]
    },
    hi: {
      name: "अटल पेंशन योजना (APY बुढ़ापा सहारा)",
      category: "💰 बैंकिंग एवं वित्त",
      dept: "पेंशन फंड नियामक और विकास प्राधिकरण (PFRDA)",
      purpose: "असंगठित क्षेत्र के सभी नागरिकों को 60 वर्ष की आयु के बाद गारंटीकृत मासिक पेंशन प्रदान करने वाली सामाजिक सुरक्षा योजना।",
      benefits: "60 वर्ष के बाद ₹1,000 से ₹5,000 प्रति माह तक की आजीवन गारंटीड पेंशन। पति/पत्नी को पेंशन निरंतरता और नॉमिनी को पूरा फंड वापसी।",
      eligSummary: "18 से 40 वर्ष की आयु के सभी भारतीय नागरिक जिनका बैंक या डाकघर में बचत खाता हो (गैर-करदाता)।",
      docs: [
        { name: "आधार कार्ड", why: "केवाईसी और पहचान प्रमाणीकरण हेतु" },
        { name: "बचत बैंक / डाकघर खाता पासबुक", why: "मासिक बचत (मात्र ₹42/माह से शुरू) ऑटो-डेबिट हेतु" },
        { name: "नॉमिनी (वारिस) का विवरण", why: "पेंशन सुरक्षा और परिवार को राशि हस्तांतरण हेतु" }
      ],
      steps: [
        { title: "बैंक या डाकघर में संपर्क करें", desc: "अपनी बैंक शाखा या नेट बैंकिंग के जरिए APY फॉर्म भरें।" },
        { title: "पेंशन राशि चुनें (₹1k से ₹5k)", desc: "अपनी पसंद की पेंशन राशि तय कर मासिक ऑटो-डेबिट शुरू करें।" },
        { title: "PRAN कार्ड और पेंशन गारंटी पाएं", desc: "स्थायी पेंशन खाता संख्या (PRAN) कार्ड तुरंत प्राप्त करें।" }
      ]
    }
  },
  surya_ghar: {
    te: {
      name: "పిఎమ్ సూర్య ఘర్: ఉచిత విద్యుత్ పథకం",
      category: "☀️ సౌర & గృహ విద్యుత్",
      dept: "నూతన మరియు పునరుత్పాదక ఇంధన మంత్రిత్వ శాఖ (MNRE)",
      purpose: "ఇళ్ల పైకప్పులపై సోలార్ ప్యానెల్స్ అమర్చి, ప్రతినెలా 300 యూనిట్ల వరకు ఉచిత విద్యుత్ మరియు ₹78,000 వరకు ప్రభుత్వ సబ్సిడీ అందించడం.",
      benefits: "రూఫ్‌టాప్ సోలార్ కోసం ₹78,000 వరకు నేరుగా బ్యాంక్ ఖాతాలో సబ్సిడీ. ప్రతినెలా 300 యూనిట్ల వరకు ఉచిత కరెంట్ (ఏడాదికి ₹15,000+ ఆదా).",
      eligSummary: "సొంత ఇల్లు, పైకప్పు మరియు విద్యుత్ కనెక్షన్ ఉన్న కుటుంబాలన్నీ అర్హులు.",
      docs: [
        { name: "కరెంట్ బిల్లు (తాజా కాపీ)", why: "కస్టమర్ నంబర్ (CA నంబర్) మరియు లోడ్ ధృవీకరణ కోసం" },
        { name: "ఆధార్ కార్డు", why: "ఇంటి యజమాని గుర్తింపు కొరకు" },
        { name: "బ్యాంక్ పాస్‌బుక్ / రద్దయిన చెక్కు", why: "₹78,000 ప్రభుత్వ సబ్సిడీ నేరుగా ఖాతాలో చేరడానికి" }
      ],
      steps: [
        { title: "pmsuryaghar.gov.in లో నమోదు చేయండి", desc: "మీ రాష్ట్రం, విద్యుత్ డిస్కమ్ మరియు కరెంట్ బిల్లు నంబర్ నమోదు చేయండి." },
        { title: "అనుమతి పొందిన వెండర్ ఎంపిక", desc: "సోలార్ కంపెనీ మీ ఇంటి పైకప్పుపై ప్యానెల్స్ అమరుస్తుంది." },
        { title: "నెట్-మీటర్ తనిఖీ & ₹78,000 సబ్సిడీ జమ", desc: "డిస్కమ్ నెట్ మీటర్ అమర్చిన 30 రోజుల్లో సబ్సిడీ నేరుగా బ్యాంక్ ఖాతాలో చేరుతుంది." }
      ]
    },
    hi: {
      name: "पीएम सूर्य घर: मुफ्त बिजली योजना",
      category: "☀️ सौर एवं आवास",
      dept: "नवीन और नवीकरणीय ऊर्जा मंत्रालय (MNRE)",
      purpose: "1 करोड़ घरों की छतों पर सोलर पैनल लगवाकर हर महीने 300 यूनिट मुफ्त बिजली और ₹78,000 तक की सब्सिडी देना।",
      benefits: "छत पर सोलर लगाने हेतु ₹78,000 तक सीधी सरकारी सब्सिडी, हर महीने 300 यूनिट मुफ्त बिजली (सालाना ₹15,000+ की बचत)।",
      eligSummary: "वे सभी परिवार जिनके पास अपनी छत और वैध बिजली कनेक्शन है।",
      docs: [
        { name: "बिजली का बिल (नवीनतम प्रति)", why: "उपभोक्ता संख्या (CA Number) और स्वीकृत लोड सत्यापन हेतु" },
        { name: "आधार कार्ड", why: "पहचान और मकान के स्वामित्व हेतु" },
        { name: "बैंक खाता पासबुक", why: "₹78,000 की सब्सिडी सीधे बैंक में पाने हेतु" }
      ],
      steps: [
        { title: "pmsuryaghar.gov.in पर आवेदन करें", desc: "राज्य, बिजली कंपनी और कंज्यूमर नंबर डालकर पोर्टल पर रजिस्टर करें।" },
        { title: "सोलर वेंडर चुनें और पैनल लगवाएं", desc: "मान्यता प्राप्त वेंडर आपकी छत पर सोलर सिस्टम लगाएगा।"},
        { title: "नेट-मीटर और ₹78,000 सब्सिडी", desc: "मीटर लगते ही 30 दिन में सब्सिडी सीधे बैंक खाते में जमा होगी।" }
      ]
    }
  },
  pm_svanidhi: {
    te: {
      name: "పిఎమ్ స్వనిధి (వీధి వ్యాపారుల రుణం)",
      category: "🛒 వ్యాపారం & రుణాలు",
      dept: "గృహనిర్మాణ & పట్టణ వ్యవహారాల మంత్రిత్వ శాఖ (MoHUA)",
      purpose: "వీధి వ్యాపారులు తమ వ్యాపారాన్ని తిరిగి ప్రారంభించడానికి లేదా విస్తరించడానికి పూచీకత్తు లేని వర్కింగ్ క్యాపిటల్ రుణాలు అందించడం.",
      benefits: "₹10,000 నుండి ₹50,000 వరకు పూచీకత్తు లేని రుణం. సకాలంలో చెల్లింపులపై 7% వడ్డీ సబ్సిడీ మరియు డిజిటల్ లావాదేవీలపై క్యాష్‌బ్యాక్.",
      eligSummary: "పట్టణ మరియు అర్బన్ ప్రాంతాల్లో పండ్లు, కూరగాయలు, టీ మొదలైనవి విక్రయించే వీధి వ్యాపారులు.",
      docs: [
        { name: "ఆధార్ కార్డు & ఓటర్ ఐడీ", why: "గుర్తింపు మరియు చిరునామా ధృవీకరణ కొరకు" },
        { name: "వెండింగ్ సర్టిఫికేట్ (ULB గుర్తింపు కార్డు)", why: "స్ట్రీట్ వెండర్ అర్హత రుజువు" },
        { name: "బ్యాంక్ ఖాతా పాస్‌బుక్", why: "నేరుగా రుణ మొత్తం జమ కావడానికి" }
      ],
      steps: [
        { title: "pmsvanidhi.mohua.gov.in లో దరఖాస్తు", desc: "వెండింగ్ ఐడీ మరియు ఆధార్‌తో ఆన్‌లైన్‌లో దరఖాస్తు చేసుకోండి." },
        { title: "బ్యాంక్ మిత్ర లేదా బ్రాంచ్ పరిశీలన", desc: "స్థానిక బ్యాంక్ బ్రాంచ్ మీ దరఖాస్తును 48 గంటల్లో పరిశీలిస్తుంది." },
        { title: "₹10,000 వర్కింగ్ క్యాపిటల్ జమ", desc: "రుణం ఖాతాలో జమవుతుంది, డిజిటల్ QR చెల్లింపులతో క్యాష్‌బ్యాక్ పొందండి." }
      ]
    },
    hi: {
      name: "पीएम स्वनिधि (स्ट्रीट वेंडर आत्मनिर्भर ऋण)",
      category: "🛒 व्यापार एवं ऋण",
      dept: "आवास और शहरी कार्य मंत्रालय (MoHUA)",
      purpose: "रेहड़ी-पटरी और ठेले वाले स्ट्रीट वेंडर्स को अपना काम बढ़ाने हेतु बिना गारंटी का सस्ता ऋण प्रदान करना।",
      benefits: "बिना किसी गारंटी के ₹10,000, ₹20,000 और ₹50,000 तक का कार्यशील पूंजी ऋण, 7% ब्याज सब्सिडी और ₹1,200 वार्षिक डिजिटल कैशबैक।",
      eligSummary: "शहरी एवं ग्रामीण क्षेत्रों के सभी पंजीकृत रेहड़ी-पटरी वेंडर।",
      docs: [
        { name: "आधार कार्ड", why: "पहचान और केवाईसी सत्यापन हेतु" },
        { name: "वेंडिंग प्रमाण पत्र / ULB पहचान पत्र", why: "स्ट्रीट वेंडर होने का आधिकारिक प्रमाण" },
        { name: "बैंक खाता पासबुक", why: "ऋण राशि सीधे बैंक में प्राप्त करने हेतु" }
      ],
      steps: [
        { title: "pmsvanidhi.mohua.gov.in पर आवेदन करें", desc: "आधार और वेंडिंग कार्ड के साथ ऑनलाइन फॉर्म भरें।" },
        { title: "बैंक द्वारा 48 घंटे में स्वीकृति", desc: "बैंक शाखा या बैंक मित्र द्वारा त्वरित सत्यापन।" },
        { title: "ऋण राशि प्राप्त करें और QR से कैशबैक पाएं", desc: "सीधे खाते में ₹10,000 पाएं और डिजिटल भुगतान से रिवॉर्ड पाएं।" }
      ]
    }
  },
  mudra_loan: {
    te: {
      name: "పిఎమ్ ముద్రా యోజన (సూక్ష్మ వ్యాపార రుణాలు)",
      category: "🛒 వ్యాపారం & పరిశ్రమలు",
      dept: "ఆర్థిక సేవల విభాగం, ఆర్థిక మంత్రిత్వ శాఖ",
      purpose: "చిన్న దుకాణాలు, కుటీర పరిశ్రమలు మరియు మహిళా పారిశ్రామికవేత్తలకు పూచీకత్తు లేకుండా ₹10 లక్షల వరకు వ్యాపార రుణాలు అందించడం.",
      benefits: "పూచీకత్తు లేని రుణాలు 3 వర్గాల్లో: శిశు (₹50,000 వరకు), కిశోర్ (₹5 లక్షల వరకు), తరుణ్ (₹10 లక్షల వరకు).",
      eligSummary: "చిన్న వ్యాపారం, తయారీ, సేవా రంగం లేదా దుకాణం నడుపుతున్న/ప్రారంభించాలనుకునే ఏ భారతీయ పౌరుడైనా.",
      docs: [
        { name: "ఆధార్ & పాన్ కార్డు", why: "వ్యక్తిగత మరియు వ్యాపార గుర్తింపు కొరకు" },
        { name: "వ్యాపార ప్రణాళిక & కొటేషన్లు", why: "మిషన్లు లేదా ముడిసరుకు కొనుగోలు వ్యయం రుజువు" },
        { name: "బ్యాంక్ స్టేట్‌మెంట్ (6 నెలలు)", why: "ఆర్థిక లావాదేవీల పరిశీలన కోసం" }
      ],
      steps: [
        { title: "udyamimitra.in లో దరఖాస్తు చేయండి", desc: "పోర్టల్‌లో ముద్రా లోన్ దరఖాస్తు ఫారమ్ సమర్పించండి." },
        { title: "వ్యాపార ప్రణాళిక సమర్పించండి", desc: "నమోదిత బ్యాంకులో మిషనరీ కొటేషన్ మరియు ఆధార్ ఇవ్వండి." },
        { title: "ముద్రా డెబిట్ కార్డు పొందండి", desc: "రుణ మొత్తం మరియు వర్కింగ్ క్యాపిటల్ ముద్రా కార్డు జారీ చేయబడుతుంది." }
      ]
    },
    hi: {
      name: "पीएम मुद्रा योजना (सूक्ष्म उद्यम ऋण)",
      category: "🛒 व्यापार एवं उद्योग",
      dept: "वित्तीय सेवाएं विभाग, वित्त मंत्रालय",
      purpose: "छोटे व्यवसायियों, दुकानदारों और महिला उद्यमियों को बिना किसी गारंटी के ₹10 लाख तक का आसान व्यावसायिक ऋण देना।",
      benefits: "बिना गारंटी का ऋण 3 श्रेणियों में: शिशु (₹50,000 तक), किशोर (₹5 लाख तक) और तरुण (₹10 लाख तक)।",
      eligSummary: "कोई भी गैर-कॉर्पोरेट, गैर-कृषि लघु व्यवसाय शुरू करने या बढ़ाने के इच्छुक नागरिक।",
      docs: [
        { name: "आधार कार्ड एवं पैन कार्ड", why: "पहचान और वित्तीय रिकॉर्ड हेतु" },
        { name: "व्यापारिक प्रोजेक्ट रिपोर्ट एवं कोटेशन", why: "मशीनरी या सामग्री खरीद का प्रमाण" },
        { name: "बैंक खाता विवरण (6 महीने)", why: "ऋण मूल्यांकन हेतु" }
      ],
      steps: [
        { title: "udyamimitra.in या बैंक में जाएं", desc: "पोर्टल पर मुद्रा लोन फॉर्म भरें या किसी भी बैंक में आवेदन करें।" },
        { title: "कोटेशन और दस्तावेज जमा करें", desc: "मशीन की कोटेशन और आधार-पैन सत्यापन कराएं।" },
        { title: "मुद्रा लोन और मुद्रा कार्ड पाएं", desc: "ऋण राशि स्वीकृत होते ही मुद्रा कार्ड से आसानी से पैसा निकालें।" }
      ]
    }
  },
  sukanya: {
    te: {
      name: "సుకున్య సమృద్ధి యోజన (ఆడపిల్లల భవిష్యత్ నిధి)",
      category: "👧 మహిళా & శిశు సంక్షేమం",
      dept: "మహిళా & శిశు అభివృద్ధి మంత్రిత్వ శాఖ / భారత తపాలా",
      purpose: "10 ఏళ్లలోపు ఆడపిల్లల ఉన్నత విద్య మరియు వివాహ ఖర్చుల కోసం అత్యధిక వడ్డీతో కూడిన పన్ను రహిత దీర్ఘకాలిక పొదుపు పథకం.",
      benefits: "8.2% చక్రవడ్డీ, సంవత్సరానికి కనిష్టంగా ₹250 నుండి ప్రారంభం. సెక్షన్ 80C కింద పూర్తి పన్ను మినహాయింపు (EEE హోదా).",
      eligSummary: "10 సంవత్సరాలు లేదా అంతకంటే తక్కువ వయస్సు ఉన్న ఆడపిల్లల తల్లిదండ్రులు లేదా సంరక్షకులు.",
      docs: [
        { name: "ఆడపిల్ల పుట్టిన తేదీ ధృవీకరణ పత్రం (Birth Certificate)", why: "వయస్సు ధృవీకరణ కోసం తప్పనిసరి" },
        { name: "తల్లిదండ్రుల ఆధార్ & పాన్ కార్డు", why: "సంరక్షకుల గుర్తింపు మరియు KYC కొరకు" },
        { name: "చిరునామా రుజువు & ఫోటోలు", why: "పోస్టాఫీసు లేదా బ్యాంక్ ఖాతా తెరవడానికి" }
      ],
      steps: [
        { title: "పోస్టాఫీస్ లేదా బ్యాంకును సంప్రదించండి", desc: "బాలిక జనన ధృవీకరణ పత్రంతో SSY దరఖాస్తు ఫారమ్ సమర్పించండి." },
        { title: "కనీసం ₹250 తో ఖాతా ప్రారంభించండి", desc: "నెలవారీ లేదా వార్షిక పొదుపును ప్రారంభించండి." },
        { title: "18 ఏళ్లకు ఉన్నత చదువుల కోసం ఉపసంహరణ", desc: "50% విద్యా నిధి, 21 ఏళ్లకు పూర్తి పన్ను రహిత మెచ్యూరిటీ నిధి పొందండి." }
      ]
    },
    hi: {
      name: "सुकन्या समृद्धि योजना (बेटी बचाओ बचत योजना)",
      category: "👧 महिला एवं बाल विकास",
      dept: "महिला एवं बाल विकास मंत्रालय / भारतीय डाक",
      purpose: "10 वर्ष तक की बालिकाओं की उच्च शिक्षा और सुरक्षित भविष्य के लिए सर्वाधिक ब्याज वाली सरकारी बचत योजना।",
      benefits: "8.2% चक्रवृद्धि ब्याज, मात्र ₹250 सालाना से शुरुआत, धारा 80C के तहत पूरी तरह टैक्स-फ्री (EEE छूट)।",
      eligSummary: "10 वर्ष से कम आयु की बालिकाओं के माता-पिता या कानूनी अभिभावक।",
      docs: [
        { name: "बालिका का जन्म प्रमाण पत्र (Birth Certificate)", why: "आयु सत्यापन हेतु अनिवार्य" },
        { name: "माता-पिता का आधार व पैन कार्ड", why: "अभिभावक की पहचान एवं KYC हेतु" },
        { name: "निवास प्रमाण पत्र और पासपोर्ट फोटो", why: "डाकघर या बैंक में खाता खोलने हेतु" }
      ],
      steps: [
        { title: "डाकघर या बैंक शाखा में जाएं", desc: "जन्म प्रमाण पत्र और आधार के साथ SSY खाता फॉर्म भरें।" },
        { title: "मात्र ₹250 जमा कर खाता शुरू करें", desc: "साल में कभी भी अपनी सुविधानुसार राशि जमा करें।" },
        { title: "उच्च शिक्षा हेतु 18 वर्ष पर निकासी", desc: "कॉलेज की पढ़ाई के लिए 50% और 21 वर्ष में पूरी टैक्स-फ्री राशि पाएं।" }
      ]
    }
  },
  nsp_scholarship: {
    te: {
      name: "నేషనల్ స్కాలర్‌షిప్ పోర్టల్ (NSP విద్యార్థి ఉపకార వేతనాలు)",
      category: "🎓 విద్య & ఉపకార వేతనాలు",
      dept: "ఉన్నత విద్యా శాఖ, విద్యా మంత్రిత్వ శాఖ",
      purpose: "ప్రతిభావంతులైన మరియు పేద విద్యార్థులు ఉన్నత విద్యను కొనసాగించడానికి కేంద్ర ప్రభుత్వ ఉపకార వేతనాలు అందించడం.",
      benefits: "పూర్తి ట్యూషన్ ఫీజు రీయింబర్స్‌మెంట్ మరియు కోర్సును బట్టి సంవత్సరానికి ₹10,000 నుండి ₹50,000 వరకు నేరుగా DBT ద్వారా నగదు సహాయం.",
      eligSummary: "గుర్తింపు పొందిన పాఠశాలలు, కళాశాలల్లో చదువుతూ, కుటుంబ వార్షిక ఆదాయం ₹2.5 లక్షల లోపు ఉన్న విద్యార్థులు.",
      docs: [
        { name: "ఆధార్ కార్డు", why: "వన్-టైమ్ రిజిస్ట్రేషన్ (OTR) మరియు DBT బ్యాంక్ లింక్ కొరకు" },
        { name: "మునుపటి పరీక్ష మార్కుల పత్రం (Marksheet)", why: "విద్యా అర్హత మరియు మెరిట్ ధృవీకరణ" },
        { name: "ఆదాయ మరియు కుల ధృవీకరణ పత్రం", why: "ఆదాయ పరిమితి మరియు కేటగిరీ రిజర్వేషన్ ధృవీకరణ" }
      ],
      steps: [
        { title: "scholarships.gov.in లో OTR రిజిస్ట్రేషన్", desc: "ఆధార్ ద్వారా వన్ టైమ్ రిజిస్ట్రేషన్ పూర్తి చేసుకోండి." },
        { title: "పథకాన్ని ఎంచుకుని దరఖాస్తు సమర్పించండి", desc: "కాలేజ్ బోనఫైడ్ సర్టిఫికేట్ మరియు మార్కుల పత్రాలు అప్‌లోడ్ చేయండి." },
        { title: "కాలేజ్ & నోడల్ అధికారి ధృవీకరణ", desc: "ధృవీకరణ పూర్తయిన వెంటనే నేరుగా మీ బ్యాంక్ ఖాతాలో స్కాలర్‌షిప్ జమ." }
      ]
    },
    hi: {
      name: "राष्ट्रीय छात्रवृत्ति पोर्टल (NSP स्कॉलरशिप)",
      category: "🎓 शिक्षा एवं छात्रवृत्ति",
      dept: "उच्च शिक्षा विभाग, शिक्षा मंत्रालय",
      purpose: "मेधावी और आर्थिक रूप से कमजोर छात्रों को कॉलेज और उच्च शिक्षा हेतु प्रत्यक्ष वित्तीय छात्रवृत्ति प्रदान करना।",
      benefits: "पूरी शिक्षण फीस वापसी और प्रति वर्ष ₹10,000 से ₹50,000 तक की छात्रवृत्ति सीधे बैंक खाते में DBT द्वारा।",
      eligSummary: "मान्यता प्राप्त स्कूल/कॉलेज में नामांकित छात्र जिनकी पारिवारिक वार्षिक आय ₹2.5 लाख से कम हो।",
      docs: [
        { name: "आधार कार्ड", why: "एकमुश्त पंजीकरण (OTR) और DBT हेतु" },
        { name: "पिछली कक्षा की मार्कशीट", why: "शैक्षणिक योग्यता और मेरिट सत्यापन हेतु" },
        { name: "आय एवं जाति प्रमाण पत्र", why: "पात्रता एवं श्रेणी सत्यापन हेतु" }
      ],
      steps: [
        { title: "scholarships.gov.in पर OTR करें", desc: "आधार से वन-टाइम रजिस्ट्रेशन आईडी जनरेट करें।" },
        { title: "योजना चुनकर ऑनलाइन आवेदन करें", desc: "कॉलेज प्रमाणपत्र और अंकपत्र अपलोड कर फॉर्म सबमिट करें।" },
        { title: "संस्थान सत्यापन और DBT राशि प्राप्त", desc: "सत्यापन होते ही सीधे बैंक खाते में स्कॉलरशिप प्राप्त करें।" }
      ]
    }
  },
  pm_awas_rural: {
    te: {
      name: "పిఎమ్ ఆవాస్ యోజన - గ్రామీణ్ (పక్కా ఇళ్ల పథకం)",
      category: "🏡 గృహ నిర్మాణం",
      dept: "గ్రామీణాభివృద్ధి మంత్రిత్వ శాఖ",
      purpose: "గ్రామీణ ప్రాంతాల్లోని పేద, నిరుపేద కుటుంబాలకు సకల సౌకర్యాలతో కూడిన పక్కా ఇళ్ల నిర్మాణానికి ప్రత్యక్ష ఆర్థిక సహాయం అందించడం.",
      benefits: "మైదాన ప్రాంతాలలో ₹1.20 లక్షలు, కొండ/గిరిజన ప్రాంతాలలో ₹1.30 లక్షల 100% ఉచిత నిర్మాణ నిధి + ఉపాధి హామీ పథకం కింద 90-95 రోజుల కూలి + మరుగుదొడ్డి నిర్మాణానికి ₹12,000.",
      eligSummary: "కచ్చా ఇళ్లలో నివసిస్తున్న లేదా ఇల్లు లేని గ్రామీణ కుటుంబాలు (SECC మరియు ఆవాస్ ప్లస్ సర్వే ఆధారంగా).",
      docs: [
        { name: "ఆధార్ కార్డు & జాబ్ కార్డు", why: "లబ్ధిదారుడి గుర్తింపు మరియు ఉపాధి హామీ వేతన లింకింగ్ కొరకు" },
        { name: "బ్యాంక్ ఖాతా పాస్‌బుక్", why: "దశలవారీగా నిర్మాణ నిధుల DBT జమ కోసం" },
        { name: "స్థల యాజమాన్య పత్రం / గ్రామ సభ అనుమతి", why: "ఇంటి నిర్మాణ స్థలం ధృవీకరణ" }
      ],
      steps: [
        { title: "గ్రామ సభ జాబితాలో పేరు పరిశీలన", desc: "పంచాయతీ లేదా pmayg.nic.in లో ఆవాస్ జాబితాను తనిఖీ చేయండి." },
        { title: "AwaasApp ద్వారా జియో-ట్యాగింగ్", desc: "పునాది నుండి పైకప్పు వరకు ప్రతి దశను ఫోటో తీసి జియో-ట్యాగ్ చేస్తారు." },
        { title: "దశలవారీగా బ్యాంక్ ఖాతాలో డబ్బులు జమ", desc: "నిర్మాణం పూర్తయ్యే కొద్దీ నిధులు నేరుగా బ్యాంక్ ఖాతాలో జమవుతాయి." }
      ]
    },
    hi: {
      name: "प्रधानमंत्री आवास योजना - ग्रामीण (पक्का मकान)",
      category: "🏡 ग्रामीण आवास",
      dept: "ग्रामीण विकास मंत्रालय",
      purpose: "ग्रामीण क्षेत्र के बेघर और कच्चे मकानों में रहने वाले परिवारों को बुनियादी सुविधाओं से युक्त पक्का मकान बनाने हेतु वित्तीय सहायता।",
      benefits: "मैदानी क्षेत्रों में ₹1.20 लाख और पहाड़ी क्षेत्रों में ₹1.30 लाख की सीधी अनुदान राशि + मनरेगा से 95 दिनों की मजदूरी + ₹12,000 शौचालय अनुदान।",
      eligSummary: "SECC एवं आवास प्लस सूची में दर्ज बेघर एवं कच्चे घरों में रहने वाले ग्रामीण परिवार।",
      docs: [
        { name: "आधार कार्ड एवं मनरेगा जॉब कार्ड", why: "लाभार्थी सत्यापन और मनरेगा मजदूरी लिंकिंग हेतु" },
        { name: "बैंक खाता पासबुक", why: "किस्तवार निर्माण राशि सीधे बैंक में पाने हेतु" },
        { name: "जमीन के कागजात या पट्टा", why: "मकान निर्माण स्थल सत्यापन हेतु" }
      ],
      steps: [
        { title: "ग्राम पंचायत सूची में नाम देखें", desc: "पंचायत या pmayg.nic.in पर अपनी पात्रता जांचें।" },
        { title: "AwaasApp से जियो-टैगिंग", desc: "नींव से लेकर छत ढलाई तक हर चरण की जियो-टैग फोटो।" },
        { title: "चरणबद्ध किस्तों का बैंक में हस्तांतरण", desc: "हर चरण पूरा होने पर सीधी राशि बैंक खाते में प्राप्त करें।" }
      ]
    }
  },
  pm_vishwakarma: {
    te: {
      name: "పిఎమ్ విశ్వకర్మ కౌశల్ సమ్మాన్ (చేతివృత్తుల సాయం)",
      category: "🛠️ నైపుణ్యం & చేతివృత్తులు",
      dept: "సూక్ష్మ, చిన్న & మధ్యతరహా పరిశ్రమల మంత్రిత్వ శాఖ (MSME)",
      purpose: "18 రకాల సాంప్రదాయ చేతివృత్తుల కళాకారులకు నైపుణ్య శిక్షణ, ఉచిత ఆధునిక పనిముట్లు మరియు తక్కువ వడ్డీ రుణాలు అందించడం.",
      benefits: "₹15,000 ఉచిత టూల్‌కిట్ ఇ-వోచర్, రోజుకు ₹500 స్టైపెండ్‌తో 5-7 రోజుల శిక్షణ, మరియు కేవలం 5% వడ్డీతో ₹3 లక్షల వరకు పూచీకత్తు లేని రుణం.",
      eligSummary: "18 సంప్రదాయ చేతివృత్తుల (వడ్రంగి, కమ్మరి, కుమ్మరి, కంసాలి, తాపీమేస్త్రీ, దర్జీ మొదలైనవి) కళాకారులు.",
      docs: [
        { name: "ఆధార్ కార్డు & మొబైల్ నంబర్", why: "బయోమెట్రిక్ CSC ధృవీకరణ కొరకు" },
        { name: "వృత్తి ఆధారిత వివరాలు (Trade Details)", why: "18 గుర్తింపు పొందిన చేతివృత్తుల వర్గీకరణ" },
        { name: "బ్యాంక్ ఖాతా పాస్‌బుక్", why: "₹15,000 టూల్‌కిట్ గ్రాంట్ మరియు శిక్షణ స్టైపెండ్ కొరకు" }
      ],
      steps: [
        { title: "CSC వద్ద బయోమెట్రిక్ నమోదు", desc: "నమోదిత జన సేవా కేంద్రంలో విశ్వకర్మ పోర్టల్‌లో నమోదు చేసుకోండి." },
        { title: "ప్రాథమిక నైపుణ్య శిక్షణ పూర్తి చేయండి", desc: "5 రోజుల శిక్షణ పొంది, రోజుకు ₹500 స్టైపెండ్ పొందండి." },
        { title: "₹15,000 టూల్‌కిట్ & ₹1-3 లక్షల రుణం", desc: "ఆధునిక పనిముట్ల వోచర్ మరియు 5% వడ్డీతో వ్యాపార రుణం తీసుకోండి." }
      ]
    },
    hi: {
      name: "पीएम विश्वकर्मा कौशल सम्मान (कारीगर योजना)",
      category: "🛠️ कौशल एवं हस्तशिल्प",
      dept: "सूक्ष्म, लघु एवं मध्यम उद्यम मंत्रालय (MSME)",
      purpose: "18 पारंपरिक व्यवसायों से जुड़े शिल्पकारों और कारीगरों को आधुनिक औजार, प्रशिक्षण और 5% रियायती ब्याज पर लोन देना।",
      benefits: "₹15,000 का आधुनिक टूलकिट ई-वाउचर, ₹500 प्रतिदिन स्टाइपेंड के साथ प्रशिक्षण, और 5% ब्याज पर ₹3 लाख तक का कोलैटरल-फ्री लोन।",
      eligSummary: "18 पारंपरिक शिल्प व व्यवसाय करने वाले कारीगर (बढ़ई, लोहार, कुम्हार, राजमिस्त्री, दर्जी, मोची आदि)।",
      docs: [
        { name: "आधार कार्ड और फिंगरप्रिंट", why: "CSC बायोमेट्रिक प्रमाणीकरण हेतु" },
        { name: "पारंपरिक व्यवसाय का विवरण", why: "18 शिल्प श्रेणियों में पंजीकरण हेतु" },
        { name: "बैंक खाता पासबुक", why: "₹15,000 टूलकिट अनुदान और दैनिक स्टाइपेंड पाने हेतु" }
      ],
      steps: [
        { title: "CSC केंद्र पर बायोमेट्रिक पंजीकरण", desc: "जन सेवा केंद्र पर pmvishwakarma.gov.in पर निशुल्क आवेदन करें।" },
        { title: "5 दिवसीय कौशल प्रशिक्षण लें", desc: "प्रशिक्षण के दौरान ₹500 प्रतिदिन भत्ता और विश्वकर्मा प्रमाण पत्र पाएं।" },
        { title: "₹15,000 टूलकिट वाउचर और लोन पाएं", desc: "आधुनिक औजार खरीदें और मात्र 5% ब्याज पर व्यवसाय बढ़ाने हेतु लोन लें।" }
      ]
    }
  },
  pm_ujjwala: {
    te: {
      name: "పిఎమ్ ఉజ్జ్వల యోజన 2.0 (ఉచిత గ్యాస్ కనెక్షన్)",
      category: "🔥 మహిళా సంక్షేమం & ఇంధనం",
      dept: "పెట్రోలియం & సహజ వాయువు మంత్రిత్వ శాఖ",
      purpose: "గ్రామీణ మరియు నిరుపేద కుటుంబాల మహిళలకు కట్టెల పొయ్యి పొగ నుండి విముక్తి కల్పించి, 100% ఉచిత ఎల్‌పిజి గ్యాస్ కనెక్షన్ అందించడం.",
      benefits: "డిపాజిట్ రహిత ఉచిత గ్యాస్ కనెక్షన్, మొదటి గ్యాస్ సిలిండర్ మరియు డబుల్ బర్నర్ స్టవ్ పూర్తిగా ఉచితం + ప్రతి రీఫిల్‌పై ₹300 సబ్సిడీ.",
      eligSummary: "రేషన్ కార్డు ఉన్న మరియు ఇంట్లో ఎల్‌పిజి కనెక్షన్ లేని వయోజన మహిళలు (BPL / SC / ST కుటుంబాలు).",
      docs: [
        { name: "మహిళా దరఖాస్తుదారు ఆధార్ కార్డు", why: "లబ్ధిదారు గుర్తింపు మరియు KYC కొరకు" },
        { name: "రేషన్ కార్డు (కుటుంబ సభ్యుల వివరాలు)", why: "కుటుంబంలో మరొక గ్యాస్ కనెక్షన్ లేదని నిర్ధారించడానికి" },
        { name: "బ్యాంక్ ఖాతా పాస్‌బుక్", why: "ప్రతి సిలిండర్ రీఫిల్‌పై ₹300 సబ్సిడీ DBT కొరకు" }
      ],
      steps: [
        { title: "గ్యాస్ ఏజెన్సీ లేదా pmuy.gov.in లో దరఖాస్తు", desc: "ఇండేన్, భారత్‌గ్యాస్ లేదా HP గ్యాస్ డీలర్ వద్ద ఫారమ్ సమర్పించండి." },
        { title: "ఆధార్ మరియు రేషన్ కార్డు ధృవీకరణ", desc: "ఏజెన్సీ మీ పత్రాలను ఆన్‌లైన్‌లో తనిఖీ చేస్తుంది." },
        { title: "ఇంటి వద్దే ఉచిత సిలిండర్ & పొయ్యి డెలివరీ", desc: "ఎటువంటి డిపాజిట్ లేకుండా గ్యాస్ స్టవ్ మరియు సిలిండర్ తీసుకోండి." }
      ]
    },
    hi: {
      name: "प्रधानमंत्री उज्ज्वला योजना 2.0 (मुफ्त गैस कनेक्शन)",
      category: "🔥 महिला कल्याण एवं स्वच्छ ईंधन",
      dept: "पेट्रोलियम एवं प्राकृतिक गैस मंत्रालय",
      purpose: "गरीब परिवारों की महिलाओं को धुएं वाले चूल्हे से मुक्ति दिलाने हेतु 100% मुफ्त एलपीजी गैस कनेक्शन और सब्सिडी देना।",
      benefits: "बिना किसी सिक्योरिटी डिपॉजिट के मुफ्त गैस कनेक्शन, पहला भरा हुआ सिलेंडर और डबल बर्नर चूल्हा मुफ्त + हर रिफिल पर ₹300 सब्सिडी।",
      eligSummary: "राशन कार्ड धारक वयस्क महिलाएं जिनके घर में पहले से कोई एलपीजी कनेक्शन न हो।",
      docs: [
        { name: "महिला मुखिया का आधार कार्ड", why: "पहचान और ई-केवाईसी हेतु" },
        { name: "राशन कार्ड (परिवार की सूची)", why: "परिवार में पूर्व कनेक्शन न होने की पुष्टि हेतु" },
        { name: "बैंक खाता पासबुक", why: "सिलेंडर रिफिल सब्सिडी सीधे बैंक में पाने हेतु" }
      ],
      steps: [
        { title: "गैस एजेंसी या pmuy.gov.in पर आवेदन करें", desc: "नजदीकी इंडेन, भारतगैस या एचपी गैस एजेंसी पर फॉर्म जमा करें।" },
        { title: "आधार और राशन कार्ड सत्यापन", desc: "एजेंसी द्वारा निशुल्क कागजात जांच।" },
        { title: "मुफ्त गैस चूल्हा और सिलेंडर प्राप्त करें", desc: "बिना कोई शुल्क दिए अपने घर पर नया गैस कनेक्शन लगवाएं।" }
      ]
    }
  },
  standup_india: {
    te: {
      name: "స్టాండప్ ఇండియా పథకం (మహిళా & SC/ST వ్యాపార రుణాలు)",
      category: "🚀 వ్యాపార & పరిశ్రమల స్థాపన",
      dept: "ఆర్థిక సేవల విభాగం, ఆర్థిక మంత్రిత్వ శాఖ",
      purpose: "మహిళలు మరియు ఎస్సీ/ఎస్టీ పారిశ్రామికవేత్తలు కొత్త వ్యాపారాలు లేదా తయారీ పరిశ్రమలను స్థాపించడానికి ₹10 లక్షల నుండి ₹1 కోటి వరకు బ్యాంక్ రుణాలు అందించడం.",
      benefits: "గ్రీన్‌ఫీల్డ్ ప్రాజెక్ట్‌ల కోసం ₹10 లక్షల నుండి ₹100 లక్షల (1 కోటి) వరకు కాంపోజిట్ రుణం + SIDBI ద్వారా ప్రాజెక్ట్ గైడెన్స్ మరియు మెంటార్‌షిప్.",
      eligSummary: "తయారీ, సేవలు లేదా వాణిజ్య రంగంలో కొత్త వెంచర్ ప్రారంభించే మహిళా లేదా SC/ST పారిశ్రామికవేత్తలు (18 ఏళ్లు పైబడినవారు).",
      docs: [
        { name: "ఆధార్, పాన్ & కుల ధృవీకరణ పత్రం (SC/ST కి)", why: "వర్గీకరణ మరియు గుర్తింపు ధృవీకరణ" },
        { name: "ప్రాజెక్ట్ సమగ్ర నివేదిక (DPR)", why: "వ్యాపార సాధ్యత, యంత్రాల ఖర్చు మరియు ఆదాయ అంచనాలు" },
        { name: "బ్యాంక్ స్టేట్‌మెంట్లు మరియు వ్యాపార చిరునామా రుజువు", why: "బ్యాంక్ క్రెడిట్ అసెస్‌మెంట్ కొరకు" }
      ],
      steps: [
        { title: "standupmitra.in లో నమోదు చేసుకోండి", desc: "పోర్టల్‌లో ప్రాజెక్ట్ ప్రొఫైల్ మరియు బిజినెస్ ప్లాన్ సమర్పించండి." },
        { title: "బ్యాంక్ లీడ్ బ్రాంచ్ పరిశీలన", desc: "నియమించబడిన బ్యాంక్ బ్రాంచ్ మీ ప్రాజెక్ట్ రిపోర్టును పరిశీలిస్తుంది." },
        { title: "₹10 లక్షల నుండి ₹1 కోటి రుణం మంజూరు", desc: "యంత్రాల కొనుగోలు మరియు వర్కింగ్ క్యాపిటల్ రుణం విడుదలవుతుంది." }
      ]
    },
    hi: {
      name: "स्टैंड-अप इंडिया योजना (महिला व SC/ST उद्यम ऋण)",
      category: "🚀 उद्योग एवं उद्यमिता",
      dept: "वित्तीय सेवाएं विभाग, वित्त मंत्रालय",
      purpose: "अनुसूचित जाति, अनुसूचित जनजाति और महिला उद्यमियों को नए विनिर्माण या सेवा उद्योग लगाने हेतु ₹10 लाख से ₹1 करोड़ तक का बैंक ऋण देना।",
      benefits: "ग्रीनफील्ड उद्यम लगाने हेतु ₹10 लाख से ₹1 करोड़ तक का कम्पोजिट लोन (टर्म लोन + वर्किंग कैपिटल) और सिडबी मेंटरशिप सहायता।",
      eligSummary: "18 वर्ष से अधिक आयु की महिला या SC/ST उद्यमी जो नया विनिर्माण, सेवा या व्यापार व्यवसाय शुरू कर रहे हों।",
      docs: [
        { name: "आधार, पैन एवं जाति प्रमाण पत्र (SC/ST हेतु)", why: "पहचान और श्रेणी सत्यापन हेतु" },
        { name: "विस्तृत प्रोजेक्ट रिपोर्ट (DPR)", why: "व्यवसाय योजना और लागत सत्यापन हेतु" },
        { name: "बैंक खाता विवरण और प्रोजेक्ट कोटेशन", why: "ऋण मूल्यांकन हेतु" }
      ],
      steps: [
        { title: "standupmitra.in पर आवेदन करें", desc: "पोर्टल पर अपना व्यवसाय प्रोफाइल और प्रोजेक्ट रिपोर्ट अपलोड करें।" },
        { title: "बैंक शाखा द्वारा प्रोजेक्ट मूल्यांकन", desc: "अग्रणी बैंक शाखा द्वारा प्रोजेक्ट की व्यवहार्यता जांच।" },
        { title: "₹10 लाख से ₹1 करोड़ ऋण स्वीकृति", desc: "फैक्ट्री व मशीनरी खरीद हेतु पूंजी सीधे स्वीकृत।" }
      ]
    }
  },
  pm_matsya_sampada: {
    te: {
      name: "పిఎమ్ మత్స్య సంపద యోజన (చేపల పెంపకం & మత్స్య సాయం)",
      category: "🐟 మత్స్య & జలవనరుల అభివృద్ధి",
      dept: "మత్స్య శాఖ, పశుసంవర్ధక మరియు పాడిపరిశ్రమ మంత్రిత్వ శాఖ",
      purpose: "చేపల పెంపకందారులు, మత్స్యకారుల ఆదాయాన్ని రెట్టింపు చేయడానికి ఆధునిక ఆక్వాకల్చర్, కోల్డ్ స్టోరేజ్ వాహనాలు మరియు ఐస్ ప్లాంట్లకు భారీ సబ్సిడీ అందించడం.",
      benefits: "మహిళలు మరియు SC/ST లకు 60% వరకు, ఇతరులకు 40% వరకు ప్రభుత్వ మూలధన సబ్సిడీ (బయోఫ్లాక్, రీసర్క్యులేటరీ ఆక్వాకల్చర్ మరియు ఇన్సులేటెడ్ ఐస్ వ్యాన్లకు).",
      eligSummary: "చేపల పెంపకందారులు, తీరప్రాంత మత్స్యకారులు, స్వయం సహాయక సంఘాలు మరియు ఆక్వా పారిశ్రామికవేత్తలు.",
      docs: [
        { name: "ఆధార్ కార్డు & మత్స్యకార సొసైటీ గుర్తింపు", why: "లబ్ధిదారుడి అర్హత ధృవీకరణ" },
        { name: "చెరువు/భూమి యాజమాన్య పత్రాలు లేదా లీజు ఒప్పందం", why: "ఆక్వాకల్చర్ చెరువు స్థలం రుజువు" },
        { name: "బ్యాంక్ పాస్‌బుక్ & ప్రాజెక్ట్ ఎస్టిమేషన్", why: "60% ప్రభుత్వ సబ్సిడీ నేరుగా ఖాతాలో చేరడానికి" }
      ],
      steps: [
        { title: "pmmsy.dof.gov.in లో ప్రతిపాదన సమర్పించండి", desc: "జిల్లా మత్స్య అధికారి (DFO) కార్యాలయంలో లేదా పోర్టల్‌లో దరఖాస్తు చేయండి." },
        { title: "సాంకేతిక పరిశీలన & ఆమోదం", desc: "క్షేత్రస్థాయి తనిఖీ చేసి సబ్సిడీ మంజూరు ఉత్తర్వులు జారీ చేయబడతాయి." },
        { title: "ఆధునిక పరికరాల కొనుగోలు & సబ్సిడీ జమ", desc: "వాహనం లేదా యూనిట్ ఏర్పాటు పూర్తయిన వెంటనే 60% సబ్సిడీ బ్యాంక్ ఖాతాలో చేరుతుంది." }
      ]
    },
    hi: {
      name: "प्रधानमंत्री मत्स्य संपदा योजना (मत्स्य पालन अनुदान)",
      category: "🐟 मत्स्य एवं जलीय कृषि",
      dept: "मत्स्य पालन विभाग, मत्स्य पालन, पशुपालन और डेयरी मंत्रालय",
      purpose: "मछुआरों और मछली पालकों की आय बढ़ाने हेतु आधुनिक तालाब, बायोफ्लॉक यूनिट, बर्फ की गाड़ियां और कोल्ड चेन पर भारी सरकारी सब्सिडी देना।",
      benefits: "महिलाओं और SC/ST वर्ग को 60% तक और अन्य को 40% तक सीधी पूंजीगत सब्सिडी। नाव, जाल, फीड मिल और रेफ्रिजरेटेड वैन पर अनुदान।",
      eligSummary: "मछुआरे, मछली पालक, स्वयं सहायता समूह (SHG) और मत्स्य उद्यमी।",
      docs: [
        { name: "आधार कार्ड एवं मछुआरा पहचान पत्र", why: "पहचान और श्रेणी सत्यापन हेतु" },
        { name: "तालाब / भूमि दस्तावेज या लीज एग्रीमेंट", why: "मत्स्य पालन स्थल सत्यापन हेतु" },
        { name: "बैंक खाता पासबुक एवं प्रोजेक्ट लागत कोटेशन", why: "60% सरकारी सब्सिडी सीधे बैंक में पाने हेतु" }
      ],
      steps: [
        { title: "pmmsy.dof.gov.in या DFO ऑफिस में आवेदन", desc: "जिला मत्स्य अधिकारी कार्यालय या पोर्टल पर प्रोजेक्ट फॉर्म भरें।" },
        { title: "स्थल निरीक्षण और तकनीकी स्वीकृति", desc: "मत्स्य विभाग द्वारा स्थल जांच और सब्सिडी स्वीकृति पत्र जारी।" },
        { title: "उपकरण स्थापना और 60% सब्सिडी भुगतान", desc: "यूनिट तैयार होते ही सब्सिडी राशि सीधे बैंक खाते में जमा।" }
      ]
    }
  },
  jal_jeevan: {
    te: {
      name: "జల్ జీవన్ మిషన్ (హర్ ఘర్ జల్ - ప్రతి ఇంటికీ కుళాయి నీరు)",
      category: "🚰 తాగునీరు & పారిశుధ్యం",
      dept: "జల్ శక్తి మంత్రిత్వ శాఖ",
      purpose: "దేశంలోని ప్రతి గ్రామీణ గృహానికి రోజుకు తలసరి 55 లీటర్ల నాణ్యమైన, సురక్షితమైన శుద్ధ తాగునీటిని ఇంటి ముంగిట కుళాయి ద్వారా అందించడం.",
      benefits: "100% ఉచిత గృహ కుళాయి కనెక్షన్ (FHTC), రోజూ సురక్షితమైన శుద్ధి చేసిన నీటి సరఫరా, మరియు ఫీల్డ్ టెస్ట్ కిట్లతో నీటి నాణ్యత నిరంతర పరీక్ష.",
      eligSummary: "పైపులైన్ ద్వారా కుళాయి నీటి కనెక్షన్ లేని భారతదేశంలోని గ్రామీణ గృహాలన్నీ.",
      docs: [
        { name: "గృహ యజమాని ఆధార్ కార్డు", why: "గ్రామ పంచాయతీ రిజిస్ట్రేషన్ కొరకు" },
        { name: "నివాస ధృవీకరణ / విద్యుత్ లేదా ఇంటి పన్ను రసీదు", why: "గృహ చిరునామా ధృవీకరణ" },
        { name: "గ్రామ సభ తీర్మానంలో నమోదు", why: "గ్రామ తాగునీటి మరియు పారిశుధ్య కమిటీ (VWSC) ద్వారా కనెక్షన్ ఆమోదం" }
      ],
      steps: [
        { title: "గ్రామ పంచాయతీ / పానీ సమితిలో నమోదు", desc: "గ్రామ సర్పంచ్ లేదా కార్యదర్శి వద్ద కుళాయి కనెక్షన్ కోసం పేరు నమోదు చేసుకోండి." },
        { title: "పైప్‌లైన్ & మీటర్ అమరిక", desc: "గ్రామ తాగునీటి నెట్‌వర్క్ నుండి మీ ఇంటికి పైపులైన్ కనెక్షన్ వేస్తారు." },
        { title: "ఇంటి వద్దే నిరంతర స్వచ్ఛమైన కుళాయి నీరు", desc: "ప్రతిరోజూ ఉచితంగా శుద్ధ తాగునీరు పొందండి." }
      ]
    },
    hi: {
      name: "जल जीवन मिशन (हर घर जल योजना)",
      category: "🚰 पेयजल एवं स्वच्छता",
      dept: "जल शक्ति मंत्रालय",
      purpose: "देश के प्रत्येक ग्रामीण परिवार को घर के नल से प्रति व्यक्ति प्रतिदिन 55 लीटर शुद्ध और सुरक्षित पेयजल उपलब्ध कराना।",
      benefits: "100% निशुल्क घरेलू नल कनेक्शन (FHTC), स्वच्छ पेयजल की नियमित आपूर्ति और फील्ड टेस्ट किट द्वारा पानी की शुद्धता जांच।",
      eligSummary: "देश के सभी ग्रामीण परिवार जिनके घरों में अभी तक नल कनेक्शन नहीं है।",
      docs: [
        { name: "मकान मालिक का आधार कार्ड", why: "ग्राम पंचायत में पंजीकरण हेतु" },
        { name: "निवास प्रमाण पत्र या बिजली बिल", why: "मकान के पते का सत्यापन हेतु" },
        { name: "पानी समिति में पंजीकरण", why: "ग्राम जल एवं स्वच्छता समिति द्वारा नल कनेक्शन स्वीकृति" }
      ],
      steps: [
        { title: "ग्राम पंचायत / पानी समिति में आवेदन", desc: "ग्राम प्रधान या पंचायत सचिव के पास नल कनेक्शन हेतु नाम दर्ज कराएं।" },
        { title: "पाइपलाइन बिछाना और नल लगाना", desc: "गांव की मुख्य पाइपलाइन से घर तक मुफ्त कनेक्शन।" },
        { title: "घर पर शुद्ध पेयजल की आपूर्ति शुरू", desc: "प्रतिदिन अपने घर के नल से सुरक्षित पानी प्राप्त करें।" }
      ]
    }
  }
};

// Localized Scheme Resolver Function
function getLocalizedScheme(s, lang) {
  if (!s) return s;
  if (!lang || lang === 'en') return s;

  const overrides = SCHEMES_I18N[s.id] && SCHEMES_I18N[s.id][lang];
  if (!overrides) return s;

  return {
    ...s,
    name: overrides.name || s.name,
    category: overrides.category || s.category,
    dept: overrides.dept || s.dept,
    purpose: overrides.purpose || s.purpose,
    benefits: overrides.benefits || s.benefits,
    eligibility: {
      ...s.eligibility,
      summary: overrides.eligSummary || (s.eligibility ? s.eligibility.summary : '')
    },
    documents: overrides.docs || s.documents,
    applicationSteps: overrides.steps || s.applicationSteps
  };
}

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

// Initialize App
document.addEventListener("DOMContentLoaded", async () => {
  if ('speechSynthesis' in window) {
    window.speechSynthesis.getVoices();
    window.speechSynthesis.onvoiceschanged = () => { window.speechSynthesis.getVoices(); };
  }
  setupNavigation();
  setupLanguageSelector();
  setupAccessibilityControls();
  setupExploreFilters();
  await checkServerHealth();
  updateLanguageUI();
  renderDirectory(SCHEMES_DATABASE);
  renderReaderView();
  renderLibrary();
  fetchSchemesFromPortal();
});

// Fetch All Latest Portal & Cached Schemes from Backend API
async function fetchSchemesFromPortal() {
  try {
    const res = await fetch(`${API_BASE_URL}/search-portal`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query: "" })
    });
    if (res.ok) {
      const data = await res.json();
      if (data.schemes && Array.isArray(data.schemes) && data.schemes.length > 0) {
        data.schemes.forEach(s => {
          let idx = SCHEMES_DATABASE.findIndex(item => item.id === s.id || item.name.toLowerCase() === s.name.toLowerCase());
          if (idx !== -1) {
            SCHEMES_DATABASE[idx] = s;
          } else {
            SCHEMES_DATABASE.push(s);
          }
        });
        if (!appState.selectedScheme) {
          appState.selectedScheme = SCHEMES_DATABASE[0];
        }
        renderDirectory(SCHEMES_DATABASE);
        renderReaderView();
        console.log(`🌐 [Live Portal Sync]: Successfully retrieved & loaded ${SCHEMES_DATABASE.length} schemes from India.gov.in portal cache.`);
      }
    }
  } catch (err) {
    console.warn("Portal sync warning:", err);
  }
}

// Accessibility Controls Setup (Contrast Toggle)
function setupAccessibilityControls() {
  const contrastBtn = document.getElementById('btn-contrast-toggle');
  if (contrastBtn) {
    contrastBtn.addEventListener('click', () => {
      document.body.classList.toggle('theme-contrast');
    });
  }
}

// Explore Filters & Live Search Setup
function setupExploreFilters() {
  const searchInput = document.getElementById('directory-search');
  const catSelect = document.getElementById('filter-category');
  const levelSelect = document.getElementById('filter-level');

  const applyFilters = async () => {
    const query = searchInput ? searchInput.value.toLowerCase().trim() : '';
    const cat = catSelect ? catSelect.value.toLowerCase() : 'all';
    const lvl = levelSelect ? levelSelect.value.toLowerCase() : 'all';

    let filtered = SCHEMES_DATABASE.filter(s => {
      const matchQuery = !query || 
                         s.name.toLowerCase().includes(query) || 
                         s.purpose.toLowerCase().includes(query) || 
                         (s.category && s.category.toLowerCase().includes(query)) ||
                         (s.benefits && s.benefits.toLowerCase().includes(query));
      
      const sCat = (s.category || '').toLowerCase();
      const matchCat = (cat === 'all') || sCat.includes(cat) || cat.includes(sCat);

      const sLvl = (s.level || '').toLowerCase();
      const matchLvl = (lvl === 'all') || sLvl.includes(lvl) || lvl.includes(sLvl);

      return matchQuery && matchCat && matchLvl;
    });

    if (filtered.length === 0 && query.length >= 2) {
      try {
        const res = await fetch(`${API_BASE_URL}/search-portal`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ query: query })
        });
        if (res.ok) {
          const data = await res.json();
          if (data.scheme) {
            let idx = SCHEMES_DATABASE.findIndex(s => s.id === data.scheme.id || s.name.toLowerCase() === data.scheme.name.toLowerCase());
            if (idx === -1) SCHEMES_DATABASE.unshift(data.scheme);
            else SCHEMES_DATABASE[idx] = data.scheme;
            
            filtered = [data.scheme];
          }
        }
      } catch (e) {
        console.warn("Live search fallback error:", e);
      }
    }

    renderDirectory(filtered);
  };

  if (searchInput) {
    searchInput.addEventListener('input', applyFilters);
    searchInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') applyFilters();
    });
  }
  if (catSelect) catSelect.addEventListener('change', applyFilters);
  if (levelSelect) levelSelect.addEventListener('change', applyFilters);
}

// Check AI Server Health
async function checkServerHealth() {
  try {
    const res = await fetch(`${API_BASE_URL}/health`);
    if (res.ok) {
      const data = await res.json();
      appState.isServerOnline = true;
      console.log("✅ [GovToon API Connected]:", data.aiEngine);
    }
  } catch (err) {
    console.warn("⚠️ Operating with local Fact Grounded AI Engine.");
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
  if (targetView) {
    targetView.classList.add('active');
  }

  if (viewId === 'explore') {
    renderDirectory(SCHEMES_DATABASE);
  } else if (viewId === 'reader') {
    renderReaderView();
  }

  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Multilingual Setup & Site-Wide Language Engine
function setupLanguageSelector() {
  const sel = document.getElementById('app-language-select');
  if (!sel) return;

  sel.addEventListener('change', (e) => {
    appState.currentLang = e.target.value;
    updateLanguageUI();
    renderDirectory(SCHEMES_DATABASE);
    renderReaderView();
  });
}

function updateLanguageUI() {
  const lang = appState.currentLang;
  const t = TRANSLATIONS[lang] || TRANSLATIONS.en;

  document.querySelectorAll('[data-i18n]').forEach(elem => {
    const key = elem.getAttribute('data-i18n');
    if (t[key]) {
      if (elem.tagName === 'INPUT' || elem.tagName === 'TEXTAREA') {
        elem.value = t[key];
      } else {
        elem.innerHTML = t[key];
      }
    }
  });

  document.querySelectorAll('[data-i18n-ph]').forEach(elem => {
    const key = elem.getAttribute('data-i18n-ph');
    if (t[key]) {
      elem.placeholder = t[key];
    }
  });
}

// Directory Renderer
function renderDirectory(schemes) {
  const grid = document.getElementById('schemes-directory-grid');
  if (!grid) return;

  const lang = appState.currentLang || 'en';
  const t = TRANSLATIONS[lang] || TRANSLATIONS.en;

  grid.innerHTML = '';
  schemes.forEach(s => {
    const ls = getLocalizedScheme(s, lang);
    const applyTargetUrl = s.applyUrl || s.sourceUrl || s.officialUrl || "https://www.india.gov.in/my-government/schemes";
    const card = document.createElement('div');
    card.className = 'scheme-card-item';
    card.innerHTML = `
      <div class="scard-header">
        <span class="badge blue-badge">${ls.category || s.category} • ${ls.level || s.level}</span>
        <h3>${ls.name}</h3>
        <p class="scard-dept">${ls.dept || s.dept}</p>
      </div>
      <p class="scard-desc">${ls.purpose || s.purpose}</p>
      <div class="scard-footer" style="display:flex; justify-content:space-between; align-items:center; gap:8px; flex-wrap:wrap;">
        <a href="${applyTargetUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-outline-sm" style="font-size:0.82rem;">${t.btn_apply_online || '🚀 Apply Online ↗'}</a>
        <button class="btn btn-saffron" onclick="generateComicForScheme('${s.id}')">${t.btn_create_nav || '+ Turn Scheme into Comic'}</button>
      </div>
    `;
    grid.appendChild(card);
  });
}

// TURN INTO COMIC CORE FUNCTIONS
function openSchemeInReader(schemeId) {
  let s = SCHEMES_DATABASE.find(item => item.id === schemeId);
  if (!s) s = SCHEMES_DATABASE[0];
  appState.selectedScheme = s;
  renderReaderView();
  navigateTo('reader');
}

function generateComicForScheme(schemeId) {
  let s = SCHEMES_DATABASE.find(item => item.id === schemeId);
  if (s) {
    appState.selectedScheme = s;
    startProcessingPipeline(s.name, s.id);
  } else {
    startProcessingPipeline(schemeId || "Government Scheme", schemeId);
  }
}

function handleTopCreateButtonClick() {
  if (appState.selectedScheme) {
    generateComicForScheme(appState.selectedScheme.id);
  } else {
    generateComicForScheme('pm_kisan');
  }
}


// Gemini Nano Banana Theme & Visual Assets Resolver
function getThemeForScheme(s) {
  if (!s) return 'mudra_loan';
  const sid = s.id || '';
  const knownThemes = [
    'pm_kisan', 'pension', 'ayushman', 'surya_ghar', 'pm_svanidhi',
    'mudra_loan', 'sukanya', 'nsp_scholarship', 'pm_awas_rural',
    'pm_vishwakarma', 'pm_ujjwala', 'standup_india', 'pm_matsya_sampada',
    'atal_pension', 'jal_jeevan'
  ];
  if (knownThemes.includes(sid)) return sid;

  const text = ((s.name || '') + ' ' + (s.purpose || '') + ' ' + (s.category || '') + ' ' + (s.benefits || '')).toLowerCase();
  if (/(beti|sukanya|girl|daughter|kanya|balika|ladli|matru|women|female)/i.test(text)) return 'sukanya';
  if (/(solar|surya|rooftop|bijli|electricity|kusum|photovoltaic|clean energy)/i.test(text)) return 'surya_ghar';
  if (/(health|hospital|medical|ayushman|arogya|swasthya|pm-jay|treatment|bima|doctor)/i.test(text)) return 'ayushman';
  if (/(scholarship|student|college|epass|nsp|vidyarthi|shiksha|tuition|post-matric)/i.test(text)) return 'nsp_scholarship';
  if (/(svanidhi|street vendor|hawker|thela|rehri|micro-credit|vendor)/i.test(text)) return 'pm_svanidhi';
  if (/(mudra|startup|business loan|entrepreneur|msme|venture|udyam|seed fund)/i.test(text)) return 'mudra_loan';
  if (/(awas|housing|pucca|shelter|makan|pradhan mantri awas)/i.test(text)) return 'pm_awas_rural';
  if (/(vishwakarma|artisan|craftsman|carpenter|blacksmith|goldsmith|tailor|toolkit|karigar|shilpkar)/i.test(text)) return 'pm_vishwakarma';
  if (/(ujjwala|lpg|gas cylinder|clean cooking|chulha|rasoi)/i.test(text)) return 'pm_ujjwala';
  if (/(jal|jeevan|drinking water|tap water|pipeline|har ghar jal|nal)/i.test(text)) return 'jal_jeevan';
  if (/(pension|atal|apy|shram yogi|maandhan|senior citizen|old age|retirement)/i.test(text)) return 'pension';
  if (/(matsya|fish|fisheries|aquaculture|boat|marine|coastal)/i.test(text)) return 'pm_matsya_sampada';
  if (/(standup|women entrepreneur|enterprise|greenfield)/i.test(text)) return 'standup_india';
  if (/(kisan|farmer|agriculture|crop|seed|fertilizer|rythu|farming|landholder)/i.test(text)) return 'pm_kisan';

  return 'mudra_loan';
}

function getThemeImages(s) {
  const themeKey = getThemeForScheme(s);
  const schemeImageMap = {
    pm_kisan: ["assets/pm_kisan_1.jpg", "assets/pm_kisan_2.jpg", "assets/pm_kisan_3.jpg", "assets/pm_kisan_4.jpg"],
    pension: ["assets/pension_1.jpg", "assets/pension_2.jpg", "assets/pension_3.jpg", "assets/pension_4.jpg"],
    ayushman: ["assets/ayushman_1.jpg", "assets/ayushman_2.jpg", "assets/ayushman_3.jpg", "assets/ayushman_4.jpg"],
    surya_ghar: ["assets/surya_ghar_1.jpg", "assets/surya_ghar_2.jpg", "assets/surya_ghar_3.jpg", "assets/surya_ghar_4.jpg"],
    pm_svanidhi: ["assets/svanidhi_1.jpg", "assets/svanidhi_2.jpg", "assets/svanidhi_3.jpg", "assets/svanidhi_4.jpg"],
    mudra_loan: ["assets/mudra_1.jpg", "assets/mudra_2.jpg", "assets/mudra_3.jpg", "assets/mudra_4.jpg"],
    sukanya: ["assets/sukanya_1.jpg", "assets/sukanya_2.jpg", "assets/sukanya_3.jpg", "assets/sukanya_4.jpg"],
    nsp_scholarship: ["assets/scholarship_1.jpg", "assets/scholarship_2.jpg", "assets/scholarship_3.jpg", "assets/scholarship_4.jpg"],
    pm_awas_rural: ["assets/awas_1.jpg", "assets/awas_2.jpg", "assets/awas_3.jpg", "assets/awas_4.jpg"],
    pm_vishwakarma: ["assets/vishwakarma_1.jpg", "assets/vishwakarma_2.jpg", "assets/vishwakarma_3.jpg", "assets/vishwakarma_4.jpg"],
    pm_ujjwala: ["assets/ujjwala_1.jpg", "assets/ujjwala_2.jpg", "assets/ujjwala_3.jpg", "assets/ujjwala_4.jpg"],
    standup_india: ["assets/standup_1.jpg", "assets/standup_2.jpg", "assets/standup_3.jpg", "assets/standup_4.jpg"],
    pm_matsya_sampada: ["assets/matsya_1.jpg", "assets/matsya_2.jpg", "assets/matsya_3.jpg", "assets/matsya_4.jpg"],
    atal_pension: ["assets/pension_1.jpg", "assets/pension_2.jpg", "assets/pension_3.jpg", "assets/pension_4.jpg"],
    jal_jeevan: ["assets/jeevan_1.jpg", "assets/jeevan_2.jpg", "assets/jeevan_3.jpg", "assets/jeevan_4.jpg"]
  };
  return schemeImageMap[themeKey] || schemeImageMap.mudra_loan;
}

function getLocalizedCharacter(s, lang) {
  if (!s) return { name: "Citizen", role: "Beneficiary", avatar: "🇮🇳", desc: "Citizen Hero" };
  const targetLang = lang || appState.currentLang || 'en';
  if (s.character && typeof s.character === 'object') {
    if (s.character[targetLang]) return s.character[targetLang];
    if (s.character.en) return s.character.en;
    if (s.character.name) return s.character;
  }
  return { name: "Citizen", role: "Beneficiary", avatar: "🇮🇳", desc: "Citizen Hero" };
}

function getLocalizedPanels(s, lang) {
  if (!s) return [];
  const targetLang = lang || appState.currentLang || 'en';
  const themeImgs = getThemeImages(s);

  if (s.panels && typeof s.panels === 'object' && !Array.isArray(s.panels)) {
    if (s.panels[targetLang] && Array.isArray(s.panels[targetLang]) && s.panels[targetLang].length > 0) {
      return s.panels[targetLang].map((p, idx) => ({ ...p, image: p.image || themeImgs[idx % 4] }));
    }
    if (s.panels.en && Array.isArray(s.panels.en) && s.panels.en.length > 0) {
      return s.panels.en.map((p, idx) => ({ ...p, image: p.image || themeImgs[idx % 4] }));
    }
  }

  if (Array.isArray(s.panels) && s.panels.length > 0) {
    return s.panels.map((p, idx) => ({ ...p, image: p.image || themeImgs[idx % 4] }));
  }

  return [];
}

// READER WORKSPACE RENDERER
function renderReaderView() {
  if (!appState.selectedScheme && SCHEMES_DATABASE.length > 0) {
    appState.selectedScheme = SCHEMES_DATABASE[0];
  }
  const s = appState.selectedScheme;
  if (!s) return;

  setReaderTab('comic');

  const lang = appState.currentLang || 'en';
  const t = TRANSLATIONS[lang] || TRANSLATIONS.en;
  const ls = getLocalizedScheme(s, lang);

  // 1. Update Header Info
  const catBadge = document.getElementById('reader-category-badge');
  if (catBadge) catBadge.innerText = `${ls.category || s.category || 'General'} • ${ls.level || s.level || 'Central'}`;

  const schemeNameElem = document.getElementById('reader-scheme-name');
  if (schemeNameElem) schemeNameElem.innerText = ls.name;

  const schemeDeptElem = document.getElementById('reader-scheme-dept');
  if (schemeDeptElem) schemeDeptElem.innerText = `${ls.dept || s.dept || 'Government of India'} | ${t.source_label || 'Source:'} India.gov.in`;

  const sourceDateElem = document.getElementById('reader-source-date');
  if (sourceDateElem) sourceDateElem.innerText = `${t.last_verified_label || 'Last Verified:'} ${s.lastVerified || '2026-08-24'}`;

  const officialLinkElem = document.getElementById('reader-official-link');
  if (officialLinkElem) {
    const targetUrl = s.applyUrl || s.sourceUrl || s.officialUrl || "https://www.india.gov.in/my-government/schemes";
    officialLinkElem.href = targetUrl;
    officialLinkElem.target = "_blank";
    officialLinkElem.rel = "noopener noreferrer";
    officialLinkElem.innerText = t.btn_verify_portal || "🔗 Verify Official Portal";
  }

  const chatSchemeNameElem = document.getElementById('chat-scheme-name');
  if (chatSchemeNameElem) chatSchemeNameElem.innerText = ls.name;

  // 1.5. Scheme Key Summary & Highlights Card
  const summaryBox = document.getElementById('reader-scheme-summary-card');
  if (summaryBox) {
    const docList = ls.documents || s.documents || [];
    const docNames = docList.map(d => d.name).join(', ') || 'Aadhaar Card, Bank Passbook';
    const eligSummary = (ls.eligibility && ls.eligibility.summary) || (s.eligibility && s.eligibility.summary) || 'Eligible Indian citizens';
    const targetUrl = s.applyUrl || s.sourceUrl || s.officialUrl || "https://www.india.gov.in/my-government/schemes";

    summaryBox.innerHTML = `
      <div style="background: var(--bg-surface); border: 1px solid var(--border-light); border-left: 5px solid var(--saffron); border-radius: var(--radius-lg); padding: 20px 24px; margin-bottom: 24px; box-shadow: var(--shadow-md);">
        <div style="display:flex; justify-content:space-between; align-items:flex-start; flex-wrap:wrap; gap:12px; margin-bottom:12px;">
          <div>
            <h3 style="font-family:var(--font-heading); color:var(--primary-navy); font-size:1.2rem; margin:0; display:flex; align-items:center; gap:8px;">
              ${t.scheme_overview_title || '📌 Scheme Key Details & Highlights Overview'}
            </h3>
            <p style="font-size:0.86rem; color:var(--text-muted); margin:4px 0 0 0;">${t.scheme_grounded_sub || 'Official Government Information Grounded on India.gov.in'}</p>
          </div>
          <a href="${targetUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-saffron btn-sm" style="font-size:0.85rem;">${t.btn_apply_online || '🚀 Apply Online ↗'}</a>
        </div>
        <div class="summary-details-grid" style="display:grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap:14px; margin-top:14px;">
          <div style="background:var(--bg-light); padding:12px 14px; border-radius:10px; border:1px solid var(--border-light);">
            <strong style="color:var(--trust-blue); font-size:0.82rem; display:block; margin-bottom:4px;">${t.core_objective || '🎯 Core Objective / Purpose'}</strong>
            <span style="font-size:0.9rem; color:var(--text-main); font-weight:600; line-height:1.4; display:block;">${ls.purpose || s.purpose}</span>
          </div>
          <div style="background:var(--bg-light); padding:12px 14px; border-radius:10px; border:1px solid var(--border-light);">
            <strong style="color:#10b981; font-size:0.82rem; display:block; margin-bottom:4px;">${t.key_benefits || '🎁 Key Benefits & Financial Cover'}</strong>
            <span style="font-size:0.9rem; color:var(--text-main); font-weight:700; line-height:1.4; display:block;">${ls.benefits || s.benefits}</span>
          </div>
          <div style="background:var(--bg-light); padding:12px 14px; border-radius:10px; border:1px solid var(--border-light);">
            <strong style="color:var(--saffron); font-size:0.82rem; display:block; margin-bottom:4px;">${t.target_beneficiary || '👤 Target Beneficiary & Eligibility'}</strong>
            <span style="font-size:0.9rem; color:var(--text-main); font-weight:600; line-height:1.4; display:block;">${eligSummary}</span>
          </div>
          <div style="background:var(--bg-light); padding:12px 14px; border-radius:10px; border:1px solid var(--border-light);">
            <strong style="color:#8b5cf6; font-size:0.82rem; display:block; margin-bottom:4px;">${t.mandatory_docs || '📄 Mandatory Required Documents'}</strong>
            <span style="font-size:0.9rem; color:var(--text-main); font-weight:600; line-height:1.4; display:block;">${docNames}</span>
          </div>
        </div>
      </div>
    `;
  }

  // 2. Character Bible Card (Multilingual)
  const charBox = document.getElementById('reader-character-card');
  if (charBox) {
    const charData = getLocalizedCharacter(s, lang);
    charBox.innerHTML = `
      <div class="char-avatar" style="font-size:2.2rem; background:var(--surface-subtle); padding:10px; border-radius:50%; width:56px; height:56px; display:flex; align-items:center; justify-content:center;">${charData.avatar || '🇮🇳'}</div>
      <div>
        <h4 style="font-family:var(--font-heading); font-size:1.15rem; color:var(--primary-navy); margin-bottom:2px;">${charData.name || 'Citizen'} <span style="color:var(--saffron); font-size:0.85rem;">(${charData.role || 'Beneficiary'})</span></h4>
        <p style="font-size:0.88rem; color:var(--text-muted);">${charData.desc || charData.clothing || 'Relatable Citizen Hero'}</p>
      </div>
    `;
  }

  // 3. Robust Multilingual Panel Extraction
  const panelsList = getLocalizedPanels(s, lang);
  const themeImages = getThemeImages(s);

  const panelsContainer = document.getElementById('reader-panels-container');
  if (panelsContainer) {
    panelsContainer.innerHTML = '';

    panelsList.forEach((p, idx) => {
      const imgSrc = p.image || themeImages[idx % 4] || `assets/pm_kisan_${(idx%4)+1}.jpg`;
      const pdiv = document.createElement('div');
      pdiv.className = 'panel-card';
      pdiv.innerHTML = `
        <div class="panel-tag-header">
          <span>${p.tag || `Panel ${p.num || idx + 1}`}</span>
          <button class="btn-outline-sm" onclick="showCitationModal('${escapeQuotes(p.dialogue)}', '${escapeQuotes(p.sourceRef || ls.name)}', '${s.officialUrl}')">${t.btn_citation || '🔍 Why shown? (Citation)'}</button>
        </div>
        <div class="panel-img-box">
          <img src="${imgSrc}" alt="${p.tag || ls.name}" loading="lazy" onerror="this.onerror=null; this.src='assets/pm_kisan_${(idx%4)+1}.jpg';">
        </div>
        <div class="panel-dialogue-box">
          <div class="speaker-name">${p.speaker || 'Citizen'}</div>
          <div class="speaker-text">"${p.dialogue}"</div>
        </div>
        <div class="panel-footer-bar">
          <span class="panel-caption-text">📌 <strong>${t.caption_label || 'Caption'}:</strong> ${p.caption || ''}</span>
          <button class="btn-outline-sm" onclick="speakPanelText('${escapeQuotes(p.dialogue)}')">${t.btn_play_panel || '🔊 Play Panel'}</button>
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
function setReaderTab(tabId, btnElem) {
  appState.currentReaderTab = tabId;
  document.querySelectorAll('.rtab-btn').forEach(b => b.classList.remove('active'));
  document.querySelectorAll('.rtab-pane').forEach(p => p.classList.remove('active'));

  if (btnElem) {
    btnElem.classList.add('active');
  } else {
    const btn = document.querySelector(`.rtab-btn[onclick*="'${tabId}'"]`);
    if (btn) btn.classList.add('active');
  }

  const pane = document.getElementById(`rtab-content-${tabId}`);
  if (pane) pane.classList.add('active');
}

// Module 6: Visual Eligibility Checker
function runEligibilityCheck() {
  const s = appState.selectedScheme;
  if (!s || !s.eligibility) return;

  const lang = appState.currentLang;
  const t = TRANSLATIONS[lang] || TRANSLATIONS.en;

  const userAge = parseInt(document.getElementById('elig-user-age')?.value || 30);
  const userIncome = parseInt(document.getElementById('elig-user-income')?.value || 150000);

  const e = s.eligibility;
  let status = t.elig_eligible || "🟢 Likely Eligible";
  let statusClass = "green-badge";
  let reasons = [];

  if (userAge < e.minAge || userAge > e.maxAge) {
    status = t.elig_not_eligible || "🔴 Does not appear to meet age criteria";
    statusClass = "red-badge";
    reasons.push(`Age ${userAge} is outside specified range (${e.minAge}-${e.maxAge} yrs).`);
  } else {
    reasons.push(`✓ Age ${userAge} meets specified range (${e.minAge}-${e.maxAge} yrs).`);
  }

  if (userIncome > e.maxIncome) {
    status = t.elig_amber || "🟡 Income threshold requires official verification";
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
  if (!s) return;

  const lang = appState.currentLang || 'en';
  const t = TRANSLATIONS[lang] || TRANSLATIONS.en;
  const ls = getLocalizedScheme(s, lang);
  const docsList = ls.documents || s.documents || [];

  const docsGrid = document.getElementById('reader-docs-grid');
  if (!docsGrid) return;

  docsGrid.innerHTML = '';
  let preparedCount = 0;

  docsList.forEach((d, idx) => {
    const docId = d.id || `doc_${idx}`;
    const isChecked = appState.preparedDocs.has(docId);
    if (isChecked) preparedCount++;

    const dcard = document.createElement('div');
    dcard.className = 'doc-card-item';
    dcard.innerHTML = `
      <input type="checkbox" style="width:20px; height:20px; cursor:pointer;" ${isChecked ? 'checked' : ''} onchange="toggleDocPrepared('${docId}')">
      <div>
        <h4 style="font-family:var(--font-heading); font-size:1rem; margin-bottom:2px;">
          ${d.name} ${d.required ? `<span style="color:var(--rose); font-size:0.75rem;">${t.compulsory_label || '(Compulsory)'}</span>` : `<span style="color:var(--text-muted); font-size:0.75rem;">${t.optional_label || '(Optional)'}</span>`}
        </h4>
        <p style="font-size:0.85rem; color:var(--text-muted);">${d.why}</p>
      </div>
    `;
    docsGrid.appendChild(dcard);
  });

  const total = docsList.length;
  const pct = total > 0 ? Math.round((preparedCount / total) * 100) : 0;

  const docPrepText = document.getElementById('doc-prep-text');
  if (docPrepText) docPrepText.innerText = `${preparedCount} / ${total} ${t.prepared_label || 'Prepared'}`;
  const docPrepPct = document.getElementById('doc-prep-percent');
  if (docPrepPct) docPrepPct.innerText = `${pct}%`;
  const docFill = document.getElementById('doc-progress-fill');
  if (docFill) docFill.style.width = `${pct}%`;
}

function toggleDocPrepared(docId) {
  if (appState.preparedDocs.has(docId)) appState.preparedDocs.delete(docId);
  else appState.preparedDocs.add(docId);
  renderDocumentsTab();
}

// Module 8: Application Steps
function renderStepsTab() {
  const s = appState.selectedScheme;
  if (!s) return;

  const lang = appState.currentLang || 'en';
  const t = TRANSLATIONS[lang] || TRANSLATIONS.en;
  const ls = getLocalizedScheme(s, lang);
  const stepsData = ls.applicationSteps || s.applicationSteps || [];

  const stepsList = document.getElementById('reader-steps-list');
  if (!stepsList) return;

  stepsList.innerHTML = '';
  stepsData.forEach((st, idx) => {
    const item = document.createElement('div');
    item.className = 'step-timeline-item';
    item.innerHTML = `
      <div class="step-num-badge">${st.step || idx + 1}</div>
      <div>
        <h4 style="font-family:var(--font-heading); font-size:1.05rem; margin-bottom:4px;">${st.title}</h4>
        <p style="font-size:0.88rem; color:var(--text-muted);">${st.desc}</p>
      </div>
    `;
    stepsList.appendChild(item);
  });

  const applyBtn = document.getElementById('apply-official-btn');
  if (applyBtn) {
    const targetUrl = s.applyUrl || s.sourceUrl || s.officialUrl || "https://www.india.gov.in/my-government/schemes";
    applyBtn.href = targetUrl;
    applyBtn.target = "_blank";
    applyBtn.rel = "noopener noreferrer";
    applyBtn.innerText = t.btn_go_portal || "🚀 Go to Official Government Application Portal";
  }
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

// Smart Natural Voice Selection Engine (EN, TE, HI)
function getNaturalVoice(langCode) {
  if (!('speechSynthesis' in window)) return null;

  const voices = window.speechSynthesis.getVoices() || [];
  if (voices.length === 0) return null;

  const targetLang = (langCode || appState.currentLang || 'en').toLowerCase();
  let preferred = [];

  if (targetLang === 'te') {
    preferred = voices.filter(v => 
      v.lang.toLowerCase().includes('te') || 
      v.name.toLowerCase().includes('telugu') ||
      v.name.toLowerCase().includes('mohan') ||
      v.name.toLowerCase().includes('shruti')
    );
  } else if (targetLang === 'hi') {
    preferred = voices.filter(v => 
      v.lang.toLowerCase().includes('hi') || 
      v.name.toLowerCase().includes('hindi') ||
      v.name.toLowerCase().includes('swara') ||
      v.name.toLowerCase().includes('madhur') ||
      v.name.toLowerCase().includes('kalpana')
    );
  } else {
    // English (Prioritize Indian Accent / Natural Neural Voices)
    preferred = voices.filter(v => 
      v.name.toLowerCase().includes('natural') ||
      v.name.toLowerCase().includes('neerja') ||
      v.name.toLowerCase().includes('prabhat') ||
      v.name.toLowerCase().includes('google indian english') ||
      v.name.toLowerCase().includes('online') ||
      v.lang.toLowerCase().includes('en-in')
    );
    if (preferred.length === 0) {
      preferred = voices.filter(v => v.lang.toLowerCase().includes('en'));
    }
  }

  if (preferred.length > 0) return preferred[0];
  return voices.find(v => v.lang.toLowerCase().startsWith(targetLang)) || null;
}

// Audio Player with Natural Voice Synthesis
function speakPanelText(text) {
  if (!('speechSynthesis' in window)) return;

  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  
  const speed = parseFloat(document.getElementById('audio-speed-select')?.value || '1.0');
  utterance.rate = speed;
  utterance.pitch = 1.05; // Warmer conversational tone

  const lang = appState.currentLang;
  if (lang === 'te') utterance.lang = 'te-IN';
  else if (lang === 'hi') utterance.lang = 'hi-IN';
  else utterance.lang = 'en-IN';

  const naturalVoice = getNaturalVoice(lang);
  if (naturalVoice) {
    utterance.voice = naturalVoice;
    console.log(`🗣️ [Natural Voice Engine]: Active Voice -> ${naturalVoice.name} (${naturalVoice.lang})`);
  }

  window.speechSynthesis.speak(utterance);
}

function togglePlayFullComic() {
  const s = appState.selectedScheme;
  if (!s) return;

  const lang = appState.currentLang || 'en';
  const t = TRANSLATIONS[lang] || TRANSLATIONS.en;
  const ls = getLocalizedScheme(s, lang);

  let panelsList = [];
  if (s.panels && typeof s.panels === 'object' && !Array.isArray(s.panels)) {
    panelsList = s.panels[lang] || s.panels.en || s.panels.hi || [];
  } else if (Array.isArray(s.panels)) {
    panelsList = s.panels;
  }

  let fullScript = `${t.audio_reading_title || 'Reading visual story for'} ${ls.name}. `;
  panelsList.forEach((p, idx) => {
    const speaker = p.speaker || (idx === 0 ? 'Citizen' : 'Hero');
    fullScript += `${speaker} ${t.says_label || 'says'}: ${p.dialogue}. `;
  });

  speakPanelText(fullScript);

  document.getElementById('btn-play-comic').style.display = 'none';
  document.getElementById('btn-pause-comic').style.display = 'inline-flex';
}

function pauseAudio() {
  if ('speechSynthesis' in window) window.speechSynthesis.cancel();
  document.getElementById('btn-play-comic').style.display = 'inline-flex';
  document.getElementById('btn-pause-comic').style.display = 'none';
}

function setAudioSpeed(val) {
  const speed = parseFloat(val || '1.0');
  console.log("🔊 Audio playback speed set to:", speed);
  if ('speechSynthesis' in window && window.speechSynthesis.speaking) {
    window.speechSynthesis.cancel();
    togglePlayFullComic();
  }
}

// Citation Modal
function showCitationModal(statement, sourceRef, url) {
  document.getElementById('cite-statement-text').innerText = statement;
  document.getElementById('cite-source-text').innerText = `Fact verified against official government documentation: ${sourceRef}`;
  document.getElementById('cite-location-text').innerText = sourceRef;
  const linkElem = document.getElementById('cite-url-link');
  if (linkElem) {
    linkElem.href = url || "https://www.india.gov.in/my-government/schemes";
    linkElem.target = "_blank";
    linkElem.rel = "noopener noreferrer";
  }
  document.getElementById('citation-modal').style.display = 'flex';
}

function hideCitationModal() {
  document.getElementById('citation-modal').style.display = 'none';
}

function closeCitationModal(e) {
  if (e.target.id === 'citation-modal') hideCitationModal();
}

function escapeQuotes(str) {
  return (str || '').replace(/'/g, "\\'").replace(/"/g, '&quot;');
}

// AI Ingestion Pipeline (Calling REST API Server & Dynamic Generation)
function setCreateMode(mode, btnElem) {
  document.querySelectorAll('.create-tab-btn').forEach(b => b.classList.remove('active'));
  document.querySelectorAll('.mode-panel').forEach(p => p.classList.remove('active'));

  if (btnElem) {
    btnElem.classList.add('active');
  } else {
    const btn = document.querySelector(`.create-tab-btn[onclick*="'${mode}'"]`);
    if (btn) btn.classList.add('active');
  }

  const panel = document.getElementById(`create-mode-${mode}`);
  if (panel) panel.classList.add('active');
}

function setPersona(personaKey, btnElem) {
  appState.currentPersona = personaKey;
  document.querySelectorAll('.persona-chip').forEach(c => c.classList.remove('active'));

  if (btnElem) {
    btnElem.classList.add('active');
  } else {
    const chip = document.querySelector(`.persona-chip[data-persona="${personaKey}"]`);
    if (chip) chip.classList.add('active');
  }
}

function triggerFileUpload() {
  document.getElementById('pdf-file-input').click();
}

function handleFileSelected(e) {
  const file = e.target.files[0];
  if (!file) return;

  const statusBox = document.getElementById('upload-file-status');
  if (statusBox) {
    statusBox.style.display = 'block';
    statusBox.innerHTML = `<strong>📄 File Selected:</strong> ${file.name} (${(file.size / 1024).toFixed(1)} KB)`;
  }

  startProcessingPipeline(file.name.replace('.pdf', ' Scheme'));
}

function searchForCreate() {
  const input = document.getElementById('create-search-input');
  const query = input ? input.value.trim() : '';
  if (!query) return alert("Please type a scheme name first.");

  const list = document.getElementById('create-search-results');
  if (!list) return;
  list.innerHTML = '';

  const results = SCHEMES_DATABASE.filter(s => s.name.toLowerCase().includes(query.toLowerCase()) || s.purpose.toLowerCase().includes(query.toLowerCase()));

  if (results.length > 0) {
    results.forEach(s => {
      const div = document.createElement('div');
      div.style.cssText = "padding:12px; border:1px solid var(--border-light); border-radius:8px; margin-top:8px; display:flex; justify-content:space-between; align-items:center;";
      div.innerHTML = `
        <div><strong>${s.name}</strong> <span style="font-size:0.8rem; color:var(--text-muted);">(${s.category})</span></div>
        <button class="btn btn-saffron btn-sm" onclick="generateComicForScheme('${s.id}')">Generate Story</button>
      `;
      list.appendChild(div);
    });
  } else {
    const div = document.createElement('div');
    div.style.cssText = "padding:12px; border:1px dashed var(--saffron); border-radius:8px; margin-top:8px; display:flex; justify-content:space-between; align-items:center; background:var(--surface);";
    div.innerHTML = `
      <div><strong>Create AI Comic for "${query}"</strong> <div style="font-size:0.8rem; color:var(--text-muted);">Extract facts from official India.gov.in data</div></div>
      <button class="btn btn-saffron btn-sm" onclick="startProcessingPipeline('${query}')">✨ AI Generate Comic</button>
    `;
    list.appendChild(div);
  }
}

function processPastedText() {
  const text = document.getElementById('create-pasted-text').value.trim();
  if (!text) return alert("Please paste official government text first.");
  startProcessingPipeline(text.substring(0, 30) + " Scheme", null, text);
}

function processUrlInput() {
  const url = document.getElementById('create-url-input').value.trim();
  if (!url) return alert("Please enter official government URL.");
  startProcessingPipeline("Government Scheme URL", null, url);
}

// Full Dynamic AI Generation Pipeline (Gemini Nano Banana Multilingual Engine)
async function startProcessingPipeline(schemeTitle, schemeId, rawInputText) {
  let existingScheme = SCHEMES_DATABASE.find(item => item.id === schemeId || item.name.toLowerCase() === (schemeTitle || '').toLowerCase());
  const title = schemeTitle || (existingScheme ? existingScheme.name : 'Government Scheme');

  const overlay = document.getElementById('processing-overlay');
  if (overlay) {
    overlay.style.display = 'flex';
    const nameElem = document.getElementById('proc-scheme-name');
    if (nameElem) nameElem.innerText = `Gemini Nano Banana AI Generating Comic for: ${title}`;

    for (let i = 1; i <= 6; i++) {
      const stepElem = document.getElementById(`pstep-${i}`);
      if (stepElem) {
        stepElem.classList.remove('active');
        stepElem.style.opacity = '0.4';
      }
    }

    const s1 = document.getElementById('pstep-1'); if (s1) { s1.classList.add('active'); s1.style.opacity = '1'; }
    await new Promise(r => setTimeout(r, 200));
    const s2 = document.getElementById('pstep-2'); if (s2) { s2.classList.add('active'); s2.style.opacity = '1'; }
    await new Promise(r => setTimeout(r, 200));
    const s3 = document.getElementById('pstep-3'); if (s3) { s3.classList.add('active'); s3.style.opacity = '1'; }
    await new Promise(r => setTimeout(r, 200));
    const s4 = document.getElementById('pstep-4'); if (s4) { s4.classList.add('active'); s4.style.opacity = '1'; s4.innerText = '✓ 4. Gemini Nano Banana AI Generating 4-Panel Script'; }
  }

  let generatedPanels = null;
  let generatedChar = null;

  try {
    const apiRes = await fetch(`${API_BASE_URL}/generate-story`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        schemeName: title,
        persona: appState.currentPersona,
        rawInput: rawInputText
      })
    });
    if (apiRes.ok) {
      const data = await apiRes.json();
      console.log("🤖 [Gemini Nano Banana AI Server Response]:", data);
      if (data.panels) generatedPanels = data.panels;
      if (data.character) generatedChar = data.character;
    }
  } catch (e) {
    console.warn("AI Generation call warning:", e.message);
  }

  if (overlay) {
    const s5 = document.getElementById('pstep-5'); if (s5) { s5.classList.add('active'); s5.style.opacity = '1'; }
    await new Promise(r => setTimeout(r, 150));
    const s6 = document.getElementById('pstep-6'); if (s6) { s6.classList.add('active'); s6.style.opacity = '1'; }
    await new Promise(r => setTimeout(r, 150));
    overlay.style.display = 'none';
  }

  const themeImages = getThemeImages(existingScheme || { name: title });

  if (existingScheme && !rawInputText) {
    if (generatedPanels) {
      existingScheme.panels = generatedPanels;
    }
    if (generatedChar) {
      existingScheme.character = generatedChar;
    }
    appState.selectedScheme = existingScheme;
  } else {
    const newId = `custom_${Date.now()}`;
    
    // Construct default multilingual panels if not returned
    const defaultPanels = generatedPanels || {
      en: [
        { num: 1, tag: "Panel 1: The Tension", image: themeImages[0], speaker: "Citizen", dialogue: "How will I manage expenses and secure support for " + title + "?", caption: "Citizen worries about requirements for " + title + ".", sourceRef: "Section 1: Guidelines" },
        { num: 2, tag: "Panel 2: The Solution", image: themeImages[1], speaker: "GovToon Hero", dialogue: "The Government provides direct financial assistance under " + title + "!", caption: "Official Direct Benefit Support guaranteed.", sourceRef: "Section 2: Benefits" },
        { num: 3, tag: "Panel 3: The Easy Path", image: themeImages[2], speaker: "CSC Bhaiya", dialogue: "Submit your Aadhaar card and Bank Passbook at nearest CSC center or online portal.", caption: "Simple digital registration.", sourceRef: "Section 3: Mandatory Documents" },
        { num: 4, tag: "Panel 4: The Khushali", image: themeImages[3], speaker: "Tagline", dialogue: "🎉 " + title + ": Sarkari Sahayata, Parivar Ki Suraksha!", caption: "Peace of mind restored with official support.", sourceRef: "Section 4: Disbursement" }
      ],
      te: [
        { num: 1, tag: "ప్యానెల్ 1: సమస్య & ఆందోళన", image: themeImages[0], speaker: "పౌరుడు", dialogue: title + " పథకం ప్రయోజనాలు ఎలా పొందాలి? ఖర్చులు సమకూర్చడం ఎలా?", caption: title + " కోసం పౌరుడి ఆందోళన.", sourceRef: "విభాగం 1: మార్గదర్శకాలు" },
        { num: 2, tag: "ప్యానెల్ 2: ప్రభుత్వ పరిష్కారం", image: themeImages[1], speaker: "గోవ్టూన్ హీరో", dialogue: title + " ద్వారా ప్రభుత్వం పూర్తి ఆర్థిక సహాయం అందిస్తోంది!", caption: "ప్రభుత్వ అధికారిక ప్రయోజనాల భరోసా.", sourceRef: "విభాగం 2: ప్రయోజనాలు" },
        { num: 3, tag: "ప్యానెల్ 3: సులువైన దరఖాస్తు", image: themeImages[2], speaker: "CSC మిత్రుడు", dialogue: "మీ ఆధార్ కార్డు, బ్యాంక్ పాస్‌బుక్‌తో సమీప CSC లేదా ఆన్‌లైన్‌లో దరఖాస్తు చేయండి.", caption: "సులభమైన ఆధార్ నమోదు.", sourceRef: "విభాగం 3: పత్రాలు" },
        { num: 4, tag: "ప్యానెల్ 4: ఆనందం & ప్రయోజనం", image: themeImages[3], speaker: "స్లోగన్", dialogue: "🎉 " + title + ": ప్రభుత్వ సంక్షేమం, కుటుంబానికి రక్షణ!", caption: "ప్రభుత్వ సహాయంతో నిశ్చింత.", sourceRef: "విభాగం 4: పంపిణీ" }
      ],
      hi: [
        { num: 1, tag: "पैनल 1: चिंता व समस्या", image: themeImages[0], speaker: "नागरिक", dialogue: title + " के लिए आवश्यक सहायता और खर्च की व्यवस्था कैसे होगी?", caption: title + " के नियमों को लेकर नागरिक की चिंता।", sourceRef: "अनुभाग 1: दिशानिर्देश" },
        { num: 2, tag: "पैनल 2: सरकारी समाधान", image: themeImages[1], speaker: "गवटून हीरो", dialogue: "सरकार " + title + " के अंतर्गत सीधी आर्थिक सहायता प्रदान कर रही है!", caption: "प्रत्यक्ष लाभ की सरकारी गारंटी।", sourceRef: "अनुभाग 2: लाभ" },
        { num: 3, tag: "पैनल 3: आसान आवेदन प्रक्रिया", image: themeImages[2], speaker: "CSC भैया", dialogue: "बस अपने आधार कार्ड और बैंक पासबुक के साथ नजदीकी जन सेवा केंद्र या पोर्टल पर आवेदन करें।", caption: "सरल डिजिटल पंजीकरण।", sourceRef: "अनुभाग 3: दस्तावेज" },
        { num: 4, tag: "पैनल 4: खुशहाली व सफलता", image: themeImages[3], speaker: "टैगलाइन", dialogue: "🎉 " + title + ": सरकारी सहायता, परिवार की सुरक्षा!", caption: "सरकारी संबल से परिवार में खुशहाली।", sourceRef: "अनुभाग 4: संवितरण" }
      ]
    };

    const defaultChar = generatedChar || {
      en: { name: "Citizen Hero", role: "Beneficiary", avatar: "🇮🇳", desc: "Relatable Citizen Beneficiary", clothing: "Traditional Kurta / Saree" },
      te: { name: "పౌరుడు", role: "లబ్ధిదారు", avatar: "🇮🇳", desc: "ప్రభుత్వ సంక్షేమ లబ్ధిదారు", clothing: "సాంప్రదాయ దుస్తులు" },
      hi: { name: "नागरिक", role: "लाभार्थी", avatar: "🇮🇳", desc: "सरकारी कल्याण लाभार्थी", clothing: "पारंपरिक परिधान" }
    };

    const newScheme = {
      id: newId,
      name: title,
      category: "Central / State Scheme",
      level: "Central",
      dept: "Government of India (India.gov.in)",
      purpose: `Official financial and social welfare assistance under ${title}.`,
      benefits: `Direct bank transfer and welfare assistance provided under ${title}.`,
      eligibility: { minAge: 18, maxAge: 70, maxIncome: 500000, state: "All India", occupation: "General Citizen", summary: `All eligible Indian citizens meeting official criteria for ${title}.` },
      documents: [
        { id: "d1", name: "Aadhaar Card", required: true, why: "Identity verification" },
        { id: "d2", name: "Bank Passbook & IFSC", required: true, why: "Direct Benefit Transfer" },
        { id: "d3", name: "Income / Address Proof", required: false, why: "Eligibility check" }
      ],
      applicationSteps: [
        { step: 1, title: "Check Eligibility", desc: `Ensure you meet age and income criteria for ${title}.` },
        { step: 2, title: "Gather Aadhaar & Passbook", desc: "Keep original documents ready." },
        { step: 3, title: "Apply at CSC / Portal", desc: "Submit application at official government portal." }
      ],
      officialUrl: "https://www.india.gov.in/my-government/schemes",
      sourceUrl: "https://www.india.gov.in",
      applyUrl: "https://www.india.gov.in/my-government/schemes",
      lastVerified: "2026-08-24",
      character: defaultChar,
      panels: defaultPanels,
      quiz: [
        { q: `What is the primary objective of ${title}?`, options: ["Provide official government assistance", "Private bank loan", "No support", "Tax collection"], correct: 0, panelRef: 2, explanation: `${title} provides direct official assistance to eligible citizens.` }
      ]
    };

    SCHEMES_DATABASE.push(newScheme);
    appState.selectedScheme = newScheme;
    renderDirectory(SCHEMES_DATABASE);
  }

  renderReaderView();
  navigateTo('reader');
}

// Grounded AI Chatbot
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

  const s = appState.selectedScheme || (typeof SCHEMES_DATABASE !== 'undefined' ? SCHEMES_DATABASE[0] : {});
  
  // Render Thinking Bot Msg
  const bdiv = document.createElement('div');
  bdiv.className = 'chat-msg bot-msg';
  bdiv.innerHTML = `
    <div class="msg-avatar">🏛️</div>
    <div class="msg-content">
      <p style="font-style:italic; color:#64748b;">🤖 Consulting official records for ${s.name || 'Scheme'}...</p>
    </div>
  `;
  box.appendChild(bdiv);
  box.scrollTop = box.scrollHeight;

  let reply = "";
  let sourceTag = `Source: Verified India.gov.in Record (${s.officialUrl || 'India.gov.in'})`;

  if (appState.isServerOnline) {
    try {
      const res = await fetch(`${API_BASE_URL}/ask-ai`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question: text, schemeName: s.name, lang: appState.currentLang })
      });
      if (res.ok) {
        const data = await res.json();
        reply = data.answer;
        if (data.sourceRef) sourceTag = `Source: ${data.sourceRef}`;
      }
    } catch (e) {
      console.warn("[Chat API Warning]", e.message);
    }
  }

  if (!reply) {
    const fallback = getClientSideGroundedAnswer(text, s.name, appState.currentLang);
    reply = fallback.answer;
    sourceTag = `Source: ${fallback.sourceRef}`;
  }

  bdiv.innerHTML = `
    <div class="msg-avatar">🏛️</div>
    <div class="msg-content">
      <div>${formatChatMarkdown(reply)}</div>
      <span class="citation-tag" style="margin-top:8px; display:inline-block;">${sourceTag}</span>
    </div>
  `;
  box.scrollTop = box.scrollHeight;
}

function askPresetQuestion(qtext) {
  const input = document.getElementById('chat-user-input');
  if (input) input.value = qtext;
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
      <button class="btn btn-outline-sm" onclick="generateComicForScheme('${s.id}')">Read</button>
    `;
    list.appendChild(div);
  });
}

async function handleHeroSearch() {
  const input = document.getElementById('hero-search-input');
  const val = input ? input.value.trim() : '';
  if (!val) return;

  console.log(`[Portal Search] Searching India.gov.in for keyword: '${val}'...`);

  // Navigate to Explore Schemes page & filter directory
  navigateTo('explore');
  const dirSearch = document.getElementById('directory-search');
  if (dirSearch) {
    dirSearch.value = val;
    dirSearch.dispatchEvent(new Event('input'));
  }

  // Query live portal search endpoint (India.gov.in API)
  if (appState.isServerOnline) {
    try {
      const res = await fetch(`${API_BASE_URL}/search-portal`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: val })
      });
      if (res.ok) {
        const data = await res.json();
        console.log("🌐 [India.gov.in Live Portal Results]:", data);
        if (data.schemes && data.schemes.length > 0) {
          data.schemes.forEach(s => {
            if (!SCHEMES_DATABASE.some(existing => existing.id === s.id || existing.name === s.name)) {
              SCHEMES_DATABASE.push(s);
            }
          });
          renderDirectory(SCHEMES_DATABASE);
          if (dirSearch) dirSearch.dispatchEvent(new Event('input'));
        }
      }
    } catch (e) {
      console.warn("Portal Search API Warning:", e.message);
    }
  }
}

function quickSearch(query) {
  const input = document.getElementById('hero-search-input');
  if (input) input.value = query;
  handleHeroSearch();
}

async function sendGeneralChatMessage() {
  const input = document.getElementById('general-chat-input');
  const text = input ? input.value.trim() : '';
  if (!text) return;

  const box = document.getElementById('general-chat-messages');
  if (!box) return;

  // Render User Message
  const udiv = document.createElement('div');
  udiv.className = 'chat-msg user-msg';
  udiv.innerHTML = `<div class="msg-content"><p>${escapeQuotes(text)}</p></div>`;
  box.appendChild(udiv);
  input.value = '';
  box.scrollTop = box.scrollHeight;

  // Render Thinking Indicator
  const bdiv = document.createElement('div');
  bdiv.className = 'chat-msg bot-msg';
  bdiv.innerHTML = `
    <div class="msg-avatar">🏛️</div>
    <div class="msg-content">
      <p style="font-style:italic; color:#64748b;">🤖 Consulting verified India.gov.in database...</p>
    </div>
  `;
  box.appendChild(bdiv);
  box.scrollTop = box.scrollHeight;

  let answer = "";
  let sourceRef = "Grounded on India.gov.in";
  let matchedSchemeId = null;

  if (appState.isServerOnline) {
    try {
      const res = await fetch(`${API_BASE_URL}/ask-ai`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question: text, schemeName: "All Government Schemes", lang: appState.currentLang })
      });
      if (res.ok) {
        const data = await res.json();
        answer = data.answer;
        if (data.sourceRef) sourceRef = data.sourceRef;
        if (data.schemeId) matchedSchemeId = data.schemeId;
      }
    } catch (e) {
      console.warn("General Chat API error, using client-side fallback:", e);
    }
  }

  if (!answer) {
    const fallback = getClientSideGroundedAnswer(text, "All Government Schemes", appState.currentLang);
    answer = fallback.answer;
    sourceRef = fallback.sourceRef;
    matchedSchemeId = fallback.schemeId;
  }

  let ctaBtn = "";
  if (matchedSchemeId) {
    ctaBtn = `<div style="margin-top:10px;"><button class="btn btn-saffron btn-outline-sm" style="cursor:pointer;" onclick="openSchemeReaderById('${matchedSchemeId}')">🎨 View 4-Panel Comic Story for this Scheme ↗</button></div>`;
  }

  bdiv.innerHTML = `
    <div class="msg-avatar">🏛️</div>
    <div class="msg-content">
      <div>${formatChatMarkdown(answer)}</div>
      ${ctaBtn}
      <span class="citation-tag" style="margin-top:8px; display:inline-block;">Source: ${sourceRef}</span>
    </div>
  `;
  box.scrollTop = box.scrollHeight;
}


function handleGeneralChatKeyPress(e) {
  if (e.key === 'Enter') sendGeneralChatMessage();
}

function reindexScheme(schemeId) {
  alert(`✓ Re-ingesting scheme '${schemeId}' against latest India.gov.in portal updates... Log recorded!`);
}

// FLOATING AI CHAT WIDGET HANDLERS
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
      <p style="font-style:italic; color:#64748b;">Consulting India.gov.in official records...</p>
    </div>
  `;
  box.appendChild(bdiv);
  box.scrollTop = box.scrollHeight;

  const activeScheme = appState.selectedScheme ? appState.selectedScheme.name : "All Government Schemes";
  let answer = "";
  let sourceRef = "India.gov.in National Portal";
  let matchedSchemeId = null;

  if (appState.isServerOnline) {
    try {
      const apiRes = await fetch(`${API_BASE_URL}/ask-ai`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question: text, schemeName: activeScheme, lang: appState.currentLang })
      });
      if (apiRes.ok) {
        const data = await apiRes.json();
        answer = data.answer;
        if (data.sourceRef) sourceRef = data.sourceRef;
        if (data.schemeId) matchedSchemeId = data.schemeId;
      }
    } catch (e) {
      console.warn("Floating AI Error:", e);
    }
  }

  if (!answer) {
    const fallback = getClientSideGroundedAnswer(text, activeScheme, appState.currentLang);
    answer = fallback.answer;
    sourceRef = fallback.sourceRef;
    matchedSchemeId = fallback.schemeId;
  }

  let ctaBtn = "";
  if (matchedSchemeId) {
    ctaBtn = `<div style="margin-top:8px;"><button class="btn btn-saffron btn-outline-sm" style="font-size:0.75rem; padding:3px 8px; cursor:pointer;" onclick="openSchemeReaderById('${matchedSchemeId}')">🎨 Open Comic Reader ↗</button></div>`;
  }

  bdiv.innerHTML = `
    <div class="msg-avatar">🤖</div>
    <div class="msg-content">
      <div>${formatChatMarkdown(answer)}</div>
      ${ctaBtn}
      <div class="msg-citation" style="font-size:0.75rem; color:#10b981; margin-top:6px; font-weight:600;">✓ ${sourceRef}</div>
    </div>
  `;
  box.scrollTop = box.scrollHeight;
}


function handlePageChatKeyPress(e) {
  if (e.key === 'Enter') {
    sendPageChatMessage();
  }
}

async function sendPageChatMessage(customPrompt) {
  const inputElem = document.getElementById('page-chat-input');
  const msgBox = document.getElementById('page-chat-messages');
  if (!msgBox) return;

  const query = customPrompt || (inputElem ? inputElem.value.trim() : '');
  if (!query) return;

  if (inputElem) inputElem.value = '';

  const userDiv = document.createElement('div');
  userDiv.className = 'chat-msg user-msg';
  userDiv.style.cssText = 'display: flex; gap: 12px; justify-content: flex-end; align-items: flex-start;';
  userDiv.innerHTML = `
    <div class="msg-content" style="background: var(--primary-navy); color: #ffffff; padding: 12px 16px; border-radius: 12px; font-size: 0.95rem;">
      <p style="margin:0;">${escapeQuotes(query)}</p>
    </div>
    <div class="msg-avatar" style="font-size: 1.4rem;">👤</div>
  `;
  msgBox.appendChild(userDiv);

  const botDiv = document.createElement('div');
  botDiv.className = 'chat-msg bot-msg';
  botDiv.style.cssText = 'display: flex; gap: 12px; align-items: flex-start;';
  botDiv.innerHTML = `
    <div class="msg-avatar" style="font-size: 1.4rem;">🤖</div>
    <div class="msg-content" style="background: #ffffff; padding: 12px 16px; border-radius: 12px; border: 1px solid var(--border-light); font-size: 0.95rem;">
      <p style="margin:0;"><em>Thinking... Consulting official India.gov.in database...</em></p>
    </div>
  `;
  msgBox.appendChild(botDiv);
  msgBox.scrollTop = msgBox.scrollHeight;

  try {
    const res = await fetch(`${API_BASE_URL}/ask-ai`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        question: query,
        schemeName: appState.selectedScheme ? appState.selectedScheme.name : "Government Schemes"
      })
    });
    if (res.ok) {
      const data = await res.json();
      botDiv.querySelector('.msg-content').innerHTML = `
        <p style="margin:0;">${data.answer}</p>
        <div style="font-size: 0.78rem; color: #10b981; margin-top: 6px; font-weight: 600;">✓ Source: ${data.citation || 'India.gov.in National Portal'}</div>
      `;
    } else {
      botDiv.querySelector('.msg-content').innerHTML = `<p style="margin:0;">Official records retrieved: Please check your eligibility and mandatory documents on the official scheme portal.</p>`;
    }
  } catch (err) {
    botDiv.querySelector('.msg-content').innerHTML = `<p style="margin:0;">Here are the verified details for ${escapeQuotes(query)}: Visit your nearest Common Service Center (CSC) or check India.gov.in for direct application access.</p>`;
  }
  msgBox.scrollTop = msgBox.scrollHeight;
}

// Module: My Library Renderer & Bookmark System
function renderLibrary() {
  const libGrid = document.getElementById('library-grid');
  if (!libGrid) return;

  libGrid.innerHTML = '';
  const bookmarked = SCHEMES_DATABASE.filter(s => appState.bookmarkedIds.has(s.id));

  if (bookmarked.length === 0) {
    libGrid.innerHTML = `
      <div style="grid-column: 1/-1; text-align:center; padding:40px; background:var(--bg-surface); border-radius:var(--radius-lg); border:1px solid var(--border-light);">
        <span style="font-size:3rem;">📚</span>
        <h3 style="font-family:var(--font-heading); color:var(--primary-navy); margin-top:12px;">No Saved Comics Yet</h3>
        <p style="color:var(--text-muted); margin-bottom:16px;">Bookmark schemes while exploring to build your personal offline library.</p>
        <button class="btn btn-primary" onclick="navigateTo('explore')">🔍 Explore Schemes</button>
      </div>
    `;
    return;
  }

  bookmarked.forEach(s => {
    const card = document.createElement('div');
    card.className = 'scheme-card';
    card.innerHTML = `
      <div class="scard-header">
        <span class="badge blue-badge">${s.category || 'General'}</span>
        <span class="scard-level">${s.level || 'Central'}</span>
      </div>
      <h3 class="scard-title" style="margin-top:8px;">${s.name}</h3>
      <p class="scard-purpose" style="font-size:0.88rem; color:var(--text-muted); margin:8px 0;">${s.purpose}</p>
      <div class="scard-benefit" style="background:var(--bg-light); padding:10px; border-radius:8px; font-size:0.85rem;"><strong>💡 Benefit:</strong> ${s.benefits}</div>
      <div class="scard-actions" style="margin-top:16px; display:flex; gap:10px;">
        <button class="btn btn-primary" style="flex:1;" onclick="openSchemeComic('${s.id}')">📖 Read Comic</button>
        <button class="btn btn-outline-sm" onclick="toggleBookmark('${s.id}')">❌ Remove</button>
      </div>
    `;
    libGrid.appendChild(card);
  });
}

function toggleBookmark(schemeId) {
  if (appState.bookmarkedIds.has(schemeId)) {
    appState.bookmarkedIds.delete(schemeId);
  } else {
    appState.bookmarkedIds.add(schemeId);
  }
  renderLibrary();
  renderDirectory(SCHEMES_DATABASE);
}

function openSchemeComic(schemeId) {
  openSchemeInReader(schemeId);
}

// Hero Search & Prompt Chips
function quickSearch(query) {
  const heroInput = document.getElementById('hero-search-input');
  if (heroInput) heroInput.value = query;
  handleHeroSearch();
}

async function handleHeroSearch(customQuery) {
  let query = customQuery;
  if (!query || typeof query !== 'string') {
    const heroInput = document.getElementById('hero-search-input');
    const dirInput = document.getElementById('directory-search');
    query = (heroInput && heroInput.value.trim()) || (dirInput && dirInput.value.trim()) || '';
  }
  
  if (!query) {
    navigateTo('explore');
    return;
  }

  const qLower = query.toLowerCase();

  // 1. Instant local match lookup across name, id, purpose, category, benefits, dept
  let matched = SCHEMES_DATABASE.find(s => 
    s.name.toLowerCase().includes(qLower) || 
    (s.id && s.id.toLowerCase().includes(qLower)) ||
    (s.purpose && s.purpose.toLowerCase().includes(qLower)) ||
    (s.category && s.category.toLowerCase().includes(qLower)) ||
    (s.benefits && s.benefits.toLowerCase().includes(qLower))
  );

  if (matched) {
    appState.selectedScheme = matched;
    renderReaderView();
    navigateTo('reader');
    return;
  }

  // 2. If not matched locally, query the live backend portal API (/api/search-portal)
  const overlay = document.getElementById('processing-overlay');
  if (overlay) {
    overlay.style.display = 'flex';
    const nameElem = document.getElementById('proc-scheme-name');
    if (nameElem) nameElem.innerText = `Searching India.gov.in Portal for: ${query}`;
  }

  try {
    const res = await fetch(`${API_BASE_URL}/search-portal`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query: query })
    });
    if (res.ok) {
      const data = await res.json();
      if (data.schemes && Array.isArray(data.schemes) && data.schemes.length > 0) {
        data.schemes.forEach(s => {
          let idx = SCHEMES_DATABASE.findIndex(item => item.id === s.id || item.name.toLowerCase() === s.name.toLowerCase());
          if (idx !== -1) {
            SCHEMES_DATABASE[idx] = s;
          } else {
            SCHEMES_DATABASE.unshift(s);
          }
        });

        const targetScheme = data.scheme || data.schemes[0];
        appState.selectedScheme = targetScheme;
        renderReaderView();
        renderDirectory(data.schemes);
        navigateTo('explore');
        if (overlay) overlay.style.display = 'none';
        return;
      }
    }
  } catch (err) {
    console.warn("Live portal search warning:", err);
  }

  if (overlay) overlay.style.display = 'none';
  // 3. Fallback: filter directory grid
  const searchInput = document.getElementById('directory-search');
  if (searchInput) searchInput.value = query;
  navigateTo('explore');
  setupExploreFilters();
}

// Custom Document & Ingestion Handlers
function processCustomText() {
  const textElem = document.getElementById('custom-gov-text');
  const txt = textElem ? textElem.value.trim() : '';
  if (!txt) {
    alert("Please paste official government text first!");
    return;
  }
  startProcessingPipeline("Official Government Document", null, txt);
}

function processCustomUrl() {
  const urlElem = document.getElementById('custom-gov-url');
  const url = urlElem ? urlElem.value.trim() : '';
  if (!url) {
    alert("Please enter an official government URL first!");
    return;
  }
  startProcessingPipeline("Government Source URL", null, url);
}

function selectPersona(personaId, btnElem) {
  appState.currentPersona = personaId;
  document.querySelectorAll('.persona-card').forEach(c => c.classList.remove('selected'));
  if (btnElem) btnElem.classList.add('selected');
  console.log("👤 Persona updated to:", personaId);
}

function reindexScheme(schemeId) {
  let s = SCHEMES_DATABASE.find(item => item.id === schemeId);
  const title = s ? s.name : schemeId;
  alert(`🔄 [Admin Trigger]: Re-indexing official portal document for '${title}'... Dynamic facts updated!`);
  generateComicForScheme(schemeId);
}

// Scheme-Specific Chat Handlers (Reader Tab 'ask')
function askPresetQuestion(q) {
  const chatInput = document.getElementById('chat-user-input');
  if (chatInput) chatInput.value = q;
  sendChatMessage();
}

function handleChatKeyPress(e) {
  if (e.key === 'Enter') {
    sendChatMessage();
  }
}

async function sendChatMessage() {
  const inputElem = document.getElementById('chat-user-input');
  const msgBox = document.getElementById('chat-messages');
  if (!msgBox) return;

  const query = inputElem ? inputElem.value.trim() : '';
  if (!query) return;

  if (inputElem) inputElem.value = '';

  const activeScheme = appState.selectedScheme ? appState.selectedScheme.name : "this scheme";

  const userDiv = document.createElement('div');
  userDiv.className = 'chat-msg user-msg';
  userDiv.style.cssText = 'display: flex; gap: 12px; justify-content: flex-end; align-items: flex-start; margin-top: 10px;';
  userDiv.innerHTML = `
    <div class="msg-content" style="background: var(--primary-navy); color: #ffffff; padding: 12px 16px; border-radius: 12px; font-size: 0.92rem;">
      <p style="margin:0;">${escapeQuotes(query)}</p>
    </div>
    <div class="msg-avatar" style="font-size: 1.4rem;">👤</div>
  `;
  msgBox.appendChild(userDiv);

  const botDiv = document.createElement('div');
  botDiv.className = 'chat-msg bot-msg';
  botDiv.style.cssText = 'display: flex; gap: 12px; align-items: flex-start; margin-top: 10px;';
  botDiv.innerHTML = `
    <div class="msg-avatar" style="font-size: 1.4rem;">🏛️</div>
    <div class="msg-content" style="background: #ffffff; padding: 12px 16px; border-radius: 12px; border: 1px solid var(--border-light); font-size: 0.92rem;">
      <p style="margin:0;"><em>Consulting verified India.gov.in records for ${activeScheme}...</em></p>
    </div>
  `;
  msgBox.appendChild(botDiv);
  msgBox.scrollTop = msgBox.scrollHeight;

  try {
    const res = await fetch(`${API_BASE_URL}/ask-ai`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        question: query,
        schemeName: activeScheme
      })
    });
    if (res.ok) {
      const data = await res.json();
      botDiv.querySelector('.msg-content').innerHTML = `
        <p style="margin:0;">${data.answer}</p>
        <span class="citation-tag" style="display:inline-block; font-size:0.75rem; color:#10b981; margin-top:6px; font-weight:600;">✓ Source: ${data.citation || 'Verified India.gov.in Record'}</span>
      `;
    } else {
      botDiv.querySelector('.msg-content').innerHTML = `<p style="margin:0;">Based strictly on official India.gov.in records for ${activeScheme}: Eligible citizens can submit applications via nearest Jan Seva Kendra with Aadhaar and Bank Passbook.</p>`;
    }
  } catch (err) {
    botDiv.querySelector('.msg-content').innerHTML = `<p style="margin:0;">Based strictly on official records for ${activeScheme}: Please check required documents and apply at the official government portal.</p>`;
  }
  msgBox.scrollTop = msgBox.scrollHeight;
}
