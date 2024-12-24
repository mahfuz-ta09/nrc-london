import dynamic from 'next/dynamic'
import '../../../css/shared/Navbar/Navbar.css'



const Navbar = () => {
    const Links = dynamic(() => import('./NavLinks'), { ssr: true })

    
    return (
        <div className='nav-holder'>
            
            <div className="nav-content">
                <h1>NRC-london</h1>
                <Links />
            </div>
            
        </div>
    )
}

export default Navbar