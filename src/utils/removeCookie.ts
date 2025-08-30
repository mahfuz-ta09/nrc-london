import { instance as axiosTokenInstance } from "@/axios/axiosInstance"


export type AppEnv = 'LOCAL' | 'staging' | 'PRODUCTION';
export const APP_ENV = (process.env.NEXT_PUBLIC_APP_ENV as AppEnv) ?? 'PRODUCTION';
export const url =
  APP_ENV === 'LOCAL'
    ? process.env.NEXT_PUBLIC_LOCAL_API!
    : process.env.NEXT_PUBLIC_DEPLOYED_API!;

    
if (!url) {
  throw new Error('API_BASE_URL is not defined');
}



export const logOutUser = async(data:any) =>{
    console.log(data)
    const res = await fetch(`${url}/auth/logout`,{
        method: 'POST',
        credentials: "include",
        headers: {
            'content-type': 'application/json',
        },
        body: JSON.stringify(data),
    })
    const response = await res.json()
    return response
}

export const  getNewAccessToken = async()=>{
    return await axiosTokenInstance({
        url: `${url}/auth/access-token`,
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'  
        },
        withCredentials: true
    })
}