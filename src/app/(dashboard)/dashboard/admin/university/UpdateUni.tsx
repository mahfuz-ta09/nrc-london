'use client'
import '@/css/Dashboard/admin/university.css'
import { useCreateUniversityMutation, useUpdateUniversityMutation } from '@/redux/endpoints/university/universityEndpoints'
import { useForm, SubmitHandler } from "react-hook-form"
import { toast } from 'react-toastify';

interface University {
    name: string;
    country: string;
    file?: FileList | null;
    flag?: FileList| null;
    initialDepossit: string;
    requardQualification: string;
    SCHOLARSHIP: string;
    englishTest: string;
    tuitionFee: string;
}

const UpdateUni = ({ name , setOpen , uniId }:{name:string,setOpen:React.Dispatch<React.SetStateAction<boolean>>,uniId:string}) => {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<University>()
    const [ createUniversity,{isLoading:createLoad} ] = useCreateUniversityMutation()
    const [ updateUniversity,{isLoading:editLoad} ] = useUpdateUniversityMutation()

    const onSubmit: SubmitHandler<University> = async(data: University) => {
        try{
            let res
            var form_data = new FormData()
            
            Object.entries(data).forEach(([key, value]) => {
                if(value instanceof FileList) {
                    for (let i = 0; i < value.length; i++) {
                        form_data.append(key, value[i]);
                    }
                }else if (value !== undefined && value !== null) {
                    form_data.append(key, String(value));
                }
            })


            if(name==="Add"){
                res = await createUniversity(form_data)
            }else{
                res = await updateUniversity({data: form_data,id:uniId})
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
            <h2 className="form-title">{name} University-{uniId}</h2>
            {name!='Add' && <p style={{color:'white'}}>Delete the document to update photo</p> }
            <div className="form-group">
                <label htmlFor="name">University Name:</label>
                <input id="name" type="text" {...register("name")} />
            </div>

            <div className="form-group">
                <label htmlFor="name">Country Name:</label>
                <input id="name" type="text" {...register("country")} />
            </div>

            {name==='Add' && <div className="form-group">
                <label htmlFor="logo">Add university/random image:</label>
                <input style={{color:"white"}} id="file" type="file" {...register("file")}  />
            </div>}

            {name==='Add' && <div className="form-group">
                <label htmlFor="logo">Country flag image:</label>
                <input style={{color:"white"}} id="file" type="file" {...register("flag")}  />
            </div>}

            <div className="form-group">
                <label htmlFor="initialDepossit">Initial Depossit:</label>
                <input id="initialDepossit" type="text"{...register("initialDepossit")} />
            </div>

            <div className="form-group">
                <label htmlFor="requiredDocs">Required Qualification:</label>
                <input id="requiredDocs" type="text" {...register("requardQualification")} />
            </div>

            <div className="form-group">
                <label htmlFor="SCHOLARSHIP">Scholership:</label>
                <input id="SCHOLARSHIP" type="text" {...register("SCHOLARSHIP")} />
            </div>

            <div className="form-group">
                <label htmlFor="englishTest">English Test:</label>
                <input id="englishTest" type="text" {...register("englishTest")} />
            </div>

            <div className="form-group">
                <label htmlFor="tuitionFee">Tuition Fee:</label>
                <input id="tuitionFee" type="text" {...register("tuitionFee")} />
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