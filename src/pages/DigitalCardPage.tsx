import React, { useMemo, useState } from 'react';
import {
  Download,
  QrCode,
  Share2,
  MapPin,
  Phone,
  Mail,
  CheckCircle2,
  ShieldAlert,
  Copy,
  Check,
  Building2,
  ShieldCheck,
  CreditCard,
} from 'lucide-react';
import { useLanguage } from '../hooks/useLanguage';
import { FOCUS_SECTORS, MARKET_CATEGORIES } from '../data/industryContent';
import type { BusinessCardProfile, MembershipStatus } from '../types/businessCard';
import {
  createBusinessCardShareUrl,
  readBusinessCard,
  readSharedBusinessCard,
  BUSINESS_CARD_STORAGE_KEY,
} from '../utils/businessCard';
import { createQrMatrix } from '../utils/qrCode';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { PageHeader } from '../components/ui/PageHeader';
import { StatCard } from '../components/ui/StatCard';
import { TiltCard } from '../components/animations/TiltCard';
import { triggerConfetti } from '../components/animations/Confetti';
import { Reveal } from '../components/animations/Reveal';
import { Button } from '../components/ui/Button';

const COPY = {
  mr: {
    eyebrow: 'डिजिटल व्यावसायिक ओळख प्रणाली',
    title: 'तुमच्या व्यवसायाची डिजिटल ओळख, एका कार्डमध्ये',
    description:
      'तुमच्या व्यवसायाची माहिती, उत्पादने आणि संपर्क तपशील एका व्यावसायिक डिजिटल प्रोफाइलद्वारे सादर करा.',
    statCard: 'डिजिटल ओळख',
    statCardSub: 'त्वरित निर्मिती व थेट पूर्वदृश्य',
    statFormats: 'संपर्क फॉरमॅट',
    statFormatsSub: 'vCard (.vcf) व ऑफलाइन QR',
    statB2B: 'B2B जोडणी',
    statB2BSub: 'ऐच्छिक स्थानिक निर्देशिका सूची',
    statPrivacy: 'डेटा गोपनीयता',
    statPrivacySub: 'केवळ या ब्राउझरमध्ये सुरक्षित',
    formTitle: '१. व्यवसाय तपशील प्रविष्ट करा',
    formSubtitle:
      'कार्डवरील माहिती तुमच्या इनपुट्सनुसार रिअल-टाईम पूर्वदृश्यात अपडेट होते.',
    previewTitle: '२. डिजिटल कार्डचे थेट पूर्वदृश्य (Live Preview)',
    businessName: 'व्यवसायाचे किंवा कारखान्याचे नाव *',
    logoLabel: 'व्यवसायाचा लोगो (कमाल १२० KB)',
    representative: 'मालक / अधिकृत प्रतिनिधीचे नाव *',
    category: 'व्यवसाय वर्ग *',
    sector: 'उद्योग क्षेत्र *',
    businessDescription: 'व्यवसायाचे संक्षिप्त वर्णन (कमाल २५० अक्षरे)',
    products: 'उत्पादने व सेवांची यादी *',
    rawMaterials: 'वापरला जाणारा किंवा पुरवठा होणारा कच्चा माल',
    district: 'जिल्हा *',
    industrialArea: 'औद्योगिक परिसर / MIDC वसाहत',
    address: 'कारखाना / कार्यालयाचा पूर्ण पत्ता',
    phone: 'संपर्क मोबाईल क्रमांक *',
    email: 'व्यावसायिक ईमेल पत्ता *',
    membership: 'औद्योगिक संघटना सदस्यत्व',
    memberSelfReported: 'संघटना सदस्य (वापरकर्त्याने नमूद केलेले)',
    notMember: 'संघटना सदस्य नाही',
    notProvided: 'माहिती दिलेली नाही',
    directoryToggle:
      'माझे कार्ड या ब्राउझरच्या स्थानिक B2B निर्देशिकेत दर्शवा (ऐच्छिक)',
    saveBtn: 'डिजिटल कार्ड जतन करा',
    savedNotice: 'कार्ड या ब्राउझरमध्ये सुरक्षित जतन झाले आहे.',
    copyShareBtn: 'शेअर लिंक कॉपी करा',
    copiedText: 'लिंक कॉपी झाली!',
    downloadVcfBtn: 'vCard डाऊनलोड (.vcf)',
    qrTitle: 'संपर्क QR कोड',
    qrNote:
      'मोबाईल कॅमेऱ्याने QR स्कॅन केल्यावर संपर्क तपशील थेट फोनच्या ॲड्रेस बुकमध्ये सेव्ह होतात.',
    verificationNotice: 'पडताळणी स्थिती: पडताळणी प्रलंबित (Pending Verification)',
    transparencyNotice:
      'पारदर्शकता सूचना: हे डिजिटल कार्ड या ब्राउझरच्या लोकल स्टोरेजमध्ये जतन होते. संघटना सदस्यत्व वापरकर्त्याने नमूद केलेले असून अधिकृत तपासणी झालेली नाही. शेअर लिंक उघडणाऱ्या कोणालाही कार्डवरील माहिती दिसते; म्हणून केवळ व्यावसायिक संपर्कच जोडावा.',
    logoError: 'कृपया १२० KB पेक्षा लहान आणि वैध इमेज फाईल (PNG/JPG) निवडा.',
    inputEyebrow: 'माहिती प्रविष्टी • PROFILE INPUT',
    previewEyebrow: 'थेट कार्ड • INTERACTIVE CARD PREVIEW',
    statCardValue: 'लाइव्ह कार्ड',
    statFormatsValue: 'vCard / QR',
    statB2BValue: 'निर्देशिका',
    statPrivacyValue: '१००% लोकल',
    phBusinessName: 'उदा. सह्याद्री इंजिनिअरिंग वर्क्स',
    phRepresentative: 'उदा. राहुल देशमुख (व्यवस्थापकीय संचालक)',
    phDistrict: 'उदा. पुणे',
    phArea: 'उदा. MIDC चाकण फेज २',
    phAddress: 'प्लॉट क्र., इंडस्ट्रियल एरिया, पिनकोड',
    phProducts: 'उदा. सीएनसी मशिनिंग पार्ट्स, ऑटो कंपोनेंट्स',
    phRawMaterials: 'उदा. ॲल्युमिनियम इनगॉट्स, हाय-कार्बन स्टील',
    phDescription: 'कंपनीची ओळख, विशेष कौशल्य आणि क्षमता...',
    cardDefaultName: 'आपल्या व्यवसायाचे नाव',
    cardDefaultRep: 'अधिकृत प्रतिनिधी',
    cardDefaultRegion: 'महाराष्ट्र',
    cardProductsLabel: 'उत्पादने व सेवा:',
    cardRawLabel: 'कच्चा माल क्षमता:',
    cardMemberSelf: 'संघटना सदस्य (Self-declared)',
    cardNonMember: 'बिगर सदस्य',
    qrEmptyNote: 'नाव व फोन नंबर भरल्यावर QR कोड दिसेल',
  },
  hi: {
    eyebrow: 'डिजिटल व्यावसायिक पहचान प्रणाली',
    title: 'आपके व्यवसाय की डिजिटल पहचान, एक कार्ड में',
    description:
      'अपने व्यवसाय की जानकारी, उत्पाद और संपर्क विवरण एक पेशेवर डिजिटल प्रोफ़ाइल के माध्यम से प्रस्तुत करें।',
    statCard: 'डिजिटल पहचान',
    statCardSub: 'त्वरित निर्माण और लाइव पूर्वावलोकन',
    statFormats: 'संपर्क प्रारूप',
    statFormatsSub: 'vCard (.vcf) व ऑफ़लाइन QR',
    statB2B: 'B2B संयोजन',
    statB2BSub: 'वैकल्पिक स्थानीय निर्देशिका सूची',
    statPrivacy: 'डेटा गोपनीयता',
    statPrivacySub: 'इसी ब्राउज़र में सुरक्षित',
    formTitle: '१. व्यवसाय विवरण दर्ज करें',
    formSubtitle:
      'कार्ड पर जानकारी आपके इनपुट के अनुसार वास्तविक समय में अपडेट होती है।',
    previewTitle: '२. डिजिटल कार्ड का लाइव पूर्वावलोकन (Live Preview)',
    businessName: 'व्यवसाय या कारखाने का नाम *',
    logoLabel: 'व्यवसाय का लोगो (अधिकतम 120 KB)',
    representative: 'मालिक / अधिकृत प्रतिनिधि का नाम *',
    category: 'व्यवसाय श्रेणी *',
    sector: 'उद्योग क्षेत्र *',
    businessDescription: 'व्यवसाय का संक्षिप्त विवरण (अधिकतम 250 अक्षर)',
    products: 'उत्पादों और सेवाओं की सूची *',
    rawMaterials: 'उपयोग या आपूर्ति किया जाने वाला कच्चा माल',
    district: 'ज़िला *',
    industrialArea: 'औद्योगिक क्षेत्र / MIDC एस्टेट',
    address: 'कारखाने / कार्यालय का पूरा पता',
    phone: 'संपर्क मोबाइल नंबर *',
    email: 'व्यावसायिक ईमेल पता *',
    membership: 'औद्योगिक संगठन सदस्यता',
    memberSelfReported: 'संगठन सदस्य (स्वयं घोषित)',
    notMember: 'संगठन सदस्य नहीं',
    notProvided: 'उल्लेख नहीं किया',
    directoryToggle:
      'मेरा कार्ड इसी ब्राउज़र की स्थानीय B2B निर्देशिका में दिखाएं (वैकल्पिक)',
    saveBtn: 'डिजिटल कार्ड सहेजें',
    savedNotice: 'कार्ड इसी ब्राउज़र में सुरक्षित रूप से सहेज लिया गया है।',
    copyShareBtn: 'शेयर लिंक कॉपी करें',
    copiedText: 'लिंक कॉपी हो गया!',
    downloadVcfBtn: 'vCard डाउनलोड (.vcf)',
    qrTitle: 'संपर्क QR कोड',
    qrNote:
      'मोबाइल कैमरे से QR स्कैन करने पर संपर्क विवरण सीधे फोन की संपर्क सूची में खुलेंगे।',
    verificationNotice: 'सत्यापन स्थिति: सत्यापन लंबित (Pending Verification)',
    transparencyNotice:
      'पारदर्शिता सूचना: यह डिजिटल कार्ड इसी ब्राउज़र के लोकल स्टोरेज में सहेजा जाता है। संगठन सदस्यता उपयोगकर्ता द्वारा घोषित है और आधिकारिक रूप से सत्यापित नहीं है। शेयर लिंक खोलने वाले किसी भी व्यक्ति को कार्ड की जानकारी दिखाई देगी।',
    logoError: 'कृपया 120 KB से छोटी वैध छवि फ़ाइल (PNG/JPG) चुनें।',
    inputEyebrow: 'जानकारी प्रविष्टि • PROFILE INPUT',
    previewEyebrow: 'लाइव कार्ड • INTERACTIVE CARD PREVIEW',
    statCardValue: 'लाइव कार्ड',
    statFormatsValue: 'vCard / QR',
    statB2BValue: 'निर्देशिका',
    statPrivacyValue: '१००% स्थानीय',
    phBusinessName: 'उदा. सह्याद्री इंजीनियरिंग वर्क्स',
    phRepresentative: 'उदा. राहुल देशमुख (प्रबंध निदेशक)',
    phDistrict: 'उदा. पुणे',
    phArea: 'उदा. MIDC चाकण फेज २',
    phAddress: 'प्लॉट नं., औद्योगिक क्षेत्र, पिनकोड',
    phProducts: 'उदा. सीएनसी मशीनिंग पार्ट्स, ऑटो कंपोनेंट्स',
    phRawMaterials: 'उदा. एल्युमिनियम सिल्लियां, उच्च-कार्बन स्टील',
    phDescription: 'कंपनी का परिचय, विशेष विशेषज्ञता और क्षमताएं...',
    cardDefaultName: 'आपके व्यवसाय का नाम',
    cardDefaultRep: 'अधिकृत प्रतिनिधि',
    cardDefaultRegion: 'महाराष्ट्र',
    cardProductsLabel: 'उत्पाद एवं सेवाएं:',
    cardRawLabel: 'कच्चा माल क्षमता:',
    cardMemberSelf: 'संगठन सदस्य (Self-declared)',
    cardNonMember: 'गैर-सदस्य',
    qrEmptyNote: 'नाम और फोन नंबर दर्ज करने पर QR कोड दिखेगा',
  },
  en: {
    eyebrow: 'Digital Industrial Identity System',
    title: 'Create and share a professional digital business profile',
    description:
      'Present your enterprise credentials, products, raw material capabilities and contact details in a standardized digital card.',
    statCard: 'Digital Identity',
    statCardSub: 'Instant Generation & Live Preview',
    statFormats: 'Contact Formats',
    statFormatsSub: 'vCard (.vcf) & Offline QR',
    statB2B: 'B2B Network',
    statB2BSub: 'Optional Local Directory Listing',
    statPrivacy: 'Client-side Privacy',
    statPrivacySub: 'Stored in Browser Session Only',
    formTitle: '1. Enter Enterprise Details',
    formSubtitle:
      'Inputs dynamically reflect on the live interactive card preview below.',
    previewTitle: '2. Live Interactive Digital Card Preview',
    businessName: 'Enterprise / Factory Name *',
    logoLabel: 'Enterprise Logo (max 120 KB)',
    representative: 'Owner / Authorised Representative *',
    category: 'Business Category *',
    sector: 'Industrial Sector *',
    businessDescription: 'Executive Business Summary (max 250 chars)',
    products: 'Manufactured Products & Services *',
    rawMaterials: 'Raw Materials Sourced or Supplied',
    district: 'District *',
    industrialArea: 'Industrial Area / MIDC Estate',
    address: 'Registered Factory / Office Address',
    phone: 'Direct Contact Number *',
    email: 'Corporate Email Address *',
    membership: 'Industrial Association Affiliation',
    memberSelfReported: 'Affiliated Member (Self-reported)',
    notMember: 'Not an Affiliated Member',
    notProvided: 'Not Provided',
    directoryToggle:
      'Display this profile in this browser’s local B2B directory (Optional)',
    saveBtn: 'Save Digital Card',
    savedNotice: 'Profile successfully preserved within this browser session.',
    copyShareBtn: 'Copy Public Share Link',
    copiedText: 'Share Link Copied!',
    downloadVcfBtn: 'Download Contact vCard (.vcf)',
    qrTitle: 'Offline Contact QR Code',
    qrNote:
      'Scanning with any smartphone camera instantly prompts to import contact details into the mobile address book.',
    verificationNotice: 'Verification Status: Verification Pending',
    transparencyNotice:
      'Transparency Notice: This digital card is stored client-side in your browser. Association affiliations are user-declared and have not been vetted by external registries. Anyone with your shareable URL can view the published card details.',
    logoError: 'Please select an image smaller than 120 KB in PNG or JPG format.',
    inputEyebrow: 'DATA ENTRY • PROFILE INPUT',
    previewEyebrow: 'LIVE CARD • INTERACTIVE CARD PREVIEW',
    statCardValue: 'Live Card',
    statFormatsValue: 'vCard / QR',
    statB2BValue: 'Directory',
    statPrivacyValue: '100% Local',
    phBusinessName: 'e.g. Sahyadri Engineering Works',
    phRepresentative: 'e.g. Rahul Deshmukh (Managing Director)',
    phDistrict: 'e.g. Pune',
    phArea: 'e.g. MIDC Chakan Phase 2',
    phAddress: 'Plot No., Industrial Area, Pincode',
    phProducts: 'e.g. CNC Machining Parts, Auto Components',
    phRawMaterials: 'e.g. Aluminium Ingots, High Carbon Steel',
    phDescription: 'Enterprise background, specialized capabilities...',
    cardDefaultName: 'Your Enterprise Name',
    cardDefaultRep: 'Authorised Representative',
    cardDefaultRegion: 'Maharashtra',
    cardProductsLabel: 'Products & Services:',
    cardRawLabel: 'Raw Material Capacity:',
    cardMemberSelf: 'Association Member (Self-reported)',
    cardNonMember: 'Non-Member',
    qrEmptyNote: 'QR code appears once name and phone are entered',
  },
} as const;

