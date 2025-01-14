'use client'
import '../../../css/shared/Navbar/Navbar.css'
import logo from"../../../assets/logo.png"
import Image from 'next/image'
import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faXmark } from '@fortawesome/free-solid-svg-icons'
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
                        <Link className='link' href="/">k-12</Link>
                    </div>
                    
                    <div className='link-holder'>
                        <p className='link'>Test prep</p>
                        <div className='drop-down'>
                            <div className="drop-down-content">
                                <div className="drop-down-group">
                                    <Link className='drop-down-link' href="/TestPrep/ielts">IELTS</Link>
                                    <Link className='drop-down-link' href="/TestPrep/toefl">TOEFL</Link>
                                    <Link className='drop-down-link' href="/TestPrep/pte">PTE</Link>
                                    <Link className='drop-down-link' href="/TestPrep/oet">OET</Link>
                                </div>
                                <div className="drop-down-group">
                                    <Link className='drop-down-link' href="/TestPrep/duolingo">DUOLINGO</Link>
                                    <Link className='drop-down-link' href="/TestPrep/gre">GRE</Link>
                                    <Link className='drop-down-link' href="/TestPrep/gmat">GMAT</Link>
                                </div>
                                <div className="drop-down-group">
                                    <Link className='drop-down-link' href="/TestPrep/sat">SAT</Link>
                                    <Link className='drop-down-link' href="/TestPrep/act">ACT</Link>
                                    <Link className='drop-down-link' href="/TestPrep/ap">AP</Link>
                                </div>
                                <div className="drop-down-group">
                                    {/* <Link className='drop-down-link' href="/">IELTS</Link>
                                    <Link className='drop-down-link' href="/">IELTS</Link> */}
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div className='link-holder'>
                        <Link className='link' href="/">Students</Link>
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
                        <Link className='link' href="/">Services</Link>
                    </div>

                    
                    <div className='link-holder'>
                        <Link className='link' href="/">Partner with us</Link>
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
                        <Link className='link' href="/">News</Link>
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