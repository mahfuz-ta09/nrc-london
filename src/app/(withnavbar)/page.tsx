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
      question: "What are the requirements to study abroad?",
      answer: "Requirements vary by country and university but generally include academic transcripts, proof of English proficiency (IELTS/TOEFL), a Statement of Purpose (SOP), Letters of Recommendation (LORs), and financial proof.",
    },
    {
      question: "How long does the student visa process take?",
      answer: "The processing time depends on the country, but typically it takes 4-12 weeks. It is advisable to apply at least 3-6 months in advance.",
    },
    {
      question: "Can I work while studying abroad?",
      answer: "Most countries allow international students to work part-time during studies (usually 20 hours per week) and full-time during holidays. However, specific rules vary by country.",
    },
    {
      question: "What are the best countries to study abroad?",
      answer: "The best country depends on your field of study, budget, and career goals. Popular options include the USA, Canada, UK, Australia, and Germany for their quality education and post-study work opportunities.",
    },
    {
      question: "How much does it cost to study abroad?",
      answer: "The cost depends on the country, university, and course. Tuition fees range from $5,000 to $50,000 per year, plus living expenses. Scholarships and financial aid are available to help reduce costs.",
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
          <FAQ items={faqItems}  title="Frequently Asked Questions" color="white"/>
          <Footer />
        </div>
    </>
  )
}

export default Page