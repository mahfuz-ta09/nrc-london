'use client'
import { useState } from 'react'
import { toast } from 'react-toastify'
import Loader from '@/component/shared/loader/loader'
import { useForm, SubmitHandler } from "react-hook-form"
import { useAddUniversityMutation, useEditUniversityMutation } from '@/redux/endpoints/university/universityEndpoints'


type ModalProps = {
    addUni: {
        action: string,
        id: string,
        isOPen: boolean,
        name: string
    },
    setAddUni: React.Dispatch<React.SetStateAction<any>>
}

type UniData = {
    universityImage: FileList | null,
    universityName: string,
    lowFee: number,
    highFee: number,
    scholarship: number,
    englishProf: Record<string, number>,
    qualifications: Record<string, string>, 
    initialDeposite: number,
    aboutUni: any
}

const testOptions = ["IELTS", "TOEFL", "DUOLINGO","GRE","PTE","OET","GMAT","SAT","ACT","APT"]
const qualificationOptions = [
  { value: "certificate", label: "Certificate (Short-term / Vocational)" },
  { value: "diploma", label: "Diploma / Advanced Diploma" },
  { value: "foundation", label: "Foundation / Preparatory" },
  { value: "associate", label: "Associate Degree (AA / AS)" },
  { value: "undergraduate", label: "Undergraduate (Bachelor’s)" },
  { value: "graduate", label: "Graduate (Master’s)" },
  { value: "doctorate", label: "Doctorate (PhD / Professional Doctorate)" },
  { value: "professional", label: "Professional Qualification (ACCA, CFA, PMP, etc.)" },
  { value: "postdoc", label: "Postdoctoral / Research Fellowship" },
  { value: "executive", label: "Executive Education / MBA / EMBA" },
  { value: "vocational", label: "Vocational / Technical Training" },
  { value: "continuing", label: "Continuing Education / Lifelong Learning" },
  { value: "online", label: "Online / Distance Learning Program" },
  { value: "shortcourse", label: "Short Course / Workshop / Bootcamp" }
]


