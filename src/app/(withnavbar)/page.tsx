import Banner from "@/component/shared/Banner/Banner"
import Footer from "@/component/shared/Footer/Footer"
import UniOption from "@/component/shared/UniOption/UniOption"


const Page = () => {
  return (
    <>
        <Banner />
        <div className="home-contain">
          <UniOption/>
          <UniOption />
          <UniOption />
          <UniOption />
        </div>
        <Footer />
    </>
  )
}

export default Page