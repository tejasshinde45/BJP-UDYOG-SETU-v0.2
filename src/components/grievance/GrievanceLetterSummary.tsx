import React from 'react';
import type {
  LetterLanguage,
  RecipientAuthorityKey,
} from '../../utils/grievanceLetterTemplates';
import { RECIPIENT_AUTHORITY_OPTIONS } from '../../utils/grievanceLetterTemplates';
import {
  FileText,
  Printer,
  Download,
  Edit3,
  Eye,
  Building,
  User,
  Layers,
  FileCode,
  Sparkles,
} from 'lucide-react';

interface GrievanceLetterSummaryProps {
  referenceId: string;
  applicantName: string;
  designation: string;
  businessName: string;
  categoryLabel: string;
  selectedRecipientKey: RecipientAuthorityKey;
  selectedLanguage: LetterLanguage;
  documentsCount: number;
  isEditing: boolean;
  isCustomEdited: boolean;
  onLanguageChange: (lang: LetterLanguage) => void;
  onRecipientKeyChange: (key: RecipientAuthorityKey) => void;
  onToggleEdit: () => void;
  onDownloadPdf: (lang: LetterLanguage) => void;
  onPrint: () => void;
  onDownloadHtml: () => void;
  onResetDraft: () => void;
}

export const GrievanceLetterSummary: React.FC<GrievanceLetterSummaryProps> = ({
  referenceId,
  applicantName,
  designation,
  businessName,
  categoryLabel,
  selectedRecipientKey,
  selectedLanguage,
  documentsCount,
  isEditing,
  isCustomEdited,
  onLanguageChange,
  onRecipientKeyChange,
  onToggleEdit,
  onDownloadPdf,
  onPrint,
  onDownloadHtml,
}) => {
  const isMarathi = selectedLanguage === 'mr';

  const selectedAuth =
    RECIPIENT_AUTHORITY_OPTIONS.find((a) => a.key === selectedRecipientKey) ||
    RECIPIENT_AUTHORITY_OPTIONS[0];

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs p-5 sm:p-6 space-y-5">
      {/* Success Ready Banner */}
      <div className="bg-gradient-to-r from-emerald-50 via-teal-50/50 to-slate-50 border border-emerald-200/90 rounded-xl p-4 sm:p-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-start gap-3.5">
          <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-xs">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800 bg-emerald-100/80 px-2 py-0.5 rounded font-label">
                {isMarathi ? 'स्वयंचलित अर्ज तयार' : 'Automatic Letter Generated'}
              </span>
              <span className="text-xs text-slate-500 font-medium">
                {isMarathi ? 'पायरी ४/४' : 'Step 4/4'}
              </span>
            </div>
            <h2 className="text-base sm:text-lg font-extrabold text-slate-900 mt-0.5">
              {isMarathi
                ? 'आपला औद्योगिक अडचण निवारण अर्ज तयार आहे'
                : 'Your Grievance Application Letter is Ready'}
            </h2>
            <p className="text-xs text-slate-600 leading-relaxed max-w-2xl mt-0.5">
              {isMarathi
                ? 'आपण प्रविष्ट केलेल्या सर्व माहितीच्या आधारे अधिकृत औद्योगिक अर्ज आपोआप तयार करण्यात आला आहे. आपण खाली मसुदा तपासून, मराठी अथवा इंग्रजीत PDF डाउनलोड करू शकता.'
                : 'Based on your submitted details, an official industrial representation letter has been generated. You can review, edit, print or download high-fidelity Marathi/English PDFs.'}
            </p>
          </div>
        </div>

        {/* Reference Highlight */}
        <div className="bg-white/90 border border-emerald-200 rounded-xl p-3 sm:px-4 text-center shrink-0 shadow-2xs">
          <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider font-label block">
            {isMarathi ? 'अर्ज संदर्भ क्रमांक' : 'Application Ref'}
          </span>
          <span className="text-base sm:text-lg font-black text-[#E35914] tracking-wide font-label block">
            {referenceId}
          </span>
        </div>
      </div>

      {/* Grid of Summary Metadata */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 text-xs">
        <div className="bg-slate-50 p-3 rounded-xl border border-slate-200/70">
          <span className="text-[10px] font-semibold text-slate-500 block">
            {isMarathi ? 'उद्योजक नाव' : 'Applicant'}
          </span>
          <div className="font-bold text-slate-900 truncate mt-0.5 flex items-center gap-1">
            <User className="w-3 h-3 text-[#E35914] shrink-0" />
            <span className="truncate">{applicantName || '—'}</span>
          </div>
          <span className="text-[10px] text-slate-500 truncate block">
            {designation}
          </span>
        </div>

        <div className="bg-slate-50 p-3 rounded-xl border border-slate-200/70">
          <span className="text-[10px] font-semibold text-slate-500 block">
            {isMarathi ? 'उद्योग घटक' : 'Enterprise'}
          </span>
          <div className="font-bold text-slate-900 truncate mt-0.5 flex items-center gap-1">
            <Building className="w-3 h-3 text-[#136938] shrink-0" />
            <span className="truncate">{businessName || '—'}</span>
          </div>
        </div>

        <div className="bg-slate-50 p-3 rounded-xl border border-slate-200/70">
          <span className="text-[10px] font-semibold text-slate-500 block">
            {isMarathi ? 'तक्रार वर्ग' : 'Grievance Category'}
          </span>
          <div className="font-bold text-[#E35914] truncate mt-0.5 flex items-center gap-1">
            <Layers className="w-3 h-3 text-[#E35914] shrink-0" />
            <span className="truncate">{categoryLabel}</span>
          </div>
        </div>

        <div className="bg-slate-50 p-3 rounded-xl border border-slate-200/70">
          <span className="text-[10px] font-semibold text-slate-500 block">
            {isMarathi ? 'प्राधिकरण' : 'Recipient'}
          </span>
          <div className="font-bold text-slate-900 truncate mt-0.5" title={selectedAuth.label[selectedLanguage]}>
            {selectedAuth.defaultDesignation[selectedLanguage]}
          </div>
          <span className="text-[10px] text-slate-500 truncate block">
            {selectedAuth.key.toUpperCase()}
          </span>
        </div>

        <div className="bg-slate-50 p-3 rounded-xl border border-slate-200/70">
          <span className="text-[10px] font-semibold text-slate-500 block">
            {isMarathi ? 'भाषा निवड' : 'Language'}
          </span>
          <div className="font-bold text-slate-900 mt-0.5">
            {selectedLanguage === 'mr' ? 'मराठी (देवनागरी)' : 'English (Formal)'}
          </div>
        </div>

        <div className="bg-slate-50 p-3 rounded-xl border border-slate-200/70">
          <span className="text-[10px] font-semibold text-slate-500 block">
            {isMarathi ? 'संलग्न कागदपत्रे' : 'Attached Files'}
          </span>
          <div className="font-bold text-slate-900 mt-0.5 flex items-center gap-1">
            <FileText className="w-3 h-3 text-slate-500" />
            <span>
              {documentsCount > 0
                ? isMarathi
                  ? `${documentsCount} फाईल्स`
                  : `${documentsCount} files`
                : isMarathi
                  ? 'काहीही नाही'
                  : 'None'}
            </span>
          </div>
        </div>
      </div>

      {/* Control Panel: Language Selector & Recipient Selector */}
      <div className="bg-slate-50/80 rounded-xl p-4 border border-slate-200 flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Language Tabs */}
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-slate-700 whitespace-nowrap">
            {isMarathi ? 'अर्जाची भाषा:' : 'Application Language:'}
          </span>
          <div className="inline-flex rounded-lg border border-slate-300 bg-white p-0.5 shadow-2xs">
            <button
              type="button"
              onClick={() => onLanguageChange('mr')}
              className={`cursor-pointer px-3.5 py-1.5 rounded-md text-xs font-bold transition ${
                selectedLanguage === 'mr'
                  ? 'bg-[#E35914] text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              मराठी (देवनागरी)
            </button>
            <button
              type="button"
              onClick={() => onLanguageChange('en')}
              className={`cursor-pointer px-3.5 py-1.5 rounded-md text-xs font-bold transition ${
                selectedLanguage === 'en'
                  ? 'bg-[#1E3A8A] text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              English
            </button>
          </div>
        </div>

        {/* Recipient Authority Dropdown */}
        <div className="flex items-center gap-2 flex-1 max-w-lg">
          <span className="text-xs font-bold text-slate-700 whitespace-nowrap">
            {isMarathi ? 'प्राधिकरण निवडा:' : 'Recipient Authority:'}
          </span>
          <select
            value={selectedRecipientKey}
            onChange={(e) => onRecipientKeyChange(e.target.value as RecipientAuthorityKey)}
            className="w-full px-3 py-1.5 rounded-lg border border-slate-300 bg-white text-xs text-slate-800 font-medium focus:outline-none focus:ring-2 focus:ring-[#E35914] transition"
          >
            {RECIPIENT_AUTHORITY_OPTIONS.map((opt) => (
              <option key={opt.key} value={opt.key}>
                {opt.label[selectedLanguage]}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Action Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-2.5 pt-1">
        {/* Left Side: Edit / Preview Switch */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onToggleEdit}
            className={`cursor-pointer inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold border transition ${
              isEditing
                ? 'bg-[#1E3A8A] text-white border-[#1E3A8A] shadow-xs'
                : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-50'
            }`}
          >
            {isEditing ? (
              <>
                <Eye className="w-3.5 h-3.5" />
                <span>{isMarathi ? 'पूर्वावलोकन पहा' : 'View Preview'}</span>
              </>
            ) : (
              <>
                <Edit3 className="w-3.5 h-3.5 text-[#E35914]" />
                <span>{isMarathi ? 'मसुदा संपादित करा' : 'Edit Application Letter'}</span>
              </>
            )}
          </button>
          {isCustomEdited && (
            <span className="text-[11px] font-semibold text-amber-700 bg-amber-50 px-2.5 py-1 rounded-md border border-amber-200">
              {isMarathi ? 'सुधारित मसुदा' : 'Custom Edited'}
            </span>
          )}
        </div>

        {/* Right Side: Download & Print Actions */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Download Marathi PDF */}
          <button
            type="button"
            onClick={() => onDownloadPdf('mr')}
            className="cursor-pointer inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold bg-[#E35914] hover:bg-[#CC4D0E] text-white shadow-xs transition"
            title={isMarathi ? 'मराठी PDF डाउनलोड करा' : 'Download Marathi PDF'}
          >
            <Download className="w-3.5 h-3.5" />
            <span>{isMarathi ? 'मराठी PDF' : 'Marathi PDF'}</span>
          </button>

          {/* Download English PDF */}
          <button
            type="button"
            onClick={() => onDownloadPdf('en')}
            className="cursor-pointer inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold bg-[#1E3A8A] hover:bg-[#1E293B] text-white shadow-xs transition"
            title={isMarathi ? 'इंग्रजी PDF डाउनलोड करा' : 'Download English PDF'}
          >
            <Download className="w-3.5 h-3.5" />
            <span>{isMarathi ? 'इंग्रजी PDF' : 'English PDF'}</span>
          </button>

          {/* Print Application */}
          <button
            type="button"
            onClick={onPrint}
            className="cursor-pointer inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold bg-white text-slate-800 border border-slate-300 hover:bg-slate-50 transition shadow-2xs"
            title={isMarathi ? 'अर्ज प्रिंट करा' : 'Print Application'}
          >
            <Printer className="w-3.5 h-3.5 text-slate-600" />
            <span>{isMarathi ? 'प्रिंट अर्ज' : 'Print Application'}</span>
          </button>

          {/* Offline HTML Backup */}
          <button
            type="button"
            onClick={onDownloadHtml}
            className="cursor-pointer inline-flex items-center gap-1.5 px-2.5 py-2 rounded-xl text-xs font-medium text-slate-600 hover:text-slate-900 border border-slate-200 hover:bg-slate-50 transition"
            title={isMarathi ? 'ऑफलाईन दस्तऐवज (.html) जतन करा' : 'Save offline HTML file'}
          >
            <FileCode className="w-3.5 h-3.5 text-slate-400" />
            <span className="hidden sm:inline">.HTML</span>
          </button>
        </div>
      </div>
    </div>
  );
};
