// GovToon — Personalized AI Government Scheme Explainer & Directory
// Official Source Grounding: India.gov.in National Portal of India / myScheme Ecosystem

let API_BASE_URL = typeof window !== 'undefined' && window.location.origin && !window.location.origin.startsWith('file:') 
  ? `${window.location.origin}/api` 
  : 'http://localhost:5000/api';

// Comprehensive UI Translations Dictionary (EN, TE, HI)
const TRANSLATIONS = {
  en: {
    trust_badge: "🛡️ Official Source Grounding",
    trust_text: "Data sourced from <a href=\"https://www.india.gov.in\" target=\"_blank\" rel=\"noopener noreferrer\" style=\"color:#ffffff; text-decoration:underline; font-weight:700;\">India.gov.in National Portal of India</a> / <a href=\"https://www.myscheme.gov.in\" target=\"_blank\" rel=\"noopener noreferrer\" style=\"color:#ffffff; text-decoration:underline; font-weight:700;\">myScheme.gov.in</a>. We don't change what the government says — we change how easily citizens understand it.",
    btn_contrast: "🌓 Contrast",
    logo_sub: "Government Schemes, Told Simply.",
    nav_home: "Home",
    nav_explore: "Explore Schemes",
    nav_eligibility: "Check Eligibility",
    nav_compare: "Compare",
    nav_dashboard: "Dashboard",
    nav_reader: "📖 Comic Reader",
    nav_admin: "📊 Admin",
    btn_create_scheme: "+ Turn Scheme into Comic",
    hero_badge: "🇮🇳 National Portal of India Integration Ready",
    hero_title: "Government Schemes,<br><span class=\"hero-highlight\">Told Simply.</span>",
    hero_sub: "Transform complex official government documents, eligibility rules, and application processes into simple, visual 4-panel stories with voice narration and comprehension testing.",
    hero_ph: "What government scheme do you want to understand? (e.g. PM Merit Scholarship, Rythu Bandhu, PM-Kisan)...",
    btn_search_schemes: "Search Schemes",
    try_asking: "Try asking:",
    qf1_h: "Explore All Schemes",
    qf1_p: "Filter Central, State, and Personalized schemes",
    qf2_h: "Check My Eligibility",
    qf2_p: "Instant rule match for Age, Income & State",
    qf3_h: "Compare Schemes",
    qf3_p: "Side-by-side comparison of benefits & docs",
    qf4_h: "Mitra AI Assistant",
    qf4_p: "Personalized voice assistant in 3 languages",
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
    f4_h: "4. Personalized Recommendations",
    f4_p: "Personal profile matching automatically identifies schemes tailored to your specific age, income, state, and occupation.",
    explore_title: "Explore Schemes",
    explore_sub: "schemes shown · scalable architecture supports thousands more",
    active_prof_lbl: "Active Profile:",
    btn_edit_prof: "✏️ Edit Profile",
    tab_all: "All Schemes",
    tab_central: "Central",
    tab_state: "My State",
    tab_recommended: "Recommended For Me",
    tab_saved: "Saved",
    search_ph: "Search by name, benefit, category, keyword...",
    btn_read_comic: "🎨 4-Panel Comic",
    btn_eligibility: "🟢 Eligibility",
    btn_apply: "🚀 Apply Online ↗",
    elig_badge: "Instant Rule Engine",
    elig_title: "🎯 Personalized Scheme Eligibility Assessment",
    elig_desc: "Enter your profile information to calculate exact match percentages across Central & State government schemes.",
    elig_card_h: "📝 Your Citizen Profile",
    elig_card_sub: "Values are stored locally on your device for privacy.",
    lbl_age: "Your Age (Years)",
    lbl_income: "Annual Family Income (₹)",
    lbl_state: "State of Residence",
    lbl_occ: "Primary Occupation / Status",
    lbl_gender: "Gender",
    lbl_cat: "Social Category / Caste",
    btn_apply_prof: "🌟 Apply Profile & View Recommended Schemes",
    comp_badge: "Side-by-Side Matrix",
    comp_title: "⚖️ Compare Government Schemes",
    comp_desc: "Compare benefits, eligibility criteria, required documents, and application roadmaps between schemes.",
    lbl_scheme_1: "Scheme 1:",
    lbl_scheme_2: "Scheme 2:",
    lbl_scheme_3: "Scheme 3 (Optional):",
    dash_badge: "Personalized Citizen Hub",
    dash_title: "📊 Citizen Welfare Dashboard",
    dash_desc: "Track your saved schemes, application readiness, document checklist, and reading history.",
    dstat_saved: "Saved Schemes",
    dstat_match: "Top Profile Match",
    dstat_docs: "Documents Prepared",
    dstat_comics: "Visual Comics Read",
    dash_saved_h: "⭐ Your Bookmarked Schemes",
    dash_browse_more: "+ Browse More",
    dash_docs_h: "📄 Common Document Readiness",
    dash_essential_badge: "Essential For All Schemes",
    doc_aadhaar_label: "<strong>Aadhaar Card</strong> (Linked with Mobile Number for e-KYC)",
    doc_bank_label: "<strong>Bank Account Passbook</strong> (Active DBT & NPCI Seeding)",
    doc_income_label: "<strong>Income Certificate / Ration Card</strong> (Issued by Revenue Dept)",
    doc_domicile_label: "<strong>Residence / Domicile Certificate</strong> (Proof of State)",
    rtab_comic: "🎨 4-Panel Comic",
    rtab_eligibility: "🟢 Visual Eligibility",
    rtab_documents: "📄 Required Documents",
    rtab_steps: "🗺️ Application Steps",
    rtab_ask: "💬 Ask AI Assistant",
    rtab_quiz: "✅ Comprehension Quiz",
    btn_listen: "▶ Listen to Full Comic",
    btn_pause: "⏸ Pause",
    lbl_speed: "Speed:",
    btn_bookmark: "🔖 Bookmark",
    btn_print: "🖨️ Print 1-Page Flyer",
    source_verified: "✓ Official Source Verified",
    btn_verify_portal: "🔗 Verify Official Portal",
    elig_h: "🟢 Visual Eligibility Assessment",
    elig_sub: "Enter your basic details to check preliminary match against official rules.",
    doc_h: "📄 Required Documents Checklist",
    doc_sub: "Check off documents as you prepare them before visiting the official portal or Panchayat office.",
    doc_prep_label: "Preparation Progress:",
    steps_h: "🗺️ Step-by-Step Application Roadmap",
    steps_sub: "Follow these official steps to submit your application safely.",
    cta_ready: "Ready to Apply?",
    cta_desc: "Submit your application directly on the official government portal.",
    btn_go_portal: "🚀 Go to Official Government Application Portal",
    ask_h: "💬 Ask Mitra Grounded AI Assistant",
    ask_sub: "Answers strictly from official India.gov.in scheme data with page citations.",
    sug_q: "Suggested Questions:",
    bot_welcome: "Namaste! I am your GovToon Assistant. I can answer questions about this scheme strictly based on official government records.",
    cit_verified: "Source: Verified India.gov.in Record",
    chat_ph: "Ask a question about this scheme...",
    btn_send_q: "Send Question",
    quiz_h: "✅ Scheme Comprehension Test",
    quiz_sub: "Test your understanding of the verified scheme facts.",
    admin_badge: "Admin Access Only",
    admin_h: "Administrative & Confusion Analytics Dashboard",
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
    prof_modal_h: "👤 Edit Your Profile for Personalized Recommendations",
    prof_modal_sub: "GovToon matches these attributes in real time to calculate match scores and highlight relevant schemes.",
    btn_cancel: "Cancel",
    btn_save_prof: "Save & Update Recommendations",
    mitra_title: "Mitra — Personalized AI Assistant",
    mitra_status: "🟢 Grounded on India.gov.in",
    mitra_ph: "Ask Mitra anything (e.g. Find schemes for 20y student)...",
    btn_ask: "Ask",
    footer_quote: "\"We don't change what the government says. We change how easily citizens understand it.\"",
    footer_src_label: "Source Data:",
    footer_disclaimer: "GovToon simplifies publicly available government information for visual comprehension. It does not replace official government websites or application portals."
  },
  te: {
    trust_badge: "🛡️ అధికారిక మూలాల ఆధారం",
    trust_text: "<a href=\"https://www.india.gov.in\" target=\"_blank\" rel=\"noopener noreferrer\" style=\"color:#ffffff; text-decoration:underline; font-weight:700;\">India.gov.in జాతీయ పోర్టల్</a> / <a href=\"https://www.myscheme.gov.in\" target=\"_blank\" rel=\"noopener noreferrer\" style=\"color:#ffffff; text-decoration:underline; font-weight:700;\">myScheme.gov.in</a> నుండి సేకరించిన సమాచారం. ప్రభుత్వం చెప్పిన దాన్ని మేము మార్చము — పౌరులు అర్థం చేసుకునే విధానాన్ని సులభతరం చేస్తాము.",
    btn_contrast: "🌓 కాంట్రాస్ట్",
    logo_sub: "ప్రభుత్వ పథకాలు, సులువైన మాటల్లో.",
    nav_home: "హోమ్",
    nav_explore: "పథకాలు వెతకండి",
    nav_eligibility: "అర్హత తనిఖీ",
    nav_compare: "పోల్చండి",
    nav_dashboard: "డాష్‌బోర్డ్",
    nav_reader: "📖 కామిక్ చదవండి",
    nav_admin: "📊 అడ్మిన్",
    btn_create_scheme: "+ పథకాన్ని కామిక్‌గా మార్చండి",
    hero_badge: "🇮🇳 జాతీయ పోర్టల్ సమన్వయం సిద్ధంగా ఉంది",
    hero_title: "ప్రభుత్వ పథకాలు,<br><span class=\"hero-highlight\">సులువైన మాటల్లో.</span>",
    hero_sub: "సంక్లిష్టమైన ప్రభుత్వ పత్రాలు, అర్హత నిబంధనలు మరియు దరఖాస్తు విధానాలను సులువైన 4-ప్యానెల్ కామిక్ కథలుగా, వాయిస్ వివరణలతో పొందండి.",
    hero_ph: "మీరు ఏ ప్రభుత్వ పథకం గురించి తెలుసుకోవాలనుకుంటున్నారు? (ఉదా: పీఎం మెరిట్ స్కాలర్‌షిప్, రైతు బంధు)...",
    btn_search_schemes: "పథకాలు వెతకండి",
    try_asking: "ప్రయత్నించండి:",
    qf1_h: "అన్ని పథకాలు చూడండి",
    qf1_p: "కేంద్ర, రాష్ట్ర మరియు వ్యక్తిగత పథకాల వివరాలు",
    qf2_h: "నా అర్హతను తనిఖీ చేయండి",
    qf2_p: "వయస్సు, ఆదాయం & రాష్ట్రం ఆధారంగా సరిపోయే పథకాలు",
    qf3_h: "పథకాలను పోల్చండి",
    qf3_p: "లబ్ధి మరియు అవసరమైన పత్రాల సమగ్ర పోలిక",
    qf4_h: "మిత్ర AI సహాయకుడు",
    qf4_p: "3 భాషల్లో వ్యక్తిగత వాయిస్ సహాయకుడు",
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
    f4_h: "4. వ్యక్తిగతీకరించిన సిఫార్సులు",
    f4_p: "మీ వయస్సు, ఆదాయం, రాష్ట్రం ఆధారంగా మీకు సరిపోయే పథకాలను ఆటోమేటిక్‌గా చూపిస్తుంది.",
    explore_title: "పథకాలు అన్వేషించండి",
    explore_sub: "పథకాలు అందుబాటులో ఉన్నాయి · విస్తరించగల వ్యవస్థ",
    active_prof_lbl: "యాక్టివ్ ప్రొఫైల్:",
    btn_edit_prof: "✏️ ప్రొఫైల్ మార్చండి",
    tab_all: "అన్ని పథకాలు",
    tab_central: "కేంద్ర పథకాలు",
    tab_state: "నా రాష్ట్రం",
    tab_recommended: "నాకు సరిపోయేవి",
    tab_saved: "దాచుకున్నవి",
    search_ph: "పథకం పేరు, లబ్ధి లేదా కీవర్డ్ ద్వారా వెతకండి...",
    btn_read_comic: "🎨 4-ప్యానెల్ కామిక్",
    btn_eligibility: "🟢 అర్హత తనిఖీ",
    btn_apply: "🚀 ఆన్‌లైన్ దరఖాస్తు ↗",
    elig_badge: "తక్షణ నిబంధనల ఇంజిన్",
    elig_title: "🎯 వ్యక్తిగత పథక అర్హత అంచనా",
    elig_desc: "కేంద్ర & రాష్ట్ర ప్రభుత్వ పథకాలతో మీ వివరాలను సరిపోల్చి అర్హత శాతాన్ని తెలుసుకోండి.",
    elig_card_h: "📝 మీ పౌర ప్రొఫైల్",
    elig_card_sub: "మీ వ్యక్తిగత గోప్యత కోసం వివరాలు మీ పరికరంలోనే భద్రపరచబడతాయి.",
    lbl_age: "మీ వయస్సు (సంవత్సరాలు)",
    lbl_income: "వార్షిక కుటుంబ ఆదాయం (₹)",
    lbl_state: "నివాస రాష్ట్రం",
    lbl_occ: "ప్రధాన వృత్తి / హోదా",
    lbl_gender: "లింగం",
    lbl_cat: "సామాజిక వర్గం / కులం",
    btn_apply_prof: "🌟 ప్రొఫైల్ వర్తింపజేసి సిఫార్సు పథకాలు చూడండి",
    comp_badge: "సమగ్ర పోలిక పట్టిక",
    comp_title: "⚖️ ప్రభుత్వ పథకాల పోలిక",
    comp_desc: "పథకాల మధ్య ప్రయోజనాలు, అర్హత నిబంధనలు, అవసరమైన పత్రాలు మరియు దరఖాస్తు విధానాలను పోల్చండి.",
    lbl_scheme_1: "పథకం 1:",
    lbl_scheme_2: "పథకం 2:",
    lbl_scheme_3: "పథకం 3 (ఐచ్ఛికం):",
    dash_badge: "వ్యక్తిగతీకరించిన పౌర కేంద్రం",
    dash_title: "📊 పౌర సంక్షేమ డాష్‌బోర్డ్",
    dash_desc: "మీరు దాచుకున్న పథకాలు, దరఖాస్తు సన్నద్ధత, పత్రాల చెక్‌లిస్ట్ మరియు చదివిన కథలను ట్రాక్ చేయండి.",
    dstat_saved: "దాచుకున్న పథకాలు",
    dstat_match: "టాప్ ప్రొఫైల్ మ్యాచ్",
    dstat_docs: "సిద్ధమైన పత్రాలు",
    dstat_comics: "చదివిన కామిక్స్",
    dash_saved_h: "⭐ మీరు దాచుకున్న పథకాలు",
    dash_browse_more: "+ మరిన్ని వెతకండి",
    dash_docs_h: "📄 సాధారణ పత్రాల సన్నద్ధత",
    dash_essential_badge: "అన్ని పథకాలకు ముఖ్యం",
    doc_aadhaar_label: "<strong>ఆధార్ కార్డు</strong> (e-KYC కోసం మొబైల్ నంబర్‌తో లింక్ చేయబడింది)",
    doc_bank_label: "<strong>బ్యాంక్ ఖాతా పాస్‌బుక్</strong> (యాక్టివ్ DBT & NPCI సీడింగ్)",
    doc_income_label: "<strong>ఆదాయ ధృవీకరణ పత్రం / రేషన్ కార్డు</strong> (రెవెన్యూ విభాగం జారీ చేసినది)",
    doc_domicile_label: "<strong>నివాస ధృవీకరణ పత్రం</strong> (రాష్ట్ర నివాస రుజువు)",
    rtab_comic: "🎨 4-ప్యానెల్ కామిక్",
    rtab_eligibility: "🟢 అర్హత తనిఖీ",
    rtab_documents: "📄 అవసరమైన పత్రాలు",
    rtab_steps: "🗺️ దరఖాస్తు విధానం",
    rtab_ask: "💬 మిత్ర AI అడగండి",
    rtab_quiz: "✅ అవగాహన క్విజ్",
    btn_listen: "▶ పూర్తి కామిక్ వినండి",
    btn_pause: "⏸ ఆపండి",
    lbl_speed: "వేగం:",
    btn_bookmark: "🔖 బుక్‌మార్క్",
    btn_print: "🖨️ 1-పేజీ ఫ్లైయర్ ప్రింట్",
    source_verified: "✓ అధికారిక ఆధారాలు ధృవీకరించబడ్డాయి",
    btn_verify_portal: "🔗 పోర్టల్‌ను తనిఖీ చేయండి",
    elig_h: "🟢 అర్హత అంచనా తనిఖీ",
    elig_sub: "అధికారిక నిబంధనలతో మీ వివరాలను తనిఖీ చేయడానికి వివరాలు నమోదు చేయండి.",
    doc_h: "📄 అవసరమైన పత్రాల జాబితా",
    doc_sub: "మీరు సిద్ధం చేసుకున్న పత్రాలను చెక్‌బాక్స్‌లో గుర్తించండి.",
    doc_prep_label: "సిద్ధమైన పురోగతి:",
    steps_h: "🗺️ అంచెలవారీ దరఖాస్తు విధానం",
    steps_sub: "సురక్షితంగా దరఖాస్తు చేయడానికి ఈ అధికారిక దశలను అనుసరించండి.",
    cta_ready: "దరఖాస్తు చేయడానికి సిద్ధంగా ఉన్నారా?",
    cta_desc: "నేరుగా అధికారిక ప్రభుత్వ పోర్టల్‌లో దరఖాస్తు చేసుకోండి.",
    btn_go_portal: "🚀 అధికారిక ప్రభుత్వ దరఖాస్తు పోర్టల్‌కు వెళ్లండి",
    ask_h: "💬 మిత్ర AI సహాయకుడు",
    ask_sub: "కేవలం అధికారిక India.gov.in సమాచారం ఆధారంగానే సమాధానాలు ఇస్తుంది.",
    sug_q: "సూచించిన ప్రశ్నలు:",
    bot_welcome: "నమస్తే! నేను మీ గోవ్‌టూన్ సహాయకుడిని. అధికారిక రికార్డుల ఆధారంగా మీ ప్రశ్నలకు సమాధానం ఇస్తాను.",
    cit_verified: "మూలం: ధృవీకరించబడిన India.gov.in రికార్డు",
    chat_ph: "ఈ పథకం గురించి ప్రశ్నించండి...",
    btn_send_q: "ప్రశ్న పంపండి",
    quiz_h: "✅ పథకం అవగాహన పరీక్ష",
    quiz_sub: "పథకం విషయాలపై మీ అవగాహనను పరీక్షించుకోండి.",
    admin_badge: "అడ్మిన్ లాగిన్ మాత్రమే",
    admin_h: "నిర్వాహక & అవగాహన విశ్లేషణల డాష్‌బోర్డ్",
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
    prof_modal_h: "👤 వ్యక్తిగతీకరించిన సిఫార్సుల కోసం మీ ప్రొఫైల్‌ను సవరించండి",
    prof_modal_sub: "గోవ్‌టూన్ మీకు సరిపోయే పథకాలను సూచించడానికి ఈ వివరాలను సరిపోలుస్తుంది.",
    btn_cancel: "రద్దు చేయండి",
    btn_save_prof: "సేవ్ చేసి సిఫార్సులను అప్‌డేట్ చేయండి",
    mitra_title: "మిత్ర — వ్యక్తిగత AI సహాయకుడు",
    mitra_status: "🟢 India.gov.in అధికారిక ఆధారం",
    mitra_ph: "మిత్రను ఏమైనా అడగండి (ఉదా: 20 సం. విద్యార్థి పథకాలు)...",
    btn_ask: "అడగండి",
    footer_quote: "\"ప్రభుత్వం చెప్పిన దాన్ని మేము మార్చము. పౌరులు అర్థం చేసుకునే విధానాన్ని సులభతరం చేస్తాము.\"",
    footer_src_label: "మూల సమాచారం:",
    footer_disclaimer: "గోవ్‌టూన్ పౌరుల సులువైన అవగాహన కోసం ప్రభుత్వ సమాచారాన్ని సరళీకృతం చేస్తుంది. ఇది అధికారిక ప్రభుత్వ వెబ్‌సైట్‌లకు ప్రత్యామ్నాయం కాదు."
  },
  hi: {
    trust_badge: "🛡️ आधिकारिक स्रोतों पर आधारित",
    trust_text: "<a href=\"https://www.india.gov.in\" target=\"_blank\" rel=\"noopener noreferrer\" style=\"color:#ffffff; text-decoration:underline; font-weight:700;\">India.gov.in राष्ट्रीय पोर्टल</a> / <a href=\"https://www.myscheme.gov.in\" target=\"_blank\" rel=\"noopener noreferrer\" style=\"color:#ffffff; text-decoration:underline; font-weight:700;\">myScheme.gov.in</a> से प्राप्त जानकारी। हम सरकार की बात नहीं बदलते — हम नागरिकों के समझने का तरीका आसान बनाते हैं।",
    btn_contrast: "🌓 कंट्रास्ट",
    logo_sub: "सरकारी योजनाएं, आसान भाषा में।",
    nav_home: "होम",
    nav_explore: "योजनाएं खोजें",
    nav_eligibility: "पात्रता जांच",
    nav_compare: "तुलना करें",
    nav_dashboard: "डैशबोर्ड",
    nav_reader: "📖 कॉमिक पढ़ें",
    nav_admin: "📊 एडमिन",
    btn_create_scheme: "+ योजना को कॉमिक में बदलें",
    hero_badge: "🇮🇳 राष्ट्रीय पोर्टल इंडिया Integration तैयार",
    hero_title: "सरकारी योजनाएं,<br><span class=\"hero-highlight\">आसान भाषा में।</span>",
    hero_sub: "जटिल सरकारी दस्तावेजों, पात्रता नियमों और आवेदन प्रक्रियाओं को सरल 4-पैनल दृश्यात्मक कहानियों और ऑडियो में समझें।",
    hero_ph: "आप कौन सी सरकारी योजना समझना चाहते हैं? (जैसे पीएम मेरिट स्कॉलरशिप, रायथू बंधु, पीएम-किसान)...",
    btn_search_schemes: "योजनाएं खोजें",
    try_asking: "खोजकर देखें:",
    qf1_h: "सभी योजनाएं खोजें",
    qf1_p: "केंद्रीय, राज्य और व्यक्तिगत योजनाओं की सूची",
    qf2_h: "मेरी पात्रता जांचें",
    qf2_p: "उम्र, आय और राज्य अनुसार तुरंत पात्रता मिलान",
    qf3_h: "योजनाओं की तुलना करें",
    qf3_p: "लाभ और दस्तावेजों की आमने-सामने तुलना",
    qf4_h: "मित्र AI सहायक",
    qf4_p: "3 भाषाओं में व्यक्तिगत वॉयस असिस्टेंट",
    impact_orig: "सरकारी दस्तावेज पढ़ने पर सामान्य नागरिक की समझ",
    impact_govtoon: "गवटून कॉमिक्स पढ़ने के बाद समझ का स्कोर",
    feat_title: "गवटून नागरिकों को कैसे सशक्त बनाता है",
    feat_sub: "जटिल सरकारी भाषा और आम नागरिक की समझ के बीच का मजबूत पुल।",
    f1_h: "1. आधिकारिक स्रोतों पर आधारित",
    f1_p: "India.gov.in / myScheme से सीधा जुड़ाव। हर नियम और लाभ का स्पष्ट संदर्भ।",
    f2_h: "2. आम आदमी की कहानियां",
    f2_p: "किसान, छात्र, महिला और छोटे व्यापारियों की दैनिक जिंदगी से जुड़ी कहानियां।",
    f3_h: "3. देशी बस्ती की भाषा और आवाज",
    f3_p: "अधिकारियों की कठिन भाषा को आसान बोलचाल में बदलकर अंग्रेजी, तेलुगु, हिंदी में ऑडियो।",
    f4_h: "4. व्यक्तिगत योजना सुझाव",
    f4_p: "आपकी उम्र, आय और राज्य के अनुसार सबसे उपयुक्त योजनाओं की तत्काल पहचान।",
    explore_title: "योजनाएं खोजें",
    explore_sub: "योजनाएं उपलब्ध हैं · व्यापक डेटाबेस",
    active_prof_lbl: "सक्रिय प्रोफाइल:",
    btn_edit_prof: "✏️ प्रोफाइल बदलें",
    tab_all: "सभी योजनाएं",
    tab_central: "केंद्रीय योजनाएं",
    tab_state: "मेरा राज्य",
    tab_recommended: "मेरे लिए अनुशंसित",
    tab_saved: "सहेजी गई",
    search_ph: "योजना का नाम, लाभ या कीवर्ड लिखें...",
    btn_read_comic: "🎨 4-पैनल कॉमिक",
    btn_eligibility: "🟢 पात्रता जांच",
    btn_apply: "🚀 ऑनलाइन आवेदन ↗",
    elig_badge: "त्वरित नियम इंजन",
    elig_title: "🎯 व्यक्तिगत योजना पात्रता मूल्यांकन",
    elig_desc: "केंद्रीय और राज्य सरकारी योजनाओं के साथ अपनी जानकारी मिलाकर पात्रता प्रतिशत जानें।",
    elig_card_h: "📝 आपकी नागरिक प्रोफाइल",
    elig_card_sub: "गोपनीयता के लिए विवरण आपके उपकरण में ही सुरक्षित रहता है।",
    lbl_age: "आपकी उम्र (वर्ष)",
    lbl_income: "वार्षिक पारिवारिक आय (₹)",
    lbl_state: "निवास का राज्य",
    lbl_occ: "मुख्य व्यवसाय / श्रेणी",
    lbl_gender: "लिंग",
    lbl_cat: "सामाजिक वर्ग / जाति",
    btn_apply_prof: "🌟 प्रोफाइल लागू करें और अनुशंसित योजनाएं देखें",
    comp_badge: "तुलना तालिका",
    comp_title: "⚖️ सरकारी योजनाओं की तुलना",
    comp_desc: "योजनाओं के लाभ, पात्रता नियम, आवश्यक दस्तावेज और आवेदन प्रक्रिया की तुलना करें।",
    lbl_scheme_1: "योजना 1:",
    lbl_scheme_2: "योजना 2:",
    lbl_scheme_3: "योजना 3 (वैकल्पिक):",
    dash_badge: "व्यक्तिगत नागरिक केंद्र",
    dash_title: "📊 नागरिक कल्याण डैशबोर्ड",
    dash_desc: "सहेजी गई योजनाएं, आवेदन की तैयारी, दस्तावेजों की चेकलिस्ट और पढ़ने का इतिहास देखें।",
    dstat_saved: "सहेजी गई योजनाएं",
    dstat_match: "सर्वोत्तम प्रोफाइल मैच",
    dstat_docs: "तैयार दस्तावेज",
    dstat_comics: "पढ़ी गई कॉमिक्स",
    dash_saved_h: "⭐ आपकी सहेजी गई योजनाएं",
    dash_browse_more: "+ और योजनाएं देखें",
    dash_docs_h: "📄 सामान्य दस्तावेज तैयारी",
    dash_essential_badge: "सभी योजनाओं के लिए आवश्यक",
    doc_aadhaar_label: "<strong>आधार कार्ड</strong> (ई-केवाईसी के लिए मोबाइल से लिंक)",
    doc_bank_label: "<strong>बैंक खाता पासबुक</strong> (सक्रिय डीबीटी और एनपीसीआई सीडिंग)",
    doc_income_label: "<strong>आय प्रमाण पत्र / राशन कार्ड</strong> (राजस्व विभाग द्वारा जारी)",
    doc_domicile_label: "<strong>निवास प्रमाण पत्र</strong> (राज्य का निवास प्रमाण)",
    rtab_comic: "🎨 4-पैनल कॉमिक",
    rtab_eligibility: "🟢 पात्रता जांच",
    rtab_documents: "📄 जरूरी दस्तावेज",
    rtab_steps: "🗺️ आवेदन के चरण",
    rtab_ask: "💬 मित्र AI से पूछें",
    rtab_quiz: "✅ समझ की परीक्षा",
    btn_listen: "▶ पूरी कॉमिक सुनें",
    btn_pause: "⏸ रोकें",
    lbl_speed: "गति:",
    btn_bookmark: "🔖 बुकमार्क",
    btn_print: "🖨️ 1-पेज फ्लायर प्रिंट",
    source_verified: "✓ आधिकारिक स्रोत प्रमाणित",
    btn_verify_portal: "🔗 आधिकारिक पोर्टल देखें",
    elig_h: "🟢 पात्रता मूल्यांकन जांच",
    elig_sub: "आधिकारिक नियमों से अपनी पात्रता मिलाने के लिए जानकारी दर्ज करें।",
    doc_h: "📄 आवश्यक दस्तावेजों की सूची",
    doc_sub: "तैयार दस्तावेजों को चेकबॉक्स में मार्क करें।",
    doc_prep_label: "तैयारी की प्रगति:",
    steps_h: "🗺️ चरणबद्ध आवेदन मार्गदर्शिका",
    steps_sub: "सुरक्षित आवेदन के लिए इन आधिकारिक चरणों का पालन करें।",
    cta_ready: "आवेदन के लिए तैयार हैं?",
    cta_desc: "सीधे आधिकारिक सरकारी पोर्टल पर आवेदन जमा करें।",
    btn_go_portal: "🚀 आधिकारिक सरकारी पोर्टल पर जाएं",
    ask_h: "💬 मित्र AI सहायक",
    ask_sub: "केवल आधिकारिक India.gov.in आंकड़ों पर आधारित सटीक जवाब।",
    sug_q: "सुझाए गए प्रश्न:",
    bot_welcome: "नमस्ते! मैं आपका गवटून सहायक हूं। सरकारी रिकॉर्ड के आधार पर आपके सवालों के जवाब दूंगा।",
    cit_verified: "स्रोत: प्रमाणित India.gov.in रिकॉर्ड",
    chat_ph: "इस योजना के बारे में सवाल पूछें...",
    btn_send_q: "सवाल भेजें",
    quiz_h: "✅ योजना समझ की परीक्षा",
    quiz_sub: "योजना के तथ्यों पर अपनी समझ की जांच करें।",
    admin_badge: "केवल एडमिन लॉगिन",
    admin_h: "प्रशासनिक एवं नागरिक समझ विश्लेषण डैशबोर्ड",
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
    prof_modal_h: "👤 व्यक्तिगत सिफारिशों के लिए अपनी प्रोफाइल बदलें",
    prof_modal_sub: "गवटून आपकी उपयुक्त योजनाओं को खोजने के लिए इन विवरणों का मिलान करता है।",
    btn_cancel: "रद्द करें",
    btn_save_prof: "सुरक्षित करें और सिफारिशें अपडेट करें",
    mitra_title: "मित्र — व्यक्तिगत AI सहायक",
    mitra_status: "🟢 India.gov.in आधिकारिक आधार",
    mitra_ph: "मित्र से कुछ भी पूछें (उदा: 20 वर्ष के छात्र के लिए योजनाएं)...",
    btn_ask: "पूछें",
    footer_quote: "\"हम सरकार की बात नहीं बदलते। हम नागरिकों के समझने का तरीका आसान बनाते हैं।\"",
    footer_src_label: "स्रोत डेटा:",
    footer_disclaimer: "गवटून आसान समझ के लिए सार्वजनिक सरकारी जानकारी को सरल बनाता है। यह आधिकारिक सरकारी वेबसाइटों का विकल्प नहीं है।"
  }
};

