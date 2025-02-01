import Footer from '@/component/shared/Footer/Footer'
import '@/css/Proceed/Proceed.css'

const page = () => {
    return (
      <div>
        <div className="container wdth">
            <h2 className="form-header">Student Registration Form</h2>
            <form>
                <label className="form-label" htmlFor="name">Name:</label>
                <input className="form-input" type="text" id="name" name="name" required/>

                <label className="form-label" htmlFor="mobile">Mobile Number:</label>
                <input className="form-input" type="text" id="mobile" name="mobile" required/>

                <label className="form-label" htmlFor="emergency">Emergency Number:</label>
                <input className="form-input" type="text" id="emergency" name="emergency" required/>

                <label className="form-label" htmlFor="email">Email:</label>
                <input className="form-input" type="email" id="email" name="email" required/>

                <label className="form-label" htmlFor="dob">Date of Birth:</label>
                <input className="form-input" type="date" id="dob" name="dob" required/>

                <h3>Educational Qualification</h3>
                <label className="form-label" htmlFor="degree">Degree:</label>
                <input className="form-input" type="text" id="degree" name="degree"/>

                <label className="form-label" htmlFor="institution">Institution Name:</label>
                <input className="form-input" type="text" id="institution" name="institution"/>

                <label className="form-label" htmlFor="group">Group:</label>
                <input className="form-input" type="text" id="group" name="group"/>

                <label className="form-label" htmlFor="passing-year">Passing Year:</label>
                <input className="form-input" type="text" id="passing-year" name="passing-year"/>

                <label className="form-label" htmlFor="result">Result:</label>
                <input className="form-input" type="text" id="result" name="result"/>

                <h3>English Proficiency Test</h3>
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
                
                <button className="form-button" type="submit">Submit</button>
            </form>
        </div>
        <Footer />
      </div>
    )
}

export default page