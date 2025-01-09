import Banner from "@/component/shared/Banner/Banner"
import Footer from "@/component/shared/Footer/Footer"
import UniOption from "@/component/shared/UniOption/UniOption"
import PopularCourse from "@/component/shared/PopularCourse/PopularCourse"
import AcademicSolution from "@/component/shared/AcademicSolution/AcademicSolution"


const Page = () => {
  return (
    <>
        <Banner />
        <div className="home-contain">
          <UniOption/>
          <PopularCourse />
          <AcademicSolution />
          {/* <UniOption />
          <UniOption />
          <UniOption /> */}
        </div>
        <Footer />
    </>
  )
}

export default Page