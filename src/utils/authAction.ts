import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime"
import { deleteCookies } from "./deleteCookies"



export const logOut = async(route:AppRouterInstance) =>{
    localStorage.removeItem('accessToken')
    deleteCookies()
    route.refresh()
    route.push('/')
}


