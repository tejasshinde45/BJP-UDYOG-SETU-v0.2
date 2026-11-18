import type { GrievanceCategory } from '../types';
import type { LetterLanguage } from './grievanceLetterTemplates';
import { MARATHI_TO_ENGLISH_DISTRICTS } from './grievanceLetterTemplates';

/**
 * Checks if the text is predominantly Devanagari (Marathi/Hindi).
 */
export function isDevanagariText(text: string): boolean {
  if (!text) return false;
  const devMatches = text.match(/[\u0900-\u097F]/g) || [];
  const latMatches = text.match(/[a-zA-Z]/g) || [];
  return devMatches.length > latMatches.length;
}

// -------------------------------------------------------------
// 1. DISTRICTS BIDIRECTIONAL MAPPING
// -------------------------------------------------------------

export const ENGLISH_TO_MARATHI_DISTRICTS: Record<string, string> = {
  pune: 'पुणे',
  mumbai: 'मुंबई',
  'mumbai city': 'मुंबई शहर',
  'mumbai suburban': 'मुंबई उपनगर',
  'navi mumbai': 'नवी मुंबई',
  thane: 'ठाणे',
  palghar: 'पालघर',
  raigad: 'रायगड',
  nashik: 'नाशिक',
  ahilyanagar: 'अहिल्यानगर',
  ahmednagar: 'अहिल्यानगर',
  jalgaon: 'जळगाव',
  dhule: 'धुळे',
  nandurbar: 'नंदुरबार',
  'chhatrapati sambhajinagar': 'छत्रपती संभाजीनगर',
  aurangabad: 'छत्रपती संभाजीनगर',
  jalna: 'जालना',
  beed: 'बीड',
  latur: 'लातूर',
  dharashiv: 'धाराशिव',
  osmanabad: 'धाराशिव',
  nanded: 'नांदेड',
  parbhani: 'परभणी',
  hingoli: 'हिंगोली',
  kolhapur: 'कोल्हापूर',
  solapur: 'सोलापूर',
  sangli: 'सांगली',
  satara: 'सातारा',
  ratnagiri: 'रत्नागिरी',
  sindhudurg: 'सिंधुदुर्ग',
  nagpur: 'नागपूर',
  wardha: 'वर्धा',
  bhandara: 'भंडारा',
  gondia: 'गोंदिया',
  chandrapur: 'चंद्रपूर',
  gadchiroli: 'गडचिरोली',
  amravati: 'अमरावती',
  akola: 'अकोला',
  yavatmal: 'यवतमाळ',
  buldhana: 'बुलढाणा',
  washim: 'वाशीम',
};

export function convertDistrict(district: string, toLang: LetterLanguage): string {
  if (!district) return toLang === 'mr' ? 'महाराष्ट्र' : 'Maharashtra';
  const clean = district.trim();
  const lower = clean.toLowerCase();

  if (toLang === 'en') {
    if (MARATHI_TO_ENGLISH_DISTRICTS[clean]) {
      return MARATHI_TO_ENGLISH_DISTRICTS[clean];
    }
    for (const [mr, en] of Object.entries(MARATHI_TO_ENGLISH_DISTRICTS)) {
      if (clean.includes(mr)) return en;
    }
    return clean;
  }

  // To Marathi
  if (ENGLISH_TO_MARATHI_DISTRICTS[lower]) {
    return ENGLISH_TO_MARATHI_DISTRICTS[lower];
  }
  for (const [en, mr] of Object.entries(ENGLISH_TO_MARATHI_DISTRICTS)) {
    if (lower.includes(en)) return mr;
  }
  return clean;
}

// -------------------------------------------------------------
// 2. DESIGNATIONS BIDIRECTIONAL MAPPING
// -------------------------------------------------------------

