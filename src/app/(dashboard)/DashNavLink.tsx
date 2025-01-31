import { faUser } from '@fortawesome/free-solid-svg-icons'
import '@/css/Dashboard/layout.css'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const DashNavLink = () => {
    const pathname = usePathname() 
    let dashTitle:string = "/dashboard/" 

    const item=[{
        title   : "Dashboard",
        path    : `user`,
        icon    : faUser,
    },
    {
        title   : "Manage Users",
        path    : `user/manage-users`,
        icon    : faUser,
    },
    {
        title   : "Statistics",
        path    : `user/web-stat`,
        icon    : faUser,
    }]

    return (
        <div className='dash-nav-body'>
            {
                item?.map((item,index) => (
                    <Link className={pathname === `${dashTitle}`+item?.path ? 'nav-link active' :'nav-link'} key={index} href={`/dashboard/${item?.path}`}>
                        <FontAwesomeIcon icon={item?.icon}/>
                        <span>{item?.title}</span>
                    </Link>
                ))
            }
        </div>
    )
}

export default DashNavLink
