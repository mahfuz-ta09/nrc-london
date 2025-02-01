import { faUser } from '@fortawesome/free-solid-svg-icons'
import '@/css/Dashboard/layout.css'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import sideNavItem from './navItem'
import { Role } from '@/types/nav/type'

const DashNavLink = () => {
    const users =  {
        // role: 'super_admin'
        role: 'admin'
        // role: 'student'
        // role: 'user'
    }

    const pathname = usePathname() 
    const dashTitle:string = "/dashboard/" 


    return (
        <div className='dash-nav-body'>
            {
                sideNavItem(users?.role as Role).map((item,index) => (
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
