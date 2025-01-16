'use client'
import FAQ from '@/component/additional/FAQ/FAQ';
import Footer from '@/component/shared/Footer/Footer';
import '@/css/TestPrep/CommonStyle.css'
import { usePathname } from "next/navigation"
import { useEffect, useState } from 'react'

interface TestType {
    name: string;
    full_abbreviation: string;
    targetAudience?:string;
    purpose: string;
    description?: string;
    format?:any
    types?:[
        {
            type:string,
            description:string,
        }
    ]
    details?:{
        purpose_of_test?: string;
    }
}


const Page = () => {
    const pathname= usePathname()
    const paths= pathname.split('/')
    const [test, setTest] = useState<TestType | undefined>(undefined);

    useEffect(() => {
        fetch('/t.json')
            .then((res) => res.json())
            .then((data: TestType[]) => {
                if (paths[2]) {
                    setTest(data.find((s) => s?.name?.toLowerCase() === paths[2].toLowerCase()))
                } else {
                    console.error("Invalid path segment:", paths[2])
                }
            })
            .catch((error) => console.error("Failed to fetch data:", error));
    }, []);
    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        phone: "",
        country: "",
        state: "",
        message: "",
        agreed: false,
      });
    
      const handleChange = (e:any) => {
        const { name, value, type, checked } = e.target;
        setFormData({
          ...formData,
          [name]: type === "checkbox" ? checked : value,
        });
      };
    
      const handleSubmit = (e:any) => {
        e.preventDefault();
        // Handle form submission
        console.log(formData);
      }

      console.log(test)
    
    return (
        <div className='element-container'>
            <div className="test-banner">
                <div className="test-banner-container">
                    <div className="test-banner-content">
                        <h1 className='test-banner-content-header'>{test?.name}</h1>
                        <h1 className='header-abbri'>{test?.full_abbreviation}</h1>
                        <p className='header-addition'>{test?.purpose}</p>
                        <p className='header-addition'>{test?.purpose}</p>
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

            <div className="details-container">

                page:{pathname}
                <div className="questions">

                    <div className="question">
                        <h1 className="question-main">What is the <span>purpose of ielts?</span></h1>
                        <p className="answer">{test?.targetAudience} Lorem ipsum dolor sit, amet consectetur adipisicing elit. Illo accusamus ab nisi pariatur voluptates, molestiae ut quibusdam ullam sunt aliquid tempora error hic sit. Reiciendis harum corrupti, minima, officiis ex deleniti quisquam vitae natus nisi deserunt nostrum provident adipisci recusandae.
                        </p>
                        <h1 className="question-main">Types of <span>{test?.name} test</span></h1>
                        <p className="answer">Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit doloribus esse quas, mollitia delectus amet temporibus cum eum veritatis dolore illo sequi fuga fugit doloremque necessitatibus molestiae consequuntur? Vero beatae et quasi libero sequi omnis debitis minus cupiditate modi rem.</p>
                    </div>

                    <div className="type-container">
                        <div className="types">
                            {
                                test?.types?.map((item, index) => (
                                    <div className='type' key={index}>
                                        <h1 className='type-header'>{item?.type}</h1>
                                        <h1 className='type-details'>{item?.description}</h1>
                                    </div>
                                ))
                            }
                        </div>
                        <table>
                            <thead>
                                <tr>
                                    <th>Module</th>
                                    <th>Sections</th>
                                    <th>Questions</th>
                                    <th>Duration</th>
                                    <th>Focus</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    test?.format?.map((item:any,index:number)=>(
                                        <tr key={index}>
                                            <td>{item?.module? item?.module :"--"}</td>
                                            <td>{item?.sections? item?.sections :"--"}</td>
                                            <td>{item?.questions? item?.questions :"--"}</td>
                                            <td>{item?.duration? item?.duration :"--"}</td>
                                            <td>{item?.focus? item?.focus :"--"}</td>
                                        </tr>))
                                }
                            </tbody>
                        </table>
                    </div>

                </div>
                
                <div className="question">
                        <h1 className="question-main">{test?.name?.toLocaleLowerCase()} scoring <span>scoring patterns</span></h1>
                        <p className="answer">
                            {test?.targetAudience} Lorem ipsum dolor sit, amet consectetur adipisicing elit. Illo accusamus ab nisi pariatur voluptates, molestiae ut quibusdam ullam sunt aliquid tempora error hic sit. Reiciendis harum corrupti, minima, officiis ex deleniti quisquam vitae natus nisi deserunt nostrum provident adipisci recusandae.
                        </p>
                </div>
                <table>
                            <thead>
                                <tr>
                                    <th>Module</th>
                                    <th>Sections</th>
                                    <th>Questions</th>
                                    <th>Duration</th>
                                    <th>Focus</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    test?.format?.map((item:any,index:number)=>(
                                        <tr key={index}>
                                            <td>{item?.module? item?.module :"--"}</td>
                                            <td>{item?.sections? item?.sections :"--"}</td>
                                            <td>{item?.questions? item?.questions :"--"}</td>
                                            <td>{item?.duration? item?.duration :"--"}</td>
                                            <td>{item?.focus? item?.focus :"--"}</td>
                                        </tr>))
                                }
                            </tbody>
                        </table>
            </div>
            <FAQ />
            <Footer />
        </div>
        
    )
}

export default Page


