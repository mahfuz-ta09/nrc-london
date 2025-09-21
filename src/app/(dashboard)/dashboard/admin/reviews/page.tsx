import { Suspense } from "react"
import Loader from "@/component/shared/loader/loader"
import Review from '@/app/(dashboard)/DashboardSharedItem/Review/Review'



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