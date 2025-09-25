import { Suspense } from "react"
import Loader from "@/component/shared/loader/loader"
import Blog from "@/app/(dashboard)/DashboardSharedItem/Blog/Blog"

const page = () => {
    return (
        <Suspense fallback={<Loader />}>
            <Blog />
        </Suspense>
    )
}

export default page
