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

        getAllUniByCountry:build.query<any,string>({
            query:(uni:string) =>({
                url: `/university/all/${uni}`,
                method:'GET',
            }),
            providesTags: ["university"]
        }),

        getUniNavItem: build.query<any, void>({
            query: () =>({
                url    : '/university/uni-area',
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
            query: (data: FormData) => ({
              url         : '/university/create',
              method      : "POST",
              headers: {
                  'Content-Type': 'multipart/form-data',
              },
              data
            }),
            invalidatesTags: ["university"]
        }),

        updateUniversity: build.mutation<any, { data: any, id: string }>({
            query: ({ data , id }) => ({
              url         : `/university/update/${id}`,
              method      : "PATCH",
              contentType : "application/json",
              data
            }),
            invalidatesTags: ["university"]
        }),
        








        addUniversity: build.mutation<any, { data: any, id: string }>({
            query: ({data,id}) => ({
              url         : `/university/add/${id}`,
              method      : "POST",
              headers: {
                  'Content-Type': 'multipart/form-data',
              },
              data
            }),
            invalidatesTags: ["country-uni"]
        }),


        editUniversity: build.mutation<any, { data: any, id: string , universityName: string}>({
            query: ({data,id,universityName}) => ({
              url         : `/university/edit/${id}/${universityName}`,
              method      : "PATCH",
              headers: {
                  'Content-Type': 'multipart/form-data',
              },
              data
            }),
            invalidatesTags: ["country-uni"]
        }),

        getUniversityList: build.query<any, { all?: string , country?: string , page?: number , total?: number , uniName: string}>({
            query: ({ all, country, page, total , uniName }) => ({
                url: `/university`,
                method: 'GET',
                params: { all, country, page, total , uniName}
            }),
            providesTags: ["country-uni"]
        }),

        deleteUni : build.mutation<any, { id: string, name: string }>({
            query: ({ id , name }) => ({
              url: `/university/remove/${id}/${name}`,
              method: "DELETE",
            }),
            invalidatesTags: ["country-uni"]
        }),

    }),
    overrideExisting: true,
})

export const {
    useGetUniNavItemQuery,
    useCreateUniversityMutation,
    useDeleteUniversityMutation,
    useGetSingleUniversityQuery,
    useGetUniversityQuery,
    useUpdateUniversityMutation,
    useGetAllUniByCountryQuery,



    useAddUniversityMutation,
    useGetUniversityListQuery,
    useEditUniversityMutation,
    useDeleteUniMutation
} = universityApi