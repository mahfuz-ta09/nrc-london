'use client'
import Loader from "@/component/shared/Loader/Loader"
import { Suspense, useState } from "react"
import BlogActionModal from "./BlogActionModal"
import '@/css/Dashboard/DashBoardSharedItem/DashboardSharedCss.css'


const Blog = () => {
    const [modalState,setModalState] = useState({ isOpen: false })
    return (
      <div className="dash-item-container dashItem-content">
        <div className="dashItem-header">
          <div className="header-button-container">
            <button className='save-button' onClick={()=>setModalState({ isOpen: !modalState?.isOpen })}>Add Blog</button>
          </div>
          <h1 className='header-title'>Manage blogs</h1>
        </div>

        

        <Suspense fallback={<Loader />}>
          <BlogActionModal
              modalState={modalState}
              setModalState={setModalState}
          />
        </Suspense>

        {/* <Suspense fallback={<Loader />}>
          <StudentInfoSlider />
        </Suspense> */}
      </div>
  )
}

export default Blog
