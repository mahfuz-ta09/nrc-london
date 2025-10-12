'use client'
import '../../../css/shared/Navbar/Navbar.css'
import logo from"../../../assets/nrc.logo.png"
import Image from 'next/image'
import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleDoubleDown, faAngleDoubleUp, faArrowRight, faBars, faCancel, faHome, faPhone, faUser, faXmark } from '@fortawesome/free-solid-svg-icons'
import { useState, useEffect, useRef } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { logOut } from '@/utils/authAction'
import { useUserInfo } from '@/utils/useUserInfo'
import UniNav from './UniNav'
import SubNav from './SubNav'
import { faFacebook } from '@fortawesome/free-brands-svg-icons'

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false)
    const [isDropDown, setIsDropDown] = useState({uni: false, sub: false, test: false})
    const [isScrolled, setIsScrolled] = useState(false)
    const data = useUserInfo()
    const router = useRouter()
    const navRef = useRef<HTMLDivElement>(null)
    const pathname = usePathname()

    useEffect(() => {
        setIsOpen(false)
        setIsDropDown({uni: false, sub: false, test: false})
    }, [router])

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50)
        }
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (navRef.current && !navRef.current.contains(event.target as Node)) {
                setIsDropDown({uni: false, sub: false, test: false})
            }
        }

        if (isDropDown.uni || isDropDown.sub || isDropDown.test) {
            document.addEventListener('mousedown', handleClickOutside)
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [isDropDown])

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden'
        } else {
            document.body.style.overflow = 'unset'
        }
        return () => {
            document.body.style.overflow = 'unset'
        }
    }, [isOpen])

    const handleNavbar = () => {
        setIsOpen((prev) => !prev)
        setIsDropDown({uni: false, sub: false, test: false})
    }

    const handleLogOut = () => {
        logOut()
        router.refresh()
        setIsOpen(false)
    }

    const closeAll = () => {
        setIsOpen(false)
        setIsDropDown({uni: false, sub: false, test: false})
    }

    
    return (
        <div ref={navRef} className={`nav-holder ${isScrolled ? 'nav-scrolled' : ''}`}>
            <div className="nav-head">
                <div className="short-info">
                    <div className="short-icon">
                        <FontAwesomeIcon icon={faFacebook}/>
                    </div>
                    <div className="mobile-email">
                        <h5>+44 2033554453</h5>
                        <h5>info@nrcedu-uk.com</h5>
                    </div>
                </div>
            </div>

            <div className="nav-content">
                <Link href="/" className="navimage" onClick={closeAll}>
                    <Image className='nav-logo' src={logo} alt="NRC Education logo" priority />
                    <div className='nav-text'>
                        <h2>Global University</h2>
                        <h2>Representative</h2>
                    </div>
                </Link>

                <div className={`nav-links ${isOpen ? 'show' : ''}`}>
                    <div className='link-holder'>
                        <Link onClick={closeAll} className={pathname==='/'?'link link-color':'link'} href="/">
                            <FontAwesomeIcon icon={faHome}/> Home
                        </Link>
                    </div>

                    <UniNav isDropDown={isDropDown} setIsDropDown={setIsDropDown} />
                    <SubNav isDropDown={isDropDown} setIsDropDown={setIsDropDown} />

                    <div className='link-holder'>
                        <button 
                            onClick={() => setIsDropDown({uni: false, sub: false, test: !isDropDown.test})} 
                             className={pathname.includes('/test-prep')?'link link-color':'link'} 
                        >
                            Test Prep
                            <FontAwesomeIcon className='link-icon' icon={isDropDown.test ? faAngleDoubleUp : faAngleDoubleDown}/> 
                        </button>
                        <div className={isDropDown.test ? 'drop-down show-dropdown' : 'drop-down'}>
                            <div className="drop-down-content">
                                <button 
                                    onClick={() => setIsDropDown({uni: false, sub: false, test: false})} 
                                    className="dropdown-cancel"
                                    aria-label="Close dropdown"
                                >
                                    <FontAwesomeIcon icon={faCancel}/>
                                </button>
                                <div className="drop-down-group">
                                    <Link onClick={closeAll} className='drop-down-link' href="/test-prep/ielts">
                                        <FontAwesomeIcon icon={faArrowRight}/> IELTS
                                    </Link>
                                    <Link onClick={closeAll} className='drop-down-link' href="/test-prep/toefl">
                                        <FontAwesomeIcon icon={faArrowRight}/> TOEFL
                                    </Link>
                                    <Link onClick={closeAll} className='drop-down-link' href="/test-prep/pte">
                                        <FontAwesomeIcon icon={faArrowRight}/> PTE
                                    </Link>
                                    <Link onClick={closeAll} className='drop-down-link' href="/test-prep/oet">
                                        <FontAwesomeIcon icon={faArrowRight}/> OET
                                    </Link>
                                </div>
                                <div className="drop-down-group">
                                    <Link onClick={closeAll} className='drop-down-link' href="/test-prep/duolingo">
                                        <FontAwesomeIcon icon={faArrowRight}/> Duolingo
                                    </Link>
                                    <Link onClick={closeAll} className='drop-down-link' href="/test-prep/gre">
                                        <FontAwesomeIcon icon={faArrowRight}/> GRE
                                    </Link>
                                    <Link onClick={closeAll} className='drop-down-link' href="/test-prep/gmat">
                                        <FontAwesomeIcon icon={faArrowRight}/> GMAT
                                    </Link>
                                </div>
                                <div className="drop-down-group">
                                    <Link onClick={closeAll} className='drop-down-link' href="/test-prep/sat">
                                        <FontAwesomeIcon icon={faArrowRight}/> SAT
                                    </Link>
                                    <Link onClick={closeAll} className='drop-down-link' href="/test-prep/act">
                                        <FontAwesomeIcon icon={faArrowRight}/> ACT
                                    </Link>
                                    <Link onClick={closeAll} className='drop-down-link' href="/test-prep/apt">
                                        <FontAwesomeIcon icon={faArrowRight}/> APT
                                    </Link>
                                </div>
                                <div className="contact-section">
                                    <Link onClick={closeAll} className='contact-section-link' href="/contact">
                                        <FontAwesomeIcon icon={faPhone}/> Contact
                                    </Link>
                                    <Link onClick={closeAll} className='contact-section-link' href="/dashboard">
                                        <FontAwesomeIcon icon={faUser}/> Profile
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className='link-holder'>
                        <Link onClick={closeAll}  className={pathname==='/blogs'?'link link-color':'link'}  href="/blogs">Blogs</Link>
                    </div>

                    <div className="user-action">
                        {!data?.Uemail ? (
                            <button className='log-control' onClick={() => {
                                router.push('/login')
                                setIsOpen(false)
                            }}>
                                Login
                            </button>
                        ) : (
                            <button className='log-control' onClick={handleLogOut}>
                                Logout
                            </button>
                        )}
                        <button className='dash' onClick={() => {
                            router.push('/dashboard')
                            setIsOpen(false)
                        }}>
                            Dashboard
                        </button>
                    </div>
                </div>

                <button 
                    className='menu-icon' 
                    onClick={handleNavbar}
                    aria-label={isOpen ? 'Close menu' : 'Open menu'}
                >
                    <FontAwesomeIcon icon={isOpen ? faXmark : faBars}/>
                </button>
            </div>
        </div>
    )
}

export default Navbar