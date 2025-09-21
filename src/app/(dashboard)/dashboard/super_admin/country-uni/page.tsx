import CountryUniContent from "@/app/(dashboard)/DashboardSharedItem/SharedCountryUni/CountryUniContent"
import Loader from "@/component/shared/loader/loader"
import { Suspense } from "react"

const page = () => {
    return (
        <Suspense fallback={<Loader/>}>
          <CountryUniContent />   
        </Suspense>
    )
}

export default page