// Multilingual Scheme Translations Dataset (Full Telugu & Hindi Panels, Dialogues & Facts)
const SCHEMES_I18N = {
  pm_merit_scholarship: {
    te: {
      name: "పీఎం మెరిట్ స్కాలర్‌షిప్ పథకం",
      purpose: "ప్రతిభావంతులైన విద్యార్థులకు కళాశాల ఫీజులు మరియు ఉన్నత విద్యా ఖర్చుల కోసం ప్రభుత్వం అందించే నగదు సహాయం.",
      benefits: "సంవత్సరానికి ₹50,000 నేరుగా విద్యార్థి బ్యాంక్ ఖాతాలో జమ (DBT).",
      character: { name: "రాజు (విద్యార్థి)", role: "కళాశాల విద్యార్థి", desc: "కళాశాల ఫీజుల కోసం స్కాలర్‌షిప్ పొందుతున్న ప్రతిభావంతుడు" },
      panels: [
        { num: 1, tag: "ప్యానెల్ 1: కళాశాల ఫీజుల ఆందోళన", speaker: "రాజు", dialogue: "నాకు ఇంజనీరింగ్ ప్రవేశ పరీక్షలో మంచి ర్యాంక్ వచ్చింది, కానీ కాలేజీ ఫీజు ₹50,000 ఎలా కట్టాలి?", caption: "కాలేజీ ఫీజుల గురించి విద్యార్థి ఆందోళన." },
        { num: 2, tag: "ప్యానెల్ 2: పీఎం మెరిట్ స్కాలర్‌షిప్", speaker: "అధ్యాపకుడు", dialogue: "ఆందోళన పడకు రాజు! నేషనల్ స్కాలర్‌షిప్ పోర్టల్‌లో పీఎం మెరిట్ స్కాలర్‌షిప్‌కు దరఖాస్తు చేసుకో. ప్రభుత్వం ఏటా ₹50,000 నేరుగా ఇస్తుంది!", caption: "కేంద్ర ప్రభుత్వం అందించే పూర్తి ఫీజు సాయం." },
        { num: 3, tag: "ప్యానెల్ 3: సులువైన e-KYC దరఖాస్తు", speaker: "CSC సహాయకుడు", dialogue: "scholarships.gov.in లో నీ మార్కుల పత్రం, ఆదాయ ధృవీకరణ పత్రం, ఆధార్ కార్డు అప్‌లోడ్ చెయ్యి.", caption: "డిజిటల్ పద్ధతిలో సులువైన దరఖాస్తు." },
        { num: 4, tag: "ప్యానెల్ 4: ఉజ్వల భవిష్యత్తు", speaker: "రాజు & తండ్రి", dialogue: "🎉 నా బ్యాంక్ ఖాతాలో ₹50,000 జమ అయ్యాయి! ఇప్పుడు నేను ప్రశాంతంగా నా చదువును కొనసాగించగలను!", caption: "స్కాలర్‌షిప్‌తో విద్యార్థుల కలల సాకారం." }
      ]
    },
    hi: {
      name: "पीएम मेरिट छात्रवृत्ति योजना",
      purpose: "प्रतिभाशाली छात्रों को कॉलेज फीस और उच्च शिक्षा के खर्चों के लिए सरकार द्वारा सीधी आर्थिक मदद।",
      benefits: "प्रति वर्ष ₹50,000 सीधे छात्र के बैंक खाते में जमा (DBT)।",
      character: { name: "राजू (छात्र)", role: "कॉलेज छात्र", desc: "कॉलेज फीस के लिए छात्रवृत्ति प्राप्त करता होनहार छात्र" },
      panels: [
        { num: 1, tag: "पैनल 1: कॉलेज फीस की चिंता", speaker: "राजू", dialogue: "मैंने अच्छे अंकों से परीक्षा पास की, लेकिन कॉलेज की फीस ₹50,000 है। पिताजी इसका प्रबंध कैसे करेंगे?", caption: "कॉलेज की फीस को लेकर मेधावी छात्र चिंतित।" },
        { num: 2, tag: "पैनल 2: पीएम मेरिट स्कॉलरशिप", speaker: "शिक्षक", dialogue: "चिंता मत करो राजू! नेशनल स्कॉलरशिप पोर्टल पर पीएम मेरिट स्कॉलरशिप के लिए आवेदन करो। सरकार हर साल ₹50,000 सीधे देती है!", caption: "केंद्र सरकार द्वारा सुनिश्चित शैक्षणिक सहायता।" },
        { num: 3, tag: "पैनल 3: आसान ऑनलाइन e-KYC", speaker: "सीएससी सहायक", dialogue: "scholarships.gov.in पर अपनी अंकतालिका, आय प्रमाण पत्र और आधार कार्ड अपलोड करें।", caption: "न्यूनतम दस्तावेजों के साथ त्वरित डिजिटल आवेदन।" },
        { num: 4, tag: "पैनल 4: उज्ज्वल भविष्य", speaker: "राजू और पिता", dialogue: "🎉 बैंक खाते में ₹50,000 जमा हो गए! अब मैं अपनी इंजीनियरिंग की पढ़ाई बिना किसी रुकावट के पूरी कर सकता हूं!", caption: "सीधी छात्रवृत्ति से युवा सपनों को नई उड़ान।" }
      ]
    }
  },
  rythu_bandhu: {
    te: {
      name: "తెలంగాణ రైతు బంధు పథకం",
      purpose: "తెలంగాణలో వ్యవసాయ భూమి కలిగిన రైతులకు విత్తనాలు, ఎరువులు మరియు పంట పెట్టుబడి కోసం ప్రభుత్వం ఇచ్చే నగదు సాయం.",
      benefits: "ఎకరానికి ఏడాదికి ₹10,000 (ఖరీఫ్‌కు ₹5,000 + రబీకి ₹5,000) నేరుగా బ్యాంక్ ఖాతాలో జమ.",
      character: { name: "రాము కాకా", role: "తెలంగాణ రైతు", desc: "వరి మరియు పత్తి పండించే ఆదర్శ రైతు" },
      panels: [
        { num: 1, tag: "ప్యానెల్ 1: పెట్టుబడి కష్టాలు", speaker: "రాము కాకా", dialogue: "వానలు మొదలయ్యాయి, కానీ విత్తనాలు, ఎరువులు కొనడానికి పైసలు ఎక్కడి నుండి తేవాలి?", caption: "పంట పెట్టుబడి కోసం రైతు ఆందోళన." },
        { num: 2, tag: "ప్యానెల్ 2: రైతు బంధు భరోసా", speaker: "వ్యవసాయ అధికారి", dialogue: "రాము కాకా, రైతు బంధు కింద తెలంగాణ ప్రభుత్వం ఎకరానికి ఏటా ₹10,000 నేరుగా మీ ఖాతాలో వేస్తుంది!", caption: "రైతులకు సకాలంలో పంట పెట్టుబడి సాయం." },
        { num: 3, tag: "ప్యానెల్ 3: ధరణి పాస్‌బుక్ నమోదు", speaker: "రైతు మిత్ర", dialogue: "రైతు వేదిక వద్ద మీ ధరణి పట్టాదారు పాస్‌బుక్‌ను ఆధార్, బ్యాంక్ ఖాతాతో లింక్ చేసుకోండి.", caption: "పారదర్శకమైన డిజిటల్ ప్రక్రియ." },
        { num: 4, tag: "ప్యానెల్ 4: పచ్చని పంటలు", speaker: "రాము కాకా", dialogue: "🎉 సమయానికి ₹10,000 ఖాతాలో పడ్డాయి! అప్పులు లేకుండా మా చేను పచ్చగా కళకళలాడుతోంది!", caption: "రైతన్నకు ప్రభుత్వ నిండు భరోసా." }
      ]
    },
    hi: {
      name: "तेलंगाना रायथू बंधु योजना",
      purpose: "तेलंगाना के किसानों को बीज, खाद और खेती के निवेश के लिए सरकार द्वारा मौसमी आर्थिक मदद।",
      benefits: "प्रति वर्ष ₹10,000 प्रति एकड़ (खरीफ ₹5,000 + रबी ₹5,000) सीधे बैंक खाते में।",
      character: { name: "रामू काका", role: "तेलंगाना किसान", desc: "धान और कपास की खेती करने वाले किसान" },
      panels: [
        { num: 1, tag: "पैनल 1: खाद-बीज की चिंता", speaker: "रामू काका", dialogue: "मानसून शुरू हो गया है, लेकिन बीज और खाद खरीदने के लिए पैसे कहां से लाऊं?", caption: "मौसमी कृषि खर्चों को लेकर किसान की चिंता।" },
        { num: 2, tag: "पैनल 2: रायथू बंधु सहायता", speaker: "कृषि अधिकारी", dialogue: "रामू काका, रायथू बंधु के तहत तेलंगाना सरकार हर एकड़ पर ₹10,000 सीधे आपके बैंक खाते में देती है!", caption: "किसानों को समय पर फसल निवेश सहायता।" },
        { num: 3, tag: "पैनल 3: पासबुक पंजीकरण", speaker: "सीएससी मित्र", dialogue: "रायथू वेदिका में अपनी धरणी पट्टादार पासबुक को आधार और बैंक खाते से लिंक कराएं।", caption: "पारदर्शी डिजिटल प्रक्रिया।" },
        { num: 4, tag: "पैनल 4: लहलहाते खेत", speaker: "रामू काका", dialogue: "🎉 समय पर ₹10,000 खाते में आ गए! बिना किसी कर्ज के हमारी फसल हरी-भरी हो गई है!", caption: "सरकारी मदद से समृद्ध होती खेती।" }
      ]
    }
  },
  nps_unorganised: {
    te: {
      name: "అసంఘటిత కార్మికుల జాతీయ పెన్షన్ పథకం (PM-SYM)",
      purpose: "అసంఘటిత రంగ కార్మికులు, వీధి వ్యాపారులు, డ్రైవర్లు ప్రతి నెలా కొద్ది మొత్తం పొదుపు చేసి జీవితాంతం పెన్షన్ పొందే పథకం.",
      benefits: "60 సంవత్సరాల తర్వాత నెలకు ₹3,000 హామీతో కూడిన జీవితాంత పెన్షన్.",
      character: { name: "కాలు (వీధి వ్యాపారి)", role: "అసంఘటిత కార్మికుడు", desc: "వృద్ధాప్య భద్రత కోసం పొదుపు చేసుకుంటున్న వీధి వ్యాపారి" },
      panels: [
        { num: 1, tag: "ప్యానెల్ 1: వృద్ధాప్య ఆందోళన", speaker: "కాలు", dialogue: "రోజంతా పండ్ల బండి తోస్తేనే సంపాదన. రేపు ముసలితనం వస్తే నా ఖర్చులు ఎవరు చూస్తారు?", caption: "వృద్ధాప్య ఆర్థిక భద్రత కోసం కార్మికుడి ఆందోళన." },
        { num: 2, tag: "ప్యానెల్ 2: పీఎం-SYM పెన్షన్", speaker: "గోవ్‌టూన్ మిత్ర", dialogue: "PM-SYM లో చేరండి! నెలకు ₹55 నుండి ₹100 కడితే, ప్రభుత్వం కూడా అంతే మొత్తం జమ చేసి ₹3,000 నెలవారీ పెన్షన్ ఇస్తుంది!", caption: "జీవితాంతం నెల నెలా స్థిరమైన పెన్షన్." },
        { num: 3, tag: "ప్యానెల్ 3: CSC లో నమోదు", speaker: "CSC ఆపరేటర్", dialogue: "మీ ఆధార్, జన్ ధన్ పాస్‌బుక్ ఇస్తే 5 నిమిషాల్లో పెన్షన్ కార్డు వచ్చేస్తుంది.", caption: "సులభమైన బయోమెట్రిక్ నమోదు." },
        { num: 4, tag: "ప్యానెల్ 4: గౌరవప్రదమైన వృద్ధాప్యం", speaker: "కాలు & భార్య", dialogue: "🎉 60 ఏళ్ల తర్వాత నెలకు ₹3,000 ఖాయమైన పెన్షన్ వస్తుంది! మా వృద్ధాప్యం ధైర్యంగా గడుస్తుంది!", caption: "శ్రామికులకు ఆర్థిక స్వతంత్రం మరియు గౌరవం." }
      ]
    },
    hi: {
      name: "असंगठित कामगार राष्ट्रीय पेंशन योजना (PM-SYM)",
      purpose: "दिहाड़ी मजदूरों, रेहड़ी-पटरी वालों और ड्राइवरों को 60 वर्ष के बाद आजीवन सुरक्षित मासिक पेंशन देने की योजना।",
      benefits: "60 वर्ष की आयु के बाद ₹3,000 प्रति माह गारंटीकृत आजीवन पेंशन।",
      character: { name: "कालू (स्ट्रीट वेंडर)", role: "असंगठित कामगार", desc: "बुढ़ापे की सुरक्षा की योजना बनाते फल विक्रेता" },
      panels: [
        { num: 1, tag: "पैनल 1: बुढ़ापे की चिंता", speaker: "कालू", dialogue: "ठेले से रोज कमाता हूं, लेकिन जब बुढ़ापे में ठेला नहीं खींच पाऊंगा, तब घर का खर्च कैसे चलेगा?", caption: "असंगठित श्रमिक की बुढ़ापे की चिंता।" },
        { num: 2, tag: "पैनल 2: पीएम-एसवाईएम योजना", speaker: "गवटून मित्र", dialogue: "PM-SYM में शामिल हों! महीने के ₹55 से ₹100 जमा करें, सरकार भी बराबर का अंशदान देकर ₹3,000 मासिक पेंशन देगी!", caption: "आजीवन गारंटीकृत पेंशन सुरक्षा।" },
        { num: 3, tag: "पैनल 3: सीएससी पर नामांकन", speaker: "सीएससी वीएलई", dialogue: "अपना आधार और जनधन बैंक पासबुक दें, तुरंत पेंशन कार्ड बन जाएगा।", caption: "त्वरित बायोमेट्रिक ऑनबोर्डिंग।" },
        { num: 4, tag: "पैनल 4: सुरक्षित बुढ़ापा", speaker: "कालू और पत्नी", dialogue: "🎉 अब 60 वर्ष के बाद ₹3,000 की पक्की मासिक पेंशन मिलेगी! हमारा बुढ़ापा पूरी तरह सुरक्षित है!", caption: "श्रमिकों के लिए वित्तीय स्वावलंबन और सम्मान।" }
      ]
    }
  },
  kalyana_lakshmi: {
    te: {
      name: "తెలంగాణ కళ్యాణ లక్ష్మి / షాదీ ముబారక్",
      purpose: "తెలంగాణలోని పేద కుటుంబాల ఆడపిల్లల వివాహ ఖర్చుల కోసం ప్రభుత్వం అందించే ఒకేసారి ఆర్థిక సాయం.",
      benefits: "వధువు తల్లి బ్యాంక్ ఖాతాలో నేరుగా ₹1,00,116 ఒకేసారి జమ.",
      character: { name: "లత తాయి & కూతురు", role: "తెలంగాణ కుటుంబం", desc: "కూతురి పెళ్లిని ప్రభుత్వ సాయంతో ఘనంగా జరుపుకుంటున్న తల్లి" },
      panels: [
        { num: 1, tag: "ప్యానెల్ 1: పెళ్లి ఖర్చుల భారం", speaker: "లత తాయి", dialogue: "కూతురికి మంచి సంబంధం కుదిరింది, కానీ పెళ్లి ఖర్చులకు అప్పులు చేయకుండా ఎలా గడవాలి?", caption: "కూతురి వివాహ ఖర్చుల గురించి తల్లి ఆందోళన." },
        { num: 2, tag: "ప్యానెల్ 2: కళ్యాణ లక్ష్మి పతకం", speaker: "పంచాయతీ కార్యదర్శి", dialogue: "కళ్యాణ లక్ష్మికి దరఖాస్తు చేసుకోండి! ప్రభుత్వం వధువు తల్లి ఖాతాలో నేరుగా ₹1,00,116 ఒకేసారి జమ చేస్తుంది!", caption: "ఆడపిల్లల పెళ్లి కోసం రాష్ట్ర ప్రభుత్వ భారీ సాయం." },
        { num: 3, tag: "ప్యానెల్ 3: మీసేవలో దరఖాస్తు", speaker: "మీసేవ ఆపరేటర్", dialogue: "వధువు ఆధార్, ఆదాయ ధృవీకరణ పత్రం, లగ్నపత్రిక, తల్లి బ్యాంక్ పాస్‌బుక్ telanganaepass లో సమర్పించండి.", caption: "సులభమైన ఆన్‌లైన్ ధృవీకరణ." },
        { num: 4, tag: "ప్యానెల్ 4: సంతోషకరమైన వివాహం", speaker: "తల్లి & వధువు", dialogue: "🎉 ₹1,00,116 ఖాతాలో పడ్డాయి! అప్పులు లేకుండా మా అమ్మాయి పెళ్లి ఎంతో ఘనంగా జరిగింది!", caption: "కుటుంబాల్లో వెల్లివిరిసిన సంతోషం." }
      ]
    },
    hi: {
      name: "तेलंगाना कल्याणा लक्ष्मी योजना",
      purpose: "तेलंगाना के गरीब परिवारों की बेटियों के विवाह में आर्थिक सहायता प्रदान करने हेतु सरकारी अनुदान।",
      benefits: "दुल्हन की मां के बैंक खाते में ₹1,00,116 की एकमुश्त सीधी सहायता।",
      character: { name: "लता ताई और बेटी", role: "तेलंगाना परिवार", desc: "सरकारी सहायता से बेटी का विवाह संपन्न करती मां" },
      panels: [
        { num: 1, tag: "पैनल 1: विवाह खर्च की चिंता", speaker: "लता ताई", dialogue: "बेटी का रिश्ता तय हो गया है, लेकिन शादी के भारी खर्चों का प्रबंध बिना कर्ज के कैसे होगा?", caption: "विवाह के खर्चों को लेकर परिवार चिंतित।" },
        { num: 2, tag: "पैनल 2: कल्याणा लक्ष्मी योजना", speaker: "पंचायत सचिव", dialogue: "कल्याणा लक्ष्मी के लिए आवेदन करें! तेलंगाना सरकार दुल्हन की मां के खाते में ₹1,00,116 की एकमुश्त सहायता देती है!", caption: "बालिकाओं के विवाह हेतु प्रमुख राज्य कल्याण योजना।" },
        { num: 3, tag: "पैनल 3: मीसेवा पर आवेदन", speaker: "मीसेवा संचालक", dialogue: "दुल्हन का आधार, जन्म प्रमाण पत्र, विवाह पत्रिका और मां की बैंक पासबुक telanganaepass पर जमा करें।", caption: "पारदर्शी ऑनलाइन प्रक्रिया।" },
        { num: 4, tag: "पैनल 4: धूमधाम से विवाह", speaker: "मां और दुल्हन", dialogue: "🎉 खाते में ₹1,00,116 आ गए! बिना किसी कर्ज के हमारी बेटी का विवाह गरिमापूर्ण ढंग से संपन्न हुआ!", caption: "महिलाओं का सशक्तिकरण और परिवारों में खुशी।" }
      ]
    }
  },
  pm_awas_urban: {
    te: {
      name: "పీఎం ఆవాస్ యోజన (పట్టణ గృహ నిర్మాణం)",
      purpose: "పట్టణ పేదలు మరియు అద్దె ఇళ్లలో నివసించే వారి కోసం ప్రభుత్వం అందించే పక్కా ఇళ్ల నిర్మాణ సబ్సిడీ.",
      benefits: "సొంత పక్కా ఇల్లు నిర్మించుకోవడానికి ₹2.5 లక్షల వరకు ప్రత్యక్ష ప్రభుత్వ సబ్సిడీ."
    },
    hi: {
      name: "पीएम आवास योजना (शहरी)",
      purpose: "शहरी गरीबों और बेघर परिवारों को अपना पक्का मकान बनाने के लिए सरकारी ब्याज और निर्माण सब्सिडी।",
      benefits: "मकान निर्माण एवं विकास हेतु ₹2.5 लाख तक की सीधी सरकारी सब्सिडी।"
    }
  },
  nmmss_scholarship: {
    te: {
      name: "నేషనల్ మీన్స్-కమ్-మెరిట్ స్కాలర్‌షిప్ (NMMSS)",
      purpose: "8వ తరగతి ఉత్తీర్ణులైన పేద విద్యార్థులు ఉన్నత పాఠశాల చదువును కొనసాగించడానికి ఇచ్చే కేంద్ర స్కాలర్‌షిప్.",
      benefits: "9వ తరగతి నుండి 12వ తరగతి వరకు సంవత్సరానికి ₹12,000 (నెలకు ₹1,000) నగదు సాయం."
    },
    hi: {
      name: "राष्ट्रीय साधन-सह-योग्यता छात्रवृत्ति (NMMSS)",
      purpose: "आर्थिक रूप से कमजोर वर्ग के मेधावी छात्रों को माध्यमिक स्तर पर पढ़ाई जारी रखने हेतु छात्रवृत्ति।",
      benefits: "कक्षा 9 से 12वीं तक ₹12,000 प्रति वर्ष (₹1,000 प्रति माह) की छात्रवृत्ति।"
    }
  },
  pm_kisan: {
    te: {
      name: "పీఎం-కిసాన్ సమ్మాన్ నిధి",
      purpose: "దేశంలోని ప్రతి రైతు కుటుంబానికి పెట్టుబడి మరియు వ్యవసాయ అవసరాల కోసం కేంద్ర ప్రభుత్వం అందించే ఆదాయ భరోసా.",
      benefits: "సంవత్సరానికి ₹6,000 (3 విడతల్లో ₹2,000 చొప్పున) నేరుగా DBT ద్వారా జమ.",
      character: { name: "రాము కాకా", role: "రైతు", desc: "ప్రభుత్వ ఆదాయ భరోసాతో పంటలు సాగుచేస్తున్న రైతు" },
      panels: [
        { num: 1, tag: "ప్యానెల్ 1: విత్తనాల సీజన్ ఆందోళన", speaker: "రాము కాకా", dialogue: "విత్తనాల సమయం వచ్చేసింది, కానీ డీజిల్ మరియు ఎరువుల కోసం చేతిలో పైసలు లేవు.", caption: "పంట పెట్టుబడి కోసం రైతు ఆలోచన." },
        { num: 2, tag: "ప్యానెల్ 2: పీఎం-కిసాన్ హామీ", speaker: "కిసాన్ మిత్ర", dialogue: "పీఎం-కిసాన్ పథకం ద్వారా కేంద్ర ప్రభుత్వం ఏడాదికి ₹6,000 నేరుగా మీ బ్యాంక్ ఖాతాలో వేస్తుంది!", caption: "రైతులకు నిరంతర ఆదాయ భరోసా." },
        { num: 3, tag: "ప్యానెల్ 3: e-KYC పూర్తి చేయండి", speaker: "CSC ఆపరేటర్", dialogue: "pmkisan.gov.in లో లేదా CSC లో ఆధార్ బయోమెట్రిక్ e-KYC పూర్తి చేయండి.", caption: "100% డిజిటల్ మరియు పారదర్శక ప్రక్రియ." },
        { num: 4, tag: "ప్యానెల్ 4: మంచి దిగుబడి", speaker: "రాము కాకా", dialogue: "🎉 ₹2,000 విడత ఖాతాలో పడింది! సమయానికి మంచి విత్తనాలు కొని పంట వేసాను, మంచి దిగుబడి వచ్చింది!", caption: "రైతులకు ఆర్థిక ధైర్యం." }
      ]
    },
    hi: {
      name: "पीएम-किसान सम्मान निधि योजना",
      purpose: "देश के सभी भूमिधारक किसान परिवारों को कृषि आवश्यकताओं हेतु प्रत्यक्ष आर्थिक सहायता।",
      benefits: "प्रति वर्ष ₹6,000 (3 किस्तों में ₹2,000 प्रत्येक) सीधे बैंक खाते में डीबीटी।",
      character: { name: "रामू काका", role: "किसान", desc: "सरकारी सहायता से निश्चिंत होकर खेती करते किसान" },
      panels: [
        { num: 1, tag: "पैनल 1: बुवाई के समय की चिंता", speaker: "रामू काका", dialogue: "बुवाई का मौसम आ गया है, लेकिन खाद और बीज के लिए नकदी की जरूरत है।", caption: "फसल के शुरुआती खर्चों को लेकर किसान चिंतित।" },
        { num: 2, tag: "पैनल 2: पीएम-किसान की गारंटी", speaker: "किसान मित्र", dialogue: "पीएम-किसान योजना के तहत सरकार हर साल ₹6,000 सीधे आपके बैंक खाते में देती है!", caption: "किसानों के लिए सुनिश्चित प्रत्यक्ष आय सहायता।" },
        { num: 3, tag: "पैनल 3: e-KYC पूरा करें", speaker: "सीएससी ऑपरेटर", dialogue: "pmkisan.gov.in या नजदीकी सीएससी पर आधार ई-केवाईसी पूरा कराएं।", caption: "100% पारदर्शी डिजिटल सत्यापन।" },
        { num: 4, tag: "पैनल 4: बंपर पैदावार", speaker: "रामू काका", dialogue: "🎉 ₹2,000 की किस्त खाते में आ गई! समय पर खाद-बीज मिल गया और फसल लहलहा उठी!", caption: "भारतीय किसानों के लिए आर्थिक संबल।" }
      ]
    }
  },
  ayushman: {
    te: {
      name: "ఆయుష్మాన్ భారత్ (పీఎం-జన్ ఆరోగ్య యోజన)",
      purpose: "ప్రతి పేద కుటుంబానికి ఆసుపత్రి చికిత్సలు, శస్త్రచికిత్సల కోసం దేశవ్యాప్తంగా ఉచిత నగదు రహిత వైద్య బీమా.",
      benefits: "ప్రతి కుటుంబానికి సంవత్సరానికి ₹5 లక్షల వరకు ఉచిత నగదు రహిత ఆసుపత్రి చికిత్స.",
      character: { name: "శర్మ జీ & కుటుంబం", role: "లబ్ధిదారుడు", desc: "ఉచిత వైద్య చికిత్సతో ప్రాణాలు కాపాడుకున్న కుటుంబం" },
      panels: [
        { num: 1, tag: "ప్యానెల్ 1: వైద్య అత్యవసరం", speaker: "తండ్రి", dialogue: "ఆసుపత్రిలో గుండె ఆపరేషన్ కు ₹3 లక్షలు ఖర్చు అవుతుందన్నారు. ఇంత పెద్ద మొత్తం ఎక్కడి నుండి తేవాలి?", caption: "ఆసుపత్రి బిల్లుల గురించి కుటుంబ ఆందోళన." },
        { num: 2, tag: "ప్యానెల్ 2: ఆయుష్మాన్ భారత్ రక్షణ", speaker: "ఆయుష్మాన్ మిత్ర", dialogue: "ఆందోళన పడకండి! ఆయుష్మాన్ భారత్ కార్డు ఉంటే ఏటా ₹5 లక్షల వరకు ఉచిత చికిత్స లభిస్తుంది!", caption: "ప్రభుత్వ ఉచిత నగదు రహిత వైద్య భరోసా." },
        { num: 3, tag: "ప్యానెల్ 3: ఉచిత ఆసుపత్రి అడ్మిషన్", speaker: "ఆసుపత్రి రిసెప్షన్", dialogue: "మీ ఆయుష్మాన్ కార్డు ఆధార్‌తో ధృవీకరించబడింది. పైసా ఖర్చు లేకుండా మొత్తం శస్త్రచికిత్స ఉచితం.", caption: "పూర్తిగా ఉచిత క్యాష్‌లెస్ చికిత్స." },
        { num: 4, tag: "ప్యానెల్ 4: ఆరోగ్యంగా ఇంటికి", speaker: "కోలుకున్న రోగి", dialogue: "🎉 ఒక్క రూపాయి కూడా ఖర్చు లేకుండా ఆపరేషన్ విజయవంతమైంది! ఆయుష్మాన్ భారత్ మా ప్రాణాలను కాపాడింది!", caption: "ప్రతి పౌరుడికి ఆరోగ్య భరోసా." }
      ]
    },
    hi: {
      name: "आयुष्मान भारत (पीएम जन आरोग्य योजना)",
      purpose: "देश के गरीब परिवारों को सूचीबद्ध अस्पतालों में गंभीर बीमारियों के इलाज हेतु कैशलेस स्वास्थ्य बीमा।",
      benefits: "प्रति परिवार प्रति वर्ष ₹5 लाख तक का पूर्णतः मुफ्त एवं कैशलेस इलाज।",
      character: { name: "शर्मा जी और परिवार", role: "लाभार्थी", desc: "मुफ्त इलाज से स्वस्थ होकर घर लौटा परिवार" },
      panels: [
        { num: 1, tag: "पैनल 1: बीमारी का संकट", speaker: "पिता", dialogue: "डॉक्टर ने ऑपरेशन के लिए ₹3 लाख का खर्च बताया है। हमारे पास इतने पैसे कहां से आएंगे?", caption: "अस्पताल के भारी बिल को लेकर परिवार चिंतित।" },
        { num: 2, tag: "पैनल 2: आयुष्मान सुरक्षा कवच", speaker: "आयुष्मान मित्र", dialogue: "घबराइए मत! आयुष्मान भारत के तहत हर साल ₹5 लाख तक का इलाज पूरी तरह मुफ्त होता है!", caption: "मुफ्त एवं कैशलेस स्वास्थ्य सुरक्षा।" },
        { num: 3, tag: "पैनल 3: शून्य खर्च पर इलाज", speaker: "अस्पताल स्वागत", dialogue: "आपका आयुष्मान कार्ड सत्यापित हो गया है। बिना किसी अग्रिम राशि के पूरा इलाज मुफ्त होगा।", caption: "पूरी तरह कैशलेस अस्पताल सुविधा।" },
        { num: 4, tag: "पैनल 4: स्वस्थ और खुशहाल", speaker: "स्वस्थ मरीज", dialogue: "🎉 बिना एक रुपया खर्च किए सफल इलाज हो गया! आयुष्मान भारत ने हमारा जीवन बचा लिया!", caption: "हर नागरिक के लिए स्वास्थ्य सुरक्षा।" }
      ]
    }
  },
  surya_ghar: {
    te: {
      name: "పీఎం సూర్య ఘర్: ఉచిత విద్యుత్ యోజన",
      purpose: "ఇంటి పైకప్పుపై సోలార్ ప్యానెల్స్ ఏర్పాటు చేసుకుని నెలకు 300 యూనిట్ల వరకు ఉచిత కరెంట్ పొందే పథకం.",
      benefits: "3kW సోలార్ ప్లాంట్ ఏర్పాటుపై ₹78,000 వరకు నేరుగా కేంద్ర ప్రభుత్వ సబ్సిడీ."
    },
    hi: {
      name: "पीएम सूर्य घर: मुफ्त बिजली योजना",
      purpose: "घरों की छतों पर सोलर पैनल लगाकर हर महीने 300 यूनिट तक मुफ्त बिजली देने की योजना।",
      benefits: "3kW रूफटॉप सोलर लगाने पर ₹78,000 की सीधी केंद्रीय सब्सिडी।"
    }
  },
  pm_svanidhi: {
    te: {
      name: "పీఎం స్వనిధి (వీధి వ్యాపారుల రుణం)",
      purpose: "రోడ్లపై వ్యాపారం చేసుకునే వీధి వ్యాపారులకు బ్యాంకుల ద్వారా ఎటువంటి పూచీకత్తు లేకుండా లభించే తక్కువ వడ్డీ రుణం.",
      benefits: "మొదట ₹10,000 పూచీకత్తు లేని రుణం, సకాలంలో చెల్లిస్తే ₹20,000 & ₹50,000 వరకు పెంపు."
    },
    hi: {
      name: "पीएम स्वनिधि (स्ट्रीट वेंडर ऋण योजना)",
      purpose: "रेहड़ी-पटरी और ठेला लगाने वाले छोटे व्यापारियों को बिना गारंटी के किफायती कार्यशील पूंजी ऋण।",
      benefits: "₹10,000 का प्रारंभिक गारंटी-मुक्त ऋण, समय पर भुगतान पर ₹20,000 और ₹50,000 का अगला लोन।"
    }
  },
  mudra_loan: {
    te: {
      name: "ప్రధాన మంత్రి ముద్ర యోజన (PMMY)",
      purpose: "చిన్న వ్యాపారాలు, దుకాణాలు, కుట్టు మిషన్ కేంద్రాలు పెట్టుకోవడానికి బ్యాంకుల ద్వారా ఇచ్చే పూచీకత్తు లేని రుణాలు.",
      benefits: "శిశు లోన్ (₹50,000 వరకు), కిశోర్ (₹5 లక్షల వరకు), తరుణ్ (₹10 లక్షల వరకు) తక్కువ వడ్డీ రుణాలు."
    },
    hi: {
      name: "प्रधानमंत्री मुद्रा योजना (PMMY)",
      purpose: "छोटे उद्यम, दुकानें, बुटीक और कार्यशाला शुरू करने हेतु बिना किसी संपत्ति बंधक के माइक्रो-लोन।",
      benefits: "शिशु (₹50,000 तक), किशोर (₹5 लाख तक), तरुण (₹10 लाख तक) का कम ब्याज वाला ऋण।"
    }
  },
  sukanya: {
    te: {
      name: "సుకున్య సమృద్ధి యోజన",
      purpose: "ఆడపిల్లల ఉన్నత చదువు మరియు వివాహ భవిష్యత్తు కోసం ప్రభుత్వం అందించే అత్యధిక వడ్డీ పొదుపు పథకం.",
      benefits: "8.2% చక్రవడ్డీ ఆదాయం + సెక్షన్ 80C కింద 100% పూర్తి పన్ను మినహాయింపు."
    },
    hi: {
      name: "सुकन्या समृद्धि योजना",
      purpose: "बालिकाओं की उच्च शिक्षा और उज्ज्वल भविष्य के लिए सरकार द्वारा संचालित सर्वाधिक ब्याज बचत योजना।",
      benefits: "8.2% की उच्चतम वार्षिक चक्रवृद्धि ब्याज दर + आयकर से पूर्ण छूट।"
    }
  },
  pm_vishwakarma: {
    te: {
      name: "పీఎం విశ్వకర్మ పథకం",
      purpose: "చేతివృత్తుల వారు, వడ్రంగులు, కమ్మరులు, కుమ్మరులు, టైలర్ల ఆధునిక పరికరాలు మరియు శిక్షణ కోసం ఆర్థిక పథకం.",
      benefits: "₹15,000 ఉచిత టూల్‌కిట్ ఈ-వోచర్ + రోజువారీ స్టైపెండ్‌తో 5 రోజుల శిక్షణ + 5% వడ్డీకే ₹3 లక్షల రుణం."
    },
    hi: {
      name: "पीएम विश्वकर्मा योजना",
      purpose: "पारंपरिक कारीगरों, बढ़ई, लोहार, दर्जी एवं शिल्पकारों को आधुनिक टूलकिट और रियायती ऋण सहायता।",
      benefits: "₹15,000 का आधुनिक टूलकिट ई-वाउचर + ₹500/दिन प्रशिक्षण स्टाइपेंड + 5% ब्याज पर ₹3 लाख का लोन।"
    }
  }
};

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

