import { baseApi } from "@/redux/baseApi"



const subjectApi = baseApi.injectEndpoints({
  endpoints: (build) => ({

    postSubject: build.mutation({
      query: (data) => ({
        url         : '/subject/create',
        method      : "POST",
        headers: {
            'Content-Type': 'multipart/form-data',
        },
        data
      }),
      invalidatesTags: ["subjects"]
    }),

    getSubject: build.query<any, void>({
      query: () =>({
        url    : '/subject/all',
        method : 'GET'
      }),
      providesTags: ["subjects"]
    }),

    deleteSubject: build.mutation<any, string>({
      query: (id) =>({
        url    : `/subject/delete/${id}`,
        method : 'DELETE',
      }),
      invalidatesTags: ["subjects"]
    }),


    updateSubject: build.mutation<any, { data: any, id: string }>({
        query: ({ data , id }) => ({
          url         : `/subject/update/${id}`,
          method      : "PATCH",
          contentType : "application/json",
          data
        }),
        invalidatesTags: ["subjects"]
    }),
  }),
  overrideExisting: true,
})


export const { 
    usePostSubjectMutation,
    useGetSubjectQuery,
    useDeleteSubjectMutation,
    useUpdateSubjectMutation
} = subjectApi