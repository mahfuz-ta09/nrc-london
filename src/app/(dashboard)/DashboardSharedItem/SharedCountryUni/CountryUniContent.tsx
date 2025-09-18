'use client'
import './CountryUni.css'
import { Suspense ,useState } from 'react'
import AddUniModal from './AddUniModal/AddUniModal'
import Loader from '@/component/shared/Loader/Loader'
import CountryLists from './CountryCardSlider/CountryLists'
import AddCountryModal from './AddCountryModal/AddCountryModal'
import UniversityTable from './UniversityTable/UniversityTable'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFilter } from '@fortawesome/free-solid-svg-icons'



const CountryUniContent = () => {
    const [isOpen,setIsOpen] = useState(false)
    const [addCounty,setAddCountry] = useState({action:"",id:'',isOPen: false,name:''})
    const [addUni,setAddUni] = useState({action:"",id:'',isOPen: false,name:''})
    const [para,setPara] = useState({all:'',country:'',page:1,total:10,uniName:''})
        
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setPara({
            ...para,
            [e.target.name]: e.target.value
        });
    }
    
    return (
        <div className='dashboard-content-item'>
            <div className="dashboard-header-content">
                <h1 className='tag'>Manage country and university</h1>
                <div className="header-content">
                    <button className="header-btn" onClick={() => setIsOpen(!isOpen)}><FontAwesomeIcon icon={faFilter}/></button>
                    <button className="header-btn" onClick={() => setAddCountry(prev => ({ ...prev , isOPen: true , action: "add" }))}>add country</button>
                    <div className={isOpen?"filter-container show":"filter-container"}>
                        <h4 className='filter-header-text'>University filter</h4>
                        <div className='filter-item'>
                            <label htmlFor="page">page required</label>
                            <input
                                type="number"
                                name="page"
                                placeholder="Page"
                                value={para.page}
                                onChange={handleChange}
                                className='pagination-input'
                                min={0}
                            />
                        </div>
                        <div className='filter-item'>
                            <label htmlFor="page">page required</label>
                            <input
                                type="number"
                                name="total"
                                placeholder="Rows per page"
                                value={para.total}
                                onChange={handleChange}
                                className='pagination-input'
                                min={0}
                            />
                        </div>
                        <div className='filter-item'>
                            <label htmlFor="page">page required</label>
                            <input
                                type="text"
                                name="uniName"
                                placeholder="university name"
                                value={para.uniName}
                                onChange={handleChange}
                                className='pagination-input'
                            />
                        </div>
                    </div>
                </div>
            </div>

            <Suspense fallback={<Loader />}>
                <CountryLists />
            </Suspense>

            <Suspense fallback={<Loader />}>
                <UniversityTable
                    para={para}
                    setPara={setPara}    
                />
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
        {/* <div className="filter-header-uni"> */}
                    {/* {(data?.meta?.totalCount || country?.meta?.total) && <p className='filter-tag'>university ({para?.country? para?.country:'all'} & total: {data?.meta?.totalCount})</p>} */}
                    {/* <button onClick={()=>setIsOpen(!isOpen)}><FontAwesomeIcon icon={faFilter}/></button> */}
                    
                {/* </div> */}
        </div>
    )
}

export default CountryUniContent
