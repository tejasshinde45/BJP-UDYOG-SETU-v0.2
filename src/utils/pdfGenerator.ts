/**
 * Professional PDF Generation Engine for Udyog Setu Portal
 * Generates valid standard PDF 1.4 binary documents on the client-side with zero external dependencies.
 * Spec-compliant WinAnsi / Latin-1 encoding with automatic Devanagari transliteration and clean layout.
 */

export interface GuidanceReportData {
  district?: string;
  area?: string;
  sector?: string;
  stage?: 'new' | 'expansion' | string;
  category?: string;
  investment?: string | number;
  landCost?: string | number;
  buildingCost?: string | number;
  plantCost?: string | number;
  otherCost?: string | number;
  matchedPolicy?: {
    title: { en: string; mr?: string };
    validity: { en: string; mr?: string };
    sector?: { en: string; mr?: string };
    provisions?: { en: string; mr?: string };
    href?: string;
  };
  eligibilityConditions?: Array<{ en: string; mr?: string }>;
  requiredDocuments?: Array<{ en: string; mr?: string }>;
  policyReferences?: Array<{
    title: { en: string; mr?: string };
    sector?: { en: string; mr?: string };
    validity: { en: string; mr?: string };
    provisions?: { en: string; mr?: string };
    href: string;
  }>;
  officialDisclaimer?: string;
  dateGenerated?: string;
  language?: string;
}

export interface DprResourceData {
  id: string;
  title: string;
  titleEn?: string;
  category: string;
  type: string;
  formatLabel: string;
  purpose: string;
  purposeEn?: string;
  audience: string;
  audienceEn?: string;
  information: string;
  informationEn?: string;
  steps: string;
  stepsEn?: string;
  sources: Array<{ label: string; href: string }>;
}

// -------------------------------------------------------------
// 1. MARATHI TO ENGLISH DICTIONARIES & TRANSLITERATOR
// -------------------------------------------------------------

export const MARATHI_TO_ENGLISH_DISTRICTS: Record<string, string> = {
  'पुणे': 'Pune',
  'छत्रपती संभाजीनगर (औरंगाबाद)': 'Chhatrapati Sambhajinagar (Aurangabad)',
  'छत्रपती संभाजीनगर': 'Chhatrapati Sambhajinagar',
  'औरंगाबाद': 'Aurangabad',
  'नागपूर': 'Nagpur',
  'नाशिक': 'Nashik',
  'ठाणे': 'Thane',
  'मुंबई उपनगर': 'Mumbai Suburban',
  'मुंबई शहर': 'Mumbai City',
  'मुंबई': 'Mumbai',
  'रायगड': 'Raigad',
  'पालघर': 'Palghar',
  'कोल्हापूर': 'Kolhapur',
  'सोलापूर': 'Solapur',
  'सातारा': 'Satara',
  'अहिल्यानगर (अहमदनगर)': 'Ahilyanagar (Ahmednagar)',
  'अहिल्यानगर': 'Ahilyanagar',
  'अहमदनगर': 'Ahmednagar',
  'सांगली': 'Sangli',
  'अमरावती': 'Amravati',
  'रत्नागिरी': 'Ratnagiri',
  'जळगाव': 'Jalgaon',
  'धुळे': 'Dhule',
  'नांदेड': 'Nanded',
  'चंद्रपूर': 'Chandrapur',
  'यवतमाळ': 'Yavatmal',
  'बुलढाणा': 'Buldhana',
  'जालना': 'Jalna',
  'बीड': 'Beed',
  'लातूर': 'Latur',
  'धाराशिव (उस्मानाबाद)': 'Dharashiv (Osmanabad)',
  'धाराशिव': 'Dharashiv',
  'उस्मानाबाद': 'Osmanabad',
  'परभणी': 'Parbhani',
  'हिंगोली': 'Hingoli',
  'वर्धा': 'Wardha',
  'भंडारा': 'Bhandara',
  'गोंदिया': 'Gondia',
  'गडचिरोली': 'Gadchiroli',
  'सिंधुदुर्ग': 'Sindhudurg',
  'नंदुरबार': 'Nandurbar',
  'वाशीम': 'Washim',
  'वाशिम': 'Washim',
  'अकोला': 'Akola',
};

const COMMON_INDUSTRIAL_AREAS: Record<string, string> = {
  'भोसरी': 'Bhosari MIDC',
  'चाकण': 'Chakan MIDC',
  'तळेगाव': 'Talegaon MIDC',
  'रांजणगाव': 'Ranjangaon MIDC',
  'हिंजवडी': 'Hinjawadi Infotech Park',
  'बुटीबोरी': 'Butibori MIDC',
  'तळोजा': 'Taloja MIDC',
  'अंबरनाथ': 'Ambernath MIDC',
  'बदलापूर': 'Badlapur MIDC',
  'वालुज': 'Waluj MIDC',
  'शेंद्रा': 'Shendra MIDC',
  'बिडकीन': 'Bidkin AURIC',
  'सातपूर': 'Satpur MIDC',
  'अंबड': 'Ambad MIDC',
  'शिरोळी': 'Shiroli MIDC',
  'गोकुळ शिरगाव': 'Gokul Shirgaon MIDC',
  'कुपवाड': 'Kupwad MIDC',
  'चिंचवड': 'Chinchwad',
  'हडपसर': 'Hadapsar',
  'किर्लोस्करवाडी': 'Kirloskarwadi',
};

const VOWELS_DEV: Record<string, string> = {
  '\u0905': 'a', '\u0906': 'aa', '\u0907': 'i', '\u0908': 'ee', '\u0909': 'u', '\u090A': 'oo',
  '\u090B': 'ri', '\u090F': 'e', '\u0910': 'ai', '\u0913': 'o', '\u0914': 'au'
};

const MATRAS_DEV: Record<string, string> = {
  '\u093E': 'a', '\u093F': 'i', '\u0940': 'i', '\u0941': 'u', '\u0942': 'u', '\u0943': 'ri',
  '\u0947': 'e', '\u0948': 'ai', '\u094B': 'o', '\u094C': 'au', '\u0902': 'n', '\u0901': 'n', '\u0903': 'h'
};

