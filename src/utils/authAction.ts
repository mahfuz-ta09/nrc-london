import { deleteCookie } from "./deleteCookie"
import { logOutUser } from "./removeCookie"


export const logOut = async() =>{
    await logOutUser()
    // deleteCookie()
    localStorage.removeItem('nrc_acc')
    window.dispatchEvent(new Event("tokenChanged"))
    // window.location.href = "/"
}