'use client'
import { useState } from "react"
import { toast } from "react-toastify"
import Loader from "@/component/shared/loader/loader"
import { useForm, SubmitHandler } from "react-hook-form"
import { useAddSubjectMutation } from "@/redux/endpoints/subject/subjectEndpoints"

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
    programLevel: string,
    degree: string,
    duration: {
        value: number,
        unit: string
    },
    description: string,
    qualifications: Record<string, string>,
    programType: string,
    faculty: string,
    credits: number,
    modeOfStudy: string,
    language: string,
    intakes: string,
    applicationDeadline: string,
    careerOpportunities: string,
    accreditation: string,
    cost: number,
    placement: string
}

const qualificationOptions = [
    { value: "certificate", label: "Certificate (Short-term / Vocational)" },
    { value: "diploma", label: "Diploma / Advanced Diploma" },
    { value: "foundation", label: "Foundation / Preparatory" },
    { value: "associate", label: "Associate Degree (AA / AS)" },
    { value: "undergraduate", label: "Undergraduate (Bachelor's)" },
    { value: "graduate", label: "Graduate (Master's)" },
    { value: "doctorate", label: "Doctorate (PhD / Professional Doctorate)" },
    { value: "professional", label: "Professional Qualification (ACCA, CFA, PMP, etc.)" },
    { value: "postdoc", label: "Postdoctoral / Research Fellowship" },
    { value: "executive", label: "Executive Education / MBA / EMBA" },
    { value: "vocational", label: "Vocational / Technical Training" },
    { value: "continuing", label: "Continuing Education / Lifelong Learning" },
    { value: "online", label: "Online / Distance Learning Program" },
    { value: "shortcourse", label: "Short Course / Workshop / Bootcamp" },
    { value: "others", label: "Mention others" }
]

const PROGRAM_LEVELS = [
    'Certificate',
    'Diploma',
    'Foundation',
    'Associate Degree',
    'Undergraduate',
    'Graduate',
    'Doctorate',
    'Professional',
    'Executive'
]

