'use client'
import '@/css/Dashboard/admin/university.css'
import { toast } from 'react-toastify'
import { SubmitHandler, useForm } from 'react-hook-form'
import convertFormData from '@/utils/convertFormData'
import { usePostSubjectMutation, useUpdateSubjectMutation } from '@/redux/endpoints/subject/subjectEndpoints'
import useImgBBUpload from '@/utils/useImgBBUpload'

interface Subject {
    name: string;
    file: FileList | null;
    ranking: string;
    tuitionFee: string;
    requiredDocs: string;
    applicationFee: string;
    duration: string;
    intakes: string;
    entryRequirements: string;
    applicationDeadlines: string;
}

const UpdateUni = ({name,setOpen,uniId}:{name:string,setOpen:React.Dispatch<React.SetStateAction<boolean>>,uniId:string}) => {
    const {
        register,
        handleSubmit,
        watch,
        reset,
        formState: { errors },
    } = useForm<Subject>()
    const { uploadImage, isLoading:imgLoad, error } = useImgBBUpload()
    const [postSubject,{isLoading:createLoad}] = usePostSubjectMutation()
    const [updateSubject,{isLoading:editLoad}] = useUpdateSubjectMutation()

    const onSubmit: SubmitHandler<Subject> = async(data) => {
        const formData = convertFormData(data)
        
        try{
            let res
            if(name==="Add"){
                res = await postSubject(formData)
            }else{
                res = await updateSubject({data:formData,id:uniId})
            }
            console.log(res)
            if(res?.data?.data?.acknowledged){
                toast.success("Insertion successful!!!")
                setOpen(false)
                reset()
            }else{
                toast.error(res?.data?.message || "Failed!")
            }
        }catch(err){
            console.log(err)
        }
    }


    return (
        <form className="edit-university-form" onSubmit={handleSubmit(onSubmit)}>
            <h2 className="form-title">{name} subjects</h2>

            <div className="form-group">
                <label htmlFor="name">University Name:</label>
                <input id="name" type="text" {...register("name")} required />
            </div>

            <div className="form-group">
                <label htmlFor="logo">Add university image:</label>
                <input id="file" type="file" {...register("file")}  required />
            </div>

            <div className="form-group">
                <label htmlFor="ranking">Ranking:</label>
                <input id="ranking" type="text"{...register("ranking")} required />
            </div>

            <div className="form-group">
                <label htmlFor="tuitionFee">Tuition Fee:</label>
                <input id="tuitionFee" type="text" {...register("tuitionFee")} required />
            </div>

            <div className="form-group">
                <label htmlFor="requiredDocs">Required Documents:</label>
                <input id="requiredDocs" type="text" {...register("requiredDocs")} required />
            </div>

            <div className="form-group">
                <label htmlFor="applicationFee">Application Fee:</label>
                <input id="applicationFee" type="text" {...register("applicationFee")} required />
            </div>

            <div className="form-group">
                <label htmlFor="duration">Duration (Months):</label>
                <input id="duration" type="text" {...register("duration")} required />
            </div>

            <div className="form-group">
                <label htmlFor="intakes">Intakes:</label>
                <input id="intakes" type="text" {...register("intakes")} required />
            </div>

            <div className="form-group">
                <label htmlFor="entryRequirements">Entry Requirements:</label>
                <input id="entryRequirements" type="text" {...register("entryRequirements")} required />
            </div>

            <div className="form-group">
                <label htmlFor="applicationDeadlines">Application Deadlines:</label>
                <input id="applicationDeadlines" type="text" {...register("applicationDeadlines")} required />
            </div>

            <div className="form-actions">
                <button type="submit" className="btn-update" disabled={createLoad || editLoad || imgLoad}>
                    {imgLoad || createLoad || editLoad ? "Processing..." : name}
                </button>
            </div>
        </form>
    )
}

export default UpdateUni