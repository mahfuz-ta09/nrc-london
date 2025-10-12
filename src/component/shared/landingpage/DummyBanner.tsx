'use client'
import Link from 'next/link'
import '@/css/shared/LandingPage/LandingPage.css'
import { faArrowRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import office from "@/assets/office-image.jpg"

const DummyBanner = () => {
    return (
        <div className="banner">
            <div className="banner-wrapper">
                <div
                    className="banner-item banner-item-show"
                    style={{
                        backgroundImage: `linear-gradient(to bottom, rgba(0, 74, 98) 0%, rgba(0, 0, 0, 0.85) 100%), url(${office.src})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        backgroundRepeat: 'no-repeat',
                    }}
                >
                    <div className="content">
                        <div className="left-section">
                            <div className="title-decoration"></div>

                            <h1 className="banner-title placeholder">
                                NRC Educational Consultants Ltd.
                            </h1>
                            <p className="description placeholder">
                                Your pathway to global education excellence
                            </p>

                            <div className="btn-container">
                                <Link href="/proceed" className="btn-primary">
                                    Start Your Journey <FontAwesomeIcon icon={faArrowRight} />
                                </Link>
                                <Link
                                    href="/recruitment-partner/become-agent"
                                    className="btn-secondary"
                                >
                                    Become an Agent <FontAwesomeIcon icon={faArrowRight} />
                                </Link>
                            </div>

                            <div className="stats-section">
                                <div className="stat-item">
                                    <span className="stat-number">200+</span>
                                    <span className="stat-label">Universities</span>
                                </div>
                                <div className="stat-divider"></div>
                                <div className="stat-item">
                                    <span className="stat-number">30+</span>
                                    <span className="stat-label">Countries</span>
                                </div>
                                <div className="stat-divider"></div>
                                <div className="stat-item">
                                    <span className="stat-number">4+</span>
                                    <span className="stat-label">Years</span>
                                </div>
                            </div>
                        </div>

                        <div className="right-section">
                            <div className="image-wrapper">
                                {/* Optional placeholder image here */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DummyBanner
