import Footer from '@/component/shared/footer/Footer'
import '@/css/Services/Services.css'
import Banner from './Banner'
import Content from './Content'
import {metadata} from './metadata'
export { metadata }

const Page = () => {
    
    return (
      <div className='page-container'>
        <Banner />
        <Content />
        <Footer />
      </div>
    )
}


export default Page