'use client'
import { useGetUniNavItemQuery } from '@/redux/endpoints/university/universityEndpoints'
import '../../../css/shared/Navbar/Navbar.css'
import { faAngleDoubleDown, faAngleDoubleUp, faArrowRight, faCancel, faPhone, faUser } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Link from "next/link"

type props = {
    isDropDown: {
        uni: boolean,
        sub: boolean,
        test:boolean
    } , 
    setIsDropDown:any
}


const UniNav = ({isDropDown , setIsDropDown}:props) => {
    const {data,isLoading} = useGetUniNavItemQuery()
    
    return (
        <div className='link-holder'>
            <button onClick={()=>setIsDropDown({test: false, uni:!isDropDown.uni,sub: false})}  className='link'>
                universities <FontAwesomeIcon className='link-icon' icon={isDropDown.uni?faAngleDoubleUp:faAngleDoubleDown}/> 
            </button>
            <div className={isDropDown.uni?'drop-down show-dropdown':'drop-down'}>
                <button onClick={()=>setIsDropDown({uni:false, sub: false, test:false})} className="dropdown-cancel"><FontAwesomeIcon icon={faCancel}/></button>
                <div className="drop-down-content">
                    {Array.isArray(data?.data) && data?.meta?.total ? (
                        Array.from({ length: Math.ceil(data.meta.total / 4) }, (_, index) => (
                        <div key={index} className="drop-down-group">
                            {data.data.slice(4 * index, 4 * index + 4).map((uni: any, ind: number) => (
                                <Link key={ind} className="drop-down-link" href={`/university/${uni?.country}`}>
                                    <FontAwesomeIcon icon={faArrowRight} /> {uni?.country}
                                </Link>
                            ))}
                        </div>
                    ))
                    ) : (
                        <p>...</p>
                    )}

                    <div className="contact-section">
                                <Link className='contact-section-link' href="/contact"><FontAwesomeIcon icon={faPhone}/> Contact</Link>
                                <Link className='contact-section-link' href="/dashboard"><FontAwesomeIcon icon={faUser}/> Profile</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UniNav