const EMPTY_PROFILE: BusinessCardProfile = {
  businessName: '',
  representative: '',
  businessCategory: 'Manufacturer',
  industrySector: 'Automobiles & EV',
  businessDescription: '',
  district: 'पुणे',
  industrialArea: '',
  productsServices: '',
  rawMaterials: '',
  address: '',
  phone: '',
  email: '',
  membershipStatus: 'not-provided',
  directoryVisible: false,
  verificationStatus: 'not-verified',
};

const escapeMecard = (value: string) =>
  value.replace(/[\\;:,]/g, '\\$&').replace(/\r?\n/g, ' ');

const QrMatrix: React.FC<{ matrix: boolean[][] }> = ({ matrix }) => {
  const size = matrix.length;
  return (
    <svg
      viewBox={`-4 -4 ${size + 8} ${size + 8}`}
      role="img"
      aria-label="QR code"
      className="h-40 w-40 rounded-xl border border-slate-200 bg-white p-2 shadow-2xs"
    >
      <rect x="-4" y="-4" width={size + 8} height={size + 8} fill="white" />
      {matrix.flatMap((row, y) =>
        row.map((dark, x) =>
          dark ? (
            <rect
              key={`${x}-${y}`}
              x={x}
              y={y}
              width="1"
              height="1"
              fill="#111827"
            />
          ) : null
        )
      )}
    </svg>
  );
};