const DURATION_UNITS = [
    'months',
    'years',
    'weeks',
    'semesters'
]

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
    const [selectedQualifications, setSelectedQualifications] = useState<string[]>([])

    if (addLoading) {
        return <Loader />
    }

    const onSubmit: SubmitHandler<SubjectData> = async (data) => {
        try {
            const formData = new FormData()
            
            if(data?.subjectName)formData.append('subjectName', data.subjectName)
            if(data?.programLevel)formData.append('programLevel', data.programLevel)
            if(data?.degree)formData.append('degree', data.degree)
            if(data?.duration)formData.append('duration[value]', String(data.duration.value))
            if(data?.duration)formData.append('duration[unit]', data.duration.unit)
            if(data?.description)formData.append('description', data.description || '')
            if(data?.programType)formData.append('programType', data.programType)
            if(data?.faculty)formData.append('faculty', data.faculty)
            if(data?.credits)formData.append('credits', String(data.credits))
            if(data?.modeOfStudy)formData.append('modeOfStudy', data.modeOfStudy)
            if(data?.language)formData.append('language', data.language)
            if(data?.intakes)formData.append('intakes', data.intakes)
            if(data?.applicationDeadline)formData.append('applicationDeadline', data.applicationDeadline)
            if(data?.careerOpportunities)formData.append('careerOpportunities', data.careerOpportunities || '')
            if(data?.accreditation)formData.append('accreditation', data.accreditation || '')
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

                    <div className="double-input-container">
                        <div className="input-container">
                            <label>Subject Name *</label>
                            <input 
                                type="text" 
                                placeholder="e.g. Computer Science, Law" 
                                {...register("subjectName", { required: true })} 
                            />
                        </div>

                        <div className="input-container">
                            <label>Program Level *</label>
                            <select {...register("programLevel", { required: true })}>
                                <option value="">-- Select Level --</option>
                                {PROGRAM_LEVELS.map((level, idx) => (
                                    <option key={idx} value={level}>{level}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div className="input-container">
                        <label>Degree Name</label>
                        <input 
                            type="text" 
                            placeholder="e.g. Bachelor of Science in Computer Science" 
                            {...register("degree")} 
                        />
                    </div>

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
                        <select {...register("programType", { required: true })}>
                            <option value="">-- Select Program --</option>
                            <optgroup label="Undergraduate">
                                <option value="Certificate">Certificate</option>
                                <option value="Diploma">Diploma</option>
                                <option value="Associate">Associate Degree (AA/AS/AAS)</option>
                                <option value="BA">Bachelor of Arts (BA)</option>
                                <option value="BSc">Bachelor of Science (BSc/BS)</option>
                                <option value="BBA">Bachelor of Business Administration (BBA)</option>
                                <option value="BEng">Bachelor of Engineering (BEng)</option>
                                <option value="LLB">Bachelor of Laws (LLB)</option>
                                <option value="MBBS">Bachelor of Medicine (MBBS/MD)</option>
                            </optgroup>
                            <optgroup label="Postgraduate">
                                <option value="PGCert">Postgraduate Certificate (PGCert)</option>
                                <option value="PGDip">Postgraduate Diploma (PGDip)</option>
                                <option value="MA">Master of Arts (MA)</option>
                                <option value="MSc">Master of Science (MSc/MS)</option>
                                <option value="MBA">Master of Business Administration (MBA)</option>
                                <option value="MEng">Master of Engineering (MEng)</option>
                                <option value="LLM">Master of Laws (LLM)</option>
                                <option value="MEd">Master of Education (MEd)</option>
                                <option value="MPH">Master of Public Health (MPH)</option>
                            </optgroup>
                            <optgroup label="Doctoral">
                                <option value="PhD">Doctor of Philosophy (PhD/DPhil)</option>
                                <option value="MD">Doctor of Medicine (MD/DO)</option>
                                <option value="DBA">Doctor of Business Administration (DBA)</option>
                                <option value="EdD">Doctor of Education (EdD)</option>
                                <option value="SJD">Doctor of Juridical Science (SJD/JSD)</option>
                            </optgroup>
                            <optgroup label="Other / Professional">
                                <option value="Foundation">Foundation / Pathway Program</option>
                                <option value="CertificateProfessional">Professional Certificate</option>
                                <option value="ShortCourse">Short Course</option>
                                <option value="ExecutiveEducation">Executive Education</option>
                                <option value="Online">Online / Distance Learning</option>
                            </optgroup>
                        </select>
                    </div>

                    <div className="double-input-container">
                        <div className="input-container">
                            <label>Faculty / Department *</label>
                            <select {...register("faculty", { required: true })}>
                                <option value="">-- Select Faculty --</option>
                                <option value="arts">Faculty of Arts & Humanities</option>
                                <option value="science">Faculty of Science</option>
                                <option value="engineering">Faculty of Engineering</option>
                                <option value="business">Faculty of Business / Management</option>
                                <option value="law">Faculty of Law</option>
                                <option value="medicine">Faculty of Medicine</option>
                                <option value="dentistry">Faculty of Dentistry</option>
                                <option value="nursing">Faculty of Nursing</option>
                                <option value="pharmacy">Faculty of Pharmacy</option>
                                <option value="social_sciences">Faculty of Social Sciences</option>
                                <option value="education">Faculty of Education</option>
                                <option value="it">Faculty of Computer Science / IT</option>
                                <option value="agriculture">Faculty of Agriculture</option>
                                <option value="architecture">Faculty of Architecture & Design</option>
                                <option value="economics">Faculty of Economics</option>
                                <option value="environment">Faculty of Environmental Studies</option>
                                <option value="communication">Faculty of Communication / Media</option>
                                <option value="psychology">Faculty of Psychology</option>
                                <option value="public_health">Faculty of Public Health</option>
                                <option value="hospitality">Faculty of Hospitality & Tourism</option>
                                <option value="theology">Faculty of Theology / Religious Studies</option>
                                <option value="law_enforcement">Faculty of Criminology / Law Enforcement</option>
                            </select>
                        </div>

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
                            <label>Total Cost *</label>
                            <input 
                                type="number" 
                                min={0} 
                                placeholder="Total program cost" 
                                {...register("cost", { 
                                    required: true, 
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

                    <div className="double-input-container">
                        <div className="input-container">
                            <label>Intake Month *</label>
                            <select {...register("intakes", { required: true })}>
                                <option value="">-- Select Intake --</option>
                                <option value="january">January (Winter)</option>
                                <option value="february">February</option>
                                <option value="march">March</option>
                                <option value="april">April (Spring)</option>
                                <option value="may">May (Summer)</option>
                                <option value="june">June</option>
                                <option value="july">July</option>
                                <option value="august">August</option>
                                <option value="september">September (Fall)</option>
                                <option value="october">October</option>
                                <option value="november">November</option>
                                <option value="december">December</option>
                            </select>
                        </div>

                        <div className="input-container">
                            <label>Application Deadline *</label>
                            <input 
                                type="date" 
                                {...register("applicationDeadline", { required: true })} 
                            />
                        </div>
                    </div>

                    <div className="input-container">
                        <label>Accreditation (Optional)</label>
                        <select {...register("accreditation")}>
                            <option value="">-- Select Accreditation --</option>
                            <option value="ugc">UGC (University Grants Commission)</option>
                            <option value="naac">NAAC (National Assessment and Accreditation Council)</option>
                            <option value="nba">NBA (National Board of Accreditation)</option>
                            <option value="aacsb">AACSB (Association to Advance Collegiate Schools of Business)</option>
                            <option value="abet">ABET (Accreditation Board for Engineering and Technology)</option>
                            <option value="equis">EQUIS (European Quality Improvement System)</option>
                            <option value="amba">AMBA (Association of MBAs)</option>
                            <option value="regional">Regional Accreditation</option>
                            <option value="professional">Professional Body Accreditation</option>
                            <option value="other">Other</option>
                        </select>
                    </div>

                    <div className="input-container">
                        <label>Career Opportunities</label>
                        <textarea 
                            {...register("careerOpportunities")} 
                            placeholder="e.g. Software Engineer, Data Scientist, AI Researcher" 
                            rows={3}
                        />
                    </div>

                    <div className="input-container">
                        <label>Description</label>
                        <textarea 
                            {...register("description")} 
                            placeholder="Detailed description of the course/program"
                            rows={5}
                        />
                    </div>

                    <button type="submit" className="save-button">
                        Add Subject
                    </button>
                </form>
            </div>
        </div>
    )
}

export default SubjectControllModal