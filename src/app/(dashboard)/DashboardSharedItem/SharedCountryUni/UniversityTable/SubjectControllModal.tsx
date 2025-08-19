'use client'
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
    subjectName:string,
    duration:number,
    description:string,
    qualifications: Record<string, number>, 
}

const qualificationOptions = ["master", "bsc", "phd", "diploma","under grad","experience"]


const SubjectControllModal = ({ addSub, setAddSub }: ModalProps) => {
    const { register, handleSubmit, reset, setValue } = useForm<UniData>({
        defaultValues: {
            qualifications: {}
        }
    })
    const [selectedQualifications, setSelectedQualifications] = useState<string[]>([])
    
    
    const onSubmit: SubmitHandler<UniData> = async(data) => {
        try{
            let res
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

            console.log(data)
            console.log(form_data)
            
            // if(addUni?.action==="add")res = await addUniversity({data:form_data,id: addUni?.id})
            // if(addUni?.action==="edit")res = await editUniversity({data: form_data,id:addUni?.id, universityName:addUni?.name})
            
            
            // if(res?.data?.data?.acknowledged){
            //     toast.success("Operation successful!!!")
            //     setAddUni({
            //         isOpen: false,
            //         id:"",
            //         name:''
            //     })
            //     reset()
            // }else{
            //     toast.error(res?.data?.message || "Failed! to operate")
            // }
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
            <div className='modal-body'>
                <h1 style={{color:"black"}}>{addSub?.action} subject to {addSub?.name}</h1>
                <button
                    onClick={() => setAddSub((prev:any) => ({ ...prev, id: '', name: '', isOPen: false, action: "" }))}
                    className="cancel-btn"
                >
                    X
                </button>
                
                <form onSubmit={handleSubmit(onSubmit)} className='modal-from'>
                    <div className='input-container'>
                        <label>subject name</label>
                        <input type='text' {...register("subjectName")} />
                    </div>


                    <div className='input-container'>
                        <label>duration</label>
                        <input type='number' min={0} {...register("duration", { valueAsNumber: true })} />
                    </div>

                    
                    
                    <div className='input-container'>
                        <label>Required qualifications</label>
                        <select onChange={handleQualificationSelect}>
                            <option value="">-- Select qualification --</option>
                            {qualificationOptions.map(q => (
                                <option key={q} value={q}>{q}</option>
                            ))}
                        </select>

                        {selectedQualifications.map(q => (
                            <div key={q} style={{ marginTop: '10px' }}>
                                <label>study cost in {q}:</label>
                                <input
                                    min={0}
                                    type="number"
                                    {...register(`qualifications.${q}`)}
                                    placeholder={`Enter description for ${q}`}
                                    style={{ padding: '4px', marginLeft: '10px' }}
                                />
                            </div>
                        ))}
                    </div>

                    

                    <div className='input-container'>
                        <label>add description about the course</label>
                        <textarea {...register("description")} />
                    </div>

                    <button type='submit' className='modal-sbmt-btn'>Submit</button>
                </form>
            </div>
        </div>
    )
}

export default SubjectControllModal