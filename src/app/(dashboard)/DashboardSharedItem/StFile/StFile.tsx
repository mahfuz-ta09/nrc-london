'use client'
import { Suspense, useState } from 'react'
import StudentList from './StudentList/StudentList'
import Loader from '@/component/shared/loader/loader'
import '@/css/Dashboard/DashBoardSharedItem/DashboardSharedCss.css'
import StudentInfoSlider from './StudentInfoSlider/StudentInfoSlider'
import StudentDetailModal from './StudentDetailModal/StudentDetailModal'
import AddStudentFileModal from './AddStudentFileModal/AddStudentFileModal'


const stFile = () => {
    const [modalState,setModalState] = useState({ isOpen: false })
    const [detailState,setdetailState] = useState({ isOpen: false, data: {} , title: ''})
    const [values,setValues] = useState({
        personalInfo: { complete: '', verified: '' },
        englishProficiency: { complete: '', verified: '' },
        universityApplications: { complete: '', verified: '' },
        studentsFile: { complete: '', verified: '' },
        applicationFinished: { finished: '', archived: '' },
    })

    return (
      <div className="dashboard-content-item">
        <div className="dashboard-header-content">
          <h1 className='tag'>Review Student Applications</h1>
          <div className="header-content">
            <button className='header-btn' onClick={()=>setModalState({ isOpen: !modalState?.isOpen })}>Add New Applicant</button>
          </div>
        </div>

        <Suspense fallback={<Loader />}>
          <AddStudentFileModal
              modalState={modalState}
              setModalState={setModalState}
          />
          
          <StudentInfoSlider 
            values={values}
            setValues={setValues}
          />

          <StudentList 
              setdetailState={setdetailState}
              detailState={detailState}
              values={values}
              setValues={setValues}
          />
          <StudentDetailModal 
              setdetailState={setdetailState}
              detailState={detailState} 
              values={values}
              setValues={setValues}
            />
        </Suspense>
      </div>
    )
}

export default stFile
