'use client'
import '@/css/HomeApply/HomeApply.css'
import { useRouter } from 'next/navigation'
import SideForm from "@/component/ui/faq/SideForm"

const HomeApply = () => {
    const router = useRouter()
    
    return (
        <section className="home-apply-container">
            <div className="home-apply-overlay"></div>
                <div className="home-apply-content">
                    <div className="apply-left">
                        <p className="subtitle">🌱 Prepare for Your Future</p>
                        <h2 className="home-text-header" style={{color:"#fff"}}><span style={{color:"#76daf3"}}>Apply Now</span> for the Upcoming Intake</h2>
                        <p>
                            Secure your spot at top universities worldwide. Our expert team is ready to guide you 
                            through every step of your application journey — from choosing the right course 
                            to submitting a winning application.
                        </p>
                        <div className="button-container">
                            <button onClick={()=>router.push('/proceed') }>Apply Now</button>
                        </div>
                    </div>

                    <div className="apply-right">
                        <SideForm />
                    </div>
                </div>
        </section>
    )
}

export default HomeApply
