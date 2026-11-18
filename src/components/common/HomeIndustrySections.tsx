import React from 'react';
import { Link } from 'react-router-dom';
import { BadgePercent, Building2, ContactRound, ExternalLink, FileText, Globe2, Handshake, MapPin, MessageSquareText, ShieldAlert, Users } from 'lucide-react';
import type { Language } from '../../types';
import { INDUSTRIAL_ADVANTAGES, INDUSTRIAL_REGIONS, FOCUS_SECTORS, INFRASTRUCTURE_CATEGORIES, POLICY_REFERENCES, OFFICIAL_SOURCES } from '../../data/industryContent';
import { Card } from '../ui/Card';
import { Reveal } from '../animations/Reveal';
import { TiltCard } from '../animations/TiltCard';

const ADVANTAGE_ICONS = [Users, Globe2, Building2, MessageSquareText];

export const IndustrialAdvantageSection: React.FC<{ language: Language }> = ({ language }) => {
  const title = language === 'mr' ? 'महाराष्ट्राची औद्योगिक ताकद' : language === 'hi' ? 'महाराष्ट्र की औद्योगिक क्षमता' : 'Maharashtra’s industrial advantage';
  const intro = language === 'mr' ? 'गुंतवणूक आणि उद्योग नियोजनासाठी उपयुक्त अधिकृत माहितीचे चार विषय.' : language === 'hi' ? 'निवेश और उद्योग योजना के लिए उपयोगी आधिकारिक जानकारी के चार विषय।' : 'Four areas of official information that can support investment and business planning.';
  return (
    <section className="border-y border-[#E2E8F0] bg-white py-12 sm:py-14">
      <div className="mx-auto w-full max-w-[1560px] px-4 sm:px-6 lg:px-8">
        <Reveal variant="fade-up" duration={500} className="mb-7 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="text-xl font-extrabold text-[#111827] sm:text-2xl">{title}</h2>
            <p className="mt-1 text-sm text-[#64748B]">{intro}</p>
          </div>
          <a href={OFFICIAL_SOURCES.aboutMidc.href} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#136938] hover:underline">
            {OFFICIAL_SOURCES.aboutMidc.label[language]}
            <ExternalLink className="h-4 w-4" />
          </a>
        </Reveal>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {INDUSTRIAL_ADVANTAGES.map((item, index) => {
            const Icon = ADVANTAGE_ICONS[index];
            return (
              <Reveal key={item.title.en} variant="fade-up" delay={index * 100} duration={500}>
                <TiltCard maxTilt={5} scale={1.02} glare={true} className="h-full rounded-2xl">
                  <Card className="h-full p-5 border-slate-200/90 shadow-xs hover:shadow-md transition-shadow">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#F0FDF4] text-[#136938]">
                      <Icon className="h-5 w-5" />
                    </div>
                    <h3 className="mt-3 font-bold text-[#111827]">{item.title[language]}</h3>
                    <p className="mt-2 text-sm text-[#64748B]">{item.body[language]}</p>
                  </Card>
                </TiltCard>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export const PrimaryModulesSection: React.FC<{ language: Language }> = ({ language }) => {
  const copy = {
    mr: { label: 'उद्योजकांसाठी सेवा', title: 'तुमच्या उद्योगासाठी पाच मुख्य मॉड्यूल', description: 'व्यवसायाच्या प्रवासातील मार्गदर्शन, योजना माहिती, कागदपत्रे, उद्योग संपर्क आणि डिजिटल ओळख एका ठिकाणी.', cta: 'अधिक जाणून घ्या' },
    hi: { label: 'उद्यमियों के लिए सेवाएं', title: 'आपके व्यवसाय के लिए पांच मुख्य मॉड्यूल', description: 'व्यवसाय यात्रा के लिए मार्गदर्शन, योजना जानकारी, दस्तावेज, उद्योग संपर्क और डिजिटल पहचान एक जगह।', cta: 'और जानें' },
    en: { label: 'Entrepreneur services', title: 'Five core modules for your business', description: 'Guidance, scheme information, documents, industry connections and a digital identity for each stage of business.', cta: 'Explore module' },
  }[language];
  const modules = [
    { to: '/udyog-saarthi', title: { mr: 'उद्योग सारथी', hi: 'उद्योग सारथी', en: 'Udyog Saarthi' }, desc: { mr: 'नवीन उद्योगापासून विस्तारापर्यंत मार्गदर्शन.', hi: 'नए व्यवसाय से विस्तार तक मार्गदर्शन।', en: 'Guidance from business setup through expansion.' }, Icon: Building2, color: 'text-[#E35914] bg-[#FFF7ED]' },
    { to: '/subsidy-mentor', title: { mr: 'सब्सिडी मेंटर', hi: 'सब्सिडी मेंटर', en: 'Subsidy Mentor' }, desc: { mr: 'औद्योगिक धोरणे आणि प्रोत्साहन योजनांचे संदर्भ.', hi: 'औद्योगिक नीतियों और प्रोत्साहन योजनाओं के संदर्भ।', en: 'References to industrial policies and incentive schemes.' }, Icon: BadgePercent, color: 'text-[#136938] bg-[#F0FDF4]' },
    { to: '/dpr-forms', title: { mr: 'DPR व प्रपत्रे', hi: 'DPR और फॉर्म', en: 'DPR & Forms' }, desc: { mr: 'प्रकल्प अहवाल, अर्ज व तयारी तपासणी सूची.', hi: 'परियोजना रिपोर्ट, आवेदन और तैयारी जांच सूची।', en: 'Project reports, applications and preparation checklists.' }, Icon: FileText, color: 'text-[#B45309] bg-[#FFFBEB]' },
    { to: '/udyog-setu-b2b', title: { mr: 'उद्योग सेतू B2B', hi: 'उद्योग सेतु B2B', en: 'Udyog Setu B2B' }, desc: { mr: 'पुरवठादार, उत्पादक, खरेदी आणि उद्योग संघटना.', hi: 'आपूर्तिकर्ता, निर्माता, खरीद और औद्योगिक संगठन।', en: 'Suppliers, manufacturers, procurement and associations.' }, Icon: Handshake, color: 'text-[#136938] bg-[#F0FDF4]' },
    { to: '/digital-card', title: { mr: 'डिजिटल कार्ड', hi: 'डिजिटल कार्ड', en: 'Digital Card' }, desc: { mr: 'व्यवसाय प्रोफाइल तयार करा आणि शेअर करा.', hi: 'व्यवसाय प्रोफ़ाइल बनाएं और साझा करें।', en: 'Create and share a business profile.' }, Icon: ContactRound, color: 'text-[#E35914] bg-[#FFF7ED]' },
  ];
  return (
    <section className="bg-[#F8FAFC] py-16">
      <div className="mx-auto w-full max-w-[1560px] px-4 sm:px-6 lg:px-8">
        <Reveal variant="fade-up" duration={500} className="mx-auto mb-10 max-w-3xl space-y-2 text-center">
          <span className="inline-block rounded-full bg-[#FFF7ED] px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-[#E35914] border border-[#FFEDD5]">
            {copy.label}
          </span>
          <h2 className="text-2xl font-extrabold text-[#111827] sm:text-3xl">{copy.title}</h2>
          <p className="text-sm text-[#64748B]">{copy.description}</p>
        </Reveal>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-5">
          {modules.map(({ to, title, desc, Icon, color }, idx) => (
            <Reveal key={to} variant="fade-up" delay={idx * 100} duration={500}>
              <TiltCard maxTilt={6} scale={1.02} glare={true} className="h-full rounded-2xl">
                <Card hoverEffect className="flex h-full flex-col justify-between p-5 border-slate-200/90 shadow-xs hover:shadow-lg transition-all">
                  <div>
                    <span className={`flex h-11 w-11 items-center justify-center rounded-xl shadow-2xs ${color}`}>
                      <Icon className="h-5 w-5" />
                    </span>
                    <h3 className="mt-4 text-lg font-bold text-[#111827]">{title[language]}</h3>
                    <p className="mt-2 text-sm text-[#64748B] leading-relaxed">{desc[language]}</p>
                  </div>
                  <Link to={to} className="mt-5 inline-flex items-center gap-2 border-t border-[#E2E8F0] pt-4 text-sm font-semibold text-[#E35914] hover:text-[#CC4D0E] transition-colors">
                    {copy.cta}
                    <ExternalLink className="h-4 w-4" />
                  </Link>
                </Card>
              </TiltCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export const IndustryReferenceSection: React.FC<{ language: Language }> = ({ language }) => {
  const copy = {
    mr: { eyebrow: 'एमआयडीसी संदर्भ', title: 'महाराष्ट्रातील औद्योगिक प्रदेश व संसाधने', regions: 'प्रमुख औद्योगिक प्रदेश', sectors: 'प्रमुख उद्योग क्षेत्रे', infrastructure: 'औद्योगिक पायाभूत सुविधा', policies: 'औद्योगिक धोरणे व प्रोत्साहने', services: 'उद्योजकांसाठी उपयुक्त सेवा', about: 'प्रदेश व एमआयडीसी माहिती', serviceDesc: 'ऑनलाइन सेवा, कायदे, अर्ज, नागरिक सनद व सूचना यांसाठी अधिकृत पोर्टल तपासा.', note: 'या विभागातील माहिती एमआयडीसीच्या अधिकृत Investor Hub, About MIDC आणि policy pages वरून संदर्भित आहे. उपलब्धता व नियम बदलू शकतात.', niti: 'नीती मंथन — धोरण चर्चा व उद्योग विकास', nitiDesc: 'उद्योगविषयक सूचना व धोरण चर्चा सादर करण्यासाठी समर्पित व्यासपीठ.', go: 'अधिकृत स्रोत उघडा' },
    hi: { eyebrow: 'एमआईडीसी संदर्भ', title: 'महाराष्ट्र के औद्योगिक क्षेत्र और संसाधन', regions: 'प्रमुख औद्योगिक क्षेत्र', sectors: 'प्रमुख उद्योग क्षेत्र', infrastructure: 'औद्योगिक बुनियादी ढांचा', policies: 'औद्योगिक नीतियां और प्रोत्साहन', services: 'उद्यमियों के लिए उपयोगी सेवाएं', about: 'क्षेत्र और एमआईडीसी जानकारी', serviceDesc: 'ऑनलाइन सेवाओं, कानूनों, आवेदनों, नागरिक चार्टर और सूचनाओं के लिए आधिकारिक पोर्टल देखें।', note: 'इस अनुभाग के संदर्भ एमआईडीसी के आधिकारिक Investor Hub, About MIDC और policy pages से हैं। उपलब्धता और नियम बदल सकते हैं।', niti: 'नीति मंथन — नीति चर्चा और उद्योग विकास', nitiDesc: 'उद्योग सुझाव और नीति चर्चा प्रस्तुत करने के लिए समर्पित मंच।', go: 'आधिकारिक स्रोत खोलें' },
    en: { eyebrow: 'MIDC references', title: 'Industrial regions and resources in Maharashtra', regions: 'Industrial regions', sectors: 'Focus sectors', infrastructure: 'Industrial infrastructure', policies: 'Industrial policies and incentives', services: 'Useful resources for entrepreneurs', about: 'Regions and MIDC information', serviceDesc: 'Use official portals for online services, laws, applications, citizen charters and notices.', note: 'References in this section come from MIDC’s official Investor Hub, About MIDC and policy pages. Availability and rules may change.', niti: 'Niti Manthan — policy discussions and industry development', nitiDesc: 'A collaborative platform for submitting industry suggestions and policy discussions.', go: 'Open official source' },
  }[language];
  const serviceItems = [
    { title: { mr: 'व्यवसाय सुलभता', hi: 'व्यवसाय सुगमता', en: 'Ease of doing business' }, source: OFFICIAL_SOURCES.informationEnablers },
    { title: { mr: 'एकखिडकी सेवा', hi: 'सिंगल-विंडो सेवा', en: 'Single-window service' }, source: OFFICIAL_SOURCES.maitri },
    { title: { mr: 'कायदे व नियम', hi: 'कानून और नियम', en: 'Acts and regulations' }, source: OFFICIAL_SOURCES.informationEnablers },
    { title: { mr: 'नागरिक सनद', hi: 'नागरिक चार्टर', en: 'Citizen charter' }, source: OFFICIAL_SOURCES.informationEnablers },
    { title: { mr: 'परिपत्रके व सूचना', hi: 'परिपत्र और सूचनाएं', en: 'Circulars and notices' }, source: OFFICIAL_SOURCES.notices },
    { title: { mr: 'अर्ज, सेवा व स्थिती', hi: 'आवेदन, सेवा और स्थिति', en: 'Applications, services and status' }, source: OFFICIAL_SOURCES.aapleSarkar },
    { title: { mr: 'पायाभूत सेवा व साधने', hi: 'बुनियादी सेवाएं और संसाधन', en: 'Infrastructure services and resources' }, source: OFFICIAL_SOURCES.infrastructure },
    { title: { mr: 'लोकसेवा तक्रार व अपील', hi: 'लोक सेवा शिकायत और अपील', en: 'Public service grievance and appeal' }, source: OFFICIAL_SOURCES.rts },
  ];
  return (
    <section id="ecosystem" className="border-t border-[#E2E8F0] bg-white py-16">
      <div className="mx-auto w-full max-w-[1560px] space-y-8 px-4 sm:px-6 lg:px-8">
        <Reveal variant="fade-up" duration={500} className="max-w-3xl space-y-2">
          <span className="inline-block rounded-full border border-[#DCFCE7] bg-[#F0FDF4] px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-[#136938]">
            {copy.eyebrow}
          </span>
          <h2 className="text-2xl font-extrabold text-[#111827] sm:text-3xl">{copy.title}</h2>
          <p className="text-sm text-[#475569]">{copy.note}</p>
        </Reveal>
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
          <Reveal variant="fade-up" delay={50} duration={500}>
            <Card className="p-5 sm:p-6 shadow-xs hover:shadow-md transition-shadow">
              <div className="flex items-center gap-2">
                <MapPin className="h-5 w-5 text-[#E35914]" />
                <h3 className="text-lg font-bold">{copy.regions}</h3>
              </div>
              <div className="mt-4 grid gap-2 sm:grid-cols-2">
                {INDUSTRIAL_REGIONS.map((region) => (
                  <div key={region.name.en} className="rounded-lg border border-[#E2E8F0] bg-[#F8FAFC] px-3 py-2 text-sm text-[#334155] transition hover:border-[#E35914]/30">
                    <div className="font-semibold">{region.name[language]}</div>
                    <div className="text-xs text-[#64748B] mt-0.5">{region.focus[language]}</div>
                  </div>
                ))}
              </div>
              <a href={OFFICIAL_SOURCES.aboutMidc.href} target="_blank" rel="noreferrer" className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-[#136938] hover:underline">
                {copy.about}
                <ExternalLink className="h-4 w-4" />
              </a>
            </Card>
          </Reveal>
          <Reveal variant="fade-up" delay={150} duration={500}>
            <Card className="p-5 sm:p-6 shadow-xs hover:shadow-md transition-shadow">
              <div className="flex items-center gap-2">
                <Building2 className="h-5 w-5 text-[#136938]" />
                <h3 className="text-lg font-bold">{copy.sectors}</h3>
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                {FOCUS_SECTORS.map((sector) => (
                  <span key={sector.name.en} className="rounded-full border border-[#E2E8F0] bg-[#F8FAFC] px-3 py-1.5 text-xs text-[#475569] transition hover:border-[#136938]/30 hover:bg-[#F0FDF4]">
                    {sector.name[language]}
                  </span>
                ))}
              </div>
              <a href="https://midc.maharashtra.gov.in/en/focus-sectors/" target="_blank" rel="noreferrer" className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-[#136938] hover:underline">
                {copy.go}
                <ExternalLink className="h-4 w-4" />
              </a>
            </Card>
          </Reveal>
          <Reveal variant="fade-up" delay={100} duration={500}>
            <Card className="p-5 sm:p-6 shadow-xs hover:shadow-md transition-shadow">
              <div className="flex items-center gap-2">
                <Building2 className="h-5 w-5 text-[#136938]" />
                <h3 className="text-lg font-bold">{copy.infrastructure}</h3>
              </div>
              <div className="mt-4 grid gap-2 sm:grid-cols-2">
                {INFRASTRUCTURE_CATEGORIES.map((item) => (
                  <div key={item.name.en} className="rounded-lg bg-[#F8FAFC] p-3 text-xs text-[#475569] border border-slate-100">
                    <span className="font-bold block text-[#111827]">{item.name[language]}</span>
                    <span className="text-[11px] text-[#64748B]">{item.desc[language]}</span>
                  </div>
                ))}
              </div>
              <a href={OFFICIAL_SOURCES.infrastructure.href} target="_blank" rel="noreferrer" className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-[#136938] hover:underline">
                {copy.go}
                <ExternalLink className="h-4 w-4" />
              </a>
            </Card>
          </Reveal>
          <Reveal variant="fade-up" delay={200} duration={500}>
            <Card className="p-5 sm:p-6 shadow-xs hover:shadow-md transition-shadow">
              <h3 className="text-lg font-bold">{copy.policies}</h3>
              <div className="mt-3 max-h-64 space-y-2 overflow-y-auto pr-1">
                {POLICY_REFERENCES.slice(0, 11).map((policy) => (
                  <a key={policy.title.en} href={policy.href} target="_blank" rel="noreferrer" className="flex items-start justify-between gap-2 rounded-lg border border-[#E2E8F0] px-3 py-2 text-sm text-[#475569] hover:bg-[#F8FAFC] hover:border-[#136938]/30 transition">
                    <span>{policy.title[language]}</span>
                    <ExternalLink className="mt-0.5 h-4 w-4 shrink-0 text-[#136938]" />
                  </a>
                ))}
              </div>
              <p className="mt-3 text-xs text-[#64748B]">{copy.note}</p>
            </Card>
          </Reveal>
        </div>
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
          <Reveal variant="fade-up" delay={100} duration={500}>
            <Card className="p-5 sm:p-6 shadow-xs hover:shadow-md transition-shadow">
              <h3 className="text-lg font-bold">{copy.services}</h3>
              <p className="mt-1 text-sm text-[#64748B]">{copy.serviceDesc}</p>
              <div className="mt-4 grid gap-2 sm:grid-cols-2">
                {serviceItems.map((item) => (
                  <a key={item.title.en} href={item.source.href} target="_blank" rel="noreferrer" className="flex items-start justify-between gap-2 rounded-lg border border-[#E2E8F0] p-3 text-sm text-[#475569] hover:bg-[#F8FAFC] hover:border-[#E35914]/30 transition">
                    <span>{item.title[language]}</span>
                    <ExternalLink className="mt-0.5 h-4 w-4 shrink-0 text-[#136938]" />
                  </a>
                ))}
              </div>
            </Card>
          </Reveal>
          <Reveal variant="fade-up" delay={150} duration={500}>
            <Card className="flex flex-col justify-between p-5 sm:p-6 shadow-xs hover:shadow-md transition-shadow">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#B45309]">{language === 'mr' ? 'उद्योग सहभाग' : language === 'hi' ? 'उद्योग सहभागिता' : 'Industry engagement'}</span>
                <h3 className="mt-2 text-lg font-bold">{copy.niti}</h3>
                <p className="mt-2 text-sm text-[#64748B] leading-relaxed">{copy.nitiDesc}</p>
              </div>
              <Link to="/niti-manthan" className="mt-5 inline-flex w-fit items-center gap-2 rounded-lg border border-[#CBD5E1] px-4 py-2 text-sm font-semibold text-[#136938] hover:bg-[#F0FDF4] transition">
                {language === 'mr' ? 'विभाग उघडा' : language === 'hi' ? 'अनुभाग खोलें' : 'Open section'}
                <ExternalLink className="h-4 w-4" />
              </Link>
            </Card>
          </Reveal>
        </div>
        <div className="flex items-start gap-2 rounded-lg bg-[#F8FAFC] p-3 text-xs text-[#64748B] border border-slate-200">
          <ShieldAlert className="mt-0.5 h-4 w-4 shrink-0 text-[#B45309]" />
          {copy.note}
        </div>
      </div>
    </section>
  );
};
