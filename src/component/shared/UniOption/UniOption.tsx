import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import '../../../css/shared/Unioption/UniOption.css'
import { faArrowAltCircleLeft, faArrowAltCircleRight } from '@fortawesome/free-solid-svg-icons'

const UniOption = () => {
  return (
    <div className='unioption-cotainer'>
        <div className="uni-content">
            <h1>Have a look at your University options:</h1>
            <div className="unicaro">
                <div className="uni">
                    <img className="uni-image" src='https://images.pexels.com/photos/18647836/pexels-photo-18647836/free-photo-of-gate-of-buddhist-temple.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load'alt='' />
                    <div className="overlay"></div>
                    <div className="details">
                        <h3>Study in srilanks</h3>
                        <h3>Inspiring higher study in abroad</h3>
                    </div>
                    <button>details</button>
                </div>
                <div className="uni">
                    <img className="uni-image" src='https://images.pexels.com/photos/18647836/pexels-photo-18647836/free-photo-of-gate-of-buddhist-temple.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load' alt='' />
                    <div className="overlay"></div>
                    <div className="details">
                        <h3>Study in srilanks</h3>
                        <h3>Inspiring higher study in abroad</h3>
                    </div>
                    <button>details</button>
                </div>
                <div className="uni">
                    <img className="uni-image" src='https://images.pexels.com/photos/18647836/pexels-photo-18647836/free-photo-of-gate-of-buddhist-temple.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load' alt='' />
                    <div className="overlay"></div>
                    <div className="details">
                        <h3>Study in srilanks</h3>
                        <h3>Inspiring higher study in abroad</h3>
                    </div>
                    <button>details</button>
                </div>
                <div className="uni">
                    <img className="uni-image" src='https://images.pexels.com/photos/18647836/pexels-photo-18647836/free-photo-of-gate-of-buddhist-temple.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load' alt='' />
                    <div className="overlay"></div>
                    <div className="details">
                        <h3>Study in srilanks</h3>
                        <h3>Inspiring higher study in abroad</h3>
                    </div>
                    <button>details</button>
                </div>
            </div>
            <div className="uni-nav">
                <button className='uni-nav-btn'>see more</button>
                <div className="uni-nav-nav">
                    <button className='uni-nav-nav-btn'><FontAwesomeIcon icon={faArrowAltCircleLeft} /></button>
                    <button className='uni-nav-nav-btn'><FontAwesomeIcon icon={faArrowAltCircleRight}/></button>
                </div>
            </div>
        </div>
    </div>
  )
}

export default UniOption