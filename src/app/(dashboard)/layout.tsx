'use client'
import '@/css/Dashboard/layout.css'
import LayoutPage from "./LayoutPage"
import { useGetProfileByIdQuery } from '@/redux/endpoints/profile/profileEndpoints'
import { useUserInfo } from '@/utils/useUserInfo'



const Layout = ({ children } : {children : React.ReactNode}) => {
    const data = useUserInfo()
    const { data: profile , isLoading } = useGetProfileByIdQuery(data?.Uid)
   

    return (
      <div  className='dashboard-layout'>
          <div className="dash-content">
            <LayoutPage />
            <div className="dash-item">
              <div className="dash-item-header">
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