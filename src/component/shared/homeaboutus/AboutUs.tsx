"use client"
import '@/css/HomeAboutUs/AboutUs.css'
import office from "@/assets/office-image.jpg"
import logo from '@/assets/nrc.logo.png'
import Link from 'next/link'

const AboutUs = () => {
    return (
      <div className="speciality-container">
        <div className="specialty-section">
          <div className="specialty-content">
            
            <div className="first-half">
              <p className="first-half-text">Our Mission & Vision</p>
              <h2 className="home-text-header">
                <span className="at">at</span>
                <span className="name"> NRC </span>
                Educational Consultants Ltd.
              </h2>

              <p className="first-half-description">
                we are committed to guiding individuals toward global 
                opportunities through trusted visa and education consultancy services. Our mission is to 
                simplify the journey abroad with integrity and personalized support, while our vision is to 
                be a leading partner in turning international dreams into reality.
              </p>

              <div className="about-links">
                <Link className="contact-contact" href="/contact">Contact</Link>
                <Link className="contact-about" href="/about-us">About Us</Link>
              </div>
            </div>

            <div className="second-half">
              <div className="image-wrapper-about">
                <img className="second-half-top-img" src={office.src} alt="Office"/>
                <div className="logo-overlay">
                  <img className="second-half-img" src={office.src} alt="Office"/>
                  <img className="second-half-img-logo" src={logo.src} alt="NRC Logo" />
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    )
}

export default AboutUs
