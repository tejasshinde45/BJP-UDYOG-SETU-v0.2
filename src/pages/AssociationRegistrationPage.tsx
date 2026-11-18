import React, { useState } from 'react';
import { useLanguage } from '../hooks/useLanguage';
import { useDemoData } from '../hooks/useDemoData';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { PageHeader } from '../components/ui/PageHeader';
import {
  Building2,
  CheckCircle2,
  Copy,
  Check,
  Send,
  ShieldCheck,
  ExternalLink,
} from 'lucide-react';
import { OFFICIAL_SOURCES } from '../data/industryContent';
import { triggerConfetti } from '../components/animations/Confetti';

export const AssociationRegistrationPage: React.FC = () => {
  const { language, t } = useLanguage();
  const { addAssociation } = useDemoData();

  const [associationName, setAssociationName] = useState('');
  const [associationType, setAssociationType] = useState('MIDC Manufacturers Association');
  const [industrySector, setIndustrySector] = useState('');
  const [district, setDistrict] = useState('पुणे');
  const [operatingRegion, setOperatingRegion] = useState('');

  const [representativeName, setRepresentativeName] = useState('');
  const [designation, setDesignation] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [membershipCount, setMembershipCount] = useState('');
  const [description, setDescription] = useState('');
  const [website, setWebsite] = useState('');
  const [consentAcknowledged, setConsentAcknowledged] = useState(false);

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedRef, setSubmittedRef] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const associationTypes = [
    { value: 'MIDC Manufacturers Association', label: { mr: 'MIDC उत्पादक संघटना', hi: 'MIDC निर्माता संघ', en: 'MIDC manufacturers association' } },
    { value: 'District Chamber of Commerce', label: { mr: 'जिल्हा व्यापारी व औद्योगिक चेंबर', hi: 'जिला वाणिज्य एवं उद्योग मंडल', en: 'District chamber of commerce' } },
    { value: 'Sectoral Industry Guild', label: { mr: 'विशिष्ट उद्योग क्षेत्र महासंघ', hi: 'क्षेत्रीय उद्योग संगठन', en: 'Sectoral industry association' } },
    { value: 'MSME Cooperative Federation', label: { mr: 'MSME सहकारी महासंघ', hi: 'MSME सहकारी महासंघ', en: 'MSME cooperative federation' } },
    { value: 'Export Promotion Cluster', label: { mr: 'निर्यात प्रोत्साहन क्लस्टर संघटना', hi: 'निर्यात प्रोत्साहन क्लस्टर संगठन', en: 'Export promotion cluster association' } },
    { value: 'Other Industry Association', label: { mr: 'इतर औद्योगिक संघटना', hi: 'अन्य औद्योगिक संगठन', en: 'Other industry association' } },
  ];

  const maharashtraDistricts = [
    'पुणे',
    'छत्रपती संभाजीनगर',
    'नागपूर',
    'नाशिक',
    'ठाणे',
    'मुंबई व उपनगर',
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

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!associationName.trim()) newErrors.associationName = t.common.requiredField;
    if (!industrySector.trim()) newErrors.industrySector = t.common.requiredField;
    if (!operatingRegion.trim()) newErrors.operatingRegion = t.common.requiredField;
    if (!representativeName.trim()) newErrors.representativeName = t.common.requiredField;
    if (!designation.trim()) newErrors.designation = t.common.requiredField;
    if (!email.trim()) {
      newErrors.email = t.common.requiredField;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = t.common.invalidEmail;
    }
    if (!phone.trim()) {
      newErrors.phone = t.common.requiredField;
    } else if (!/^\d{10}$/.test(phone.replace(/\D/g, ''))) {
      newErrors.phone = t.common.invalidPhone;
    }
    if (!description.trim()) {
      newErrors.description = t.common.requiredField;
    }
    if (!consentAcknowledged) {
      newErrors.consent = language === 'mr' ? 'कृपया अटी मान्य असल्याचे निश्चित करा' : language === 'hi' ? 'कृपया शर्तों से सहमति दें' : 'Please agree to the terms';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    setTimeout(() => {
      const record = addAssociation({
        associationName,
        associationType,
        industrySector,
        district,
        operatingRegion,
        representativeName,
        designation,
        email,
        phone,
        membershipCount: membershipCount ? parseInt(membershipCount, 10) : undefined,
        description,
        website: website.trim() || undefined,
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

  return (
    <div className="bg-[#F8FAFC] min-h-screen py-8 font-devanagari text-[#111827]">
      <div className="w-full max-w-[1560px] mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <Breadcrumbs items={[{ label: t.nav.associationReg }]} />

        {/* Heading Card */}
        <PageHeader
          category={language === 'mr' ? 'संघटना समन्वय' : language === 'hi' ? 'संगठन समन्वय' : 'ASSOCIATION AFFILIATION'}
          categoryIcon={<Building2 className="h-3.5 w-3.5" />}
          title={language === 'mr' ? 'औद्योगिक संघटना प्रोफाइल नोंदणी' : language === 'hi' ? 'औद्योगिक संगठन प्रोफ़ाइल पंजीकरण' : 'Industry Association Affiliation'}
          description={
            language === 'mr'
              ? 'महाराष्ट्रातील औद्योगिक वसाहती, क्लस्टर्स आणि उत्पादक संघटनांच्या समन्वय व संवादासाठी प्रोफाइल नोंदवा.'
              : language === 'hi'
                ? 'महाराष्ट्र के औद्योगिक क्षेत्रों, क्लस्टरों और निर्माता संगठनों के समन्वय एवं संवाद के लिए प्रोफ़ाइल दर्ज करें।'
                : 'Register your industrial association profile for collective representation and state-level industry dialogue.'
          }
          actions={
            <div className="hidden lg:block max-w-xs rounded-xl border border-emerald-200/80 bg-emerald-50/70 p-4 text-xs leading-relaxed text-[#136938] shadow-2xs">
              {language === 'mr'
                ? 'संघटना समन्वय — माहिती उद्योग सेतू समन्वय मंचावर सुरक्षित ठेवली जाते.'
                : language === 'hi'
                  ? 'संगठन समन्वय — जानकारी उद्योग सेतु समन्वय मंच पर सुरक्षित रखी जाती है।'
                  : 'Association Affiliation — information coordinated on Udyog Setu.'}
            </div>
          }
        />

        {/* 2-Column Master Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Main Column (7 Cols) */}
          <div className="lg:col-span-7 space-y-6">
            {submittedRef ? (
              <div className="bg-white rounded-2xl p-8 border border-[#E2E8F0] shadow-sm text-center space-y-6 relative overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-1.5 bg-[#136938]" />

                <div className="w-16 h-16 rounded-full bg-[#F0FDF4] text-[#136938] flex items-center justify-center mx-auto ring-4 ring-[#DCFCE7]">
                  <CheckCircle2 className="w-10 h-10" />
                </div>

                <div className="space-y-2">
                  <h2 className="text-2xl font-bold text-[#111827]">
                    {language === 'mr' ? 'संघटना नोंदणी यशस्वीरीत्या जतन झाली' : language === 'hi' ? 'संगठन पंजीकरण सफलतापूर्वक सहेजा गया' : 'Association Registration Saved'}
                  </h2>
                  <p className="text-xs sm:text-sm text-[#475569] max-w-lg mx-auto">
                    {language === 'mr'
                      ? 'ही नोंद उद्योग सेतू मंचावर जतन झाली आहे. संघटना पडताळणी व संवादासाठी समन्वय संदर्भ क्रमांक सुरक्षित ठेवा:'
                      : language === 'hi' ? 'यह प्रविष्टि उद्योग सेतु मंच पर सहेज ली गई है। संगठन समन्वय एवं संवाद के लिए संदर्भ संख्या सुरक्षित रखें:' : 'This registration is safely recorded for platform coordination. Keep your reference number handy:'}
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

                {/* Verification Next Steps Notice */}
                <div className="bg-[#F8FAFC] p-4 rounded-xl border border-[#E2E8F0] text-xs text-[#475569] max-w-lg mx-auto space-y-1.5 text-left">
                  <div className="flex items-center gap-2 font-bold text-[#111827]">
                    <ShieldCheck className="w-4 h-4 text-[#136938]" />
                    <span>{language === 'mr' ? 'नोंदणी स्थिती:' : language === 'hi' ? 'पंजीकरण स्थिति:' : 'Status:'}</span>
                  </div>
                  <p className="leading-relaxed text-[11px]">
                    {language === 'mr' ? 'ही माहिती उद्योग सेतू समन्वय मंचावर सुरक्षित साठवली आहे.' : language === 'hi' ? 'यह जानकारी उद्योग सेतु समन्वय मंच पर सुरक्षित रूप से सहेजी गई है।' : 'This information is safely preserved for platform coordination.'}
                  </p>
                </div>

                <div className="flex justify-center pt-2">
                  <Button
                    variant="outlined"
                    size="md"
                    onClick={() => {
                      setSubmittedRef(null);
                      setAssociationName('');
                      setDescription('');
                    }}
                  >
                    {language === 'mr' ? 'दुसरी नोंद करा' : language === 'hi' ? 'एक और प्रविष्टि करें' : 'Add another entry'}
                  </Button>
                </div>
              </div>
            ) : (
              /* Registration Form */
              <div className="bg-white rounded-2xl border border-[#E2E8F0] shadow-xs p-6 sm:p-8 space-y-6">
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Association Basic Details */}
                  <div className="space-y-4">
                    <h3 className="text-xs font-bold text-[#111827] uppercase tracking-wider font-label">
                      {language === 'mr' ? '१. संघटनेची मूलभूत माहिती' : language === 'hi' ? '१. संगठन की मूल जानकारी' : '1. Association information'}
                    </h3>

                    <div className="space-y-4">
                      <div>
                        <Input
                          label={language === 'mr' ? 'औद्योगिक संघटनेचे अधिकृत नाव *' : language === 'hi' ? 'औद्योगिक संगठन का आधिकारिक नाम *' : 'Association full name *'}
                          value={associationName}
                          onChange={(e) => setAssociationName(e.target.value)}
                          placeholder={language === 'mr' ? 'नोंदणी प्रमाणपत्रावरील अधिकृत नाव' : language === 'hi' ? 'पंजीकरण प्रमाणपत्र पर दिया गया आधिकारिक नाम' : 'Official name as shown on the registration certificate'}
                          error={errors.associationName}
                        />
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-semibold text-[#334155] mb-1.5">
                            {language === 'mr' ? 'संघटनेचा प्रकार *' : language === 'hi' ? 'संगठन का प्रकार *' : 'Association type *'}
                          </label>
                          <select
                            value={associationType}
                            onChange={(e) => setAssociationType(e.target.value)}
                            className="w-full px-3.5 py-2.5 rounded-xl border border-[#CBD5E1] bg-white text-xs text-[#111827] focus:outline-none focus:ring-2 focus:ring-[#E35914] focus:border-transparent transition"
                          >
                            {associationTypes.map((item) => (
                              <option key={item.value} value={item.value}>
                                {item.label[language]}
                              </option>
                            ))}
                          </select>
                        </div>

                        <div>
                          <Input
                            label={language === 'mr' ? 'प्रतिनिधित्व करत असलेले उद्योग क्षेत्र *' : language === 'hi' ? 'प्रतिनिधित्व किया जाने वाला उद्योग क्षेत्र *' : 'Core industry sector *'}
                            value={industrySector}
                            onChange={(e) => setIndustrySector(e.target.value)}
                            placeholder={language === 'mr' ? 'उदा. ऑटो, फाउंड्री, केमिकल, एमएसएमई' : language === 'hi' ? 'जैसे ऑटोमोबाइल, फाउंड्री, रसायन, MSME' : 'e.g. automotive, foundry, chemicals'}
                            error={errors.industrySector}
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-semibold text-[#334155] mb-1.5">
                            {language === 'mr' ? 'कार्यक्षेत्राचा जिल्हा *' : language === 'hi' ? 'कार्य क्षेत्र का ज़िला *' : 'Operating district *'}
                          </label>
                          <select
                            value={district}
                            onChange={(e) => setDistrict(e.target.value)}
                            className="w-full px-3.5 py-2.5 rounded-xl border border-[#CBD5E1] bg-white text-xs text-[#111827] focus:outline-none focus:ring-2 focus:ring-[#E35914] focus:border-transparent transition"
                          >
                            {maharashtraDistricts.map((d) => (
                              <option key={d} value={d}>
                                {d}
                              </option>
                            ))}
                          </select>
                        </div>

                        <div>
                          <Input
                            label={language === 'mr' ? 'कार्यक्षेत्र / MIDC पट्टा *' : language === 'hi' ? 'कार्य क्षेत्र / MIDC क्षेत्र *' : 'Operating region / MIDC area *'}
                            value={operatingRegion}
                            onChange={(e) => setOperatingRegion(e.target.value)}
                            placeholder={language === 'mr' ? 'उदा. पिंपरी-चिंचवड आणि भोसरी MIDC' : language === 'hi' ? 'जैसे पिंपरी-चिंचवड और भोसरी MIDC' : 'e.g. Bhosari and Chakan area'}
                            error={errors.operatingRegion}
                          />
                        </div>
                      </div>

                      <div>
                        <Input
                          label={language === 'mr' ? 'अंदाजे सभासद घटक / उद्योगांची संख्या (ऐच्छिक)' : language === 'hi' ? 'अनुमानित सदस्य उद्योगों की संख्या (वैकल्पिक)' : 'Approximate member enterprises (optional)'}
                          type="number"
                          value={membershipCount}
                          onChange={(e) => setMembershipCount(e.target.value)}
                          placeholder={language === 'mr' ? 'उदा. १००' : language === 'hi' ? 'जैसे 100' : 'e.g. 100'}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Office Bearer Details */}
                  <div className="pt-4 border-t border-[#E2E8F0] space-y-4">
                    <h3 className="text-xs font-bold text-[#111827] uppercase tracking-wider font-label">
                      {language === 'mr' ? '२. मुख्य पदाधिकारी / प्रतिनिधी तपशील' : language === 'hi' ? '२. प्रमुख पदाधिकारी / प्रतिनिधि विवरण' : '2. Main office bearer / representative'}
                    </h3>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <Input
                          label={language === 'mr' ? 'पदाधिकाऱ्याचे पूर्ण नाव *' : language === 'hi' ? 'प्रतिनिधि का पूरा नाम *' : 'Representative name *'}
                          value={representativeName}
                          onChange={(e) => setRepresentativeName(e.target.value)}
                          placeholder={language === 'mr' ? 'अधिकृत प्रतिनिधीचे नाव' : language === 'hi' ? 'अधिकृत प्रतिनिधि का नाम' : 'Authorised representative'}
                          error={errors.representativeName}
                        />
                      </div>

                      <div>
                        <Input
                          label={language === 'mr' ? 'संघटना पदनाम (उदा. अध्यक्ष, सचिव) *' : language === 'hi' ? 'संगठन में पद (जैसे अध्यक्ष, सचिव) *' : 'Association designation *'}
                          value={designation}
                          onChange={(e) => setDesignation(e.target.value)}
                          placeholder={language === 'mr' ? 'उदा. अध्यक्ष / मानद सचिव' : language === 'hi' ? 'जैसे अध्यक्ष / मानद सचिव' : 'e.g. President / honorary secretary'}
                          error={errors.designation}
                        />
                      </div>

                      <div>
                        <Input
                          label={language === 'mr' ? 'अधिकृत ईमेल *' : language === 'hi' ? 'आधिकारिक ईमेल *' : 'Official email *'}
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="name@example.org"
                          error={errors.email}
                        />
                      </div>

                      <div>
                        <Input
                          label={language === 'mr' ? 'मोबाईल क्रमांक *' : language === 'hi' ? 'संपर्क मोबाइल नंबर (10 अंक) *' : 'Contact phone (10 digits) *'}
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder={language === 'mr' ? '१० अंकी मोबाईल क्रमांक' : language === 'hi' ? '10 अंकों का मोबाइल नंबर' : '10-digit mobile number'}
                          error={errors.phone}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Profile & Description */}
                  <div className="pt-4 border-t border-[#E2E8F0] space-y-4">
                    <h3 className="text-xs font-bold text-[#111827] uppercase tracking-wider font-label">
                      {language === 'mr' ? '३. संघटनेचा संक्षिप्त परिचय व उद्दिष्टे' : language === 'hi' ? '३. संगठन का परिचय और उद्देश्य' : '3. Overview and objectives'}
                    </h3>

                    <div>
                      <label className="block text-xs font-semibold text-[#334155] mb-1.5">
                        {language === 'mr' ? 'संक्षिप्त माहिती व कार्यक्षेत्र वर्णन *' : language === 'hi' ? 'संक्षिप्त विवरण और कार्य क्षेत्र *' : 'Brief description *'}
                      </label>
                      <textarea
                        rows={3}
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder={language === 'mr' ? 'संघटनेची उद्दिष्टे, प्रतिनिधित्व केलेले उद्योग आणि कार्यक्षेत्र वर्णन करा.' : language === 'hi' ? 'संगठन के उद्देश्य, प्रतिनिधित्व वाले उद्योग और कार्यक्षेत्र बताएं।' : 'Describe the association’s objectives, represented industries and operating area.'}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-[#CBD5E1] text-xs text-[#111827] focus:outline-none focus:ring-2 focus:ring-[#E35914] focus:border-transparent transition resize-y font-devanagari"
                      />
                      {errors.description && (
                        <p className="text-xs text-red-600 mt-1">{errors.description}</p>
                      )}
                    </div>

                    <div>
                      <Input
                        label={language === 'mr' ? 'संघटना संकेतस्थळ / वेबसाईट (ऐच्छिक)' : language === 'hi' ? 'संगठन की वेबसाइट (वैकल्पिक)' : 'Association website (optional)'}
                        value={website}
                        onChange={(e) => setWebsite(e.target.value)}
                        placeholder="https://example.org"
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
                          {language === 'mr'
                            ? 'मी संघटनेतर्फे ही माहिती देण्यास अधिकृत आहे. ही माहिती उद्योग सेतू समन्वय मंचावर सुरक्षित साठवली जाईल.'
                            : language === 'hi'
                              ? 'मैं संगठन की ओर से यह जानकारी देने के लिए अधिकृत हूं। यह जानकारी उद्योग सेतु समन्वय मंच पर सुरक्षित रूप से सहेजी जाएगी।'
                              : 'I am authorised to provide this information for the association. This information is securely preserved on the Udyog Setu platform.'}
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
                      icon={<Send className="w-4 h-4" />}
                      iconPosition="right"
                    >
                      {isSubmitting
                        ? t.common.loading
                        : language === 'mr'
                          ? 'संघटना नोंदणी जतन करा'
                          : language === 'hi'
                            ? 'संगठन पंजीकरण सहेजें'
                            : 'Save registration'}
                    </Button>
                  </div>
                </form>
              </div>
            )}
          </div>

          {/* Sidebar Column */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white rounded-2xl p-6 border border-[#E2E8F0] shadow-xs space-y-4">
              <div className="flex items-center gap-2 border-b border-[#E2E8F0] pb-3">
                <ShieldCheck className="w-5 h-5 text-[#E35914]" />
                <h3 className="font-bold text-sm text-[#111827]">
                  {language === 'mr' ? 'संघटना समन्वय माहिती' : language === 'hi' ? 'संगठन समन्वय जानकारी' : 'About Association Registration'}
                </h3>
              </div>
              <p className="text-sm leading-relaxed text-[#64748B]">
                {language === 'mr'
                  ? 'ही नोंद उद्योग सेतू मंचावर जतन होते. वैधानिक मान्यता व शासकीय संलग्नतेसाठी संबंधित विभागाचे अधिकृत नियम लागू होतात.'
                  : language === 'hi'
                    ? 'यह प्रविष्टि उद्योग सेतु मंच पर सहेजी जाती है। वैधानिक मान्यता और सरकारी संबद्धता के लिए संबंधित विभाग के आधिकारिक नियम लागू होते हैं।'
                    : 'This entry is preserved on Udyog Setu for coordination. Statutory recognition and government affiliation are subject to official departmental rules.'}
              </p>
              <div className="space-y-2 border-t border-[#E2E8F0] pt-4">
                {[OFFICIAL_SOURCES.aboutMidc, OFFICIAL_SOURCES.informationEnablers].map((source) => (
                  <a key={source.href} href={source.href} target="_blank" rel="noreferrer" className="flex items-center justify-between gap-3 rounded-lg border border-[#E2E8F0] px-3 py-2 text-xs font-medium text-[#136938] hover:bg-[#F0FDF4]">
                    <span>{source.label[language]}</span><ExternalLink className="h-3.5 w-3.5 shrink-0" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
