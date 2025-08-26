import { Suspense } from "react"
import Review from "@/component/additional/Review/Review"
import Loader from "@/component/shared/Loader/Loader"



const page = () => {
    
    return (
      <div>
        <Suspense fallback={<Loader/>}>
            <Review />
        </Suspense>
      </div>
    )
}

export default page