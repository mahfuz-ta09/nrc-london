import { Suspense } from "react"
import Loader from "@/component/shared/loader/loader"
import StFile from "../../../DashboardSharedItem/StFile/StFile"



const page = () => {
    return (
        <Suspense fallback={<Loader />}>
            <StFile />
        </Suspense>
    )
}

export default page
