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
    mobile_number: string;
    emergency_number: string;
    dob:number;
    en_proficiency:test_type;
    en_result:FileList | null;
    ssc_result:FileList | null;
    hsc_result:FileList | null;
    bachelor_result:FileList | null;
    masters_result:FileList | null;
    other_result:FileList | null;
    exam_taken_time:string;
    prefered_country: country_type;
    referral: Ref;
    refused: Refused;
    country_name:string;
}


