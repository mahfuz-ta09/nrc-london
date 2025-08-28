import { baseApi } from "@/redux/baseApi";

const bannerEndpoint = baseApi.injectEndpoints({
    endpoints: (build) => ({
        createBanner: build.mutation<any, {data:any}>({
            query: ({data}) => ({
                url: "/banner/create",
                method: "POST",
                headers:{
                  'Content-Type': 'multipart/form-data',
                },
                data,
            }),
            invalidatesTags: ["banner"],
        }),

        
        getAllBanners: build.query<any, {status: string}>({
            query: ({status}) => ({
                url: `/banner/all/${status}`,
                method: "GET",
            }),
            providesTags: ["banner"],
        }),

        
        getBannerById: build.query({
            query: (id) => ({
                url: `/banner/${id}`,
                method: "GET",
            }),
            providesTags: (_result, _error, id) => [{ type: "banner", id }],
        }),

        
        updateBanner: build.mutation<any,{id:string , data:any}>({
            query: ({ id, data }) => ({
                url: `/banner/update/${id}`,
                method: "PUT",
                headers:{
                  'Content-Type': 'multipart/form-data',
                },
                data,
            }),
            invalidatesTags: (_result, _error, { id }) => [
                { type: "banner", id },
                "banner",
            ],
        }),

        
        deleteBanner: build.mutation({
            query: (id) => ({
                url: `/banner/delete/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["banner"],
        }),
    }),

    overrideExisting: true,
});

export const {
  useCreateBannerMutation,
  useGetAllBannersQuery,
  useGetBannerByIdQuery,
  useUpdateBannerMutation,
  useDeleteBannerMutation,
} = bannerEndpoint;
