import React, { useMemo, useState } from 'react';
import {
  Building2,
  ExternalLink,
  Search,
  ShieldCheck,
  Factory,
  Truck,
  ShoppingBag,
  Wrench,
  Users,
  CheckCircle2,
  ArrowRight,
  ContactRound,
  FileCheck2,
  Globe,
  SlidersHorizontal,
} from 'lucide-react';
import { useLanguage } from '../hooks/useLanguage';
import {
  FOCUS_SECTORS,
  MARKET_CATEGORIES,
  OFFICIAL_SOURCES,
  B2B_ECOSYSTEM_PILLARS,
  B2B_REQUIREMENT_WORKFLOW,
  GEM_PROCUREMENT_STEPS,
} from '../data/industryContent';
import type { BusinessCardProfile } from '../types/businessCard';
import { readBusinessCard } from '../utils/businessCard';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { PageHeader } from '../components/ui/PageHeader';
import { SectionHeader } from '../components/ui/SectionHeader';
import { StatCard } from '../components/ui/StatCard';
import { CompactStepper } from '../components/ui/CompactStepper';
import { OfficialSourceLink } from '../components/ui/OfficialSourceLink';
import { TabsBar } from '../components/ui/TabsBar';
import { Button } from '../components/ui/Button';
import { triggerConfetti } from '../components/animations/Confetti';
import { Reveal } from '../components/animations/Reveal';
import { TiltCard } from '../components/animations/TiltCard';

type Tab = 'directory' | 'tenders';
type Requirement = {
  product: string;
  rawMaterial: string;
  category: string;
  sector: string;
  district: string;
  area: string;
  quantity: string;
  details: string;
  fileName: string;
  contact: string;
  createdAt?: string;
};

