'use client'
import { toast } from 'react-toastify'
import { useState, useEffect } from 'react'
import Loader from '@/component/shared/loader/loader'
import { useForm, SubmitHandler, Controller } from "react-hook-form"
import { useAddUniversityMutation, useEditUniversityMutation } from '@/redux/endpoints/university/universityEndpoints'

type ModalProps = {
    addUni: {
        action: string,
        id: string,
        isOPen: boolean,
        name: string,
        data?: any // For edit mode - pre-fill data
    },
    setAddUni: React.Dispatch<React.SetStateAction<any>>
}

type UniData = {
    // Basic Info
    universityImage: FileList | null,
    universityName: string,
    aboutUni: string,
    
    // Location & Contact
    city?: string,
    state?: string,
    address?: string,
    website?: string,
    admissionEmail?: string,
    phone?: string,
    
    // Financial
    lowFee: number,
    highFee: number,
    currency?: string,
    feeStructure?: string,
    applicationFee?: number,
    scholarship: string,
    initialDeposite: number,
    
    // Admission Requirements
    minimumGPA?: number,
    gpaScale?: string,
    requiredEducationLevel?: string,
    prerequisiteSubjects?: string, // JSON string
    preferredBackgrounds?: string, // JSON string
    
    // English Proficiency
    englishProf: Record<string, any>,
    
    // Qualifications
    qualifications: Record<string, string>,
    
    // Rankings
    worldRanking?: number,
    nationalRanking?: number,
    accreditation?: string, // JSON string
    
    // Intakes
    intakes?: string, // JSON string
    
    // Application Process
    submissionMethod?: string,
    portalUrl?: string,
    apiEndpoint?: string,
    hasAPIIntegration?: boolean,
    processingTime?: string,
    
    // Student Profile
    acceptanceRate?: number,
    internationalStudentRatio?: number,
    
    
    campusHousing?: boolean,
    internshipOpportunities?: boolean,
    workPermitAvailable?: boolean,
    postStudyWorkVisa?: boolean,
    partTimeWorkAllowed?: boolean,
    
    tags?: string,
    
    status?: string,
}


const testOptions = [
    { value: "IELTS", label: "IELTS", sections: ["overall", "reading", "writing", "listening", "speaking"] },
    { value: "TOEFL", label: "TOEFL", sections: ["overall", "reading", "writing", "listening", "speaking"] },
    { value: "PTE", label: "PTE", sections: ["overall"] },
    { value: "DUOLINGO", label: "Duolingo", sections: ["overall"] },
    { value: "GRE", label: "GRE", sections: ["overall", "verbal", "quantitative", "writing"] },
    { value: "GMAT", label: "GMAT", sections: ["overall", "verbal", "quantitative", "writing", "integrated"] },
    { value: "SAT", label: "SAT", sections: ["overall", "math", "reading"] },
    { value: "ACT", label: "ACT", sections: ["overall", "english", "math", "reading", "science"] },
]

const qualificationOptions = [
    { value: "certificate", label: "Certificate" },
    { value: "diploma", label: "Diploma" },
    { value: "bachelors", label: "Bachelor's" },
    { value: "masters", label: "Master's" },
    { value: "phd", label: "PhD/Doctorate" },
    { value: "postdoc", label: "Postdoctoral" },
]

const gpaScaleOptions = ["4.0", "5.0", "10.0", "100"]
const educationLevelOptions = ["high_school", "bachelors", "masters", "any"]
const submissionMethodOptions = ["manual", "api", "email", "courier"]
const currencyOptions = ["USD", "CAD", "GBP", "EUR", "AUD", "INR"]
const feeStructureOptions = ["per_year", "per_semester", "total_program"]

