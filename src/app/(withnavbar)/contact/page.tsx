import Footer from '@/component/shared/footer/Footer';
import Banner from './Banner'
import Content from './Content';
import { metadata } from './metadata'

export { metadata }


const ContactPage = () => {
    return (
        <div className="page-container">
            <Banner />
            <Content/>
            <Footer />
        </div>
    )
}

export default ContactPage;
