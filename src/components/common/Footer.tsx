import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../hooks/useLanguage';
import { Building2, ExternalLink } from 'lucide-react';
import { OFFICIAL_SOURCES } from '../../data/industryContent';

export const Footer: React.FC = () => {
  const { language, t } = useLanguage();
  const label = language === 'mr' ? 'प्रमुख मॉड्यूल' : language === 'hi' ? 'मुख्य मॉड्यूल' : 'Primary modules';
  const features = language === 'mr' ? 'उद्योग संवाद व सेवा' : language === 'hi' ? 'उद्योग संवाद और सेवाएं' : 'Industry dialogue and services';
  const resources = language === 'mr' ? 'अधिकृत माहिती स्रोत' : language === 'hi' ? 'आधिकारिक सूचना स्रोत' : 'Official information sources';
  const disclaimer = language === 'mr'
    ? 'उद्योग सेतू हे स्वतंत्र माहिती व मार्गदर्शनाचे व्यासपीठ आहे; हे शासकीय किंवा MIDC पोर्टल नाही.'
    : language === 'hi'
      ? 'उद्योग सेतु स्वतंत्र सूचना और मार्गदर्शन का मंच है; यह आधिकारिक सरकारी या MIDC पोर्टल नहीं है।'
      : 'Udyog Setu is an independent industrial information and guidance platform; not an official government or MIDC portal.';

  const primaryLinks = [
    ['/udyog-saarthi', t.nav.udyogSaarthi],
    ['/subsidy-mentor', t.nav.subsidyMentor],
    ['/dpr-forms', t.nav.dprForms],
    ['/udyog-setu-b2b', t.nav.b2b],
    ['/digital-card', t.nav.digitalCard],
  ];
  const supportingLinks = [
    ['/udyog-samvaad', t.nav.samvaad],
    ['/udyog-darshan', t.nav.darshan],
    ['/grievance', t.nav.grievance],
    ['/track-complaint', t.nav.trackComplaint],
    ['/meeting-request', t.nav.meetingRequest],
    ['/association-registration', t.nav.associationReg],
    ['/niti-manthan', t.nav.nitiManthan],
    ['/events', t.nav.events],
    ['/admin', t.nav.admin],
  ];

  return (
    <footer className="mt-auto border-t border-[#E2E8F0] bg-[#F8FAFC] font-devanagari text-sm text-[#475569]">
      <div className="mx-auto w-full max-w-[1560px] px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-3"><div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#E35914] text-white shadow-xs"><Building2 className="h-5 w-5" /></div><span className="text-lg font-bold text-[#111827]">{t.nav.brand}</span></Link>
            <p className="text-xs leading-relaxed text-[#64748B]">{disclaimer}</p>
          </div>
          <div>
            <h4 className="mb-4 text-xs font-semibold uppercase tracking-wider text-[#111827] font-label">{label}</h4>
            <ul className="space-y-2 text-xs text-[#64748B]">{primaryLinks.map(([to, title]) => <li key={to}><Link to={to} className="transition hover:text-[#E35914]">{title}</Link></li>)}</ul>
          </div>
          <div>
            <h4 className="mb-4 text-xs font-semibold uppercase tracking-wider text-[#111827] font-label">{features}</h4>
            <ul className="space-y-2 text-xs text-[#64748B]">{supportingLinks.map(([to, title]) => <li key={to}><Link to={to} className="transition hover:text-[#E35914]">{title}</Link></li>)}</ul>
          </div>
          <div>
            <h4 className="mb-4 text-xs font-semibold uppercase tracking-wider text-[#111827] font-label">{resources}</h4>
            <ul className="space-y-3 text-xs text-[#64748B]">{[OFFICIAL_SOURCES.investorHub, OFFICIAL_SOURCES.guide, OFFICIAL_SOURCES.policies, OFFICIAL_SOURCES.infrastructure, OFFICIAL_SOURCES.maitri].map((source) => <li key={source.href}><a href={source.href} target="_blank" rel="noreferrer" className="inline-flex items-start gap-1.5 transition hover:text-[#136938]"><span>{source.label[language]}</span><ExternalLink className="mt-0.5 h-3 w-3 shrink-0" /></a></li>)}</ul>
          </div>
        </div>
      </div>
      <div className="border-t border-[#E2E8F0] bg-white px-4 py-5 text-xs text-[#64748B] sm:px-6 lg:px-8">
        <div className="mx-auto flex w-full max-w-[1560px] flex-col items-center justify-between gap-2 sm:flex-row">
          <span>© 2026 {t.nav.brand}</span>
          <span className="font-medium text-[#136938]">{language === 'mr' ? 'माहिती व मार्गदर्शन उपक्रम' : language === 'hi' ? 'जानकारी और मार्गदर्शन पहल' : 'Information and guidance initiative'}</span>
        </div>
      </div>
    </footer>
  );
};
