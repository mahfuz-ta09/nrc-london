'use client'
import { useState } from 'react'
import AddCountryModal from './AddCountryModal/AddCountryModal'
import './CountryUni.css'
import { Suspense } from 'react'
import Loader from '@/component/shared/Loader/Loader'
import CountryLists from './CountryCardSlider/CountryLists'
import UniversityTable from './UniversityTable/UniversityTable'


const page = () => {
    const [addCounty,setAddCountry] = useState({
        action:"",
        id:'',
        isOPen: false,
        name:''
    })
    
    return (
      <div className='university-content'>
        <div className="uni-header-contant">
            <h1 className='university-content-header'>Manage country and university from here</h1>
            <button onClick={() => setAddCountry(prev => ({ ...prev , isOPen: true , action: "add" }))} className='university-content-btn'>add country</button>
        </div>

        <Suspense fallback={<Loader />}>
            <CountryLists />
        </Suspense>

        <Suspense fallback={<Loader />}>
            <UniversityTable />
        </Suspense>


        <AddCountryModal 
            setAddCountry={setAddCountry}
            addCounty={addCounty}
        />
      </div>
    )
}

export default page