import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime"
import { deleteCookies } from "./deleteCookies"
import { cookieRemove } from "@/authHooks/auth"


export const logOut = async(route:AppRouterInstance) =>{
    localStorage.removeItem('accessToken')
    deleteCookies()
    await cookieRemove()
    window.dispatchEvent(new Event("tokenChanged"))
    window.location.href = "/Login"
    route.refresh()
    route.push('/')
}