export const DESIGNATIONS: Array<{ en: string; mr: string; aliases: string[] }> = [
  {
    en: 'Managing Director',
    mr: 'व्यवस्थापकीय संचालक',
    aliases: ['md', 'managing director', 'व्यवस्थापकीय संचालक'],
  },
  {
    en: 'Director',
    mr: 'संचालक',
    aliases: ['director', 'संचालक'],
  },
  {
    en: 'Partner',
    mr: 'भागीदार (पार्टनर)',
    aliases: ['partner', 'भागीदार', 'पार्टनर'],
  },
  {
    en: 'Proprietor',
    mr: 'प्रोप्रायटर / मालक',
    aliases: ['proprietor', 'prop.', 'प्रोप्रायटर', 'मालक'],
  },
  {
    en: 'Plant Head',
    mr: 'प्लांट प्रमुख',
    aliases: ['plant head', 'प्लांट प्रमुख', 'प्लॅन्ट हेड'],
  },
  {
    en: 'Factory Manager',
    mr: 'कारखाना व्यवस्थापक',
    aliases: ['factory manager', 'कारखाना व्यवस्थापक'],
  },
  {
    en: 'General Manager',
    mr: 'महाव्यवस्थापक',
    aliases: ['general manager', 'gm', 'महाव्यवस्थापक'],
  },
  {
    en: 'Operations Head',
    mr: 'ऑपरेशन्स प्रमुख',
    aliases: ['operations head', 'operations manager', 'ऑपरेशन्स प्रमुख'],
  },
  {
    en: 'Authorized Signatory',
    mr: 'अधिकृत स्वाक्षरीकार',
    aliases: ['authorized signatory', 'अधिकृत स्वाक्षरीकार'],
  },
  {
    en: 'Authorized Representative',
    mr: 'अधिकृत प्रतिनिधी',
    aliases: ['authorized representative', 'अधिकृत प्रतिनिधी'],
  },
  {
    en: 'Chief Executive Officer (CEO)',
    mr: 'मुख्य कार्यकारी अधिकारी (CEO)',
    aliases: ['ceo', 'chief executive officer', 'मुख्य कार्यकारी अधिकारी'],
  },
];

export function convertDesignation(designation: string, toLang: LetterLanguage): string {
  if (!designation) {
    return toLang === 'mr' ? 'अधिकृत प्रतिनिधी' : 'Authorized Signatory';
  }
  const clean = designation.trim();
  const lower = clean.toLowerCase();

  for (const item of DESIGNATIONS) {
    if (item.aliases.some((a) => lower === a || lower.includes(a))) {
      return toLang === 'mr' ? item.mr : item.en;
    }
  }

  // If text already matches target script
  if (toLang === 'mr' && isDevanagariText(clean)) return clean;
  if (toLang === 'en' && !isDevanagariText(clean)) return clean;

  return clean;
}

// -------------------------------------------------------------
// 3. SECTOR / INDUSTRY TYPE BIDIRECTIONAL MAPPING
// -------------------------------------------------------------

