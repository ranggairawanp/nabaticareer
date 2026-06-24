/**
 * nabati_career_data.js
 * Shared data layer for Nabati Career MicroApp
 * 
 * STRUCTURE:
 * - Mock data for demo/staging
 * - API_CONFIG: replace BASE_URL to connect to Nabati backend
 * - Each function has a stub comment showing the real endpoint
 *
 * IT INTEGRATION GUIDE:
 * 1. Set API_CONFIG.BASE_URL to your backend URL
 * 2. Set API_CONFIG.USE_MOCK = false
 * 3. Each function calls the stub endpoint when USE_MOCK is false
 * 4. Auth token is stored in sessionStorage under 'nabati_auth_token'
 */

var API_CONFIG = {
  BASE_URL: 'https://api.nabatigroup.com/hcms/v1',
  USE_MOCK: true,
  VERSION: '1.0.0',
  OFFER_LETTER_URL: 'https://api.nabatigroup.com/hcms/v1/offer-letter'
};

// ─────────────────────────────────────────────
// MOCK JOB DATA
// ─────────────────────────────────────────────
var MOCK_JOBS = [
  {
    id: 'JOB-2026-001',
    title: 'Sales Supervisor',
    department: 'Sales and Distribution',
    category: 'sales',
    location: 'Bandung, Indonesia',
    country: 'ID',
    level: 'Supervisor',
    type: 'Full-time',
    grade: '4B',
    posted: '2026-06-15',
    deadline: '2026-07-15',
    status: 'open',
    headcount: 3,
    summary: 'Lead and grow our sales team across West Java territory, driving distribution targets and building channel partnerships.',
    responsibilities: [
      'Manage and coach a team of 8-12 field sales representatives',
      'Achieve monthly and quarterly revenue targets for assigned territory',
      'Build and maintain relationships with key modern trade and general trade accounts',
      'Analyze sales data and develop action plans to close performance gaps',
      'Coordinate with supply chain on product availability and distribution coverage'
    ],
    qualifications: [
      'Minimum S1 in any discipline; business or marketing preferred',
      'At least 3 years in FMCG field sales, with 1 year in supervisory role',
      'Strong territory management and data analysis skills',
      'Own vehicle and willing to travel within assigned territory',
      'Proficient in MS Excel and familiar with trade management tools'
    ],
    recruiter_id: 'REC-002',
    mpn_id: 'MPN-2026-0087'
  },
  {
    id: 'JOB-2026-002',
    title: 'Production Operator',
    department: 'Manufacturing',
    category: 'manufacturing',
    location: 'Sumedang, Indonesia',
    country: 'ID',
    level: 'Staff',
    type: 'Full-time',
    grade: '3A',
    posted: '2026-06-18',
    deadline: '2026-07-18',
    status: 'open',
    headcount: 10,
    summary: 'Operate production lines with focus on food safety, efficiency, and quality standards at our Sumedang plant.',
    responsibilities: [
      'Operate and monitor production machinery according to SOPs',
      'Maintain GMP standards and food hygiene requirements on the floor',
      'Record production data accurately in daily shift logs',
      'Report equipment abnormalities to line supervisor immediately',
      'Participate in 5S and continuous improvement activities'
    ],
    qualifications: [
      'Minimum SMA/SMK in any discipline',
      'Willing to work rotating 3-shift schedule including weekends',
      'No experience required; manufacturing or food production experience is a plus',
      'Physically fit, health certificate required before joining',
      'Domicile near Sumedang or willing to relocate'
    ],
    recruiter_id: 'REC-003',
    mpn_id: 'MPN-2026-0092'
  },
  {
    id: 'JOB-2026-003',
    title: 'Supply Chain Analyst',
    department: 'Supply Chain',
    category: 'supply_chain',
    location: 'Jakarta, Indonesia',
    country: 'ID',
    level: 'Officer',
    type: 'Full-time',
    grade: '3C',
    posted: '2026-06-20',
    deadline: '2026-07-20',
    status: 'open',
    headcount: 2,
    summary: 'Drive supply chain visibility and efficiency through data analysis, demand planning support, and process improvement.',
    responsibilities: [
      'Analyze inventory levels, stock movement, and demand patterns across distribution network',
      'Support monthly demand planning cycle with data preparation and variance analysis',
      'Monitor KPIs including OTIF, fill rate, and days of inventory',
      'Identify supply chain bottlenecks and propose improvement initiatives',
      'Coordinate with logistics, warehouse, and procurement teams'
    ],
    qualifications: [
      'S1 in Industrial Engineering, Logistics, or related field',
      'Minimum 2 years in supply chain, logistics, or operations analyst role',
      'Proficient in Excel; experience with SAP or WMS a strong advantage',
      'Strong analytical thinking and attention to detail',
      'Good communication skills in Bahasa Indonesia and English'
    ],
    recruiter_id: 'REC-001',
    mpn_id: 'MPN-2026-0078'
  },
  {
    id: 'JOB-2026-004',
    title: 'HR Business Partner',
    department: 'Human Capital',
    category: 'corporate',
    location: 'Bandung, Indonesia',
    country: 'ID',
    level: 'Officer',
    type: 'Full-time',
    grade: '3C',
    posted: '2026-06-22',
    deadline: '2026-07-22',
    status: 'open',
    headcount: 1,
    summary: 'Partner with business leaders across assigned functions to drive people agenda, organizational effectiveness, and talent development.',
    responsibilities: [
      'Serve as strategic HR partner for 2-3 business functions with combined headcount of 200-400',
      'Drive annual people processes including performance review, succession planning, and engagement survey',
      'Advise managers on employee relations, performance improvement, and disciplinary matters',
      'Collaborate with CoEs (Talent, Learning, C&B) to execute people programs',
      'Analyze people data and translate into actionable insights for business leaders'
    ],
    qualifications: [
      'S1 in Psychology, Management, or related field; S2 preferred',
      'Minimum 4 years in HR, with at least 2 years as HRBP or equivalent',
      'Strong business acumen and stakeholder management skills',
      'Experience in FMCG or manufacturing environment preferred',
      'Familiar with Indonesian labor law and HR systems'
    ],
    recruiter_id: 'REC-001',
    mpn_id: 'MPN-2026-0081'
  },
  {
    id: 'JOB-2026-005',
    title: 'Data Engineer',
    department: 'Technology',
    category: 'technology',
    location: 'Bandung, Indonesia',
    country: 'ID',
    level: 'Officer',
    type: 'Full-time',
    grade: '3C',
    posted: '2026-06-23',
    deadline: '2026-07-23',
    status: 'open',
    headcount: 2,
    summary: 'Build and maintain scalable data pipelines supporting Nabati Group analytics and One HCMS platform.',
    responsibilities: [
      'Design and develop ETL/ELT pipelines across multiple data sources',
      'Maintain data warehouse infrastructure and optimize query performance',
      'Collaborate with analytics and product teams on data model design',
      'Implement data quality monitoring and alerting',
      'Document data lineage, schemas, and pipeline architecture'
    ],
    qualifications: [
      'S1 in Computer Science, Informatics, or related field',
      'Minimum 2 years experience building production data pipelines',
      'Proficient in Python and SQL; experience with Spark or dbt a plus',
      'Familiar with cloud data platforms (GCP BigQuery, AWS Redshift, or Azure Synapse)',
      'Experience with orchestration tools (Airflow, Prefect, or equivalent)'
    ],
    recruiter_id: 'REC-003',
    mpn_id: 'MPN-2026-0095'
  },
  {
    id: 'JOB-2026-006',
    title: 'Quality Assurance Supervisor',
    department: 'Manufacturing',
    category: 'manufacturing',
    location: 'Garut, Indonesia',
    country: 'ID',
    level: 'Supervisor',
    type: 'Full-time',
    grade: '4B',
    posted: '2026-06-23',
    deadline: '2026-07-30',
    status: 'open',
    headcount: 1,
    summary: 'Lead QA team at Garut plant to ensure product quality, food safety compliance, and continuous improvement of quality systems.',
    responsibilities: [
      'Supervise daily QC activities across incoming, in-process, and finished goods',
      'Maintain and improve HACCP, GMP, and halal certification compliance',
      'Investigate and resolve customer complaints and non-conformance reports',
      'Lead internal quality audits and support external audits (BPOM, halal, ISO)',
      'Train production team on quality standards and food safety awareness'
    ],
    qualifications: [
      'S1 in Food Technology, Chemistry, or related science field',
      'Minimum 3 years in QA/QC in food manufacturing, 1 year supervisory',
      'Certified in HACCP, GMP, or food safety management systems',
      'Strong knowledge of BPOM regulations and halal standards',
      'Willing to be based in Garut'
    ],
    recruiter_id: 'REC-002',
    mpn_id: 'MPN-2026-0088'
  }
  ,
  {
    id: 'JOB-2026-007',
    title: 'Product Manager - Digital HC',
    department: 'Technology',
    category: 'technology',
    location: 'Jakarta, Indonesia',
    country: 'ID',
    level: 'Manager',
    type: 'Full-time',
    grade: '5A',
    posted: '2026-06-10',
    deadline: '2026-07-10',
    status: 'open',
    headcount: 1,
    summary: 'Own the product roadmap for One HCMS digital platform. Translate HC business needs into product specs, lead cross-functional delivery, and drive adoption across 32,000 employees in 15+ countries.',
    responsibilities: [
      'Define and own the product roadmap for One HCMS modules including ESS, PMS, LMS, and TA',
      'Conduct discovery with HCBP, line managers, and employees to surface workflow gaps',
      'Write clear PRDs, user stories, and acceptance criteria for engineering squads',
      'Lead sprint reviews, prioritize backlog, and manage stakeholder expectations',
      'Define and monitor product KPIs: adoption rate, task completion, time-to-hire, NPS'
    ],
    qualifications: [
      'Minimum 4 years as Product Manager, preferably in HRtech, enterprise SaaS, or B2B platforms',
      'Strong proficiency in product discovery, roadmapping, and agile delivery',
      'Comfortable reading data: SQL basics, analytics dashboards, funnel analysis',
      'Excellent communication in Bahasa Indonesia and English',
      'Experience with multi-country, multi-entity product rollouts is a plus'
    ],
    recruiter_id: 'REC-003',
    mpn_id: 'MPN-2026-0091'
  },
  {
    id: 'JOB-2026-008',
    title: 'UI/UX Designer - Digital Products',
    department: 'Technology',
    category: 'technology',
    location: 'Jakarta, Indonesia',
    country: 'ID',
    level: 'Officer',
    type: 'Full-time',
    grade: '4B',
    posted: '2026-06-12',
    deadline: '2026-07-12',
    status: 'open',
    headcount: 2,
    summary: 'Design intuitive, accessible digital experiences for One HCMS across web and mobile. Work closely with product and engineering to ship high-quality interfaces used by 32,000 employees.',
    responsibilities: [
      'Own end-to-end UX for assigned modules: research, wireframes, prototypes, handoff',
      'Conduct usability tests with real users from factory floor to C-Level',
      'Maintain and evolve the One HCMS design system across all platforms',
      'Create high-fidelity UI in Figma with dev-ready specs and component documentation',
      'Collaborate with engineers to ensure pixel-accurate, performant implementation'
    ],
    qualifications: [
      'Minimum 3 years in product/UX design for web and mobile applications',
      'Strong Figma proficiency: components, auto-layout, prototyping, variables',
      'Portfolio showing end-to-end design process including research and iteration',
      'Understanding of accessibility (WCAG 2.1 AA) and mobile-first design principles',
      'Experience with enterprise or HR products is a strong advantage'
    ],
    recruiter_id: 'REC-003',
    mpn_id: 'MPN-2026-0092'
  },
  {
    id: 'JOB-2026-009',
    title: 'Technical Lead - Full-stack Engineering',
    department: 'Technology',
    category: 'technology',
    location: 'Jakarta, Indonesia',
    country: 'ID',
    level: 'Senior Manager',
    type: 'Full-time',
    grade: '5B',
    posted: '2026-06-08',
    deadline: '2026-07-08',
    status: 'open',
    headcount: 1,
    summary: 'Lead the core engineering squad building One HCMS. Architect scalable multi-tenant systems, mentor engineers, and drive technical excellence across a high-stakes platform serving 32,000 employees.',
    responsibilities: [
      'Architect and own the technical design of core HCMS modules: identity, payroll engine, org design',
      'Lead a squad of 5-8 engineers, setting coding standards, reviewing PRs, and unblocking delivery',
      'Make key technology decisions: database schema, API contracts, service boundaries, data plane isolation',
      'Collaborate with PM and QA on delivery planning, risk identification, and technical debt management',
      'Drive observability, security posture, and compliance readiness (ISO 27001, UU PDP)'
    ],
    qualifications: [
      'Minimum 6 years of software engineering, with 2+ years in a tech lead or architect role',
      'Deep expertise in at least one backend stack (Node.js, Python, or Java/Kotlin) and SQL databases',
      'Experience designing multi-tenant SaaS systems with RBAC, effective dating, and audit trails',
      'Familiar with cloud infrastructure (AWS/GCP/Azure), CI/CD pipelines, and container orchestration',
      'Strong communication skills; comfortable translating technical complexity to non-technical stakeholders'
    ],
    recruiter_id: 'REC-003',
    mpn_id: 'MPN-2026-0093'
  },
  {
    id: 'JOB-2026-010',
    title: 'Full-stack Developer - HCMS Platform',
    department: 'Technology',
    category: 'technology',
    location: 'Jakarta / Bandung, Indonesia',
    country: 'ID',
    level: 'Officer',
    type: 'Full-time',
    grade: '4A',
    posted: '2026-06-14',
    deadline: '2026-07-14',
    status: 'open',
    headcount: 4,
    summary: 'Build and ship features across the One HCMS stack, from API design to React UI. Work on modules that directly impact 32,000 employees across 15 countries.',
    responsibilities: [
      'Develop and maintain RESTful APIs and microservices using Node.js or Python FastAPI',
      'Build responsive, accessible front-end components using React and Tailwind CSS',
      'Write unit and integration tests with coverage targets above 80%',
      'Participate in architecture discussions, sprint planning, and code reviews',
      'Integrate with third-party services: payroll engines, BPJS, tax systems, biometric SDKs'
    ],
    qualifications: [
      'Minimum 3 years of full-stack development experience',
      'Proficient in JavaScript/TypeScript, React, and Node.js or Python',
      'Experience with PostgreSQL or MySQL and RESTful API design patterns',
      'Familiar with Git workflow, agile ceremonies, and CI/CD basics',
      'Experience with HR, payroll, or enterprise systems is a plus'
    ],
    recruiter_id: 'REC-004',
    mpn_id: 'MPN-2026-0094'
  }
];

