import { responseError, responseSuccess } from '@/types/common'
import { accessToken } from '@/utils/accessToken'
import {  getNewAccessToken } from '@/utils/removeCookie'
import { setCookie } from '@/utils/setCookies'
import { logOut } from '@/utils/authAction'
import axios from 'axios'


const instance = axios.create()
instance.defaults.headers.post["Content-Type"] = "application/json"
instance.defaults.headers["Accept"] = "application/json"
instance.defaults.timeout = 60000

 

instance.interceptors.request.use(function (config) {
    const token = accessToken()

    if(token){
      config.headers.Authorization = token
    }
    
    if (!(config.data instanceof FormData)) {
      config.headers["Content-Type"] = "application/json";
    }

    return config
  }, function (error) {
    return Promise.reject(error)
})


instance.interceptors.response.use(
    //@ts-ignore
    
    function (response) {
        const responseObject:responseSuccess = {
          data: response?.data?.data,
          meta: response?.data?.meta,
        }
    
        return responseObject
    }, 
    
    async function (error) {
        if(error?.response?.status === 500){
            const res:any = await getNewAccessToken()
            error.config.headers['Authorization'] = res?.meta.accessToken
            localStorage.setItem("accessToken",res?.meta.accessToken)
            setCookie(res?.meta.accessToken)

          return instance(error.config)
        }else{
          const responseObject:responseError = {
            errorMessage: error?.response.data?.message,
            statusCode: error?.response?.data?.statusCode || 500,
            message: error?.response.data?.message || "something went wrong!!",
          }
          return responseObject
        }
    
    }
)
    
    
export { instance }