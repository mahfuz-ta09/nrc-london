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
    cost?:number,
    placement?:string
}

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
  { value: "shortcourse", label: "Short Course / Workshop / Bootcamp" },
  { value: "others", label: "mention others" }
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
                setSelectedQualifications([])
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
                    onClick={() =>{setSelectedQualifications([]);setAddSub((prev: any) => ({...prev,id: "",name: "",isOPen: false,action: ""}))}}> X </button>

                <form onSubmit={handleSubmit(onSubmit)} className="modal-from">

                    <div className="input-container">
                        <label>subject name</label>
                        <input type="text" placeholder="e.g. computer science, law" {...register("subjectName")} />
                    </div>


                    <div className="input-container">
                        <label>duration (months)</label>
                        <input type="number" min={0} placeholder="e.g. 12/36/48" {...register("duration", { valueAsNumber: true })} />
                    </div>

                    <div className="input-container">
                        <label>Program Type</label>
                        <select {...register("programType")}>
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
                                <option value="CertificateProfessional">Professional Certificate (ACCA, CFA, PMP, etc.)</option>
                                <option value="ShortCourse">Short Course</option>
                                <option value="ExecutiveEducation">Executive Education</option>
                                <option value="Online">Online / Distance Learning</option>
                            </optgroup>
                        </select>
                    </div>


                    <div className="input-container">
                        <label>placement</label>
                        <select {...register("placement")}>
                            <option value="">-- Select program --</option>
                            <option value="BSc">yes</option>
                            <option value="MSc">no</option>
                        </select>
                    </div>

                    <div className="input-container">
                        <label>Faculty / Department</label>
                        <select {...register("faculty")}>
                            <option value="">-- Select faculty / department --</option>
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
                        <label>credits</label>
                        <input type="number" min={0} placeholder="e.g. 90/100/120 total" {...register("credits", { valueAsNumber: true })} />
                    </div>


                    <div className="input-container">
                        <label>cost</label>
                        <input type="number" min={0} placeholder="e.g. cost to finish the course" {...register("cost", { valueAsNumber: true })} />
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
                        <label>required qualifications(optional)</label>
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
                            <label>description about {q}:</label>
                            <input
                                type="text"
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
                        <label>Intake Months</label>
                        <select {...register("intakes")}>
                            <option value="">-- Select intake month --</option>
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
                        <label>application deadline</label>
                        <input type="date" {...register("applicationDeadline")} />
                    </div>


                    <div className="input-container">
                        <label>career opportunities</label>
                        <textarea {...register("careerOpportunities")} placeholder="e.g. Software Engineer, Data Scientist" />
                    </div>

                    <div className="input-container">
                        <label>Accreditation(optional)</label>
                        <select {...register("accreditation")}>
                            <option value="">-- Select accreditation --</option>
                            <option value="ugc">UGC (University Grants Commission)</option>
                            <option value="naac">NAAC (National Assessment and Accreditation Council)</option>
                            <option value="nba">NBA (National Board of Accreditation)</option>
                            <option value="aacsb">AACSB (Association to Advance Collegiate Schools of Business)</option>
                            <option value="abet">ABET (Accreditation Board for Engineering and Technology)</option>
                            <option value="equis">EQUIS (European Quality Improvement System)</option>
                            <option value="amBa">AMBA (Association of MBAs)</option>
                            <option value="regional">Regional Accreditation (e.g. Middle States, WASC, etc.)</option>
                            <option value="professional">Professional Body Accreditation (e.g. Medical Council, Bar Council, Nursing Council)</option>
                            <option value="other">Other</option>
                        </select>
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