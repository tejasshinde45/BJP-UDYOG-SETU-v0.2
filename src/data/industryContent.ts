import type { Language } from '../types';

export type Localized = Record<Language, string>;

export const text = (mr: string, hi: string, en: string): Localized => ({ mr, hi, en });

export const OFFICIAL_SOURCES = {
  midc: { label: text('एमआयडीसी संकेतस्थळ', 'एमआईडीसी वेबसाइट', 'MIDC website'), href: 'https://midc.maharashtra.gov.in/en/' },
  investorHub: { label: text('गुंतवणूकदार विभाग', 'निवेशक अनुभाग', 'Investor Hub'), href: 'https://midc.maharashtra.gov.in/en/investors/' },
  guide: { label: text('गुंतवणूक मार्गदर्शक व भूखंड प्रक्रिया', 'निवेश मार्गदर्शिका और भूखंड प्रक्रिया', 'Investor guide and plot process'), href: 'https://midc.maharashtra.gov.in/en/investors/guide-to-investing/' },
  policies: { label: text('औद्योगिक धोरणे व प्रोत्साहने', 'औद्योगिक नीतियां और प्रोत्साहन', 'Industrial policies and incentives'), href: 'https://midc.maharashtra.gov.in/en/investors/industrial-policies-and-incentives/' },
  infrastructure: { label: text('पायाभूत सुविधा व संसाधने', 'बुनियादी ढांचा और संसाधन', 'Infrastructure and resources'), href: 'https://midc.maharashtra.gov.in/en/investors/infrastructure-resources/' },
  informationEnablers: { label: text('व्यवसाय सुलभता, कायदे व परिपत्रके', 'व्यवसाय सुगमता, कानून और परिपत्र', 'Ease of doing business, acts and circulars'), href: 'https://midc.maharashtra.gov.in/en/information-enablers/' },
  rts: { label: text('महाराष्ट्र लोकसेवा हक्क सेवा', 'महाराष्ट्र लोक सेवा अधिकार सेवाएं', 'Maharashtra Right to Public Services'), href: 'https://midc.maharashtra.gov.in/en/rts/' },
  notices: { label: text('एमआयडीसी सूचना व अद्यतने', 'एमआईडीसी सूचनाएं और अपडेट', 'MIDC notices and updates'), href: 'https://midc.maharashtra.gov.in/en/important-notice/' },
  gis: { label: text('एमआयडीसी औद्योगिक क्षेत्र GIS नकाशा', 'एमआईडीसी औद्योगिक क्षेत्र GIS मानचित्र', 'MIDC industrial area GIS map'), href: 'https://gis.midcindia.org/MIDCGISPortal/' },
  aboutMidc: { label: text('एमआयडीसी व औद्योगिक क्षेत्रे', 'एमआईडीसी और औद्योगिक क्षेत्र', 'MIDC and industrial regions'), href: 'https://midc.maharashtra.gov.in/en/about-midc/' },
  faq: { label: text('एमआयडीसी वारंवार विचारले जाणारे प्रश्न', 'एमआईडीसी के अक्सर पूछे जाने वाले प्रश्न', 'MIDC FAQs'), href: 'https://midc.maharashtra.gov.in/en/faqs/' },
  landBank: { label: text('एमआयडीसी लँड बँक', 'एमआईडीसी लैंड बैंक', 'MIDC Land Bank'), href: 'https://midc.maharashtra.gov.in/land-bank' },
  udyam: { label: text('उद्यम नोंदणी (Udyam)', 'उद्यम पंजीकरण (Udyam)', 'Udyam Registration'), href: 'https://udyamregistration.gov.in/' },
  shopAct: { label: text('महाराष्ट्र कामगार विभाग सेवा (Shop Act)', 'महाराष्ट्र श्रम विभाग सेवाएं (Shop Act)', 'Maharashtra Labour Department services (Shop Act)'), href: 'https://labour.maharashtra.gov.in/en/labour-rts-services' },
  gst: { label: text('जीएसटी पोर्टल (GSTN)', 'जीएसटी पोर्टल (GSTN)', 'GST portal (GSTN)'), href: 'https://www.gst.gov.in/' },
  mpcb: { label: text('महाराष्ट्र प्रदूषण नियंत्रण मंडळ (MPCB)', 'महाराष्ट्र प्रदूषण नियंत्रण मंडल (MPCB)', 'Maharashtra Pollution Control Board (MPCB)'), href: 'https://www.mpcb.gov.in/' },
  fssai: { label: text('अन्न परवाना व नोंदणी (FoSCoS - FSSAI)', 'खाद्य लाइसेंस और पंजीकरण (FoSCoS - FSSAI)', 'Food licence and registration (FoSCoS - FSSAI)'), href: 'https://foscos.fssai.gov.in/' },
  maitri: { label: text('महाराष्ट्र MAITRI 2.0 एकखिडकी पोर्टल', 'महाराष्ट्र MAITRI 2.0 सिंगल-विंडो पोर्टल', 'Maharashtra MAITRI 2.0 single-window portal'), href: 'https://maitri.maharashtra.gov.in/' },
  aapleSarkar: { label: text('आपले सरकार सेवा पोर्टल', 'आपले सरकार सेवा पोर्टल', 'Aaple Sarkar services portal'), href: 'https://aaplesarkar.mahaonline.gov.in/' },
  gem: { label: text('GeM सरकारी ई-बाजार', 'GeM सरकारी ई-बाज़ार', 'GeM Government e-Marketplace'), href: 'https://gem.gov.in/' },
  tenders: { label: text('केंद्रीय ई-खरेदी पोर्टल (CPPP)', 'केंद्रीय ई-खरीद पोर्टल (CPPP)', 'Central Public Procurement Portal (CPPP)'), href: 'https://eprocure.gov.in/eprocure/app' },
  mahaTenders: { label: text('महाराष्ट्र शासकीय ई-निविदा पोर्टल', 'महाराष्ट्र सरकारी ई-निविदा पोर्टल', 'Maharashtra Government e-Tenders Portal'), href: 'https://mahatenders.gov.in/' },
  msmeGov: { label: text('केंद्रीय एमएसएमई मंत्रालय', 'केंद्रीय एमएसएमई मंत्रालय', 'Ministry of MSME, Govt. of India'), href: 'https://msme.gov.in/' },
  diGov: { label: text('उद्योग संचालनालय, महाराष्ट्र', 'उद्योग निदेशालय, महाराष्ट्र', 'Directorate of Industries, Maharashtra'), href: 'https://di.maharashtra.gov.in/' },
} as const;

// -------------------------------------------------------------
// MODULE 1: UDYOG SAARTHI DATA
// -------------------------------------------------------------

export interface JourneyStep {
  id: string;
  stepNumber: number;
  title: Localized;
  subtitle: Localized;
  description: Localized;
  iconName: string;
  targetId: string;
}

export const INDUSTRIAL_JOURNEY_STEPS: JourneyStep[] = [
  {
    id: 'step-idea',
    stepNumber: 1,
    title: text('व्यवसाय संकल्पना', 'व्यवसाय संकल्पना', 'Business Idea'),
    subtitle: text('प्रकल्प आखणी व बाजारपेठ अंदाज', 'परियोजना योजना और बाजार अनुमान', 'Project planning & market evaluation'),
    description: text('उत्पादन किंवा सेवा निश्चिती, प्रकल्प खर्च अंदाज आणि उद्योग क्षेत्राची निवड करा.', 'उत्पाद या सेवा का चयन, परियोजना लागत का अनुमान और उद्योग क्षेत्र तय करें।', 'Define product/service, estimate project costs and identify industry sector.'),
    iconName: 'Lightbulb',
    targetId: 'investment',
  },
  {
    id: 'step-registration',
    stepNumber: 2,
    title: text('उद्योग नोंदणी', 'उद्योग पंजीकरण', 'Business Registration'),
    subtitle: text('उद्यम व संस्था नोंदणी', 'उद्यम और संस्था पंजीकरण', 'Udyam and entity formation'),
    description: text('उद्यम नोंदणी, शॉप ॲक्ट, भागीदारी/कंपनी इनकॉर्पोरेशन आणि पॅन/टॅन मिळवा.', 'उद्यम पंजीकरण, शॉप एक्ट, फर्म/कंपनी पंजीकरण और पैन/टैन प्राप्त करें।', 'Obtain Udyam MSME certificate, Shop Act licence, firm/company incorporation and PAN/TAN.'),
    iconName: 'FileCheck2',
    targetId: 'licences',
  },
  {
    id: 'step-location',
    stepNumber: 3,
    title: text('औद्योगिक जागा', 'औद्योगिक स्थान', 'Industrial Location'),
    subtitle: text('MIDC भूखंड व लँड बँक', 'एमआईडीसी भूखंड और लैंड बैंक', 'MIDC plot & land bank'),
    description: text('MIDC लँड बँक, GIS नकाशा, थेट वाटप किंवा ई-लिलाव प्रक्रियेद्वारे जागा निवडा.', 'एमआईडीसी लैंड बैंक, जीआईएस मानचित्र, प्रत्यक्ष आवंटन या ई-नीलामी से भूमि चुनें।', 'Choose an industrial plot via MIDC Land Bank, GIS maps, direct allotment or e-bidding.'),
    iconName: 'MapPin',
    targetId: 'land',
  },
  {
    id: 'step-approvals',
    stepNumber: 4,
    title: text('परवाने व मंजुरी', 'लाइसेंस और स्वीकृतियां', 'Licences & Approvals'),
    subtitle: text('MPCB, अग्निशमन व परवानग्या', 'एमपीसीबी, अग्निशमन और स्वीकृतियां', 'MPCB, fire & statutory clearances'),
    description: text('MPCB Consent to Establish, बांधकाम नकाशा मंजुरी, FSSAI आणि अग्निशामक ना-हरकत घ्या.', 'एमपीसीबी स्थापना सहमति, भवन योजना स्वीकृति, एफएसएसएआई और अग्नि सुरक्षा एनओसी लें।', 'Secure MPCB Consent to Establish, building plan sanction, FSSAI licence and fire NOC.'),
    iconName: 'ShieldCheck',
    targetId: 'licences',
  },
  {
    id: 'step-infrastructure',
    stepNumber: 5,
    title: text('पायाभूत सुविधा', 'बुनियादी ढांचा', 'Infrastructure'),
    subtitle: text('वीज, पाणी व रस्ते जोडणी', 'बिजली, पानी और सड़क कनेक्शन', 'Power, water & road utilities'),
    description: text('महावितरण वीज जोडणी, MIDC पाणी पुरवठा, ड्रेनेज, गॅस वाहिनी व लॉजिस्टिक सुविधा मिळवा.', 'बिजली कनेक्शन, एमआईडीसी जल आपूर्ति, जल निकासी, गैस लाइन और लॉजिस्टिक प्राप्त करें।', 'Connect electricity (MSEDCL), industrial bulk water, effluent drainage, gas and road access.'),
    iconName: 'Zap',
    targetId: 'infrastructure',
  },
  {
    id: 'step-operations',
    stepNumber: 6,
    title: text('उत्पादन सुरूवात', 'उत्पादन शुरुआत', 'Start Operations'),
    subtitle: text('चाचणी व प्रत्यक्ष उत्पादन', 'परीक्षण और वाणिज्यिक उत्पादन', 'Trial runs & commercial production'),
    description: text('यंत्रसामग्री स्थापना, कामगार नियुक्ती, Consent to Operate आणि प्रत्यक्ष उत्पादन सुरू करा.', 'मशीनरी स्थापना, कार्यबल नियुक्ति, संचालन सहमति और वाणिज्यिक उत्पादन शुरू करें।', 'Install machinery, recruit workforce, obtain Consent to Operate and launch operations.'),
    iconName: 'PlayCircle',
    targetId: 'services',
  },
  {
    id: 'step-expansion',
    stepNumber: 7,
    title: text('उद्योग विस्तार', 'उद्योग विस्तार', 'Business Expansion'),
    subtitle: text('क्षमता वाढ व आधुनिकीकरण', 'क्षमता विस्तार और आधुनिकीकरण', 'Capacity growth & modernisation'),
    description: text('नवीन तंत्रज्ञान स्वीकार, भांडवली विस्तार, निर्यात प्रोत्साहन आणि शासकीय धोरणांचा लाभ घ्या.', 'नई तकनीक अपनाना, पूंजी विस्तार, निर्यात प्रोत्साहन और सरकारी नीतियों का लाभ उठाएं।', 'Upgrade technology, expand capacity, access export promotion and apply for scheme incentives.'),
    iconName: 'TrendingUp',
    targetId: 'expansion',
  },
];

export const TWO_PATHWAYS_DATA = {
  new: {
    badge: text('प्रारंभिक टप्पा', 'प्रारंभिक चरण', 'Startup Stage'),
    title: text('नवीन उद्योग सुरू करत आहात?', 'नया व्यवसाय शुरू कर रहे हैं?', 'Starting a new business?'),
    description: text(
      'उद्योग स्थापन करण्यासाठी आवश्यक नोंदणी, परवाने, जागा, गुंतवणूक आणि पायाभूत सुविधांची माहिती मिळवा.',
      'उद्योग स्थापित करने के लिए आवश्यक पंजीकरण, लाइसेंस, स्थान, निवेश और बुनियादी सुविधाओं की जानकारी पाएं।',
      'Guidance on registrations, statutory licences, industrial plots, investment planning and essential utilities for new enterprises.'
    ),
    checkpoints: [
      text('उद्यम (Udyam) व शॉप ॲक्ट नोंदणी', 'उद्यम और शॉप एक्ट पंजीकरण', 'Udyam and Shop Act registrations'),
      text('MIDC लँड बँक व भूखंड वाटप प्रक्रिया', 'एमआईडीसी लैंड बैंक और भूखंड आवंटन प्रक्रिया', 'MIDC Land Bank & plot allotment route'),
      text('MAITRI 2.0 द्वारे पूर्वपरवानगी अर्ज', 'MAITRI 2.0 द्वारा पूर्व-अनुमति आवेदन', 'Pre-establishment clearances on MAITRI 2.0'),
      text('MPCB Consent to Establish (CTE) संमती', 'एमपीसीबी स्थापना सहमति (CTE)', 'MPCB Consent to Establish (CTE)'),
      text('पायाभूत सुविधा (वीज, पाणी) जोडणी अर्ज', 'बुनियादी सुविधाएं (बिजली, पानी) कनेक्शन आवेदन', 'Utility connections for power, water and drainage'),
    ],
  },
  existing: {
    badge: text('विकास व विस्तार', 'विकास एवं विस्तार', 'Growth & Expansion'),
    title: text('विद्यमान उद्योग चालवत आहात?', 'कार्यरत व्यवसाय चला रहे हैं?', 'Running an existing business?'),
    description: text(
      'उद्योग विस्तार, आधुनिकीकरण, अनुपालन, पायाभूत सुविधा आणि शासकीय सेवांशी संबंधित मार्गदर्शन मिळवा.',
      'उद्योग विस्तार, आधुनिकीकरण, अनुपालन, बुनियादी ढांचे और सरकारी सेवाओं से संबंधित मार्गदर्शन प्राप्त करें।',
      'Guidance on capacity expansion, technology modernisation, regulatory renewals, utility upgrades and official grievance channels.'
    ),
    checkpoints: [
      text('विस्तार प्रकल्पासाठी अतिरिक्त भूखंड किंवा FSI', 'विस्तार परियोजना के लिए अतिरिक्त भूखंड या FSI', 'Additional land or enhanced FSI for expansion'),
      text('महाराष्ट्र उद्योग धोरण २०२५ अंतर्गत प्रोत्साहन योजना', 'महाराष्ट्र उद्योग नीति 2025 के तहत प्रोत्साहन योजनाएं', 'Incentive schemes under Maharashtra Industry Policy 2025'),
      text('Consent to Operate (CTO) चे वेळेवर नूतनीकरण', 'संचालन सहमति (CTO) का समय पर नवीनीकरण', 'Timely renewal of Consent to Operate (CTO)'),
      text('हरित ऊर्जा व पर्यावरणपूरक तंत्रज्ञान स्वीकार', 'हरित ऊर्जा और पर्यावरण अनुकूल तकनीक अपनाना', 'Adoption of green energy and eco-friendly tech'),
      text('औद्योगिक सेवा व तक्रारींसाठी अधिकृत पाठपुरावा', 'औद्योगिक सेवाओं और शिकायतों के लिए आधिकारिक अनुवर्ती', 'Official follow-up for industrial utilities and issues'),
    ],
  },
};

