'use client'
import './CountryUni.css'
import { Suspense ,useState } from 'react'
import AddUniModal from './AddUniModal/AddUniModal'
import Loader from '@/component/shared/Loader/Loader'
import CountryLists from './CountryCardSlider/CountryLists'
import AddCountryModal from './AddCountryModal/AddCountryModal'
import UniversityTable from './UniversityTable/UniversityTable'



const CountryUniContent = () => {
    const [addCounty,setAddCountry] = useState({action:"",id:'',isOPen: false,name:''})
    const [addUni,setAddUni] = useState({action:"",id:'',isOPen: false,name:''})
        
    return (
        <div className='university-content'>
            <div className="uni-header-contant">
                <h1 className='university-content-header'>Manage country and university</h1>
                <button onClick={() => setAddCountry(prev => ({ ...prev , isOPen: true , action: "add" }))} className='university-content-btn'>add country</button>
            </div>

            <Suspense fallback={<Loader />}>
                <CountryLists />
            </Suspense>

            <Suspense fallback={<Loader />}>
                <UniversityTable />
            </Suspense>


            <Suspense fallback={<Loader />}>
                <AddCountryModal 
                    setAddCountry={setAddCountry}
                    addCounty={addCounty}
                />
            </Suspense>
            

            <Suspense fallback={<Loader />}>
                <AddUniModal 
                    setAddUni={setAddUni}
                    addUni={addUni}
                />
            </Suspense>
        
      </div>
    )
}

export default CountryUniContent
