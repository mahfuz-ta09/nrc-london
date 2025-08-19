'use client'
import { useDeleteCountryMutation, useGetAllCountryBaseQuery } from '@/redux/endpoints/countryBaseUni/countryBaseUniversity'
import './CardSlider.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import AddCountryModal from '../AddCountryModal/AddCountryModal'
import { Suspense, useRef, useState } from 'react'
import Loader from '@/component/shared/Loader/Loader'
import { toast } from 'react-toastify'
import AddUniModal from '../AddUniModal/AddUniModal'

const CountryLists = () => {
    const [addCounty, setAddCountry] = useState({ action: "", id: '', isOPen: false, name: '' })
    const [addUni, setAddUni] = useState({ action: "", id: '', isOPen: false, name: '' })
    const { data, isLoading } = useGetAllCountryBaseQuery()
    const [deleteCountry, { isLoading: deleteLoading }] = useDeleteCountryMutation()

    // For mouse drag
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

            const deleteRes = await deleteCountry(id)

            if (deleteRes?.data?.data?.acknowledged) {
                toast.success("Successfully deleted!")
            } else {
                toast.error(deleteRes?.data?.message)
            }
        } catch (err) {
            toast.error("something went wrong!")
            console.log(err)
        }
    }

    // Mouse Events
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
        const walk = (x - startXRef.current) * 1 // scroll speed multiplier
        sliderRef.current.scrollLeft = scrollLeftRef.current - walk
    }

    return (
        <div
            className='country-slider-container'
            ref={sliderRef}
            onMouseDown={handleMouseDown}
            onMouseLeave={handleMouseLeave}
            onMouseUp={handleMouseUp}
            onMouseMove={handleMouseMove}
        >
            <div className='country-card-slider' style={{ width: `${data?.meta?.total * 290}px` }}>
                {
                    data?.data?.map((country: any) =>
                        <div className='country-card' key={country?._id}>
                            <button onClick={() => handleDelete(country?._id)} className='delete-btn'>
                                <FontAwesomeIcon icon={faTrash} />
                            </button>
                            <img className='country-card-img1' loading='lazy' src={country?.famousFile_url} alt="" />
                            <img className='country-card-img2' loading='lazy' src={country?.countryFlag_url} alt="" />

                            <div className="card-details">
                                <h1>country name: {country?.country}</h1>
                                <h1>serial in home: {country?.serial}</h1>
                                <h1>country full name: {country?.countryFull}</h1>
                                <h1>currency: {country?.currency}</h1>

                                <div className="cardtails-btn">
                                    <button style={{background:"green"}} onClick={() => setAddUni(prev => ({ ...prev, isOPen: true, name: `${country?.country}`, id: `${country?._id}`, action: "add" }))}>add university</button>
                                    <button style={{background:"teal"}} onClick={() => setAddCountry(prev => ({ ...prev, isOPen: true, name: `${country?.country}`, id: `${country?._id}`, action: "edit" }))}>edit</button>
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
