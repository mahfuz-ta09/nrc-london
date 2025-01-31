'use client'
import Link from 'next/link'
import '@/css/Dashboard/layout.css'
import { useEffect, useRef, useState } from 'react'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/navigation'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowCircleRight, faHome } from '@fortawesome/free-solid-svg-icons'


const LayoutPage = () => {
    const btnRef = useRef<HTMLButtonElement>(null)
    const navRef = useRef<HTMLDivElement>(null)
    const [isOpen,setIsOpen] = useState(false)
    const  route = useRouter()


    const NavLink = dynamic(() => import('./DashNavLink'), { ssr: false })
    useEffect(() => {
      const handleNavBar = (e: MouseEvent) => {
        if (
          navRef.current &&
          btnRef.current &&
          !navRef.current.contains(e.target as Node) &&
          !btnRef.current.contains(e.target as Node)
        ) {
          setIsOpen(false);
        }
      };
    
      document.addEventListener("click", handleNavBar);
      return () => {
        document.removeEventListener("click", handleNavBar);
      };
    }, []);
    

    const handler = () =>{
      setIsOpen(true)
    }

    const homeHandler = () =>{
      route.push("/")
    }


    return (
        <div ref={navRef} className={isOpen? "dash-nav active":"dash-nav hide"}>
            <div className="dash-nav-element">
                <div className='dash-nav-header'>
                    <h1>NRC-london</h1>
                    <NavLink />
                </div>
                <button  className='nav-icon-btn' onClick={() => handler()} ref={btnRef} ><FontAwesomeIcon icon={faArrowCircleRight} className='nav-icon'/></button>
                <button  className='nav-icon-home-btn' onClick={() => homeHandler()}><FontAwesomeIcon className='nav-icon' icon={faHome}/></button>
                <div className='dash-nav-footer'>
                    <Link className='footer-nav' href="/">back to home</Link>
                </div>
            </div>
        </div>
    )
}

export default LayoutPage
