'use client'
import { useGetAllCountryBaseQuery } from '@/redux/endpoints/countryBaseUni/countryBaseUniversity'
import './CardSlider.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import AddCountryModal from '../AddCountryModal/AddCountryModal'
import { useState } from 'react'
import Loader from '@/component/shared/Loader/Loader'

const CountryLists = () => {
    const [addCounty,setAddCountry] = useState({
        action:"",
        id:'',
        isOPen: false,
        name:''
    })
    const { data , isLoading} = useGetAllCountryBaseQuery()

    if(isLoading){
        return <Loader />
    }
    
    
    return (
        <div className='country-slider-container'>
            
            <div className='country-card-slider' style={{ width: `${data?.data?.meta?.total}*260px`}}>
                {
                    data?.data.map((country:any)=> 
                        <div className='country-card' key={country?._id}>
                            <button className='delete-btn'><FontAwesomeIcon icon={faTrash}/></button>
                            <img className='country-card-img1' loading='lazy' src={country?.famousFile_url} alt="" />
                            <img className='country-card-img2' loading='lazy' src={country?.countryFlag_url} alt="" />

                            <div className="card-details">
                                <h1>country name: {country?.country}</h1>
                                <h1>serial in home: {country?.serial}</h1>
                                <h1>country full name: {country?.countryFull}</h1>
                                
                                <div className="cardtails-btn">
                                    <button>add university</button>
                                    <button onClick={() => setAddCountry(prev => ({ ...prev , isOPen: true, name:`${country?.country}`, id:`${country?._id}` , action: "edit"}))}>edit</button>
                                </div>
                            </div>

                        </div>)
                }
            </div>
            
            <AddCountryModal 
                setAddCountry={setAddCountry}
                addCounty={addCounty}
            />

            

        </div>
    )
}

export default CountryLists