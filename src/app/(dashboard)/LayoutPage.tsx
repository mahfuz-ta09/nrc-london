'use client'
import '@/css/Dashboard/layout.css'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/navigation'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faClose, faHome, faRightFromBracket } from '@fortawesome/free-solid-svg-icons'
import { logOut } from '@/utils/authAction'



const LayoutPage = ({ btnRef ,navRef , isOpen , setIsOpen}:{ btnRef:any ,navRef:any , isOpen: boolean , setIsOpen:any }) => {
    const  route = useRouter()
    const NavLink = dynamic(() => import('./DashNavLink'), { ssr: false })


    const homeHandler = () =>{
      route.push("/")
    }

    return (
        <div ref={navRef} className={isOpen? "dash-nav active":"dash-nav hide"}>
            <div className="dash-nav-element">

              <div className='dash-nav-header'>
                  <div className='dash-nav-header-title'>
                    <button  className='nav-icon-btn2' onClick={() => setIsOpen(false)} ref={btnRef} ><FontAwesomeIcon icon={faClose} className='cross-icon'/></button>
                    <h1>nrcedu-uk</h1>
                  </div>
                  <NavLink />
                  <div className='nav-controll-holder'>
                    <button className='nav-icon-home-btn' onClick={() => homeHandler()}><FontAwesomeIcon className='nav-icon' icon={faHome}/></button>
                    <button className='nav-logout-btn'  onClick={() => {logOut(),route.refresh()}} ref={btnRef} ><FontAwesomeIcon icon={faRightFromBracket} className='nav-icon'/>logout</button>
                  </div>
              </div>

            </div>
        </div>
    )
}

export default LayoutPage