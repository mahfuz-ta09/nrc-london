'use client'
import '@/css/Dashboard/admin/university.css'
import { useForm, SubmitHandler } from "react-hook-form"

interface University {
    name: string;
    logo: string;
    ranking: string;
    tuitionFee: string;
    requiredDocs: string;
    applicationFee: string;
    duration: string;
    intakes: string;
    entryRequirements: string;
    applicationDeadlines: string;
}

const UpdateUni = ({name,setOpen}:{name:string,setOpen:React.Dispatch<React.SetStateAction<boolean>>}) => {
    const {
        register,
        handleSubmit,
        watch,
        reset,
        formState: { errors },
    } = useForm<University>()

    const onSubmit: SubmitHandler<University> = (data) => {
        console.log(data)

        // reset()
    }

    return (
        <form className="edit-university-form" onSubmit={handleSubmit(onSubmit)}>
            <h2 className="form-title">{name} University</h2>

            <div className="form-group">
                <label htmlFor="name">University Name:</label>
                <input id="name" type="text" {...register("name")} required />
            </div>

            <div className="form-group">
                <label htmlFor="logo">Add university image:</label>
                <input id="logo" type="file" {...register("logo")}  required />
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
                <button type="submit" className="btn-update">{name}</button>
            </div>
        </form>
    )
}

export default UpdateUni