export const UDYOG_TOPICS = [
  {
    id: 'licences',
    title: text('परवाने व नोंदणी', 'लाइसेंस और पंजीकरण', 'Licences and registrations'),
    subtitle: text('उद्यम, शॉप ॲक्ट, जीएसटी व प्रदूषण संमती', 'उद्यम, शॉप एक्ट, जीएसटी और प्रदूषण सहमति', 'Udyam, Shop Act, GST & MPCB consent'),
    description: text(
      'व्यवसायाच्या प्रकारानुसार लागू असलेल्या वैधानिक नोंदण्या, प्रदूषण संमती आणि अन्न परवान्यांचे अधिकृत स्रोत शोधा.',
      'व्यवसाय के प्रकार के अनुसार लागू वैधानिक पंजीकरण, प्रदूषण सहमति और खाद्य लाइसेंस के आधिकारिक स्रोत देखें।',
      'Find official registration, pollution consent, tax and licensing channels that apply to your business type.'
    ),
    audience: text('नवीन उद्योग, उत्पादन कारखाने, सेवा व्यवसाय आणि नोंदणी नूतनीकरण करणारे उद्योजक.', 'नए उद्योग, विनिर्माण इकाइयां, सेवा व्यवसाय और पंजीकरण नवीनीकरण करने वाले उद्यमी।', 'New manufacturing units, service enterprises, startups and businesses seeking renewals.'),
    documents: text('पॅन कार्ड, आधार, पत्त्याचा पुरावा, बँक खाते, भागीदारी करार किंवा कंपनी इनकॉर्पोरेशन, जागेचा करारनामा.', 'पैन कार्ड, आधार, पते का प्रमाण, बैंक खाता, साझेदारी विलेख या कंपनी निगमन, स्थान का अनुबंध।', 'PAN, Aadhaar, address proof, bank account statement, partnership deed / MOA-AOA, rent/lease deed.'),
    subItems: [
      { name: 'उद्यम नोंदणी (Udyam)', note: text('केंद्रीय MSME प्रमाणपत्र', 'केंद्रीय एमएसएमई प्रमाणन', 'National MSME registration'), source: OFFICIAL_SOURCES.udyam },
      { name: 'गुमास्ता परवाना (Shop Act)', note: text('कामगार विभाग नोंदणी', 'श्रम विभाग पंजीकरण', 'Labour department trade licence'), source: OFFICIAL_SOURCES.shopAct },
      { name: 'वस्तू व सेवा कर (GST)', note: text('कर नोंदणी व जीएसटीएन', 'कर पंजीकरण और जीएसटीएन', 'Tax registration via GSTN portal'), source: OFFICIAL_SOURCES.gst },
      { name: 'प्रदूषण नियंत्रण (MPCB)', note: text('Consent to Establish / Operate', 'स्थापना/संचालन सहमति', 'CTE / CTO pollution consent'), source: OFFICIAL_SOURCES.mpcb },
      { name: 'अन्न परवाना (FSSAI)', note: text('FoSCoS नोंदणी', 'खाद्य सुरक्षा पंजीकरण', 'Food licence via FoSCoS portal'), source: OFFICIAL_SOURCES.fssai },
      { name: 'MAITRI 2.0 सिंगल विंडो', note: text('एकात्मिक सेवा पोर्टल', 'एकीकृत सेवा पोर्टल', 'Single-window clearances'), source: OFFICIAL_SOURCES.maitri },
    ],
    steps: [
      text('व्यवसायाचा प्रकार (उत्पादन किंवा सेवा) व अपेक्षित उलाढाल ठरवा.', 'व्यवसाय का प्रकार (उत्पादन या सेवा) और अपेक्षित कारोबार तय करें।', 'Determine enterprise category (manufacturing or service) and turnover.'),
      text('उद्यम नोंदणी पोर्टलवर मोफत ऑनलाइन अर्ज करून Udyam ID मिळवा.', 'उद्यम पंजीकरण पोर्टल पर निःशुल्क ऑनलाइन आवेदन कर Udyam ID पाएं।', 'Register on the Udyam portal to obtain your unique MSME certificate.'),
      text('कामगार संख्या व व्यावसायिक ठिकाणानुसार शॉप ॲक्ट किंवा कारखाना परवाना घ्या.', 'कर्मचारियों की संख्या और स्थान के अनुसार शॉप एक्ट या कारखाना लाइसेंस लें।', 'Apply for Shop Act or Factory Licence depending on workforce size and location.'),
      text('उत्पादन सुरू करण्यापूर्वी MPCB कडून Consent to Establish (CTE) मिळवा.', 'उत्पादन शुरू करने से पहले एमपीसीबी से Consent to Establish (CTE) प्राप्त करें।', 'Secure MPCB Consent to Establish prior to installing plant & machinery.'),
    ],
    related: [text('एकखिडकी MAITRI', 'सिंगल विंडो MAITRI', 'MAITRI Single Window'), text('कामगार कल्याण', 'श्रम कल्याण', 'Labour Welfare')],
    sources: [OFFICIAL_SOURCES.udyam, OFFICIAL_SOURCES.shopAct, OFFICIAL_SOURCES.gst, OFFICIAL_SOURCES.mpcb, OFFICIAL_SOURCES.fssai, OFFICIAL_SOURCES.maitri],
  },
  {
    id: 'land',
    title: text('औद्योगिक जागा व भूखंड', 'औद्योगिक स्थान और भूखंड', 'Industrial land and plots'),
    subtitle: text('MIDC लँड बँक, जीआयएस नकाशा व वाटप पद्धत', 'एमआईडीसी लैंड बैंक, जीआईएस नक्शा और आवंटन प्रक्रिया', 'MIDC land bank, GIS mapping & allotment routes'),
    description: text(
      'औद्योगिक क्षेत्र, लँड बँक, भूखंड उपलब्धता, थेट वाटप किंवा ई-लिलाव अर्ज पद्धतीसाठी अधिकृत एमआयडीसी स्रोत पाहा.',
      'औद्योगिक क्षेत्र, लैंड बैंक, भूखंड उपलब्धता, प्रत्यक्ष आवंटन या ई-नीलामी आवेदन प्रक्रिया के लिए एमआईडीसी स्रोत देखें।',
      'Explore official MIDC sources for industrial parks, vacant land inventory, plot classification and allotment policies.'
    ),
    audience: text('नवीन प्रकल्प सुरू करू पाहणारे उद्योजक, कारखाने आणि विस्तारासाठी जागा शोधणारे व्यवसाय.', 'नई परियोजना शुरू करने वाले उद्यमी, कारखाने और विस्तार के लिए भूमि चाहने वाले व्यवसाय।', 'Entrepreneurs planning new projects and operating industries seeking expansion plots.'),
    documents: text('सविस्तर प्रकल्प अहवाल (DPR), कंपनी रचना (Partnership/Pvt Ltd), ब्लॉक प्लॅन, निधी पुरावा, बँक स्टेटमेंट.', 'विस्तृत परियोजना रिपोर्ट (DPR), कंपनी संरचना, ब्लॉक प्लान, वित्त प्रमाण, बैंक स्टेटमेंट।', 'Detailed Project Report (DPR), entity constitution, block/layout plan, proof of funds, bank solvency.'),
    subItems: [
      { name: 'MIDC लँड बँक पोर्टल', note: text('रिक्त भूखंड सूची', 'रिक्त भूखंड सूची', 'Vacant industrial land listings'), source: OFFICIAL_SOURCES.landBank },
      { name: 'GIS औद्योगिक नकाशा', note: text('भौगोलिक पाहणी व नकाशा', 'भौगोलिक स्थिति और नक्शा', 'Interactive spatial GIS map'), source: OFFICIAL_SOURCES.gis },
      { name: 'थेट भूखंड वाटप (MILAAP)', note: text('विहित धोरणानुसार वाटप', 'नीतिगत सीधा आवंटन', 'Direct allotment policy'), source: OFFICIAL_SOURCES.policies },
      { name: 'ई-लिलाव (E-Bidding)', note: text('ऑनलाइन स्पर्धात्मक बोली', 'ऑनलाइन प्रतिस्पर्धी बोली', 'Competitive online bidding'), source: OFFICIAL_SOURCES.guide },
    ],
    steps: [
      text('MIDC Land Bank व GIS पोर्टलवरून उपलब्ध औद्योगिक क्षेत्र व भूखंड क्रमांक तपासा.', 'एमआईडीसी लैंड बैंक और जीआईएस पोर्टल से उपलब्ध क्षेत्र और भूखंड संख्या जांचें।', 'Inspect vacant industrial plots and zoning on the MIDC Land Bank and GIS map.'),
      text('भूखंड वाटपाचा लागू मार्ग (थेट वाटप किंवा ई-लिलाव) व अटी तपासा.', 'आवंटन का लागू मार्ग (प्रत्यक्ष आवंटन या ई-नीलामी) और शर्तें देखें।', 'Verify the applicable allotment channel: MILAAP Direct Allotment or E-Bidding.'),
      text('DPR, ब्लॉक प्लॅन आणि आर्थिक क्षमतेच्या पुराव्यासह अधिकृत MIDC सिंगल विंडोवर अर्ज करा.', 'डीपीआर, ब्लॉक प्लान और वित्तीय प्रमाण के साथ आधिकारिक एमआईडीसी पोर्टल पर आवेदन करें।', 'Submit the plot application along with DPR, block plan and solvency proof.'),
      text('वाटप पत्र (Allotment Letter) मिळाल्यानंतर विहित मुदतीत रक्कम भरा व ताबा घ्या.', 'आवंटन पत्र मिलने के बाद निर्धारित समय में राशि जमा कर कब्जा प्राप्त करें।', 'Deposit the premium within the stipulated timeline to execute lease deed and take possession.'),
    ],
    related: [text('MILAAP २०२५ धोरण', 'MILAAP 2025 नीति', 'MILAAP 2025 Policy'), text('प्लॉट किंमत धोरण', 'प्लॉट मूल्य नीति', 'Pricing Policy')],
    sources: [OFFICIAL_SOURCES.landBank, OFFICIAL_SOURCES.gis, OFFICIAL_SOURCES.guide, OFFICIAL_SOURCES.policies, OFFICIAL_SOURCES.faq],
  },
  {
    id: 'investment',
    title: text('गुंतवणूक मार्गदर्शन', 'निवेश मार्गदर्शिका', 'Investment guidance'),
    subtitle: text('प्रकल्प आखणी, उद्योग क्षेत्रे व गुंतवणूक सहाय्य', 'परियोजना योजना, फोकस क्षेत्र और निवेशक सहायता', 'Project planning, focus sectors & investor facilitation'),
    description: text(
      'प्रकल्पाची प्राथमिक आखणी, योग्य औद्योगिक क्षेत्र, १२ मुख्य उद्योग क्षेत्रे आणि गुंतवणूकदार सहाय्याचे अधिकृत दुवे एकत्र पाहा.',
      'परियोजना की योजना, उपयुक्त औद्योगिक क्षेत्र, 12 फोकस क्षेत्र और निवेशक सहायता के आधिकारिक लिंक देखें।',
      'Structured planning guidance, capital structuring parameters and official investor facilitation tools.'
    ),
    audience: text('नवीन प्रकल्प संकल्पना तपासत असलेले उद्योजक, तंत्रज्ञान स्टार्टअप्स आणि गुंतवणूकदार.', 'नई परियोजना संकल्पना बना रहे उद्यमी, तकनीकी स्टार्टअप और निवेशक।', 'Industrial investors, manufacturers, technology founders and expansion planners.'),
    documents: text('प्राथमिक प्रकल्प रूपरेषा, भांडवली खर्च अंदाज, अपेक्षित रोजगार, वित्तपुरवठा योजना.', 'प्रारंभिक परियोजना रूपरेखा, पूंजीगत व्यय अनुमान, अपेक्षित रोजगार, वित्तपोषण योजना।', 'Project concept note, estimated capital outlay, expected direct employment, financing model.'),
    subItems: [
      { name: 'MIDC Investor Hub', note: text('गुंतवणूकदार सहाय्य कक्ष', 'निवेशक सहायता केंद्र', 'Official investor desk'), source: OFFICIAL_SOURCES.investorHub },
      { name: 'Guide to Investing', note: text('गुंतवणूकदार मार्गदर्शक', 'निवेश मार्गदर्शिका', 'Step-by-step investor guide'), source: OFFICIAL_SOURCES.guide },
      { name: '१२ फोकस सेक्टर्स', note: text('थ्रस्ट औद्योगिक क्षेत्रे', 'प्राथमिकता उद्योग क्षेत्र', 'Key industrial sectors'), source: OFFICIAL_SOURCES.investorHub },
    ],
    steps: [
      text('उत्पादन क्षमता, तंत्रज्ञान, कच्चा माल आणि बाजारपेठेचे गृहितक स्पष्ट करा.', 'उत्पादन क्षमता, तकनीक, कच्चा माल और बाजार मान्यताएं स्पष्ट करें।', 'Define production capacity, technical process, raw materials and market demand.'),
      text('जमीन, इमारत, यंत्रसामग्री व खेळत्या भांडवलाचा (Working Capital) अंदाज तयार करा.', 'भूमि, भवन, मशीनरी और कार्यशील पूंजी का विस्तृत अनुमान बनाएं।', 'Structure the project budget across land, civil works, machinery and working capital.'),
      text('MIDC Investor Hub आणि संबंधित उद्योग संचालनालय विभागाशी प्राथमिक चर्चा करा.', 'एमआईडीसी निवेशक हब और उद्योग निदेशालय से प्रारंभिक परामर्श लें।', 'Consult the MIDC Investor Hub or District Industries Centre (DIC) for guidance.'),
    ],
    related: [text('औद्योगिक धोरणे', 'औद्योगिक नीतियां', 'Industrial Policies'), text('थ्रस्ट सेक्टर्स', 'थ्रस्ट सेक्टर', 'Thrust Sectors')],
    sources: [OFFICIAL_SOURCES.investorHub, OFFICIAL_SOURCES.guide, OFFICIAL_SOURCES.policies],
  },
  {
    id: 'infrastructure',
    title: text('औद्योगिक पायाभूत सुविधा', 'औद्योगिक बुनियादी ढांचा', 'Industrial infrastructure'),
    subtitle: text('वीज, पाणी, नैसर्गिक वायू, रस्ते व प्लग-अँड-प्ले', 'बिजली, पानी, प्राकृतिक गैस, सड़कें और प्लग-एंड-प्ले', 'Power, water, gas, connectivity & plug-and-play'),
    description: text(
      'जागेनुसार पाणी पुरवठा, अखंड वीज, रस्ते, सांडपाणी प्रक्रिया (CETP), नैसर्गिक वायू, अग्निसुरक्षा आणि कौशल्य संसाधने तपासा.',
      'स्थान के अनुसार जल आपूर्ति, निर्बाध बिजली, सड़क, सीईटीपी, प्राकृतिक गैस, अग्नि सुरक्षा और कौशल संसाधन देखें।',
      'Check location-specific availability of industrial utilities: bulk water, high-tension power, gas, CETPs and fire services.'
    ),
    audience: text('नवीन युनिट, स्थलांतर किंवा उत्पादन क्षमता वाढीचे नियोजन करणारे औद्योगिक ग्राहक.', 'नई इकाई, स्थानांतरण या क्षमता विस्तार की योजना बना रहे औद्योगिक उपभोक्ता।', 'Industrial manufacturers, plant engineers and technical facility managers.'),
    documents: text('कनेक्शन अर्ज, जागेचा मालकी पुरावा, वीज भार (Connected Load) अंदाज, पाणी वापर दररोज (KL/day).', 'कनेक्शन आवेदन, स्थान का स्वामित्व प्रमाण, बिजली भार (KW/KVA) मांग, जल खपत (KL/day)।', 'Utility application forms, plot lease deed, sanctioned load demand, estimated water volume.'),
    subItems: [
      { name: 'पायाभूत सुविधा कक्ष', note: text('MIDC रिसोर्सेस', 'एमआईडीसी संसाधन', 'Infrastructure resources'), source: OFFICIAL_SOURCES.infrastructure },
      { name: 'प्लॅग-अँड-प्ले युनिट्स', note: text('तयार शेड्स व सुविधा', 'तैयार शेड्स और सुविधाएं', 'Ready-built industrial sheds'), source: OFFICIAL_SOURCES.infrastructure },
      { name: 'सांडपाणी प्रक्रिया (CETP)', note: text('पर्यावरण पूरक व्यवस्था', 'सीईटीपी सुविधाएं', 'Effluent treatment networks'), source: OFFICIAL_SOURCES.mpcb },
    ],
    steps: [
      text('निवडलेल्या औद्योगिक वसाहतीतील उपलब्ध वीज उपकेंद्र व पाणी वाहिनी क्षमता तपासा.', 'औद्योगिक क्षेत्र के बिजली सबस्टेशन और पानी पाइपलाइन क्षमता की जांच करें।', 'Verify substation capacity and pipeline infrastructure in the selected zone.'),
      text('MIDC जल पुरवठा विभागाकडे नियमित औद्योगिक पाणी जोडणीचा अर्ज करा.', 'एमआईडीसी जल आपूर्ति विभाग को नियमित औद्योगिक पानी कनेक्शन का आवेदन करें।', 'Apply for bulk industrial water connection with MIDC water supply engineers.'),
      text('महावितरण / वीज वितरण कंपनीकडे औद्योगिक वीज भार (HT/LT) मंजूर करून घ्या.', 'महावितरण/बिजली कंपनी से औद्योगिक बिजली लोड (HT/LT) स्वीकृत कराएं।', 'Submit high-tension (HT) or low-tension (LT) load sanction application.'),
    ],
    related: [text('पर्यावरण व्यवस्थापन', 'पर्यावरण प्रबंधन', 'Environmental Services'), text('अग्निसुरक्षा प्रणाली', 'अग्नि सुरक्षा प्रणाली', 'Fire Systems')],
    sources: [OFFICIAL_SOURCES.infrastructure, OFFICIAL_SOURCES.aboutMidc, OFFICIAL_SOURCES.maitri],
  },
  {
    id: 'expansion',
    title: text('उद्योग विस्तार व आधुनिकीकरण', 'उद्योग विस्तार और आधुनिकीकरण', 'Business expansion and modernisation'),
    subtitle: text('क्षमता वाढ, अतिरिक्त FSI, तंत्रज्ञान व हरित प्रकल्प', 'क्षमता वृद्धि, अतिरिक्त FSI, तकनीक और हरित परियोजनाएं', 'Capacity scaling, additional FSI, green tech & automation'),
    description: text(
      'विद्यमान उद्योगाची क्षमता वाढ, अतिरिक्त भूखंड किंवा FSI मंजुरी, आधुनिक तंत्रज्ञान स्वीकार आणि प्रोत्साहन धोरणे तपासा.',
      'मौजूदा उद्योग की क्षमता विस्तार, अतिरिक्त भूमि या एफएसआई स्वीकृति, आधुनिक तकनीक और प्रोत्साहन नीतियां देखें।',
      'Statutory pathways and policy benefits for capacity enhancement, floor-space index (FSI) expansion and factory modernisation.'
    ),
    audience: text('कार्यरत उत्पादक, MSME कारखाने आणि आधुनिकीकरणाचे नियोजन करणारे उद्योग.', 'कार्यरत निर्माता, एमएसएमई इकाइयां और आधुनिकीकरण की योजना बना रहे उद्योग।', 'Operating manufacturing units, established MSMEs and exporters planning modernization.'),
    documents: text('विद्यमान भूखंड भाडेपट्टा, चालू C.T.O., विस्तार प्रकल्प अहवाल (DPR), सीए प्रमाणित विद्यमान गुंतवणूक विवरण.', 'मौजूदा पट्टा विलेख, चालू सीटीओ, विस्तार परियोजना रिपोर्ट (DPR), सीए प्रमाणित वर्तमान निवेश विवरण।', 'Existing plot lease deed, active CTO, expansion DPR, CA certificate of gross block investment.'),
    subItems: [
      { name: 'औद्योगिक धोरण २०२५', note: text('विस्तार प्रोत्साहन', 'विस्तार प्रोत्साहन', 'Expansion incentives'), source: OFFICIAL_SOURCES.policies },
      { name: 'अतिरिक्त FSI नियम', note: text('विकास नियंत्रण नियम', 'विकास नियंत्रण नियम', 'Development control rules'), source: OFFICIAL_SOURCES.policies },
      { name: 'हरित उद्योग कॉरिडोअर', note: text('शाश्वत ऊर्जा सहाय्य', 'हरित ऊर्जा सहायता', 'Green energy transition'), source: OFFICIAL_SOURCES.infrastructure },
    ],
    steps: [
      text('विद्यमान स्थिर भांडवल व प्रस्तावित वाढीव गुंतवणुकीचा ताळेबंद तयार करा.', 'वर्तमान अचल पूंजी और प्रस्तावित निवेश का तुलनात्मक विवरण तैयार करें।', 'Prepare comparative gross fixed capital investment for existing and proposed units.'),
      text('लागू औद्योगिक धोरणातील विस्तार पात्रता (किमान २५% स्थिर भांडवल वाढ) तपासा.', 'औद्योगिक नीति में विस्तार पात्रता (न्यूनतम 25% पूंजी वृद्धि) की पुष्टि करें।', 'Confirm policy eligibility criteria for expansion (e.g. min 25% gross block increase).'),
      text('वाढीव बांधकामासाठी MIDC कडून सुधारित नकाशा व MPCB कडून सुधारित Consent मिळवा.', 'निर्माण के लिए एमआईडीसी से संशोधित नक्शा और एमपीसीबी से संशोधित सहमति लें।', 'Obtain revised building layout sanction and amended MPCB consent prior to work.'),
    ],
    related: [text('PSI प्रोत्साहन योजना', 'PSI प्रोत्साहन योजना', 'PSI Incentives'), text('कौशल्य आधुनिकीकरण', 'कौशल आधुनिकीकरण', 'Skills Upgradation')],
    sources: [OFFICIAL_SOURCES.policies, OFFICIAL_SOURCES.maitri, OFFICIAL_SOURCES.infrastructure],
  },
  {
    id: 'services',
    title: text('शासकीय सेवा व अनुपालन', 'सरकारी सेवाएं और अनुपालन', 'Government services and compliance'),
    subtitle: text('एकखिडकी MAITRI 2.0, कायदे, परिपत्रके व नागरी सनद', 'सिंगल विंडो MAITRI 2.0, कानून, परिपत्र और नागरिक चार्टर', 'MAITRI 2.0 single window, acts, circulars & citizen charter'),
    description: text(
      'महाराष्ट्र शासनाचे MAITRI 2.0 पोर्टल, ऑनलाइन सेवा, कायदे, नागरिक सनद आणि अधिकृत परिपत्रकांचे संदर्भ मिळवा.',
      'महाराष्ट्र शासन का MAITRI 2.0 पोर्टल, ऑनलाइन सेवाएं, कानून, नागरिक चार्टर और आधिकारिक परिपत्र देखें।',
      'Navigate official single-window services, regulatory compliances, renewal schedules and official circulars.'
    ),
    audience: text('अर्ज, नूतनीकरण, ना-हरकत किंवा वैधानिक अनुपालनाची जबाबदारी असलेले सर्व उद्योजक.', 'आवेदन, नवीनीकरण, अनापत्ति या वैधानिक अनुपालन की जिम्मेदारी वाले सभी उद्यमी।', 'All enterprise owners, compliance officers and factory administrators.'),
    documents: text('सेवा प्रकारानुसार विहित अर्जाचा नमुना, मागील परवान्याची प्रत, चालान पावती.', 'सेवा प्रकार के अनुसार निर्धारित आवेदन, पिछले लाइसेंस की प्रति, चालान रसीद।', 'Standard service application, previous clearance copy, fee challan receipt.'),
    subItems: [
      { name: 'MAITRI 2.0 पोर्टल', note: text('१२०+ औद्योगिक सेवा', '120+ औद्योगिक सेवाएं', '120+ integrated clearances'), source: OFFICIAL_SOURCES.maitri },
      { name: 'आपले सरकार', note: text('नागरी व व्यवसाय सेवा', 'नागरिक व व्यापार सेवाएं', 'Citizen & business services'), source: OFFICIAL_SOURCES.aapleSarkar },
      { name: 'लोकसेवा हक्क (RTS)', note: text('कालमर्यादित सेवा हमी', 'समयबद्ध सेवा गारंटी', 'Time-bound service delivery'), source: OFFICIAL_SOURCES.rts },
      { name: 'नागरिक सनद व परिपत्रके', note: text('अधिकृत नियम व शुल्क', 'आधिकारिक नियम और शुल्क', 'Rules, fees and timelines'), source: OFFICIAL_SOURCES.informationEnablers },
    ],
    steps: [
      text('व्यवसाय सेवेचा संबंधित विभाग ओळखून MAITRI 2.0 वर लॉगिन करा.', 'संबंधित विभाग की पहचान कर MAITRI 2.0 पर लॉगिन करें।', 'Identify the relevant department and login via MAITRI 2.0 single window.'),
      text('नागरिक सनदेनुसार सेवेची विहित कालमर्यादा व आवश्यक कागदपत्रे तपासा.', 'नागरिक चार्टर के अनुसार समयसीमा और आवश्यक दस्तावेज जांचें।', 'Review statutory timeline and document checklist as per Citizen Charter.'),
      text('ऑनलाइन अर्ज सादर करून मिळालेला अर्ज संदर्भ क्रमांक (Application ID) जतन करा.', 'ऑनलाइन आवेदन जमा कर प्राप्त संदर्भ संख्या (Application ID) सुरक्षित रखें।', 'Submit application online and track progression via official application ID.'),
    ],
    related: [text('व्यापार सुलभता', 'व्यापार सुगमता', 'Ease of Doing Business'), text('RTS सेवा हमी', 'RTS सेवा गारंटी', 'Right to Service Guarantee')],
    sources: [OFFICIAL_SOURCES.maitri, OFFICIAL_SOURCES.aapleSarkar, OFFICIAL_SOURCES.rts, OFFICIAL_SOURCES.informationEnablers, OFFICIAL_SOURCES.notices, OFFICIAL_SOURCES.shopAct, OFFICIAL_SOURCES.investorHub],
  },
  {
    id: 'grievance',
    title: text('तक्रार व सहाय्य', 'शिकायत और सहायता', 'Grievance and support'),
    subtitle: text('अधिकृत निवारण माध्यमे, लोकसेवा हक्क व अपील मार्ग', 'आधिकारिक निवारण माध्यम, लोक सेवा अधिकार और अपील मार्ग', 'Official grievance redressal, RTS & escalation paths'),
    description: text(
      'औद्योगिक सेवेची तक्रार योग्य शासकीय विभागाकडे नोंदवण्यासाठी आणि अधिकृत पाठपुरावा करण्यासाठी मार्गदर्शक माहिती मिळवा.',
      'औद्योगिक सेवा की शिकायत संबंधित सरकारी विभाग में दर्ज करने और आधिकारिक अनुवर्ती के लिए मार्गदर्शिका देखें।',
      'Official channels, dispute escalation matrices and right-to-service appeal procedures for industrial utility grievances.'
    ),
    audience: text('शासकीय सेवा, औद्योगिक भूखंड किंवा पायाभूत सुविधांशी संबंधित अडचण असलेले व्यवसाय.', 'सरकारी सेवा, औद्योगिक भूखंड या बुनियादी ढांचे से संबंधित समस्या वाले व्यवसाय।', 'Enterprises facing infrastructural bottlenecks, utility delays or administrative grievances.'),
    documents: text('मूळ सेवा अर्ज संदर्भ, पत्रव्यवहार, समस्येचा संक्षिप्त तपशील व पुरावा.', 'मूल सेवा आवेदन संदर्भ, पत्राचार, समस्या का संक्षिप्त विवरण और प्रमाण।', 'Original application reference, correspondence records, concise grievance summary.'),
    subItems: [
      { name: 'MAITRI तक्रार निवारण', note: text('उद्योग सहाय्य डेस्क', 'उद्योग सहायता डेस्क', 'Industry facilitation desk'), source: OFFICIAL_SOURCES.maitri },
      { name: 'आपले सरकार तक्रार पोर्टल', note: text('शासकीय निवारण मंच', 'सरकारी निवारण मंच', 'State grievance portal'), source: OFFICIAL_SOURCES.aapleSarkar },
      { name: 'RTS प्रथम व द्वितीय अपील', note: text('कायदेशीर अपील मंच', 'कानूनी अपील मंच', 'Statutory RTS appeal desks'), source: OFFICIAL_SOURCES.rts },
      { name: 'MIDC हेल्पडेस्क', note: text('वसाहत संपर्क कक्ष', 'क्षेत्र संपर्क कक्ष', 'Industrial area facilitation'), source: OFFICIAL_SOURCES.faq },
    ],
    steps: [
      text('मूळ सेवा अर्ज किंवा जोडणीचा अधिकृत संदर्भ क्रमांक तयार ठेवा.', 'मूल सेवा आवेदन या कनेक्शन का आधिकारिक संदर्भ नंबर तैयार रखें।', 'Retrieve the original application ID, sanction number or utility consumer ID.'),
      text('संबंधित विभागाच्या अधिकृत तक्रार निवारण पोर्टलवर तक्रार नोंदवा.', 'संबंधित विभाग के आधिकारिक शिकायत निवारण पोर्टल पर शिकायत दर्ज करें।', 'Lodge grievance through the relevant department’s official online grievance portal.'),
      text('विहित मुदतीत निवारण न झाल्यास लोकसेवा हक्क (RTS) अपीलीय अधिकाऱ्याकडे अपील करा.', 'निर्धारित समय में समाधान न होने पर लोक सेवा अधिकार (RTS) अपीलीय अधिकारी को अपील करें।', 'If unresolved within the citizen charter timeline, escalate to the designated First Appellate Officer under RTS.'),
    ],
    related: [text('RTS तक्रार निवारण', 'RTS शिकायत निवारण', 'RTS Redressal'), text('MIDC संपर्क केंद्र', 'एमआईडीसी संपर्क केंद्र', 'MIDC Contact Center')],
    sources: [OFFICIAL_SOURCES.maitri, OFFICIAL_SOURCES.aapleSarkar, OFFICIAL_SOURCES.rts, OFFICIAL_SOURCES.informationEnablers, OFFICIAL_SOURCES.notices, OFFICIAL_SOURCES.faq],
  },
] as const;

