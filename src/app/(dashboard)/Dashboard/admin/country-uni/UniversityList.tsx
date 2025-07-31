import '@/css/Dashboard/admin/UniversityList.css'
import { faBook, faFilter, faPen, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import AddUniversity from './AddUniversity'
import { useState } from 'react'
import AllSubjects from './AllSubjects'



const UniversityList = () => {
    const [isUniOpen,setIsUniOpen] = useState<boolean>(false)
    const [action,setAction] = useState<string>('')

    const [isSubOPen,setIsSubOpen] = useState<boolean>(false)
    const [uniName,setUniName] = useState<string>('')
    const [subAction,setSubAction] = useState<string>('')


    return (
        <div className='university-list-container'>
            <div className='university-list-header'>
                <h1 className='university-list-header-title'>universites(total:100)</h1>
                <button className='uni-list-filter'><FontAwesomeIcon icon={faFilter}/></button>
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
                            <th>subjects</th>
                            <th>update</th>
                            <th>delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>1</td>
                            <td>uk</td>
                            <td>university of Dhaka</td>
                            <td>165 million</td>
                            <td>165 million</td>
                            <td>165 million</td>
                            <td>165 million</td>
                            <td>165 million</td>
                            <td><button onClick={()=>{setIsSubOpen(!isSubOPen);setUniName('Kalo uni shit')}} className='university-list-table-btn'><FontAwesomeIcon icon={faBook}/></button></td>
                            <td><button onClick={()=>{setIsUniOpen(!isUniOpen);setAction('edit')}} className='university-list-table-btn'><FontAwesomeIcon icon={faPen}/></button></td>
                            <td><button  className='university-list-table-btn'><FontAwesomeIcon icon={faTrash}/></button></td>
                        </tr>
                    </tbody>
                </table>


                <AllSubjects 
                    uniName={uniName}
                    setUniName={setUniName}
                    isSubOPen={isSubOPen}
                    setIsSubOpen={setIsSubOpen}/>
                
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