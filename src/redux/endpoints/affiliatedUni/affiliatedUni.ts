import { baseApi } from "@/redux/baseApi";

const affiliatedUniApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        createAffiliatedUni: build.mutation<any ,{ data: any }>({
            query: ({ data }) => ({
                url: "/affiliated-uni/create",
                method: "POST",
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
                data, 
            }),
            invalidatesTags: ["affiliated-uni"],
        }),

        getAllAffiliatedUni:build.query<any, 
            { page?: number; limit?: number; category?: string; status?: string; isFeatured?: boolean }>({
            
            query:({ page = 1, limit = 10, category, status, isFeatured }) =>{
                const params = new URLSearchParams()

                if (page) params.append("page", String(page))
                if (limit) params.append("limit", String(limit))
                if (category) params.append("category", category)
                if (status) params.append("status", status)
                if (isFeatured !== undefined) params.append("isFeatured", String(isFeatured))

                return {
                    url:`/affiliated-uni/get-all? ${params.toString()}}`,
                    method: 'GET',
                }
            },
            providesTags: ["affiliated-uni"],
        }),

        deleteAffiliatedUni:build.mutation<any,{ id :string}>({
            query:({id})=>({
                url: `/affiliated-uni/remove-one/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ["affiliated-uni"],
        }),

        updateAffiliatedUni: build.mutation<any,{id: string , data: any}>({
            query:({id,data}) =>({
                url: `/affiliated-uni/update/${id}`,
                method: 'PATCH',
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
                data, 
            }),
            invalidatesTags: ["affiliated-uni"],
        }),

        getUniAgents:build.query<any,void>({
            query:() =>({
                url: '/affiliated-uni/page-all',
                method:'GET',
            }),
            providesTags: ["affiliated-uni"],
        })

    }),

  overrideExisting: true,
})


export const {
    useCreateAffiliatedUniMutation,
    useGetAllAffiliatedUniQuery, 
    useDeleteAffiliatedUniMutation,
    useUpdateAffiliatedUniMutation,
    useGetUniAgentsQuery
} = affiliatedUniApi