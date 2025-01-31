'use client'
import '../../../css/shared/Navbar/Navbar.css'
import logo from"../../../assets/logo.png"
import Image from 'next/image'
import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faBook, faGlobe, faPhone, faXmark } from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react'


const Navbar = () => {
    const [isOpen,setIsOpen] = useState(false)


    const handleNavbar = () =>{
        setIsOpen(!isOpen)
    }
    
    return (
        <div className='nav-holder'>
            <div className="nav-content">
                <Link href="/"><Image className='nav-logo' src={logo} alt="" /></Link>
                <div className={isOpen ? 'nav-links show':'nav-links hide'}>
                    <div className='link-holder'>
                        <Link className='link' href="/Subjects">Subjects</Link>
                    </div>

                    <div className='link-holder'>
                        <p className='link'>Test prep</p>
                        <div className='drop-down'>
                            <div className="drop-down-content">
                                <div className="drop-down-group">
                                    <Link className='drop-down-link' href="/TestPrep/ielts"><FontAwesomeIcon icon={faBook}/> IELTS</Link>
                                    <Link className='drop-down-link' href="/TestPrep/toefl"><FontAwesomeIcon icon={faBook}/> TOEFL</Link>
                                    <Link className='drop-down-link' href="/TestPrep/pte"><FontAwesomeIcon icon={faBook}/> PTE</Link>
                                    <Link className='drop-down-link' href="/TestPrep/oet"><FontAwesomeIcon icon={faBook}/> OET</Link>
                                </div>
                                <div className="drop-down-group">
                                    <Link className='drop-down-link' href="/TestPrep/duolingo"><FontAwesomeIcon icon={faBook}/> DUOLINGO</Link>
                                    <Link className='drop-down-link' href="/TestPrep/gre"><FontAwesomeIcon icon={faBook}/> GRE</Link>
                                    <Link className='drop-down-link' href="/TestPrep/gmat"><FontAwesomeIcon icon={faBook}/> GMAT</Link>
                                </div>
                                <div className="drop-down-group">
                                    <Link className='drop-down-link' href="/TestPrep/sat"><FontAwesomeIcon icon={faBook}/> SAT</Link>
                                    <Link className='drop-down-link' href="/TestPrep/act"><FontAwesomeIcon icon={faBook}/> ACT</Link>
                                    <Link className='drop-down-link' href="/TestPrep/ap"><FontAwesomeIcon icon={faBook}/> AP</Link>
                                </div>
                                <div className="contact-section">
                                    <Link className='contact-section-link' href="/"><FontAwesomeIcon icon={faPhone}/>  Contact</Link>
                                    <Link className='contact-section-link' href="/"><FontAwesomeIcon icon={faPhone}/>  Enquire</Link>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className='link-holder'>
                        <p className='link'>University</p>
                        <div className='drop-down'>
                            <div className="drop-down-content">
                                <div className="drop-down-group">
                                    <Link className='drop-down-link' href="/University/UK"><FontAwesomeIcon icon={faGlobe}/> UK</Link>
                                    <Link className='drop-down-link' href="/University/USA"><FontAwesomeIcon icon={faGlobe}/> USA</Link>
                                    <Link className='drop-down-link' href="/University/Australia"><FontAwesomeIcon icon={faGlobe}/> Australia</Link>
                                    <Link className='drop-down-link' href="/University/Canada"><FontAwesomeIcon icon={faGlobe}/> Canada</Link>
                                </div>
                                <div className="drop-down-group">
                                    <Link className='drop-down-link' href="/"><FontAwesomeIcon icon={faGlobe}/> France</Link>
                                    <Link className='drop-down-link' href="/"><FontAwesomeIcon icon={faGlobe}/> Germany</Link>
                                    <Link className='drop-down-link' href="/"><FontAwesomeIcon icon={faGlobe}/> Itali</Link>
                                    <Link className='drop-down-link' href="/"><FontAwesomeIcon icon={faGlobe}/> Bangladesh</Link>
                                </div>
                                <div className="contact-section">
                                    <Link className='contact-section-link' href="/"><FontAwesomeIcon icon={faPhone}/> Contact</Link>
                                    <Link className='contact-section-link' href="/"><FontAwesomeIcon icon={faPhone}/> Enquire</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div className='link-holder'>
                        <Link className='link' href="/">Centres</Link>
                        <div className='drop-down'>
                            <div className="drop-down-content">
                                <div className="drop-down-group">
                                    <Link className='drop-down-link' href="/">IELTS</Link>
                                    <Link className='drop-down-link' href="/">IELTS</Link>
                                </div>
                                <div className="drop-down-group">
                                    <Link className='drop-down-link' href="/">IELTS</Link>
                                    <Link className='drop-down-link' href="/">IELTS</Link>
                                </div>
                                <div className="drop-down-group">
                                    <Link className='drop-down-link' href="/">IELTS</Link>
                                    <Link className='drop-down-link' href="/">IELTS</Link>
                                </div>
                                <div className="drop-down-group">
                                    <Link className='drop-down-link' href="/">IELTS</Link>
                                    <Link className='drop-down-link' href="/">IELTS</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div className='link-holder'>
                        <Link className='link' href="/Services">Services</Link>
                    </div>

                    
                    <div className='link-holder'>
                        <Link className='link' href="/">Recruitement partner</Link>
                        <div className='drop-down'>
                            <div className="drop-down-content">
                                <div className="drop-down-group">
                                    <Link className='drop-down-link' href="/">Become an agent</Link>
                                </div>
                                <div className="contact-section">
                                    <Link className='contact-section-link' href="/"><FontAwesomeIcon icon={faPhone}/> Contact</Link>
                                    <Link className='contact-section-link' href="/"><FontAwesomeIcon icon={faPhone}/> Enquire</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div className='link-holder'>
                        <Link className='link' href="/">Proceed</Link>
                    </div>
                </div>
                <div className={isOpen ? 'link-items show' :'link-items hide'}>
                    <button>login</button>
                    <button className='dash'>monitor</button>
                </div>
                {
                    isOpen ?
                    <FontAwesomeIcon onClick={handleNavbar} className='menu-icon' icon={faXmark}/>  :
                    <FontAwesomeIcon onClick={handleNavbar} className='menu-icon' icon={faBars}/>
                }
            </div>

        </div>
    )
}

export default Navbar