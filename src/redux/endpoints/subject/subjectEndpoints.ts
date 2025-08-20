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


    getAllSubByCountry:build.query<any,string>({
        query:(uni:string) =>({
            url: `/subject/all/${uni}`,
            method:'GET',
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
  
    getSubNavItem: build.query<any, void>({
      query: () =>({
          url    : '/subject/sub-area',
          method : 'GET'
      }),
      providesTags: ["subjects"]
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










    
    addSubject: build.mutation<any,{data:any,countryId:string, universityName:string}>({
      query: ({data,countryId, universityName}) => ({
        url    : `/subject/add/${countryId}/${universityName}`,
        method : "POST",
        data
      }),
      invalidatesTags: ["country-uni"]
    }),


    getSubjectList: build.query<any, { all?: string , country?: string , page?: string , total?: string , uniName: string}>({
        query: ({ all, country, page, total , uniName }) => ({
            url: `/subject`,
            method: 'GET',
            params: { all, country, page, total , uniName}
        }),
        providesTags: ["country-uni"]
    }),


        removeSubject : build.mutation<any, { id: string, countryID: string , countryName: string }>({
            query: ({ id , countryID , countryName }) => ({
              url: `/subject/remove/${id}/${countryID}/${countryName}`,
              method: "DELETE",
            }),
            invalidatesTags: ["country-uni"]
        }),

  }),
  overrideExisting: true,
})


export const { 
    usePostSubjectMutation,
    useGetSubjectQuery,
    useDeleteSubjectMutation,
    useUpdateSubjectMutation,
    useGetSubNavItemQuery,
    useGetAllSubByCountryQuery,










    // new endpoints
    useAddSubjectMutation,
    useGetSubjectListQuery,
    useRemoveSubjectMutation,
} = subjectApi