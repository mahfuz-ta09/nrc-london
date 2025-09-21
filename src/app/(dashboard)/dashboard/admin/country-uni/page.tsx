import CountryUniContent from "@/app/(dashboard)/DashboardSharedItem/SharedCountryUni/CountryUniContent"
import Loader from "@/component/shared/loader/loader"
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