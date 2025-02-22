'use client'
import Footer from '@/component/shared/Footer/Footer'
import '@/css/Services/Services.css'
import { useRouter } from 'next/navigation'


const Page = () => {
    const router = useRouter()
    
    return (
      <div className='services-container'>
        <div className="services-banner">
          <div className="services-banner-content wdth">
            <h1>Comprehensive Services for Success</h1>
            <p>Explore your limits with us</p>
            <button onClick={() => router.push('/Contact')}>Contact</button>
          </div>
        </div>
        
        <div className="service-content wdth">
            <p>
              We provide expert guidance for students aspiring to study abroad, assisting with university selection, 
              visa processing, scholarship applications, and pre-departure preparations. Our dedicated team ensures a 
              smooth journey from application to enrollment, offering personalized support every step of the way.
            </p>
            <p>
              Our services include comprehensive visa consultation, document preparation, and interview coaching to 
              maximize your chances of approval. We also offer assistance with accommodation arrangements, travel 
              planning, and cultural adaptation to help you transition smoothly into your new academic journey. With 
              our expert support, studying abroad becomes a hassle-free experience."Let me know if you need any refinements!
            </p>

              
            <ul className="services-list">
                <li><span>✔</span> Personalized Consultation – Expert guidance on choosing the right study destination and program.</li>
                <li><span>✔</span> Visa Assistance – Complete support for visa application, documentation, and interviews.</li>
                <li><span>✔</span> Accommodation & Travel – Help with finding housing, travel arrangements, and settling in.</li>
                <li><span>✔</span> Scholarship Guidance – Assistance in securing financial aid and scholarships.</li>
                <li><span>✔</span> Post-Arrival Support – Ongoing help with cultural adaptation, career advice, and more.</li>
            </ul>
        </div>
        
        <div className="specialties">
            <h1 className="specialties-header">Our Areas of Specialization</h1>
            <div className="area-specialties wdth">
                <div className="specialties-card">
                    <img className="sp-card-img" src="https://i.ibb.co/WW6r7v8/Untitled-design-removebg-preview.png" alt="Study Abroad Consultation" />
                    <h1>Study Abroad Consultation</h1>
                    <p>Expert guidance on choosing the right country, university, and program tailored to your goals.</p>
                </div>
                <div className="specialties-card">
                    <img className="sp-card-img" src="https://i.ibb.co/WW6r7v8/Untitled-design-removebg-preview.png" alt="Visa Application Support" />
                    <h1>Visa Application Support</h1>
                    <p>Comprehensive assistance with visa documentation, submission, and interview preparation.</p>
                </div>
                <div className="specialties-card">
                    <img className="sp-card-img" src="https://i.ibb.co/WW6r7v8/Untitled-design-removebg-preview.png" alt="Scholarship Assistance" />
                    <h1>Scholarship Assistance</h1>
                    <p>Helping students find and apply for the best scholarship opportunities to reduce financial burdens.</p>
                </div>
                <div className="specialties-card">
                    <img className="sp-card-img" src="https://i.ibb.co/WW6r7v8/Untitled-design-removebg-preview.png" alt="Post-Arrival Support" />
                    <h1>Post-Arrival Support</h1>
                    <p>Guidance on accommodation, part-time jobs, cultural adaptation, and networking opportunities.</p>
                </div>
            </div>
        </div>

        <Footer />
      </div>
    )
}


export default Page