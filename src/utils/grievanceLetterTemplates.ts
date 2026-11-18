import type { GrievanceCategory } from '../types';

export type LetterLanguage = 'mr' | 'en';

export type RecipientAuthorityKey =
  | 'midc'
  | 'msedcl'
  | 'mpcb'
  | 'municipal'
  | 'dic'
  | 'dish'
  | 'other';

export const MARATHI_TO_ENGLISH_DISTRICTS: Record<string, string> = {
  'पुणे': 'Pune',
  'छत्रपती संभाजीनगर (औरंगाबाद)': 'Chhatrapati Sambhajinagar',
  'छत्रपती संभाजीनगर': 'Chhatrapati Sambhajinagar',
  'औरंगाबाद': 'Aurangabad',
  'नागपूर': 'Nagpur',
  'नाशिक': 'Nashik',
  'ठाणे': 'Thane',
  'मुंबई उपनगर': 'Mumbai Suburban',
  'मुंबई शहर': 'Mumbai City',
  'मुंबई': 'Mumbai',
  'नवी मुंबई / रायगड': 'Navi Mumbai / Raigad',
  'रायगड': 'Raigad',
  'पालघर': 'Palghar',
  'कोल्हापूर': 'Kolhapur',
  'सोलापूर': 'Solapur',
  'सातारा': 'Satara',
  'अहिल्यानगर (अहमदनगर)': 'Ahilyanagar',
  'अहिल्यानगर': 'Ahilyanagar',
  'अहमदनगर': 'Ahmednagar',
  'सांगली': 'Sangli',
  'अमरावती': 'Amravati',
  'रत्नागिरी': 'Ratnagiri',
  'सिंधुदुर्ग': 'Sindhudurg',
  'जळगाव': 'Jalgaon',
  'धुळे': 'Dhule',
  'नांदेड': 'Nanded',
  'चंद्रपूर': 'Chandrapur',
  'यवतमाळ': 'Yavatmal',
  'बुलढाणा': 'Buldhana',
  'जालना': 'Jalna',
  'बीड': 'Beed',
  'लातूर': 'Latur',
  'धाराशिव (उस्मानाबाद)': 'Dharashiv',
  'धाराशिव': 'Dharashiv',
  'उस्मानाबाद': 'Osmanabad',
  'परभणी': 'Parbhani',
  'हिंगोली': 'Hingoli',
  'वर्धा': 'Wardha',
  'भंडारा': 'Bhandara',
  'गोंदिया': 'Gondia',
  'गडचिरोली': 'Gadchiroli',
  'नंदुरबार': 'Nandurbar',
  'वाशीम': 'Washim',
  'वाशिम': 'Washim',
  'अकोला': 'Akola',
};

export interface RecipientAuthorityOption {
  key: RecipientAuthorityKey;
  label: { mr: string; en: string };
  defaultDesignation: { mr: string; en: string };
  defaultDepartment: { mr: string; en: string };
  defaultOffice: { mr: string; en: string };
  getDefaultAddress: (district: string, lang: LetterLanguage) => string;
}

