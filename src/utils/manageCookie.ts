'use server'
import { cookies } from "next/headers"

export const  deleteCookies = async() =>{
    const cookieStore = await cookies()
    cookieStore.delete("nrc_acc")
}


export const  setCookie = async(value:string) =>{
    const cookieStore = await cookies()
    cookieStore.set("nrc_acc",value)
}