import Banner from "@/component/shared/Banner/Banner"
import Footer from "@/component/shared/Footer/Footer"
import UniOption from "@/component/shared/UniOption/UniOption"
import PopularCourse from "@/component/shared/PopularCourse/PopularCourse"


const Page = () => {
  return (
    <>
        <Banner />
        <div className="home-contain">
          <UniOption/>
          <PopularCourse />
          {/* <UniOption />
          <UniOption />
          <UniOption /> */}
        </div>
        <Footer />
    </>
  )
}

export default Page