const CONSONANTS_DEV: Record<string, string> = {
  '\u0915': 'k', '\u0916': 'kh', '\u0917': 'g', '\u0918': 'gh', '\u0919': 'ng',
  '\u091A': 'ch', '\u091B': 'chh', '\u091C': 'j', '\u091D': 'jh', '\u091E': 'ny',
  '\u091F': 't', '\u0920': 'th', '\u0921': 'd', '\u0922': 'dh', '\u0923': 'n',
  '\u0924': 't', '\u0925': 'th', '\u0926': 'd', '\u0927': 'dh', '\u0928': 'n',
  '\u092A': 'p', '\u092B': 'ph', '\u092C': 'b', '\u092D': 'bh', '\u092E': 'm',
  '\u092F': 'y', '\u0930': 'r', '\u0932': 'l', '\u0933': 'l', '\u0935': 'v',
  '\u0936': 'sh', '\u0937': 'sh', '\u0938': 's', '\u0939': 'h'
};

const VIRAMA_DEV = '\u094D';

export function transliterateDevanagariToLatin(str: string): string {
  let res = '';
  for (let i = 0; i < str.length; i++) {
    const ch = str[i];
    if (VOWELS_DEV[ch]) {
      res += VOWELS_DEV[ch];
    } else if (CONSONANTS_DEV[ch]) {
      const base = CONSONANTS_DEV[ch];
      const next = str[i + 1];
      if (next === VIRAMA_DEV) {
        res += base;
        i++; // skip virama
      } else if (MATRAS_DEV[next]) {
        res += base + MATRAS_DEV[next];
        i++; // skip matra
      } else {
        const after = str[i + 1];
        if (!after || after === ' ' || after === '-' || after === '(' || after === ')') {
          res += base;
        } else {
          res += base + 'a';
        }
      }
    } else if (MATRAS_DEV[ch]) {
      res += MATRAS_DEV[ch];
    } else {
      res += ch;
    }
  }
  return res;
}

export function getEnglishDistrict(district?: string): string {
  if (!district) return 'Maharashtra';
  const clean = district.trim();
  if (MARATHI_TO_ENGLISH_DISTRICTS[clean]) {
    return MARATHI_TO_ENGLISH_DISTRICTS[clean];
  }
  for (const [mar, eng] of Object.entries(MARATHI_TO_ENGLISH_DISTRICTS)) {
    if (clean.includes(mar)) {
      return eng;
    }
  }
  if (/[\u0900-\u097F]/.test(clean)) {
    const translit = transliterateDevanagariToLatin(clean);
    return translit.charAt(0).toUpperCase() + translit.slice(1);
  }
  return clean;
}

function getPromoterCategoryLabel(category?: string): string {
  switch (category?.toLowerCase()) {
    case 'msme':
      return 'MSME (Micro, Small & Medium Enterprise)';
    case 'women':
      return 'Women Entrepreneur (Special Concessions)';
    case 'scst':
      return 'SC / ST Entrepreneur (Priority Scheme)';
    case 'general':
    default:
      return 'General Industrial Category';
  }
}

function formatCurrency(val?: string | number): string {
  if (!val || Number(val) === 0) return 'INR 0';
  const num = Number(val);
  if (isNaN(num)) return sanitizePdfText(String(val));
  const inLakhs = (num / 100000).toFixed(1);
  return `INR ${num.toLocaleString('en-IN')} (${inLakhs} L)`;
}

export function sanitizePdfText(text?: string | null): string {
  if (!text) return '';
  let s = String(text);

  // 1. Common typographic symbols to clean ASCII
  s = s
    .replace(/[•●▪]/g, '-')
    .replace(/[—–]/g, '-')
    .replace(/['']/g, "'")
    .replace(/[""]/g, '"')
    .replace(/₹/g, 'INR ')
    .replace(/…/g, '...')
    .replace(/[\u00A0\u200B\uFEFF]/g, ' ')
    .replace(/\r?\n/g, ' ')
    .replace(/\t/g, ' ');

  // 2. Transliterate Devanagari text if present
  if (/[\u0900-\u097F]/.test(s)) {
    for (const [mar, eng] of Object.entries(MARATHI_TO_ENGLISH_DISTRICTS)) {
      if (s.includes(mar)) {
        s = s.replace(new RegExp(mar, 'g'), eng);
      }
    }
    for (const [mar, eng] of Object.entries(COMMON_INDUSTRIAL_AREAS)) {
      if (s.includes(mar)) {
        s = s.replace(new RegExp(mar, 'g'), eng);
      }
    }
    s = transliterateDevanagariToLatin(s);
  }

  // 3. Keep strictly printable ASCII characters (32 to 126)
  s = s.replace(/[^\x20-\x7E]/g, ' ');

  // 4. Normalize spacing
  s = s.replace(/ +/g, ' ').trim();

  return s;
}

function escapePdf(text: string): string {
  const clean = sanitizePdfText(text);
  return clean
    .replace(/\\/g, '\\\\')
    .replace(/\(/g, '\\(')
    .replace(/\)/g, '\\)');
}

// -------------------------------------------------------------
// 2. CORE PDF 1.4 GENERATION ENGINE
// -------------------------------------------------------------

class SimplePdfDoc {
  private pages: string[][] = [];
  private currentPage = 0;
  private width = 595.28; // A4 pt
  private height = 841.89; // A4 pt
  private margin = 38;
  private currentY = 800;

  constructor() {
    this.addPage();
  }

  public addPage() {
    this.pages.push([]);
    this.currentPage = this.pages.length - 1;
    this.currentY = 800;
  }

  public get pageCount(): number {
    return this.pages.length;
  }

  public setPage(pageIndex: number) {
    if (pageIndex >= 0 && pageIndex < this.pages.length) {
      this.currentPage = pageIndex;
    }
  }

  private get stream(): string[] {
    return this.pages[this.currentPage];
  }

  public getY(): number {
    return this.currentY;
  }

  public setY(y: number) {
    this.currentY = y;
  }

  public drawTricolorRail() {
    const railY = this.height - 18;
    const barWidth = (this.width - this.margin * 2) / 3;

    // Saffron #E35914
    this.stream.push('0.89 0.35 0.08 rg');
    this.stream.push(`${this.margin} ${railY} ${barWidth} 3.5 re f`);

    // Amber #F59E0B
    this.stream.push('0.96 0.62 0.07 rg');
    this.stream.push(`${this.margin + barWidth} ${railY} ${barWidth} 3.5 re f`);

    // Forest Green #136938
    this.stream.push('0.07 0.41 0.22 rg');
    this.stream.push(`${this.margin + barWidth * 2} ${railY} ${barWidth} 3.5 re f`);
  }

