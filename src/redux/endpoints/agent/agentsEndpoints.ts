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

        
        getALlAgentReq: build.query<any, void>({
            query: () => ({
                url: "/agent/request",
                method: "GET",
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


        updateAgentStatus: build.mutation<any, { status: string ; id: string }>({
            query: ({ status, id }) => ({
                url: `/agent/update/${id}/${status}`,
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
