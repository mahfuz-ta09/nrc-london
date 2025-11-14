'use client'
import { useGetFileByConditionsQuery } from "@/redux/endpoints/studentfileprocess/proceedEndpoints";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { StudentListProps } from "../type";
import '@/css/component/Table.css'

const StudentList = ({ setdetailState,detailState, values}: StudentListProps) => {
    const { data , isLoading } = useGetFileByConditionsQuery({values: values })

    // console.log(typeof(data?.data[0]?.permission?.permission_personalInfo))
    return (
        <div style={{ display: data?.data ? "block" : "none" }}>
            <h1 className='tag'>Review Student Applications</h1>
            <div className="table-contant">

                <table>
                    <thead>
                        <tr>
                            <th>name/email/id</th>
                            <th>submitted information</th>
                            <th>personal & academic info</th>
                            <th>assigned universities</th>
                            <th>submitted files</th>
                            <th>english test</th>
                            {/* <th>educational background</th> */}
                            <th>update history</th>
                            <th>delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            isLoading ? (
                                <tr>
                                    <td colSpan={7}>Loading...</td>
                                </tr>
                            ) : data?.data?.length > 0 ? (
                                data.data.map((student: any) => (
                                    <tr key={student?._id}>
                                        <td>
                                            {student?.name}
                                            <br/>
                                            {student?.email}
                                            <br/>
                                            {student?._id}
                                        </td>
                                        <td>
                                            <p className="table-text" onClick={()=>setdetailState({isOpen: true ,title:'personal information', data:{"personalInfo":{
                                                dob: student?.dob,
                                                name: student?.name,       
                                                email: student?.email,
                                                phone: student?.phone,               
                                                gender: student?.gender,              
                                                passportNo: student?.passportNo,
                                                maritalStatus : student?.maritalStatus,
                                                currentAddress: student?.currentAddress,
                                                countryCitizen: student?.countryCitizen,
                                                refusedCountry: student?.refusedCountry,
                                                alternativePhone: student?.alternativePhone,
                                            },
                                            "academicInfo":student?.academicInfo,
                                            "applicatonState":student?.applicationState?.personalInfo,
                                            },
                                            "id":student?._id})}>personal & academic info</p>
                                            <p className="table-text" onClick={()=>setdetailState({isOpen: true ,title:'assigned university & subjects', data:student?.preferredUniversities,"id":student?._id})}>assigned university</p>
                                            <p className="table-text" onClick={()=>setdetailState({isOpen: true ,title:'all files', data:student?.files,"id":student?._id})} >submitted files</p>
                                            <p className="table-text" onClick={()=>setdetailState({isOpen: true ,title:'english test', data:student?.englishProficiency,"id":student?._id})}>english test result</p>
                                        </td>
                                        <td>
                                            {student?.permission?.permission_personalInfo===true?<p className="table-message-positive">edit access given to student</p>:<p className="table-message-negative">edit access not given to student</p>}
                                            {student?.applicationState?.personalInfo?.complete===true?<p className="table-message-positive">submission completed</p>:<p className="table-message-negative">submission not completed</p>}
                                            {student?.applicationState?.personalInfo?.verified===true?<p className="table-message-positive">submitted data verified</p>:<p className="table-message-negative">submitted data not verified</p>}
                                        </td>
                                        <td>
                                            {student?.permission?.permission_prefferedUniSub===true?<p className="table-message-positive">edit access given to student</p>:<p className="table-message-negative">edit access not given to student</p>}
                                            {student?.applicationState?.prefferedUniSub?.complete===true?<p className="table-message-positive">submission completed</p>:<p className="table-message-negative">submission not completed</p>}
                                            {student?.applicationState?.prefferedUniSub?.verified===true?<p className="table-message-positive">submitted data verified</p>:<p className="table-message-negative">submitted data not verified</p>}
                                        </td>
                                        <td>
                                            {student?.permission?.permission_studentsFile===true?<p className="table-message-positive">edit access given to student</p>:<p className="table-message-negative">edit access not given to student</p>}
                                            {student?.applicationState?.studentsFile?.complete===true?<p className="table-message-positive">submission completed</p>:<p className="table-message-negative">submission not completed</p>}
                                            {student?.applicationState?.studentsFile?.verified===true?<p className="table-message-positive">submitted data verified</p>:<p className="table-message-negative">submitted data not verified</p>}
                                        </td>
                                        <td>
                                            {student?.permission?.permission_englishProficiency===true?<p className="table-message-positive">edit access given to student</p>:<p className="table-message-negative">edit access not given to student</p>}
                                            {student?.applicationState?.englishProficiency?.complete===true?<p className="table-message-positive">submission completed</p>:<p className="table-message-negative">submission not completed</p>}
                                            {student?.applicationState?.englishProficiency?.verified===true?<p className="table-message-positive">submitted data verified</p>:<p className="table-message-negative">submitted data not verified</p>}
                                        </td>
                                        <td><button onClick={()=>setdetailState({isOpen: true ,title:'history timeline', data:student?.applicationStatus})} className="details-table-action">details <FontAwesomeIcon icon={faArrowRight}/></button></td>
                                        <td><button className="details-table-action"></button></td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={7}>No students found.</td>
                                </tr>
                            )
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default StudentList
