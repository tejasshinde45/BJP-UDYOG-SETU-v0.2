import React, { useState, useMemo } from 'react';
import {
  Download,
  ExternalLink,
  Building2,
  FileText,
  Layers,
  MapPin,
  TrendingUp,
  CheckCircle2,
  FileCheck2,
  ShieldAlert,
  Sparkles,
  Search,
} from 'lucide-react';
import { useLanguage } from '../hooks/useLanguage';
import {
  FOCUS_SECTORS,
  OFFICIAL_SOURCES,
  POLICY_REFERENCES,
  DISTRICT_CLASSIFICATION_ZONES,
  INCENTIVE_BENEFIT_TYPES,
  ELIGIBILITY_FLOWCHART,
  ELIGIBILITY_CONDITIONS,
  REQUIRED_DOCUMENTS_SCHEME,
} from '../data/industryContent';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { PageHeader } from '../components/ui/PageHeader';
import { SectionHeader } from '../components/ui/SectionHeader';
import { StatCard } from '../components/ui/StatCard';
import { CompactStepper } from '../components/ui/CompactStepper';
import { ExpandableCard } from '../components/ui/ExpandableCard';
import { OfficialSourceLink } from '../components/ui/OfficialSourceLink';
import { TabsBar } from '../components/ui/TabsBar';
import { Button } from '../components/ui/Button';
import { downloadGuidanceReportPdf } from '../utils/pdfGenerator';
import { triggerConfetti } from '../components/animations/Confetti';
import { Reveal } from '../components/animations/Reveal';
import { TiltCard } from '../components/animations/TiltCard';

type ApplicantCategory = 'general' | 'msme' | 'women' | 'scst';