export const SECTORS: Array<{ en: string; mr: string; aliases: string[] }> = [
  {
    en: 'Precision Engineering',
    mr: 'अचूक अभियांत्रिकी (प्रिसिजन इंजिनिअरिंग)',
    aliases: ['precision engineering', 'precision', 'अचूक अभियांत्रिकी', 'प्रिसिजन इंजिनिअरिंग'],
  },
  {
    en: 'Auto Components Manufacturing',
    mr: 'ऑटो व वाहनांचे सुटे भाग निर्मिती',
    aliases: ['auto components', 'auto component', 'automobile', 'auto', 'ऑटो', 'ऑटोमोबाईल', 'सुटे भाग'],
  },
  {
    en: 'Chemicals & Specialty Chemicals',
    mr: 'रासायनिक व स्पेशालिटी केमिकल्स उद्योग',
    aliases: ['chemical', 'chemicals', 'specialty chemicals', 'रसायन', 'केमिकल्स'],
  },
  {
    en: 'Textiles & Garments',
    mr: 'वस्त्रोद्योग व गारमेंट्स',
    aliases: ['textile', 'textiles', 'garments', 'वस्त्रोद्योग', 'टेक्स्टाईल'],
  },
  {
    en: 'Food Processing',
    mr: 'अन्न प्रक्रिया उद्योग (फूड प्रोसेसिंग)',
    aliases: ['food processing', 'food', 'agro processing', 'अन्न प्रक्रिया'],
  },
  {
    en: 'Forging, Foundry & Metallurgy',
    mr: 'धातूकाम, फोर्जिंग व फाउंड्री उद्योग',
    aliases: ['forging', 'foundry', 'metallurgy', 'metal', 'फोर्जिंग', 'फाउंड्री', 'धातूकाम'],
  },
  {
    en: 'Pharmaceuticals & Healthcare',
    mr: 'औषध निर्माण उद्योग (फार्मास्युटिकल्स)',
    aliases: ['pharmaceuticals', 'pharma', 'healthcare', 'औषध निर्माण', 'फार्मा'],
  },
  {
    en: 'Plastics & Polymers',
    mr: 'प्लास्टिक व पॉलिमर निर्मिती',
    aliases: ['plastics', 'plastic', 'polymers', 'प्लास्टिक'],
  },
  {
    en: 'Electronics & Hardware',
    mr: 'इलेक्ट्रॉनिक्स व हार्डवेअर उत्पादन',
    aliases: ['electronics', 'hardware', 'इलेक्ट्रॉनिक्स'],
  },
  {
    en: 'Electrical Equipment',
    mr: 'विद्युत उपकरणे व साधने निर्मिती',
    aliases: ['electrical', 'electricals', 'विद्युत'],
  },
  {
    en: 'Logistics & Warehousing',
    mr: 'लॉजिस्टिक्स व वेअरहाउसिंग सेवा',
    aliases: ['logistics', 'warehousing', 'लॉजिस्टिक्स', 'गोदाम'],
  },
  {
    en: 'Information Technology (IT / ITES)',
    mr: 'माहिती तंत्रज्ञान (IT / ITES)',
    aliases: ['it', 'software', 'technology', 'माहिती तंत्रज्ञान'],
  },
  {
    en: 'Industrial Packaging',
    mr: 'औद्योगिक पॅकेजिंग उद्योग',
    aliases: ['packaging', 'पॅकेजिंग'],
  },
];

export function convertSector(sector: string, toLang: LetterLanguage): string {
  if (!sector) {
    return toLang === 'mr' ? 'उत्पादन व उद्योग' : 'Manufacturing & Industry';
  }
  const clean = sector.trim();
  const lower = clean.toLowerCase();

  for (const item of SECTORS) {
    if (item.aliases.some((a) => lower === a || lower.includes(a))) {
      return toLang === 'mr' ? item.mr : item.en;
    }
  }

  if (toLang === 'mr' && isDevanagariText(clean)) return clean;
  if (toLang === 'en' && !isDevanagariText(clean)) return clean;

  return clean;
}

// -------------------------------------------------------------
// 4. COMPANY NAME & PREFIX CONVERSION
// -------------------------------------------------------------

