// const API_URL = "https://nrc-server.onrender.com/app/v1/auth/logout"
const API_URL = "https://nrc-server-production.up.railway.app/app/v1/auth/logout"
// const API_URL = "http://localhost:7373/app/v1/auth/logout"; 

export const cookieRemove = async()=>{
    const res = await fetch(API_URL,{
        method: 'POST',
        credentials: 'include'
    })
    const response = await res.json()
    return response
}