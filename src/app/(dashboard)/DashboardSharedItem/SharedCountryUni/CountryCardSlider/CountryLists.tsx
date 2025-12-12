'use client'
import './CardSlider.css'
import { toast } from 'react-toastify'
import { Suspense, useRef, useState } from 'react'
import AddUniModal from '../AddUniModal/AddUniModal'
import Loader from '@/component/shared/loader/loader'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import AddCountryModal from '../AddCountryModal/AddCountryModal'
import { faArrowRight, faTrash } from '@fortawesome/free-solid-svg-icons'
import { useDeleteCountryMutation, useGetAllCountryBaseQuery } from '@/redux/endpoints/countryBaseUni/countryBaseUniversity'
import CountryDetails from './CountryDetails'


const CountryLists = () => {
    const { data, isLoading } = useGetAllCountryBaseQuery()
    const [deleteCountry, { isLoading: deleteLoading }] = useDeleteCountryMutation()
    const [addUni, setAddUni] = useState({ action: "", id: '', isOPen: false, name: '' })
    const [countryDetails, setCountryDetails] = useState({data: null,isOPen: false,name: ''})
    const [addCountry, setAddCountry] = useState({ action: "", id: '', isOPen: false, name: '' })
    
    const sliderRef = useRef<HTMLDivElement>(null)
    const isDownRef = useRef(false)
    const startXRef = useRef(0)
    const scrollLeftRef = useRef(0)

    if (isLoading || deleteLoading) {
        return <Loader />
    }

    const handleDelete = async (id: string) => {
        try {
            const isConfirmed = window.confirm(`Are you sure you want to delete?`)
            if (!isConfirmed) return;

            const deleteRes:any = await deleteCountry(id).unwrap()
            console.log(deleteRes)
            if (deleteRes?.data?.deletedCount) {
                toast.success("Successfully deleted!")
            } else {
                toast.error(deleteRes?.error?.data)
            }
        } catch (err) {
            toast.error("something went wrong!")
            console.log(err)
        }
    }

    
    const handleMouseDown = (e: React.MouseEvent) => {
        if (!sliderRef.current) return
        isDownRef.current = true
        sliderRef.current.classList.add('active')
        startXRef.current = e.pageX - sliderRef.current.offsetLeft
        scrollLeftRef.current = sliderRef.current.scrollLeft
    }

    const handleMouseLeave = () => {
        isDownRef.current = false
        sliderRef.current?.classList.remove('active')
    }

    const handleMouseUp = () => {
        isDownRef.current = false
        sliderRef.current?.classList.remove('active')
    }

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!isDownRef.current || !sliderRef.current) return
        e.preventDefault()
        const x = e.pageX - sliderRef.current.offsetLeft
        const walk = (x - startXRef.current) * 1
        sliderRef.current.scrollLeft = scrollLeftRef.current - walk
    }

    return (
        <div
            className='country-slider-container'
            ref={sliderRef}
            onMouseDown={handleMouseDown}
            onMouseLeave={handleMouseLeave}
            onMouseUp={handleMouseUp}
            onMouseMove={handleMouseMove}>
            <div className='country-card-slider' style={{ width: `${data?.meta?.total * 340}px` }}>
                {data?.data?.map((country: any) =>
                <div className='country-card' key={country?._id}>
                    <button onClick={() => handleDelete(country?._id)} className='delete-btn'>
                        <FontAwesomeIcon icon={faTrash} />
                    </button>
                    <button onClick={() => setCountryDetails(prev=>({...prev,data:country , isOPen: true , name: country?.country }))} className='details-btn'>
                        <FontAwesomeIcon icon={faArrowRight} />
                    </button>
                    <img className='country-card-img1' loading='lazy' src={country?.famousFile?.url} alt="" />
                    <img className='country-card-img2' loading='lazy' src={country?.countryFlg?.url} alt="" />
                    <div className="card-details">
                        <p>currency: {country?.currency}</p>
                        <p>serial in home: {country?.serial}</p>
                        <p>country name: {country?.country}</p>
                        <p style={{margin:"5px 0",color:"#000",borderRadius:"7px",background:"#fff",padding:"6px 20px"}}>status: {country?.status}</p>
                        <div className="cardtails-btn">
                            <button style={{background:"teal"}} onClick={() => setAddCountry(prev => ({ ...prev, isOPen: true, name: `${country?.country}`, id: `${country?._id}`, action: "edit" }))}>edit</button>
                            <button style={{background:"green"}} onClick={() => setAddUni(prev => ({ ...prev, isOPen: true, name: `${country?.country}`, id: `${country?._id}`, action: "add" }))}>add university</button>
                        </div>
                    </div>
                </div>)}
            </div>

            <Suspense fallback={<Loader />}>
                <AddCountryModal
                    setAddCountry={setAddCountry}
                    addCountry={addCountry}
                />
                <AddUniModal
                    setAddUni={setAddUni}
                    addUni={addUni}
                />

                <CountryDetails 
                    countryDetails={countryDetails}
                    setCountryDetails={setCountryDetails}
                />
            </Suspense>
        </div>
    )
}

export default CountryLists
