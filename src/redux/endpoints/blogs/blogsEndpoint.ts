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

        updateBlog: build.mutation<any, { data: any , id: string }>({
            query: ({ data , id }) => ({
                url: `/blog/update/${id}`,
                method: 'PATCH',
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
                data,
            }),
            invalidatesTags: ["blogs"],
        }),

        getBlogs: build.query<
            { data: any[]; meta: { total: number; page: number; limit: number; totalPages: number ; totalCount:number } },
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

        deleteBlog: build.mutation<any, { id: string }>({
            query: ({ id }) => ({
                url: `/blog/delete/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["blogs"],
        }),

        getUniqueCatagories: build.query<{ data: any }, void>({
            query: () => ({
                url: "/blog/categories",
                method: "GET",
            }),
            providesTags: ["blogs"],
        }),

        getBlogByCategory: build.query<
            { data: any[]},{ category: string; page?: number; limit?: number }>({
                query: ({ category, page = 1, limit = 10 }) => ({
                    url: `/blog/read/${category}/${page}/${limit}`,
                    method: "GET",
                }),
                providesTags: ["blogs"],
        }),

        getSingleBlogBySlug: build.query<
            { data:any },{ slug: string }>({
                query: ({ slug }) => ({
                    url: `/blog/all-stat/${slug}`,
                    method: "GET",
                }),
                providesTags: ["blogs"],
        }),

    }),
    

    overrideExisting: true,
})



export const {
    useCreateBlogMutation,
    useUpdateBlogMutation,
    useGetBlogsQuery,
    useDeleteBlogMutation,
    useGetBlogByCategoryQuery,
    useGetUniqueCatagoriesQuery,
    useGetSingleBlogBySlugQuery
} = blogApi