// ─────────────────────────────────────────────
// MOCK CANDIDATES (for recruiter console)
// ─────────────────────────────────────────────
var MOCK_CANDIDATES = [
  {
    id: 'CAND-2026-00341',
    name: 'Andika Pratama',
    email: 'andika.pratama@gmail.com',
    phone: '0812-3456-7890',
    location: 'Bandung',
    job_id: 'JOB-2026-001',
    applied_at: '2026-06-20T09:14:00Z',
    stage: 'under_review',
    source: 'career_site',
    score_fit: 82,
    education: 'S1 Manajemen, Universitas Padjadjaran',
    exp_years: 4,
    last_role: 'Area Sales Representative, PT Unilever Indonesia',
    expected_salary: '8.000.000 - 10.000.000',
    available_date: '2026-07-15',
    flk_complete: true,
    notes: 'Strong territory management track record. Scored high on sales aptitude screen.',
    recruiter_id: 'REC-002'
  },
  {
    id: 'CAND-2026-00342',
    name: 'Siti Rahayu',
    email: 'siti.rahayu89@yahoo.com',
    phone: '0878-9012-3456',
    location: 'Cimahi',
    job_id: 'JOB-2026-001',
    applied_at: '2026-06-21T11:32:00Z',
    stage: 'ta_iv_done',
    source: 'jobstreet',
    score_fit: 74,
    education: 'S1 Teknik Industri, Universitas Telkom',
    exp_years: 3,
    last_role: 'Sales Representative, PT Mayora Indah',
    expected_salary: '7.500.000 - 9.000.000',
    available_date: '2026-08-01',
    flk_complete: true,
    notes: 'Interview scheduled via Teams for June 25. Referral from current Nabati employee.',
    recruiter_id: 'REC-002'
  },
  {
    id: 'CAND-2026-00343',
    name: 'Budi Santoso',
    email: 'budi.santoso77@gmail.com',
    phone: '0822-5678-9012',
    location: 'Sumedang',
    job_id: 'JOB-2026-002',
    applied_at: '2026-06-22T08:05:00Z',
    stage: 'submitted',
    source: 'career_site',
    score_fit: 68,
    education: 'SMK Teknik Mesin, SMKN 1 Sumedang',
    exp_years: 0,
    last_role: 'Fresh graduate',
    expected_salary: '3.500.000 - 4.000.000',
    available_date: '2026-07-01',
    flk_complete: true,
    notes: '',
    recruiter_id: 'REC-003'
  },
  {
    id: 'CAND-2026-00344',
    name: 'Dewi Kusumawati',
    email: 'dewi.kusuma@outlook.com',
    phone: '0813-2109-8765',
    location: 'Jakarta Selatan',
    job_id: 'JOB-2026-003',
    applied_at: '2026-06-21T14:20:00Z',
    stage: 'user_iv_scheduled',
    source: 'linkedin',
    score_fit: 89,
    education: 'S1 Teknik Industri, Institut Teknologi Bandung',
    exp_years: 3,
    last_role: 'Supply Chain Analyst, PT Indofood CBP',
    expected_salary: '9.000.000 - 11.000.000',
    available_date: '2026-07-20',
    flk_complete: true,
    notes: 'Strong SAP background. Passed TA interview with high marks. User interview with SCM Manager on June 26.',
    recruiter_id: 'REC-001'
  },
  {
    id: 'CAND-2026-00345',
    name: 'Reza Firmansyah',
    email: 'reza.firm@gmail.com',
    phone: '0857-6543-2109',
    location: 'Bandung',
    job_id: 'JOB-2026-005',
    applied_at: '2026-06-23T10:45:00Z',
    stage: 'submitted',
    source: 'career_site',
    score_fit: 91,
    education: 'S1 Informatika, Institut Teknologi Bandung',
    exp_years: 3,
    last_role: 'Data Engineer, PT Gojek Indonesia',
    expected_salary: '12.000.000 - 15.000.000',
    available_date: '2026-08-01',
    flk_complete: false,
    notes: 'Applied 2 hours ago. FLK not yet submitted. Strong profile.',
    recruiter_id: 'REC-003'
  },
  {
    id: 'CAND-2026-00346',
    name: 'Nurul Hidayah',
    email: 'nurul.hidayah.hr@gmail.com',
    phone: '0819-8765-4321',
    location: 'Bandung',
    job_id: 'JOB-2026-004',
    applied_at: '2026-06-22T16:10:00Z',
    stage: 'assessment_sent',
    source: 'referral',
    score_fit: 85,
    education: 'S2 Psikologi Industri, Universitas Indonesia',
    exp_years: 5,
    last_role: 'HRBP, PT Astra International',
    expected_salary: '12.000.000 - 14.000.000',
    available_date: '2026-07-15',
    flk_complete: true,
    notes: 'Referred by HC VP. Assessment (Talentlytica) sent June 23. Awaiting results.',
    recruiter_id: 'REC-001'
  }
  ,
  {
    id: 'CAND-2026-00350',
    name: 'Diandra Kusuma',
    email: 'diandra.k@email.com',
    phone: '+62-812-5566-7788',
    location: 'Jakarta, Indonesia',
    education: 'S1 Teknik Informatika, UI',
    exp_years: 5,
    last_role: 'Senior Product Manager, Tokopedia',
    stage: 'ta_iv_scheduled',
    score_fit: 91,
    flk_complete: true,
    job_id: 'JOB-2026-007',
    recruiter_id: 'REC-003',
    source: 'LinkedIn',
    expected_salary: 'Rp 22,000,000 - 28,000,000',
    available_date: '2026-08-01',
    applied_at: '2026-06-16T09:00:00Z',
    notes: 'Strong HRtech background. Was PM for Tokopedia Gadjian integration. Very relevant.',
    score_culture: 85,
    score_technical: 88,
    score_leadership: 82
  },
  {
    id: 'CAND-2026-00351',
    name: 'Farhan Aditya',
    email: 'farhan.aditya@email.com',
    phone: '+62-856-3344-9900',
    location: 'Bandung, Indonesia',
    education: 'S1 Desain Komunikasi Visual, ITB',
    exp_years: 4,
    last_role: 'Senior Product Designer, Gojek',
    stage: 'assessment_sent',
    score_fit: 87,
    flk_complete: true,
    job_id: 'JOB-2026-008',
    recruiter_id: 'REC-003',
    source: 'Jobstreet',
    expected_salary: 'Rp 16,000,000 - 20,000,000',
    available_date: '2026-07-15',
    applied_at: '2026-06-17T11:00:00Z',
    notes: 'Excellent portfolio. Strong enterprise design system work at Gojek.',
    score_culture: 90,
    score_technical: 85,
    score_leadership: 75
  },
  {
    id: 'CAND-2026-00352',
    name: 'Gibran Wicaksono',
    email: 'gibran.w@email.com',
    phone: '+62-821-7788-1122',
    location: 'Jakarta, Indonesia',
    education: 'S2 Computer Science, Universitas Indonesia',
    exp_years: 8,
    last_role: 'Engineering Manager, Bukalapak',
    stage: 'user_iv_scheduled',
    score_fit: 93,
    flk_complete: true,
    job_id: 'JOB-2026-009',
    recruiter_id: 'REC-003',
    source: 'LinkedIn',
    expected_salary: 'Rp 35,000,000 - 45,000,000',
    available_date: '2026-08-15',
    applied_at: '2026-06-12T08:30:00Z',
    notes: 'Led 12-engineer squad at Bukalapak. Multi-tenant SaaS architecture experience. Grade borderline, check with CPO.',
    score_culture: 88,
    score_technical: 96,
    score_leadership: 91
  },
  {
    id: 'CAND-2026-00353',
    name: 'Hana Pertiwi',
    email: 'hana.pertiwi@email.com',
    phone: '+62-812-9900-3344',
    location: 'Jakarta, Indonesia',
    education: 'S1 Ilmu Komputer, BINUS',
    exp_years: 3,
    last_role: 'Full-stack Developer, Kargo Technologies',
    stage: 'submitted',
    score_fit: 79,
    flk_complete: false,
    job_id: 'JOB-2026-010',
    recruiter_id: 'REC-004',
    source: 'Jobstreet',
    expected_salary: 'Rp 11,000,000 - 14,000,000',
    available_date: '2026-07-15',
    applied_at: '2026-06-20T14:00:00Z',
    notes: '',
    score_culture: 80,
    score_technical: 79,
    score_leadership: 68
  },
  {
    id: 'CAND-2026-00354',
    name: 'Ivan Surya',
    email: 'ivan.surya@email.com',
    phone: '+62-856-1122-5566',
    location: 'Surabaya, Indonesia',
    education: 'S1 Teknik Informatika, ITS',
    exp_years: 4,
    last_role: 'Full-stack Engineer, Traveloka',
    stage: 'ta_iv_done',
    score_fit: 84,
    flk_complete: true,
    job_id: 'JOB-2026-010',
    recruiter_id: 'REC-004',
    source: 'LinkedIn',
    expected_salary: 'Rp 13,000,000 - 17,000,000',
    available_date: '2026-07-01',
    applied_at: '2026-06-15T10:00:00Z',
    notes: 'React + Node strong. PostgreSQL multi-schema exp relevant. Passed TA interview well.',
    score_culture: 86,
    score_technical: 84,
    score_leadership: 72
  }
];

