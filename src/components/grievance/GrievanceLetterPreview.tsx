import React from 'react';
import type { GeneratedApplicationLetter } from '../../utils/grievanceLetterTemplates';

interface GrievanceLetterPreviewProps {
  letter: GeneratedApplicationLetter;
}

export const GrievanceLetterPreview: React.FC<GrievanceLetterPreviewProps> = ({ letter }) => {
  const isMarathi = letter.language === 'mr';

  return (
    <div
      id="letter-printable-area"
      className="bg-white rounded-xl sm:rounded-2xl shadow-md border border-slate-200/90 p-6 sm:p-10 md:p-12 text-[#0F172A] max-w-[800px] mx-auto transition-all font-devanagari relative overflow-hidden"
      style={{
        boxShadow:
          '0 10px 25px -5px rgba(15, 23, 42, 0.05), 0 8px 10px -6px rgba(15, 23, 42, 0.02), 0 0 0 1px rgba(15, 23, 42, 0.05)',
      }}
    >
      {/* Top Subtle Saffron & Green Accent Line */}
      <div className="absolute top-0 left-0 right-0 h-1 flex">
        <div className="bg-[#E35914] flex-1" />
        <div className="bg-slate-200 w-2" />
        <div className="bg-[#136938] flex-1" />
      </div>

      {/* Official Letterhead Banner */}
      <div className="border-b border-slate-900/80 pb-3 mb-4 pt-1 flex flex-col sm:flex-row sm:items-end justify-between gap-1">
        <div>
          <span className="text-[10px] font-extrabold uppercase tracking-widest text-slate-800 font-label block">
            {letter.portalHeader}
          </span>
          <span className="text-[11px] text-[#E35914] font-semibold block">
            {letter.portalSubHeader}
          </span>
        </div>
        <div className="sm:text-right shrink-0">
          <span className="inline-block text-[10px] font-bold bg-amber-50 text-amber-800 border border-amber-300/80 px-2 py-0.5 rounded">
            {isMarathi ? 'अधिकृत सादरीकरण मसुदा' : 'Official Submission Draft'}
          </span>
        </div>
      </div>

      {/* Meta Bar: Reference ID on Left, Date on Right */}
      <div className="flex items-center justify-between text-xs sm:text-sm border-b border-slate-100 pb-2.5 mb-4 text-slate-800">
        <div>
          <span className="text-slate-500 font-medium">
            {isMarathi ? 'अर्ज संदर्भ क्रमांक:' : 'Ref. No.:'}{' '}
          </span>
          <span className="font-extrabold text-slate-900 font-mono tracking-wide">
            {letter.referenceId}
          </span>
        </div>
        <div>
          <span className="text-slate-500 font-medium">
            {isMarathi ? 'दिनांक:' : 'Date:'}{' '}
          </span>
          <span className="font-bold text-slate-900">{letter.date}</span>
        </div>
      </div>

      {/* Recipient Block */}
      <div className="mb-4 text-xs sm:text-sm text-slate-900 leading-snug font-medium">
        {letter.recipientBlock.map((line, idx) => (
          <div key={idx} className={idx === 0 ? 'font-bold mb-0.5' : ''}>
            {line}
          </div>
        ))}
      </div>

      {/* Subject Line (Clean, bold, underlined) */}
      <div className="mb-2 text-xs sm:text-sm font-bold text-slate-900 leading-snug underline underline-offset-4">
        {letter.subjectLine}
      </div>

      {/* Reference Line */}
      {letter.referenceLine && (
        <div className="text-[11px] sm:text-xs text-slate-500 italic mb-4">
          {letter.referenceLine}
        </div>
      )}

      {/* Salutation */}
      <div className="text-xs sm:text-sm font-bold text-slate-900 mb-3">
        {letter.salutation}
      </div>

      {/* Fluent Body Paragraphs */}
      <div className="space-y-3 text-xs sm:text-[13.5px] text-slate-800 leading-relaxed text-justify">
        {letter.bodyParagraphs.map((para, idx) => (
          <p key={idx} className="indent-6 sm:indent-8">
            {para}
          </p>
        ))}
      </div>

      {/* Closing Salutation */}
      <div className="text-xs sm:text-sm font-semibold text-slate-900 mt-4 mb-4">
        {letter.closingSalutation}
      </div>

      {/* Bottom Layout: Enclosures (Left) and Signatory (Right) */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 pt-2 border-t border-slate-100">
        {/* Left Side: Numbered Enclosures */}
        <div className="sm:max-w-[48%]">
          <div className="text-[11px] sm:text-xs font-bold text-slate-900 mb-1">
            {isMarathi ? 'सोबत जोडलेली कागदपत्रे (सहपत्रे):' : 'Enclosures:'}
          </div>
          <ol className="list-decimal list-inside space-y-0.5 text-[11px] text-slate-600 font-medium">
            {letter.enclosures.map((enc, idx) => (
              <li key={idx} className="leading-snug">
                {enc}
              </li>
            ))}
          </ol>
        </div>

        {/* Right Side: Signatory & Seal */}
        <div className="text-right sm:min-w-[240px]">
          <div className="text-xs font-medium text-slate-700">
            {isMarathi ? 'आपला नम्र,' : 'Yours faithfully,'}
          </div>
          <div className="text-[11px] text-slate-500 font-medium mb-1">
            {isMarathi
              ? `${letter.signatory.company} करिता`
              : `For ${letter.signatory.company}`}
          </div>
          <div className="h-10 border-b border-slate-400 relative mb-1.5 flex items-end justify-end pb-0.5">
            <span className="text-[9px] text-slate-400 italic">
              {isMarathi ? '(स्वाक्षरी व अधिकृत शिक्का)' : '(Signature & Seal)'}
            </span>
          </div>
          <div className="font-bold text-xs sm:text-sm text-slate-900">
            {letter.signatory.name}
          </div>
          <div className="text-xs text-slate-700">
            {letter.signatory.designation}
          </div>
          <div className="text-[10px] text-slate-500 mt-0.5">
            {letter.signatory.contact}
          </div>
        </div>
      </div>

      {/* Subtle Official Footnote */}
      <div className="border-t border-slate-200 mt-6 pt-2 text-center text-[10px] text-slate-400 leading-snug">
        <p>{letter.footerDisclaimer}</p>
        <p className="mt-0.5 font-mono text-[9px] text-slate-400">
          BJP Udyog Setu Portal • Ref: {letter.referenceId} • Formatted: {letter.date}
        </p>
      </div>
    </div>
  );
};