  public finalizeFooters(docSubtitle = 'UDYOG SETU INDUSTRIAL PORTAL - GOVERNMENT OF MAHARASHTRA COORDINATION DESK') {
    const totalPages = this.pages.length;
    const footerY = 24;
    const dividerY = 36;

    for (let p = 0; p < totalPages; p++) {
      const pageStream = this.pages[p];

      // Divider line
      pageStream.push('0.88 0.91 0.94 RG 0.5 w');
      pageStream.push(`${this.margin} ${dividerY} m ${this.width - this.margin} ${dividerY} l S`);

      // Left subtitle
      pageStream.push('BT');
      pageStream.push('/F2 7 Tf');
      pageStream.push('0.45 0.52 0.62 rg');
      pageStream.push(`${this.margin} ${footerY} Td`);
      pageStream.push(`(${escapePdf(docSubtitle)}) Tj`);
      pageStream.push('ET');

      // Right: PAGE X OF Y
      const pageLabel = `PAGE ${p + 1} OF ${totalPages}`;
      const rightX = this.width - this.margin - 68;
      pageStream.push('BT');
      pageStream.push('/F1 7.5 Tf');
      pageStream.push('0.45 0.52 0.62 rg');
      pageStream.push(`${rightX} ${footerY} Td`);
      pageStream.push(`(${escapePdf(pageLabel)}) Tj`);
      pageStream.push('ET');
    }
  }

  public drawText(
    text: string,
    x: number,
    y: number,
    options?: {
      font?: 'F1' | 'F2' | 'F3';
      size?: number;
      color?: [number, number, number];
    }
  ) {
    const font = options?.font || 'F2';
    const size = options?.size || 8.5;
    const color = options?.color || [0.06, 0.09, 0.16];

    this.stream.push('BT');
    this.stream.push(`/${font} ${size} Tf`);
    this.stream.push(`${color[0]} ${color[1]} ${color[2]} rg`);
    this.stream.push(`${x} ${y} Td`);
    this.stream.push(`(${escapePdf(text)}) Tj`);
    this.stream.push('ET');
  }

  public drawRect(
    x: number,
    y: number,
    w: number,
    h: number,
    options?: {
      fillColor?: [number, number, number];
      strokeColor?: [number, number, number];
      lineWidth?: number;
    }
  ) {
    if (options?.fillColor) {
      const f = options.fillColor;
      this.stream.push(`${f[0]} ${f[1]} ${f[2]} rg`);
    }
    if (options?.strokeColor) {
      const s = options.strokeColor;
      this.stream.push(`${s[0]} ${s[1]} ${s[2]} RG`);
      this.stream.push(`${options.lineWidth || 1} w`);
    }

    if (options?.fillColor && options?.strokeColor) {
      this.stream.push(`${x} ${y} ${w} ${h} re B`);
    } else if (options?.fillColor) {
      this.stream.push(`${x} ${y} ${w} ${h} re f`);
    } else if (options?.strokeColor) {
      this.stream.push(`${x} ${y} ${w} ${h} re S`);
    }
  }

  public drawLine(
    x1: number,
    y1: number,
    x2: number,
    y2: number,
    options?: {
      color?: [number, number, number];
      lineWidth?: number;
    }
  ) {
    const c = options?.color || [0.88, 0.91, 0.94];
    this.stream.push(`${c[0]} ${c[1]} ${c[2]} RG`);
    this.stream.push(`${options?.lineWidth || 1} w`);
    this.stream.push(`${x1} ${y1} m ${x2} ${y2} l S`);
  }

  public drawWrappedText(
    text: string,
    x: number,
    y: number,
    maxWidth: number,
    options?: {
      font?: 'F1' | 'F2' | 'F3';
      size?: number;
      lineHeight?: number;
      color?: [number, number, number];
    }
  ): number {
    const font = options?.font || 'F2';
    const size = options?.size || 8;
    const lineHeight = options?.lineHeight || size * 1.35;
    const color = options?.color || [0.28, 0.33, 0.41];

    const safeText = sanitizePdfText(text);
    const avgCharWidth = size * 0.52;
    const maxChars = Math.max(10, Math.floor(maxWidth / avgCharWidth));

    const words = safeText.split(' ');
    let currentLine = '';
    let currY = y;

    for (let i = 0; i < words.length; i++) {
      const word = words[i];
      const testLine = currentLine ? `${currentLine} ${word}` : word;

      if (testLine.length > maxChars && currentLine) {
        this.drawText(currentLine, x, currY, { font, size, color });
        currY -= lineHeight;
        currentLine = word;
      } else {
        currentLine = testLine;
      }
    }

    if (currentLine) {
      this.drawText(currentLine, x, currY, { font, size, color });
      currY -= lineHeight;
    }

    return currY;
  }

  public toBlob(): Blob {
    const totalPages = this.pages.length;
    const objects: string[] = [];

    const addObject = (content: string) => {
      objects.push(content);
      return objects.length;
    };

    // 1: Catalog
    addObject('<< /Type /Catalog /Pages 2 0 R >>');

    // 2: Pages tree
    const kidsStr = Array.from({ length: totalPages }, (_, i) => `${3 + i * 2} 0 R`).join(' ');
    addObject(`<< /Type /Pages /Kids [${kidsStr}] /Count ${totalPages} >>`);

    // Font IDs
    const font1Id = 3 + totalPages * 2;
    const font2Id = font1Id + 1;
    const font3Id = font2Id + 1;

    for (let i = 0; i < totalPages; i++) {
      const pageId = 3 + i * 2;
      const contentId = pageId + 1;
      const streamText = this.pages[i].join('\n');

      addObject(
        `<< /Type /Page /Parent 2 0 R /MediaBox [0 0 ${this.width} ${this.height}] /Contents ${contentId} 0 R /Resources << /Font << /F1 ${font1Id} 0 R /F2 ${font2Id} 0 R /F3 ${font3Id} 0 R >> >> >>`
      );

      const streamBytes = new TextEncoder().encode(streamText).length;
      addObject(`<< /Length ${streamBytes} >>\nstream\n${streamText}\nendstream`);
    }

    // Font 1: Bold
    addObject('<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold /Encoding /WinAnsiEncoding >>');
    // Font 2: Regular
    addObject('<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica /Encoding /WinAnsiEncoding >>');
    // Font 3: Oblique
    addObject('<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Oblique /Encoding /WinAnsiEncoding >>');

    let pdf = '%PDF-1.4\n';
    const offsets: number[] = [0];

    for (let i = 0; i < objects.length; i++) {
      offsets.push(pdf.length);
      pdf += `${i + 1} 0 obj\n${objects[i]}\nendobj\n`;
    }

    const xrefOffset = pdf.length;
    pdf += `xref\n0 ${objects.length + 1}\n`;
    pdf += '0000000000 65535 f \n';

    for (let i = 1; i <= objects.length; i++) {
      pdf += `${String(offsets[i]).padStart(10, '0')} 00000 n \n`;
    }

    pdf += `trailer\n<< /Size ${objects.length + 1} /Root 1 0 R >>\n`;
    pdf += `startxref\n${xrefOffset}\n%%EOF`;

    return new Blob([pdf], { type: 'application/pdf' });
  }
}

