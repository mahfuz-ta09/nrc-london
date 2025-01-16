import { useState } from 'react'
import './EnquireForm.css' 

const EnquireForm = () => {
    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        phone: "",
        country: "",
        state: "",
        message: "",
        agreed: false,
      });
    
      const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;

        setFormData({
            ...formData,
            [name]: type === "checkbox" && e.target instanceof HTMLInputElement ? e.target.checked : value,
        })
    };
    
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(formData);
    }
    return (
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
    )
}

export default EnquireForm