// ─────────────────────────────────────────────
// MOCK RECRUITERS
// ─────────────────────────────────────────────
var MOCK_RECRUITERS = {
  'REC-001': { id: 'REC-001', name: 'Ratna Suminar', role: 'TA Manager', email: 'ratna.suminar@nabatisnack.co.id' },
  'REC-002': { id: 'REC-002', name: 'Stella Sondjaja', role: 'TA Assistant Manager', email: 'stella.sondjaja@nabatisnack.co.id' },
  'REC-003': { id: 'REC-003', name: 'Syifa Ramadhani', role: 'TA Specialist', email: 'syifa.ramadhani@nabatisnack.co.id' },
  'REC-004': { id: 'REC-004', name: 'Madyasti Putri', role: 'TA Specialist', email: 'madyasti.putri@nabatisnack.co.id' }
};

// ─────────────────────────────────────────────
// PIPELINE STAGES (matches PRD TA workflow)
// ─────────────────────────────────────────────
// Pipeline stages mengikuti TA Business Process Nabati (Current TA KSNI BP)
// Urutan: FLK -> Screening -> TA Interview -> Assessment -> Business Case -> User Interview
//         -> Document Collection -> Offering Prep -> Reference Check -> MCU -> Offering Letter
//         -> Accepted -> Onboarding
var PIPELINE_STAGES = [
  // ── ACTIVE STAGES ──────────────────────────────────────────────────────────
  { id: 'submitted',            label: 'Application Submitted',    label_id: 'Lamaran Masuk',              color: '#6b7280', active: true,  phase: 'apply'    },
  { id: 'under_review',         label: 'Under Review',             label_id: 'Sedang Ditinjau',            color: '#2563c9', active: true,  phase: 'apply'    },
  { id: 'ta_iv_scheduled',      label: 'TA Interview Scheduled',   label_id: 'Interview TA Dijadwalkan',   color: '#c47d10', active: true,  phase: 'interview'},
  { id: 'ta_iv_done',           label: 'TA Interview Done',        label_id: 'Interview TA Selesai',       color: '#c47d10', active: true,  phase: 'interview'},
  { id: 'assessment_sent',      label: 'Assessment Link Sent',     label_id: 'Link Asesmen Terkirim',      color: '#6d4aa8', active: true,  phase: 'assess'   },
  { id: 'assessment_done',      label: 'Assessment Completed',     label_id: 'Asesmen Selesai',            color: '#6d4aa8', active: true,  phase: 'assess'   },
  { id: 'business_case',        label: 'Business Case Assigned',   label_id: 'Business Case Diberikan',   color: '#6d4aa8', active: true,  phase: 'assess'   },
  { id: 'user_iv_scheduled',    label: 'User Interview Scheduled', label_id: 'Interview User Dijadwalkan', color: '#0e8a8a', active: true,  phase: 'interview'},
  { id: 'user_iv_done',         label: 'User Interview Done',      label_id: 'Interview User Selesai',     color: '#0e8a8a', active: true,  phase: 'interview'},
  { id: 'doc_collection',       label: 'Document Collection',      label_id: 'Pengumpulan Dokumen',        color: '#0e8a8a', active: true,  phase: 'offer'    },
  { id: 'reference_check',      label: 'Reference Check',          label_id: 'Reference Check',            color: '#0e8a8a', active: true,  phase: 'offer'    },
  { id: 'offering_prep',        label: 'Offering Preparation',     label_id: 'Persiapan Penawaran',        color: '#1f9d57', active: true,  phase: 'offer'    },
  { id: 'mcu_process',          label: 'MCU In Process',           label_id: 'MCU Diproses',               color: '#1f9d57', active: true,  phase: 'offer'    },
  { id: 'mcu_sent',             label: 'MCU Letter Sent',          label_id: 'Surat MCU Terkirim',         color: '#1f9d57', active: true,  phase: 'offer'    },
  { id: 'ol_reviewed',          label: 'Offering Letter Reviewed', label_id: 'Offering Letter Ditinjau',   color: '#1f9d57', active: true,  phase: 'offer'    },
  { id: 'ol_sent',              label: 'Offering Letter Sent',     label_id: 'Offering Letter Terkirim',   color: '#1f9d57', active: true,  phase: 'offer'    },
  { id: 'accepted',             label: 'Accepted',                 label_id: 'Diterima',                   color: '#1f242c', active: true,  phase: 'close'    },
  { id: 'onboarding',           label: 'Onboarding',               label_id: 'Onboarding',                 color: '#1f9d57', active: false, phase: 'close'    },
  // ── TERMINAL STAGES ────────────────────────────────────────────────────────
  { id: 'closed',               label: 'Application Closed',       label_id: 'Lamaran Ditutup',            color: '#e1231b', active: false, phase: 'end'      },
  { id: 'not_passed_screening', label: 'Not Passed - Screening',   label_id: 'Tidak Lolos Seleksi',        color: '#e1231b', active: false, phase: 'end'      },
  { id: 'not_passed_ta_iv',     label: 'Not Passed - TA Interview',label_id: 'Tidak Lolos Interview TA',   color: '#e1231b', active: false, phase: 'end'      },
  { id: 'not_passed_assess',    label: 'Not Passed - Assessment',  label_id: 'Tidak Lolos Asesmen',        color: '#e1231b', active: false, phase: 'end'      },
  { id: 'not_passed_user_iv',   label: 'Not Passed - User Interview', label_id: 'Tidak Lolos Interview User', color: '#e1231b', active: false, phase: 'end' },
  { id: 'offer_declined',       label: 'Offer Declined',           label_id: 'Penawaran Ditolak',          color: '#e1231b', active: false, phase: 'end'      },
  { id: 'withdrawn',            label: 'Withdrawn',                label_id: 'Menarik Diri',               color: '#9ca3af', active: false, phase: 'end'      }
];

