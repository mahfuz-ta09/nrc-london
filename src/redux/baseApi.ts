import { axiosBaseQuery } from '@/axios/axiosBaseQuery'
import { createApi } from '@reduxjs/toolkit/query/react'


export const baseApi = createApi({
    reducerPath: 'api',
    baseQuery: axiosBaseQuery({ 
        baseUrl: 'https://nrc-server.onrender.com/app/v1' 
    }),
    tagTypes : ["university","subjects"],
    endpoints: () => ({}),
})