import { baseApi } from "@/redux/baseApi";

const reviewApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
      postReview: build.mutation({
          query: (data) => ({
              url: "/review/create",
              method: "PATCH",
              headers: { 
                "Content-Type": "application/json" 
              }, 
              data,
          }),
        invalidatesTags: ["users"],  
      }),

      getALlReview: build.query<any, void>({
          query: () => ({
              url: "/review/all",
              method: "GET",
          }),
        providesTags: ["users"],
      }),

      deleteReview: build.mutation<any, string>({
          query: (id) => ({
              url: `/review/delete/${id}`,
              method: "PATCH",
          }),
        invalidatesTags: ["users"],  
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
          invalidatesTags: ["users"],   
      }),

      getPageReview: build.query<any, { page: number , item: number }>({
          query: ({page,item}) => ({
                  url: `/review/partial/${page}/${item}`,
                  method: "GET",
              }),
              providesTags: ["users"],
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