const COPY = {
  mr: {
    eyebrow: 'औद्योगिक धोरणे व प्रोत्साहन मार्गदर्शक',
    title: 'तुमच्या उद्योगासाठी योग्य प्रोत्साहन योजना आणि धोरणांची माहिती मिळवा',
    description:
      'गुंतवणुकीचे स्वरूप, उद्योग क्षेत्र आणि भौगोलिक स्थानानुसार लागू होऊ शकणाऱ्या अधिकृत औद्योगिक धोरणांचा अभ्यास करा.',
    statPolicies: 'सक्रिय धोरणे',
    statPoliciesSub: 'महाराष्ट्र शासन राजपत्रित धोरणे',
    statZones: 'औद्योगिक वर्गीकरण',
    statZonesSub: 'गट अ ते ड+ प्रोत्साहन स्तर',
    statIncentives: 'प्रोत्साहन प्रकार',
    statIncentivesSub: 'भांडवली, व्याज, वीज व मुद्रांक',
    statGateway: 'अधिकृत खिडकी',
    statGatewaySub: 'MAITRI 2.0 सिंगल विंडो',
    profileTitle: '१. प्रकल्प गुंतवणूक प्रोफाइल भरा',
    profileSubtitle:
      'संभाव्य धोरण संदर्भ व लागू प्रोत्साहने समजून घेण्यासाठी प्राथमिक तपशील नोंदवा.',
    district: 'जिल्हा निवडा',
    area: 'औद्योगिक क्षेत्र / तालुका',
    sector: 'उद्योग क्षेत्र',
    investment: 'एकूण प्रस्तावित गुंतवणूक (₹)',
    category: 'उद्योजक / संस्था वर्ग',
    stage: 'प्रकल्पाचा टप्पा',
    newUnit: 'नवीन प्रकल्प (New Unit)',
    expansion: 'क्षमता विस्तार (Expansion)',
    general: 'सर्वसाधारण (General)',
    msme: 'MSME (सूक्ष्म, लघु व मध्यम)',
    women: 'महिला उद्योजक (Women Owned)',
    scst: 'SC/ST उद्योजक',
    screenBtn: 'धोरण संदर्भ व प्रोत्साहने तपासा',
    downloadReportBtn: 'माहिती अहवाल डाऊनलोड करा (PDF)',
    costBreakupHeading: 'भांडवली खर्च घटक (लागू असल्यास नोंदवा):',
    landCost: 'जमीन खर्च (₹)',
    buildingCost: 'इमारत व नागरी कामे (₹)',
    plantCost: 'यंत्रसामग्री व उपकरणे (₹)',
    otherCost: 'इतर पूर्व-उत्पादन खर्च (₹)',
    flowchartHeading: 'पात्रता व अर्ज प्रक्रिया प्रवाह — ५ टप्पे',
    flowchartSubheading:
      'संकल्पनेपासून अधिकृत अनुदानासाठी अर्ज सादर करेपर्यंतची अधिकृत नियमावली.',
    breakdownHeading: 'संभाव्य शासकीय लाभ व प्रोत्साहनांचे प्रकार',
    breakdownSubheading:
      'महाराष्ट्र औद्योगिक धोरण २०२५ व संबंधित क्षेत्रीय धोरणांमधील प्रमुख तरतुदी.',
    zoneHeading: 'महाराष्ट्र जिल्हा व तालुका औद्योगिक वर्गीकरण (Zoning)',
    zoneSubheading:
      'उद्योग संचालनालयाने निश्चित केलेले गट अ ते ड+ वर्गीकरण व प्रोत्साहन व्याप्ती.',
    policiesHeading: 'महाराष्ट्र शासनाची प्रमुख औद्योगिक धोरणे',
    policiesSubheading:
      'वर्तमान वैध धोरणे, लागू क्षेत्रे आणि अधिकृत संकेतस्थळ संदर्भ.',
    eligibilityHeading: 'सामान्य पात्रता निकष व अटी',
    documentsHeading: 'अनुदान व प्रोत्साहनासाठी आवश्यक कागदपत्रे',
    officialDisclaimer:
      'टीप: Udyog Setu हे माहिती व मार्गदर्शन मंच आहे. येथे लाभाची कोणतीही बनावट टक्केवारी किंवा रक्कम मोजली जात नाही. लाभाची प्रत्यक्ष पात्रता, रक्कम व मंजुरी संबंधित शासकीय विभाग आणि उद्योग संचालनालयाच्या पडताळणीवर अवलंबून असते.',
    resultsHeading: 'तुमच्या प्रोफाइलशी सुसंगत धोरण निष्कर्ष',
    resultsIntro:
      'खालील माहिती तुमच्या प्रविष्ट केलेल्या घटकांनुसार अधिकृत धोरण संदर्भांशी जुळवून सादर केली आहे.',
    showBreakup: 'भांडवली खर्चाचे घटक जोडा (पर्यायी)',
    hideBreakup: 'भांडवली खर्च घटक लपवा',
    searchPoliciesPlaceholder: 'धोरणाचे नाव किंवा क्षेत्र शोधा...',
    tabChecklist: 'कागदपत्रे तपासणी',
    tabEligibility: 'पात्रता निकष',
    statPoliciesValue: '४+',
    statZonesValue: 'गट अ - ड+',
    statIncentivesValue: '५ मथळे',
    stepPrefix: 'टप्पा',
    stepWord: 'टप्पा',
    grantApprovalStage: 'अनुदान मंजुरी टप्पा',
    flowchartEyebrow: 'अर्ज प्रक्रिया आराखडा • 5-STAGE WORKFLOW',
    parametersEyebrow: 'प्रकल्प तपशील • PARAMETERS',
    phArea: 'उदा. भोसरी, चाकण, बुटीबोरी किंवा तालुका',
    phInvestment: 'उदा. ५०,००,०००',
    screenedStatus: 'धोरण जुळवणी अद्यतनित (Screened)',
    activeStatus: 'सक्रिय',
    lblDistrictLocation: 'जिल्हा व स्थान:',
    lblIndustrySector: 'उद्योग क्षेत्र:',
    lblProjectStage: 'प्रकल्प टप्पा:',
    lblPromoterCategory: 'प्रस्तावक वर्ग:',
    lblProposedInvestment: 'प्रस्तावित गुंतवणूक:',
    notRecorded: 'नोंद केलेली नाही',
    lblMatchedPolicy: 'सुसंगत औद्योगिक धोरण:',
    lblPotentialHeads: 'संभाव्य प्रोत्साहन मथळे:',
    lblValidity: 'वैधता:',
    applyMaitri: 'MAITRI 2.0 वर अधिकृत अर्ज करा',
    incentivesEyebrow: 'प्रोत्साहन प्रकार • FISCAL & OPERATIONAL INCENTIVES',
    lblDetailedDesc: 'तपशीलवार वर्णन:',
    lblApplicableScope: 'लागू व्याप्ती:',
    zoningEyebrow: 'झोनिंग निकष • INDUSTRIAL ZONES (GROUPS A TO D+)',
    zoningDesc: 'महाराष्ट्र औद्योगिक धोरणानुसार तालुका व क्षेत्र वर्गीकरण.',
    lblIncludedAreas: 'समाविष्ट तालुके / क्षेत्रे',
    lblIncentiveScope: 'प्रोत्साहन स्तर व व्याप्ती',
    policiesEyebrow: 'धोरण संदर्भ • INDUSTRIAL POLICIES',
    lblApplicableSector: 'लागू क्षेत्र:',
    officialPolicyDoc: 'अधिकृत धोरण मजकूर व परिपत्रके',
    complianceEyebrow: 'कागदपत्रे व पात्रता • COMPLIANCE',
    complianceTitle: 'वैधानिक पात्रता निकष व कागदपत्रांची तपासणी सूची',
  },
  hi: {
    eyebrow: 'औद्योगिक नीतियां एवं प्रोत्साहन मार्गदर्शिका',
    title: 'अपने उद्योग के लिए उपयुक्त प्रोत्साहन योजनाओं और नीतियों की जानकारी प्राप्त करें',
    description:
      'निवेश के प्रकार, उद्योग क्षेत्र और भौगोलिक स्थान के अनुसार लागू होने वाली आधिकारिक औद्योगिक नीतियों का अध्ययन करें।',
    statPolicies: 'सक्रिय नीतियां',
    statPoliciesSub: 'महाराष्ट्र सरकार अधिसूचित नीतियां',
    statZones: 'औद्योगिक वर्गीकरण',
    statZonesSub: 'ग्रुप ए से डी+ प्रोत्साहन स्तर',
    statIncentives: 'प्रोत्साहन प्रकार',
    statIncentivesSub: 'पूंजी, ब्याज, बिजली एवं स्टांप',
    statGateway: 'आधिकारिक सिंगल विंडो',
    statGatewaySub: 'MAITRI 2.0 सिंगल विंडो पोर्टल',
    profileTitle: '१. परियोजना निवेश प्रोफ़ाइल भरें',
    profileSubtitle:
      'संभावित नीति संदर्भ और लागू प्रोत्साहनों को समझने के लिए प्रारंभिक विवरण दर्ज करें।',
    district: 'ज़िला चुनें',
    area: 'औद्योगिक क्षेत्र / तालुका',
    sector: 'उद्योग क्षेत्र',
    investment: 'कुल प्रस्तावित निवेश (₹)',
    category: 'उद्यमी / संस्था वर्ग',
    stage: 'परियोजना चरण',
    newUnit: 'नई इकाई (New Unit)',
    expansion: 'क्षमता विस्तार (Expansion)',
    general: 'सामान्य (General)',
    msme: 'MSME (सूक्ष्म, लघु व मध्यम)',
    women: 'महिला उद्यमी (Women Owned)',
    scst: 'SC/ST उद्यमी',
    screenBtn: 'नीति संदर्भ एवं प्रोत्साहन देखें',
    downloadReportBtn: 'सूचना रिपोर्ट डाउनलोड करें (PDF)',
    costBreakupHeading: 'पूंजीगत व्यय घटक (यदि लागू हो):',
    landCost: 'भूमि लागत (₹)',
    buildingCost: 'भवन एवं निर्माण (₹)',
    plantCost: 'संयंत्र एवं मशीनरी (₹)',
    otherCost: 'अन्य प्रारंभिक व्यय (₹)',
    flowchartHeading: 'पात्रता एवं आवेदन प्रक्रिया प्रवाह — ५ चरण',
    flowchartSubheading:
      'अवधारणा से आधिकारिक सब्सिडी आवेदन जमा करने तक की मानक नियमावली।',
    breakdownHeading: 'संभावित सरकारी लाभ एवं प्रोत्साहनों के प्रकार',
    breakdownSubheading:
      'महाराष्ट्र उद्योग नीति 2025 और संबंधित क्षेत्रीय नीतियों के मुख्य प्रावधान।',
    zoneHeading: 'महाराष्ट्र ज़िला एवं तालुका औद्योगिक वर्गीकरण (Zoning)',
    zoneSubheading:
      'उद्योग निदेशालय द्वारा निर्धारित ग्रुप ए से डी+ वर्गीकरण और प्रोत्साहन दायरा।',
    policiesHeading: 'महाराष्ट्र सरकार की प्रमुख औद्योगिक नीतियां',
    policiesSubheading:
      'वर्तमान वैध नीतियां, लागू क्षेत्र और आधिकारिक वेबसाइट संदर्भ।',
    eligibilityHeading: 'सामान्य पात्रता मानदंड एवं शर्तें',
    documentsHeading: 'सब्सिडी एवं प्रोत्साहन के लिए आवश्यक दस्तावेज',
    officialDisclaimer:
      'नोट: Udyog Setu एक सूचना और मार्गदर्शन मंच है। यहां लाभ की कोई काल्पनिक राशि या प्रतिशत नहीं दिया गया है। वास्तविक पात्रता, राशि और स्वीकृति संबंधित सरकारी विभाग और उद्योग निदेशालय द्वारा निर्धारित की जाती है।',
    resultsHeading: 'आपकी प्रोफ़ाइल से संबंधित नीति निष्कर्ष',
    resultsIntro:
      'नीचे दी गई जानकारी आपके द्वारा भरे गए विवरण के आधार पर आधिकारिक नीति संदर्भों से मेल खाती है।',
    showBreakup: 'पूंजीगत व्यय विवरण जोड़ें (वैकल्पिक)',
    hideBreakup: 'पूंजीगत व्यय विवरण छुपाएं',
    searchPoliciesPlaceholder: 'नीति का नाम या क्षेत्र खोजें...',
    tabChecklist: 'दस्तावेज चेकलिस्ट',
    tabEligibility: 'पात्रता मानदंड',
    statPoliciesValue: '४+',
    statZonesValue: 'ग्रुप ए - डी+',
    statIncentivesValue: '5 श्रेणियां',
    stepPrefix: 'चरण',
    stepWord: 'चरण',
    grantApprovalStage: 'सब्सिडी स्वीकृति चरण',
    flowchartEyebrow: 'आवेदन प्रक्रिया ढांचा • 5-STAGE WORKFLOW',
    parametersEyebrow: 'परियोजना विवरण • PARAMETERS',
    phArea: 'उदा. भोसरी, चाकण, बुटीबोरी या तालुका',
    phInvestment: 'उदा. ५०,००,०००',
    screenedStatus: 'नीति मिलान अद्यतनित (Screened)',
    activeStatus: 'सक्रिय',
    lblDistrictLocation: 'ज़िला एवं स्थान:',
    lblIndustrySector: 'उद्योग क्षेत्र:',
    lblProjectStage: 'परियोजना चरण:',
    lblPromoterCategory: 'प्रमोटर श्रेणी:',
    lblProposedInvestment: 'प्रस्तावित निवेश:',
    notRecorded: 'दर्ज नहीं किया गया',
    lblMatchedPolicy: 'सुसंगत औद्योगिक नीति:',
    lblPotentialHeads: 'संभावित प्रोत्साहन श्रेणियां:',
    lblValidity: 'वैधता:',
    applyMaitri: 'MAITRI 2.0 पर आधिकारिक आवेदन करें',
    incentivesEyebrow: 'प्रोत्साहन प्रकार • FISCAL & OPERATIONAL INCENTIVES',
    lblDetailedDesc: 'विस्तृत विवरण:',
    lblApplicableScope: 'लागू दायरा:',
    zoningEyebrow: 'ज़ोनिंग मानदंड • INDUSTRIAL ZONES (GROUPS A TO D+)',
    zoningDesc: 'महाराष्ट्र औद्योगिक नीति के अनुसार तालुका एवं क्षेत्र वर्गीकरण।',
    lblIncludedAreas: 'शामिल तालुका / क्षेत्र',
    lblIncentiveScope: 'प्रोत्साहन स्तर एवं दायरा',
    policiesEyebrow: 'नीति संदर्भ • INDUSTRIAL POLICIES',
    lblApplicableSector: 'लागू क्षेत्र:',
    officialPolicyDoc: 'आधिकारिक नीति पाठ एवं परिपत्र',
    complianceEyebrow: 'दस्तावेज एवं पात्रता • COMPLIANCE',
    complianceTitle: 'वैधानिक पात्रता मानदंड एवं दस्तावेज चेकलिस्ट',
  },
  en: {
    eyebrow: 'Industrial Policies & Incentives Guide',
    title: 'Find the right incentive schemes and industrial policies for your enterprise',
    description:
      'Explore industrial policies, package schemes and fiscal incentives that may apply based on your investment profile, sector and location.',
    statPolicies: 'Active Frameworks',
    statPoliciesSub: 'Maharashtra Gazette Industrial Policies',
    statZones: 'Industrial Zoning',
    statZonesSub: 'Groups A to D+ Tier Classifications',
    statIncentives: 'Incentive Heads',
    statIncentivesSub: 'Capital, Interest, Power & Stamp',
    statGateway: 'Single Window Gateway',
    statGatewaySub: 'MAITRI 2.0 Statutory Portal',
    profileTitle: '1. Enter Investment Profile',
    profileSubtitle:
      'Record baseline parameters to review corresponding policy provisions and statutory eligibility conditions.',
    district: 'Select District',
    area: 'Industrial Area / Taluka',
    sector: 'Industrial Sector',
    investment: 'Total Proposed Investment (₹)',
    category: 'Enterprise / Promoter Category',
    stage: 'Project Stage',
    newUnit: 'New Unit (Greenfield)',
    expansion: 'Capacity Expansion',
    general: 'General',
    msme: 'MSME (Micro, Small, Medium)',
    women: 'Women-Owned Enterprise',
    scst: 'SC/ST Promoter',
    screenBtn: 'Review Matching Policy Framework',
    downloadReportBtn: 'Download Guidance Report (PDF)',
    costBreakupHeading: 'Capital Expenditure Breakdown (Optional):',
    landCost: 'Land Premium (₹)',
    buildingCost: 'Civil & Building Works (₹)',
    plantCost: 'Plant & Machinery (₹)',
    otherCost: 'Preliminary & Pre-operative (₹)',
    flowchartHeading: 'Eligibility & Application Flowchart — 5 Stages',
    flowchartSubheading:
      'Official trajectory from profile screening to formal sanction on MAITRI 2.0 single window.',
    breakdownHeading: 'Potential Fiscal & Operational Incentive Heads',
    breakdownSubheading:
      'Key incentive categories governed by the Maharashtra Industrial Policy 2025 & sectoral mandates.',
    zoneHeading: 'Maharashtra Industrial Taluka Classification (Zoning)',
    zoneSubheading:
      'Directorate of Industries grouping (Groups A to D+) dictating incentive tenures and subsidy ceilings.',
    policiesHeading: 'Active Maharashtra Industrial Policies & Frameworks',
    policiesSubheading:
      'Current notifications, thrust sector mandates and direct official gazette links.',
    eligibilityHeading: 'General Statutory Eligibility Conditions',
    documentsHeading: 'Documentary Checklist for Scheme Filing',
    officialDisclaimer:
      'Notice: Udyog Setu is an independent information and guidance platform. It does not fabricate percentages, cash grants or approval estimates. Final eligibility, incentive quantum and sanctions rest exclusively with the Directorate of Industries and responsible state authorities upon statutory scrutiny.',
    resultsHeading: 'Applicable Policy & Scheme Insights',
    resultsIntro:
      'The following structured insights correlate with your submitted investment parameters.',
    showBreakup: 'Add Capital Expenditure Details (Optional)',
    hideBreakup: 'Hide Capital Expenditure Details',
    searchPoliciesPlaceholder: 'Search policy by name or sector...',
    tabChecklist: 'Document Checklist',
    tabEligibility: 'Eligibility Criteria',
    statPoliciesValue: '4+',
    statZonesValue: 'Zones A - D+',
    statIncentivesValue: '5 Heads',
    stepPrefix: 'Stage',
    stepWord: 'STAGE',
    grantApprovalStage: 'Sanction Trajectory',
    flowchartEyebrow: 'APPLICATION FRAMEWORK • 5-STAGE WORKFLOW',
    parametersEyebrow: 'PROJECT PARAMETERS • PARAMETERS',
    phArea: 'e.g. Bhosari, Chakan, Butibori or Taluka',
    phInvestment: 'e.g. 5,000,000',
    screenedStatus: 'Policy Matched (Screened)',
    activeStatus: 'Active',
    lblDistrictLocation: 'District & Location:',
    lblIndustrySector: 'Industry Sector:',
    lblProjectStage: 'Project Stage:',
    lblPromoterCategory: 'Promoter Category:',
    lblProposedInvestment: 'Proposed Investment:',
    notRecorded: 'Not Specified',
    lblMatchedPolicy: 'Matching Framework:',
    lblPotentialHeads: 'Potential Incentive Heads:',
    lblValidity: 'Validity:',
    applyMaitri: 'Apply Statutorily on MAITRI 2.0',
    incentivesEyebrow: 'INCENTIVE HEADS • FISCAL & OPERATIONAL INCENTIVES',
    lblDetailedDesc: 'Detailed Scope:',
    lblApplicableScope: 'Applicable Range:',
    zoningEyebrow: 'ZONING CRITERIA • INDUSTRIAL ZONES (GROUPS A TO D+)',
    zoningDesc: 'Directorate of Industries classification according to Maharashtra Industrial Policy.',
    lblIncludedAreas: 'Included Talukas / Areas',
    lblIncentiveScope: 'Incentive Tenure & Scale',
    policiesEyebrow: 'POLICY FRAMEWORKS • INDUSTRIAL POLICIES',
    lblApplicableSector: 'Applicable Sector:',
    officialPolicyDoc: 'Official Gazette Policy Documents',
    complianceEyebrow: 'COMPLIANCE & ELIGIBILITY • COMPLIANCE',
    complianceTitle: 'Statutory Eligibility Criteria & Documentary Checklist',
  },
} as const;

