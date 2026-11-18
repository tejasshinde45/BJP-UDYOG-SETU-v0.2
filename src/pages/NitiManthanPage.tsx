import React, { useState } from 'react';
import { useLanguage } from '../hooks/useLanguage';
import { useDemoData } from '../hooks/useDemoData';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { Input } from '../components/ui/Input';
import { PageHeader } from '../components/ui/PageHeader';
import {
  Calendar,
  MapPin,
  Clock,
  Users,
  CheckCircle2,
  X,
  BookOpen,
} from 'lucide-react';
import type { EventItem } from '../types';
import { triggerConfetti } from '../components/animations/Confetti';

export const NitiManthanPage: React.FC = () => {
  const { language, t } = useLanguage();
  const { events, addEventRegistration } = useDemoData();

  // Filter niti manthan events
  const nitiEvents = events.filter((e) => e.category === 'niti');

  const [selectedProgram, setSelectedProgram] = useState<EventItem | null>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);

  // Form states
  const [formData, setFormData] = useState({
    businessName: '',
    participantName: '',
    designation: '',
    sector: '',
    district: 'मुंबई',
    email: '',
    phone: '',
    policyTopic: 'MSME ऊर्जा सवलत व हरित तंत्रज्ञान',
    proposalSummary: '',
  });

  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedRef, setSubmittedRef] = useState<string | null>(null);

  const policyTopicsMap = {
    mr: [
      'MSME ऊर्जा सवलत व हरित तंत्रज्ञान (Green Power & ESG)',
      'औद्योगिक परवानग्यांचे सुसूत्रीकरण (Single Window Ease of Doing Business)',
      'क्लस्टर पायाभूत सुविधा व निर्यात प्रोत्साहन (Cluster Export Corridors)',
      'औद्योगिक कामगार कौशल्य व तंत्रज्ञान सहकार्य (Workforce & Technology Link)',
      'इतर धोरणात्मक प्रस्ताव (Other Policy Recommendations)',
    ],
    hi: [
      'MSME विद्युत रियायत एवं हरित प्रौद्योगिकी (Green Power & ESG)',
      'औद्योगिक अनुमतियों का सरलीकरण (Single Window Ease of Doing Business)',
      'क्लस्टर बुनियादी ढांचा एवं निर्यात संवर्धन (Cluster Export Corridors)',
      'औद्योगिक श्रमिक कौशल एवं प्रौद्योगिकी सहभागिता (Workforce & Technology Link)',
      'अन्य नीतिगत प्रस्ताव (Other Policy Recommendations)',
    ],
    en: [
      'MSME Power Concessions & Green Technology (Green Power & ESG)',
      'Simplification of Industrial Approvals (Single Window Ease of Doing Business)',
      'Cluster Infrastructure & Export Promotion (Cluster Export Corridors)',
      'Workforce Skills & Industry-Academia Linkages (Workforce & Technology Link)',
      'Other Policy Recommendations',
    ],
  };

  const policyTopics = policyTopicsMap[language];

  const validate = () => {
    const errors: Record<string, string> = {};
    if (!formData.businessName.trim()) errors.businessName = t.common.requiredField;
    if (!formData.participantName.trim()) errors.participantName = t.common.requiredField;
    if (!formData.designation.trim()) errors.designation = t.common.requiredField;
    if (!formData.sector.trim()) errors.sector = t.common.requiredField;
    if (!formData.email.trim()) {
      errors.email = t.common.requiredField;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = t.common.invalidEmail;
    }
    if (!formData.phone.trim()) {
      errors.phone = t.common.requiredField;
    } else if (!/^[0-9]{10}$/.test(formData.phone.replace(/[^0-9]/g, ''))) {
      errors.phone = t.common.invalidPhone;
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    setTimeout(() => {
      const regRecord = addEventRegistration({
        eventId: selectedProgram?.id,
        eventTitle: selectedProgram?.titleMr || 'नीती मंथन धोरण गोलमेज परिषद',
        eventType: 'niti',
        participantName: formData.participantName,
        businessName: formData.businessName,
        designation: formData.designation,
        sector: formData.sector,
        district: formData.district,
        email: formData.email,
        phone: formData.phone,
        policyTopic: formData.policyTopic,
        customQuestionsOrNotes: formData.proposalSummary,
      });

      setIsSubmitting(false);
      setSubmittedRef(regRecord.referenceId);
      triggerConfetti();
    }, 700);
  };

  const handleOpenDetails = (prog: EventItem) => {
    setSelectedProgram(prog);
    setIsDetailModalOpen(true);
  };

  const handleOpenRegisterFromDetails = (prog: EventItem) => {
    setSelectedProgram(prog);
    setIsDetailModalOpen(false);
    setIsRegisterModalOpen(true);
    setSubmittedRef(null);
    setFormErrors({});
  };

  return (
    <div className="bg-[#F8FAFC] min-h-screen py-8 font-devanagari text-[#111827]">
      <div className="w-full max-w-[1560px] mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <Breadcrumbs items={[{ label: t.nav.nitiManthan }]} />

        {/* Header Hero Section */}
        <PageHeader
          category={language === 'mr' ? 'धोरण सहभाग व विचारमंथन' : language === 'hi' ? 'नीति सहभागिता एवं विचारमंथन' : 'Policy Dialogue & Recommendations'}
          categoryIcon={<BookOpen className="h-3.5 w-3.5" />}
          title={language === 'mr' ? 'नीती मंथन — औद्योगिक धोरण उपक्रम' : language === 'hi' ? 'नीति मंथन — औद्योगिक नीति पहल' : 'Niti Manthan — Policy Initiatives'}
          description={
            language === 'mr'
              ? 'उद्योग धोरण, नियामक सुधारणा आणि स्थानिक क्लस्टर विकासासाठी उद्योजकांच्या सूचना व धोरणात्मक प्रस्ताव नोंदवण्याचे व्यासपीठ.'
              : language === 'hi'
                ? 'औद्योगिक नीति, नियामक सुधार और स्थानीय क्लस्टर विकास के लिए उद्यमियों के सुझाव और नीतिगत प्रस्ताव दर्ज करने का मंच।'
                : 'A collaborative forum for recording industry policy recommendations, regulatory feedback and cluster development priorities.'
          }
        />

        {/* Policy Pillars Highlight */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-xl border border-[#E2E8F0] shadow-2xs space-y-2">
            <div className="w-10 h-10 rounded-lg bg-[#FFF7ED] text-[#E35914] flex items-center justify-center font-bold">
              ०१
            </div>
            <h3 className="font-bold text-base text-[#111827]">
              {language === 'mr' ? 'उद्योग सूचना व शिफारशी' : language === 'hi' ? 'उद्योग सुझाव एवं अनुशंसाएं' : 'Industry Recommendations'}
            </h3>
            <p className="text-xs text-[#64748B] leading-relaxed">
              {language === 'mr'
                ? 'उद्योग प्रक्रिया, पायाभूत सुविधा किंवा अनुपालनातील सुधारणांसाठी आपल्या सूचना नोंदवा.'
                : language === 'hi'
                  ? 'औद्योगिक प्रक्रिया, बुनियादी ढांचे या अनुपालन सुधार के लिए अपने सुझाव दर्ज करें।'
                  : 'Submit constructive suggestions on industrial processes, single-window ease and infrastructure.'}
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl border border-[#E2E8F0] shadow-2xs space-y-2">
            <div className="w-10 h-10 rounded-lg bg-[#F0FDF4] text-[#136938] flex items-center justify-center font-bold">
              ०२
            </div>
            <h3 className="font-bold text-base text-[#111827]">
              {language === 'mr' ? 'गोलमेज चर्चेचे विषय' : language === 'hi' ? 'गोलमेज चर्चा के विषय' : 'Roundtable Agenda'}
            </h3>
            <p className="text-xs text-[#64748B] leading-relaxed">
              {language === 'mr'
                ? 'आगामी धोरणात्मक चर्चा व परिसंवादांसाठी प्रमुख विषय व संदर्भ तयार करा.'
                : language === 'hi'
                  ? 'आगामी नीतिगत चर्चा और गोलमेज सम्मेलनों के लिए प्राथमिक विषय तैयार करें।'
                  : 'Prepare priority agenda items and sectoral briefs for upcoming industry roundtables.'}
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl border border-[#E2E8F0] shadow-2xs space-y-2">
            <div className="w-10 h-10 rounded-lg bg-[#FFFBEB] text-[#B45309] flex items-center justify-center font-bold">
              ०३
            </div>
            <h3 className="font-bold text-base text-[#111827]">
              {language === 'mr' ? 'धोरण मसुदा व समन्वय' : language === 'hi' ? 'नीति मसौदा एवं समन्वय' : 'Policy Synthesis'}
            </h3>
            <p className="text-xs text-[#64748B] leading-relaxed">
              {language === 'mr'
                ? 'उद्योजकांच्या प्रतिनिधी मंडळांद्वारे प्राप्त सूचनांचे संकलन करून धोरणात्मक समन्वय साधला जातो.'
                : language === 'hi'
                  ? 'उद्यमियों के सुझावों का संकलन कर नीतिगत समन्वय के लिए प्रारूप तैयार किया जाता है।'
                  : 'Synthesizing stakeholder representations into structured policy briefs for coordinated dialogue.'}
            </p>
          </div>
        </div>

        {/* Niti Programmes Grid */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-[#111827]">
              {language === 'mr' ? 'नियोजित नीती मंथन सत्रे' : language === 'hi' ? 'नियोजित नीति मंथन सत्र' : 'Scheduled Policy Sessions'}
            </h2>
            <span className="text-xs text-[#64748B]">
              {nitiEvents.length} {language === 'mr' ? 'सत्रे उपलब्ध' : language === 'hi' ? 'सत्र उपलब्ध' : 'sessions available'}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {nitiEvents.map((prog) => {
              const title = language === 'mr' ? prog.titleMr : language === 'hi' ? prog.titleHi : prog.titleEn;
              const location = language === 'mr' ? prog.locationMr : language === 'hi' ? prog.locationHi : prog.locationEn;
              const desc = language === 'mr' ? prog.descriptionMr : language === 'hi' ? prog.descriptionHi : prog.descriptionEn;
              const category = language === 'mr' ? prog.categoryMr : language === 'hi' ? (prog.categoryHi || prog.categoryMr) : prog.categoryEn;

              return (
                <div
                  key={prog.id}
                  className="bg-white rounded-xl border border-[#E2E8F0] shadow-2xs hover:shadow-md transition p-6 flex flex-col justify-between"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <Badge variant="tertiary">{category}</Badge>
                      <span className="text-[11px] font-label text-[#92400E] bg-[#FEF3C7] px-2 py-0.5 rounded uppercase font-medium">
                        {language === 'mr' ? 'धोरण गोलमेज' : language === 'hi' ? 'नीति गोलमेज' : 'Policy Conclave'}
                      </span>
                    </div>

                    <div>
                      <h3 className="text-lg font-bold text-[#111827] leading-snug">
                        {title}
                      </h3>
                      <p className="text-xs text-[#475569] mt-2 leading-relaxed">
                        {desc}
                      </p>
                    </div>

                    <div className="space-y-2 pt-2 text-xs text-[#475569] bg-[#F8FAFC] p-3.5 rounded-lg border border-[#E2E8F0]">
                      <div className="flex items-center gap-2.5">
                        <Calendar className="w-4 h-4 text-[#136938]" />
                        <span className="font-semibold text-[#111827]">{prog.date}</span>
                      </div>
                      {prog.time && (
                        <div className="flex items-center gap-2.5">
                          <Clock className="w-4 h-4 text-[#F59E0B]" />
                          <span>{prog.time}</span>
                        </div>
                      )}
                      <div className="flex items-start gap-2.5">
                        <MapPin className="w-4 h-4 text-[#E35914] shrink-0 mt-0.5" />
                        <span>{location}</span>
                      </div>
                      {prog.capacity && (
                        <div className="flex items-center gap-2.5">
                          <Users className="w-4 h-4 text-[#64748B]" />
                          <span>
                            {language === 'mr'
                              ? `प्रतिनिधी क्षमता: ${prog.capacity} (${prog.registeredCount || 0} नोंदणीकृत)`
                              : language === 'hi'
                              ? `प्रतिनिधि क्षमता: ${prog.capacity} (${prog.registeredCount || 0} पंजीकृत)`
                              : `Delegates: ${prog.capacity} max (${prog.registeredCount || 0} registered)`}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="pt-6 mt-6 border-t border-[#E2E8F0] flex items-center justify-between gap-3">
                    <Button
                      variant="outlined"
                      size="sm"
                      onClick={() => handleOpenDetails(prog)}
                    >
                      {t.common.details}
                    </Button>
                    <Button
                      variant="primary"
                      size="sm"
                      onClick={() => handleOpenRegisterFromDetails(prog)}
                    >
                      {language === 'mr' ? 'मंथनात सहभागी व्हा' : language === 'hi' ? 'मंथन में भाग लें' : 'Join Roundtable'}
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Detail Modal */}
      {isDetailModalOpen && selectedProgram && (
        <div className="fixed inset-0 z-50 bg-[#111827]/50 backdrop-blur-xs flex items-center justify-center p-4 modal-scroll-lock" data-lenis-prevent>
          <div className="bg-white rounded-2xl max-w-2xl w-full border border-[#E2E8F0] shadow-xl p-6 sm:p-8 relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setIsDetailModalOpen(false)}
              className="absolute top-4 right-4 p-2 text-[#94A3B8] hover:text-[#111827] rounded-lg cursor-pointer"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-4">
              <Badge variant="tertiary">
                {language === 'mr' ? selectedProgram.categoryMr : language === 'hi' ? (selectedProgram.categoryHi || selectedProgram.categoryMr) : selectedProgram.categoryEn}
              </Badge>
              <h3 className="text-xl sm:text-2xl font-bold text-[#111827]">
                {language === 'mr' ? selectedProgram.titleMr : language === 'hi' ? selectedProgram.titleHi : selectedProgram.titleEn}
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs bg-[#F8FAFC] p-3.5 rounded-xl border border-[#E2E8F0]">
                <div>
                  <span className="text-[#64748B] block">{t.common.date}:</span>
                  <span className="font-bold text-[#111827]">{selectedProgram.date}</span>
                </div>
                <div>
                  <span className="text-[#64748B] block">{t.common.location}:</span>
                  <span className="font-bold text-[#111827]">
                    {language === 'mr' ? selectedProgram.locationMr : language === 'hi' ? selectedProgram.locationHi : selectedProgram.locationEn}
                  </span>
                </div>
              </div>

              <div>
                <h4 className="text-xs font-bold text-[#111827] uppercase tracking-wider mb-1 font-label">
                  {language === 'mr' ? 'सत्राचे धोरणात्मक उद्दिष्ट:' : language === 'hi' ? 'सत्र का नीतिगत उद्देश्य:' : 'Session Objectives:'}
                </h4>
                <p className="text-xs text-[#475569] leading-relaxed">
                  {language === 'mr' ? selectedProgram.descriptionMr : language === 'hi' ? selectedProgram.descriptionHi : selectedProgram.descriptionEn}
                </p>
              </div>

              {selectedProgram.agenda && (
                <div>
                  <h4 className="text-xs font-bold text-[#111827] uppercase tracking-wider mb-2 font-label">
                    {language === 'mr' ? 'चर्चा रूपरेषा (Agenda):' : language === 'hi' ? 'चर्चा कार्यसूची (Agenda):' : 'Discussion Agenda:'}
                  </h4>
                  <ul className="space-y-2 text-xs text-[#334155]">
                    {selectedProgram.agenda.map((ag, idx) => (
                      <li key={idx} className="flex items-start gap-2 bg-[#F1F5F9] p-2.5 rounded-lg">
                        <Clock className="w-3.5 h-3.5 text-[#E35914] shrink-0 mt-0.5" />
                        <span>{ag}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="bg-[#F0FDF4] p-3 rounded-xl border border-[#DCFCE7] text-xs text-[#136938]">
                {language === 'mr' ? 'सूचनांचे संकलन उद्योग सेतू मंचावर धोरणात्मक समन्वयासाठी सुरक्षित केले जाते.' : language === 'hi' ? 'सुझावों का संकलन उद्योग सेतु मंच पर नीतिगत समन्वय के लिए सुरक्षित किया जाता है।' : 'Policy proposals are preserved for platform stakeholder synthesis.'}
              </div>

              <div className="pt-4 flex items-center justify-end gap-3 border-t border-[#E2E8F0]">
                <Button variant="secondary" size="md" onClick={() => setIsDetailModalOpen(false)}>
                  {t.common.close}
                </Button>
                <Button variant="primary" size="md" onClick={() => handleOpenRegisterFromDetails(selectedProgram)}>
                  {language === 'mr' ? 'सहभाग अर्ज भरा' : language === 'hi' ? 'सहभागिता फॉर्म भरें' : 'Proceed to Register'}
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Registration Modal */}
      {isRegisterModalOpen && selectedProgram && (
        <div className="fixed inset-0 z-50 bg-[#111827]/50 backdrop-blur-xs flex items-center justify-center p-4 modal-scroll-lock" data-lenis-prevent>
          <div className="bg-white rounded-2xl max-w-lg w-full border border-[#E2E8F0] shadow-xl p-6 sm:p-8 relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setIsRegisterModalOpen(false)}
              className="absolute top-4 right-4 p-2 text-[#94A3B8] hover:text-[#111827] rounded-lg cursor-pointer"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>

            {submittedRef ? (
              <div className="text-center py-6 space-y-4">
                <div className="w-16 h-16 rounded-full bg-[#F0FDF4] text-[#136938] flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h3 className="text-xl font-bold text-[#111827]">
                  {language === 'mr' ? 'सहभाग नोंदणी यशस्वीरीत्या जतन झाली' : language === 'hi' ? 'सहभागिता पंजीकरण सफलतापूर्वक सहेजा गया' : 'Participation Entry Saved'}
                </h3>
                <p className="text-xs text-[#64748B]">
                  {language === 'mr'
                    ? 'आपला धोरणात्मक प्रस्ताव उद्योग सेतू समन्वय मंचावर नोंदवला गेला आहे.'
                    : language === 'hi' ? 'आपका नीतिगत प्रस्ताव उद्योग सेतु समन्वय मंच पर दर्ज कर लिया गया है।' : 'Your policy proposal has been recorded on the Udyog Setu platform.'}
                </p>

                <div className="bg-[#FFF7ED] p-4 rounded-xl border border-[#FFEDD5] inline-block my-2">
                  <div className="text-[11px] text-[#9A3412] uppercase font-label font-bold">
                    {t.common.referenceId}
                  </div>
                  <div className="text-xl font-extrabold text-[#E35914] tracking-wider mt-1 font-label">
                    {submittedRef}
                  </div>
                </div>

                <div className="text-[11px] text-[#136938] bg-[#F0FDF4] p-3 rounded-lg border border-[#DCFCE7]">
                  {language === 'mr'
                    ? 'पुढील समन्वय व संवादासाठी आपला संदर्भ क्रमांक जतन ठेवा.'
                    : language === 'hi' ? 'आगामी समन्वय के लिए अपनी संदर्भ संख्या सुरक्षित रखें।' : 'Keep your reference number handy for upcoming session briefings.'}
                </div>

                <div className="pt-2">
                  <Button variant="primary" size="md" onClick={() => setIsRegisterModalOpen(false)}>
                    {t.common.close}
                  </Button>
                </div>
              </div>
            ) : (
              <div>
                <div className="mb-4">
                  <Badge variant="tertiary">
                    {language === 'mr' ? selectedProgram.categoryMr : language === 'hi' ? (selectedProgram.categoryHi || selectedProgram.categoryMr) : selectedProgram.categoryEn}
                  </Badge>
                  <h3 className="text-lg font-bold text-[#111827] mt-2">
                    {language === 'mr' ? selectedProgram.titleMr : language === 'hi' ? selectedProgram.titleHi : selectedProgram.titleEn}
                  </h3>
                  <p className="text-xs text-[#64748B] mt-1">
                    {selectedProgram.date} • {language === 'mr' ? selectedProgram.locationMr : language === 'hi' ? selectedProgram.locationHi : selectedProgram.locationEn}
                  </p>
                </div>

                <form onSubmit={handleRegisterSubmit} className="space-y-3.5">
                  <Input
                    label={language === 'mr' ? 'सहभागी प्रतिनिधीचे पूर्ण नाव' : language === 'hi' ? 'सहभागी प्रतिनिधि का पूरा नाम' : 'Participant Name'}
                    value={formData.participantName}
                    onChange={(e) => setFormData({ ...formData, participantName: e.target.value })}
                    error={formErrors.participantName}
                    placeholder={language === 'mr' ? 'उदा. डॉ. विनायक देशपांडे' : language === 'hi' ? 'उदा. डॉ. विनायक देशपांडे' : 'e.g. Dr. Vinayak Deshpande'}
                    required
                  />

                  <Input
                    label={language === 'mr' ? 'संस्था / कंपनीचे नाव' : language === 'hi' ? 'संस्था / कंपनी का नाम' : 'Enterprise / Association Name'}
                    value={formData.businessName}
                    onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                    error={formErrors.businessName}
                    placeholder={language === 'mr' ? 'उदा. विदर्भ ॲग्रो असोसिएशन' : language === 'hi' ? 'उदा. विदर्भ एग्रो एसोसिएशन' : 'e.g. Vidarbha Agro Association'}
                    required
                  />

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <Input
                      label={t.common.designation}
                      value={formData.designation}
                      onChange={(e) => setFormData({ ...formData, designation: e.target.value })}
                      error={formErrors.designation}
                      placeholder={language === 'mr' ? 'उदा. अर्थ सल्लागार / संचालक' : language === 'hi' ? 'उदा. वित्तीय सलाहकार / निदेशक' : 'e.g. Financial Advisor / Director'}
                      required
                    />

                    <Input
                      label={t.common.sector}
                      value={formData.sector}
                      onChange={(e) => setFormData({ ...formData, sector: e.target.value })}
                      error={formErrors.sector}
                      placeholder={language === 'mr' ? 'उदा. एमएसएमई / ऊर्जा' : language === 'hi' ? 'उदा. एमएसएमई / ऊर्जा' : 'e.g. MSME / Energy'}
                      required
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <Input
                      label={t.common.email}
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      error={formErrors.email}
                      placeholder="vinayak@deshpande.in"
                      required
                    />

                    <Input
                      label={t.common.phone}
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      error={formErrors.phone}
                      placeholder="98XXXXXXXX"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-[#475569] mb-1.5 font-label">
                      {language === 'mr' ? 'संबंधित धोरण विषय (Policy Topic)' : language === 'hi' ? 'संबंधित नीति विषय (Policy Topic)' : 'Relevant Policy Topic'}
                    </label>
                    <select
                      value={formData.policyTopic}
                      onChange={(e) => setFormData({ ...formData, policyTopic: e.target.value })}
                      className="w-full text-xs p-2.5 rounded-lg border border-[#CBD5E1] bg-white font-devanagari focus:outline-none focus:border-[#E35914]"
                    >
                      {policyTopics.map((top, idx) => (
                        <option key={idx} value={top}>
                          {top}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-[#475569] mb-1.5 font-label">
                      {language === 'mr' ? 'धोरणात्मक सूचना किंवा संक्षिप्त प्रस्ताव (पर्यायी)' : language === 'hi' ? 'नीतिगत सुझाव या संक्षिप्त प्रस्ताव (वैकल्पिक)' : 'Proposal Notes (Optional)'}
                    </label>
                    <textarea
                      rows={2}
                      value={formData.proposalSummary}
                      onChange={(e) => setFormData({ ...formData, proposalSummary: e.target.value })}
                      placeholder={language === 'mr' ? 'आपल्या क्षेत्रातील धोरण सुधारणा थोडक्यात नमूद करा...' : language === 'hi' ? 'अपने क्षेत्र में नीति सुधार संक्षेप में बताएं...' : 'Brief notes regarding policy suggestions...'}
                      className="w-full text-xs p-3 rounded-lg border border-[#CBD5E1] focus:outline-none focus:border-[#E35914] bg-white font-devanagari"
                    />
                  </div>

                  <div className="text-[11px] text-[#136938] bg-[#F0FDF4] p-2.5 rounded border border-[#DCFCE7]">
                    {language === 'mr' ? 'सत्राची अंतिम पत्रिका व समन्वय तपशील नोंदवलेल्या अधिकृत संपर्कावर पाठवले जातील.' : language === 'hi' ? 'सत्र की अंतिम कार्यसूची और समन्वय विवरण अधिकृत संपर्क पर भेजे जाएंगे।' : 'Session agenda and briefing papers will be coordinated through registered contact details.'}
                  </div>

                  <div className="pt-2 flex items-center justify-end gap-3">
                    <Button variant="secondary" size="md" type="button" onClick={() => setIsRegisterModalOpen(false)}>
                      {t.common.cancel}
                    </Button>
                    <Button variant="primary" size="md" type="submit" disabled={isSubmitting}>
                      {isSubmitting ? t.common.loading : language === 'mr' ? 'सहभाग निश्चित करा' : language === 'hi' ? 'सहभागिता सुनिश्चित करें' : 'Confirm Participation'}
                    </Button>
                  </div>
                </form>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
