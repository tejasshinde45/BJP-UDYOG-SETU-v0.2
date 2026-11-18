import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../hooks/useLanguage';
import { useDemoData } from '../hooks/useDemoData';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { Button } from '../components/ui/Button';
import { PageHeader } from '../components/ui/PageHeader';
import {
  BarChart3,
  FileCheck2,
  Users,
  Building2,
  Calendar,
  Search,
  CheckCircle2,
  X,
  Clock,
  TrendingUp,
  ExternalLink,
  MessageSquare,
  ShieldCheck,
} from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from 'recharts';
import type {
  GrievanceRecord,
  GrievanceStatus,
  MeetingRequestRecord,
  MeetingRequestStatus,
  AssociationRecord,
  AssociationVerificationStatus,
} from '../types';

export const AdminDashboardPage: React.FC = () => {
  const { language, t } = useLanguage();
  const {
    grievances,
    updateGrievance,
    meetingRequests,
    updateMeetingRequest,
    associations,
    updateAssociation,
    eventRegistrations,
  } = useDemoData();

  // Active Tab
  type AdminTab = 'overview' | 'grievances' | 'meetings' | 'associations' | 'events';
  const [activeTab, setActiveTab] = useState<AdminTab>('overview');

  // Grievance management states
  const [grievanceSearch, setGrievanceSearch] = useState('');
  const [grievanceStatusFilter, setGrievanceStatusFilter] = useState<string>('all');
  const [selectedGrievance, setSelectedGrievance] = useState<GrievanceRecord | null>(null);
  const [statusUpdateVal, setStatusUpdateVal] = useState<GrievanceStatus>('Under Review');
  const [assignCoordinatorVal, setAssignCoordinatorVal] = useState('');
  const [adminNoteVal, setAdminNoteVal] = useState('');
  const [actionFeedback, setActionFeedback] = useState<string | null>(null);

  // Meeting request management states
  const [meetingStatusFilter, setMeetingStatusFilter] = useState<string>('all');
  const [selectedMeeting, setSelectedMeeting] = useState<MeetingRequestRecord | null>(null);
  const [meetingDecisionVal, setMeetingDecisionVal] = useState<MeetingRequestStatus>('Under Review');
  const [meetingNoteVal, setMeetingNoteVal] = useState('');

  // Association management states
  const [associationFilter, setAssociationFilter] = useState<string>('all');
  const [selectedAssociation, setSelectedAssociation] = useState<AssociationRecord | null>(null);
  const [associationStatusVal, setAssociationStatusVal] = useState<AssociationVerificationStatus>('Verified');
  const [associationNoteVal, setAssociationNoteVal] = useState('');

  // Derived metrics
  const totalGrievances = grievances.length;
  const resolvedGrievances = grievances.filter((g) => g.status === 'Resolved').length;
  const inProgressGrievances = grievances.filter(
    (g) => g.status === 'Action in Progress' || g.status === 'Assigned'
  ).length;
  const totalMeetings = meetingRequests.length;
  const totalAssociations = associations.length;
  const totalRegistrations = eventRegistrations.length;

  // Recharts Chart Data (derived from shared demo grievances)
  const categoryCounts = grievances.reduce((acc, g) => {
    acc[g.category] = (acc[g.category] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const categoryChartData = [
    { name: 'MIDC Infra', count: categoryCounts.midc_infrastructure || 0, color: '#E35914' },
    { name: 'Power/Utilities', count: categoryCounts.electricity_utilities || 0, color: '#F59E0B' },
    { name: 'Clearances', count: categoryCounts.permissions_approvals || 0, color: '#136938' },
    { name: 'Services & Roads', count: (categoryCounts.industrial_services || 0) + (categoryCounts.roads_transport || 0), color: '#3B82F6' },
  ];

  const districtCounts = grievances.reduce((acc, g) => {
    acc[g.district] = (acc[g.district] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const districtChartData = Object.entries(districtCounts).map(([district, count]) => ({
    district,
    count,
  }));

  // Filtered grievances
  const filteredGrievances = grievances.filter((g) => {
    const matchesSearch =
      g.referenceId.toLowerCase().includes(grievanceSearch.toLowerCase()) ||
      g.businessName.toLowerCase().includes(grievanceSearch.toLowerCase()) ||
      g.subject.toLowerCase().includes(grievanceSearch.toLowerCase()) ||
      g.district.toLowerCase().includes(grievanceSearch.toLowerCase());
    const matchesStatus =
      grievanceStatusFilter === 'all' || g.status === grievanceStatusFilter;
    return matchesSearch && matchesStatus;
  });

  // Filtered meetings
  const filteredMeetings = meetingRequests.filter((m) => {
    return meetingStatusFilter === 'all' || m.status === meetingStatusFilter;
  });

  // Filtered associations
  const filteredAssociations = associations.filter((a) => {
    return associationFilter === 'all' || a.status === associationFilter;
  });

  // Handlers
  const handleOpenGrievanceDetail = (g: GrievanceRecord) => {
    setSelectedGrievance(g);
    setStatusUpdateVal(g.status);
    setAssignCoordinatorVal(g.assignedCoordinator || '');
    setAdminNoteVal('');
    setActionFeedback(null);
  };

  const handleSaveGrievanceUpdates = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedGrievance) return;

    const updates: Partial<GrievanceRecord> = {
      status: statusUpdateVal,
      assignedCoordinator: assignCoordinatorVal.trim() || undefined,
    };

    if (adminNoteVal.trim()) {
      updates.internalNotes = [
        ...(selectedGrievance.internalNotes || []),
        `[${new Date().toLocaleTimeString()}]: ${adminNoteVal.trim()}`,
      ];
    }

    updateGrievance(selectedGrievance.id, updates);
    setActionFeedback(
      language === 'mr'
        ? 'तक्रारीची स्थिती यशस्वीरीत्या अद्यतनित झाली!'
        : language === 'hi'
        ? 'शिकायत की स्थिति सफलतापूर्वक अपडेट हो गई!'
        : 'Grievance updated!'
    );
    setTimeout(() => {
      setSelectedGrievance(null);
      setActionFeedback(null);
    }, 1000);
  };

  const handleSaveMeetingUpdates = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedMeeting) return;

    updateMeetingRequest(selectedMeeting.id, {
      status: meetingDecisionVal,
      decisionNote: meetingNoteVal.trim() || undefined,
    });

    setActionFeedback(
      language === 'mr'
        ? 'भेट विनंती स्थिती अद्यतनित झाली!'
        : language === 'hi'
        ? 'बैठक अनुरोध स्थिति अपडेट हो गई!'
        : 'Meeting status updated!'
    );
    setTimeout(() => {
      setSelectedMeeting(null);
      setActionFeedback(null);
    }, 1000);
  };

  const handleSaveAssociationUpdates = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedAssociation) return;

    updateAssociation(selectedAssociation.id, {
      status: associationStatusVal,
      internalNote: associationNoteVal.trim() || undefined,
    });

    setActionFeedback(
      language === 'mr'
        ? 'संघटना स्थिती अद्यतनित झाली!'
        : language === 'hi'
        ? 'संगठन स्थिति अपडेट हो गई!'
        : 'Association status updated!'
    );
    setTimeout(() => {
      setSelectedAssociation(null);
      setActionFeedback(null);
    }, 1000);
  };

  const renderStatusBadge = (status: string) => {
    const config: Record<string, { bg: string; text: string; border: string }> = {
      Submitted: { bg: 'bg-[#FFF7ED]', text: 'text-[#E35914]', border: 'border-[#FFEDD5]' },
      'Under Review': { bg: 'bg-[#FFFBEB]', text: 'text-[#B45309]', border: 'border-[#FEF3C7]' },
      Assigned: { bg: 'bg-[#EFF6FF]', text: 'text-[#1D4ED8]', border: 'border-[#DBEAFE]' },
      'Action in Progress': { bg: 'bg-[#F0FDF4]', text: 'text-[#136938]', border: 'border-[#DCFCE7]' },
      'Awaiting Information': { bg: 'bg-[#FEF2F2]', text: 'text-[#B91C1C]', border: 'border-[#FEE2E2]' },
      Resolved: { bg: 'bg-[#F0FDF4]', text: 'text-[#136938]', border: 'border-[#BBF7D0]' },
      'Pending Review': { bg: 'bg-[#FFFBEB]', text: 'text-[#B45309]', border: 'border-[#FEF3C7]' },
      Approved: { bg: 'bg-[#F0FDF4]', text: 'text-[#136938]', border: 'border-[#DCFCE7]' },
      Declined: { bg: 'bg-[#FEF2F2]', text: 'text-[#B91C1C]', border: 'border-[#FEE2E2]' },
      Scheduled: { bg: 'bg-[#EFF6FF]', text: 'text-[#1D4ED8]', border: 'border-[#DBEAFE]' },
      'Pending Verification': { bg: 'bg-[#FFFBEB]', text: 'text-[#B45309]', border: 'border-[#FEF3C7]' },
      Verified: { bg: 'bg-[#F0FDF4]', text: 'text-[#136938]', border: 'border-[#BBF7D0]' },
    };

    const s = config[status] || { bg: 'bg-gray-100', text: 'text-gray-700', border: 'border-gray-200' };

    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border ${s.bg} ${s.text} ${s.border}`}>
        {t.statuses[status] || status}
      </span>
    );
  };

  return (
    <div className="bg-[#F8FAFC] min-h-screen py-8 font-devanagari text-[#111827]">
      <div className="w-full max-w-[1560px] mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <Breadcrumbs items={[{ label: t.nav.admin }]} />

        {/* Institutional Admin Header */}
        <PageHeader
          category={language === 'mr' ? 'प्रशासन नियंत्रण कक्ष' : language === 'hi' ? 'प्रशासन नियंत्रण कक्ष' : 'ADMIN CONSOLE'}
          categoryIcon={<ShieldCheck className="h-3.5 w-3.5" />}
          title={language === 'mr' ? 'उद्योग सेतू संचालन डॅशबोर्ड' : language === 'hi' ? 'उद्योग सेतु संचालन डैशबोर्ड' : 'Operations Dashboard'}
          description={
            language === 'mr'
              ? 'स्थानिक नोंदी, तक्रार पाठपुरावा, संघटना समन्वय व कार्यक्रम सहभागाचे व्यवस्थापन.'
              : language === 'hi'
                ? 'स्थानीय प्रविष्टियां, शिकायत अनुवर्ती कार्रवाई, संगठन समन्वय और कार्यक्रम सहभागिता का प्रबंधन।'
                : 'Manage coordination records, grievance workflows, association affiliations and event registrations.'
          }
        />

        {/* Tab Navigation */}
        <div className="bg-white border border-[#E2E8F0] rounded-xl p-1.5 shadow-2xs flex flex-wrap gap-1 text-xs font-semibold font-devanagari">
          {[
            { id: 'overview', label: language === 'mr' ? 'डॅशबोर्ड आढावा' : language === 'hi' ? 'डैशबोर्ड अवलोकन' : 'Overview & Analytics', icon: BarChart3 },
            { id: 'grievances', label: `${t.nav.grievance} (${grievances.length})`, icon: FileCheck2 },
            { id: 'meetings', label: `${t.nav.meetingRequest} (${meetingRequests.length})`, icon: Users },
            { id: 'associations', label: `${language === 'mr' ? 'संघटना' : language === 'hi' ? 'संगठन' : 'Associations'} (${associations.length})`, icon: Building2 },
            { id: 'events', label: `${language === 'mr' ? 'उपक्रम नोंदणी' : language === 'hi' ? 'उपक्रम पंजीकरण' : 'Event RSVPs'} (${eventRegistrations.length})`, icon: Calendar },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id as AdminTab)}
                className={`cursor-pointer inline-flex items-center gap-2 px-3.5 py-2 rounded-lg transition ${
                  isActive
                    ? 'bg-[#E35914] text-white shadow-xs font-bold'
                    : 'text-[#475569] hover:bg-[#F4F7FF] hover:text-[#111827]'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* TAB 1: OVERVIEW & ANALYTICS */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* Derived Key KPI Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-white p-5 rounded-xl border border-slate-200/80 border-l-2 border-l-[#E35914] shadow-xs">
                <span className="text-xs text-[#64748B] font-devanagari">{language === 'mr' ? 'एकूण तक्रारी' : language === 'hi' ? 'कुल शिकायतें' : 'Total Grievances'}</span>
                <div className="text-2xl sm:text-3xl font-extrabold text-[#111827] mt-1 font-label">
                  {totalGrievances}
                </div>
                <div className="text-[11px] text-[#E35914] mt-1 flex items-center gap-1 font-devanagari">
                  <TrendingUp className="w-3.5 h-3.5" />
                  <span>{inProgressGrievances} {language === 'en' ? 'active cases' : language === 'hi' ? 'सक्रिय मामले' : 'सक्रिय प्रकरणे'}</span>
                </div>
              </div>

              <div className="bg-white p-5 rounded-xl border border-slate-200/80 border-l-2 border-l-[#136938] shadow-xs">
                <span className="text-xs text-[#64748B] font-devanagari">{language === 'mr' ? 'निकाली काढलेल्या तक्रारी' : language === 'hi' ? 'निस्तारित शिकायतें' : 'Resolved Grievances'}</span>
                <div className="text-2xl sm:text-3xl font-extrabold text-[#136938] mt-1 font-label">
                  {resolvedGrievances}
                </div>
                <div className="text-[11px] text-[#136938] mt-1 flex items-center gap-1 font-devanagari">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>{totalGrievances > 0 ? Math.round((resolvedGrievances / totalGrievances) * 100) : 0}% {language === 'en' ? 'resolution rate' : language === 'hi' ? 'निवारण दर' : 'निवारण दर'}</span>
                </div>
              </div>

              <div className="bg-white p-5 rounded-xl border border-slate-200/80 border-l-2 border-l-[#F59E0B] shadow-xs">
                <span className="text-xs text-[#64748B] font-devanagari">{language === 'mr' ? 'भेट विनंत्या' : language === 'hi' ? 'बैठक अनुरोध' : 'Meeting Requests'}</span>
                <div className="text-2xl sm:text-3xl font-extrabold text-[#111827] mt-1 font-label">
                  {totalMeetings}
                </div>
                <div className="text-[11px] text-[#B45309] mt-1 flex items-center gap-1 font-devanagari">
                  <Clock className="w-3.5 h-3.5" />
                  <span>{meetingRequests.filter((m) => m.status === 'Pending Review').length} {language === 'en' ? 'pending' : language === 'hi' ? 'लंबित' : 'प्रलंबित'}</span>
                </div>
              </div>

              <div className="bg-white p-5 rounded-xl border border-slate-200/80 border-l-2 border-l-[#1D4ED8] shadow-xs">
                <span className="text-xs text-[#64748B] font-devanagari">{language === 'mr' ? 'संघटना व सहभाग' : language === 'hi' ? 'संगठन एवं सहभागिता' : 'Associations & RSVPs'}</span>
                <div className="text-2xl sm:text-3xl font-extrabold text-[#111827] mt-1 font-label">
                  {totalAssociations + totalRegistrations}
                </div>
                <div className="text-[11px] text-[#1D4ED8] mt-1 flex items-center gap-1 font-devanagari">
                  <Building2 className="w-3.5 h-3.5" />
                  <span>{totalAssociations} + {totalRegistrations} {language === 'en' ? 'records' : language === 'hi' ? 'रिकॉर्ड' : 'नोंदी'}</span>
                </div>
              </div>
            </div>

            {/* Recharts Analytics Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Category Breakdown Chart */}
              <div className="bg-white p-6 rounded-2xl border border-[#E2E8F0] shadow-2xs space-y-4">
                <div>
                  <h3 className="text-base font-bold text-[#111827]">
                    {language === 'mr' ? 'तक्रारींचे प्रवर्गनिहाय वर्गीकरण' : language === 'hi' ? 'श्रेणीवार शिकायत वर्गीकरण' : 'Grievances by Category'}
                  </h3>
                  <p className="text-xs text-[#64748B]">
                    {language === 'mr' ? 'क्षेत्रनिहाय औद्योगिक तक्रारींचे वितरण' : language === 'hi' ? 'क्षेत्रवार औद्योगिक शिकायतों का वितरण' : 'Distribution across sectors'}
                  </p>
                </div>

                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={categoryChartData} margin={{ top: 10, right: 10, left: -20, bottom: 20 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
                      <XAxis dataKey="name" tick={{ fontSize: 11 }} />
                      <YAxis allowDecimals={false} tick={{ fontSize: 11 }} />
                      <Tooltip />
                      <Bar dataKey="count" fill="#E35914" radius={[6, 6, 0, 0]}>
                        {categoryChartData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* District Distribution Chart */}
              <div className="bg-white p-6 rounded-2xl border border-[#E2E8F0] shadow-2xs space-y-4">
                <div>
                  <h3 className="text-base font-bold text-[#111827]">
                    {language === 'mr' ? 'जिल्हानिहाय तक्रार संख्या' : language === 'hi' ? 'ज़िलेवार शिकायत संख्या' : 'District-wise Distribution'}
                  </h3>
                  <p className="text-xs text-[#64748B]">
                    {language === 'mr' ? 'महाराष्ट्र औद्योगिक क्लस्टर्स' : language === 'hi' ? 'महाराष्ट्र औद्योगिक क्लस्टर' : 'Active Maharashtra industrial hubs'}
                  </p>
                </div>

                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={districtChartData} margin={{ top: 10, right: 10, left: -20, bottom: 20 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
                      <XAxis dataKey="district" tick={{ fontSize: 11 }} />
                      <YAxis allowDecimals={false} tick={{ fontSize: 11 }} />
                      <Tooltip />
                      <Bar dataKey="count" fill="#136938" radius={[6, 6, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>

            {/* Quick Actions Strip */}
            <div className="bg-white p-6 rounded-2xl border border-[#E2E8F0] shadow-2xs flex flex-wrap items-center justify-between gap-4">
              <div className="space-y-0.5">
                <h4 className="font-bold text-sm text-[#111827]">
                  {language === 'mr' ? 'द्रुत नेव्हिगेशन' : language === 'hi' ? 'त्वरित नेविगेशन' : 'Quick Navigation'}
                </h4>
                <p className="text-xs text-[#64748B]">
                  {language === 'mr'
                    ? 'विविध सेवा मॉड्यूलच्या थेट लिंक आणि व्यवस्थापन पर्याय.'
                    : language === 'hi'
                      ? 'विभिन्न सेवा मॉड्यूल के सीधे लिंक और प्रबंधन विकल्प।'
                      : 'Direct links and management options for key platform services.'}
                </p>
              </div>

              <div className="flex flex-wrap gap-2">
                <Link to="/grievance">
                  <Button variant="outlined" size="sm">
                    {t.nav.fileGrievance}
                  </Button>
                </Link>
                <Link to="/track-complaint">
                  <Button variant="outlined" size="sm">
                    {t.nav.trackComplaint}
                  </Button>
                </Link>
                <Link to="/meeting-request">
                  <Button variant="outlined" size="sm">
                    {t.nav.meetingRequest}
                  </Button>
                </Link>
                <Link to="/association-registration">
                  <Button variant="outlined" size="sm">
                    {t.nav.associationReg}
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: GRIEVANCES MANAGEMENT */}
        {activeTab === 'grievances' && (
          <div className="bg-white rounded-2xl border border-[#E2E8F0] shadow-xs p-6 space-y-5">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 pb-3 border-b border-[#E2E8F0]">
              <div>
                <h3 className="text-base font-bold text-[#111827]">
                  {language === 'mr' ? 'तक्रार निवारण व्यवस्थापन' : language === 'hi' ? 'शिकायत निवारण प्रबंधन' : 'Grievance Management Desk'}
                </h3>
                <p className="text-xs text-[#64748B]">
                  {language === 'mr'
                    ? 'संदर्भ, उद्योग नाव किंवा जिल्ह्यावरून शोधा; अधिकारी नियुक्त करा व स्थिती बदला.'
                    : language === 'hi'
                    ? 'संदर्भ, उद्यम नाम या ज़िले से खोजें; अधिकारी नियुक्त करें और स्थिति बदलें।'
                    : 'Filter records, assign coordinators, and update resolution lifecycle.'}
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <div className="relative">
                  <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-[#94A3B8]" />
                  <input
                    type="text"
                    value={grievanceSearch}
                    onChange={(e) => setGrievanceSearch(e.target.value)}
                    placeholder={language === 'mr' ? 'शोधा...' : language === 'hi' ? 'खोजें...' : 'Search...'}
                    className="text-xs pl-8 pr-3 py-1.5 rounded-lg border border-[#CBD5E1] bg-white w-48 font-devanagari"
                  />
                </div>

                <select
                  value={grievanceStatusFilter}
                  onChange={(e) => setGrievanceStatusFilter(e.target.value)}
                  className="text-xs py-1.5 px-3 rounded-lg border border-[#CBD5E1] bg-white font-devanagari cursor-pointer"
                >
                  <option value="all">{t.common.all} {language === 'mr' ? 'स्थिती' : language === 'hi' ? 'स्थिति' : 'Status'}</option>
                  <option value="Submitted">Submitted</option>
                  <option value="Under Review">Under Review</option>
                  <option value="Assigned">Assigned</option>
                  <option value="Action in Progress">Action in Progress</option>
                  <option value="Awaiting Information">Awaiting Information</option>
                  <option value="Resolved">Resolved</option>
                </select>
              </div>
            </div>

            {/* Grievances Table / Mobile Card View */}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="bg-[#F8FAFC] text-[#475569] font-label uppercase text-[11px] border-b border-[#E2E8F0]">
                    <th className="py-3 px-3">{language === 'mr' ? 'संदर्भ क्र.' : language === 'hi' ? 'संदर्भ संख्या' : 'Ref ID'}</th>
                    <th className="py-3 px-3">{t.common.businessName}</th>
                    <th className="py-3 px-3">{language === 'mr' ? 'विषय व प्रवर्ग' : language === 'hi' ? 'विषय एवं श्रेणी' : 'Subject & Category'}</th>
                    <th className="py-3 px-3">{t.common.district}</th>
                    <th className="py-3 px-3">{t.common.status}</th>
                    <th className="py-3 px-3">{language === 'mr' ? 'पाठपुरावा' : language === 'hi' ? 'अनुवर्ती' : 'Follow-ups'}</th>
                    <th className="py-3 px-3 text-right">{language === 'mr' ? 'कृती' : language === 'hi' ? 'कार्रवाई' : 'Actions'}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E2E8F0]">
                  {filteredGrievances.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="text-center py-8 text-[#64748B]">
                        {language === 'mr' ? 'कोणतीही तक्रार आढळली नाही' : language === 'hi' ? 'कोई शिकायत नहीं मिली' : 'No records found'}
                      </td>
                    </tr>
                  ) : (
                    filteredGrievances.map((g) => (
                      <tr key={g.id} className="hover:bg-[#F8FAFC] transition">
                        <td className="py-3 px-3 font-bold font-label text-[#E35914]">
                          {g.referenceId}
                        </td>
                        <td className="py-3 px-3">
                          <span className="font-semibold text-[#111827] block">{g.businessName}</span>
                          <span className="text-[11px] text-[#64748B]">{g.contactPerson}</span>
                        </td>
                        <td className="py-3 px-3 max-w-xs">
                          <span className="font-medium text-[#111827] truncate block">{g.subject}</span>
                          <span className="text-[11px] text-[#E35914] truncate block">{t.categories[g.category]}</span>
                        </td>
                        <td className="py-3 px-3 font-medium text-[#475569]">
                          {g.district}
                        </td>
                        <td className="py-3 px-3">
                          {renderStatusBadge(g.status)}
                        </td>
                        <td className="py-3 px-3">
                          {g.followUps.length > 0 ? (
                            <span className="inline-flex items-center gap-1 text-[11px] font-bold text-[#E35914] bg-[#FFF7ED] px-2 py-0.5 rounded">
                              <MessageSquare className="w-3 h-3" />
                              {g.followUps.length} {language === 'mr' ? 'पाठपुरावा' : language === 'hi' ? 'अनुवर्ती' : 'follow-ups'}
                            </span>
                          ) : (
                            <span className="text-[11px] text-[#94A3B8]">—</span>
                          )}
                        </td>
                        <td className="py-3 px-3 text-right">
                          <Button
                            variant="outlined"
                            size="sm"
                            onClick={() => handleOpenGrievanceDetail(g)}
                          >
                            {language === 'mr' ? 'व्यवस्थापित करा' : language === 'hi' ? 'प्रबंधित करें' : 'Manage'}
                          </Button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 3: MEETING REQUESTS MANAGEMENT */}
        {activeTab === 'meetings' && (
          <div className="bg-white rounded-2xl border border-[#E2E8F0] shadow-xs p-6 space-y-5">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 pb-3 border-b border-[#E2E8F0]">
              <div>
                <h3 className="text-base font-bold text-[#111827]">
                  {language === 'mr' ? 'नेतृत्व भेट विनंती व्यवस्थापन' : language === 'hi' ? 'नेतृत्व भेंट अनुरोध प्रबंधन' : 'Leadership Meeting Requests Desk'}
                </h3>
                <p className="text-xs text-[#64748B]">
                  {language === 'mr'
                    ? 'उद्योजकांच्या भेट विनंत्यांची छाननी, मंजुरी किंवा नकार नोंदवा.'
                    : language === 'hi'
                    ? 'उद्यमियों के भेंट अनुरोधों की समीक्षा, स्वीकृति या अस्वीकृति दर्ज करें।'
                    : 'Review meeting requests, set sample approval status, and attach decision notes.'}
                </p>
              </div>

              <select
                value={meetingStatusFilter}
                onChange={(e) => setMeetingStatusFilter(e.target.value)}
                className="text-xs py-1.5 px-3 rounded-lg border border-[#CBD5E1] bg-white font-devanagari cursor-pointer"
              >
                <option value="all">{t.common.all} {language === 'mr' ? 'स्थिती' : language === 'hi' ? 'स्थिति' : 'Status'}</option>
                <option value="Pending Review">Pending Review</option>
                <option value="Under Review">Under Review</option>
                <option value="Approved">Approved</option>
                <option value="Declined">Declined</option>
                <option value="Scheduled">Scheduled</option>
              </select>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="bg-[#F8FAFC] text-[#475569] font-label uppercase text-[11px] border-b border-[#E2E8F0]">
                    <th className="py-3 px-3">{language === 'mr' ? 'संदर्भ' : language === 'hi' ? 'संदर्भ' : 'Reference'}</th>
                    <th className="py-3 px-3">{language === 'mr' ? 'संस्था / प्रतिनिधी' : language === 'hi' ? 'संस्था / प्रतिनिधि' : 'Enterprise / Representative'}</th>
                    <th className="py-3 px-3">{language === 'mr' ? 'प्राधान्य नेतृत्व' : language === 'hi' ? 'पसंदीदा नेता' : 'Preferred Leader'}</th>
                    <th className="py-3 px-3">{language === 'mr' ? 'भेटीचा उद्देश' : language === 'hi' ? 'भेंट का उद्देश्य' : 'Purpose'}</th>
                    <th className="py-3 px-3">{language === 'mr' ? 'स्थिती' : language === 'hi' ? 'स्थिति' : 'Status'}</th>
                    <th className="py-3 px-3 text-right">{language === 'mr' ? 'कृती' : language === 'hi' ? 'कार्रवाई' : 'Action'}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E2E8F0]">
                  {filteredMeetings.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="text-center py-8 text-[#64748B]">
                        {language === 'mr' ? 'कोणतीही विनंती आढळली नाही' : language === 'hi' ? 'कोई अनुरोध नहीं मिला' : 'No records found'}
                      </td>
                    </tr>
                  ) : (
                    filteredMeetings.map((m) => (
                      <tr key={m.id} className="hover:bg-[#F8FAFC] transition">
                        <td className="py-3 px-3 font-bold font-label text-[#E35914]">
                          {m.referenceId}
                        </td>
                        <td className="py-3 px-3">
                          <span className="font-semibold text-[#111827] block">{m.businessName}</span>
                          <span className="text-[11px] text-[#64748B]">
                            {m.representativeName} ({m.designation})
                          </span>
                        </td>
                        <td className="py-3 px-3 font-medium text-[#475569]">
                          {m.preferredLeader}
                        </td>
                        <td className="py-3 px-3 max-w-xs">
                          <p className="truncate text-[#334155]">{m.meetingPurpose}</p>
                        </td>
                        <td className="py-3 px-3">
                          {renderStatusBadge(m.status)}
                        </td>
                        <td className="py-3 px-3 text-right">
                          <Button
                            variant="outlined"
                            size="sm"
                            onClick={() => {
                              setSelectedMeeting(m);
                              setMeetingDecisionVal(m.status);
                              setMeetingNoteVal(m.decisionNote || '');
                              setActionFeedback(null);
                            }}
                          >
                            {language === 'mr' ? 'छाननी करा' : language === 'hi' ? 'समीक्षा करें' : 'Review'}
                          </Button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 4: ASSOCIATIONS MANAGEMENT */}
        {activeTab === 'associations' && (
          <div className="bg-white rounded-2xl border border-[#E2E8F0] shadow-xs p-6 space-y-5">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 pb-3 border-b border-[#E2E8F0]">
              <div>
                <h3 className="text-base font-bold text-[#111827]">
                  {language === 'mr' ? 'औद्योगिक संघटना नोंदणी व्यवस्थापन' : language === 'hi' ? 'औद्योगिक संगठन पंजीकरण प्रबंधन' : 'Association Registrations Desk'}
                </h3>
                <p className="text-xs text-[#64748B]">
                  {language === 'mr'
                    ? 'संघटनांची पडताळणी स्थिती बदला व अंतर्गत नोंद ठेवा.'
                    : language === 'hi'
                    ? 'संगठनों की सत्यापन स्थिति बदलें और आंतरिक टिप्पणी दर्ज करें।'
                    : 'Verify registered associations and record coordination notes.'}
                </p>
              </div>

              <select
                value={associationFilter}
                onChange={(e) => setAssociationFilter(e.target.value)}
                className="text-xs py-1.5 px-3 rounded-lg border border-[#CBD5E1] bg-white font-devanagari cursor-pointer"
              >
                <option value="all">{t.common.all} {language === 'mr' ? 'स्थिती' : language === 'hi' ? 'स्थिति' : 'Status'}</option>
                <option value="Pending Verification">Pending Verification</option>
                <option value="Under Review">Under Review</option>
                <option value="Verified">Verified</option>
                <option value="Declined">Declined</option>
              </select>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="bg-[#F8FAFC] text-[#475569] font-label uppercase text-[11px] border-b border-[#E2E8F0]">
                    <th className="py-3 px-3">{language === 'mr' ? 'संदर्भ' : language === 'hi' ? 'संदर्भ' : 'Reference'}</th>
                    <th className="py-3 px-3">{language === 'mr' ? 'संघटना नाव व प्रकार' : language === 'hi' ? 'संगठन नाम एवं प्रकार' : 'Association & Type'}</th>
                    <th className="py-3 px-3">{language === 'mr' ? 'जिल्हा / कार्यक्षेत्र' : language === 'hi' ? 'ज़िला / कार्यक्षेत्र' : 'District & Region'}</th>
                    <th className="py-3 px-3">{language === 'mr' ? 'प्रतिनिधी व संपर्क' : language === 'hi' ? 'प्रतिनिधि एवं संपर्क' : 'Representative & Contact'}</th>
                    <th className="py-3 px-3">{language === 'mr' ? 'पडताळणी स्थिती' : language === 'hi' ? 'सत्यापन स्थिति' : 'Verification Status'}</th>
                    <th className="py-3 px-3 text-right">{language === 'mr' ? 'कृती' : language === 'hi' ? 'कार्रवाई' : 'Action'}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E2E8F0]">
                  {filteredAssociations.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="text-center py-8 text-[#64748B]">
                        {language === 'mr' ? 'कोणतीही संघटना आढळली नाही' : language === 'hi' ? 'कोई संगठन नहीं मिला' : 'No records found'}
                      </td>
                    </tr>
                  ) : (
                    filteredAssociations.map((a) => (
                      <tr key={a.id} className="hover:bg-[#F8FAFC] transition">
                        <td className="py-3 px-3 font-bold font-label text-[#136938]">
                          {a.referenceId}
                        </td>
                        <td className="py-3 px-3">
                          <span className="font-semibold text-[#111827] block">{a.associationName}</span>
                          <span className="text-[11px] text-[#64748B]">{a.associationType}</span>
                        </td>
                        <td className="py-3 px-3">
                          <span className="font-medium text-[#111827] block">{a.district}</span>
                          <span className="text-[11px] text-[#64748B]">{a.operatingRegion}</span>
                        </td>
                        <td className="py-3 px-3">
                          <span className="font-medium text-[#111827] block">
                            {a.representativeName} ({a.designation})
                          </span>
                          <span className="text-[11px] text-[#64748B]">{a.phone}</span>
                        </td>
                        <td className="py-3 px-3">
                          {renderStatusBadge(a.status)}
                        </td>
                        <td className="py-3 px-3 text-right">
                          <Button
                            variant="outlined"
                            size="sm"
                            onClick={() => {
                              setSelectedAssociation(a);
                              setAssociationStatusVal(a.status);
                              setAssociationNoteVal(a.internalNote || '');
                              setActionFeedback(null);
                            }}
                          >
                            {language === 'mr' ? 'पडताळणी' : language === 'hi' ? 'सत्यापित करें' : 'Verify'}
                          </Button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 5: EVENT REGISTRATIONS & MANAGEMENT */}
        {activeTab === 'events' && (
          <div className="bg-white rounded-2xl border border-[#E2E8F0] shadow-xs p-6 space-y-5">
            <div className="border-b border-[#E2E8F0] pb-3">
              <h3 className="text-base font-bold text-[#111827]">
                {language === 'mr' ? 'कार्यक्रम व उपक्रम उपस्थिती नोंदी (RSVPs)' : language === 'hi' ? 'कार्यक्रम एवं उपक्रम उपस्थिति प्रविष्टियां (RSVPs)' : 'Program RSVPs & Registrations'}
              </h3>
              <p className="text-xs text-[#64748B]">
                {language === 'mr'
                  ? 'उद्योग संवाद, उद्योग दर्शन आणि नीती मंथन साठी वापरकर्त्यांनी भरलेल्या थेट उपस्थिती नोंदी:'
                  : language === 'hi'
                  ? 'उद्योग संवाद, उद्योग दर्शन और नीति मंथन के लिए उपयोगकर्ताओं द्वारा दर्ज की गई उपस्थिति प्रविष्टियां:'
                  : 'Live participant registrations recorded through public event RSVP forms:'}
              </p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="bg-[#F8FAFC] text-[#475569] font-label uppercase text-[11px] border-b border-[#E2E8F0]">
                    <th className="py-3 px-3">{language === 'mr' ? 'नोंदणी संदर्भ' : language === 'hi' ? 'पंजीकरण संदर्भ' : 'Reg Reference'}</th>
                    <th className="py-3 px-3">{language === 'mr' ? 'कार्यक्रमाचे नाव' : language === 'hi' ? 'कार्यक्रम का नाम' : 'Event Title'}</th>
                    <th className="py-3 px-3">{language === 'mr' ? 'प्रवर्ग' : language === 'hi' ? 'श्रेणी' : 'Category'}</th>
                    <th className="py-3 px-3">{language === 'mr' ? 'सहभागी नाव व कंपनी' : language === 'hi' ? 'सहभागी नाम एवं कंपनी' : 'Participant & Enterprise'}</th>
                    <th className="py-3 px-3">{language === 'mr' ? 'जिल्हा' : language === 'hi' ? 'ज़िला' : 'District'}</th>
                    <th className="py-3 px-3">{language === 'mr' ? 'संपर्क' : language === 'hi' ? 'संपर्क' : 'Contact'}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E2E8F0]">
                  {eventRegistrations.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="text-center py-8 text-[#64748B]">
                        {language === 'mr'
                          ? 'अद्याप कोणतीही उपस्थिती नोंदणी झालेली नाही. चाचणीसाठी उद्योग संवाद किंवा उद्योग दर्शन पानावरून नोंदणी करा.'
                          : language === 'hi'
                          ? 'अभी तक कोई उपस्थिति पंजीकरण नहीं हुआ है। परीक्षण के लिए उद्योग संवाद या उद्योग दर्शन पृष्ठ से पंजीकरण करें।'
                          : 'No registrations submitted yet in this session. RSVP to any event to view it here.'}
                      </td>
                    </tr>
                  ) : (
                    eventRegistrations.map((reg) => (
                      <tr key={reg.id} className="hover:bg-[#F8FAFC] transition">
                        <td className="py-3 px-3 font-bold font-label text-[#E35914]">
                          {reg.referenceId}
                        </td>
                        <td className="py-3 px-3 font-medium text-[#111827]">
                          {reg.eventTitle}
                        </td>
                        <td className="py-3 px-3">
                          <span className="text-[11px] font-bold text-[#136938] bg-[#F0FDF4] px-2 py-0.5 rounded font-devanagari">
                            {reg.eventType}
                          </span>
                        </td>
                        <td className="py-3 px-3">
                          <span className="font-semibold text-[#111827] block">{reg.participantName}</span>
                          <span className="text-[11px] text-[#64748B]">{reg.businessName} ({reg.designation})</span>
                        </td>
                        <td className="py-3 px-3 text-[#475569]">
                          {reg.district}
                        </td>
                        <td className="py-3 px-3 text-[11px] text-[#475569]">
                          {reg.email} • {reg.phone}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* MODAL 1: Grievance Detail & Management */}
        {selectedGrievance && (
          <div className="fixed inset-0 z-50 bg-[#111827]/50 backdrop-blur-xs flex items-center justify-center p-4 modal-scroll-lock" data-lenis-prevent>
            <div className="bg-white rounded-2xl max-w-2xl w-full border border-[#E2E8F0] shadow-xl p-6 sm:p-8 relative max-h-[90vh] overflow-y-auto">
              <button
                onClick={() => setSelectedGrievance(null)}
                className="absolute top-4 right-4 p-2 text-[#94A3B8] hover:text-[#111827] rounded-lg cursor-pointer"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>

              <form onSubmit={handleSaveGrievanceUpdates} className="space-y-4">
                <div className="border-b border-[#E2E8F0] pb-3">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold font-label text-[#E35914]">
                      {selectedGrievance.referenceId}
                    </span>
                    {renderStatusBadge(selectedGrievance.status)}
                  </div>
                  <h3 className="text-lg font-bold text-[#111827] mt-1">
                    {selectedGrievance.subject}
                  </h3>
                  <p className="text-xs text-[#64748B]">
                    {selectedGrievance.businessName} • {selectedGrievance.district} ({selectedGrievance.locationArea})
                  </p>
                </div>

                <div className="bg-[#F8FAFC] p-3 rounded-xl border border-[#E2E8F0] text-xs space-y-1">
                  <span className="text-[#64748B] block font-bold uppercase text-[10px]">
                    {language === 'mr' ? 'वर्णन:' : language === 'hi' ? 'विवरण:' : 'Description:'}
                  </span>
                  <p className="text-[#334155]">{selectedGrievance.description}</p>
                </div>

                {/* Follow-ups view */}
                {selectedGrievance.followUps.length > 0 && (
                  <div className="bg-[#FFF7ED] p-3.5 rounded-xl border border-[#FFEDD5] text-xs space-y-1.5">
                    <div className="flex items-center gap-1.5 font-bold text-[#9A3412]">
                      <MessageSquare className="w-3.5 h-3.5" />
                      <span>
                        {language === 'mr'
                          ? 'तक्रारदाराकडून आलेला पाठपुरावा (Follow-ups):'
                          : language === 'hi'
                          ? 'शिकायतकर्ता से अनुवर्ती टिप्पणी (Follow-ups):'
                          : 'Follow-up Notes from Complainant:'}
                      </span>
                    </div>
                    {selectedGrievance.followUps.map((fu, i) => (
                      <div key={i} className="pl-3 border-l-2 border-[#E35914] text-[11px] text-[#475569]">
                        <span className="font-bold text-[#111827]">
                          {fu.followUpNumber === 1
                            ? language === 'mr' ? '१ला पाठपुरावा' : language === 'hi' ? '१ला अनुवर्ती' : '1st Follow-up'
                            : language === 'mr' ? '२रा पाठपुरावा' : language === 'hi' ? '२रा अनुवर्ती' : '2nd Follow-up'}:
                        </span>{' '}
                        "{fu.comment}" ({fu.author})
                      </div>
                    ))}
                  </div>
                )}

                {/* Admin Update Controls */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-[#475569] mb-1 font-label">
                      {language === 'mr' ? 'तक्रारीची स्थिती बदला' : language === 'hi' ? 'शिकायत की स्थिति बदलें' : 'Update Status'} *
                    </label>
                    <select
                      value={statusUpdateVal}
                      onChange={(e) => setStatusUpdateVal(e.target.value as GrievanceStatus)}
                      className="w-full text-xs p-2.5 rounded-lg border border-[#CBD5E1] bg-white font-devanagari focus:outline-none focus:border-[#E35914]"
                    >
                      <option value="Submitted">Submitted ({language === 'mr' ? 'नोंदवले' : language === 'hi' ? 'दर्ज' : 'Submitted'})</option>
                      <option value="Under Review">Under Review ({language === 'mr' ? 'तपासणी सुरू' : language === 'hi' ? 'समीक्षाधीन' : 'Under Review'})</option>
                      <option value="Assigned">Assigned ({language === 'mr' ? 'अधिकारी नियुक्त' : language === 'hi' ? 'अधिकारी नियुक्त' : 'Assigned'})</option>
                      <option value="Action in Progress">Action in Progress ({language === 'mr' ? 'कारवाई सुरू' : language === 'hi' ? 'कार्रवाई जारी' : 'Action in Progress'})</option>
                      <option value="Awaiting Information">Awaiting Information ({language === 'mr' ? 'माहिती अपेक्षित' : language === 'hi' ? 'जानकारी प्रतीक्षित' : 'Awaiting Information'})</option>
                      <option value="Resolved">Resolved ({language === 'mr' ? 'निवारण पूर्ण' : language === 'hi' ? 'निवारण पूर्ण' : 'Resolved'})</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-[#475569] mb-1 font-label">
                      {language === 'mr' ? 'नियुक्त अधिकारी / कक्ष' : language === 'hi' ? 'नियुक्त अधिकारी / कक्ष' : 'Assign Coordinator'}
                    </label>
                    <input
                      type="text"
                      value={assignCoordinatorVal}
                      onChange={(e) => setAssignCoordinatorVal(e.target.value)}
                      placeholder={language === 'mr' ? 'उदा. श्री. अनिरुद्ध जोशी (MIDC Desk)' : language === 'hi' ? 'उदा. श्री अनिरुद्ध जोशी (MIDC Desk)' : 'e.g. Mr. Aniruddha Joshi (MIDC Desk)'}
                      className="w-full text-xs p-2.5 rounded-lg border border-[#CBD5E1] bg-white font-devanagari focus:outline-none focus:border-[#E35914]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#475569] mb-1 font-label">
                    {language === 'mr' ? 'अंतर्गत प्रशासकीय नोंद किंवा टाईमलाईन अपडेट' : language === 'hi' ? 'आंतरिक प्रशासनिक टिप्पणी या समय-सारणी अपडेट' : 'Internal Note / Timeline Update'}
                  </label>
                  <textarea
                    rows={2}
                    value={adminNoteVal}
                    onChange={(e) => setAdminNoteVal(e.target.value)}
                    placeholder={language === 'mr' ? 'उदा. कार्यकारी अभियंत्यांना तातडीने पाहणीचे निर्देश दिले आहेत...' : language === 'hi' ? 'उदा. कार्यपालक अभियंता को तत्काल निरीक्षण के निर्देश दिए गए हैं...' : 'e.g. Executive Engineer directed to conduct inspection...'}
                    className="w-full text-xs p-2.5 rounded-lg border border-[#CBD5E1] bg-white font-devanagari focus:outline-none focus:border-[#E35914]"
                  />
                </div>

                {actionFeedback && (
                  <div className="text-xs text-[#136938] bg-[#F0FDF4] p-2.5 rounded border border-[#DCFCE7] flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>{actionFeedback}</span>
                  </div>
                )}

                <div className="pt-3 border-t border-[#E2E8F0] flex items-center justify-between">
                  <Link
                    to={`/track-complaint?ref=${selectedGrievance.referenceId}`}
                    target="_blank"
                    className="text-xs text-[#E35914] font-semibold hover:underline inline-flex items-center gap-1"
                  >
                    <span>{language === 'mr' ? 'पब्लिक ट्रॅकिंग पेज उघडा' : language === 'hi' ? 'सार्वजनिक ट्रैकिंग पृष्ठ खोलें' : 'Open Public Tracking Page'}</span>
                    <ExternalLink className="w-3 h-3" />
                  </Link>

                  <div className="flex gap-2">
                    <Button variant="secondary" size="sm" type="button" onClick={() => setSelectedGrievance(null)}>
                      {t.common.cancel}
                    </Button>
                    <Button variant="primary" size="sm" type="submit">
                      {language === 'mr' ? 'बदल जतन करा' : language === 'hi' ? 'परिवर्तन सहेजें' : 'Save Changes'}
                    </Button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* MODAL 2: Meeting Request Review */}
        {selectedMeeting && (
          <div className="fixed inset-0 z-50 bg-[#111827]/50 backdrop-blur-xs flex items-center justify-center p-4 modal-scroll-lock" data-lenis-prevent>
            <div className="bg-white rounded-2xl max-w-lg w-full border border-[#E2E8F0] shadow-xl p-6 sm:p-8 relative max-h-[90vh] overflow-y-auto">
              <button
                onClick={() => setSelectedMeeting(null)}
                className="absolute top-4 right-4 p-2 text-[#94A3B8] hover:text-[#111827] rounded-lg cursor-pointer"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>

              <form onSubmit={handleSaveMeetingUpdates} className="space-y-4">
                <div className="border-b border-[#E2E8F0] pb-3">
                  <span className="text-xs font-bold text-[#E35914] font-label">
                    {selectedMeeting.referenceId}
                  </span>
                  <h3 className="text-lg font-bold text-[#111827] mt-1">
                    {selectedMeeting.businessName}
                  </h3>
                  <p className="text-xs text-[#64748B]">
                    {selectedMeeting.representativeName} ({selectedMeeting.designation}) • {selectedMeeting.preferredLeader}
                  </p>
                </div>

                <div className="bg-[#F8FAFC] p-3 rounded-xl border border-[#E2E8F0] text-xs space-y-1">
                  <span className="text-[#64748B] block font-bold uppercase text-[10px]">
                    {language === 'mr' ? 'भेटीचा उद्देश:' : language === 'hi' ? 'भेंट का उद्देश्य:' : 'Purpose:'}
                  </span>
                  <p className="text-[#334155]">{selectedMeeting.meetingPurpose}</p>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#475569] mb-1 font-label">
                    {language === 'mr' ? 'भेट विनंती स्थिती' : language === 'hi' ? 'बैठक अनुरोध स्थिति' : 'Meeting Status'} *
                  </label>
                  <select
                    value={meetingDecisionVal}
                    onChange={(e) => setMeetingDecisionVal(e.target.value as MeetingRequestStatus)}
                    className="w-full text-xs p-2.5 rounded-lg border border-[#CBD5E1] bg-white font-devanagari focus:outline-none focus:border-[#E35914]"
                  >
                    <option value="Pending Review">Pending Review ({language === 'mr' ? 'पुनरावलोकन बाकी' : language === 'hi' ? 'समीक्षा लंबित' : 'Pending Review'})</option>
                    <option value="Under Review">Under Review ({language === 'mr' ? 'छाननी सुरू' : language === 'hi' ? 'समीक्षाधीन' : 'Under Review'})</option>
                    <option value="Approved">Approved ({language === 'mr' ? 'मंजूर - बैठक नियोजित' : language === 'hi' ? 'स्वीकृत - बैठक नियोजित' : 'Approved'})</option>
                    <option value="Declined">Declined ({language === 'mr' ? 'अस्वीकृत' : language === 'hi' ? 'अस्वीकृत' : 'Declined'})</option>
                    <option value="Scheduled">Scheduled ({language === 'mr' ? 'वेळ निश्चित' : language === 'hi' ? 'समय निर्धारित' : 'Scheduled'})</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#475569] mb-1 font-label">
                    {language === 'mr' ? 'निर्णय किंवा अंतर्गत टिप्पणी' : language === 'hi' ? 'निर्णय या आंतरिक टिप्पणी' : 'Decision Note'}
                  </label>
                  <textarea
                    rows={2}
                    value={meetingNoteVal}
                    onChange={(e) => setMeetingNoteVal(e.target.value)}
                    placeholder={language === 'mr' ? 'उदा. मुंबई येथील राज्यस्तरीय उद्योग मेळाव्यात शिष्टमंडळाला ५ मिनिटे वेळ देण्याचे प्रस्तावित...' : language === 'hi' ? 'उदा. मुंबई में राज्यस्तरीय उद्योग सम्मेलन में प्रतिनिधिमंडल को ५ मिनट का समय प्रस्तावित...' : 'e.g. 5 minutes slot proposed in state industrial conclave...'}
                    className="w-full text-xs p-2.5 rounded-lg border border-[#CBD5E1] bg-white font-devanagari focus:outline-none focus:border-[#E35914]"
                  />
                </div>

                {actionFeedback && (
                  <div className="text-xs text-[#136938] bg-[#F0FDF4] p-2.5 rounded border border-[#DCFCE7] flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>{actionFeedback}</span>
                  </div>
                )}

                <div className="pt-3 border-t border-[#E2E8F0] flex items-center justify-end gap-2">
                  <Button variant="secondary" size="sm" type="button" onClick={() => setSelectedMeeting(null)}>
                    {t.common.cancel}
                  </Button>
                  <Button variant="primary" size="sm" type="submit">
                    {language === 'mr' ? 'स्थिती अद्यतनित करा' : language === 'hi' ? 'स्थिति अपडेट करें' : 'Update Status'}
                  </Button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* MODAL 3: Association Verification */}
        {selectedAssociation && (
          <div className="fixed inset-0 z-50 bg-[#111827]/50 backdrop-blur-xs flex items-center justify-center p-4 modal-scroll-lock" data-lenis-prevent>
            <div className="bg-white rounded-2xl max-w-lg w-full border border-[#E2E8F0] shadow-xl p-6 sm:p-8 relative max-h-[90vh] overflow-y-auto">
              <button
                onClick={() => setSelectedAssociation(null)}
                className="absolute top-4 right-4 p-2 text-[#94A3B8] hover:text-[#111827] rounded-lg cursor-pointer"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>

              <form onSubmit={handleSaveAssociationUpdates} className="space-y-4">
                <div className="border-b border-[#E2E8F0] pb-3">
                  <span className="text-xs font-bold text-[#136938] font-label">
                    {selectedAssociation.referenceId}
                  </span>
                  <h3 className="text-lg font-bold text-[#111827] mt-1">
                    {selectedAssociation.associationName}
                  </h3>
                  <p className="text-xs text-[#64748B]">
                    {selectedAssociation.associationType} • {selectedAssociation.district} ({selectedAssociation.operatingRegion})
                  </p>
                </div>

                <div className="bg-[#F8FAFC] p-3 rounded-xl border border-[#E2E8F0] text-xs space-y-1">
                  <span className="text-[#64748B] block font-bold uppercase text-[10px]">
                    {language === 'mr' ? 'वर्णन:' : language === 'hi' ? 'विवरण:' : 'Description:'}
                  </span>
                  <p className="text-[#334155]">{selectedAssociation.description}</p>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#475569] mb-1 font-label">
                    {language === 'mr' ? 'पडताळणी स्थिती' : language === 'hi' ? 'सत्यापन स्थिति' : 'Verification Status'} *
                  </label>
                  <select
                    value={associationStatusVal}
                    onChange={(e) => setAssociationStatusVal(e.target.value as AssociationVerificationStatus)}
                    className="w-full text-xs p-2.5 rounded-lg border border-[#CBD5E1] bg-white font-devanagari focus:outline-none focus:border-[#E35914]"
                  >
                    <option value="Pending Verification">Pending Verification ({language === 'mr' ? 'पडताळणी बाकी' : language === 'hi' ? 'सत्यापन लंबित' : 'Pending Verification'})</option>
                    <option value="Under Review">Under Review ({language === 'mr' ? 'कागदपत्रे तपासणी सुरू' : language === 'hi' ? 'दस्तावेज़ समीक्षा जारी' : 'Under Review'})</option>
                    <option value="Verified">Verified ({language === 'mr' ? 'संलग्न व पडताळलेले' : language === 'hi' ? 'सत्यापित' : 'Verified'})</option>
                    <option value="Declined">Declined ({language === 'mr' ? 'नाकारलेले' : language === 'hi' ? 'अस्वीकृत' : 'Declined'})</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#475569] mb-1 font-label">
                    {language === 'mr' ? 'समन्वय नोंद' : language === 'hi' ? 'समन्वय टिप्पणी' : 'Internal Note'}
                  </label>
                  <textarea
                    rows={2}
                    value={associationNoteVal}
                    onChange={(e) => setAssociationNoteVal(e.target.value)}
                    placeholder={language === 'mr' ? 'उदा. संघटना पदाधिकाऱ्यांशी प्राथमिक चर्चा पूर्ण झाली...' : language === 'hi' ? 'उदा. संगठन पदाधिकारियों के साथ प्रारंभिक चर्चा संपन्न...' : 'e.g. Preliminary discussion with association officials complete...'}
                    className="w-full text-xs p-2.5 rounded-lg border border-[#CBD5E1] bg-white font-devanagari focus:outline-none focus:border-[#E35914]"
                  />
                </div>

                {actionFeedback && (
                  <div className="text-xs text-[#136938] bg-[#F0FDF4] p-2.5 rounded border border-[#DCFCE7] flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>{actionFeedback}</span>
                  </div>
                )}

                <div className="pt-3 border-t border-[#E2E8F0] flex items-center justify-end gap-2">
                  <Button variant="secondary" size="sm" type="button" onClick={() => setSelectedAssociation(null)}>
                    {t.common.cancel}
                  </Button>
                  <Button variant="green" size="sm" type="submit">
                    {language === 'mr' ? 'पडताळणी स्थिती जतन करा' : language === 'hi' ? 'सत्यापन स्थिति सहेजें' : 'Save Verification Status'}
                  </Button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
