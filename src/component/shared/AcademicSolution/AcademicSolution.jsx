'use client'
import { useRouter } from 'next/navigation'
import '../../../css/shared/AcademicSolution/AcademicSolution.css'


const AcademicSolution = () => {
    const router = useRouter()

    return (
        <div className='academicSolution-container'>
            <div className="academicSolution">
                <h1 className='academicSolution-header'>Your one step Academic solution</h1>
                <div className="academic-plans">
                    <div className="single-plan">
                        <img className="plan-image" src="https://i.ibb.co.com/CKr8VM26/pexels-photo-577585.jpg" alt="Find Your Ideal Study Path" />
                        <h2 className="plan-header">Find the Perfect Study Path</h2>
                        <p className="plan-addition">
                            Choosing the right course and institution is crucial for your success. Our expert consultants help 
                            you identify the best academic programs that align with your goals, interests, and career aspirations.
                        </p>
                    </div>
                    
                    <div className="single-plan">
                        <img className="plan-image" src="https://i.ibb.co.com/dJ0gdkK1/pexels-photo-590041.jpg" alt="Prepare for Success" />
                        <h2 className="plan-header">Prepare for a Smooth Admission Process</h2>
                        <p className="plan-addition">
                            We provide comprehensive support to help you ace your university interviews, prepare strong 
                            application documents, and meet all admission requirements with confidence.
                        </p>
                    </div>
                    
                    <div className="single-plan">
                        <img className="plan-image" src="https://i.ibb.co.com/sd0yFDPk/log.webp" alt="Confidently Take the Next Step" />
                        <h2 className="plan-header">Take the Leap Towards Your Future</h2>
                        <p className="plan-addition">
                            Our commitment doesn’t end with your admission. We offer ongoing support, from visa guidance 
                            to settling into your new academic environment, ensuring you are well-prepared for the journey ahead.
                        </p>
                    </div>
                </div>

                <button onClick={()=>router.push('/Services')} className='plan-button'>see our services</button>
            </div>
        </div>
    )
}

export default AcademicSolution