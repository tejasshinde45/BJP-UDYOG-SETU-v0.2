import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../hooks/useLanguage';
import { useDemoData } from '../hooks/useDemoData';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { PageHeader } from '../components/ui/PageHeader';
import {
  FileCheck2,
  CheckCircle2,
  UploadCloud,
  Trash2,
  AlertCircle,
  Copy,
  Check,
  ArrowRight,
  ArrowLeft,
  ShieldCheck,
  FileText,
  ExternalLink,
  Printer,
  Download,
} from 'lucide-react';
import type { GrievanceCategory } from '../types';
import { OFFICIAL_SOURCES } from '../data/industryContent';
import { triggerConfetti } from '../components/animations/Confetti';
import {
  buildInitialLetterFields,
  buildGeneratedLetter,
  getDefaultRecipientKeyForCategory,
} from '../utils/grievanceLetterTemplates';
import type {
  LetterLanguage,
  RecipientAuthorityKey,
  EditableLetterFields,
} from '../utils/grievanceLetterTemplates';
import {
  printApplicationLetter,
} from '../utils/grievancePrintService';
import { GrievanceLetterPreview } from '../components/grievance/GrievanceLetterPreview';
import { GrievanceLetterEditor } from '../components/grievance/GrievanceLetterEditor';
import { GrievanceLetterSummary } from '../components/grievance/GrievanceLetterSummary';