export function convertCompanyName(name: string, toLang: LetterLanguage): string {
  if (!name) return toLang === 'mr' ? 'आमची औद्योगिक आस्थापना' : 'our industrial enterprise';
  let clean = name.trim();

  // Strip existing M/s or मे. to normalize
  clean = clean.replace(/^(M\/s\.?|Messrs|मे\.|मेसर्स)\s*/i, '');

  if (toLang === 'mr') {
    // English company name to Marathi conventions
    let mrName = clean
      .replace(/\bPvt\.?\s*Ltd\.?\b/gi, 'प्रा. लि.')
      .replace(/\bPrivate\s+Limited\b/gi, 'प्रायव्हेट लिमिटेड')
      .replace(/\bLtd\.?\b/gi, 'लि.')
      .replace(/\bLimited\b/gi, 'लिमिटेड')
      .replace(/\bEngineering\b/gi, 'इंजिनिअरिंग')
      .replace(/\bPrecision\b/gi, 'प्रिसिजन')
      .replace(/\bIndustries\b/gi, 'इंडस्ट्रीज')
      .replace(/\bEnterprises\b/gi, 'एंटरप्रायझेस')
      .replace(/\bEnterprise\b/gi, 'एंटरप्राइज')
      .replace(/\bSolutions\b/gi, 'सोल्युशन्स')
      .replace(/\bCorporation\b/gi, 'कॉर्पोरेशन')
      .replace(/\bTech\b/gi, 'टेक')
      .replace(/\bTechnologies\b/gi, 'टेक्नॉलॉजीज')
      .replace(/\bTools\b/gi, 'टूल्स')
      .replace(/\bTooling\b/gi, 'टूलिंग')
      .replace(/\bForgings\b/gi, 'फोर्जिंग्स')
      .replace(/\bAuto\b/gi, 'ऑटो')
      .replace(/\bChemicals\b/gi, 'केमिकल्स');

    return mrName.trim();
  }

  // To English
  let enName = clean
    .replace(/प्रा\.\s*लि\./g, 'Pvt. Ltd.')
    .replace(/प्रायव्हेट\s+लिमिटेड/g, 'Pvt. Ltd.')
    .replace(/लि\./g, 'Ltd.')
    .replace(/लिमिटेड/g, 'Ltd.')
    .replace(/इंजिनिअरिंग/g, 'Engineering')
    .replace(/प्रिसिजन/g, 'Precision')
    .replace(/इंडस्ट्रीज/g, 'Industries')
    .replace(/एंटरप्रायझेस/g, 'Enterprises')
    .replace(/सोल्युशन्स/g, 'Solutions')
    .replace(/कॉर्पोरेशन/g, 'Corporation')
    .replace(/टेक्नॉलॉजीज/g, 'Technologies')
    .replace(/टूल्स/g, 'Tools')
    .replace(/टूलिंग/g, 'Tooling')
    .replace(/फोर्जिंग्स/g, 'Forgings')
    .replace(/ऑटो/g, 'Auto')
    .replace(/केमिकल्स/g, 'Chemicals');

  return enName.trim();
}

// -------------------------------------------------------------
// 5. LOCATION & ADDRESS CONVERSION
// -------------------------------------------------------------

export function convertLocationArea(
  location: string,
  district: string,
  toLang: LetterLanguage
): string {
  const cleanDistrict = convertDistrict(district, toLang);
  if (!location) return cleanDistrict;

  let loc = location.trim();

  if (toLang === 'mr') {
    loc = loc
      .replace(/\bMIDC\b/gi, 'एमआयडीसी')
      .replace(/\bPlot\s*(?:No\.?)?\s*(\d+)/gi, 'प्लॉट क्र. $1')
      .replace(/\bBlock\s*([a-zA-Z0-9]+)/gi, 'ब्लॉक $1')
      .replace(/\bPhase\s*(\d+)/gi, 'टप्पा $1')
      .replace(/\bSector\s*(\d+)/gi, 'सेक्टर $1')
      .replace(/\bIndustrial Area\b/gi, 'औद्योगिक वसाहत')
      .replace(/\bRoad\b/gi, 'रस्ता')
      .replace(/\bPune\b/gi, 'पुणे')
      .replace(/\bThane\b/gi, 'ठाणे')
      .replace(/\bNashik\b/gi, 'नाशिक')
      .replace(/\bNagpur\b/gi, 'नागपूर')
      .replace(/\bBhosari\b/gi, 'भोसरी')
      .replace(/\bChakan\b/gi, 'चाकण')
      .replace(/\bWaluj\b/gi, 'वाळूज')
      .replace(/\bHinjawadi\b/gi, 'हिंजवडी')
      .replace(/\bTalegaon\b/gi, 'तळेगाव')
      .replace(/\bRanjangaon\b/gi, 'रांजणगाव')
      .replace(/\bButibori\b/gi, 'बुटीबोरी')
      .replace(/\bSatpur\b/gi, 'सातपूर')
      .replace(/\bAmbad\b/gi, 'अंबड')
      .replace(/\bShiroli\b/gi, 'शिरोली');
  } else {
    loc = loc
      .replace(/एमआयडीसी/g, 'MIDC')
      .replace(/प्लॉट\s*क्र\.?\s*(\d+)/g, 'Plot $1')
      .replace(/ब्लॉक\s*([a-zA-Z0-9]+)/g, 'Block $1')
      .replace(/टप्पा\s*(\d+)/g, 'Phase $1')
      .replace(/सेक्टर\s*(\d+)/g, 'Sector $1')
      .replace(/औद्योगिक\s*वसाहत/g, 'Industrial Area')
      .replace(/रस्ता/g, 'Road')
      .replace(/पुणे/g, 'Pune')
      .replace(/ठाणे/g, 'Thane')
      .replace(/नाशिक/g, 'Nashik')
      .replace(/नागपूर/g, 'Nagpur')
      .replace(/भोसरी/g, 'Bhosari')
      .replace(/चाकण/g, 'Chakan')
      .replace(/वाळूज/g, 'Waluj')
      .replace(/हिंजवडी/g, 'Hinjawadi')
      .replace(/तळेगाव/g, 'Talegaon')
      .replace(/रांजणगाव/g, 'Ranjangaon')
      .replace(/बुटीबोरी/g, 'Butibori')
      .replace(/सातपूर/g, 'Satpur')
      .replace(/अंबड/g, 'Ambad')
      .replace(/शिरोली/g, 'Shiroli');
  }

  // Deduplicate district if already inside location string
  const lowerLoc = loc.toLowerCase();
  const lowerDist = cleanDistrict.toLowerCase();
  if (lowerLoc.includes(lowerDist)) {
    return loc;
  }

  return `${loc}, ${cleanDistrict}`;
}

