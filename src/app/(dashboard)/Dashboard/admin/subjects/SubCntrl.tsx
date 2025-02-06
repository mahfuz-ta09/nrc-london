'use client'
import '@/css/Dashboard/admin/university.css'
import { toast } from 'react-toastify'
import { SubmitHandler, useForm } from 'react-hook-form'
import { usePostSubjectMutation, useUpdateSubjectMutation } from '@/redux/endpoints/subject/subjectEndpoints'


interface Subject {
    name: string;
    destination: string;
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
    const [postSubject,{isLoading:createLoad}] = usePostSubjectMutation()
    const [updateSubject,{isLoading:editLoad}] = useUpdateSubjectMutation()

    const onSubmit: SubmitHandler<Subject> = async(data) => {
        try{
            let res
            if(name==="Add"){
                res = await postSubject(data)
            }else{
                res = await updateSubject({data:data,id:uniId})
            }
            
            
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
                <label htmlFor="name">Subject Name:</label>
                <input id="name" type="text" {...register("name")}  />
            </div>

            <div className="form-group">
                <label htmlFor="destination">Add posible destination:(counrty name)</label>
                <input id="name" type="text" {...register("destination")}  />
            </div>

            <div className="form-group">
                <label htmlFor="ranking">Duration:(pg&ug in month)</label>
                <input id="ranking" type="text"{...register("duration")}  />
            </div>

            <div className="form-group">
                <label htmlFor="tuitionFee">Tuition Fee:(estimated)</label>
                <input id="tuitionFee" type="text" {...register("tuitionFee")}  />
            </div>

            <div className="form-group">
                <label htmlFor="requiredDocs">Required Documents:</label>
                <input id="requiredDocs" type="text" {...register("requiredDocs")}  />
            </div>

            <div className="form-group">
                <label htmlFor="applicationFee">Application Fee:($estimated)</label>
                <input id="applicationFee" type="text" {...register("applicationFee")}  />
            </div>


            <div className="form-group">
                <label htmlFor="intakes">Intakes:(estimated)</label>
                <input id="intakes" type="text" {...register("intakes")}  />
            </div>

            <div className="form-group">
                <label htmlFor="entryRequirements">Entry Requirements:</label>
                <input id="entryRequirements" type="text" {...register("entryRequirements")}  />
            </div>

            <div className="form-group">
                <label htmlFor="applicationDeadlines">Application Deadlines:($estimated)</label>
                <input id="applicationDeadlines" type="text" {...register("applicationDeadlines")}/>
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