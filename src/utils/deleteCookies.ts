'use server'
import { cookies } from "next/headers"


export const  deleteCookies = async() =>{
    const cookieStore = await cookies()
    cookieStore.delete("refreshToken")
    cookieStore.delete("accessToken")
}