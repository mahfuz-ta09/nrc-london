'use client'
import '@/css/Dashboard/admin/university.css'
import { useCreateUniversityMutation, useUpdateUniversityMutation } from '@/redux/endpoints/university/universityEndpoints';
import convertFormData from '@/utils/convertFormData';
import useImgBBUpload from '@/utils/useImgBBUpload';
import { useForm, SubmitHandler } from "react-hook-form"
import { toast } from 'react-toastify';

interface University {
    name: string;
    country: string;
    file: FileList | null;
    flag: FileList;
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
        reset,
        formState: { errors },
    } = useForm<University>()
    const { uploadImage, isLoading:imgLoad, error } = useImgBBUpload()
    const [createUniversity,{isLoading:createLoad}] = useCreateUniversityMutation()
    const [updateUniversity,{isLoading:editLoad}] = useUpdateUniversityMutation()

    const onSubmit: SubmitHandler<University> = async(data) => {
        
        try{
            let res,url="",flag=""
            if(data?.file){
                url = await uploadImage(data?.file)
                flag = await uploadImage(data?.flag)
            }

            const dataUpload ={
                name: data?.name,
                country: data?.country,
                url: url,
                flag: flag,
                ranking: data?.ranking,
                tuitionFee: data?.tuitionFee,
                requiredDocs: data?.requiredDocs,
                applicationFee: data?.applicationFee,
                duration: data?.duration,
                intakes: data?.intakes,
                entryRequirements: data?.entryRequirements,
                applicationDeadlines: data?.applicationDeadlines,
            }

            if(name==="Add"){
                res = await createUniversity(dataUpload)
            }else{
                res = await updateUniversity({data:dataUpload,id:uniId})
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

            <div className="form-group">
                <label htmlFor="name">University Name:</label>
                <input id="name" type="text" {...register("name")} />
            </div>

            <div className="form-group">
                <label htmlFor="name">Country Name:</label>
                <input id="name" type="text" {...register("country")} />
            </div>

            <div className="form-group">
                <label htmlFor="logo">Add university image:</label>
                <input style={{color:"white"}} id="file" type="file" {...register("file")}  />
            </div>

            <div className="form-group">
                <label htmlFor="logo">Country flag image:</label>
                <input style={{color:"white"}} id="file" type="file" {...register("flag")}  />
            </div>

            <div className="form-group">
                <label htmlFor="ranking">Ranking:</label>
                <input id="ranking" type="text"{...register("ranking")} />
            </div>

            <div className="form-group">
                <label htmlFor="tuitionFee">Tuition Fee:</label>
                <input id="tuitionFee" type="text" {...register("tuitionFee")} />
            </div>

            <div className="form-group">
                <label htmlFor="requiredDocs">Required documents:</label>
                <input id="requiredDocs" type="text" {...register("requiredDocs")} />
            </div>

            <div className="form-group">
                <label htmlFor="applicationFee">Application Fee:</label>
                <input id="applicationFee" type="text" {...register("applicationFee")} />
            </div>

            <div className="form-group">
                <label htmlFor="duration">Duration (Months):</label>
                <input id="duration" type="text" {...register("duration")} />
            </div>

            <div className="form-group">
                <label htmlFor="intakes">Intakes:</label>
                <input id="intakes" type="text" {...register("intakes")} />
            </div>

            <div className="form-group">
                <label htmlFor="entryRequirements">Entry Requirements:</label>
                <input id="entryRequirements" type="text" {...register("entryRequirements")} />
            </div>

            <div className="form-group">
                <label htmlFor="applicationDeadlines">Application Deadlines:</label>
                <input id="applicationDeadlines" type="text" {...register("applicationDeadlines")} />
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