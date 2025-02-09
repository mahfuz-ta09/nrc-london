'use client'
import Footer from '@/component/shared/Footer/Footer'
import '@/css/Proceed/Proceed.css'
import { SubmitHandler, useForm } from 'react-hook-form';


interface IFormInput {
    firstName: string;
    name: string;
    age: number;
}



const page = () => {
    const { register , handleSubmit } = useForm<IFormInput>();
    const onSubmit: SubmitHandler<IFormInput> = data => console.log(data)


    return (
      <div>
        <div className="container wdth">
            <h2 className="form-header">Student Registration Form</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
                <label className="form-label" htmlFor="name">Name:</label>
                <input className="form-input" type="text" {...register("name")} required/>

                <label className="form-label" htmlFor="mobile">Mobile Number:</label>
                <input className="form-input" type="number" {...register("name")} required/>

                <label className="form-label" htmlFor="emergency">Emergency Number:</label>
                <input className="form-input" type="text" id="emergency" name="emergency" required/>

                <label className="form-label" htmlFor="email">Email:</label>
                <input className="form-input" type="email" id="email" name="email" required/>

                <label className="form-label" htmlFor="dob">Date of Birth:</label>
                <input className="form-input" type="date" id="dob" name="dob" required/>


                <h3>Educational Qualification</h3>

                <table className="">
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
                            <td><input className="form-input" type="text" id="name" name="name"/></td>
                            <td><input className="form-input" type="text" id="name" name="name"/></td>
                            <td><input className="form-input" type="text" id="name" name="name"/></td>
                        </tr>
                        <tr>
                            <td>HSC</td>
                            <td><input className="form-input" type="text" id="name" name="name"/></td>
                            <td><input className="form-input" type="text" id="name" name="name"/></td>
                            <td><input className="form-input" type="text" id="name" name="name"/></td>
                        </tr>
                        <tr>
                            <td>Bachelor</td>
                            <td><input className="form-input" type="text" id="name" name="name"/></td>
                            <td><input className="form-input" type="text" id="name" name="name"/></td>
                            <td><input className="form-input" type="text" id="name" name="name"/></td>
                        </tr>
                        <tr>
                            <td>Master</td>
                            <td><input className="form-input" type="text" id="name" name="name"/></td>
                            <td><input className="form-input" type="text" id="name" name="name"/></td>
                            <td><input className="form-input" type="text" id="name" name="name"/></td>
                        </tr>
                        <tr>
                            <td><input className="form-input" type="text" id="name" name="name"/></td>
                            <td><input className="form-input" type="text" id="name" name="name"/></td>
                            <td><input className="form-input" type="text" id="name" name="name"/></td>
                            <td><input className="form-input" type="text" id="name" name="name"/></td>
                        </tr>
                    </tbody>
                </table>

                <h3>English Proficiency Test</h3>
                
                <table className="">
                    <thead>
                        <tr>
                            <th>Test</th>
                            <th>Listening</th>
                            <th>Reading</th>
                            <th>Writing</th>
                            <th>WritingSpeaking</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>
                                <select className="form-select" id="preferred-country" name="preferred-country">
                                    <option value="IELTS">IELTS</option>
                                    <option value="OIETC">OIETC</option>
                                    <option value="DUOLINGO">DUOLINGO</option>
                                    <option value="PTE">PTE</option>
                                    <option value="TOFEL">TOFEL</option>
                                    <option value="MOI">MOI</option>
                                    <option value="ESOL">ESOL</option>
                                </select>
                            </td>
                            <td><input className="form-input" type="text" id="name" name="name"/></td>
                            <td><input className="form-input" type="text" id="name" name="name"/></td>
                            <td><input className="form-input" type="text" id="name" name="name"/></td>
                            <td><input className="form-input" type="text" id="name" name="name"/></td>
                        </tr>
                    </tbody>
                </table>

                <label className="form-label" htmlFor="test-date">Test Taken Date:</label>
                <input className="form-input" type="date" id="test-date" name="test-date"/>

                <label className="form-label" htmlFor="preferred-country">Preferred Country:</label>
                <select className="form-select" id="preferred-country" name="preferred-country">
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
                <select className="form-select" id="referral" name="referral">
                    <option value="google">Google</option>
                    <option value="facebook">Facebook</option>
                    <option value="linkedin">LinkedIn</option>
                    <option value="youtube">YouTube</option>
                    <option value="friends">Friends</option>
                    <option value="others">Others</option>
                </select>

                <label className="form-label" htmlFor="referral">Have you ever been refused entry by any country?</label>
                <select className="form-select" id="referral" name="referral">
                    <option value="no">No</option>
                    <option value="yes">Yes</option>
                </select>
                
                <label className="form-label" htmlFor="test-date">Tell country name: </label>
                <input className="form-input" type="text" id="text" name="text"/>
                
                <button className="form-button" type="submit">Submit</button>
            </form>
        </div>
        <Footer />
      </div>
    )
}

export default page