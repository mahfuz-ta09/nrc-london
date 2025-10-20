'use client'
import { faArrowRight } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"


type StudentListProps = {
    setdetailState: React.Dispatch<React.SetStateAction<{ isOpen: boolean }>>;
    detailState: { isOpen: boolean };
    values: any;
    setValues: React.Dispatch<React.SetStateAction<any>>;
}

const StudentList = ({ setdetailState,detailState}: StudentListProps) => {

    
    return (
        <div className="table-contant">
            <h1 className='tag'>Review Student Applications</h1>

            <table>
                <thead>
                    <tr>
                        <th>name/email</th>
                        <th>personal info</th>
                        <th>assigned universities and subjects</th>
                        <th>files</th>
                        <th>english test</th>
                        <th>update history</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>
                            mahfuz anam tasnim
                            <br/>
                            matasnim11@gmail.com
                        </td>
                        <td><button onClick={()=>setdetailState({isOpen: true})} className="details-table-action">details <FontAwesomeIcon icon={faArrowRight}/></button></td>
                        <td><button onClick={()=>setdetailState({isOpen: true})} className="details-table-action">details <FontAwesomeIcon icon={faArrowRight}/></button></td>
                        <td><button onClick={()=>setdetailState({isOpen: true})} className="details-table-action">details <FontAwesomeIcon icon={faArrowRight}/></button></td>
                        <td><button onClick={()=>setdetailState({isOpen: true})} className="details-table-action">details <FontAwesomeIcon icon={faArrowRight}/></button></td>
                        <td><button onClick={()=>setdetailState({isOpen: true})} className="details-table-action">details <FontAwesomeIcon icon={faArrowRight}/></button></td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

export default StudentList