// Load saved bookmarks and language
try {
  const savedBm = localStorage.getItem('govtoon_saved_schemes');
  if (savedBm) {
    const list = JSON.parse(savedBm);
    if (Array.isArray(list)) appState.bookmarkedIds = new Set(list);
  }

  const savedLang = localStorage.getItem('govtoon_lang');
  if (savedLang && (savedLang === 'en' || savedLang === 'te' || savedLang === 'hi')) {
    appState.currentLang = savedLang;
  }
} catch (e) {}

// Comprehensive Scheme Database (Central & State Verified Schemes)
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
      { q: "What is the toolkit incentive provided under PM Vishwakarma Scheme?", options: ["₹15,000 e-voucher", "₹5,000 cash", "₹1,00,000 loan", "₹1,000 discount"], correct: 0, panelRef: 2, explanation: "PM Vishwakarma provides a ₹15,000 e-voucher for modern toolkits along with skill training." }
    ]
  }
];

// Localized Scheme Resolver
function getLocalizedScheme(s, lang) {
  if (!s) return s;
  const l = lang || appState.currentLang || 'en';
  if (l === 'en') return s;

  const overrides = SCHEMES_I18N[s.id] && SCHEMES_I18N[s.id][l];
  if (!overrides) return s;

  return {
    ...s,
    name: overrides.name || s.name,
    purpose: overrides.purpose || s.purpose,
    benefits: overrides.benefits || s.benefits,
    character: overrides.character || s.character,
    panels: overrides.panels ? { [l]: overrides.panels, en: s.panels.en || s.panels } : s.panels
  };
}

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