export const RECIPIENT_AUTHORITY_OPTIONS: RecipientAuthorityOption[] = [
  {
    key: 'midc',
    label: {
      mr: 'महाराष्ट्र औद्योगिक विकास महामंडळ (MIDC)',
      en: 'Maharashtra Industrial Development Corporation (MIDC)',
    },
    defaultDesignation: {
      mr: 'मा. प्रादेशिक अधिकारी / कार्यकारी अभियंता',
      en: 'The Regional Officer / Executive Engineer',
    },
    defaultDepartment: {
      mr: 'महाराष्ट्र औद्योगिक विकास महामंडळ (MIDC)',
      en: 'Maharashtra Industrial Development Corporation (MIDC)',
    },
    defaultOffice: {
      mr: 'प्रादेशिक व स्थापत्य अभियांत्रिकी कार्यालय',
      en: 'Regional & Civil Engineering Division',
    },
    getDefaultAddress: (district: string, lang: LetterLanguage) => {
      const d = formatDistrictName(district, lang);
      return lang === 'mr' ? `MIDC प्रादेशिक कार्यालय, ${d}` : `MIDC Regional Office, ${d}`;
    },
  },
  {
    key: 'msedcl',
    label: {
      mr: 'महावितरण (MSEDCL) — वीज वितरण प्राधिकरण',
      en: 'MSEDCL — Electricity Distribution Authority',
    },
    defaultDesignation: {
      mr: 'मा. अधीक्षक अभियंता / कार्यकारी अभियंता',
      en: 'The Superintending Engineer / Executive Engineer',
    },
    defaultDepartment: {
      mr: 'महाराष्ट्र राज्य विद्युत वितरण कंपनी मर्यादित (महावितरण / MSEDCL)',
      en: 'Maharashtra State Electricity Distribution Co. Ltd. (MSEDCL)',
    },
    defaultOffice: {
      mr: 'औद्योगिक वीज वितरण मंडळ / विभाग कार्यालय',
      en: 'Industrial Distribution Division / Circle Office',
    },
    getDefaultAddress: (district: string, lang: LetterLanguage) => {
      const d = formatDistrictName(district, lang);
      return lang === 'mr'
        ? `विद्युत भवन, औद्योगिक वीज कक्ष, ${d}`
        : `Vidyut Bhavan, Industrial Division, ${d}`;
    },
  },
  {
    key: 'mpcb',
    label: {
      mr: 'महाराष्ट्र प्रदूषण नियंत्रण मंडळ (MPCB)',
      en: 'Maharashtra Pollution Control Board (MPCB)',
    },
    defaultDesignation: {
      mr: 'मा. प्रादेशिक अधिकारी / उप-प्रादेशिक अधिकारी',
      en: 'The Regional Officer / Sub-Regional Officer',
    },
    defaultDepartment: {
      mr: 'महाराष्ट्र प्रदूषण नियंत्रण मंडळ (MPCB)',
      en: 'Maharashtra Pollution Control Board (MPCB)',
    },
    defaultOffice: {
      mr: 'प्रादेशिक पर्यावरण संवर्धन कार्यालय',
      en: 'Regional Environmental Office',
    },
    getDefaultAddress: (district: string, lang: LetterLanguage) => {
      const d = formatDistrictName(district, lang);
      return lang === 'mr'
        ? `MPCB प्रादेशिक कार्यालय, उद्योग भवन, ${d}`
        : `MPCB Regional Office, Udyog Bhavan, ${d}`;
    },
  },
  {
    key: 'municipal',
    label: {
      mr: 'स्थानिक महानगरपालिका / नगरपरिषद प्रशासन',
      en: 'Local Municipal Corporation / Council',
    },
    defaultDesignation: {
      mr: 'मा. आयुक्त / मुख्य अधिकारी',
      en: 'The Municipal Commissioner / Chief Officer',
    },
    defaultDepartment: {
      mr: 'स्थानिक महानगरपालिका / नगरपरिषद',
      en: 'Concerned Municipal Corporation / Municipal Council',
    },
    defaultOffice: {
      mr: 'शहर विकास व औद्योगिक पायाभूत सुविधा कक्ष',
      en: 'City Engineering & Civic Services Division',
    },
    getDefaultAddress: (district: string, lang: LetterLanguage) => {
      const d = formatDistrictName(district, lang);
      return lang === 'mr'
        ? `मुख्य प्रशासकीय इमारत, ${d}`
        : `Municipal Headquarters, ${d}`;
    },
  },
  {
    key: 'dic',
    label: {
      mr: 'उद्योग संचालनालय / जिल्हा उद्योग केंद्र (DIC)',
      en: 'District Industries Centre (DIC) / Directorate of Industries',
    },
    defaultDesignation: {
      mr: 'मा. महाव्यवस्थापक / उद्योग उपसंचालक',
      en: 'The General Manager / Joint Director of Industries',
    },
    defaultDepartment: {
      mr: 'जिल्हा उद्योग केंद्र (DIC), उद्योग संचालनालय',
      en: 'District Industries Centre (DIC), Directorate of Industries',
    },
    defaultOffice: {
      mr: 'उद्योग तक्रार निवारण व संवर्धन कक्ष',
      en: 'Industrial Facilitation & Grievance Redressal Cell',
    },
    getDefaultAddress: (district: string, lang: LetterLanguage) => {
      const d = formatDistrictName(district, lang);
      return lang === 'mr'
        ? `जिल्हा उद्योग केंद्र, प्रशासकीय संकुल, ${d}`
        : `District Industries Centre, Administrative Complex, ${d}`;
    },
  },
  {
    key: 'dish',
    label: {
      mr: 'औद्योगिक सुरक्षा व आरोग्य संचालनालय (DISH)',
      en: 'Directorate of Industrial Safety & Health (DISH)',
    },
    defaultDesignation: {
      mr: 'मा. सह संचालक / उप संचालक',
      en: 'The Joint Director / Deputy Director',
    },
    defaultDepartment: {
      mr: 'औद्योगिक सुरक्षा व आरोग्य संचालनालय (DISH)',
      en: 'Directorate of Industrial Safety and Health (DISH)',
    },
    defaultOffice: {
      mr: 'विभागीय कारखाना तपासणी कार्यालय',
      en: 'Divisional Safety Inspection Office',
    },
    getDefaultAddress: (district: string, lang: LetterLanguage) => {
      const d = formatDistrictName(district, lang);
      return lang === 'mr'
        ? `DISH विभागीय कार्यालय, ${d}`
        : `DISH Divisional Office, ${d}`;
    },
  },
  {
    key: 'other',
    label: {
      mr: 'इतर संबंधित सक्षम प्राधिकरण (Other)',
      en: 'Other Relevant Department / Authority',
    },
    defaultDesignation: {
      mr: 'मा. संबंधित सक्षम अधिकारी',
      en: 'The Concerned Competent Officer',
    },
    defaultDepartment: {
      mr: 'संबंधित प्रशासकीय / औद्योगिक विभाग',
      en: 'Concerned Government / Regulatory Authority',
    },
    defaultOffice: {
      mr: 'सक्षम औद्योगिक समन्वय कार्यालय',
      en: 'Office of the Competent Authority',
    },
    getDefaultAddress: (district: string, lang: LetterLanguage) => {
      const d = formatDistrictName(district, lang);
      return lang === 'mr'
        ? `संबंधित प्रशासकीय कार्यालय, ${d}`
        : `Concerned Administrative Office, ${d}`;
    },
  },
];

