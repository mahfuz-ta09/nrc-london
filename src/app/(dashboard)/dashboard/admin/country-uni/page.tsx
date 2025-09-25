import { Suspense } from "react"
import Loader from "@/component/shared/loader/loader"
import CountryUniContent from "@/app/(dashboard)/DashboardSharedItem/SharedCountryUni/CountryUniContent"



const page = () => {
    
    return (
      <Suspense fallback={<Loader />}>
        <CountryUniContent />   
      </Suspense>
    )
}

export default page