'use client'
import { faBars, faChevronDown, faCircleUser, faXmark } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Link from "next/link"
import { useState } from "react"


const NavLinks = () => {
    const [isOpen,setIsOpen] = useState(false)


    const handleNavbar = () =>{
        setIsOpen(!isOpen)
    }

    return (
        <>
            {
                isOpen ? 
                <FontAwesomeIcon onClick={handleNavbar}  size="xl"  className='nav-btn-icon' icon={faXmark} />:
                <FontAwesomeIcon onClick={handleNavbar} size="xl"  className='nav-btn-icon' icon={faBars} />
            }
            <ul className={isOpen  ? 'nav-item show' : 'nav-item hide'}>
                <Link className='link' href="/">k-12</Link>
                <Link className='link' href="/">Test Prep<FontAwesomeIcon icon={faChevronDown} /></Link>
                <Link className='link' href="/">Students<FontAwesomeIcon icon={faChevronDown} /></Link>
                <Link className='link' href="/">Centers<FontAwesomeIcon icon={faChevronDown} /></Link>
                <Link className='link' href="/">Services</Link>
                <Link className='link' href="/">Partner With us<FontAwesomeIcon icon={faChevronDown} /></Link>
                <Link className='link' href="/">Study Abroad News</Link>
                <Link className='link user' href="/"><FontAwesomeIcon icon={faCircleUser} size='2xl'/></Link>
            </ul>
        </>
    )
}

export default NavLinks