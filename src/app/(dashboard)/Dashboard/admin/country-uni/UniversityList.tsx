import '@/css/Dashboard/admin/UniversityList.css'
import { faFilter, faPen, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'



const UniversityList = () => {
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
                            <th>englissh skills</th>
                            <th>scholarship</th>
                            <th>required qualifications</th>
                            <th>update</th>
                            <th>add subjects</th>
                            <th>delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>1</td>
                            <td>uk</td>
                            <td>Dhaka</td>
                            <td>165 million</td>
                            <td>165 million</td>
                            <td>165 million</td>
                            <td>165 million</td>
                            <td>165 million</td>
                            <td><button  className='university-list-table-btn'><FontAwesomeIcon icon={faPen}/></button></td>
                            <td><button  className='university-list-table-btn'><FontAwesomeIcon icon={faPlus}/></button></td>
                            <td><button  className='university-list-table-btn'><FontAwesomeIcon icon={faTrash}/></button></td>
                        </tr>
                    </tbody>
                </table>


                
            </div>
        </div>
    )
}

export default UniversityList