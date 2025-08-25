'use client'
import { SubmitHandler, useForm } from 'react-hook-form'
import Footer from '@/component/shared/Footer/Footer'
import '@/css/Proceed/Proceed.css'
import { usePostProcessDataMutation } from '@/redux/endpoints/proceed/proceedEndpoints'
import { toast } from 'react-toastify'
import { useUserInfo } from '@/utils/useUserInfo'
import { IFormInput } from '@/types/common'
import Loader from '@/component/shared/Loader/Loader'




const page = () => {
    const { register , reset, handleSubmit } = useForm<IFormInput>()
    const [ postProcessData , { isLoading: postLoading }]= usePostProcessDataMutation()
    const { Uemail , Urole } = useUserInfo()


    if(postLoading) return <Loader />

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
      <div className="container">
        <div className="form-container">
            <div className="form-wrapper">
                <div className="floating-elements"></div>
                <h2 className="form-header">Student Registration Form</h2>

                <div className="form-content">
                    <form id="studentForm" onSubmit={handleSubmit(onSubmit)}>
                    
                    {/* Personal Information Section */}
                    <div className="form-section">
                        <h3 className="section-title">Personal Information</h3>

                        <div className="form-group">
                        <label className="form-label required">Name</label>
                        <input className="form-input" type="text" {...register("name")}/>
                        </div>

                        <div className="form-row">
                        <div className="form-group">
                            <label className="form-label required">Mobile Number</label>
                            <input className="form-input" type="number" {...register("mobile_number")}/>
                        </div>

                        <div className="form-group">
                            <label className="form-label required">Emergency Number</label>
                            <input className="form-input" type="number" {...register("emergency_number")}/>
                        </div>
                        </div>

                        <div className="form-row">
                            <div className="form-group">
                                <label className="form-label required">Email</label>
                                <input className="form-input" type="email" value={Uemail} readOnly />
                            </div>

                            <div className="form-group">
                                <label className="form-label required">Date of Birth</label>
                                <input className="form-input" type="date" {...register("dob")}/>
                            </div>
                        </div>
                    </div>

                    {/* Educational Qualification Section */}
                    <div className="form-section">
                        <h3 className="section-title">Educational Qualification</h3>

                        <div className="form-group">
                            <label className="form-label required">SSC Certificate (jpg/jpeg)</label>
                            <input className="form-input" type="file" accept=".jpg,.jpeg" {...register("ssc_result")}/>
                        </div>

                        <div className="form-group">
                            <label className="form-label">HSC Certificate (jpg/jpeg)</label>
                            <input className="form-input" type="file" accept=".jpg,.jpeg" {...register("hsc_result")} />
                        </div>

                        <div className="form-group">
                            <label className="form-label">Bachelor Certificate (jpg/jpeg)</label>
                            <input className="form-input" type="file" accept=".jpg,.jpeg" {...register("bachelor_result")} />
                        </div>

                        <div className="form-group">
                            <label className="form-label">Master Certificate (jpg/jpeg)</label>
                            <input className="form-input" type="file" accept=".jpg,.jpeg" {...register("masters_result")} />
                        </div>

                        <div className="form-group">
                            <label className="form-label">Other Degree Certificate (jpg/jpeg)</label>
                            <input className="form-input" type="file" accept=".jpg,.jpeg" {...register("other_result")} />
                        </div>
                    </div>

                    {/* English Proficiency Section */}
                    <div className="form-section">
                        <h3 className="section-title">English Proficiency Test</h3>

                        <div className="form-row">
                            <div className="form-group">
                                <label className="form-label required">Test Type</label>
                                <select className="form-select" {...register("en_proficiency")} required>
                                <option value="IELTS">IELTS</option>
                                <option value="OIETC">OIETC</option>
                                <option value="DUOLINGO">DUOLINGO</option>
                                <option value="PTE">PTE</option>
                                <option value="TOFEL">TOFEL</option>
                                <option value="MOI">MOI</option>
                                <option value="ESOL">ESOL</option>
                                </select>
                            </div>

                            <div className="form-group">
                                <label className="form-label required">Test Taken Date</label>
                                <input className="form-input" type="date" {...register("exam_taken_time")}/>
                            </div>
                        </div>

                        <div className="form-group">
                            <label className="form-label required">English Test Certificate (jpg/jpeg)</label>
                            <input className="form-input" type="file" accept=".jpg,.jpeg" {...register("en_result")}/>
                        </div>
                    </div>

                    {/* Preferences Section */}
                    <div className="form-section">
                        <h3 className="section-title">Preferences</h3>

                        <div className="form-group">
                            <label className="form-label required">Preferred Country</label>
                            <select className="form-select" {...register("prefered_country")} required>
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
                        </div>

                        <div className="form-group">
                            <label className="form-label">How did you know about us?</label>
                            <select className="form-select" {...register("referral")}>
                                <option value="google">Google</option>
                                <option value="facebook">Facebook</option>
                                <option value="linkedin">LinkedIn</option>
                                <option value="youtube">YouTube</option>
                                <option value="friends">Friends</option>
                                <option value="others">Others</option>
                            </select>
                        </div>

                        <div className="form-group">
                            <label className="form-label">Have you ever been refused entry by any country?</label>
                            <select className="form-select" {...register("refused")}>
                                <option value="no">No</option>
                                <option value="yes">Yes</option>
                            </select>
                        </div>

                        <div className="form-group">
                            <label className="form-label">Refused Country Name (if any)</label>
                            <input className="form-input" type="text" {...register("country_name")} />
                        </div>
                    </div>

                    {/* Submit Section */}
                    <div className="form-section">
                        {postLoading ? (
                        <p>Loading...</p>
                        ) : (
                        <button className="form-button" type="submit">
                            Proceed
                        </button>
                        )}
                    </div>
                    </form>
                </div>
            </div>
        </div>

        <Footer />
    </div>

    )
}

export default page