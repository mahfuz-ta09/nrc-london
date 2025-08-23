import { baseApi } from "@/redux/baseApi";

const agentApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
       
        createAgentsReq: build.mutation({
            query: (data: FormData) => ({
                url: "/agent/create",
                method: "POST",
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
                data, 
            }),
            invalidatesTags: ["agents"],
        }),

        
        getALlAgentReq: build.query<any, {limit: string, page:string,email:string,nationality:string, applicationStat:string}>({
            query: ({limit, page,email,nationality, applicationStat}) => ({
                url: "/agent/request",
                method: "GET",
                params: {limit,page,email,nationality,applicationStat}
            }),
            providesTags: ["agents"],
        }),

        getALlAgent: build.query<any, void>({
            query: () => ({
                url: "/agent/all",
                method: "GET",
            }),
            providesTags: ["agents"],
        }),


        updateAgentStatus: build.mutation<any, { applicationStat: any ,docStat:any , id: string }>({
            query: ({ applicationStat, docStat , id }) => ({
                url: `/agent/update/${id}/${applicationStat}/${docStat}`,
                method: "PATCH",
                headers: { 
                "Content-Type": "application/json" 
                },  
            }),
            invalidatesTags: ["agents"], 
        }),

    }),

  overrideExisting: true,
})

export const {
    useCreateAgentsReqMutation,
    useGetALlAgentQuery,
    useGetALlAgentReqQuery,
    useUpdateAgentStatusMutation,
} = agentApi
