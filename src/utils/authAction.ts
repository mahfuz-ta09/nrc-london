import { deleteCookies } from "./deleteCookies"
import { logOutUser } from "./removeCookie"


export const logOut = async() =>{
    // const user = JSON.parse(localStorage.getItem('userData') || '{}')
    // console.log(user)
    await logOutUser()
    deleteCookies()
    localStorage.removeItem('nrc_acc')
    window.dispatchEvent(new Event("tokenChanged"))
    window.location.href = "/"
}