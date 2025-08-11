'use client'
import { useDeleteCountryMutation, useGetAllCountryBaseQuery } from '@/redux/endpoints/countryBaseUni/countryBaseUniversity'
import './CardSlider.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import AddCountryModal from '../AddCountryModal/AddCountryModal'
import { Suspense, useState, useRef, useEffect } from 'react'
import Loader from '@/component/shared/Loader/Loader'
import { toast } from 'react-toastify'
import AddUniModal from '../AddUniModal/AddUniModal'

const CountryLists = () => {
    const [addCounty, setAddCountry] = useState({action: "", id: '', isOPen: false, name: ''})
    const [addUni, setAddUni] = useState({action: "", id: '', isOPen: false, name: ''})
    const { data, isLoading } = useGetAllCountryBaseQuery()
    const [deleteCountry, { isLoading: deleteLoading }] = useDeleteCountryMutation()
    
    // Slider state
    const sliderRef = useRef<HTMLDivElement>(null)
    const [isDragging, setIsDragging] = useState(false)
    const [startX, setStartX] = useState(0)
    const [scrollLeft, setScrollLeft] = useState(0)

    if (isLoading) {
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

    // Mouse drag handlers
    const handleMouseDown = (e: React.MouseEvent) => {
        if (!sliderRef.current) return
        setIsDragging(true)
        setStartX(e.pageX - sliderRef.current.offsetLeft)
        setScrollLeft(sliderRef.current.scrollLeft)
        sliderRef.current.style.cursor = 'grabbing'
        sliderRef.current.style.userSelect = 'none'
    }

    const handleMouseLeave = () => {
        setIsDragging(false)
        if (sliderRef.current) {
            sliderRef.current.style.cursor = 'grab'
            sliderRef.current.style.userSelect = 'auto'
        }
    }

    const handleMouseUp = () => {
        setIsDragging(false)
        if (sliderRef.current) {
            sliderRef.current.style.cursor = 'grab'
            sliderRef.current.style.userSelect = 'auto'
        }
    }

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!isDragging || !sliderRef.current) return
        e.preventDefault()
        const x = e.pageX - sliderRef.current.offsetLeft
        const walk = (x - startX) * 2 // Multiply by 2 for faster scrolling
        sliderRef.current.scrollLeft = scrollLeft - walk
    }

    // Touch events for mobile support
    const handleTouchStart = (e: React.TouchEvent) => {
        if (!sliderRef.current) return
        setIsDragging(true)
        setStartX(e.touches[0].pageX - sliderRef.current.offsetLeft)
        setScrollLeft(sliderRef.current.scrollLeft)
    }

    const handleTouchMove = (e: React.TouchEvent) => {
        if (!isDragging || !sliderRef.current) return
        const x = e.touches[0].pageX - sliderRef.current.offsetLeft
        const walk = (x - startX) * 2
        sliderRef.current.scrollLeft = scrollLeft - walk
    }

    const handleTouchEnd = () => {
        setIsDragging(false)
    }

    // Prevent click events when dragging
    const handleCardClick = (e: React.MouseEvent, callback: () => void) => {
        if (isDragging) {
            e.preventDefault()
            return
        }
        callback()
    }

    useEffect(() => {
        if (sliderRef.current) {
            sliderRef.current.style.cursor = 'grab'
        }
    }, [])

    return (
        <div className='country-slider-container'>
            <div 
                ref={sliderRef}
                className='country-card-slider'
                style={{ 
                    width: `${data?.meta?.total * 260}px`,
                    display: 'flex',
                    overflow: 'hidden',
                    scrollBehavior: isDragging ? 'auto' : 'smooth',
                    cursor: 'grab'
                }}
                onMouseDown={handleMouseDown}
                onMouseLeave={handleMouseLeave}
                onMouseUp={handleMouseUp}
                onMouseMove={handleMouseMove}
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
            >
                {
                    data?.data?.map((country: any) =>
                        <div 
                            className='country-card' 
                            key={country?._id}
                            style={{
                                minWidth: '260px',
                                pointerEvents: isDragging ? 'none' : 'auto'
                            }}
                        >
                            {deleteLoading ? (
                                <p className='loading-msg'>loading...</p>
                            ) : (
                                <button 
                                    onClick={(e) => handleCardClick(e, () => handleDelete(country?._id))} 
                                    className='delete-btn'
                                >
                                    <FontAwesomeIcon icon={faTrash}/>
                                </button>
                            )}
                            <img 
                                className='country-card-img1' 
                                loading='lazy' 
                                src={country?.famousFile_url} 
                                alt=""
                                draggable={false}
                            />
                            <img 
                                className='country-card-img2' 
                                loading='lazy' 
                                src={country?.countryFlag_url} 
                                alt=""
                                draggable={false}
                            />

                            <div className="card-details">
                                <h1>country name: {country?.country}</h1>
                                <h1>serial in home: {country?.serial}</h1>
                                <h1>country full name: {country?.countryFull}</h1>
                                <h1>currency: {country?.currency}</h1>

                                <div className="cardtails-btn">
                                    <button 
                                        onClick={(e) => handleCardClick(e, () => setAddUni(prev => ({ 
                                            ...prev, 
                                            isOPen: true, 
                                            name: `${country?.country}`, 
                                            id: `${country?._id}`, 
                                            action: "add"
                                        })))}
                                    >
                                        add university
                                    </button>
                                    <button 
                                        onClick={(e) => handleCardClick(e, () => setAddCountry(prev => ({ 
                                            ...prev, 
                                            isOPen: true, 
                                            name: `${country?.country}`, 
                                            id: `${country?._id}`, 
                                            action: "edit"
                                        })))}
                                    >
                                        edit
                                    </button>
                                </div>
                            </div>
                        </div>
                    )
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

export default CountryLists;