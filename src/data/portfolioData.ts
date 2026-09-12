import { Project, Service, ProcessStep, SkillCategory, Certificate } from '../types';

export const PERSONAL_INFO = {
  name: 'GOURAV BOSE',
  role: 'Data Entry Specialist & Operations Professional',
  tagline: 'Transforming Raw Data into Actionable Insights',
  email: 'gouravbose6@gmail.com', // Updated from gouravbose@gmail.com
  phone: '+91 7679383915',
  location: 'West Bengal, India',
  linkedin: 'https://linkedin.com/in/gourav-bose',
  github: 'https://github.com/gourav20000006',
  about:
    'Motivated Commerce student with practical experience in computer operations and data management. Skilled in utilizing intermediate Excel functions, including Vlookup and data analysis, data entry tools, to organize and retrieve complex information. Having developed a disciplined and detail-oriented approach through operations at Flipkart, I am prepared to contribute effectively to professional business environments.',
  stats: [
    { value: '5+', label: 'Data Projects' },
    { value: '5+', label: 'Clients Served' },
    { value: '1+', label: 'Year Experience' },
    { value: '99%', label: 'Accuracy Rate' },
  ],
};

export const PROJECTS: Project[] = [
  {
    id: 'ecommerce',
    title: 'E-Commerce Order & Tax Registry',
    description:
      'High-volume order and tax register for an online health & nutrition storefront. Handled 1,436 real customer transactions totaling ₹15,06,779 in revenue with automated discount reconciliations, tax tier categorizations (5%, 12%, 18%), and dispatch fulfillment status tracking.',
    tag: 'E-Commerce Store',
    tools: ['Microsoft Excel', 'GST / Tax Tiering', 'VLOOKUP / SUMIFS', 'Order Reconciliation'],
    metrics: '1,436 Orders | 2,301 Units Sold | ₹15,06,779 Gross Revenue',
    highlights: [
      'Processed 1,436 multi-item customer orders across protein, vitamins, and wellness foods',
      'Calculated automated multi-bracket GST tax tiers (5%, 12%, 18%) and itemized discounts',
      'Tracked order fulfillment lifecycle across Delivered (1,280), Shipped, and Return statuses',
    ],
    mockupType: 'ecommerce',
    software: 'excel',
    sheetName: 'Health_Nutrition_Sales_Master.xlsx',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'fashion_pivot',
    title: 'Apparel Orders & Revenue Pivot Analysis',
    description:
      'Compiled and structured a 550+ transaction fashion order book covering Kurti sets, dresses, and traditional wear across 24 Indian cities. Built multi-level Pivot Tables to aggregate unit sales and regional revenues.',
    tag: 'Pivot Tables & Analysis',
    tools: ['Excel Pivot Tables', 'Revenue Aggregations', 'Category Grouping', 'Regional Logistics'],
    metrics: '835 Units Dispatched | ₹17,60,073 Net Revenue across 24 Metros',
    highlights: [
      'Engineered Pivot Table breakdowns: Kurtis (₹10.06L), Kurta Sets (₹4.78L), Dresses (₹2.75L)',
      'Mapped regional shipping logs across Delhi, Jaipur, Lucknow, Mumbai, Pune, and Bangalore',
      'Analyzed order fulfillment vs return rates (94%+ delivery success rate)',
    ],
    mockupType: 'fashion_pivot',
    software: 'excel',
    sheetName: 'Fashion_Orders_Pivot_Summary.xlsx',
    image: 'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'hr_attendance',
    title: 'HR Staff Master & Attendance Log',
    description:
      'Engineered an enterprise HR employee master directory and daily biometric shift attendance tracking system. Configured department-wise headcount pivot tables across Finance and Sales divisions with in/out punch-time validation.',
    tag: 'HR Operations',
    tools: ['Headcount Pivot Tables', 'Shift In/Out Calculations', 'Employee Master ID', 'Time Tracking'],
    metrics: '483 Employee Headcount audited with 100% attendance precision',
    highlights: [
      'Structured 483-person employee database across Finance (252) and Sales (231) departments',
      'Maintained sequential alphanumeric employee profiles (E001–E050) with role designations',
      'Validated daily punch-in/out timestamps and automated Full-Day vs Half-Day status flags',
    ],
    mockupType: 'hr_attendance',
    software: 'excel',
    sheetName: 'HR_Staff_Attendance_Matrix.xlsx',
    image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'flipkart',
    title: 'Flipkart Operations & Dispatch Log',
    description:
      'Trained at Flipkart Supply Chain Operations Academy (SCOA). Managed real-time inventory barcode validation, inbound bin staging, and courier dispatch logs under strict SLA deadlines.',
    tag: 'Supply Chain Operations',
    tools: ['Flipkart Hub Dispatching', 'Barcode Audit Logs', 'SLA Target Formulas', 'Google Sheets'],
    metrics: 'Fast-turnaround dispatch logging under 45-minute SLA benchmarks',
    highlights: [
      'Executed live shipment manifests, inbound bin auditing, and outward logistics logging',
      'Maintained strict verification against Flipkart hub dispatch deadlines',
      'Formalized through official Flipkart SCOA Data Entry Operator (DEO) program',
    ],
    mockupType: 'flipkart',
    software: 'sheets',
    sheetName: 'Flipkart_SCOA_Dispatch_Log.gsheet',
    image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'cleaning',
    title: 'Data Cleaning & Validation',
    description:
      'Sanitized corrupted and unstructured raw datasets from legacy exports. Normalized telephone digits to international E.164 standard, trimmed irregular spacing, eliminated duplicate leads, and corrected misspelled email domains.',
    tag: 'Data Hygiene',
    tools: ['TRIM & PROPER', 'Duplicate Elimination', 'Regex Data Scrubbing', 'Error Flagging'],
    metrics: '40% improvement in database hygiene score across 15,000+ records',
    highlights: [
      'Purged redundant lead entries and normalized address fields',
      'Automated formula-based syntax verification for phone and email columns',
      'Standardized text capitalization and eliminated trailing white-spaces',
    ],
    mockupType: 'cleaning',
    software: 'sheets',
    sheetName: 'Data_Hygiene_Validation.gsheet',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'merging',
    title: 'Multi-Source Data Merging',
    description:
      'Consolidated disconnected inventory feeds, distributor CSVs, and POS receipts into one synchronized master dataset. Resolved conflicting SKU schemas using robust formula lookups.',
    tag: 'Data Merging',
    tools: ['INDEX/MATCH', 'XLOOKUP', 'Schema Reconciliation', 'Master Key Mapping'],
    metrics: '5 disparate vendor feeds unified into 1 live reconciled master',
    highlights: [
      'Linked cross-system vendor identifiers into normalized master keys',
      'Resolved discrepancies across multi-currency and differing date formats',
      'Delivered unified monthly inventory status reports for management review',
    ],
    mockupType: 'merging',
    software: 'excel',
    sheetName: 'Unified_Vendor_Master.xlsx',
    image: 'https://images.unsplash.com/photo-1543286386-713bdd548da4?auto=format&fit=crop&w=800&q=80',
  },
];

