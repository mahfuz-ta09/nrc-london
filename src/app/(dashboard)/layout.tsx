'use client'
import '@/css/Dashboard/layout.css'
import LayoutPage from "./LayoutPage"
import { useRouter } from 'next/navigation'


const Layout = ({ children } : {children : React.ReactNode}) => {
    const router = useRouter()
   
    return (
      <div  className='dashboard-layout'>
          <div className="dash-content">
            <LayoutPage />
            <div className="dash-item">
              <div className="dash-item-header">
                  <div className='header-title'>
                      <h1>hello mr ....</h1>
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