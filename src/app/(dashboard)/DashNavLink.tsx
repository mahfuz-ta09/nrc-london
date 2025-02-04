import '@/css/Dashboard/layout.css'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import sideNavItem from './navItem'
import { Role } from '@/types/nav/type'
import { userInfo } from '@/utils/userInfo'



const DashNavLink = () => {
    const pathname = usePathname() 
    const dashTitle:string = "/dashboard/"
    const { Urole  } = userInfo()


    return (
        <div className='dash-nav-body'>
            {
                sideNavItem(Urole as Role).map((item,index) => (
                    <Link className={pathname === `${dashTitle}`+item?.path ? 'nav-link active' :'nav-link'} key={index} href={`/dashboard/${item?.path}`}>
                        <FontAwesomeIcon icon={item.icon} />
                        <span>{item?.title}</span>
                    </Link>
                ))
            }
        </div>
    )
}

export default DashNavLink
