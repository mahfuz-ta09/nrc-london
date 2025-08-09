import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './UniversityTable.css'
import { faAdd, faList, faPen, faTrash } from '@fortawesome/free-solid-svg-icons'



const UniversityTable = () => {
    
    return (
        <div className='university-table'>
            <h1>University: all / total:110</h1>
            
            <div className='table-container'>
                <table id="customers">
                    <thead>
                        <tr>
                            <th>country</th>
                            <th>country image</th>
                            <th>serial</th>
                            <th>add subject</th>
                            <th>all subject</th>
                            <th>delete university</th>
                            <th>edit university</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Alfreds Futterkiste</td>
                            <td>Maria Anders</td>
                            <td>Germany</td>
                            <td><FontAwesomeIcon icon={faAdd}/></td>
                            <td><FontAwesomeIcon icon={faList}/></td>
                            <td><FontAwesomeIcon icon={faTrash}/></td>
                            <td><FontAwesomeIcon icon={faPen}/></td>
                        </tr>
                    </tbody>
                </table>

            </div>
        </div>
    )
}

export default UniversityTable