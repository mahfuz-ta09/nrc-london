import { baseApi } from "@/redux/baseApi"

const universityApi = baseApi.injectEndpoints({
    endpoints: (build) => ({

        getUniversity: build.query<any, void>({
            query: () =>({
                url    : '/university/all',
                method : 'GET'
            }),
            providesTags: ["university"]
        }),


        getSingleUniversity: build.query<any, string>({
            query: (id:string) =>({
                url    : `/university/single/${id}`,
                method : 'GET'
            }),
            providesTags: ["university"]
        }),


        deleteUniversity: build.mutation<any, string>({
          query: (id:string) =>({
            url    : `/university/delete/${id}`,
            method : 'DELETE',
          }),
          invalidatesTags: ["university"]
        }),


        createUniversity: build.mutation({
            query: (data) => ({
              url         : '/university/create',
              method      : "POST",
              contentType : "multipart/form-data",
              data
            }),
            invalidatesTags: ["university"]
        }),


        updateUniversity: build.mutation<any, { data: any, id: string }>({
            query: ({ data , id }) => ({
              url         : `/university/update/${id}`,
              method      : "PATCH",
              contentType : "multipart/form-data",
              data
            }),
            invalidatesTags: ["university"]
        }),

    }),
})

export const {
    useCreateUniversityMutation,
    useDeleteUniversityMutation,
    useGetSingleUniversityQuery,
    useGetUniversityQuery,
    useUpdateUniversityMutation
} = universityApi