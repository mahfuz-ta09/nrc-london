'use client'
import { SubmitHandler, useForm } from 'react-hook-form'
import Footer from '@/component/shared/Footer/Footer'
import '@/css/TestPrep/CommonStyle.css'
import '@/css/Proceed/Proceed.css'
import { usePostProcessDataMutation } from '@/redux/endpoints/proceed/proceedEndpoints'
import { toast } from 'react-toastify'
import { useUserInfo } from '@/utils/useUserInfo'
import { IFormInput } from '@/types/common'




const page = () => {
    const { register , reset, handleSubmit } = useForm<IFormInput>()
    const [ postProcessData , { isLoading: postLoading }]= usePostProcessDataMutation()
    const { Uemail , Urole } = useUserInfo()

    const onSubmit: SubmitHandler<IFormInput> = async(data) => {
        if(!Uemail){
            toast.error("Please login to proceed!!")
            return
        }
        const insertedData = {
            ...data,
            email: Uemail,
            role: Urole,
        }
        const formData = new FormData()
            
        Object.entries(insertedData).forEach(([key, value]) => {
            if(value instanceof FileList) {
                for (let i = 0; i < value.length; i++) {
                    formData.append(key, value[i]);
                }
            }else if (value !== undefined && value !== null) {
                formData.append(key, String(value));
            }
        })

        try{
            const res = await postProcessData(formData)
            if(res?.data?.data?.acknowledged){
                toast.success("Successfull, we will contact you for further information!!")
                reset()
            }else{
                toast.error(res?.data?.message)
            }
        }catch(err){
            console.log(err)
        }
    }

    return (
      <div>
        <div className="container wdth">
            <h2 className="form-header">Student Registration Form</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
                <label className="form-label" htmlFor="name">Name:</label>
                <input className="form-input" type="text" {...register("name")} required/>

                <label className="form-label" htmlFor="mobile">Mobile Number:</label>
                <input className="form-input" type="number" {...register("mobile_number")} required/>

                <label className="form-label" htmlFor="emergency">Emergency Number:</label>
                <input className="form-input" type="number" {...register("emergency_number")} required/>

                <label className="form-label" htmlFor="email">Email:</label>
                <input className="form-input" type="email" value={Uemail} readOnly/>

                <label className="form-label" htmlFor="dob">Date of Birth:</label>
                <input className="form-input" type="date" {...register("dob")} required/>


                <h3 style={{margin:"20px 0 10px"}}>Educational Qualification</h3>
                <div className='table-content'>
                    <label className="form-label">SSC Certificate (jpg/jpeg):</label>
                    <input className="form-input" type="file"  accept=".jpg,.jpeg" {...register("ssc_result")} required/>

                    <label className="form-label">HSC Certificate (jpg/jpeg):</label>
                    <input className="form-input" type="file"  accept=".jpg,.jpeg" {...register("hsc_result")} />

                    <label className="form-label">Bachelor Certificate (jpg/jpeg):</label>
                    <input className="form-input" type="file"  accept=".jpg,.jpeg" {...register("bachelor_result")} />

                    <label className="form-label">Master Certificate (jpg/jpeg):</label>
                    <input className="form-input" type="file"  accept=".jpg,.jpeg" {...register("masters_result")} />

                    <label className="form-label">Other Degree Certificate (jpg/jpeg):</label>
                    <input className="form-input" type="file"  accept=".jpg,.jpeg" {...register("other_result")} />
                </div>
                
                <h3 style={{margin:"20px 0 10px"}}>English Proficiency Test</h3>
                <select className="form-select" id="preferred-country" {...register("en_proficiency")} required>
                    <option value="IELTS">IELTS</option>
                    <option value="OIETC">OIETC</option>
                    <option value="DUOLINGO">DUOLINGO</option>
                    <option value="PTE">PTE</option>
                    <option value="TOFEL">TOFEL</option>
                    <option value="MOI">MOI</option>
                    <option value="ESOL">ESOL</option>
                </select>
                
                <label style={{margin:"20px 0 10px"}} className="form-label">English Test Certificate (jpg/jpeg):</label>
                <input className="form-input" type="file"  accept=".jpg,.jpeg" {...register("en_result")} required/>
                
                <label className="form-label" htmlFor="test-date">Test Taken Date:</label>
                <input className="form-input" type="date" {...register("exam_taken_time")}required/>

                <label className="form-label" htmlFor="preferred-country">Preferred Country:</label>
                <select className="form-select" {...register("prefered_country")}required>
                    <option value="uk">UK</option>
                    <option value="usa">USA</option>
                    <option value="aus">Australia</option>
                    <option value="canada">Canada</option>
                    <option value="denmark">Denmark</option>
                    <option value="spain">Spain</option>
                    <option value="sweden">Sweden</option>
                    <option value="malta">Malta</option>
                    <option value="hungary">Hungary</option>
                    <option value="portugal">Portugal</option>
                    <option value="france">France</option>
                    <option value="others">Others</option>
                </select>

                <label className="form-label" htmlFor="referral">How did you know about us?</label>
                <select className="form-select" {...register("referral")}>
                    <option value="google">Google</option>
                    <option value="facebook">Facebook</option>
                    <option value="linkedin">LinkedIn</option>
                    <option value="youtube">YouTube</option>
                    <option value="friends">Friends</option>
                    <option value="others">Others</option>
                </select>

                <label className="form-label" htmlFor="referral">Have you ever been refused entry by any country?</label>
                <select className="form-select" {...register("refused")}>
                    <option value="no">No</option>
                    <option value="yes">Yes</option>
                </select>
                
                <label className="form-label" htmlFor="test-date">Refused country name: (If not, then leave the box empty.)</label>
                <input className="form-input" type="text" {...register("country_name")}/>
                
                { postLoading ? <p>Loading...</p> : <input className="form-button" type="submit" value="Proceed"/>}
            </form>
        </div>
        <Footer />
      </div>
    )
}

export default page