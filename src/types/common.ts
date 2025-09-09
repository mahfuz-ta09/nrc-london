export type metaT = {
    page : number
    limit: number
    total: number
}

export type responseSuccess = {
    data?: any
    meta?: metaT
}

export type responseError = {
    statusCode?: number
    message?:string
    errorMessage?:responseError[]
}

export type jwtPayload =  {
    email?:string
    role?:string
    id?:string
}



type test_type = {
    IELTS: string,
    OIETC: string,
    DUOLINGO: string,
    PTE: string,
    TOFEL: string,
    MOI: string,
    ESOL: string
}

type Ref = {
    google:string,
    facebook:string,
    linkedin:string,
    youtube:string,
    friends:string,
    others:string,
}

type Refused = {
    no:string,
    yes:string,
}

type country_type = {
    uk:string,
    usa:string,
    aus:string,
    canada:string,
    denmark:string,
    spain:string,
    sweden:string,
    malta:string,
    hungary:string,
    portugal:string,
    france:string,
    others:string,
}

export interface IFormInput {
    name: string;
    phone: string;
    ulternative_phone: string;
    dob:number;
    en_proficiency:test_type;
    proficiencyCirtificate:FileList | null;
    ssc:FileList | null;
    hsc:FileList | null;
    bachelor:FileList | null;
    master:FileList | null;
    other:FileList | null;
    examTakenTime:string;
    destinationCountry: country_type;
    referral: Ref;
    refused: Refused;
    refusedCountry:string;
}


export const countryCurrencyMap = {
  select: "",      // United States Dollar
  US: "$",      // United States Dollar
  BD: "৳",      // Bangladeshi Taka
  IN: "₹",      // Indian Rupee
  UK: "£",      // British Pound Sterling
  EU: "€",      // Euro
  CA: "$",      // Canadian Dollar
  AU: "$",      // Australian Dollar
  JP: "¥",      // Japanese Yen
  CN: "¥",      // Chinese Yuan
  SA: "﷼",      // Saudi Riyal
  AE: "د.إ",    // UAE Dirham
  PK: "₨",      // Pakistani Rupee
  LK: "₨",      // Sri Lankan Rupee
  NP: "₨",      // Nepalese Rupee
  KR: "₩",      // South Korean Won
  RU: "₽",      // Russian Ruble
  TH: "฿",      // Thai Baht
  MY: "RM",     // Malaysian Ringgit
  SG: "$",      // Singapore Dollar
  ZA: "R",      // South African Rand
  NG: "₦",      // Nigerian Naira
  BR: "R$",     // Brazilian Real
  MX: "$",      // Mexican Peso
  AR: "$",      // Argentine Peso
  CL: "$",      // Chilean Peso
  TR: "₺",      // Turkish Lira
  IR: "﷼",      // Iranian Rial
  KH: "៛",      // Cambodian Riel
  VN: "₫"       // Vietnamese Dong
};
