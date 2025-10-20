'use client'

import { faArrowRight } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

const StudentList = () => {
    return (
        <div className="table-contant">
            <table id="">
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
                        <td>details <FontAwesomeIcon icon={faArrowRight}/></td>
                        <td>details <FontAwesomeIcon icon={faArrowRight}/></td>
                        <td>details <FontAwesomeIcon icon={faArrowRight}/></td>
                        <td>details <FontAwesomeIcon icon={faArrowRight}/></td>
                        <td>details <FontAwesomeIcon icon={faArrowRight}/></td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

export default StudentList