// Stages yang tampil di Kanban (active pipeline saja, bukan terminal)
var KANBAN_STAGES = ['submitted','under_review','ta_iv_scheduled','ta_iv_done',
  'assessment_sent','assessment_done','user_iv_scheduled','user_iv_done',
  'offering_prep','mcu_process','ol_reviewed','ol_sent'];

// Phase labels untuk funnel
var PHASE_LABELS = {
  apply:     { label: 'Application', color: '#2563c9' },
  interview: { label: 'Interview',   color: '#c47d10' },
  assess:    { label: 'Assessment',  color: '#6d4aa8' },
  offer:     { label: 'Offer',       color: '#1f9d57' },
  close:     { label: 'Hired',       color: '#1f242c' },
  end:       { label: 'Closed',      color: '#e1231b' }
};

// ─────────────────────────────────────────────
// API FUNCTIONS (USE_MOCK=true uses local data)
// ─────────────────────────────────────────────

/**
 * GET /jobs?status=open&country=ID&category=&level=&q=
 */
function apiGetJobs(filters, callback) {
  if (API_CONFIG.USE_MOCK) {
    var results = MOCK_JOBS.filter(function(j) {
      if (j.status !== 'open') return false;
      if (filters && filters.country && j.country !== filters.country) return false;
      if (filters && filters.category && j.category !== filters.category) return false;
      if (filters && filters.level && j.level !== filters.level) return false;
      if (filters && filters.q) {
        var q = filters.q.toLowerCase();
        if ((j.title + ' ' + j.department + ' ' + j.location).toLowerCase().indexOf(q) < 0) return false;
      }
      return true;
    });
    setTimeout(function() { callback(null, results); }, 80);
    return;
  }
  // REAL API:
  var params = new URLSearchParams(filters || {});
  fetch(API_CONFIG.BASE_URL + '/careers/jobs?' + params, { headers: _authHeaders() })
    .then(function(r) { return r.json(); })
    .then(function(d) { callback(null, d.data); })
    .catch(function(e) { callback(e); });
}

