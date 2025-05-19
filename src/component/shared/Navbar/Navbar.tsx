'use client'
import '../../../css/shared/Navbar/Navbar.css'
import logo from"../../../assets/nrc.logo.png"
import Image from 'next/image'
import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faBook, faHome, faPhone, faUser, faXmark } from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { logOut } from '@/utils/authAction'
import { useUserInfo } from '@/utils/useUserInfo'
import UniNav from './UniNav'
import SubNav from './SubNav'




const Navbar = () => {
    const [isOpen,setIsOpen] = useState(false)
    const data = useUserInfo()
    const router=useRouter()

    
    const handleNavbar = () =>{
        setIsOpen((prev) => !prev)
    }
    

    const handleLogOut = () =>{
        logOut()
        router.refresh()
    }
    
    return (
        <div className='nav-holder'>
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

                    <SubNav />
                    <div className='link-holder'>
                        <p className='link'>Test prep</p>
                        <div className='drop-down'>
                            <div className="drop-down-content ">
                                <div className="drop-down-group">
                                    <Link onClick={()=>setIsOpen(false)} className='drop-down-link' href="/TestPrep/ielts"><FontAwesomeIcon icon={faBook}/> IELTS</Link>
                                    <Link onClick={()=>setIsOpen(false)} className='drop-down-link' href="/TestPrep/toefl"><FontAwesomeIcon icon={faBook}/> TOEFL</Link>
                                    <Link onClick={()=>setIsOpen(false)} className='drop-down-link' href="/TestPrep/pte"><FontAwesomeIcon icon={faBook}/> PTE</Link>
                                    <Link onClick={()=>setIsOpen(false)} className='drop-down-link' href="/TestPrep/oet"><FontAwesomeIcon icon={faBook}/> OET</Link>
                                </div>
                                <div className="drop-down-group">
                                    <Link onClick={()=>setIsOpen(false)} className='drop-down-link' href="/TestPrep/duolingo"><FontAwesomeIcon icon={faBook}/> DUOLINGO</Link>
                                    <Link onClick={()=>setIsOpen(false)} className='drop-down-link' href="/TestPrep/gre"><FontAwesomeIcon icon={faBook}/> GRE</Link>
                                    <Link onClick={()=>setIsOpen(false)} className='drop-down-link' href="/TestPrep/gmat"><FontAwesomeIcon icon={faBook}/> GMAT</Link>
                                </div>
                                <div className="drop-down-group">
                                    <Link onClick={()=>setIsOpen(false)} className='drop-down-link' href="/TestPrep/sat"><FontAwesomeIcon icon={faBook}/> SAT</Link>
                                    <Link onClick={()=>setIsOpen(false)} className='drop-down-link' href="/TestPrep/act"><FontAwesomeIcon icon={faBook}/> ACT</Link>
                                    <Link onClick={()=>setIsOpen(false)} className='drop-down-link' href="/TestPrep/apt"><FontAwesomeIcon icon={faBook}/> APT</Link>
                                </div>
                                <div className="contact-section">
                                    <Link onClick={()=>setIsOpen(false)} className='contact-section-link' href="/Contact"><FontAwesomeIcon icon={faPhone}/> Contact</Link>
                                    <Link onClick={()=>setIsOpen(false)} className='contact-section-link' href="/Dashboard"><FontAwesomeIcon icon={faUser}/> Profile</Link>
                                </div>
                            </div>
                        </div>
                    </div>

                    <UniNav />
                    
                    <div className='link-holder'>
                        <p className='link'>Recruitement partner</p>
                        <div className='drop-down'>
                            <div className="drop-down-content">
                                <div className="drop-down-group">
                                    <Link onClick={()=>setIsOpen(false)} className='drop-down-link' href="/RecruitmentPartner/Becomeanagent">Become an agent</Link>
                                </div>
                                <div className="contact-section">
                                    <Link onClick={()=>setIsOpen(false)} className='contact-section-link' href="/Contact"><FontAwesomeIcon icon={faPhone}/> Contact</Link>
                                    <Link onClick={()=>setIsOpen(false)} className='contact-section-link' href="/Dashboard"><FontAwesomeIcon icon={faUser}/> Profile</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div className='link-holder'>
                        <Link onClick={()=>setIsOpen(false)} className='link' href="/Proceed">Proceed</Link>
                    </div>
                </div>
                <div className={isOpen ? 'link-items show' :'link-items hide'}>
                    {
                        !data?.Uemail ?<button onClick={()=>router.push('/Login')}>login</button>  :
                        <button onClick={()=>handleLogOut()}>logout</button>
                    }
                    <button className='dash' onClick={()=>router.push('/Dashboard')}>dashboard</button>
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