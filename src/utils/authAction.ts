import { logOutUser } from "./removeCookie"


export const logOut = async() =>{
    await logOutUser()
    localStorage.removeItem('nrc_acc')
    window.dispatchEvent(new Event("tokenChanged"))
    window.location.href = "/"
}