export const SERVICES: Service[] = [
  {
    id: 'data-entry',
    icon: '📊',
    title: 'Data Entry',
    description:
      'Fast and accurate data entry with 99%+ accuracy. Experience with various data entry tools, spreadsheets, and databases. Capable of handling large datasets efficiently.',
    features: ['High-speed keystroke accuracy', 'Custom CRM / CMS data input', 'Digitizing paper / PDF records'],
  },
  {
    id: 'data-cleaning',
    icon: '🧹',
    title: 'Data Cleaning',
    description:
      'Remove duplicates, standardize formats, and validate data quality. Use advanced Excel functions to identify and fix data inconsistencies and improve overall data reliability.',
    features: ['Deduplication algorithms', 'Field normalization & regex trimming', 'Missing value imputation'],
  },
  {
    id: 'data-merging',
    icon: '🔗',
    title: 'Data Merging',
    description:
      'Consolidate data from multiple sources into unified databases. Manage complex data relationships, resolve discrepancies, and ensure seamless integration across systems.',
    features: ['Multi-vendor sync', 'Schema reconciliation', 'Single source of truth creation'],
  },
  {
    id: 'excel-analysis',
    icon: '📈',
    title: 'Excel Analysis',
    description:
      'Advanced Excel functions including VLOOKUP, INDEX-MATCH, Pivot Tables. Create automated reports, dashboards, and data visualizations for actionable business insights.',
    features: ['Custom dashboard design', 'Complex formula modeling', 'Automated recurring reports'],
  },
  {
    id: 'database-mgmt',
    icon: '💾',
    title: 'Database Management',
    description:
      'Organize, maintain, and optimize databases. Implement data structure best practices, ensure consistency, and create efficient retrieval systems for quick access.',
    features: ['Structured data architecture', 'Access protocol compliance', 'Backup & recovery routines'],
  },
  {
    id: 'quality-assurance',
    icon: '✅',
    title: 'Quality Assurance',
    description:
      'Verify data accuracy through multiple validation methods. Conduct thorough quality checks, generate error reports, and implement corrective measures for continuous improvement.',
    features: ['Dual-pass verification', 'Exception audit logging', 'Strict 99%+ accuracy guarantees'],
  },
];

