import {
  buildInitialLetterFields,
  buildGeneratedLetter,
  formatLetterDate,
  getDefaultRecipientKeyForCategory,
} from '../grievanceLetterTemplates';
import type {
  GrievanceLetterFormData,
} from '../grievanceLetterTemplates';
import { generatePrintableLetterHtml } from '../grievancePrintService';

function assert(condition: boolean, msg: string) {
  if (!condition) {
    throw new Error(`Assertion failed: ${msg}`);
  }
}

console.log('--- Starting Grievance Letter Generator Test Suite (Neat & Clean) ---');

// Case 1: Marathi letter with complete information
{
  const form: GrievanceLetterFormData = {
    businessName: 'सह्याद्री इंजिनिअरिंग प्रा. लि.',
    contactPerson: 'श्री. संजय देशपांडे',
    designation: 'व्यवस्थापकीय संचालक',
    email: 'sanjay@sahyadri-engg.in',
    phone: '9822012345',
    district: 'पुणे',
    industryType: 'अचूक ऑटो घटक उत्पादन',
    locationArea: 'भोसरी MIDC, ब्लॉक टी, प्लॉट क्र. ४५',
    category: 'midc_infrastructure',
    subject: 'पायाभूत सुविधा व अंतर्गत रस्त्यांची दुरुस्ती',
    departmentCategory: 'MIDC स्थापत्य व रस्ते विभाग',
    incidentPeriod: 'ऑक्टोबर २०२६ (मागील ३ आठवडे)',
    description: 'गेल्या ३ आठवड्यांपासून अंतर्गत रस्ते खचल्यामुळे अवजड वाहतूक ठप्प झाली आहे.',
    files: [{ name: 'site-photo-1.jpg', size: 1024 * 500 }],
    referenceId: 'DEMO-GRV-7890',
  };

  const fields = buildInitialLetterFields(form, 'mr');
  const letter = buildGeneratedLetter(form, fields, 'mr');
  const html = generatePrintableLetterHtml(letter);

  assert(letter.referenceId === 'DEMO-GRV-7890', 'Case 1: Reference ID matches');
  assert(letter.signatory.company === 'सह्याद्री इंजिनिअरिंग प्रा. लि.', 'Case 1: Company in signatory');
  assert(letter.enclosures.length === 1, 'Case 1: Enclosure count');
  assert(letter.bodyParagraphs.length === 3, 'Case 1: Exactly 3 neat paragraphs');
  assert(html.includes('Noto Sans Devanagari'), 'Case 1: Noto Sans Devanagari font embedded');
  assert(html.includes('DEMO-GRV-7890'), 'Case 1: Reference in HTML');
  assert(!html.includes('Nature of Grievance & Background Context'), 'Case 1: No robotic section headers');
  console.log('✓ Case 1 Passed: Marathi letter with complete information.');
}

// Case 2: English letter with complete information & no double district
{
  const form: GrievanceLetterFormData = {
    businessName: 'Apex Tooling Solutions Pvt Ltd',
    contactPerson: 'Mr. Rajesh Kulkarni',
    designation: 'General Manager - Plant',
    email: 'rajesh@apextooling.com',
    phone: '9822998877',
    district: 'पुणे', // Note: District in Marathi form input
    industryType: 'Precision Engineering',
    locationArea: 'Bhosari MIDC, Block T, Plot 45, Pune', // Note: Location already has 'Pune'
    category: 'electricity_utilities',
    subject: 'Frequent Water Supply Disruption in Bhosari MIDC',
    departmentCategory: 'MIDC',
    incidentPeriod: 'past three weeks',
    description: 'The industrial unit has been facing irregular water supply.',
    files: [{ name: 'tripping_log_nov.pdf', size: 1024 * 350 }],
    referenceId: 'DEMO-GRV-8582',
  };

  const fields = buildInitialLetterFields(form, 'en');
  const letter = buildGeneratedLetter(form, fields, 'en');
  const html = generatePrintableLetterHtml(letter);

  assert(letter.referenceId === 'DEMO-GRV-8582', 'Case 2: Reference ID matches');
  assert(!html.includes('Pune, पुणे'), 'Case 2: No double "Pune, पुणे" script mixing');
  assert(!html.includes('Pune, Pune'), 'Case 2: No duplicate "Pune, Pune" location repetition');
  assert(html.includes('Apex Tooling Solutions Pvt Ltd'), 'Case 2: Company in HTML');
  assert(html.includes('tripping_log_nov.pdf'), 'Case 2: Attachment in HTML');
  assert(letter.bodyParagraphs.length === 3, 'Case 2: Clean 3 paragraphs');
  console.log('✓ Case 2 Passed: English letter with complete information and no duplication.');
}

