'use client'
import { Suspense, useState } from 'react'
import Loader from '@/component/shared/Loader/Loader'
import '@/css/Dashboard/DashBoardSharedItem/DashboardSharedCss.css'
import StudentInfoSlider from './StudentInfoSlider/StudentInfoSlider'
import AddStudentFileModal from './AddStudentFileModal/AddStudentFileModal'



const stFile = () => {
    const [modalState,setModalState] = useState({ isOpen: false })
    return (
      <div className="dash-item-container dashItem-content">
        <div className="dashItem-header">
          <div className="header-button-container">
            <button className='save-button' onClick={()=>setModalState({ isOpen: !modalState?.isOpen })}>Add Student</button>
          </div>
          {/* <h1 className='header-title'>my students</h1> */}
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
