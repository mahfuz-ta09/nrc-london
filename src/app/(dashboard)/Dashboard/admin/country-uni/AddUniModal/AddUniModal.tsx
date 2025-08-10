import { useState } from 'react'
import './AddUniModal.css'
import { useForm, SubmitHandler } from "react-hook-form"
import { toast } from 'react-toastify'
import { useAddUniversityMutation } from '@/redux/endpoints/university/universityEndpoints'
import Loader from '@/component/shared/Loader/Loader'

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

const testOptions = ["IELTS", "OITC", "TOEFL", "DUOLINGO"]
const qualificationOptions = ["master", "bsc", "phd", "diploma","experience"]

const AddUniModal = ({ addUni, setAddUni }: ModalProps) => {
    const [addUniversity , { isLoading}] = useAddUniversityMutation()
    const { register, handleSubmit, reset, setValue } = useForm<UniData>({
        defaultValues: {
            englishProf: {},
            qualifications: {}
        }
    })

    const [selectedTests, setSelectedTests] = useState<string[]>([])
    const [selectedQualifications, setSelectedQualifications] = useState<string[]>([])


    if(isLoading){
        return <Loader />
    }

    const onSubmit: SubmitHandler<UniData> = async(data) => {
        try{
            let res
            var form_data = new FormData()
            
            Object.entries(data).forEach(([key, value]) => {
                if (value instanceof FileList) {
                    for (let i = 0; i < value.length; i++) {
                        form_data.append(key, value[i]);
                    }
                }else if (typeof value === "object" && value !== null) {
                    Object.entries(value).forEach(([subKey, subValue]) => {
                        if (subValue !== undefined && subValue !== null) {
                            form_data.append(`${key}[${subKey}]`, String(subValue));
                        }
                    });
                }else if (value !== undefined && value !== null) {
                    form_data.append(key, String(value));
                }
            });

            
            if(addUni?.action==="add")res = await addUniversity({data:form_data,id: addUni?.id})
            // if(addUni?.action==="edit" && addUni?.id)res = await editCountryList({data: form_data,id:addCounty?.id})
            
            
            if(res?.data?.data?.acknowledged){
                toast.success("Operation successful!!!")
                setAddUni({
                    isOpen: false,
                    id:"",
                    name:''
                })
                reset()
            }else{
                toast.error(res?.data?.message || "Failed!")
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
                <h1>{addUni?.action} university to {addUni?.name}</h1>

                <button
                    onClick={() => setAddUni((prev:any) => ({ ...prev, id: '', name: '', isOPen: false, action: "" }))}
                    className="cancel-btn"
                >
                    X
                </button>

                <form onSubmit={handleSubmit(onSubmit)} className='modal-from'>
                    <div className='input-container'>
                        <label>University name (short)</label>
                        <input type='text' {...register("universityName")} />
                    </div>

                    <div className='input-container'>
                        <label>Tuition fee (lowest)</label>
                        <input type='number' min={0} {...register("lowFee", { valueAsNumber: true })} />
                        <label style={{ marginTop: "10px" }}>Tuition fee (highest)</label>
                        <input type='number' min={0} {...register("highFee", { valueAsNumber: true })} />
                    </div>

                    <div className='input-container'>
                        <label>Scholarship</label>
                        <input type='number' min={0} {...register("scholarship", { valueAsNumber: true })} />
                    </div>

                    <div className='input-container'>
                        <label>Initial Deposit</label>
                        <input type='number' min={0} {...register("initialDeposite", { valueAsNumber: true })} />
                    </div>

                    
                    <div className='input-container'>
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
                                    {...register(`englishProf.${test}`, { valueAsNumber: true })}
                                    placeholder={`Enter ${test} score`}
                                    style={{ padding: '4px', marginLeft: '10px' }}
                                />
                            </div>
                        ))}
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

                    <button type='submit' className='modal-sbmt-btn'>Submit</button>
                </form>
            </div>
        </div>
    )
}

export default AddUniModal