export const LOCATION_PROCESS_STEPS = [
  {
    step: 1,
    title: text('लँड बँक शोध', 'लैंड बैंक खोज', 'Land Bank Search'),
    desc: text('MIDC Land Bank व GIS द्वारे उपलब्ध भूखंड पाहणे.', 'एमआईडीसी लैंड बैंक और जीआईएस से उपलब्ध भूखंड देखना।', 'Review vacant plot listings on MIDC Land Bank & GIS portal.'),
  },
  {
    step: 2,
    title: text('वाटप मार्ग निवड', 'आवंटन मार्ग चयन', 'Route Selection'),
    desc: text('थेट वाटप किंवा ई-लिलाव पात्रता निश्चित करणे.', 'प्रत्यक्ष आवंटन या ई-नीलामी पात्रता तय करना।', 'Identify whether direct allotment or e-bidding applies.'),
  },
  {
    step: 3,
    title: text('MAITRI 2.0 वर अर्ज', 'MAITRI 2.0 पर आवेदन', 'Single Window Filing'),
    desc: text('DPR, संस्था रचना व ब्लॉक प्लॅनसह ऑनलाइन अर्ज सादर करणे.', 'डीपीआर, संस्था संरचना और ब्लॉक प्लान के साथ ऑनलाइन आवेदन।', 'Submit detailed application with DPR and entity profile.'),
  },
  {
    step: 4,
    title: text('छाननी व वाटप पत्र', 'जांच और आवंटन पत्र', 'Scrutiny & Allotment'),
    desc: text('MIDC भूखंड वाटप समितीद्वारे पुनरावलोकन व ऑफर लेटर जारी होणे.', 'एमआईडीसी समिति द्वारा समीक्षा और आवंटन पत्र जारी होना।', 'Committee evaluation and issuance of allotment letter.'),
  },
  {
    step: 5,
    title: text('ताबा व बांधकाम', 'कब्जा और निर्माण', 'Possession & Development'),
    desc: text('भाडेपट्टा करारनामा, ताबा पावती व प्रकल्प बांधकाम प्रारंभ.', 'पट्टा अनुबंध, कब्जा रसीद और परियोजना निर्माण शुरुआत।', 'Execute lease agreement, take possession and commence work.'),
  },
];

