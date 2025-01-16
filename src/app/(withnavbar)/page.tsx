import Banner from "@/component/shared/Banner/Banner"
import Footer from "@/component/shared/Footer/Footer"
import UniOption from "@/component/shared/UniOption/UniOption"
import PopularCourse from "@/component/shared/PopularCourse/PopularCourse"
import AcademicSolution from "@/component/shared/AcademicSolution/AcademicSolution"
import Review from "@/component/additional/Review/Review"
import Process from "@/component/shared/Process/Process"
import FAQ from "@/component/UI/FAQ/FAQ"


const Page = () => {
  const faqItems = [
    {
      question: "What is the meaning of life?",
      answer: "42",
    },
    {
      question: "How much wood would a woodchuck chuck?",
      answer: "A woodchuck would chuck all the wood he could chuck, if a woodchuck could chuck wood!",
    },
    {
      question: "What happens if Pinocchio says, 'my nose will grow now'?",
      answer: "This is a paradox that has puzzled philosophers and fairy tale enthusiasts alike!",
    },
  ]
  
  return (
    <>
        <Banner />
        <div className="home-contain">
          <PopularCourse />
          <UniOption/>
          <Process />
          <AcademicSolution />
          <Review />
          <FAQ items={faqItems}  title="Frequently Asked Questions"/>
        </div>
        <Footer />
    </>
  )
}

export default Page