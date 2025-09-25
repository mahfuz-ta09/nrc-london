import { Suspense } from "react"
import Loader from "@/component/shared/loader/loader"
import AffiliatedUni from "@/app/(dashboard)/DashboardSharedItem/AffiliatedUniversities/AffiliatedUni"

const page = () => {
  return (
    <Suspense fallback={<Loader/>}>
        <AffiliatedUni />
    </Suspense>
  )
}

export default page
