import Footer from "@/component/shared/footer/Footer";
import "@/css/Centre/Centre.css";
import CentreContent from "./CentreContent";
import AddressSection from "./AddressSection";
import Banner from "./Banner"
import { metadata } from "./metadata";

export { metadata }

export default function CentrePage() {
    return (
        <div className="page-container">
        <Banner />
        <CentreContent />
        <AddressSection />
        <Footer />
        </div>
    )
}
