import dynamic from 'next/dynamic'
import '../../../css/shared/Navbar/Navbar.css'



const Navbar = () => {
    const LinkList = dynamic(() => import('./NavLinks'), { ssr: true })


    return (
        <div className='nav-holder'>
            
            <div className="nav-content">
                <h1>NRC-london</h1>
                <LinkList />
            </div>
            
        </div>
    )
}

export default Navbar