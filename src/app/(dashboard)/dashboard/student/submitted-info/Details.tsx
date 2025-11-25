'use client'
import React, { Suspense, useState } from 'react'
import '../css/Details.css'
import { useUserInfo } from '@/utils/useUserInfo'
import Loader from '@/component/shared/loader/loader'
import { useGetSingleFileByStudentWithEmailQuery } from '@/redux/endpoints/studentfileprocess/proceedEndpoints'
import ProgressRing from './ProgressRing'
import StudentDetailModal from '@/app/(dashboard)/DashboardSharedItem/StFile/StudentDetailModal/StudentDetailModal'

const Details = () => {
    const [detailState,setdetailState] = useState({ isOpen: false, data: {} , title: '', id:''})
    const [expandedSections, setExpandedSections] = useState<{[key: string]: boolean}>({
        academic: false,
        universities: false
    });
  
    const toggleSection = (section: string) => {
        setExpandedSections(prev => ({
            ...prev,
            [section]: !prev[section]
        }));
    };

    let submitted = 0;
    let verified = 0;
    const user = useUserInfo()
    const { data, isLoading } = useGetSingleFileByStudentWithEmailQuery({ email: user.Uemail })
    
    if(isLoading) return <Loader />

    let userData = data?.data;

    if(data?.data?.applicationState){
        if(userData?.applicationState?.personalInfo?.complete) submitted +=1;
        if(userData?.applicationState?.personalInfo?.verified) verified +=1;
        if(userData?.applicationState?.englishProficiency?.complete) submitted +=1;
        if(userData?.applicationState?.englishProficiency?.verified) verified +=1;
        if(userData?.applicationState?.studentsFile?.complete) submitted +=1;
        if(userData?.applicationState?.studentsFile?.verified) verified +=1;
        if(userData?.applicationState?.prefferedUniSub?.complete) submitted +=1;
        if(userData?.applicationState?.prefferedUniSub?.verified) verified +=1;
    }

    console.log(userData)
    return (
        <div className="container-file">
            <aside className="sidebar">
                <div className="progress-card">
                    <h3>Application Progress</h3>
                    <ProgressRing verified={verified} />
                    <div className="progress-stats">
                        <div className="stat-item">
                            <span className="stat-label">Submitted Data</span>
                            <span className="stat-value">{submitted} / 4</span>
                        </div>
                        <div className="stat-item">
                            <span className="stat-label">Verified Items</span>
                            <span className="stat-value">{verified} / 4</span>
                        </div>
                        <div className="stat-item">
                            <span className="stat-label">Universities</span>
                            <span className="stat-value">{userData?.preferredUniversities?.length || 0} Assigned</span>
                        </div>
                    </div>
                </div>
                
                <div className="quick-actions">
                    <h3>Quick Actions</h3>
                    <div className="action-list">
                        <a onClick={() => setdetailState({ isOpen: true, title: 'all files', data: userData?.files, "id": userData?._id })} className="action-btn">
                            <span className="action-icon">📤</span>
                            <span>Upload Documents</span>
                        </a>
                        <a  onClick={() => setdetailState({
                                isOpen: true, 
                                title: 'personal information', 
                                data: {
                                    "personalInfo": {
                                        dob: userData?.dob,
                                        name: userData?.name,
                                        email: userData?.email,
                                        phone: userData?.phone,
                                        gender: userData?.gender,
                                        passportNo: userData?.passportNo,
                                        maritalStatus: userData?.maritalStatus,
                                        currentAddress: userData?.currentAddress,
                                        countryCitizen: userData?.countryCitizen,
                                        refusedCountry: userData?.refusedCountry,
                                        alternativePhone: userData?.alternativePhone,
                                    },
                                    "academicInfo": userData?.academicInfo,
                                    "applicatonState": userData?.applicationState?.personalInfo,
                                },
                                id: userData?._id
                            })} className="action-btn">
                            <span className="action-icon">✏️</span>
                            <span>Edit Profile</span>
                        </a>
                        <a onClick={() => setdetailState({ isOpen: true, title: 'assigned university & subjects', data: userData?.preferredUniversities, id: userData?._id })} className="action-btn">
                            <span className="action-icon">🎓</span>
                            <span>Edit Universities</span>
                        </a>
                        <a onClick={() => setdetailState({ isOpen: true, title: 'english test', data: userData?.englishProficiency, "id": userData?._id })}className="action-btn">
                            <span className="action-icon">📝</span>
                            <span>Upload Test Results</span>
                        </a>
                    </div>
                </div>
            </aside>
            
            <main className="main-content">
                <div className="content-header">
                    <h1>Your Application Journey</h1>
                    <p>Track your progress through each step of the application process</p>
                </div>
                
                <div className="timeline">
                    <div className={userData?.applicationState?.personalInfo?.verified ? "timeline-step complete" : "timeline-step pending"}>
                        <div className={userData?.applicationState?.personalInfo?.verified ? "step-marker complete" : "step-marker pending"}>
                            {userData?.applicationState?.personalInfo?.verified ? "✓" : "⏳"}
                        </div>
                        <div className="step-content">
                            <div className="step-header">
                                <h3 className="step-title">Personal & Academic Information</h3>
                                <div className="step-header-content">
                                    <span className={userData?.applicationState?.personalInfo?.verified ? "step-status status-complete" : "step-status status-pending"}>
                                        <span className="status-icon">{userData?.applicationState?.personalInfo?.verified ? "✓" : "⏳"}</span>
                                        <span className="status-text">{userData?.applicationState?.personalInfo?.verified ? "Verified" : "Not Verified"}</span>
                                    </span>
                                    <span className={userData?.applicationState?.personalInfo?.complete ? "step-status status-complete" : "step-status status-pending"}>
                                        <span className="status-icon">{userData?.applicationState?.personalInfo?.complete ? "✓" : "⏳"}</span>
                                        <span className="status-text">{userData?.applicationState?.personalInfo?.complete ? "Complete" : "Incomplete"}</span>
                                    </span>
                                    <span className={userData?.permission?.permission_personalInfo ? "step-status status-complete" : "step-status status-locked"}>
                                        <span className="status-icon">{userData?.permission?.permission_personalInfo ? "✓" : "🔒"}</span>
                                        <span className="status-text">{userData?.permission?.permission_personalInfo ? "Editable" : "Locked"}</span>
                                    </span>
                                </div>
                            </div>
                            <p className="step-description">
                                Your personal details and academic background will be verified by our team.
                            </p>
                            
                            {/* Personal Info */}
                            <div className="info-section">
                                <h4 className="section-subtitle">Personal Information</h4>
                                <div className="step-details">
                                    <div className="detail-box">
                                        <div className="detail-label">Full Name</div>
                                        <div className="detail-value">{userData?.name || 'Not provided'}</div>
                                    </div>
                                    <div className="detail-box">
                                        <div className="detail-label">Email</div>
                                        <div className="detail-value">{userData?.email || 'Not provided'}</div>
                                    </div>
                                    <div className="detail-box">
                                        <div className="detail-label">Date of Birth</div>
                                        <div className="detail-value">{userData?.dob || 'Not provided'}</div>
                                    </div>
                                    <div className="detail-box">
                                        <div className="detail-label">Nationality</div>
                                        <div className="detail-value">{userData?.countryCitizen || 'Not provided'}</div>
                                    </div>
                                    <div className="detail-box">
                                        <div className="detail-label">Marital Status</div>
                                        <div className="detail-value">{userData?.maritalStatus || 'Not provided'}</div>
                                    </div>
                                    <div className="detail-box">
                                        <div className="detail-label">Passport No.</div>
                                        <div className="detail-value">{userData?.passportNo || 'Not provided'}</div>
                                    </div>
                                    <div className="detail-box">
                                        <div className="detail-label">Phone Number</div>
                                        <div className="detail-value">
                                            {userData?.phone || 'Not provided'}
                                            {userData?.alternativePhone && <span className="alt-phone"> (Alt: {userData?.alternativePhone})</span>}
                                        </div>
                                    </div>
                                    <div className="detail-box detail-box-full">
                                        <div className="detail-label">Current Address</div>
                                        <div className="detail-value">{userData?.currentAddress || 'Not provided'}</div>
                                    </div>
                                </div>
                            </div>

                            {/* Academic Info - Expandable */}
                            {userData?.academicInfo && userData.academicInfo.length > 0 && (
                                <div className="expandable-section">
                                    <button 
                                        className="expand-toggle" 
                                        onClick={() => toggleSection('academic')}
                                    >
                                        <span>📚 View Academic Qualifications ({userData.academicInfo.length})</span>
                                        <span className={expandedSections.academic ? "arrow-up" : "arrow-down"}>▼</span>
                                    </button>
                                    {expandedSections.academic && (
                                        <div className="expand-content">
                                            {userData.academicInfo.map((item: any, index: number) => (
                                                <div key={index} className="academic-item">
                                                    <div className="academic-header">
                                                        <strong className="academic-number">Qualification #{index + 1}</strong>
                                                    </div>
                                                    <div className="step-details">
                                                        {Object.entries(item).map(([key, value]: any) => (
                                                            <div className="detail-box" key={key + index}>
                                                                <div className="detail-label">{key}</div>
                                                                <div className="detail-value">{value || 'Not provided'}</div>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                    
                    {/* Step 2: English Test */}
                    <div className={userData?.applicationState?.englishProficiency?.verified ? "timeline-step complete" : "timeline-step pending"}>
                        <div className={userData?.applicationState?.englishProficiency?.verified ? "step-marker complete" : "step-marker pending"}>
                            {userData?.applicationState?.englishProficiency?.verified ? "✓" : "⏳"}
                        </div>
                        <div className="step-content">
                            <div className="step-header">
                                <h3 className="step-title">English Proficiency Test</h3>
                                <div className="step-header-content">
                                    <span className={userData?.applicationState?.englishProficiency?.verified ? "step-status status-complete" : "step-status status-pending"}>
                                        <span className="status-icon">{userData?.applicationState?.englishProficiency?.verified ? "✓" : "⏳"}</span>
                                        <span className="status-text">{userData?.applicationState?.englishProficiency?.verified ? "Verified" : "Not Verified"}</span>
                                    </span>
                                    <span className={userData?.applicationState?.englishProficiency?.complete ? "step-status status-complete" : "step-status status-pending"}>
                                        <span className="status-icon">{userData?.applicationState?.englishProficiency?.complete ? "✓" : "⏳"}</span>
                                        <span className="status-text">{userData?.applicationState?.englishProficiency?.complete ? "Complete" : "Incomplete"}</span>
                                    </span>
                                    <span className={userData?.permission?.permission_englishProficiency ? "step-status status-complete" : "step-status status-locked"}>
                                        <span className="status-icon">{userData?.permission?.permission_englishProficiency ? "✓" : "🔒"}</span>
                                        <span className="status-text">{userData?.permission?.permission_englishProficiency ? "Editable" : "Locked"}</span>
                                    </span>
                                </div>
                            </div>
                            <p className="step-description">
                                All the tests you have taken will be listed here.
                            </p>
                            
                            {!userData?.englishProficiency || Object.keys(userData.englishProficiency).length === 0 ? (
                                <div className="empty-state">
                                    <div className="empty-icon">📝</div>
                                    <p className="empty-text">No test data submitted yet.</p>
                                </div>
                            ) : (
                                <div className="test-results">
                                    {Object.keys(userData.englishProficiency).map((testKey: any) => (
                                        <div key={testKey} className="test-section">
                                            <h4 className="test-title">{testKey}</h4>
                                            <div className="step-details">
                                                {Object.entries(userData.englishProficiency[testKey] || {}).map(([key, value]: any) => (
                                                    <div className="detail-box" key={testKey + '-' + key}>
                                                        <div className="detail-label">{key}</div>
                                                        <div className="detail-value">{String(value)}</div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                    
                    {/* Step 3: Documents */}
                    <div className={userData?.applicationState?.studentsFile?.verified ? "timeline-step complete" : "timeline-step pending"}>
                        <div className={userData?.applicationState?.studentsFile?.verified ? "step-marker complete" : "step-marker pending"}>
                            {userData?.applicationState?.studentsFile?.verified ? "✓" : "⏳"}
                        </div>
                        <div className="step-content">
                            <div className="step-header">
                                <h3 className="step-title">Submitted Documents</h3>
                                <div className="step-header-content">
                                    <span className={userData?.applicationState?.studentsFile?.verified ? "step-status status-complete" : "step-status status-pending"}>
                                        <span className="status-icon">{userData?.applicationState?.studentsFile?.verified ? "✓" : "⏳"}</span>
                                        <span className="status-text">{userData?.applicationState?.studentsFile?.verified ? "Verified" : "Not Verified"}</span>
                                    </span>
                                    <span className={userData?.applicationState?.studentsFile?.complete ? "step-status status-complete" : "step-status status-pending"}>
                                        <span className="status-icon">{userData?.applicationState?.studentsFile?.complete ? "✓" : "⏳"}</span>
                                        <span className="status-text">{userData?.applicationState?.studentsFile?.complete ? "Complete" : "Incomplete"}</span>
                                    </span>
                                    <span className={userData?.permission?.permission_studentsFile ? "step-status status-complete" : "step-status status-locked"}>
                                        <span className="status-icon">{userData?.permission?.permission_studentsFile ? "✓" : "🔒"}</span>
                                        <span className="status-text">{userData?.permission?.permission_studentsFile ? "Editable" : "Locked"}</span>
                                    </span>
                                </div>
                            </div>
                            <p className="step-description">
                                All the documents you have submitted will be listed here.
                            </p>
                            
                            {!userData?.files || userData.files.length === 0 ? (
                                <div className="empty-state">
                                    <div className="empty-icon">📄</div>
                                    <p className="empty-text">No documents uploaded yet.</p>
                                </div>
                            ) : (
                                <div className="file-container">
                                    {userData.files.map((fileItem: any, index: number) => (
                                        <div key={index} className={`file-item ${fileItem.verified ? 'file-verified' : 'file-pending'}`}>
                                            <div className="file-icon">📄</div>
                                            <div className="file-info">
                                                <div className="file-name">{fileItem.fileName}</div>
                                                <div className="file-date">{fileItem.uploadedAt}</div>
                                            </div>
                                            <a 
                                                href={fileItem?.url} 
                                                target="_blank" 
                                                rel="noopener noreferrer" 
                                                className="file-view-btn"
                                            >
                                                View
                                            </a>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                    
                    
                    <div className={userData?.applicationState?.prefferedUniSub?.verified ? "timeline-step complete" : "timeline-step pending"}>
                        <div className={userData?.applicationState?.prefferedUniSub?.verified ? "step-marker complete" : "step-marker pending"}>
                            {userData?.applicationState?.prefferedUniSub?.verified ? "✓" : "⏳"}
                        </div>
                        <div className="step-content">
                            <div className="step-header">
                                <h3 className="step-title">University Assignments</h3>
                                <div className="step-header-content">
                                    <span className={userData?.applicationState?.prefferedUniSub?.verified ? "step-status status-complete" : "step-status status-pending"}>
                                        <span className="status-icon">{userData?.applicationState?.prefferedUniSub?.verified ? "✓" : "⏳"}</span>
                                        <span className="status-text">{userData?.applicationState?.prefferedUniSub?.verified ? "Verified" : "Not Verified"}</span>
                                    </span>
                                    <span className={userData?.applicationState?.prefferedUniSub?.complete ? "step-status status-complete" : "step-status status-pending"}>
                                        <span className="status-icon">{userData?.applicationState?.prefferedUniSub?.complete ? "✓" : "⏳"}</span>
                                        <span className="status-text">{userData?.applicationState?.prefferedUniSub?.complete ? "Complete" : "Incomplete"}</span>
                                    </span>
                                    <span className={userData?.permission?.permission_prefferedUniSub ? "step-status status-complete" : "step-status status-locked"}>
                                        <span className="status-icon">{userData?.permission?.permission_prefferedUniSub ? "✓" : "🔒"}</span>
                                        <span className="status-text">{userData?.permission?.permission_prefferedUniSub ? "Editable" : "Locked"}</span>
                                    </span>
                                </div>
                            </div>
                            <p className="step-description">
                                Based on your profile, you have been assigned to universities.
                            </p>
                            
                            {!userData?.preferredUniversities || userData.preferredUniversities.length === 0 ? (
                                <div className="empty-state">
                                    <div className="empty-icon">🎓</div>
                                    <p className="empty-text">No universities assigned yet.</p>
                                </div>
                            ) : (
                                <div className="expandable-section">
                                    <button 
                                        className="expand-toggle" 
                                        onClick={() => toggleSection('universities')}
                                    >
                                        <span>View All Universities ({userData.preferredUniversities.length})</span>
                                        <span className={expandedSections.universities ? "arrow-up" : "arrow-down"}>▼</span>
                                    </button>
                                    {expandedSections.universities && (
                                        <div className="expand-content">
                                            <div className="universities-grid">  
                                                <div className="expand-content">
                                                    {userData.preferredUniversities.map((item: any, index: number) => (
                                                        <div key={index} className="academic-item">
                                                            <div className="academic-header">
                                                                <strong className="academic-number">University #{index + 1}</strong>
                                                            </div>
                                                            <div className="step-details">
                                                                {Object.entries(item).map(([key, value]: any) => (
                                                                    <div className="detail-box" key={key + index}>
                                                                        <div className="detail-label">{key}</div>
                                                                        <div className="detail-value">{value || 'Not provided'}</div>
                                                                    </div>
                                                                ))}
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </main>
            <Suspense fallback={<Loader />}>
                <StudentDetailModal
                    setdetailState={setdetailState}
                    detailState={detailState}
                />
            </Suspense>
        </div>
    )
}

export default Details