/**
 * GET /jobs/:id
 */
function apiGetJob(id, callback) {
  if (API_CONFIG.USE_MOCK) {
    var job = MOCK_JOBS.find(function(j) { return j.id === id; });
    setTimeout(function() { callback(job ? null : new Error('Not found'), job); }, 60);
    return;
  }
  fetch(API_CONFIG.BASE_URL + '/careers/jobs/' + id, { headers: _authHeaders() })
    .then(function(r) { return r.json(); })
    .then(function(d) { callback(null, d.data); })
    .catch(function(e) { callback(e); });
}

/**
 * POST /applications
 * body: { job_id, candidate: {...flk fields} }
 */
function apiSubmitApplication(payload, callback) {
  if (API_CONFIG.USE_MOCK) {
    var appId = 'NAB-2026-' + (100000 + Math.floor(Math.random() * 99999));
    var stored = _getLocal('nabati_applications') || [];
    stored.push(Object.assign({ id: appId, submitted_at: new Date().toISOString(), stage: 'submitted' }, payload));
    _setLocal('nabati_applications', stored);
    setTimeout(function() { callback(null, { id: appId }); }, 400);
    return;
  }
  fetch(API_CONFIG.BASE_URL + '/careers/applications', {
    method: 'POST',
    headers: Object.assign({ 'Content-Type': 'application/json' }, _authHeaders()),
    body: JSON.stringify(payload)
  })
    .then(function(r) { return r.json(); })
    .then(function(d) { callback(null, d.data); })
    .catch(function(e) { callback(e); });
}

