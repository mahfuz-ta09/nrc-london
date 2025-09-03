import { responseError, responseSuccess } from '@/types/common'
import { accessToken } from '@/utils/accessToken'
import { deleteCookies, setCookie } from '@/utils/manageCookie'
import {  getNewAccessToken } from '@/utils/removeCookie'
import axios from 'axios'
import { toast } from 'react-toastify'


const instance = axios.create()
instance.defaults.headers.post["Content-Type"] = "application/json"
instance.defaults.headers["Accept"] = "application/json"
instance.defaults.timeout = 60000
instance.defaults.withCredentials = true


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
      const responseObject: responseSuccess = {
        data: response?.data?.data,
        meta: response?.data?.meta,
      }
      return responseObject
    },

    async function (error) {
      const originalRequest = error.config

      if(error?.response?.status===401 && !originalRequest._retry){
        originalRequest._retry = true
        
        try{
          const accTok = await getNewAccessToken()

          if(accTok?.data) {
            setCookie(accTok?.data)
            localStorage.setItem('nrc_acc',accTok?.data)
            return instance(originalRequest)
          }
        }catch(err:any){
          console.log(err)
          if(err?.statusCode === 400 && err?.message){
            localStorage.removeItem('nrc_acc')
            deleteCookies()
            window.location.href='/'
            toast.error(err?.message)
          }
        }
      }

      const responseObject: responseError = {
        errorMessage: error?.response?.data?.message,
        statusCode: error?.response?.data?.statusCode || 500,
        message: error?.response?.data?.message || "something went wrong!!",
      }
      return Promise.reject(responseObject)
    }
)


export { instance }