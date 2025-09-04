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

      
      updateUserProfile: build.mutation<any, { data: FormData, id:string }>({
          query: ({ data , id }) => ({
              url: `/profile/update/${id}`,
              method: "PATCH", 
              data,
          }),
        invalidatesTags: ["profile"], 
      }),

      
      sendEmail: build.mutation<any, { data:any }>({
          query: ({ data }) => ({
              url: `/profile/email-contact`,
              method: "POST",
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
    useSendEmailMutation
} = profileApi