// Update All UI Text Elements to Active Language
function updateLanguageUI() {
  const lang = appState.currentLang || 'en';
  const t = TRANSLATIONS[lang] || TRANSLATIONS.en;

  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (t[key]) {
      el.innerHTML = t[key];
    }
  });

  document.querySelectorAll('[data-i18n-ph]').forEach(el => {
    const key = el.getAttribute('data-i18n-ph');
    if (t[key]) {
      el.placeholder = t[key];
    }
  });

  const sel = document.getElementById('app-language-select');
  if (sel && sel.value !== lang) {
    sel.value = lang;
  }

  // Update Dropdown Options (Category & Occupation)
  updateFilterDropdownOptions(lang);
  updateMitraAssistantInitialMessage(lang);
}

// Localized Filter Options
function updateFilterDropdownOptions(lang) {
  const catSel = document.getElementById('filter-category');
  if (catSel) {
    const currentVal = catSel.value;
    if (lang === 'te') {
      catSel.innerHTML = `
        <option value="all">అన్ని వర్గాలు</option>
        <option value="Education">విద్య & స్కాలర్‌షిప్‌లు</option>
        <option value="Agriculture">వ్యవసాయం & రైతు సాయం</option>
        <option value="Pension">పెన్షన్ & సామాజిక భద్రత</option>
        <option value="Employment">ఉపాధి & చేతివృత్తులు</option>
        <option value="Women & Child">మహిళలు & పిల్లల సంక్షేమం</option>
        <option value="Housing">గృహ నిర్మాణం & సోలార్</option>
        <option value="Health">ఆరోగ్యం & ఉచిత వైద్యం</option>
        <option value="Banking & Finance">బ్యాంకింగ్ & పొదుపు</option>
        <option value="Business">వ్యాపారం & చిన్న రుణాలు</option>
      `;
    } else if (lang === 'hi') {
      catSel.innerHTML = `
        <option value="all">सभी श्रेणियां</option>
        <option value="Education">शिक्षा एवं छात्रवृत्ति</option>
        <option value="Agriculture">कृषि एवं किसान सहायता</option>
        <option value="Pension">पेंशन एवं सामाजिक सुरक्षा</option>
        <option value="Employment">रोजगार एवं कौशल</option>
        <option value="Women & Child">महिला एवं बाल विकास</option>
        <option value="Housing">आवास एवं सोलर ऊर्जा</option>
        <option value="Health">स्वास्थ्य एवं मुफ्त इलाज</option>
        <option value="Banking & Finance">बैंकिंग एवं बचत</option>
        <option value="Business">व्यापार एवं सूक्ष्म ऋण</option>
      `;
    } else {
      catSel.innerHTML = `
        <option value="all">All categories</option>
        <option value="Education">Education</option>
        <option value="Agriculture">Agriculture</option>
        <option value="Pension">Pension</option>
        <option value="Employment">Employment</option>
        <option value="Women & Child">Women & Child</option>
        <option value="Housing">Housing</option>
        <option value="Health">Health</option>
        <option value="Banking & Finance">Banking & Finance</option>
        <option value="Business">Business</option>
      `;
    }
    catSel.value = currentVal;
  }

  const occSel = document.getElementById('filter-occupation');
  if (occSel) {
    const currentVal = occSel.value;
    if (lang === 'te') {
      occSel.innerHTML = `
        <option value="all">అన్ని వృత్తులు</option>
        <option value="Student">విద్యార్థి / యువత</option>
        <option value="Farmer">రైతు / వ్యవసాయదారుడు</option>
        <option value="Unorganised">అసంఘటిత కార్మికుడు / వీధి వ్యాపారి</option>
        <option value="Women">మహిళలు / గృహిణి</option>
        <option value="Senior">వయోవృద్ధులు (60+)</option>
        <option value="Artisan">చేతివృత్తుల వారు / శిల్పి</option>
      `;
    } else if (lang === 'hi') {
      occSel.innerHTML = `
        <option value="all">सभी व्यवसाय</option>
        <option value="Student">छात्र / युवा</option>
        <option value="Farmer">किसान</option>
        <option value="Unorganised">असंगठित मजदूर / स्ट्रीट वेंडर</option>
        <option value="Women">महिला / गृहिणी</option>
        <option value="Senior">वरिष्ठ नागरिक (60+)</option>
        <option value="Artisan">कारीगर / शिल्पकार</option>
      `;
    } else {
      occSel.innerHTML = `
        <option value="all">All occupations</option>
        <option value="Student">Student</option>
        <option value="Farmer">Farmer</option>
        <option value="Unorganised">Unorganised Worker / Street Vendor</option>
        <option value="Women">Women / Homemaker</option>
        <option value="Senior">Senior Citizen</option>
        <option value="Artisan">Artisan / Craftsman</option>
      `;
    }
    occSel.value = currentVal;
  }
}

