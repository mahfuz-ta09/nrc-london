'use client'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import '../../../css/shared/PopularCourse/PopularCourse.css'
import { faServer } from '@fortawesome/free-solid-svg-icons'
import { useRouter } from 'next/navigation'
import { useGetSubjectQuery } from '@/redux/endpoints/subject/subjectEndpoints'
import Loader from '../Loader/Loader'


const PopularCourse = () => {
    const router = useRouter()
    const { data , isLoading } = useGetSubjectQuery()

    return (
        <div className="popular-container">
            
            <div className="popular-courses">
                <h1 className='courses-tag'>Popular <span>Courses</span> in</h1>
                <div className="courses">

                    {
                        isLoading? <Loader />:
                        data?.data?.map((course) => 
                            <div onClick={()=>router.push(`/Subjects/${course?.country}`)}   key={course?._id} className="single-course">
                                <FontAwesomeIcon className='single-course-icon' icon={faServer}/>
                                <h2 className='single-course-heading' >{course?.name.slice(0,15)}...</h2>
                            </div>
                        )
                    }

                </div>
            </div>
        </div>
    )
}

export default PopularCourse


