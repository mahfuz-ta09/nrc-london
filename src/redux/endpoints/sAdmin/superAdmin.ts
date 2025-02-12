import { baseApi } from "@/redux/baseApi";

const sAdminApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    
    createAdmin: build.mutation({
        query: (data) => ({
            url: "/super_admin/create",
            method: "POST",
            headers: { 
              "Content-Type": "application/json" 
            }, 
            data,
        }),
      invalidatesTags: ["admin"],  
    }),

    getALlAdmin: build.query<any, void>({
        query: () => ({
            url: "/super_admin/admin/all",
            method: "GET",
        }),
      providesTags: ["admin"],
    }),

    deleteAdmin: build.mutation<any, string>({
        query: (email) => ({
            url: `/super_admin/delete/${email}`,
            method: "DELETE",
        }),
      invalidatesTags: ["admin"],  
    }),

    updateAdmin: build.mutation<any, { data: any; id: string }>({
        query: ({ data, id }) => ({
            url: `/super_admin/update/${id}`,
            method: "PATCH",
            headers: { 
              "Content-Type": "application/json" 
            },  
            body: data,   
        }),
      invalidatesTags: ["admin"], 
    }),

    getPageReview: build.query<any, { page: number , item: number }>({
        query: ({page,item}) => ({
                url: `/super_admin/partial/${page}/${item}`,
                method: "GET",
            }),
            providesTags: ["admin"],
        }),
    }),

  overrideExisting: true,
})

export const {
    useCreateAdminMutation,
    useGetALlAdminQuery,
    useUpdateAdminMutation,
    useDeleteAdminMutation
} = sAdminApi