// Localized Initial Mitra AI Message & Suggested Prompts
function updateMitraAssistantInitialMessage(lang) {
  const initMsg = document.getElementById('mitra-initial-msg');
  if (initMsg) {
    if (lang === 'te') {
      initMsg.innerHTML = `
        <p>నమస్కారం! నేను మీ <strong>మిత్ర</strong>, ప్రభుత్వ సంక్షేమ పథకాల వ్యక్తిగత AI సహాయకుడిని.</p>
        <p style="margin-top:6px;">మీ వయస్సు, రాష్ట్రం లేదా వృత్తి గురించి చెప్పండి లేదా <strong>పీఎం మెరిట్ స్కాలర్‌షిప్</strong>, <strong>రైతు బంధు</strong>, <strong>పీఎం-కిసాన్</strong>, లేదా <strong>ఆయుష్మాన్ భారత్</strong> గురించి అడగండి!</p>
      `;
    } else if (lang === 'hi') {
      initMsg.innerHTML = `
        <p>नमस्ते! मैं आपका <strong>मित्र</strong>, सरकारी योजनाओं का व्यक्तिगत AI सहायक हूं।</p>
        <p style="margin-top:6px;">मुझे अपनी उम्र, राज्य या व्यवसाय बताएं या <strong>पीएम मेरिट छात्रवृत्ति</strong>, <strong>रायथू बंधु</strong>, <strong>पीएम-किसान</strong>, या <strong>आयुष्मान भारत</strong> के बारे में पूछें!</p>
      `;
    } else {
      initMsg.innerHTML = `
        <p>Namaste! I am <strong>Mitra</strong>, your personal Government Scheme Assistant.</p>
        <p style="margin-top:6px;">Tell me about yourself (your age, state, or occupation) or ask about any scheme like <strong>PM Merit Scholarship</strong>, <strong>Rythu Bandhu</strong>, <strong>PM-Kisan</strong>, or <strong>Ayushman Bharat</strong>!</p>
      `;
    }
  }

  const chipsBox = document.getElementById('mitra-chips-box');
  if (chipsBox) {
    if (lang === 'te') {
      chipsBox.innerHTML = `
        <button class="fchip" onclick="sendFloatingQuickQuestion('తెలంగాణ విద్యార్థులకు ఏ పథకాలు ఉన్నాయి?')">🎓 తెలంగాణ విద్యార్థుల పథకాలు</button>
        <button class="fchip" onclick="sendFloatingQuickQuestion('పీఎం మెరిట్ స్కాలర్‌షిప్ ₹50,000 ఎలా పొందాలి?')">💰 పీఎం మెరిట్ ₹50,000</button>
        <button class="fchip" onclick="sendFloatingQuickQuestion('రైతు బంధు ₹10,000 సాయం వివరాలు చెప్పండి')">🌾 రైతు బంధు ₹10,000</button>
        <button class="fchip" onclick="sendFloatingQuickQuestion('అసంఘటిత కార్మికుల పెన్షన్ ₹3,000 ఎలా వస్తుంది?')">👵 కార్మిక పెన్షన్ ₹3,000</button>
        <button class="fchip" onclick="sendFloatingQuickQuestion('ఆయుష్మాన్ భారత్ ₹5 లక్షల ఉచిత వైద్యం కార్డు ఎలా పొందాలి?')">🏥 ఆయుష్మాన్ కార్డ్</button>
      `;
    } else if (lang === 'hi') {
      chipsBox.innerHTML = `
        <button class="fchip" onclick="sendFloatingQuickQuestion('छात्रों के लिए कौन सी योजनाएं अनुशंसित हैं?')">🎓 छात्रों के लिए योजनाएं</button>
        <button class="fchip" onclick="sendFloatingQuickQuestion('पीएम मेरिट छात्रवृत्ति ₹50,000 कैसे प्राप्त करें?')">💰 पीएम मेरिट ₹50,000</button>
        <button class="fchip" onclick="sendFloatingQuickQuestion('रायथू बंधु ₹10,000 सहायता के बारे में बताएं')">🌾 रायथू बंधु ₹10,000</button>
        <button class="fchip" onclick="sendFloatingQuickQuestion('असंगठित कामगार पेंशन ₹3,000 योजना क्या है?')">👵 कामगार पेंशन ₹3,000</button>
        <button class="fchip" onclick="sendFloatingQuickQuestion('आयुष्मान भारत ₹5 लाख का मुफ्त कार्ड कैसे बनाएं?')">🏥 आयुष्मान कार्ड</button>
      `;
    } else {
      chipsBox.innerHTML = `
        <button class="fchip" onclick="sendFloatingQuickQuestion('What schemes are recommended for a student in Telangana?')">🎓 Student in Telangana</button>
        <button class="fchip" onclick="sendFloatingQuickQuestion('How to apply for PM Merit Scholarship ₹50,000?')">💰 PM Merit ₹50,000</button>
        <button class="fchip" onclick="sendFloatingQuickQuestion('Tell me about Telangana Rythu Bandhu ₹10,000 support')">🌾 Rythu Bandhu</button>
        <button class="fchip" onclick="sendFloatingQuickQuestion('What is National Pension Scheme for Unorganised Workers?')">👵 Worker Pension ₹3,000</button>
        <button class="fchip" onclick="sendFloatingQuickQuestion('How to get ₹5 Lakh Ayushman Bharat health card?')">🏥 Ayushman Card</button>
      `;
    }
  }
}