// -------------------------------------------------------------
// 3. EXECUTIVE GUIDANCE REPORT PDF (PAGE 1 & PAGE 2)
// -------------------------------------------------------------

export function generateGuidancePdfBlob(data: GuidanceReportData): Blob {
  const doc = new SimplePdfDoc();
  const left = 38;
  const contentWidth = 519;
  const englishDistrict = getEnglishDistrict(data.district);
  const districtCode = englishDistrict.toUpperCase().replace(/[^A-Z]/g, '').slice(0, 3) || 'MH';
  const refNum = Date.now().toString().slice(-6);
  const refCode = `REF: US-POL-${districtCode}-${refNum}`;
  const dateStr = data.dateGenerated || new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });

  // =========================================================
  // PAGE 1: EXECUTIVE APPRAISAL & INVESTMENT PROFILE
  // =========================================================
  doc.setPage(0);
  doc.drawTricolorRail();

  // 1. Header Box
  let y = 802;
  doc.drawText('GOVERNMENT OF MAHARASHTRA • DIRECTORATE OF INDUSTRIES', left, y, {
    font: 'F1',
    size: 7.5,
    color: [0.07, 0.41, 0.22],
  });

  y -= 15;
  doc.drawText('UDYOG SETU • INDUSTRIAL POLICY & INCENTIVE REPORT', left, y, {
    font: 'F1',
    size: 13.5,
    color: [0.06, 0.09, 0.16],
  });

  y -= 13;
  doc.drawText(
    'MAITRI 2.0 Single Window Coordination Desk • Package Scheme of Incentives (PSI)',
    left,
    y,
    { font: 'F2', size: 8, color: [0.45, 0.52, 0.62] }
  );

  // Meta Strip
  y -= 16;
  doc.drawRect(left, y - 6, contentWidth, 20, {
    fillColor: [0.96, 0.97, 0.99],
    strokeColor: [0.88, 0.91, 0.94],
    lineWidth: 1,
  });

  doc.drawText(refCode, left + 8, y, { font: 'F1', size: 7.5, color: [0.89, 0.35, 0.08] });
  doc.drawText(`DATE: ${dateStr}`, left + 190, y, { font: 'F2', size: 7.5, color: [0.25, 0.30, 0.40] });
  doc.drawText('STATUS: PRELIMINARY POLICY APPRAISAL', left + 320, y, {
    font: 'F1',
    size: 7.5,
    color: [0.07, 0.41, 0.22],
  });

  // 2. Section 1: Project Investment Profile & Parameters
  y -= 22;
  const card1Height = 124;
  doc.drawRect(left, y - card1Height, contentWidth, card1Height, {
    fillColor: [0.98, 0.99, 1.0],
    strokeColor: [0.88, 0.91, 0.94],
    lineWidth: 1,
  });

  // Header Tab
  doc.drawRect(left, y - 2, contentWidth, 18, { fillColor: [0.93, 0.95, 0.97] });
  doc.drawText('1. PROJECT INVESTMENT PROFILE & PARAMETERS', left + 8, y + 3, {
    font: 'F1',
    size: 8.5,
    color: [0.06, 0.09, 0.16],
  });

  // Vertical Center Divider
  doc.drawLine(left + 260, y - card1Height, left + 260, y - 2, {
    color: [0.90, 0.92, 0.95],
    lineWidth: 0.5,
  });

  const cLeft = left + 10;
  const vLeft = left + 105;
  const cRight = left + 270;
  const vRight = left + 380;
  let rY = y - 18;

  const cleanArea = sanitizePdfText(data.area) || 'General MIDC / Rural Industrial Area';
  const cleanSector = sanitizePdfText(data.sector) || 'Automobiles & EV Manufacturing';
  const cleanStage = data.stage === 'expansion'
    ? 'Expansion / Modernization'
    : 'New Greenfield Unit';
  const cleanCategory = getPromoterCategoryLabel(data.category);

  // Row 1
  doc.drawText('District / Location:', cLeft, rY, { font: 'F1', size: 7.5, color: [0.45, 0.52, 0.62] });
  doc.drawText(englishDistrict, vLeft, rY, { font: 'F1', size: 8, color: [0.06, 0.09, 0.16] });

  doc.drawText('Total Investment:', cRight, rY, { font: 'F1', size: 7.5, color: [0.45, 0.52, 0.62] });
  doc.drawText(formatCurrency(data.investment), vRight, rY, { font: 'F1', size: 8, color: [0.89, 0.35, 0.08] });

  // Row 2
  rY -= 22;
  doc.drawLine(left + 6, rY + 14, left + contentWidth - 6, rY + 14, { color: [0.93, 0.95, 0.97], lineWidth: 0.5 });
  doc.drawText('Industrial Area:', cLeft, rY, { font: 'F1', size: 7.5, color: [0.45, 0.52, 0.62] });
  doc.drawText(cleanArea, vLeft, rY, { font: 'F2', size: 7.5, color: [0.15, 0.20, 0.28] });

  doc.drawText('Plant & Machinery:', cRight, rY, { font: 'F1', size: 7.5, color: [0.45, 0.52, 0.62] });
  doc.drawText(formatCurrency(data.plantCost), vRight, rY, { font: 'F2', size: 7.5, color: [0.15, 0.20, 0.28] });

  // Row 3
  rY -= 22;
  doc.drawLine(left + 6, rY + 14, left + contentWidth - 6, rY + 14, { color: [0.93, 0.95, 0.97], lineWidth: 0.5 });
  doc.drawText('Target Sector:', cLeft, rY, { font: 'F1', size: 7.5, color: [0.45, 0.52, 0.62] });
  doc.drawText(cleanSector, vLeft, rY, { font: 'F2', size: 7.5, color: [0.15, 0.20, 0.28] });

  doc.drawText('Factory Building:', cRight, rY, { font: 'F1', size: 7.5, color: [0.45, 0.52, 0.62] });
  doc.drawText(formatCurrency(data.buildingCost), vRight, rY, { font: 'F2', size: 7.5, color: [0.15, 0.20, 0.28] });

  // Row 4
  rY -= 22;
  doc.drawLine(left + 6, rY + 14, left + contentWidth - 6, rY + 14, { color: [0.93, 0.95, 0.97], lineWidth: 0.5 });
  doc.drawText('Project Lifecycle:', cLeft, rY, { font: 'F1', size: 7.5, color: [0.45, 0.52, 0.62] });
  doc.drawText(cleanStage, vLeft, rY, { font: 'F2', size: 7.5, color: [0.15, 0.20, 0.28] });

  doc.drawText('Land / Site Cost:', cRight, rY, { font: 'F1', size: 7.5, color: [0.45, 0.52, 0.62] });
  doc.drawText(formatCurrency(data.landCost), vRight, rY, { font: 'F2', size: 7.5, color: [0.15, 0.20, 0.28] });

  // Row 5
  rY -= 22;
  doc.drawLine(left + 6, rY + 14, left + contentWidth - 6, rY + 14, { color: [0.93, 0.95, 0.97], lineWidth: 0.5 });
  doc.drawText('Promoter Category:', cLeft, rY, { font: 'F1', size: 7.5, color: [0.45, 0.52, 0.62] });
  doc.drawText(cleanCategory, vLeft, rY, { font: 'F1', size: 7.5, color: [0.07, 0.41, 0.22] });

  doc.drawText('Pre-operative / Other:', cRight, rY, { font: 'F1', size: 7.5, color: [0.45, 0.52, 0.62] });
  doc.drawText(formatCurrency(data.otherCost), vRight, rY, { font: 'F2', size: 7.5, color: [0.15, 0.20, 0.28] });

  // 3. Section 2: Recommended Policy Match & Potential Incentives
  y -= (card1Height + 14);
  const card2Height = 158;
  doc.drawRect(left, y - card2Height, contentWidth, card2Height, {
    fillColor: [0.96, 0.98, 0.96],
    strokeColor: [0.72, 0.84, 0.74],
    lineWidth: 1,
  });

  // Header Tab
  doc.drawRect(left, y - 2, contentWidth, 18, { fillColor: [0.91, 0.95, 0.92] });
  doc.drawText('2. RECOMMENDED INDUSTRIAL POLICY & INCENTIVE FRAMEWORK', left + 8, y + 3, {
    font: 'F1',
    size: 8.5,
    color: [0.07, 0.41, 0.22],
  });

  const matchedTitle = sanitizePdfText(data.matchedPolicy?.title.en || 'Maharashtra Industries, Investment and Services Policy 2025');
  const matchedValidity = sanitizePdfText(data.matchedPolicy?.validity.en || '2024 - 2029 (Active)');

  let mY = y - 18;
  doc.drawText(`PRIMARY SCHEME: ${matchedTitle}`, left + 10, mY, {
    font: 'F1',
    size: 8.5,
    color: [0.07, 0.41, 0.22],
  });
  doc.drawText(`[Validity: ${matchedValidity}]`, left + contentWidth - 145, mY, {
    font: 'F1',
    size: 7.5,
    color: [0.07, 0.41, 0.22],
  });

  mY -= 12;
  doc.drawText(
    'Administering Body: Directorate of Industries, Govt. of Maharashtra • Single Window: MAITRI 2.0',
    left + 10,
    mY,
    { font: 'F3', size: 7, color: [0.45, 0.52, 0.62] }
  );

  mY -= 8;
  doc.drawLine(left + 8, mY, left + contentWidth - 8, mY, { color: [0.85, 0.91, 0.86], lineWidth: 0.5 });

  mY -= 13;
  doc.drawText('INDICATIVE FISCAL & OPERATIONAL INCENTIVES UNDER THIS POLICY:', left + 10, mY, {
    font: 'F1',
    size: 7.5,
    color: [0.06, 0.09, 0.16],
  });

  const incentives = [
    { title: 'Industrial Promotion Subsidy (IPS):', desc: '40% to 100% of Fixed Capital Investment (FCI) based on taluka zoning (A to D+).' },
    { title: '100% Stamp Duty Exemption:', desc: 'Full waiver on land acquisition, MIDC lease deed execution, and loan hypothecation.' },
    { title: 'Electricity Duty Exemption:', desc: '100% exemption on state electricity duty for 7 to 10 years from commercial operations.' },
    { title: 'Power Tariff Subsidy:', desc: 'Direct tariff concession of INR 1.00 to INR 2.00 per unit for eligible manufacturing units.' },
    { title: 'Interest Subvention on Term Loans:', desc: '5% per annum interest subsidy on commercial bank loans for MSMEs for up to 5 years.' },
  ];

  for (let i = 0; i < incentives.length; i++) {
    mY -= 17;
    doc.drawText('*', left + 10, mY, { font: 'F1', size: 8, color: [0.07, 0.41, 0.22] });
    doc.drawText(incentives[i].title, left + 20, mY, { font: 'F1', size: 7.5, color: [0.15, 0.20, 0.28] });
    doc.drawText(incentives[i].desc, left + 165, mY, { font: 'F2', size: 7.5, color: [0.30, 0.36, 0.44] });
  }

  // 4. Section 3: Statutory Eligibility Criteria & Compliance Conditions
  y -= (card2Height + 14);
  const card3Height = 152;
  doc.drawRect(left, y - card3Height, contentWidth, card3Height, {
    fillColor: [0.98, 0.99, 1.0],
    strokeColor: [0.88, 0.91, 0.94],
    lineWidth: 1,
  });

  // Header Tab
  doc.drawRect(left, y - 2, contentWidth, 18, { fillColor: [0.93, 0.95, 0.97] });
  doc.drawText('3. STATUTORY ELIGIBILITY CRITERIA & COMPLIANCE CONDITIONS', left + 8, y + 3, {
    font: 'F1',
    size: 8.5,
    color: [0.06, 0.09, 0.16],
  });

  let eY = y - 18;
  const conditions = [
    {
      label: 'Valid Enterprise Registration:',
      text: 'Enterprise must possess active Udyam Registration (for MSME) or IEM Part-B (for Large units) prior to commencement of commercial production.',
    },
    {
      label: 'Commencement & Investment Timeline:',
      text: 'Project fixed capital expenditure, civil construction, and commercial operations must occur within the operative validity of the industrial policy.',
    },
    {
      label: 'Expansion & Modernization Threshold:',
      text: 'Expansion units must demonstrate a minimum 25% increase in gross fixed capital investment and corresponding production capacity.',
    },
    {
      label: 'Statutory Clearances & Local Employment:',
      text: 'Unit must hold valid MPCB Consent to Establish (CTE) / Operate (CTO), building approvals, factory licence, and meet minimum 70% local employment norms.',
    },
  ];

  for (let i = 0; i < conditions.length; i++) {
    doc.drawText('[OK]', left + 10, eY, { font: 'F1', size: 7.5, color: [0.07, 0.41, 0.22] });
    doc.drawText(conditions[i].label, left + 36, eY, { font: 'F1', size: 7.5, color: [0.06, 0.09, 0.16] });
    doc.drawText(conditions[i].text, left + 36, eY - 11, { font: 'F2', size: 7, color: [0.30, 0.36, 0.44] });

    if (i < conditions.length - 1) {
      doc.drawLine(left + 10, eY - 19, left + contentWidth - 10, eY - 19, { color: [0.93, 0.95, 0.97], lineWidth: 0.5 });
    }
    eY -= 31;
  }

  // Page 1 Transition note
  doc.drawText('-> Continued on Page 2 for Mandatory Documentation Checklist (MAITRI 2.0) and Active Policies Directory', left + 8, 48, {
    font: 'F1',
    size: 7.5,
    color: [0.89, 0.35, 0.08],
  });

  // =========================================================
  // PAGE 2: DOCUMENT CHECKLIST, POLICIES & STATUTORY NOTICE
  // =========================================================
  doc.addPage();
  doc.setPage(1);
  doc.drawTricolorRail();

  // Page 2 Header
  y = 802;
  doc.drawText('GOVERNMENT OF MAHARASHTRA • DIRECTORATE OF INDUSTRIES', left, y, {
    font: 'F1',
    size: 7.5,
    color: [0.07, 0.41, 0.22],
  });

  y -= 15;
  doc.drawText('UDYOG SETU • INDUSTRIAL POLICY GUIDANCE REPORT (CONTINUED)', left, y, {
    font: 'F1',
    size: 12,
    color: [0.06, 0.09, 0.16],
  });

  y -= 13;
  doc.drawText(
    `${refCode} • APPLICANT: ${cleanCategory} • DISTRICT: ${englishDistrict.toUpperCase()}`,
    left,
    y,
    { font: 'F1', size: 7.5, color: [0.45, 0.52, 0.62] }
  );

  y -= 8;
  doc.drawLine(left, y, left + contentWidth, y, { color: [0.88, 0.91, 0.94], lineWidth: 1 });

  // 5. Section 4: Mandatory Documentation Checklist (MAITRI 2.0 Filing)
  y -= 14;
  const card4Height = 130;
  doc.drawRect(left, y - card4Height, contentWidth, card4Height, {
    fillColor: [0.98, 0.99, 1.0],
    strokeColor: [0.88, 0.91, 0.94],
    lineWidth: 1,
  });

  // Header Tab
  doc.drawRect(left, y - 2, contentWidth, 18, { fillColor: [0.93, 0.95, 0.97] });
  doc.drawText('4. MANDATORY DOCUMENTATION CHECKLIST (MAITRI 2.0 FILING)', left + 8, y + 3, {
    font: 'F1',
    size: 8.5,
    color: [0.06, 0.09, 0.16],
  });

  let docY = y - 18;
  doc.drawText(
    'Verify and upload all original documents in PDF format on MAITRI Single Window (maitri.maharashtra.gov.in):',
    left + 10,
    docY,
    { font: 'F3', size: 7, color: [0.45, 0.52, 0.62] }
  );

  docY -= 8;
  doc.drawLine(left + 8, docY, left + contentWidth - 8, docY, { color: [0.93, 0.95, 0.97], lineWidth: 0.5 });

  const checklistCol1 = [
    '1. Udyam Registration Certificate (with updated balance sheets)',
    '2. Detailed Project Report (DPR) with financial appraisal & cash-flow',
    '3. CA Certified Gross Fixed Capital Investment Schedule',
    '4. Land ownership document (MIDC Lease Deed or 7/12 Extract)',
  ];

  const checklistCol2 = [
    '5. Active MPCB Consent to Establish (CTE) / Operate (CTO)',
    '6. Bank Term Loan Sanction Letter & Disbursement Certificate',
    '7. Factory Licence or Shop Act Registration Certificate',
    '8. Power Feasibility Sanction & MSEDCL Connection Bill',
  ];

  docY -= 15;
  for (let i = 0; i < 4; i++) {
    // Left column
    doc.drawText('[  ]', left + 10, docY, { font: 'F1', size: 7.5, color: [0.39, 0.45, 0.55] });
    doc.drawText(checklistCol1[i], left + 26, docY, { font: 'F2', size: 7, color: [0.15, 0.20, 0.28] });

    // Right column
    doc.drawText('[  ]', left + 270, docY, { font: 'F1', size: 7.5, color: [0.39, 0.45, 0.55] });
    doc.drawText(checklistCol2[i], left + 286, docY, { font: 'F2', size: 7, color: [0.15, 0.20, 0.28] });

    docY -= 20;
  }

  // 6. Section 5: Active Maharashtra Industrial Policies Directory
  y -= (card4Height + 14);
  const card5Height = 312;
  doc.drawRect(left, y - card5Height, contentWidth, card5Height, {
    fillColor: [0.98, 0.99, 1.0],
    strokeColor: [0.88, 0.91, 0.94],
    lineWidth: 1,
  });

  // Header Tab
  doc.drawRect(left, y - 2, contentWidth, 18, { fillColor: [0.93, 0.95, 0.97] });
  doc.drawText('5. ACTIVE MAHARASHTRA INDUSTRIAL POLICIES DIRECTORY & PORTAL ACCESS', left + 8, y + 3, {
    font: 'F1',
    size: 8.5,
    color: [0.06, 0.09, 0.16],
  });

  let polHeaderY = y - 18;
  doc.drawText(
    'Official policy notifications (GRs) and operational circulars accessible via MAITRI Single Window:',
    left + 10,
    polHeaderY,
    { font: 'F3', size: 7, color: [0.45, 0.52, 0.62] }
  );

  polHeaderY -= 8;
  doc.drawLine(left + 8, polHeaderY, left + contentWidth - 8, polHeaderY, { color: [0.93, 0.95, 0.97], lineWidth: 0.5 });

  const defaultPolicies = [
    {
      title: 'Maharashtra Industries, Investment and Services Policy 2025',
      validity: '2024 - 2029 (Active)',
      sector: 'Multi-sector industrial, MSME, exports & green logistics',
      href: 'https://maitri.maharashtra.gov.in',
    },
    {
      title: 'Package Scheme of Incentives (PSI Framework)',
      validity: 'Active on MAITRI',
      sector: 'Manufacturing, capital investment & employment generating units',
      href: 'https://maitri.maharashtra.gov.in',
    },
    {
      title: 'Maharashtra Electric Vehicle (EV) Policy',
      validity: '2021 - 2026 (Active)',
      sector: 'Electric vehicles, batteries & EV charging infrastructure',
      href: 'https://maitri.maharashtra.gov.in',
    },
    {
      title: 'Maharashtra MSME Promotion Provisions',
      validity: 'Integrated Policy',
      sector: 'Micro, Small and Medium Enterprises across manufacturing',
      href: 'https://maitri.maharashtra.gov.in',
    },
    {
      title: 'Integrated and Sustainable Textile Policy',
      validity: '2023 - 2028 (Active)',
      sector: 'Textile processing, spinning, weaving, ginning & apparel',
      href: 'https://maitri.maharashtra.gov.in',
    },
    {
      title: 'Maharashtra IT & ITES Promotion Policy',
      validity: '2023 - 2028 (Active)',
      sector: 'Information Technology, cloud, data centers & software services',
      href: 'https://maitri.maharashtra.gov.in',
    },
    {
      title: 'Maharashtra Green Hydrogen Policy',
      validity: '2023 - 2028 (Active)',
      sector: 'Green hydrogen, electrolyzers, ammonia & renewable storage',
      href: 'https://maitri.maharashtra.gov.in',
    },
    {
      title: 'Maharashtra Logistics Park Policy',
      validity: '2024 - 2029 (Active)',
      sector: 'Integrated logistics parks, cold chains & multimodal corridors',
      href: 'https://maitri.maharashtra.gov.in',
    },
  ];

  let pRowY = polHeaderY - 14;
  const pRowHeight = 34;

  for (let i = 0; i < defaultPolicies.length; i++) {
    const pol = defaultPolicies[i];
    const rowTop = pRowY;
    const rowBottom = rowTop - pRowHeight + 5;

    // Alternating subtle background fill
    if (i % 2 === 0) {
      doc.drawRect(left + 2, rowBottom, contentWidth - 4, pRowHeight - 3, {
        fillColor: [0.97, 0.98, 0.99],
      });
    }

    // Line 1: Title (left) & Validity (right)
    const titleText = `${i + 1}. ${pol.title}`;
    doc.drawText(titleText, left + 8, rowTop - 10, {
      font: 'F1',
      size: 7.5,
      color: [0.06, 0.09, 0.16],
    });

    const valText = `[${pol.validity}]`;
    const valWidth = valText.length * 4.3;
    doc.drawText(valText, left + contentWidth - 10 - valWidth, rowTop - 10, {
      font: 'F1',
      size: 7,
      color: [0.07, 0.41, 0.22],
    });

    // Line 2: Sector (left, indented) & Portal Link (right)
    const sectorText = `Sector: ${pol.sector}`;
    doc.drawText(sectorText, left + 18, rowTop - 22, {
      font: 'F2',
      size: 7,
      color: [0.45, 0.52, 0.62],
    });

    const portalText = 'Portal: maitri.maharashtra.gov.in';
    const portalWidth = portalText.length * 3.8;
    doc.drawText(portalText, left + contentWidth - 10 - portalWidth, rowTop - 22, {
      font: 'F2',
      size: 7,
      color: [0.89, 0.35, 0.08],
    });

    // Divider line between rows
    if (i < defaultPolicies.length - 1) {
      doc.drawLine(left + 8, rowBottom, left + contentWidth - 8, rowBottom, {
        color: [0.92, 0.94, 0.96],
        lineWidth: 0.5,
      });
    }

    pRowY -= pRowHeight;
  }

  // 7. Section 6: Statutory Notice & Legal Transparency Disclaimer
  y -= (card5Height + 14);
  const card6Height = 145;
  doc.drawRect(left, y - card6Height, contentWidth, card6Height, {
    fillColor: [1.0, 0.98, 0.94],
    strokeColor: [0.98, 0.82, 0.65],
    lineWidth: 1,
  });

  doc.drawText(
    'STATUTORY NOTICE & LEGAL TRANSPARENCY DISCLAIMER (GOVERNMENT OF MAHARASHTRA)',
    left + 10,
    y - 14,
    { font: 'F1', size: 7.5, color: [0.76, 0.25, 0.05] }
  );

  doc.drawLine(left + 10, y - 20, left + contentWidth - 10, y - 20, {
    color: [0.98, 0.85, 0.70],
    lineWidth: 0.5,
  });

  const legalNotice =
    'This report is generated by Udyog Setu for preliminary guidance, investor facilitation, and project preparation purposes only. It DOES NOT constitute an official sanction order, eligibility certificate, or legal entitlement from the Government of Maharashtra. All statutory fiscal incentives, stamp duty exemptions, electricity duty waivers, and concessional power tariffs are sanctioned and disbursed exclusively by the Directorate of Industries, Government of Maharashtra, following formal verification of online applications and statutory compliance submitted through the MAITRI 2.0 Single Window Portal (https://maitri.maharashtra.gov.in).';

  let disY = doc.drawWrappedText(legalNotice, left + 10, y - 32, contentWidth - 20, {
    font: 'F2',
    size: 7,
    lineHeight: 9.5,
    color: [0.55, 0.20, 0.05],
  });

  disY -= 4;
  const subDisclaimer =
    'Entrepreneurs and project proponents are strongly advised to inspect official Government Resolutions (GRs) and operational circulars before committing capital investments. Udyog Setu facilitates ease of doing business and charges zero advisory fees.';
  disY = doc.drawWrappedText(subDisclaimer, left + 10, disY, contentWidth - 20, {
    font: 'F3',
    size: 6.8,
    lineHeight: 9,
    color: [0.55, 0.20, 0.05],
  });

  doc.drawText(
    'MAITRI Helpline: 022-2202-5821 • Directorate of Industries: di.maharashtra.gov.in • Desk: maitri.maharashtra.gov.in',
    left + 10,
    y - card6Height + 10,
    { font: 'F1', size: 7, color: [0.76, 0.25, 0.05] }
  );

  // Finalize Footers for all pages (with PAGE 1 OF 2 and PAGE 2 OF 2)
  doc.finalizeFooters('UDYOG SETU INDUSTRIAL PORTAL • GOVERNMENT OF MAHARASHTRA COORDINATION DESK');

  return doc.toBlob();
}

