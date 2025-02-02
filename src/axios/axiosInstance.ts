import axios from 'axios'


const instance = axios.create()
instance.defaults.headers.post["Content-Type"] = "application/json"
instance.defaults.headers["Accept"] = "application/json"
instance.defaults.timeout = 60000


instance.interceptors.request.use(function (config) {
    
    return config
  }, function (error) {


    return Promise.reject(error)
})


instance.interceptors.response.use(
    function (response) {

    return response
}, function (error) {


    return error
})

export { instance }