// -------------------------------------------------------------
// MODULE 2: SUBSIDY MENTOR DATA
// -------------------------------------------------------------

export const DISTRICT_CLASSIFICATION_ZONES = [
  {
    zone: 'Group A',
    title: text('गट अ (Group A) — अतिविकसित', 'ग्रुप ए (Group A) — अतिविकसित', 'Group A — Developed'),
    areas: text('मुंबई, ठाणे, नवी मुंबई, पुणे व पिंपरी चिंचवड महानगर क्षेत्र', 'मुंबई, ठाणे, नवी मुंबई, पुणे और पिंपरी चिंचवड़ क्षेत्र', 'Mumbai, Thane, Navi Mumbai, Pune & PCMC municipal regions'),
    incentiveScope: text('पायाभूत सुविधा सघन; निवडक थ्रस्ट सेक्टर्स व एमएसएमईंना मर्यादित सवलत', 'बुनियादी ढांचा सघन; चुनिंदा थ्रस्ट क्षेत्रों को सीमित लाभ', 'High infra density; focused thrust sector & green benefits'),
  },
  {
    zone: 'Group B',
    title: text('गट ब (Group B) — विकसित औद्योगिक', 'ग्रुप बी (Group B) — विकसित औद्योगिक', 'Group B — Developing'),
    areas: text('नाशिक शहर, औरंगाबाद (संभाजीनगर) मध्यवर्ती, कोल्हापूर शहर परिसर', 'नाशिक शहर, छत्रपति संभाजीनगर मुख्य, कोल्हापुर शहर क्षेत्र', 'Nashik urban, Chhatrapati Sambhajinagar core, Kolhapur urban'),
    incentiveScope: text('मध्यम भांडवली व व्याज अनुदान; विस्तार प्रकल्पांसाठी पोषक', 'मध्यम पूंजी व ब्याज सब्सिडी; विस्तार परियोजनाओं के लिए उपयुक्त', 'Moderate capital and interest subsidies; suitable for expansions'),
  },
  {
    zone: 'Group C',
    title: text('गट क (Group C) — मध्यम विकसित', 'ग्रुप सी (Group C) — मध्यम विकसित', 'Group C — Developing Hinterland'),
    areas: text('सोलापूर, सातारा, अहिल्यानगर (अहमदनगर), सांगली, जळगाव, रायगड परिसर', 'सोलापुर, सातारा, अहिल्यानगर, सांगली, जलगांव, रायगढ़ क्षेत्र', 'Solapur, Satara, Ahilyanagar, Sangli, Jalgaon, Raigad districts'),
    incentiveScope: text('वाढीव भांडवली अनुदान, वीज शुल्क सवलत व दीर्घकालीन प्रोत्साहन मर्यादा', 'उच्च पूंजी सब्सिडी, बिजली शुल्क रियायत और दीर्घकालिक लाभ', 'Enhanced capital subsidies, electricity duty waiver, longer tenures'),
  },
  {
    zone: 'Group D / D+',
    title: text('गट ड व ड+ (Group D / D+) — प्राधान्य औद्योगिक', 'ग्रुप डी व डी+ (Group D / D+) — प्राथमिकता क्षेत्र', 'Group D / D+ — High Priority'),
    areas: text('विदर्भ (नागपूर, अमरावती, चंद्रपूर), मराठवाडा, उत्तर महाराष्ट्र व नक्षल/आदिवासी तालुके', 'विदर्भ (नागपुर, अमरावती), मराठवाड़ा, उत्तर महाराष्ट्र व आदिवासी तालुके', 'Vidarbha, Marathwada, North Maharashtra, Tribal & Naxal affected blocks'),
    incentiveScope: text('सर्वोच्च औद्योगिक प्रोत्साहन; मुद्रांक शुल्क १००% सवलत, उच्च व्याज अनुदान व वीज दर सवलत', 'सर्वोच्च प्रोत्साहन; 100% स्टांप ड्यूटी छूट, उच्च ब्याज सब्सिडी और बिजली लाभ', 'Maximum incentive quantum, 100% stamp duty waiver & highest power benefits'),
  },
];

export const INCENTIVE_BENEFIT_TYPES = [
  {
    id: 'capital',
    name: text('भांडवली गुंतवणूक अनुदान (IPS / Capital Subsidy)', 'पूंजी निवेश सब्सिडी (IPS / Capital Subsidy)', 'Industrial Promotion Subsidy (IPS / Capital)'),
    desc: text('पात्र स्थिर भांडवली गुंतवणुकीच्या (Fixed Capital Investment) विहित टक्केवारीनुसार अनुदान.', 'पात्र अचल पूंजीगत निवेश (FCI) के विहित प्रतिशत के अनुसार वित्तीय लाभ।', 'Refund/subsidy linked to eligible Gross Fixed Capital Investment across land, building and plant.'),
    scope: text('धोरणानुसार गट अ ते ड+ नुसार लाभाचा कालावधी व कमाल मर्यादा बदलते.', 'नीति अनुसार ग्रुप ए से डी+ तक लाभ की अवधि और सीमा बदलती है।', 'Disbursement duration and ceiling depend on taluka classification (Groups A to D+).'),
  },
  {
    id: 'interest',
    name: text('व्याज अनुदान (Interest Subsidy)', 'ब्याज सब्सिडी (Interest Subsidy)', 'Interest Subsidy on Term Loans'),
    desc: text('बँक किंवा वित्तीय संस्थांकडून घेतलेल्या मुदत कर्जावरील (Term Loan) व्याजात सवलत.', 'बैंक या वित्तीय संस्थानों से लिए गए सावधि ऋण पर ब्याज में राहत।', 'Interest rate subvention on sanctioned term loans, especially beneficial for MSME units.'),
    scope: text('पात्र एमएसएमई उद्योगांसाठी विहित वर्षांसाठी लागू; दर संबंधित धोरणात निश्चित असतो.', 'पात्र एमएसएमई के लिए निर्धारित वर्षों तक लागू; दर नीति में विहित होती है।', 'Applicable for eligible MSME enterprises for specified years subject to prompt repayment.'),
  },
  {
    id: 'electricity',
    name: text('वीज शुल्क व दर सवलत (Electricity Duty & Tariff)', 'बिजली शुल्क एवं दर छूट (Electricity Duty & Tariff)', 'Electricity Duty & Tariff Concession'),
    desc: text('विद्युत वापरावर आकारल्या जाणाऱ्या शासकीय वीज शुल्कात सूट किंवा प्रतियुनिट दर सवलत.', 'बिजली उपयोग पर लगाए जाने वाले सरकारी शुल्क में छूट या प्रति यूनिट दर रियायत।', 'Exemption from state electricity duty and per-unit tariff subvention in designated zones.'),
    scope: text('गट क, ड व ड+ क्षेत्रातील उत्पादक युनिट्ससाठी धोरणानुसार दीर्घकालीन लाभ.', 'ग्रुप सी, डी और डी+ क्षेत्रों में विनिर्माण इकाइयों के लिए दीर्घकालिक लाभ।', 'Significant cost reduction for power-intensive manufacturing in developing talukas.'),
  },
  {
    id: 'stamp',
    name: text('मुद्रांक शुल्क सवलत (Stamp Duty Exemption)', 'स्टांप शुल्क छूट (Stamp Duty Exemption)', 'Stamp Duty Concession / Waiver'),
    desc: text('औद्योगिक भूखंड, शेड खरेदी किंवा दीर्घकालीन लीज डीड नोंदणीवरील मुद्रांक शुल्कात माफी.', 'औद्योगिक भूखंड, शेड खरीद या दीर्घकालिक पट्टा अनुबंध पर स्टांप शुल्क में छूट।', 'Full or partial waiver on stamp duty for acquiring industrial land, sheds or mortgages.'),
    scope: text('MIDC व मान्यताप्राप्त औद्योगिक उद्यानांमध्ये १००% किंवा अंशतः सवलत.', 'एमआईडीसी और मान्यता प्राप्त औद्योगिक पार्कों में 100% या आंशिक छूट।', 'Up to 100% waiver depending on zone, gender/category and industrial park status.'),
  },
  {
    id: 'other',
    name: text('इतर तांत्रिक व निर्यात सहाय्य', 'अन्य तकनीकी एवं निर्यात सहायता', 'Technology Upgradation & Quality Certification'),
    desc: text('पेटंट नोंदणी, ZED गुणवत्ता प्रमाणपत्र, पाण्याचे ऑडिट आणि हरित ऊर्जा तंत्रज्ञानावर खर्च परतावा.', 'पेटेंट पंजीकरण, जेड प्रमाणन, जल ऑडिट और हरित ऊर्जा तकनीक पर व्यय प्रतिपूर्ति।', 'Reimbursement for patent filing, ZED certification, water audits and energy efficiency tech.'),
    scope: text('महाराष्ट्र MSME धोरण व निर्यात प्रोत्साहन योजनेनुसार लागू.', 'महाराष्ट्र एमएसएमई नीति और निर्यात प्रोत्साहन योजना के अनुसार लागू।', 'Targeted grants under MSME development schemes and Maharashtra Export Promotion Policy.'),
  },
];

export const ELIGIBILITY_FLOWCHART = [
  {
    step: 1,
    title: text('उद्योग प्रोफाइल नोंदणी', 'व्यवसाय प्रोफ़ाइल', 'Business Profile'),
    desc: text('जिल्हा, तालुका, क्षेत्र, भांडवली गुंतवणूक व उद्योग प्रकार निश्चित करा.', 'ज़िला, तालुका, क्षेत्र, पूंजी निवेश और उद्योग श्रेणी तय करें।', 'Specify district, taluka, sector, proposed investment and category.'),
  },
  {
    step: 2,
    title: text('धोरण व झोन पडताळणी', 'नीति और ज़ोन जांच', 'Policy & Zone Review'),
    desc: text('महाराष्ट्र उद्योग धोरण २०२५ मधील लागू झोन (A, B, C, D, D+) तपासा.', 'महाराष्ट्र उद्योग नीति 2025 में लागू ज़ोन (A, B, C, D, D+) देखें।', 'Match taluka to industrial development zones (Group A through D+).'),
  },
  {
    step: 3,
    title: text('पात्रता अटींचे पुनरावलोकन', 'पात्रता शर्तों की समीक्षा', 'Eligibility Criteria'),
    desc: text('उद्यम नोंदणी, नवीन/विस्तार निकष आणि उत्पादन सुरूवात तारीख तपासा.', 'उद्यम पंजीकरण, नई/विस्तार शर्तें और उत्पादन प्रारंभ तिथि जांचें।', 'Verify Udyam validity, expansion investment criteria and timeline.'),
  },
  {
    step: 4,
    title: text('संभाव्य प्रोत्साहन प्रकार', 'संभावित प्रोत्साहन प्रकार', 'Potential Benefit Types'),
    desc: text('भांडवली, व्याज, वीज शुल्क व मुद्रांक सवलतींचे लागूत्व ओळखा.', 'पूंजी, ब्याज, बिजली और स्टांप शुल्क लाभों की पहचान करें।', 'Identify relevant subsidy heads (IPS, interest subvention, duties).'),
  },
  {
    step: 5,
    title: text('अधिकृत MAITRI वर अर्ज', 'आधिकारिक MAITRI पर आवेदन', 'Official MAITRI 2.0 Filing'),
    desc: text('आवश्यक कागदपत्रांसह उद्योग संचालनालयाच्या अधिकृत पोर्टलवर अर्ज सादर करा.', 'आवश्यक दस्तावेजों के साथ उद्योग निदेशालय के आधिकारिक पोर्टल पर आवेदन करें।', 'Submit statutory claim with CA certificates on MAITRI single window.'),
  },
];

export const ELIGIBILITY_CONDITIONS = [
  text('उद्योग घटकाकडे वैध उद्यम (Udyam) नोंदणी क्रमांक असणे अनिवार्य आहे.', 'इकाई के पास वैध उद्यम पंजीकरण संख्या होना अनिवार्य है।', 'The enterprise must hold a valid Udyam Registration Certificate.'),
  text('प्रकल्प महाराष्ट्र शासनाच्या चालू औद्योगिक धोरणाच्या वैध कालावधीत सुरू झालेला असावा.', 'परियोजना महाराष्ट्र सरकार की मौजूदा औद्योगिक नीति की वैध अवधि में शुरू होनी चाहिए।', 'Project investment and commercial production must commence within the policy period.'),
  text('विस्तार प्रकल्पांसाठी विद्यमान स्थिर भांडवली गुंतवणुकीत किमान २५% किंवा विहित निकषानुसार वाढ आवश्यक असते.', 'विस्तार परियोजनाओं के लिए मौजूदा अचल पूंजीगत निवेश में न्यूनतम 25% या विहित वृद्धि आवश्यक है।', 'Expansion units must achieve a minimum 25% increase in gross fixed capital investment.'),
  text('सर्व आवश्यक पर्यावरण (MPCB) व स्थानिक प्राधिकरणांच्या मंजुऱ्या वैध असाव्यात.', 'सभी आवश्यक पर्यावरण (एमपीसीबी) और स्थानीय प्राधिकरण स्वीकृतियां वैध होनी चाहिए।', 'All requisite MPCB environmental consents and building sanctions must be active.'),
];

