import '../../../css/shared/AcademicSolution/AcademicSolution.css'

const AcademicSolution = () => {
    return (
        <div className='academicSolution-container'>
            <div className="academicSolution">
                <h1 className='academicSolution-header'>Your one step <span>Academic solution</span></h1>
                <div className="academic-plans">
                    <div className="single-plan">
                        <img className="plan-image" src='https://images.pexels.com/photos/18647836/pexels-photo-18647836/free-photo-of-gate-of-buddhist-temple.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load' alt='' />
                        <h2 className='plan-header'>Bachelor’s Degree in Computer Science</h2>
                        <p className='plan-addition'>This plan is designed for students seeking a comprehensive education in computer science, covering programming, data structures, software engineering, and artificial intelligence. It's perfect for those aiming to build a solid foundation in technology and start a career in software development.</p>
                    </div>
                    <div className="single-plan">
                        <img className="plan-image" src='https://images.pexels.com/photos/18647836/pexels-photo-18647836/free-photo-of-gate-of-buddhist-temple.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load' alt='' />
                        <h2 className='plan-header'>Master’s Degree in Business Administration</h2>
                        <p className='plan-addition'>Our MBA plan provides an in-depth understanding of business strategies, marketing, finance, and entrepreneurship. With a focus on leadership and management, this program is ideal for students looking to advance their careers in the corporate world.</p>
                    </div>
                    <div className="single-plan">
                        <img className="plan-image" src='https://images.pexels.com/photos/18647836/pexels-photo-18647836/free-photo-of-gate-of-buddhist-temple.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load' alt='' />
                        <h2 className='plan-header'>Study Abroad – International Relations</h2>
                        <p className='plan-addition'>This plan is tailored for students passionate about global affairs, diplomacy, and international relations. Gain critical insights into politics, economics, and cultural studies while experiencing life in top universities around the world.</p>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default AcademicSolution