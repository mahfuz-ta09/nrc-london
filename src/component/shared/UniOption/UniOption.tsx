'use client'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import '../../../css/shared/Unioption/UniOption.css'
import { faArrowAltCircleLeft, faArrowAltCircleRight } from '@fortawesome/free-solid-svg-icons'
import { useGetUniNavItemQuery } from '@/redux/endpoints/university/universityEndpoints'
import { useRouter } from 'next/navigation'
import { useRef} from 'react'
import Loader from '../Loader/Loader'

const UniOption = () => {
    const router = useRouter()
    const { data , isLoading } = useGetUniNavItemQuery()
    const scrollContainerRef = useRef<HTMLDivElement>(null);

    const scroll = (direction: 'left' | 'right') => {
        if (scrollContainerRef.current) {
            const scrollAmount = 320
            scrollContainerRef.current.scrollBy({
                left: direction === 'left' ? -scrollAmount : scrollAmount,
                behavior: 'smooth'
            });
        }
    }


    return (    
        <div className='unioption-cotainer'>
            <div className="wdth">
                <h2 className='uniHeader'>Have a look at your University options:</h2>
                
                <div className="uni-content" ref={scrollContainerRef}>
                    <div style={{width:`${340*data?.meta?.total}px`}} className="unicaro">
                        {
                            isLoading ? <Loader /> :
                            data?.data?.map((option:any)=>
                                <div key={option.country} className="uni">
                                    <img className="uni-image" src={option.image}alt='' />
                                    <img className="uni-country-image" src={option.flag}alt='' />
                                    <div className="overlay"></div>
                                    <div className="details">
                                        <h3>Study in {option.country}</h3>
                                        <p>Inspiring higher study in abroad</p>
                                        <button onClick={()=> router.push(`/University/${option?.country}`)}>details <FontAwesomeIcon icon={faArrowAltCircleRight}/> </button>
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