import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import '../../../css/shared/Banner/Banner.css'
import { faArrowAltCircleRight } from '@fortawesome/free-solid-svg-icons'
import Image from 'next/image'
import logo from"../../../assets/home.svg"


const Banner = () => {
    return (
        <div className="banner-container">
            <div className="banner-content">
                <div className="banner-part">
                    <h4>Lorem ipsum dolor sit</h4>
                    <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Deleniti voluptas temporibus alias adipisci, assumenda officiis cupiditate facilis.</p>
                    <div className="banner-buttons">
                        <button className='banner-button-3rd'>Recruitment Partner?</button>
                        <button className='banner-button-3rd'>Represent University?</button>
                        <button className='banner-button-3rd'>I am a Student <FontAwesomeIcon icon={faArrowAltCircleRight} /></button>
                    </div>
                </div>
                <Image className='banner-picture' src={logo} alt="Home Banner" />
            </div>


        </div>
    )
}

export default Banner