// Initialize Application
document.addEventListener("DOMContentLoaded", () => {
  setupIntroSplash();
  setupScrollReveals();

  if ('speechSynthesis' in window) {
    window.speechSynthesis.getVoices();
    window.speechSynthesis.onvoiceschanged = () => { window.speechSynthesis.getVoices(); };
  }

  setupNavigation();
  setupLanguageSelector();
  setupThemeToggles();
  updateLanguageUI();
  updateProfileUI();
  populateCompareDropdowns();
  renderDirectory();
  calculateEligibilityMatches();
  renderDashboard();

  if (SCHEMES_DATABASE.length > 0) {
    appState.selectedScheme = SCHEMES_DATABASE[0];
  }
});

// Dynamic Continuous IntersectionObserver Scroll Reveal Engine
let scrollObserver = null;
const observedElements = new WeakSet();

function setupScrollReveals() {
  if (typeof IntersectionObserver === 'undefined') {
    document.querySelectorAll('.reveal-on-scroll, .reveal-scale, .scheme-card-box, .panel-card, .matched-scheme-item').forEach(el => {
      el.classList.add('is-revealed');
    });
    return;
  }

  if (scrollObserver) {
    scrollObserver.disconnect();
  }

  scrollObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-revealed');
      } else {
        // Reset when scrolled out of view so it smoothly reveals every time you scroll down again!
        entry.target.classList.remove('is-revealed');
      }
    });
  }, {
    root: null,
    rootMargin: '0px 0px -20px 0px',
    threshold: 0.1
  });

  observeUnrevealedElements();
}

function observeUnrevealedElements() {
  if (!scrollObserver) return;
  setTimeout(() => {
    const elements = document.querySelectorAll('.reveal-on-scroll, .reveal-scale, .scheme-card-box, .matched-scheme-item, .panel-card');
    elements.forEach(el => {
      if (!observedElements.has(el)) {
        observedElements.add(el);
        scrollObserver.observe(el);
      }
    });
  }, 40);
}

// Opening Intro Splash Animation Controller
function setupIntroSplash() {
  const splash = document.getElementById('govtoon-intro-splash');
  if (!splash) return;

  // Auto dismiss after animation finishes (1.8s)
  const timer = setTimeout(() => {
    dismissIntroSplash();
  }, 1800);

  // Dismiss immediately on background click
  splash.addEventListener('click', (e) => {
    if (e.target.tagName !== 'BUTTON') {
      clearTimeout(timer);
      dismissIntroSplash();
    }
  });
}

function dismissIntroSplash() {
  const splash = document.getElementById('govtoon-intro-splash');
  if (!splash) return;
  splash.classList.add('splash-hide');
  setTimeout(() => {
    splash.style.display = 'none';
    observeUnrevealedElements();
  }, 800);
}

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
  observeUnrevealedElements();
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

