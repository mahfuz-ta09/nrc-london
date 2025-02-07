import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime"
import { deleteCookies } from "./deleteCookies"
import { cookieRemove } from "@/authHooks/auth"



export const logOut = async(route:AppRouterInstance) =>{
    await cookieRemove()
    localStorage.removeItem('accessToken')
    window.dispatchEvent(new Event("tokenChanged"))
    deleteCookies()
    route.refresh()
    route.push('/')
}