export const PROCESS_STEPS: ProcessStep[] = [
  {
    stepNumber: '01',
    title: 'You Send the Data',
    description:
      "Send me your spreadsheet, files, website, or instructions. I'm ready to work with any format — Excel, CSV, Google Sheets, or even paper data that needs digitizing.",
    delivery: 'Accepted formats: .xlsx, .csv, Google Drive, PDFs, Scanned files',
  },
  {
    stepNumber: '02',
    title: 'I Process & Clean It',
    description:
      'I organize, clean, validate, and structure your data. Using advanced Excel functions and proven processes, I transform messy data into organized, usable information.',
    delivery: 'Rigorous deduplication, formatting standardization, and formula checks',
  },
  {
    stepNumber: '03',
    title: 'Quality Check',
    description:
      'I check for duplicates, missing information, and formatting errors. Every dataset goes through multiple validation checks to ensure 99%+ accuracy before delivery.',
    delivery: 'Comprehensive audit log with discrepancy summary report',
  },
  {
    stepNumber: '04',
    title: 'You Receive Final Files',
    description:
      'Clean, organized, and ready-to-use data. Delivered in your preferred format with clear documentation, so you can immediately start using the results.',
    delivery: 'Turnaround within deadline with revision support guaranteed',
  },
];

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    title: 'Core Competencies',
    skills: [
      'Data Entry & Data Management',
      'Excel (Intermediate & Advanced)',
      'Data Cleaning & Validation',
      'Database Organization',
      'VLOOKUP, XLOOKUP & Index-Match',
      'Pivot Tables & Summary Models',
    ],
  },
  {
    title: 'Professional Tools',
    skills: [
      'Microsoft Excel (365 / Desktop)',
      'Google Sheets & Cloud Docs',
      'Data Entry & Audit Utilities',
      'Spreadsheet Data Analysis',
      'E-commerce Portals & Admin CMS',
      'Inventory & Flipkart Operations Systems',
    ],
  },
  {
    title: 'Soft Skills',
    skills: [
      'Extreme Attention to Detail',
      'Strict Time Management & Deadlines',
      'Analytical Problem Solving',
      'Clear Stakeholder Communication',
      'Rapid Tool Onboarding',
      '99%+ Accuracy Discipline',
    ],
  },
];

export const CERTIFICATES: Certificate[] = [
  {
    id: 'data-analyst-101',
    title: 'Data Analyst 101',
    certificateType: 'Declaration of Completion',
    issuer: 'Simplilearn SkillUp',
    partner: 'Powered by Microsoft',
    recipient: 'Gourav Bose',
    issueDate: '22nd April 2026',
    credentialId: '10140931',
    signatory: 'Krishna Kumar',
    signatoryTitle: 'CEO, Simplilearn',
    note: 'This professional has demonstrated initiative and a commitment to deepening their skills and advancing their career. Well done!',
    skillsAcquired: [
      'Data Analytics Lifecycle',
      'Microsoft Analytical Ecosystem',
      'Spreadsheet Data Analysis',
      'Statistical Interpretation',
      'Data Cleansing & Validation',
    ],
    type: 'simplilearn-microsoft',
    badgeColor: '#00a4ef',
    verified: true,
  },
  {
    id: 'flipkart-scoa-deo',
    title: 'SCOA Data Entry Operator (DEO) Training Program',
    certificateType: 'Certificate of Completion',
    issuer: 'Supply Chain Operations Academy (S.C.O.A)',
    partner: 'Flipkart (flipkartacademy.com)',
    recipient: 'Gourav Bose',
    issueDate: '20/06/2026',
    credentialId: 'REG472788',
    note: 'Awarded for having successfully passed the pre-assessment test SCOA Data Entry Operator (DEO) Training Program exam and demonstrated exemplary performance.',
    skillsAcquired: [
      'High-Volume Data Entry Operations',
      'Supply Chain & Inbound/Outbound Logistics',
      'Fast Hub Dispatching & SLA Compliance',
      'Barcode Scanning Verification',
      'Zero-Error Quality Audit Practices',
    ],
    type: 'flipkart-scoa',
    badgeColor: '#2874f0',
    verified: true,
  },
];
