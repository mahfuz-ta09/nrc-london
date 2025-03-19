import { cookieRemove } from "./removeCookie"


export const logOut = async() =>{
    localStorage.removeItem('accessToken')
    await cookieRemove()
    window.dispatchEvent(new Event("tokenChanged"))
    window.location.href = "/"
}