const MAHARASHTRA_DISTRICTS = [
  'पुणे',
  'छत्रपती संभाजीनगर (औरंगाबाद)',
  'नागपूर',
  'नाशिक',
  'ठाणे',
  'मुंबई उपनगर',
  'रायगड',
  'पालघर',
  'कोल्हापूर',
  'सोलापूर',
  'सातारा',
  'अहिल्यानगर (अहमदनगर)',
  'सांगली',
  'अमरावती',
  'रत्नागिरी',
  'जळगाव',
  'धुळे',
  'नांदेड',
  'चंद्रपूर',
  'यवतमाळ',
  'बुलढाणा',
  'जालना',
  'बीड',
  'लातूर',
  'धाराशिव (उस्मानाबाद)',
  'परभणी',
  'हिंगोली',
  'वर्धा',
  'भंडारा',
  'गोंदिया',
  'गडचिरोली',
  'सिंधुदुर्ग',
  'नंदुरबार',
  'वाशीम',
  'अकोला',
];

export const SubsidyMentorPage: React.FC = () => {
  const { language } = useLanguage();
  const c = COPY[language];

  const [profile, setProfile] = useState({
    district: 'पुणे',
    area: '',
    sector: 'Automobiles & EV',
    investment: '',
    landCost: '',
    buildingCost: '',
    plantCost: '',
    otherCost: '',
    category: 'msme' as ApplicantCategory,
    stage: 'new',
  });

  const [screened, setScreened] = useState(false);
  const [showCostBreakup, setShowCostBreakup] = useState(false);
  const [activeWorkflowStep, setActiveWorkflowStep] = useState(0);
  const [selectedZone, setSelectedZone] = useState('Group C');
  const [policySearch, setPolicySearch] = useState('');
  const [complianceTab, setComplianceTab] = useState<'checklist' | 'eligibility'>('checklist');

  const update = (key: keyof typeof profile, val: string) => {
    setProfile((prev) => ({ ...prev, [key]: val }));
  };

  const stepperItems = useMemo(() => {
    return ELIGIBILITY_FLOWCHART.map((fl, idx) => ({
      id: fl.step,
      stepNumber: idx + 1,
      title: fl.title[language],
      subtitle: `${c.stepPrefix} ${fl.step}`,
      description: fl.desc[language],
    }));
  }, [language, c.stepPrefix]);

  const filteredPolicies = useMemo(() => {
    if (!policySearch.trim()) return POLICY_REFERENCES;
    const q = policySearch.toLowerCase();
    return POLICY_REFERENCES.filter(
      (pol) =>
        pol.title[language].toLowerCase().includes(q) ||
        pol.sector[language].toLowerCase().includes(q) ||
        pol.provisions[language].toLowerCase().includes(q)
    );
  }, [policySearch, language]);

  // Determine applicable sector policy
  const matchedPolicy = useMemo(() => {
    const s = profile.sector.toLowerCase();
    if (s.includes('ev') || s.includes('auto')) {
      return (
        POLICY_REFERENCES.find((p) => p.title.en.includes('EV')) ||
        POLICY_REFERENCES[0]
      );
    }
    if (s.includes('it') || s.includes('software')) {
      return (
        POLICY_REFERENCES.find((p) => p.title.en.includes('IT')) ||
        POLICY_REFERENCES[0]
      );
    }
    if (s.includes('textile')) {
      return (
        POLICY_REFERENCES.find((p) => p.title.en.includes('Textile')) ||
        POLICY_REFERENCES[0]
      );
    }
    return POLICY_REFERENCES[0]; // General Maharashtra Industrial Policy 2025
  }, [profile.sector]);

  const downloadReport = () => {
    downloadGuidanceReportPdf({
      district: profile.district,
      area: profile.area,
      sector: profile.sector,
      stage: profile.stage,
      category: profile.category,
      investment: profile.investment,
      landCost: profile.landCost,
      buildingCost: profile.buildingCost,
      plantCost: profile.plantCost,
      otherCost: profile.otherCost,
      matchedPolicy: matchedPolicy,
      eligibilityConditions: ELIGIBILITY_CONDITIONS,
      requiredDocuments: REQUIRED_DOCUMENTS_SCHEME,
      policyReferences: POLICY_REFERENCES,
      officialDisclaimer: c.officialDisclaimer,
      language,
    });
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
                  ? 'सब्सिडी मेंटर'
                  : language === 'hi'
                    ? 'सब्सिडी मेंटर'
                    : 'Subsidy Mentor',
            },
          ]}
        />

        {/* Hero Section using PageHeader */}
        <PageHeader
          category={c.eyebrow}
          title={c.title}
          description={c.description}
          officialSource={{
            label: OFFICIAL_SOURCES.policies.label[language],
            href: OFFICIAL_SOURCES.policies.href,
          }}
          actions={
            <div className="flex flex-wrap items-center gap-3">
              <a
                href={OFFICIAL_SOURCES.maitri.href}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#E35914] to-[#ea580c] px-4 py-2.5 text-xs sm:text-sm font-semibold text-white shadow-xs transition hover:from-[#CC4D0E] hover:to-[#d9480f] hover:shadow-sm"
              >
                <span>MAITRI 2.0 पोर्टल</span>
                <ExternalLink className="h-4 w-4" />
              </a>
              <Button
                type="button"
                variant="outlined"
                size="md"
                onClick={downloadReport}
                className="border-slate-300 bg-white text-slate-800 hover:border-[#E35914] hover:bg-[#FFF7ED] hover:text-[#E35914] shadow-xs"
                icon={<Download className="h-4 w-4 text-[#E35914]" />}
              >
                {c.downloadReportBtn}
              </Button>
            </div>
          }
        />

        {/* 4-Stat Metric Summary Bar */}
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
          <StatCard
            label={c.statPolicies}
            value={c.statPoliciesValue}
            subtext={c.statPoliciesSub}
            icon={<FileText className="h-5 w-5" />}
            variant="primary"
          />
          <StatCard
            label={c.statZones}
            value={c.statZonesValue}
            subtext={c.statZonesSub}
            icon={<MapPin className="h-5 w-5" />}
            variant="amber"
          />
          <StatCard
            label={c.statIncentives}
            value={c.statIncentivesValue}
            subtext={c.statIncentivesSub}
            icon={<TrendingUp className="h-5 w-5" />}
            variant="secondary"
          />
          <StatCard
            label={c.statGateway}
            value="MAITRI"
            subtext={c.statGatewaySub}
            icon={<Layers className="h-5 w-5" />}
            variant="default"
          />
        </div>

        {/* Workflow Stepper: Eligibility & Application Flowchart */}
        <section aria-labelledby="flowchart-heading" className="space-y-4">
          <SectionHeader
            eyebrow={c.flowchartEyebrow}
            title={c.flowchartHeading}
            description={c.flowchartSubheading}
          />

          <div className="relative overflow-hidden rounded-2xl border border-slate-200/80 bg-gradient-to-b from-white via-white to-slate-50/40 p-5 shadow-[0_12px_32px_-12px_rgba(15,23,42,0.06)] ring-1 ring-slate-900/[0.02] sm:p-7">
            {/* Precision top hairline accent */}
            <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-[#136938] via-[#F59E0B] to-[#E35914]" />
            <div className="pointer-events-none absolute inset-x-0 top-0 h-3 bg-gradient-to-r from-[#136938]/10 via-[#F59E0B]/10 to-[#E35914]/15 blur-xs" />

            <CompactStepper
              steps={stepperItems}
              activeStep={activeWorkflowStep}
              onStepClick={(idx) => setActiveWorkflowStep(idx)}
            />

            {/* Active Step Explanatory Callout */}
            <div
              key={activeWorkflowStep}
              className="mt-6 rounded-xl border border-slate-200/90 bg-white p-5 sm:p-6 shadow-xs animate-stage-fade"
            >
              <div className="flex items-start gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-slate-900 font-label text-sm font-bold text-white shadow-xs">
                  {String(activeWorkflowStep + 1).padStart(2, '0')}
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-label text-[11px] font-bold uppercase tracking-wider text-[#E35914]">
                      {c.stepWord} {activeWorkflowStep + 1} • {c.grantApprovalStage}
                    </span>
                  </div>
                  <h4 className="font-devanagari text-base font-bold text-slate-900 sm:text-lg">
                    {ELIGIBILITY_FLOWCHART[activeWorkflowStep].title[language]}
                  </h4>
                  <p className="font-devanagari text-xs leading-relaxed text-slate-600 sm:text-sm max-w-2xl">
                    {ELIGIBILITY_FLOWCHART[activeWorkflowStep].desc[language]}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Investment Profile & Dynamic Match Dashboard */}
        <section
          aria-labelledby="profile-heading"
          className="grid grid-cols-1 items-start gap-8 lg:grid-cols-12"
        >
          {/* Form */}
          <div className="space-y-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-xs lg:col-span-7 sm:p-8">
            <div className="border-b border-slate-200 pb-4">
              <p className="text-xs font-bold uppercase tracking-wider text-[#E35914] font-label">
                {c.parametersEyebrow}
              </p>
              <h2
                id="profile-heading"
                className="mt-1 font-devanagari text-xl font-bold text-[#111827]"
              >
                {c.profileTitle}
              </h2>
              <p className="font-devanagari text-xs text-slate-500 sm:text-sm">
                {c.profileSubtitle}
              </p>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                setScreened(true);
              }}
              className="space-y-4"
            >
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <label className="block space-y-1.5">
                  <span className="text-xs font-semibold text-slate-700">
                    {c.district} *
                  </span>
                  <select
                    value={profile.district}
                    onChange={(e) => update('district', e.target.value)}
                    className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-[#111827] shadow-2xs transition focus:border-[#E35914] focus:outline-none focus:ring-2 focus:ring-[#E35914]/20"
                  >
                    {MAHARASHTRA_DISTRICTS.map((d) => (
                      <option key={d} value={d}>
                        {d}
                      </option>
                    ))}
                  </select>
                </label>

                <label className="block space-y-1.5">
                  <span className="text-xs font-semibold text-slate-700">
                    {c.area}
                  </span>
                  <input
                    type="text"
                    value={profile.area}
                    onChange={(e) => update('area', e.target.value)}
                    placeholder={c.phArea}
                    className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-[#111827] shadow-2xs transition focus:border-[#E35914] focus:outline-none focus:ring-2 focus:ring-[#E35914]/20"
                  />
                </label>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <label className="block space-y-1.5">
                  <span className="text-xs font-semibold text-slate-700">
                    {c.sector} *
                  </span>
                  <select
                    value={profile.sector}
                    onChange={(e) => update('sector', e.target.value)}
                    className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-[#111827] shadow-2xs transition focus:border-[#E35914] focus:outline-none focus:ring-2 focus:ring-[#E35914]/20"
                  >
                    {FOCUS_SECTORS.map((s) => (
                      <option key={s.code} value={s.name.en}>
                        {s.name[language]}
                      </option>
                    ))}
                  </select>
                </label>

                <label className="block space-y-1.5">
                  <span className="text-xs font-semibold text-slate-700">
                    {c.category} *
                  </span>
                  <select
                    value={profile.category}
                    onChange={(e) =>
                      update('category', e.target.value as ApplicantCategory)
                    }
                    className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-[#111827] shadow-2xs transition focus:border-[#E35914] focus:outline-none focus:ring-2 focus:ring-[#E35914]/20"
                  >
                    <option value="msme">{c.msme}</option>
                    <option value="women">{c.women}</option>
                    <option value="scst">{c.scst}</option>
                    <option value="general">{c.general}</option>
                  </select>
                </label>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="space-y-1.5">
                  <span className="block text-xs font-semibold text-slate-700">
                    {c.stage} *
                  </span>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => update('stage', 'new')}
                      className={`flex-1 rounded-xl border py-2.5 px-3 text-xs font-bold transition ${
                        profile.stage === 'new'
                          ? 'border-[#E35914] bg-orange-50 text-[#E35914] ring-2 ring-[#E35914]/20'
                          : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50'
                      }`}
                    >
                      {c.newUnit}
                    </button>
                    <button
                      type="button"
                      onClick={() => update('stage', 'expansion')}
                      className={`flex-1 rounded-xl border py-2.5 px-3 text-xs font-bold transition ${
                        profile.stage === 'expansion'
                          ? 'border-[#136938] bg-emerald-50 text-[#136938] ring-2 ring-[#136938]/20'
                          : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50'
                      }`}
                    >
                      {c.expansion}
                    </button>
                  </div>
                </div>

                <label className="block space-y-1.5">
                  <span className="text-xs font-semibold text-slate-700">
                    {c.investment}
                  </span>
                  <input
                    type="number"
                    value={profile.investment}
                    onChange={(e) => update('investment', e.target.value)}
                    placeholder={c.phInvestment}
                    className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 font-label text-sm text-[#111827] shadow-2xs transition focus:border-[#E35914] focus:outline-none focus:ring-2 focus:ring-[#E35914]/20"
                  />
                </label>
              </div>

              {/* Collapsible Capital Breakdown */}
              <div className="border-t border-slate-200 pt-3">
                <button
                  type="button"
                  onClick={() => setShowCostBreakup(!showCostBreakup)}
                  className="flex items-center gap-1.5 text-xs font-bold text-[#E35914] transition hover:text-[#CC4D0E]"
                >
                  <Sparkles className="h-3.5 w-3.5" />
                  <span>
                    {showCostBreakup ? c.hideBreakup : c.showBreakup}
                  </span>
                </button>

                {showCostBreakup && (
                  <div className="mt-3 space-y-3 rounded-xl border border-slate-200 bg-slate-50/70 p-4">
                    <span className="block text-xs font-bold uppercase tracking-wider text-slate-600 font-label">
                      {c.costBreakupHeading}
                    </span>
                    <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                      <div>
                        <label className="mb-1 block text-[11px] text-slate-500">
                          {c.landCost}
                        </label>
                        <input
                          type="number"
                          value={profile.landCost}
                          onChange={(e) => update('landCost', e.target.value)}
                          placeholder="₹"
                          className="w-full rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 font-label text-xs text-[#111827]"
                        />
                      </div>
                      <div>
                        <label className="mb-1 block text-[11px] text-slate-500">
                          {c.buildingCost}
                        </label>
                        <input
                          type="number"
                          value={profile.buildingCost}
                          onChange={(e) => update('buildingCost', e.target.value)}
                          placeholder="₹"
                          className="w-full rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 font-label text-xs text-[#111827]"
                        />
                      </div>
                      <div>
                        <label className="mb-1 block text-[11px] text-slate-500">
                          {c.plantCost}
                        </label>
                        <input
                          type="number"
                          value={profile.plantCost}
                          onChange={(e) => update('plantCost', e.target.value)}
                          placeholder="₹"
                          className="w-full rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 font-label text-xs text-[#111827]"
                        />
                      </div>
                      <div>
                        <label className="mb-1 block text-[11px] text-slate-500">
                          {c.otherCost}
                        </label>
                        <input
                          type="number"
                          value={profile.otherCost}
                          onChange={(e) => update('otherCost', e.target.value)}
                          placeholder="₹"
                          className="w-full rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 font-label text-xs text-[#111827]"
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div className="flex flex-wrap items-center gap-3 pt-3">
                <Button type="submit" variant="primary" size="md">
                  {c.screenBtn}
                </Button>
                {screened && (
                  <span className="flex items-center gap-1.5 text-xs font-bold text-[#136938] font-label">
                    <CheckCircle2 className="h-4 w-4" />
                    {c.screenedStatus}
                  </span>
                )}
              </div>
            </form>
          </div>

          {/* Profile Summary & Policy Match Results Box */}
          <div className="space-y-4 lg:col-span-5">
            <Reveal variant="fade-left" duration={500}>
              <TiltCard maxTilt={4} scale={1.01} glare={true} className="rounded-2xl">
                <div className="space-y-4 rounded-2xl border border-slate-200/90 bg-white p-6 shadow-xs hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                <div className="flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-orange-100 text-[#E35914]">
                    <Building2 className="h-4 w-4" />
                  </div>
                  <h3 className="font-devanagari text-base font-bold text-[#111827]">
                    {c.resultsHeading}
                  </h3>
                </div>
                <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-[11px] font-bold text-[#136938] border border-emerald-200">
                  {c.activeStatus}
                </span>
              </div>

              <div className="space-y-2.5 text-xs">
                <div className="flex justify-between py-1.5 border-b border-slate-100">
                  <span className="text-slate-500">{c.lblDistrictLocation}</span>
                  <span className="font-semibold text-slate-800">
                    {profile.district} {profile.area ? `(${profile.area})` : ''}
                  </span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-slate-100">
                  <span className="text-slate-500">{c.lblIndustrySector}</span>
                  <span className="font-semibold text-slate-800">
                    {profile.sector}
                  </span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-slate-100">
                  <span className="text-slate-500">{c.lblProjectStage}</span>
                  <span className="font-semibold text-[#136938]">
                    {profile.stage === 'new' ? c.newUnit : c.expansion}
                  </span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-slate-100">
                  <span className="text-slate-500">{c.lblPromoterCategory}</span>
                  <span className="font-semibold text-slate-800">
                    {profile.category === 'msme'
                      ? c.msme
                      : profile.category === 'women'
                        ? c.women
                        : profile.category === 'scst'
                          ? c.scst
                          : c.general}
                  </span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-slate-100">
                  <span className="text-slate-500">{c.lblProposedInvestment}</span>
                  <span className="font-bold text-[#111827] font-label">
                    {profile.investment
                      ? `₹ ${Number(profile.investment).toLocaleString('en-IN')}`
                      : c.notRecorded}
                  </span>
                </div>
                <div className="flex justify-between py-1.5">
                  <span className="text-slate-500">{c.lblMatchedPolicy}</span>
                  <span className="font-bold text-[#E35914] text-right max-w-[200px] truncate">
                    {matchedPolicy.title[language]}
                  </span>
                </div>
              </div>

              {/* Matched Policy Highlights */}
              <div className="rounded-xl border border-emerald-200/80 bg-emerald-50/60 p-3.5 text-xs text-[#136938] space-y-1.5">
                <div className="flex items-center gap-1.5 font-bold">
                  <Sparkles className="h-4 w-4 shrink-0 text-[#136938]" />
                  <span>{c.lblPotentialHeads}</span>
                </div>
                <p className="text-[11px] leading-relaxed text-emerald-950">
                  {matchedPolicy.provisions[language]}
                </p>
                <div className="pt-1 text-[10px] text-emerald-800 font-semibold">
                  {c.lblValidity} {matchedPolicy.validity[language]}
                </div>
              </div>

              <a
                href={OFFICIAL_SOURCES.maitri.href}
                target="_blank"
                rel="noreferrer"
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#E35914] to-[#ea580c] py-2.5 text-xs font-bold text-white shadow-sm transition hover:from-[#CC4D0E] hover:to-[#d9480f]"
              >
                <span>{c.applyMaitri}</span>
                <ExternalLink className="h-3.5 w-3.5" />
              </a>
            </div>
          </TiltCard>
        </Reveal>

        {/* Transparency Note */}
            <div className="flex items-start gap-3 rounded-xl border border-amber-200 bg-amber-50/70 p-4 text-xs text-amber-900">
              <ShieldAlert className="mt-0.5 h-4 w-4 shrink-0 text-amber-700" />
              <p className="leading-relaxed">{c.officialDisclaimer}</p>
            </div>
          </div>
        </section>

        {/* Incentive Breakdown: Expandable Cards */}
        <section aria-labelledby="breakdown-heading" className="space-y-4">
          <SectionHeader
            eyebrow={c.incentivesEyebrow}
            title={c.breakdownHeading}
            description={c.breakdownSubheading}
          />

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {INCENTIVE_BENEFIT_TYPES.map((ben) => (
              <ExpandableCard
                key={ben.id}
                title={ben.name[language]}
                accent="secondary"
                summary={
                  <p className="text-xs text-slate-600 line-clamp-2">
                    {ben.desc[language]}
                  </p>
                }
              >
                <div className="space-y-2 text-xs">
                  <div>
                    <strong className="text-slate-900">{c.lblDetailedDesc} </strong>
                    <span className="text-slate-600">{ben.desc[language]}</span>
                  </div>
                  <div className="rounded-lg bg-emerald-50/60 p-2.5 text-[11px] text-emerald-950 border border-emerald-100">
                    <strong className="font-bold text-[#136938]">{c.lblApplicableScope} </strong>
                    {ben.scope[language]}
                  </div>
                </div>
              </ExpandableCard>
            ))}
          </div>
        </section>

        {/* District Classification Zones: Interactive Comparison */}
        <section
          aria-labelledby="zone-heading"
          className="space-y-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-xs sm:p-8"
        >
          <SectionHeader
            eyebrow={c.zoningEyebrow}
            title={c.zoneHeading}
            description={c.zoneSubheading}
          />

          {/* Zone Selector Pills */}
          <div className="flex flex-wrap gap-2 pt-2">
            {DISTRICT_CLASSIFICATION_ZONES.map((zn) => (
              <button
                key={zn.zone}
                type="button"
                onClick={() => setSelectedZone(zn.zone)}
                className={`rounded-xl px-4 py-2 text-xs font-bold transition font-label ${
                  selectedZone === zn.zone
                    ? 'bg-[#136938] text-white shadow-xs'
                    : 'border border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100'
                }`}
              >
                {zn.zone} — {zn.title[language]}
              </button>
            ))}
          </div>

          {/* Active Zone Detail Showcase */}
          {(() => {
            const activeZone =
              DISTRICT_CLASSIFICATION_ZONES.find((z) => z.zone === selectedZone) ||
              DISTRICT_CLASSIFICATION_ZONES[0];
            return (
              <div className="grid grid-cols-1 gap-6 rounded-xl border border-slate-200 bg-slate-50/60 p-5 lg:grid-cols-3">
                <div className="space-y-2 lg:col-span-1">
                  <span className="inline-block rounded-md border border-emerald-200 bg-emerald-50 px-3 py-1 font-label text-xs font-bold text-[#136938]">
                    {activeZone.zone}
                  </span>
                  <h3 className="font-devanagari text-lg font-bold text-[#111827]">
                    {activeZone.title[language]}
                  </h3>
                  <p className="font-devanagari text-xs text-slate-600">
                    {c.zoningDesc}
                  </p>
                </div>

                <div className="space-y-1.5 lg:col-span-1">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-500 font-label">
                    {c.lblIncludedAreas}
                  </span>
                  <div className="rounded-lg border border-slate-200 bg-white p-3 font-devanagari text-xs text-slate-700">
                    {activeZone.areas[language]}
                  </div>
                </div>

                <div className="space-y-1.5 lg:col-span-1">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#136938] font-label">
                    {c.lblIncentiveScope}
                  </span>
                  <div className="rounded-lg border border-emerald-200 bg-emerald-50/80 p-3 font-devanagari text-xs font-semibold text-emerald-950">
                    {activeZone.incentiveScope[language]}
                  </div>
                </div>
              </div>
            );
          })()}
        </section>

        {/* Policy Reference Catalog with Search */}
        <section aria-labelledby="policies-heading" className="space-y-4">
          <SectionHeader
            eyebrow={c.policiesEyebrow}
            title={c.policiesHeading}
            description={c.policiesSubheading}
            action={
              <div className="relative w-full sm:w-72">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  value={policySearch}
                  onChange={(e) => setPolicySearch(e.target.value)}
                  placeholder={c.searchPoliciesPlaceholder}
                  className="w-full rounded-xl border border-slate-200 bg-white py-2 pl-9 pr-3 text-xs text-slate-800 shadow-2xs focus:border-[#E35914] focus:outline-none"
                />
              </div>
            }
          />

          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            {filteredPolicies.map((pol) => (
              <div
                key={pol.title.en}
                className="flex flex-col justify-between space-y-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-xs transition hover:border-[#E35914]"
              >
                <div className="space-y-3">
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="font-devanagari text-base font-bold text-[#111827]">
                      {pol.title[language]}
                    </h3>
                    <span className="shrink-0 rounded-full border border-orange-200 bg-orange-50 px-2.5 py-0.5 font-label text-[10px] font-bold text-[#E35914]">
                      {pol.validity[language]}
                    </span>
                  </div>

                  <div className="text-xs text-slate-600">
                    <strong className="text-slate-800">{c.lblApplicableSector} </strong>
                    <span>{pol.sector[language]}</span>
                  </div>

                  <p className="rounded-xl border border-slate-100 bg-slate-50/80 p-3 text-xs leading-relaxed text-slate-700">
                    {pol.provisions[language]}
                  </p>
                </div>

                <div className="border-t border-slate-100 pt-3">
                  <OfficialSourceLink
                    label={c.officialPolicyDoc}
                    href={pol.href}
                    variant="inline"
                  />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Tabbed Compliance Checklists: Required Documents vs Statutory Eligibility */}
        <section className="space-y-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-xs sm:p-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <SectionHeader
              eyebrow={c.complianceEyebrow}
              title={c.complianceTitle}
            />
            <TabsBar
              tabs={[
                {
                  id: 'checklist',
                  label: c.tabChecklist,
                  count: REQUIRED_DOCUMENTS_SCHEME.length,
                },
                {
                  id: 'eligibility',
                  label: c.tabEligibility,
                  count: ELIGIBILITY_CONDITIONS.length,
                },
              ]}
              activeTab={complianceTab}
              onChange={(t) => setComplianceTab(t as 'checklist' | 'eligibility')}
            />
          </div>

          {complianceTab === 'checklist' ? (
            <div className="grid grid-cols-1 gap-3 pt-2 sm:grid-cols-2">
              {REQUIRED_DOCUMENTS_SCHEME.map((doc, i) => (
                <div
                  key={i}
                  className="flex items-start gap-3 rounded-xl border border-slate-200 bg-slate-50/50 p-3.5 transition hover:bg-white"
                >
                  <FileCheck2 className="mt-0.5 h-4 w-4 shrink-0 text-[#E35914]" />
                  <span className="font-devanagari text-xs text-slate-700">
                    {doc[language]}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-3 pt-2 sm:grid-cols-2">
              {ELIGIBILITY_CONDITIONS.map((cond, i) => (
                <div
                  key={i}
                  className="flex items-start gap-3 rounded-xl border border-slate-200 bg-slate-50/50 p-3.5 transition hover:bg-white"
                >
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-100 font-label text-[11px] font-bold text-[#136938]">
                    {i + 1}
                  </span>
                  <span className="font-devanagari text-xs leading-relaxed text-slate-700">
                    {cond[language]}
                  </span>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
};
