import { responseError, responseSuccess } from '@/types/common'
import { accessToken } from '@/utils/accessToken'
import axios from 'axios'


const instance = axios.create()
instance.defaults.headers.post["Content-Type"] = "application/json"
instance.defaults.headers["Accept"] = "application/json"
instance.defaults.timeout = 60000

 

instance.interceptors.request.use(function (config) {
    // console.log("response from instance success",config)
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
        // console.log("response from instance error",response)
        const responseObject:responseSuccess = {
          data: response?.data?.data,
          meta: response?.data?.meta,
        }
    
        return responseObject
    }, function (error) {
    
        const responseObject:responseError = {
          errorMessage: error?.response.data?.message,
          statusCode: error?.response?.data?.statusCode || 500,
          message: error?.response.data?.message || "something went wrong!!",
        }
    
        return responseObject
    })
    
    
export { instance }