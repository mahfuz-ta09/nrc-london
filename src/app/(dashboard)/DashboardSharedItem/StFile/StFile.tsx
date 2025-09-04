import Loader from '@/component/shared/Loader/Loader'
import '@/css/Dashboard/DashBoardSharedItem/DashboardSharedCss.css'
import { Suspense } from 'react'
import StudentInfoSlider from './StudentInfoSlider/StudentInfoSlider'

const stFile = () => {
    return (
      <div className="dash-item-container dashItem-content">
        <div className="dashItem-header">
          <div className="header-button-container">
            <button className='save-button'>Add Student</button>
          </div>
          <h1 className='header-title'>my students</h1>
        </div>


        <Suspense fallback={<Loader />}>
          <StudentInfoSlider />
        </Suspense>
      </div>
    )
}

export default stFile
