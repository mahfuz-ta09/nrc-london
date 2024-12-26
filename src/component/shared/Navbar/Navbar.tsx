'use client'
import '../../../css/shared/Navbar/Navbar.css'
import logo from"../../../assets/logo.png"
import Image from 'next/image'
import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'
import { useEffect, useState } from 'react'


const Navbar = () => {
    const [isOpen,setIsOpen] = useState(false)
    const [navBg, setNavBg] = useState(false);

    useEffect(() => {
        window.addEventListener('scroll', changeNavBg);
        return () => {
          window.removeEventListener('scroll', changeNavBg);
        }
    }, [])

    const changeNavBg = () => {
        // window.scrollY >= 80 ? setNavBg(true) : setNavBg(false);
        if(window.scrollY >= 80){
            setNavBg(true)
        }else{
            setNavBg(false)
        }
    }

    const handleNavbar = () =>{
        setIsOpen(!isOpen)
    }

    return (
        <div className={navBg?'nav-holder nav-color':'nav-holder'}>
            <div className="nav-content">
                <Image className='nav-logo' src={logo} alt="" />
                <div className={isOpen ? 'nav-links show':'nav-links hide'}>
                    <div className='link-holder'>
                        <Link className='link' href="/">k-12</Link>
                    </div>
                    
                    <div className='link-holder'>
                        <Link className='link' href="/">Test prep</Link>
                        <div className='drop-down'>
                            <Link className='drop-down-link' href="/">IELTS</Link>
                            <Link className='drop-down-link' href="/">IELTS</Link>
                            <Link className='drop-down-link' href="/">IELTS</Link>
                            <Link className='drop-down-link' href="/">IELTS</Link>
                            <Link className='drop-down-link' href="/">IELTS</Link>
                        </div>
                    </div>
                    
                    <div className='link-holder'>
                        <Link className='link' href="/">Students</Link>
                        <div className='drop-down'>
                            <Link className='drop-down-link' href="/">IELTS</Link>
                            <Link className='drop-down-link' href="/">IELTS</Link>
                            <Link className='drop-down-link' href="/">IELTS</Link>
                            <Link className='drop-down-link' href="/">IELTS</Link>
                            <Link className='drop-down-link' href="/">IELTS</Link>
                        </div>
                    </div>
                    
                    <div className='link-holder'>
                        <Link className='link' href="/">Centers</Link>
                        <div className='drop-down'>
                            <Link className='drop-down-link' href="/">IELTS</Link>
                            <Link className='drop-down-link' href="/">IELTS</Link>
                            <Link className='drop-down-link' href="/">IELTS</Link>
                            <Link className='drop-down-link' href="/">IELTS</Link>
                            <Link className='drop-down-link' href="/">IELTS</Link>
                        </div>
                    </div>
                    
                    <div className='link-holder'>
                        <Link className='link' href="/">Services</Link>
                    </div>

                    
                    <div className='link-holder'>
                        <Link className='link' href="/">Partner with us</Link>
                        <div className='drop-down'>
                            <Link className='drop-down-link' href="/">IELTS</Link>
                            <Link className='drop-down-link' href="/">IELTS</Link>
                            <Link className='drop-down-link' href="/">IELTS</Link>
                            <Link className='drop-down-link' href="/">IELTS</Link>
                            <Link className='drop-down-link' href="/">IELTS</Link>
                        </div>
                    </div>
                    
                    <div className='link-holder'>
                        <Link className='link' href="/">News</Link>
                    </div>
                </div>
                <div className={isOpen ? 'link-items show' :'link-items hide'}>
                    <button>login</button>
                    <button className='dash'>monitor</button>
                    {/* <FontAwesomeIcon  className='icon' icon={faUser} /> */}
                </div>
                <FontAwesomeIcon onClick={handleNavbar} className='menu-icon' icon={faBars}/>
            </div>
            
        </div>
    )
}

export default Navbar