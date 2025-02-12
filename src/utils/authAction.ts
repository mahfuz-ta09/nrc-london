import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime"
import { deleteCookies } from "./deleteCookies"
import { cookieRemove } from "./removeCookie"



export const logOut = async(route:AppRouterInstance) =>{
    localStorage.removeItem('accessToken')
    deleteCookies()
    await cookieRemove()
    window.dispatchEvent(new Event("tokenChanged"))
    window.location.href = "/"
    route.refresh()
}