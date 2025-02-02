export type metaT = {
    page : number
    limit: number
    total: number
}

export type responseSuccess = {
    data: string
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

