import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useLanguage } from '../hooks/useLanguage';
import { useDemoData } from '../hooks/useDemoData';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { PageHeader } from '../components/ui/PageHeader';
import type { MeetingRequestStatus } from '../types';
import {
  Users,
  CheckCircle2,
  Copy,
  Check,
  ShieldCheck,
  Calendar,
  Building,
  Clock,
  Search,
  ClipboardList,
  XCircle,
  Send,
  FileSearch,
  Stamp,
  CalendarClock,
  CalendarCheck2,
} from 'lucide-react';
import { triggerConfetti } from '../components/animations/Confetti';

type LeaderPresentation = { name: string; title: string; focus: string };

const leaderTranslations: Record<string, Partial<Record<'en' | 'hi', LeaderPresentation>>> = {
  '/images/leadership/devendra-fadnavis.jpg': {
    en: {
      name: 'Hon. Devendra Fadnavis',
      title: 'Chief Minister, Maharashtra State',
      focus: 'Industry meeting coordination',
    },
    hi: {
      name: 'माननीय देवेंद्र फडणवीस',
      title: 'मुख्यमंत्री, महाराष्ट्र राज्य',
      focus: 'उद्योग बैठक समन्वय',
    },
  },
  '/images/leadership/narendra-modi.jpg': {
    en: {
      name: 'Hon. Narendra Modi',
      title: 'Prime Minister, Government of India',
      focus: 'Industry meeting coordination',
    },
    hi: {
      name: 'माननीय नरेंद्र मोदी',
      title: 'प्रधानमंत्री, भारत सरकार',
      focus: 'उद्योग बैठक समन्वय',
    },
  },
  '/images/leadership/ravindra-chavan.jpg': {
    en: {
      name: 'Hon. Ravindra Chavan',
      title: 'BJP Maharashtra leadership',
      focus: 'Industry meeting coordination',
    },
    hi: {
      name: 'माननीय रवींद्र चव्हाण',
      title: 'भाजपा महाराष्ट्र नेतृत्व',
      focus: 'उद्योग बैठक समन्वय',
    },
  },
};

