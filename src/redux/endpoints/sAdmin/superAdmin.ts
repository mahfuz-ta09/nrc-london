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

    getALlUser: build.query<any, void>({
        query: () => ({
            url: "/super_admin/users/all",
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

    updateAdminStatus: build.mutation<any, { status: string ; id: string }>({
        query: ({ status, id }) => ({
            url: `/super_admin/update/${id}/${status}`,
            method: "PATCH",
            headers: { 
              "Content-Type": "application/json" 
            },  
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
    useGetALlUserQuery,
    useUpdateAdminStatusMutation,
    useDeleteAdminMutation
} = sAdminApi
