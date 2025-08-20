'use client'
import Loader from "@/component/shared/Loader/Loader"
import { useAddSubjectMutation } from "@/redux/endpoints/subject/subjectEndpoints"
import { useState } from "react"
import { useForm, SubmitHandler } from "react-hook-form"
import { toast } from "react-toastify"

type ModalProps = {
    addSub: {
        action: string,
        id: string,
        isOPen: boolean,
        name: string
    },
    setAddSub: React.Dispatch<React.SetStateAction<any>>
}

type UniData = {
    subjectName?:string,
    duration?:number,
    description?:string,
    qualifications?: Record<string, number>,
    programType?:string ,
    faculty?:string,
    credits?:number,
    modeOfStudy?:string,
    language?:string,
    intakes?:string,
    applicationDeadline?:string,
    careerOpportunities?:string,
    accreditation?:string
    cost?:number
}

const qualificationOptions = [
  { value: "undergraduate", label: "Undergraduate (Bachelor's)" },
  { value: "graduate", label: "Graduate (Master's)" },
  { value: "doctorate", label: "Doctorate (PhD)" },
  { value: "diploma", label: "Diploma / Certificate" },
  { value: "foundation", label: "Foundation / Preparatory" }
];



const SubjectControllModal = ({ addSub, setAddSub }: ModalProps) => {
    const { register, handleSubmit, reset, setValue } = useForm<UniData>({
        defaultValues: {
            qualifications: {}
        }
    })
    const [addSubject , {isLoading: addLoading}] = useAddSubjectMutation()
    const [selectedQualifications, setSelectedQualifications] = useState<string[]>([])
    

    if(addLoading){
        return <Loader />
    }

    
    const onSubmit: SubmitHandler<UniData> = async(data) => {
        try{
            var form_data = new FormData()
            
            Object.entries(data).forEach(([key, value]) => {
                if (value instanceof FileList) {
                    for (let i = 0; i < value.length; i++) {
                        form_data.append(key, value[i]);
                    }
                } else if (typeof value === "object" && value !== null) {
                    Object.entries(value).forEach(([subKey, subValue]) => {
                        if (subValue !== undefined && subValue !== null && subValue !== 0 && !Number.isNaN(subValue)) {
                            form_data.append(`${key}[${subKey}]`, String(subValue));
                        }
                    });
                } else if (value !== undefined && value !== null && value !== "" && !Number.isNaN(value)) {
                    form_data.append(key, String(value));
                }

            });
            
            const res = await addSubject({data:form_data,countryId: addSub?.id,universityName: addSub?.name})
            
            if(res?.data?.data?.acknowledged){
                toast.success("Operation successful!!!")
                setAddSub({
                    isOpen: false,
                    id:"",
                    name:''
                })
                reset()
            }else{
                toast.error(res?.data?.message || "Failed! to operate")
            }
        }catch(err){
            toast.error("Something went wrong!")
        }
    }
    

    const handleQualificationSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selected = e.target.value
        if (selected && !selectedQualifications.includes(selected)) {
            setSelectedQualifications(prev => [...prev, selected])
            setValue(`qualifications.${selected}`, 0)
        }
        e.target.value = ""
    }

    return (
        <div className={addSub?.isOPen ? 'modal-container openmoda-container' : 'modal-container'}>
            <div className="modal-body">
                <h1 style={{ color: "black" }}>
                    {addSub?.action} subject to {addSub?.name}
                </h1>
                <button className="cancel-btn"
                    onClick={() =>
                        setAddSub((prev: any) => ({
                        ...prev,
                        id: "",
                        name: "",
                        isOPen: false,
                        action: "",
                        }))
                    }> X </button>

                <form onSubmit={handleSubmit(onSubmit)} className="modal-from">

                    <div className="input-container">
                        <label>subject name</label>
                        <input type="text" {...register("subjectName")} />
                    </div>


                    <div className="input-container">
                        <label>duration (months)</label>
                        <input type="number" min={0} {...register("duration", { valueAsNumber: true })} />
                    </div>


                    <div className="input-container">
                        <label>program type</label>
                        <select {...register("programType")}>
                        <option value="">-- Select program --</option>
                        <option value="BSc">BSc</option>
                        <option value="MSc">MSc</option>
                        <option value="PhD">PhD</option>
                        <option value="Diploma">Diploma</option>
                        </select>
                    </div>


                    <div className="input-container">
                        <label>faculty / department</label>
                        <input type="text" {...register("faculty")} placeholder="e.g. Faculty of Engineering" />
                    </div>


                    <div className="input-container">
                        <label>credits</label>
                        <input type="number" min={0} {...register("credits", { valueAsNumber: true })} />
                    </div>


                    <div className="input-container">
                        <label>cost</label>
                        <input type="number" min={0} {...register("cost", { valueAsNumber: true })} />
                    </div>


                    <div className="input-container">
                        <label>mode of study</label>
                        <select {...register("modeOfStudy")}>
                        <option value="">-- Select mode --</option>
                        <option value="Full-time">Full-time</option>
                        <option value="Part-time">Part-time</option>
                        <option value="Online">Online</option>
                        <option value="Hybrid">Hybrid</option>
                        </select>
                    </div>

                    
                    <div className="input-container">
                        <label>required qualifications</label>
                        <select onChange={handleQualificationSelect}>
                        <option value="">-- Select qualification --</option>
                        {qualificationOptions.map((q) => (
                            <option key={q?.value} value={q?.value}>
                            {q?.label}
                            </option>
                        ))}
                        </select>

                        {selectedQualifications.map((q) => (
                        <div key={q} style={{ marginTop: "10px" }}>
                            <label>study cost in {q}:</label>
                            <input
                            min={0}
                            type="number"
                            {...register(`qualifications.${q}`)}
                            placeholder={`Enter description for ${q}`}
                            style={{ padding: "4px", marginLeft: "10px" }}
                            />
                        </div>
                        ))}
                    </div>


                    <div className="input-container">
                        <label>language of instruction</label>
                        <input type="text" {...register("language")} placeholder="e.g. English" />
                    </div>


                    <div className="input-container">
                        <label>intake months</label>
                        <input type="text" {...register("intakes")} placeholder="e.g. Fall, Spring" />
                    </div>


                    <div className="input-container">
                        <label>application deadline</label>
                        <input type="date" {...register("applicationDeadline")} />
                    </div>


                    <div className="input-container">
                        <label>career opportunities</label>
                        <textarea {...register("careerOpportunities")} placeholder="e.g. Software Engineer, Data Scientist" />
                    </div>


                    <div className="input-container">
                        <label>accreditation</label>
                        <input type="text" {...register("accreditation")} placeholder="e.g. UGC Approved" />
                    </div>


                    <div className="input-container">
                        <label>add description about the course</label>
                        <textarea {...register("description")} />
                    </div>

                    <button type="submit" className="modal-sbmt-btn">
                        Submit
                    </button>
                </form>
            </div>
        </div>

    )
}

export default SubjectControllModal