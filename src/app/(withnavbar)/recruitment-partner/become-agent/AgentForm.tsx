"use client"
import { useState } from "react"
import { toast } from "react-toastify"
import { useUserInfo } from "@/utils/useUserInfo"
import Loader from "@/component/shared/loader/loader"
import { useForm, SubmitHandler } from "react-hook-form"
import { useCreateAgentsReqMutation } from "@/redux/endpoints/agent/agentsEndpoints"

type Inputs = {
  name: string;
  email: string;
  role: string;
  mobile_number: string;
  alternate_mobile?: string;
  dob: string;
  address: string;
  nationality: string;
  passport_number?: string;
  agency_name: string;
  agency_address: string;
  agency_website?: string;
  experience: number;
  services: string;
  partner_universities?: string;
  license_number: string;
  tax_id: string;
  criminal_record: "yes" | "no" | "";
  referral: "google" | "facebook" | "linkedin" | "youtube" | "friends" | "others" | "";
  background_check?: FileList;
  license_document?: FileList;
  company_registration_number?: string;
  company_type?: "individual" | "partnership" | "pvt_ltd" | "llc" | "others" | "";
  proof_of_address?: FileList;
  id_document?: FileList;
  linkedin_profile?: string;
  additional_notes?: string;
}

export default function AgentForm() {
    const { Uemail, Urole } = useUserInfo()
    const [createAgentsReq, { isLoading: agentLoading }] = useCreateAgentsReqMutation()
    const { register, handleSubmit, reset, setValue, getValues, formState: { errors } } = useForm<Inputs>()
    const [busyCopy, setBusyCopy] = useState(false)

    if (agentLoading) return <Loader />

    const onSubmit: SubmitHandler<Inputs> = async (data) => {
        try {
        // ensure email/role are included
        if (Uemail) data.email = Uemail
        if (Urole) data.role = Urole

        const formData = new FormData()

        Object.entries(data).forEach(([key, value]) => {
            if (value instanceof FileList) {
            for (let i = 0; i < value.length; i++) {
                formData.append(key, value[i])
            }
            } else if (value !== undefined && value !== null) {
            formData.append(key, String(value))
            }
        })

        const res: any = await createAgentsReq(formData)

        if (res?.data?.data?.acknowledged) {
            toast.success("You requested successfully! You can modify it from dashboard profile")
            reset()
        } else {
            toast.error(res?.data?.message || "Submission failed")
        }
        } catch (err) {
        console.error(err)
        toast.error("Something went wrong. Please try again.")
        }
    }


    const copyField = async (fieldName: keyof Inputs) => {
        try {
        setBusyCopy(true)
        const val = getValues(fieldName as any)
        if (!val) {
            toast.info("Nothing to copy")
            setBusyCopy(false)
            return
        }
        if (typeof val === "string") {
            await navigator.clipboard.writeText(val)
            toast.success("Copied to clipboard")
        } else {
            toast.info("This field is not copyable")
        }
        } catch (err) {
        console.error(err)
        toast.error("Copy failed")
        } finally {
        setBusyCopy(false)
        }
    }


    const pasteField = async (fieldName: keyof Inputs) => {
        try {
        if (!navigator.clipboard) {
            toast.error("Clipboard API not available")
            return
        }
        const text = await navigator.clipboard.readText()
        if (text) {
            setValue(fieldName as any, text)
            toast.success("Pasted from clipboard")
        } else {
            toast.info("Clipboard empty")
        }
        } catch (err) {
        console.error(err)
        toast.error("Paste failed")
        }
    }

    return (
        <div className="form-container">
            <div className="form-wrapper">
                <div className="floating-elements"></div>
                <h2 className="form-header">Agent Application Form</h2>

                <div className="form-content">
                <form id="agentForm" onSubmit={handleSubmit(onSubmit)}>

                    {/* Personal Information */}
                    <div className="form-section">
                    <h3 className="section-title">Personal Information</h3>

                    <div className="form-group">
                        <label className="form-label required">Full Name</label>
                        <div style={{display: 'flex', gap: 8, alignItems: 'center'}}>
                        <input className="form-input" {...register("name", { required: true })} />
                        <button type="button" onClick={() => copyField("name")} disabled={busyCopy}>Copy</button>
                        <button type="button" onClick={() => pasteField("name")}>Paste</button>
                        </div>
                        {errors.name && <p className="error">Name is required</p>}
                    </div>

                    <div className="form-row">
                        <div className="form-group">
                        <label className="form-label required">Email</label>
                        <input
                            className="form-input"
                            type="email"
                            defaultValue={Uemail || ""}
                            readOnly
                            {...register("email")}
                        />
                        </div>

                        <div className="form-group">
                        <label className="form-label required">Mobile Number</label>
                        <input className="form-input" type="tel" {...register("mobile_number", { required: true })} />
                        </div>
                    </div>

                    <div className="form-row">
                        <div className="form-group">
                        <label className="form-label">Alternate Contact Number</label>
                        <input className="form-input" type="tel" {...register("alternate_mobile")} />
                        </div>

                        <div className="form-group">
                        <label className="form-label required">Date of Birth</label>
                        <input className="form-input" type="date" {...register("dob", { required: true })} />
                        </div>
                    </div>

                    <div className="form-group">
                        <label className="form-label required">Address</label>
                        <input className="form-input" {...register("address", { required: true })} />
                    </div>

                    <div className="form-row">
                        <div className="form-group">
                        <label className="form-label required">Nationality</label>
                        <input className="form-input" {...register("nationality", { required: true })} />
                        </div>

                        <div className="form-group">
                        <label className="form-label">Passport Number</label>
                        <input className="form-input" {...register("passport_number")} />
                        </div>
                    </div>
                    </div>

                    {/* Agency Information */}
                    <div className="form-section">
                    <h3 className="section-title">Agency Information</h3>

                    <div className="form-group">
                        <label className="form-label required">Agency Name</label>
                        <input className="form-input" {...register("agency_name", { required: true })} />
                    </div>

                    <div className="form-group">
                        <label className="form-label required">Agency Address</label>
                        <input className="form-input" {...register("agency_address", { required: true })} />
                    </div>

                    <div className="form-row">
                        <div className="form-group">
                        <label className="form-label">Agency Website</label>
                        <input className="form-input" type="url" {...register("agency_website")} />
                        </div>

                        <div className="form-group">
                        <label className="form-label required">Years of Experience</label>
                        <input className="form-input" type="number" {...register("experience", { required: true })} />
                        </div>
                    </div>

                    <div className="form-group">
                        <label className="form-label required">Services Offered</label>
                        <div style={{display:'flex', gap:8, alignItems:'center'}}>
                        <textarea className="form-textarea" {...register("services", { required: true })}></textarea>
                        <div style={{display:'flex',flexDirection:'column',gap:6}}>
                            <button type="button" onClick={() => copyField("services")}>Copy</button>
                            <button type="button" onClick={() => pasteField("services")}>Paste</button>
                        </div>
                        </div>
                    </div>

                    <div className="form-group">
                        <label className="form-label">Partner Universities (If any)</label>
                        <div style={{display:'flex', gap:8, alignItems:'center'}}>
                        <textarea className="form-textarea" {...register("partner_universities")}></textarea>
                        <div style={{display:'flex',flexDirection:'column',gap:6}}>
                            <button type="button" onClick={() => copyField("partner_universities")}>Copy</button>
                            <button type="button" onClick={() => pasteField("partner_universities")}>Paste</button>
                        </div>
                        </div>
                    </div>
                    </div>

                    {/* Legal & Verification */}
                    <div className="form-section">
                    <h3 className="section-title">Legal & Verification</h3>

                    <div className="form-row">
                        <div className="form-group">
                        <label className="form-label required">Business License Number</label>
                        <input className="form-input" {...register("license_number", { required: true })} />
                        </div>

                        <div className="form-group">
                        <label className="form-label required">Tax Identification Number</label>
                        <input className="form-input" {...register("tax_id", { required: true })} />
                        </div>
                    </div>

                    <div className="form-group">
                        <label className="form-label required">Upload Business License</label>
                        <input className="form-input" type="file" {...register("license_document", { required: true })} accept=".pdf,.jpg,.jpeg,.png" />
                    </div>

                    <div className="form-row">
                        <div className="form-group">
                        <label className="form-label required">Do you have any criminal record?</label>
                        <select className="form-select" {...register("criminal_record", { required: true })}>
                            <option value="">Select an option</option>
                            <option value="no">No</option>
                            <option value="yes">Yes</option>
                        </select>
                        </div>

                        <div className="form-group">
                        <label className="form-label required">How did you hear about us?</label>
                        <select className="form-select" {...register("referral", { required: true })}>
                            <option value="">Select an option</option>
                            <option value="google">Google</option>
                            <option value="facebook">Facebook</option>
                            <option value="linkedin">LinkedIn</option>
                            <option value="youtube">YouTube</option>
                            <option value="friends">Friends</option>
                            <option value="others">Others</option>
                        </select>
                        </div>
                    </div>

                    <div className="form-group">
                        <label className="form-label required">Upload Background Check Document</label>
                        <input className="form-input" type="file" {...register("background_check", { required: true })} accept=".pdf,.jpg,.jpeg,.png" />
                    </div>

                    <div className="form-row">
                        <div className="form-group">
                        <label className="form-label">Company Registration Number</label>
                        <input className="form-input" {...register("company_registration_number")} />
                        </div>

                        <div className="form-group">
                        <label className="form-label">Company Type</label>
                        <select className="form-select" {...register("company_type")}>
                            <option value="">Select</option>
                            <option value="individual">Individual</option>
                            <option value="partnership">Partnership</option>
                            <option value="pvt_ltd">Private Limited</option>
                            <option value="llc">LLC</option>
                            <option value="others">Others</option>
                        </select>
                        </div>
                    </div>

                    <div className="form-group">
                        <label className="form-label">Upload Proof of Address</label>
                        <input className="form-input" type="file" {...register("proof_of_address")} accept=".pdf,.jpg,.jpeg,.png" />
                    </div>

                    <div className="form-group">
                        <label className="form-label">Upload ID Document (Passport/NID)</label>
                        <input className="form-input" type="file" {...register("id_document")} accept=".pdf,.jpg,.jpeg,.png" />
                    </div>

                    <div className="form-group">
                        <label className="form-label">LinkedIn Profile</label>
                        <input className="form-input" type="url" {...register("linkedin_profile")} />
                    </div>

                    <div className="form-group">
                        <label className="form-label">Additional Notes</label>
                        <div style={{display:'flex', gap:8, alignItems:'center'}}>
                        <textarea className="form-textarea" {...register("additional_notes")}></textarea>
                        <div style={{display:'flex',flexDirection:'column',gap:6}}>
                            <button type="button" onClick={() => copyField("additional_notes")}>Copy</button>
                            <button type="button" onClick={() => pasteField("additional_notes")}>Paste</button>
                        </div>
                        </div>
                    </div>
                    </div>

                    <button className="form-button" type="submit">Submit Application</button>
                </form>
                </div>
            </div>
        </div>
    )
}
