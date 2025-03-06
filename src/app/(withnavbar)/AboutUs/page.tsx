'use client'
import Footer from '@/component/shared/Footer/Footer'
import '@/css/Centre/Centre.css'
import { useRouter } from 'next/navigation'


const page = () => {
  const router = useRouter()
  
  return (
      <div className='centre-container'>
        <div className="responsive-container-block bigContainer">
          <div className="responsive-container-block Container bottomContainer">
              <div className="ultimateImg">
                  <img className="mainImg" src="https://i.ibb.co.com/W4JyRN28/home-class.jpg"  alt="" />
                  <div className="purpleBox">
                      <p className="purpleText">
                          With three years of proven expertise, we're your trusted partner for seamless visa processing
                      </p>
                  </div>
              </div>
              <div className="allText bottomText">
                  <p className="text-blk headingText">
                      About Us
                  </p>
                  <p className="text-blk subHeadingText">
                      Welcome to  Your Trusted Partner in Visa Solutions!
                  </p>
                  <p className="text-blk des">
                      At nrc-london, we stand out as your 
                      go-to destination for seamless visa solutions. With a dedicated team of experts and a customer-centric approach, 
                      we take pride in making your visa application journey a breeze
                  </p>
                  <button onClick={()=>router.push('/Services')} className="explore">
                      View Services
                  </button>
                  <button style={{marginTop:"20px"}} onClick={()=>router.push('/Contact')} className="explore">
                      Contact Now
                  </button>
              </div>
          </div>
        </div>

        <div className='adress'>
            <div className='adress-card'>
                <h1 className='heading'>Uk office</h1>
                <p className='h-text'>101 Whitechapel high street</p>
                <p className='h-text'>(4th floor)post: E1 7RA</p>
                <p className='h-text'>London, UK</p>
                <p className='h-text'>Mobile: +4407710615979</p>
                <p className='h-text'>Land: 02033554453</p>
                <p className='h-text'>Email: admin@mknglobal.co.uk</p>
            </div>
          </div>

        <Footer />
      </div>
    )
}

export default page