import { baseApi } from "@/redux/baseApi";

const profileApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    
      getProfileById: build.query({
          query: (id) => ({
              url: `/profile/${id}`,
              method: "GET",
          }),
        providesTags: ["profile"],  
      }),
      updateUserProfile: build.mutation<any, { data:any, id:string }>({
          query: ({ data , id }) => ({
              url: `/profile/update/${id}`,
              method: "PATCH",
              headers: { 
                "Content-Type": "application/json" 
              },  
              data,
          }),
        invalidatesTags: ["profile"], 
      }),

    
    }),

  overrideExisting: true,
})

export const {
    useGetProfileByIdQuery,
    useUpdateUserProfileMutation,
} = profileApi
