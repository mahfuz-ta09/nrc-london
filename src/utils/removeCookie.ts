import { instance as axiosTokenInstance } from "@/axios/axiosInstance"

let API_URL = ''

API_URL = "https://nrc-server-production-19f8.up.railway.app/app/v1/auth"
// API_URL = "http://localhost:7373/app/v1/auth"

export const cookieRemove = async()=>{
    const res = await fetch(`${API_URL}/logout`,{
        method: 'POST',
        credentials: 'include'
    })
    const response = await res.json()
    return response
}

export const  getNewAccessToken = async()=>{
    return await axiosTokenInstance({
        url: `${API_URL}/access-token`,
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'  
        },
        withCredentials: true
    })
}