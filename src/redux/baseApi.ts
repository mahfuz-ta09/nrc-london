import { axiosBaseQuery } from '@/axios/axiosBaseQuery'
import { createApi } from '@reduxjs/toolkit/query/react'



export type AppEnv = 'LOCAL' | 'staging' | 'PRODUCTION';
export const APP_ENV = (process.env.NEXT_PUBLIC_APP_ENV as AppEnv) ?? 'PRODUCTION';
export const url =
  APP_ENV === 'LOCAL'
    ? process.env.NEXT_PUBLIC_LOCAL_API!
    : process.env.NEXT_PUBLIC_DEPLOYED_API!;

    
if (!url) {
  throw new Error('API_BASE_URL is not defined');
}



export const baseApi = createApi({
    reducerPath: 'api',
    baseQuery: axiosBaseQuery({ 
        baseUrl: url 
    }),
    tagTypes : ["university","subjects","users","proceed","admin","agents","profile"],
    endpoints: () => ({}),
})