// Case 3: Electricity-related complaint
{
  const form: GrievanceLetterFormData = {
    businessName: 'Mahalaxmi Forgings',
    contactPerson: 'Kishore Patil',
    designation: 'Director',
    email: 'kpatil@mahalaxmi.in',
    phone: '9822123456',
    district: 'कोल्हापूर',
    industryType: 'Forging & Foundry',
    locationArea: 'Shiroli MIDC',
    category: 'electricity_utilities',
    subject: 'Severe voltage fluctuations damaging induction furnaces',
    departmentCategory: 'महावितरण (MSEDCL)',
    description: 'Voltage dropping to 340V repeatedly causing furnace shutoff.',
    files: [],
    referenceId: 'DEMO-GRV-1122',
  };

  const recipientKey = getDefaultRecipientKeyForCategory(form.category);
  assert(recipientKey === 'msedcl', 'Case 3: Recipient defaults to msedcl');

  const fieldsMr = buildInitialLetterFields(form, 'mr', recipientKey);
  assert(fieldsMr.recipientDepartment.includes('महावितरण'), 'Case 3: Department contains Mahavitaran');
  assert(fieldsMr.bodyParagraph2.includes('उत्पादन'), 'Case 3: Body mentions production impact');

  const fieldsEn = buildInitialLetterFields(form, 'en', recipientKey);
  assert(fieldsEn.bodyParagraph2.includes('disruption'), 'Case 3: English body mentions disruption');
  console.log('✓ Case 3 Passed: Electricity-related complaint.');
}

// Case 4: Water-supply-related complaint
{
  const form: GrievanceLetterFormData = {
    businessName: 'Godavari Bio-Chemicals',
    contactPerson: 'Dr. Anand Joshi',
    designation: 'Factory Manager',
    email: 'anand@godavaribio.com',
    phone: '9822334455',
    district: 'नाशिक',
    industryType: 'Specialty Chemicals',
    locationArea: 'Satpur MIDC',
    category: 'industrial_services',
    subject: 'Complete stoppage of industrial process water line',
    departmentCategory: 'MIDC',
    description: 'Main MIDC pipeline has ruptured near plot 18 leading to total stoppage of boiler feed water.',
    files: [],
    referenceId: 'DEMO-GRV-3344',
  };

  const fieldsMr = buildInitialLetterFields(form, 'mr');
  assert(fieldsMr.bodyParagraph2.includes('boiler feed water') || fieldsMr.bodyParagraph2.includes('पाणी'), 'Case 4: Mentions user description');

  const fieldsEn = buildInitialLetterFields(form, 'en');
  assert(fieldsEn.bodyParagraph2.includes('boiler feed water'), 'Case 4: English body mentions water description');
  console.log('✓ Case 4 Passed: Water-supply-related complaint.');
}

// Case 5: Infrastructure & road related complaint
{
  const form: GrievanceLetterFormData = {
    businessName: 'Vidarbha Logistics Hub',
    contactPerson: 'Sunil Verma',
    designation: 'Operations Head',
    email: 'sunil@vidarbha-log.com',
    phone: '9822445566',
    district: 'नागपूर',
    industryType: 'Logistics & Warehousing',
    locationArea: 'Butibori MIDC',
    category: 'roads_transport',
    subject: 'Culvert collapse on 24m spine road',
    departmentCategory: 'MIDC स्थापत्य व रस्ते विभाग',
    description: 'Heavy vehicle transit impossible due to collapsed bridge approach.',
    files: [{ name: 'bridge_collapse.jpg', size: 1024 * 800 }],
    referenceId: 'DEMO-GRV-7788',
  };

  const fieldsMr = buildInitialLetterFields(form, 'mr');
  assert(fieldsMr.bodyParagraph2.includes('collapsed bridge approach'), 'Case 5: Marathi body contains actual grievance');
  assert(fieldsMr.bodyParagraph3.includes('स्थळपाहणी'), 'Case 5: Marathi requested action asks for site inspection');
  console.log('✓ Case 5 Passed: Infrastructure-related complaint.');
}

