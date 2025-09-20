'use client'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import '../../../css/shared/Unioption/UniOption.css'
import { faArrowAltCircleLeft, faArrowAltCircleRight } from '@fortawesome/free-solid-svg-icons'
import { useGetUniNavItemQuery } from '@/redux/endpoints/university/universityEndpoints'
import { useRouter } from 'next/navigation'
import { useRef, useState } from 'react'
import Loader from '../Loader/Loader'

const UniOption = () => {
    const router = useRouter()
    const { data , isLoading } = useGetUniNavItemQuery()
    const scrollContainerRef = useRef<HTMLDivElement>(null)

    // states for drag scrolling
    const [isDragging, setIsDragging] = useState(false)
    const [startX, setStartX] = useState(0)
    const [scrollLeft, setScrollLeft] = useState(0)

    const scroll = (direction: 'left' | 'right') => {
        if (scrollContainerRef.current) {
            const scrollAmount = 320
            scrollContainerRef.current.scrollBy({
                left: direction === 'left' ? -scrollAmount : scrollAmount,
                behavior: 'smooth'
            });
        }
    }

    // Mouse + Touch Handlers
    const handleMouseDown = (e: React.MouseEvent) => {
        if (!scrollContainerRef.current) return
        setIsDragging(true)
        setStartX(e.pageX - scrollContainerRef.current.offsetLeft)
        setScrollLeft(scrollContainerRef.current.scrollLeft)
    }

    const handleMouseLeave = () => setIsDragging(false)
    const handleMouseUp = () => setIsDragging(false)

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!isDragging || !scrollContainerRef.current) return
        e.preventDefault()
        const x = e.pageX - scrollContainerRef.current.offsetLeft
        const walk = (x - startX) * 2
        scrollContainerRef.current.scrollLeft = scrollLeft - walk
    }

    // Touch support
    const handleTouchStart = (e: React.TouchEvent) => {
        if (!scrollContainerRef.current) return
        setIsDragging(true)
        setStartX(e.touches[0].pageX - scrollContainerRef.current.offsetLeft)
        setScrollLeft(scrollContainerRef.current.scrollLeft)
    }
    const handleTouchMove = (e: React.TouchEvent) => {
        if (!isDragging || !scrollContainerRef.current) return
        const x = e.touches[0].pageX - scrollContainerRef.current.offsetLeft
        const walk = (x - startX) * 2
        scrollContainerRef.current.scrollLeft = scrollLeft - walk
    }
    const handleTouchEnd = () => setIsDragging(false)

    return (    
        <div className='unioption-cotainer'>
            <div className="wdth">
                <h2 className='uniHeader'>Have a look at your University options:</h2>
                
                <div 
                    className="uni-content" 
                    ref={scrollContainerRef}
                    onMouseDown={handleMouseDown}
                    onMouseLeave={handleMouseLeave}
                    onMouseUp={handleMouseUp}
                    onMouseMove={handleMouseMove}
                    onTouchStart={handleTouchStart}
                    onTouchMove={handleTouchMove}
                    onTouchEnd={handleTouchEnd}
                    style={{ cursor: isDragging ? "grabbing" : "grab" }}
                >
                    <div style={{width:`${340*data?.meta?.total}px`}} className="unicaro">
                        {
                            isLoading ? <Loader /> :
                            data?.data?.map((option:any)=>
                                <div key={option.country} className="uni">
                                    <img className="uni-image" src={option.image} alt='' />
                                    <img className="uni-country-image" src={option.flag} alt='' />
                                    <div className="overlay"></div>
                                    <div className="details">
                                        <h3>Study in {option.country}</h3>
                                        <p>Inspiring higher study in abroad</p>
                                        <button onClick={()=> router.push(`/university/${option?.country}`)}>details <FontAwesomeIcon icon={faArrowAltCircleRight}/> </button>
                                    </div>
                                </div>)
                        }
                    </div>
                </div>

                <div className="uni-nav">
                    <button onClick={()=>scroll('left')} className='uni-nav-nav-btn'><FontAwesomeIcon icon={faArrowAltCircleLeft}/></button>
                    <button onClick={()=>scroll('right')} className='uni-nav-nav-btn'><FontAwesomeIcon icon={faArrowAltCircleRight} /></button>
                </div>
            </div>
        </div>
    )
}

export default UniOption