const meetingRequestCopy = {
  mr: {
    category: 'नेतृत्व भेट विनंती',
    pageTitle: 'नेतृत्व भेटीची विनंती',
    pageDescription: 'औद्योगिक संघटना व प्रतिनिधींच्या शिष्टमंडळासाठी भेट विनंती नोंदवा. माहिती समन्वय मंचावर सुरक्षित ठेवली जाते.',
    preferredLeaderLabel: '१. कोणत्या नेत्यांची भेट घेऊ इच्छिता? (प्राधान्याचे नेते) *',
    delegationSectionTitle: '२. शिष्टमंडळ / उद्योगाची माहिती',
    businessNameLabel: 'उद्योग / संघटनेचे नाव *',
    businessNamePlaceholder: 'उदा. मराठवाडा ऑटो क्लस्टर व सप्लायर्स असोसिएशन',
    representativeNameLabel: 'प्रतिनिधीचे नाव *',
    representativeNamePlaceholder: 'उदा. श्री. रवींद्र जोशी',
    designationLabel: 'पदनाम *',
    designationPlaceholder: 'उदा. अध्यक्ष / उपाध्यक्ष',
    industrySectorLabel: 'उद्योग क्षेत्र *',
    industrySectorPlaceholder: 'उदा. ऑटोमोटिव्ह आणि ई-मोबिलिटी',
    objectiveSectionTitle: '३. भेटीचे नेमके प्रयोजन व स्वरूप',
    purposeLabel: 'भेटीचा मुख्य उद्देश व चर्चा विषय *',
    charsLeftLabel: 'अक्षरे शिल्लक',
    purposePlaceholder: 'उदा. नवीन ई-मोबिलिटी कंपोनंट क्लस्टरसाठी विशेष वीज सवलत पॅकेज आणि जमीन वाटपाच्या धोरणावर सविस्तर शिष्टमंडळ चर्चा...',
    preferredFormatLabel: 'पसंतीचे भेटीचे स्वरूप',
    meetingFormats: [
      { key: 'mumbai_delegation', label: 'मुंबई / मंत्रालय शिष्टमंडळ' },
      { key: 'regional_conclave', label: 'विभागीय बैठकीत भेट' },
      { key: 'virtual_video', label: 'व्हिडिओ परिषद (VC)' },
    ],
    supportingContextLabel: 'अतिरिक्त माहिती / पार्श्वभूमी (ऐच्छिक)',
    supportingContextPlaceholder: 'उदा. १५० पेक्षा अधिक एमएसएमई पुरवठादारांचे थेट प्रतिनिधित्व. ५०० कोटींची नवीन गुंतवणूक नियोजित.',
    declarationText: 'मी समजतो की ही प्राथमिक नोंद उद्योग सेतू मंचावर समन्वयासाठी जतन केली जाईल आणि वैधानिक मंजुरीसाठी संबंधित विभागाशी अधिकृत संपर्क साधावा लागेल.',
    submitBtn: 'भेट विनंती अर्ज सादर करा',
    tabSubmit: 'भेट विनंती सादर करा',
    tabTrack: 'विनंतीची स्थिती',
    trackHeading: 'आपल्या भेट विनंतीची स्थिती',
    trackSubheading: 'संदर्भ क्रमांक टाका किंवा खालील नमुना विनंत्यांपैकी एक निवडा.',
    refInputLabel: 'संदर्भ क्रमांक',
    refInputPlaceholder: 'DEMO-MTG-1001',
    refHelperText: 'उदा. DEMO-MTG-1001',
    viewStatusBtn: 'स्थिती पहा',
    sampleRequestsLabel: 'नमुना विनंत्या',
    notFoundError: 'या संदर्भ क्रमांकासाठी नमुना विनंती सापडली नाही. कृपया क्रमांक तपासा.',
    refNumberTitle: 'संदर्भ क्रमांक',
    orgLabel: 'संस्था',
    prefLeaderLabel: 'प्राधान्य नेतृत्व',
    districtHeaderLabel: 'जिल्हा',
    submittedDateLabel: 'सादर तारीख',
    journeyEyebrow: 'विनंतीची स्थिती',
    journeyTitle: 'विनंतीचा प्रवास',
    stageOfLabel: (curr: number, total: number) => `टप्पा ${curr} / ${total}`,
    statusDeclinedNote: 'नाकारले',
    badgeClosed: 'अंतिम स्थिती',
    badgeComplete: 'पूर्ण',
    badgeActive: 'सध्याचा टप्पा',
    badgeUpcoming: 'पुढील टप्पा',
    successTitle: 'भेट विनंती नोंद जतन झाली',
    successDesc: 'ही विनंती उद्योग सेतू समन्वय मंचावर जतन झाली आहे. पुढील संदर्भासाठी नोंदणी क्रमांक सुरक्षित ठेवा:',
    statusHeading: 'समन्वय स्थिती:',
    protocolNotice: 'ही प्राथमिक नोंद असून अधिकृत शासकीय किंवा प्रशासकीय मंजुरीसाठी संबंधित विभागाच्या विहित कार्यपद्धतीचे पालन करावे.',
    trackThisBtn: 'या विनंतीचा मागोवा घ्या',
    submitAnotherBtn: 'दुसरी भेट विनंती नोंदवा',
    reviewTimeline: 'माहिती व समन्वय — प्राथमिक नोंद',
    guidelinesTitle: 'शिष्टमंडळासाठी मार्गदर्शक सूचना',
    guidelines: [
      { title: 'प्रतिनिधींची माहिती', description: 'भेट विनंतीत सहभागी प्रतिनिधींची नावे व भूमिका नमूद करा.' },
      { title: 'विषय', description: 'मुद्दा संक्षिप्त, स्पष्ट आणि औद्योगिक विषयाशी संबंधित लिहा.' },
      { title: 'पार्श्वभूमी', description: 'आवश्यक असल्यास संबंधित कागदपत्रे स्वतंत्रपणे तयार ठेवा.' },
    ],
    liaisonTitle: 'समन्वय माहिती',
    liaisonDescription: 'विनंतीची नोंद उद्योग सेतू समन्वय मंचावर सुरक्षित राहते. आवश्यकतेनुसार संबंधित समन्वयकांद्वारे संपर्क साधला जाईल.',
    districtLabel: 'जिल्हा निवडा *',
    minPurposeError: 'किमान २० अक्षरांचे स्पष्ट प्रयोजन आवश्यक आहे',
    consentError: 'कृपया अटी मान्य असल्याचे निश्चित करा',
    statuses: {
      'Pending Review': 'पुनरावलोकन प्रलंबित',
      'Under Review': 'पुनरावलोकन सुरू',
      Approved: 'मंजूर',
      Declined: 'नाकारले',
      Scheduled: 'वेळापत्रक निश्चित',
    } as Record<MeetingRequestStatus, string>,
  },
  hi: {
    category: 'नेतृत्व भेंट अनुरोध',
    pageTitle: 'नेतृत्व भेंट का अनुरोध',
    pageDescription: 'औद्योगिक संगठनों और प्रतिनिधियों के प्रतिनिधिमंडल के लिए भेंट अनुरोध दर्ज करें। जानकारी समन्वय मंच पर सुरक्षित रखी जाती है।',
    preferredLeaderLabel: '१. आप किस नेता से मिलना चाहते हैं? (पसंदीदा नेता) *',
    delegationSectionTitle: '२. प्रतिनिधिमंडल / उद्यम की जानकारी',
    businessNameLabel: 'उद्योग / संगठन का नाम *',
    businessNamePlaceholder: 'उदा. मराठवाड़ा ऑटो क्लस्टर और सप्लायर्स एसोसिएशन',
    representativeNameLabel: 'प्रतिनिधि का नाम *',
    representativeNamePlaceholder: 'उदा. श्री रवींद्र जोशी',
    designationLabel: 'पदनाम *',
    designationPlaceholder: 'उदा. अध्यक्ष / उपाध्यक्ष',
    industrySectorLabel: 'उद्योग क्षेत्र *',
    industrySectorPlaceholder: 'उदा. ऑटोमोटिव और ई-मोबिलिटी',
    objectiveSectionTitle: '३. भेंट का उद्देश्य एवं पसंदीदा प्रारूप',
    purposeLabel: 'भेंट का मुख्य उद्देश्य एवं चर्चा विषय *',
    charsLeftLabel: 'अक्षर शेष',
    purposePlaceholder: 'उदा. नए ई-मोबिलिटी कंपोनेंट क्लस्टर के लिए विशेष विद्युत रियायत पैकेज एवं भूमि आवंटन नीति पर विस्तृत प्रतिनिधिमंडल चर्चा...',
    preferredFormatLabel: 'पसंदीदा बैठक का प्रारूप',
    meetingFormats: [
      { key: 'mumbai_delegation', label: 'मुंबई / मंत्रालय प्रतिनिधिमंडल' },
      { key: 'regional_conclave', label: 'क्षेत्रीय बैठक' },
      { key: 'virtual_video', label: 'वीडियो कॉन्फ़्रेंस (VC)' },
    ],
    supportingContextLabel: 'अतिरिक्त जानकारी / पृष्ठभूमि (वैकल्पिक)',
    supportingContextPlaceholder: 'उदा. १५० से अधिक एमएसएमई आपूर्तिकर्ताओं का सीधा प्रतिनिधित्व। ५०० करोड़ का नया निवेश प्रस्तावित।',
    declarationText: 'मैं समझता/समझती हूं कि यह प्राथमिक प्रविष्टि उद्योग सेतु मंच पर समन्वय हेतु सहेजी जाएगी और वैधानिक प्रक्रियाओं के लिए संबंधित विभाग से संपर्क आवश्यक होगा।',
    submitBtn: 'भेंट अनुरोध प्रस्तुत करें',
    tabSubmit: 'भेंट अनुरोध प्रस्तुत करें',
    tabTrack: 'अनुरोध की स्थिति',
    trackHeading: 'अपने भेंट अनुरोध की स्थिति देखें',
    trackSubheading: 'संदर्भ संख्या दर्ज करें या नीचे दिए गए नमूना अनुरोधों में से चुनें।',
    refInputLabel: 'संदर्भ संख्या',
    refInputPlaceholder: 'DEMO-MTG-1001',
    refHelperText: 'उदा. DEMO-MTG-1001',
    viewStatusBtn: 'स्थिति देखें',
    sampleRequestsLabel: 'नमूना अनुरोध',
    notFoundError: 'इस संदर्भ संख्या के लिए कोई नमूना अनुरोध नहीं मिला। कृपया संख्या की जांच करें।',
    refNumberTitle: 'संदर्भ संख्या',
    orgLabel: 'संस्था',
    prefLeaderLabel: 'पसंदीदा नेता',
    districtHeaderLabel: 'जिला',
    submittedDateLabel: 'प्रस्तुत तिथि',
    journeyEyebrow: 'अनुरोध की स्थिति',
    journeyTitle: 'अनुरोध प्रगति',
    stageOfLabel: (curr: number, total: number) => `चरण ${curr} / ${total}`,
    statusDeclinedNote: 'अस्वीकृत',
    badgeClosed: 'अंतिम स्थिति',
    badgeComplete: 'पूर्ण',
    badgeActive: 'वर्तमान चरण',
    badgeUpcoming: 'आगामी चरण',
    successTitle: 'बैठक अनुरोध सहेज लिया गया',
    successDesc: 'यह अनुरोध उद्योग सेतु समन्वय मंच पर सहेज लिया गया है। आगे के संदर्भ हेतु संदर्भ संख्या सुरक्षित रखें:',
    statusHeading: 'समन्वय स्थिति:',
    protocolNotice: 'यह प्रारंभिक प्रविष्टि है; आधिकारिक शासकीय बैठकों के लिए संबंधित विभाग की निर्धारित प्रक्रिया का पालन करें।',
    trackThisBtn: 'इस अनुरोध की स्थिति ट्रैक करें',
    submitAnotherBtn: 'दूसरा भेंट अनुरोध दर्ज करें',
    reviewTimeline: 'सूचना एवं समन्वय — प्राथमिक प्रविष्टि',
    guidelinesTitle: 'प्रतिनिधिमंडल के लिए दिशा-निर्देश',
    guidelines: [
      { title: 'प्रतिनिधियों की जानकारी', description: 'अनुरोध में शामिल प्रतिनिधियों के नाम और भूमिका लिखें।' },
      { title: 'विषय', description: 'मुद्दे को संक्षिप्त, स्पष्ट और उद्योग से संबंधित रखें।' },
      { title: 'पृष्ठभूमि', description: 'जरूरत हो तो संबंधित दस्तावेज अलग से तैयार रखें।' },
    ],
    liaisonTitle: 'समन्वय जानकारी',
    liaisonDescription: 'अनुरोध उद्योग सेतु समन्वय मंच पर सुरक्षित रहता है। आवश्यकतानुसार समन्वयकों द्वारा संपर्क किया जाएगा।',
    districtLabel: 'जिला चुनें *',
    minPurposeError: 'कम से कम २० अक्षरों का स्पष्ट प्रयोजन आवश्यक है',
    consentError: 'कृपया घोषणापत्र स्वीकार करें',
    statuses: {
      'Pending Review': 'समीक्षा लंबित',
      'Under Review': 'समीक्षाधीन',
      Approved: 'स्वीकृत',
      Declined: 'अस्वीकृत',
      Scheduled: 'अनुसूचित',
    } as Record<MeetingRequestStatus, string>,
  },
  en: {
    category: 'Leadership Meeting Request',
    pageTitle: 'Leadership Meeting Request',
    pageDescription: 'Submit a meeting request for industrial delegations and association representatives. Information is coordinated securely.',
    preferredLeaderLabel: '1. Preferred Leader for Meeting *',
    delegationSectionTitle: '2. Delegation / Enterprise Information',
    businessNameLabel: 'Business / Association Name *',
    businessNamePlaceholder: 'e.g. Marathwada Auto Cluster & Suppliers Association',
    representativeNameLabel: 'Representative Name *',
    representativeNamePlaceholder: 'e.g. Mr. Ravindra Joshi',
    designationLabel: 'Designation *',
    designationPlaceholder: 'e.g. President / Vice President',
    industrySectorLabel: 'Industry Sector *',
    industrySectorPlaceholder: 'e.g. Automotive & EV Mobility',
    objectiveSectionTitle: '3. Meeting Objective & Preferred Mode',
    purposeLabel: 'Purpose of Meeting & Agenda *',
    charsLeftLabel: 'chars left',
    purposePlaceholder: 'State the core issue, policy discussion agenda, or delegation memorandum summary...',
    preferredFormatLabel: 'Preferred Meeting Format',
    meetingFormats: [
      { key: 'mumbai_delegation', label: 'Mumbai / Mantralaya Delegation' },
      { key: 'regional_conclave', label: 'Regional Meeting' },
      { key: 'virtual_video', label: 'Video Conference (VC)' },
    ],
    supportingContextLabel: 'Supporting Context (Optional)',
    supportingContextPlaceholder: 'e.g. Direct representation of 150+ MSME suppliers. Planned new investment of ₹500 Cr.',
    declarationText: 'I acknowledge that this initial record is preserved for platform coordination and statutory meetings follow official protocol.',
    submitBtn: 'Submit Meeting Request',
    tabSubmit: 'Submit a request',
    tabTrack: 'Track a request',
    trackHeading: 'Track your meeting request',
    trackSubheading: 'Enter a reference number or choose one of the sample requests below.',
    refInputLabel: 'Request reference number',
    refInputPlaceholder: 'DEMO-MTG-1001',
    refHelperText: 'e.g. DEMO-MTG-1001',
    viewStatusBtn: 'View status',
    sampleRequestsLabel: 'Sample requests',
    notFoundError: 'No sample request was found for that reference. Check the number and try again.',
    refNumberTitle: 'Reference number',
    orgLabel: 'Organization',
    prefLeaderLabel: 'Preferred leader',
    districtHeaderLabel: 'District',
    submittedDateLabel: 'Submitted date',
    journeyEyebrow: 'Meeting Request',
    journeyTitle: 'Request progress',
    stageOfLabel: (curr: number, total: number) => `Stage ${curr} of ${total}`,
    statusDeclinedNote: 'Declined',
    badgeClosed: 'Closed',
    badgeComplete: 'Completed',
    badgeActive: 'In progress',
    badgeUpcoming: 'Upcoming',
    successTitle: 'Meeting request recorded',
    successDesc: 'This request is recorded for coordination. Keep your reference number handy:',
    statusHeading: 'Coordination status:',
    protocolNotice: 'This is an initial coordination record; official statutory meetings follow the department’s established protocol.',
    trackThisBtn: 'Track this request',
    submitAnotherBtn: 'Submit Another Request',
    reviewTimeline: 'Information & Coordination — Request Log',
    guidelinesTitle: 'Delegation Guidelines',
    guidelines: [
      { title: 'Participant Credentials', description: 'Specify delegation members, their affiliations and business roles.' },
      { title: 'Core Agenda', description: 'Provide a concise, factual executive summary of the subject matter.' },
      { title: 'Supporting Material', description: 'Keep project reports or representation memoranda ready for discussion.' },
    ],
    liaisonTitle: 'Coordination Details',
    liaisonDescription: 'Meeting inquiries are recorded securely for platform coordination. Official schedules depend on administrative availability.',
    districtLabel: 'Select District *',
    minPurposeError: 'Minimum 20 characters required',
    consentError: 'Please accept the declaration',
    statuses: {
      'Pending Review': 'Pending Review',
      'Under Review': 'Under Review',
      Approved: 'Approved',
      Declined: 'Declined',
      Scheduled: 'Scheduled',
    } as Record<MeetingRequestStatus, string>,
  },
};

