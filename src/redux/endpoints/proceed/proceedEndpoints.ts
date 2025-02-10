import { baseApi } from "@/redux/baseApi";

const proceedApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    
    postProcessData: build.mutation({
        query: (data) => ({
            url: "/proceed/create",
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
            url: "/proceed/all",
            method: "GET",
        }),
      providesTags: ["proceed"],
    }),

    deleteProcessReq: build.mutation<any, string>({
        query: (email) => ({
            url: `/proceed/delete/${email}`,
            method: "DELETE",
        }),
      invalidatesTags: ["proceed"],  
    }),

    updatedProcessReq: build.mutation<any, { data: any; id: string }>({
        query: ({ data, id }) => ({
            url: `/proceed/update/${id}`,
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
                url: `/proceed/partial/${page}/${item}`,
                method: "GET",
            }),
            providesTags: ["review"],
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
