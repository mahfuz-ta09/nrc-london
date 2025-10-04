'use client'
import Link from "next/link"
import '../../../css/shared/Navbar/Navbar.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faAngleDoubleDown, faAngleDoubleUp, faCancel, faGlobe, faPhone, faUser } from "@fortawesome/free-solid-svg-icons"
import { useGetSubNavItemQuery } from '@/redux/endpoints/subject/subjectEndpoints'
import { usePathname } from "next/navigation"

type props = {
    isDropDown: {
        uni: boolean,
        sub: boolean,
        test:boolean
    } , 
    setIsDropDown:any
}

const UniNav = ({isDropDown , setIsDropDown}:props) => {
    const { data , isLoading } = useGetSubNavItemQuery()
    const pathname = usePathname()

    return (
        <div className='link-holder'>
            <button onClick={()=>setIsDropDown({test: false, uni:false,sub: !isDropDown.sub})}className={pathname.includes('/subjects')?'link link-color':'link'} >
                subjects
                <FontAwesomeIcon className='link-icon' icon={isDropDown.sub?faAngleDoubleUp:faAngleDoubleDown}/> 
            </button>
            <div className={isDropDown.sub?'drop-down show-dropdown':'drop-down'}>                                
                <button onClick={()=>setIsDropDown({uni:false, sub: false, test:false})} className="dropdown-cancel"><FontAwesomeIcon icon={faCancel}/></button>
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
            </div>
        </div>
    )
}

export default UniNav