export const MeetingRequestPage: React.FC = () => {
  const { language, t } = useLanguage();
  const { addMeetingRequest, meetingRequests } = useDemoData();
  const [searchParams] = useSearchParams();
  const requestedLeaderId = searchParams.get('leader');
  const copy = meetingRequestCopy[language];

  const toDevanagariNum = (val: number | string) =>
    language === 'en' ? String(val) : String(val).replace(/\d/g, (d) => '०१२३४५६७८९'[parseInt(d, 10)]);

  const MAX_PURPOSE_CHARS = 500;

  const [businessName, setBusinessName] = useState('');
  const [representativeName, setRepresentativeName] = useState('');
  const [designation, setDesignation] = useState('');
  const [industrySector, setIndustrySector] = useState('');
  const [district, setDistrict] = useState('Pune');

  const [meetingPurpose, setMeetingPurpose] = useState('');
  const [preferredFormat, setPreferredFormat] = useState<'mumbai_delegation' | 'regional_conclave' | 'virtual_video'>('mumbai_delegation');
  const [supportingContext, setSupportingContext] = useState('');
  const [consentAcknowledged, setConsentAcknowledged] = useState(false);

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedRef, setSubmittedRef] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [pageMode, setPageMode] = useState<'submit' | 'track'>('submit');
  const [trackingRef, setTrackingRef] = useState('');
  const [searchedTrackingRef, setSearchedTrackingRef] = useState<string | null>(null);

  const trackedRequest = searchedTrackingRef
    ? meetingRequests.find(
        (request) => request.referenceId.toUpperCase() === searchedTrackingRef.toUpperCase()
      )
    : undefined;

  const handleTrackingSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!trackingRef.trim()) return;
    setSearchedTrackingRef(trackingRef.trim());
  };

  const showTrackingRequest = (referenceId: string) => {
    setTrackingRef(referenceId);
    setSearchedTrackingRef(referenceId);
  };

  const trackingStages = [
    {
      title: language === 'mr' ? 'विनंती नोंद जतन' : language === 'hi' ? 'अनुरोध सहेजा गया' : 'Request recorded',
      description: language === 'mr' ? 'समन्वय संदर्भ क्रमांक तयार झाला; माहिती मंचावर सुरक्षित आहे.' : language === 'hi' ? 'समन्वय संदर्भ संख्या बनी; जानकारी मंच पर सुरक्षित है।' : 'Reference created; details recorded for coordination.',
    },
    {
      title: language === 'mr' ? 'पुनरावलोकन टप्पा' : language === 'hi' ? 'समीक्षा चरण' : 'Review stage',
      description: language === 'mr' ? 'शिष्टमंडळ विषय व अजेंडा समन्वयकांद्वारे तपासला जातो.' : language === 'hi' ? 'शिष्टमंडल विषय व एजेंडा समन्वयकों द्वारा देखा जाता है।' : 'Delegation agenda is assessed by coordination team.',
    },
    {
      title: language === 'mr' ? 'स्थिती तपशील' : language === 'hi' ? 'स्थिति विवरण' : 'Status details',
      description:
        trackedRequest?.status === 'Approved'
          ? language === 'mr' ? 'प्राथमिक पडताळणी पूर्ण झाली आहे.' : language === 'hi' ? 'प्राथमिक सत्यापन पूर्ण हुआ है।' : 'Preliminary verification complete.'
          : trackedRequest?.status === 'Declined'
          ? language === 'mr' ? 'अधिक माहिती किंवा सुधारित अजेंडा आवश्यक आहे.' : language === 'hi' ? 'अतिरिक्त जानकारी या संशोधित एजेंडा आवश्यक है।' : 'Additional details or revised agenda needed.'
          : language === 'mr' ? 'नोंद सध्या समन्वय प्रक्रियेत आहे.' : language === 'hi' ? 'रिकॉर्ड वर्तमान में समन्वय प्रक्रिया में है।' : 'Record is in active coordination process.',
    },
    {
      title: language === 'mr' ? 'वेळापत्रक समन्वय' : language === 'hi' ? 'समय-निर्धारण समन्वय' : 'Schedule coordination',
      description: language === 'mr' ? 'वेळ व उपलब्धतेनुसार भेटीचे नियोजन समन्वयित केले जाते.' : language === 'hi' ? 'समय व उपलब्धता अनुसार भेंट नियोजित की जाती है।' : 'Meeting slot is coordinated per availability.',
    },
    {
      title: language === 'mr' ? 'भेट समन्वय स्थिती' : language === 'hi' ? 'बैठक समन्वय स्थिति' : 'Meeting status',
      description: language === 'mr' ? 'संबंधित प्रतिनिधींना पुढील संवादासाठी सूचित केले जाते.' : language === 'hi' ? 'संबंधित प्रतिनिधियों को आगे के संवाद हेतु सूचित किया जाता है।' : 'Delegates will be informed for subsequent communication.',
    },
  ];

  const statusStageIndex: Record<MeetingRequestStatus, number> = {
    'Pending Review': 0,
    'Under Review': 1,
    Approved: 3,
    Declined: 2,
    Scheduled: 4,
  };

  const trackingStageIcons = [Send, FileSearch, Stamp, CalendarClock, CalendarCheck2];

  const leadersList = [
    {
      key: 'devendra-fadnavis',
      id: 'Hon. Devendra Fadnavis (मा. देवेंद्र फडणवीस)',
      name: 'मा. देवेंद्र फडणवीस',
      title: 'मुख्यमंत्री, महाराष्ट्र राज्य',
      image: '/images/leadership/devendra-fadnavis.jpg',
      focus: 'उद्योग बैठक समन्वय',
    },
    {
      key: 'narendra-modi',
      id: 'Hon. Narendra Modi (मा. नरेंद्र मोदी)',
      name: 'मा. नरेंद्र मोदी',
      title: 'पंतप्रधान, भारत सरकार',
      image: '/images/leadership/narendra-modi.jpg',
      focus: 'उद्योग बैठक समन्वय',
    },
    {
      key: 'ravindra-chavan',
      id: 'Hon. Ravindra Chavan (मा. रवींद्र चव्हाण)',
      name: 'मा. रवींद्र चव्हाण',
      title: 'भाजप महाराष्ट्र नेतृत्व',
      image: '/images/leadership/ravindra-chavan.jpg',
      focus: 'उद्योग बैठक समन्वय',
    },
  ];

  const localizedLeaders = leadersList.map((leader) =>
    language === 'mr'
      ? leader
      : { ...leader, ...(leaderTranslations[leader.image]?.[language] ?? {}) }
  );

  const [preferredLeader, setPreferredLeader] = useState(() =>
    leadersList.find((leader) => leader.key === requestedLeaderId)?.id ?? leadersList[0].id
  );

  const maharashtraDistricts = [
    'पुणे',
    'छत्रपती संभाजीनगर',
    'नागपूर',
    'नाशिक',
    'ठाणे',
    'मुंबई शहर व उपनगर',
    'पालघर',
    'रायगड',
    'सोलापूर',
    'कोल्हापूर',
    'सातारा',
    'अमरावती',
    'सांगली',
    'रत्नागिरी',
    'जळगाव',
    'नांदेड',
    'चंद्रपूर',
  ];

  const districtIds = [
    'Pune',
    'Chhatrapati Sambhajinagar',
    'Nagpur',
    'Nashik',
    'Thane',
    'Mumbai City & Suburbs',
    'Palghar',
    'Raigad',
    'Solapur',
    'Kolhapur',
    'Satara',
    'Amravati',
    'Sangli',
    'Ratnagiri',
    'Jalgaon',
    'Nanded',
    'Chandrapur',
  ];

  const districtTranslations = {
    mr: maharashtraDistricts,
    hi: [
      'पुणे',
      'छत्रपति संभाजीनगर',
      'नागपुर',
      'नासिक',
      'ठाणे',
      'मुंबई शहर और उपनगर',
      'पालघर',
      'रायगढ़',
      'सोलापुर',
      'कोल्हापुर',
      'सातारा',
      'अमरावती',
      'सांगली',
      'रत्नागिरी',
      'जलगांव',
      'नांदेड',
      'चंद्रपुर',
    ],
    en: districtIds,
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!businessName.trim()) newErrors.businessName = t.common.requiredField;
    if (!representativeName.trim()) newErrors.representativeName = t.common.requiredField;
    if (!designation.trim()) newErrors.designation = t.common.requiredField;
    if (!industrySector.trim()) newErrors.industrySector = t.common.requiredField;
    if (!meetingPurpose.trim()) {
      newErrors.meetingPurpose = t.common.requiredField;
    } else if (meetingPurpose.trim().length < 20) {
      newErrors.meetingPurpose = copy.minPurposeError;
    }
    if (!consentAcknowledged) {
      newErrors.consent = copy.consentError;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    setTimeout(() => {
      const record = addMeetingRequest({
        businessName,
        representativeName,
        designation,
        industrySector,
        district,
        email: '',
        phone: '',
        preferredLeader,
        meetingPurpose,
        preferredFormat,
        supportingContext: supportingContext.trim() || undefined,
      });

      setIsSubmitting(false);
      setSubmittedRef(record.referenceId);
      triggerConfetti();
      window.scrollTo({ top: 100, behavior: 'smooth' });
    }, 600);
  };

  const copyRefId = () => {
    if (submittedRef) {
      navigator.clipboard.writeText(submittedRef);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const remainingChars = MAX_PURPOSE_CHARS - meetingPurpose.length;

  return (
    <div className="bg-[#F8FAFC] min-h-screen py-8 font-devanagari text-[#111827]">
      <div className="w-full max-w-[1560px] mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <Breadcrumbs items={[{ label: t.nav.meetingRequest }]} />

        {/* Heading Card */}
        <PageHeader
          category={copy.category}
          categoryIcon={<Users className="h-3.5 w-3.5" />}
          title={copy.pageTitle}
          description={copy.pageDescription}
          actions={
            <div className="hidden lg:flex flex-col items-end gap-1.5 shrink-0 bg-slate-50/80 p-4 rounded-xl border border-slate-200/80 shadow-2xs">
              <div className="flex items-center gap-2 text-xs font-semibold text-[#E35914]">
                <Calendar className="w-4 h-4" />
                <span>{copy.reviewTimeline}</span>
              </div>
            </div>
          }
        />

        <div className="relative grid w-full max-w-[430px] grid-cols-2 rounded-xl border border-[#E2E8F0] bg-white p-1.5 shadow-xs" role="group" aria-label="Meeting request options">
          <span
            aria-hidden="true"
            className={`pointer-events-none absolute inset-y-1.5 left-1.5 w-[calc(50%_-_0.375rem)] rounded-lg border shadow-sm transition-[transform,background-color,border-color] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${pageMode === 'track' ? 'translate-x-full border-[#E35914] bg-[#FFF7ED]' : 'translate-x-0 border-transparent bg-[#E35914]'}`}
          />
          <button
            type="button"
            aria-pressed={pageMode === 'submit'}
            onClick={() => setPageMode('submit')}
            className={`relative z-10 inline-flex min-w-0 w-full items-center justify-center gap-2 rounded-lg px-2.5 sm:px-4 py-2.5 text-xs font-bold transition-colors duration-300 ${pageMode === 'submit' ? 'text-white' : 'text-[#475569] hover:text-[#111827]'}`}
          >
            <ClipboardList className="h-4 w-4" />
            {copy.tabSubmit}
          </button>
          <button
            type="button"
            aria-pressed={pageMode === 'track'}
            onClick={() => setPageMode('track')}
            className={`relative z-10 inline-flex min-w-0 w-full items-center justify-center gap-2 rounded-lg px-2.5 sm:px-4 py-2.5 text-xs font-bold transition-colors duration-300 ${pageMode === 'track' ? 'text-[#C2410C]' : 'text-[#475569] hover:text-[#111827]'}`}
          >
            <Search className="h-4 w-4" />
            {copy.tabTrack}
          </button>
        </div>

        {/* 2-Column Master Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Main Column (9 Cols) */}
          <div
            key={pageMode}
            className={`lg:col-span-9 space-y-6 ${pageMode === 'track' ? 'meeting-request-panel-enter-right' : 'meeting-request-panel-enter-left'}`}
          >
            {pageMode === 'track' ? (
              <div className="bg-white rounded-2xl border border-[#E2E8F0] shadow-xs p-6 sm:p-8 space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                  <div className="space-y-1">
                    <h2 className="text-xl sm:text-2xl font-extrabold text-[#111827]">
                      {copy.trackHeading}
                    </h2>
                    <p className="text-xs text-[#64748B]">
                      {copy.trackSubheading}
                    </p>
                  </div>
                </div>

                <form onSubmit={handleTrackingSubmit} className="flex flex-col sm:flex-row sm:items-start gap-3">
                  <div className="flex-1">
                    <Input
                      label={copy.refInputLabel}
                      value={trackingRef}
                      onChange={(event) => setTrackingRef(event.target.value)}
                      placeholder={copy.refInputPlaceholder}
                      icon={<Search className="h-4 w-4" />}
                      helperText={copy.refHelperText}
                    />
                  </div>
                  <Button type="submit" variant="primary" size="md" className="sm:mt-[22px] sm:self-start" icon={<Search className="h-4 w-4" />}>
                    {copy.viewStatusBtn}
                  </Button>
                </form>

                <div className="space-y-2">
                  <p className="text-[11px] font-bold uppercase tracking-wider text-[#64748B]">
                    {copy.sampleRequestsLabel}
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {meetingRequests.slice(0, 4).map((request) => (
                      <button
                        key={request.id}
                        type="button"
                        onClick={() => showTrackingRequest(request.referenceId)}
                        className={`flex items-center justify-between gap-3 rounded-xl border p-3 text-left transition ${searchedTrackingRef === request.referenceId ? 'border-[#136938] bg-[#F0FDF4]' : 'border-[#E2E8F0] hover:border-[#94A3B8] hover:bg-[#F8FAFC]'}`}
                      >
                        <span className="min-w-0">
                          <span className="block truncate text-xs font-bold text-[#111827]">{request.referenceId}</span>
                          <span className="block truncate text-[11px] text-[#64748B]">{request.businessName}</span>
                        </span>
                        <span className="shrink-0 rounded-full bg-white px-2 py-1 text-[10px] font-semibold text-[#475569] border border-[#E2E8F0]">
                          {copy.statuses[request.status] ?? request.status}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                {searchedTrackingRef && !trackedRequest && (
                  <div className="flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 p-4 text-xs text-red-700" role="alert">
                    <XCircle className="h-4 w-4 shrink-0 mt-0.5" />
                    <p>{copy.notFoundError}</p>
                  </div>
                )}

                {trackedRequest && (
                  <div className="rounded-2xl border border-[#E2E8F0] overflow-hidden">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-[#F8FAFC] p-4 sm:p-5 border-b border-[#E2E8F0]">
                      <div>
                        <p className="text-[10px] uppercase tracking-wider font-bold text-[#64748B]">{copy.refNumberTitle}</p>
                        <p className="font-label font-extrabold text-[#E35914]">{trackedRequest.referenceId}</p>
                      </div>
                      <span className={`inline-flex w-fit rounded-full px-3 py-1 text-xs font-bold ${trackedRequest.status === 'Declined' ? 'bg-red-100 text-red-700' : trackedRequest.status === 'Scheduled' ? 'bg-green-100 text-green-800' : trackedRequest.status === 'Approved' ? 'bg-blue-100 text-blue-800' : 'bg-amber-100 text-amber-800'}`}>
                        {copy.statuses[trackedRequest.status] ?? trackedRequest.status}
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 sm:p-5 border-b border-[#E2E8F0] text-xs">
                      <div>
                        <p className="text-[#64748B]">{copy.orgLabel}</p>
                        <p className="font-semibold text-[#111827]">{trackedRequest.businessName}</p>
                      </div>
                      <div>
                        <p className="text-[#64748B]">{copy.prefLeaderLabel}</p>
                        <p className="font-semibold text-[#111827]">{trackedRequest.preferredLeader}</p>
                      </div>
                      <div>
                        <p className="text-[#64748B]">{copy.districtHeaderLabel}</p>
                        <p className="font-semibold text-[#111827]">{trackedRequest.district}</p>
                      </div>
                      <div>
                        <p className="text-[#64748B]">{copy.submittedDateLabel}</p>
                        <p className="font-semibold text-[#111827]">
                          {new Date(trackedRequest.submittedAt).toLocaleDateString(language === 'mr' ? 'mr-IN' : language === 'hi' ? 'hi-IN' : 'en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                        </p>
                      </div>
                    </div>

                    <div className="bg-linear-to-br from-[#F8FAFC] via-white to-[#F8FAFC] p-4 sm:p-6">
                      <div className="mb-6 flex items-center justify-between gap-4">
                        <div className="flex items-center gap-3">
                          <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#FED7AA] bg-[#FFF7ED] text-[#E35914] shadow-xs">
                            <Clock className="h-5 w-5" />
                          </div>
                          <div>
                            <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#94A3B8]">
                              {copy.journeyEyebrow}
                            </p>
                            <h3 className="text-sm font-extrabold text-[#111827]">
                              {copy.journeyTitle}
                            </h3>
                          </div>
                        </div>
                        <span className="shrink-0 rounded-lg border border-[#E2E8F0] bg-white px-3 py-2 text-[10px] font-bold uppercase tracking-wider text-[#475569] shadow-xs">
                          {copy.stageOfLabel(toDevanagariNum(statusStageIndex[trackedRequest.status] + 1) as any, toDevanagariNum(trackingStages.length) as any)}
                        </span>
                      </div>

                      <ol className="space-y-0">
                        {trackingStages.map((stage, index) => {
                          const currentStage = statusStageIndex[trackedRequest.status];
                          const isCurrent = index === currentStage;
                          const isActive = isCurrent && trackedRequest.status !== 'Scheduled';
                          const isComplete = index < currentStage || trackedRequest.status === 'Scheduled';
                          const isDeclinedStage = trackedRequest.status === 'Declined' && isCurrent;
                          const StageIcon = trackingStageIcons[index];
                          const detail = index === 0
                            ? `${stage.description} ${new Date(trackedRequest.submittedAt).toLocaleDateString(language === 'mr' ? 'mr-IN' : language === 'hi' ? 'hi-IN' : 'en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}`
                            : index === 2 && trackedRequest.decisionNote
                            ? trackedRequest.decisionNote
                            : stage.description;

                          return (
                            <li key={stage.title} className="relative grid grid-cols-[40px_minmax(0,1fr)] gap-x-4 pb-5 last:pb-0">
                              {index < trackingStages.length - 1 && (
                                <span className={`absolute left-[19px] top-10 bottom-0 -mb-5 w-0.5 ${isComplete ? 'bg-linear-to-b from-[#136938] to-[#86C79F]' : 'bg-[#DCE5EF]'}`} />
                              )}
                              <span className={`relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 transition-all ${isDeclinedStage ? 'border-red-500 bg-white text-red-600 ring-4 ring-red-100' : isComplete ? 'border-[#136938] bg-[#136938] text-white shadow-[0_4px_10px_rgba(19,105,56,0.18)]' : isCurrent ? 'border-[#E35914] bg-white text-[#E35914] ring-4 ring-[#FFEDD5] shadow-[0_4px_12px_rgba(227,89,20,0.14)]' : 'border-[#CBD5E1] bg-white text-[#94A3B8]'}`}>
                                {isDeclinedStage ? <XCircle className="h-5 w-5" /> : <StageIcon className="h-5 w-5 stroke-[2.25]" />}
                              </span>
                              <div className={`-mt-1 min-w-0 rounded-xl border px-4 py-3 transition-all ${isDeclinedStage ? 'border-red-200 bg-red-50/80 shadow-xs' : isActive ? 'border-[#FED7AA] bg-linear-to-r from-[#FFF7ED] to-white shadow-[0_4px_16px_rgba(227,89,20,0.07)]' : isComplete ? 'border-transparent bg-white/70' : 'border-transparent bg-transparent'}`}>
                                <div className="flex flex-wrap items-start justify-between gap-2">
                                  <p className={`pt-0.5 text-sm font-bold ${isDeclinedStage ? 'text-red-700' : isActive ? 'text-[#111827]' : isComplete ? 'text-[#136938]' : 'text-[#94A3B8]'}`}>
                                    {stage.title}{isDeclinedStage ? ` · ${copy.statusDeclinedNote}` : ''}
                                  </p>
                                  <span className={`rounded-full px-2.5 py-1 text-[9px] font-extrabold uppercase tracking-wider ${isDeclinedStage ? 'bg-red-100 text-red-700' : isActive ? 'bg-[#FFEDD5] text-[#C2410C]' : isComplete ? 'bg-[#DCFCE7] text-[#166534]' : 'bg-[#F1F5F9] text-[#94A3B8]'}`}>
                                    {isDeclinedStage
                                      ? copy.badgeClosed
                                      : isComplete
                                      ? copy.badgeComplete
                                      : isActive
                                      ? copy.badgeActive
                                      : copy.badgeUpcoming}
                                  </span>
                                </div>
                                <p className={`mt-1.5 text-xs leading-relaxed ${isActive || isDeclinedStage ? 'text-[#475569]' : isComplete ? 'text-[#64748B]' : 'text-[#94A3B8]'}`}>{detail}</p>
                              </div>
                            </li>
                          );
                        })}
                      </ol>
                    </div>
                  </div>
                )}
              </div>
            ) : submittedRef ? (
              <div className="bg-white rounded-2xl p-8 border border-[#E2E8F0] shadow-sm text-center space-y-6 relative overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-1.5 bg-[#E35914]" />

                <div className="w-16 h-16 rounded-full bg-[#FFF7ED] text-[#E35914] flex items-center justify-center mx-auto ring-4 ring-[#FFEDD5]">
                  <CheckCircle2 className="w-10 h-10" />
                </div>

                <div className="space-y-2">
                  <h2 className="text-2xl font-bold text-[#111827]">
                    {copy.successTitle}
                  </h2>
                  <p className="text-xs sm:text-sm text-[#475569] max-w-lg mx-auto">
                    {copy.successDesc}
                  </p>
                </div>

                {/* Reference Badge */}
                <div className="bg-[#FFF7ED] border-2 border-dashed border-[#E35914] rounded-2xl p-6 max-w-md mx-auto space-y-2">
                  <span className="text-xs font-bold text-[#9A3412] uppercase font-label">
                    {t.common.referenceId}
                  </span>
                  <div className="text-2xl sm:text-3xl font-extrabold text-[#E35914] tracking-wider font-label">
                    {submittedRef}
                  </div>
                  <button
                    type="button"
                    onClick={copyRefId}
                    className="cursor-pointer inline-flex items-center gap-1.5 text-xs text-[#E35914] hover:text-[#CC4D0E] font-medium pt-1"
                  >
                    {copied ? <Check className="w-3.5 h-3.5 text-[#136938]" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copied ? t.common.copied : t.common.copyId}</span>
                  </button>
                </div>

                {/* Official Protocol Notice */}
                <div className="bg-[#F8FAFC] p-4 rounded-xl border border-[#E2E8F0] text-xs text-[#475569] max-w-lg mx-auto space-y-2 text-left">
                  <div className="flex items-center gap-2 font-bold text-[#111827]">
                    <ShieldCheck className="w-4 h-4 text-[#136938]" />
                    <span>{copy.statusHeading}</span>
                  </div>
                  <p className="leading-relaxed text-[11px]">
                    {copy.protocolNotice}
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row justify-center gap-3 pt-2">
                  <Button
                    variant="primary"
                    size="md"
                    onClick={() => {
                      setTrackingRef(submittedRef);
                      setSearchedTrackingRef(submittedRef);
                      setPageMode('track');
                    }}
                  >
                    {copy.trackThisBtn}
                  </Button>
                  <Button
                    variant="outlined"
                    size="md"
                    onClick={() => {
                      setSubmittedRef(null);
                      setMeetingPurpose('');
                      setSupportingContext('');
                    }}
                  >
                    {copy.submitAnotherBtn}
                  </Button>
                </div>
              </div>
            ) : (
              /* Request Form */
              <div className="bg-white rounded-2xl border border-[#E2E8F0] shadow-xs p-6 sm:p-8 space-y-6">
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Preferred Leader Selector */}
                  <div className="space-y-3">
                    <label className="block text-xs font-bold text-[#111827] uppercase tracking-wider font-label">
                      {copy.preferredLeaderLabel}
                    </label>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                      {localizedLeaders.map((ldr) => (
                        <label
                          key={ldr.id}
                          className={`relative flex flex-col items-center gap-2 min-h-48 p-4 pt-5 rounded-xl border border-[#E2E8F0] cursor-pointer transition-all duration-200 ${
                            preferredLeader === ldr.id
                              ? 'bg-[#FFF7ED] shadow-[0_12px_24px_rgba(227,89,20,0.14)]'
                              : 'bg-white hover:bg-[#F8FAFC] hover:shadow-sm'
                          }`}
                        >
                          {preferredLeader === ldr.id && (
                            <span className="absolute left-1/2 top-0 h-1 w-16 -translate-x-1/2 rounded-b-full bg-[#E35914]" />
                          )}
                          <input
                            type="radio"
                            name="preferredLeader"
                            checked={preferredLeader === ldr.id}
                            onChange={() => setPreferredLeader(ldr.id)}
                            className="absolute top-3 left-3 shrink-0 accent-[#E35914] focus:ring-[#E35914]"
                          />
                          <img
                            src={ldr.image}
                            alt={ldr.name}
                            className="w-20 h-20 rounded-full object-cover object-top border border-[#CBD5E1] shrink-0"
                          />
                          <div className="flex w-full flex-1 min-w-0 flex-col items-center gap-1 text-center">
                            <div className="w-full text-center text-base font-bold text-[#111827]">{ldr.name}</div>
                            <div className="flex min-h-12 w-full items-center justify-center text-center text-[13px] leading-snug text-[#E35914] font-medium">{ldr.title}</div>
                            <div className="mt-0.5 w-full text-center text-[13px] leading-relaxed text-[#64748B]">{ldr.focus}</div>
                          </div>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Representative Details */}
                  <div className="pt-4 border-t border-[#E2E8F0] space-y-4">
                    <h3 className="text-xs font-bold text-[#111827] uppercase tracking-wider font-label">
                      {copy.delegationSectionTitle}
                    </h3>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="sm:col-span-2">
                        <Input
                          label={copy.businessNameLabel}
                          value={businessName}
                          onChange={(e) => setBusinessName(e.target.value)}
                          placeholder={copy.businessNamePlaceholder}
                          error={errors.businessName}
                        />
                      </div>

                      <div>
                        <Input
                          label={copy.representativeNameLabel}
                          value={representativeName}
                          onChange={(e) => setRepresentativeName(e.target.value)}
                          placeholder={copy.representativeNamePlaceholder}
                          error={errors.representativeName}
                        />
                      </div>

                      <div>
                        <Input
                          label={copy.designationLabel}
                          value={designation}
                          onChange={(e) => setDesignation(e.target.value)}
                          placeholder={copy.designationPlaceholder}
                          error={errors.designation}
                        />
                      </div>

                      <div>
                        <Input
                          label={copy.industrySectorLabel}
                          value={industrySector}
                          onChange={(e) => setIndustrySector(e.target.value)}
                          placeholder={copy.industrySectorPlaceholder}
                          error={errors.industrySector}
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-[#334155] mb-1.5">
                          {copy.districtLabel}
                        </label>
                        <select
                          value={district}
                          onChange={(e) => setDistrict(e.target.value)}
                          className="w-full px-3.5 py-2.5 rounded-xl border border-[#CBD5E1] bg-white text-xs text-[#111827] focus:outline-none focus:ring-2 focus:ring-[#E35914] focus:border-transparent transition"
                        >
                          {districtIds.map((id, index) => (
                            <option key={id} value={id}>
                              {districtTranslations[language][index]}
                            </option>
                          ))}
                        </select>
                      </div>

                    </div>
                  </div>

                  {/* Meeting Purpose */}
                  <div className="pt-4 border-t border-[#E2E8F0] space-y-4">
                    <h3 className="text-xs font-bold text-[#111827] uppercase tracking-wider font-label">
                      {copy.objectiveSectionTitle}
                    </h3>

                    <div>
                      <div className="flex items-center justify-between mb-1.5">
                        <label className="text-xs font-semibold text-[#334155]">
                          {copy.purposeLabel}
                        </label>
                        <span
                          className={`text-[11px] font-label ${
                            remainingChars < 50 ? 'text-red-500 font-bold' : 'text-[#64748B]'
                          }`}
                        >
                          {toDevanagariNum(remainingChars)} {copy.charsLeftLabel}
                        </span>
                      </div>
                      <textarea
                        rows={4}
                        maxLength={MAX_PURPOSE_CHARS}
                        value={meetingPurpose}
                        onChange={(e) => setMeetingPurpose(e.target.value)}
                        placeholder={copy.purposePlaceholder}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-[#CBD5E1] text-xs text-[#111827] focus:outline-none focus:ring-2 focus:ring-[#E35914] focus:border-transparent transition resize-y font-devanagari"
                      />
                      {errors.meetingPurpose && (
                        <p className="text-xs text-red-600 mt-1">{errors.meetingPurpose}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-[#334155] mb-1.5">
                        {copy.preferredFormatLabel}
                      </label>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
                        {copy.meetingFormats.map((m) => (
                          <label
                            key={m.key}
                            className={`p-2.5 rounded-xl border cursor-pointer text-center transition ${
                              preferredFormat === m.key
                                ? 'border-[#E35914] bg-[#FFF7ED] font-bold text-[#E35914]'
                                : 'border-[#E2E8F0] bg-white text-[#475569] hover:bg-[#F8FAFC]'
                            }`}
                          >
                            <input
                              type="radio"
                              name="preferredFormat"
                              checked={preferredFormat === m.key}
                              onChange={() => setPreferredFormat(m.key as any)}
                              className="hidden"
                            />
                            <span>{m.label}</span>
                          </label>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-[#334155] mb-1.5">
                        {copy.supportingContextLabel}
                      </label>
                      <textarea
                        rows={2}
                        value={supportingContext}
                        onChange={(e) => setSupportingContext(e.target.value)}
                        placeholder={copy.supportingContextPlaceholder}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-[#CBD5E1] text-xs text-[#111827] focus:outline-none focus:ring-2 focus:ring-[#E35914] focus:border-transparent transition resize-y font-devanagari"
                      />
                    </div>

                    {/* Declaration */}
                    <div className="pt-2">
                      <label className="flex items-start gap-2.5 text-xs text-[#334155] cursor-pointer">
                        <input
                          type="checkbox"
                          checked={consentAcknowledged}
                          onChange={(e) => setConsentAcknowledged(e.target.checked)}
                          className="mt-0.5 h-4 w-4 rounded border-gray-300 text-[#E35914] focus:ring-[#E35914]"
                        />
                        <span className="leading-relaxed">
                          {copy.declarationText}
                        </span>
                      </label>
                      {errors.consent && (
                        <p className="text-xs text-red-600 mt-1">{errors.consent}</p>
                      )}
                    </div>
                  </div>

                  <div className="pt-4 border-t border-[#E2E8F0] flex justify-end">
                    <Button
                      type="submit"
                      variant="primary"
                      size="lg"
                      disabled={isSubmitting}
                      icon={<Users className="w-4 h-4" />}
                    >
                      {isSubmitting
                        ? t.common.loading
                        : copy.submitBtn}
                    </Button>
                  </div>
                </form>
              </div>
            )}
          </div>

          {/* Sidebar Column (3 Cols) */}
          <div className="lg:col-span-3 space-y-6">
            {/* Delegation Guidelines */}
            <div className="bg-white rounded-2xl p-6 border border-[#E2E8F0] shadow-xs space-y-4">
              <div className="flex items-center gap-2 border-b border-[#E2E8F0] pb-3">
                <ShieldCheck className="w-5 h-5 text-[#136938]" />
                <h3 className="font-bold text-sm text-[#111827]">{copy.guidelinesTitle}</h3>
              </div>

              <div className="space-y-3.5 text-xs text-[#475569]">
                {copy.guidelines.map((guideline, index) => (
                  <div key={guideline.title} className="flex items-start gap-3">
                    <span className="w-6 h-6 rounded-full bg-[#FFF7ED] text-[#E35914] font-bold flex items-center justify-center shrink-0 font-label">
                      {language === 'en' ? index + 1 : ['१', '२', '३'][index]}
                    </span>
                    <div>
                      <span className="font-semibold text-[#111827] block">{guideline.title}</span>
                      <span>{guideline.description}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Leadership Liaison Secretariat */}
            <div className="bg-white rounded-2xl p-6 border border-[#E2E8F0] shadow-xs space-y-4">
              <div className="flex items-center gap-2 border-b border-[#E2E8F0] pb-3">
                <Building className="w-5 h-5 text-[#E35914]" />
                <h3 className="font-bold text-sm text-[#111827]">{copy.liaisonTitle}</h3>
              </div>

              <p className="text-xs text-[#64748B] leading-relaxed">{copy.liaisonDescription}</p>

              <div className="rounded-xl border border-[#FEF3C7] bg-[#FFFBEB] p-3 text-xs text-[#78350F]">{copy.reviewTimeline}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
