'use client'
import { Suspense } from "react"
import { useUserInfo } from "@/utils/useUserInfo"
import Loader from "@/component/shared/loader/loader"
import ApplicationDetails from "@/app/(dashboard)/DashboardSharedItem/ApplicationDetails/ApplicationDetails"

       
const page = () => {
    const userInfo = useUserInfo()
    return (
      <div>
          <Suspense fallback={<Loader/>}>
            <ApplicationDetails studentId={userInfo.Uemail}/>
          </Suspense>
      </div>
    )
}

export default page
