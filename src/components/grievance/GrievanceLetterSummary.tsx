import React from 'react';
import type {
  LetterLanguage,
  RecipientAuthorityKey,
} from '../../utils/grievanceLetterTemplates';
import { RECIPIENT_AUTHORITY_OPTIONS } from '../../utils/grievanceLetterTemplates';
import { useLanguage } from '../../hooks/useLanguage';
import {
  Edit3,
  Eye,
  Sparkles,
} from 'lucide-react';

interface GrievanceLetterSummaryProps {
  referenceId: string;
  selectedRecipientKey: RecipientAuthorityKey;
  selectedLanguage: LetterLanguage;
  isEditing: boolean;
  isCustomEdited: boolean;
  onLanguageChange: (lang: LetterLanguage) => void;
  onRecipientKeyChange: (key: RecipientAuthorityKey) => void;
  onToggleEdit: () => void;
  onResetDraft?: () => void;
}

export const GrievanceLetterSummary: React.FC<GrievanceLetterSummaryProps> = ({
  referenceId,
  selectedRecipientKey,
  selectedLanguage,
  isEditing,
  isCustomEdited,
  onLanguageChange,
  onRecipientKeyChange,
  onToggleEdit,
}) => {
  const { language: uiLang } = useLanguage();
  const isUiMarathi = uiLang === 'mr';
  const isUiHindi = uiLang === 'hi';

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
                {isUiMarathi ? 'स्वयंचलित अर्ज तयार' : isUiHindi ? 'स्वचालित आवेदन तैयार' : 'Automatic Letter Generated'}
              </span>
              <span className="text-xs text-slate-500 font-medium">
                {isUiMarathi ? 'पायरी ४/४' : isUiHindi ? 'चरण ४/४' : 'Step 4/4'}
              </span>
            </div>
            <h2 className="text-base sm:text-lg font-extrabold text-slate-900 mt-0.5">
              {isUiMarathi
                ? 'आपला औद्योगिक अडचण निवारण अर्ज तयार आहे'
                : isUiHindi
                  ? 'आपका औद्योगिक शिकायत निवारण आवेदन तैयार है'
                  : 'Your Grievance Application Letter is Ready'}
            </h2>
            <p className="text-xs text-slate-600 leading-relaxed max-w-2xl mt-0.5">
              {isUiMarathi
                ? 'आपण प्रविष्ट केलेल्या सर्व माहितीच्या आधारे अधिकृत औद्योगिक अर्ज आपोआप तयार करण्यात आला आहे. आपण खाली मसुदा तपासून, आवश्यकतेनुसार संपादन करू शकता.'
                : isUiHindi
                  ? 'आपके द्वारा दर्ज विवरण के आधार पर आधिकारिक औद्योगिक आवेदन तैयार किया गया है। आप नीचे प्रारूप की समीक्षा कर संपादन कर सकते हैं।'
                  : 'Based on your submitted details, an official industrial representation letter has been generated. You can review and edit the draft below.'}
            </p>
          </div>
        </div>

        {/* Reference Highlight */}
        <div className="bg-white/90 border border-emerald-200 rounded-xl p-3 sm:px-4 text-center shrink-0 shadow-2xs">
          <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider font-label block">
            {isUiMarathi ? 'अर्ज संदर्भ क्रमांक' : isUiHindi ? 'आवेदन संदर्भ संख्या' : 'Application Ref'}
          </span>
          <span className="text-base sm:text-lg font-black text-[#E35914] tracking-wide font-label block">
            {referenceId}
          </span>
        </div>
      </div>

      {/* Control Panel: Language Selector & Recipient Selector */}
      <div className="bg-slate-50/80 rounded-xl p-4 border border-slate-200 flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Language Tabs */}
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-slate-700 whitespace-nowrap">
            {isUiMarathi ? 'अर्जाची भाषा:' : isUiHindi ? 'आवेदन की भाषा:' : 'Application Language:'}
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
            {isUiMarathi ? 'प्राधिकरण निवडा:' : isUiHindi ? 'प्राधिकरण चुनें:' : 'Recipient Authority:'}
          </span>
          <select
            value={selectedRecipientKey}
            onChange={(e) => onRecipientKeyChange(e.target.value as RecipientAuthorityKey)}
            className="w-full px-3 py-1.5 rounded-lg border border-slate-300 bg-white text-xs text-slate-800 font-medium focus:outline-none focus:ring-2 focus:ring-[#E35914] transition"
          >
            {RECIPIENT_AUTHORITY_OPTIONS.map((opt) => (
              <option key={opt.key} value={opt.key}>
                {opt.label[isUiMarathi ? 'mr' : 'en']}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Action Toolbar: Edit / Preview Switch */}
      <div className="flex items-center justify-between gap-2.5 pt-1">
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
                <span>{isUiMarathi ? 'पूर्वावलोकन पहा' : isUiHindi ? 'पूर्वावलोकन देखें' : 'View Preview'}</span>
              </>
            ) : (
              <>
                <Edit3 className="w-3.5 h-3.5 text-[#E35914]" />
                <span>{isUiMarathi ? 'मसुदा संपादित करा' : isUiHindi ? 'प्रारूप संपादित करें' : 'Edit Application Letter'}</span>
              </>
            )}
          </button>
          {isCustomEdited && (
            <span className="text-[11px] font-semibold text-amber-700 bg-amber-50 px-2.5 py-1 rounded-md border border-amber-200">
              {isUiMarathi ? 'सुधारित मसुदा' : isUiHindi ? 'संशोधित प्रारूप' : 'Custom Edited'}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};
