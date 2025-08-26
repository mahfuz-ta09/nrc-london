import { baseApi } from "@/redux/baseApi";

const bannerEndpoint = baseApi.injectEndpoints({
    endpoints: (build) => ({
        // Create new banner
        createBanner: build.mutation({
            query: (data) => ({
                url: "/banner/create",
                method: "POST",
                body: data,
            }),
            invalidatesTags: ["banner"],
        }),

        // Get all banners
        getAllBanners: build.query({
            query: () => ({
                url: "/banner/all",
                method: "GET",
            }),
            providesTags: ["banner"],
        }),

        // Get single banner by ID
        getBannerById: build.query({
            query: (id) => ({
                url: `/banner/${id}`,
                method: "GET",
            }),
            providesTags: (_result, _error, id) => [{ type: "banner", id }],
        }),

        // Update banner
        updateBanner: build.mutation({
            query: ({ id, ...data }) => ({
                url: `/banner/update/${id}`,
                method: "PUT",
                body: data,
            }),
            invalidatesTags: (_result, _error, { id }) => [
                { type: "banner", id },
                "banner",
            ],
        }),

        // Delete banner
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
