'use client'
import { useSendEmailMutation } from '@/redux/endpoints/profile/profileEndpoints'
import { useForm, SubmitHandler } from "react-hook-form"
import { useUserInfo } from '@/utils/useUserInfo'
import { toast } from 'react-toastify'
import '@/css/Contact/contact.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope, faMapMarkerAlt, faPhone } from '@fortawesome/free-solid-svg-icons'
import { faFacebook, faInstagram, faTwitter } from '@fortawesome/free-brands-svg-icons'




type Inputs = {
    fullName: string;
    phone: string;
    country: string;
    state: string;
    message: string;
}
const Content = () => {
    const { register, handleSubmit, reset, formState: { errors } } = useForm<Inputs>()
    const [ sendEmail , {  isLoading: emailLoading } ] = useSendEmailMutation()
    const user = useUserInfo()


    const onSubmit: SubmitHandler<Inputs> = async(data:any) => {
        if(!user?.Uemail){
            toast.error("You must login or signup!")
        }else{
            try{
                data.email=user?.Uemail
                const res = await sendEmail({ data: data })
                reset()
                if(res?.data?.success==='false'){
                    toast.error("Faild to send message!")
                }else{
                    toast.success("Message sent!")
                }
            }catch(err){
                console.log(err)
            }
        }
    }


    return (
        <div className="contact-body wdth">
            <div className="enquire-div">
                <h2 className="contact-heading">Contact Us</h2>
                
                <div className="contact-info">
                    <p>
                        <FontAwesomeIcon icon={faPhone} className="icon phone-icon" />
                        <a href="tel:+0999000000">+44 2033554453</a>
                    </p>
                    <p>
                        <FontAwesomeIcon icon={faEnvelope} className="icon email-icon" />
                        <a href="info@nrcedu-uk.com">info@nrcedu-uk.com</a>
                    </p>
                    <p>
                        <FontAwesomeIcon icon={faMapMarkerAlt} className="icon address-icon" />
                        <span>101 WhiteChapel Road, London</span>
                    </p>
                    <p>
                        <span>E17RA, London Borough of hackney</span>
                    </p>
                    <p>
                        <span>United Kingdom</span>
                    </p>
                </div>
                <div className="social-icons">
                    <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                        <FontAwesomeIcon icon={faInstagram} className="social-icon instagram" />
                    </a>
                    <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                        <FontAwesomeIcon icon={faFacebook} className="social-icon facebook" />
                    </a>
                    <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                        <FontAwesomeIcon icon={faTwitter} className="social-icon twitter" />
                    </a>
                </div>
                <div className="map-container">
                    <iframe
                        className="google-map"
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d9912.71203967644!2d-0.06612502165619698!3d51.51957267102453!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x487603612bd528b9%3A0xc3e8d4b0c9eb6c1f!2s101%20Whitechapel%20Rd%2C%20London%20E1%207RA%2C%20UK!5e0!3m2!1sen!2sbd!4v1708561723928"
                        allowFullScreen
                        loading="lazy"
                    ></iframe>
                </div>
            </div>

            <hr />

            <form className="enquire-form" onSubmit={handleSubmit(onSubmit)}>
                <h2>Enquire Now</h2>
                <input type="text" placeholder="Enter Full Name*" {...register("fullName", { required: "Full Name is required" })} />
                {errors.fullName && <p className="error">{errors.fullName.message}</p>}
                <input type="tel" placeholder="Phone Number*, include country code" {...register("phone", { required: "Phone number is required" })} />
                {errors.phone && <p className="error">{errors.phone.message}</p>}
                <input type="text" placeholder="Your Country" {...register("country", { required: "Country is required" })} />
                {errors.country && <p className="error">{errors.country.message}</p>}
                
                <input type="email" placeholder="Your Email" value={user?.Uemail} readOnly />
                <input type="text" placeholder="State*" {...register("state", { required: "State is required" })} />
                {errors.state && <p className="error">{errors.state.message}</p>}
                <textarea style={{minHeight:"20vh"}} placeholder="Message*" {...register("message", { required: "Message is required" })}></textarea>
                {errors.message && <p className="error">{errors.message.message}</p>}
                {emailLoading?  <p>Lading...</p> : <input type="submit" className="submit-button" value="Send" />}
            </form>
        </div>
    )
}

export default Content
