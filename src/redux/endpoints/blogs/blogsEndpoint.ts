import { baseApi } from "@/redux/baseApi";



const blogApi = baseApi.injectEndpoints({
    endpoints: (build) => ({

        createBlog: build.mutation<any ,{ data: any }>({
            query: ({data}) => ({
                url: "/blog/create",
                method: "POST",
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
                data,
            }),
            invalidatesTags: ["blogs"],
        }),

        getBlogs: build.query<
            { blogs: any[]; meta: { total: number; page: number; limit: number; totalPages: number } },
            { page?: number; limit?: number; category?: string; status?: string; isFeatured?: boolean }>({

                query: ({ page = 1, limit = 10, category, status, isFeatured }) => {
                    const params = new URLSearchParams()

                    if (page) params.append("page", String(page))
                    if (limit) params.append("limit", String(limit))
                    if (category) params.append("category", category)
                    if (status) params.append("status", status)
                    if (isFeatured !== undefined) params.append("isFeatured", String(isFeatured))

                    return {
                        url: `/blog/all?${params.toString()}`,
                        method: "GET",
                    }
                },
                providesTags: ["blogs"],
        }),

    }),

    overrideExisting: true,
})



export const {
    useCreateBlogMutation,
    useGetBlogsQuery,
} = blogApi