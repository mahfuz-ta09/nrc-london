'use client'
import { Suspense, useState } from 'react'
import Loader from '@/component/shared/loader/loader'
import '@/css/Dashboard/DashBoardSharedItem/DashboardSharedCss.css'
import StudentInfoSlider from './StudentInfoSlider/StudentInfoSlider'
import AddStudentFileModal from './AddStudentFileModal/AddStudentFileModal'
import StudentList from './StudentList/StudentList'
import StudentDetailModal from './StudentDetailModal/StudentDetailModal'




const stFile = () => {
    const [modalState,setModalState] = useState({ isOpen: false })
    return (
      <div className="dashboard-content-item">
        <div className="dashboard-header-content">
          <h1 className='tag'>Review Student Applications</h1>
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

        <Suspense fallback={<Loader />}>
          <StudentList />
        </Suspense>

        <Suspense fallback={<Loader />}>
          <StudentDetailModal />
        </Suspense>
      </div>
    )
}

export default stFile
