import React, { useState } from 'react';
import {
  ArrowRight,
  ExternalLink,
  MapPin,
  ShieldAlert,
  TrendingUp,
  Lightbulb,
  CheckCircle2,
  Layers,
} from 'lucide-react';
import { useLanguage } from '../hooks/useLanguage';
import {
  INDUSTRIAL_JOURNEY_STEPS,
  TWO_PATHWAYS_DATA,
  UDYOG_TOPICS,
  LOCATION_PROCESS_STEPS,
  OFFICIAL_SOURCES,
} from '../data/industryContent';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { PageHeader } from '../components/ui/PageHeader';
import { SectionHeader } from '../components/ui/SectionHeader';
import { StatCard } from '../components/ui/StatCard';
import { CompactStepper } from '../components/ui/CompactStepper';
import { OfficialSourceLink } from '../components/ui/OfficialSourceLink';
import { Reveal } from '../components/animations/Reveal';
import { TiltCard } from '../components/animations/TiltCard';

const COPY = {
  mr: {
    eyebrow: 'उद्योग मार्गदर्शन व माहिती प्रणाली',
    title: 'उद्योग उभारण्यापासून विस्तारापर्यंत, प्रत्येक टप्प्यावर मार्गदर्शन',
    description:
      'नवीन उद्योग सुरू करण्यापासून ते विद्यमान उद्योगाच्या विस्तारापर्यंत, आवश्यक माहिती, प्रक्रिया आणि अधिकृत संसाधने एका ठिकाणी मिळवा.',
    statJourney: 'औद्योगिक प्रवास',
    statJourneySub: '७ प्रमुख प्रक्रिया टप्पे',
    statPathways: 'व्यवसाय मार्ग',
    statPathwaysSub: 'नवीन प्रकल्प व क्षमता विस्तार',
    statServices: 'मार्गदर्शक सेवा',
    statServicesSub: '७ मुख्य औद्योगिक क्षेत्रे',
    statAllotment: 'भूखंड वाटप',
    statAllotmentSub: 'MIDC MILAAP ५ टप्पे',
    journeyTitle: 'उद्योग उभारणीचा संपूर्ण प्रवास — ७ प्रमुख टप्पे',
    journeySubtitle:
      'संकल्पनेपासून ते विस्तारापर्यंतच्या प्रत्येक टप्प्यावरील अधिकृत मार्ग आणि सेवांची दिशा.',
    pathwaysHeading: 'तुमच्या व्यवसायाच्या सद्यस्थितीनुसार योग्य मार्ग निवडा',
    pathwaysSubheading:
      'नवीन उद्योग सुरू करत असताना किंवा सुरू असलेला उद्योग वाढवत असताना लागणाऱ्या सेवांचा तुलनात्मक अभ्यास करा.',
    servicesHeading: 'प्रमुख औद्योगिक सेवा व प्रक्रिया मार्गदर्शक',
    servicesSubheading:
      'शासकीय विभाग, परवाने, पायाभूत सुविधा आणि अनुपालनाविषयी सविस्तर माहिती.',
    locationStepperTitle: 'MIDC भूखंड वाटप प्रक्रिया — ५ मुख्य टप्पे',
    locationStepperSubtitle:
      'लँड बँक शोधण्यापासून प्रत्यक्ष ताबा मिळेपर्यंतची अधिकृत कार्यपद्धती.',
    audience: 'कोणासाठी उपयुक्त',
    documents: 'आवश्यक प्राथमिक कागदपत्रे',
    steps: 'अधिकृत कार्यपद्धती',
    sources: 'अधिकृत पोर्टल दुवे',
    disclaimer:
      'कागदपत्रे आणि प्रक्रिया अर्ज व उद्योग प्रकारानुसार बदलू शकतात. अंतिम निर्णय व छाननी संबंधित शासकीय विभागाकडे होते. अधिकृत पोर्टलवरील अद्ययावत नियमांची खात्री करावी.',
    switchNew: 'नवीन उद्योग सुरू करत आहात?',
    switchExisting: 'विद्यमान उद्योग चालवत आहात?',
    checkpointsLabel: 'या प्रवासातील महत्त्वाचे टप्पे:',
    exploreJourney: 'या टप्प्याचे सविस्तर तपशील पहा',
    allCategories: 'सर्व सेवा (७)',
    servicesGuideBtn: 'सेवा मार्गदर्शक',
    statJourneyValue: '७ टप्पे',
    statPathwaysValue: '२ मार्ग',
    statServicesValue: '७ क्षेत्रे',
    statAllotmentValue: '५ पावले',
    journeyEyebrow: 'प्रक्रिया प्रवाह • 7-STAGE INDUSTRIAL ROADMAP',
    pathwaysEyebrow: 'दोन व्यवसाय मार्ग • TWO BUSINESS PATHWAYS',
    allotmentEyebrow: 'औद्योगिक जागा प्रक्रिया • MIDC LAND ALLOTMENT',
    serviceDirEyebrow: 'सविस्तर सेवा वर्गवारी • SERVICE DIRECTORY',
    includedComponents: 'समाविष्ट घटक व परवाने:',
  },
  hi: {
    eyebrow: 'उद्योग मार्गदर्शन एवं सूचना प्रणाली',
    title: 'उद्योग स्थापित करने से लेकर विस्तार तक, हर चरण में मार्गदर्शन',
    description:
      'नया उद्योग शुरू करने से लेकर मौजूदा उद्योग के विस्तार तक, आवश्यक जानकारी, प्रक्रियाएं और आधिकारिक संसाधन एक ही स्थान पर प्राप्त करें।',
    statJourney: 'औद्योगिक यात्रा',
    statJourneySub: '७ मुख्य प्रक्रिया चरण',
    statPathways: 'व्यवसाय मार्ग',
    statPathwaysSub: 'नई इकाई एवं क्षमता विस्तार',
    statServices: 'मार्गदर्शक सेवाएं',
    statServicesSub: '७ प्रमुख औद्योगिक क्षेत्र',
    statAllotment: 'भूखंड आवंटन',
    statAllotmentSub: 'MIDC MILAAP ५ चरण',
    journeyTitle: 'उद्योग स्थापना की पूरी यात्रा — ७ प्रमुख चरण',
    journeySubtitle:
      'संकल्पना से विस्तार तक प्रत्येक चरण के लिए आधिकारिक निर्देश और सेवाओं का अवलोकन।',
    pathwaysHeading: 'अपने व्यवसाय की वर्तमान स्थिति के अनुसार सही मार्ग चुनें',
    pathwaysSubheading:
      'नया व्यवसाय शुरू करने या मौजूदा कारखाने का विस्तार करते समय आवश्यक सेवाओं का तुलनात्मक अध्ययन।',
    servicesHeading: 'प्रमुख औद्योगिक सेवाएं एवं प्रक्रिया मार्गदर्शिका',
    servicesSubheading:
      'सरकारी विभाग, लाइसेंस, बुनियादी ढांचे और अनुपालन से संबंधित विस्तृत विवरण।',
    locationStepperTitle: 'एमआईडीसी भूखंड आवंटन प्रक्रिया — ५ मुख्य चरण',
    locationStepperSubtitle:
      'लैंड बैंक खोज से लेकर प्रत्यक्ष कब्जा मिलने तक की आधिकारिक कार्यप्रणाली।',
    audience: 'किसके लिए उपयुक्त',
    documents: 'आवश्यक प्रारंभिक दस्तावेज',
    steps: 'आधिकारिक कार्यप्रणाली',
    sources: 'आधिकारिक पोर्टल लिंक',
    disclaimer:
      'दस्तावेज और प्रक्रियाएं आवेदन और उद्योग के प्रकार पर निर्भर करती हैं। अंतिम निर्णय संबंधित सरकारी विभाग द्वारा लिया जाता है। आधिकारिक पोर्टल पर नियमों की पुष्टि करें।',
    switchNew: 'नया व्यवसाय शुरू कर रहे हैं?',
    switchExisting: 'कार्यरत व्यवसाय चला रहे हैं?',
    checkpointsLabel: 'इस यात्रा के प्रमुख पड़ाव:',
    exploreJourney: 'इस चरण का विस्तृत विवरण देखें',
    allCategories: 'सभी सेवाएं (७)',
    servicesGuideBtn: 'सेवा मार्गदर्शिका',
    statJourneyValue: '७ चरण',
    statPathwaysValue: '२ मार्ग',
    statServicesValue: '७ क्षेत्र',
    statAllotmentValue: '५ कदम',
    journeyEyebrow: 'प्रक्रिया प्रवाह • 7-STAGE INDUSTRIAL ROADMAP',
    pathwaysEyebrow: 'दो व्यवसाय मार्ग • TWO BUSINESS PATHWAYS',
    allotmentEyebrow: 'औद्योगिक भूमि प्रक्रिया • MIDC LAND ALLOTMENT',
    serviceDirEyebrow: 'विस्तृत सेवा श्रेणियां • SERVICE DIRECTORY',
    includedComponents: 'शामिल घटक एवं लाइसेंस:',
  },
  en: {
    eyebrow: 'Industrial Guidance & Facilitation System',
    title: 'Guidance and official resources for every stage of your industrial journey',
    description:
      'From setting up a new business to expanding an existing operation, find verified information, standard procedures and official resources in one place.',
    statJourney: 'Industrial Journey',
    statJourneySub: '7 Connected Milestones',
    statPathways: 'Business Pathways',
    statPathwaysSub: 'Greenfield vs Expansion',
    statServices: 'Service Categories',
    statServicesSub: '7 Core Industrial Domains',
    statAllotment: 'Plot Allotment',
    statAllotmentSub: 'MIDC MILAAP 5 Steps',
    journeyTitle: 'The Complete Industrial Journey — 7 Key Stages',
    journeySubtitle:
      'A structured roadmap from business ideation to factory expansion with official references.',
    pathwaysHeading: 'Select the pathway matching your business stage',
    pathwaysSubheading:
      'Compare statutory workflows whether launching a greenfield unit or scaling an existing operating facility.',
    servicesHeading: 'Core Industrial Service Categories & Procedures',
    servicesSubheading:
      'In-depth guidance covering registrations, land allotment, infrastructure, compliances and dispute support.',
    locationStepperTitle: 'MIDC Plot Allotment Procedure — 5 Steps',
    locationStepperSubtitle:
      'Official workflow from land bank discovery to physical possession under MILAAP policy.',
    audience: 'Useful for',
    documents: 'Required primary documents',
    steps: 'Standard official process',
    sources: 'Official portal resources',
    disclaimer:
      'Document requirements and procedures vary by industry sector, scale and location. Final decisions and clearances rest with the responsible authorities. Confirm current regulations on official portals.',
    switchNew: 'Starting a new business?',
    switchExisting: 'Running an existing business?',
    checkpointsLabel: 'Key checkpoints in this journey:',
    exploreJourney: 'View detailed guidance for this stage',
    allCategories: 'All Services (7)',
    servicesGuideBtn: 'Services Guide',
    statJourneyValue: '7 Stages',
    statPathwaysValue: '2 Pathways',
    statServicesValue: '7 Domains',
    statAllotmentValue: '5 Steps',
    journeyEyebrow: 'ROADMAP PROCESS • 7-STAGE INDUSTRIAL ROADMAP',
    pathwaysEyebrow: 'TWO PATHWAYS • TWO BUSINESS PATHWAYS',
    allotmentEyebrow: 'LAND ALLOTMENT • MIDC LAND ALLOTMENT',
    serviceDirEyebrow: 'SERVICE DIRECTORY • SERVICE DIRECTORY',
    includedComponents: 'Included Components & Licenses:',
  },
} as const;

