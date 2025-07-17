import '@/css/HomeAboutUs/AboutUs.css'
import logo from"../../../assets/nrc.logo.png"
import office from"../../../assets/office-image.jpg"
import Image from 'next/image'
import Link from 'next/link'

const AboutUs = () => {
  return (
    <div className='speciality-container'>
            <div className="specialty-section">
                <div className='specialty-content'>

                    <div className="second-half">
                        {/* <img className='second-half-img' src="https://images.pexels.com/photos/23496627/pexels-photo-23496627/free-photo-of-group-of-friends-taking-selfie-in-office.jpeg"  alt="logo" /> */}
                        <Image className='second-half-img' src={office} alt="logo" />
                        <Image className='second-half-img-logo' src={logo} alt="logo" />
                    </div>

                    <div className="first-half">
                        <h1  className="first-half-text">Our mission & vision</h1>
                        <h1  className="first-half-header"><span>at</span>NRC Educational Consultants Ltd.</h1>
                        <p>
                            At NRC Educational Consultants Ltd., we are committed to guiding individuals toward global 
                            opportunities through trusted visa and education consultancy services. Our mission is to 
                            simplify the journey abroad with integrity and personalized support, while our vision is to 
                            be a leading partner in turning international dreams into reality.
                        </p>
                        <Link className='contact-contact' href="/Contact">contact</Link>
                        <Link className='contact-about' href="/AboutUs">About us</Link>
                    </div>

                </div>
            </div>
        </div>
  )
}

export default AboutUs