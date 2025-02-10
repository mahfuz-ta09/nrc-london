import { baseApi } from "@/redux/baseApi";

const reviewApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    postReview: build.mutation({
        query: (data) => ({
            url: "/review/create",
            method: "POST",
            headers: { 
              "Content-Type": "application/json" 
            }, 
            data,
        }),
      invalidatesTags: ["review"],  
    }),

    getALlReview: build.query<any, void>({
        query: () => ({
            url: "/review/all",
            method: "GET",
        }),
      providesTags: ["review"],
    }),

    deleteReview: build.mutation<any, string>({
        query: (email) => ({
            url: `/review/delete/${email}`,
            method: "DELETE",
        }),
      invalidatesTags: ["review"],  
    }),

    updateReview: build.mutation<any, { data: any; id: string }>({
        query: ({ data, id }) => ({
            url: `/review/update/${id}`,
            method: "PATCH",
            headers: { 
              "Content-Type": "application/json" 
            },  
            body: data,   
        }),
      invalidatesTags: ["review"], 
    }),

    getPageReview: build.query<any, { page: number , item: number }>({
        query: ({page,item}) => ({
                url: `/review/partial/${page}/${item}`,
                method: "GET",
            }),
            providesTags: ["review"],
        }),
    }),

  overrideExisting: true,
})

export const {
    useGetALlReviewQuery,
    useDeleteReviewMutation,
    useGetPageReviewQuery,
    usePostReviewMutation,
    useUpdateReviewMutation
} = reviewApi
