import '@/css/Dashboard/layout.css'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import sideNavItem from './navItem'
import { Role } from '@/types/nav/type'
import { useUserInfo } from '@/utils/useUserInfo'



const DashNavLink = () => {
    const pathname = usePathname() 
    const dashTitle:string = "/dashboard/"
    const data = useUserInfo()


    return (
        <div className='dash-nav-body'>
            {
                sideNavItem(data?.Urole as Role).map((item,index) => (
                    <Link className={pathname === `${dashTitle}`+item?.path ? 'nav-link active' :'nav-link'} key={index} href={`/Dashboard/${item?.path}`}>
                        <FontAwesomeIcon icon={item.icon} />
                        <span>{item?.title}</span>
                    </Link>
                ))
            }
        </div>
    )
}

export default DashNavLink