const COPY = {
  mr: {
    eyebrow: 'औद्योगिक पुरवठा साखळी व B2B व्यासपीठ',
    title: 'उद्योगांना जोडा, पुरवठा साखळी मजबूत करा आणि व्यवसायाच्या संधी शोधा',
    description:
      'महाराष्ट्रातील उत्पादक, पुरवठादार, खरेदीदार आणि औद्योगिक संघटनांना जोडणारे व्यावसायिक व्यासपीठ.',
    statPillars: 'परिसंस्था स्तंभ',
    statPillarsSub: '५ प्रमुख औद्योगिक आधारस्तंभ',
    statWorkflow: 'खरेदी कार्यप्रवाह',
    statWorkflowSub: '५ टप्प्यांची मागणी प्रक्रिया',
    statGem: 'GeM ऑनबोर्डिंग',
    statGemSub: '४ पायऱ्यांमध्ये विक्रेता नोंदणी',
    statTenders: 'निविदा पोर्टल्स',
    statTendersSub: 'GeM, CPPP व MahaTenders',
    ecosystemTitle: 'महाराष्ट्र B2B औद्योगिक परिसंस्था — ५ प्रमुख स्तंभ',
    ecosystemSubtitle:
      'स्थानिक पुरवठादार, उत्पादक आणि खरेदीदार यांच्यातील परस्पर सहकार्य व व्यापारी जोडणी.',
    directoryTab: 'B2B पुरवठादार व विक्रेता निर्देशिका',
    tendersTab: 'GeM व शासकीय ई-निविदा संसाधने',
    filtersHeading: 'उद्योजक शोध व फिल्टर निकष',
    productSearch: 'उत्पादनाचे नाव',
    rawSearch: 'कच्चा माल',
    categorySelect: 'व्यवसाय श्रेणी',
    sectorSelect: 'उद्योग क्षेत्र',
    districtSelect: 'जिल्हा',
    areaSelect: 'औद्योगिक क्षेत्र / परिसर',
    emptyTitle: 'या निकषांशी जुळणारी स्थानिक नोंद उपलब्ध नाही',
    emptyDesc:
      'व्यावसायिक मालकाने डिजिटल कार्ड तयार करून सूचीकरणाला संमती दिल्यानंतरच त्यांची नोंद येथे दिसेल. सध्या कोणत्याही बाहेरील किंवा काल्पनिक कंपन्यांची बनावट यादी येथे जोडलेली नाही.',
    createCardBtn: 'व्यावसायिक डिजिटल कार्ड तयार करा',
    postRequirementTitle: 'व्यवसायाची खरेदी किंवा पुरवठा आवश्यकता नोंदवा',
    postRequirementSubtitle:
      'उत्पादन, कच्चा माल किंवा तांत्रिक सेवा शोधासाठी प्राथमिक मागणी नोंदवा.',
    productNeed: 'आवश्यक उत्पादन किंवा सेवा *',
    rawNeed: 'आवश्यक कच्चा माल / ग्रेड',
    quantityNeed: 'अपेक्षित प्रमाण / संख्या (उदा. ५ टन/महिना)',
    detailsNeed: 'तांत्रिक विनिर्देश व गरजेचा संक्षिप्त तपशील *',
    attachmentLabel: 'तांत्रिक रेखाचित्र / तपशील फाईल (केवळ नाव नोंदवले जाईल)',
    contactEmail: 'अधिकृत संपर्क ईमेल किंवा फोन *',
    submitRequirement: 'आवश्यकता नोंद जतन करा',
    requirementSaved:
      'तुमची आवश्यकता या ब्राउझरमध्ये सुरक्षित जतन झाली आहे. ती कोणत्याही बाहेरील सर्व्हरवर पाठवली जात नाही.',
    gemTitle: 'GeM (गव्हर्नमेंट ई-मार्केटप्लेस) व शासकीय खरेदी मार्गदर्शक',
    gemSubtitle:
      'सरकारी विभागांना माल व सेवा पुरवण्यासाठी अधिकृत ऑनबोर्डिंग प्रक्रिया.',
    gemStepsHeading: 'GeM विक्रेता नोंदणी व खरेदी — ४ पायऱ्या',
    procurementPortals: 'अधिकृत खरेदी व ई-निविदा पोर्टल्स',
    transparencyNotice:
      'पारदर्शकता सूचना: Udyog Setu हे स्वतंत्र माहिती व मार्गदर्शन व्यासपीठ आहे. येथे केवळ वापरकर्त्याने स्वतः तयार केलेले स्थानिक डिजिटल कार्डच ऐच्छिक संमतीने दिसते; कोणतीही बनावट व्यावसायिक यादी दर्शवली जात नाही.',
    stepPrefix: 'पायरी',
    mahaTendersBtn: 'MahaTenders पोर्टल',
    statPillarsValue: '५ स्तंभ',
    statWorkflowValue: '५ टप्पे',
    statGemValue: '४ पायऱ्या',
    statTendersValue: '३ पोर्टल्स',
    ecosystemEyebrow: 'परिसंस्था रचना • ECOSYSTEM PILLARS',
    allCategoriesOpt: 'सर्व वर्ग (All Categories)',
    allSectorsOpt: 'सर्व क्षेत्रे (All Sectors)',
    phProduct: 'उदा. स्टील पाईप्स, पॅकेजिंग',
    phRaw: 'उदा. कॉपर रॉड्स, पॉलिमर ग्रॅन्यूल्स',
    phDistrict: 'उदा. पुणे, नाशिक, ठाणे',
    phArea: 'उदा. चाकण, भोसरी, बुटीबोरी',
    phReqDistrict: 'जिल्हा (उदा. पुणे)',
    phReqArea: 'औद्योगिक परिसर',
    localBusinessProfile: 'स्थानिक व्यवसाय प्रोफाइल',
    lblLocation: 'स्थान: ',
    lblProductsServices: 'उत्पादने व सेवा: ',
    lblSuppliedRaw: 'पुरवठा होणारा कच्चा माल: ',
    lblRepresentative: 'अधिकृत प्रतिनिधी: ',
    lblMembershipStatus: 'सदस्यत्व स्थिती:',
    contactDirect: 'थेट संपर्क साधा',
    sourcingEyebrow: 'खरेदी मागणी • SOURCING INQUIRY',
    workflowHeading: 'खरेदी मागणी प्रक्रिया प्रवाह',
    associationTitle: 'औद्योगिक संघटना नोंदणी',
    associationDesc: 'तुमच्या औद्योगिक वसाहतीतील असोसिएशनला उद्योग सेतूशी जोडण्यासाठी संघटना नोंदणी सुविधा वापरा.',
    associationBtn: 'संघटना नोंदणी फॉर्म उघडा',
    gemEyebrow: 'शासकीय ई-बाजार • PUBLIC PROCUREMENT',
    gemStagePrefix: 'GeM खरेदी टप्पा',
    gemDesc: 'केंद्रीय व राज्य खरेदीदारांसाठी राष्ट्रीय ई-मार्केटप्लेस',
    cpppDesc: 'केंद्रीय सार्वजनिक खरेदी व ई-निविदा प्रणाली (CPPP)',
    mahaTendersDesc: 'महाराष्ट्र शासनाचे अधिकृत ई-निविदा पोर्टल (MahaTenders)',
    gemDocsTitle: 'GeM नोंदणीसाठी आवश्यक कागदपत्रे',
    docPanAadhaar: '✓ पॅन कार्ड व आधार कार्ड',
    docUdyam: '✓ उद्यम (Udyam) MSME प्रमाणपत्र',
    docGstn: '✓ सक्रिय जीएसटीएन (GSTN) तपशील',
    docItr: '✓ मागील ३ वर्षांचे आयटीआर (ITR) विवरण',
    docBank: '✓ रद्द केलेला चेक व बँक खाते तपशील',
  },
  hi: {
    eyebrow: 'औद्योगिक आपूर्ति श्रृंखला एवं B2B मंच',
    title: 'उद्योगों को जोड़ें, आपूर्ति श्रृंखला को मजबूत करें और व्यापार के नए अवसर खोजें',
    description:
      'महाराष्ट्र के निर्माताओं, आपूर्तिकर्ताओं, खरीदारों और औद्योगिक संगठनों को जोड़ने वाला व्यावसायिक मंच।',
    statPillars: 'पारिस्थितिकी स्तंभ',
    statPillarsSub: '५ मुख्य औद्योगिक आधारस्तंभ',
    statWorkflow: 'खरीद कार्यप्रवाह',
    statWorkflowSub: '५ चरणों की मांग प्रक्रिया',
    statGem: 'GeM ऑनबोर्डिंग',
    statGemSub: '४ चरणों में विक्रेता पंजीकरण',
    statTenders: 'निविदा पोर्टल्स',
    statTendersSub: 'GeM, CPPP व MahaTenders',
    ecosystemTitle: 'महाराष्ट्र B2B औद्योगिक पारिस्थितिकी तंत्र — ५ मुख्य स्तंभ',
    ecosystemSubtitle:
      'स्थानीय आपूर्तिकर्ताओं, निर्माताओं और खरीदारों के बीच पारस्परिक सहयोग और व्यावसायिक संबंध।',
    directoryTab: 'B2B विक्रेता एवं आपूर्तिकर्ता निर्देशिका',
    tendersTab: 'GeM एवं सरकारी ई-निविदा संसाधन',
    filtersHeading: 'उद्यमी खोज एवं फ़िल्टर मानदंड',
    productSearch: 'उत्पाद का नाम',
    rawSearch: 'कच्चा माल',
    categorySelect: 'व्यवसाय श्रेणी',
    sectorSelect: 'उद्योग क्षेत्र',
    districtSelect: 'ज़िला',
    areaSelect: 'औद्योगिक क्षेत्र / स्थान',
    emptyTitle: 'इन मानदंडों से मेल खाने वाली कोई स्थानीय प्रविष्टि नहीं है',
    emptyDesc:
      'व्यवसाय स्वामी द्वारा डिजिटल कार्ड बनाने और सूचीकरण की सहमति देने के बाद ही उनकी प्रविष्टि यहां दिखाई देगी। यहां कोई काल्पनिक या असत्यापित व्यावसायिक सूची नहीं दिखाई गई है।',
    createCardBtn: 'व्यावसायिक डिजिटल कार्ड बनाएं',
    postRequirementTitle: 'व्यवसाय की खरीद या आपूर्ति आवश्यकता दर्ज करें',
    postRequirementSubtitle:
      'उत्पाद, कच्चे माल या तकनीकी सेवा की खोज के लिए प्रारंभिक मांग दर्ज करें।',
    productNeed: 'आवश्यक उत्पाद या सेवा *',
    rawNeed: 'आवश्यक कच्चा माल / ग्रेड',
    quantityNeed: 'अपेक्षित मात्रा (उदा. 5 टन/माह)',
    detailsNeed: 'तकनीकी विनिर्देश और आवश्यकता का संक्षिप्त विवरण *',
    attachmentLabel: 'तकनीकी ड्राइंग / विशिष्टता फ़ाइल (केवल नाम दर्ज होगा)',
    contactEmail: 'अधिकृत संपर्क ईमेल या फ़ोन *',
    submitRequirement: 'आवश्यकता प्रविष्टि सहेजें',
    requirementSaved:
      'आपकी आवश्यकता इसी ब्राउज़र में सुरक्षित रूप से सहेज ली गई है। इसे किसी बाहरी सर्वर पर नहीं भेजा गया है।',
    gemTitle: 'GeM (गवर्नमेंट ई-मार्केटप्लेस) एवं सरकारी खरीद मार्गदर्शिका',
    gemSubtitle:
      'सरकारी विभागों को माल एवं सेवाएं आपूर्ति करने के लिए आधिकारिक ऑनबोर्डिंग प्रक्रिया।',
    gemStepsHeading: 'GeM विक्रेता पंजीकरण एवं खरीद — ४ चरण',
    procurementPortals: 'आधिकारिक खरीद एवं ई-निविदा पोर्टल',
    transparencyNotice:
      'पारदर्शिता सूचना: Udyog Setu एक स्वतंत्र जानकारी और मार्गदर्शन मंच है। यहां केवल उपयोगकर्ता द्वारा स्वेच्छा से बनाया गया स्थानीय डिजिटल कार्ड ही दिखता है; कोई भी काल्पनिक व्यावसायिक सूची प्रदर्शित नहीं की जाती।',
    stepPrefix: 'चरण',
    mahaTendersBtn: 'MahaTenders पोर्टल',
    statPillarsValue: '५ स्तंभ',
    statWorkflowValue: '५ चरण',
    statGemValue: '४ चरण',
    statTendersValue: '३ पोर्टल',
    ecosystemEyebrow: 'पारिस्थितिकी तंत्र • ECOSYSTEM PILLARS',
    allCategoriesOpt: 'सभी श्रेणियां (All Categories)',
    allSectorsOpt: 'सभी क्षेत्र (All Sectors)',
    phProduct: 'उदा. स्टील पाइप्स, पैकेजिंग',
    phRaw: 'उदा. कॉपर रॉड्स, पॉलिमर ग्रैन्यूल्स',
    phDistrict: 'उदा. पुणे, नाशिक, ठाणे',
    phArea: 'उदा. चाकण, भोसरी, बुटीबोरी',
    phReqDistrict: 'ज़िला (उदा. पुणे)',
    phReqArea: 'औद्योगिक क्षेत्र',
    localBusinessProfile: 'स्थानीय व्यवसाय प्रोफ़ाइल',
    lblLocation: 'स्थान: ',
    lblProductsServices: 'उत्पाद एवं सेवाएं: ',
    lblSuppliedRaw: 'आपूर्तित कच्चा माल: ',
    lblRepresentative: 'अधिकृत प्रतिनिधि: ',
    lblMembershipStatus: 'सदस्यता स्थिति:',
    contactDirect: 'सीधे संपर्क करें',
    sourcingEyebrow: 'खरीद मांग • SOURCING INQUIRY',
    workflowHeading: 'खरीद मांग प्रक्रिया प्रवाह',
    associationTitle: 'औद्योगिक संगठन पंजीकरण',
    associationDesc: 'अपने औद्योगिक एस्टेट के एसोसिएशन को उद्योग सेतु से जोड़ने के लिए संगठन पंजीकरण सुविधा का उपयोग करें।',
    associationBtn: 'संगठन पंजीकरण फ़ॉर्म खोलें',
    gemEyebrow: 'सरकारी ई-मार्केट • PUBLIC PROCUREMENT',
    gemStagePrefix: 'GeM खरीद चरण',
    gemDesc: 'केंद्रीय और राज्य खरीदारों के लिए राष्ट्रीय ई-मार्केटप्लेस',
    cpppDesc: 'केंद्रीय सार्वजनिक खरीद एवं ई-निविदा प्रणाली (CPPP)',
    mahaTendersDesc: 'महाराष्ट्र सरकार का आधिकारिक ई-निविदा पोर्टल (MahaTenders)',
    gemDocsTitle: 'GeM पंजीकरण के लिए आवश्यक दस्तावेज',
    docPanAadhaar: '✓ पैन कार्ड और आधार कार्ड',
    docUdyam: '✓ उद्यम (Udyam) MSME प्रमाणपत्र',
    docGstn: '✓ सक्रिय जीएसटीएन (GSTN) विवरण',
    docItr: '✓ पिछले ३ वर्षों का आईटीआर (ITR) विवरण',
    docBank: '✓ कैंसल चेक और बैंक खाता विवरण',
  },
  en: {
    eyebrow: 'Industrial Supply Chain & B2B Facilitation',
    title: 'Connect industries, strengthen supply chains and discover business opportunities',
    description:
      'A dedicated business-to-business facilitation platform connecting manufacturers, suppliers, buyers and industrial associations across Maharashtra.',
    statPillars: 'Ecosystem Pillars',
    statPillarsSub: '5 Foundational Pillars',
    statWorkflow: 'Sourcing Flow',
    statWorkflowSub: '5-Stage Inquiry Pipeline',
    statGem: 'GeM Onboarding',
    statGemSub: '4-Step Vendor Registration',
    statTenders: 'Tender Gateways',
    statTendersSub: 'GeM, CPPP & MahaTenders',
    ecosystemTitle: 'Maharashtra Industrial B2B Ecosystem — 5 Core Pillars',
    ecosystemSubtitle:
      'Synergy between local supply chains, precision manufacturing and public procurement.',
    directoryTab: 'B2B Vendor & Supplier Directory',
    tendersTab: 'GeM & Government Tender Resources',
    filtersHeading: 'Supplier Search & Category Filters',
    productSearch: 'Product Name',
    rawSearch: 'Raw Material',
    categorySelect: 'Business Category',
    sectorSelect: 'Industrial Sector',
    districtSelect: 'District',
    areaSelect: 'Industrial Area / Zone',
    emptyTitle: 'No Matching Verified Local Profile Found',
    emptyDesc:
      'A business profile appears here only when a verified enterprise creates a digital business card in this browser and opts into directory visibility. We never display fictional vendor companies or fabricated registrations.',
    createCardBtn: 'Create Your Digital Business Card',
    postRequirementTitle: 'Post an Industrial Procurement Requirement',
    postRequirementSubtitle:
      'Draft an inquiry for raw material sourcing, fabrication services or specialized industrial supplies.',
    productNeed: 'Required Product or Service *',
    rawNeed: 'Raw Material / Technical Grade',
    quantityNeed: 'Estimated Quantity / Delivery Cadence',
    detailsNeed: 'Technical Specifications & Commercial Scope *',
    attachmentLabel: 'Technical Drawing / Spec Sheet (filename recorded locally)',
    contactEmail: 'Authorised Procurement Contact & Email *',
    submitRequirement: 'Save Procurement Requirement',
    requirementSaved:
      'Your procurement inquiry has been recorded securely in this browser session. It has not been broadcasted to external servers.',
    gemTitle: 'Government e-Marketplace (GeM) & Public Procurement',
    gemSubtitle:
      'Official vendor onboarding process for supplying goods and services to government departments.',
    gemStepsHeading: 'GeM Seller Registration Workflow — 4 Steps',
    procurementPortals: 'Official Procurement & e-Tender Portals',
    transparencyNotice:
      'Transparency Notice: Udyog Setu is an independent guidance platform. We never populate directories with fabricated companies. Listings reflect user-created profiles stored within this browser with explicit directory consent.',
    stepPrefix: 'Step',
    mahaTendersBtn: 'MahaTenders Portal',
    statPillarsValue: '5 Pillars',
    statWorkflowValue: '5 Stages',
    statGemValue: '4 Steps',
    statTendersValue: '3 Portals',
    ecosystemEyebrow: 'ECOSYSTEM ARCHITECTURE • ECOSYSTEM PILLARS',
    allCategoriesOpt: 'All Categories',
    allSectorsOpt: 'All Sectors',
    phProduct: 'e.g. Steel Pipes, Packaging',
    phRaw: 'e.g. Copper Rods, Polymer Granules',
    phDistrict: 'e.g. Pune, Nashik, Thane',
    phArea: 'e.g. Chakan, Bhosari, Butibori',
    phReqDistrict: 'District (e.g. Pune)',
    phReqArea: 'Industrial Area',
    localBusinessProfile: 'Local Verified Profile',
    lblLocation: 'Location: ',
    lblProductsServices: 'Products & Services: ',
    lblSuppliedRaw: 'Raw Materials Sourced: ',
    lblRepresentative: 'Authorised Representative: ',
    lblMembershipStatus: 'Membership Status:',
    contactDirect: 'Contact Enterprise',
    sourcingEyebrow: 'PROCUREMENT REQUIREMENT • SOURCING INQUIRY',
    workflowHeading: 'Procurement Pipeline Flow',
    associationTitle: 'Industrial Association Onboarding',
    associationDesc: 'Facilitate collective directory integration for industrial clusters and estate associations.',
    associationBtn: 'Open Association Registration',
    gemEyebrow: 'PUBLIC PROCUREMENT • PUBLIC PROCUREMENT',
    gemStagePrefix: 'GeM Procurement Stage',
    gemDesc: 'National public procurement portal for central and state buyers',
    cpppDesc: 'Central Public Procurement Portal & e-Tendering System (CPPP)',
    mahaTendersDesc: 'Government of Maharashtra Official e-Tender Portal (MahaTenders)',
    gemDocsTitle: 'Mandatory Documents for GeM Onboarding',
    docPanAadhaar: '✓ PAN Card & Aadhaar Card',
    docUdyam: '✓ Udyam MSME Registration Certificate',
    docGstn: '✓ Active GSTN Verification Details',
    docItr: '✓ Past 3 Years Income Tax Returns (ITR)',
    docBank: '✓ Cancelled Cheque & Bank Account Details',
  },
} as const;

