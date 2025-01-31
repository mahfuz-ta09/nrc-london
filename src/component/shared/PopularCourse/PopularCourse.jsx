'use client'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import '../../../css/shared/PopularCourse/PopularCourse.css'
import { faServer } from '@fortawesome/free-solid-svg-icons'
import { useRouter } from 'next/navigation'


const PopularCourse = () => {
    const router = useRouter()

    return (
        <div className="popular-container">
        
            <svg className="footer-wave-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 100" preserveAspectRatio="none">
                <path className="footer-wave-path" d="M851.8,100c125,0,288.3-45,348.2-64V0H0v44c3.7-1,7.3-1.9,11-2.9C80.7,22,151.7,10.8,223.5,6.3C276.7,2.9,330,4,383,9.8 c52.2,5.7,103.3,16.2,153.4,32.8C623.9,71.3,726.8,100,851.8,100z"></path>
            </svg>
            
            <div className="popular-courses">
                <h1 className='courses-tag'>Popular <span>Courses</span></h1>
                <div className="courses">

                    <div className="single-course">
                        <FontAwesomeIcon className='single-course-icon' icon={faServer}/>
                        <h2 className='single-course-heading' >Business</h2>
                    </div>
                    

                    <div className="single-course">
                        <FontAwesomeIcon className='single-course-icon' icon={faServer}/>
                        <h2 className='single-course-heading' >Business</h2>
                    </div>
                    

                    <div className="single-course">
                        <FontAwesomeIcon className='single-course-icon' icon={faServer}/>
                        <h2 className='single-course-heading' >Business</h2>
                    </div>
                    

                    <div className="single-course">
                        <FontAwesomeIcon className='single-course-icon' icon={faServer}/>
                        <h2 className='single-course-heading' >Business</h2>
                    </div>
                

                    <div className="single-course">
                        <FontAwesomeIcon className='single-course-icon' icon={faServer}/>
                        <h2 className='single-course-heading' >Business</h2>
                    </div>
                    

                    <div className="single-course">
                        <FontAwesomeIcon className='single-course-icon' icon={faServer}/>
                        <h2 className='single-course-heading' >Business</h2>
                    </div>
                    

                    <div className="single-course">
                        <FontAwesomeIcon className='single-course-icon' icon={faServer}/>
                        <h2 className='single-course-heading' >Business</h2>
                    </div>
                    

                    <div className="single-course">
                        <FontAwesomeIcon className='single-course-icon' icon={faServer}/>
                        <h2 className='single-course-heading' >Business</h2>
                    </div>
                    

                    <div className="single-course">
                        <FontAwesomeIcon className='single-course-icon' icon={faServer}/>
                        <h2 className='single-course-heading' >Business</h2>
                    </div>
                    

                    <div className="single-course">
                        <FontAwesomeIcon className='single-course-icon' icon={faServer}/>
                        <h2 className='single-course-heading' >Business</h2>
                    </div>

                    <div className="single-course">
                        <FontAwesomeIcon className='single-course-icon' icon={faServer}/>
                        <h2 className='single-course-heading' >Business</h2>
                    </div>

                    <div className="single-course">
                        <FontAwesomeIcon className='single-course-icon' icon={faServer}/>
                        <h2 className='single-course-heading' >Business</h2>
                    </div>

                    <div className="single-course">
                        <FontAwesomeIcon className='single-course-icon' icon={faServer}/>
                        <h2 className='single-course-heading' >Business</h2>
                    </div>

                    <div className="single-course">
                        <FontAwesomeIcon className='single-course-icon' icon={faServer}/>
                        <h2 className='single-course-heading' >Business</h2>
                    </div>

                </div>
                <button onClick={()=>router.push('/Subjects')} className="see-all">see all courses</button>
            </div>
        </div>
    )
}

export default PopularCourse