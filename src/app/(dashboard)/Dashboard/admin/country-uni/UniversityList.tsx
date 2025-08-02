import '@/css/Dashboard/admin/UniversityList.css'
import { faBook, faFilter, faPen, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import AddUniversity from './AddUniversity'
import { useState } from 'react'
import AllSubjects from './AllSubjects'
import AddSubjectToUni from './AddSubjectToUni'



const UniversityList = () => {
    const [isUniOpen,setIsUniOpen] = useState<boolean>(false)
    const [action,setAction] = useState<string>('')
    const [isSubOPen,setIsSubOpen] = useState<boolean>(false)
    const [uniName,setUniName] = useState<string>('')
    const [isAddSubOpen,setIsAddSubOpen] = useState<boolean>(false)
    const [showOption,setShowOption] = useState<boolean>(false)

    return (
        <div className='university-list-container'>
            
            <div className='university-list-header'>
                <h1 className='university-list-header-title'>universites(total:100)</h1>
                <button  onClick={()=>setShowOption(!showOption)}  className='uni-list-filter'><FontAwesomeIcon icon={faFilter}/></button>
                
            </div>
            
            <div className={showOption?"uni-filter show-uni-option":"hide-uni-option"}>
            </div>

            <div className="university-list">
                
                <table className="university-list-table">
                    <thead>
                        <tr>
                            <th>id</th>
                            <th>country</th>
                            <th>university name</th>
                            <th>initial depossit</th>
                            <th>tuition fee</th>
                            <th>english skills</th>
                            <th>scholarship</th>
                            <th>required qualifications</th>
                            <th>subjects details</th>
                            <th>add subject</th>
                            <th>update</th>
                            <th>delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* <tr>
                            <td>1</td>
                            <td>uk</td>
                            <td>university of Dhaka</td>
                            <td>165 million</td>
                            <td>165 million</td>
                            <td>165 million</td>
                            <td>165 million</td>
                            <td>165 million</td>
                            <td><button onClick={()=>{setIsSubOpen(!isSubOPen);setUniName('Kalo uni shit')}} className='university-list-table-btn'><FontAwesomeIcon icon={faBook}/></button></td>
                            <td><button onClick={()=>{setIsAddSubOpen(!isAddSubOpen);setUniName('Kalo uni shit')}} className='university-list-table-btn'><FontAwesomeIcon icon={faPlus}/></button></td>
                            <td><button onClick={()=>{setIsUniOpen(!isUniOpen);setAction('edit')}} className='university-list-table-btn'><FontAwesomeIcon icon={faPen}/></button></td>
                            <td><button  className='university-list-table-btn'><FontAwesomeIcon icon={faTrash}/></button></td>
                        </tr> */}
                    </tbody>
                </table>


                <AllSubjects 
                    uniName={uniName}
                    setUniName={setUniName}
                    isSubOPen={isSubOPen}
                    setIsSubOpen={setIsSubOpen}/>

                <AddSubjectToUni 
                    isAddSubOpen={isAddSubOpen}
                    setIsAddSubOpen={setIsAddSubOpen}
                    uniName={uniName}
                    setUniName={setUniName}/>
                
                <AddUniversity
                    action={action}
                    setAction={setAction}
                    isUniOpen={isUniOpen}
                    setIsUniOpen={setIsUniOpen}/>

            </div>
        </div>
    )
}

export default UniversityList