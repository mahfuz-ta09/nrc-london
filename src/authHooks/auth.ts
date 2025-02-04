import { setCookie } from "@/utils/setCookies"


export const logInUser = async(formData: FormData)=>{
    const response = await fetch('http://localhost:7373/app/v1/auth/login',{
        method: 'POST',
        body: formData,
        credentials: 'include'
    })

    const userInfo = await response.json()
    
    if(userInfo?.meta?.accessToken){
        setCookie(userInfo?.meta?.accessToken)
    }
    return userInfo
}


export const signUpUser = async(formData: FormData)=>{
    const response = await fetch('http://localhost:7373/app/v1/auth/signup',{
        method: 'POST',
        body: formData,
        credentials: 'include'
    })

    const userInfo = await response.json()
    
    if(userInfo?.meta?.accessToken){
        setCookie(userInfo?.meta?.accessToken)
    }
    return userInfo
}