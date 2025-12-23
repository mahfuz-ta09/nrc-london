'use client'
import { useState } from "react"
import { toast } from "react-toastify"
import Loader from "@/component/shared/loader/loader"
import { useForm, SubmitHandler } from "react-hook-form"
import { useAddSubjectMutation } from "@/redux/endpoints/subject/subjectEndpoints"
import { DURATION_UNITS, PROGRAM_LEVELS, programOptions, qualificationOptions } from "../../Objects/programItem"

type ModalProps = {
    addSub: {
        action: string,
        countryId: string,
        universityId: string,
        isOPen: boolean,
        universityName: string
    },
    setAddSub: React.Dispatch<React.SetStateAction<any>>
}

type SubjectData = {
    subjectName: string,
    duration: {
        value: number,
        unit: string
    },
    qualifications: Record<string, string>,
    programType: string[],
    credits: number,
    modeOfStudy: string,
    language: string,
    description_careerOpportunities: string,
    cost: number,
    placement: string
}

const SubjectControllModal = ({ addSub, setAddSub }: ModalProps) => {
    const { register, handleSubmit, reset, setValue, watch } = useForm<SubjectData>({
        defaultValues: {
            qualifications: {},
            duration: {
                value: 0,
                unit: 'months'
            }
        }
    })
    const [addSubject, { isLoading: addLoading }] = useAddSubjectMutation()
    const [selectedProgramTypes, setSelectedProgramTypes] = useState<string[]>([])
    const [selectedQualifications, setSelectedQualifications] = useState<string[]>([])

    if (addLoading) {
        return <Loader />
    }

    const onSubmit: SubmitHandler<SubjectData> = async (data) => {
        try {
            const formData = new FormData()
            
            if(data?.subjectName)formData.append('subjectName', data.subjectName)
            if(data?.duration)formData.append('duration[value]', String(data.duration.value))
            if(data?.duration)formData.append('duration[unit]', data.duration.unit)
            if(selectedProgramTypes?.length>0){
                selectedProgramTypes.forEach((type,i) => {
                formData.append(`programType[${i}]`, type)
                })
            }
            if(data?.credits)formData.append('credits', String(data.credits))
            if(data?.modeOfStudy)formData.append('modeOfStudy', data.modeOfStudy)
            if(data?.language)formData.append('language', data.language)
            if(data?.description_careerOpportunities)formData.append('description_careerOpportunities', data.description_careerOpportunities)
            if(data?.cost)formData.append('cost', String(data.cost))
            if(data?.placement)formData.append('placement', data.placement)
            
            Object.entries(data.qualifications).forEach(([key, value]) => {
                if (value) {
                    formData.append(`qualifications[${key}]`, String(value))
                }
            })
            
            const res = await addSubject({
                data: formData,
                countryId: addSub.countryId,
                universityName: addSub?.universityName,
                universityId: addSub.universityId}).unwrap()


            if (res?.data?.modifiedCount) {
                toast.success("Subject added successfully!")
                setAddSub({
                    isOPen: false,
                    countryId: "",
                    universityId: "",
                    universityName: "",
                    action: ""
                })
                reset()
                setSelectedQualifications([])
            } else {
                toast.error(res?.data?.message || "Failed to add subject")
            }
        } catch (err) {
            toast.error("Something went wrong!")
        }
    }
    
    const handleQualificationSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selected = e.target.value
        if (selected && !selectedQualifications.includes(selected)) {
            setSelectedQualifications(prev => [...prev, selected])
            setValue(`qualifications.${selected}`, '')
        }
        e.target.value = ""
    }
    const handleProgramTypeSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const value = e.target.value
        if (value && !selectedProgramTypes.includes(value)) {
            setSelectedProgramTypes(prev => [...prev, value])
        }
        e.target.value = ""
    }
    return (
        <div className={addSub?.isOPen ? 'modal-container openmoda-container' : 'modal-container'}>
            <div className="modal-body">
                <h1 style={{ color: "black" }}>
                    {addSub?.action} subject to {addSub?.universityName}
                </h1>

                <button 
                    className="cancel-btn"
                    onClick={() => {
                        setSelectedQualifications([])
                        setAddSub((prev: any) => ({
                            ...prev,
                            countryId: "",
                            universityId: "",
                            universityName: "",
                            isOPen: false,
                            action: ""
                        }))
                    }}
                >
                    X
                </button>

                <form onSubmit={handleSubmit(onSubmit)} className="modal-from">

                    {/* <div className="double-input-container"> */}
                        <div className="input-container">
                            <label>Subject Name *</label>
                            <input 
                                type="text" 
                                placeholder="e.g. Computer Science, Law" 
                                {...register("subjectName", { required: true })} 
                            />
                        </div>

                    {/* </div> */}


                    <div className="double-input-container">
                        <div className="input-container">
                            <label>Duration Value *</label>
                            <input 
                                type="number" 
                                min={0} 
                                placeholder="e.g. 12, 36, 48" 
                                {...register("duration.value", { 
                                    required: true, 
                                    valueAsNumber: true 
                                })} 
                            />
                        </div>

                        <div className="input-container">
                            <label>Duration Unit *</label>
                            <select {...register("duration.unit", { required: true })}>
                                {DURATION_UNITS.map((unit, idx) => (
                                    <option key={idx} value={unit}>{unit}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div className="input-container">
                        <label>Program Type *</label>
                        <select onChange={handleProgramTypeSelect}>
                            <option value="">-- Select Program --</option>
                            {programOptions.map(group => (
                                <optgroup key={group.label} label={group.label}>
                                {group.options.map(option => (
                                    <option key={option.value} value={option.value}>
                                    {option.label}
                                    </option>
                                ))}
                                </optgroup>
                            ))}
                        </select>

                        <div style={{ marginTop: '10px', display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                            {selectedProgramTypes.map(type => (
                                    <span 
                                        style={{ 
                                            padding: '8px 15px', 
                                            background: '#667eea', 
                                            color: 'white', 
                                            borderRadius: '20px', 
                                            fontSize: '14px', 
                                            display: 'flex', 
                                            alignItems: 'center', 
                                            gap: '5px' ,
                                            width:'fit-content'
                                        }} 
                                        key={type}
                                    >
                                        {type}
                                        <button 
                                            type="button" 
                                            onClick={() => setSelectedProgramTypes(prev => prev.filter(t => t !== type))} 
                                            style={{ 
                                                background: 'none', 
                                                border: 'none', 
                                                cursor: 'pointer', 
                                                color: '#fff', 
                                                fontWeight: 'bold',
                                                fontSize: '18px',
                                                lineHeight: '1'
                                            }}
                                        >
                                            ×
                                        </button>
                                    </span>
                            ))}
                        </div>
                    </div>

                    <div className="double-input-container">
                        

                        <div className="input-container">
                            <label>Credits *</label>
                            <input 
                                type="number" 
                                min={0} 
                                placeholder="e.g. 90, 120, 180" 
                                {...register("credits", { 
                                    required: true, 
                                    valueAsNumber: true 
                                })} 
                            />
                        </div>
                    </div>

                    <div className="double-input-container">
                        <div className="input-container">
                            <label>Total Cost </label>
                            <input 
                                type="number" 
                                min={0} 
                                placeholder="Total program cost" 
                                {...register("cost", { 
                                    valueAsNumber: true 
                                })} 
                            />
                        </div>

                        <div className="input-container">
                            <label>Mode of Study *</label>
                            <select {...register("modeOfStudy", { required: true })}>
                                <option value="">-- Select Mode --</option>
                                <option value="Full-time">Full-time</option>
                                <option value="Part-time">Part-time</option>
                                <option value="Online">Online</option>
                                <option value="Hybrid">Hybrid</option>
                            </select>
                        </div>
                    </div>

                    <div className="input-container">
                        <label>Required Qualifications (Optional)</label>
                        <select onChange={handleQualificationSelect}>
                            <option value="">-- Select Qualification --</option>
                            {qualificationOptions
                                .filter(q => !selectedQualifications.includes(q.value))
                                .map((q) => (
                                    <option key={q.value} value={q.value}>
                                        {q.label}
                                    </option>
                                ))
                            }
                        </select>

                        {selectedQualifications.map((q) => (
                            <div key={q} style={{ marginTop: "10px", display: 'flex', gap: '10px', alignItems: 'center' }}>
                                <label style={{ minWidth: '200px' }}>Description for {q}:</label>
                                <input
                                    type="text"
                                    {...register(`qualifications.${q}`)}
                                    placeholder={`Enter description for ${q}`}
                                    style={{ flex: 1, padding: "8px" }}
                                />
                                <button
                                    type="button"
                                    onClick={() => {
                                        setSelectedQualifications(prev => prev.filter(item => item !== q))
                                        setValue(`qualifications.${q}`, '')
                                    }}
                                    style={{ 
                                        background: '#ef4444', 
                                        color: 'white', 
                                        border: 'none', 
                                        padding: '5px 10px', 
                                        borderRadius: '4px', 
                                        cursor: 'pointer' 
                                    }}
                                >
                                    ×
                                </button>
                            </div>
                        ))}
                    </div>

                    <div className="double-input-container">
                        <div className="input-container">
                            <label>Language of Instruction *</label>
                            <select {...register("language", { required: true })}>
                                <option value="">-- Select Language --</option>
                                <option value="English">English</option>
                                <option value="Spanish">Spanish</option>
                                <option value="French">French</option>
                                <option value="German">German</option>
                                <option value="Mandarin">Mandarin</option>
                                <option value="Arabic">Arabic</option>
                                <option value="Japanese">Japanese</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>

                        <div className="input-container">
                            <label>Placement Available *</label>
                            <select {...register("placement", { required: true })}>
                                <option value="">-- Select Option --</option>
                                <option value="yes">Yes</option>
                                <option value="no">No</option>
                            </select>
                        </div>
                    </div>

                    <div className="input-container">
                        <label>Description & Career Opportunities</label>
                        <textarea 
                            {...register("description_careerOpportunities")} 
                            placeholder="e.g. Detailed description of the course/program and you can add Software Engineer, Data Scientist, AI Researcher as opportunities" 
                            rows={3}
                        />
                    </div>

                    <button type="submit" className="submit-button">
                        Add Subject
                    </button>
                </form>
            </div>
        </div>
    )
}

export default SubjectControllModal