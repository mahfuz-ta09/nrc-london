import { axiosBaseQuery } from '@/axios/axiosBaseQuery'
import { createApi } from '@reduxjs/toolkit/query/react'


export const baseApi = createApi({
    reducerPath: 'api',
    baseQuery: axiosBaseQuery({ 
        baseUrl: '' 
    }),
    tagTypes : [],
    endpoints: () => ({}),
})