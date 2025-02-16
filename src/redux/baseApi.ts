import { axiosBaseQuery } from '@/axios/axiosBaseQuery'
import { createApi } from '@reduxjs/toolkit/query/react'

let url = ''
// url = 'https://nrc-server.onrender.com/app/v1'

// url = 'https://nrc-server-production.up.railway.app/app/v1'

url = 'http://localhost:7373/app/v1'


export const baseApi = createApi({
    reducerPath: 'api',
    baseQuery: axiosBaseQuery({ 
        baseUrl: url 
    }),
    tagTypes : ["university","subjects","users","proceed","admin","agents","profile"],
    endpoints: () => ({}),
})