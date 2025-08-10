'use client'
import { useDeleteCountryMutation, useGetAllCountryBaseQuery } from '@/redux/endpoints/countryBaseUni/countryBaseUniversity'
import './CardSlider.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import AddCountryModal from '../AddCountryModal/AddCountryModal'
import { Suspense, useState } from 'react'
import Loader from '@/component/shared/Loader/Loader'
import { toast } from 'react-toastify'
import AddUniModal from '../AddUniModal/AddUniModal'

const CountryLists = () => {
    const [addCounty,setAddCountry] = useState({action:"",id:'',isOPen: false,name:''})
    const [addUni,setAddUni] = useState({action:"",id:'',isOPen: false,name:''})
    const { data , isLoading } = useGetAllCountryBaseQuery()
    const [deleteCountry , { isLoading: deleteLoading}] = useDeleteCountryMutation()

    if(isLoading){
        return <Loader />
    }
    
    const handleDelete = async(id:string) =>{
        try{
            const deleteRes = await deleteCountry(id)
            if(deleteRes?.data?.data?.acknowledged){
                toast.success("Successfully deleted!")
            }else{
                toast.error(deleteRes?.data?.message)
            }
        }catch(err){
            toast.error("something went wrong!")
            console.log(err)
        }
    }
    
    const totalWidth = (data?.meta?.total ?? 0) * 260
    return (
        <div className='country-slider-container'>
            
            <div className='country-card-slider'style={{ width: `${totalWidth}px` }}>
                {
                    data?.data?.map((country:any)=> 
                        <div className='country-card' key={country?._id}>
                            {deleteLoading ? <p className='loading-msg'>loading...</p> :<button onClick={()=>handleDelete(country?._id)} className='delete-btn'><FontAwesomeIcon icon={faTrash}/></button>}
                            <img className='country-card-img1' loading='lazy' src={country?.famousFile_url} alt="" />
                            <img className='country-card-img2' loading='lazy' src={country?.countryFlag_url} alt="" />

                            <div className="card-details">
                                <h1>country name: {country?.country}</h1>
                                <h1>serial in home: {country?.serial}</h1>
                                <h1>country full name: {country?.countryFull}</h1>
                                
                                <div className="cardtails-btn">
                                    <button onClick={() => setAddUni(prev => ({ ...prev , isOPen: true, name:`${country?.country}`, id:`${country?._id}` , action: "add"}))}>add university</button>
                                    <button onClick={() => setAddCountry(prev => ({ ...prev , isOPen: true, name:`${country?.country}`, id:`${country?._id}` , action: "edit"}))}>edit</button>
                                </div>
                            </div>

                        </div>)
                }
            </div>
            
            

            
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

export default CountryLists