export interface GrievanceLetterFormData {
  businessName: string;
  contactPerson: string;
  designation: string;
  email: string;
  phone: string;
  district: string;
  industryType: string;
  locationArea: string;
  category: GrievanceCategory;
  subject: string;
  departmentCategory: string;
  incidentPeriod?: string;
  description: string;
  files: { name: string; size: number }[];
  referenceId: string;
}

export interface EditableLetterFields {
  recipientDesignation: string;
  recipientDepartment: string;
  recipientOffice: string;
  recipientAddress: string;
  subject: string;
  bodyParagraph1: string;
  bodyParagraph2: string;
  bodyParagraph3: string;
  signatoryName: string;
  signatoryDesignation: string;
  signatoryCompany: string;
  signatoryContact: string;
}

export interface GeneratedApplicationLetter {
  language: LetterLanguage;
  referenceId: string;
  date: string;
  portalHeader: string;
  portalSubHeader: string;
  recipientBlock: string[];
  subjectLine: string;
  referenceLine?: string;
  salutation: string;
  bodyParagraphs: string[];
  closingSalutation: string;
  signatory: {
    name: string;
    designation: string;
    company: string;
    contact: string;
  };
  enclosures: string[];
  footerDisclaimer: string;
}

/**
 * Cleanly formats district name based on language to avoid mixing scripts.
 */
