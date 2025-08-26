import CountryUniContent from "@/app/(dashboard)/DashboardSharedItem/SharedCountryUni/CountryUniContent"
import Loader from "@/component/shared/Loader/Loader"
import { Suspense } from "react"



const page = () => {
    
    return (
      <div>
        <Suspense fallback={<Loader />}>
          <CountryUniContent />   
        </Suspense>
      </div>
    )
}

export default page