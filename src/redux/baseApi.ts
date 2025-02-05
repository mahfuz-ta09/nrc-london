import { axiosBaseQuery } from '@/axios/axiosBaseQuery'
import { createApi } from '@reduxjs/toolkit/query/react'


export const baseApi = createApi({
    reducerPath: 'api',
    baseQuery: axiosBaseQuery({ 
        baseUrl: 'http://localhost:7373/app/v1' 
    }),
    tagTypes : ["university","subjects"],
    endpoints: () => ({}),
})