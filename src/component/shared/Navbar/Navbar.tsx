import dynamic from 'next/dynamic'
import '../../../css/shared/Navbar/Navbar.css'
import logo from"../../../assets/logo.png"
import Image from 'next/image'


const Navbar = () => {
    const LinkList = dynamic(() => import('./NavLinks'), { ssr: true })


    return (
        <div className='nav-holder'>
            <div className="nav-content">
                <Image className='nav-logo' src={logo} alt="" />
                {/* <h1 className='banner-tag'>NRC-london</h1> */}
                <LinkList />
            </div>
            
        </div>
    )
}

export default Navbar