/**
 * GET /recruiter/candidates?job_id=&stage=&q=
 */
function apiGetCandidates(filters, callback) {
  if (API_CONFIG.USE_MOCK) {
    var results = MOCK_CANDIDATES.filter(function(c) {
      if (filters && filters.job_id && c.job_id !== filters.job_id) return false;
      if (filters && filters.stage && c.stage !== filters.stage) return false;
      if (filters && filters.recruiter_id && c.recruiter_id !== filters.recruiter_id) return false;
      if (filters && filters.q) {
        var q = filters.q.toLowerCase();
        if ((c.name + ' ' + c.email + ' ' + c.last_role).toLowerCase().indexOf(q) < 0) return false;
      }
      return true;
    });
    setTimeout(function() { callback(null, results); }, 100);
    return;
  }
  var params = new URLSearchParams(filters || {});
  fetch(API_CONFIG.BASE_URL + '/ta/candidates?' + params, { headers: _authHeaders() })
    .then(function(r) { return r.json(); })
    .then(function(d) { callback(null, d.data); })
    .catch(function(e) { callback(e); });
}

/**
 * PATCH /recruiter/candidates/:id/stage
 */
function apiUpdateStage(candidateId, stage, notes, callback) {
  if (API_CONFIG.USE_MOCK) {
    var cand = MOCK_CANDIDATES.find(function(c) { return c.id === candidateId; });
    if (cand) { cand.stage = stage; if (notes) cand.notes = notes; }
    setTimeout(function() { callback(null, { ok: true }); }, 120);
    return;
  }
  fetch(API_CONFIG.BASE_URL + '/ta/candidates/' + candidateId + '/stage', {
    method: 'PATCH',
    headers: Object.assign({ 'Content-Type': 'application/json' }, _authHeaders()),
    body: JSON.stringify({ stage: stage, notes: notes })
  })
    .then(function(r) { return r.json(); })
    .then(function(d) { callback(null, d); })
    .catch(function(e) { callback(e); });
}