const AddUniModal = ({ addUni, setAddUni }: ModalProps) => {
    const [addUniversity , { isLoading: createLoading }] = useAddUniversityMutation()
    const [editUniversity , { isLoading: editLoading}] = useEditUniversityMutation()


    const { register, handleSubmit, reset, setValue } = useForm<UniData>({
        defaultValues: {
            englishProf: {},
            qualifications: {}
        }
    })
    
    const [selectedTests, setSelectedTests] = useState<string[]>([])
    const [selectedQualifications, setSelectedQualifications] = useState<string[]>([])


    if(createLoading || editLoading ) return <Loader />

    

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
                        if (subValue !== undefined && subValue !== null && subValue !== "" && !Number.isNaN(subValue)) {
                        form_data.append(`${key}[${subKey}]`, String(subValue));
                        }
                    });
                } else if (value !== undefined && value !== null && value !== "" && !Number.isNaN(value)) {
                    form_data.append(key, String(value));
                }

            })

            
            if(addUni?.action==="add")res = await addUniversity({data:form_data,id: addUni?.id})
            if(addUni?.action==="edit")res = await editUniversity({data: form_data,id:addUni?.id, universityName:addUni?.name})
            
            
            if(res?.data?.data?.acknowledged){
                toast.success("Operation successful!!!")
                setAddUni({
                    isOpen: false,
                    id:"",
                    name:''
                })
                reset()
                setSelectedTests([])
                setSelectedQualifications([])
            }else{
                toast.error(res?.data?.message || "Failed! to operate")
            }
        }catch(err){
            toast.error("Something went wrong!")
        }
    }


    const handleTestSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selected = e.target.value
        if (selected && !selectedTests.includes(selected)) {
            setSelectedTests(prev => [...prev, selected])
            setValue(`englishProf.${selected}`, 0)
        }
        e.target.value = ""
    }


    const handleQualificationSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selected = e.target.value
        if (selected && !selectedQualifications.includes(selected)) {
            setSelectedQualifications(prev => [...prev, selected])
            setValue(`qualifications.${selected}`, "")
        }
        e.target.value = ""
    }

    return (
        <div className={addUni?.isOPen ? 'modal-container openmoda-container' : 'modal-container'}>
            <div className='modal-body'>
                {addUni?.action==='add'?<h4 className="modal-header">{addUni?.action} university to {addUni?.name}</h4>
                :<h4 className="modal-header">{addUni?.action} {addUni?.name}</h4>}

                <button
                    onClick={() =>{setSelectedTests([]);setSelectedQualifications([]);setAddUni((prev:any) => ({ ...prev, id: '', name: '', isOPen: false, action: "" }))}}
                    className="cancel-btn"> X 
                </button>

                <form onSubmit={handleSubmit(onSubmit)} className='modal-from'>
                    <div className='input-container'>
                        <label>University name</label>
                        <input type='text' {...register("universityName")} />
                    </div>

                    <div className='input-container'>
                        <label>use the highest or lowest if it is very relevant to the subject.</label>
                        <label>Tuition fee (lowest)- optional</label>
                        <input type='number' min={0} {...register("lowFee", { valueAsNumber: true })} />
                        <label style={{ marginTop: "10px" }}>Tuition fee (highest)- optional</label>
                        <input type='number' min={0} {...register("highFee", { valueAsNumber: true })} />
                    </div>

                    <div className='input-container'>
                        <label>Scholarship(insert 0 if no scholarship)</label>
                        <input type='number' min={0} {...register("scholarship", { valueAsNumber: true })} />
                    </div>

                    <div className='input-container'>
                        <label>Initial Deposit</label>
                        <input type='number' min={0} {...register("initialDeposite", { valueAsNumber: true })} />
                    </div>

                    
                    <div className='input-container'>
                        {addUni.action==='edit' && <label>if you want to delete existing field insert -1</label>}
                        <label>English proficiency test required</label>
                        <select onChange={handleTestSelect}>
                            <option value="">-- Select a test --</option>
                            {testOptions.map(test => (
                                <option key={test} value={test}>{test}</option>
                            ))}
                        </select>

                        {selectedTests.map(test => (
                            <div key={test} style={{ marginTop: '10px' }}>
                                <label>{test} Score:</label>
                                <input
                                    type="number"
                                    step="any"
                                    min={-1}
                                    {...register(`englishProf.${test}`, { valueAsNumber: true })}
                                    placeholder={`Enter ${test} score`}
                                    style={{ padding: '4px', marginLeft: '10px' }}
                                />
                            </div>
                        ))}
                    </div>

                    
                    <div className='input-container'>
                        {addUni.action==='edit' && <label>if you want to delete existing field insert -1</label>}
                        <label>Required qualifications</label>
                        <select onChange={handleQualificationSelect}>
                            <option value="">-- Select qualification --</option>
                            {qualificationOptions.map(q => (
                                <option key={q?.value} value={q?.value}>{q?.label}</option>
                            ))}
                        </select>

                        {selectedQualifications.map(q => (
                            <div key={q} style={{ marginTop: '10px' }}>
                                <label>{q} Description:</label>
                                <input
                                    type="text"
                                    {...register(`qualifications.${q}`)}
                                    placeholder={`Enter description for ${q}`}
                                    style={{ padding: '4px', marginLeft: '10px' }}
                                />
                            </div>
                        ))}
                    </div>

                    <div className='input-container'>
                        <label>Add University image</label>
                        <input type='file' {...register("universityImage")} />
                    </div>

                    <div className='input-container'>
                        <label>add description about the university</label>
                        <textarea {...register("aboutUni")} />
                    </div>

                    <button type='submit' className='submit-button'>Submit</button>
                </form>
            </div>
        </div>
    )
}

export default AddUniModal
