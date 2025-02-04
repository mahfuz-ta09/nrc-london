'use client'
import '@/css/Dashboard/admin/university.css'
import { useState } from 'react'


const page = () => {
    const [open,setOpen] = useState(false)
    return (
      <div className='university-content'>
        <div className="header">
          <h1>University:</h1>
          <button onClick={()=>setOpen(!open)}>Add University</button>
        </div>

        <div className={open? "mod-open" : "modal"}>
            <button onClick={()=>setOpen(!open)} className='mod-close'>Close</button>
        </div>
      </div>
    )
}

export default page