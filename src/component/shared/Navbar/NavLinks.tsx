'use client'
import { faBars, faChevronDown, faCircleUser, faXmark } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Link from "next/link"
import { useState } from "react"


const NavLinks = () => {
    const [isOpen,setIsopen] = useState(true)

    const handleNavbar= () =>{
        setIsopen(!isOpen)
    }
    
    return (
        <>
            {
                isOpen ? 
                <FontAwesomeIcon onClick={handleNavbar} size="2xl" className="ham-burger" icon={faBars} />:
                <FontAwesomeIcon onClick={handleNavbar}  size="2xl" className="cancel" icon={faXmark} />
            }
            <ul className={isOpen  ? "link-list open" : "link-list close"}>
                
                <Link className='nav-link' href="/">k-12</Link>
                <Link className='nav-link' href="/">Test Prep<FontAwesomeIcon icon={faChevronDown} /></Link>
                <Link className='nav-link' href="/">Students<FontAwesomeIcon icon={faChevronDown} /></Link>
                <Link className='nav-link' href="/">Centers<FontAwesomeIcon icon={faChevronDown} /></Link>
                <Link className='nav-link' href="/">Services</Link>
                <Link className='nav-link' href="/">Partner With us<FontAwesomeIcon icon={faChevronDown} /></Link>
                <Link className='nav-link' href="/">Study Abroad News</Link>
                <Link className='nav-link user' href="/"><FontAwesomeIcon icon={faCircleUser} size='2xl'/></Link>
            </ul>
        </>
    )
}

export default NavLinks