export const REQUIRED_DOCUMENTS_SCHEME = [
  text('उद्यम (Udyam) नोंदणी प्रमाणपत्र', 'उद्यम पंजीकरण प्रमाण पत्र', 'Udyam Registration Certificate'),
  text('सविस्तर प्रकल्प अहवाल (DPR)', 'विस्तृत परियोजना रिपोर्ट (DPR)', 'Detailed Project Report (DPR)'),
  text('सनदी लेखापाल (CA) प्रमाणित स्थिर भांडवली गुंतवणूक विवरण', 'चार्टर्ड एकाउंटेंट (CA) प्रमाणित पूंजी निवेश विवरण', 'CA Certified Gross Fixed Capital Investment Schedule'),
  text('जागेचा मालकी पुरावा किंवा MIDC लीज डीड प्रत', 'भूमि स्वामित्व प्रमाण या एमआईडीसी पट्टा विलेख', 'Land ownership document or registered MIDC Lease Deed'),
  text('MPCB Consent to Establish (CTE) व Consent to Operate (CTO)', 'एमपीसीबी स्थापना व संचालन सहमति पत्र', 'Active MPCB Consent to Establish and Consent to Operate'),
  text('बँक मुदत कर्ज मंजुरी पत्र (Term Loan Sanction Letter) व वितरण पावती', 'बैंक सावधि ऋण स्वीकृति पत्र और वितरण प्रमाण', 'Term loan sanction letter and bank disbursement certificate'),
  text('कारखाना परवाना / शॉप ॲक्ट नोंदणी प्रत', 'कारखाना लाइसेंस / शॉप एक्ट पंजीकरण', 'Factory Licence or Shop Act Registration Certificate'),
];

export const POLICY_REFERENCES = [
  {
    title: text('महाराष्ट्र उद्योग, गुंतवणूक व सेवा धोरण २०२५', 'महाराष्ट्र उद्योग, निवेश एवं सेवा नीति 2025', 'Maharashtra Industries, Investment and Services Policy 2025'),
    sector: text('सर्वसमावेशक उद्योग, MSME व सेवा', 'व्यापक उद्योग, एमएसएमई एवं सेवाएं', 'Multi-sector industrial, MSME & services'),
    validity: text('२०२५ — २०२९ (सध्या लागू)', '2025 — 2029 (वर्तमान लागू)', '2025 — 2029 (Currently active)'),
    provisions: text('नवीन झोनिंग, एमएसएमई भांडवली सहाय्य, लॉजिस्टिक प्रोत्साहन व हरित औद्योगिक कॉरिडोअर.', 'नया ज़ोनिंग, एमएसएमई पूंजी सहायता, लॉजिस्टिक प्रोत्साहन और हरित उद्योग गलियारा।', 'Comprehensive package covering IPS, interest subvention, power tariff support and green tech.'),
    href: OFFICIAL_SOURCES.policies.href,
  },
  {
    title: text('महाराष्ट्र इलेक्ट्रिक वाहन (EV) धोरण २०२१', 'महाराष्ट्र इलेक्ट्रिक वाहन (EV) नीति 2021', 'Maharashtra Electric Vehicle (EV) Policy 2021'),
    sector: text('इलेक्ट्रिक वाहने, ई-मोबिलिटी व चार्जिंग पायाभूत सुविधा', 'इलेक्ट्रिक वाहन, ई-मोबिलिटी और चार्जिंग ढांचा', 'Electric Vehicles, EV components, batteries & charging infra'),
    validity: text('२०२१ — २०२६', '2021 — 2026', '2021 — 2026 (Active)'),
    provisions: text('पायोनियर युनिट्सना विशेष IPS, अग्रगण्य चार्जिंग प्रोत्साहन व १५ वर्षांपर्यंत वीज शुल्क माफी.', 'पायनियर इकाइयों को विशेष आईपीएस, चार्जिंग प्रोत्साहन और 15 साल तक बिजली शुल्क छूट।', 'Special pioneer unit incentives, up to 100% stamp duty waiver, and electricity duty exemption for up to 15 years.'),
    href: OFFICIAL_SOURCES.policies.href,
  },
  {
    title: text('पॅकेज योजना प्रोत्साहन (PSI) धोरण', 'पैकेज योजना प्रोत्साहन (PSI) नीति', 'Package Scheme of Incentives (PSI Framework)'),
    sector: text('उत्पादन उद्योग व रोजगार निर्मिती', 'विनिर्माण उद्योग एवं रोजगार सृजन', 'Manufacturing & employment-generating units'),
    validity: text('वर्तमान लागूत्व अधिकृत स्रोतावर तपासा', 'वर्तमान लागूता आधिकारिक स्रोत पर जांचें', 'Confirm active operational circulars on MAITRI'),
    provisions: text('स्थिर भांडवली गुंतवणुकीवर आधारित IPS, वीज शुल्क सवलत, व्याज अनुदान व मुद्रांक माफी.', 'अचल पूंजी निवेश पर आधारित आईपीएस, बिजली शुल्क छूट, ब्याज सब्सिडी और स्टांप छूट।', 'Industrial Promotion Subsidy (IPS), electricity duty waiver and stamp duty exemptions.'),
    href: OFFICIAL_SOURCES.policies.href,
  },
  {
    title: text('महाराष्ट्र MSME सक्षमीकरण धोरण संदर्भ', 'महाराष्ट्र एमएसएमई संवर्धन नीति संदर्भ', 'Maharashtra MSME Promotion Provisions'),
    sector: text('सूक्ष्म, लघु व मध्यम उद्योग', 'सूक्ष्म, लघु और मध्यम उद्यम', 'Micro, Small and Medium Enterprises'),
    validity: text('वर्तमान औद्योगिक धोरणांतर्गत समाविष्ट', 'मौजूदा औद्योगिक नीति के अंतर्गत शामिल', 'Integrated within Maharashtra Industrial Policy'),
    provisions: text('मुदत कर्जावर व्याज अनुदान, पेटंट खर्च परतावा, ZED गुणवत्ता सहाय्य व ऊर्जा ऑडिट सवलत.', 'सावधि ऋण पर ब्याज सब्सिडी, पेटेंट प्रतिपूर्ति, जेड प्रमाणन और ऊर्जा ऑडिट सहायता।', 'Interest subsidy on term loans, quality certification, patent assistance and market access.'),
    href: OFFICIAL_SOURCES.policies.href,
  },
  {
    title: text('एकात्मिक व शाश्वत वस्त्रोद्योग धोरण २०२३', 'एकीकृत एवं सतत वस्त्र नीति 2023', 'Integrated and Sustainable Textile Policy 2023'),
    sector: text('टेक्सटाईल, स्पिनिंग, वीव्हिंग व परिधान', 'वस्त्र, कताई, बुनाई और परिधान', 'Textile processing, spinning, weaving & apparel'),
    validity: text('२०२३ — २०२८', '2023 — 2028', '2023 — 2028'),
    provisions: text('कापूस उत्पादक भागात टेक्सटाईल पार्क, वीज दर सवलत, भांडवली अनुदान व सौर ऊर्जा सहाय्य.', 'कपास उत्पादक क्षेत्रों में टेक्सटाइल पार्क, बिजली रियायत, पूंजी सब्सिडी और सौर ऊर्जा लाभ।', 'Capital subsidies, power tariff concessions and dedicated textile parks in cotton belts.'),
    href: OFFICIAL_SOURCES.policies.href,
  },
  {
    title: text('महाराष्ट्र माहिती तंत्रज्ञान व ITES धोरण २०२३', 'महाराष्ट्र सूचना प्रौद्योगिकी एवं ITES नीति 2023', 'Maharashtra IT and ITES Policy 2023'),
    sector: text('माहिती तंत्रज्ञान, डेटा सेंटर्स व SaaS', 'सूचना प्रौद्योगिकी, डेटा केंद्र और सास', 'Information Technology, Data Centers & Cloud'),
    validity: text('२०२३ — २०२८', '2023 — 2028', '2023 — 2028'),
    provisions: text('अतिरिक्त FSI, डेटा सेंटर विशेष सवलती, वीज शुल्क माफी व पेटंट प्रोत्साहन.', 'अतिरिक्त एफएसआई, डेटा सेंटर विशेष रियायत, बिजली शुल्क छूट और नवाचार प्रोत्साहन।', 'Enhanced FSI, critical infrastructure status for data centers and operational incentives.'),
    href: OFFICIAL_SOURCES.policies.href,
  },
  {
    title: text('महाराष्ट्र हरित हायड्रोजन धोरण २०२३', 'महाराष्ट्र ग्रीन हाइड्रोजन नीति 2023', 'Maharashtra Green Hydrogen Policy 2023'),
    sector: text('हरित ऊर्जा, हायड्रोजन व शाश्वत इंधन', 'हरित ऊर्जा, हाइड्रोजन और सतत ईंधन', 'Green hydrogen, ammonia & clean energy'),
    validity: text('२०२३ — २०२८', '2023 — 2028', '2023 — 2028'),
    provisions: text('पारेषण शुल्क सवलत, २५ वर्षांसाठी वीज शुल्क माफी व एकल खिडकी मंजुरी.', 'पारेषण शुल्क छूट, 25 वर्षों के लिए बिजली शुल्क माफी और सिंगल विंडो मंजूरी।', 'Transmission charge waivers, electricity duty exemptions and land facilitation.'),
    href: OFFICIAL_SOURCES.policies.href,
  },
  {
    title: text('महाराष्ट्र लॉजिस्टिक्स पार्क धोरण २०२४', 'महाराष्ट्र लॉजिस्टिक्स पार्क नीति 2024', 'Maharashtra Logistics Park Policy 2024'),
    sector: text('वेअरहाउसिंग, कोल्ड चेन व वाहतूक कॉरिडोअर', 'वेयरहाउसिंग, कोल्ड चेन और परिवहन गलियारा', 'Warehousing, multimodal parks & cold chain'),
    validity: text('२०२४ — २०२९', '2024 — 2029', '2024 — 2029'),
    provisions: text('औद्योगिक दर्जा, वीज दर सवलत, वाढीव FSI व लॉजिस्टिक सुविधांना प्रोत्साहन.', 'औद्योगिक दर्जा, बिजली दर रियायत, अतिरिक्त एफएसआई और आधुनिक भंडारण प्रोत्साहन।', 'Industrial power rates, enhanced floor space index and infrastructure capital support.'),
    href: OFFICIAL_SOURCES.policies.href,
  },
  {
    title: text('अनुसूचित जाती/जमाती व महिला उद्योजक विशेष धोरण', 'अनुसूचित जाति/जनजाति व महिला उद्यमी विशेष नीति', 'SC/ST & Women Entrepreneur Incentive Provisions'),
    sector: text('सर्व समावेशक उद्योजकता', 'समावेशी उद्यमिता', 'Inclusive entrepreneurship across sectors'),
    validity: text('वर्तमान औद्योगिक धोरणात समाविष्ट', 'मौजूदा औद्योगिक नीति में शामिल', 'Active under state industrial policy'),
    provisions: text('अतिरिक्त व्याज अनुदान, भूखंड वाटपात प्राधान्य, मुद्रांक शुल्क १००% माफी व मार्जिन मनी सहाय्य.', 'अतिरिक्त ब्याज सब्सिडी, भूखंड आवंटन में प्राथमिकता, 100% स्टांप छूट और मार्जिन मनी सहायता।', 'Higher subsidy thresholds, plot reservation priority and specialized margin funding.'),
    href: OFFICIAL_SOURCES.policies.href,
  },
];

// -------------------------------------------------------------
// MODULE 3: DPR & FORMS DATA
// -------------------------------------------------------------

export const DPR_PREPARATION_WORKFLOW = [
  {
    step: 1,
    title: text('प्रकल्प संकल्पना', 'परियोजना संकल्पना', 'Project Idea'),
    desc: text('उत्पादन, क्षमता व बाजारपेठ निश्चिती करणे.', 'उत्पाद, क्षमता और बाजार मांग तय करना।', 'Establish product profile, production capacity and target market.'),
  },
  {
    step: 2,
    title: text('प्रकल्प रूपरेषा', 'परियोजना रूपरेखा', 'Project Profile'),
    desc: text('जागा, यंत्रसामग्री, कच्चा माल व तंत्रज्ञानाची निवड.', 'स्थान, मशीनरी, कच्चा माल और तकनीक की रूपरेखा।', 'Draft basic layout, machinery list, raw material sourcing & utility needs.'),
  },
  {
    step: 3,
    title: text('खर्च अंदाज', 'लागत अनुमान', 'Cost Estimation'),
    desc: text('जमीन, इमारत, यंत्रे व खेळते भांडवल बजेटिंग.', 'भूमि, भवन, मशीनरी और कार्यशील पूंजी बजट।', 'Calculate capital outlay for land, civil works, plant and operating capital.'),
  },
  {
    step: 4,
    title: text('DPR अहवाल लेखन', 'DPR रिपोर्ट तैयार करना', 'DPR Preparation'),
    desc: text('तांत्रिक प्रक्रिया, आर्थिक अंदाज व ताळेबंद मांडणे.', 'तकनीकी प्रक्रिया, वित्तीय अनुमान और नकदी प्रवाह।', 'Compile technical processes, projected balance sheets, DSCR and breakeven.'),
  },
  {
    step: 5,
    title: text('सहाय्यक कागदपत्रे', 'सहायक दस्तावेज', 'Supporting Documents'),
    desc: text('कोटेशन्स, जागेचा करारनामा व वैधानिक परवाने जोडणे.', 'कोटेशन, भूमि अनुबंध और आवश्यक वैधानिक स्वीकृतियां।', 'Assemble equipment quotes, title documents, IT returns and partner KYC.'),
  },
  {
    step: 6,
    title: text('अधिकृत अर्ज', 'आधिकारिक आवेदन', 'Official Application'),
    desc: text('बँकेकडे कर्जासाठी किंवा MAITRI वर भूखंडासाठी अर्ज.', 'बैंक ऋण या MAITRI पोर्टल पर भूखंड/प्रोत्साहन आवेदन।', 'Submit finalized package to banks for financing or MIDC/MAITRI for plots.'),
  },
];

export interface DprResourceItem {
  id: string;
  categoryNumber: number;
  categoryTag: Localized;
  title: Localized;
  formatLabel: Localized;
  type: 'guidance_template' | 'official_portal_form' | 'checklist' | 'reference_framework';
  purpose: Localized;
  audience: Localized;
  information: Localized;
  steps: Localized;
  sources: readonly { readonly label: Localized; readonly href: string }[];
}

