'use client'
import Loader from "@/component/shared/Loader/Loader"
import { Suspense, useState } from "react"
import BlogActionModal from "./BlogActionModal"
import '@/css/Dashboard/DashBoardSharedItem/DashboardSharedCss.css'
import BlogTable from "./BlogTable"
import { faFilter } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"


const Blog = () => {
    const [open,setOpen] = useState(false)
    const [modalState,setModalState] = useState({ isOpen: false , action:'Add' , id:'' })    
    const [params,setParams] =  useState({ page: 1, limit: 10 , category: "", status: "", isFeatured: undefined})
    
    
    
    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target

        setParams(prev => {
            let newValue: any = value

            if (name === "page" || name === "limit") {
                newValue = Number(value)
                } else if (name === "isFeatured") {
                newValue = value === "true" ? true : value === "false" ? false : undefined
                }

                return {
                ...prev,
                [name]: newValue,
            }
        })
    }
        
    return (
      <div className="dashboard-content-item">
        <div className="dashboard-header-content">
          <h1 className='tag'>Manage blogs</h1>

          <div className="header-content">
            <button onClick={()=>setOpen(!open)} className='header-btn'><FontAwesomeIcon icon={faFilter}/></button>
            <button className='header-btn' onClick={()=>setModalState({ isOpen: !modalState?.isOpen , action: "Add" , id: ''})}>Add Blog</button>
            <div className={open?"filter-container show":"filter-container"}>
                <div className="filter-item">
                  <label htmlFor="page">insert page number</label>
                  <input placeholder='Enter Page' type="number" name="page" onChange={handleOnChange}/>
                </div>
                <div className="filter-item">
                  <label htmlFor="limit">insert page limit</label>
                  <input placeholder='Enter Limit per page' type="number" name="limit" onChange={handleOnChange}/>
                </div>
                <div className="filter-item">
                  <label htmlFor="category">insert category</label>
                  <input placeholder='Enter Category' type="text" name="category" onChange={handleOnChange}/>
                </div>
                <div className="filter-item">
                  <label htmlFor="category">insert category</label>
                  <select onChange={handleOnChange} name="status" id="">
                      <option>Select status</option>
                      <option value="published">Published</option>
                      <option value="draft">Draft</option>
                  </select>
                </div>
                
                <div className="filter-item">
                  <label htmlFor="category">insert category</label>
                  <select onChange={handleOnChange} name="isFeatured" id="">
                      <option>Is featured</option>
                      <option value="true">yes</option>
                      <option value="false">no</option>
                  </select>
                </div>
            </div>
          </div>
        </div>

        

        <Suspense fallback={<Loader />}>
          <BlogActionModal
              modalState={modalState}
              setModalState={setModalState}
          />
        </Suspense>

        <Suspense fallback={<Loader />}>
          <BlogTable 
            params={params}  
            setParams={setParams}
          />
        </Suspense>
      </div>
  )
}

export default Blog
