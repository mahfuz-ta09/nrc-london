'use client'
import { jwtDecode } from "jwt-decode"
import { accessToken } from "./accessToken"


export const userInfo=()=>{
    const token = accessToken()
    let Uemail:string = ''
    let Urole:string = ''
    let Uid:string = ''


    if(token){
        const decoded:any =  jwtDecode(token)

        Uemail=decoded?.email || ''
        Urole=decoded?.role || ''
        Uid=decoded?.id || ''
    }
    

    return { Uemail , Urole , Uid }
}