export function formatDistrictName(district: string, lang: LetterLanguage): string {
  if (!district) return lang === 'mr' ? 'महाराष्ट्र' : 'Maharashtra';
  const trimmed = district.trim();

  if (lang === 'en') {
    if (MARATHI_TO_ENGLISH_DISTRICTS[trimmed]) {
      return MARATHI_TO_ENGLISH_DISTRICTS[trimmed];
    }
    // Check if contains a known district key
    for (const [mr, en] of Object.entries(MARATHI_TO_ENGLISH_DISTRICTS)) {
      if (trimmed.includes(mr)) {
        return en;
      }
    }
    return trimmed;
  }

  // Marathi
  return trimmed;
}

/**
 * Cleanly formats location and avoids duplicating district name if already present.
 */
export function formatCleanLocation(locationArea: string, district: string, lang: LetterLanguage): string {
  const cleanDistrict = formatDistrictName(district, lang);
  if (!locationArea) return cleanDistrict;

  const loc = locationArea.trim();
  const lowerLoc = loc.toLowerCase();
  const lowerDist = cleanDistrict.toLowerCase();

  // If locationArea already includes the district name, avoid repeating it
  if (lowerLoc.includes(lowerDist)) {
    return loc;
  }

  return `${loc}, ${cleanDistrict}`;
}

export function getDefaultRecipientKeyForCategory(category: GrievanceCategory): RecipientAuthorityKey {
  switch (category) {
    case 'electricity_utilities':
      return 'msedcl';
    case 'midc_infrastructure':
    case 'roads_transport':
    case 'industrial_services':
      return 'midc';
    case 'permissions_approvals':
      return 'dic';
    case 'other':
    default:
      return 'other';
  }
}

export function formatLetterDate(date: Date = new Date(), lang: LetterLanguage = 'mr'): string {
  if (lang === 'mr') {
    const marathiMonths = [
      'जानेवारी',
      'फेब्रुवारी',
      'मार्च',
      'एप्रिल',
      'मे',
      'जून',
      'जुलै',
      'ऑगस्ट',
      'सप्टेंबर',
      'ऑक्टोबर',
      'नोव्हेंबर',
      'डिसेंबर',
    ];
    return `${date.getDate()} ${marathiMonths[date.getMonth()]} ${date.getFullYear()}`;
  }

  const enMonths = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  return `${date.getDate()} ${enMonths[date.getMonth()]} ${date.getFullYear()}`;
}

/**
 * Builds the neat, clean, human-like formal letter fields.
 */
