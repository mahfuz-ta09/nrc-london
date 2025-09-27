'use client'

const Form = () => {
  return (
    <form className="enquire-form">
        <h2>Enquire Now</h2>
        <input type="text" placeholder="Enter Full Name*" />
        {/* {errors.fullName && <p className="error">{errors.fullName.message}</p>} */}
        <input type="tel" placeholder="Phone Number*, include country code" />
        {/* {errors.phone && <p className="error">{errors.phone.message}</p>} */}
        <input type="text" placeholder="Your Country" />
        {/* {errors.country && <p className="error">{errors.country.message}</p>} */}
        
        <input type="email" placeholder="Your Email"  readOnly />
        <input type="text" placeholder="State*"/>
        {/* {errors.state && <p className="error">{errors.state.message}</p>} */}
        <textarea style={{minHeight:"20vh"}} placeholder="Message*"></textarea>
        {/* {errors.message && <p className="error">{errors.message.message}</p>} */}
        <input type="submit" className="submit-button" value="Send" />
    </form>
  )
}

export default Form
