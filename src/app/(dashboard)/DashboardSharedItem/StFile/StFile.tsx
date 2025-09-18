'use client'
import { Suspense, useState } from 'react'
import Loader from '@/component/shared/Loader/Loader'
import '@/css/Dashboard/DashBoardSharedItem/DashboardSharedCss.css'
import StudentInfoSlider from './StudentInfoSlider/StudentInfoSlider'
import AddStudentFileModal from './AddStudentFileModal/AddStudentFileModal'



const stFile = () => {
    const [modalState,setModalState] = useState({ isOpen: false })
    return (
      <div className="dashboard-content-item">
        <div className="dashboard-header-content">
          <h1 className='tag'>my students</h1>
          <div className="header-content">
            <button className='header-btn' onClick={()=>setModalState({ isOpen: !modalState?.isOpen })}>Add Student</button>
          </div>
        </div>

        

        <Suspense fallback={<Loader />}>
          <AddStudentFileModal
              modalState={modalState}
              setModalState={setModalState}
          />
        </Suspense>

        <Suspense fallback={<Loader />}>
          <StudentInfoSlider />
        </Suspense>
      </div>
    )
}

export default stFile
