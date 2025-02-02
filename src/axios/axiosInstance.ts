import { responseSuccess } from "@/types/common"
import axios from "axios"

const instance = axios.create()
instance.defaults.headers.post['Content-Type']='application/json'
instance.defaults.headers['Accept']='application/json'
instance.defaults.timeout=60000


instance.interceptors.request.use(
    function (config) {
        console.log(config)    

    return config;
},
function(error){
    

    return Promise.reject(error);
})



instance.interceptors.response.use(
//@ts-ignore
    function (response){
        
        const responseObject:responseSuccess = {
            data: response?.data?.data,
            meta: response?.data?.meta,
        }
  
      return responseObject
},
function (error){
    return Promise.reject(error)
})

export { instance }