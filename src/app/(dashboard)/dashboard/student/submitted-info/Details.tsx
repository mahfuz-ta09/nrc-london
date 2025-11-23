'use client'
import React from 'react'
import '../css/Details.css'
import { useUserInfo } from '@/utils/useUserInfo'
import Loader from '@/component/shared/loader/loader'
import { useGetSingleFileByStudentWithEmailQuery } from '@/redux/endpoints/studentfileprocess/proceedEndpoints'
import ProgressRing from './ProgressRing'


const Details = () => {
    let submitted = 0;
    let verified = 0;
    const user = useUserInfo()
    const { data , isLoading } = useGetSingleFileByStudentWithEmailQuery({ email: user.Uemail })
    if(isLoading) return <Loader />


    let userData = data?.data;
    console.log(userData);

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
    console.log(userData?.applicationState?.personalInfo?.verified)
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
                            <span className="stat-value">{userData?.preferredUniversities?.length} Assigned</span>
                        </div>
                    </div>
                </div>
                    
                    
                <div className="quick-actions">
                    <h3>Quick Actions</h3>
                    <div className="action-list">
                        <a href="#" className="action-btn">
                            <span className="action-icon">📤</span>
                            <span>Upload Documents</span>
                        </a>
                        <a href="#" className="action-btn">
                            <span className="action-icon">✏️</span>
                            <span>Edit Profile & academic info</span>
                        </a>
                        <a href="#" className="action-btn">
                            <span className="action-icon">🎓</span>
                            <span>Edit Assigned universities</span>
                        </a>
                        <a href="#" className="action-btn">
                            <span className="action-icon">📝</span>
                            <span>Upload test results</span>
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
                        Step 1: Personal Information 
                        <div className={userData?.applicationState?.personalInfo?.verified ?"timeline-step complete":"timeline-step pending"}>
                            <div className={userData?.applicationState?.personalInfo?.verified?"step-marker complete":"step-marker pending"}>{userData?.applicationState?.personalInfo?.verified?"✓":"⏳"}</div>
                            <div className="step-content">
                                <div className="step-header">
                                    <h3 className="step-title">Personal & Academic Information</h3>
                                    <div className="step-header-content">
                                        <span className={userData?.applicationState?.personalInfo?.verified?"step-status status-complete" :"step-status status-pending"}>
                                        <span>{userData?.applicationState?.personalInfo?.verified? "✓ Data verified": "✕ Data not verified"}</span>
                                    </span>
                                    <span className={userData?.applicationState?.personalInfo?.complete?"step-status status-complete" :"step-status status-pending"}>
                                        <span>{userData?.applicationState?.personalInfo?.complete? "✓ submission completed":"✕ submission not completed"}</span>
                                    </span>
                                    <span className={userData?.permission?.complete?"step-status status-complete" :"step-status status-pending"}>
                                        <span>{userData?.permission?.permission_personalInfo? "✓ Permitted to change":"✕ Not permitted to change"}</span>
                                    </span>
                                    </div>
                                </div>
                                <p className="step-description">
                                    Your personal details and academic background will be  verified by our team.
                                </p>
                                <div className="step-details">
                                    <div className="detail-box">
                                        <div className="detail-label">Full Name</div>
                                        <div className="detail-value">{userData?.name}</div>
                                    </div>
                                    <div className="detail-box">
                                        <div className="detail-label">Email</div>
                                        <div className="detail-value">{userData?.email}</div>
                                    </div>
                                    <div className="detail-box">
                                        <div className="detail-label">Nationality</div>
                                        <div className="detail-value">{userData?.countryCitizen}</div>
                                    </div>
                                    <div className="detail-box">
                                        <div className="detail-label">marital status</div>
                                        <div className="detail-value">{userData?.maritalStatus}</div>
                                    </div>
                                    <div className="detail-box">
                                        <div className="detail-label">DOB</div>
                                        <div className="detail-value">{userData?.dob}</div>
                                    </div>
                                    <div className="detail-box">
                                        <div className="detail-label">Passport No.</div>
                                        <div className="detail-value">{userData?.passportNo}</div>
                                    </div>
                                    <div className="detail-box">
                                        <div className="detail-label">Passport No.</div>
                                        <div className="detail-value">{userData?.currentAddress}</div>
                                    </div>
                                    <div className="detail-box">
                                        <div className="detail-label">Phone No.</div>
                                        <div className="detail-value">{userData?.phone}</div>
                                        <div className="detail-value">{userData?.alternativePhone}(alternative)</div>
                                    </div>
                                </div>
                                <div className="step-details">
                                    {
                                        userData?.academicInfo?.map((item: any, index: number) => (
                                                <div style={{gap:"10px", marginTop:"10px"}} key={index}>
                                                    <strong style={{fontSize:"12px",fontWeight:"600"}}>{index+1}</strong>
                                                    {Object.entries(item).map(([key, value]:any) => (
                                                        <div style={{margin:"10px"}} className="detail-box" key={key + index}>
                                                            <div className="detail-label">{key}</div>
                                                            <div className="detail-value">{value}</div>
                                                        </div>
                                                    ))}
                                                </div>
                                        ))
                                    }
                                </div>
                                {/* <div className="step-actions">
                                    <button className="btn btn-secondary">View Details</button>
                                    <button className="btn btn-secondary">Edit Information</button>
                                </div> */}
                            </div>
                        </div>
                        
                        Step 2: English Test 
                        <div className="timeline-step complete">
                            <div className="step-marker complete">✓</div>
                            <div className="step-content">
                                <div className="step-header">
                                    <h3 className="step-title">English Proficiency Test</h3>
                                    <span className="step-status status-complete">
                                        <span>✓</span>
                                        <span>Verified</span>
                                    </span>
                                </div>
                                <p className="step-description">
                                    Your IELTS test results have been verified. Overall band score: 7.5
                                </p>
                                <div className="step-details">
                                    <div className="detail-box">
                                        <div className="detail-label">Test Type</div>
                                        <div className="detail-value">IELTS Academic</div>
                                    </div>
                                    <div className="detail-box">
                                        <div className="detail-label">Test Date</div>
                                        <div className="detail-value">Oct 15, 2024</div>
                                    </div>
                                    <div className="detail-box">
                                        <div className="detail-label">Listening</div>
                                        <div className="detail-value">7.5</div>
                                    </div>
                                    <div className="detail-box">
                                        <div className="detail-label">Reading</div>
                                        <div className="detail-value">8.0</div>
                                    </div>
                                    <div className="detail-box">
                                        <div className="detail-label">Writing</div>
                                        <div className="detail-value">7.0</div>
                                    </div>
                                    <div className="detail-box">
                                        <div className="detail-label">Speaking</div>
                                        <div className="detail-value">7.5</div>
                                    </div>
                                </div>
                                <div className="step-actions">
                                    <button className="btn btn-secondary">View Certificate</button>
                                    <button className="btn btn-secondary">Update Scores</button>
                                </div>
                            </div>
                        </div>
                        
                        Step 3: Documents 
                        <div className="timeline-step pending">
                            <div className="step-marker pending">⏳</div>
                            <div className="step-content">
                                <div className="step-header">
                                    <h3 className="step-title">Required Documents</h3>
                                    <span className="step-status status-pending">
                                        <span>⏳</span>
                                        <span>2 Items Pending</span>
                                    </span>
                                </div>
                                <p className="step-description">
                                    Most documents have been uploaded and verified. Please complete the remaining items.
                                </p>
                                <div className="expandable-section">
                                    <button className="expand-toggle">
                                    {/* <button className="expand-toggle" onclick="this.nextElementSibling.style.display = this.nextElementSibling.style.display === 'none' ? 'block' : 'none'"> */}
                                        <span>View Document List</span>
                                        <span>▼</span>
                                    </button>
                                    {/* <div className="expand-content" style="display: none;">
                                        <div style="display: flex; flex-direction: column; gap: 8px;">
                                            <div style="display: flex; justify-content: space-between; padding: 8px; background: #f8fafc; border-radius: 6px;">
                                                <span style="font-size: 14px; color: #1e293b;">✓ Academic Transcript</span>
                                                <span style="font-size: 12px; color: #059669; font-weight: 600;">Verified</span>
                                            </div>
                                            <div style="display: flex; justify-content: space-between; padding: 8px; background: #f8fafc; border-radius: 6px;">
                                                <span style="font-size: 14px; color: #1e293b;">✓ Degree Certificate</span>
                                                <span style="font-size: 12px; color: #059669; font-weight: 600;">Verified</span>
                                            </div>
                                            <div style="display: flex; justify-content: space-between; padding: 8px; background: #fffbeb; border-radius: 6px;">
                                                <span style="font-size: 14px; color: #1e293b;">⏳ Passport Copy</span>
                                                <span style="font-size: 12px; color: #d97706; font-weight: 600;">Required</span>
                                            </div>
                                            <div style="display: flex; justify-content: space-between; padding: 8px; background: #fffbeb; border-radius: 6px;">
                                                <span style="font-size: 14px; color: #1e293b;">⏳ Statement of Purpose</span>
                                                <span style="font-size: 12px; color: #d97706; font-weight: 600;">Under Review</span>
                                            </div>
                                            <div style="display: flex; justify-content: space-between; padding: 8px; background: #f8fafc; border-radius: 6px;">
                                                <span style="font-size: 14px; color: #1e293b;">✓ Recommendation Letters</span>
                                                <span style="font-size: 12px; color: #059669; font-weight: 600;">Verified</span>
                                            </div>
                                        </div>
                                    </div> */}
                                </div>
                                <div className="step-actions">
                                    <button className="btn btn-primary">Upload Missing Files</button>
                                    <button className="btn btn-secondary">View All Documents</button>
                                </div>
                            </div>
                        </div>
                        
                        Step 4: Universities 
                        <div className="timeline-step complete">
                            <div className="step-marker complete">✓</div>
                            <div className="step-content">
                                <div className="step-header">
                                    <h3 className="step-title">University Assignments</h3>
                                    <span className="step-status status-complete">
                                        <span>4</span>
                                        <span>Universities Assigned</span>
                                    </span>
                                </div>
                                <p className="step-description">
                                    Based on your profile, we've assigned you to 4 universities. 2 applications are verified and ready.
                                </p>
                                <div className="expandable-section">
                                    <button className="expand-toggle" >
                                    {/* <button className="expand-toggle" onclick="this.nextElementSibling.style.display = this.nextElementSibling.style.display === 'none' ? 'block' : 'none'"> */}
                                        <span>View Universities</span>
                                        <span>▼</span>
                                    </button>
                                    <div className="expand-content" style={{display:" none"}}>
                                        <div className="universities-grid">
                                            <div className="university-item">
                                                <div>
                                                    <div className="uni-name">University of Toronto</div>
                                                    <div className="uni-program">MSc Computer Science • Canada</div>
                                                </div>
                                                <span className="uni-badge badge-verified">✓ Verified</span>
                                            </div>
                                            <div className="university-item">
                                                <div>
                                                    <div className="uni-name">University of Melbourne</div>
                                                    <div className="uni-program">Master of IT • Australia</div>
                                                </div>
                                                <span className="uni-badge badge-review">⏳ Review</span>
                                            </div>
                                            <div className="university-item">
                                                <div>
                                                    <div className="uni-name">TU Munich</div>
                                                    <div className="uni-program">MSc Informatics • Germany</div>
                                                </div>
                                                <span className="uni-badge badge-verified">✓ Verified</span>
                                            </div>
                                            <div className="university-item">
                                                <div>
                                                    <div className="uni-name">NUS Singapore</div>
                                                    <div className="uni-program">MSc Computing • Singapore</div>
                                                </div>
                                                <span className="uni-badge badge-review">⏳ Review</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="step-actions">
                                    <button className="btn btn-secondary">View All Details</button>
                                    <button className="btn btn-secondary">Compare Programs</button>
                                </div>
                            </div>
                        </div>
                    </div>
            </main>
        </div>
    )
}

export default Details
