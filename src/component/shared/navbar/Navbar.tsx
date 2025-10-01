'use client'
import '../../../css/shared/Navbar/Navbar.css'
import logo from"../../../assets/nrc.logo.png"
import Image from 'next/image'
import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faBook, faHome, faPhone, faUser, faXmark } from '@fortawesome/free-solid-svg-icons'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { logOut } from '@/utils/authAction'
import { useUserInfo } from '@/utils/useUserInfo'
import UniNav from './UniNav'
import SubNav from './SubNav'

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false)
    const [isScrolled, setIsScrolled] = useState(false)
    const data = useUserInfo()
    const router = useRouter()

    const handleNavbar = () => {
        setIsOpen((prev) => !prev)
    }

    const handleLogOut = () => {
        logOut()
        router.refresh()
    }

    // ✅ Scroll listener for background change
    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 400) {
                setIsScrolled(true)
            } else {
                setIsScrolled(false)
            }
        }
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    return (
        <div className={`nav-holder ${isScrolled ? 'nav-scrolled' : ''}`}>
            <div className="nav-head">
                <div className="mobile-email">
                    <h5>+44 2033554453</h5>
                    <h5>info@nrcedu-uk.com</h5>
                </div>
            </div>
            <div className="nav-content">
                <div className="navimage">
                    <Link href="/"><Image className='nav-logo' src={logo} alt="logo" /></Link>
                    <div className='nav-text'>
                        <h2>Global University</h2>
                        <h2>Representative</h2>
                    </div>
                </div>
                <div className={isOpen ? 'nav-links show':'nav-links hide'}>
                    <div className='link-holder'>
                        <Link onClick={()=>setIsOpen(false)} className='link' href="/"><FontAwesomeIcon icon={faHome}/></Link>
                    </div>

                    <UniNav />
                    <SubNav />

                    <div className='link-holder'>
                        <p className='link'>test prep</p>
                        <div className='drop-down'>
                            <div className="drop-down-content ">
                                <div className="drop-down-group">
                                    <Link onClick={()=>setIsOpen(false)} className='drop-down-link' href="/test-prep/ielts"><FontAwesomeIcon icon={faBook}/> IELTS</Link>
                                    <Link onClick={()=>setIsOpen(false)} className='drop-down-link' href="/test-prep/toefl"><FontAwesomeIcon icon={faBook}/> TOEFL</Link>
                                    <Link onClick={()=>setIsOpen(false)} className='drop-down-link' href="/test-prep/pte"><FontAwesomeIcon icon={faBook}/> PTE</Link>
                                    <Link onClick={()=>setIsOpen(false)} className='drop-down-link' href="/test-prep/oet"><FontAwesomeIcon icon={faBook}/> OET</Link>
                                </div>
                                <div className="drop-down-group">
                                    <Link onClick={()=>setIsOpen(false)} className='drop-down-link' href="/test-prep/duolingo"><FontAwesomeIcon icon={faBook}/> DUOLINGO</Link>
                                    <Link onClick={()=>setIsOpen(false)} className='drop-down-link' href="/test-prep/gre"><FontAwesomeIcon icon={faBook}/> GRE</Link>
                                    <Link onClick={()=>setIsOpen(false)} className='drop-down-link' href="/test-prep/gmat"><FontAwesomeIcon icon={faBook}/> GMAT</Link>
                                </div>
                                <div className="drop-down-group">
                                    <Link onClick={()=>setIsOpen(false)} className='drop-down-link' href="/test-prep/sat"><FontAwesomeIcon icon={faBook}/> SAT</Link>
                                    <Link onClick={()=>setIsOpen(false)} className='drop-down-link' href="/test-prep/act"><FontAwesomeIcon icon={faBook}/> ACT</Link>
                                    <Link onClick={()=>setIsOpen(false)} className='drop-down-link' href="/test-prep/apt"><FontAwesomeIcon icon={faBook}/> APT</Link>
                                </div>
                                <div className="contact-section">
                                    <Link onClick={()=>setIsOpen(false)} className='contact-section-link' href="/contact"><FontAwesomeIcon icon={faPhone}/> Contact</Link>
                                    <Link onClick={()=>setIsOpen(false)} className='contact-section-link' href="/dashboard"><FontAwesomeIcon icon={faUser}/> Profile</Link>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className='link-holder'>
                        <Link onClick={()=>setIsOpen(false)} className='link' href="/blogs">blogs</Link>
                    </div>

                    {/* <div className='link-holder'>
                        <p className='link'>recruitement partner</p>
                        <div className='drop-down'>
                            <div className="drop-down-content">
                                <div className="drop-down-group">
                                    <Link onClick={()=>setIsOpen(false)} className='drop-down-link' href="/recruitment-partner/become-agent">Become an agent</Link>
                                </div>
                                <div className="contact-section">
                                    <Link onClick={()=>setIsOpen(false)} className='contact-section-link' href="/contact"><FontAwesomeIcon icon={faPhone}/> Contact</Link>
                                    <Link onClick={()=>setIsOpen(false)} className='contact-section-link' href="/dashboard"><FontAwesomeIcon icon={faUser}/> Profile</Link>
                                </div>
                            </div>
                        </div>
                    </div> */}

                    {/* <div className='link-holder'>
                        <Link onClick={()=>setIsOpen(false)} className='link' href="/proceed">proceed</Link>
                    </div> */}
                </div>

                <div className={isOpen ? 'link-items show' :'link-items hide'}>
                    {
                        !data?.Uemail
                        ? <button onClick={()=>router.push('/login')}>login</button>
                        : <button onClick={handleLogOut}>logout</button>
                    }
                    <button className='dash' onClick={()=>router.push('/dashboard')}>dashboard</button>
                </div>

                {
                    isOpen
                    ? <FontAwesomeIcon onClick={handleNavbar} className='menu-icon' icon={faXmark}/>
                    : <FontAwesomeIcon onClick={handleNavbar} className='menu-icon' icon={faBars}/>
                }
            </div>
        </div>
    )
}

export default Navbar