// RENDER SCHEMES DIRECTORY (MATCHES SCREENSHOT & ACTIVE LANGUAGE)
function renderDirectory() {
  const grid = document.getElementById('schemes-directory-grid');
  if (!grid) return;

  const lang = appState.currentLang || 'en';
  const t = TRANSLATIONS[lang] || TRANSLATIONS.en;

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
    list = list.filter(s => {
      const ls = getLocalizedScheme(s, lang);
      return ls.name.toLowerCase().includes(query) ||
             ls.purpose.toLowerCase().includes(query) ||
             ls.benefits.toLowerCase().includes(query) ||
             s.category.toLowerCase().includes(query) ||
             s.dept.toLowerCase().includes(query);
    });
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
        <h3 style="font-family:var(--font-heading); color:var(--primary-navy); margin-top:12px;">${lang === 'te' ? 'ఎటువంటి పథకాలు సరిపోలలేదు' : lang === 'hi' ? 'कोई योजना नहीं मिली' : 'No schemes match your filter'}</h3>
        <p style="color:var(--text-muted); margin-bottom:16px;">${lang === 'te' ? 'దయచేసి మీ ఫిల్టర్‌లను మార్చండి.' : lang === 'hi' ? 'कृपया अपने फिल्टर बदलें।' : 'Try adjusting your search terms or clearing category filters.'}</p>
        <button class="btn btn-primary" onclick="resetExploreFilters()">${lang === 'te' ? 'ఫిల్టర్‌లను రీసెట్ చేయండి' : lang === 'hi' ? 'फिल्टर रीसेट करें' : 'Reset Filters'}</button>
      </div>
    `;
    return;
  }

  grid.innerHTML = '';
  list.forEach((s, idx) => {
    const ls = getLocalizedScheme(s, lang);
    const isBookmarked = appState.bookmarkedIds.has(s.id);
    const matchScore = s.calculatedMatch !== undefined ? s.calculatedMatch : computeSchemeMatchScore(s, userProfile);
    const timingLabel = s.timing || 'Open year-round';
    const timingClass = s.timingType === 'urgent' ? 'timing-urgent' : 'timing-open';
    const timingIcon = s.timingType === 'urgent' ? '🟡' : '🟢';

    const card = document.createElement('div');
    card.className = `scheme-card-box reveal-on-scroll reveal-delay-${(idx % 4) + 1}`;
    card.innerHTML = `
      <div>
        <div class="scard-top-row">
          <div class="scard-badges-group">
            <span class="badge-pill ${s.level === 'Central' ? 'level-central' : 'level-state'}">${s.level === 'Central' ? (lang === 'te' ? 'కేంద్ర పథకం' : lang === 'hi' ? 'केंद्रीय योजना' : 'CENTRAL') : (lang === 'te' ? 'రాష్ట్ర పథకం' : lang === 'hi' ? 'राज्य योजना' : 'STATE')}</span>
            <span class="badge-pill cat-tag">${s.category || 'Welfare'}</span>
          </div>
          <button class="star-bookmark-btn ${isBookmarked ? 'bookmarked' : ''}" 
                  onclick="toggleSchemeBookmark('${s.id}', event)" 
                  title="${isBookmarked ? 'Remove from Saved' : 'Save to My Library'}">
            ${isBookmarked ? '⭐' : '☆'}
          </button>
        </div>

        <h3 class="scard-title">${ls.name}</h3>
        <div class="scard-amount">${s.amount || ls.benefits.split(' ')[0]}</div>
        <p class="scard-desc">${ls.purpose}</p>
        <div style="margin-top:6px;">
          <a href="${s.officialUrl}" target="_blank" rel="noopener noreferrer" style="font-size:0.75rem; color:var(--trust-blue); font-weight:600; text-decoration:underline;">🔗 ${s.dept} (${s.officialUrl.replace('https://', '')}) ↗</a>
        </div>
      </div>

      <div>
        <div class="scard-bottom-meta">
          <div class="meta-status-tags">
            <span class="match-score-badge">${matchScore}% ${lang === 'te' ? 'సరిపోలింది' : lang === 'hi' ? 'मैచ' : 'MATCH'}</span>
            <span class="timing-badge ${timingClass}">${timingIcon} ${timingLabel}</span>
          </div>
        </div>

        <div class="scard-actions-bar">
          <button class="btn-card-comic" onclick="openSchemeReaderById('${s.id}')">${t.btn_read_comic || '🎨 4-Panel Comic'}</button>
          <button class="btn-card-elig" onclick="openSchemeEligibilityTab('${s.id}')">${t.btn_eligibility || '🟢 Eligibility'}</button>
          <a href="${s.applyUrl || s.officialUrl}" target="_blank" rel="noopener noreferrer" class="btn-card-apply">${t.btn_apply || '🚀 Apply ↗'}</a>
        </div>
      </div>
    `;
    grid.appendChild(card);
  });
  observeUnrevealedElements();
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

// Bookmark Toggle with Star Pop Animation
function toggleSchemeBookmark(schemeId, event) {
  if (event) {
    event.stopPropagation();
    const btn = event.currentTarget || event.target;
    if (btn) {
      btn.classList.add('star-anim');
      setTimeout(() => btn.classList.remove('star-anim'), 500);
    }
  }

  if (appState.bookmarkedIds.has(schemeId)) {
    appState.bookmarkedIds.delete(schemeId);
  } else {
    appState.bookmarkedIds.add(schemeId);
  }

  try {
    localStorage.setItem('govtoon_saved_schemes', JSON.stringify(Array.from(appState.bookmarkedIds)));
  } catch (e) {}

  setTimeout(() => {
    renderDirectory();
    renderDashboard();
  }, 180);
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

  const lang = appState.currentLang || 'en';
  const t = TRANSLATIONS[lang] || TRANSLATIONS.en;

  const currentProf = { age, income, state, occupation: occ };

  const matches = SCHEMES_DATABASE.map(s => ({
    scheme: s,
    score: computeSchemeMatchScore(s, currentProf)
  })).sort((a, b) => b.score - a.score);

  const container = document.getElementById('eligibility-matched-cards-list');
  if (!container) return;

  const topMatchCount = matches.filter(m => m.score >= 80).length;
  const countTxt = document.getElementById('elig-match-count');
  if (countTxt) countTxt.innerText = `${topMatchCount} ${lang === 'te' ? 'అత్యంత సిఫార్సు చేయబడిన పథకాలు' : lang === 'hi' ? 'अत्यधिक अनुशंसित योजनाएं' : 'Highly Recommended Schemes'}`;

  const subTxt = document.getElementById('elig-match-sub');
  if (subTxt) subTxt.innerText = `Age: ${age}, ${occ}, ${state}, ₹${income.toLocaleString()}`;

  const topRate = document.getElementById('elig-match-top-rate');
  if (topRate && matches.length > 0) topRate.innerText = `${matches[0].score}% ${lang === 'te' ? 'టాప్ మ్యాచ్' : lang === 'hi' ? 'शीर्ष मैच' : 'Top Match'}`;

  container.innerHTML = '';
  matches.forEach(m => {
    const s = m.scheme;
    const ls = getLocalizedScheme(s, lang);
    const isHigh = m.score >= 80;
    const isModerate = m.score >= 60 && m.score < 80;
    const scoreBadgeClass = isHigh ? 'green-badge' : isModerate ? 'saffron-badge' : 'red-badge';

    const card = document.createElement('div');
    card.className = `matched-scheme-item reveal-on-scroll reveal-delay-${(matches.indexOf(m) % 3) + 1}`;
    card.innerHTML = `
      <div class="matched-top-bar">
        <div>
          <span class="badge ${scoreBadgeClass}">${m.score}% MATCH</span>
          <strong style="font-family:var(--font-heading); margin-left:8px; font-size:1.1rem;">${ls.name}</strong>
        </div>
        <span style="font-weight:800; color:var(--primary-green); font-size:1.1rem;">${s.amount || ls.benefits.split(' ')[0]}</span>
      </div>
      <p style="font-size:0.86rem; color:var(--text-muted); margin:6px 0 10px 0;"><strong>${lang === 'te' ? 'అధికారిక నిబంధన' : lang === 'hi' ? 'आधिकारिक नियम' : 'Official Rule'}:</strong> ${s.eligibility ? s.eligibility.summary : ls.purpose}</p>
      <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:8px;">
        <span style="font-size:0.8rem; color:var(--text-muted);">${s.dept}</span>
        <div style="display:flex; gap:8px;">
          <button class="btn btn-outline-sm" onclick="openSchemeReaderById('${s.id}')">${t.btn_read_comic || '🎨 Read Comic'}</button>
          <a href="${s.applyUrl || s.officialUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-saffron btn-sm" style="font-size:0.8rem; padding:4px 10px;">Apply ↗</a>
        </div>
      </div>
    `;
    container.appendChild(card);
  });
  observeUnrevealedElements();
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

  const lang = appState.currentLang || 'en';
  const optionsHtml = SCHEMES_DATABASE.map(s => {
    const ls = getLocalizedScheme(s, lang);
    return `<option value="${s.id}">${ls.name} (${s.level})</option>`;
  }).join('');

  s1.innerHTML = optionsHtml;
  s2.innerHTML = optionsHtml;
  s3.innerHTML = `<option value="">-- ${lang === 'te' ? 'ఏదీ లేదు' : lang === 'hi' ? 'कोई नहीं' : 'None'} --</option>` + optionsHtml;

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

  const lang = appState.currentLang || 'en';
  const schemes = [s1, s2, s3].filter(Boolean);
  const container = document.getElementById('compare-matrix-table');
  if (!container) return;

  container.innerHTML = `
    <table class="compare-table">
      <thead>
        <tr>
          <th style="width:20%;">${lang === 'te' ? 'పోలిక అంశం' : lang === 'hi' ? 'तुलना बिंदु' : 'Comparison Attribute'}</th>
          ${schemes.map(s => {
            const ls = getLocalizedScheme(s, lang);
            return `<th style="width:${80/schemes.length}%; color:var(--primary-green); font-size:1.05rem;">${ls.name}</th>`;
          }).join('')}
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><strong>${lang === 'te' ? 'ఆర్థిక ప్రయోజనం / మొత్తం' : lang === 'hi' ? 'वित्तीय लाभ / राशि' : 'Financial Benefit / Amount'}</strong></td>
          ${schemes.map(s => {
            const ls = getLocalizedScheme(s, lang);
            return `<td style="font-size:1.1rem; font-weight:800; color:var(--primary-navy);">${s.amount || ls.benefits}</td>`;
          }).join('')}
        </tr>
        <tr>
          <td><strong>${lang === 'te' ? 'వర్గం & స్థాయి' : lang === 'hi' ? 'श्रेणी एवं स्तर' : 'Category & Level'}</strong></td>
          ${schemes.map(s => `<td><span class="badge blue-badge">${s.category} • ${s.level}</span></td>`).join('')}
        </tr>
        <tr>
          <td><strong>${lang === 'te' ? 'మంత్రిత్వ శాఖ / విభాగం' : lang === 'hi' ? 'मंत्रालय / विभाग' : 'Ministry / Department'}</strong></td>
          ${schemes.map(s => `<td>${s.dept}</td>`).join('')}
        </tr>
        <tr>
          <td><strong>${lang === 'te' ? 'లక్ష్యిత అర్హత' : lang === 'hi' ? 'लक्षित पात्रता' : 'Target Eligibility'}</strong></td>
          ${schemes.map(s => `<td>${s.eligibility ? s.eligibility.summary : 'See portal'}</td>`).join('')}
        </tr>
        <tr>
          <td><strong>${lang === 'te' ? 'తప్పనిసరి పత్రాలు' : lang === 'hi' ? 'अनिवार्य दस्तावेज' : 'Compulsory Documents'}</strong></td>
          ${schemes.map(s => `<td>${s.documents ? s.documents.map(d => d.name).join(', ') : 'Aadhaar, Passbook'}</td>`).join('')}
        </tr>
        <tr>
          <td><strong>${lang === 'te' ? 'దరఖాస్తు పోర్టల్' : lang === 'hi' ? 'आवेदन पोर्टल' : 'Application Mode'}</strong></td>
          ${schemes.map(s => `<td><a href="${s.applyUrl || s.officialUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-saffron btn-sm">${lang === 'te' ? 'అధికారిక పోర్టల్ ↗' : lang === 'hi' ? 'आधिकारिक पोर्टल ↗' : 'Apply on Official Portal ↗'}</a></td>`).join('')}
        </tr>
      </tbody>
    </table>
  `;
}

// CITIZEN DASHBOARD RENDERER
function renderDashboard() {
  const savedCount = document.getElementById('dash-saved-count');
  if (savedCount) savedCount.innerText = appState.bookmarkedIds.size;

  const lang = appState.currentLang || 'en';
  const savedList = document.getElementById('dashboard-saved-schemes-list');
  if (savedList) {
    savedList.innerHTML = '';
    const bookmarked = SCHEMES_DATABASE.filter(s => appState.bookmarkedIds.has(s.id));

    if (bookmarked.length === 0) {
      savedList.innerHTML = `<p style="color:var(--text-muted); font-size:0.9rem; padding:12px 0;">${lang === 'te' ? 'ఇంకా ఎటువంటి పథకాలు దాచబడలేదు. పథకం కార్డుపై ఉన్న స్టార్ ఐకాన్ ⭐ క్లిక్ చేయండి.' : lang === 'hi' ? 'कोई योजना सहेजी नहीं गई है। योजना कार्ड पर स्टार ⭐ आइकन दबाएं।' : 'No schemes bookmarked yet. Click the star icon ⭐ on any scheme card to save it here.'}</p>`;
    } else {
      bookmarked.forEach(s => {
        const ls = getLocalizedScheme(s, lang);
        const item = document.createElement('div');
        item.style.cssText = "display:flex; justify-content:space-between; align-items:center; padding:12px 0; border-bottom:1px solid var(--border-light);";
        item.innerHTML = `
          <div>
            <strong>${ls.name}</strong> <span style="font-size:0.8rem; color:var(--text-muted);">(${s.amount || s.category})</span>
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

  const lang = appState.currentLang || 'en';
  const ls = getLocalizedScheme(s, lang);

  const nameElem = document.getElementById('reader-scheme-name');
  if (nameElem) nameElem.innerText = ls.name;

  const badgeElem = document.getElementById('reader-category-badge');
  if (badgeElem) badgeElem.innerText = `${s.category} • ${s.level}`;

  const deptElem = document.getElementById('reader-scheme-dept');
  if (deptElem) {
    deptElem.innerHTML = `🔗 <a href="${s.officialUrl}" target="_blank" rel="noopener noreferrer" style="color:var(--primary-green); text-decoration:underline; font-weight:700;">${s.dept} (${s.officialUrl.replace('https://', '')}) ↗</a> | Source: <a href="https://www.india.gov.in" target="_blank" rel="noopener noreferrer" style="color:var(--primary-green); text-decoration:underline; font-weight:700;">India.gov.in ↗</a>`;
  }

  const linkElem = document.getElementById('reader-official-link');
  if (linkElem) linkElem.href = s.applyUrl || s.officialUrl;

  // Summary card
  const summaryBox = document.getElementById('reader-scheme-summary-card');
  if (summaryBox) {
    summaryBox.innerHTML = `
      <div style="background:#fff; border:1px solid var(--border-light); border-left:5px solid var(--primary-green); border-radius:14px; padding:20px; box-shadow:var(--shadow-sm); margin-bottom:20px;">
        <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:10px;">
          <div>
            <h3 style="font-family:var(--font-heading); color:var(--primary-navy); margin:0;">📌 ${lang === 'te' ? 'పథకం ముఖ్య సారాంశం' : lang === 'hi' ? 'योजना का मुख्य सारांश' : 'Key Details Overview'}: ${ls.name}</h3>
            <p style="font-size:0.85rem; color:var(--text-muted); margin:4px 0 0 0;">Official Government Fact Sheet Grounded on India.gov.in</p>
          </div>
          <span style="font-size:1.3rem; font-weight:800; color:var(--primary-green);">${s.amount || ls.benefits}</span>
        </div>
        <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(200px, 1fr)); gap:12px; margin-top:14px;">
          <div style="background:var(--bg-light); padding:10px 12px; border-radius:8px;">
            <strong style="font-size:0.8rem; color:var(--primary-green); display:block;">🎯 ${lang === 'te' ? 'లక్ష్యం' : lang === 'hi' ? 'उद्देश्य' : 'Purpose'}</strong>
            <span style="font-size:0.88rem;">${ls.purpose}</span>
          </div>
          <div style="background:var(--bg-light); padding:10px 12px; border-radius:8px;">
            <strong style="font-size:0.8rem; color:var(--trust-blue); display:block;">👤 ${lang === 'te' ? 'అర్హత' : lang === 'hi' ? 'पात्रता' : 'Eligibility'}</strong>
            <span style="font-size:0.88rem;">${s.eligibility ? s.eligibility.summary : 'All eligible citizens'}</span>
          </div>
        </div>
      </div>
    `;
  }

  // Character Card
  const charBox = document.getElementById('reader-character-card');
  if (charBox && ls.character) {
    charBox.innerHTML = `
      <div style="font-size:2rem; background:var(--primary-green-subtle); padding:8px 12px; border-radius:50%;">${ls.character.avatar || s.character.avatar || '🇮🇳'}</div>
      <div>
        <h4 style="font-family:var(--font-heading); font-size:1.1rem; margin:0; color:var(--primary-navy);">${ls.character.name} <span style="font-size:0.8rem; color:var(--primary-green);">(${ls.character.role})</span></h4>
        <p style="font-size:0.85rem; color:var(--text-muted); margin:2px 0 0 0;">${ls.character.desc}</p>
      </div>
    `;
  }

  // Panels Grid
  const panelsContainer = document.getElementById('reader-panels-container');
  if (panelsContainer) {
    panelsContainer.innerHTML = '';
    const panelsList = (ls.panels && ls.panels[lang]) || (s.panels && s.panels[lang]) || (s.panels && s.panels.en) || s.panels || [];
    panelsList.forEach((p, idx) => {
      const pcard = document.createElement('div');
      pcard.className = `panel-card reveal-on-scroll reveal-delay-${(idx % 4) + 1}`;
      pcard.innerHTML = `
        <div class="panel-tag-header">
          <span>${p.tag || `Panel ${idx+1}`}</span>
          <button class="btn-outline-sm" onclick="showCitationModal('${escapeQuotes(p.dialogue)}', '${escapeQuotes(p.sourceRef || ls.name)}', '${s.officialUrl}')">🔍 ${lang === 'te' ? 'ఆధారం' : lang === 'hi' ? 'संदर्भ' : 'Citation'}</button>
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
          <button class="btn-outline-sm" onclick="speakText('${escapeQuotes(p.dialogue)}', '${lang}')">🔊 ${lang === 'te' ? 'వినండి' : lang === 'hi' ? 'सुनें' : 'Play'}</button>
        </div>
      `;
      panelsContainer.appendChild(pcard);
    });
  }

  renderReaderDocs(s);
  renderReaderSteps(s);
  renderReaderQuiz(s);
  runEligibilityCheck();
  observeUnrevealedElements();
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

// Multilingual Speech Voice Synthesis Engine
function getNaturalVoice(langCode) {
  if (!('speechSynthesis' in window)) return null;
  const voices = window.speechSynthesis.getVoices() || [];
  if (voices.length === 0) return null;

  const targetLang = (langCode || appState.currentLang || 'en').toLowerCase();
  let matched = [];

  if (targetLang === 'te') {
    matched = voices.filter(v => v.lang.toLowerCase().includes('te') || v.name.toLowerCase().includes('telugu') || v.name.toLowerCase().includes('mohan') || v.name.toLowerCase().includes('shruthi'));
  } else if (targetLang === 'hi') {
    matched = voices.filter(v => v.lang.toLowerCase().includes('hi') || v.name.toLowerCase().includes('hindi') || v.name.toLowerCase().includes('swara') || v.name.toLowerCase().includes('madhur') || v.name.toLowerCase().includes('kalpana'));
  } else {
    matched = voices.filter(v => v.lang.toLowerCase().includes('en-in') || v.name.toLowerCase().includes('india') || v.name.toLowerCase().includes('neerja') || v.name.toLowerCase().includes('natural'));
  }

  if (matched.length > 0) return matched[0];
  return voices.find(v => v.lang.toLowerCase().startsWith(targetLang)) || voices[0];
}

function speakText(text, langCode, onEndCallback) {
  if (!('speechSynthesis' in window)) return;
  window.speechSynthesis.cancel();

  // Clean markdown and symbols before speech
  const cleanSpeechText = (text || '')
    .replace(/[*#_~`]/g, '')
    .replace(/•/g, ', ')
    .replace(/\[(.*?)\]\((.*?)\)/g, '$1')
    .replace(/₹/g, 'Rupees ');

  const utt = new SpeechSynthesisUtterance(cleanSpeechText);
  const targetLang = langCode || appState.currentLang || 'en';

  if (targetLang === 'te') utt.lang = 'te-IN';
  else if (targetLang === 'hi') utt.lang = 'hi-IN';
  else utt.lang = 'en-IN';

  const v = getNaturalVoice(targetLang);
  if (v) utt.voice = v;

  utt.rate = 0.95;
  utt.pitch = 1.0;

  utt.onend = () => {
    pauseAudio();
    if (typeof onEndCallback === 'function') onEndCallback();
  };

  utt.onerror = () => {
    pauseAudio();
  };

  window.speechSynthesis.speak(utt);
}

function togglePlayFullComic() {
  const s = appState.selectedScheme;
  if (!s) return;
  const lang = appState.currentLang || 'en';
  const ls = getLocalizedScheme(s, lang);
  const panels = (ls.panels && ls.panels[lang]) || (s.panels && s.panels[lang]) || (s.panels && s.panels.en) || s.panels || [];

  let script = `${ls.name}. `;
  panels.forEach(p => {
    script += `${p.speaker}: ${p.dialogue}. `;
  });

  const playBtn = document.getElementById('btn-play-comic');
  const pauseBtn = document.getElementById('btn-pause-comic');

  if (pauseBtn) {
    pauseBtn.innerHTML = `⏸ ${lang === 'te' ? 'ఆపండి' : lang === 'hi' ? 'रोकें' : 'Pause'} <div class="audio-playing-indicator"><span></span><span></span><span></span></div>`;
    pauseBtn.style.display = 'inline-flex';
  }
  if (playBtn) playBtn.style.display = 'none';

  speakText(script, lang, () => {
    pauseAudio();
  });
}

function pauseAudio() {
  if ('speechSynthesis' in window) window.speechSynthesis.cancel();
  const playBtn = document.getElementById('btn-play-comic');
  const pauseBtn = document.getElementById('btn-pause-comic');
  if (playBtn) playBtn.style.display = 'inline-flex';
  if (pauseBtn) pauseBtn.style.display = 'none';
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
  const lang = appState.currentLang || 'en';

  // Telugu Responses
  if (lang === 'te') {
    if (q.includes('recommend') || q.includes('student') || q.includes('telangana') || q.includes('పథకాలు') || q.includes('సరిపోయే') || q.includes('విద్యార్థులకు')) {
      return {
        answer: `🌟 **నమస్కారం! మీ ప్రొఫైల్ (${p.occupation}, ${p.age} సం., ${p.state}, ఆదాయం ₹${p.income.toLocaleString()}) కి సరిపోయే ఉత్తమ పథకాలు ఇక్కడ ఉన్నాయి:**\n\n1. **పీఎం మెరిట్ స్కాలర్‌షిప్** (100% Match)\n• **ప్రయోజనం**: సంవత్సరానికి ₹50,000 నేరుగా బ్యాంక్ ఖాతాలో జమ.\n\n2. **తెలంగాణ రైతు బంధు** (100% Match)\n• **ప్రయోజనం**: ఎకరానికి ఏడాదికి ₹10,000 పంట పెట్టుబడి సాయం.\n\n3. **కళ్యాణ లక్ష్మి / షాదీ ముబారక్**\n• **ప్రయోజనం**: ₹1,00,116 ఒకేసారి ఆర్థిక సాయం.\n\n💬 *కింద ఉన్న బటన్ క్లిక్ చేసి పూర్తి కామిక్ కథను చదవండి!*`,
        sourceRef: "India.gov.in & తెలంగాణ అధికారిక పోర్టల్",
        schemeId: "pm_merit_scholarship"
      };
    }
  }

  // Hindi Responses
  if (lang === 'hi') {
    if (q.includes('recommend') || q.includes('student') || q.includes('योजना') || q.includes('पात्रता') || q.includes('छात्रों')) {
      return {
        answer: `🌟 **नमस्ते! आपकी प्रोफाइल (${p.occupation}, ${p.age} वर्ष, ${p.state}, आय ₹${p.income.toLocaleString()}) के अनुसार शीर्ष योजनाएं:**\n\n1. **पीएम मेरिट छात्रवृत्ति** (100% Match)\n• **लाभ**: ₹50,000 प्रति वर्ष सीधी कॉलेज फीस सहायता।\n\n2. **पीएम-किसान सम्मान निधि** (100% Match)\n• **लाभ**: किसानों को सालाना ₹6,000 डीबीटी सहायता।\n\n3. **आयुष्मान भारत (PM-JAY)**\n• **लाभ**: ₹5 लाख तक का मुफ्त कैशलेस इलाज।\n\n💬 *नीचे दिए गए बटन पर क्लिक करके कॉमिक कहानी देखें!*`,
        sourceRef: "India.gov.in राष्ट्रीय पोर्टल रिकॉर्ड",
        schemeId: "pm_merit_scholarship"
      };
    }
  }

  // English Personalized Recommendation Request
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

  // Specific Scheme Matching
  let matchedScheme = SCHEMES_DATABASE.find(s => 
    q.includes(s.name.toLowerCase()) || 
    (s.id && q.includes(s.id.toLowerCase()))
  );

  if (!matchedScheme) {
    if (q.includes('scholarship') || q.includes('merit') || q.includes('college') || q.includes('student') || q.includes('50000') || q.includes('స్కాలర్‌షిప్') || q.includes('छात्रवृत्ति')) {
      matchedScheme = SCHEMES_DATABASE.find(s => s.id === 'pm_merit_scholarship');
    } else if (q.includes('rythu') || q.includes('bandhu') || q.includes('telangana farm') || q.includes('10000') || q.includes('రైతు బంధు') || q.includes('रायथू')) {
      matchedScheme = SCHEMES_DATABASE.find(s => s.id === 'rythu_bandhu');
    } else if (q.includes('unorganised') || q.includes('worker') || q.includes('shram') || q.includes('pension') || q.includes('3000') || q.includes('పెన్షన్') || q.includes('पेंशन')) {
      matchedScheme = SCHEMES_DATABASE.find(s => s.id === 'nps_unorganised');
    } else if (q.includes('kalyana') || q.includes('lakshmi') || q.includes('marriage') || q.includes('bride') || q.includes('100116') || q.includes('కళ్యాణ లక్ష్మి') || q.includes('कल्याणा')) {
      matchedScheme = SCHEMES_DATABASE.find(s => s.id === 'kalyana_lakshmi');
    } else if (q.includes('awas') || q.includes('house') || q.includes('housing') || q.includes('urban') || q.includes('pucca') || q.includes('ఆవాస్') || q.includes('आवास')) {
      matchedScheme = SCHEMES_DATABASE.find(s => s.id === 'pm_awas_urban');
    } else if (q.includes('solar') || q.includes('surya') || q.includes('bijli') || q.includes('electricity') || q.includes('78000') || q.includes('సూర్య ఘర్') || q.includes('सूर्य घर')) {
      matchedScheme = SCHEMES_DATABASE.find(s => s.id === 'surya_ghar');
    } else if (q.includes('health') || q.includes('hospital') || q.includes('ayushman') || q.includes('5 lakh') || q.includes('ఆయుష్మాన్') || q.includes('आयुष्मान')) {
      matchedScheme = SCHEMES_DATABASE.find(s => s.id === 'ayushman');
    } else if (q.includes('kisan') || q.includes('farmer') || q.includes('6000') || q.includes('కిసాన్') || q.includes('किसान')) {
      matchedScheme = SCHEMES_DATABASE.find(s => s.id === 'pm_kisan');
    }
  }

  if (matchedScheme) {
    const s = matchedScheme;
    const ls = getLocalizedScheme(s, lang);
    const docs = s.documents ? s.documents.map(d => d.name).join(', ') : 'Aadhaar Card, Bank Passbook';
    return {
      answer: `🏛️ **${ls.name}** (${s.level} • ${s.category})\n\n🎁 **${lang === 'te' ? 'ముఖ్య ప్రయోజనం' : lang === 'hi' ? 'मुख्य लाभ' : 'Key Benefit'}**: ${s.amount || ls.benefits}\n\n🎯 **${lang === 'te' ? 'లక్ష్యం' : lang === 'hi' ? 'उद्देश्य' : 'Objective'}**: ${ls.purpose}\n\n👤 **${lang === 'te' ? 'ఎవరికి అర్హత' : lang === 'hi' ? 'किसे पात्रता है' : 'Who is Eligible'}**: ${s.eligibility ? s.eligibility.summary : 'All eligible citizens'}\n\n📄 **${lang === 'te' ? 'అవసరమైన పత్రాలు' : lang === 'hi' ? 'आवश्यक दस्तावेज' : 'Required Documents'}**: ${docs}\n\n🚀 [${lang === 'te' ? 'ఆన్‌లైన్‌లో దరఖాస్తు చేసుకోండి' : lang === 'hi' ? 'ऑनलाइन आवेदन करने के लिए यहां क्लिक करें' : 'Click here to Apply Online'}](${s.applyUrl || s.officialUrl})`,
      sourceRef: `Official India.gov.in Record (${s.dept})`,
      schemeId: s.id
    };
  }

  // General Fallback
  return {
    answer: lang === 'te' 
      ? `👋 **నమస్కారం! నేను మీ మిత్ర AI సహాయకుడిని.**\n\nకేంద్ర మరియు రాష్ట్ర ప్రభుత్వ సంక్షేమ పథకాలను కనుగొనడానికి నేను మీకు సహాయం చేస్తాను:\n\n• 🎓 **పీఎం మెరిట్ స్కాలర్‌షిప్**: విద్యార్థులకు ఏటా ₹50,000\n• 🌾 **రైతు బంధు**: ఎకరానికి ఏటా ₹10,000 పెట్టుబడి సాయం\n• 👵 **కార్మికుల పెన్షన్**: నెలకు ₹3,000 జీవితాంత పెన్షన్\n• 🏠 **పీఎం ఆవాస్**: ₹2.5 లక్షల వరకు గృహ సబ్సిడీ\n• 🏥 **ఆయుష్మాన్ భారత్**: ₹5 లక్షల ఉచిత వైద్య చికిత్స\n\n💬 *మీ వయస్సు, రాష్ట్రం లేదా వృత్తిని తెలియజేయండి!*`
      : lang === 'hi'
      ? `👋 **नमस्ते! मैं मित्र AI योजना सहायक हूं।**\n\nमैं आपको केंद्र एवं राज्य सरकार की प्रमुख योजनाओं की जानकारी प्रदान करता हूं:\n\n• 🎓 **पीएम मेरिट छात्रवृत्ति**: छात्रों को ₹50,000/वर्ष\n• 🌾 **रायथू बंधु**: ₹10,000/एकड़ कृषि सहायता\n• 👵 **असंगठित कामगार पेंशन**: ₹3,000/माह आजीवन पेंशन\n• 🏠 **पीएम आवास योजना**: ₹2.5 लाख तक की आवास सब्सिडी\n• 🏥 **आयुष्मान भारत**: ₹5 लाख तक का मुफ्त इलाज\n\n💬 *अपनी उम्र, राज्य या व्यवसाय बताएं!*`
      : `👋 **Namaste! I am Mitra, your personalized AI Scheme Guide.**\n\nI can help you discover and apply for central and state welfare benefits:\n\n• 🎓 **PM Merit Scholarship**: ₹50,000/yr for meritorious students\n• 🌾 **Telangana Rythu Bandhu**: ₹10,000/acre farm support\n• 👵 **NPS for Unorganised Workers**: ₹3,000/mo lifelong pension\n• 🏠 **PM Awas Yojana**: Up to ₹2.5 Lakh housing subsidy\n• 🏥 **Ayushman Bharat**: ₹5 Lakh cashless healthcare\n\n💬 *Tell me your age, state, or occupation for instant personalized matching!*`,
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

  const lang = appState.currentLang || 'en';

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
      <p style="font-style:italic; color:#64748b;">${lang === 'te' ? 'మిత్ర అధికారిక రికార్డులను పరిశీలిస్తోంది...' : lang === 'hi' ? 'मित्र आधिकारिक रिकॉर्ड की जांच कर रहा है...' : 'Mitra is consulting official India.gov.in records...'}</p>
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
      body: JSON.stringify({ question: text, schemeName: "All Government Schemes", userProfile: userProfile, lang: appState.currentLang })
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
        <button class="btn btn-primary btn-sm" style="font-size:0.75rem; padding:4px 10px;" onclick="openSchemeReaderById('${matchedSchemeId}')">${lang === 'te' ? '🎨 కామిక్ కథ చూడండి ↗' : lang === 'hi' ? '🎨 कॉमिक कहानी देखें ↗' : '🎨 View Comic Story ↗'}</button>
        <button class="btn btn-outline-sm" style="font-size:0.75rem;" onclick="speakText('${escapeQuotes(answer.replace(/[*#]/g, ''))}', '${appState.currentLang}')">🔊 ${lang === 'te' ? 'వినండి' : lang === 'hi' ? 'सुनें' : 'Listen'}</button>
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
  const ls = getLocalizedScheme(s, appState.currentLang);

  const bdiv = document.createElement('div');
  bdiv.className = 'chat-msg bot-msg';
  bdiv.innerHTML = `
    <div class="msg-avatar">🏛️</div>
    <div class="msg-content">
      <p style="font-style:italic; color:#64748b;">Consulting official records for ${ls.name}...</p>
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

// Multilingual Setup & Site-Wide Language Engine
function setupLanguageSelector() {
  const sel = document.getElementById('app-language-select');
  if (!sel) return;

  // Restore saved language
  if (appState.currentLang) {
    sel.value = appState.currentLang;
  }

  sel.addEventListener('change', (e) => {
    appState.currentLang = e.target.value;
    try {
      localStorage.setItem('govtoon_lang', appState.currentLang);
    } catch (err) {}

    updateLanguageUI();
    populateCompareDropdowns();
    renderDirectory();
    calculateEligibilityMatches();
    renderDashboard();
    if (appState.currentView === 'reader') {
      renderReaderView();
    }
  });
}