// -------------------------------------------------------------
// 6. PERSON NAME CONVERSION
// -------------------------------------------------------------

export function convertPersonName(name: string, toLang: LetterLanguage): string {
  if (!name) return toLang === 'mr' ? 'अधिकृत स्वाक्षरीकार' : 'Authorized Signatory';
  let clean = name.trim();

  // Strip prefixes
  clean = clean.replace(/^(Mr\.?|Shri\.?|Shree\.?|श्री\.?|श्रीमती\.?)\s*/i, '');

  if (toLang === 'mr') {
    // Add respectful Marathi honorific
    return `श्री. ${clean}`;
  }

  return clean;
}

// -------------------------------------------------------------
// 7. TIME PERIOD CONVERSION
// -------------------------------------------------------------

export function convertPeriod(period: string, toLang: LetterLanguage): string {
  if (!period) return '';
  const clean = period.trim();
  const lower = clean.toLowerCase();

  if (toLang === 'mr') {
    if (lower.includes('past three weeks') || lower.includes('3 weeks')) {
      return 'गेल्या ३ आठवड्यांपासून';
    }
    if (lower.includes('past 2 weeks') || lower.includes('two weeks')) {
      return 'गेल्या २ आठवड्यांपासून';
    }
    if (lower.includes('past week') || lower.includes('1 week')) {
      return 'गेल्या एका आठवड्यापासून';
    }
    if (lower.includes('past month') || lower.includes('1 month')) {
      return 'गेल्या महिन्यापासून';
    }
    if (lower.includes('past three months') || lower.includes('3 months')) {
      return 'गेल्या ३ महिन्यांपासून';
    }
    if (lower.includes('few days') || lower.includes('days')) {
      return 'गेल्या काही दिवसांपासून';
    }
    if (lower.includes('current') || lower.includes('ongoing')) {
      return 'सद्यस्थितीत';
    }
    return clean;
  }

  // To English
  if (clean.includes('गेल्या ३ आठवड्यांपासून') || clean.includes('३ आठवडे')) {
    return 'past three weeks';
  }
  if (clean.includes('गेल्या २ आठवड्यांपासून') || clean.includes('२ आठवडे')) {
    return 'past two weeks';
  }
  if (clean.includes('गेल्या महिन्यापासून') || clean.includes('महिना')) {
    return 'past month';
  }
  if (clean.includes('काही दिवसांपासून')) {
    return 'past few days';
  }
  if (clean.includes('सद्यस्थिती')) {
    return 'current period';
  }
  return clean;
}

// -------------------------------------------------------------
// 8. SUBJECT CONVERSION
// -------------------------------------------------------------

