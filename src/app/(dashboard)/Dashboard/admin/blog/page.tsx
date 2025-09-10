import { Suspense } from "react"
import Loader from "@/component/shared/Loader/Loader"
import Blog from "@/app/(dashboard)/DashboardSharedItem/Blog/Blog"

const page = () => {
    return (
        <div>
            <Suspense fallback={<Loader />}>
                <Blog />
            </Suspense>
        </div>
    )
}

export default page
