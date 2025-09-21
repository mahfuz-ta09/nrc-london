'use client'
import '@/css/Dashboard/layout.css'
import LayoutPage from "./LayoutPage"
import { useUserInfo } from '@/utils/useUserInfo'
import { useEffect, useRef, useState } from 'react'
import Loader from '@/component/shared/loader/loader'
import { useTokenRefresh } from '@/utils/useTokenRefresh'
import { faBars } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useGetProfileByIdQuery } from '@/redux/endpoints/profile/profileEndpoints'



const Layout = ({ children } : {children : React.ReactNode}) => {
    const data = useUserInfo()
    const { loading } = useTokenRefresh()
    const [isOpen,setIsOpen] = useState(false)
    const navRef = useRef<HTMLDivElement>(null)
    const btnRef = useRef<HTMLButtonElement>(null)
    const { data: profile , isLoading } = useGetProfileByIdQuery(data?.Uemail)
    
    
    useEffect(() => {
      const handleNavBar = (e: MouseEvent) => {
        if (navRef.current && btnRef.current && !navRef.current.contains(e.target as Node) && !btnRef.current.contains(e.target as Node)) {
            setIsOpen(false);
        }
      }
        
      document.addEventListener("click", handleNavBar);
      return () => {
        document.removeEventListener("click", handleNavBar);
      }
    }, [])

    if(loading) return <Loader />

    const handler = () =>{
      setIsOpen(true)
    }

    return (
      <div  className='dashboard-layout'>
          <div className="dash-content">
            <LayoutPage btnRef={btnRef} navRef={navRef} isOpen={isOpen} setIsOpen={setIsOpen}/>
            <div className="dash-item">
              <div className="dash-item-header">
                  <button className='nav-icon-btn-open'  onClick={() => handler()} ref={btnRef} ><FontAwesomeIcon icon={faBars} className='nav-icon'/></button>
                  <div className='header-title'>
                      <h1>{isLoading ? "Loading.." :profile?.data?.name}</h1>
                      <h1>wellcome to dashboard</h1>
                  </div>
              </div>
              <div className='dash-item-content'>
                  {children}
              </div>
            </div>

          </div>
      </div>
    )
  }
 
export default Layout