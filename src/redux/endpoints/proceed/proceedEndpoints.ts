import { baseApi } from "@/redux/baseApi";



const proceedApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    
    postProcessData: build.mutation({
        query: (data) => ({
            url: "/process/create",
            method: "POST",
            headers: { 
                "Content-Type": "application/json" 
            }, 
            data,
        }),
      invalidatesTags: ["proceed"],  
    }),

    getALlProcessReq: build.query<any, void>({
        query: () => ({
            url: "/process/all",
            method: "GET",
        }),
      providesTags: ["proceed"],
    }),

    deleteProcessReq: build.mutation<any, string>({
        query: (id) => ({
            url: `/process/delete/${id}`,
            method: "DELETE",
        }),
      invalidatesTags: ["proceed"],  
    }),

    updatedProcessReq: build.mutation<any, { data: any; id: string }>({
        query: ({ data, id }) => ({
            url: `/process/update/${id}`,
            method: "PATCH",
            headers: { 
                "Content-Type": "application/json" 
            },  
            body: data,   
        }),
      invalidatesTags: ["proceed"], 
    }),

    getProcessReqPagination: build.query<any, { page: number , item: number }>({
        query: ({ page , item }) => ({
                url: `/process/partial/${page}/${item}`,
                method: "GET",
            }),
            providesTags: ["proceed"],
        }),
    }),

  overrideExisting: true,
})

export const {
    usePostProcessDataMutation,
    useGetALlProcessReqQuery,
    useDeleteProcessReqMutation,
    useUpdatedProcessReqMutation,
    useGetProcessReqPaginationQuery
} = proceedApi