/**
 * Triggers a direct download of the generated PDF file
 */
export function downloadGuidanceReportPdf(data: GuidanceReportData, filename?: string) {
  const blob = generateGuidancePdfBlob(data);
  const englishDistrict = getEnglishDistrict(data.district);
  const districtSlug = englishDistrict.replace(/[^a-zA-Z0-9]/g, '-').replace(/-+/g, '-');
  const finalFilename = filename || `Udyog-Setu-Guidance-Report-${districtSlug}.pdf`;

  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = finalFilename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  setTimeout(() => URL.revokeObjectURL(url), 2000);
}

// -------------------------------------------------------------
// 4. EXECUTIVE DPR GUIDANCE TEMPLATE PDF
// -------------------------------------------------------------

export function downloadDprGuidancePdf(resource: DprResourceData) {
  const doc = new SimplePdfDoc();
  const left = 38;
  const contentWidth = 519;

  doc.setPage(0);
  doc.drawTricolorRail();

  let y = 802;
  doc.drawText('GOVERNMENT OF MAHARASHTRA • DIRECTORATE OF INDUSTRIES', left, y, {
    font: 'F1',
    size: 7.5,
    color: [0.07, 0.41, 0.22],
  });

  y -= 15;
  doc.drawText('UDYOG SETU • DETAILED PROJECT REPORT (DPR) GUIDANCE', left, y, {
    font: 'F1',
    size: 13,
    color: [0.06, 0.09, 0.16],
  });

  y -= 13;
  const cleanId = sanitizePdfText(resource.id).toUpperCase();
  const cleanCategory = sanitizePdfText(resource.category).toUpperCase();
  doc.drawText(`Template ID: ${cleanId} • Sector Category: ${cleanCategory}`, left, y, {
    font: 'F1',
    size: 8,
    color: [0.89, 0.35, 0.08],
  });

  y -= 8;
  doc.drawLine(left, y, left + contentWidth, y, { color: [0.88, 0.91, 0.94], lineWidth: 1 });

  // Summary Card
  y -= 14;
  const cardSummaryHeight = 72;
  doc.drawRect(left, y - cardSummaryHeight, contentWidth, cardSummaryHeight, {
    fillColor: [0.98, 0.99, 1.0],
    strokeColor: [0.88, 0.91, 0.94],
    lineWidth: 1,
  });

  const cleanTitle = sanitizePdfText(resource.titleEn || resource.title);
  const cleanFormat = sanitizePdfText(resource.formatLabel);
  const cleanType = sanitizePdfText(resource.type).toUpperCase();
  const cleanPurpose = sanitizePdfText(resource.purposeEn || resource.purpose);

  doc.drawText(`RESOURCE: ${cleanTitle}`, left + 10, y - 14, { font: 'F1', size: 9.5 });
  doc.drawText(`Format: ${cleanFormat} • Type: ${cleanType}`, left + 10, y - 27, {
    font: 'F2',
    size: 8,
    color: [0.45, 0.52, 0.62],
  });
  doc.drawWrappedText(cleanPurpose, left + 10, y - 40, contentWidth - 20, {
    font: 'F2',
    size: 7.5,
    lineHeight: 10,
  });

  y -= (cardSummaryHeight + 14);

  // 1. Target Audience
  doc.drawRect(left, y - 2, contentWidth, 18, { fillColor: [0.93, 0.95, 0.97] });
  doc.drawText('1. TARGET AUDIENCE & ELIGIBILITY', left + 8, y + 3, { font: 'F1', size: 8.5 });
  y -= 18;
  const cleanAudience = sanitizePdfText(resource.audienceEn || resource.audience);
  y = doc.drawWrappedText(cleanAudience, left + 10, y, contentWidth - 20, { font: 'F2', size: 7.5, lineHeight: 10 });

  y -= 12;

  // 2. Information Checklist
  doc.drawRect(left, y - 2, contentWidth, 18, { fillColor: [0.93, 0.95, 0.97] });
  doc.drawText('2. INFORMATION & DOCUMENTATION CHECKLIST', left + 8, y + 3, { font: 'F1', size: 8.5 });
  y -= 18;
  const cleanInfo = sanitizePdfText(resource.informationEn || resource.information);
  y = doc.drawWrappedText(cleanInfo, left + 10, y, contentWidth - 20, { font: 'F2', size: 7.5, lineHeight: 10 });

  y -= 12;

  // 3. Step-by-Step Instructions
  doc.drawRect(left, y - 2, contentWidth, 18, { fillColor: [0.93, 0.95, 0.97] });
  doc.drawText('3. STEP-BY-STEP PREPARATION INSTRUCTIONS', left + 8, y + 3, { font: 'F1', size: 8.5 });
  y -= 18;
  const cleanSteps = sanitizePdfText(resource.stepsEn || resource.steps);
  y = doc.drawWrappedText(cleanSteps, left + 10, y, contentWidth - 20, { font: 'F2', size: 7.5, lineHeight: 10 });

  y -= 14;

  // Statutory disclaimer
  const disHeight = 52;
  doc.drawRect(left, y - disHeight, contentWidth, disHeight, {
    fillColor: [1.0, 0.98, 0.94],
    strokeColor: [0.98, 0.82, 0.65],
    lineWidth: 1,
  });

  doc.drawText('STATUTORY NOTICE:', left + 10, y - 12, { font: 'F1', size: 7.5, color: [0.76, 0.25, 0.05] });
  doc.drawWrappedText(
    'This DPR guidance template is issued by Udyog Setu for preliminary project appraisal and bank preparation. Official applications must be submitted through designated government portals (MAITRI 2.0 / MIDC Single Window).',
    left + 10,
    y - 24,
    contentWidth - 20,
    { font: 'F2', size: 7, lineHeight: 9.5, color: [0.55, 0.20, 0.05] }
  );

  doc.finalizeFooters('UDYOG SETU • DETAILED PROJECT REPORT (DPR) GUIDANCE DESK');

  const blob = doc.toBlob();
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `Udyog-Setu-DPR-${resource.id}.pdf`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  setTimeout(() => URL.revokeObjectURL(url), 2000);
}
