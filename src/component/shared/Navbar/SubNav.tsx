'use client'
import '../../../css/shared/Navbar/Navbar.css'
import { faGlobe, faPhone, faUser } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Link from "next/link"
import Loader from '../Loader/Loader'
import { useGetSubNavItemQuery } from '@/redux/endpoints/subject/subjectEndpoints'


const UniNav = () => {
    const { data , isLoading } = useGetSubNavItemQuery()
    
 
    return (
        <div className='link-holder'>
            <p className='link'>Subjects</p>
            <div className='drop-down'>
                {isLoading ? (<Loader />
                    ) : (
                    <div className="drop-down-content">
                        {Array.isArray(data?.data) && data?.meta?.total ? (
                            Array.from({ length: Math.ceil(data.meta.total / 4) }, (_, index) => (
                            <div key={index} className="drop-down-group">
                                {data.data.slice(4 * index, 4 * index + 4).map((uni: any, ind: number) => (
                                    <Link key={ind} className="drop-down-link" href={`/Subjects/${uni?.country}`}>
                                        <FontAwesomeIcon icon={faGlobe} /> {uni?.country}
                                    </Link>
                                ))}
                            </div>
                        ))
                        ) : (
                            <p>...</p>
                        )}

                        <div className="contact-section">
                                    <Link className='contact-section-link' href="/Contact"><FontAwesomeIcon icon={faPhone}/> Contact</Link>
                                    <Link className='contact-section-link' href="/Dashboard"><FontAwesomeIcon icon={faUser}/> Profile</Link>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default UniNav