import { baseApi } from "@/redux/baseApi";



const proceedApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    
        // by students
        postProcessData: build.mutation({
            query: (data) => ({
                url: "/process/create",
                method: "POST",
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
                data,
            }),
            invalidatesTags: ["proceed"],  
        }),
    
        // by superadmin/admin/agents
        createtStudentFile: build.mutation<any,{data:any}>({
            query: ({data}) => ({
                url: "/process/file",
                method: "POST",
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
                data,
            }),
            invalidatesTags: ["proceed"],  
        }),
    
        // by superadmin/admin/agents
        getStudentFileStat: build.query<any,void>({
            query: () => ({
                url: "/process/stat",
                method: "GET",
            }),
            providesTags: ["proceed"],  
        }),

        getFileByConditions: build.query<any, { values: any }>({
            query: ({ values }) => {
                const params = new URLSearchParams();
                
                if (values?.personalInfo?.requiredSubmission !== '')params.append("personalInfo[requiredSubmission]", String(values.personalInfo.requiredSubmission));
                if (values?.personalInfo?.requiredVerification !== '')params.append("personalInfo[requiredVerification]", String(values.personalInfo.requiredVerification));
                
                if (values?.englishProficiency?.requiredSubmission !== '')params.append("englishProficiency[requiredSubmission]", String(values.englishProficiency.requiredSubmission));
                if (values?.englishProficiency?.requiredVerification !== '')params.append("englishProficiency[requiredVerification]", String(values.englishProficiency.requiredVerification));
                
                if (values?.prefferedUniSub?.requiredSubmission !== '')params.append("prefferedUniSub[requiredSubmission]", String(values.prefferedUniSub.requiredSubmission));
                if (values?.prefferedUniSub?.requiredVerification !== '')params.append("prefferedUniSub[requiredVerification]", String(values.prefferedUniSub.requiredVerification));
                
                if (values?.studentsFile?.requiredSubmission !== '')params.append("studentsFile[requiredSubmission]", String(values.studentsFile.requiredSubmission));
                if (values?.studentsFile?.requiredVerification !== '')params.append("studentsFile[requiredVerification]", String(values.studentsFile.requiredVerification));

                return {
                    url: `/process/get-all?${params.toString()}`,
                    method: "GET",
                };
            },
            providesTags: ["proceed"],
        }),

        getALlProcessReq: build.query<any, void>({
            query: () => ({
                url: "/process/all",
                method: "GET",
            }),
            providesTags: ["proceed"],
        }),

        deleteProcessReq: build.mutation<any, string>({
            query: (id) => ({
                url: `/process/delete/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["proceed"],  
        }),

        updatedProcessReq: build.mutation<any, { data: any; id: string }>({
            query: ({ data, id }) => ({
                url: `/process/update/${id}`,
                method: "PATCH",
                headers: { 
                    "Content-Type": "application/json" 
                },  
                body: data,   
            }),
            invalidatesTags: ["proceed"], 
        }),

        getProcessReqPagination: build.query<any, { page: number , item: number }>({
            query: ({ page , item }) => ({
                url: `/process/partial/${page}/${item}`,
                method: "GET",
            }),
            providesTags: ["proceed"],
        }),
    }),

  overrideExisting: true,
})

export const {
    usePostProcessDataMutation,
    useCreatetStudentFileMutation,
    useGetStudentFileStatQuery,
    useGetALlProcessReqQuery,
    useDeleteProcessReqMutation,
    useUpdatedProcessReqMutation,
    useGetProcessReqPaginationQuery,
    useGetFileByConditionsQuery
} = proceedApi
