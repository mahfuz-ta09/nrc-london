import Loader from '@/component/shared/Loader/Loader'
import StFile from '../../../DashboardSharedItem/StFile/StFile'
import { Suspense } from 'react'

const page = () => {
    return (
        <Suspense fallback={<Loader />}>
            <StFile />
        </Suspense>
    )
}

export default page
