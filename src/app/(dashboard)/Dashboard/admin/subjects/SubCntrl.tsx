'use client'
import '@/css/Dashboard/admin/university.css'
import { toast } from 'react-toastify'
import { SubmitHandler, useForm } from 'react-hook-form'
import { usePostSubjectMutation, useUpdateSubjectMutation } from '@/redux/endpoints/subject/subjectEndpoints'
import convertFormData from '@/utils/convertFormData'


interface Subject{
    name:string; 
    country:string; 
    initialDepossit:string; 
    tuitionFee:string; 
    entryRequ:string; 
    engTest:string;
    duration:string;
    details:string;
}

const UpdateUni = ({name,setOpen,uniId}:{name:string,setOpen:React.Dispatch<React.SetStateAction<boolean>>,uniId:string}) => {
    const {
        register,
        handleSubmit,
        watch,
        reset,
        formState: { errors },
    } = useForm<Subject>()
    const [postSubject,{isLoading:createLoad}] = usePostSubjectMutation()
    const [updateSubject,{isLoading:editLoad}] = useUpdateSubjectMutation()

    const onSubmit: SubmitHandler<Subject> = async(data) => {
        try{
            const formData = convertFormData(data)
            let res
            if(name==="Add"){
                res = await postSubject(formData)
            }else{
                res = await updateSubject({data:formData,id:uniId})
            }
            
            
            if(res?.data?.data?.acknowledged){
                toast.success("Successful!!!")
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
                <label htmlFor="name">Subject Name:</label>
                <input id="name" type="text" {...register("name")}  />
            </div>

            <div className="form-group">
                <label htmlFor="country">counrty name</label>
                <input id="name" type="text" {...register("country")}  />
            </div>

            <div className="form-group">
                <label htmlFor="initialDepossit">Initial deposit</label>
                <input id="initialDepossit" type="text"{...register("initialDepossit")}  />
            </div>

            <div className="form-group">
                <label htmlFor="tuitionFee">Tuition Fee:</label>
                <input id="tuitionFee" type="text" {...register("tuitionFee")}  />
            </div>

            <div className="form-group">
                <label htmlFor="entryRequ">Entry requarment:</label>
                <input id="entryRequ" type="text" {...register("entryRequ")}  />
            </div>

            <div className="form-group">
                <label htmlFor="details">Details:</label>
                <input id="details" type="text" {...register("details")}  />
            </div>

            <div className="form-group">
                <label htmlFor="engTest">English Test</label>
                <input id="engTest" type="text" {...register("engTest")}  />
            </div>


            <div className="form-group">
                <label htmlFor="duration">Course Duration</label>
                <input id="duration" type="text" {...register("duration")}  />
            </div>

            <div className="form-actions">
                <button type="submit" className="btn-update" disabled={createLoad || editLoad}>
                    {createLoad || editLoad ? "Processing..." : name}
                </button>
            </div>
        </form>
    )
}

export default UpdateUni