export const UdyogSaarthiPage: React.FC = () => {
  const { language } = useLanguage();
  const c = COPY[language];

  const [activeJourneyIdx, setActiveJourneyIdx] = useState(0);
  const [activePathway, setActivePathway] = useState<'new' | 'existing'>('new');
  const [selectedTopicId, setSelectedTopicId] = useState<string>('all');

  const pathwayData = TWO_PATHWAYS_DATA[activePathway];

  const journeyStepsData = INDUSTRIAL_JOURNEY_STEPS.map((step, idx) => ({
    id: step.id,
    stepNumber: idx + 1,
    title: step.title[language],
    subtitle: step.subtitle[language],
    description: step.description[language],
  }));

  const activeJourney = INDUSTRIAL_JOURNEY_STEPS[activeJourneyIdx];

  const filteredTopics =
    selectedTopicId === 'all'
      ? UDYOG_TOPICS
      : UDYOG_TOPICS.filter((t) => t.id === selectedTopicId);

  return (
    <div className="flex-1 bg-[#F8FAFC] font-devanagari text-[#111827]">
      <div className="mx-auto w-full max-w-[1560px] space-y-10 px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
        <Breadcrumbs
          items={[
            {
              label:
                language === 'mr'
                  ? 'उद्योग सारथी'
                  : language === 'hi'
                    ? 'उद्योग सारथी'
                    : 'Udyog Saarthi',
            },
          ]}
        />

        {/* Hero Header */}
        <PageHeader
          category={c.eyebrow}
          title={c.title}
          description={c.description}
          officialSource={{
            label: OFFICIAL_SOURCES.investorHub.label[language],
            href: OFFICIAL_SOURCES.investorHub.href,
          }}
          actions={
            <div className="flex flex-wrap items-center gap-3">
              <a
                href={OFFICIAL_SOURCES.landBank.href}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#136938] to-[#16a34a] px-4 py-2.5 text-xs sm:text-sm font-semibold text-white shadow-xs transition hover:from-[#0E532C] hover:to-[#136938] hover:shadow-sm"
              >
                <span>{OFFICIAL_SOURCES.landBank.label[language]}</span>
                <ExternalLink className="h-4 w-4" />
              </a>
              <a
                href="#services"
                className="inline-flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-xs sm:text-sm font-semibold text-slate-800 shadow-xs transition hover:border-[#E35914] hover:bg-[#FFF7ED] hover:text-[#E35914]"
              >
                <span>{c.servicesGuideBtn}</span>
                <ArrowRight className="h-4 w-4 text-[#E35914]" />
              </a>
            </div>
          }
        />

        {/* Metric Summary Bar */}
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
          <StatCard
            label={c.statJourney}
            value={c.statJourneyValue}
            subtext={c.statJourneySub}
            icon={<Lightbulb className="h-5 w-5" />}
            variant="primary"
          />
          <StatCard
            label={c.statPathways}
            value={c.statPathwaysValue}
            subtext={c.statPathwaysSub}
            icon={<TrendingUp className="h-5 w-5" />}
            variant="secondary"
          />
          <StatCard
            label={c.statServices}
            value={c.statServicesValue}
            subtext={c.statServicesSub}
            icon={<Layers className="h-5 w-5" />}
            variant="amber"
          />
          <StatCard
            label={c.statAllotment}
            value={c.statAllotmentValue}
            subtext={c.statAllotmentSub}
            icon={<MapPin className="h-5 w-5" />}
            variant="default"
          />
        </div>

        {/* 7-Step Industrial Journey Stepper */}
        <section aria-labelledby="journey-heading" className="space-y-4">
          <SectionHeader
            eyebrow={c.journeyEyebrow}
            title={c.journeyTitle}
            description={c.journeySubtitle}
          />

          <div className="relative overflow-hidden rounded-2xl border border-slate-200/80 bg-gradient-to-b from-white via-white to-slate-50/40 p-5 shadow-[0_12px_32px_-12px_rgba(15,23,42,0.06)] ring-1 ring-slate-900/[0.02] sm:p-7">
            {/* Precision top hairline accent */}
            <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-[#136938] via-[#F59E0B] to-[#E35914]" />
            <div className="pointer-events-none absolute inset-x-0 top-0 h-3 bg-gradient-to-r from-[#136938]/10 via-[#F59E0B]/10 to-[#E35914]/15 blur-xs" />

            <CompactStepper
              steps={journeyStepsData}
              activeStep={activeJourneyIdx}
              onStepClick={(idx) => setActiveJourneyIdx(idx)}
            />

            {/* Active Stage Executive Briefing Card */}
            <div
              key={activeJourneyIdx}
              className="mt-6 rounded-xl border border-slate-200/90 bg-white p-5 sm:p-6 shadow-xs animate-stage-fade"
            >
              <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
                <div className="flex items-start gap-4">
                  {/* Step Number Badge */}
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-slate-900 font-label text-sm font-bold text-white shadow-xs">
                    {String(activeJourneyIdx + 1).padStart(2, '0')}
                  </div>

                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-label text-[11px] font-bold uppercase tracking-wider text-[#E35914]">
                        {language === 'mr'
                          ? `टप्पा ${activeJourney.stepNumber} • चालू टप्पा`
                          : language === 'hi'
                            ? `चरण ${activeJourney.stepNumber} • सक्रिय चरण`
                            : `Step ${activeJourney.stepNumber} • Active Phase`}
                      </span>
                      <span className="text-slate-300">•</span>
                      <span className="text-xs text-slate-500 font-devanagari">
                        {language === 'mr'
                          ? 'अधिकृत औद्योगिक आराखडा'
                          : language === 'hi'
                            ? 'आधिकारिक औद्योगिक रूपरेखा'
                            : 'Official Industrial Framework'}
                      </span>
                    </div>

                    <h3 className="font-devanagari text-lg sm:text-xl font-bold text-slate-900">
                      {activeJourney.title[language]}
                    </h3>
                    <p className="font-devanagari text-xs sm:text-sm text-slate-600 leading-relaxed max-w-2xl">
                      {activeJourney.description[language]}
                    </p>
                  </div>
                </div>

                <div className="flex shrink-0 items-center gap-3 pt-1 lg:pt-0">
                  <a
                    href={`#${activeJourney.targetId}`}
                    className="inline-flex items-center gap-2 rounded-xl bg-[#E35914] px-4 py-2.5 text-xs sm:text-sm font-semibold text-white shadow-xs transition hover:bg-[#CC4D0E]"
                  >
                    <span>{c.exploreJourney}</span>
                    <ArrowRight className="h-4 w-4" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Two Business Pathways: Interactive Switch */}
        <section
          aria-labelledby="pathways-heading"
          className="space-y-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-xs sm:p-8"
        >
          <div className="flex flex-col gap-4 border-b border-slate-200 pb-6 md:flex-row md:items-end md:justify-between">
            <SectionHeader
              eyebrow={c.pathwaysEyebrow}
              title={c.pathwaysHeading}
              description={c.pathwaysSubheading}
            />

            {/* Pathway Switchers */}
            <div className="inline-flex shrink-0 rounded-xl bg-slate-100 p-1">
              <button
                type="button"
                onClick={() => setActivePathway('new')}
                className={`rounded-lg px-4 py-2 text-xs font-bold transition sm:text-sm ${
                  activePathway === 'new'
                    ? 'bg-[#E35914] text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {c.switchNew}
              </button>
              <button
                type="button"
                onClick={() => setActivePathway('existing')}
                className={`rounded-lg px-4 py-2 text-xs font-bold transition sm:text-sm ${
                  activePathway === 'existing'
                    ? 'bg-[#136938] text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {c.switchExisting}
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 items-center gap-6 lg:grid-cols-12">
            <div className="space-y-4 lg:col-span-5">
              <span className="inline-block rounded-full border border-orange-200 bg-orange-50 px-3 py-1 font-label text-xs font-bold text-[#E35914]">
                {pathwayData.badge[language]}
              </span>
              <h3 className="font-devanagari text-xl font-bold text-[#111827] sm:text-2xl">
                {pathwayData.title[language]}
              </h3>
              <p className="font-devanagari text-sm leading-relaxed text-slate-600">
                {pathwayData.description[language]}
              </p>
              <div>
                <a
                  href={activePathway === 'new' ? '#land' : '#expansion'}
                  className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#E35914] to-[#ea580c] px-4 py-2.5 text-xs font-semibold text-white shadow-xs transition hover:from-[#CC4D0E] hover:to-[#d9480f] sm:text-sm"
                >
                  <span>{c.exploreJourney}</span>
                  <ArrowRight className="h-4 w-4" />
                </a>
              </div>
            </div>

            <div className="space-y-3 rounded-xl border border-slate-200 bg-slate-50/70 p-5 sm:p-6 lg:col-span-7">
              <h4 className="flex items-center gap-2 font-label text-xs font-bold uppercase tracking-wider text-slate-800">
                <CheckCircle2 className="h-4 w-4 text-[#136938]" />
                {c.checkpointsLabel}
              </h4>
              <ul className="space-y-2.5">
                {pathwayData.checkpoints.map((cp, idx) => (
                  <li
                    key={idx}
                    className="flex items-start gap-2.5 font-devanagari text-xs text-slate-700 sm:text-sm"
                  >
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-emerald-200 bg-emerald-50 text-xs font-bold text-[#136938]">
                      ✓
                    </span>
                    <span>{cp[language]}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* MIDC Land Allotment Infographic Stepper */}
        <section
          id="land"
          aria-labelledby="allotment-process"
          className="space-y-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-xs sm:p-8"
        >
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <SectionHeader
              eyebrow={c.allotmentEyebrow}
              title={c.locationStepperTitle}
              description={c.locationStepperSubtitle}
            />
            <OfficialSourceLink
              label={OFFICIAL_SOURCES.landBank.label[language]}
              href={OFFICIAL_SOURCES.landBank.href}
              variant="badge"
            />
          </div>

          <div className="grid grid-cols-1 gap-4 pt-2 md:grid-cols-5">
            {LOCATION_PROCESS_STEPS.map((item) => (
              <div
                key={item.step}
                className="flex flex-col justify-between space-y-3 rounded-xl border border-slate-200 bg-slate-50/60 p-4 transition hover:border-[#136938] hover:bg-white"
              >
                <div>
                  <span className="mb-2 flex h-7 w-7 items-center justify-center rounded-lg bg-[#E35914] font-label text-xs font-bold text-white shadow-2xs">
                    {item.step}
                  </span>
                  <h3 className="font-devanagari text-sm font-bold text-[#111827]">
                    {item.title[language]}
                  </h3>
                  <p className="mt-1 font-devanagari text-xs leading-relaxed text-slate-600">
                    {item.desc[language]}
                  </p>
                </div>
                <div className="border-t border-slate-200 pt-2 font-label text-[11px] font-semibold text-[#136938]">
                  MIDC MILAAP २०२५
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Core 7 Industrial Service Categories with Filter and Expandable Cards */}
        <section id="services" aria-labelledby="categories-heading" className="space-y-4">
          <SectionHeader
            eyebrow={c.serviceDirEyebrow}
            title={c.servicesHeading}
            description={c.servicesSubheading}
          />

          {/* Quick Filter Category Pills */}
          <div className="flex flex-wrap items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
            <button
              type="button"
              onClick={() => setSelectedTopicId('all')}
              className={`rounded-lg px-3 py-1.5 font-devanagari text-xs font-semibold transition ${
                selectedTopicId === 'all'
                  ? 'bg-[#E35914] text-white shadow-xs'
                  : 'border border-slate-200 bg-white text-slate-600 hover:bg-slate-50'
              }`}
            >
              {c.allCategories}
            </button>
            {UDYOG_TOPICS.map((topic) => (
              <button
                key={topic.id}
                type="button"
                onClick={() => setSelectedTopicId(topic.id)}
                className={`rounded-lg px-3 py-1.5 font-devanagari text-xs font-semibold transition ${
                  selectedTopicId === topic.id
                    ? 'bg-[#E35914] text-white shadow-xs'
                    : 'border border-slate-200 bg-white text-slate-600 hover:bg-slate-50'
                }`}
              >
                {topic.title[language]}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 gap-5">
            {filteredTopics.map((topic, index) => (
              <Reveal key={topic.id} variant="fade-up" delay={index * 60} duration={450}>
                <TiltCard maxTilt={3} scale={1.01} glare={true} className="rounded-2xl">
                  <div
                    id={topic.id}
                    className="scroll-mt-24 rounded-2xl border border-slate-200/90 bg-white p-6 shadow-xs transition hover:border-slate-300 hover:shadow-md sm:p-7"
                  >
                <div className="space-y-5">
                  {/* Category Header */}
                  <div className="flex items-start gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-orange-200 bg-orange-50 font-label text-base font-bold text-[#E35914]">
                      {index + 1}
                    </div>
                    <div>
                      <h3 className="font-devanagari text-lg font-bold text-[#111827] sm:text-xl">
                        {topic.title[language]}
                      </h3>
                      <p className="mt-0.5 font-devanagari text-xs font-semibold text-[#E35914]">
                        {topic.subtitle[language]}
                      </p>
                      <p className="mt-2 font-devanagari text-xs leading-relaxed text-slate-600 sm:text-sm">
                        {topic.description[language]}
                      </p>
                    </div>
                  </div>

                  {/* Components and Sub-items */}
                  {topic.subItems && (
                    <div className="space-y-2 rounded-xl border border-slate-200 bg-slate-50/70 p-4">
                      <span className="block font-label text-[11px] font-bold uppercase tracking-wider text-slate-700">
                        {c.includedComponents}
                      </span>
                      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                        {topic.subItems.map((sub, sIdx) => (
                          <a
                            key={sIdx}
                            href={sub.source.href}
                            target="_blank"
                            rel="noreferrer"
                            className="group flex items-center justify-between rounded-lg border border-slate-200 bg-white p-2.5 text-xs text-slate-700 transition hover:border-[#136938]"
                          >
                            <div>
                              <span className="block font-semibold text-slate-900">
                                {sub.name}
                              </span>
                              <span className="text-[11px] text-slate-500">
                                {sub.note[language]}
                              </span>
                            </div>
                            <ExternalLink className="h-3.5 w-3.5 text-slate-400 group-hover:text-[#136938]" />
                          </a>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Audience & Documents Checklist */}
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div className="space-y-1 rounded-xl border border-slate-200 bg-white p-3.5 text-xs">
                      <span className="block font-label text-[11px] font-bold uppercase tracking-wider text-slate-900">
                        {c.audience}
                      </span>
                      <p className="font-devanagari text-slate-600 leading-relaxed">
                        {topic.audience[language]}
                      </p>
                    </div>
                    <div className="space-y-1 rounded-xl border border-slate-200 bg-white p-3.5 text-xs">
                      <span className="block font-label text-[11px] font-bold uppercase tracking-wider text-slate-900">
                        {c.documents}
                      </span>
                      <p className="font-devanagari text-slate-600 leading-relaxed">
                        {topic.documents[language]}
                      </p>
                    </div>
                  </div>

                  {/* Official Procedure Steps */}
                  <div className="space-y-2">
                    <span className="block font-label text-xs font-bold uppercase tracking-wider text-slate-900">
                      {c.steps}:
                    </span>
                    <ol className="space-y-1.5 text-xs text-slate-700">
                      {topic.steps.map((st, sIdx) => (
                        <li key={sIdx} className="flex items-start gap-2.5">
                          <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-emerald-100 font-label text-[10px] font-bold text-[#136938]">
                            {sIdx + 1}
                          </span>
                          <span className="font-devanagari">{st[language]}</span>
                        </li>
                      ))}
                    </ol>
                  </div>

                  {/* Verified Portal Sources */}
                  <div className="flex flex-wrap items-center gap-2 border-t border-slate-100 pt-4">
                    <span className="font-label text-[11px] font-bold text-slate-500">
                      {c.sources}:
                    </span>
                    {topic.sources.map((src, srcIdx) => (
                      <OfficialSourceLink
                        key={srcIdx}
                        label={src.label[language]}
                        href={src.href}
                        variant="badge"
                      />
                    ))}
                  </div>
                </div>
              </div>
            </TiltCard>
          </Reveal>
        ))}
          </div>
        </section>

        {/* Transparency Notice */}
        <div className="flex items-start gap-3 rounded-xl border border-amber-200 bg-amber-50/70 p-4 text-xs text-amber-900">
          <ShieldAlert className="mt-0.5 h-4 w-4 shrink-0 text-amber-700" />
          <p className="leading-relaxed">{c.disclaimer}</p>
        </div>
      </div>
    </div>
  );
};
