import { metaT } from "@/types/common"
import { BaseQueryFn } from "@reduxjs/toolkit/query"
import { AxiosError, AxiosRequestConfig } from "axios"
import { instance as axiosInstance } from "./axiosInstance"



export const axiosBaseQuery = ({ baseUrl }: { baseUrl: string } = { baseUrl: '' },): BaseQueryFn<{
      url: string
      method?: AxiosRequestConfig['method']
      data?: AxiosRequestConfig['data']
      params?: AxiosRequestConfig['params']
      headers?: AxiosRequestConfig['headers']
      meta?: metaT
      contentType?:string
    },unknown,unknown> =>
    async ({ url, method, data, params, headers }) => {
        try {
            const result = await axiosInstance({
                url: baseUrl + url,
                method,
                data,
                params,
                headers,
            })
            console.log("from axios base query success",result)
            return { data: result.data }
        } catch (axiosError) {
            const err = axiosError as AxiosError
            console.log("from axios base query error",err)
            return {
                error: {
                    status: err.response?.status,
                    data: err.response?.data || err.message,
                },
            }
        }
  }