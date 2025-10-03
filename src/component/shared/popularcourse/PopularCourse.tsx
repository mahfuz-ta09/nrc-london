'use client'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import '../../../css/shared/PopularCourse/PopularCourse.css'
import { faArrowLeft, faArrowRight, faServer } from '@fortawesome/free-solid-svg-icons'
import { useRouter } from 'next/navigation'
import { useGetSubjectQuery } from '@/redux/endpoints/subject/subjectEndpoints'
import Loader from '../loader/loader'
import { useState } from 'react'

const PopularCourse = () => {
    const router = useRouter()
    const { data, isLoading } = useGetSubjectQuery()
    const courses = data?.data || []
    const coursesPerPage = 10
    const [currentPage, setCurrentPage] = useState(0)

    const totalPages = Math.ceil(courses.length / coursesPerPage)
    const startIndex = currentPage * coursesPerPage
    const displayedCourses = courses.slice(startIndex, startIndex + coursesPerPage)

    const nextPage = () => {
        if (currentPage < totalPages - 1) {
        setCurrentPage(prev => prev + 1)
        }
    }

    const prevPage = () => {
        if (currentPage > 0) {
        setCurrentPage(prev => prev - 1)
        }
    }

    return (
        <div className="popular-container">
        <div className="popular-courses">
            <div className="unioption-header">
            <h4 className="option-subtitle">📚 Popular Subjects</h4>
            <div className="option-title-decoration"></div>
            <h2 className="unioption-title">
                Explore Our <span>Subject</span> Library
            </h2>
            <p className="unioption-description">
                Discover a range of subjects carefully designed to support your academic journey. 
                Click on any subject to start exploring courses and materials tailored to your goals.
            </p>
            </div>

            <div className="courses">
            {isLoading ? (
                <Loader />
            ) : (
                displayedCourses.map((course: any) => (
                <div
                    key={course?._id}
                    onClick={() => router.push(`/subjects/${course?.slug || course?.country}`)}
                    className="single-course"
                >
                    <FontAwesomeIcon className="single-course-icon" icon={faServer} />
                    <h2 className="single-course-heading">
                    {course?.name}
                    </h2>
                </div>
                ))
            )}
            </div>

            {/* Pagination Controls */}
            <div className="btn-grp">
            <button onClick={prevPage} disabled={currentPage === 0}>
                <FontAwesomeIcon icon={faArrowLeft} />
            </button>
            <span className="pagination-info">
                {currentPage + 1} / {totalPages || 1}
            </span>
            <button onClick={nextPage} disabled={currentPage === totalPages - 1}>
                <FontAwesomeIcon icon={faArrowRight} />
            </button>
            </div>

            <button className="see-all" onClick={() => router.push('/subjects')}>
            View All Subjects
            </button>
        </div>
        </div>
    )
}

export default PopularCourse
