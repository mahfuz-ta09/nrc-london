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

        editStudentFile:build.mutation<any, { data: any; id: string }>({
            query: ({ data, id }) => {
                return {
                    url: `/process/update-file/${id}`,
                    method: "PATCH",
                    data,   
                }
            },
            invalidatesTags: ["proceed"], 
        }),

        
        getFileByConditions: build.query<any, { values: any }>({
            query: ({ values }) => {
                const params = new URLSearchParams();
                console.log("this is values: ",values)
                if (values?.personalInfo?.complete !== '')params.append("personalInfo[complete]", String(values.personalInfo.complete));
                if (values?.personalInfo?.verified !== '')params.append("personalInfo[verified]", String(values.personalInfo.verified));
                
                if (values?.englishProficiency?.complete !== '')params.append("englishProficiency[complete]", String(values.englishProficiency.complete));
                if (values?.englishProficiency?.verified !== '')params.append("englishProficiency[verified]", String(values.englishProficiency.verified));
                
                if (values?.universityApplications?.complete !== '')params.append("universityApplications[complete]", String(values.universityApplications.complete));
                if (values?.universityApplications?.verified !== '')params.append("universityApplications[verified]", String(values.universityApplications.verified));
                
                if (values?.studentsFile?.complete !== '')params.append("studentsFile[complete]", String(values.studentsFile.complete));
                if (values?.studentsFile?.verified !== '')params.append("studentsFile[verified]", String(values.studentsFile.verified));
                console.log("this is params: ",params)
                return {
                    url: `/process/get-all?${params.toString()}`,
                    method: "GET",
                };
            },
            providesTags: ["proceed"],
        }),

        getSingleFileByStudentWithEmail: build.query<any, { identifier: string }>({
            query: ({ identifier }) => ({
                url: `/process/get-single-files/${identifier}`,
                method: "GET",
            }),
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
    useGetFileByConditionsQuery,
    useEditStudentFileMutation,
    useGetSingleFileByStudentWithEmailQuery
} = proceedApi
