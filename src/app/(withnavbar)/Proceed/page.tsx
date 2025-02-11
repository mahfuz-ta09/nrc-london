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
        const insertedData = {
            ...data,
            email: Uemail,
            role: Urole,
        }
        try{
            const res = await postProcessData(insertedData)
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


                <h3>Educational Qualification</h3>
                <div className='table-content'>
                    <table className="table-container">
                        <thead>
                            <tr>
                                <th>Degree</th>
                                <th>Institution</th>
                                <th>Group</th>
                                <th>Result</th>
                                <th>Year</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>SSC</td>
                                <td><input className="form-input" type="text" {...register("ssc_institution")}/></td>
                                <td><input className="form-input" type="text" {...register("ssc_group")}/></td>
                                <td><input className="form-input" type="text" {...register("ssc_result")}/></td>
                                <td><input className="form-input" type="text" {...register("ssc_year")}/></td>
                            </tr>
                            <tr>
                                <td>HSC</td>
                                <td><input className="form-input" type="text" {...register("hsc_institution")}/></td>
                                <td><input className="form-input" type="text" {...register("hsc_group")}/></td>
                                <td><input className="form-input" type="text" {...register("hsc_result")}/></td>
                                <td><input className="form-input" type="text" {...register("hsc_year")}/></td>
                            </tr>
                            <tr>
                                <td>Bachelor</td>
                                <td><input className="form-input" type="text" {...register("Bachelor_institution")}/></td>
                                <td><input className="form-input" type="text" {...register("Bachelor_group")}/></td>
                                <td><input className="form-input" type="text" {...register("Bachelor_result")}/></td>
                                <td><input className="form-input" type="text" {...register("Bachelor_year")}/></td>
                            </tr>
                            <tr>
                                <td>Master</td>
                                <td><input className="form-input" type="text" {...register("master_institution")}/></td>
                                <td><input className="form-input" type="text" {...register("master_group")}/></td>
                                <td><input className="form-input" type="text" {...register("master_result")}/></td>
                                <td><input className="form-input" type="text" {...register("master_year")}/></td>
                            </tr>
                            <tr>
                                <td><input className="form-input" type="text" {...register("other_deg")}/></td>
                                <td><input className="form-input" type="text" {...register("other_institution")}/></td>
                                <td><input className="form-input" type="text" {...register("other_group")}/></td>
                                <td><input className="form-input" type="text" {...register("other_result")}/></td>
                                <td><input className="form-input" type="text" {...register("other_year")}/></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <h3>English Proficiency Test</h3>
                <select className="form-select" id="preferred-country" {...register("en_proficiency")}>
                    <option value="IELTS">IELTS</option>
                    <option value="OIETC">OIETC</option>
                    <option value="DUOLINGO">DUOLINGO</option>
                    <option value="PTE">PTE</option>
                    <option value="TOFEL">TOFEL</option>
                    <option value="MOI">MOI</option>
                    <option value="ESOL">ESOL</option>
                </select>
                
                <div className='table-content'>
                    <table className="">
                        <thead>
                            <tr>
                                <th>Listening</th>
                                <th>Reading</th>
                                <th>Writing</th>
                                <th>Speaking</th>
                                <th>Overall</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td><input className="form-input" type="text" {...register("listening")}/></td>
                                <td><input className="form-input" type="text" {...register("reading")}/></td>
                                <td><input className="form-input" type="text" {...register("writing")}/></td>
                                <td><input className="form-input" type="text" {...register("speaking")}/></td>
                                <td><input className="form-input" type="text" {...register("overall")}/></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                
                <label className="form-label" htmlFor="test-date">Test Taken Date:</label>
                <input className="form-input" type="date" {...register("exam_taken_time")}/>

                <label className="form-label" htmlFor="preferred-country">Preferred Country:</label>
                <select className="form-select" {...register("prefered_country")}>
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
                
                <label className="form-label" htmlFor="test-date">Tell country name: </label>
                <input className="form-input" type="text" {...register("country_name")}/>
                
                { postLoading ? <p>Loading...</p> : <input className="form-button" type="submit" value="Proceed"/>}
            </form>
        </div>
        <Footer />
      </div>
    )
}

export default page