export function buildInitialLetterFields(
  formData: GrievanceLetterFormData,
  lang: LetterLanguage,
  recipientKey: RecipientAuthorityKey = getDefaultRecipientKeyForCategory(formData.category)
): EditableLetterFields {
  const auth =
    RECIPIENT_AUTHORITY_OPTIONS.find((a) => a.key === recipientKey) ||
    RECIPIENT_AUTHORITY_OPTIONS[RECIPIENT_AUTHORITY_OPTIONS.length - 1];

  const recipientDesignation = auth.defaultDesignation[lang];
  const recipientDepartment = auth.defaultDepartment[lang];
  const recipientOffice = auth.defaultOffice[lang];
  const recipientAddress = auth.getDefaultAddress(formData.district || 'पुणे', lang);

  const cleanLoc = formatCleanLocation(formData.locationArea, formData.district, lang);
  const company = formData.businessName.trim() || (lang === 'mr' ? 'आमची औद्योगिक आस्थापना' : 'our industrial enterprise');
  const contactName = formData.contactPerson.trim() || (lang === 'mr' ? 'अधिकृत प्रतिनिधी' : 'Authorized Signatory');
  const designation = formData.designation.trim() || (lang === 'mr' ? 'अधिकृत संचालक / प्रतिनिधी' : 'Authorized Representative');
  const rawSubject = formData.subject.trim() || (lang === 'mr' ? 'औद्योगिक अडचण निवारण' : 'Industrial Grievance Redressal');
  const userDesc = formData.description.trim();
  const period = formData.incidentPeriod?.trim();

  if (lang === 'mr') {
    // Clean subject in Marathi
    const subject = rawSubject.endsWith('बाबत') || rawSubject.endsWith('बाबत.')
      ? rawSubject
      : `${rawSubject} — सविनय तक्रार अर्ज बाबत.`;

    // Paragraph 1: Introduction of enterprise & location
    const sectorText = formData.industryType ? `${formData.industryType.trim()} या` : 'उत्पादन';
    const bodyParagraph1 = `आम्ही, मे. ${company}, ${cleanLoc} येथे कार्यरत असलेला औद्योगिक घटक असून, ${sectorText} क्षेत्रात कार्यरत आहोत.`;

    // Paragraph 2: Core grievance description + period + impact
    const periodText = period ? ` सदर समस्या ${period} पासून सातत्याने भेडसावत आहे.` : '';
    const bodyParagraph2 = `या अर्जाद्वारे आम्ही आपल्या कार्यालयाच्या निदर्शनास आणू इच्छितो की, ${userDesc}.${periodText} या अडचणीमुळे आमच्या दैनंदिन उत्पादन चक्रात मोठा व्यत्यय येत असून, कामगारांचा वेळ वाया जाणे, ग्राहकांचे पुरवठा आदेश रखडणे आणि आस्थापनेचे मोठे आर्थिक नुकसान होत आहे.`;

    // Paragraph 3: Requested action
    const bodyParagraph3 = `तरी उपरोक्त परिस्थितीचे गांभीर्य लक्षात घेऊन, आपल्या कार्यालयामार्फत तातडीने प्रत्यक्ष स्थळपाहणी करण्यात यावी आणि सदर समस्येचे कायमस्वरूपी निवारण करण्यासाठी आवश्यक ती योग्य कार्यवाही लवकरात लवकर करावी, ही नम्र विनंती.`;

    return {
      recipientDesignation,
      recipientDepartment,
      recipientOffice,
      recipientAddress,
      subject,
      bodyParagraph1,
      bodyParagraph2,
      bodyParagraph3,
      signatoryName: contactName,
      signatoryDesignation: designation,
      signatoryCompany: company,
      signatoryContact: `मोबाईल: ${formData.phone || '—'} | ईमेल: ${formData.email || '—'}`,
    };
  }

  // English Letter Content
  const subject = rawSubject.toLowerCase().endsWith('reg.') || rawSubject.toLowerCase().endsWith('reg')
    ? rawSubject
    : `Grievance representation regarding ${rawSubject} – Reg.`;

  const sectorText = formData.industryType ? `${formData.industryType.trim()}` : 'manufacturing';
  const bodyParagraph1 = `We, M/s ${company}, are an operational industrial enterprise situated at ${cleanLoc}, engaged in the ${sectorText} sector.`;

  const periodText = period ? ` This situation has been persisting since ${period}.` : '';
  const bodyParagraph2 = `We wish to formally bring to your urgent attention a serious operational grievance concerning our facility. ${userDesc}.${periodText} Due to this ongoing disruption, our scheduled manufacturing operations and plant productivity are facing severe impediments, resulting in unannounced downtime, delayed client delivery schedules, and avoidable financial hardship.`;

  const bodyParagraph3 = `In view of the gravity of the matter, we earnestly request your esteemed office to kindly conduct an immediate on-site inspection and initiate prompt remedial measures to resolve this grievance at the earliest.`;

  return {
    recipientDesignation,
    recipientDepartment,
    recipientOffice,
    recipientAddress,
    subject,
    bodyParagraph1,
    bodyParagraph2,
    bodyParagraph3,
    signatoryName: contactName,
    signatoryDesignation: designation,
    signatoryCompany: company,
    signatoryContact: `Mobile: ${formData.phone || '—'} | Email: ${formData.email || '—'}`,
  };
}