/**
 * POST /ta/candidates/:id/offer-letter
 * Trigger Offering Letter Automation microapp
 * Connect ke: Offering Letter Automation module (One HCMS TA-Module)
 */
function apiGenerateOfferLetter(candidateId, offerData, callback) {
  if (API_CONFIG.USE_MOCK) {
    var olId = 'OL-' + new Date().getFullYear() + '-' + String(Math.floor(Math.random()*9000)+1000);
    setTimeout(function() {
      callback(null, {
        id: olId,
        status: 'draft',
        generated_at: new Date().toISOString(),
        preview_url: '#offer-letter-preview-' + olId,
        note: 'Mock: Offering Letter generated. Connect to Offering Letter Automation microapp endpoint.'
      });
    }, 500);
    return;
  }
  // REAL: POST ke Offering Letter Automation microapp
  // Endpoint: API_CONFIG.OFFER_LETTER_URL + '/generate'
  fetch((API_CONFIG.OFFER_LETTER_URL || API_CONFIG.BASE_URL) + '/ta/candidates/' + candidateId + '/offer-letter', {
    method: 'POST',
    headers: Object.assign({ 'Content-Type': 'application/json' }, _authHeaders()),
    body: JSON.stringify(offerData)
  })
    .then(function(r) { return r.json(); })
    .then(function(d) { callback(null, d.data); })
    .catch(function(e) { callback(e); });
}

