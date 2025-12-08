"use client"
import '@/css/component/Table1.css'
import { StudentListProps } from "../type";
import { useRouter } from 'next/navigation';
import { useGetFileByConditionsQuery } from "@/redux/endpoints/studentfileprocess/proceedEndpoints";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight, faList, faListCheck } from '@fortawesome/free-solid-svg-icons';

const StudentList = ({ setdetailState, detailState, values }: StudentListProps) => {
    const router = useRouter();
    const { data, isLoading } = useGetFileByConditionsQuery({ values });

    const students = data?.data || [];
    
    return (
        <div className="table-wrapper">
            <div className="table-header">
                <h2>
                    <span>📋</span>
                    Student Applications
                </h2>
            </div>

            <div className="st-table-container">
                <table>
                    <thead>
                        <tr>
                            <th>Student Information</th>
                            <th>Quick Actions</th>
                            <th>Dates</th>
                            <th>Details</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {isLoading && (
                            <tr className="loading-row">
                                <td colSpan={6}>
                                    <div className="loading-spinner"></div>
                                    <div style={{ color: "#64748b" }}>Loading students...</div>
                                </td>
                            </tr>
                        )}

                        {!isLoading && students.length === 0 && (
                            <tr className="empty-row">
                                <td colSpan={6}>
                                    <div className="empty-icon">📭</div>
                                    <div className="empty-text">No students found</div>
                                </td>
                            </tr>
                        )}

                        {!isLoading && students.length > 0 && (
                            students.map((student: any) => (
                                <tr key={student?._id}>
                                    <td className="student-info-cell">
                                        <div className="student-info">
                                            <div className="student-avatar">
                                                {student?.name?.substring(0, 2).toUpperCase()}
                                            </div>
                                            <div className="student-details">
                                                <div className="student-name">{student?.name}</div>
                                                <div className="student-email">{student?.email}</div>
                                                <span className="student-id">{student?._id}</span>
                                            </div>
                                            

                                        </div> 
                                    </td>

                                    <td className="quick-actions-cell">
                                        <div className="quick-actions">
                                            <button className="quick-btn" onClick={() => setdetailState({
                                                isOpen: true,
                                                title: "personal information",
                                                data: {
                                                    personalInfo: {
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
                                                    academicInfo: student?.academicInfo,
                                                    applicatonState: student?.applicationState?.personalInfo,
                                                },
                                                id: student?._id
                                            })}>👤 Personal</button>

                                            <button className="quick-btn" onClick={() => setdetailState({
                                                isOpen: true, 
                                                title: 'assigned university & subjects/ search course',
                                                data: student?.universityApplications,
                                                id: student?._id
                                            })}>🎓 Universities</button>

                                            <button className="quick-btn" onClick={() => setdetailState({
                                                isOpen: true, title: 'all files',
                                                data: student?.files,
                                                id: student?._id
                                            })}>📄 Files</button>

                                            <button className="quick-btn" onClick={() => setdetailState({
                                                isOpen: true, title: 'english test',
                                                data: student?.englishProficiency,
                                                id: student?._id
                                            })}>📝 Test</button>
                                        </div>
                                    </td>

                                    <td className="dates-cell">
                                        <div className="date-info">
                                            <div className="date-item">
                                                <span className="date-label">Created</span>
                                                <span className="date-value">{student?.createdAt || "--"}</span>
                                            </div>
                                            <div className="date-item">
                                                <span className="date-label">Updated</span>
                                                <span className="date-value">{student?.lastUpdated || "--"}</span>
                                            </div>
                                        </div>
                                    </td>

                                    <td className="uni-count-cell">
                                        <button className="action-btn btn-history" onClick={() => router.push(`/dashboard/super_admin/st-file/${student?._id}`)}>
                                            <FontAwesomeIcon icon={faListCheck}/>student details
                                        </button>
                                        <button className="action-btn btn-history" style={{marginTop:"5px"}} onClick={() => router.push(`/dashboard/super_admin/st-file/${student?._id}/apply`)}>
                                            <FontAwesomeIcon icon={faListCheck}/>application details
                                        </button>
                                    </td>


                                    <td className="actions-cell">
                                        <div className="action-buttons">
                                            <button className="action-btn btn-history" onClick={() => setdetailState({ isOpen: true, title: 'history timeline', data: student?.history })}>
                                                <span>📋</span>
                                                <span>History</span>
                                            </button>

                                            <button className="action-btn btn-delete">
                                                <span>🗑️</span>
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default StudentList;
