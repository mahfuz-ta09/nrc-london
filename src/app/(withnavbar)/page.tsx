import Banner from "@/component/shared/Banner/Banner"
import UniOption from "@/component/shared/UniOption/UniOption"


const Page = () => {
  return (
    <>
        <Banner />
        <div className="home-contain">
          <UniOption />
          <UniOption />
          <UniOption />
          <UniOption />
        </div>
    </>
  )
}

export default Page