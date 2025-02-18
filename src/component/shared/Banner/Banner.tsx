'use client'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import '../../../css/shared/Banner/Banner.css'
import { faArrowAltCircleRight, faCalendarDays, faPlaneDeparture, faSchool } from '@fortawesome/free-solid-svg-icons'
import { useRouter } from 'next/navigation'


const Banner = () => {
    const router = useRouter()


    return (
        <div className="banner-container">
            <img className='banner-bg' src="https://i.ibb.co.com/j98rcS4b/bg.png" alt="" />
            <div className="banner-content">
                <div className="banner-part">
                    <h4>Plan your future with us!</h4>
                    <p>Empower yourself with knowledge and build a brighter future. Our comprehensive courses and expert support will guide you every step of the way.</p>
                    <div className="banner-buttons">
                        <button onClick={()=>router.push('/RecruitmentPartner/Becomeanagent')} className='banner-button-3rd'>Recruitment Partner?</button>
                        <button onClick={()=>router.push('/Proceed')} className='banner-button-3rd'>I am a Student <FontAwesomeIcon icon={faArrowAltCircleRight} /></button>
                    </div>
                </div>
                <img className='banner-photo' src="https://i.ibb.co.com/V0gmz1S6/laptop.webp" alt='Laptop'/>
            </div>

            <div className="banner-addition">
                <div className="achiev">
                    <FontAwesomeIcon className='achiev-photo' icon={faPlaneDeparture}/>
                    <div className="achiev-details">
                        <h1>30+</h1>
                        <p>Study</p>
                        <p>Destination</p>
                    </div>
                </div>
                <div className="achiev">
                    <FontAwesomeIcon className='achiev-photo' icon={faSchool}/>
                    <div className="achiev-details">
                        <h1>300+</h1>
                        <p>Global</p>
                        <p>Institutions</p>
                    </div>
                </div>
                <div className="achiev">
                    <FontAwesomeIcon className='achiev-photo' icon={faCalendarDays} />
                    <div className="achiev-details">
                        <h1>24/7</h1>
                        <p>Online</p>
                        <p>Presence</p>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Banner