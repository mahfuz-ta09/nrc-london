import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import '../../../css/shared/PopularCourse/PopularCourse.css'
import { faServer } from '@fortawesome/free-solid-svg-icons'

const PopularCourse = () => {
    return (
        <div className="popular-container">
            <div className="popular-courses">
                <h1 className='courses-tag'>Popular <span>Courses</span></h1>
                <div className="courses">
                    <div className="single-course">
                        <FontAwesomeIcon className='single-course-icon' icon={faServer}/>
                        <h2 className='single-course-heading' >Business</h2>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PopularCourse