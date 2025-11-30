'use client'
import ApplicationDetails from '@/app/(dashboard)/DashboardSharedItem/ApplicationDetails/ApplicationDetails'
import { useParams } from 'next/navigation'

const page = () => {
    const { studentId } = useParams()
    const id = Array.isArray(studentId) ? studentId[0] : studentId || ''
    return <ApplicationDetails studentId={id}/>
}

export default page
