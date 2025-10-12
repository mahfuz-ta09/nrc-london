"use client"
import Link from 'next/link'
import '@/css/HomeAgentReq/HomeAgentReq.css'

const HomeAgentReq = () => {
    return (
        <section className="home-agentReq-container">
            <div className="home-agent-req-content">
                <p className="agent-subtitle">🔮 Partner With Us</p>
                <h2  className='home-text-header' >Become a Trusted <span style={{color:"#76daf3"}}>Recruitment Partner</span></h2>
                <p className="agent-description">
                    Join our global network of education agents and help students unlock their international academic dreams. 
                    Gain access to exclusive resources, competitive commissions, and dedicated support every step of the way.
                </p>
                <Link className='home-agent-link' href='/recruitment-partner/become-agent'>
                    Start the Process
                </Link>
            </div>
        </section>
    )
}

export default HomeAgentReq