const AddUniModal = ({ addUni, setAddUni }: ModalProps) => {
    const [addUniversity, { isLoading: createLoading }] = useAddUniversityMutation()
    const [editUniversity, { isLoading: editLoading }] = useEditUniversityMutation()
    const [activeTab, setActiveTab] = useState<'basic' | 'requirements' | 'process' | 'features'>('basic')

    const { register, handleSubmit, reset, setValue, watch, control } = useForm<UniData>({
        defaultValues: {
            englishProf: {},
            qualifications: {},
            gpaScale: "",
            currency: "",
            feeStructure: "",
            requiredEducationLevel: "",
            submissionMethod: "",
            status: ""
        }
    })

    const [selectedTests, setSelectedTests] = useState<string[]>([])
    const [selectedQualifications, setSelectedQualifications] = useState<string[]>([])
    const [intakesList, setIntakesList] = useState<Array<{ name: string, startMonth: string, deadline: string, isOpen: boolean }>>([])
    const [tagsList, setTagsList] = useState<string[]>([])
    const [prerequisitesList, setPrerequisitesList] = useState<string[]>([])
    const [backgroundsList, setBackgroundsList] = useState<string[]>([])
    const [accreditationList, setAccreditationList] = useState<string[]>([])

    const watchSubmissionMethod = watch('submissionMethod')
    const watchHasAPI = watch('hasAPIIntegration')

    useEffect(() => {
        if (addUni.action === 'edit' && addUni.data) {
            const data = addUni.data
            
            
            setValue('universityName', data.universityName)
            setValue('aboutUni', data.aboutUni)
            setValue('city', data.location?.city)
            setValue('state', data.location?.state)
            setValue('website', data.contact?.website)
            setValue('admissionEmail', data.contact?.admissionEmail)
            
            
            setValue('lowFee', data.tuitionFees?.lowFee || data.lowFee)
            setValue('highFee', data.tuitionFees?.highFee || data.highFee)
            setValue('currency', data.tuitionFees?.currency || data.currency)
            setValue('scholarship', data.scholarship?.amount || data.scholarship)
            setValue('initialDeposite', data.initialDeposite)
            
            
            setValue('minimumGPA', data.admissionRequirements?.minimumGPA?.value)
            setValue('gpaScale', data.admissionRequirements?.minimumGPA?.scale)
            
            
            if (data.tags) setTagsList(Array.isArray(data.tags) ? data.tags : [])
            if (data.intakes) setIntakesList(Array.isArray(data.intakes) ? data.intakes : [])
        }
    }, [addUni, setValue])

    if (createLoading || editLoading) return <Loader />

    const onSubmit: SubmitHandler<UniData> = async (data) => {
        try {
            console.log(data)
            const formData = new FormData()
            Object.entries(data).forEach(([key, value]:any) => {
                if (value instanceof FileList) {
                    for (let i = 0; i < value.length; i++) {
                        formData.append(key, value[i])
                    }
                } else if (key === 'englishProf' && typeof value === 'object') {
                    formData.append('englishProf', JSON.stringify(value))
                } else if (key === 'qualifications' && typeof value === 'object') {
                    formData.append('qualifications', JSON.stringify(Object.keys(value).filter(k => value[k])))
                } else if (typeof value === 'object' && value !== null) {
                    Object.entries(value).forEach(([subKey, subValue]) => {
                        if (subValue !== undefined && subValue !== null && subValue !== "" && !Number.isNaN(subValue)) {
                            formData.append(`${key}[${subKey}]`, String(subValue))
                        }
                    })
                } else if (value !== undefined && value !== null && value !== "" && !Number.isNaN(value)) {
                    formData.append(key, String(value))
                }
            })

            if (intakesList.length > 0) formData.append('intakes', JSON.stringify(intakesList))
            if (tagsList.length > 0) formData.append('tags', JSON.stringify(tagsList))
            if (prerequisitesList.length > 0) formData.append('prerequisiteSubjects', JSON.stringify(prerequisitesList))
            if (backgroundsList.length > 0) formData.append('preferredBackgrounds', JSON.stringify(backgroundsList))
            if (accreditationList.length > 0) formData.append('accreditation', JSON.stringify(accreditationList))

            let res:any
            if (addUni?.action === "add") {
                res = await addUniversity({ data: formData, id: addUni?.id }).unwrap()
            }
            if (addUni?.action === "edit") {
                res = await editUniversity({ data: formData, id: addUni?.id, universityName: addUni?.name }).unwrap()
            }
            console.log(res)
            if (res?.data?.modifiedCount) {
                toast.success(res?.data?.message || "Operation successful!")
                handleClose()
            } else {
                toast.error(res?.error.data || "Operation failed!")
            }
        } catch (err) {
            console.error(err)
            toast.error("Something went wrong!")
        }
    }

    const handleClose = () => {
        setAddUni({ isOpen: false, id: "", name: '', action: "" })
        reset()
        setSelectedTests([])
        setSelectedQualifications([])
        setIntakesList([])
        setTagsList([])
        setPrerequisitesList([])
        setBackgroundsList([])
        setAccreditationList([])
        setActiveTab('basic')
    }

    const handleTestSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selected = e.target.value
        if (selected && !selectedTests.includes(selected)) {
            setSelectedTests(prev => [...prev, selected])
            setValue(`englishProf.${selected}`, { overall: 0 })
        }
        e.target.value = ""
    }

    const handleQualificationSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selected = e.target.value
        if (selected && !selectedQualifications.includes(selected)) {
            setSelectedQualifications(prev => [...prev, selected])
            setValue(`qualifications.${selected}`, "available")
        }
        e.target.value = ""
    }

    const addIntake = () => {
        setIntakesList(prev => [...prev, {
            name: '',
            startMonth: '',
            deadline: '',
            isOpen: true
        }])
    }

    const updateIntake = (index: number, field: string, value: any) => {
        setIntakesList(prev => {
            const updated = [...prev]
            updated[index] = { ...updated[index], [field]: value }
            return updated
        })
    }

    const removeIntake = (index: number) => {
        setIntakesList(prev => prev.filter((_, i) => i !== index))
    }

    const addTag = (tag: string) => {
        if (tag && !tagsList.includes(tag)) {
            setTagsList(prev => [...prev, tag])
        }
    }

    const removeTag = (tag: string) => {
        setTagsList(prev => prev.filter(t => t !== tag))
    }

    const addItem = (item: string, list: string[], setter: React.Dispatch<React.SetStateAction<string[]>>) => {
        if (item && !list.includes(item)) {
            setter(prev => [...prev, item])
        }
    }

    const removeItem = (item: string, list: string[], setter: React.Dispatch<React.SetStateAction<string[]>>) => {
        setter(prev => prev.filter(i => i !== item))
    }
    

    return (
        <div className={addUni?.isOPen ? 'modal-container openmoda-container' : 'modal-container'}>
            <div className='modal-body'>
                <h4 className="modal-header">
                    {addUni?.action === 'add' 
                        ? `Add University to ${addUni?.name}` 
                        : `Edit ${addUni?.name}`}
                </h4>

                <button onClick={handleClose} className="cancel-btn">✕</button>

                <div style={{ display: 'flex', gap: '10px', margin: '20px 0',borderRadius:'10px', borderBottom: '2px solid #e5e7eb' }}>
                    {['basic', 'requirements', 'process', 'features'].map((tab) => (
                        <button
                            key={tab}
                            type="button"
                            onClick={() => setActiveTab(tab as any)}
                            style={{
                                padding: '10px 20px',
                                background: activeTab === tab ? '#667eea' : 'transparent',
                                color: activeTab === tab ? 'white' : '#666',
                                border: 'none',
                                borderBottom: activeTab === tab ? '2px solid #667eea' : 'none',
                                cursor: 'pointer',
                                fontWeight: activeTab === tab ? 'bold' : 'normal',
                                textTransform: 'capitalize'
                            }}
                        >
                            {tab}
                        </button>
                    ))}
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className='modal-from'>
                    
                    {activeTab === 'basic' && (
                        <div style={{ display: 'grid', gap: '15px' }}>
                            <h5 style={{ fontWeight: 'bold', marginBottom: '10px' }}>Basic Information</h5>
                            
                            <div className='input-container'>
                                <label>University Name *</label>
                                <input type='text' {...register("universityName",{ required:addUni.action==='add'? true:false })} placeholder="Harvard University" />
                            </div>

                            <div className='double-input-container'>
                                <div className='input-container'>
                                    <label>City</label>
                                    <input type='text' {...register("city")} placeholder="Cambridge" />
                                </div>
                                <div className='input-container'>
                                    <label>State/Province</label>
                                    <input type='text' {...register("state")} placeholder="Massachusetts" />
                                </div>
                            </div>

                            <div className='input-container'>
                                <label>Address</label>
                                <input type='text' {...register("address")} placeholder="Full address" />
                            </div>

                            <div className='double-input-container'>
                                <div className='input-container'>
                                    <label>Website</label>
                                    <input type='url' {...register("website")} placeholder="https://university.edu" />
                                </div>
                                <div className='input-container'>
                                    <label>Admission Email</label>
                                    <input type='email' {...register("admissionEmail")} placeholder="admissions@university.edu" />
                                </div>
                            </div>

                            <div className='input-container'>
                                <label>Phone</label>
                                <input type='tel' {...register("phone")} placeholder="+1 234 567 8900" />
                            </div>

                            <h5 style={{ fontWeight: 'bold', marginTop: '20px', marginBottom: '10px' }}>Financial Information</h5>

                            <div className='double-input-container'>
                                <div className='input-container'>
                                    <label>Currency *</label>
                                    <select {...register("currency")}>
                                        {currencyOptions.map(c => <option key={c} value={c}>{c}</option>)}
                                    </select>
                                </div>
                                <div className='input-container'>
                                    <label>Fee Structure</label>
                                    <select {...register("feeStructure")}>
                                        {feeStructureOptions.map(f => (
                                            <option key={f} value={f}>
                                                {f.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div className='input-container'>
                                    <label>Application Fee</label>
                                    <input type='number' min={0} {...register("applicationFee", { valueAsNumber: true })} placeholder="0" />
                                </div>
                            </div>

                            <div className='double-input-container'>
                                <div className='input-container'>
                                    <label>Tuition Fee (Minimum)</label>
                                    <input type='number' min={0} {...register("lowFee", { valueAsNumber: true })} placeholder="40000" />
                                </div>
                                <div className='input-container'>
                                    <label>Tuition Fee (Maximum)</label>
                                    <input type='number' min={0} {...register("highFee", { valueAsNumber: true })} placeholder="50000" />
                                </div>
                            </div>

                            <div className='double-input-container'>
                                <div className='input-container'>
                                    <label>Scholarship Info</label>
                                    <input type='text' {...register("scholarship")} placeholder="Up to 50% tuition or '-' if none" />
                                </div>
                                <div className='input-container'>
                                    <label>Initial Deposit *</label>
                                    <input type='number' min={0} {...register("initialDeposite", { valueAsNumber: true,  required:addUni.action==='add'? true:false })} placeholder="5000" />
                                </div>
                            </div>

                            <h5 style={{ fontWeight: 'bold', marginTop: '20px', marginBottom: '10px' }}>Rankings & Accreditation</h5>

                            <div className='double-input-container'>
                                <div className='input-container'>
                                    <label>World Ranking (QS/Times)</label>
                                    <input type='number' min={1} {...register("worldRanking", { valueAsNumber: true })} placeholder="50" />
                                </div>
                                <div className='input-container'>
                                    <label>National Ranking</label>
                                    <input type='number' min={1} {...register("nationalRanking", { valueAsNumber: true })} placeholder="10" />
                                </div>
                            </div>

                            <div className='input-container'>
                                <label>Accreditations</label>
                                <div style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
                                    <input
                                        type='text'
                                        placeholder="e.g., ABET, AACSB"
                                        onKeyDown={(e) => {
                                            if (e.key === 'Enter') {
                                                e.preventDefault()
                                                const value = e.currentTarget.value.trim()
                                                if (value) {
                                                    addItem(value, accreditationList, setAccreditationList)
                                                    e.currentTarget.value = ''
                                                }
                                            }
                                        }}
                                    />
                                    <button
                                        type="button"
                                        onClick={(e) => {
                                            const input = e.currentTarget.previousElementSibling as HTMLInputElement
                                            const value = input.value.trim()
                                            if (value) {
                                                addItem(value, accreditationList, setAccreditationList)
                                                input.value = ''
                                            }
                                        }}
                                        style={{ padding: '5px 15px', background: '#667eea', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
                                    >
                                        Add
                                    </button>
                                </div>
                                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                                    {accreditationList.map((acc, i) => (
                                        <span key={i} style={{ padding: '5px 10px', background: '#e0e7ff', borderRadius: '15px', fontSize: '14px', display: 'flex', alignItems: 'center', gap: '5px' }}>
                                            {acc}
                                            <button type="button" onClick={() => removeItem(acc, accreditationList, setAccreditationList)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#667eea', fontWeight: 'bold' }}>×</button>
                                        </span>
                                    ))}
                                </div>
                            </div>

                            <div className='input-container'>
                                <label>About University *</label>
                                <textarea {...register("aboutUni", { required:addUni.action==='add'? true:false })} rows={4} placeholder="Brief description about the university..." />
                            </div>

                            <div className='input-container'>
                                <label>University Image *</label>
                                <input type='file' accept="image/*" {...register("universityImage")} />
                            </div>
                        </div>
                    )}

                    {/* REQUIREMENTS TAB */}
                    {activeTab === 'requirements' && (
                        <div style={{ display: 'grid', gap: '15px' }}>
                            <h5 style={{ fontWeight: 'bold', marginBottom: '10px' }}>Admission Requirements</h5>

                            <div className='double-input-container'>
                                <div className='input-container'>
                                    <label>Minimum GPA</label>
                                    <input type='number' step="0.01" min={0} max={10} {...register("minimumGPA", { valueAsNumber: true })} placeholder="3.0" />
                                </div>
                                <div className='input-container'>
                                    <label>GPA Scale</label>
                                    <select {...register("gpaScale")}>
                                        {gpaScaleOptions.map(s => <option key={s} value={s}>{s}</option>)}
                                    </select>
                                </div>
                            </div>

                            <div className='input-container'>
                                <label>Required Education Level</label>
                                <select {...register("requiredEducationLevel")}>
                                    {educationLevelOptions.map(e => (
                                        <option key={e} value={e}>
                                            {e.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className='input-container'>
                                <label>Prerequisite Subjects</label>
                                <div style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
                                    <input
                                        type='text'
                                        placeholder="e.g., Mathematics, Physics"
                                        onKeyDown={(e) => {
                                            if (e.key === 'Enter') {
                                                e.preventDefault()
                                                const value = e.currentTarget.value.trim()
                                                if (value) {
                                                    addItem(value, prerequisitesList, setPrerequisitesList)
                                                    e.currentTarget.value = ''
                                                }
                                            }
                                        }}
                                    />
                                    <button
                                        type="button"
                                        onClick={(e) => {
                                            const input = e.currentTarget.previousElementSibling as HTMLInputElement
                                            const value = input.value.trim()
                                            if (value) {
                                                addItem(value, prerequisitesList, setPrerequisitesList)
                                                input.value = ''
                                            }
                                        }}
                                        style={{ padding: '5px 15px', background: '#667eea', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
                                    >
                                        Add
                                    </button>
                                </div>
                                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                                    {prerequisitesList.map((pre, i) => (
                                        <span key={i} style={{ padding: '5px 10px', background: '#e0e7ff', borderRadius: '15px', fontSize: '14px', display: 'flex', alignItems: 'center', gap: '5px' }}>
                                            {pre}
                                            <button type="button" onClick={() => removeItem(pre, prerequisitesList, setPrerequisitesList)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#667eea', fontWeight: 'bold' }}>×</button>
                                        </span>
                                    ))}
                                </div>
                            </div>

                            <div className='input-container'>
                                <label>Preferred Academic Backgrounds</label>
                                <div style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
                                    <input
                                        type='text'
                                        placeholder="e.g., Engineering, Computer Science"
                                        onKeyDown={(e) => {
                                            if (e.key === 'Enter') {
                                                e.preventDefault()
                                                const value = e.currentTarget.value.trim()
                                                if (value) {
                                                    addItem(value, backgroundsList, setBackgroundsList)
                                                    e.currentTarget.value = ''
                                                }
                                            }
                                        }}
                                    />
                                    <button
                                        type="button"
                                        onClick={(e) => {
                                            const input = e.currentTarget.previousElementSibling as HTMLInputElement
                                            const value = input.value.trim()
                                            if (value) {
                                                addItem(value, backgroundsList, setBackgroundsList)
                                                input.value = ''
                                            }
                                        }}
                                        style={{ padding: '5px 15px', background: '#667eea', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
                                    >
                                        Add
                                    </button>
                                </div>
                                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                                    {backgroundsList.map((bg, i) => (
                                        <span key={i} style={{ padding: '5px 10px', background: '#e0e7ff', borderRadius: '15px', fontSize: '14px', display: 'flex', alignItems: 'center', gap: '5px' }}>
                                            {bg}
                                            <button type="button" onClick={() => removeItem(bg, backgroundsList, setBackgroundsList)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#667eea', fontWeight: 'bold' }}>×</button>
                                        </span>
                                    ))}
                                </div>
                            </div>

                            <h5 style={{ fontWeight: 'bold', marginTop: '20px', marginBottom: '10px' }}>English Proficiency Tests</h5>
                            
                            <div className='input-container'>
                                <label>Add Test Requirement</label>
                                <select onChange={handleTestSelect}>
                                    <option value="">-- Select a test --</option>
                                    {testOptions.map(test => (
                                        <option key={test.value} value={test.value}>{test.label}</option>
                                    ))}
                                </select>

                                {selectedTests.map(testName => {
                                    const test = testOptions.find(t => t.value === testName)
                                    return (
                                        <div key={testName} style={{ marginTop: '15px', padding: '15px', background: '#f9fafb', borderRadius: '8px', border: '1px solid #e5e7eb' }}>
                                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                                                <strong>{test?.label} Requirements</strong>
                                                <button
                                                    type="button"
                                                    onClick={() => {
                                                        setSelectedTests(prev => prev.filter(t => t !== testName))
                                                        setValue(`englishProf.${testName}`, undefined as any)
                                                    }}
                                                    style={{ background: '#ef4444', color: 'white', border: 'none', padding: '5px 10px', borderRadius: '4px', cursor: 'pointer' }}
                                                >
                                                    Remove
                                                </button>
                                            </div>
                                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '10px' }}>
                                                {test?.sections.map(section => (
                                                    <div key={section}>
                                                        <label style={{ fontSize: '13px', textTransform: 'capitalize' }}>{section}:</label>
                                                        <input
                                                            type="number"
                                                            step="0.5"
                                                            min={0}
                                                            {...register(`englishProf.${testName}.${section}`, { valueAsNumber: true })}
                                                            placeholder="0"
                                                            style={{ width: '100%', padding: '5px', marginTop: '3px', borderRadius: '4px', border: '1px solid #d1d5db' }}
                                                        />
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>

                            <h5 style={{ fontWeight: 'bold', marginTop: '20px', marginBottom: '10px' }}>Program Qualifications Offered</h5>

                            <div className='input-container'>
                                <label>Add Qualification Level</label>
                                <select onChange={handleQualificationSelect}>
                                    <option value="">-- Select qualification --</option>
                                    {qualificationOptions.map(q => (
                                        <option key={q.value} value={q.value}>{q.label}</option>
                                    ))}
                                </select>

                                <div style={{ marginTop: '10px', display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                                    {selectedQualifications.map(q => (
                                        <span key={q} style={{ padding: '8px 15px', background: '#667eea', color: 'white', borderRadius: '20px', fontSize: '14px', display: 'flex', alignItems: 'center', gap: '5px' }}>
                                            {qualificationOptions.find(opt => opt.value === q)?.label}
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    setSelectedQualifications(prev => prev.filter(qual => qual !== q))
                                                    setValue(`qualifications.${q}`, undefined as any)
                                                }}
                                                style={{ background: 'rgba(255,255,255,0.3)', border: 'none', borderRadius: '50%', width: '20px', height: '20px', cursor: 'pointer', color: 'white', fontWeight: 'bold' }}
                                            >
                                                ×
                                            </button>
                                        </span>
                                    ))}
                                </div>
                            </div>

                            <h5 style={{ fontWeight: 'bold', marginTop: '20px', marginBottom: '10px' }}>Intakes & Deadlines</h5>

                            <div className='input-container'>
                                <button
                                    type="button"
                                    onClick={addIntake}
                                    style={{ padding: '10px 20px', background: '#10b981', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', marginBottom: '15px' }}
                                >
                                    + Add Intake Period
                                </button>

                                {intakesList.map((intake, index) => (
                                    <div key={index} style={{ padding: '15px', background: '#f9fafb', borderRadius: '8px', border: '1px solid #e5e7eb', marginBottom: '10px' }}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                                            <strong>Intake #{index + 1}</strong>
                                            <button
                                                type="button"
                                                onClick={() => removeIntake(index)}
                                                style={{ background: '#ef4444', color: 'white', border: 'none', padding: '5px 10px', borderRadius: '4px', cursor: 'pointer' }}
                                            >
                                                Remove
                                            </button>
                                        </div>
                                        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 2fr 1fr', gap: '10px' }}>
                                            <div>
                                                <label style={{ fontSize: '13px' }}>Name</label>
                                                <input
                                                    type="text"
                                                    value={intake.name}
                                                    onChange={(e) => updateIntake(index, 'name', e.target.value)}
                                                    placeholder="Fall 2025"
                                                    style={{ width: '100%', padding: '5px', marginTop: '3px' }}
                                                />
                                            </div>
                                            <div>
                                                <label style={{ fontSize: '13px' }}>Month</label>
                                                <input
                                                    type="text"
                                                    value={intake.startMonth}
                                                    onChange={(e) => updateIntake(index, 'startMonth', e.target.value)}
                                                    placeholder="September"
                                                    style={{ width: '100%', padding: '5px', marginTop: '3px' }}
                                                />
                                            </div>
                                            <div>
                                                <label style={{ fontSize: '13px' }}>Deadline</label>
                                                <input
                                                    type="date"
                                                    value={intake.deadline}
                                                    onChange={(e) => updateIntake(index, 'deadline', e.target.value)}
                                                    style={{ width: '100%', padding: '5px', marginTop: '3px' }}
                                                />
                                            </div>
                                            <div style={{ display: 'flex', alignItems: 'flex-end' }}>
                                                <label style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '13px' }}>
                                                    <input
                                                        type="checkbox"
                                                        checked={intake.isOpen}
                                                        onChange={(e) => updateIntake(index, 'isOpen', e.target.checked)}
                                                    />
                                                    Open
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* PROCESS TAB */}
                    {activeTab === 'process' && (
                        <div style={{ display: 'grid', gap: '15px' }}>
                            <h5 style={{ fontWeight: 'bold', marginBottom: '10px' }}>Application Process</h5>

                            <div className='input-container'>
                                <label>Submission Method</label>
                                <select {...register("submissionMethod")}>
                                    {submissionMethodOptions.map(m => (
                                        <option key={m} value={m}>
                                            {m.charAt(0).toUpperCase() + m.slice(1)}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            {(watchSubmissionMethod === 'manual' || watchSubmissionMethod === 'api') && (
                                <div className='input-container'>
                                    <label>Portal URL</label>
                                    <input type='url' {...register("portalUrl")} placeholder="https://apply.university.edu" />
                                </div>
                            )}

                            {watchSubmissionMethod === 'api' && (
                                <>
                                    <div className='input-container'>
                                        <label style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                            <input type='checkbox' {...register("hasAPIIntegration")} />
                                            Has API Integration
                                        </label>
                                    </div>

                                    {watchHasAPI && (
                                        <div className='input-container'>
                                            <label>API Endpoint</label>
                                            <input type='url' {...register("apiEndpoint")} placeholder="https://api.university.edu/applications" />
                                        </div>
                                    )}
                                </>
                            )}

                            <div className='input-container'>
                                <label>Processing Time</label>
                                <input type='text' {...register("processingTime")} placeholder="4-6 weeks" />
                            </div>

                            <h5 style={{ fontWeight: 'bold', marginTop: '20px', marginBottom: '10px' }}>Student Demographics</h5>

                            <div className='double-input-container'>
                                <div className='input-container'>
                                    <label>Acceptance Rate (%)</label>
                                    <input type='number' min={0} max={100} step="0.1" {...register("acceptanceRate", { valueAsNumber: true })} placeholder="65" />
                                </div>
                                <div className='input-container'>
                                    <label>International Student Ratio (%)</label>
                                    <input type='number' min={0} max={100} step="0.1" {...register("internationalStudentRatio", { valueAsNumber: true })} placeholder="20" />
                                </div>
                            </div>

                            <div className='input-container'>
                                <label>Tags (for categorization)</label>
                                <div style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
                                    <input
                                        type='text'
                                        placeholder="e.g., research-focused, affordable"
                                        onKeyDown={(e) => {
                                            if (e.key === 'Enter') {
                                                e.preventDefault()
                                                const value = e.currentTarget.value.trim()
                                                if (value) {
                                                    addTag(value)
                                                    e.currentTarget.value = ''
                                                }
                                            }
                                        }}
                                    />
                                    <button
                                        type="button"
                                        onClick={(e) => {
                                            const input = e.currentTarget.previousElementSibling as HTMLInputElement
                                            const value = input.value.trim()
                                            if (value) {
                                                addTag(value)
                                                input.value = ''
                                            }
                                        }}
                                        style={{ padding: '5px 15px', background: '#667eea', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
                                    >
                                        Add Tag
                                    </button>
                                </div>
                                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                                    {tagsList.map((tag, i) => (
                                        <span key={i} style={{ padding: '5px 10px', background: '#e0e7ff', borderRadius: '15px', fontSize: '14px', display: 'flex', alignItems: 'center', gap: '5px' }}>
                                            #{tag}
                                            <button type="button" onClick={() => removeTag(tag)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#667eea', fontWeight: 'bold' }}>×</button>
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}

                    {/* FEATURES TAB */}
                    {activeTab === 'features' && (
                        <div style={{ display: 'grid', gap: '15px' }}>
                            <h5 style={{ fontWeight: 'bold', marginBottom: '10px' }}>University Features & Facilities</h5>

                            <div className='double-input-container'>
                                <label style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '10px', background: '#f9fafb', borderRadius: '8px', cursor: 'pointer' }}>
                                    <input type='checkbox' {...register("campusHousing")} />
                                    <span>Campus Housing Available</span>
                                </label>

                                <label style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '10px', background: '#f9fafb', borderRadius: '8px', cursor: 'pointer' }}>
                                    <input type='checkbox' {...register("internshipOpportunities")} />
                                    <span>Internship Opportunities</span>
                                </label>

                                <label style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '10px', background: '#f9fafb', borderRadius: '8px', cursor: 'pointer' }}>
                                    <input type='checkbox' {...register("workPermitAvailable")} />
                                    <span>Work Permit Available</span>
                                </label>

                                <label style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '10px', background: '#f9fafb', borderRadius: '8px', cursor: 'pointer' }}>
                                    <input type='checkbox' {...register("postStudyWorkVisa")} />
                                    <span>Post-Study Work Visa</span>
                                </label>

                                <label style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '10px', background: '#f9fafb', borderRadius: '8px', cursor: 'pointer' }}>
                                    <input type='checkbox' {...register("partTimeWorkAllowed")} />
                                    <span>Part-Time Work Allowed</span>
                                </label>
                            </div>

                            <div className='input-container' style={{ marginTop: '20px' }}>
                                <label>Status</label>
                                <select {...register("status")}>
                                    <option value="active">Active</option>
                                    <option value="inactive">Inactive</option>
                                    <option value="coming_soon">Coming Soon</option>
                                </select>
                            </div>
                        </div>
                    )}

                    {/* Submit Button */}
                    <div style={{ marginTop: '30px', paddingTop: '20px', borderTop: '2px solid #e5e7eb', display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
                        <button
                            type='button'
                            onClick={handleClose}
                            style={{ padding: '12px 30px', background: '#e5e7eb', color: '#374151', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: '600' }}
                        >
                            Cancel
                        </button>
                        <button
                            type='submit'
                            className='submit-button'
                            style={{ padding: '12px 30px', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: '600' }}
                        >
                            {addUni?.action === 'add' ? 'Add University' : 'Update University'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default AddUniModal