export const DPR_RESOURCES: DprResourceItem[] = [
  {
    id: 'dpr',
    categoryNumber: 1,
    categoryTag: text('प्रकल्प अहवाल', 'परियोजना रिपोर्ट', 'Project Report'),
    title: text('सविस्तर प्रकल्प अहवाल (DPR)', 'विस्तृत परियोजना रिपोर्ट (DPR)', 'Detailed Project Report (DPR)'),
    formatLabel: text('DPR मार्गदर्शक नमुना (.txt)', 'DPR मार्गदर्शिका प्रारूप (.txt)', 'DPR Guidance Structure (.txt)'),
    type: 'guidance_template',
    purpose: text('प्रकल्पाची तांत्रिक व्यवहार्यता, आर्थिक गणित आणि बाजारपेठ मांडण्यासाठी सर्वसमावेशक मसुदा.', 'परियोजना की तकनीकी व्यवहार्यता, वित्तीय गणित और बाजार विश्लेषण तैयार करने का प्रारूप।', 'Comprehensive framework detailing technical viability, financial projections and market feasibility.'),
    audience: text('नवीन उद्योग सुरू करणारे, बँक कर्ज अर्जदार आणि औद्योगिक भूखंडाचे इच्छुक.', 'नए उद्योग, बैंक ऋण आवेदक और औद्योगिक भूखंड के इच्छुक उद्यमी।', 'New manufacturing ventures, bank financing applicants and industrial plot applicants.'),
    information: text('उत्पादन तपशील, उत्पादन क्षमता, कच्चा माल स्रोत, उत्पादन प्रक्रिया, स्थिर भांडवली खर्च आणि नफा-तोटा अंदाज.', 'उत्पाद विवरण, उत्पादन क्षमता, कच्चा माल स्रोत, विनिर्माण प्रक्रिया, पूंजी लागत और लाभ-हानि अनुमान।', 'Product specification, capacity, raw material sourcing, process flowchart, capital outlay and revenue model.'),
    steps: text('प्रकल्पाची गृहितके स्पष्ट मांडा; मशिनरी कोटेशन्स जोडा; आवश्यक असल्यास सनदी लेखापाल किंवा तांत्रिक सल्लागाराकडून पुनरावलोकन करा.', 'मान्यताएं स्पष्ट लिखें; मशीन कोटेशन जोड़ें; आवश्यकता होने पर सीए या तकनीकी सलाहकार से समीक्षा कराएं।', 'State realistic assumptions, attach vendor machinery quotations and validate financial indicators (DSCR, IRR) with a CA.'),
    sources: [OFFICIAL_SOURCES.guide, OFFICIAL_SOURCES.diGov],
  },
  {
    id: 'planning',
    categoryNumber: 2,
    categoryTag: text('प्रकल्प नियोजन', 'परियोजना नियोजन', 'Project Planning'),
    title: text('प्रकल्प नियोजन व वेळापत्रक आराखडा', 'परियोजना योजना और समयसीमा प्रारूप', 'Project Execution & Milestone Plan'),
    formatLabel: text('नियोजन नमुना (.txt)', 'नियोजन प्रारूप (.txt)', 'Planning Milestone Template (.txt)'),
    type: 'guidance_template',
    purpose: text('प्रकल्पाच्या कामाचे टप्पे, संसाधने, जबाबदार व्यक्ती आणि मुदतींचा सुव्यवस्थित तक्ता तयार करणे.', 'परियोजना चरणों, संसाधनों, जिम्मेदारियों और समयसीमा का सुव्यवस्थित चार्ट बनाना।', 'Structured roadmap tracking pre-construction, erection, licensing and commissioning milestones.'),
    audience: text('प्रकल्प सुरू किंवा स्थलांतरित करणारे कारखाने व उद्योग व्यवस्थापक.', 'परियोजना शुरू या स्थानांतरित कर रहे उद्योग और संयंत्र प्रबंधक।', 'Industrial project heads, facility engineers and management teams.'),
    information: text('जागा संपादन तारीख, नागरी बांधकाम मुदत, मशिनरी डिलिव्हरी, वीज-पाणी जोडणी, चाचणी उत्पादन आणि प्रत्यक्ष प्रारंभ तारीख.', 'भूमि अधिग्रहण तिथि, सिविल कार्य समयसीमा, मशीन आपूर्ति, बिजली-पानी कनेक्शन और वाणिज्यिक उत्पादन तिथि।', 'Land possession date, civil construction schedule, machinery delivery, utility hookups and commercial COD.'),
    steps: text('प्रत्येक टप्प्यासाठी जबाबदार व्यक्ती ठरवा; परवानग्यांसाठी लागणारा वेळ गृहीत धरा; गंभीर टप्प्यांचे (Critical Path) नियोजन करा.', 'प्रत्येक चरण की जिम्मेदारी तय करें; वैधानिक स्वीकृतियों का समय जोड़ें; महत्वपूर्ण पथ (Critical Path) निर्धारित करें।', 'Assign phase owners, incorporate realistic statutory approval lead times and establish critical path dependencies.'),
    sources: [OFFICIAL_SOURCES.guide, OFFICIAL_SOURCES.maitri],
  },
  {
    id: 'cost',
    categoryNumber: 3,
    categoryTag: text('गुंतवणूक अंदाज', 'लागत अनुमान', 'Cost & Investment'),
    title: text('प्रकल्प खर्च व भांडवली गुंतवणूक विवरण', 'परियोजना लागत और पूंजी निवेश विवरण', 'Project Cost & Capital Investment Breakup'),
    formatLabel: text('खर्च तक्ता नमुना (.txt)', 'लागत विवरण प्रारूप (.txt)', 'Capital Budgeting Format (.txt)'),
    type: 'guidance_template',
    purpose: text('प्रकल्पासाठी लागणाऱ्या सर्व भांडवली व खेळत्या खर्चाचे घटक स्पष्ट आणि पडताळण्यायोग्य ठेवणे.', 'परियोजना की सभी पूंजीगत और कार्यशील लागतों को स्पष्ट और सत्यापन योग्य रखना।', 'Standardized accounting schedule capturing fixed capital investments and working capital margin.'),
    audience: text('गुंतवणूकदार, बँक कर्जदार, सीए आणि शासकीय प्रोत्साहन योजनांचे अर्जदार.', 'निवेशक, बैंक ऋण आवेदक, सीए और सरकारी प्रोत्साहन योजना के आवेदक।', 'Promoters, CFOs, loan officers and state incentive applicants.'),
    information: text('जमीन प्रीमियम, इमारत बांधकाम खर्च, मुख्य व सहाय्यक यंत्रसामग्री, स्थापना खर्च, प्राथमिक खर्च व ३ महिन्यांचे खेळते भांडवल.', 'भूमि मूल्य, भवन निर्माण व्यय, मुख्य व सहायक मशीनरी, स्थापना व्यय, प्रारंभिक व्यय और कार्यशील पूंजी।', 'Land cost, civil factory building, imported/indigenous machinery, installation, contingencies and working capital.'),
    steps: text('खर्चाचे अंदाज व विक्रेत्यांची जीएसटी कोटेशन्स स्वतंत्र ठेवा; कर व सरकारी शुल्काचे दर अधिकृत स्रोतावरून तपासा.', 'लागत अनुमान और विक्रेताओं के जीएसटी कोटेशन अलग रखें; कर और सरकारी शुल्क की जांच करें।', 'Segregate firm vendor quotations from estimates; cross-check current GST and municipal development charges.'),
    sources: [OFFICIAL_SOURCES.policies, OFFICIAL_SOURCES.guide],
  },
  {
    id: 'bank',
    categoryNumber: 4,
    categoryTag: text('बँक व वित्त', 'बैंक और वित्त', 'Bank & Finance'),
    title: text('बँक कर्ज व वित्तपुरवठा कागदपत्रे', 'बैंक ऋण और वित्त दस्तावेज', 'Bank Loan & Credit Appraisal Documentation'),
    formatLabel: text('बँक चेकलिस्ट (.txt)', 'बैंक चेकलिस्ट (.txt)', 'Bank Credit Checklist (.txt)'),
    type: 'checklist',
    purpose: text('बँक किंवा वित्तीय संस्थांकडे मुदत कर्ज आणि खेळत्या भांडवलाच्या पत मंजुरीसाठी कागदपत्रांची तयारी करणे.', 'बैंकों में सावधि ऋण और कार्यशील पूंजी स्वीकृति के लिए दस्तावेज तैयार करना।', 'Preparation checklist for project finance evaluation, debt syndication and working capital sanctions.'),
    audience: text('बँक कर्ज, सिडबी (SIDBI) किंवा इतर बाह्य वित्तपुरवठा शोधणारे उद्योजक.', 'बैंक ऋण, सिडबी (SIDBI) या बाहरी वित्त की तलाश कर रहे उद्यमी।', 'Entrepreneurs seeking commercial bank loans, SIDBI schemes or credit guarantees.'),
    information: text('प्रमोटर्सचे केवायसी, मागील ३ वर्षांचे आयटीआर, नेटवर्थ विवरण, डीसीआर (DSCR), रोख प्रवाह अंदाज, तारण मालमत्ता कागदपत्रे.', 'प्रमोटर केवाईसी, पिछले 3 वर्षों के आईटीआर, नेटवर्थ विवरण, ऋण शोधन अनुपात (DSCR), नकदी प्रवाह, संपार्श्विक सुरक्षा।', 'Promoter KYC, 3 years ITR & audited financials, net worth statements, projected cash flows, DSCR and collateral titles.'),
    steps: text('कर्ज देणाऱ्या बँकेची विशिष्ट चेकलिस्ट मिळवा; आर्थिक अंदाजांचे विश्लेषण सीएकडून करून घ्या; सर्व कागदपत्रे अधिकृत माध्यमातूनच द्या.', 'संबंधित बैंक की चेकलिस्ट प्राप्त करें; वित्तीय अनुमानों का सीए से ऑडिट कराएं; दस्तावेज सुरक्षित बैंकिंग माध्यम से दें।', 'Obtain the lender’s specific credit checklist, verify Debt Service Coverage Ratio (DSCR > 1.5) and submit via formal channel.'),
    sources: [OFFICIAL_SOURCES.udyam, OFFICIAL_SOURCES.msmeGov],
  },
  {
    id: 'land',
    categoryNumber: 5,
    categoryTag: text('औद्योगिक भूखंड', 'औद्योगिक भूखंड', 'Industrial Land'),
    title: text('MIDC औद्योगिक भूखंड अर्ज प्रपत्र', 'एमआईडीसी भूखंड आवेदन प्रपत्र', 'MIDC Industrial Land Application Kit'),
    formatLabel: text('भूखंड अर्ज मार्गदर्शक (.txt)', 'भूखंड आवेदन निर्देश (.txt)', 'Plot Application Guide (.txt)'),
    type: 'official_portal_form',
    purpose: text('MIDC औद्योगिक वसाहतीतील भूखंड थेट वाटप किंवा ई-लिलाव प्रक्रियेने मिळवण्यासाठी अधिकृत तयारी.', 'एमआईडीसी औद्योगिक क्षेत्रों में भूखंड आवंटन या ई-नीलामी आवेदन की तैयारी।', 'Readiness guide for filing online plot applications through MIDC Single Window under MILAAP 2025.'),
    audience: text('MIDC औद्योगिक क्षेत्रात नवीन जागा किंवा अतिरिक्त भूखंड घेऊ इच्छिणारे उद्योजक.', 'एमआईडीसी क्षेत्र में नई भूमि या अतिरिक्त भूखंड लेने वाले उद्यमी।', 'Investors and manufacturing units applying for MIDC land allocations.'),
    information: text('संस्थेची नोंदणी प्रत, संचालक मंडळ ठराव, भूखंडाचे क्षेत्रफळ (चौ.मी.), एफएसआय वापर, पाणी-वीज गरज आणि डीपीआर.', 'संस्था पंजीकरण प्रति, निदेशक मंडल संकल्प, भूखंड क्षेत्रफल (वर्ग मीटर), जल-विद्युत मांग और डीपीआर।', 'Constitutional documents, board resolution, required plot area in sq.m., utility requirements, project synopsis and DPR.'),
    steps: text('MIDC Land Bank तपासा; थेट वाटप किंवा ई-लिलावाच्या अटी वाचा; अधिकृत MIDC सिंगल विंडो पोर्टलवर नोंदणी करून अर्ज भरा.', 'एमआईडीसी लैंड बैंक देखें; सीधे आवंटन या ई-नीलामी की शर्तें पढ़ें; आधिकारिक पोर्टल पर आवेदन जमा करें।', 'Search Land Bank vacancies, review direct allotment criteria vs e-bidding and submit via MIDC portal.'),
    sources: [OFFICIAL_SOURCES.landBank, OFFICIAL_SOURCES.guide, OFFICIAL_SOURCES.policies],
  },
  {
    id: 'licences',
    categoryNumber: 6,
    categoryTag: text('परवाने व नोंदणी', 'लाइसेंस और पंजीकरण', 'Licences & Registration'),
    title: text('उद्योग परवाने व नोंदणी मार्गदर्शक', 'उद्योग लाइसेंस और पंजीकरण मार्गदर्शिका', 'Statutory Licences & Registrations Kit'),
    formatLabel: text('नोंदणी सूची (.txt)', 'पंजीकरण सूची (.txt)', 'Licences Reference Guide (.txt)'),
    type: 'checklist',
    purpose: text('उद्योग सुरू करण्यापूर्वी व नंतर लागणाऱ्या सर्व केंद्रीय, राज्य व स्थानिक परवान्यांची तपासणी सूची.', 'उद्योग संचालन से पहले और बाद में आवश्यक सभी केंद्रीय, राज्य और स्थानीय लाइसेंसों की जांच सूची।', 'Consolidated checklist of central, state and municipal pre-establishment and operational clearances.'),
    audience: text('नवीन कारखाने, विस्तार प्रकल्प आणि वैधानिक नूतनीकरण करणारे सर्व उद्योग.', 'नए कारखाने, विस्तार परियोजनाएं और वैधानिक नवीनीकरण करने वाले सभी उद्योग।', 'Factory managers, compliance officers and new industrial project promoters.'),
    information: text('उद्यम नोंदणी, शॉप ॲक्ट, कारखाना परवाना, प्रदूषण संमती (CTE/CTO), जीएसटीएन, आयात-निर्यात कोड (IEC).', 'उद्यम पंजीकरण, शॉप एक्ट, कारखाना लाइसेंस, प्रदूषण सहमति (CTE/CTO), जीएसटीएन, आयात-निर्यात कोड (IEC)।', 'Udyam, Shop Act, Factory Licence, MPCB Consent, GSTN, IEC code, Weights & Measures and Fire Safety.'),
    steps: text('लागू विभागांचे नियम MAITRI पोर्टलवरून तपासा; प्रत्येक अर्जाचे विहित शुल्क व दस्तऐवज अधिकृत पोर्टलवरच अपलोड करा.', 'लागू नियम MAITRI पोर्टल से जांचें; प्रत्येक आवेदन का निर्धारित शुल्क और दस्तावेज आधिकारिक पोर्टल पर ही अपलोड करें।', 'Map business activities to statutory approvals via MAITRI 2.0 and maintain digital copies with expiry tracking.'),
    sources: [OFFICIAL_SOURCES.udyam, OFFICIAL_SOURCES.shopAct, OFFICIAL_SOURCES.gst, OFFICIAL_SOURCES.mpcb, OFFICIAL_SOURCES.fssai],
  },
  {
    id: 'forms',
    categoryNumber: 7,
    categoryTag: text('शासकीय अर्ज', 'सरकारी प्रपत्र', 'Government Forms'),
    title: text('अधिकृत शासकीय अर्ज व नमुने संदर्भ', 'आधिकारिक सरकारी आवेदन और प्रपत्र संदर्भ', 'Official Government Application Portals Directory'),
    formatLabel: text('शासकीय पोर्टल दुवे (.txt)', 'सरकारी पोर्टल लिंक (.txt)', 'Government Portals Index (.txt)'),
    type: 'official_portal_form',
    purpose: text('शासकीय विभागांचे अधिकृत आणि वर्तमान अर्ज नमुने योग्य पोर्टलवरून मिळवण्याचे मार्गदर्शक.', 'सरकारी विभागों के आधिकारिक और वर्तमान आवेदन पत्र सीधे पोर्टल से प्राप्त करने की निर्देशिका।', 'Verified navigation directory directing entrepreneurs to official government application repositories.'),
    audience: text('नोंदणी, परवाना नूतनीकरण किंवा शासकीय योजनांचे अर्जदार.', 'पंजीकरण, लाइसेंस नवीनीकरण या सरकारी योजनाओं के आवेदक।', 'Citizens, business proprietors and legal compliance managers.'),
    information: text('संबंधित शासकीय विभाग, सेवेचे नाव, ऑनलाइन अर्ज प्रक्रिया, शुल्क रचना आणि पोचपावती पद्धत.', 'संबंधित सरकारी विभाग, सेवा का नाम, ऑनलाइन आवेदन प्रक्रिया, शुल्क संरचना और पावती विधि।', 'Responsible department, statutory service name, URL, fee structure, SLA timeline and acknowledgement mode.'),
    steps: text('या मार्गदर्शकात बनावट फॉर्म बनवलेले नाहीत; सर्व अधिकृत फॉर्म फक्त संबंधित शासकीय पोर्टलवरूनच डाउनलोड करा.', 'इस मार्गदर्शिका में कोई फर्जी फॉर्म नहीं है; सभी आधिकारिक फॉर्म केवल संबंधित सरकारी पोर्टल से डाउनलोड करें।', 'Do not rely on third-party offline forms; access authentic interactive forms exclusively on official portals.'),
    sources: [OFFICIAL_SOURCES.maitri, OFFICIAL_SOURCES.aapleSarkar, OFFICIAL_SOURCES.investorHub],
  },
  {
    id: 'compliance',
    categoryNumber: 8,
    categoryTag: text('अनुपालन व कायदे', 'अनुपालन और विनियम', 'Compliance & Regulations'),
    title: text('औद्योगिक अनुपालन व नियामक कॅलेंडर', 'औद्योगिक अनुपालन और विनियामक कैलेंडर', 'Industrial Statutory Compliance Calendar'),
    formatLabel: text('अनुपालन वेळापत्रक (.txt)', 'अनुपालन कैलेंडर (.txt)', 'Compliance Calendar Matrix (.txt)'),
    type: 'reference_framework',
    purpose: text('पर्यावरण, कामगार, कर आणि कंपनी कायद्यांतर्गत नियमित भरावयाची विवरणे व नूतनीकरण तारखांचा आराखडा.', 'पर्यावरण, श्रम, कर और कंपनी कानूनों के तहत आवधिक रिटर्न और नवीनीकरण तिथियों का प्रारूप।', 'Annual regulatory tracker capturing recurring deadlines for filings, returns, audits and renewals.'),
    audience: text('कार्यरत कारखाने, एचआर मॅनेजर्स, पर्यावरण अभियंते आणि कंपनी सेक्रेटरी.', 'चालू कारखाने, एचआर प्रबंधक, पर्यावरण इंजीनियर और अनुपालन टीमें।', 'Plant HR heads, environmental compliance managers, accountants and CFOs.'),
    information: text('MPCB वार्षिक अहवाल, कामगार रिटर्न, भविष्य निर्वाह निधी (PF/ESIC) देय तारखा, जीएसटी रिटर्न, फॅक्टरी इन्स्पेक्शन.', 'एमपीसीबी वार्षिक पर्यावरण विवरण, श्रम रिटर्न, पीएफ/ईएसआईसी देय तिथियां, जीएसटी रिटर्न, कारखाना निरीक्षण।', 'MPCB Environmental Statement (Form V), Annual Factory Returns, PF/ESIC deposits, GST filings and boiler certificates.'),
    steps: text('विहित नियामक कॅलेंडरमध्ये देय तारखा नोंदवून ठेवा; विलंब शुल्क व दंड टाळण्यासाठी १५ दिवस आधी प्रक्रिया पूर्ण करा.', 'कैलेंडर में नियत तिथियां दर्ज करें; विलंब शुल्क से बचने के लिए 15 दिन पूर्व आवश्यक प्रक्रिया पूरी करें।', 'Populate company statutory calendar with due dates and maintain digital renewal verification receipts.'),
    sources: [OFFICIAL_SOURCES.shopAct, OFFICIAL_SOURCES.mpcb, OFFICIAL_SOURCES.gst, OFFICIAL_SOURCES.fssai],
  },
  {
    id: 'templates',
    categoryNumber: 9,
    categoryTag: text('मार्गदर्शन नमुने', 'मार्गदर्शन प्रारूप', 'Guidance Templates'),
    title: text('DPR व व्यवसाय नियोजन मार्गदर्शन नमुने', 'DPR और व्यापार योजना मार्गदर्शन प्रारूप', 'Downloadable DPR & Business Planning Templates'),
    formatLabel: text('कामकाज नमुने (.txt)', 'कार्य प्रारूप (.txt)', 'Working Templates Package (.txt)'),
    type: 'guidance_template',
    purpose: text('उद्योजकांना प्राथमिक मसुदा स्वतः तयार करण्यासाठी उद्योग सेतूचे साधे आणि उपयुक्त कामकाजी नमुने.', 'उद्यमियों को अपना पहला मसौदा तैयार करने में सहायता के लिए उद्योग सेतु के सरल कार्य प्रारूप।', 'Practical offline drafting templates for preliminary DPR outlines, equipment lists and staffing plans.'),
    audience: text('पहिल्यांदा उद्योग सुरू करणारे नवउद्योजक, विद्यार्थी आणि लघु व्यावसायिक.', 'पहली बार उद्योग शुरू करने वाले नए उद्यमी और लघु व्यवसाय।', 'First-generation entrepreneurs, MSME founders and industrial project drafters.'),
    information: text('प्रकल्पाचा परिचय, उत्पादन प्रवाह, आवश्यक मशिनरी यादी, कर्मचारी रचना आणि आर्थिक गृहितकांचे नमुने.', 'परियोजना परिचय, विनिर्माण प्रवाह, आवश्यक मशीनरी सूची, कर्मचारी संरचना और वित्तीय मॉडल।', 'Executive summary, manufacturing flowchart, plant layout, organization organogram and unit cost economics.'),
    steps: text('डाउनलोड नमुने हे उद्योग सेतूचे मार्गदर्शन साहित्य आहे; ते शासकीय फॉर्म किंवा मंजुरीचा पर्याय नाही; माहिती भरून अधिकृत पोर्टलवर वापरा.', 'डाउनलोड प्रारूप उद्योग सेतु की मार्गदर्शन सामग्री हैं, सरकारी फॉर्म नहीं; इसे भरकर आधिकारिक पोर्टल पर उपयोग करें।', 'Download text template, populate with actual verified project data and attach as supporting document in official systems.'),
    sources: [OFFICIAL_SOURCES.guide, OFFICIAL_SOURCES.policies],
  },
  {
    id: 'checklists',
    categoryNumber: 10,
    categoryTag: text('तपासणी सूची', 'जांच सूची', 'Application Checklists'),
    title: text('अर्ज सादर करण्यापूर्वीची अंतिम तपासणी सूची', 'आवेदन जमा करने से पूर्व अंतिम जांच सूची', 'Pre-Submission Completeness & Quality Checklist'),
    formatLabel: text('अंतिम चेकलिस्ट (.txt)', 'अंतिम चेकलिस्ट (.txt)', 'Master Quality Checklist (.txt)'),
    type: 'checklist',
    purpose: text('कोणताही शासकीय किंवा बँक अर्ज सादर करण्यापूर्वी कागदपत्रे परिपूर्ण व वैध असल्याची खात्री करणे.', 'कोई भी सरकारी या बैंक आवेदन भेजने से पहले दस्तावेजों की पूर्णता और वैधता सुनिश्चित करना।', 'Final quality-assurance gate verifying document completeness, signature validity and technical resolutions.'),
    audience: text('ऑनलाइन किंवा ऑफलाइन औद्योगिक अर्ज सादर करणारे सर्व उद्योजक.', 'ऑनलाइन या ऑफलाइन औद्योगिक आवेदन जमा करने वाले सभी उद्यमी।', 'All enterprise promoters submitting online single-window clearances.'),
    information: text('डिजिटल स्वाक्षरी स्थिती, फाईल साईझ मर्यादा, पीडीएफ स्पष्टता, अधिकृत भाषांतर व आवश्यक नमुना अनुपालन.', 'डिजिटल हस्ताक्षर, फाइल आकार सीमा, पीडीएफ स्पष्टता, अधिकृत अनुवाद और आवश्यक प्रारूप।', 'Digital signature (DSC) readiness, PDF resolution, notarization proofs, file size compliance and fee receipts.'),
    steps: text('अधिकृत पोर्टलवरील तपासणी यादीशी तुलना करा; सर्व स्वाक्षऱ्या व सील तपासा; पोचपावती (Acknowledgement) सुरक्षित ठेवा.', 'आधिकारिक सूची से मिलान करें; सभी हस्ताक्षर व मुहर जांचें; पावती (Acknowledgement) सुरक्षित रखें।', 'Cross-examine every item against statutory requirements, audit digital signatures and archive official acknowledgement numbers.'),
    sources: [OFFICIAL_SOURCES.maitri, OFFICIAL_SOURCES.investorHub, OFFICIAL_SOURCES.aapleSarkar],
  },
];

