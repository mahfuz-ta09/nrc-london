'use client'
import { SubmitHandler, useForm } from 'react-hook-form'
import Footer from '@/component/shared/Footer/Footer'
import '@/css/TestPrep/CommonStyle.css'
import '@/css/Proceed/Proceed.css'
import { usePostProcessDataMutation } from '@/redux/endpoints/proceed/proceedEndpoints'
import { toast } from 'react-toastify'


type test_type = {
    IELTS: string,
    OIETC: string,
    DUOLINGO: string,
    PTE: string,
    TOFEL: string,
    MOI: string,
    ESOL: string
}

type Ref = {
    google:string,
    facebook:string,
    linkedin:string,
    youtube:string,
    friends:string,
    others:string,
}

type Refused = {
    no:string,
    yes:string,
}

type country_type = {
    uk:string,
    usa:string,
    aus:string,
    canada:string,
    denmark:string,
    spain:string,
    sweden:string,
    malta:string,
    hungary:string,
    portugal:string,
    france:string,
    others:string,
}

interface IFormInput {
    name: string;
    mobile_number: string;
    emergency_number: string;
    age: number;
    email: string;
    db:number;
    ssc_institution:string;
    ssc_group:string;
    ssc_result:string;
    hsc_institution:string;
    hsc_group:string;
    hsc_result:string;
    other_deg:string;
    other_institution:string;
    other_group:string;
    other_result:string;
    master_institution:string;
    master_group:string;
    master_result:string;
    en_proficiency:test_type;
    listening:string;
    reading:string;
    writing:string;
    speaking:string;
    exam_taken_time:string;
    prefered_country: country_type;
    referral: Ref;
    refused: Refused;
    country_name:string;
}



const page = () => {
    const { register , reset, handleSubmit } = useForm<IFormInput>()
    const [ postProcessData , { isLoading: postLoading }]= usePostProcessDataMutation()

    const onSubmit: SubmitHandler<IFormInput> = async(data) => {
        console.log(data)
        try{
            const res = await postProcessData(data)
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
                <input className="form-input" type="email" {...register("email")} required/>

                <label className="form-label" htmlFor="dob">Date of Birth:</label>
                <input className="form-input" type="date" {...register("db")} required/>


                <h3>Educational Qualification</h3>

                <table className="table-container">
                    <thead>
                        <tr>
                            <th>Degree</th>
                            <th>Institution</th>
                            <th>Group</th>
                            <th>Result</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>SSC</td>
                            <td><input className="form-input" type="text" {...register("ssc_institution")}/></td>
                            <td><input className="form-input" type="text" {...register("ssc_group")}/></td>
                            <td><input className="form-input" type="text" {...register("ssc_result")} required/></td>
                        </tr>
                        <tr>
                            <td>HSC</td>
                            <td><input className="form-input" type="text" {...register("hsc_institution")}/></td>
                            <td><input className="form-input" type="text" {...register("hsc_group")}/></td>
                            <td><input className="form-input" type="text" {...register("hsc_result")}/></td>
                        </tr>
                        <tr>
                            <td>Bachelor</td>
                            <td><input className="form-input" type="text" {...register("hsc_institution")}/></td>
                            <td><input className="form-input" type="text" {...register("hsc_group")}/></td>
                            <td><input className="form-input" type="text" {...register("hsc_result")}/></td>
                        </tr>
                        <tr>
                            <td>Master</td>
                            <td><input className="form-input" type="text" {...register("master_institution")}/></td>
                            <td><input className="form-input" type="text" {...register("master_group")}/></td>
                            <td><input className="form-input" type="text" {...register("master_result")}/></td>
                        </tr>
                        <tr>
                            <td><input className="form-input" type="text" {...register("other_deg")}/></td>
                            <td><input className="form-input" type="text" {...register("other_institution")}/></td>
                            <td><input className="form-input" type="text" {...register("other_group")}/></td>
                            <td><input className="form-input" type="text" {...register("other_result")}/></td>
                        </tr>
                    </tbody>
                </table>

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
                
                <table className="">
                    <thead>
                        <tr>
                            <th>Listening</th>
                            <th>Reading</th>
                            <th>Writing</th>
                            <th>speaking</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td><input className="form-input" type="text" {...register("listening")}/></td>
                            <td><input className="form-input" type="text" {...register("reading")}/></td>
                            <td><input className="form-input" type="text" {...register("writing")}/></td>
                            <td><input className="form-input" type="text" {...register("speaking")}/></td>
                        </tr>
                    </tbody>
                </table>

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
                
                <input className="form-button" type="submit" value="Proceed"/>
            </form>
        </div>
        <Footer />
      </div>
    )
}

export default page