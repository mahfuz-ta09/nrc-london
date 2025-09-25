import { Suspense } from 'react'
import Loader from '@/component/shared/loader/loader'
import Banner from '@/app/(dashboard)/DashboardSharedItem/Banner/Banner'

const page = () => {
    return (
        <Suspense fallback={<Loader />}>
            <Banner />
        </Suspense>
    )
}

export default page
