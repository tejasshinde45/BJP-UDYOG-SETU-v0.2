import React, { useState, useMemo } from 'react';
import {
  Download,
  ExternalLink,
  Search,
  ShieldAlert,
  FileSpreadsheet,
  CheckSquare,
  Globe,
  SlidersHorizontal,
} from 'lucide-react';
import { useLanguage } from '../hooks/useLanguage';
import {
  DPR_RESOURCES,
  DPR_PREPARATION_WORKFLOW,
  OFFICIAL_SOURCES,
  type DprResourceItem,
} from '../data/industryContent';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { PageHeader } from '../components/ui/PageHeader';
import { SectionHeader } from '../components/ui/SectionHeader';
import { StatCard } from '../components/ui/StatCard';
import { CompactStepper } from '../components/ui/CompactStepper';
import { ExpandableCard } from '../components/ui/ExpandableCard';
import { OfficialSourceLink } from '../components/ui/OfficialSourceLink';
import { Button } from '../components/ui/Button';
import { triggerConfetti } from '../components/animations/Confetti';
import { Reveal } from '../components/animations/Reveal';
import { downloadDprGuidancePdf } from '../utils/pdfGenerator';

const COPY = {
  mr: {
    eyebrow: 'प्रकल्प अहवाल व प्रपत्र प्रणाली',
    title: 'उद्योग प्रकल्पासाठी आवश्यक अहवाल, अर्ज आणि कागदपत्रांची माहिती',
    description:
      'प्रकल्प नियोजनापासून अर्ज प्रक्रियेपर्यंत आवश्यक कागदपत्रे आणि मार्गदर्शिका शोधा.',
    statCategories: 'दस्तऐवज वर्गवाऱ्या',
    statCategoriesSub: '१० वैधानिक व प्रकल्प श्रेणी',
    statWorkflow: 'तयारी कार्यप्रवाह',
    statWorkflowSub: '६ नियोजनबद्ध पायऱ्या',
    statFormats: 'साहित्य स्वरूप',
    statFormatsSub: 'मार्गदर्शन नमुना व चेकलिस्ट',
    statPortal: 'अधिकृत पोर्टल',
    statPortalSub: 'MAITRI 2.0 सिंगल विंडो',
    workflowHeading: 'दस्तऐवज तयारी कार्यप्रवाह — ६ पायऱ्या',
    workflowSubheading:
      'प्रकल्प कल्पनेपासून ते अधिकृत मंजुरी अर्जापर्यंतची नियोजनबद्ध पायरी-पायरी मार्गदर्शिका.',
    searchPlaceholder: 'दस्तऐवज, परवाना किंवा फॉर्म शोधा...',
    allCategories: 'सर्व १० वर्गवाऱ्या',
    purpose: 'उद्देश व व्याप्ती',
    audience: 'कोणासाठी उपयुक्त',
    information: 'तयार ठेवायची माहिती',
    instructions: 'तयारीच्या सूचना',
    sources: 'अधिकृत पोर्टल संदर्भ',
    downloadTemplate: 'मार्गदर्शन नमुना (PDF)',
    openPortal: 'अधिकृत पोर्टल उघडा',
    officialFormNotice:
      'महत्त्वाची नोंद: डाउनलोड नमुने हे उद्योग सेतूचे पूर्वतयारी मार्गदर्शन साहित्य आहेत; ते अधिकृत शासकीय फॉर्म किंवा मंजुरीचा पर्याय नाहीत. अंतिम अर्ज संबंधित शासकीय पोर्टलवरच (उदा. MAITRI 2.0 किंवा MIDC) सादर करावा.',
    formatBadge: 'स्वरूप',
    tagGuidance: 'मार्गदर्शन नमुना',
    tagPortal: 'शासकीय पोर्टल संदर्भ',
    tagChecklist: 'तपासणी सूची',
    tagFramework: 'नियामक आराखडा',
    noResults: 'कोणतेही जुळणारे दस्तऐवज आढळले नाहीत. कृपया शोध शब्द बदला.',
    stepPrefix: 'टप्पा',
    workflowEyebrow: 'प्रक्रिया प्रवाह • ६ पायऱ्यांची तयारी मार्गदर्शिका',
    stepBadge: 'DPR आराखडा',
    catalogEyebrow: 'दस्तऐवज निर्देशिका • दस्तऐवज सूची',
    catalogTitle: '१० औद्योगिक प्रपत्रे व प्रकल्प अहवाल संसाधने',
    statCategoriesValue: '१० वर्गवाऱ्या',
    statWorkflowValue: '६ पायऱ्या',
    statFormatsValue: 'नमुना / यादी',
    maitriPortalLabel: 'MAITRI 2.0 सिंगल विंडो',
    catalogJumpLabel: 'दस्तऐवज सूची',
  },
  hi: {
    eyebrow: 'परियोजना रिपोर्ट एवं प्रपत्र प्रणाली',
    title: 'उद्योग परियोजनाओं के लिए आवश्यक रिपोर्ट, आवेदन और दस्तावेजों की जानकारी',
    description:
      'परियोजना नियोजन से लेकर आवेदन प्रक्रिया तक आवश्यक दस्तावेज और मार्गदर्शिका खोजें।',
    statCategories: 'दस्तावेज श्रेणियां',
    statCategoriesSub: '10 वैधानिक व परियोजना श्रेणियां',
    statWorkflow: 'तैयारी कार्यप्रवाह',
    statWorkflowSub: '६ योजनाबद्ध चरण',
    statFormats: 'सामग्री प्रारूप',
    statFormatsSub: 'मार्गदर्शन प्रारूप व चेकलिस्ट',
    statPortal: 'आधिकारिक पोर्टल',
    statPortalSub: 'MAITRI 2.0 सिंगल विंडो',
    workflowHeading: 'दस्तावेज तैयारी कार्यप्रवाह — ६ चरण',
    workflowSubheading:
      'परियोजना विचार से लेकर आधिकारिक स्वीकृति आवेदन तक की चरणबद्ध मार्गदर्शिका।',
    searchPlaceholder: 'दस्तावेज, लाइसेंस या फॉर्म खोजें...',
    allCategories: 'सभी 10 श्रेणियां',
    purpose: 'उद्देश्य और दायरा',
    audience: 'किसके लिए उपयुक्त',
    information: 'तैयार रखने योग्य जानकारी',
    instructions: 'तैयारी के निर्देश',
    sources: 'आधिकारिक पोर्टल संदर्भ',
    downloadTemplate: 'मार्गदर्शन प्रारूप (PDF)',
    openPortal: 'आधिकारिक पोर्टल खोलें',
    officialFormNotice:
      'महत्वपूर्ण सूचना: डाउनलोड प्रारूप उद्योग सेतु की पूर्व-तैयारी मार्गदर्शन सामग्री हैं; वे आधिकारिक सरकारी फॉर्म या स्वीकृति का विकल्प नहीं हैं। अंतिम आवेदन संबंधित आधिकारिक पोर्टल (जैसे MAITRI 2.0 या MIDC) पर ही प्रस्तुत करें।',
    formatBadge: 'प्रारूप',
    tagGuidance: 'मार्गदर्शन प्रारूप',
    tagPortal: 'सरकारी पोर्टल संदर्भ',
    tagChecklist: 'जांच सूची',
    tagFramework: 'नियामक ढांचा',
    noResults: 'कोई मेल खाने वाला दस्तावेज़ नहीं मिला। कृपया खोज शब्द बदलें।',
    stepPrefix: 'चरण',
    workflowEyebrow: 'प्रक्रिया प्रवाह • ६ चरणों की तैयारी मार्गदर्शिका',
    stepBadge: 'DPR रूपरेखा',
    catalogEyebrow: 'दस्तावेज़ निर्देशिका • दस्तावेज़ सूची',
    catalogTitle: '10 औद्योगिक प्रपत्र और परियोजना रिपोर्ट संसाधन',
    statCategoriesValue: '10 श्रेणियां',
    statWorkflowValue: '6 चरण',
    statFormatsValue: 'प्रारूप / सूची',
    maitriPortalLabel: 'MAITRI 2.0 सिंगल विंडो',
    catalogJumpLabel: 'दस्तावेज़ सूची',
  },
  en: {
    eyebrow: 'Project Report & Statutory Forms Guide',
    title: 'Information on reports, applications and documents for industrial projects',
    description:
      'Find essential documentation guidance, preparation checklists and official portal links from project planning through final submission.',
    statCategories: 'Document Categories',
    statCategoriesSub: '10 Statutory & Project Classes',
    statWorkflow: 'Preparation Workflow',
    statWorkflowSub: '6 Sequential Stages',
    statFormats: 'Material Format',
    statFormatsSub: 'Guidance Templates & Checklists',
    statPortal: 'Statutory Portal',
    statPortalSub: 'MAITRI 2.0 Single Window',
    workflowHeading: 'Document Preparation Workflow — 6 Stages',
    workflowSubheading:
      'A methodical pathway from project ideation to formal submission on statutory single-window systems.',
    searchPlaceholder: 'Search reports, checklists, licences or forms...',
    allCategories: 'All 10 Categories',
    purpose: 'Purpose & Scope',
    audience: 'Who Should Use This',
    information: 'Information to Prepare',
    instructions: 'Preparation Instructions',
    sources: 'Official Portal Sources',
    downloadTemplate: 'Guidance Template (PDF)',
    openPortal: 'Open Official Portal',
    officialFormNotice:
      'Statutory Transparency Notice: Downloadable materials are Udyog Setu preparatory guidance templates, not government forms or approval substitutes. Official applications must be submitted directly through designated government portals (such as MAITRI 2.0 or MIDC).',
    formatBadge: 'Format',
    tagGuidance: 'Guidance Template',
    tagPortal: 'Official Portal Link',
    tagChecklist: 'Statutory Checklist',
    tagFramework: 'Regulatory Framework',
    noResults: 'No matching documents found. Please adjust your search criteria.',
    stepPrefix: 'Stage',
    workflowEyebrow: 'Preparation Workflow • 6-Stage Process',
    stepBadge: 'DPR Framework',
    catalogEyebrow: 'Document Directory • Resource Catalog',
    catalogTitle: '10 Industrial Forms & Project Report Resources',
    statCategoriesValue: '10 Categories',
    statWorkflowValue: '6 Stages',
    statFormatsValue: 'Templates / Lists',
    maitriPortalLabel: 'MAITRI 2.0 Single Window',
    catalogJumpLabel: 'Document Catalog',
  },
} as const;

