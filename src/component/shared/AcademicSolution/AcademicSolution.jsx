"use client"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import '../../../css/shared/AcademicSolution/AcademicSolution.css'
import { faBookOpen, faGlobe, faListCheck, faUsers } from '@fortawesome/free-solid-svg-icons'
import Link from 'next/link'

const services = [
  {
    icon: faBookOpen,
    title: "Expert Consultation",
    description:
      "Get personalized guidance from our experienced team to help you make informed decisions.",
  },
  {
    icon: faGlobe,
    title: "Global Network",
    description:
      "Access a strong network of partners, institutions, and opportunities across the globe.",
  },
  {
    icon:faUsers,
    title: "Dedicated Support",
    description:
      "Our team is with you every step of the way — from your first inquiry to final success.",
  },
  {
    icon: faListCheck,
    title: "Reliable & Transparent",
    description:
      "We maintain clear processes, honest communication, and dependable service you can trust.",
  },
]

const ServicesSection = () => {
  return (
    <section className="services-section">
      <div className="services-container">
        <div className="services-header">
        <h4 className="option-subtitle">✨ what we offer</h4>
          <h2 className='home-text-header' style={{color:"#000"}}>Our <span>Services</span></h2>
          <p>
            Explore our range of services designed to support your educational and career journey from start to finish.
          </p>
        </div>

        <div className="services-grid">
          {services.map((service, index) => (
            <div className="service-card" key={index}>
              <div className="service-icon"><FontAwesomeIcon icon={service.icon}/></div>
              <h3>{service.title}</h3>
              <p>{service.description}</p>
            </div>
          ))}
        </div>


        <div className="services-btn-wrapper">
          <Link href="/services" className="services-btn">
            View All Services
          </Link>
        </div>
      </div>
    </section>
  )
}

export default ServicesSection
