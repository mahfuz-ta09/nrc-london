import '@/css/Dashboard/admin/AllSubjects.css'
import { faCancel } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


type Props = {
  isSubOPen: boolean
  uniName: string
  setIsSubOpen: React.Dispatch<React.SetStateAction<boolean>>
  setUniName: React.Dispatch<React.SetStateAction<string>>
}

const AllSubjects = ({ isSubOPen , setIsSubOpen , setUniName , uniName} : Props) => {

        return (
            <div className={isSubOPen?'allsubjects-cotainer subopen':'subclose'}>
                <button className='cancel-btn' onClick={()=>{setIsSubOpen(!isSubOPen);setUniName('')}}>X</button>
                
                <div className='allsubjects'>

                    <div className="subjects-add-form-cont">
                        <h3>you can delete university related to {uniName}</h3>

                       
                        <div className='sub-list'>
                            <div className="sub-list-details">
                                <h1>Sustainable Maritime Operations</h1>
                                <h1>Sustainable Maritime Operations</h1>
                                <h1>Sustainable Maritime Operations</h1>
                                <h1>Sustainable Maritime Operations</h1>
                                <button><FontAwesomeIcon icon={faCancel}/></button>
                            </div>
                        </div>
                        
                    </div>

                </div>
            </div>
        )
}

export default AllSubjects