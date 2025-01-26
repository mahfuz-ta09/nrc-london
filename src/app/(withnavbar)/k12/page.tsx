'use client'
import Footer from '@/component/shared/Footer/Footer'
import FAQ from '@/component/UI/FAQ/FAQ'
import '@/css/k12/k12.css'
import '@/css/TestPrep/CommonStyle.css'
import { faPen } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useState } from 'react'


const Page = () => {
    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        phone: "",
        country: "",
        state: "",
        message: "",
        agreed: false,
    })


    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target

        setFormData({
            ...formData,
            [name]: type === "checkbox" && e.target instanceof HTMLInputElement ? e.target.checked : value,
        })
    }
    
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(formData);
    }

    const faqItems = [
        {
          question: "What is the meaning of life?",
          answer: "42",
        },
        {
          question: "How much wood would a woodchuck chuck?",
          answer: "A woodchuck would chuck all the wood he could chuck, if a woodchuck could chuck wood!",
        },
        {
          question: "What happens if Pinocchio says, 'my nose will grow now'?",
          answer: "This is a paradox that has puzzled philosophers and fairy tale enthusiasts alike!",
        },
        {
          question: "What happens if Pinocchio says, 'my nose will grow now'?",
          answer: "This is a paradox that has puzzled philosophers and fairy tale enthusiasts alike!",
        },
    ]

    return (
        <div className='k12-container'>
            <div className="test-banner">
                <div className="test-banner-container">
                    <div className="test-banner-content">
                        <h1 className='header-abbri'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae, rem!</h1>
                        <h1 className='header-addition'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae, rem!</h1>
                    </div>
                    <form className="enquire-form" onSubmit={handleSubmit}>
                            <h2>Enquire Now</h2>
                            <input
                                type="text"
                                name="fullName"
                                placeholder="Enter Full Name*"
                                value={formData.fullName}
                                onChange={handleChange}
                                required
                            />
                            <input
                                type="email"
                                name="email"
                                placeholder="Enter mail id*"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                            <div className="phone-input">
                                <span>+91</span>
                                <input
                                type="tel"
                                name="phone"
                                placeholder="Phone number*"
                                value={formData.phone}
                                onChange={handleChange}
                                required
                                />
                            </div>
                            <select
                                name="country"
                                value={formData.country}
                                onChange={handleChange}
                            >
                                <option value="UK">UK</option>
                                <option value="UK">UK</option>
                                <option value="Canada">Canada</option>
                            </select>
                            <select
                                name="state"
                                value={formData.state}
                                onChange={handleChange}
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
                                value={formData.message}
                                onChange={handleChange}
                                required
                            ></textarea>
                            <div className="checkbox-group">
                                <input
                                type="checkbox"
                                name="agreed"
                                checked={formData.agreed}
                                onChange={handleChange}
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
            </div>

            <div className="k12-content wdth">
                <h1 className='k12-header'>Lorem ipsum <span>sit amet consectetur</span></h1>
            
                <div className="k12-content-main">
                    <div className="k12-text">
                        <h1>
                            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nemo eveniet tempore quae 
                            alias dignissimos. Suscipit et dicta inventore cumque. Excepturi eveniet nemo nihil 
                            deleniti cumque aperiam sapiente obcaecati totam ratione, enim rem in asperiores nam 
                            odit aliquam tenetur saepe ea voluptatibus sit, natus quia, maxime laborum commodi
                        </h1> 
                        <h1> 
                            exercitationem. Aperiam, magnam?Lorem, ipsum dolor sit amet consectetur adipisicing 
                            elit. Adipisci eum libero dolorum soluta nostrum neque fuga ipsum? Magni, at culpa!
                            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nemo eveniet tempore quae 
                            alias dignissimos. Suscipit et dicta inventore cumque. Excepturi eveniet nemo nihil 
                        </h1>
                        <h1>
                            deleniti cumque aperiam sapiente obcaecati totam ratione, enim rem in asperiores nam 
                            odit aliquam tenetur saepe ea voluptatibus sit, natus quia, maxime laborum commodi 
                            exercitationem. Aperiam, magnam?Lorem, ipsum dolor sit amet consectetur adipisicing 
                            elit. Adipisci eum libero dolorum soluta nostrum neque fuga ipsum? Magni, at culpa!
                        </h1>
                    </div>
                    <img src="https://i.ibb.co.com/ZL4xB6Y/Untitled-design-1-removebg-preview.png" alt="" />
                </div>
            </div>

            <div className="k12-addition">
                <div className="wdth ">
                    <h1 className='k12-header'>Lorem ipsum <span>sit amet consectetur</span></h1>
                    
                    <div className='k12-addition-des'>
                        <h1>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Obcaecati tempore rem 
                            facilis! Dolorem neque beatae est nobis quis, officiis incidunt qui, libero suscipit, 
                            totam possimus iste a perferendis voluptate quos?
                            facilis! Dolorem neque beatae est nobis quis, officiis incidunt qui, libero suscipit, 
                            totam possimus iste a perferendis voluptate quos?
                        </h1>

                        <ul>
                            <li><FontAwesomeIcon icon={faPen}/>Lorem, ipsum dolor sit amet consectetur adipisicing elit.</li>
                            <li><FontAwesomeIcon icon={faPen}/>Lorem, ipsum dolor sit amet consectetur adipisicing elit.</li>
                            <li><FontAwesomeIcon icon={faPen}/>Lorem, ipsum dolor sit amet consectetur adipisicing elit.</li>
                            <li><FontAwesomeIcon icon={faPen}/>Lorem, ipsum dolor sit amet consectetur adipisicing elit.</li>
                        </ul>
                        <h1>
                            totam possimus iste a perferendis voluptate quos?
                            facilis! Dolorem neque beatae est nobis quis, officiis incidunt qui, libero suscipit, 
                            totam possimus iste a perferendis voluptate quos?
                        </h1>

                    </div>

                    <div className='k12-addition-detail'>

                        <div className='k12-addition-detail-1'>
                            <h1>Lorem ipsum <span>sit amet consectetur</span></h1>
                    
                            <ul>
                                <li><FontAwesomeIcon icon={faPen}/>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Lorem ipsum dolor sit amet.</li>
                                <li><FontAwesomeIcon icon={faPen}/>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Lorem ipsum dolor sit amet.</li>
                                <li><FontAwesomeIcon icon={faPen}/>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Lorem ipsum dolor sit amet.</li>
                                <li><FontAwesomeIcon icon={faPen}/>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Lorem ipsum dolor sit amet.</li>
                                <li><FontAwesomeIcon icon={faPen}/>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Lorem ipsum dolor sit amet.</li>
                                <li><FontAwesomeIcon icon={faPen}/>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Lorem ipsum dolor sit amet.</li>
                            </ul>
                        </div>

                        <div className='k12-addition-detail-1'>
                            <h1>Lorem ipsum <span>sit amet consectetur</span></h1>
                    
                            <ul>
                                <li><FontAwesomeIcon icon={faPen}/>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Lorem ipsum dolor sit amet.</li>
                                <li><FontAwesomeIcon icon={faPen}/>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Lorem ipsum dolor sit amet.</li>
                                <li><FontAwesomeIcon icon={faPen}/>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Lorem ipsum dolor sit amet.</li>
                                <li><FontAwesomeIcon icon={faPen}/>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Lorem ipsum dolor sit amet.</li>
                                <li><FontAwesomeIcon icon={faPen}/>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Lorem ipsum dolor sit amet.</li>
                                <li><FontAwesomeIcon icon={faPen}/>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Lorem ipsum dolor sit amet.</li>
                            </ul>
                        </div>
                        
                    </div>

                </div>
            </div>

            <FAQ items={faqItems} title="Frequently Asked Questions"/>
            <Footer />
        </div>
    )
}

export default Page