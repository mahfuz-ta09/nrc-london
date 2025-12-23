'use client'
import { toast } from 'react-toastify'
import { useState, useEffect } from 'react'
import { countryCurrencyMap } from '@/types/common'
import { FILE_CATEGORIES } from '../../StFile/type'
import Loader from '@/component/shared/loader/loader'
import { useForm, SubmitHandler, Controller } from "react-hook-form"
import { useAddUniversityMutation, useEditUniversityMutation } from '@/redux/endpoints/university/universityEndpoints'
import { educationLevelOptions, feeStructureOptions, gpaScaleOptions, INTAKE_NAMES, MONTHS, PROGRAM_LEVELS, programOptions, submissionMethodOptions, testOptions } from '../../Objects/programItem'

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
    uniType?:string,
    
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
    requiredFiles?: string,
    
    // English Proficiency
    englishProf: Record<string, any>,
    
    // Qualifications
    programOffered: Record<string, string>,
    programFields: Record<string, string>,
    
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

const AddUniModal = ({ addUni, setAddUni }: ModalProps) => {
    const [addUniversity, { isLoading: createLoading }] = useAddUniversityMutation()
    const [editUniversity, { isLoading: editLoading }] = useEditUniversityMutation()
    const [activeTab, setActiveTab] = useState<'basic' | 'requirements' | 'process' | 'features'>('basic')

    const { register, handleSubmit, reset, setValue, watch, control } = useForm<UniData>({
        defaultValues: {
            englishProf: {},
            programOffered: {},
            gpaScale: "",
            currency: "",
            feeStructure: "",
            uniType: "",
            requiredEducationLevel: "",
            submissionMethod: "",
            status: ""
        }
    })

    const [tagsList, setTagsList] = useState<string[]>([])
    const [selectedTests, setSelectedTests] = useState<string[]>([])
    const [selectedFiles, setSelectedFiles] = useState<string[]>([])
    const [selectedPrograms, setselectedPrograms] = useState<string[]>([])
    const [accreditationList, setAccreditationList] = useState<string[]>([])
    const [selectedProgramFields, setselectedProgramFields] = useState<string[]>([])
    const [intakesList, setIntakesList] = useState<Array<{ name: string, startMonth: string, deadline: string, isOpen: boolean }>>([])

    const watchSubmissionMethod = watch('submissionMethod')
    const watchHasAPI = watch('hasAPIIntegration')

    useEffect(() => {
        if (addUni.action === 'edit' && addUni.data) {
            const data = addUni.data
            
            setValue('universityName', data.universityName)
            setValue('aboutUni', data.aboutUni)
            setValue('city', data.location?.city)
            setValue('state', data.location?.state)
            setValue('address', data.location?.address)  
            setValue('website', data.contact?.website)
            setValue('admissionEmail', data.contact?.admissionEmail)
            setValue('phone', data.contact?.phone)  
            setValue('uniType', data.uniType)  
            
            setValue('lowFee', data.tuitionFees?.lowFee || data.lowFee)
            setValue('highFee', data.tuitionFees?.highFee || data.highFee)
            setValue('currency', data.tuitionFees?.currency || data.currency)
            setValue('feeStructure', data.tuitionFees?.feeStructure)  
            setValue('applicationFee', data.tuitionFees?.applicationFee)  
            setValue('scholarship', data.scholarship?.amount || data.scholarship)
            setValue('initialDeposite', data.initialDeposite)
            
            setValue('minimumGPA', data.admissionRequirements?.minimumGPA?.value)
            setValue('gpaScale', data.admissionRequirements?.minimumGPA?.scale)
            setValue('requiredEducationLevel', data.admissionRequirements?.requiredEducationLevel)  
            
            if (data.admissionRequirements?.requiredFiles) {
                setSelectedFiles(Array.isArray(data.admissionRequirements.requiredFiles) 
                    ? data.admissionRequirements.requiredFiles 
                    : [])
            }
            
            if (data.englishProf) {
                const tests = Object.keys(data.englishProf)
                setSelectedTests(tests)
                tests.forEach(test => {
                    setValue(`englishProf.${test}`, data.englishProf[test])
                })
            }
            
            if (data.qualifications && Array.isArray(data.qualifications)) {
                setselectedPrograms(data.qualifications)
                data.qualifications.forEach((qual: string) => {
                    setValue(`programOffered.${qual}`, 'available')
                })
            }
            
            
            setValue('worldRanking', data.rankings?.worldRanking)
            setValue('nationalRanking', data.rankings?.nationalRanking)
            
            
            if (data.accreditation) {
                setAccreditationList(Array.isArray(data.accreditation) ? data.accreditation : [])
            }
            
            
            setValue('submissionMethod', data.applicationProcess?.submissionMethod)
            setValue('portalUrl', data.applicationProcess?.portalUrl)
            setValue('apiEndpoint', data.applicationProcess?.apiEndpoint)
            setValue('hasAPIIntegration', data.applicationProcess?.hasAPIIntegration)
            setValue('processingTime', data.applicationProcess?.processingTime)
            
            
            setValue('acceptanceRate', data.studentProfile?.acceptanceRate)
            setValue('internationalStudentRatio', data.studentProfile?.internationalStudentRatio)
            
            
            setValue('campusHousing', data.features?.campusHousing)
            setValue('internshipOpportunities', data.features?.internshipOpportunities)
            setValue('workPermitAvailable', data.features?.workPermitAvailable)
            setValue('postStudyWorkVisa', data.features?.postStudyWorkVisa)
            setValue('partTimeWorkAllowed', data.features?.partTimeWorkAllowed)
            
            
            setValue('status', data.status)
            
            
            if (data.tags) setTagsList(Array.isArray(data.tags) ? data.tags : [])
            if (data.intakes) setIntakesList(Array.isArray(data.intakes) ? data.intakes : [])
        }
    }, [addUni, setValue])

    if (createLoading || editLoading) return <Loader />

    const onSubmit: SubmitHandler<UniData> = async (data) => {
        try {
            const formData = new FormData()
            Object.entries(data).forEach(([key, value]:any) => {
                if (value instanceof FileList) {
                    for (let i = 0; i < value.length; i++) {
                        formData.append(key, value[i])
                    }
                } else if (key === 'englishProf' && typeof value === 'object') {
                    console.log(Object.keys(value).length)
                    if(Object.keys(value).length>0)formData.append('englishProf', JSON.stringify(value))
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
            if (accreditationList.length > 0) formData.append('accreditation', JSON.stringify(accreditationList))
            if (selectedFiles.length > 0) formData.append('requiredFiles', JSON.stringify(selectedFiles))
            let res:any
            if (addUni?.action === "add") {
                res = await addUniversity({ data: formData, id: addUni?.id }).unwrap()
                if (res?.data?.modifiedCount) {
                    toast.success(res?.data?.message || "Operation successful!")
                    handleClose()
                } else {
                    toast.error(res?.data || "Operation failed!")
                }
            }
            if (addUni?.action === "edit") {
                res = await editUniversity({ data: formData, id: addUni?.id, universityName: addUni?.name }).unwrap()

                if (res?.data?.modifiedCount) {
                    toast.success(res?.data?.message || "Operation successful!")
                    handleClose()
                } else {
                    toast.error(res?.error.data || "Operation failed!")
                }
            }
        } catch (err:any) {
            console.error(err)
            toast.error(err?.data || "Something went wrong!")
        }
    }

    const handleClose = () => {
        setAddUni({ isOpen: false, id: "", name: '', action: "" })
        reset()
        setSelectedTests([])
        setselectedPrograms([])
        setselectedProgramFields([])
        setIntakesList([])
        setTagsList([])
        setAccreditationList([])
        setSelectedFiles([])
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

    const handleselectProgramField = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selected = e.target.value
        if (selected && !selectedPrograms.includes(selected)) {
            setselectedProgramFields(prev => [...prev, selected])
            setValue(`programFields.${selected}`, "available")
        }
        e.target.value = ""
    }

    const handleProgramSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selected = e.target.value
        if (selected && !selectedPrograms.includes(selected)) {
            setselectedPrograms(prev => [...prev, selected])
            setValue(`programOffered.${selected}`, "available")
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
                                        <option value="">Select currency...</option>
                                        {Object.entries(countryCurrencyMap).map(([code, sign]) => (
                                            <option key={code} value={sign}>
                                                {code} ({sign})
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                
                                <div className='input-container'>
                                    <label>Fee Structure</label>
                                    <select {...register("feeStructure")}>
                                        <option value="">Select...</option>    
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
                                        <option value="">select</option>
                                        {gpaScaleOptions.map(s => <option key={s} value={s}>{s}</option>)}
                                    </select>
                                </div>
                            </div>

                            <div className='input-container'>
                                <label>Required Education Level</label>
                                <select {...register("requiredEducationLevel")}>
                                    <option value="">select</option>
                                    {educationLevelOptions.map(e => (
                                        <option key={e} value={e}>
                                            {e.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            
                            <div className='input-container'>
                                <label>Required Files</label>
                                <select
                                    onChange={(e) => {
                                        const value = e.target.value
                                        if (value && !selectedFiles.includes(value)) {
                                            addItem(value, selectedFiles, setSelectedFiles)
                                        }
                                        e.target.value = ''
                                    }}
                                    value=""
                                >
                                    <option value="">Select a file requirement...</option>
                                    {FILE_CATEGORIES.map((category, catIdx) => (
                                        <optgroup key={catIdx} label={category.category}>
                                            {category.files
                                                .filter(file => !selectedFiles.includes(file))
                                                .map((file, fileIdx) => (
                                                    <option key={fileIdx} value={file}>
                                                        {file}
                                                    </option>
                                                ))
                                            }
                                        </optgroup>
                                    ))}
                                </select>
                                <div style={{ marginTop: '10px', display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                                    {selectedFiles.map((file, i) => (
                                        <span 
                                            style={{ 
                                                padding: '8px 15px', 
                                                background: '#667eea', 
                                                color: 'white', 
                                                borderRadius: '20px', 
                                                fontSize: '14px', 
                                                display: 'flex', 
                                                alignItems: 'center', 
                                                gap: '5px' 
                                            }} 
                                            key={i} 
                                        >
                                            {file}
                                            <button 
                                                type="button" 
                                                onClick={() => removeItem(file, selectedFiles, setSelectedFiles)} 
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
                            
                            
                            <div className='input-container'>
                                <h5 style={{ fontWeight: 'bold', marginTop: '20px', marginBottom: '10px' }}>English Proficiency Tests</h5>
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
                            
                            <div className='input-container'>
                                <h5 style={{ fontWeight: 'bold', marginTop: '20px', marginBottom: '10px' }}>Program & field level</h5>
                                <label>Fields of Study Offered</label>
                                <select onChange={handleProgramSelect}>
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
                                    {selectedPrograms.map(q => {
                                        const selectedProgram = programOptions
                                            .flatMap(group => group.options)
                                            .find(opt => opt.value === q)
                                        return (
                                            <span key={q} style={{ padding: '8px 15px', background: '#667eea', color: 'white', borderRadius: '20px', fontSize: '14px', display: 'flex', alignItems: 'center', gap: '5px' }}>
                                                {selectedProgram?.label}
                                                <button
                                                    type="button"
                                                    onClick={() => {
                                                        setselectedPrograms(prev => prev.filter(qual => qual !== q))
                                                        setValue(`programOffered.${q}`, undefined as any)
                                                    }}
                                                    style={{ background: 'rgba(255,255,255,0.3)', border: 'none', borderRadius: '50%', width: '20px', height: '20px', cursor: 'pointer', color: 'white', fontWeight: 'bold' }}
                                                >
                                                    ×
                                                </button>
                                            </span>
                                        )
                                    })}
                                </div>
                            </div>
                            
                            <div className='input-container'>
                                <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>
                                    Program Levels Offered
                                </label>
                                <select
                                    onChange={handleselectProgramField}
                                    style={{
                                        width: '100%',
                                        padding: '12px',
                                        borderRadius: '8px',
                                        border: 'none',
                                        fontSize: '14px',
                                        color: '#1e293b'
                                    }}
                                >
                                    <option value="">-- Select Program Field --</option>
                                    {PROGRAM_LEVELS.map(group => (
                                        <option key={group} value={group}>
                                            {group}
                                        </option>
                                    ))}
                                </select>
                                <div style={{ marginTop: '10px', display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                                    {
                                        selectedProgramFields.map((field, i) => (
                                            <span
                                                key={i}
                                                style={{
                                                    padding: '8px 15px',
                                                    background: '#667eea',
                                                    color: 'white',
                                                    borderRadius: '20px',
                                                    fontSize: '14px',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    gap: '5px'
                                                }}
                                            >
                                                {field}
                                                <button
                                                    type="button"
                                                    onClick={() => {
                                                        setselectedProgramFields(prev => prev.filter(f => f !== field))
                                                        setValue(`programFields.${field}`, undefined as any)
                                                    }}
                                                    style={{ background: 'rgba(255,255,255,0.3)', border: 'none', borderRadius: '50%', width: '20px', height: '20px', cursor: 'pointer', color: 'white', fontWeight: 'bold' }}
                                                >
                                                    ×
                                                </button>
                                            </span>
                                        ))
                                    }
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
                                                <select
                                                    value={intake.name}
                                                    onChange={(e) => updateIntake(index, 'name', e.target.value)}
                                                    style={{ 
                                                        width: '100%', 
                                                        padding: '6px', 
                                                        marginTop: '3px',
                                                        borderRadius: '4px',
                                                        border: '1px solid #d1d5db',
                                                        fontSize: '14px'
                                                    }}
                                                >
                                                    <option value="">Select intake...</option>
                                                    {INTAKE_NAMES.map((name, idx) => (
                                                        <option key={idx} value={name}>{name}</option>
                                                    ))}
                                                </select>
                                            </div>
                                            <div>
                                                <label style={{ fontSize: '13px' }}>Month</label>
                                                <select
                                                    value={intake.startMonth}
                                                    onChange={(e) => updateIntake(index, 'startMonth', e.target.value)}
                                                    style={{ 
                                                        width: '100%', 
                                                        padding: '6px', 
                                                        marginTop: '3px',
                                                        borderRadius: '4px',
                                                        border: '1px solid #d1d5db',
                                                        fontSize: '14px'
                                                    }}
                                                >
                                                    <option value="">Select month...</option>
                                                    {MONTHS.map((month, idx) => (
                                                        <option key={idx} value={month}>{month}</option>
                                                    ))}
                                                </select>
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
                                    <option value="">Select</option>
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
                            <div className="double-input-container">
                                <div className='input-container' style={{ marginTop: '20px' }}>
                                    <label>Status</label>
                                    <select {...register("status")}>
                                        <option value="">Select</option>
                                        <option value="active">Active</option>
                                        <option value="inactive">Inactive</option>
                                        <option value="coming_soon">Coming Soon</option>
                                    </select>
                                </div>
                                <div className='input-container' style={{ marginTop: '20px' }}>
                                    <label>University Type</label>
                                    <select {...register("uniType")}>
                                        <option value="">select</option>
                                        <option value="affiliated">Affiliated</option>
                                        <option value="non_affiliated">Non Affiliated</option>
                                    </select>
                                </div>
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



                    // <div className="input-container">
                    //     <label>Accreditation (Optional)</label>
                    //     <select {...register("accreditation")}>
                    //         <option value="">-- Select Accreditation --</option>
                    //         <option value="ugc">UGC (University Grants Commission)</option>
                    //         <option value="naac">NAAC (National Assessment and Accreditation Council)</option>
                    //         <option value="nba">NBA (National Board of Accreditation)</option>
                    //         <option value="aacsb">AACSB (Association to Advance Collegiate Schools of Business)</option>
                    //         <option value="abet">ABET (Accreditation Board for Engineering and Technology)</option>
                    //         <option value="equis">EQUIS (European Quality Improvement System)</option>
                    //         <option value="amba">AMBA (Association of MBAs)</option>
                    //         <option value="regional">Regional Accreditation</option>
                    //         <option value="professional">Professional Body Accreditation</option>
                    //         <option value="other">Other</option>
                    //     </select>
                    // </div>