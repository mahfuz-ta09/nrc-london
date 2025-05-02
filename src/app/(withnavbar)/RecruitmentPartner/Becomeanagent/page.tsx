'use client'
import Footer from "@/component/shared/Footer/Footer"
import { useForm, SubmitHandler } from "react-hook-form"
import '@/css/TestPrep/CommonStyle.css'
import '@/css/Proceed/Proceed.css'
import { useUserInfo } from "@/utils/useUserInfo"
import { useCreateAgentsReqMutation } from "@/redux/endpoints/agent/agentsEndpoints"
import { toast } from "react-toastify"


type Inputs = {
    name: string;
    email: string;
    role:string,
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
    criminal_record: "yes" | "no";
    referral: "google" | "facebook" | "linkedin" | "youtube" | "friends" | "others";
    background_check: FileList;
    license_document: FileList;
}

const Becomeanagent = () => {
    const { Uemail , Urole } = useUserInfo()
    const [ createAgentsReq ,{ isLoading: agentLoading}] = useCreateAgentsReqMutation()
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<Inputs>()
    


    const onSubmit: SubmitHandler<Inputs> = async (data: any) => {
        try {
            data.email = Uemail
            data.role = Urole
            const formData = new FormData()
            
            Object.entries(data).forEach(([key, value]) => {
                if(value instanceof FileList) {
                    for (let i = 0; i < value.length; i++) {
                        formData.append(key, value[i]);
                    }
                }else if (value !== undefined && value !== null) {
                    formData.append(key, String(value));
                }
            })
    
            const res = await createAgentsReq(formData)
            if (res?.data?.data?.acknowledged) {
                toast.success("You requested successfully! You can modify it from dashboard profile")
                reset()
            } else {
                toast.error(res?.data?.message);
            }
        } catch (err) {
            console.log(err);
        }
    }
            
    return (
        <div>
            <div className="container wdth">
                <h2 className="form-header">Agent Application Form</h2>
                <form onSubmit={handleSubmit(onSubmit)}>


                    <label className="form-label" htmlFor="name">Full Name:</label>
                    <input className="form-input" type="text" {...register("name")} required/>

                    <label className="form-label" htmlFor="email">Email:</label>
                    <input className="form-input" type="email" value={Uemail} {...register("email")} readOnly/>

                    <label className="form-label" htmlFor="mobile">Mobile Number:</label>
                    <input className="form-input" type="tel" {...register("mobile_number")} required/>

                    <label className="form-label" htmlFor="alternate_mobile">Alternate Contact Number:</label>
                    <input className="form-input" type="tel" {...register("alternate_mobile")} />

                    <label className="form-label" htmlFor="dob">Date of Birth:</label>
                    <input className="form-input" type="date" {...register("dob")} required/>

                    <label className="form-label" htmlFor="address">Address:</label>
                    <input className="form-input" type="text" {...register("address")} required/>

                    <label className="form-label" htmlFor="nationality">Nationality:</label>
                    <input className="form-input" type="text" {...register("nationality")} required/>

                    <label className="form-label" htmlFor="passport_number">Passport Number:</label>
                    <input className="form-input" type="text" {...register("passport_number")} />


                    <h3>Agency Information</h3>

                    <label className="form-label" htmlFor="agency_name">Agency Name:</label>
                    <input className="form-input" type="text" {...register("agency_name")} required/>

                    <label className="form-label" htmlFor="agency_address">Agency Address:</label>
                    <input className="form-input" type="text" {...register("agency_address")} required/>

                    <label className="form-label" htmlFor="agency_website">Agency Website:</label>
                    <input className="form-input" type="url" {...register("agency_website")} />

                    <label className="form-label" htmlFor="experience">Years of Experience:</label>
                    <input className="form-input" type="number" {...register("experience")} required/>

                    <label className="form-label" htmlFor="services">Services Offered:</label>
                    <textarea className="form-input" {...register("services")} required></textarea>

                    <label className="form-label" htmlFor="partner_universities">Partner Universities (If any):</label>
                    <textarea className="form-input" {...register("partner_universities")}></textarea>

                    
                    <h3>Legal & Verification</h3>

                    <label className="form-label" htmlFor="license_number">Business License Number:</label>
                    <input className="form-input" type="text" {...register("license_number")} required/>

                    <label className="form-label" htmlFor="license_document">Upload Business License:</label>
                    <input className="form-input" type="file" {...register("license_document")} accept=".pdf,.jpg,.png" required/>

                    <label className="form-label" htmlFor="tax_id">Tax Identification Number:</label>
                    <input className="form-input" type="text" {...register("tax_id")} required/>

                    <label className="form-label" htmlFor="criminal_record">Do you have any criminal record?</label>
                    <select className="form-select" {...register("criminal_record")} required>
                        <option value="no">No</option>
                        <option value="yes">Yes</option>
                    </select>

                    <label className="form-label" htmlFor="backgroun/d_check">Upload Background Check Document:</label>
                    <input className="form-input" type="file" {...register("background_check")} accept=".pdf,.jpg,.png" required/>

                    
                    <label className="form-label" htmlFor="referral">How did you hear about us?</label>
                    <select className="form-select" {...register("referral")}>
                        <option value="google">Google</option>
                        <option value="facebook">Facebook</option>
                        <option value="linkedin">LinkedIn</option>
                        <option value="youtube">YouTube</option>
                        <option value="friends">Friends</option>
                        <option value="others">Others</option>
                    </select>

                    { agentLoading ? <p>Loading...</p> : <input className="form-button" type="submit" value="Submit Application"/>}
                </form>
            </div>
            <Footer />
        </div>
    )
}

export default Becomeanagent