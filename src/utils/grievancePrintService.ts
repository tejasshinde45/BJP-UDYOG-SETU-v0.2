import type { GeneratedApplicationLetter } from './grievanceLetterTemplates';

/**
 * Generates an elegant, standard-compliant A4 official letter HTML string for printing and PDF generation.
 * Specifically embeds Noto Sans Devanagari and Poppins for 100% accurate Marathi ligature and conjunct rendering.
 * Optimized for a neat, single-page presentation following official administrative correspondence standards.
 */
export function generatePrintableLetterHtml(letter: GeneratedApplicationLetter): string {
  const isMarathi = letter.language === 'mr';

  const recipientHtml = letter.recipientBlock
    .map((line) => `<div style="line-height: 1.35;">${escapeHtml(line)}</div>`)
    .join('');

  const enclosuresHtml = letter.enclosures
    .map((enc) => `<li style="margin-bottom: 2px;">${escapeHtml(enc)}</li>`)
    .join('');

  const paragraphsHtml = letter.bodyParagraphs
    .map(
      (p) =>
        `<p style="margin: 0 0 11px 0; text-align: justify; line-height: 1.55; text-indent: 24px;">${escapeHtml(
          p
        )}</p>`
    )
    .join('');

  return `<!DOCTYPE html>
<html lang="${isMarathi ? 'mr' : 'en'}">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Udyog-Setu-Grievance-Application-${letter.referenceId}-${letter.language}</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Noto+Sans+Devanagari:wght@400;500;600;700&family=Poppins:wght@400;500;600;700&display=swap" rel="stylesheet">
  <style>
    @page {
      size: A4 portrait;
      margin: 12mm 15mm 12mm 15mm;
    }

    * {
      box-sizing: border-box;
      -webkit-print-color-adjust: exact !important;
      print-color-adjust: exact !important;
    }

    body {
      font-family: ${
        isMarathi
          ? "'Noto Sans Devanagari', 'Poppins', -apple-system, BlinkMacSystemFont, sans-serif"
          : "'Poppins', 'Inter', -apple-system, BlinkMacSystemFont, sans-serif"
      };
      color: #0f172a;
      background: #ffffff;
      margin: 0;
      padding: 0;
      font-size: 10pt;
      line-height: 1.55;
    }

    .letter-page {
      width: 100%;
      max-width: 780px;
      margin: 0 auto;
      background: #ffffff;
    }

    .top-accent-bar {
      display: flex;
      height: 3px;
      width: 100%;
      margin-bottom: 10px;
    }
    .accent-saffron { background-color: #E35914; flex: 1; }
    .accent-space { background-color: transparent; width: 6px; }
    .accent-green { background-color: #136938; flex: 1; }

    .portal-banner {
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
      border-bottom: 1.5px solid #0f172a;
      padding-bottom: 6px;
      margin-bottom: 12px;
    }

    .portal-title {
      font-size: 9pt;
      font-weight: 700;
      letter-spacing: 0.5px;
      color: #0f172a;
      text-transform: uppercase;
      font-family: 'Inter', sans-serif;
    }

    .portal-subtitle {
      font-size: 7.5pt;
      color: #E35914;
      font-weight: 600;
    }

    .meta-row {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 14px;
      font-size: 9.5pt;
      color: #1e293b;
    }

    .meta-ref {
      font-weight: 600;
    }
    .meta-ref-badge {
      font-weight: 700;
      color: #0f172a;
      font-family: 'Inter', monospace;
    }

    .meta-date {
      font-weight: 600;
      color: #0f172a;
    }

    .recipient-block {
      margin-bottom: 14px;
      font-size: 10pt;
      color: #0f172a;
      line-height: 1.4;
    }

    .subject-line {
      margin-bottom: 10px;
      font-size: 10pt;
      font-weight: 700;
      color: #0f172a;
      text-decoration: underline;
      text-underline-offset: 3px;
      line-height: 1.45;
    }

    .reference-line {
      font-size: 9pt;
      color: #475569;
      margin-bottom: 12px;
      font-style: italic;
    }

    .salutation {
      font-weight: 700;
      margin-bottom: 10px;
      font-size: 10pt;
      color: #0f172a;
    }

    .closing-salutation {
      margin-top: 14px;
      margin-bottom: 18px;
      font-weight: 600;
      font-size: 10pt;
    }

    .bottom-layout {
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
      margin-top: 12px;
      page-break-inside: avoid;
      break-inside: avoid;
    }

    .enclosures-container {
      width: 45%;
      font-size: 8.5pt;
      color: #334155;
    }

    .enclosures-title {
      font-weight: 700;
      color: #0f172a;
      margin-bottom: 4px;
      font-size: 9pt;
    }

    .enclosures-list {
      margin: 0;
      padding-left: 16px;
      line-height: 1.4;
    }

    .signatory-container {
      width: 48%;
      text-align: right;
      font-size: 9.5pt;
      color: #0f172a;
    }

    .signature-space {
      height: 38px;
      border-bottom: 1px solid #94a3b8;
      width: 220px;
      margin-left: auto;
      margin-bottom: 4px;
      position: relative;
    }

    .signature-tag {
      position: absolute;
      bottom: 2px;
      right: 0;
      font-size: 7.5pt;
      color: #94a3b8;
      font-style: italic;
    }

    .signatory-name {
      font-weight: 700;
      color: #0f172a;
    }

    .signatory-designation {
      color: #334155;
      font-size: 9pt;
    }

    .signatory-company {
      font-weight: 600;
      font-size: 9pt;
    }

    .signatory-contact {
      font-size: 8pt;
      color: #64748b;
      margin-top: 2px;
    }

    .doc-footnote {
      margin-top: 22px;
      border-top: 1px solid #e2e8f0;
      padding-top: 6px;
      font-size: 7pt;
      color: #64748b;
      text-align: center;
      line-height: 1.3;
      page-break-inside: avoid;
      break-inside: avoid;
    }

    @media print {
      body {
        margin: 0;
        padding: 0;
      }
      .letter-page {
        max-width: 100%;
      }
    }
  </style>
</head>
<body>
  <div class="letter-page">
    <div class="top-accent-bar">
      <div class="accent-saffron"></div>
      <div class="accent-space"></div>
      <div class="accent-green"></div>
    </div>

    <div class="portal-banner">
      <div class="portal-title">${escapeHtml(letter.portalHeader)}</div>
      <div class="portal-subtitle">${escapeHtml(letter.portalSubHeader)}</div>
    </div>

    <div class="meta-row">
      <div class="meta-ref">
        ${isMarathi ? 'अर्ज संदर्भ क्रमांक:' : 'Ref. No.:'} <span class="meta-ref-badge">${escapeHtml(
    letter.referenceId
  )}</span>
      </div>
      <div class="meta-date">
        ${isMarathi ? 'दिनांक:' : 'Date:'} ${escapeHtml(letter.date)}
      </div>
    </div>

    <div class="recipient-block">
      ${recipientHtml}
    </div>

    <div class="subject-line">
      ${escapeHtml(letter.subjectLine)}
    </div>

    ${
      letter.referenceLine
        ? `<div class="reference-line">${escapeHtml(letter.referenceLine)}</div>`
        : ''
    }

    <div class="salutation">
      ${escapeHtml(letter.salutation)}
    </div>

    ${paragraphsHtml}

    <div class="closing-salutation">
      ${escapeHtml(letter.closingSalutation)}
    </div>

    <div class="bottom-layout">
      <div class="enclosures-container">
        <div class="enclosures-title">${isMarathi ? 'सोबत जोडलेली कागदपत्रे (सहपत्रे):' : 'Enclosures:'}</div>
        <ol class="enclosures-list">
          ${enclosuresHtml}
        </ol>
      </div>

      <div class="signatory-container">
        <div style="font-weight: 500; margin-bottom: 2px;">
          ${isMarathi ? 'आपला नम्र,' : 'Yours faithfully,'}
        </div>
        <div style="font-size: 8.5pt; color: #475569; margin-bottom: 6px;">
          ${isMarathi ? `${escapeHtml(letter.signatory.company)} करिता` : `For ${escapeHtml(letter.signatory.company)}`}
        </div>
        <div class="signature-space">
          <span class="signature-tag">${isMarathi ? '(स्वाक्षरी व अधिकृत शिक्का)' : '(Signature & Seal)'}</span>
        </div>
        <div class="signatory-name">${escapeHtml(letter.signatory.name)}</div>
        <div class="signatory-designation">${escapeHtml(letter.signatory.designation)}</div>
        <div class="signatory-contact">${escapeHtml(letter.signatory.contact)}</div>
      </div>
    </div>

    <div class="doc-footnote">
      <div>${escapeHtml(letter.footerDisclaimer)}</div>
      <div style="margin-top: 2px; color: #94a3b8;">
        BJP Udyog Setu Portal • Ref: ${escapeHtml(letter.referenceId)} • Formatted on ${escapeHtml(letter.date)}
      </div>
    </div>
  </div>
</body>
</html>`;
}

