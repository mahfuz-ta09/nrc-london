import { logOutUser } from "./removeCookie"


export const logOut = async() =>{
    const user = JSON.parse(localStorage.getItem('userData') || '{}')
    console.log(user)
    await logOutUser({email:user?.email,role: user?.role})
    localStorage.removeItem('userData')
    window.dispatchEvent(new Event("tokenChanged"))
    window.location.href = "/"
}