// -------------------------------------------------------------
// MODULE 4: UDYOG SETU B2B DATA
// -------------------------------------------------------------

export const B2B_ECOSYSTEM_PILLARS = [
  {
    id: 'manufacturers',
    title: text('उत्पादक (Manufacturers)', 'निर्माता (Manufacturers)', 'Manufacturers'),
    desc: text('अंतिम उत्पादने व सुटे भाग तयार करणारे कारखाने आणि MSME उत्पादक एकके.', 'तैयार उत्पाद और कलपुर्जे बनाने वाले कारखाने और विनिर्माण इकाइयां।', 'OEMs, component manufacturers and fabrication units across Maharashtra.'),
    iconName: 'Factory',
  },
  {
    id: 'suppliers',
    title: text('पुरवठादार (Suppliers)', 'आपूर्तिकर्ता (Suppliers)', 'Suppliers & Vendors'),
    desc: text('कच्चा माल, रसायने, पॅकेजिंग व यंत्रसामग्री पुरवणारे अधिकृत वितरक.', 'कच्चा माल, रसायन, पैकेजिंग और मशीनरी आपूर्ति करने वाले वितरक।', 'Raw material stockists, chemical distributors, tooling and packaging vendors.'),
    iconName: 'Truck',
  },
  {
    id: 'buyers',
    title: text('खरेदीदार (Buyers)', 'खरीदार (Buyers)', 'Buyers & Procurement'),
    desc: text('औद्योगिक खरेदी संघ, शासकीय विभाग व मोठ्या कंपन्यांचे खरेदीदार.', 'औद्योगिक खरीद टीमें, सरकारी विभाग और बड़े उद्यमों के क्रय प्रबंधक।', 'Industrial procurement heads, corporate supply chain buyers and government agencies.'),
    iconName: 'ShoppingBag',
  },
  {
    id: 'services',
    title: text('सेवा प्रदाता (Service Providers)', 'सेवा प्रदाता (Service Providers)', 'Industrial Service Providers'),
    desc: text('लॉजिस्टिक्स, चाचणी प्रयोगशाळा, कॅलिब्रेशन व तांत्रिक सल्लागार सेवा.', 'लॉजिस्टिक्स, परीक्षण प्रयोगशालाएं, अंशांकन और तकनीकी परामर्श सेवाएं।', 'NABL testing labs, industrial testing, freight logistics, calibration & audit experts.'),
    iconName: 'Wrench',
  },
  {
    id: 'associations',
    title: text('औद्योगिक संघटना (Industry Associations)', 'औद्योगिक संगठन (Industry Associations)', 'Industry Associations & Clusters'),
    desc: text('MIDC मॅन्युफॅक्चरर्स असोसिएशन, चेंबर ऑफ कॉमर्स व क्लस्टर संस्था.', 'एमआईडीसी निर्माता संघ, वाणिज्य मंडल और औद्योगिक क्लस्टर संस्थाएं।', 'Zonal MIDC associations, district chambers of commerce and specialized export councils.'),
    iconName: 'Users',
  },
];

export const B2B_REQUIREMENT_WORKFLOW = [
  {
    step: 1,
    title: text('गरज निश्चिती', 'आवश्यकता निर्धारण', 'Requirement Definition'),
    desc: text('उत्पादन, कच्चा माल किंवा सेवेची अचूक गरज ठरवा.', 'उत्पाद, कच्चे माल या सेवा की सटीक जरूरत तय करें।', 'Specify exact product, technical grade or raw material requirement.'),
  },
  {
    step: 2,
    title: text('तपशील व प्रमाण', 'विवरण और मात्रा', 'Specifications & Volume'),
    desc: text('तांत्रिक तपशील, अपेक्षित प्रमाण व गुणवत्ता मानके नोंदवा.', 'तकनीकी विनिर्देश, आवश्यक परिमाण और गुणवत्ता मानक लिखें।', 'Detail monthly/annual quantity, dimensions, tolerances & quality standards.'),
  },
  {
    step: 3,
    title: text('ठिकाण व क्षेत्र', 'स्थान और क्षेत्र', 'Location & Cluster'),
    desc: text('जिल्हा, औद्योगिक परिसर व वितरण अंतर निश्चित करा.', 'ज़िला, औद्योगिक क्षेत्र और आपूर्ति दूरी तय करें।', 'Set delivery district, MIDC industrial zone and preferred proximity.'),
  },
  {
    step: 4,
    title: text('संपर्क व पडताळणी', 'संपर्क और सत्यापन', 'Contact & Verification'),
    desc: text('अधिकृत व्यवसाय प्रतिनिधीचा संपर्क व ईमेल द्या.', 'अधिकृत व्यापार प्रतिनिधि का फोन नंबर और ईमेल दर्ज करें।', 'Provide authorised company procurement contact and registered email.'),
  },
  {
    step: 5,
    title: text('चौकशी व कोटेशन', 'पूछताछ और कोटेशन', 'Direct Inquiries'),
    desc: text('पुरवठादारांशी थेट संवाद साधून कोटेशन्सची तुलना करा.', 'आपूर्तिकर्ताओं से सीधा संपर्क कर कोटेशन की तुलना करें।', 'Review matched capability profiles, request quotes and evaluate proposals.'),
  },
];

