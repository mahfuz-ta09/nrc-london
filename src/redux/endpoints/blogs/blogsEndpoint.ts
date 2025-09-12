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
            invalidatesTags: ["proceed"],
        }),



    }),

    overrideExisting: true,
})

export const {
    useCreateBlogMutation
} = blogApi