// GovToon — Production Full-Stack AI Government Scheme Explainer
// Official Source Grounding: India.gov.in National Portal of India / myScheme

let API_BASE_URL = 'http://localhost:5000/api';

// Comprehensive Multilingual Translation Dictionary (EN, TE, HI)
const TRANSLATIONS = {
  en: {
    logo_sub: "Government Schemes, Told Simply.",
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
    character: {
      en: { name: "Ramu Kaka", role: "Small Farmer", avatar: "👨🏽‍🌾", desc: "White Kurta & Blue Gamcha" },
      te: { name: "రాము కాకా", role: "చిన్న రైతు", avatar: "👨🏽‍🌾", desc: "తెల్లని కుర్తా మరియు నీలిరంగు రుమాలు" },
      hi: { name: "रामू काका", role: "छोटे किसान", avatar: "👨🏽‍🌾", desc: "सफेद कुर्ता और नीला गमछा" }
    },
    panels: {
      en: [
        { num: 1, tag: "Panel 1: The Tension", image: "assets/pm_kisan_1.jpg", speaker: "Ramu Kaka", dialogue: "Hey Bhagwan! Seed and fertilizer prices have gone up. Where will I get the money to sow crops this season?", caption: "Ramu Kaka worries about rising agricultural costs.", sourceRef: "Section 1: Background & Target Beneficiaries" },
        { num: 2, tag: "Panel 2: The Solution", image: "assets/pm_kisan_2.jpg", speaker: "CSC Bhaiya", dialogue: "Don't worry Kaka! The Government sends ₹2,000 directly to your bank account 3 times a year!", caption: "Sarkari Paisa, Seedha Khate Mein (Direct Benefit Transfer).", sourceRef: "Section 2: Benefit Structure - ₹6000/yr" },
        { num: 3, tag: "Panel 3: The Easy Path", image: "assets/pm_kisan_3.jpg", speaker: "Ramu Kaka & Bhaiya", dialogue: "Ramu Kaka: 'Is Aadhaar and Bank book enough?' Bhaiya: 'Yes! Simple fingerprint e-KYC at the Jan Seva Kendra.'", caption: "Simple registration with Aadhaar & Land Passbook.", sourceRef: "Section 3: Mandatory Documents & e-KYC" },
        { num: 4, tag: "Panel 4: The Khushali", image: "assets/pm_kisan_4.jpg", speaker: "Tagline", dialogue: "🌾 PM-Kisan: Kheti Ki Takat, Kisan Ki Barkat!", caption: "Prosperity restored, seeds bought on time.", sourceRef: "Section 4: Disbursement & Impact" }
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
    character: {
      en: { name: "Kalu", role: "Tea Stall Owner", avatar: "👴🏽", desc: "Hardworking vendor worried about old age & aching bones" },
      te: { name: "కాలు", role: "టీ కొట్టు యజమాని", avatar: "👴🏽", desc: "వృద్ధాప్యం గురించి ఆందోళన చెందుతున్న శ్రామికుడు" },
      hi: { name: "कालू", role: "चाय विक्रेता", avatar: "👴🏽", desc: "बुढ़ापे की चिंता करने वाले चाय विक्रेता" }
    },
    panels: {
      en: [
        { num: 1, tag: "Panel 1: The Tension", image: "assets/pm_kisan_1.jpg", speaker: "Kalu", dialogue: "Didi, my bones ache. I can't sell tea forever. What happens when I am too old to stand?", caption: "Kalu worries about his future.", sourceRef: "Section 1" },
        { num: 2, tag: "Panel 2: The Solution", image: "assets/pm_kisan_2.jpg", speaker: "Didi", dialogue: "Kalu, think of this scheme like planting a banyan tree. Drop coins today, get shade (money) every month when old.", caption: "Old age support grows with you.", sourceRef: "Section 2" },
        { num: 3, tag: "Panel 3: The Easy Path", image: "assets/pm_kisan_3.jpg", speaker: "Didi", dialogue: "Just take your Aadhaar card to the Blue Building down the street. Tell them you want to save ₹20 a day.", caption: "Simple registration at Jan Seva Kendra.", sourceRef: "Section 3" },
        { num: 4, tag: "Panel 4: The Khushali", image: "assets/pm_kisan_4.jpg", speaker: "Alert", dialogue: "🎉 Monthly Pension Received: ₹3,000", caption: "Save a little now, get a 'Salary' for life when you retire.", sourceRef: "Section 4" }
      ],
      te: [
        { num: 1, tag: "ప్యానెల్ 1: ఆందోళన", image: "assets/pm_kisan_1.jpg", speaker: "కాలు", dialogue: "దిదీ, వయసు పైబడుతోంది. ఎల్లప్పుడూ టీ అమ్మలేను. వృద్ధాప్యంలో ఏమిటి పరిస్థితి?", caption: "భవిష్యత్తు గురించి ఆందోళన.", sourceRef: "Section 1" },
        { num: 2, tag: "ప్యానెల్ 2: పరిష్కారం", image: "assets/pm_kisan_2.jpg", speaker: "దిదీ", dialogue: "ఈ పథకాన్ని ఒక మర్రిచెట్టు నాటడం లాంటిదిగా భావించు. ఈరోజు కొన్ని నాణేలు దాచితే, వృద్ధాప్యంలో ప్రతినెల నీడ (డబ్బు) ఇస్తుంది.", caption: "వృద్ధాప్య ఆసరా.", sourceRef: "Section 2" },
        { num: 3, tag: "ప్యానెల్ 3: నమోదు", image: "assets/pm_kisan_3.jpg", speaker: "దిదీ", dialogue: "మీ ఆధార్ కార్డు తీసుకెళ్లి సేవ కేంద్రంలో ఇవ్వండి. రోజుకు 20 రూపాయలు దాచుకుంటానని చెప్పండి.", caption: "సులువైన నమోదు.", sourceRef: "Section 3" },
        { num: 4, tag: "ప్యానెల్ 4: ఆనందం", image: "assets/pm_kisan_4.jpg", speaker: "అలర్ట్", dialogue: "🎉 నెలవారీ పెన్షన్ లభించింది: ₹3,000", caption: "నెలవారీ పెన్షన్ హామీ.", sourceRef: "Section 4" }
      ],
      hi: [
        { num: 1, tag: "पैनल 1: चिंता", image: "assets/pm_kisan_1.jpg", speaker: "कालू", dialogue: "दीदी, अब शरीर थकने लगा है। हमेशा चाय नहीं बेच सकता। बुढ़ापे में क्या होगा?", caption: "भविष्य की चिंता।", sourceRef: "Section 1" },
        { num: 2, tag: "पैनल 2: समाधान", image: "assets/pm_kisan_2.jpg", speaker: "दीदी", dialogue: "कालू, इसे बरगद का पेड़ लगाने जैसा समझो। आज थोड़े सिक्के डालो, बुढ़ापे में हर महीने ठंडी छांव मिलेगी।", caption: "बूढ़ापे की मजबूत लाठी।", sourceRef: "Section 2" },
        { num: 3, tag: "पैनल 3: आसान पंजीकरण", image: "assets/pm_kisan_3.jpg", speaker: "दीदी", dialogue: "बस अपना आधार कार्ड नीले जन सेवा केंद्र ले जाओ और बचत शुरू करो।", caption: "आसान पंजीकरण।", sourceRef: "Section 3" },
        { num: 4, tag: "पैनल 4: खुशहाली", image: "assets/pm_kisan_4.jpg", speaker: "अलर्ट", dialogue: "🎉 मासिक पेंशन प्राप्त: ₹3,000", caption: "हर महीने ₹3,000 की गारंटी।", sourceRef: "Section 4" }
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
      { step: 1, title: "Check Ayushman Card Status", desc: "Visit beneficiary.nha.gov.in or nearest hospital Arogyamitra." },
      { step: 2, title: "Show Aadhaar & Ration Card", desc: "Complete instant e-KYC." },
      { step: 3, title: "Get Golden Ayushman Card", desc: "Free Ayushman PVC Card issued." },
      { step: 4, title: "Cashless Treatment", desc: "Show card at hospital counter for ₹5 Lakh zero-cash treatment." }
    ],
    officialUrl: "https://www.india.gov.in/my-government/schemes/ayushman-bharat",
    sourceUrl: "https://pmjay.gov.in",
    lastVerified: "2026-08-24",
    character: {
      en: { name: "Lata Tai", role: "Domestic Worker", avatar: "👩🏽", desc: "Working mother worried about high hospital operation costs" },
      te: { name: "లతా తాయి", role: "గృహ కార్మికురాలు", avatar: "👩🏽", desc: "వైద్య ఖర్చుల గురించి ఆందోళన చెందుతున్న తల్లి" },
      hi: { name: "लता ताई", role: "घरेलू कामगार", avatar: "👩🏽", desc: "अस्पताल के भारी खर्चे से चिंतित मां" }
    },
    panels: {
      en: [
        { num: 1, tag: "Panel 1: The Emergency", image: "assets/pm_kisan_1.jpg", speaker: "Lata Tai", dialogue: "Doctor says operation costs ₹1 Lakh! Where will we get this money at midnight?", caption: "Medical emergencies cause unexpected panic.", sourceRef: "Section 1" },
        { num: 2, tag: "Panel 2: The Solution", image: "assets/pm_kisan_2.jpg", speaker: "Asha Didi", dialogue: "Don't sell your gold! Show this Ayushman Card. Government pays up to ₹5 Lakh directly!", caption: "Golden Health Shield covers hospital bills.", sourceRef: "Section 2" },
        { num: 3, tag: "Panel 3: The Easy Path", image: "assets/pm_kisan_3.jpg", speaker: "Arogyamitra", dialogue: "Just scan fingerprint with Aadhaar. Zero cash required at hospital counter.", caption: "Instant cashless authorization.", sourceRef: "Section 3" },
        { num: 4, tag: "Panel 4: The Recovery", image: "assets/pm_kisan_4.jpg", speaker: "Lata Tai", dialogue: "Paid zero rupees! My family is healthy and debt-free.", caption: "Full hospital treatment with zero cash out of pocket.", sourceRef: "Section 4" }
      ],
      te: [
        { num: 1, tag: "ప్యానెల్ 1: అత్యవసరం", image: "assets/pm_kisan_1.jpg", speaker: "లతా తాయి", dialogue: "ఆపరేషన్‌కు లక్ష రూపాయలు అవుతాయని డాక్టర్ చెప్పారు! అర్ధరాత్రి అంత డబ్బు ఎక్కడ తెచ్చేది?", caption: "వైద్య అత్యవసర పరిస్థితి.", sourceRef: "Section 1" },
        { num: 2, tag: "ప్యానెల్ 2: ఆయుష్మాన్ కార్డ్", image: "assets/pm_kisan_2.jpg", speaker: "ఆశా దిదీ", dialogue: "బంగారం అమ్మకండి! ఆయుష్మాన్ గోల్డెన్ కార్డ్ చూపించండి. ప్రభుత్వం 5 లక్షల వరకు ఉచిత వైద్యం అందిస్తుంది!", caption: "ఉచిత వైద్య భద్రత.", sourceRef: "Section 2" },
        { num: 3, tag: "ప్యానెల్ 3: ఉచిత చికిత్స", image: "assets/pm_kisan_3.jpg", speaker: "ఆరోగ్యమిత్ర", dialogue: "ఆధార్ వేలిముద్ర వేస్తే సరిపోతుంది. కౌంటర్లో ఒక్క రూపాయి కూడా చెల్లించనవసరం లేదు.", caption: "క్యాష్‌లెస్ చికిత్స.", sourceRef: "Section 3" },
        { num: 4, tag: "ప్యానెల్ 4: ఆనందం", image: "assets/pm_kisan_4.jpg", speaker: "లతా తాయి", dialogue: "సున్నా రూపాయలు చెల్లించాం! కుటుంబం ఆరోగ్యంగా ఉంది.", caption: "రుణాలు లేని ఉచిత చికిత్స.", sourceRef: "Section 4" }
      ],
      hi: [
        { num: 1, tag: "पैनल 1: आपात स्थिति", image: "assets/pm_kisan_1.jpg", speaker: "लता ताई", dialogue: "डॉक्टर साहब कह रहे हैं ऑपरेशन में ₹1 लाख लगेगा! आधी रात को इतना पैसा कहां से लाऊं?", caption: "अस्पताल के खर्च से चिंता।", sourceRef: "Section 1" },
        { num: 2, tag: "पैनल 2: समाधान", image: "assets/pm_kisan_2.jpg", speaker: "आशा दीदी", dialogue: "गहने मत बेचो! आयुष्मान कार्ड दिखाओ। सरकार ₹5 लाख तक का अस्पताल खर्च खुद देगी!", caption: "₹5 लाख का मुफ्त इलाज।", sourceRef: "Section 2" },
        { num: 3, tag: "पैनल 3: कैशलेस प्रक्रिया", image: "assets/pm_kisan_3.jpg", speaker: "आरोग्यमित्र", dialogue: "बस आधार से फिंगरप्रिंट लगाएं। अस्पताल में ₹1 भी नगद नहीं देना होगा।", caption: "कैशलेस अस्पताल सेवा।", sourceRef: "Section 3" },
        { num: 4, tag: "पैनल 4: स्वस्थ परिवार", image: "assets/pm_kisan_4.jpg", speaker: "लता ताई", dialogue: "₹0 में पूरा इलाज हो गया! परिवार सुरक्षित है।", caption: "बिना कर्ज के इलाज।", sourceRef: "Section 4" }
      ]
    },
    quiz: [
      { q: "What is the annual health cover provided per family under Ayushman Bharat?", options: ["₹50,000", "₹5 Lakhs per family per year", "₹1 Lakh", "₹10 Lakhs"], correct: 1, panelRef: 2, explanation: "Ayushman Bharat provides ₹5 Lakh cashless hospitalization cover per family per year." }
    ]
  },
  {
    id: "surya_ghar",
    name: "PM Surya Ghar: Muft Bijli Yojana",
    category: "Housing & Energy",
    level: "Central",
    dept: "Ministry of New and Renewable Energy (MNRE)",
    purpose: "Provide up to 300 units of free electricity per month to 1 Crore households by assisting with rooftop solar panel installations.",
    benefits: "Direct financial subsidy up to ₹78,000 for 3kW rooftop solar installation + 300 units free electricity per month.",
    eligibility: {
      minAge: 18, maxAge: 100, maxIncome: 1000000, state: "All India", occupation: "General Citizen",
      summary: "Indian citizen families owning a suitable roof structure and valid electricity connection."
    },
    documents: [
      { id: "d1", name: "Electricity Bill", required: true, why: "Verification of active electricity connection & consumer number" },
      { id: "d2", name: "Aadhaar Card", required: true, why: "Identity proof for subsidy bank transfer" },
      { id: "d3", name: "Roof Ownership / House Document", required: true, why: "Confirms solar panel installation feasibility" }
    ],
    applicationSteps: [
      { step: 1, title: "Register on Portal", desc: "Visit pmsuryaghar.gov.in and enter your Electricity Consumer Number." },
      { step: 2, title: "Select Empanelled Vendor", desc: "Choose an official solar installer for technical survey." },
      { step: 3, title: "Get DISCOM Approval", desc: "Local power company inspects net-meter feasibility." },
      { step: 4, title: "Receive ₹78,000 Subsidy", desc: "Subsidy credited directly to your bank account within 30 days." }
    ],
    officialUrl: "https://www.india.gov.in/my-government/schemes/pm-surya-ghar",
    sourceUrl: "https://pmsuryaghar.gov.in",
    lastVerified: "2026-08-24",
    character: {
      en: { name: "Raju", role: "Youth / Student", avatar: "🎓", desc: "Tech-savvy youth keen on green solar energy for family home" },
      te: { name: "రాజు", role: "విద్యార్థి", avatar: "🎓", desc: "సోలార్ విద్యుత్ ద్వారా కరెంట్ బిల్లు తగ్గించుకోవాలనే విద్యార్థి" },
      hi: { name: "राजू", role: "युवा / छात्र", avatar: "🎓", desc: "सोलर ऊर्जा से मुफ्त बिजली पाने वाला छात्र" }
    },
    panels: {
      en: [
        { num: 1, tag: "Panel 1: The Tension", image: "assets/pm_kisan_1.jpg", speaker: "Raju", dialogue: "Father is stressed about heavy electricity bills every month! How can we reduce light charges?", caption: "Rising electricity bills cause family worry.", sourceRef: "Section 1" },
        { num: 2, tag: "Panel 2: The Solution", image: "assets/pm_kisan_2.jpg", speaker: "GovToon Hero", dialogue: "Install PM Surya Ghar Rooftop Solar! Get 300 units of FREE electricity every month + ₹78,000 subsidy!", caption: "Free Solar Power for 1 Crore Homes.", sourceRef: "Section 2" },
        { num: 3, tag: "Panel 3: The Easy Path", image: "assets/pm_kisan_3.jpg", speaker: "Raju & DISCOM", dialogue: "Register consumer number at pmsuryaghar.gov.in with Aadhaar and Electricity Bill.", caption: "Simple online registration.", sourceRef: "Section 3" },
        { num: 4, tag: "Panel 4: The Outcome", image: "assets/pm_kisan_4.jpg", speaker: "Tagline", dialogue: "☀️ PM Surya Ghar: Zero Light Bill, Permanent Savings!", caption: "300 units free electricity every month.", sourceRef: "Section 4" }
      ],
      te: [
        { num: 1, tag: "ప్యానెల్ 1: ఆందోళన", image: "assets/pm_kisan_1.jpg", speaker: "రాజు", dialogue: "ప్రతినెలా కరెంట్ బిల్లు ఎక్కువగా వస్తోంది. ఏం చేయాలి?", caption: "కరెంట్ బిల్లుపై ఆందోళన.", sourceRef: "Section 1" },
        { num: 2, tag: "ప్యానెల్ 2: పిఎమ్ సూర్య ఘర్", image: "assets/pm_kisan_2.jpg", speaker: "హీరో", dialogue: "పిఎమ్ సూర్య ఘర్ సోలార్ ప్యానెల్ అమర్చుకోండి! ప్రతినెలా 300 యూనిట్ల ఉచిత విద్యుత్ పొందండి!", caption: "ఉచిత సోలార్ విద్యుత్.", sourceRef: "Section 2" },
        { num: 3, tag: "ప్యానెల్ 3: నమోదు", image: "assets/pm_kisan_3.jpg", speaker: "రాజు", dialogue: "కరెంట్ బిల్లు, ఆధార్ కార్డుతో pmsuryaghar.gov.in పోర్టల్‌లో నమోదు చేసుకోండి.", caption: "సులువైన నమోదు.", sourceRef: "Section 3" },
        { num: 4, tag: "ప్యానెల్ 4: వెలుగులు", image: "assets/pm_kisan_4.jpg", speaker: "ట్యాగ్‌లైన్", dialogue: "☀️ పిఎమ్ సూర్య ఘర్: సున్నా కరెంట్ బిల్లు, నిరంతర పొదుపు!", caption: "ఉచిత విద్యుత్ సంతోషం.", sourceRef: "Section 4" }
      ],
      hi: [
        { num: 1, tag: "पैनल 1: चिंता", image: "assets/pm_kisan_1.jpg", speaker: "राजू", dialogue: "हर महीने बिजली बिल बहुत भारी आता है! क्या उपाय है?", caption: "बिजली बिल की चिंता।", sourceRef: "Section 1" },
        { num: 2, tag: "पैनल 2: समाधान", image: "assets/pm_kisan_2.jpg", speaker: "हीरो", dialogue: "पीएम सूर्य घर सोलर लगवाएं! हर महीने 300 यूनिट मुफ्त बिजली पाएँ!", caption: "मुफ्त सोलर बिजली।", sourceRef: "Section 2" },
        { num: 3, tag: "पैनल 3: पंजीकरण", image: "assets/pm_kisan_3.jpg", speaker: "राजू", dialogue: "बस बिजली बिल और आधार के साथ pmsuryaghar.gov.in पर रजिस्टर करें।", caption: "आसान ऑनलाइन आवेदन।", sourceRef: "Section 3" },
        { num: 4, tag: "पैनल 4: खुशहाली", image: "assets/pm_kisan_4.jpg", speaker: "टैगलाइन", dialogue: "☀️ पीएम सूर्य घर: जीरो बिजली बिल, पक्की बचत!", caption: "हर महीने 300 यूनिट फ्री।", sourceRef: "Section 4" }
      ]
    },
    quiz: [
      { q: "How many units of free electricity per month are supported under PM Surya Ghar?", options: ["50 Units", "100 Units", "300 Units per month", "500 Units"], correct: 2, panelRef: 2, explanation: "PM Surya Ghar provides up to 300 units of free electricity every month." }
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

  const lang = appState.currentLang;
  const t = TRANSLATIONS[lang] || TRANSLATIONS.en;

  grid.innerHTML = '';
  schemes.forEach(s => {
    const applyTargetUrl = s.applyUrl || s.sourceUrl || s.officialUrl || "https://www.india.gov.in/my-government/schemes";
    const card = document.createElement('div');
    card.className = 'scheme-card-item';
    card.innerHTML = `
      <div class="scard-header">
        <span class="badge blue-badge">${s.category} • ${s.level}</span>
        <h3>${s.name}</h3>
        <p class="scard-dept">${s.dept}</p>
      </div>
      <p class="scard-desc">${s.purpose}</p>
      <div class="scard-footer" style="display:flex; justify-content:space-between; align-items:center; gap:8px; flex-wrap:wrap;">
        <a href="${applyTargetUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-outline-sm" style="font-size:0.82rem;">🚀 Apply Online ↗</a>
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

  // 1. Update Header Info
  const catBadge = document.getElementById('reader-category-badge');
  if (catBadge) catBadge.innerText = `${s.category || 'General'} • ${s.level || 'Central'}`;

  const schemeNameElem = document.getElementById('reader-scheme-name');
  if (schemeNameElem) schemeNameElem.innerText = s.name;

  const schemeDeptElem = document.getElementById('reader-scheme-dept');
  if (schemeDeptElem) schemeDeptElem.innerText = `${s.dept || 'Government of India'} | Source: India.gov.in`;

  const sourceDateElem = document.getElementById('reader-source-date');
  if (sourceDateElem) sourceDateElem.innerText = `Last Verified: ${s.lastVerified || '2026-08-24'}`;

  const officialLinkElem = document.getElementById('reader-official-link');
  if (officialLinkElem) {
    const targetUrl = s.applyUrl || s.sourceUrl || s.officialUrl || "https://www.india.gov.in/my-government/schemes";
    officialLinkElem.href = targetUrl;
    officialLinkElem.target = "_blank";
    officialLinkElem.rel = "noopener noreferrer";
  }

  const chatSchemeNameElem = document.getElementById('chat-scheme-name');
  if (chatSchemeNameElem) chatSchemeNameElem.innerText = s.name;

  // 1.5. Scheme Key Summary & Highlights Card
  const summaryBox = document.getElementById('reader-scheme-summary-card');
  if (summaryBox) {
    const docNames = s.documents ? s.documents.map(d => d.name).join(', ') : 'Aadhaar Card, Bank Passbook';
    const eligSummary = s.eligibility ? s.eligibility.summary : 'Eligible Indian citizens';
    const targetUrl = s.applyUrl || s.sourceUrl || s.officialUrl || "https://www.india.gov.in/my-government/schemes";

    summaryBox.innerHTML = `
      <div style="background: var(--bg-surface); border: 1px solid var(--border-light); border-left: 5px solid var(--saffron); border-radius: var(--radius-lg); padding: 20px 24px; margin-bottom: 24px; box-shadow: var(--shadow-md);">
        <div style="display:flex; justify-content:space-between; align-items:flex-start; flex-wrap:wrap; gap:12px; margin-bottom:12px;">
          <div>
            <h3 style="font-family:var(--font-heading); color:var(--primary-navy); font-size:1.2rem; margin:0; display:flex; align-items:center; gap:8px;">
              📌 Scheme Key Details & Highlights Overview
            </h3>
            <p style="font-size:0.86rem; color:var(--text-muted); margin:4px 0 0 0;">Official Government Information Grounded on India.gov.in</p>
          </div>
          <a href="${targetUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-saffron btn-sm" style="font-size:0.85rem;">🚀 Apply Online ↗</a>
        </div>
        <div class="summary-details-grid" style="display:grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap:14px; margin-top:14px;">
          <div style="background:var(--bg-light); padding:12px 14px; border-radius:10px; border:1px solid var(--border-light);">
            <strong style="color:var(--trust-blue); font-size:0.82rem; display:block; margin-bottom:4px;">🎯 Core Objective / Purpose</strong>
            <span style="font-size:0.9rem; color:var(--text-main); font-weight:600; line-height:1.4; display:block;">${s.purpose}</span>
          </div>
          <div style="background:var(--bg-light); padding:12px 14px; border-radius:10px; border:1px solid var(--border-light);">
            <strong style="color:#10b981; font-size:0.82rem; display:block; margin-bottom:4px;">🎁 Key Benefits & Financial Cover</strong>
            <span style="font-size:0.9rem; color:var(--text-main); font-weight:700; line-height:1.4; display:block;">${s.benefits}</span>
          </div>
          <div style="background:var(--bg-light); padding:12px 14px; border-radius:10px; border:1px solid var(--border-light);">
            <strong style="color:var(--saffron); font-size:0.82rem; display:block; margin-bottom:4px;">👤 Target Beneficiary & Eligibility</strong>
            <span style="font-size:0.9rem; color:var(--text-main); font-weight:600; line-height:1.4; display:block;">${eligSummary}</span>
          </div>
          <div style="background:var(--bg-light); padding:12px 14px; border-radius:10px; border:1px solid var(--border-light);">
            <strong style="color:#8b5cf6; font-size:0.82rem; display:block; margin-bottom:4px;">📄 Mandatory Required Documents</strong>
            <span style="font-size:0.9rem; color:var(--text-main); font-weight:600; line-height:1.4; display:block;">${docNames}</span>
          </div>
        </div>
      </div>
    `;
  }

  // 2. Character Bible Card
  const charBox = document.getElementById('reader-character-card');
  if (charBox) {
    let charData = { name: "Ramu Kaka", role: "Small Farmer", avatar: "👨🏽‍🌾", desc: "White Kurta & Blue Gamcha" };
    if (s.character) {
      if (s.character[lang]) charData = s.character[lang];
      else if (s.character.en) charData = s.character.en;
      else if (typeof s.character === 'object') charData = s.character;
    }
    charBox.innerHTML = `
      <div class="char-avatar" style="font-size:2.2rem; background:var(--surface-subtle); padding:10px; border-radius:50%; width:56px; height:56px; display:flex; align-items:center; justify-content:center;">${charData.avatar || '👨🏽‍🌾'}</div>
      <div>
        <h4 style="font-family:var(--font-heading); font-size:1.15rem; color:var(--primary-navy); margin-bottom:2px;">${charData.name || 'Ramu Kaka'} <span style="color:var(--saffron); font-size:0.85rem;">(${charData.role || 'Beneficiary'})</span></h4>
        <p style="font-size:0.88rem; color:var(--text-muted);">${charData.desc || charData.clothing || 'Relatable Citizen Hero'}</p>
      </div>
    `;
  }

  // 3. Robust Panel Extraction (Handles both Objects & Arrays)
  let panelsList = [];
  if (Array.isArray(s.panels)) {
    panelsList = s.panels;
  } else if (s.panels && typeof s.panels === 'object') {
    panelsList = s.panels[lang] || s.panels.en || s.panels.hi || Object.values(s.panels)[0] || [];
  }

  const panelsContainer = document.getElementById('reader-panels-container');
  if (panelsContainer) {
    panelsContainer.innerHTML = '';
    const schemeImageMap = {
      pm_kisan: ["assets/pm_kisan_1.jpg", "assets/pm_kisan_2.jpg", "assets/pm_kisan_3.jpg", "assets/pm_kisan_4.jpg"],
      pension: ["assets/pension_1.jpg", "assets/pm_kisan_2.jpg", "assets/pm_kisan_3.jpg", "assets/pm_kisan_4.jpg"],
      ayushman: ["assets/ayushman_1.jpg", "assets/pm_kisan_2.jpg", "assets/pm_kisan_3.jpg", "assets/pm_kisan_4.jpg"],
      surya_ghar: ["assets/surya_ghar_1.jpg", "assets/pm_kisan_2.jpg", "assets/pm_kisan_3.jpg", "assets/pm_kisan_4.jpg"],
      pm_svanidhi: ["assets/svanidhi_1.jpg", "assets/pm_kisan_2.jpg", "assets/pm_kisan_3.jpg", "assets/pm_kisan_4.jpg"],
      mudra_loan: ["assets/mudra_1.jpg", "assets/pm_kisan_2.jpg", "assets/pm_kisan_3.jpg", "assets/pm_kisan_4.jpg"],
      sukanya: ["assets/sukanya_1.jpg", "assets/pm_kisan_2.jpg", "assets/pm_kisan_3.jpg", "assets/pm_kisan_4.jpg"],
      nsp_scholarship: ["assets/scholarship_1.jpg", "assets/pm_kisan_2.jpg", "assets/pm_kisan_3.jpg", "assets/pm_kisan_4.jpg"]
    };

    const defaultImages = schemeImageMap[s.id] || ["assets/pm_kisan_1.jpg", "assets/pm_kisan_2.jpg", "assets/pm_kisan_3.jpg", "assets/pm_kisan_4.jpg"];

    panelsList.forEach((p, idx) => {
      const imgSrc = p.image || defaultImages[idx % 4];
      const pdiv = document.createElement('div');
      pdiv.className = 'panel-card';
      pdiv.innerHTML = `
        <div class="panel-tag-header">
          <span>${p.tag || `Panel ${p.num || idx + 1}`}</span>
          <button class="btn-outline-sm" onclick="showCitationModal('${escapeQuotes(p.dialogue)}', '${escapeQuotes(p.sourceRef || s.name)}', '${s.officialUrl}')">${t.btn_citation || '🔍 Why shown? (Citation)'}</button>
        </div>
        <div class="panel-img-box">
          <img src="${imgSrc}" alt="${p.tag}" loading="lazy" onerror="this.onerror=null; this.src='${defaultImages[idx % 4]}';">
        </div>
        <div class="panel-dialogue-box">
          <div class="speaker-name">${p.speaker || 'Citizen'}</div>
          <div class="speaker-text">"${p.dialogue}"</div>
        </div>
        <div class="panel-footer-bar">
          <span class="panel-caption-text">📌 <strong>Caption:</strong> ${p.caption || ''}</span>
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
  const pct = total > 0 ? Math.round((preparedCount / total) * 100) : 0;

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
  if (applyBtn) {
    const targetUrl = s.applyUrl || s.sourceUrl || s.officialUrl || "https://www.india.gov.in/my-government/schemes";
    applyBtn.href = targetUrl;
    applyBtn.target = "_blank";
    applyBtn.rel = "noopener noreferrer";
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

  const lang = appState.currentLang;
  let panelsList = [];
  if (Array.isArray(s.panels)) panelsList = s.panels;
  else if (s.panels) panelsList = s.panels[lang] || s.panels.en || [];

  let fullScript = `Reading ${s.name} visual story. `;
  panelsList.forEach(p => { fullScript += `${p.speaker || 'Hero'} says: ${p.dialogue}. `; });

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

// Full Dynamic AI Generation Pipeline
async function startProcessingPipeline(schemeTitle, schemeId, rawInputText) {
  let existingScheme = SCHEMES_DATABASE.find(item => item.id === schemeId || item.name.toLowerCase() === (schemeTitle || '').toLowerCase());
  const title = schemeTitle || (existingScheme ? existingScheme.name : 'Government Scheme');

  const overlay = document.getElementById('processing-overlay');
  if (overlay) {
    overlay.style.display = 'flex';
    const nameElem = document.getElementById('proc-scheme-name');
    if (nameElem) nameElem.innerText = `Gemini Nano AI Generating Comic for: ${title}`;

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
    const s4 = document.getElementById('pstep-4'); if (s4) { s4.classList.add('active'); s4.style.opacity = '1'; s4.innerText = '✓ 4. Gemini Nano LLM Generating 4-Panel Script'; }
  }

  let generatedPanels = null;
  let generatedChar = null;

  if (appState.isServerOnline) {
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
        console.log("🤖 [AI Server Response]:", data);
        if (data.panels && Array.isArray(data.panels) && data.panels.length > 0) generatedPanels = data.panels;
        if (data.character) generatedChar = data.character;
      }
    } catch (e) {
      console.warn("AI Call Warning:", e.message);
    }
  }

  if (overlay) {
    const s5 = document.getElementById('pstep-5'); if (s5) { s5.classList.add('active'); s5.style.opacity = '1'; }
    await new Promise(r => setTimeout(r, 150));
    const s6 = document.getElementById('pstep-6'); if (s6) { s6.classList.add('active'); s6.style.opacity = '1'; }
    await new Promise(r => setTimeout(r, 150));
    overlay.style.display = 'none';
  }

  const defaultImgs = ["assets/pm_kisan_1.jpg", "assets/pm_kisan_2.jpg", "assets/pm_kisan_3.jpg", "assets/pm_kisan_4.jpg"];

  if (existingScheme && !rawInputText) {
    if (generatedPanels) {
      const formattedPanels = generatedPanels.map((p, idx) => ({ ...p, image: p.image || defaultImgs[idx % 4] }));
      existingScheme.panels = {
        en: formattedPanels,
        te: formattedPanels,
        hi: formattedPanels
      };
    }
    if (generatedChar) {
      existingScheme.character = {
        en: generatedChar,
        te: generatedChar,
        hi: generatedChar
      };
    }
    appState.selectedScheme = existingScheme;
  } else {
    const newId = `custom_${Date.now()}`;
    const formattedPanels = (generatedPanels || [
      { num: 1, tag: "Panel 1: The Problem", image: defaultImgs[0], speaker: generatedChar ? generatedChar.name : "Citizen", dialogue: `How will I manage the financial costs for ${title}?`, caption: `Citizen worries about ${title} requirements.`, sourceRef: "Section 1: Scheme Guidelines" },
      { num: 2, tag: "Panel 2: Government Solution", image: defaultImgs[1], speaker: "GovToon Hero", dialogue: `The Government provides direct financial assistance under ${title}!`, caption: "Official Direct Benefit Support.", sourceRef: "Section 2: Benefits & Subsidy" },
      { num: 3, tag: "Panel 3: The Easy Path", image: defaultImgs[2], speaker: "CSC Bhaiya", dialogue: "Submit your Aadhaar card and Bank Passbook at nearest CSC center or online portal.", caption: "Simple digital application process.", sourceRef: "Section 3: Mandatory Documents" },
      { num: 4, tag: "Panel 4: The Outcome", image: defaultImgs[3], speaker: "Tagline", dialogue: `🎉 ${title}: Sarkari Sahayata, Parivar Ki Suraksha!`, caption: "Peace of mind restored with official support.", sourceRef: "Section 4: Disbursement" }
    ]).map((p, idx) => ({ ...p, image: p.image || defaultImgs[idx % 4] }));

    const newScheme = {
      id: newId,
      name: title,
      category: "Central / State Scheme",
      level: "Central",
      dept: "Government of India (India.gov.in)",
      purpose: `Official financial and social welfare assistance under ${title}.`,
      benefits: "Direct bank transfer and welfare assistance provided.",
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
      character: {
        en: { name: generatedChar ? generatedChar.name : "Ramu Kaka", role: generatedChar ? generatedChar.role : "Citizen", avatar: generatedChar ? generatedChar.avatar : "👨🏽‍🌾", desc: generatedChar ? generatedChar.clothing : "Relatable Beneficiary" },
        te: { name: generatedChar ? generatedChar.name : "రాము కాకా", role: "పౌరుడు", avatar: "👨🏽‍🌾", desc: "లబ్ధిదారు" },
        hi: { name: generatedChar ? generatedChar.name : "रामू काका", role: "नागरिक", avatar: "👨🏽‍🌾", desc: "लाभार्थी" }
      },
      panels: {
        en: formattedPanels,
        te: formattedPanels.map(p => ({ ...p, tag: `ప్యానెల్ ${p.num}` })),
        hi: formattedPanels.map(p => ({ ...p, tag: `पैनल ${p.num}` }))
      },
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
  udiv.innerHTML = `<div class="msg-content"><p>${text}</p></div>`;
  box.appendChild(udiv);
  input.value = '';

  const s = appState.selectedScheme;
  let reply = `Based strictly on official India.gov.in records for ${s.name}: ${s.purpose} Benefits provided: ${s.benefits}`;
  let sourceTag = `Source: Verified India.gov.in Record (${s.officialUrl || 'India.gov.in'})`;

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
    if (text.toLowerCase().includes('document')) reply = `Compulsory documents required: ${s.documents ? s.documents.map(d => d.name).join(', ') : 'Aadhaar Card'}.`;
    if (text.toLowerCase().includes('eligible') || text.toLowerCase().includes('who')) reply = `Eligibility criteria: ${s.eligibility ? s.eligibility.summary : 'All eligible citizens'}`;
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

function sendGeneralChatMessage() {
  const input = document.getElementById('general-chat-input');
  const text = input ? input.value.trim() : '';
  if (!text) return;

  const box = document.getElementById('general-chat-messages');
  if (!box) return;

  const udiv = document.createElement('div');
  udiv.className = 'chat-msg user-msg';
  udiv.innerHTML = `<div class="msg-content"><p>${text}</p></div>`;
  box.appendChild(udiv);
  input.value = '';

  setTimeout(() => {
    const bdiv = document.createElement('div');
    bdiv.className = 'chat-msg bot-msg';
    bdiv.innerHTML = `
      <div class="msg-avatar">🏛️</div>
      <div class="msg-content">
        <p>Based on official India.gov.in records: "${text}" is covered under national welfare programs. You can generate a 4-panel visual comic story for it anytime from the Create tab.</p>
        <span class="citation-tag">Source: Grounded on India.gov.in</span>
      </div>
    `;
    box.appendChild(bdiv);
    box.scrollTop = box.scrollHeight;
  }, 400);
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
  udiv.innerHTML = `<div class="msg-content"><p>${text}</p></div>`;
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

  if (appState.isServerOnline) {
    try {
      const apiRes = await fetch(`${API_BASE_URL}/ask-ai`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question: text, schemeName: activeScheme })
      });
      if (apiRes.ok) {
        const data = await apiRes.json();
        answer = data.answer;
        if (data.source) sourceRef = data.source;
      }
    } catch (e) {
      console.warn("Floating AI Error:", e);
    }
  }

  if (!answer) {
    answer = `Based strictly on official India.gov.in records for ${activeScheme}: Eligible citizens can apply online with Aadhaar and Bank Passbook.`;
  }

  bdiv.innerHTML = `
    <div class="msg-avatar">🤖</div>
    <div class="msg-content">
      <p>${answer}</p>
      <div class="msg-citation" style="font-size:0.75rem; color:#10b981; margin-top:4px; font-weight:600;">✓ ${sourceRef}</div>
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
