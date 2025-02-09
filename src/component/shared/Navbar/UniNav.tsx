'use client'
import { useGetUniNavItemQuery } from '@/redux/endpoints/university/universityEndpoints'
import '../../../css/shared/Navbar/Navbar.css'
import { faGlobe, faPhone } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Link from "next/link"


const UniNav = () => {
    const {data,isLoading} = useGetUniNavItemQuery()
    
    

    return (
        <div className='link-holder'>
            <p className='link'>University</p>
            <div className='drop-down'>
                {isLoading ? (<p>Loading....</p>
                    ) : (
                    <div className="drop-down-content">
                        {Array.isArray(data?.data) && data?.meta?.total ? (
                            Array.from({ length: Math.ceil(data.meta.total / 4) }, (_, index) => (
                            <div key={index} className="drop-down-group">
                                {data.data.slice(4 * index, 4 * index + 4).map((uni: any, ind: number) => (
                                    <Link key={ind} className="drop-down-link" href={`/University/${uni?.country}`}>
                                        <FontAwesomeIcon icon={faGlobe} /> {uni?.country}
                                    </Link>
                                ))}
                            </div>
                        ))
                        ) : (
                        <p>Currently no data available</p>
                        )}

                        <div className="contact-section">
                            <Link className="contact-section-link" href="/">
                                <FontAwesomeIcon icon={faPhone} /> Contact
                            </Link>
                            <Link className="contact-section-link" href="/">
                                <FontAwesomeIcon icon={faPhone} /> Enquire
                            </Link>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default UniNav