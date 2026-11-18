import React from 'react';
import type { EditableLetterFields, LetterLanguage } from '../../utils/grievanceLetterTemplates';
import { RotateCcw, Check } from 'lucide-react';
import { useLanguage } from '../../hooks/useLanguage';

interface GrievanceLetterEditorProps {
  fields: EditableLetterFields;
  language?: LetterLanguage;
  onChange: (updated: EditableLetterFields) => void;
  onReset: () => void;
  onDoneEditing: () => void;
}

export const GrievanceLetterEditor: React.FC<GrievanceLetterEditorProps> = ({
  fields,
  onChange,
  onReset,
  onDoneEditing,
}) => {
  const { language: uiLang } = useLanguage();
  const isMarathi = uiLang === 'mr';

  const updateField = (key: keyof EditableLetterFields, value: string) => {
    onChange({
      ...fields,
      [key]: value,
    });
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 sm:p-7 space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 pb-3.5">
        <div>
          <h3 className="text-base font-bold text-slate-900">
            {isMarathi ? 'अर्जाचा मसुदा संपादित करा' : 'Edit Application Letter Draft'}
          </h3>
          <p className="text-xs text-slate-500">
            {isMarathi
              ? 'आपण आवश्यकतेनुसार प्रति, विषय किंवा अर्जाच्या परिच्छेदांमध्ये बदल करू शकता.'
              : 'Modify recipient, subject line, or letter paragraphs. Changes reflect live on the letter.'}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onReset}
            className="cursor-pointer inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 text-xs font-medium text-slate-700 hover:bg-slate-50 transition"
            title={isMarathi ? 'मूळ मसुदा पुनर्स्थापित करा' : 'Reset to generated draft'}
          >
            <RotateCcw className="w-3.5 h-3.5 text-slate-500" />
            <span>{isMarathi ? 'पूर्ववत करा' : 'Reset'}</span>
          </button>
          <button
            type="button"
            onClick={onDoneEditing}
            className="cursor-pointer inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-[#136938] hover:bg-[#0E532C] text-white text-xs font-bold transition shadow-xs"
          >
            <Check className="w-3.5 h-3.5" />
            <span>{isMarathi ? 'बदल पूर्ण' : 'Done Editing'}</span>
          </button>
        </div>
      </div>

      {/* 1. Recipient Details */}
      <div className="space-y-3">
        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 font-label">
          {isMarathi ? '१. प्राप्तकर्ता प्राधिकरण तपशील (Recipient)' : '1. Recipient Authority'}
        </h4>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              {isMarathi ? 'अधिकारी पदनाम:' : 'Authority Designation:'}
            </label>
            <input
              type="text"
              value={fields.recipientDesignation}
              onChange={(e) => updateField('recipientDesignation', e.target.value)}
              className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#E35914]"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              {isMarathi ? 'विभाग / महामंडळ:' : 'Department / Authority:'}
            </label>
            <input
              type="text"
              value={fields.recipientDepartment}
              onChange={(e) => updateField('recipientDepartment', e.target.value)}
              className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#E35914]"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              {isMarathi ? 'विभागीय कार्यालय:' : 'Division / Office:'}
            </label>
            <input
              type="text"
              value={fields.recipientOffice}
              onChange={(e) => updateField('recipientOffice', e.target.value)}
              className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#E35914]"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              {isMarathi ? 'पत्ता / जिल्हा:' : 'Office Location & District:'}
            </label>
            <input
              type="text"
              value={fields.recipientAddress}
              onChange={(e) => updateField('recipientAddress', e.target.value)}
              className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#E35914]"
            />
          </div>
        </div>
      </div>

      {/* 2. Subject Line */}
      <div className="space-y-1.5">
        <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 font-label">
          {isMarathi ? '२. अर्जाचा विषय (Subject Line)' : '2. Subject Line'}
        </label>
        <input
          type="text"
          value={fields.subject}
          onChange={(e) => updateField('subject', e.target.value)}
          className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#E35914]"
        />
      </div>

      {/* 3. Letter Body Paragraphs */}
      <div className="space-y-3">
        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 font-label">
          {isMarathi ? '३. अर्जाचे परिच्छेद (Letter Body Paragraphs)' : '3. Letter Body Paragraphs'}
        </h4>

        <div>
          <label className="block text-[11px] font-semibold text-slate-600 mb-1">
            {isMarathi ? 'परिच्छेद १: उद्योग व परिसराचा परिचय' : 'Paragraph 1: Enterprise & Location Introduction'}
          </label>
          <textarea
            rows={2}
            value={fields.bodyParagraph1}
            onChange={(e) => updateField('bodyParagraph1', e.target.value)}
            className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#E35914]"
          />
        </div>

        <div>
          <label className="block text-[11px] font-semibold text-slate-600 mb-1">
            {isMarathi ? 'परिच्छेद २: मुख्य अडचण, कालावधी व परिणाम' : 'Paragraph 2: Core Grievance, Timeline & Impact'}
          </label>
          <textarea
            rows={4}
            value={fields.bodyParagraph2}
            onChange={(e) => updateField('bodyParagraph2', e.target.value)}
            className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#E35914]"
          />
        </div>

        <div>
          <label className="block text-[11px] font-semibold text-slate-600 mb-1">
            {isMarathi ? 'परिच्छेद ३: अपेक्षित कार्यवाही व विनंती' : 'Paragraph 3: Requested Action & Appeal'}
          </label>
          <textarea
            rows={2}
            value={fields.bodyParagraph3}
            onChange={(e) => updateField('bodyParagraph3', e.target.value)}
            className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#E35914]"
          />
        </div>
      </div>

      {/* 4. Signatory Details */}
      <div className="space-y-3 pt-2 border-t border-slate-200">
        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 font-label">
          {isMarathi ? '४. स्वाक्षरीकार तपशील (Signatory Details)' : '4. Signatory Details'}
        </h4>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              {isMarathi ? 'नाव:' : 'Name:'}
            </label>
            <input
              type="text"
              value={fields.signatoryName}
              onChange={(e) => updateField('signatoryName', e.target.value)}
              className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#E35914]"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              {isMarathi ? 'पदनाम:' : 'Designation:'}
            </label>
            <input
              type="text"
              value={fields.signatoryDesignation}
              onChange={(e) => updateField('signatoryDesignation', e.target.value)}
              className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#E35914]"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