export function convertSubject(
  subject: string,
  toLang: LetterLanguage,
  category: GrievanceCategory
): string {
  const clean = (subject || '').trim();
  const isInputDev = isDevanagariText(clean);

  // If already in target language
  if (toLang === 'mr' && isInputDev) {
    return clean.endsWith('बाबत') || clean.endsWith('बाबत.') ? clean : `${clean} — बाबत.`;
  }
  if (toLang === 'en' && !isInputDev && clean.length > 0) {
    const withoutSuffix = clean.replace(/\s*–\s*Reg\.?$/i, '').replace(/\s*-\s*Reg\.?$/i, '');
    return `Grievance representation regarding ${withoutSuffix} – Reg.`;
  }

  // Cross-lingual conversion
  if (toLang === 'mr') {
    // English input -> Marathi output
    const lower = clean.toLowerCase();

    if (lower.includes('water supply') || lower.includes('water disruption')) {
      return 'औद्योगिक पाणीपुरवठ्यातील वारंवार व्यत्यय व टंचाई निवारणाबाबत सविनय तक्रार अर्ज.';
    }
    if (lower.includes('tripping') || lower.includes('power') || lower.includes('electricity') || lower.includes('voltage')) {
      return 'औद्योगिक वीज पुरवठ्यातील वारंवार ट्रिपिंग व व्होल्टेज चढ-उतार निवारणाबाबत तक्रार अर्ज.';
    }
    if (lower.includes('road') || lower.includes('pothole') || lower.includes('culvert') || lower.includes('transport')) {
      return 'औद्योगिक क्षेत्रातील अंतर्गत रस्ते दुरुस्ती, डांबरीकरण व वाहतूक सुरक्षेबाबत अर्ज.';
    }
    if (lower.includes('drain') || lower.includes('drainage') || lower.includes('sewage') || lower.includes('effluent')) {
      return 'औद्योगिक सांडपाणी निचरा व ड्रेनेज वाहिनी दुरुस्तीबाबत सविनय अर्ज.';
    }
    if (lower.includes('noc') || lower.includes('permission') || lower.includes('approval') || lower.includes('clearance')) {
      return 'प्रलंबित औद्योगिक परवानग्या व ना-हरकत (NOC) प्रमाणपत्र तातडीने निर्गमित करण्याबाबत.';
    }
    if (lower.includes('plot') || lower.includes('land') || lower.includes('infrastructure')) {
      return 'MIDC भूखंड पायाभूत सुविधा व नागरी विकास कामे तातडीने पूर्ण करण्याबाबत.';
    }

    // Default category fallback
    switch (category) {
      case 'electricity_utilities':
        return 'औद्योगिक वीज पुरवठ्यातील व्यत्यय व तांत्रिक बिघाड निवारणाबाबत सविनय अर्ज.';
      case 'industrial_services':
        return 'औद्योगिक पाणीपुरवठा व युटिलिटी सेवा अखंडित पूर्ववत करण्याबाबत तक्रार अर्ज.';
      case 'roads_transport':
        return 'औद्योगिक रस्ते दुरुस्ती व अवजड वाहतूक सुलभ करण्याबाबत अर्ज.';
      case 'permissions_approvals':
        return 'प्रलंबित औद्योगिक परवानग्या व शासकीय मंजुरी निर्गमित करण्याबाबत.';
      case 'midc_infrastructure':
      default:
        return 'MIDC औद्योगिक क्षेत्रातील पायाभूत सुविधा समस्या निवारणाबाबत सविनय तक्रार अर्ज.';
    }
  }

  // Marathi input -> English output
  if (clean.includes('पाणी') || clean.includes('जल')) {
    return 'Grievance representation regarding Industrial Water Supply Disruption & Line Rectification – Reg.';
  }
  if (clean.includes('वीज') || clean.includes('विद्युत') || clean.includes('ट्रिपिंग') || clean.includes('फिडर') || clean.includes('व्होल्टेज')) {
    return 'Grievance representation regarding Frequent Power Tripping & Voltage Instability – Reg.';
  }
  if (clean.includes('रस्ते') || clean.includes('वाहतूक') || clean.includes('खड्डे')) {
    return 'Grievance representation regarding Urgent Industrial Estate Road Repair & Transport Safety – Reg.';
  }
  if (clean.includes('सांडपाणी') || clean.includes('ड्रेनेज') || clean.includes('निचरा')) {
    return 'Grievance representation regarding Industrial Drainage Network Blockage & Remediation – Reg.';
  }
  if (clean.includes('परवानगी') || clean.includes('मंजुरी') || clean.includes('ना-हरकत') || clean.includes('NOC')) {
    return 'Formal representation regarding Expeditious Clearance of Industrial NOCs and Permissions – Reg.';
  }

  switch (category) {
    case 'electricity_utilities':
      return 'Grievance representation regarding Industrial Power Supply Outages & Grid Instability – Reg.';
    case 'industrial_services':
      return 'Grievance representation regarding Industrial Water Supply & Civic Utility Disruption – Reg.';
    case 'roads_transport':
      return 'Grievance representation regarding Industrial Estate Road Maintenance & Freight Access – Reg.';
    case 'permissions_approvals':
      return 'Representation regarding Expeditious Sanction of Industrial Approvals & Clearances – Reg.';
    case 'midc_infrastructure':
    default:
      return 'Grievance representation regarding Urgent Redressal of Industrial Infrastructure Bottlenecks – Reg.';
  }
}

