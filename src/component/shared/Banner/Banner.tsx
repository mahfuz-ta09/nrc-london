'use client'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import '../../../css/shared/Banner/Banner.css'
import { faArrowAltCircleRight, faCalendarDays, faGraduationCap, faPlaneDeparture, faSchool } from '@fortawesome/free-solid-svg-icons'
import { useRouter } from 'next/navigation'
import imgBgBanner from '../../../assets/banner-background.png'
import BannerImg from '../../../assets/laptop.webp'
import Image from 'next/image'


const Banner = () => {
    const router = useRouter()


    return (
        <div className="banner-container">
            <Image className="banner-bg" src={imgBgBanner} alt="Banner" />
            <div className="banner-content">
                <div className="banner-part">
                    <h4>Plan your future with us!</h4>
                    <p>Empower yourself with knowledge and build a brighter future. Our comprehensive courses and expert support will guide you every step of the way.</p>
                    <div className="banner-buttons">
                        <button onClick={()=>router.push('/Proceed')} className='banner-button-3rd'>I am a Student</button>
                        <button onClick={()=>router.push('/Contact')} className='banner-button-3rd'>contact</button>
                        <button onClick={()=>router.push('/RecruitmentPartner/Becomeanagent')} className='banner-button-3rd'>Recruitment Partner</button>
                    </div>
                </div>
                {/* <Image className="banner-photo" src={BannerImg} alt="Banner" /> */}
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
                        <h1>70+</h1>
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
                <div className="achiev">
                    <FontAwesomeIcon className='achiev-photo' icon={faGraduationCap} />
                    <div className="achiev-details">
                        <h1>500+</h1>
                        <p>Students</p>
                        <p>Consulted</p>
                    </div>
                </div>
            </div>
            </div>


        </div>
    )
}

export default Banner