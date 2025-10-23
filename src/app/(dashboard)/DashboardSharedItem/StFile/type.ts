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

    englishProficiency:[
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
    ];

    files: { fileFor: string; url: string }[];

    educationBackground: {
      institutionName: string;
      fieldOfStudy: string;
      startDate: string;
      endDate: string;
      degree: string;
      grade: string;
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
