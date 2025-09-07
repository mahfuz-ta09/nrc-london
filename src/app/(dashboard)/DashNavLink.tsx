import Link from 'next/link'
import '@/css/Dashboard/layout.css'
import sideNavItem from './navItem'
import { Role } from '@/types/nav/type'

import { useUserInfo } from '@/utils/useUserInfo'
// import { usePathname } from 'next/navigation'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'



const DashNavLink = () => {
    // const pathname = usePathname() 
    // const dashTitle:string = "/dashboard/"
    const data = useUserInfo()
    
    return (
        <div className="dash-nav-body">
            {sideNavItem(data?.Urole as Role).map((section, idx) => (
                <div key={idx} className="nav-section">
                    <h3 className="nav-section-title">{section.section}</h3>
                    {section.items.map((item, index) => (
                        <Link key={index} href={`/Dashboard/${item.path}`} className="nav-link">
                            <FontAwesomeIcon className="nav-link-icon" icon={item.icon} />
                            <span className='nav-link-title'>{item.title}</span>
                        </Link>
                    ))}
                </div>
            ))}
        </div>

    )
}

export default DashNavLink