// -------------------------------------------------------------
// 9. DESCRIPTION TRANSLATION
// -------------------------------------------------------------

export function convertDescription(
  description: string,
  toLang: LetterLanguage,
  category: GrievanceCategory,
  period?: string
): string {
  const clean = (description || '').trim();
  const isInputDev = isDevanagariText(clean);

  // If already in target language, return as is
  if (toLang === 'mr' && isInputDev) return clean;
  if (toLang === 'en' && !isInputDev && clean.length > 0) return clean;

  const lower = clean.toLowerCase();
  const cleanPeriod = convertPeriod(period || '', toLang);

  if (toLang === 'mr') {
    // English -> Marathi

    // Check water supply pattern (as in user screenshot)
    if (lower.includes('water supply') || lower.includes('water is frequently interrupted') || category === 'industrial_services') {
      const pText = cleanPeriod ? `गेल्या ${cleanPeriod} पासून` : 'गेल्या काही आठवड्यांपासून';
      return `आमच्या औद्योगिक घटकाला ${pText} अनियमित पाणीपुरवठ्याचा सामना करावा लागत आहे. कोणतीही पूर्वसूचना न देता पाणीपुरवठा अचानक खंडित होतो, ज्यामुळे दैनंदिन उत्पादन प्रक्रिया, यंत्रसामग्रीची स्वच्छता आणि इतर आवश्यक औद्योगिक कामांवर विपरीत परिणाम होत आहे. पाण्याच्या अनियमिततेमुळे उत्पादनाचे वेळापत्रक विस्कळीत होऊन उत्पादन खर्च वाढत आहे. तरी संबंधित विभागाने पाणीपुरवठा यंत्रणेची प्रत्यक्ष तपासणी करून, समस्येचे मूळ कारण शोधावे आणि औद्योगिक क्षेत्राला नियमित व अखंडित पाणीपुरवठा त्वरित पूर्ववत करावा`;
    }

    // Check electricity pattern
    if (lower.includes('tripping') || lower.includes('feeder') || lower.includes('voltage') || lower.includes('power') || category === 'electricity_utilities') {
      const pText = cleanPeriod ? `गेल्या ${cleanPeriod} पासून` : 'गेल्या काही दिवसांपासून';
      return `आमच्या औद्योगिक घटकाचा वीज पुरवठा ${pText} वारंवार खंडित होत असून, दिवसातून अनेकदा फिडर ट्रिपिंग आणि व्होल्टेजमधील अनपेक्षित चढ-उतार होत आहेत. यामुळे सीएनसी, स्वयंचलित उत्पादन संयंत्रे व भट्ट्या अचानक बंद पडून कच्चा माल वाया जात आहे. अनपेक्षित वीज व्यत्ययामुळे कामगारांचे कामाचे तास वाया जात असून यंत्रसामग्रीचे मोठे आर्थिक नुकसान होत आहे. तरी महावितरणच्या संबंधित अभियंत्यांनी तातडीने प्रत्यक्ष स्थळपाहणी करून अखंडित वीज पुरवठा सुनिश्चित करावा`;
    }

    // Check roads & transport
    if (lower.includes('road') || lower.includes('pothole') || lower.includes('transit') || category === 'roads_transport') {
      return `आमच्या औद्योगिक वसाहतीतील मुख्य व अंतर्गत जोड रस्ते अत्यंत नादुरुस्त झाले असून रस्त्यावरील मोठमोठे खड्डे आणि पावसाचे पाणी साचल्यामुळे मालवाहू अवजड वाहनांची वाहतूक ठप्प झाली आहे. कच्चा माल वेळेत न पोहोचल्याने उत्पादन रखडले असून कामगारांच्या सुरक्षेचा प्रश्न निर्माण झाला आहे. तरी संबंधित रस्ते विभागाने तातडीने डांबरीकरण व दुरुस्तीची कामे हाती घ्यावीत`;
    }

    // Check permissions
    if (lower.includes('permission') || lower.includes('noc') || lower.includes('approval') || category === 'permissions_approvals') {
      return `आमच्या औद्योगिक प्रकल्पासाठी सादर करण्यात आलेले वैधानिक परवानग्यांचे अर्ज व ना-हरकत प्रमाणपत्र (NOC) प्रस्ताव विहित कालमर्यादा उलटून गेल्यानंतरही प्रशासकीय स्तरावर प्रलंबित आहेत. यामुळे नियोजित उत्पादन सुरू करण्यास आणि बँक कर्ज वितरणास विनाकारण विलंब होत आहे. तरी सादर कागदपत्रांची तातडीने पडताळणी करून आवश्यक मंजुरी त्वरित निर्गमित करावी`;
    }

    // Fallback general industrial
    return `आमच्या औद्योगिक घटकाच्या दैनंदिन कामकाजात पायाभूत सुविधांच्या अभावामुळे गंभीर अडचणी निर्माण झाल्या आहेत. यामुळे उत्पादनाचा वेग मंदावला असून आस्थापनेचे मोठे आर्थिक नुकसान होत आहे. तरी या समस्येचे गांभीर्य लक्षात घेऊन संबंधितांमार्फत त्वरित निवारक उपाययोजना करण्यात यावी`;
  }

  // Marathi -> English
  if (clean.includes('पाणी') || clean.includes('जल') || category === 'industrial_services') {
    const pText = cleanPeriod ? `for the ${cleanPeriod}` : 'for several weeks';
    return `The industrial unit has been facing severe and irregular water supply disruptions ${pText}. Water delivery is frequently interrupted without prior notice, severely impacting continuous manufacturing lines, plant cooling systems, and essential utility processes. Due to acute shortage of process water, production cycles are critically delayed and operational expenses have escalated`;
  }

  if (clean.includes('वीज') || clean.includes('विद्युत') || clean.includes('ट्रिपिंग') || clean.includes('फिडर') || category === 'electricity_utilities') {
    const pText = cleanPeriod ? `for the ${cleanPeriod}` : 'on a daily basis';
    return `Our manufacturing facility has been experiencing persistent power supply disruptions and frequent feeder tripping ${pText}. Severe voltage fluctuations have caused unscheduled machine shutdowns on precision CNC systems and furnaces, resulting in damaged workpieces, idle workforce downtime, and significant financial losses`;
  }

  if (clean.includes('रस्ते') || clean.includes('वाहतूक') || clean.includes('खड्डे') || category === 'roads_transport') {
    return `The internal and arterial connecting roads within our industrial sector have deteriorated substantially with deep potholes and structural damage. Heavy commercial transit carriers are unable to navigate safely, resulting in freight dispatch delays, vehicular damage, and severe logistic gridlocks`;
  }

  if (clean.includes('परवानगी') || clean.includes('ना-हरकत') || clean.includes('NOC') || category === 'permissions_approvals') {
    return `Statutory permission applications, operational clearances, and required NOC representations filed by our enterprise remain pending beyond designated processing timelines under service delivery norms, creating unwarranted obstacles for facility commissioning and operations`;
  }

  return `Our industrial operations are experiencing severe operational and administrative bottlenecks requiring urgent departmental inspection and prompt restorative intervention to prevent further manufacturing downtime and commercial losses`;
}
