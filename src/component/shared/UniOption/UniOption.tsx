'use client'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import '../../../css/shared/Unioption/UniOption.css'
import { faArrowAltCircleLeft, faArrowAltCircleRight } from '@fortawesome/free-solid-svg-icons'
import { useGetUniNavItemQuery } from '@/redux/endpoints/university/universityEndpoints'
import { useRouter } from 'next/navigation'


const UniOption = () => {
    const router = useRouter()
    const {data,isLoading} = useGetUniNavItemQuery()


    return (
        <div className='unioption-cotainer'>
            <div className="uni-content">
                <h1>Have a look at your University options:</h1>
                <div className="unicaro">
                    {
                        isLoading ? <p>Loading...</p> :
                        data?.data?.map((option:any)=>
                            <div key={option.country} className="uni">
                                <img className="uni-image" src={option.image}alt='' />
                                <div className="overlay"></div>
                                <div className="details">
                                    <h3>Study in {option.country}</h3>
                                    <h3>Inspiring higher study in abroad</h3>
                                </div>
                                <button onClick={()=> router.push(`/University/${option.country}`)}>details <FontAwesomeIcon icon={faArrowAltCircleRight}/> </button>
                            </div>)
                    }
                </div>
                <div className="uni-nav">
                    {/* <button className='uni-nav-btn'>see more</button> */}
                    <div className="uni-nav-nav">
                        <button className='uni-nav-nav-btn'><FontAwesomeIcon icon={faArrowAltCircleLeft} /></button>
                        <button className='uni-nav-nav-btn'><FontAwesomeIcon icon={faArrowAltCircleRight}/></button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UniOption