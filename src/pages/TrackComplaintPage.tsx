import React, { useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { useLanguage } from '../hooks/useLanguage';
import { useDemoData } from '../hooks/useDemoData';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { Input } from '../components/ui/Input';
import { PageHeader } from '../components/ui/PageHeader';
import {
  Search,
  FileCheck2,
  Send,
  CheckCircle2,
  AlertCircle,
  FileText,
  Clock,
  ShieldCheck,
  ExternalLink,
  Building2,
  MapPin,
  Layers,
  CalendarDays,
  UserRound,
  Wrench,
  MessageSquare,
} from 'lucide-react';
import { triggerConfetti } from '../components/animations/Confetti';
import type { GrievanceRecord, GrievanceStatus, TimelineEvent } from '../types';
import { OFFICIAL_SOURCES } from '../data/industryContent';

const getTimelineEventIcon = (event: TimelineEvent) => {
  const title = event.title.toLowerCase();
  if (title.includes('पाठपुरावा') || title.includes('follow-up') || title.includes('follow up')) {
    return Send;
  }

  switch (event.status) {
    case 'Submitted':
      return FileText;
    case 'Under Review':
      return Search;
    case 'Assigned':
      return UserRound;
    case 'Action in Progress':
      return Wrench;
    case 'Awaiting Information':
      return MessageSquare;
    case 'Resolved':
      return CheckCircle2;
    default:
      return FileText;
  }
};

export const TrackComplaintPage: React.FC = () => {
  const { language, t } = useLanguage();
  const { getGrievanceByRef, addFollowUp } = useDemoData();
  const [searchParams, setSearchParams] = useSearchParams();

  const refFromUrl = searchParams.get('ref') || '';
  const initialRef = refFromUrl || 'DEMO-GRV-1001';

  const [searchRef, setSearchRef] = useState(initialRef);
  const [currentRecord, setCurrentRecord] = useState<GrievanceRecord | undefined>(() =>
    getGrievanceByRef(initialRef)
  );
  const [searched, setSearched] = useState(true);
  const [prevUrlRef, setPrevUrlRef] = useState(refFromUrl);

  // Follow-up form
  const [followUpComment, setFollowUpComment] = useState('');
  const [followUpAuthor, setFollowUpAuthor] = useState('');
  const [followUpError, setFollowUpError] = useState<string | null>(null);
  const [isSubmittingFollowUp, setIsSubmittingFollowUp] = useState(false);
  const [followUpSuccess, setFollowUpSuccess] = useState<string | null>(null);



  // Sync state during render if URL query changes
  if (refFromUrl !== prevUrlRef) {
    setPrevUrlRef(refFromUrl);
    setSearchRef(refFromUrl);
    setCurrentRecord(getGrievanceByRef(refFromUrl));
    setSearched(true);
  }

  const handleSearch = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!searchRef.trim()) return;

    const trimmed = searchRef.trim();
    setSearchParams({ ref: trimmed });
    const found = getGrievanceByRef(trimmed);
    setCurrentRecord(found);
    setSearched(true);
    setFollowUpError(null);
    setFollowUpSuccess(null);
  };



  const handleFollowUpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentRecord) return;

    if (!followUpComment.trim()) {
      setFollowUpError(
        language === 'mr'
          ? 'कृपया पाठपुराव्याची टिप्पणी लिहा'
          : language === 'hi'
            ? 'कृपया अनुवर्ती टिप्पणी लिखें'
            : 'Please enter follow-up comments'
      );
      return;
    }

    setIsSubmittingFollowUp(true);
    setFollowUpError(null);

    setTimeout(() => {
      const authorName =
        followUpAuthor.trim() ||
        currentRecord.contactPerson ||
        (language === 'mr'
          ? 'तक्रारदार उद्योजक'
          : language === 'hi'
            ? 'शिकायतकर्ता उद्यमी'
            : 'Complainant');
      const result = addFollowUp(currentRecord.referenceId, followUpComment, authorName);

      setIsSubmittingFollowUp(false);
      if (result.success) {
        setFollowUpSuccess(
          language === 'mr'
            ? `पाठपुरावा #${result.followUpNumber} सुरक्षित नोंदवला गेला.`
            : language === 'hi'
              ? `अनुवर्ती #${result.followUpNumber} सुरक्षित दर्ज हुआ।`
              : `Follow-up #${result.followUpNumber} has been recorded.`
        );
        triggerConfetti();
        setFollowUpComment('');
        setFollowUpAuthor('');
        // Refresh local view
        const updated = getGrievanceByRef(currentRecord.referenceId);
        setCurrentRecord(updated);
      } else {
        setFollowUpError(
          result.error ||
            (language === 'mr'
              ? 'पाठपुरावा नोंदवण्यात त्रुटी आली'
              : language === 'hi'
                ? 'अनुवर्ती दर्ज करने में त्रुटि आई'
                : 'Failed to record follow-up')
        );
      }
    }, 500);
  };

  const renderStatusBadge = (status: GrievanceStatus) => {
    switch (status) {
      case 'Submitted':
        return <Badge variant="warning">{t.statuses.Submitted}</Badge>;
      case 'Under Review':
        return <Badge variant="info">{t.statuses['Under Review']}</Badge>;
      case 'Assigned':
        return <Badge variant="primary">{t.statuses.Assigned}</Badge>;
      case 'Action in Progress':
        return <Badge variant="warning">{t.statuses['Action in Progress']}</Badge>;
      case 'Awaiting Information':
        return <Badge variant="danger">{t.statuses['Awaiting Information']}</Badge>;
      case 'Resolved':
        return <Badge variant="success">{t.statuses.Resolved}</Badge>;
      default:
        return <Badge variant="neutral">{status}</Badge>;
    }
  };

  const formatDate = (isoString?: string) => {
    if (!isoString)
      return language === 'mr'
        ? 'उपलब्ध नाही'
        : language === 'hi'
          ? 'उपलब्ध नहीं'
          : 'Not available';
    try {
      const d = new Date(isoString);
      return d.toLocaleDateString(language === 'mr' ? 'mr-IN' : language === 'hi' ? 'hi-IN' : 'en-IN', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      });
    } catch {
      return isoString;
    }
  };

  return (
    <div className="bg-[#F8FAFC] min-h-screen py-8 font-devanagari text-[#111827]">
      <div className="w-full max-w-[1560px] mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <Breadcrumbs items={[{ label: t.nav.trackComplaint }]} />

        {/* Heading & Search Bar */}
        <PageHeader
          category={language === 'mr' ? 'तक्रार स्थिती व पाठपुरावा' : language === 'hi' ? 'शिकायत स्थिति एवं अनुवर्ती' : 'Grievance Status Tracking'}
          categoryIcon={<FileCheck2 className="h-3.5 w-3.5" />}
          title={language === 'mr' ? 'औद्योगिक तक्रार पाठपुरावा' : language === 'hi' ? 'औद्योगिक शिकायत ट्रैकिंग' : 'Industrial Grievance Tracking'}
          description={
            language === 'mr'
              ? 'आपला संदर्भ क्रमांक प्रविष्ट करून अर्जाची अद्ययावत स्थिती, कृती इतिहास आणि पाठपुरावा नोंद पहा.'
              : language === 'hi'
                ? 'अपनी संदर्भ संख्या दर्ज करके आवेदन की अद्यतन स्थिति, कार्रवाई इतिहास और अनुवर्ती विवरण देखें।'
                : 'Enter your reference number to view real-time lifecycle status, coordination history and follow-up updates.'
          }
        >
          {/* Search Input */}
          <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-3 pt-1">
            <div className="relative flex-1">
              <Search className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#94A3B8]" />
              <input
                type="text"
                value={searchRef}
                onChange={(e) => setSearchRef(e.target.value)}
                placeholder="DEMO-GRV-1001"
                className="w-full text-sm pl-11 pr-4 py-3 rounded-xl border border-[#CBD5E1] focus:outline-none focus:border-[#E35914] focus:ring-2 focus:ring-[#E35914]/20 bg-white font-label font-semibold uppercase tracking-wider shadow-2xs"
              />
            </div>
            <Button
              type="submit"
              variant="primary"
              size="lg"
              className="whitespace-nowrap"
              icon={<Search className="w-4 h-4" />}
            >
              {language === 'mr'
                ? 'स्थिती तपासा'
                : language === 'hi'
                  ? 'स्थिति जांचें'
                  : 'Track Status'}
            </Button>
          </form>
        </PageHeader>

        {/* 2-Column Master Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Main Column (8 Cols) */}
          <div className="lg:col-span-8 space-y-6">
            {searched && !currentRecord ? (
              <div className="bg-white rounded-2xl p-10 text-center border border-[#E2E8F0] space-y-4">
                <AlertCircle className="w-12 h-12 text-[#E35914] mx-auto" />
                <h3 className="text-lg font-bold text-[#111827]">
                  {language === 'mr'
                    ? 'तक्रार संदर्भ सापडला नाही'
                    : language === 'hi'
                      ? 'शिकायत संदर्भ नहीं मिला'
                      : 'Grievance Record Not Found'}
                </h3>
                <p className="text-xs text-[#64748B] max-w-md mx-auto">
                  {language === 'mr'
                    ? `प्रविष्ट केलेला क्रमांक "${searchRef}" प्रणालीमध्ये उपलब्ध नाही. कृपया संदर्भ क्रमांक तपासा किंवा उजवीकडील नमुना प्रकरणांपैकी एक निवडा.`
                    : language === 'hi'
                      ? `दर्ज की गई संदर्भ संख्या "${searchRef}" प्रणाली में उपलब्ध नहीं है। कृपया संदर्भ संख्या जांचें या दाईं ओर दिए गए उदाहरणों में से चुनें।`
                      : `Reference "${searchRef}" was not found. Please verify the ID or select a sample case from the right sidebar.`}
                </p>
                <div className="pt-2">
                  <Link to="/grievance">
                    <Button variant="primary" size="md">
                      {language === 'mr'
                        ? 'नवीन तक्रार नोंदवा'
                        : language === 'hi'
                          ? 'नई शिकायत दर्ज करें'
                          : 'File a New Grievance'}
                    </Button>
                  </Link>
                </div>
              </div>
            ) : currentRecord ? (
              <div className="space-y-6">
                {/* Complaint Header Card */}
                <div className="relative overflow-hidden rounded-2xl border border-[#DCE5EF] bg-white shadow-sm">
                  <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-[#E35914] via-[#F59E0B] to-[#136938]" />
                  <div className="pointer-events-none absolute inset-x-0 top-0 h-3 bg-gradient-to-r from-[#E35914]/15 via-[#F59E0B]/12 to-[#136938]/15 blur-xs" />
                  <div className="space-y-6 p-5 sm:p-7">
                    <div className="flex flex-col gap-4 border-b border-[#E8EDF3] pb-5 sm:flex-row sm:items-start sm:justify-between">
                      <div className="min-w-0">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="text-[10px] font-bold uppercase tracking-[0.14em] text-[#64748B]">
                            {language === 'mr'
                              ? 'संदर्भ क्रमांक'
                              : language === 'hi'
                                ? 'संदर्भ संख्या'
                                : 'Reference number'}
                          </span>
                          <span className="rounded-md bg-[#FFF7ED] px-2.5 py-1 font-label text-sm font-extrabold tracking-wide text-[#D94F0B]">
                            {currentRecord.referenceId}
                          </span>
                        </div>
                        <h2 className="mt-3 break-words text-lg font-extrabold leading-snug text-[#111827] sm:text-xl">
                          {currentRecord.subject}
                        </h2>
                      </div>
                      <div className="shrink-0 sm:pt-1">
                        {renderStatusBadge(currentRecord.status)}
                      </div>
                    </div>

                    {/* Case details */}
                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                      <div className="flex min-w-0 gap-3 rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] p-4">
                        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#FFF7ED] text-[#E35914]">
                          <Building2 className="h-5 w-5" />
                        </span>
                        <div className="min-w-0">
                          <p className="text-[10px] font-bold uppercase tracking-wider text-[#64748B]">{t.common.businessName}</p>
                          <p className="mt-1 break-words text-sm font-bold leading-snug text-[#111827]">{currentRecord.businessName}</p>
                          <p className="mt-1 break-words text-xs leading-relaxed text-[#64748B]">
                            {currentRecord.contactPerson} <span className="text-[#CBD5E1]">·</span> {currentRecord.designation}
                          </p>
                        </div>
                      </div>

                      <div className="flex min-w-0 gap-3 rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] p-4">
                        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#EFF6FF] text-[#2563EB]">
                          <MapPin className="h-5 w-5" />
                        </span>
                        <div className="min-w-0">
                          <p className="text-[10px] font-bold uppercase tracking-wider text-[#64748B]">{t.common.district} / MIDC</p>
                          <p className="mt-1 break-words text-sm font-bold leading-snug text-[#111827]">{currentRecord.district}</p>
                          <p className="mt-1 break-words text-xs leading-relaxed text-[#64748B]">{currentRecord.locationArea}</p>
                        </div>
                      </div>

                      <div className="flex min-w-0 gap-3 rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] p-4">
                        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#FFF7ED] text-[#E35914]">
                          <Layers className="h-5 w-5" />
                        </span>
                        <div className="min-w-0">
                          <p className="text-[10px] font-bold uppercase tracking-wider text-[#64748B]">
                            {language === 'mr'
                              ? 'प्रवर्ग व विभाग'
                              : language === 'hi'
                                ? 'श्रेणी एवं विभाग'
                                : 'Category & department'}
                          </p>
                          <p className="mt-1 break-words text-sm font-bold leading-snug text-[#E35914]">{t.categories[currentRecord.category]}</p>
                          <p className="mt-1 break-words text-xs leading-relaxed text-[#64748B]">{currentRecord.departmentCategory}</p>
                        </div>
                      </div>

                      <div className="flex min-w-0 gap-3 rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] p-4">
                        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#F0FDF4] text-[#136938]">
                          <CalendarDays className="h-5 w-5" />
                        </span>
                        <div className="min-w-0">
                          <p className="text-[10px] font-bold uppercase tracking-wider text-[#64748B]">
                            {language === 'mr'
                              ? 'नोंदणी दिनांक'
                              : language === 'hi'
                                ? 'दर्ज करने की तिथि'
                                : 'Submitted on'}
                          </p>
                          <p className="mt-1 break-words text-sm font-bold leading-snug text-[#111827]">{formatDate(currentRecord.submittedAt)}</p>
                          {currentRecord.assignedCoordinator && (
                            <p className="mt-1 flex items-start gap-1.5 break-words text-xs leading-relaxed text-[#136938]">
                              <UserRound className="mt-0.5 h-3.5 w-3.5 shrink-0" />
                              <span>
                                {language === 'mr'
                                  ? 'नोडल अधिकारी:'
                                  : language === 'hi'
                                    ? 'नोडल अधिकारी:'
                                    : 'Coordinator:'}{' '}
                                {currentRecord.assignedCoordinator}
                              </span>
                            </p>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Description */}
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <FileText className="h-4 w-4 text-[#E35914]" />
                        <h4 className="text-xs font-bold uppercase tracking-wider text-[#334155]">
                          {language === 'mr'
                            ? 'समस्येचे सविस्तर वर्णन'
                            : language === 'hi'
                              ? 'समस्या का विस्तृत विवरण'
                              : 'Grievance description'}
                        </h4>
                      </div>
                      <p className="rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] px-4 py-3.5 text-sm leading-7 text-[#334155]">
                        {currentRecord.description}
                      </p>
                    </div>

                    {/* Attached file metadata */}
                    {currentRecord.attachments && currentRecord.attachments.length > 0 && (
                      <div className="space-y-2">
                        <h4 className="text-xs font-bold uppercase tracking-wider text-[#334155]">
                          {language === 'mr'
                            ? 'संलग्न कागदपत्रे'
                            : language === 'hi'
                              ? 'संलग्न दस्तावेज'
                              : 'Attached documents'}
                        </h4>
                        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                          {currentRecord.attachments.map((att, i) => (
                            <div key={`${att.name}-${i}`} className="flex min-w-0 items-center gap-3 rounded-xl border border-[#E2E8F0] bg-white p-3">
                              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#FFF7ED] text-[#E35914]">
                                <FileText className="h-4 w-4" />
                              </span>
                              <span className="min-w-0 flex-1">
                                <span className="block truncate text-xs font-semibold text-[#334155]">{att.name}</span>
                                <span className="mt-0.5 block text-[10px] text-[#94A3B8]">{(att.size / 1024).toFixed(0)} KB</span>
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Visual Timeline Section */}
                <div className="bg-white rounded-2xl p-6 sm:p-8 border border-[#E2E8F0] shadow-xs space-y-6">
                  <div className="flex items-center justify-between border-b border-[#E2E8F0] pb-3">
                    <h3 className="text-base font-bold text-[#111827] flex items-center gap-2">
                      <Clock className="w-5 h-5 text-[#E35914]" />
                      <span>
                        {language === 'mr'
                          ? 'तक्रार निवारण प्रगती व टाईमलाईन'
                          : language === 'hi'
                            ? 'शिकायत निवारण प्रगति एवं समयरेखा'
                            : 'Resolution Progress Timeline'}
                      </span>
                    </h3>
                    <span className="text-xs text-[#64748B]">
                      {currentRecord.timeline?.length || 0}{' '}
                      {language === 'mr'
                        ? 'टप्पे नोंदवले'
                        : language === 'hi'
                          ? 'चरण दर्ज'
                          : 'stages recorded'}
                    </span>
                  </div>

                  <div className="relative pl-6 sm:pl-8 space-y-6 before:absolute before:left-2.5 sm:before:left-3.5 before:top-3 before:bottom-3 before:w-0.5 before:bg-[#E2E8F0]">
                    {currentRecord.timeline?.map((event, idx) => {
                      const TimelineIcon = getTimelineEventIcon(event);
                      return (
                      <div key={event.id || idx} className="relative group">
                        <div
                          className={`absolute -left-6 sm:-left-8 top-1 w-5 h-5 sm:w-7 sm:h-7 rounded-full flex items-center justify-center border-2 border-white shadow-xs ${
                            event.status === 'Resolved'
                              ? 'bg-[#136938] text-white'
                              : event.title.includes('पाठपुरावा')
                              ? 'bg-[#F59E0B] text-white'
                              : 'bg-[#E35914] text-white'
                          }`}
                        >
                          <TimelineIcon className="w-3.5 h-3.5 sm:w-4 sm:h-4" strokeWidth={2.25} />
                        </div>

                        <div className="bg-[#F8FAFC] p-4 rounded-xl border border-[#E2E8F0] space-y-1">
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                            <span className="font-bold text-sm text-[#111827] font-devanagari">
                              {event.title}
                            </span>
                            <span className="text-[11px] text-[#64748B] font-label">
                              {formatDate(event.timestamp)}
                            </span>
                          </div>
                          <p className="text-xs text-[#475569] leading-relaxed">
                            {event.description}
                          </p>
                          {event.actor && (
                            <span className="text-[11px] text-[#136938] font-medium block pt-0.5">
                              {language === 'mr'
                                ? 'नोंदणीकर्ता:'
                                : language === 'hi'
                                  ? 'दर्जकर्ता:'
                                  : 'Author:'}{' '}
                              {event.actor}
                            </span>
                          )}
                        </div>
                      </div>
                      );
                    })}
                  </div>
                </div>

                {/* Follow-up Submission Card */}
                <div className="bg-white rounded-2xl p-6 sm:p-8 border border-[#E2E8F0] shadow-xs space-y-4">
                  <div className="flex items-center justify-between border-b border-[#E2E8F0] pb-3">
                    <div>
                      <h3 className="text-base font-bold text-[#111827]">
                        {language === 'mr' ? 'पाठपुरावा नोंद जोडा' : language === 'hi' ? 'अनुवर्ती विवरण दर्ज करें' : 'Add Follow-up Note'}
                      </h3>
                      <p className="text-xs text-[#64748B]">
                        {language === 'mr'
                          ? 'या अर्जाच्या संदर्भात अतिरिक्त टिप्पणी किंवा ताजी माहिती नोंदवा.'
                          : language === 'hi'
                            ? 'इस आवेदन के संदर्भ में अतिरिक्त टिप्पणी या अद्यतन जानकारी जोड़ें।'
                            : 'Add progress notes or additional context for this reference.'}
                      </p>
                    </div>

                    <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-[#FFF7ED] text-[#E35914] font-label shrink-0">
                      {language === 'mr'
                        ? 'नोंदवले:'
                        : language === 'hi'
                          ? 'दर्ज:'
                          : 'Recorded:'}{' '}
                      {currentRecord.followUps?.length || 0}/2
                    </span>
                  </div>

                  {followUpSuccess && (
                    <div className="text-xs text-[#136938] bg-[#F0FDF4] p-3 rounded-xl border border-[#DCFCE7] flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 shrink-0" />
                      <span>{followUpSuccess}</span>
                    </div>
                  )}

                  {followUpError && (
                    <div className="text-xs text-red-600 bg-red-50 p-3 rounded-xl border border-red-200 flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 shrink-0" />
                      <span>{followUpError}</span>
                    </div>
                  )}

                  {(currentRecord.followUps?.length || 0) >= 2 ? (
                    <div className="text-xs text-[#92400E] bg-[#FFFBEB] p-4 rounded-xl border border-[#FEF3C7] space-y-1">
                      <span className="font-bold block">{language === 'en' ? 'Maximum follow-up limit reached (2/2).' : language === 'hi' ? 'अधिकतम अनुवर्ती सीमा पूर्ण (2/2)।' : 'कमाल पाठपुरावा मर्यादा गाठली आहे (२/२).'}</span>
                      <span>{language === 'en' ? 'Additional communications should be directed to the responsible department cell.' : language === 'hi' ? 'अतिरिक्त संवाद संबंधित विभागीय प्रकोष्ठ से करें।' : 'पुढील संवादासाठी संबंधित विभागीय कक्षाशी संपर्क साधावा.'}</span>
                    </div>
                  ) : currentRecord.status === 'Resolved' ? (
                    <div className="text-xs text-[#136938] bg-[#F0FDF4] p-4 rounded-xl border border-[#DCFCE7]">
                      {language === 'en' ? 'This record is marked as resolved on the platform.' : language === 'hi' ? 'यह प्रविष्टि मंच पर निवारित चिह्नित है।' : 'ही नोंद मंचावर निवारित म्हणून चिन्हांकित आहे.'}
                    </div>
                  ) : (
                    <form onSubmit={handleFollowUpSubmit} className="space-y-4 pt-1">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <Input
                            label={
                              language === 'mr'
                                ? 'पाठपुरावा करणाऱ्या व्यक्तीचे नाव'
                                : language === 'hi'
                                  ? 'अनुवर्ती करने वाले व्यक्ति का नाम'
                                  : 'Author Name'
                            }
                            value={followUpAuthor}
                            onChange={(e) => setFollowUpAuthor(e.target.value)}
                            placeholder={
                              currentRecord.contactPerson ||
                              (language === 'mr'
                                ? 'उदा. श्री. संजय कुलकर्णी'
                                : language === 'hi'
                                  ? 'उदा. श्री संजय कुलकर्णी'
                                  : 'e.g. Sanjay Kulkarni')
                            }
                          />
                        </div>
                        <div className="flex items-end">
                          <span className="text-xs text-[#64748B] mb-2">
                            {language === 'mr'
                              ? `सध्याचा पाठपुरावा: ${
                                  (currentRecord.followUps?.length || 0) === 0 ? 'प्रथम पाठपुरावा (1st)' : 'द्वितीय पाठपुरावा (2nd)'
                                }`
                              : language === 'hi'
                                ? `वर्तमान अनुवर्ती: ${
                                    (currentRecord.followUps?.length || 0) === 0 ? 'प्रथम अनुवर्ती (1st)' : 'द्वितीय अनुवर्ती (2nd)'
                                  }`
                                : `Active stage: ${
                                    (currentRecord.followUps?.length || 0) === 0 ? 'First Follow-up' : 'Second Follow-up'
                                  }`}
                          </span>
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-[#334155] mb-1.5">
                          {language === 'mr'
                            ? 'पाठपुरावा टिप्पणी व अतिरिक्त माहिती *'
                            : language === 'hi'
                              ? 'अनुवर्ती टिप्पणी एवं अतिरिक्त विवरण *'
                              : 'Follow-up Details *'}
                        </label>
                        <textarea
                          rows={3}
                          value={followUpComment}
                          onChange={(e) => setFollowUpComment(e.target.value)}
                          placeholder={
                            language === 'mr'
                              ? 'उदा. ५ दिवस उलटूनही प्रत्यक्ष पाहणी झालेली नाही, कृपया तातडीने कार्यवाही करावी...'
                              : language === 'hi'
                                ? 'उदा. ५ दिन बीतने पर भी प्रत्यक्ष निरीक्षण नहीं हुआ, कृपया त्वरित कार्रवाई करें...'
                                : 'Enter your specific concern regarding the delay or update...'
                          }
                          className="w-full px-3.5 py-2.5 rounded-xl border border-[#CBD5E1] text-xs text-[#111827] focus:outline-none focus:ring-2 focus:ring-[#E35914] focus:border-transparent transition resize-y font-devanagari"
                        />
                      </div>

                      <div className="flex justify-end">
                        <Button
                          type="submit"
                          variant="primary"
                          size="md"
                          disabled={isSubmittingFollowUp}
                          icon={<Send className="w-4 h-4" />}
                          iconPosition="right"
                        >
                          {isSubmittingFollowUp
                            ? t.common.loading
                            : (currentRecord.followUps?.length || 0) === 0
                              ? language === 'mr'
                                ? 'प्रथम पाठपुरावा नोंदवा'
                                : language === 'hi'
                                  ? 'प्रथम अनुवर्ती दर्ज करें'
                                  : 'Submit First Follow-up'
                              : language === 'mr'
                                ? 'द्वितीय पाठपुरावा नोंदवा'
                                : language === 'hi'
                                  ? 'द्वितीय अनुवर्ती दर्ज करें'
                                  : 'Submit Second Follow-up'}
                        </Button>
                      </div>
                    </form>
                  )}
                </div>
              </div>
            ) : null}
          </div>

          {/* Sidebar column */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-white rounded-2xl p-6 border border-[#E2E8F0] shadow-xs space-y-4">
              <div className="flex items-center gap-2 border-b border-[#E2E8F0] pb-3">
                <ShieldCheck className="w-5 h-5 text-[#136938]" />
                <h3 className="font-bold text-sm text-[#111827]">
                  {language === 'mr' ? 'पाठपुरावा माहिती' : language === 'hi' ? 'ट्रैकिंग जानकारी' : 'Tracking Information'}
                </h3>
              </div>
              <p className="text-xs leading-relaxed text-[#64748B]">
                {language === 'mr' ? 'स्थिती व पाठपुरावे नमुना डेटावर दाखवले जातात. नोंदी या ब्राउझरमध्येच राहतात आणि अधिकाऱ्यांना सूचित करत नाहीत.' : language === 'hi' ? 'स्थिति और अनुवर्ती नमूना डेटा के रूप में दिखते हैं। प्रविष्टियां इसी ब्राउज़र में रहती हैं और अधिकारियों को सूचित नहीं करतीं।' : 'Statuses and follow-ups are shown as sample data. Entries stay in this browser and do not notify officials.'}
              </p>
            </div>

            <div className="rounded-2xl border border-[#E2E8F0] bg-white p-6 shadow-xs">
              <h3 className="font-bold text-sm text-[#111827]">{language === 'mr' ? 'अधिकृत माहिती' : language === 'hi' ? 'आधिकारिक जानकारी' : 'Official information'}</h3>
              <div className="mt-3 space-y-2">
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
