'use client'
import Footer from '@/component/shared/Footer/Footer'
import '@/css/Contact/contact.css'
import { faFacebook, faInstagram, faTwitter } from '@fortawesome/free-brands-svg-icons'
import { faEnvelope, faHome, faMailBulk, faMapMarkerAlt, faPhone } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'



const page = () => {
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log();
    }
    
    
    return (
        <div className="contact-container">
            <div className="contact-banner ">
                <div className="contact wdth">
                    <h1>Contact</h1>
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
                
                <form className="enquire-form" onSubmit={handleSubmit}>
                                <h2>Enquire Now</h2>
                                <input
                                    type="text"
                                    name="fullName"
                                    placeholder="Enter Full Name*"
                                    required
                                />
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="Enter mail id*"
                                    required
                                />
                                <div className="phone-input">
                                    <span>+91</span>
                                    <input
                                    type="tel"
                                    name="phone"
                                    placeholder="Phone number*"
                                    required
                                    />
                                </div>
                                <select
                                    name="country"
                                >
                                    <option value="UK">UK</option>
                                    <option value="UK">UK</option>
                                    <option value="Canada">Canada</option>
                                </select>
                                <select
                                    name="state"
                                    required
                                >
                                    <option value="">Select State*</option>
                                    <option value="Delhi">Delhi</option>
                                    <option value="California">California</option>
                                    <option value="Ontario">Ontario</option>
                                </select>
                                <textarea
                                    name="message"
                                    placeholder="Message*"
                                    required
                                ></textarea>
                                <div className="checkbox-group">
                                    <input
                                    type="checkbox"
                                    name="agreed"
                                    required
                                    />
                                    <label>
                                    I have read and agreed to{" "}
                                    <a href="/terms" target="_blank" rel="noopener noreferrer">
                                        terms
                                    </a>{" "}
                                    &{" "}
                                    <a href="/privacy" target="_blank" rel="noopener noreferrer">
                                        privacy policy
                                    </a>
                                    </label>
                                </div>
                                <button type="submit" className="submit-button">
                                    Submit
                                </button>
                </form>
            </div>

            <Footer />
        </div>
    )
}

export default page