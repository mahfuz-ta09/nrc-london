'use client'
import Link from 'next/link'
import '@/css/shared/LandingPage/LandingPage.css';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import office from "images/office-image.jpg"

const DummyBanner = () => {
  return (
        <div className="banner">
            <div className="banner-wrapper">
                <div
                    className="banner-item banner-item-show"
                    style={{
                        backgroundImage: `linear-gradient(135deg, rgba(0, 44, 58, 0.8), rgba(0, 28,37, 0.6)),)`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        backgroundRepeat: "no-repeat",
                    }}>
                    <div className="content">
                        <div className="left-section">
                            <h1 className="banner-title">
                                Your Journey to<br/> the World Starts Here.
                            </h1>
                        </div>
                    </div>
                   
                    <div className="diagonal-cut">
                        <div className="action-links-dummy slide">
                            <Link className="action-link" href="/proceed">
                                apply now <FontAwesomeIcon icon={faArrowRight} className="fas fa-arrow-right"/>
                            </Link>
                            <Link className="action-link" href="/recruitment-partner/become-agent">
                                work as an agent <FontAwesomeIcon icon={faArrowRight} className="fas fa-arrow-right"/>
                            </Link>
                        </div>
                            <div className="right-section-dummy">
                                <div className="content-box-dummy">
                                    <p className="main-heading-dummy">Study Abroad With Confidence</p>
                                    <p className="description-dummy">
                                        Unlock world-class education opportunities, experience global cultures, and build a brighter future. 
                                        We guide you from application to arrival.
                                    </p>
                                </div>
                            </div>

                    </div>
                </div>
            </div>
        </div>
    )
        
}

export default DummyBanner