export const GEM_PROCUREMENT_STEPS = [
  {
    step: 1,
    title: text('GeM पोर्टलवर प्राथमिक नोंदणी', 'GeM पोर्टल पर प्राथमिक पंजीकरण', 'GeM Seller Registration'),
    desc: text('अधिकृत GeM पोर्टलवर आधार, पॅन, उद्यम व बँक तपशीलांसह विक्रेता खाते तयार करा.', 'आधिकारिक GeM पोर्टल पर आधार, पैन, उद्यम और बैंक विवरण के साथ खाता बनाएं।', 'Create seller account on gem.gov.in using Aadhaar, PAN, Udyam MSME and bank credentials.'),
  },
  {
    step: 2,
    title: text('संस्था पडताळणी व आयकर पडताळणी', 'संस्था सत्यापन और आयकर मिलान', 'Entity Verification & ITR Match'),
    desc: text('आयकर परतावा (ITR) व जीएसटीएनचे ऑनलाइन ऑटो-व्हेरिफिकेशन पूर्ण करा.', 'आयकर रिटर्न और जीएसटीएन का ऑनलाइन स्वतः-सत्यापन पूरा करें।', 'Complete automated PAN-ITR linkage and active GSTN verification on the portal.'),
  },
  {
    step: 3,
    title: text('उत्पादन व सेवा कॅटलॉग तयार करणे', 'उत्पाद और सेवा कैटलॉग सूची', 'Product & Service Cataloguing'),
    desc: text('विक्रीसाठी असलेल्या वस्तू किंवा सेवांचे तांत्रिक तपशील, ब्रँड व दर कॅटलॉगमध्ये जोडा.', 'बिक्री योग्य उत्पादों या सेवाओं के तकनीकी विवरण, ब्रांड और दरें कैटलॉग में जोड़ें।', 'Upload product specifications, brand approval proofs, test reports and competitive pricing.'),
  },
  {
    step: 4,
    title: text('शासकीय ई-निविदा व थेट खरेदी सहभाग', 'सरकारी ई-निविदा और खरीद में भाग', 'Bidding & Government Procurement'),
    desc: text('केंद्रीय व राज्य विभागांच्या निविदा, L1 बोली आणि थेट खरेदी ऑर्डर्समध्ये सहभागी व्हा.', 'केंद्रीय और राज्य विभागों की निविदाओं, L1 बोलियों और प्रत्यक्ष खरीद में भाग लें।', 'Participate in reverse auctions, central/state department tenders and direct purchase orders.'),
  },
];

// -------------------------------------------------------------
// GENERAL INDUSTRIAL ADVANTAGE, SECTORS & INFRASTRUCTURE
// -------------------------------------------------------------

export const INDUSTRIAL_ADVANTAGES = [
  {
    id: 'demographics',
    title: text('अनुकूल लोकसंख्या व कुशल मनुष्यबळ', 'अनुकूल जनसांख्यिकी और कुशल कार्यबल', 'Favourable Demographics & Skilled Talent'),
    body: text('महाराष्ट्रात ५००+ आयटीआय, अभियांत्रिकी व तंत्रज्ञान संस्थांद्वारे दरवर्षी लाखो कुशल तरुण उद्योगांना उपलब्ध होतात.', 'महाराष्ट्र में 500+ आईटीआई, इंजीनियरिंग और तकनीकी संस्थानों द्वारा कुशल कार्यबल उपलब्ध होता है।', 'Over 500 ITIs, technical universities and dedicated skilling centres supplying trained manufacturing workforce.'),
    iconName: 'Users',
  },
  {
    id: 'economy',
    title: text('मजबूत व वेगाने वाढणारी अर्थव्यवस्था', 'मजबूत और बढ़ती अर्थव्यवस्था', 'Booming & Robust Economy'),
    body: text('भारताच्या जीडीपीमध्ये सर्वोच्च वाटा आणि देशाच्या एकूण निर्यातीमध्ये महाराष्ट्राचे अग्रगण्य स्थान आहे.', 'भारत के सकल घरेलू उत्पाद में सबसे बड़ा योगदान और देश के कुल निर्यात में महाराष्ट्र का शीर्ष स्थान।', 'Leading contributor to India’s GDP and industrial output with top ranking in foreign direct investment (FDI).'),
    iconName: 'TrendingUp',
  },
  {
    id: 'infrastructure',
    title: text('अखंड व सक्षम औद्योगिक पायाभूत सुविधा', 'सक्षम एवं निरंतर औद्योगिक बुनियादी ढांचा', 'Seamless Industrial Infrastructure'),
    body: text('समृद्धी महामार्ग, जेएनपीए व वाढवण बंदर, नवी मुंबई आंतरराष्ट्रीय विमानतळ आणि समृद्ध वीज ग्रिड जाळे.', 'समृद्धि महामार्ग, जेएनपीए व वाढवण बंदरगाह, नवी मुंबई हवाई अड्डा और मजबूत ग्रिड नेटवर्क।', 'Samruddhi Expressway, JNPA & Vadhavan deep-water ports, Navi Mumbai Airport and stable industrial power.'),
    iconName: 'Building2',
  },
  {
    id: 'digitisation',
    title: text('वाढते डिजिटायझेशन व पारदर्शक सेवा', 'बढ़ता डिजिटलीकरण और पारदर्शी सेवाएं', 'Growing Digitisation & Transparent Services'),
    body: text('MAITRI 2.0 सिंगल विंडो, आपले सरकार आणि एमआयडीसी जीआयएस पोर्टलद्वारे सर्व उद्योग सेवा ऑनलाइन उपलब्ध.', 'MAITRI 2.0 सिंगल विंडो, आपले सरकार और एमआईडीसी जीआईएस से सभी औद्योगिक सेवाएं ऑनलाइन।', 'Over 120 clearances on MAITRI 2.0, GIS-mapped land allocations and paperless investor services.'),
    iconName: 'Globe2',
  },
];

export const FOCUS_SECTORS = [
  { name: text('अंतराळ व संरक्षण', 'अंतरिक्ष और रक्षा', 'Aerospace & Defence'), iconName: 'Shield', code: 'AERO' },
  { name: text('वाहन उद्योग व ई-मोबिलिटी', 'ऑटोमोबाइल और ईवी', 'Automobiles & EV'), iconName: 'Car', code: 'AUTO' },
  { name: text('रसायने व पेट्रोकेमिकल्स', 'रसायन और पेट्रोकेमिकल', 'Chemicals & Petrochemicals'), iconName: 'FlaskConical', code: 'CHEM' },
  { name: text('इलेक्ट्रॉनिक्स व सेमीकंडक्टर', 'इलेक्ट्रॉनिक्स और सेमीकंडक्टर', 'Electronics & Hardware'), iconName: 'Cpu', code: 'ELEC' },
  { name: text('अन्न प्रक्रिया व कृषी उद्योग', 'खाद्य प्रसंस्करण व कृषि', 'Food Processing & Agro'), iconName: 'Apple', code: 'FOOD' },
  { name: text('रत्ने व दागिने', 'रत्न और आभूषण', 'Gems & Jewellery'), iconName: 'Gem', code: 'GEMS' },
  { name: text('माहिती तंत्रज्ञान व डेटा सेंटर्स', 'सूचना प्रौद्योगिकी व डेटा सेंटर', 'Information Technology & Data Centers'), iconName: 'Laptop', code: 'IT' },
  { name: text('चामडे व पादत्राणे', 'चमड़ा और जूते', 'Leather & Footwear'), iconName: 'Footprints', code: 'LEATH' },
  { name: text('तेल व नैसर्गिक वायू', 'तेल और प्राकृतिक गैस', 'Oil & Gas'), iconName: 'Fuel', code: 'OIL' },
  { name: text('औषधनिर्माण व बायोटेक', 'औषधि निर्माण व बायोटेक', 'Pharmaceuticals & Biotech'), iconName: 'Pill', code: 'PHARMA' },
  { name: text('वस्त्रोद्योग व टेक्निकल टेक्सटाईल', 'वस्त्र और तकनीकी वस्त्र', 'Textiles & Technical Fabrics'), iconName: 'Shirt', code: 'TEXT' },
  { name: text('खेळणी व हलकी अभियांत्रिकी', 'खिलौने और इंजीनियरिंग', 'Toys & Light Engineering'), iconName: 'Gamepad2', code: 'TOYS' },
];

export const INDUSTRIAL_REGIONS = [
  { name: text('मुंबई–ठाणे–रायगड कॉरिडोअर', 'मुंबई–ठाणे–रायगढ़ गलियारा', 'Mumbai–Thane–Raigad Coastal Corridor'), focus: text('वित्तीय सेवा, पोर्ट लॉजिस्टिक्स, आयटी व केमिकल्स', 'वित्तीय सेवाएं, लॉजिस्टिक्स, आईटी और रसायन', 'Financial services, maritime ports, IT & chemicals') },
  { name: text('पुणे–चाकण–तळेगाव–सातारा', 'पुणे–चाकण–तलेगांव–सातारा', 'Pune–Chakan–Talegaon–Satara Industrial Belt'), focus: text('ऑटोमोबाईल, इलेक्ट्रॉनिक्स, अवजड अभियांत्रिकी व संरक्षण', 'ऑटोमोबाइल, इलेक्ट्रॉनिक्स, इंजीनियरिंग और रक्षा', 'Automotive, electronics, heavy engineering & aerospace') },
  { name: text('नाशिक–मालेगाव–अहिल्यानगर', 'नाशिक–मालेगांव–अहिल्यानगर', 'Nashik–Malegaon–Ahilyanagar Triangle'), focus: text('इलेक्ट्रिकल, डिफेन्स मॅन्युफॅक्चरिंग, फूड प्रोसेसिंग व वस्त्र', 'इलेक्ट्रिकल, रक्षा निर्माण, खाद्य प्रसंस्करण और वस्त्र', 'Electrical equipment, defence manufacturing, agro & textiles') },
  { name: text('छत्रपती संभाजीनगर–जालना', 'छत्रपति संभाजीनगर–जालना', 'Chhatrapati Sambhajinagar–Jalna Hub'), focus: text('ऑटो घटक, औषधनिर्माण, पोलाद व सीड कॅपिटल', 'ऑटो पार्ट्स, औषधि निर्माण, इस्पात और बीज उद्योग', 'Auto components, pharma, steel & agro seeds') },
  { name: text('नागपूर–अमरावती–वर्धा (विदर्भ)', 'नागपुर–अमरावती–वर्धा (विदर्भ)', 'Nagpur–Amravati–Wardha (MIHAN & Multi-modal)'), focus: text('कार्गो लॉजिस्टिक्स, एव्हिएशन, टेक्सटाईल व संरक्षण', 'लॉजिस्टिक्स, विमानन, वस्त्र और रक्षा विनिर्माण', 'Cargo aviation, multi-modal logistics, textiles & defence') },
];

export const INFRASTRUCTURE_CATEGORIES = [
  { name: text('अखंड वीज पुरवठा (Power)', 'निर्बाध बिजली आपूर्ति (Power)', 'Industrial Power Grid'), iconName: 'Zap', desc: text('समर्पित सबस्टेशन्स व उच्च दाबाची औद्योगिक वीज वाहिन्या.', 'समर्पित सबस्टेशन और उच्च वोल्टेज औद्योगिक बिजली लाइनें।', 'Dedicated industrial feeders, substations & renewable grid access.') },
  { name: text('औद्योगिक पाणी (Water Supply)', 'औद्योगिक जल आपूर्ति (Water)', 'Bulk Industrial Water'), iconName: 'Droplet', desc: text('एमआयडीसी धरणांमधून थेट व जलद पाणी पुरवठा जाळे.', 'एमआईडीसी बांधों से सीधे औद्योगिक जल आपूर्ति नेटवर्क।', 'Dedicated industrial raw and treated water distribution networks.') },
  { name: text('महामार्ग जोडणी (Roads & Highways)', 'सड़क व राजमार्ग संपर्क (Roads)', 'Expressways & Roads'), iconName: 'Route', desc: text('समृद्धी महामार्ग, राष्ट्रीय महामार्ग व चौपदरी अंतर्गत रस्ते.', 'समृद्धि महामार्ग, राष्ट्रीय राजमार्ग और चौड़े आंतरिक मार्ग।', 'Expressways, four-lane internal MIDC roads and freight corridors.') },
  { name: text('सागरी बंदरे (Deep-water Ports)', 'गहरे समुद्री बंदरगाह (Ports)', 'Maritime Ports'), iconName: 'Anchor', desc: text('JNPA (न्हावा शेवा) व नियोजित वाढवण ग्रीनफिल्ड बंदर.', 'जेएनपीए (न्हावा शेवा) और प्रस्तावित वाढवण बंदरगाह।', 'Container freight at JNPA and greenfield Vadhavan deep-sea port.') },
  { name: text('आंतरराष्ट्रीय विमानतळ (Airports)', 'अंतरराष्ट्रीय हवाई अड्डे (Airports)', 'Air Cargo & Airports'), iconName: 'Plane', desc: text('नवी मुंबई आंतरराष्ट्रीय विमानतळ, मुंबई व नागपूर MIHAN कार्गो.', 'नवी मुंबई हवाई अड्डा, मुंबई और नागपुर मिहान कार्गो हब।', 'Direct air cargo at Mumbai, Navi Mumbai international and Nagpur.') },
  { name: text('रेल्वे फ्रेट कॉरिडोअर (Railways)', 'रेलवे फ्रेट कॉरिडोर (Railways)', 'Rail Freight Networks'), iconName: 'Train', desc: text('समर्पित वेस्टर्न डेडिकेटेड फ्रेट कॉरिडोअर (DFC).', 'वेस्टर्न डेडिकेटेड फ्रेट कॉरिडोर (DFC) कनेक्टिविटी।', 'Direct rail sidings connected to Western Dedicated Freight Corridor.') },
  { name: text('नैसर्गिक वायू (Natural Gas)', 'प्राकृतिक गैस (Gas Grid)', 'City Gas Distribution'), iconName: 'Flame', desc: text('प्रमुख औद्योगिक वसाहतींमध्ये पाईपद्वारे पीएनजी/सीएनजी पुरवठा.', 'प्रमुख औद्योगिक क्षेत्रों में पाइपलाइन से पीएनजी/सीएनजी आपूर्ति।', 'Piped industrial natural gas (PNG) grid across key MIDC estates.') },
  { name: text('अग्निसुरक्षा सेवा (Fire Services)', 'अग्नि सुरक्षा सेवाएं (Fire Stations)', 'Industrial Fire Safety'), iconName: 'ShieldAlert', desc: text('MIDC चे सुसज्ज अग्निशामक केंद्र व आपत्कालीन व्यवस्था.', 'एमआईडीसी के सुसज्जित अग्निशमन केंद्र और आपातकालीन सेवाएं।', 'Dedicated emergency response fire stations within MIDC complexes.') },
  { name: text('प्लग-अँड-प्ले शेड्स (Plug-and-Play)', 'प्लग-एंड-प्ले सुविधाएं (Ready Sheds)', 'Ready Plug-and-Play Units'), iconName: 'Building2', desc: text('तात्काळ सुरू करता येण्याजोगे तयार शेड्स व औद्योगिक इमारती.', 'तत्काल संचालन योग्य तैयार शेड्स और औद्योगिक इकाइयां।', 'Ready-built industrial sheds with utility tie-ins for rapid launch.') },
];

export const MARKET_CATEGORIES = [
  text('उत्पादक (Manufacturer)', 'निर्माता (Manufacturer)', 'Manufacturer'),
  text('पुरवठादार (Supplier)', 'आपूर्तिकर्ता (Supplier)', 'Supplier'),
  text('सेवा प्रदाता (Service Provider)', 'सेवा प्रदाता (Service Provider)', 'Service Provider'),
  text('औद्योगिक संघटना (Industry Association)', 'औद्योगिक संगठन (Industry Association)', 'Industry Association'),
];