function escapeHtml(str: string): string {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

/**
 * Triggers the browser's native print engine inside an isolated iframe,
 * printing an ultra-clean, authentic 1-page formal application letter with 100% Devanagari Unicode fidelity.
 */
export function printApplicationLetter(letter: GeneratedApplicationLetter): Promise<void> {
  return new Promise((resolve) => {
    const html = generatePrintableLetterHtml(letter);
    const iframe = document.createElement('iframe');

    iframe.style.position = 'fixed';
    iframe.style.right = '0';
    iframe.style.bottom = '0';
    iframe.style.width = '0';
    iframe.style.height = '0';
    iframe.style.border = '0';
    iframe.style.visibility = 'hidden';

    document.body.appendChild(iframe);

    const doc = iframe.contentWindow?.document;
    if (!doc) {
      document.body.removeChild(iframe);
      window.print();
      resolve();
      return;
    }

    doc.open();
    doc.write(html);
    doc.close();

    const triggerPrint = () => {
      try {
        iframe.contentWindow?.focus();
        iframe.contentWindow?.print();
      } catch (err) {
        console.error('Iframe print error', err);
        window.print();
      } finally {
        setTimeout(() => {
          if (document.body.contains(iframe)) {
            document.body.removeChild(iframe);
          }
          resolve();
        }, 1500);
      }
    };

    if (iframe.contentWindow) {
      iframe.contentWindow.onload = () => {
        setTimeout(triggerPrint, 350);
      };
    } else {
      setTimeout(triggerPrint, 500);
    }
  });
}

/**
 * Downloads a standalone, self-contained HTML file of the formal application letter,
 * suitable for offline records, archiving, and immediate viewing.
 */
export function downloadOfflineApplicationDocument(letter: GeneratedApplicationLetter): void {
  const html = generatePrintableLetterHtml(letter);
  const blob = new Blob([html], { type: 'text/html;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `Udyog-Setu-Grievance-Application-${letter.referenceId}-${letter.language}.html`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  setTimeout(() => URL.revokeObjectURL(url), 2000);
}