// Case 6: Complaint with no supporting documents
{
  const form: GrievanceLetterFormData = {
    businessName: 'Deshmukh Agro Processors',
    contactPerson: 'Vikas Deshmukh',
    designation: 'Proprietor',
    email: 'vikas@deshmukh-agro.in',
    phone: '9822556677',
    district: 'सोलापूर',
    industryType: 'Food Processing',
    locationArea: 'Chincholi MIDC',
    category: 'other',
    subject: 'Administrative coordination bottleneck with local authority',
    departmentCategory: 'स्थानिक महानगरपालिका / नगरपरिषद',
    description: 'Delayed response for trade license renewal.',
    files: [],
    referenceId: 'DEMO-GRV-9900',
  };

  const letterMr = buildGeneratedLetter(form, buildInitialLetterFields(form, 'mr'), 'mr');
  assert(letterMr.enclosures.length === 1, 'Case 6: Fallback enclosure present');
  assert(letterMr.enclosures[0].includes('स्थळपाहणी'), 'Case 6: Clear statement regarding on-site inspection');

  const letterEn = buildGeneratedLetter(form, buildInitialLetterFields(form, 'en'), 'en');
  assert(letterEn.enclosures[0].includes('inspection'), 'Case 6: English fallback enclosure');
  console.log('✓ Case 6 Passed: Complaint with no supporting documents.');
}

// Case 7: Complaint with multiple supporting documents
{
  const form: GrievanceLetterFormData = {
    businessName: 'Thane Precision Works',
    contactPerson: 'Milind Sawant',
    designation: 'Quality Head',
    email: 'msawant@thaneprecision.com',
    phone: '9822667788',
    district: 'ठाणे',
    industryType: 'Automotive Spares',
    locationArea: 'Wagle Estate, Thane',
    category: 'permissions_approvals',
    subject: 'Factory layout expansion NOC pending',
    departmentCategory: 'DISH / Directorate of Industries',
    description: 'Application was submitted 6 months ago under reference NOC/2026/184.',
    files: [
      { name: 'acknowledgement_receipt.pdf', size: 1024 * 120 },
      { name: 'approved_plan_draft.pdf', size: 1024 * 940 },
      { name: 'fire_noc_clearance.pdf', size: 1024 * 310 },
      { name: 'site_photographs.zip', size: 1024 * 4500 },
    ],
    referenceId: 'DEMO-GRV-4411',
  };

  const letter = buildGeneratedLetter(form, buildInitialLetterFields(form, 'mr'), 'mr');
  assert(letter.enclosures.length === 4, 'Case 7: All 4 enclosures listed');
  assert(letter.enclosures[0].includes('acknowledgement_receipt.pdf'), 'Case 7: First file name present');
  assert(letter.enclosures[3].includes('site_photographs.zip'), 'Case 7: Zip file present');
  console.log('✓ Case 7 Passed: Complaint with multiple supporting documents.');
}

// Case 8: Long complaint description single-page optimization
{
  const longDesc = `आमच्या युनिटमध्ये सलग तीन महिन्यांपासून उत्पादन प्रक्रियेत गंभीर व्यत्यय येत आहे. व्होल्टेज ३२० व्होल्टपर्यंत घसरल्यामुळे सीएनसी मशीन बंद पडतात आणि तयार होत असलेले ऑटो गियर्स सदोष होतात. यामुळे कंपनीला दररोज मोठे आर्थिक नुकसान होत आहे.`;

  const form: GrievanceLetterFormData = {
    businessName: 'Sai Forgings Private Limited',
    contactPerson: 'Suresh Patil',
    designation: 'Managing Director',
    email: 'patil@saiforgings.in',
    phone: '9822778899',
    district: 'सांगली',
    industryType: 'Heavy Forging',
    locationArea: 'Kupwad MIDC',
    category: 'electricity_utilities',
    subject: 'Continuous industrial feeder failure and heavy financial loss',
    departmentCategory: 'महावितरण (MSEDCL)',
    description: longDesc,
    files: [],
    referenceId: 'DEMO-GRV-8822',
  };

  const letter = buildGeneratedLetter(form, buildInitialLetterFields(form, 'mr'), 'mr');
  const html = generatePrintableLetterHtml(letter);
  assert(html.includes('Sai Forgings Private Limited'), 'Case 8: Long letter includes company');
  assert(html.includes('auto'), 'Case 8: Max-width styling present');
  console.log('✓ Case 8 Passed: Long complaint description optimization.');
}

