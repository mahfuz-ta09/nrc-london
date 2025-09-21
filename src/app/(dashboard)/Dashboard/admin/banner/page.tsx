import Banner from '@/app/(dashboard)/DashboardSharedItem/Banner/Banner'
import Loader from '@/component/shared/loader/loader'
import React, { Suspense } from 'react'

const page = () => {
    return (
        <div>
            <Suspense fallback={<Loader />}>
                <Banner />
            </Suspense>
        </div>
    )
}

export default page
