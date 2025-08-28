'use client'
import Link from 'next/link'
import '@/css/shared/LandingPage/LandingPage.css';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const DummyBanner = () => {
  return (
              <div className="banner">
                  <div className="banner-wrapper">
                      <div
                          className="banner-item banner-item-show"
                          style={{
                              backgroundImage: `linear-gradient(135deg, rgba(46, 125, 50, 0.8), rgba(27, 94, 32, 0.6)), url('/images/dummy-banner.jpg')`,
                              backgroundSize: "cover",
                              backgroundPosition: "center",
                              backgroundRepeat: "no-repeat",
                          }}
                      >
                          <div className="content">
                              <div className="left-section">
                                  <h1 className="banner-title">
                                      Dummy <br /> Banner Title
                                  </h1>
                              </div>
                          </div>
  
                          <div className="diagonal-cut">
                              <div className="action-links slide">
                                  <Link className="action-link" href="/Proceed">
                                      apply now <FontAwesomeIcon icon={faArrowRight} className="fas fa-arrow-right"/>
                                  </Link>
                                  <Link className="action-link" href="/RecruitmentPartner/Becomeanagent">
                                      work as an agent <FontAwesomeIcon icon={faArrowRight} className="fas fa-arrow-right"/>
                                  </Link>
                              </div>
                              <div className="right-section">
                                  <div className="content-box">
                                      <p className="main-heading">Dummy Banner Heading</p>
                                      <p className="description">This is placeholder text for the banner description.</p>
                                  </div>
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
          )
    
  
}

export default DummyBanner