export const GrievancePage: React.FC = () => {
  const { language, t } = useLanguage();
  const { addGrievance } = useDemoData();

  // Wizard Step: 1 = Business, 2 = Grievance, 3 = Documents, 4 = Review & Submit
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3 | 4>(1);

  // Form Fields
  const [businessName, setBusinessName] = useState('');
  const [contactPerson, setContactPerson] = useState('');
  const [designation, setDesignation] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [industryType, setIndustryType] = useState('');
  const [district, setDistrict] = useState('पुणे');
  const [locationArea, setLocationArea] = useState('');

  const [category, setCategory] = useState<GrievanceCategory>('midc_infrastructure');
  const [subject, setSubject] = useState('');
  const [description, setDescription] = useState('');
  const [departmentCategory, setDepartmentCategory] = useState('MIDC स्थापत्य व पायाभूत कक्ष');
  const [incidentPeriod, setIncidentPeriod] = useState('');

  // File Attachments
  const [files, setFiles] = useState<{ name: string; size: number }[]>([]);
  const [fileError, setFileError] = useState<string | null>(null);

  // Consent
  const [consentAcknowledged, setConsentAcknowledged] = useState(false);

  // Validation errors
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedGrievance, setSubmittedGrievance] = useState<{
    referenceId: string;
    businessName: string;
    subject: string;
  } | null>(null);
  const [copied, setCopied] = useState(false);

  // Categories list
  const categoriesList: { key: GrievanceCategory; label: string }[] = [
    { key: 'midc_infrastructure', label: t.categories.midc_infrastructure },
    { key: 'roads_transport', label: t.categories.roads_transport },
    { key: 'electricity_utilities', label: t.categories.electricity_utilities },
    { key: 'permissions_approvals', label: t.categories.permissions_approvals },
    { key: 'industrial_services', label: t.categories.industrial_services },
    { key: 'other', label: t.categories.other },
  ];

  // Consistent reference number generated for this application letter & storage
  const [referenceId, setReferenceId] = useState<string>(() => {
    const randomDigits = Math.floor(1000 + Math.random() * 9000);
    return `DEMO-GRV-${randomDigits}`;
  });

  // Automatic Application Letter Generation States
  const [letterLanguage, setLetterLanguage] = useState<LetterLanguage>(
    language === 'mr' ? 'mr' : 'en'
  );
  const [prevLanguage, setPrevLanguage] = useState(language);
  if (language !== prevLanguage) {
    setPrevLanguage(language);
    setLetterLanguage(language === 'mr' ? 'mr' : 'en');
  }

  const [selectedRecipientKey, setSelectedRecipientKey] = useState<RecipientAuthorityKey>(() =>
    getDefaultRecipientKeyForCategory(category)
  );
  const [editedFields, setEditedFields] = useState<Record<LetterLanguage, EditableLetterFields | null>>({
    mr: null,
    en: null,
  });
  const [isEditingLetter, setIsEditingLetter] = useState(false);
  const [isCustomEdited, setIsCustomEdited] = useState(false);
  const [showRawSummary, setShowRawSummary] = useState(false);

  const handleCategoryChange = (newCat: GrievanceCategory) => {
    setCategory(newCat);
    if (!isCustomEdited) {
      setSelectedRecipientKey(getDefaultRecipientKeyForCategory(newCat));
    }
  };

  const letterFormData = useMemo(
    () => ({
      businessName,
      contactPerson,
      designation,
      email,
      phone,
      district,
      industryType,
      locationArea,
      category,
      subject,
      departmentCategory,
      incidentPeriod,
      description,
      files,
      referenceId,
    }),
    [
      businessName,
      contactPerson,
      designation,
      email,
      phone,
      district,
      industryType,
      locationArea,
      category,
      subject,
      departmentCategory,
      incidentPeriod,
      description,
      files,
      referenceId,
    ]
  );

  const currentLetterFields = useMemo(() => {
    if (editedFields[letterLanguage]) {
      return editedFields[letterLanguage]!;
    }
    return buildInitialLetterFields(letterFormData, letterLanguage, selectedRecipientKey);
  }, [editedFields, letterLanguage, letterFormData, selectedRecipientKey]);

  const currentGeneratedLetter = useMemo(() => {
    return buildGeneratedLetter(letterFormData, currentLetterFields, letterLanguage);
  }, [letterFormData, currentLetterFields, letterLanguage]);

  const handleDownloadPdf = async (targetLang: LetterLanguage) => {
    const targetFields =
      editedFields[targetLang] ||
      buildInitialLetterFields(letterFormData, targetLang, selectedRecipientKey);
    const targetLetter = buildGeneratedLetter(letterFormData, targetFields, targetLang);
    await printApplicationLetter(targetLetter);
  };

  const handlePrintLetter = async () => {
    await printApplicationLetter(currentGeneratedLetter);
  };

  // Maharashtra Industrial Districts
  const districts = [
    'पुणे',
    'छत्रपती संभाजीनगर',
    'नागपूर',
    'नाशिक',
    'ठाणे',
    'नवी मुंबई / रायगड',
    'कोल्हापूर',
    'सोलापूर',
    'अमरावती',
    'सांगली',
    'सातारा',
    'रत्नागिरी',
    'सिंधुदुर्ग',
    'जळगाव',
    'धुळे',
    'नांदेड',
    'चंद्रपूर',
    'पालघर',
  ];

  // Validation
  const validateStep1 = () => {
    const newErrors: Record<string, string> = {};
    if (!businessName.trim()) newErrors.businessName = t.common.requiredField;
    if (!contactPerson.trim()) newErrors.contactPerson = t.common.requiredField;
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
    if (!industryType.trim()) newErrors.industryType = t.common.requiredField;
    if (!locationArea.trim()) newErrors.locationArea = t.common.requiredField;

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep2 = () => {
    const newErrors: Record<string, string> = {};
    if (!subject.trim()) newErrors.subject = t.common.requiredField;
    if (!description.trim()) {
      newErrors.description = t.common.requiredField;
    } else if (description.trim().length < 20) {
      newErrors.description =
        language === 'mr'
          ? 'किमान २० अक्षरांचे सविस्तर वर्णन आवश्यक आहे'
          : language === 'hi'
            ? 'कम से कम २० अक्षरों का विस्तृत विवरण आवश्यक है'
            : 'Minimum 20 characters required';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (currentStep === 1 && validateStep1()) {
      setCurrentStep(2);
      window.scrollTo({ top: 120, behavior: 'smooth' });
    } else if (currentStep === 2 && validateStep2()) {
      setCurrentStep(3);
      window.scrollTo({ top: 120, behavior: 'smooth' });
    } else if (currentStep === 3) {
      setCurrentStep(4);
      window.scrollTo({ top: 120, behavior: 'smooth' });
    }
  };

  const handlePrev = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => (prev - 1) as 1 | 2 | 3 | 4);
      window.scrollTo({ top: 120, behavior: 'smooth' });
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFileError(null);
    if (!e.target.files) return;

    const allowedExtensions = ['pdf', 'doc', 'docx', 'jpg', 'jpeg', 'png', 'zip'];
    const maxSizeBytes = 10 * 1024 * 1024; // 10MB

    const newFiles: { name: string; size: number }[] = [];
    for (let i = 0; i < e.target.files.length; i++) {
      const f = e.target.files[i];
      const ext = f.name.split('.').pop()?.toLowerCase() || '';

      if (!allowedExtensions.includes(ext)) {
        setFileError(
          language === 'mr'
            ? `अवैध फाईल प्रकार (.${ext}). केवळ PDF, Word, JPG, PNG किंवा ZIP फाईल्स अनुमत आहेत.`
            : language === 'hi'
              ? `अमान्य फ़ाइल प्रकार (.${ext})। केवल PDF, Word, JPG, PNG या ZIP फ़ाइलें अनुमत हैं।`
              : `Invalid file type (.${ext}). Only PDF, Word, JPG, PNG or ZIP files allowed.`
        );
        return;
      }
      if (f.size > maxSizeBytes) {
        setFileError(
          language === 'mr'
            ? `फाईल ${f.name} चा आकार १० एमबी पेक्षा जास्त आहे.`
            : language === 'hi'
              ? `फ़ाइल ${f.name} का आकार 10 MB से अधिक है।`
              : `File ${f.name} size exceeds 10MB.`
        );
        return;
      }
      newFiles.push({ name: f.name, size: f.size });
    }

    setFiles((prev) => [...prev, ...newFiles]);
  };

  const removeFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!consentAcknowledged) {
      setErrors({
        consent:
          language === 'mr'
            ? 'कृपया वरील अटी मान्य असल्याचे निश्चित करा'
            : language === 'hi'
              ? 'कृपया घोषणा की पुष्टि करें'
              : 'Please agree to the declaration',
      });
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      const newRec = addGrievance({
        referenceId,
        businessName,
        contactPerson,
        designation,
        email,
        phone,
        industryType,
        district,
        locationArea,
        category,
        subject,
        description,
        departmentCategory,
        incidentPeriod: incidentPeriod || 'सद्यस्थिती (Current)',
        attachments: files,
      });

      setIsSubmitting(false);
      setSubmittedGrievance({
        referenceId: newRec.referenceId,
        businessName: newRec.businessName,
        subject: newRec.subject,
      });
      triggerConfetti();
      window.scrollTo({ top: 100, behavior: 'smooth' });
    }, 600);
  };

  const copyRefId = () => {
    if (submittedGrievance) {
      navigator.clipboard.writeText(submittedGrievance.referenceId);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="bg-[#F8FAFC] min-h-screen py-8 font-devanagari text-[#111827]">
      <div className="w-full max-w-[1560px] mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <Breadcrumbs items={[{ label: t.nav.grievance }]} />

        {/* Hero Header Banner */}
        <PageHeader
          category={language === 'mr' ? 'औद्योगिक अडचण नोंद' : language === 'hi' ? 'औद्योगिक समस्या प्रविष्टि' : 'Industry issue entry'}
          categoryIcon={<FileCheck2 className="h-3.5 w-3.5" />}
          title={language === 'mr' ? 'औद्योगिक तक्रार व अडचण नोंदणी' : language === 'hi' ? 'औद्योगिक शिकायत और समस्या प्रविष्टि' : 'Industrial grievance and issue entry'}
          description={
            language === 'mr'
              ? 'औद्योगिक पायाभूत सुविधा, सेवा किंवा प्रशासकीय अडचणींचे तपशील मार्गदर्शन व निवारणासाठी नोंदवा. वैधानिक तक्रारींसाठी अधिकृत RTS पोर्टल वापरावे.'
              : language === 'hi'
                ? 'औद्योगिक बुनियादी ढांचे, सेवाओं या प्रशासनिक समस्याओं का विवरण मार्गदर्शन के लिए दर्ज करें। वैधानिक शिकायतों के लिए आधिकारिक RTS पोर्टल का उपयोग करें।'
                : 'Record an industrial infrastructure, service or administrative issue for guidance. For statutory appeals, please use the official RTS portal.'
          }
          actions={
            <div className="hidden lg:block max-w-xs rounded-xl border border-emerald-200/80 bg-emerald-50/70 p-4 text-xs leading-relaxed text-[#136938] shadow-2xs">
              {language === 'mr'
                ? 'माहिती व मार्गदर्शन — वैधानिक तक्रारींसाठी अधिकृत शासकीय पोर्टल वापरावे.'
                : language === 'hi'
                  ? 'सूचना एवं मार्गदर्शन — वैधानिक शिकायतों के लिए आधिकारिक सरकारी पोर्टल का उपयोग करें।'
                  : 'Information and guidance — statutory grievances must be filed via official portals.'}
            </div>
          }
        />

        {/* 2-Column Master Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Main Column (8 Cols) */}
          <div className="lg:col-span-8 space-y-6">
            {submittedGrievance ? (
              /* Success Confirmation Card */
              <div className="bg-white rounded-2xl p-8 border border-[#DCFCE7] shadow-sm text-center space-y-6 relative overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-1.5 bg-[#136938]" />

                <div className="w-16 h-16 rounded-full bg-[#F0FDF4] text-[#136938] flex items-center justify-center mx-auto ring-4 ring-[#DCFCE7]">
                  <CheckCircle2 className="w-10 h-10" />
                </div>

                <div className="space-y-2">
                  <h2 className="text-2xl font-bold text-[#111827]">
                    {language === 'mr' ? 'तक्रार नोंद सुरक्षित जतन झाली' : language === 'hi' ? 'शिकायत प्रविष्टि सुरक्षित सहेजी गई' : 'Grievance reference recorded'}
                  </h2>
                  <p className="text-xs sm:text-sm text-[#475569] max-w-lg mx-auto">
                    {language === 'mr'
                      ? 'ही नोंद उद्योग सेतू मंचावर जतन झाली आहे. सद्यस्थिती आणि पाठपुराव्यासाठी संदर्भ क्रमांक वापरा:'
                      : language === 'hi' ? 'यह प्रविष्टि उद्योग सेतु मंच पर सहेज ली गई है। स्थिति और अनुवर्ती जानकारी के लिए संदर्भ संख्या का उपयोग करें:' : 'This entry is safely recorded. Use the reference number below to track details:'}
                  </p>
                </div>

                {/* Reference Badge */}
                <div className="bg-[#FFF7ED] border-2 border-dashed border-[#E35914] rounded-2xl p-6 max-w-md mx-auto space-y-2">
                  <span className="text-xs font-bold text-[#9A3412] uppercase font-label">
                    {t.common.referenceId}
                  </span>
                  <div className="text-2xl sm:text-3xl font-extrabold text-[#E35914] tracking-wider font-label">
                    {submittedGrievance.referenceId}
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

                {/* Quick Details */}
                <div className="text-xs text-[#475569] bg-[#F8FAFC] p-4 rounded-xl border border-[#E2E8F0] max-w-md mx-auto text-left space-y-2">
                  <div className="flex justify-between border-b border-[#E2E8F0] pb-1.5">
                    <span className="font-semibold text-[#111827]">{t.common.businessName}:</span>
                    <span className="text-right text-[#334155]">{submittedGrievance.businessName}</span>
                  </div>
                  <div className="flex justify-between border-b border-[#E2E8F0] pb-1.5">
                    <span className="font-semibold text-[#111827]">
                      {language === 'mr' ? 'विषय:' : language === 'hi' ? 'विषय:' : 'Subject:'}
                    </span>
                    <span className="text-right text-[#334155] line-clamp-1">{submittedGrievance.subject}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-semibold text-[#111827]">{t.common.status}:</span>
                    <span className="text-[#136938] font-bold bg-[#F0FDF4] px-2 py-0.5 rounded text-[11px]">
                      {language === 'mr'
                        ? 'नोंदणीकृत (Registered)'
                        : language === 'hi'
                          ? 'पंजीकृत (Registered)'
                          : 'Registered'}
                    </span>
                  </div>
                </div>

                {/* Action steps notice */}
                <div className="text-xs text-[#1E3A8A] bg-[#EFF6FF] p-4 rounded-xl border border-[#BFDBFE] max-w-lg mx-auto flex items-start gap-3 text-left">
                  <ShieldCheck className="w-5 h-5 text-[#2563EB] shrink-0 mt-0.5" />
                  <span className="leading-relaxed">
                    {language === 'mr'
                      ? 'ही नोंद उद्योग सेतू मंचावर सुरक्षित जतन होते; अधिकृत शासकीय निवारणासाठी संबंधित विभागाच्या RTS किंवा MAITRI पोर्टलचा वापर करावा.'
                      : language === 'hi'
                        ? 'यह प्रविष्टि उद्योग सेतु मंच पर सुरक्षित सहेजी जाती है; आधिकारिक शासकीय निवारण के लिए संबंधित विभाग के RTS या MAITRI पोर्टल का उपयोग करें।'
                        : 'This record is preserved on Udyog Setu; for statutory grievance redressal, please utilize the official RTS or MAITRI portals.'}
                  </span>
                </div>

                {/* Letter Download Actions on Success Screen */}
                <div className="bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl p-4 max-w-lg mx-auto space-y-2 text-center">
                  <span className="text-xs font-bold text-[#111827] block">
                    {language === 'mr'
                      ? 'तयार केलेले अधिकृत अर्ज पत्र डाउनलोड करा:'
                      : language === 'hi'
                        ? 'तैयार किया गया आधिकारिक आवेदन पत्र डाउनलोड करें:'
                        : 'Download Official Grievance Application Draft:'}
                  </span>
                  <div className="flex flex-wrap items-center justify-center gap-2 pt-1">
                    <Button
                      type="button"
                      variant="primary"
                      size="sm"
                      onClick={() => handleDownloadPdf('mr')}
                      icon={<Download className="w-3.5 h-3.5" />}
                    >
                      मराठी PDF
                    </Button>
                    <Button
                      type="button"
                      variant="secondary"
                      size="sm"
                      onClick={() => handleDownloadPdf('en')}
                      icon={<Download className="w-3.5 h-3.5" />}
                    >
                      English PDF
                    </Button>
                    <Button
                      type="button"
                      variant="outlined"
                      size="sm"
                      onClick={handlePrintLetter}
                      icon={<Printer className="w-3.5 h-3.5" />}
                    >
                      {language === 'mr' ? 'प्रिंट' : 'Print'}
                    </Button>
                  </div>
                </div>

                {/* Next Actions */}
                <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                  <Link to={`/track-complaint?ref=${submittedGrievance.referenceId}`}>
                    <Button variant="primary" size="lg" icon={<ArrowRight className="w-4 h-4" />} iconPosition="right">
                      {language === 'mr'
                        ? 'तक्रारीची सद्यस्थिती तपासा'
                        : language === 'hi'
                          ? 'शिकायत की स्थिति जांचें'
                          : 'Track This Complaint'}
                    </Button>
                  </Link>
                  <Button
                    variant="outlined"
                    size="lg"
                    onClick={() => {
                      setSubmittedGrievance(null);
                      setCurrentStep(1);
                      setSubject('');
                      setDescription('');
                      setFiles([]);
                      setConsentAcknowledged(false);
                      setReferenceId(`DEMO-GRV-${Math.floor(1000 + Math.random() * 9000)}`);
                      setEditedFields({ mr: null, en: null });
                      setIsCustomEdited(false);
                    }}
                  >
                    {language === 'mr'
                      ? 'दुसरी तक्रार नोंदवा'
                      : language === 'hi'
                        ? 'दूसरी शिकायत दर्ज करें'
                        : 'File Another Grievance'}
                  </Button>
                </div>
              </div>
            ) : (
              /* Multi-Step Wizard Form Card */
              <div className="bg-white rounded-2xl border border-[#E2E8F0] shadow-xs overflow-hidden">
                {/* 4-Step Progress Indicator */}
                <div className="bg-[#F8FAFC] border-b border-[#E2E8F0] px-4 py-4 sm:px-8">
                  <div className="grid grid-cols-4 gap-2">
                    {[
                      {
                        num: 1,
                        label:
                          language === 'mr'
                            ? '१. उद्योग तपशील'
                            : language === 'hi'
                              ? '१. उद्योग विवरण'
                              : '1. Enterprise',
                      },
                      {
                        num: 2,
                        label:
                          language === 'mr'
                            ? '२. तक्रार स्वरूप'
                            : language === 'hi'
                              ? '२. शिकायत विवरण'
                              : '2. Grievance',
                      },
                      {
                        num: 3,
                        label:
                          language === 'mr'
                            ? '३. कागदपत्रे'
                            : language === 'hi'
                              ? '३. दस्तावेज'
                              : '3. Documents',
                      },
                      {
                        num: 4,
                        label:
                          language === 'mr'
                            ? '४. पडताळणी'
                            : language === 'hi'
                              ? '४. समीक्षा'
                              : '4. Review',
                      },
                    ].map((s) => {
                      const isActive = currentStep === s.num;
                      const isCompleted = currentStep > s.num;

                      return (
                        <div key={s.num} className="flex flex-col items-center text-center">
                          <div
                            className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition font-label ${
                              isActive
                                ? 'bg-[#E35914] text-white shadow-xs ring-4 ring-[#FFF7ED]'
                                : isCompleted
                                ? 'bg-[#136938] text-white'
                                : 'bg-[#E2E8F0] text-[#64748B]'
                            }`}
                          >
                            {isCompleted ? <Check className="w-4 h-4" /> : s.num}
                          </div>
                          <span
                            className={`text-xs mt-1.5 font-medium font-devanagari ${
                              isActive ? 'text-[#E35914] font-bold' : 'text-[#64748B]'
                            }`}
                          >
                            {s.label}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-6">
                  {/* STEP 1: Enterprise & Contact */}
                  {currentStep === 1 && (
                    <div className="space-y-5 animate-in fade-in">
                      <div className="border-b border-[#E2E8F0] pb-3">
                        <h2 className="text-lg font-bold text-[#111827]">
                          {language === 'mr'
                            ? 'विभाग अ: उद्योजक व उद्योग घटकाचा तपशील'
                            : language === 'hi'
                              ? 'अनुभाग A: उद्यमी एवं उद्योग विवरण'
                              : 'Section A: Enterprise & Contact Details'}
                        </h2>
                        <p className="text-xs text-[#64748B]">
                          {language === 'mr'
                            ? 'आपल्या उद्योगाचे नाव, संपर्क अधिकारी आणि संबंधित क्षेत्राची माहिती भरा.'
                            : language === 'hi'
                              ? 'अपने उद्योग का नाम, संपर्क अधिकारी और संबंधित क्षेत्र का विवरण भरें।'
                              : 'Provide enterprise information, key contact person, and industrial area location.'}
                        </p>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="sm:col-span-2">
                          <Input
                            label={
                              language === 'mr'
                                ? 'उद्योग / आस्थापनेचे पूर्ण नाव *'
                                : language === 'hi'
                                  ? 'उद्योग / प्रतिष्ठान का पूरा नाम *'
                                  : 'Enterprise / Company Name *'
                            }
                            value={businessName}
                            onChange={(e) => setBusinessName(e.target.value)}
                            placeholder={
                              language === 'mr'
                                ? 'उदा. सह्याद्री इंजिनिअरिंग प्रायव्हेट लिमिटेड'
                                : language === 'hi'
                                  ? 'उदा. सह्याद्री इंजीनियरिंग प्राइवेट लिमिटेड'
                                  : 'e.g. Sahyadri Engineering Pvt Ltd'
                            }
                            error={errors.businessName}
                          />
                        </div>

                        <div>
                          <Input
                            label={
                              language === 'mr'
                                ? 'संपर्क व्यक्तीचे पूर्ण नाव *'
                                : language === 'hi'
                                  ? 'संपर्क व्यक्ति का पूरा नाम *'
                                  : 'Contact Person Name *'
                            }
                            value={contactPerson}
                            onChange={(e) => setContactPerson(e.target.value)}
                            placeholder={
                              language === 'mr'
                                ? 'उदा. श्री. संजय देशपांडे'
                                : language === 'hi'
                                  ? 'उदा. श्री संजय देशपांडे'
                                  : 'e.g. Sanjay Deshpande'
                            }
                            error={errors.contactPerson}
                          />
                        </div>

                        <div>
                          <Input
                            label={
                              language === 'mr'
                                ? 'पदनाम *'
                                : language === 'hi'
                                  ? 'पदनाम *'
                                  : 'Designation *'
                            }
                            value={designation}
                            onChange={(e) => setDesignation(e.target.value)}
                            placeholder={
                              language === 'mr'
                                ? 'उदा. व्यवस्थापकीय संचालक / पार्टनर'
                                : language === 'hi'
                                  ? 'उदा. प्रबंध निदेशक / पार्टनर'
                                  : 'e.g. Managing Director'
                            }
                            error={errors.designation}
                          />
                        </div>

                        <div>
                          <Input
                            label={
                              language === 'mr'
                                ? 'ईमेल पत्ता *'
                                : language === 'hi'
                                  ? 'ईमेल पता *'
                                  : 'Business email *'
                            }
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="sanjay@sahyadri-engg.in"
                            error={errors.email}
                          />
                        </div>

                        <div>
                          <Input
                            label={
                              language === 'mr'
                                ? 'मोबाईल क्रमांक *'
                                : language === 'hi'
                                  ? 'मोबाइल नंबर *'
                                  : 'Phone Number (10 digits) *'
                            }
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            placeholder="9822012345"
                            error={errors.phone}
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-semibold text-[#334155] mb-1.5">
                            {language === 'mr'
                              ? 'जिल्हा निवडा *'
                              : language === 'hi'
                                ? 'ज़िला चुनें *'
                                : 'Select District *'}
                          </label>
                          <select
                            value={district}
                            onChange={(e) => setDistrict(e.target.value)}
                            className="w-full px-3.5 py-2.5 rounded-xl border border-[#CBD5E1] bg-white text-xs text-[#111827] focus:outline-none focus:ring-2 focus:ring-[#E35914] focus:border-transparent transition"
                          >
                            {districts.map((d) => (
                              <option key={d} value={d}>
                                {d}
                              </option>
                            ))}
                          </select>
                        </div>

                        <div>
                          <Input
                            label={
                              language === 'mr'
                                ? 'उद्योग क्षेत्र (उदा. ऑटो, केमिकल, टेक्स्टाईल) *'
                                : language === 'hi'
                                  ? 'उद्योग क्षेत्र (उदा. ऑटो, केमिकल, टेक्सटाइल) *'
                                  : 'Industry Sector *'
                            }
                            value={industryType}
                            onChange={(e) => setIndustryType(e.target.value)}
                            placeholder={
                              language === 'mr'
                                ? 'उदा. अचूक अभियांत्रिकी व ऑटो कंपोनंट्स'
                                : language === 'hi'
                                  ? 'उदा. सटीक इंजीनियरिंग एवं ऑटो कंपोनेंट्स'
                                  : 'e.g. Precision Engineering'
                            }
                            error={errors.industryType}
                          />
                        </div>

                        <div className="sm:col-span-2">
                          <Input
                            label={
                              language === 'mr'
                                ? 'औद्योगिक वसाहत / MIDC पत्ता *'
                                : language === 'hi'
                                  ? 'औद्योगिक एस्टेट / MIDC पता *'
                                  : 'Industrial Area / MIDC Location *'
                            }
                            value={locationArea}
                            onChange={(e) => setLocationArea(e.target.value)}
                            placeholder={
                              language === 'mr'
                                ? 'उदा. भोसरी MIDC, ब्लॉक टी, प्लॉट क्र. ४५, पुणे'
                                : language === 'hi'
                                  ? 'उदा. भोसरी MIDC, ब्लॉक टी, प्लॉट क्र. ४५, पुणे'
                                  : 'e.g. Bhosari MIDC, Block T, Plot 45'
                            }
                            error={errors.locationArea}
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* STEP 2: Grievance Details */}
                  {currentStep === 2 && (
                    <div className="space-y-5 animate-in fade-in">
                      <div className="border-b border-[#E2E8F0] pb-3">
                        <h2 className="text-lg font-bold text-[#111827]">
                          {language === 'mr'
                            ? 'विभाग ब: तक्रारीचे स्वरूप व तपशील'
                            : language === 'hi'
                              ? 'अनुभाग B: शिकायत का स्वरूप एवं विवरण'
                              : 'Section B: Grievance Specifics'}
                        </h2>
                        <p className="text-xs text-[#64748B]">
                          {language === 'mr'
                            ? 'आपल्या समस्येचा प्रकार, संबंधित विभाग आणि अडचणीचे सविस्तर वर्णन नोंदवा.'
                            : language === 'hi'
                              ? 'अपनी समस्या का प्रकार, संबंधित विभाग और समस्या का विस्तृत विवरण दर्ज करें।'
                              : 'Select grievance category and provide comprehensive issue description.'}
                        </p>
                      </div>

                      <div className="space-y-4">
                        <div>
                          <label className="block text-xs font-semibold text-[#334155] mb-1.5">
                            {language === 'mr'
                              ? 'तक्रारीचा मुख्य वर्ग निवडा *'
                              : language === 'hi'
                                ? 'शिकायत की मुख्य श्रेणी चुनें *'
                                : 'Grievance Category *'}
                          </label>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                            {categoriesList.map((c) => (
                              <label
                                key={c.key}
                                className={`flex items-start gap-3 p-3 rounded-xl border cursor-pointer text-xs transition ${
                                  category === c.key
                                    ? 'border-[#E35914] bg-[#FFF7ED] font-semibold text-[#111827] shadow-xs'
                                    : 'border-[#E2E8F0] bg-white text-[#475569] hover:bg-[#F8FAFC]'
                                }`}
                              >
                                <input
                                  type="radio"
                                  name="grievanceCategory"
                                  checked={category === c.key}
                                  onChange={() => handleCategoryChange(c.key)}
                                  className="mt-0.5 text-[#E35914] focus:ring-[#E35914]"
                                />
                                <span>{c.label}</span>
                              </label>
                            ))}
                          </div>
                        </div>

                        <div>
                          <Input
                            label={
                              language === 'mr'
                                ? 'तक्रारीचा मुख्य विषय *'
                                : language === 'hi'
                                  ? 'शिकायत का मुख्य विषय *'
                                  : 'Subject of Grievance *'
                            }
                            value={subject}
                            onChange={(e) => setSubject(e.target.value)}
                            placeholder={
                              language === 'mr'
                                ? 'उदा. भोसरी सेक्टर ७ मधील २२ केव्ही मुख्य फिडरचे वारंवार ट्रिपिंग'
                                : language === 'hi'
                                  ? 'उदा. भोसरी सेक्टर ७ में २२ केवी मुख्य फीडर का बार-बार ट्रिप होना'
                                  : 'e.g. 22kV Feeder frequent tripping'
                            }
                            error={errors.subject}
                          />
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-xs font-semibold text-[#334155] mb-1.5">
                              {language === 'mr'
                                ? 'संबंधित शासकीय / MIDC विभाग'
                                : language === 'hi'
                                  ? 'संबंधित सरकारी / MIDC विभाग'
                                  : 'Relevant Department'}
                            </label>
                            <select
                              value={departmentCategory}
                              onChange={(e) => setDepartmentCategory(e.target.value)}
                              className="w-full px-3.5 py-2.5 rounded-xl border border-[#CBD5E1] bg-white text-xs text-[#111827] focus:outline-none focus:ring-2 focus:ring-[#E35914] focus:border-transparent transition"
                            >
                              <option value="MIDC स्थापत्य व रस्ते विभाग">MIDC स्थापत्य व रस्ते विभाग</option>
                              <option value="महावितरण (MSEDCL) औद्योगिक वीज कक्ष">महावितरण (MSEDCL) औद्योगिक वीज कक्ष</option>
                              <option value="महाराष्ट्र प्रदूषण नियंत्रण मंडळ (MPCB)">महाराष्ट्र प्रदूषण नियंत्रण मंडळ (MPCB)</option>
                              <option value="उद्योग संचालनालय (Directorate of Industries)">उद्योग संचालनालय (Directorate of Industries)</option>
                              <option value="औद्योगिक सुरक्षा व आरोग्य संचालनालय (DISH)">औद्योगिक सुरक्षा व आरोग्य संचालनालय (DISH)</option>
                              <option value="स्थानिक महानगरपालिका / नगरपरिषद">स्थानिक महानगरपालिका / नगरपरिषद</option>
                            </select>
                          </div>

                          <div>
                            <Input
                              label={
                                language === 'mr'
                                  ? 'अडचण उद्भवल्याचा अंदाजे कालावधी'
                                  : language === 'hi'
                                    ? 'समस्या शुरू होने की अनुमानित अवधि'
                                    : 'Period / Date of Issue'
                              }
                              value={incidentPeriod}
                              onChange={(e) => setIncidentPeriod(e.target.value)}
                              placeholder={
                                language === 'mr'
                                  ? 'उदा. ऑक्टोबर २०२६ (मागील ३ आठवडे)'
                                  : language === 'hi'
                                    ? 'उदा. अक्टूबर २०२६ (पिछले ३ सप्ताह)'
                                    : 'e.g. Past 3 weeks'
                              }
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-xs font-semibold text-[#334155] mb-1.5">
                            {language === 'mr'
                              ? 'तक्रारीचे सविस्तर वर्णन *'
                              : language === 'hi'
                                ? 'शिकायत का विस्तृत विवरण *'
                                : 'Detailed Description *'}
                          </label>
                          <textarea
                            rows={5}
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder={
                              language === 'mr'
                                ? 'कृपया समस्येचे नेमके स्वरूप, त्यामुळे उत्पादनावर किंवा व्यवसायावर होणारा परिणाम आणि अपेक्षित उपाययोजना सविस्तर लिहा...'
                                : language === 'hi'
                                  ? 'कृपया समस्या का सटीक स्वरूप, उत्पादन या व्यवसाय पर प्रभाव और अपेक्षित समाधान विस्तार से लिखें...'
                                  : 'Describe the exact issue, impact on manufacturing operations, and requested resolution...'
                            }
                            className="w-full px-3.5 py-2.5 rounded-xl border border-[#CBD5E1] text-xs text-[#111827] focus:outline-none focus:ring-2 focus:ring-[#E35914] focus:border-transparent transition resize-y font-devanagari"
                          />
                          {errors.description && (
                            <p className="text-xs text-red-600 mt-1 flex items-center gap-1">
                              <AlertCircle className="w-3.5 h-3.5" />
                              <span>{errors.description}</span>
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* STEP 3: Documents Upload */}
                  {currentStep === 3 && (
                    <div className="space-y-5 animate-in fade-in">
                      <div className="border-b border-[#E2E8F0] pb-3">
                        <h2 className="text-lg font-bold text-[#111827]">
                          {language === 'mr'
                            ? 'विभाग क: पूरक कागदपत्रे व छायाचित्रे'
                            : language === 'hi'
                              ? 'अनुभाग C: सहायक दस्तावेज एवं तस्वीरें'
                              : 'Section C: Supporting Documents'}
                        </h2>
                        <p className="text-xs text-[#64748B]">
                          {language === 'mr'
                            ? 'समस्येचे छायाचित्र, पत्रव्यवहार, वीज बिल, अर्ज पावती किंवा संघटनेचा ठराव जोडा (ऐच्छिक, कमाल १० एमबी).'
                            : language === 'hi'
                              ? 'समस्या की तस्वीर, पत्राचार, बिजली बिल, आवेदन रसीद या संगठन का प्रस्ताव जोड़ें (वैकल्पिक, अधिकतम 10 MB)।'
                              : 'Attach site photographs, correspondence, electricity bills, or receipts (Max 10MB per file).'}
                        </p>
                      </div>

                      <div className="border-2 border-dashed border-[#CBD5E1] hover:border-[#E35914] rounded-2xl p-6 sm:p-8 text-center transition bg-[#F8FAFC]">
                        <UploadCloud className="w-10 h-10 text-[#64748B] mx-auto mb-2" />
                        <label className="cursor-pointer text-xs font-bold text-[#E35914] hover:text-[#C2410C] bg-[#FFF7ED] px-4 py-2 rounded-xl inline-block border border-[#FFEDD5]">
                          <span>
                            {language === 'mr'
                              ? 'कागदपत्रे निवडा (Choose Files)'
                              : language === 'hi'
                                ? 'दस्तावेज चुनें (Choose Files)'
                                : 'Choose Files'}
                          </span>
                          <input
                            type="file"
                            multiple
                            onChange={handleFileUpload}
                            className="hidden"
                            accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,.zip"
                          />
                        </label>
                        <p className="text-[11px] text-[#64748B] mt-2">
                          {language === 'mr'
                            ? 'अनुमत फॉरमॅट: PDF, Word, JPG, PNG, ZIP (कमाल १० MB)'
                            : language === 'hi'
                              ? 'अनुमत प्रारूप: PDF, Word, JPG, PNG, ZIP (अधिकतम 10 MB)'
                              : 'Supported: PDF, Word, JPG, PNG, ZIP (Max 10MB)'}
                        </p>
                      </div>

                      {fileError && (
                        <div className="text-xs text-red-600 bg-red-50 p-3 rounded-xl border border-red-200 flex items-center gap-2">
                          <AlertCircle className="w-4 h-4 shrink-0" />
                          <span>{fileError}</span>
                        </div>
                      )}

                      {files.length > 0 && (
                        <div className="space-y-2">
                          <h4 className="text-xs font-bold text-[#111827]">
                            {language === 'mr'
                              ? 'संलग्न कागदपत्रे:'
                              : language === 'hi'
                                ? 'संलग्न दस्तावेज:'
                                : 'Attached Files:'}
                          </h4>
                          <div className="divide-y divide-[#E2E8F0] border border-[#E2E8F0] rounded-xl bg-white overflow-hidden">
                            {files.map((f, idx) => (
                              <div key={idx} className="p-3 flex items-center justify-between text-xs">
                                <div className="flex items-center gap-2 truncate">
                                  <FileText className="w-4 h-4 text-[#E35914] shrink-0" />
                                  <span className="font-medium text-[#111827] truncate">{f.name}</span>
                                  <span className="text-[#64748B] text-[11px]">
                                    ({(f.size / 1024).toFixed(0)} KB)
                                  </span>
                                </div>
                                <button
                                  type="button"
                                  onClick={() => removeFile(idx)}
                                  className="text-red-500 hover:text-red-700 p-1 cursor-pointer"
                                  title={
                                    language === 'mr'
                                      ? 'काढून टाका'
                                      : language === 'hi'
                                        ? 'हटाएं'
                                        : 'Remove'
                                  }
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  {/* STEP 4: Review, Auto-Generated Application Letter & Actions */}
                  {currentStep === 4 && (
                    <div className="space-y-6 animate-in fade-in">
                      {/* 4A. Summary & Letter Generation Header */}
                      <GrievanceLetterSummary
                        referenceId={referenceId}
                        selectedRecipientKey={selectedRecipientKey}
                        selectedLanguage={letterLanguage}
                        isEditing={isEditingLetter}
                        isCustomEdited={isCustomEdited}
                        onLanguageChange={(newLang) => {
                          setLetterLanguage(newLang);
                        }}
                        onRecipientKeyChange={(newKey) => {
                          setSelectedRecipientKey(newKey);
                          setEditedFields((prev) => ({
                            ...prev,
                            [letterLanguage]: null,
                          }));
                        }}
                        onToggleEdit={() => setIsEditingLetter((prev) => !prev)}
                        onResetDraft={() => {
                          setEditedFields((prev) => ({
                            ...prev,
                            [letterLanguage]: null,
                          }));
                          setIsCustomEdited(false);
                        }}
                      />

                      {/* Collapsible Submitted Form Data Summary */}
                      <div className="bg-[#F8FAFC] rounded-2xl p-4 sm:p-5 border border-[#E2E8F0] space-y-3 text-xs">
                        <div className="flex items-center justify-between border-b border-[#E2E8F0] pb-2.5">
                          <div className="flex items-center gap-2">
                            <FileCheck2 className="w-4 h-4 text-[#136938]" />
                            <h3 className="font-bold text-sm text-[#111827]">
                              {language === 'mr'
                                ? 'नोंदवलेल्या माहितीचा मूळ तपशील (Grievance Form Data)'
                                : language === 'hi'
                                  ? 'दर्ज विवरण की समीक्षा (Grievance Form Data)'
                                  : 'Submitted Grievance Form Data'}
                            </h3>
                          </div>
                          <button
                            type="button"
                            onClick={() => setShowRawSummary((prev) => !prev)}
                            className="text-xs text-[#E35914] hover:text-[#CC4D0E] font-bold cursor-pointer transition"
                          >
                            {showRawSummary
                              ? language === 'mr'
                                ? 'तपशील लपवा ▲'
                                : 'Hide Details ▲'
                              : language === 'mr'
                                ? 'तपशील पहा ▼'
                                : 'View Details ▼'}
                          </button>
                        </div>

                        {showRawSummary && (
                          <div className="space-y-3 pt-1">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pb-3 border-b border-[#E2E8F0]">
                              <div>
                                <span className="text-[#64748B] block">
                                  {language === 'mr' ? 'उद्योग नाव:' : language === 'hi' ? 'उद्योग का नाम:' : 'Enterprise Name:'}
                                </span>
                                <span className="font-bold text-[#111827]">{businessName || '—'}</span>
                              </div>
                              <div>
                                <span className="text-[#64748B] block">
                                  {language === 'mr' ? 'संपर्क व्यक्ती:' : language === 'hi' ? 'संपर्क व्यक्ति:' : 'Contact Person:'}
                                </span>
                                <span className="font-bold text-[#111827]">{contactPerson} ({designation})</span>
                              </div>
                              <div>
                                <span className="text-[#64748B] block">
                                  {language === 'mr' ? 'संपर्क माहिती:' : language === 'hi' ? 'संपर्क विवरण:' : 'Contact Info:'}
                                </span>
                                <span className="font-medium text-[#111827]">{email} | {phone}</span>
                              </div>
                              <div>
                                <span className="text-[#64748B] block">
                                  {language === 'mr' ? 'जिल्हा व स्थान:' : language === 'hi' ? 'ज़िला एवं स्थान:' : 'District & Location:'}
                                </span>
                                <span className="font-medium text-[#111827]">{district} - {locationArea}</span>
                              </div>
                            </div>

                            <div className="space-y-2">
                              <div>
                                <span className="text-[#64748B] block">
                                  {language === 'mr' ? 'तक्रारीचा वर्ग:' : language === 'hi' ? 'शिकायत श्रेणी:' : 'Grievance Category:'}
                                </span>
                                <span className="font-semibold text-[#E35914]">
                                  {categoriesList.find((c) => c.key === category)?.label}
                                </span>
                              </div>
                              <div>
                                <span className="text-[#64748B] block">
                                  {language === 'mr' ? 'मुख्य विषय:' : language === 'hi' ? 'मुख्य विषय:' : 'Subject:'}
                                </span>
                                <span className="font-bold text-[#111827]">{subject}</span>
                              </div>
                              <div>
                                <span className="text-[#64748B] block">
                                  {language === 'mr' ? 'सविस्तर वर्णन:' : language === 'hi' ? 'विस्तृत विवरण:' : 'Description:'}
                                </span>
                                <p className="text-[#334155] whitespace-pre-wrap bg-white p-3 rounded-lg border border-[#E2E8F0] mt-1">
                                  {description}
                                </p>
                              </div>
                              <div>
                                <span className="text-[#64748B] block">
                                  {language === 'mr' ? 'संलग्न फाईल्स:' : language === 'hi' ? 'संलग्न फ़ाइलें:' : 'Attached Files:'}
                                </span>
                                <span className="font-medium text-[#111827]">
                                  {files.length > 0
                                    ? language === 'mr'
                                      ? `${files.length} फाईल्स संलग्न`
                                      : `${files.length} files attached`
                                    : language === 'mr'
                                      ? 'कोणतीही फाईल जोडलेली नाही'
                                      : 'No files attached'}
                                </span>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>

                      {/* 4B & 4C. Document Preview or Editor */}
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <h3 className="font-bold text-sm text-[#111827] flex items-center gap-2">
                            <FileText className="w-4 h-4 text-[#E35914]" />
                            <span>
                              {isEditingLetter
                                ? language === 'mr'
                                  ? 'अर्जाचा मसुदा संपादन (Letter Draft Editor)'
                                  : 'Edit Letter Draft'
                                : language === 'mr'
                                  ? 'तयार केलेला औपचारिक अर्ज (Official Application Preview)'
                                  : 'Official Application Letter Preview'}
                            </span>
                          </h3>
                          <span className="text-xs text-[#64748B] font-medium">
                            {language === 'mr'
                              ? `अर्जाची भाषा: ${letterLanguage === 'mr' ? 'मराठी (देवनागरी)' : 'English (Formal)'}`
                              : `Letter Language: ${letterLanguage === 'mr' ? 'Marathi (Devanagari)' : 'English (Formal)'}`}
                          </span>
                        </div>

                        {isEditingLetter ? (
                          <GrievanceLetterEditor
                            fields={currentLetterFields}
                            language={letterLanguage}
                            onChange={(updated) => {
                              setEditedFields((prev) => ({
                                ...prev,
                                [letterLanguage]: updated,
                              }));
                              setIsCustomEdited(true);
                            }}
                            onReset={() => {
                              setEditedFields((prev) => ({
                                ...prev,
                                [letterLanguage]: null,
                              }));
                              setIsCustomEdited(false);
                            }}
                            onDoneEditing={() => setIsEditingLetter(false)}
                          />
                        ) : (
                          <GrievanceLetterPreview letter={currentGeneratedLetter} />
                        )}
                      </div>

                      {/* Declaration Checkbox */}
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
                              ? 'ही माहिती माझ्या माहितीनुसार खरी आहे. उद्योग सेतू हे स्वतंत्र मार्गदर्शन व्यासपीठ असल्याची आणि वैधानिक तक्रारींसाठी अधिकृत शासकीय पोर्टल वापरण्याची मला जाणीव आहे.'
                              : language === 'hi'
                                ? 'मेरी जानकारी के अनुसार यह विवरण सही है। मुझे ज्ञात है कि उद्योग सेतु स्वतंत्र मार्गदर्शन मंच है और वैधानिक शिकायतों के लिए आधिकारिक सरकारी पोर्टल का उपयोग करना है।'
                                : 'I confirm this information is accurate. I understand that Udyog Setu is an independent guidance initiative and statutory complaints must be filed on official government portals.'}
                          </span>
                        </label>
                        {errors.consent && (
                          <p className="text-xs text-red-600 mt-1">{errors.consent}</p>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Navigation Buttons */}
                  <div className="pt-4 border-t border-[#E2E8F0] flex items-center justify-between gap-3">
                    {currentStep > 1 ? (
                      <Button
                        type="button"
                        variant="secondary"
                        size="md"
                        onClick={handlePrev}
                        icon={<ArrowLeft className="w-4 h-4" />}
                      >
                        {language === 'mr'
                          ? 'मागील पायरी'
                          : language === 'hi'
                            ? 'पिछला चरण'
                            : 'Previous Step'}
                      </Button>
                    ) : (
                      <div />
                    )}

                    {currentStep < 4 ? (
                      <Button
                        type="button"
                        variant="primary"
                        size="md"
                        onClick={handleNext}
                        icon={<ArrowRight className="w-4 h-4" />}
                        iconPosition="right"
                      >
                        {language === 'mr'
                          ? 'पुढील पायरी'
                          : language === 'hi'
                            ? 'अगला चरण'
                            : 'Next Step'}
                      </Button>
                    ) : (
                      <Button
                        type="submit"
                        variant="primary"
                        size="lg"
                        disabled={isSubmitting}
                        icon={<FileCheck2 className="w-4 h-4" />}
                      >
                        {isSubmitting
                          ? t.common.loading
                          : language === 'mr'
                            ? 'तक्रार दाखल व जतन करा (Complete & Save Application)'
                            : language === 'hi'
                              ? 'शिकायत दर्ज व सहेजें (Complete & Save Application)'
                              : 'Complete & Save Application'}
                      </Button>
                    )}
                  </div>
                </form>
              </div>
            )}
          </div>

          {/* Sidebar Column */}
          <div className="lg:col-span-4 space-y-6" data-no-print="true">
            <div className="bg-white rounded-2xl p-6 border border-[#E2E8F0] shadow-xs space-y-4">
              <div className="flex items-center gap-2 border-b border-[#E2E8F0] pb-3">
                <ShieldCheck className="w-5 h-5 text-[#136938]" />
                <h3 className="font-bold text-sm text-[#111827]">
                  {language === 'mr' ? 'नोंद व अधिकृत माहिती स्रोत' : language === 'hi' ? 'प्रविष्टि व आधिकारिक सूचना स्रोत' : 'Record & official information sources'}
                </h3>
              </div>

              <p className="text-sm leading-relaxed text-[#64748B]">
                {language === 'mr'
                  ? 'फॉर्म, संलग्नकांची नावे आणि संदर्भ क्रमांक उद्योग सेतू मंचावर सुरक्षित राहतात. वैधानिक तक्रार निवारण किंवा शासकीय हस्तक्षेपासाठी अधिकृत सरकारी पोर्टलचा वापर करावा.'
                  : language === 'hi'
                    ? 'फ़ॉर्म, संलग्नकों के नाम और संदर्भ संख्या उद्योग सेतु मंच पर सुरक्षित रहते हैं। वैधानिक शिकायत निवारण के लिए आधिकारिक सरकारी पोर्टल का उपयोग करें।'
                    : 'The form details and reference number stay safely preserved. For statutory government grievance redressal, please access the official government portals.'}
              </p>
              <div className="space-y-2 border-t border-[#E2E8F0] pt-4">
                {[OFFICIAL_SOURCES.midc, OFFICIAL_SOURCES.faq, OFFICIAL_SOURCES.rts].map((source) => (
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
