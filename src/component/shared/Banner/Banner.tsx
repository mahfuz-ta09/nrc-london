import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import '../../../css/shared/Banner/Banner.css'
import { faArrowAltCircleRight } from '@fortawesome/free-solid-svg-icons'
import Image from 'next/image'
import banner from '../../../assets/laptop.webp'
import building from '../../../assets/buildingsvg.svg'
import student from '../../../assets/student.svg'
import map from '../../../assets/map.svg'


const Banner = () => {
    return (
        <div className="banner-container">
            <div className="banner-content">
                <div className="banner-part">
                    <h4>Plan your future with us!</h4>
                    <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Deleniti voluptas temporibus alias adipisci, assumenda officiis cupiditate facilis.</p>
                    <div className="banner-buttons">
                        <button className='banner-button-3rd'>Recruitment Partner?</button>
                        <button className='banner-button-3rd'>Represent University?</button>
                        <button className='banner-button-3rd'>I am a Student <FontAwesomeIcon icon={faArrowAltCircleRight} /></button>
                    </div>
                </div>
                <Image className='banner-photo' src={banner} alt='Laptop'/>
            </div>

            <div className="banner-addition">
                <div className="achiev">
                <Image className='achiev-photo' src={map} alt='University'/>
                    <div className="achiev-details">
                        <h1>30+</h1>
                        <p>Study</p>
                        <p>Destination</p>
                    </div>
                </div>
                <div className="achiev">
                <Image className='achiev-photo' src={building} alt='University'/>
                    <div className="achiev-details">
                        <h1>300+</h1>
                        <p>Partnered</p>
                        <p>Universities</p>
                    </div>
                </div>
                <div className="achiev">
                <Image className='achiev-photo' src={student} alt='University'/>
                    <div className="achiev-details">
                        <h1>5k+</h1>
                        <p>Enrolled</p>
                        <p>Students</p>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Banner