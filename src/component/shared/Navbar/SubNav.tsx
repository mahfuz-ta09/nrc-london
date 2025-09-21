'use client'
import Link from "next/link"
import Loader from '../loader/loader'
import '../../../css/shared/Navbar/Navbar.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faGlobe, faPhone, faUser } from "@fortawesome/free-solid-svg-icons"
import { useGetSubNavItemQuery } from '@/redux/endpoints/subject/subjectEndpoints'


const UniNav = () => {
    const { data , isLoading } = useGetSubNavItemQuery()
    
 
    return (
        <div className='link-holder'>
            <p className='link'>subjects</p>
            <div className='drop-down'>
                {isLoading ? (<Loader />
                    ) : (
                    <div className="drop-down-content">
                        {Array.isArray(data?.data) && data?.meta?.total ? (
                            Array.from({ length: Math.ceil(data.meta.total / 4) }, (_, index) => (
                            <div key={index} className="drop-down-group">
                                {data.data.slice(4 * index, 4 * index + 4).map((uni: any, ind: number) => (
                                    <Link key={ind} className="drop-down-link" href={`/subjects/${uni?.country}`}>
                                        <FontAwesomeIcon icon={faGlobe} /> {uni?.country}
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
                )}
            </div>
        </div>
    )
}

export default UniNav