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
    ssc_institution:string;
    ssc_group:string;
    ssc_result:string;
    ssc_year:string;
    hsc_institution:string;
    hsc_group:string;
    hsc_result:string;
    hsc_year:string;
    other_deg:string;
    other_institution:string;
    other_group:string;
    other_result:string;
    other_year:string;
    master_institution:string;
    master_group:string;
    master_result:string;
    master_year:string;
    en_proficiency:test_type;
    listening:string;
    reading:string;
    writing:string;
    speaking:string;
    overall:string;
    exam_taken_time:string;
    prefered_country: country_type;
    referral: Ref;
    refused: Refused;
    country_name:string;
    Bachelor_institution:string;
    Bachelor_group:string;
    Bachelor_result:string;
    Bachelor_year:string;
}