export const DprFormsPage: React.FC = () => {
  const { language } = useLanguage();
  const c = COPY[language];

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeWorkflowStep, setActiveWorkflowStep] = useState(0);

  const workflowStepsData = DPR_PREPARATION_WORKFLOW.map((wf, idx) => ({
    id: wf.step,
    stepNumber: idx + 1,
    title: wf.title[language],
    subtitle: `${c.stepPrefix} ${wf.step}`,
    description: wf.desc[language],
  }));

  const filteredResources = useMemo(() => {
    return DPR_RESOURCES.filter((item) => {
      const matchCat =
        selectedCategory === 'all' || item.id === selectedCategory;
      const q = searchQuery.toLowerCase().trim();
      const matchSearch =
        !q ||
        item.title[language].toLowerCase().includes(q) ||
        item.purpose[language].toLowerCase().includes(q) ||
        item.information[language].toLowerCase().includes(q) ||
        item.categoryTag[language].toLowerCase().includes(q);
      return matchCat && matchSearch;
    });
  }, [selectedCategory, searchQuery, language]);

  const downloadTemplate = (resource: DprResourceItem) => {
    downloadDprGuidancePdf({
      id: resource.id,
      title: resource.title[language],
      titleEn: resource.title.en,
      category: resource.categoryTag[language],
      type: resource.type,
      formatLabel: resource.formatLabel[language],
      purpose: resource.purpose[language],
      purposeEn: resource.purpose.en,
      audience: resource.audience[language],
      audienceEn: resource.audience.en,
      information: resource.information[language],
      informationEn: resource.information.en,
      steps: resource.steps[language],
      stepsEn: resource.steps.en,
      sources: resource.sources.map((s) => ({
        label: s.label[language],
        href: s.href,
      })),
    });
    triggerConfetti();
  };

  const getBadgeType = (type: DprResourceItem['type']) => {
    switch (type) {
      case 'guidance_template':
        return {
          label: c.tagGuidance,
          color: 'text-[#E35914] bg-orange-50 border-orange-200',
        };
      case 'official_portal_form':
        return {
          label: c.tagPortal,
          color: 'text-[#136938] bg-emerald-50 border-emerald-200',
        };
      case 'checklist':
        return {
          label: c.tagChecklist,
          color: 'text-amber-800 bg-amber-50 border-amber-200',
        };
      default:
        return {
          label: c.tagFramework,
          color: 'text-slate-700 bg-slate-100 border-slate-200',
        };
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
                  ? 'DPR व प्रपत्रे'
                  : language === 'hi'
                    ? 'DPR और प्रपत्र'
                    : 'DPR & Forms',
            },
          ]}
        />

        {/* Hero Header */}
        <PageHeader
          category={c.eyebrow}
          title={c.title}
          description={c.description}
          officialSource={{
            label: OFFICIAL_SOURCES.guide.label[language],
            href: OFFICIAL_SOURCES.guide.href,
          }}
          actions={
            <div className="flex flex-wrap items-center gap-3">
              <a
                href={OFFICIAL_SOURCES.maitri.href}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#E35914] to-[#ea580c] px-4 py-2.5 text-xs sm:text-sm font-semibold text-white shadow-xs transition hover:from-[#CC4D0E] hover:to-[#d9480f] hover:shadow-sm"
              >
                <span>{c.maitriPortalLabel}</span>
                <ExternalLink className="h-4 w-4" />
              </a>
              <a
                href="#catalog"
                className="inline-flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-xs sm:text-sm font-semibold text-slate-800 shadow-xs transition hover:border-[#E35914] hover:bg-[#FFF7ED] hover:text-[#E35914]"
              >
                <span>{c.catalogJumpLabel}</span>
                <SlidersHorizontal className="h-4 w-4 text-[#E35914]" />
              </a>
            </div>
          }
        />

        {/* Metric Bar */}
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
          <StatCard
            label={c.statCategories}
            value={c.statCategoriesValue}
            subtext={c.statCategoriesSub}
            icon={<FileSpreadsheet className="h-5 w-5" />}
            variant="primary"
          />
          <StatCard
            label={c.statWorkflow}
            value={c.statWorkflowValue}
            subtext={c.statWorkflowSub}
            icon={<CheckSquare className="h-5 w-5" />}
            variant="secondary"
          />
          <StatCard
            label={c.statFormats}
            value={c.statFormatsValue}
            subtext={c.statFormatsSub}
            icon={<SlidersHorizontal className="h-5 w-5" />}
            variant="amber"
          />
          <StatCard
            label={c.statPortal}
            value="MAITRI"
            subtext={c.statPortalSub}
            icon={<Globe className="h-5 w-5" />}
            variant="default"
          />
        </div>

        {/* 6-Stage Document Preparation Stepper */}
        <section aria-labelledby="workflow-heading" className="space-y-4">
          <SectionHeader
            eyebrow={c.workflowEyebrow}
            title={c.workflowHeading}
            description={c.workflowSubheading}
          />

          <div className="relative overflow-hidden rounded-2xl border border-slate-200/80 bg-gradient-to-b from-white via-white to-slate-50/40 p-5 shadow-[0_12px_32px_-12px_rgba(15,23,42,0.06)] ring-1 ring-slate-900/[0.02] sm:p-7">
            {/* Precision top hairline accent */}
            <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-[#136938] via-[#F59E0B] to-[#E35914]" />
            <div className="pointer-events-none absolute inset-x-0 top-0 h-3 bg-gradient-to-r from-[#136938]/10 via-[#F59E0B]/10 to-[#E35914]/15 blur-xs" />

            <CompactStepper
              steps={workflowStepsData}
              activeStep={activeWorkflowStep}
              onStepClick={(idx) => setActiveWorkflowStep(idx)}
            />

            {/* Active Workflow Step Spotlight */}
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
                      {c.stepPrefix.toUpperCase()} {activeWorkflowStep + 1} • {c.stepBadge}
                    </span>
                  </div>
                  <h4 className="font-devanagari text-base font-bold text-slate-900 sm:text-lg">
                    {DPR_PREPARATION_WORKFLOW[activeWorkflowStep].title[language]}
                  </h4>
                  <p className="font-devanagari text-xs leading-relaxed text-slate-600 sm:text-sm max-w-2xl">
                    {DPR_PREPARATION_WORKFLOW[activeWorkflowStep].desc[language]}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Search & Filter Header */}
        <div id="catalog" className="space-y-4">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <SectionHeader
              eyebrow={c.catalogEyebrow}
              title={c.catalogTitle}
            />
            <div className="relative w-full sm:w-80">
              <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={c.searchPlaceholder}
                className="w-full rounded-xl border border-slate-200 bg-white py-2.5 pl-10 pr-4 font-devanagari text-xs text-slate-800 placeholder-slate-400 shadow-2xs transition focus:border-[#E35914] focus:outline-none focus:ring-2 focus:ring-[#E35914]/20 sm:text-sm"
              />
            </div>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
            <button
              type="button"
              onClick={() => setSelectedCategory('all')}
              className={`rounded-lg px-3 py-1.5 font-devanagari text-xs font-semibold transition ${
                selectedCategory === 'all'
                  ? 'bg-[#E35914] text-white shadow-xs'
                  : 'border border-slate-200 bg-white text-slate-600 hover:bg-slate-50'
              }`}
            >
              {c.allCategories}
            </button>
            {DPR_RESOURCES.map((res) => (
              <button
                key={res.id}
                type="button"
                onClick={() => setSelectedCategory(res.id)}
                className={`rounded-lg px-3 py-1.5 font-devanagari text-xs font-semibold transition ${
                  selectedCategory === res.id
                    ? 'bg-[#E35914] text-white shadow-xs'
                    : 'border border-slate-200 bg-white text-slate-600 hover:bg-slate-50'
                }`}
              >
                {res.categoryNumber}. {res.categoryTag[language]}
              </button>
            ))}
          </div>
        </div>

        {/* 10 Document Resource Cards with Progressive Disclosure */}
        <section aria-label="DPR Categories" className="space-y-4">
          {filteredResources.length === 0 ? (
            <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center text-xs text-slate-500">
              {c.noResults}
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-5">
              {filteredResources.map((res, idx) => {
                const badge = getBadgeType(res.type);
                return (
                  <Reveal key={res.id} variant="fade-up" delay={idx * 50} duration={400}>
                    <ExpandableCard
                      title={`${res.categoryNumber}. ${res.title[language]}`}
                    subtitle={res.categoryTag[language]}
                    badge={
                      <span
                        className={`rounded-full border px-2.5 py-0.5 font-label text-[10px] font-bold ${badge.color}`}
                      >
                        {badge.label}
                      </span>
                    }
                    summary={
                      <div className="mt-1 space-y-1.5">
                        <p className="font-devanagari text-xs text-slate-600 line-clamp-2">
                          <strong className="text-slate-800">{c.purpose}: </strong>
                          {res.purpose[language]}
                        </p>
                        <div className="flex flex-wrap items-center gap-3 pt-1">
                          <span className="rounded-md bg-slate-100 px-2 py-0.5 font-label text-[11px] text-slate-600">
                            {c.formatBadge}: {res.formatLabel[language]}
                          </span>
                          <span className="font-devanagari text-[11px] text-slate-500">
                            {c.audience}: {res.audience[language]}
                          </span>
                        </div>
                      </div>
                    }
                  >
                    <div className="space-y-4 pt-1">
                      {/* Deep details grid */}
                      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <div className="rounded-xl border border-slate-200 bg-white p-4">
                          <strong className="mb-1 block font-devanagari text-xs font-bold text-slate-900">
                            {c.information}:
                          </strong>
                          <p className="font-devanagari text-xs leading-relaxed text-slate-600">
                            {res.information[language]}
                          </p>
                        </div>
                        <div className="rounded-xl border border-slate-200 bg-white p-4">
                          <strong className="mb-1 block font-devanagari text-xs font-bold text-slate-900">
                            {c.instructions}:
                          </strong>
                          <p className="font-devanagari text-xs leading-relaxed text-slate-600">
                            {res.steps[language]}
                          </p>
                        </div>
                      </div>

                      {/* Official Sources */}
                      <div className="space-y-2">
                        <span className="block font-label text-[11px] font-bold uppercase tracking-wider text-slate-700">
                          {c.sources}:
                        </span>
                        <div className="flex flex-wrap gap-2">
                          {res.sources.map((src, i) => (
                            <OfficialSourceLink
                              key={i}
                              label={src.label[language]}
                              href={src.href}
                              variant="badge"
                            />
                          ))}
                        </div>
                      </div>

                      {/* Action buttons */}
                      <div className="flex flex-wrap items-center justify-between gap-3 border-t border-slate-200 pt-3">
                        <Button
                          type="button"
                          variant="outlined"
                          size="sm"
                          onClick={() => downloadTemplate(res)}
                          icon={<Download className="h-4 w-4 text-[#136938]" />}
                        >
                          {c.downloadTemplate}
                        </Button>

                        <a
                          href={res.sources[0]?.href || OFFICIAL_SOURCES.maitri.href}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1.5 font-devanagari text-xs font-bold text-[#136938] hover:underline"
                        >
                          <span>{c.openPortal}</span>
                          <ExternalLink className="h-3.5 w-3.5" />
                        </a>
                      </div>
                    </div>
                  </ExpandableCard>
                </Reveal>
              );
              })}
            </div>
          )}
        </section>

        {/* Transparency Disclaimer Notice */}
        <div className="flex items-start gap-3 rounded-xl border border-amber-200 bg-amber-50/70 p-4 text-xs text-amber-900">
          <ShieldAlert className="mt-0.5 h-4 w-4 shrink-0 text-amber-700" />
          <p className="leading-relaxed">{c.officialFormNotice}</p>
        </div>
      </div>
    </div>
  );
};