/**
 * POST /admin/jobs - create new job posting
 * PATCH /admin/jobs/:id - update job posting
 */
function apiSaveJob(job, callback) {
  if (API_CONFIG.USE_MOCK) {
    if (!job.id) {
      job.id = 'JOB-2026-' + String(MOCK_JOBS.length + 100).padStart(3,'0');
      job.posted = new Date().toISOString().slice(0,10);
      job.status = 'draft';
      MOCK_JOBS.push(job);
    } else {
      var idx = MOCK_JOBS.findIndex(function(j) { return j.id === job.id; });
      if (idx >= 0) MOCK_JOBS[idx] = job;
    }
    setTimeout(function() { callback(null, job); }, 150);
    return;
  }
  var method = job.id ? 'PATCH' : 'POST';
  var url = API_CONFIG.BASE_URL + '/admin/jobs' + (job.id ? '/' + job.id : '');
  fetch(url, {
    method: method,
    headers: Object.assign({ 'Content-Type': 'application/json' }, _authHeaders()),
    body: JSON.stringify(job)
  })
    .then(function(r) { return r.json(); })
    .then(function(d) { callback(null, d.data); })
    .catch(function(e) { callback(e); });
}

/**
 * Auth: mock login
 * Real: POST /auth/login -> { token, user }
 */
function apiLogin(credential, provider, callback) {
  if (API_CONFIG.USE_MOCK) {
    var mockUser = {
      id: 'USR-' + Date.now(),
      name: credential.name || credential.email.split('@')[0].replace(/[._]/g,' ').replace(/\b\w/g,function(c){return c.toUpperCase();}),
      email: credential.email,
      avatar: null,
      provider: provider,
      role: 'candidate'
    };
    _setLocal('nabati_session', mockUser);
    setTimeout(function() { callback(null, mockUser); }, 300);
    return;
  }
  fetch(API_CONFIG.BASE_URL + '/auth/' + provider, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(credential)
  })
    .then(function(r) { return r.json(); })
    .then(function(d) {
      if (d.token) sessionStorage.setItem('nabati_auth_token', d.token);
      _setLocal('nabati_session', d.user);
      callback(null, d.user);
    })
    .catch(function(e) { callback(e); });
}

// ─────────────────────────────────────────────
// UTILITY
// ─────────────────────────────────────────────
function _authHeaders() {
  var token = sessionStorage.getItem('nabati_auth_token');
  return token ? { 'Authorization': 'Bearer ' + token } : {};
}
function _getLocal(key) {
  try { return JSON.parse(localStorage.getItem(key)); } catch(e) { return null; }
}
function _setLocal(key, val) {
  try { localStorage.setItem(key, JSON.stringify(val)); } catch(e) {}
}
function getCurrentUser() {
  return _getLocal('nabati_session');
}
function logout() {
  localStorage.removeItem('nabati_session');
  sessionStorage.removeItem('nabati_auth_token');
}
function isLoggedIn() {
  return !!getCurrentUser();
}
function getCategoryLabel(cat) {
  var map = { sales:'Sales and Distribution', manufacturing:'Manufacturing', supply_chain:'Supply Chain', corporate:'Corporate', technology:'Technology and Data' };
  return map[cat] || cat;
}
function getStageInfo(stageId) {
  return PIPELINE_STAGES.find(function(s) { return s.id === stageId; }) || { label: stageId, color: '#6b7280' };
}
function formatDate(iso) {
  if (!iso) return '';
  var d = new Date(iso);
  var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  return d.getDate() + ' ' + months[d.getMonth()] + ' ' + d.getFullYear();
}
function timeAgo(iso) {
  if (!iso) return '';
  var diff = Date.now() - new Date(iso).getTime();
  var h = Math.floor(diff/3600000);
  if (h < 1) return 'Just now';
  if (h < 24) return h + 'h ago';
  return Math.floor(h/24) + 'd ago';
}
