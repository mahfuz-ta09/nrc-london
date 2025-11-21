'use client'
import '@/css/component/Table1.css'
import { StudentListProps } from "../type";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useGetFileByConditionsQuery } from "@/redux/endpoints/studentfileprocess/proceedEndpoints";
import { faArrowRight, faFile, faIdCard, faPaperclip, faTrash, faUniversity } from "@fortawesome/free-solid-svg-icons"

const StudentList = ({ setdetailState, detailState, values }: StudentListProps) => {
    const { data, isLoading } = useGetFileByConditionsQuery({ values: values })

    return (  
        <div style={{ display: data?.data ? "block" : "none" }} className="table-container">
            <h1 className='tag-new'>Review Student Applications</h1>
            <div className="table-contant-new">
                <table>
                    <thead>
                        <tr>
                            <th>Student Information</th>
                            <th>information field</th>
                            <th>Personal & Academic</th>
                            <th>Assigned Universities</th>
                            <th>Submitted Files</th>
                            <th>English Test</th>
                            <th>action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            isLoading ? (
                                <tr>
                                    <td colSpan={8}>Loading...</td>
                                </tr>
                            ) : data?.data?.length > 0 ? (
                                data.data.map((student: any) => (
                                    <tr key={student?._id}>
                                        <td>
                                            <div className="student-info">
                                                <span className="student-name">{student?.name}</span>
                                                <span className="student-email">{student?.email}</span>
                                                <span className="student-id">{student?._id}</span>
                                            </div>
                                        </td>

                                        {/* Quick Actions Column */}
                                        <td>
                                            <p className="table-text" onClick={() => setdetailState({
                                                isOpen: true, title: 'personal information', data: {
                                                    "personalInfo": {
                                                        dob: student?.dob,
                                                        name: student?.name,
                                                        email: student?.email,
                                                        phone: student?.phone,
                                                        gender: student?.gender,
                                                        passportNo: student?.passportNo,
                                                        maritalStatus: student?.maritalStatus,
                                                        currentAddress: student?.currentAddress,
                                                        countryCitizen: student?.countryCitizen,
                                                        refusedCountry: student?.refusedCountry,
                                                        alternativePhone: student?.alternativePhone,
                                                    },
                                                    "academicInfo": student?.academicInfo,
                                                    "applicatonState": student?.applicationState?.personalInfo,
                                                },
                                                "id": student?._id
                                            })}>
                                                <FontAwesomeIcon icon={faIdCard} />
                                                Personal Info
                                            </p>
                                            <p className="table-text" onClick={() => setdetailState({ isOpen: true, title: 'assigned university & subjects', data: student?.preferredUniversities, "id": student?._id })}>
                                                <FontAwesomeIcon icon={faUniversity} />
                                                Universities
                                            </p>
                                            <p className="table-text" onClick={() => setdetailState({ isOpen: true, title: 'english test', data: student?.englishProficiency, "id": student?._id })}>
                                                <FontAwesomeIcon icon={faPaperclip} />
                                                Test Results
                                            </p>
                                            <p className="table-text" onClick={() => setdetailState({ isOpen: true, title: 'all files', data: student?.files, "id": student?._id })} >
                                                <FontAwesomeIcon icon={faFile} />
                                                Files
                                            </p>
                                        </td>

                                        <td>
                                            <div className="status-column">
                                                {student?.permission?.permission_personalInfo === true ?
                                                    <p className="table-message-positive">Edit access granted</p> :
                                                    <p className="table-message-negative">Access locked</p>
                                                }
                                                {student?.applicationState?.personalInfo?.complete === true ?
                                                    <p className="table-message-positive">Submitted</p> :
                                                    <p className="table-message-negative">Not submitted</p>
                                                }
                                                {student?.applicationState?.personalInfo?.verified === true ?
                                                    <p className="table-message-positive">Verified</p> :
                                                    <p className="table-message-negative">Not verified</p>
                                                }
                                            </div>
                                        </td>


                                        <td>
                                            <div className="status-column">
                                                {student?.permission?.permission_prefferedUniSub === true ?
                                                    <p className="table-message-positive">Edit access granted</p> :
                                                    <p className="table-message-negative">Access locked</p>
                                                }
                                                {student?.applicationState?.prefferedUniSub?.complete === true ?
                                                    <p className="table-message-positive">Submitted</p> :
                                                    <p className="table-message-negative">Not submitted</p>
                                                }
                                                {student?.applicationState?.prefferedUniSub?.verified === true ?
                                                    <p className="table-message-positive">Verified</p> :
                                                    <p className="table-message-negative">Not verified</p>
                                                }
                                            </div>
                                        </td>

                                        <td>
                                            <div className="status-column">
                                                {student?.permission?.permission_studentsFile === true ?
                                                    <p className="table-message-positive">Edit access granted</p> :
                                                    <p className="table-message-negative">Access locked</p>
                                                }
                                                {student?.applicationState?.studentsFile?.complete === true ?
                                                    <p className="table-message-positive">Submitted</p> :
                                                    <p className="table-message-negative">Not submitted</p>
                                                }
                                                {student?.applicationState?.studentsFile?.verified === true ?
                                                    <p className="table-message-positive">Verified</p> :
                                                    <p className="table-message-negative">Not verified</p>
                                                }
                                            </div>
                                        </td>


                                        <td>
                                            <div className="status-column">
                                                {student?.permission?.permission_englishProficiency === true ?
                                                    <p className="table-message-positive">Edit access granted</p> :
                                                    <p className="table-message-negative">Access locked</p>
                                                }
                                                {student?.applicationState?.englishProficiency?.complete === true ?
                                                    <p className="table-message-positive">Submitted</p> :
                                                    <p className="table-message-negative">Not submitted</p>
                                                }
                                                {student?.applicationState?.englishProficiency?.verified === true ?
                                                    <p className="table-message-positive">Verified</p> :
                                                    <p className="table-message-negative">Not verified</p>
                                                }
                                            </div>
                                        </td>

                                        <td>
                                            <button 
                                                onClick={() => setdetailState({ isOpen: true, title: 'history timeline', data: student?.applicationStatus })} 
                                                className="details-table"
                                            >
                                                Details 
                                                <FontAwesomeIcon icon={faArrowRight} />
                                            </button>
                                            <button className="remove-btn">
                                                <FontAwesomeIcon icon={faTrash} />
                                            </button>
                                        </td>


                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={8}>No students found.</td>
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