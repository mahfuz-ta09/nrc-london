
export const programOptions = [
  {
    label: "Undergraduate (Bachelor)",
    options: [
      { value: "BA", label: "BA (Bachelor of Arts)" },
      { value: "BSc", label: "BSc (Bachelor of Science)" },
      { value: "BSS", label: "BSS (Bachelor of Social Science)" },
      { value: "BCom", label: "BCom (Bachelor of Commerce)" },
      { value: "BBA", label: "BBA (Bachelor of Business Administration)" },
      { value: "BBS", label: "BBS (Bachelor of Business Studies)" },
      { value: "BSc Engineering", label: "BSc in Engineering" },
      { value: "BSc CSE", label: "BSc in Computer Science & Engineering" },
      { value: "BSc EEE", label: "BSc in Electrical & Electronic Engineering" },
      { value: "BSc Civil", label: "BSc in Civil Engineering" },
      { value: "BSc Mechanical", label: "BSc in Mechanical Engineering" },
      { value: "LLB", label: "LLB (Bachelor of Laws)" },
      { value: "MBBS", label: "MBBS" },
      { value: "BDS", label: "BDS" },
      { value: "BPharm", label: "Bachelor of Pharmacy" },
      { value: "BArch", label: "Bachelor of Architecture" },
      { value: "BFA", label: "Bachelor of Fine Arts" },
    ],
  },
  {
    label: "Postgraduate (Master)",
    options: [
      { value: "MA", label: "MA (Master of Arts)" },
      { value: "MSc", label: "MSc (Master of Science)" },
      { value: "MSS", label: "MSS (Master of Social Science)" },
      { value: "MCom", label: "MCom (Master of Commerce)" },
      { value: "MBA", label: "MBA (Master of Business Administration)" },
      { value: "EMBA", label: "Executive MBA" },
      { value: "MSc CSE", label: "MSc in Computer Science & Engineering" },
      { value: "MSc EEE", label: "MSc in Electrical & Electronic Engineering" },
      { value: "MSc Civil", label: "MSc in Civil Engineering" },
      { value: "LLM", label: "LLM (Master of Laws)" },
      { value: "MPharm", label: "Master of Pharmacy" },
      { value: "MPH", label: "Master of Public Health" },
    ],
  },
  {
    label: "Diploma & Professional",
    options: [
      { value: "Diploma Engineering", label: "Diploma in Engineering" },
      { value: "Diploma Computer", label: "Diploma in Computer Technology" },
      { value: "Diploma Business", label: "Diploma in Business Studies" },
      { value: "CA", label: "Chartered Accountancy (CA)" },
      { value: "ACCA", label: "ACCA" },
      { value: "CMA", label: "CMA" },
      { value: "CFA", label: "CFA" },
    ],
  },
  {
    label: "Doctoral",
    options: [
      { value: "PhD", label: "PhD" },
      { value: "DBA", label: "DBA (Doctor of Business Administration)" },
    ],
  },
  {
    label: "Other",
    options: [
      { value: "Higher Secondary", label: "Higher Secondary (HSC / A-Level)" },
      { value: "Secondary", label: "Secondary (SSC / O-Level)" },
      { value: "Other", label: "Other" },
    ],
  },
];


export const qualificationOptions = [
    { value: "certificate", label: "Certificate (Short-term / Vocational)" },
    { value: "diploma", label: "Diploma / Advanced Diploma" },
    { value: "foundation", label: "Foundation / Preparatory" },
    { value: "associate", label: "Associate Degree (AA / AS)" },
    { value: "undergraduate", label: "Undergraduate (Bachelor's)" },
    { value: "graduate", label: "Graduate (Master's)" },
    { value: "doctorate", label: "Doctorate (PhD / Professional Doctorate)" },
    { value: "professional", label: "Professional Qualification (ACCA, CFA, PMP, etc.)" },
    { value: "postdoc", label: "Postdoctoral / Research Fellowship" },
    { value: "executive", label: "Executive Education / MBA / EMBA" },
    { value: "vocational", label: "Vocational / Technical Training" },
    { value: "continuing", label: "Continuing Education / Lifelong Learning" },
    { value: "online", label: "Online / Distance Learning Program" },
    { value: "shortcourse", label: "Short Course / Workshop / Bootcamp" },
    { value: "others", label: "Mention others" }
]

export const PROGRAM_LEVELS = [
    'Certificate',
    'Diploma',
    'Foundation',
    'Associate Degree',
    'Undergraduate',
    'Graduate',
    'Doctorate',
    'Professional',
    'Executive'
]

export const DURATION_UNITS = [
    'months',
    'years',
    'weeks',
    'semesters'
]



export const INTAKE_NAMES = [
    'Fall 2025',
    'Spring 2025',
    'Summer 2025',
    'Winter 2025',
    'Fall 2026',
    'Spring 2026',
    'Summer 2026',
    'Winter 2026',
    'January Intake',
    'February Intake',
    'March Intake',
    'April Intake',
    'May Intake',
    'June Intake',
    'July Intake',
    'August Intake',
    'September Intake',
    'October Intake',
    'November Intake',
    'December Intake'
]

export const MONTHS = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
]
export const testOptions = [
    { value: "IELTS", label: "IELTS", sections: ["overall", "reading", "writing", "listening", "speaking"] },
    { value: "TOEFL", label: "TOEFL", sections: ["overall", "reading", "writing", "listening", "speaking"] },
    { value: "PTE", label: "PTE", sections: ["overall"] },
    { value: "DUOLINGO", label: "Duolingo", sections: ["overall"] },
    { value: "GRE", label: "GRE", sections: ["overall", "verbal", "quantitative", "writing"] },
    { value: "GMAT", label: "GMAT", sections: ["overall", "verbal", "quantitative", "writing", "integrated"] },
    { value: "SAT", label: "SAT", sections: ["overall", "math", "reading"] },
    { value: "ACT", label: "ACT", sections: ["overall", "english", "math", "reading", "science"] },
]


export const PREREQUISITE_SUBJECTS = [
    'Mathematics',
    'Physics',
    'Chemistry',
    'Biology',
    'Computer Science',
    'English',
    'Statistics',
    'Calculus',
    'Linear Algebra',
    'Economics',
    'Business Studies',
    'Accounting',
    'Geography',
    'History',
    'Psychology',
    'Sociology',
    'Political Science',
    'Engineering Drawing',
    'Technical Drawing',
    'Information Technology'
]

export const ACADEMIC_BACKGROUNDS = [
    'Engineering',
    'Computer Science',
    'Business Administration',
    'Natural Sciences',
    'Social Sciences',
    'Mathematics',
    'Physics',
    'Chemistry',
    'Biology',
    'Medicine',
    'Information Technology',
    'Economics',
    'Commerce',
    'Arts & Humanities',
    'Architecture',
    'Agriculture',
    'Environmental Science',
    'Health Sciences',
    'Education',
    'Law',
    'Media & Communication',
    'Design',
    'Pharmacy',
    'Biotechnology'
]
export const gpaScaleOptions = ["4.0", "5.0", "10.0", "100"]
export const educationLevelOptions = ["high_school", "bachelors", "masters", "any"]
export const submissionMethodOptions = ["manual", "api", "email", "courier"]
export const feeStructureOptions = ["per_year", "per_semester", "total_program"]
export const applicationTypeOptions = ["undergraduate", "postgraduate", "diploma", "certificate", "foundation"]