export type UniversityInfo = {
  scholarship: number;
  intake: string;
  program: string;
  uniName: string;
  subject: string;
  courseStartDate: string;
  destinationCountry: string;
}
export type StudentFileForm = {
    name: string;
    email: string;
    phone: string;
    alternativePhone: string;
    dob: string;
    passportNo: string;
    currentAddress: string;
    countryCitizen: string;
    gender:string;
    maritalStatus:string;
    
    academicInfo?:{
      institutionName: string;
      fieldOfStudy: string;
      startDate: string;
      endDate: string;
      degree: string;
      grade: string;
    }[];
    
    backgroundInfo: [
      {
        level: string;
        institutionName: string;
        country: string;
        passingYear: string;
        gpaOrGrade: string;
        certificate: any,
        transcript: any,
      },
      {
        level: string;
        institutionName: string;
        country: string;
        passingYear: string;
        gpaOrGrade: string;
        certificate: any,
        transcript:any,
      },
      {
        level: string;
        institutionName: string;
        country: string;
        passingYear: string;
        gpaOrGrade: string;
        certificate:any,
        transcript: any,
      },
      {
        level: string,
        institutionName: string;
        country: string;
        passingYear: string;
        gpaOrGrade: string;
        certificate: any;
        transcript: any;
      },
    ];

    englishProficiency:{
      ielts?: {
        listening: number;
        reading: number;
        writing: number;
        speaking: number;
        overall: number;
        date:string;
        trfNumber:string;
        testType:string;
      },
      toefl?: {
        reading: number;
        listening: number;
        speaking: number;
        writing: number;
        date:string;
        total: number;
      },
      pte?: {
        reading: number;
        listening: number;
        speaking: number;
        writing: number;
        date:string;
        total: number;
      },
      duolingo?: {
        reading: number;
        listening: number;
        speaking: number;
        writing: number;
        date:string;
        total: number;
      },
      gre?: {
        verbal: number; 
        quantitative: number;
        writing: number;
        overall: number;
        date:string;
      },
      gmat?: {
        verbal: number;
        reasoning: number; 
        quantitative: number;
        writing: number;
        overall: number;
        date:string;
      },
      sat?: {
        math: number;
        reasoning: number; 
        quantitative: number;
        writing: number;
        reading: number;
        overall: number;
        date:string;
      },
      act?: {
        date:string;
        math: number;
        reasoning: number; 
        quantitative: number;
        writing: number;
        reading: number;
        overall: number;
      }
    };

    files: {
        fileFor: string;
        file: FileList | null;
    }[];

    preferredUniversities: UniversityInfo[];
    refusedCountry:string[];
    
    permission_personalInfo: boolean;
    permission_englishProficiency: boolean;
    permission_prefferedUniSub: boolean;
    permission_studentsFile: boolean;
};

export type ModalProps = {
  modalState: { isOpen: boolean };
  setModalState: React.Dispatch<React.SetStateAction<any>>;
};


export const fileCategories = [
  {
    category: "Academic Documents",
    files: [
      "Secondary School Certificate (SSC)",
      "Higher Secondary Certificate (HSC)",
      "Bachelor’s Degree Certificate",
      "Master’s Degree Certificate",
      "Academic Transcript (All Semesters)",
      "Recommendation Letter from Professor or Employer",
      "Curriculum Vitae (CV)",
      "Resume (Professional Format)",
      "Statement of Purpose (SOP)",
      "Research Proposal for Postgraduate Application",
      "Course Syllabus or Module Description",
      "School Leaving Certificate (Secondary Level)",
      "College Leaving Certificate (Higher Secondary Level)",
    ],
  },
  {
    category: "Identity Documents",
    files: [
      "Passport (Bio Page)",
      "National ID Card (Front and Back)",
      "Birth Certificate (Government Issued)",
      "Passport-Size Photograph (Recent)",
      "Marriage Certificate (If Applicable)",
    ],
  },
  {
    category: "English Proficiency Documents",
    files: [
      "IELTS Test Report Form (TRF)",
      "TOEFL Score Report",
      "PTE Academic Score Report",
      "Duolingo English Test Certificate",
      "Cambridge English Certificate (FCE, CAE, or CPE)",
      "Medium of Instruction (MOI) Letter from Institution",
    ],
  },
  {
    category: "Standardized Test Reports",
    files: [
      "GRE Score Report (Verbal, Quantitative & Writing)",
      "GMAT Score Report (Total & Sectional Scores)",
      "SAT Score Report (Math, Reading & Writing)",
      "ACT Score Report (Composite & Section Scores)",
    ],
  },
  {
    category: "Financial Documents",
    files: [
      "Bank Statement (Last 6 Months)",
      "Affidavit of Support (Notarized)",
      "Tax Certificate or Income Statement",
      "Bank Solvency Certificate (From Bank)",
      "Scholarship Award or Funding Letter",
      "Loan Sanction Letter (If Applicable)",
      "Financial Guarantee Letter (If Sponsored)",
    ],
  },
  {
    category: "Visa & Immigration Documents",
    files: [
      "University Offer Letter (Conditional/Unconditional)",
      "Confirmation of Acceptance for Studies (CAS Letter)",
      "Medical Fitness Report",
      "Police Clearance Certificate (PCC)",
      "Travel Insurance Document",
      "Visa Application Form (Signed Copy)",
      "Previous Visa or Immigration History Documents",
    ],
  },
  {
    category: "Experience & Other Documents",
    files: [
      "Employment Experience Letter (Company Verified)",
      "Work Certificate or Appointment Letter",
      "Professional Portfolio (Design, Writing, or Projects)",
      "Published Research Paper or Journal Article",
      "Reference Letter from Employer or Supervisor",
      "Training or Workshop Completion Certificate",
      "Internship Certificate (If Applicable)",
      "Extracurricular Achievement Certificate",
      "Volunteer Service or Community Work Certificate",
    ],
  },
];

export const examConfig:any = {
  ielts: ["listening", "reading", "writing", "speaking", "overall", "date", "trfNumber", "testType"],
  toefl: ["reading", "listening", "speaking", "writing", "total", "date"],
  pte: ["reading", "listening", "speaking", "writing", "total", "date"],
  duolingo: ["reading", "listening", "speaking", "writing", "total", "date"],
  gre: ["verbal", "quantitative", "writing", "overall", "date"],
  gmat: ["verbal", "reasoning", "quantitative", "writing", "overall", "date"],
  sat: ["math", "reasoning", "quantitative", "writing", "reading", "overall", "date"],
  act: ["math", "reasoning", "quantitative", "writing", "reading", "overall", "date"],
};