/**
 * Builds the neat, elegant, cohesive formal letter document.
 */
export function buildGeneratedLetter(
  formData: GrievanceLetterFormData,
  fields: EditableLetterFields,
  lang: LetterLanguage,
  date: Date = new Date()
): GeneratedApplicationLetter {
  const isMarathi = lang === 'mr';
  const formattedDate = formatLetterDate(date, lang);

  // Enclosures list from uploaded files
  let enclosures: string[] = [];
  if (formData.files && formData.files.length > 0) {
    enclosures = formData.files.map((f, i) => {
      const sizeKb = Math.round(f.size / 1024);
      return `${i + 1}. ${f.name} (${sizeKb} KB)`;
    });
  } else {
    enclosures = [
      isMarathi
        ? '१. स्थळपाहणी व आवश्यकतेनुसार पूरक तांत्रिक कागदपत्रे / पुरावे समक्ष सादर केले जातील.'
        : '1. Relevant photographic records and logs will be submitted during on-site inspection.',
    ];
  }

  const recipientBlock = [
    isMarathi ? 'प्रति,' : 'To,',
    fields.recipientDesignation,
    fields.recipientDepartment,
    fields.recipientOffice,
    fields.recipientAddress,
  ].filter(Boolean);

  const cleanLoc = formatCleanLocation(formData.locationArea, formData.district, lang);
  const referenceLine = isMarathi
    ? `संदर्भ: औद्योगिक घटक — ${fields.signatoryCompany} (${cleanLoc}) | अर्ज संदर्भ: ${formData.referenceId}`
    : `Reference: Industrial Unit — M/s ${fields.signatoryCompany} (${cleanLoc}) | Ref: ${formData.referenceId}`;

  const bodyParagraphs = [
    fields.bodyParagraph1,
    fields.bodyParagraph2,
    fields.bodyParagraph3,
  ].filter(Boolean);

  return {
    language: lang,
    referenceId: formData.referenceId,
    date: formattedDate,
    portalHeader: 'BJP UDYOG SETU • MAHARASHTRA INDUSTRIAL FACILITATION',
    portalSubHeader: isMarathi
      ? 'औद्योगिक अडचण निवारण व समन्वय कक्ष — अधिकृत सादरीकरण मसुदा'
      : 'Industry Grievance Redressal & Facilitation Desk — Official Representation Draft',
    recipientBlock,
    subjectLine: isMarathi ? `विषय: ${fields.subject}` : `Subject: ${fields.subject}`,
    referenceLine,
    salutation: isMarathi ? 'महोदय / महोदया,' : 'Respected Sir / Madam,',
    bodyParagraphs,
    closingSalutation: isMarathi ? 'सस्नेह धन्यवाद,' : 'Thanking you,',
    signatory: {
      name: fields.signatoryName,
      designation: fields.signatoryDesignation,
      company: fields.signatoryCompany,
      contact: fields.signatoryContact,
    },
    enclosures,
    footerDisclaimer: isMarathi
      ? 'नोंद: हे पत्र उद्योग सेतू मंचावरून तयार केलेला अधिकृत मसुदा (Draft) असून, उद्योजकाने ते तपासून संबंधित शासकीय / MIDC प्राधिकरणाकडे प्रत्यक्ष किंवा अधिकृत पोर्टलद्वारे सादर करावे.'
      : 'Note: This application letter is an official draft generated on BJP Udyog Setu for review and submission to the competent authority through official departmental channels.',
  };
}
