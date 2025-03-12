import { deleteCookies } from "./deleteCookies"
import { cookieRemove } from "./removeCookie"



export const logOut = async() =>{
    localStorage.removeItem('accessToken')
    deleteCookies()
    await cookieRemove()
    window.dispatchEvent(new Event("tokenChanged"))
    window.location.href = "/"
}