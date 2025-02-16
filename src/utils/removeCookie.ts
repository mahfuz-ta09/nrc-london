import { instance as axiosTokenInstance } from "@/axios/axiosInstance"


// const API_URL = "https://nrc-server.onrender.com/app/v1/auth/logout"
// const API_URL = "nrc-server-production.up.railway.app/app/v1/auth/logout"
const API_URL = "http://localhost:7373/app/v1/auth"

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