// Case 9: Missing optional fields handled gracefully
{
  const form: GrievanceLetterFormData = {
    businessName: '',
    contactPerson: '',
    designation: '',
    email: '',
    phone: '',
    district: '',
    industryType: '',
    locationArea: '',
    category: 'other',
    subject: '',
    departmentCategory: '',
    incidentPeriod: '',
    description: 'General industrial operational bottleneck representation.',
    files: [],
    referenceId: 'DEMO-GRV-0001',
  };

  const fields = buildInitialLetterFields(form, 'mr');
  const letter = buildGeneratedLetter(form, fields, 'mr');
  assert(letter.signatory.company.length > 0, 'Case 9: Signatory company has fallback');
  assert(letter.signatory.name.length > 0, 'Case 9: Signatory has fallback label');
  console.log('✓ Case 9 Passed: Missing optional fields.');
}

// Case 10: Editing the generated letter
{
  const form: GrievanceLetterFormData = {
    businessName: 'Dynamic Tooling Co.',
    contactPerson: 'Ramesh Pawar',
    designation: 'Partner',
    email: 'ramesh@dynamictool.in',
    phone: '9822889900',
    district: 'पुणे',
    industryType: 'Tooling',
    locationArea: 'Chakan MIDC Phase 2',
    category: 'midc_infrastructure',
    subject: 'Stormwater drain overflowing',
    departmentCategory: 'MIDC',
    description: 'Drain overflow during rain.',
    files: [],
    referenceId: 'DEMO-GRV-6633',
  };

  const initialFields = buildInitialLetterFields(form, 'mr');
  const editedFields = {
    ...initialFields,
    subject: 'चाकण फेज २ मधील मुख्य जलनिस्सारण वाहिनी तुंबल्याबाबत',
    bodyParagraph3: 'पुढील २४ तासांत स्वच्छता व ड्रेनेज व्हॅक्यूम वाहन पाठवून अडथळा दूर करावा, ही नम्र विनंती.',
    recipientAddress: 'MIDC चाकण उपविभाग कार्यालय, आंबेठाण चौक, चाकण',
  };

  const letter = buildGeneratedLetter(form, editedFields, 'mr');
  assert(letter.subjectLine.includes('चाकण फेज २'), 'Case 10: Custom subject preserved');
  assert(letter.bodyParagraphs[2].includes('२४ तासांत'), 'Case 10: Custom paragraph 3 preserved');
  assert(letter.recipientBlock.some((l) => l.includes('आंबेठाण चौक')), 'Case 10: Custom recipient address preserved');
  console.log('✓ Case 10 Passed: Editing the generated letter.');
}

// Case 11: Date formatting in Marathi and English
{
  const testDate = new Date('2026-11-18T10:00:00Z');
  const dateMr = formatLetterDate(testDate, 'mr');
  const dateEn = formatLetterDate(testDate, 'en');

  assert(dateMr.includes('नोव्हेंबर'), `Case 11: Marathi date contains Devanagari month (${dateMr})`);
  assert(dateEn.includes('November 2026'), `Case 11: English date contains English month (${dateEn})`);
  console.log('✓ Case 11 Passed: Date formatting in Marathi & English.');
}

// Case 12: Consistency with grievance tracking reference
{
  const form: GrievanceLetterFormData = {
    businessName: 'Shree Ganesh Engineering',
    contactPerson: 'Ganesh Shinde',
    designation: 'Managing Director',
    email: 'gshinde@ganesh-engg.com',
    phone: '9822001122',
    district: 'सातारा',
    industryType: 'Automotive Ancillary',
    locationArea: 'Old MIDC Satara',
    category: 'permissions_approvals',
    subject: 'Building completion certificate issuance',
    departmentCategory: 'MIDC',
    description: 'Factory building completion certificate application pending since January.',
    files: [],
    referenceId: 'DEMO-GRV-4040',
  };

  const letterMr = buildGeneratedLetter(form, buildInitialLetterFields(form, 'mr'), 'mr');
  const letterEn = buildGeneratedLetter(form, buildInitialLetterFields(form, 'en'), 'en');

  assert(letterMr.referenceId === 'DEMO-GRV-4040', 'Case 12: Marathi letter ref matches tracking ID');
  assert(letterEn.referenceId === 'DEMO-GRV-4040', 'Case 12: English letter ref matches tracking ID');
  assert(Boolean(letterMr.referenceLine?.includes('DEMO-GRV-4040')), 'Case 12: Marathi letter reference line matches');
  assert(Boolean(letterEn.referenceLine?.includes('DEMO-GRV-4040')), 'Case 12: English letter reference line matches');
  console.log('✓ Case 12 Passed: Consistency with complaint tracking reference.');
}

console.log('--- ALL 12 TEST CASES PASSED SUCCESSFULLY (NEAT & CLEAN)! ---');