const INITIAL_REQUIREMENT: Requirement = {
  product: '',
  rawMaterial: '',
  category: '',
  sector: '',
  district: '',
  area: '',
  quantity: '',
  details: '',
  fileName: '',
  contact: '',
};

export const UdyogSetuB2BPage: React.FC = () => {
  const { language } = useLanguage();
  const c = COPY[language];

  const [tab, setTab] = useState<Tab>('directory');
  const [profile] = useState<BusinessCardProfile | null>(() => readBusinessCard());
  const [filters, setFilters] = useState({
    product: '',
    raw: '',
    category: '',
    sector: '',
    district: '',
    area: '',
  });

  const [requirement, setRequirement] = useState<Requirement>(INITIAL_REQUIREMENT);
  const [posted, setPosted] = useState(false);
  const [activeGemStep, setActiveGemStep] = useState(0);

  const listing = useMemo(() => {
    if (!profile?.directoryVisible) return null;
    const contains = (value: string, query: string) =>
      value.toLocaleLowerCase().includes(query.trim().toLocaleLowerCase());

    const matches =
      (!filters.product.trim() || contains(profile.productsServices, filters.product)) &&
      (!filters.raw.trim() || contains(profile.rawMaterials, filters.raw)) &&
      (!filters.category.trim() || contains(profile.businessCategory, filters.category)) &&
      (!filters.sector.trim() || contains(profile.industrySector, filters.sector)) &&
      (!filters.district.trim() || contains(profile.district, filters.district)) &&
      (!filters.area.trim() || contains(profile.industrialArea, filters.area));

    return matches ? profile : null;
  }, [profile, filters]);

  const gemStepItems = useMemo(() => {
    return GEM_PROCUREMENT_STEPS.map((gst, idx) => ({
      id: gst.step,
      stepNumber: idx + 1,
      title: gst.title[language],
      subtitle: `${c.stepPrefix} ${gst.step}`,
      description: gst.desc[language],
    }));
  }, [language, c.stepPrefix]);

  const saveRequirement = (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const existing = JSON.parse(
        localStorage.getItem('udyog_setu_b2b_requirements_v2') || '[]'
      ) as Requirement[];
      localStorage.setItem(
        'udyog_setu_b2b_requirements_v2',
        JSON.stringify([{ ...requirement, createdAt: new Date().toISOString() }, ...existing])
      );
      setPosted(true);
      triggerConfetti();
      setRequirement(INITIAL_REQUIREMENT);
    } catch {
      setPosted(false);
    }
  };

  const getPillarIcon = (name: string) => {
    switch (name) {
      case 'Factory':
        return <Factory className="h-5 w-5 text-[#E35914]" />;
      case 'Truck':
        return <Truck className="h-5 w-5 text-[#136938]" />;
      case 'ShoppingBag':
        return <ShoppingBag className="h-5 w-5 text-[#E35914]" />;
      case 'Wrench':
        return <Wrench className="h-5 w-5 text-[#136938]" />;
      case 'Users':
        return <Users className="h-5 w-5 text-amber-600" />;
      default:
        return <Building2 className="h-5 w-5 text-[#E35914]" />;
    }
  };

  return (
    <div className="flex-1 bg-[#F8FAFC] font-devanagari text-[#111827]">
      <div className="mx-auto w-full max-w-[1560px] space-y-10 px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
        <Breadcrumbs
          items={[
            {
              label:
                language === 'mr'
                  ? 'उद्योग सेतू B2B'
                  : language === 'hi'
                    ? 'उद्योग सेतु B2B'
                    : 'Udyog Setu B2B',
            },
          ]}
        />

        {/* Hero Header */}
        <PageHeader
          category={c.eyebrow}
          title={c.title}
          description={c.description}
          officialSource={{
            label: OFFICIAL_SOURCES.gem.label[language],
            href: OFFICIAL_SOURCES.gem.href,
          }}
          actions={
            <div className="flex flex-wrap items-center gap-3">
              <a
                href="/digital-card"
                className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#E35914] to-[#ea580c] px-4 py-2.5 text-xs sm:text-sm font-semibold text-white shadow-xs transition hover:from-[#CC4D0E] hover:to-[#d9480f] hover:shadow-sm"
              >
                <ContactRound className="h-4 w-4" />
                <span>{c.createCardBtn}</span>
              </a>
              <a
                href={OFFICIAL_SOURCES.mahaTenders.href}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-xs sm:text-sm font-semibold text-slate-800 shadow-xs transition hover:border-[#E35914] hover:bg-[#FFF7ED] hover:text-[#E35914]"
              >
                <span>{c.mahaTendersBtn}</span>
                <ExternalLink className="h-4 w-4 text-[#E35914]" />
              </a>
            </div>
          }
        />

        {/* Metric Bar */}
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
          <StatCard
            label={c.statPillars}
            value={c.statPillarsValue}
            subtext={c.statPillarsSub}
            icon={<Building2 className="h-5 w-5" />}
            variant="primary"
          />
          <StatCard
            label={c.statWorkflow}
            value={c.statWorkflowValue}
            subtext={c.statWorkflowSub}
            icon={<SlidersHorizontal className="h-5 w-5" />}
            variant="secondary"
          />
          <StatCard
            label={c.statGem}
            value={c.statGemValue}
            subtext={c.statGemSub}
            icon={<FileCheck2 className="h-5 w-5" />}
            variant="amber"
          />
          <StatCard
            label={c.statTenders}
            value={c.statTendersValue}
            subtext={c.statTendersSub}
            icon={<Globe className="h-5 w-5" />}
            variant="default"
          />
        </div>

        {/* 5 B2B Ecosystem Pillars Infographic */}
        <section aria-labelledby="ecosystem-heading" className="space-y-4">
          <SectionHeader
            eyebrow={c.ecosystemEyebrow}
            title={c.ecosystemTitle}
            description={c.ecosystemSubtitle}
          />

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {B2B_ECOSYSTEM_PILLARS.map((pil, idx) => (
              <Reveal key={pil.id} variant="fade-up" delay={idx * 70} duration={450}>
                <TiltCard maxTilt={5} scale={1.02} glare={true} className="h-full rounded-2xl">
                  <div
                    className="flex h-full flex-col justify-between space-y-3 rounded-2xl border border-slate-200/90 bg-white p-5 shadow-xs transition hover:border-[#136938] hover:shadow-md"
                  >
                    <div className="space-y-2">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-slate-50 transition-transform group-hover:scale-110">
                        {getPillarIcon(pil.iconName)}
                      </div>
                      <h3 className="font-devanagari text-sm font-bold text-[#111827]">
                        {pil.title[language]}
                      </h3>
                      <p className="font-devanagari text-xs leading-relaxed text-slate-600">
                        {pil.desc[language]}
                      </p>
                    </div>
                  </div>
                </TiltCard>
              </Reveal>
            ))}
          </div>
        </section>

        {/* Tab Selection */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-slate-200 pb-2">
          <TabsBar
            tabs={[
              {
                id: 'directory',
                label: c.directoryTab,
              },
              {
                id: 'tenders',
                label: c.tendersTab,
              },
            ]}
            activeTab={tab}
            onChange={(t) => setTab(t as Tab)}
          />
        </div>

        {tab === 'directory' ? (
          <div className="space-y-8">
            {/* Filter Bar Card */}
            <div className="space-y-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-xs">
              <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
                <Search className="h-4 w-4 text-[#136938]" />
                <h3 className="font-devanagari text-base font-bold text-[#111827]">
                  {c.filtersHeading}
                </h3>
              </div>

              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
                <label className="block space-y-1 text-xs font-semibold text-slate-700">
                  <span>{c.productSearch}</span>
                  <input
                    type="text"
                    value={filters.product}
                    onChange={(e) =>
                      setFilters((p) => ({ ...p, product: e.target.value }))
                    }
                    placeholder={c.phProduct}
                    className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-xs text-[#111827] shadow-2xs transition focus:border-[#E35914] focus:outline-none"
                  />
                </label>

                <label className="block space-y-1 text-xs font-semibold text-slate-700">
                  <span>{c.rawSearch}</span>
                  <input
                    type="text"
                    value={filters.raw}
                    onChange={(e) =>
                      setFilters((p) => ({ ...p, raw: e.target.value }))
                    }
                    placeholder={c.phRaw}
                    className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-xs text-[#111827] shadow-2xs transition focus:border-[#E35914] focus:outline-none"
                  />
                </label>

                <label className="block space-y-1 text-xs font-semibold text-slate-700">
                  <span>{c.categorySelect}</span>
                  <select
                    value={filters.category}
                    onChange={(e) =>
                      setFilters((p) => ({ ...p, category: e.target.value }))
                    }
                    className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-xs text-[#111827] shadow-2xs transition focus:border-[#E35914] focus:outline-none"
                  >
                    <option value="">{c.allCategoriesOpt}</option>
                    {MARKET_CATEGORIES.map((m, idx) => (
                      <option key={idx} value={m.en}>
                        {m[language]}
                      </option>
                    ))}
                  </select>
                </label>

                <label className="block space-y-1 text-xs font-semibold text-slate-700">
                  <span>{c.sectorSelect}</span>
                  <select
                    value={filters.sector}
                    onChange={(e) =>
                      setFilters((p) => ({ ...p, sector: e.target.value }))
                    }
                    className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-xs text-[#111827] shadow-2xs transition focus:border-[#E35914] focus:outline-none"
                  >
                    <option value="">{c.allSectorsOpt}</option>
                    {FOCUS_SECTORS.map((s) => (
                      <option key={s.code} value={s.name.en}>
                        {s.name[language]}
                      </option>
                    ))}
                  </select>
                </label>

                <label className="block space-y-1 text-xs font-semibold text-slate-700">
                  <span>{c.districtSelect}</span>
                  <input
                    type="text"
                    value={filters.district}
                    onChange={(e) =>
                      setFilters((p) => ({ ...p, district: e.target.value }))
                    }
                    placeholder={c.phDistrict}
                    className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-xs text-[#111827] shadow-2xs transition focus:border-[#E35914] focus:outline-none"
                  />
                </label>

                <label className="block space-y-1 text-xs font-semibold text-slate-700">
                  <span>{c.areaSelect}</span>
                  <input
                    type="text"
                    value={filters.area}
                    onChange={(e) =>
                      setFilters((p) => ({ ...p, area: e.target.value }))
                    }
                    placeholder={c.phArea}
                    className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-xs text-[#111827] shadow-2xs transition focus:border-[#E35914] focus:outline-none"
                  />
                </label>
              </div>
            </div>

            {/* Directory Profile Display or Verified Empty State */}
            {listing ? (
              <div className="space-y-4 rounded-2xl border border-emerald-200 bg-white p-6 shadow-xs sm:p-7">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                  <div className="flex items-start gap-3.5">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-emerald-200 bg-emerald-50 text-[#136938]">
                      <Building2 className="h-6 w-6" />
                    </div>
                    <div>
                      <h2 className="font-devanagari text-xl font-bold text-[#111827]">
                        {listing.businessName}
                      </h2>
                      <p className="font-devanagari text-xs text-slate-500">
                        {listing.businessCategory}{' '}
                        {listing.industrySector ? `· ${listing.industrySector}` : ''}
                      </p>
                    </div>
                  </div>
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 font-label text-xs font-bold text-[#136938]">
                    <ShieldCheck className="h-3.5 w-3.5" />
                    {c.localBusinessProfile}
                  </span>
                </div>

                {listing.businessDescription && (
                  <p className="rounded-xl border border-slate-100 bg-slate-50/80 p-3.5 font-devanagari text-xs leading-relaxed text-slate-700">
                    {listing.businessDescription}
                  </p>
                )}

                <div className="grid grid-cols-1 gap-3 font-devanagari text-xs sm:grid-cols-2">
                  <div>
                    <strong className="text-slate-900">{c.lblLocation}</strong>
                    <span className="text-slate-600">
                      {[listing.district, listing.industrialArea, listing.address]
                        .filter(Boolean)
                        .join(', ') || '—'}
                    </span>
                  </div>
                  <div>
                    <strong className="text-slate-900">{c.lblProductsServices}</strong>
                    <span className="text-slate-600">
                      {listing.productsServices || '—'}
                    </span>
                  </div>
                  <div>
                    <strong className="text-slate-900">{c.lblSuppliedRaw}</strong>
                    <span className="text-slate-600">
                      {listing.rawMaterials || '—'}
                    </span>
                  </div>
                  <div>
                    <strong className="text-slate-900">{c.lblRepresentative}</strong>
                    <span className="text-slate-600">
                      {listing.representative || '—'}
                    </span>
                  </div>
                </div>

                <div className="flex flex-wrap items-center justify-between gap-3 border-t border-slate-100 pt-3 text-xs">
                  <div className="text-slate-500">
                    {c.lblMembershipStatus}{' '}
                    <span className="font-semibold text-slate-900">
                      {listing.membershipStatus}
                    </span>
                  </div>
                  <a
                    href={
                      listing.email ? `mailto:${listing.email}` : `tel:${listing.phone}`
                    }
                    className="inline-flex items-center gap-2 rounded-xl bg-[#E35914] px-4 py-2 font-devanagari text-xs font-bold text-white shadow-xs transition hover:bg-[#CC4D0E]"
                  >
                    <span>{c.contactDirect}</span>
                    <ExternalLink className="h-3.5 w-3.5" />
                  </a>
                </div>
              </div>
            ) : (
              <div className="space-y-4 rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-xs sm:p-12">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border border-emerald-200 bg-emerald-50 text-[#136938]">
                  <Building2 className="h-7 w-7" />
                </div>
                <div className="mx-auto max-w-xl space-y-2">
                  <h3 className="font-devanagari text-lg font-bold text-[#111827]">
                    {c.emptyTitle}
                  </h3>
                  <p className="font-devanagari text-xs leading-relaxed text-slate-500">
                    {c.emptyDesc}
                  </p>
                </div>
                <div className="pt-2">
                  <a
                    href="/digital-card"
                    className="inline-flex items-center gap-2 rounded-xl bg-[#E35914] px-5 py-2.5 font-devanagari text-sm font-semibold text-white shadow-xs transition hover:bg-[#CC4D0E]"
                  >
                    <ContactRound className="h-4 w-4" />
                    <span>{c.createCardBtn}</span>
                  </a>
                </div>
              </div>
            )}

            {/* Requirement Form & Workflow */}
            <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-12">
              <div className="space-y-5 rounded-2xl border border-slate-200 bg-white p-6 shadow-xs lg:col-span-7 sm:p-8">
                <div className="border-b border-slate-200 pb-3">
                  <span className="font-label text-xs font-bold uppercase tracking-wider text-[#E35914]">
                    {c.sourcingEyebrow}
                  </span>
                  <h3 className="mt-1 font-devanagari text-lg font-bold text-[#111827]">
                    {c.postRequirementTitle}
                  </h3>
                  <p className="font-devanagari text-xs text-slate-500">
                    {c.postRequirementSubtitle}
                  </p>
                </div>

                <form onSubmit={saveRequirement} className="space-y-3.5">
                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                    <input
                      required
                      type="text"
                      value={requirement.product}
                      onChange={(e) =>
                        setRequirement((v) => ({ ...v, product: e.target.value }))
                      }
                      placeholder={c.productNeed}
                      className="rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-xs text-[#111827] shadow-2xs transition focus:border-[#E35914] focus:outline-none"
                    />
                    <input
                      type="text"
                      value={requirement.rawMaterial}
                      onChange={(e) =>
                        setRequirement((v) => ({ ...v, rawMaterial: e.target.value }))
                      }
                      placeholder={c.rawNeed}
                      className="rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-xs text-[#111827] shadow-2xs transition focus:border-[#E35914] focus:outline-none"
                    />
                  </div>

                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                    <input
                      type="text"
                      value={requirement.quantity}
                      onChange={(e) =>
                        setRequirement((v) => ({ ...v, quantity: e.target.value }))
                      }
                      placeholder={c.quantityNeed}
                      className="rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-xs text-[#111827] shadow-2xs transition focus:border-[#E35914] focus:outline-none"
                    />
                    <input
                      type="text"
                      value={requirement.district}
                      onChange={(e) =>
                        setRequirement((v) => ({ ...v, district: e.target.value }))
                      }
                      placeholder={c.phReqDistrict}
                      className="rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-xs text-[#111827] shadow-2xs transition focus:border-[#E35914] focus:outline-none"
                    />
                    <input
                      type="text"
                      value={requirement.area}
                      onChange={(e) =>
                        setRequirement((v) => ({ ...v, area: e.target.value }))
                      }
                      placeholder={c.phReqArea}
                      className="rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-xs text-[#111827] shadow-2xs transition focus:border-[#E35914] focus:outline-none"
                    />
                  </div>

                  <textarea
                    required
                    rows={3}
                    value={requirement.details}
                    onChange={(e) =>
                      setRequirement((v) => ({ ...v, details: e.target.value }))
                    }
                    placeholder={c.detailsNeed}
                    className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-xs text-[#111827] shadow-2xs transition focus:border-[#E35914] focus:outline-none"
                  />

                  <div className="grid grid-cols-1 items-center gap-3 sm:grid-cols-2">
                    <label className="block space-y-1 text-[11px] font-medium text-slate-600">
                      <span>{c.attachmentLabel}</span>
                      <input
                        type="file"
                        onChange={(e) =>
                          setRequirement((v) => ({
                            ...v,
                            fileName: e.currentTarget.files?.[0]?.name || '',
                          }))
                        }
                        className="block w-full text-[11px] text-slate-500"
                      />
                    </label>
                    <input
                      required
                      type="email"
                      value={requirement.contact}
                      onChange={(e) =>
                        setRequirement((v) => ({ ...v, contact: e.target.value }))
                      }
                      placeholder={c.contactEmail}
                      className="rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-xs text-[#111827] shadow-2xs transition focus:border-[#E35914] focus:outline-none"
                    />
                  </div>

                  <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                    <Button type="submit" variant="primary" size="sm">
                      {c.submitRequirement}
                    </Button>
                    {posted && (
                      <span className="flex items-center gap-1 font-devanagari text-xs font-bold text-[#136938]">
                        <CheckCircle2 className="h-4 w-4" />
                        {c.requirementSaved}
                      </span>
                    )}
                  </div>
                </form>
              </div>

              {/* Requirement Workflow Stepper */}
              <div className="space-y-4 lg:col-span-5">
                <div className="space-y-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-xs">
                  <h4 className="border-b border-slate-200 pb-2 font-label text-xs font-bold uppercase tracking-wider text-slate-900">
                    {c.workflowHeading}
                  </h4>
                  <div className="space-y-3">
                    {B2B_REQUIREMENT_WORKFLOW.map((wf) => (
                      <div key={wf.step} className="flex items-start gap-3 text-xs">
                        <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-md border border-orange-200 bg-orange-50 font-label text-xs font-bold text-[#E35914]">
                          {wf.step}
                        </span>
                        <div>
                          <strong className="block font-devanagari text-slate-900">
                            {wf.title[language]}
                          </strong>
                          <p className="font-devanagari text-slate-500 leading-relaxed">
                            {wf.desc[language]}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-2 rounded-2xl border border-slate-200 bg-slate-50/70 p-5">
                  <h4 className="font-label text-xs font-bold uppercase tracking-wider text-slate-900">
                    {c.associationTitle}
                  </h4>
                  <p className="font-devanagari text-xs leading-relaxed text-slate-600">
                    {c.associationDesc}
                  </p>
                  <a
                    href="/association-registration"
                    className="inline-flex items-center gap-1.5 pt-1 font-devanagari text-xs font-bold text-[#136938] hover:underline"
                  >
                    <span>{c.associationBtn}</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* Tab 2: GeM & Government Procurement Resources */
          <div className="space-y-8">
            <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-12">
              <div className="space-y-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-xs lg:col-span-7 sm:p-8">
                <SectionHeader
                  eyebrow={c.gemEyebrow}
                  title={c.gemTitle}
                  description={c.gemSubtitle}
                />

                <div className="space-y-4 pt-2">
                  <h3 className="font-label text-sm font-bold text-slate-900">
                    {c.gemStepsHeading}
                  </h3>

                  <CompactStepper
                    steps={gemStepItems}
                    activeStep={activeGemStep}
                    onStepClick={(idx) => setActiveGemStep(idx)}
                  />

                  {/* Active GeM Step Highlight */}
                  <div
                    key={activeGemStep}
                    className="mt-5 rounded-xl border border-slate-200/90 bg-white p-5 shadow-xs animate-stage-fade"
                  >
                    <div className="flex items-start gap-4">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-900 font-label text-xs font-bold text-white shadow-xs">
                        {String(activeGemStep + 1).padStart(2, '0')}
                      </div>
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="font-label text-[11px] font-bold uppercase tracking-wider text-[#136938]">
                            {c.gemStagePrefix} {activeGemStep + 1}
                          </span>
                        </div>
                        <h4 className="font-devanagari text-sm font-bold text-slate-900 sm:text-base">
                          {GEM_PROCUREMENT_STEPS[activeGemStep].title[language]}
                        </h4>
                        <p className="font-devanagari text-xs leading-relaxed text-slate-600 sm:text-sm max-w-xl">
                          {GEM_PROCUREMENT_STEPS[activeGemStep].desc[language]}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Portals and Checklist */}
              <div className="space-y-5 lg:col-span-5">
                <div className="space-y-3 rounded-2xl border border-slate-200 bg-white p-6 shadow-xs">
                  <h3 className="border-b border-slate-200 pb-2 font-label text-xs font-bold uppercase tracking-wider text-slate-900">
                    {c.procurementPortals}
                  </h3>
                  <div className="space-y-2.5">
                    {[
                      {
                        label: OFFICIAL_SOURCES.gem.label[language],
                        href: OFFICIAL_SOURCES.gem.href,
                        desc: c.gemDesc,
                      },
                      {
                        label: OFFICIAL_SOURCES.tenders.label[language],
                        href: OFFICIAL_SOURCES.tenders.href,
                        desc: c.cpppDesc,
                      },
                      {
                        label: OFFICIAL_SOURCES.mahaTenders.label[language],
                        href: OFFICIAL_SOURCES.mahaTenders.href,
                        desc: c.mahaTendersDesc,
                      },
                    ].map((portal, i) => (
                      <OfficialSourceLink
                        key={i}
                        label={portal.label}
                        href={portal.href}
                        department={portal.desc}
                        variant="card"
                      />
                    ))}
                  </div>
                </div>

                <div className="space-y-3 rounded-2xl border border-slate-200 bg-slate-50/70 p-6">
                  <h4 className="font-label text-xs font-bold uppercase tracking-wider text-slate-900">
                    {c.gemDocsTitle}
                  </h4>
                  <ul className="space-y-2 font-devanagari text-xs text-slate-600">
                    <li className="flex items-center gap-2">{c.docPanAadhaar}</li>
                    <li className="flex items-center gap-2">{c.docUdyam}</li>
                    <li className="flex items-center gap-2">{c.docGstn}</li>
                    <li className="flex items-center gap-2">{c.docItr}</li>
                    <li className="flex items-center gap-2">{c.docBank}</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Transparency Notice */}
        <div className="flex items-start gap-3 rounded-xl border border-emerald-200 bg-emerald-50/70 p-4 text-xs text-[#166534]">
          <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-[#136938]" />
          <p className="leading-relaxed">{c.transparencyNotice}</p>
        </div>
      </div>
    </div>
  );
};
