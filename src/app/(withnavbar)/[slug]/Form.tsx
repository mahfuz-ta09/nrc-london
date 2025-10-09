'use client'


const Form = () => {
  return (
    <form className="enquire-form">
      <div style={{background:"rgba(0, 66, 66)",padding:"15px",color:'white',borderRadius:'5px'}} className="form-top">
        Ready to take the next step in your educational journey?  
        Fill out the form below and our expert team will reach out to guide you through every step of the process.
      </div>
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