export const DigitalCardPage: React.FC = () => {
  const { language } = useLanguage();
  const c = COPY[language];

  const sharedProfile = useMemo(() => readSharedBusinessCard(), []);
  const [profile, setProfile] = useState<BusinessCardProfile>(
    () => sharedProfile || readBusinessCard() || EMPTY_PROFILE
  );

  const [saved, setSaved] = useState(false);
  const [copied, setCopied] = useState(false);
  const [logoError, setLogoError] = useState(false);

  const update = (key: keyof BusinessCardProfile, value: string | boolean) => {
    setProfile((prev) => ({ ...prev, [key]: value }));
    setSaved(false);
  };

  const qrValue = `MECARD:N:${escapeMecard(profile.representative)};ORG:${escapeMecard(
    profile.businessName
  )};TEL:${escapeMecard(profile.phone)};EMAIL:${escapeMecard(profile.email)};;`;

  const qrMatrix = useMemo(
    () => (profile.businessName && profile.phone ? createQrMatrix(qrValue) : null),
    [qrValue, profile.businessName, profile.phone]
  );

  const saveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    try {
      localStorage.setItem(BUSINESS_CARD_STORAGE_KEY, JSON.stringify(profile));
      setSaved(true);
      triggerConfetti();
    } catch {
      setSaved(false);
      setLogoError(true);
    }
  };

  const selectLogo = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setLogoError(false);
    if (!file) return;
    if (!file.type.startsWith('image/') || file.size > 120 * 1024) {
      setLogoError(true);
      return;
    }
    const reader = new FileReader();
    reader.onload = () =>
      update('logoDataUrl', typeof reader.result === 'string' ? reader.result : '');
    reader.readAsDataURL(file);
  };

  const copyShareLink = async () => {
    const link = createBusinessCardShareUrl(profile);
    try {
      await navigator.clipboard.writeText(link);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      window.prompt(c.copyShareBtn, link);
    }
  };

  const downloadVcard = () => {
    const content = [
      'BEGIN:VCARD',
      'VERSION:3.0',
      `FN:${profile.representative || profile.businessName}`,
      `ORG:${profile.businessName}`,
      profile.phone ? `TEL;TYPE=WORK,VOICE:${profile.phone}` : '',
      profile.email ? `EMAIL;TYPE=WORK:${profile.email}` : '',
      profile.address ? `ADR;TYPE=WORK:;;${profile.address}` : '',
      profile.productsServices
        ? `NOTE:${profile.productsServices.replace(/\r?\n/g, ' ')}`
        : '',
      'END:VCARD',
    ]
      .filter(Boolean)
      .join('\r\n');

    const blob = new Blob([content], { type: 'text/vcard;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${
      profile.businessName.trim().replace(/[^\p{L}\p{N}-]+/gu, '-') || 'business'
    }-contact.vcf`;
    a.click();
    URL.revokeObjectURL(url);
    triggerConfetti();
  };

  return (
    <div className="flex-1 bg-[#F8FAFC] font-devanagari text-[#111827]">
      <div className="mx-auto w-full max-w-[1560px] space-y-10 px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
        <Breadcrumbs
          items={[
            {
              label:
                language === 'mr'
                  ? 'डिजिटल कार्ड'
                  : language === 'hi'
                    ? 'डिजिटल कार्ड'
                    : 'Digital Card',
            },
          ]}
        />

        {/* Hero Header */}
        <PageHeader
          category={c.eyebrow}
          title={c.title}
          description={c.description}
          actions={
            <div className="flex flex-wrap items-center gap-3">
              <Button
                type="button"
                variant="outlined"
                size="md"
                onClick={copyShareLink}
                className="border-slate-300 bg-white text-slate-800 hover:border-[#E35914] hover:bg-[#FFF7ED] hover:text-[#E35914] shadow-xs"
                icon={
                  copied ? (
                    <Check className="h-4 w-4 text-[#136938]" />
                  ) : (
                    <Share2 className="h-4 w-4 text-[#E35914]" />
                  )
                }
              >
                {copied ? c.copiedText : c.copyShareBtn}
              </Button>
              <Button
                type="button"
                variant="primary"
                size="md"
                onClick={downloadVcard}
                icon={<Download className="h-4 w-4 text-white" />}
              >
                {c.downloadVcfBtn}
              </Button>
            </div>
          }
        />

        {/* Metric Bar */}
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
          <StatCard
            label={c.statCard}
            value={c.statCardValue}
            subtext={c.statCardSub}
            icon={<CreditCard className="h-5 w-5" />}
            variant="primary"
          />
          <StatCard
            label={c.statFormats}
            value={c.statFormatsValue}
            subtext={c.statFormatsSub}
            icon={<QrCode className="h-5 w-5" />}
            variant="secondary"
          />
          <StatCard
            label={c.statB2B}
            value={c.statB2BValue}
            subtext={c.statB2BSub}
            icon={<Building2 className="h-5 w-5" />}
            variant="amber"
          />
          <StatCard
            label={c.statPrivacy}
            value={c.statPrivacyValue}
            subtext={c.statPrivacySub}
            icon={<ShieldCheck className="h-5 w-5" />}
            variant="default"
          />
        </div>

        {/* 2-Column Responsive Layout */}
        <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-12">
          {/* Form (7 Columns) */}
          <Reveal variant="fade-right" duration={500} className="space-y-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-xs lg:col-span-7 sm:p-8">
            <div className="border-b border-slate-200 pb-4">
              <span className="font-label text-xs font-bold uppercase tracking-wider text-[#E35914]">
                {c.inputEyebrow}
              </span>
              <h2 className="mt-1 font-devanagari text-lg font-bold text-[#111827]">
                {c.formTitle}
              </h2>
              <p className="font-devanagari text-xs text-slate-500">
                {c.formSubtitle}
              </p>
            </div>

            <form onSubmit={saveProfile} className="space-y-4">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <label className="block space-y-1.5">
                  <span className="text-xs font-semibold text-slate-700">
                    {c.businessName}
                  </span>
                  <input
                    required
                    type="text"
                    value={profile.businessName}
                    onChange={(e) => update('businessName', e.target.value)}
                    placeholder={c.phBusinessName}
                    className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-xs text-[#111827] shadow-2xs transition focus:border-[#E35914] focus:outline-none sm:text-sm"
                  />
                </label>

                <label className="block space-y-1.5">
                  <span className="text-xs font-semibold text-slate-700">
                    {c.representative}
                  </span>
                  <input
                    required
                    type="text"
                    value={profile.representative}
                    onChange={(e) => update('representative', e.target.value)}
                    placeholder={c.phRepresentative}
                    className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-xs text-[#111827] shadow-2xs transition focus:border-[#E35914] focus:outline-none sm:text-sm"
                  />
                </label>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <label className="block space-y-1.5">
                  <span className="text-xs font-semibold text-slate-700">
                    {c.category}
                  </span>
                  <select
                    value={profile.businessCategory}
                    onChange={(e) => update('businessCategory', e.target.value)}
                    className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-xs text-[#111827] shadow-2xs transition focus:border-[#E35914] focus:outline-none sm:text-sm"
                  >
                    {MARKET_CATEGORIES.map((m, idx) => (
                      <option key={idx} value={m.en}>
                        {m[language]}
                      </option>
                    ))}
                  </select>
                </label>

                <label className="block space-y-1.5">
                  <span className="text-xs font-semibold text-slate-700">
                    {c.sector}
                  </span>
                  <select
                    value={profile.industrySector}
                    onChange={(e) => update('industrySector', e.target.value)}
                    className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-xs text-[#111827] shadow-2xs transition focus:border-[#E35914] focus:outline-none sm:text-sm"
                  >
                    {FOCUS_SECTORS.map((s) => (
                      <option key={s.code} value={s.name.en}>
                        {s.name[language]}
                      </option>
                    ))}
                  </select>
                </label>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <label className="block space-y-1.5">
                  <span className="text-xs font-semibold text-slate-700">
                    {c.phone}
                  </span>
                  <input
                    required
                    type="tel"
                    value={profile.phone}
                    onChange={(e) => update('phone', e.target.value)}
                    placeholder="+91 98XXXXXXXX"
                    className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 font-label text-xs text-[#111827] shadow-2xs transition focus:border-[#E35914] focus:outline-none sm:text-sm"
                  />
                </label>

                <label className="block space-y-1.5">
                  <span className="text-xs font-semibold text-slate-700">
                    {c.email}
                  </span>
                  <input
                    required
                    type="email"
                    value={profile.email}
                    onChange={(e) => update('email', e.target.value)}
                    placeholder="contact@enterprise.com"
                    className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 font-label text-xs text-[#111827] shadow-2xs transition focus:border-[#E35914] focus:outline-none sm:text-sm"
                  />
                </label>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <label className="block space-y-1.5">
                  <span className="text-xs font-semibold text-slate-700">
                    {c.district}
                  </span>
                  <input
                    type="text"
                    value={profile.district}
                    onChange={(e) => update('district', e.target.value)}
                    placeholder={c.phDistrict}
                    className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-xs text-[#111827] shadow-2xs transition focus:border-[#E35914] focus:outline-none sm:text-sm"
                  />
                </label>

                <label className="block space-y-1.5">
                  <span className="text-xs font-semibold text-slate-700">
                    {c.industrialArea}
                  </span>
                  <input
                    type="text"
                    value={profile.industrialArea}
                    onChange={(e) => update('industrialArea', e.target.value)}
                    placeholder={c.phArea}
                    className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-xs text-[#111827] shadow-2xs transition focus:border-[#E35914] focus:outline-none sm:text-sm"
                  />
                </label>
              </div>

              <label className="block space-y-1.5">
                <span className="text-xs font-semibold text-slate-700">
                  {c.address}
                </span>
                <input
                  type="text"
                  value={profile.address}
                  onChange={(e) => update('address', e.target.value)}
                  placeholder={c.phAddress}
                  className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-xs text-[#111827] shadow-2xs transition focus:border-[#E35914] focus:outline-none sm:text-sm"
                />
              </label>

              <label className="block space-y-1.5">
                <span className="text-xs font-semibold text-slate-700">
                  {c.products}
                </span>
                <input
                  required
                  type="text"
                  value={profile.productsServices}
                  onChange={(e) => update('productsServices', e.target.value)}
                  placeholder={c.phProducts}
                  className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-xs text-[#111827] shadow-2xs transition focus:border-[#E35914] focus:outline-none sm:text-sm"
                />
              </label>

              <label className="block space-y-1.5">
                <span className="text-xs font-semibold text-slate-700">
                  {c.rawMaterials}
                </span>
                <input
                  type="text"
                  value={profile.rawMaterials}
                  onChange={(e) => update('rawMaterials', e.target.value)}
                  placeholder={c.phRawMaterials}
                  className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-xs text-[#111827] shadow-2xs transition focus:border-[#E35914] focus:outline-none sm:text-sm"
                />
              </label>

              <label className="block space-y-1.5">
                <span className="text-xs font-semibold text-slate-700">
                  {c.businessDescription}
                </span>
                <textarea
                  rows={2}
                  maxLength={250}
                  value={profile.businessDescription}
                  onChange={(e) => update('businessDescription', e.target.value)}
                  placeholder={c.phDescription}
                  className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-xs text-[#111827] shadow-2xs transition focus:border-[#E35914] focus:outline-none sm:text-sm"
                />
              </label>

              <div className="grid grid-cols-1 items-center gap-4 sm:grid-cols-2">
                <label className="block space-y-1.5">
                  <span className="text-xs font-semibold text-slate-700">
                    {c.membership}
                  </span>
                  <select
                    value={profile.membershipStatus}
                    onChange={(e) =>
                      update('membershipStatus', e.target.value as MembershipStatus)
                    }
                    className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-xs text-[#111827] shadow-2xs transition focus:border-[#E35914] focus:outline-none sm:text-sm"
                  >
                    <option value="self-reported-member">{c.memberSelfReported}</option>
                    <option value="not-a-member">{c.notMember}</option>
                    <option value="not-provided">{c.notProvided}</option>
                  </select>
                </label>

                <label className="block space-y-1.5">
                  <span className="text-xs font-semibold text-slate-700">
                    {c.logoLabel}
                  </span>
                  <input
                    type="file"
                    accept="image/png,image/jpeg"
                    onChange={selectLogo}
                    className="block w-full text-xs text-slate-500"
                  />
                  {logoError && (
                    <p className="text-[11px] font-medium text-red-600">
                      {c.logoError}
                    </p>
                  )}
                </label>
              </div>

              <div className="pt-2">
                <label className="flex cursor-pointer items-center gap-2.5 text-xs font-medium text-slate-700">
                  <input
                    type="checkbox"
                    checked={profile.directoryVisible}
                    onChange={(e) => update('directoryVisible', e.target.checked)}
                    className="h-4 w-4 rounded border-slate-300 text-[#E35914] focus:ring-[#E35914]"
                  />
                  <span>{c.directoryToggle}</span>
                </label>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-3 pt-3">
                <Button type="submit" variant="primary" size="md">
                  {c.saveBtn}
                </Button>
                {saved && (
                  <span className="flex items-center gap-1.5 font-devanagari text-xs font-bold text-[#136938]">
                    <CheckCircle2 className="h-4 w-4" />
                    {c.savedNotice}
                  </span>
                )}
              </div>
            </form>
          </Reveal>

          {/* Right: Live Interactive Card Preview (5 Columns) */}
          <Reveal variant="fade-left" duration={500} className="space-y-6 lg:col-span-5">
            <div className="space-y-1">
              <span className="font-label text-xs font-bold uppercase tracking-wider text-[#136938]">
                {c.previewEyebrow}
              </span>
              <h3 className="font-devanagari text-lg font-bold text-[#111827]">
                {c.previewTitle}
              </h3>
            </div>

            {/* Live Business Card with 3D Tilt & Specular Reflection */}
            <TiltCard
              maxTilt={8}
              scale={1.02}
              glare={true}
              className="relative overflow-hidden rounded-2xl border-2 border-slate-200 bg-white p-6 shadow-md transition-all hover:shadow-xl sm:p-7"
            >
              <div className="absolute left-0 right-0 top-0 h-[2.5px] bg-gradient-to-r from-[#E35914] via-[#F59E0B] to-[#136938]" />
              <div className="pointer-events-none absolute left-0 right-0 top-0 h-3 bg-gradient-to-r from-[#E35914]/15 via-[#F59E0B]/12 to-[#136938]/15 blur-xs" />

              {/* Card Header: Logo & Title */}
              <div className="flex items-start gap-4">
                {profile.logoDataUrl ? (
                  <img
                    src={profile.logoDataUrl}
                    alt="Logo"
                    className="h-16 w-16 shrink-0 rounded-xl border border-slate-200 object-contain p-1"
                  />
                ) : (
                  <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-xl border border-orange-200 bg-orange-50 font-label text-2xl font-bold text-[#E35914]">
                    {profile.businessName
                      ? profile.businessName.charAt(0).toUpperCase()
                      : 'U'}
                  </div>
                )}

                <div className="min-w-0 flex-1">
                  <h3 className="break-words font-devanagari text-lg font-extrabold leading-tight text-[#111827] sm:text-xl">
                    {profile.businessName || c.cardDefaultName}
                  </h3>
                  <p className="mt-0.5 font-devanagari text-xs font-semibold text-[#E35914]">
                    {MARKET_CATEGORIES.find((m) => m.en === profile.businessCategory)?.[language] || profile.businessCategory}{' '}
                    {profile.industrySector ? `· ${FOCUS_SECTORS.find((s) => s.name.en === profile.industrySector)?.name[language] || profile.industrySector}` : ''}
                  </p>
                  <p className="mt-1 font-devanagari text-xs font-medium text-slate-600">
                    {profile.representative || c.cardDefaultRep}
                  </p>
                </div>
              </div>

              {profile.businessDescription && (
                <p className="mt-4 rounded-xl border border-slate-100 bg-slate-50/80 p-3 font-devanagari text-xs leading-relaxed text-slate-700">
                  {profile.businessDescription}
                </p>
              )}

              {/* Products & Raw Materials */}
              <div className="mt-4 space-y-2 border-t border-slate-100 pt-4 font-devanagari text-xs">
                <div>
                  <strong className="block text-slate-900">{c.cardProductsLabel}</strong>
                  <span className="text-slate-600">
                    {profile.productsServices || '—'}
                  </span>
                </div>
                {profile.rawMaterials && (
                  <div>
                    <strong className="block text-slate-900">
                      {c.cardRawLabel}
                    </strong>
                    <span className="text-slate-600">
                      {profile.rawMaterials}
                    </span>
                  </div>
                )}
              </div>

              {/* Location & Contacts */}
              <div className="mt-4 space-y-2 border-t border-slate-100 pt-4 font-devanagari text-xs">
                <div className="flex items-center gap-2 text-slate-600">
                  <MapPin className="h-4 w-4 shrink-0 text-[#E35914]" />
                  <span>
                    {[profile.industrialArea, profile.district, profile.address]
                      .filter(Boolean)
                      .join(', ') || c.cardDefaultRegion}
                  </span>
                </div>
                {profile.phone && (
                  <div className="flex items-center gap-2 text-slate-600">
                    <Phone className="h-4 w-4 shrink-0 text-[#136938]" />
                    <a
                      href={`tel:${profile.phone}`}
                      className="font-label text-slate-900 hover:underline"
                    >
                      {profile.phone}
                    </a>
                  </div>
                )}
                {profile.email && (
                  <div className="flex items-center gap-2 text-slate-600">
                    <Mail className="h-4 w-4 shrink-0 text-[#E35914]" />
                    <a
                      href={`mailto:${profile.email}`}
                      className="font-label text-slate-900 hover:underline"
                    >
                      {profile.email}
                    </a>
                  </div>
                )}
              </div>

              {/* Verification & Status Badges */}
              <div className="mt-4 flex flex-wrap gap-2 pt-2 font-label text-[11px]">
                <span className="rounded-md border border-slate-200 bg-slate-100 px-2.5 py-1 text-slate-600">
                  {profile.membershipStatus === 'self-reported-member'
                    ? c.cardMemberSelf
                    : c.cardNonMember}
                </span>
                <span className="rounded-md border border-amber-200 bg-amber-50 px-2.5 py-1 text-amber-900">
                  {c.verificationNotice}
                </span>
              </div>
            </TiltCard>

            {/* Offline QR Code & Actions Card */}
            <div className="space-y-4 rounded-2xl border border-slate-200 bg-white p-6 text-center shadow-xs">
              <h4 className="flex items-center justify-center gap-2 font-label text-xs font-bold uppercase tracking-wider text-slate-900">
                <QrCode className="h-4 w-4 text-[#E35914]" />
                {c.qrTitle}
              </h4>
              <p className="font-devanagari text-xs text-slate-500">{c.qrNote}</p>

              <div className="flex justify-center py-1">
                {qrMatrix ? (
                  <QrMatrix matrix={qrMatrix} />
                ) : (
                  <div className="flex h-40 w-40 flex-col items-center justify-center rounded-xl border border-dashed border-slate-300 bg-slate-50 p-4 text-center text-xs text-slate-400">
                    <QrCode className="mb-2 h-8 w-8 text-slate-300" />
                    <span>{c.qrEmptyNote}</span>
                  </div>
                )}
              </div>

              <div className="flex flex-col justify-center gap-2.5 pt-2 sm:flex-row">
                <Button
                  type="button"
                  variant="outlined"
                  size="sm"
                  onClick={downloadVcard}
                  icon={<Download className="h-4 w-4 text-[#136938]" />}
                >
                  {c.downloadVcfBtn}
                </Button>
                <Button
                  type="button"
                  variant="secondary"
                  size="sm"
                  onClick={copyShareLink}
                  icon={
                    copied ? (
                      <Check className="h-4 w-4 text-[#136938]" />
                    ) : (
                      <Copy className="h-4 w-4 text-[#E35914]" />
                    )
                  }
                >
                  {copied ? c.copiedText : c.copyShareBtn}
                </Button>
              </div>
            </div>

            {/* Transparency Notice */}
            <div className="flex items-start gap-2.5 rounded-xl border border-amber-200 bg-amber-50/70 p-4 text-xs text-amber-900">
              <ShieldAlert className="mt-0.5 h-4 w-4 shrink-0 text-amber-700" />
              <p className="leading-relaxed">{c.transparencyNotice}</p>
            </div>
          </Reveal>
        </div>
      </div>
    </div>
  );
};
