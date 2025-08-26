import Banner from '@/app/(dashboard)/DashboardSharedItem/Banner/Banner'
import Loader from '@/component/shared/Loader/Loader'
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
