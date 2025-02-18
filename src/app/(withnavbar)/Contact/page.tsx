'use client'
import { useRef } from 'react'
import Footer from '@/component/shared/Footer/Footer'
import '@/css/Contact/contact.css'
import { faFacebook, faInstagram, faTwitter } from '@fortawesome/free-brands-svg-icons'
import { faEnvelope, faMapMarkerAlt, faPhone } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useForm, SubmitHandler } from "react-hook-form"
import emailjs from '@emailjs/browser'

type Inputs = {
    fullName: string;
    email: string;
    phone: string;
    country: string;
    state: string;
    message: string;
}

const ContactPage = () => {
    const formRef = useRef<HTMLFormElement>(null);

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<Inputs>()

    const onSubmit: SubmitHandler<Inputs> = () => {
        if (!formRef.current) return
        emailjs.sendForm(
            'YOUR_SERVICE_ID', 
            'YOUR_TEMPLATE_ID', 
            formRef.current,
            'YOUR_PUBLIC_KEY'
        )
        .then(() => {
            console.log('SUCCESS!')
            alert("Message sent successfully!")
        })
        .catch(error => {
            console.error('FAILED...', error.text)
            alert("Failed to send message.")
        })
    }

    return (
        <div className="contact-container">
            <div className="contact-banner">
                <div className="contact wdth">
                    <h1>Be in touch with us</h1>
                </div>
            </div>

            <div className="contact-body wdth">
                <div className="enquire-div">
                    <h2 className="contact-heading">Contact Us</h2>
                    
                    <div className="contact-info">
                        <p>
                            <FontAwesomeIcon icon={faPhone} className="icon phone-icon" />
                            <a href="tel:+0999000000">+0999000000</a>
                        </p>
                        <p>
                            <FontAwesomeIcon icon={faEnvelope} className="icon email-icon" />
                            <a href="mailto:nrc@gmail.com">nrc@gmail.com</a>
                        </p>
                        <p>
                            <FontAwesomeIcon icon={faMapMarkerAlt} className="icon address-icon" />
                            <span>123 NRC Street, City, Country</span>
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
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3151.835434509374!2d144.96305791531642!3d-37.81627917975148!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad65d5df012c9fb%3A0x5045675218cee40!2sMelbourne%20VIC%2C%20Australia!5e0!3m2!1sen!2sbd!4v1633875952989"
                            allowFullScreen
                            loading="lazy"
                        ></iframe>
                    </div>
                </div>

                <hr />

                <form ref={formRef} className="enquire-form" onSubmit={handleSubmit(onSubmit)}>
                    <h2>Enquire Now</h2>
                    <input type="text" placeholder="Enter Full Name*" {...register("fullName", { required: "Full Name is required" })} />
                    {errors.fullName && <p className="error">{errors.fullName.message}</p>}

                    <input type="email" placeholder="Enter Email*" {...register("email", { required: "Email is required" })} />
                    {errors.email && <p className="error">{errors.email.message}</p>}

                    <input type="tel" placeholder="Phone Number*, include country code" {...register("phone", { required: "Phone number is required" })} />
                    {errors.phone && <p className="error">{errors.phone.message}</p>}

                    <input type="text" placeholder="Your Country" {...register("country", { required: "Country is required" })} />
                    {errors.country && <p className="error">{errors.country.message}</p>}

                    <input type="text" placeholder="State*" {...register("state", { required: "State is required" })} />
                    {errors.state && <p className="error">{errors.state.message}</p>}

                    <textarea placeholder="Message*" {...register("message", { required: "Message is required" })}></textarea>
                    {errors.message && <p className="error">{errors.message.message}</p>}

                    <input type="submit" className="submit-button" value="Send" />
                </form>
            </div>

            <Footer />
        </div>
    )
}

export default ContactPage;
