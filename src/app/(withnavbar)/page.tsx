import Banner from "@/component/shared/Banner/Banner"
import Footer from "@/component/shared/Footer/Footer"
import UniOption from "@/component/shared/UniOption/UniOption"
import PopularCourse from "@/component/shared/PopularCourse/PopularCourse"
import AcademicSolution from "@/component/shared/AcademicSolution/AcademicSolution"
import Review from "@/component/additional/Review/Review"
import FAQ from "@/component/additional/FAQ/FAQ"
import Process from "@/component/shared/Process/Process"


const Page = () => {
  return (
    <>
        <Banner />
        <div className="home-contain">
          <PopularCourse />
          <UniOption/>
          <Process />
          <AcademicSolution />
          <Review />
          <FAQ />
        </div>
        <Footer />
    </>
  )
}

export default Page