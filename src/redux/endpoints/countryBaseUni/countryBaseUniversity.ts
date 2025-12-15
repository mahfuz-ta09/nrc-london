import { baseApi } from "@/redux/baseApi"

const universityApi = baseApi.injectEndpoints({
    endpoints: (build) => ({

        createCountryList: build.mutation({
            query: (data: FormData) => ({
              url         : '/country/base/create',
              method      : "POST",
              headers: {
                  'Content-Type': 'multipart/form-data',
              },
              data
            }),
            invalidatesTags: ["country-uni"]
        }),


        deleteCountry: build.mutation<any, string>({
          query: (id:string) =>({
            url    : `/country/base/delete/${id}`,
            method : 'DELETE',
          }),
          invalidatesTags: ["country-uni"]
        }),


        editCountryList: build.mutation<any, { data: any, id: string }>({
            query: ({ data , id }) => ({
              url         : `/country/base/edit/${id}`,
              method      : "PATCH",
              headers: {
                  'Content-Type': 'multipart/form-data',
              },
              data
            }),
            invalidatesTags: ["country-uni"]
        }),

        getAllCountryBase: build.query<any, void>({
            query: () =>({
                url    : '/country/base/all',
                method : 'GET'
            }),
            providesTags: ["country-uni"]
        }),

        getAllCountryName: build.query<any, void>({
            query: () =>({
                url    : '/country/base/country',
                method : 'GET'
            }),
            providesTags: ["country-uni"]
        }),

    }),
    overrideExisting: true,
})




export const {
    useCreateCountryListMutation,
    useEditCountryListMutation,
    useGetAllCountryBaseQuery,
    useDeleteCountryMutation,
    useGetAllCountryNameQuery
} = universityApi