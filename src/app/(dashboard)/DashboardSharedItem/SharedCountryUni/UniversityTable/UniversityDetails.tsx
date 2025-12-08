'use client'
import React, { useState } from 'react'
import './css/UniversityDetails.css'

type ModalProps = {
    uniDetails: {
        data: any,
        isOPen: boolean,
        name: string
    },
    setUniDetails: React.Dispatch<React.SetStateAction<any>>
}

const UniversityDetails = ({ uniDetails, setUniDetails }: ModalProps) => {
    const [activeTab, setActiveTab] = useState<'overview' | 'requirements' | 'financials' | 'process'>('overview')
    const uni = uniDetails?.data || {}

    return (
        <div className={uniDetails?.isOPen ? 'modal-container openmoda-container' : 'modal-container'}>
            <div id='modal-body-id' className='modal-body'>
                <div className="uni-details-header">
                    <div className="uni-header-content">
                        {uni.universityImage?.url && (
                            <img 
                                src={uni.universityImage.url} 
                                alt={uni.universityName}
                                className="uni-header-image"
                            />
                        )}
                        <div className="uni-header-text">
                            <h1 className="uni-title">{uni.universityName || uniDetails?.name}</h1>
                            {uni.location?.city && (
                                <p className="uni-location">
                                    📍 {uni.location.city}
                                    {uni.location.state && `, ${uni.location.state}`}
                                </p>
                            )}
                            {uni.status && (
                                <span className={`uni-status-badge status-${uni.status}`}>
                                    {uni.status.replace(/_/g, ' ').toUpperCase()}
                                </span>
                            )}
                        </div>
                    </div>
                    <button
                        onClick={() => setUniDetails((prev: any) => ({ ...prev, data: null, name: '', isOPen: false }))}
                        className="cancel-btn"
                    >
                        ✕
                    </button>
                </div>


                <div className="uni-quick-stats">
                    {uni.rankings?.worldRanking && (
                        <div className="stat-card">
                            <div className="stat-icon">🌍</div>
                            <div className="stat-content">
                                <div className="stat-label">World Rank</div>
                                <div className="stat-value">#{uni.rankings.worldRanking}</div>
                            </div>
                        </div>
                    )}
                    {uni.studentProfile?.acceptanceRate && (
                        <div className="stat-card">
                            <div className="stat-icon">✓</div>
                            <div className="stat-content">
                                <div className="stat-label">Acceptance</div>
                                <div className="stat-value">{uni.studentProfile.acceptanceRate}%</div>
                            </div>
                        </div>
                    )}
                    {uni.tuitionFees?.lowFee && (
                        <div className="stat-card">
                            <div className="stat-icon">💰</div>
                            <div className="stat-content">
                                <div className="stat-label">Tuition</div>
                                <div className="stat-value">
                                    {uni.tuitionFees.currency} {uni.tuitionFees.lowFee.toLocaleString()}
                                </div>
                            </div>
                        </div>
                    )}
                    {uni.applicationProcess?.submissionMethod && (
                        <div className="stat-card">
                            <div className="stat-icon">📤</div>
                            <div className="stat-content">
                                <div className="stat-label">Method</div>
                                <div className="stat-value">{uni.applicationProcess.submissionMethod.toUpperCase()}</div>
                            </div>
                        </div>
                    )}
                </div>

                <div className="uni-tabs">
                    <button 
                        className={`uni-tab ${activeTab === 'overview' ? 'active' : ''}`}
                        onClick={() => setActiveTab('overview')}
                    >
                        Overview
                    </button>
                    <button 
                        className={`uni-tab ${activeTab === 'requirements' ? 'active' : ''}`}
                        onClick={() => setActiveTab('requirements')}
                    >
                        Requirements
                    </button>
                    <button 
                        className={`uni-tab ${activeTab === 'financials' ? 'active' : ''}`}
                        onClick={() => setActiveTab('financials')}
                    >
                        Financials
                    </button>
                    <button 
                        className={`uni-tab ${activeTab === 'process' ? 'active' : ''}`}
                        onClick={() => setActiveTab('process')}
                    >
                        Application
                    </button>
                </div>

                <div className="uni-tab-content">
                    {activeTab === 'overview' && (
                        <div className="tab-panel">
                            {uni.aboutUni && (
                                <div className="detail-section">
                                    <h3 className="section-title">About University</h3>
                                    <p className="about-text">{uni.aboutUni}</p>
                                </div>
                            )}

                            {(uni.contact?.website || uni.contact?.email || uni.contact?.phone) && (
                                <div className="detail-section">
                                    <h3 className="section-title">Contact Information</h3>
                                    <div className="info-grid">
                                        {uni.contact.website && (
                                            <div className="info-item">
                                                <div className="info-label">🌐 Website</div>
                                                <a href={uni.contact.website} target="_blank" rel="noopener noreferrer" className="info-link">
                                                    {uni.contact.website}
                                                </a>
                                            </div>
                                        )}
                                        {uni.contact.email && (
                                            <div className="info-item">
                                                <div className="info-label">📧 Email</div>
                                                <div className="info-value">{uni.contact.email}</div>
                                            </div>
                                        )}
                                        {uni.contact.phone && (
                                            <div className="info-item">
                                                <div className="info-label">📞 Phone</div>
                                                <div className="info-value">{uni.contact.phone}</div>
                                            </div>
                                        )}
                                        {uni.contact.admissionEmail && (
                                            <div className="info-item">
                                                <div className="info-label">✉️ Admissions</div>
                                                <div className="info-value">{uni.contact.admissionEmail}</div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )}


                            {uni.qualifications && uni.qualifications.length > 0 && (
                                <div className="detail-section">
                                    <h3 className="section-title">Qualifications Offered</h3>
                                    <div className="badges-container">
                                        {uni.qualifications.map((qual: string, idx: number) => (
                                            <span key={idx} className="badge badge-blue">
                                                {qual.replace(/_/g, ' ').toUpperCase()}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )}


                            {uni.accreditation && uni.accreditation.length > 0 && (
                                <div className="detail-section">
                                    <h3 className="section-title">Accreditations</h3>
                                    <div className="badges-container">
                                        {uni.accreditation.map((acc: string, idx: number) => (
                                            <span key={idx} className="badge badge-green">
                                                ✓ {acc}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )}
                            
                            {uni.features && (
                                <div className="detail-section">
                                    <h3 className="section-title">University Features</h3>
                                    <div className="features-grid">
                                        {uni.features.campusHousing && (
                                            <div className="feature-item">🏠 Campus Housing</div>
                                        )}
                                        {uni.features.internshipOpportunities && (
                                            <div className="feature-item">💼 Internship Opportunities</div>
                                        )}
                                        {uni.features.workPermitAvailable && (
                                            <div className="feature-item">📋 Work Permit Available</div>
                                        )}
                                        {uni.features.postStudyWorkVisa && (
                                            <div className="feature-item">✈️ Post-Study Work Visa</div>
                                        )}
                                        {uni.features.partTimeWorkAllowed && (
                                            <div className="feature-item">⏰ Part-Time Work Allowed</div>
                                        )}
                                    </div>
                                </div>
                            )}


                            {uni.tags && uni.tags.length > 0 && (
                                <div className="detail-section">
                                    <h3 className="section-title">Tags</h3>
                                    <div className="badges-container">
                                        {uni.tags.map((tag: string, idx: number) => (
                                            <span key={idx} className="badge badge-purple">
                                                #{tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )}


                            {uni.subjects && uni.subjects.length > 0 && (
                                <div className="detail-section">
                                    <h3 className="section-title">Available Programs ({uni.subjects.length})</h3>
                                    <div className="subjects-list">
                                        {uni.subjects.map((subject: any, idx: number) => (
                                            <div key={idx} className="subject-card">
                                                <div className="subject-header">
                                                    <h4 className="subject-name">{subject.subjectName}</h4>
                                                    <span className="subject-level">{subject.programLevel}</span>
                                                </div>
                                                {subject.degree && (
                                                    <p className="subject-degree">{subject.degree}</p>
                                                )}
                                                {subject.duration && (
                                                    <div className="subject-meta">
                                                        ⏱️ {subject.duration.value} {subject.duration.unit}
                                                    </div>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    )}


                    {activeTab === 'requirements' && (
                        <div className="tab-panel">
                            {uni.admissionRequirements && (
                                <div className="detail-section">
                                    <h3 className="section-title">Academic Requirements</h3>
                                    <div className="requirements-grid">
                                        {uni.admissionRequirements.minimumGPA && (
                                            <div className="requirement-card">
                                                <div className="req-icon">📊</div>
                                                <div className="req-content">
                                                    <div className="req-label">Minimum GPA</div>
                                                    <div className="req-value">
                                                        {uni.admissionRequirements.minimumGPA.value} / {uni.admissionRequirements.minimumGPA.scale}
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                        {uni.admissionRequirements.requiredEducationLevel && (
                                            <div className="requirement-card">
                                                <div className="req-icon">🎓</div>
                                                <div className="req-content">
                                                    <div className="req-label">Required Level</div>
                                                    <div className="req-value">
                                                        {uni.admissionRequirements.requiredEducationLevel.replace(/_/g, ' ').replace(/\b\w/g, (l: string) => l.toUpperCase())}
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </div>


                                    {uni.admissionRequirements.gpaEquivalents && uni.admissionRequirements.gpaEquivalents.length > 0 && (
                                        <div className="gpa-equivalents">
                                            <h4 className="subsection-title">GPA Equivalents</h4>
                                            <div className="equivalents-grid">
                                                {uni.admissionRequirements.gpaEquivalents.map((equiv: any, idx: number) => (
                                                    <div key={idx} className="equiv-item">
                                                        <span className="equiv-scale">{equiv.scale} Scale:</span>
                                                        <span className="equiv-value">{equiv.minimumValue}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}


                                    {uni.admissionRequirements.prerequisiteSubjects && uni.admissionRequirements.prerequisiteSubjects.length > 0 && (
                                        <div className="prerequisites">
                                            <h4 className="subsection-title">Prerequisite Subjects</h4>
                                            <div className="badges-container">
                                                {uni.admissionRequirements.prerequisiteSubjects.map((subj: string, idx: number) => (
                                                    <span key={idx} className="badge badge-orange">
                                                        {subj}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    )}


                                    {uni.admissionRequirements.preferredBackgrounds && uni.admissionRequirements.preferredBackgrounds.length > 0 && (
                                        <div className="backgrounds">
                                            <h4 className="subsection-title">Preferred Academic Backgrounds</h4>
                                            <div className="badges-container">
                                                {uni.admissionRequirements.preferredBackgrounds.map((bg: string, idx: number) => (
                                                    <span key={idx} className="badge badge-blue">
                                                        {bg}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            )}

                            <div className="detail-section">
                                <h3 className="section-title">English Proficiency Requirements</h3>
                                <p className="section-subtitle" style={{ 
                                    color: '#64748b', 
                                    fontSize: '14px', 
                                    marginBottom: '16px' 
                                }}>
                                    Students must meet the requirements for <strong>at least one</strong> of the following tests:
                                </p>
                                        
                                <div className="english-tests">
                                    {uni?.englishProf && Object.entries(uni?.englishProf).map(([testName, testScores]: [string, any], idx: number) => {
                                        const hasOverall = testScores.overall !== undefined;
                                        const sections = Object.entries(testScores).filter(([key]) => key !== 'overall');
                                        
                                        return (
                                            <div key={`${testName}-${idx}`} className="test-card">
                                                <div className="test-header">
                                                    <h4 className="test-name">{testName}</h4>
                                                    {hasOverall && (
                                                        <span className="test-score">
                                                            Overall: {testScores.overall}
                                                        </span>
                                                    )}
                                                </div>
                                                
                                                {sections.length > 0 ? (
                                                    <div className="test-sections">
                                                        {sections.map(([section, score]: [string, any]) => (
                                                            <div key={section} className="test-section">
                                                                <span className="section-name">
                                                                    {section.charAt(0).toUpperCase() + section.slice(1)}
                                                                </span>
                                                                <span className="section-score">{score}</span>
                                                            </div>
                                                        ))}
                                                    </div>
                                                ) : (
                                                    <div className="test-note" style={{
                                                        padding: '8px 12px',
                                                        background: '#f0f9ff',
                                                        borderRadius: '6px',
                                                        fontSize: '13px',
                                                        color: '#0369a1',
                                                        marginTop: '8px'
                                                    }}>
                                                        ℹ️ Overall score requirement only
                                                    </div>
                                                )}
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>

                            {uni.intakes && uni.intakes.length > 0 && (
                                <div className="detail-section">
                                    <h3 className="section-title">Available Intakes</h3>
                                    <div className="intakes-list">
                                        {uni.intakes.map((intake: any, idx: number) => (
                                            <div key={idx} className="intake-card">
                                                <div className="intake-header">
                                                    <h4 className="intake-name">{intake.name}</h4>
                                                    <span className={`intake-status ${intake.isOpen ? 'open' : 'closed'}`}>
                                                        {intake.isOpen ? '✓ Open' : '✕ Closed'}
                                                    </span>
                                                </div>
                                                <div className="intake-details">
                                                    <div className="intake-detail">
                                                        <span className="detail-icon">📅</span>
                                                        <span>Starts: {intake.startMonth}</span>
                                                    </div>
                                                    {intake.applicationDeadline && (
                                                        <div className="intake-detail">
                                                            <span className="detail-icon">⏰</span>
                                                            <span>Deadline: {intake.applicationDeadline}</span>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    )}


                    {activeTab === 'financials' && (
                        <div className="tab-panel">
                            {/* Tuition Fees */}
                            {uni.tuitionFees && (
                                <div className="detail-section">
                                    <h3 className="section-title">Tuition Fees</h3>
                                    <div className="fee-card">
                                        <div className="fee-range">
                                            <div className="fee-item">
                                                <div className="fee-label">Minimum</div>
                                                <div className="fee-amount">
                                                    {uni.tuitionFees.currency} {uni.tuitionFees.lowFee?.toLocaleString() || 0}
                                                </div>
                                            </div>
                                            <div className="fee-separator">→</div>
                                            <div className="fee-item">
                                                <div className="fee-label">Maximum</div>
                                                <div className="fee-amount">
                                                    {uni.tuitionFees.currency} {uni.tuitionFees.highFee?.toLocaleString() || 0}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="fee-meta">
                                            <span>Structure: {uni.tuitionFees.feeStructure?.replace(/_/g, ' ')}</span>
                                            {uni.tuitionFees.applicationFee > 0 && (
                                                <span>Application Fee: {uni.tuitionFees.currency} {uni.tuitionFees.applicationFee}</span>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            )}


                            {uni.initialDeposite > 0 && (
                                <div className="detail-section">
                                    <h3 className="section-title">Initial Deposit Required</h3>
                                    <div className="deposit-card">
                                        <div className="deposit-amount">
                                            {uni.tuitionFees?.currency || 'USD'} {uni.initialDeposite.toLocaleString()}
                                        </div>
                                        <p className="deposit-note">Required upon acceptance</p>
                                    </div>
                                </div>
                            )}


                            {uni.scholarship && uni.scholarship.available && (
                                <div className="detail-section">
                                    <h3 className="section-title">Scholarship Information</h3>
                                    <div className="scholarship-card">
                                        <div className="scholarship-icon">🎓</div>
                                        <div className="scholarship-content">
                                            <h4>Scholarships Available</h4>
                                            <p className="scholarship-amount">{uni.scholarship.amount}</p>
                                            {uni.scholarship.eligibilityCriteria && (
                                                <p className="scholarship-criteria">{uni.scholarship.eligibilityCriteria}</p>
                                            )}
                                            {uni.scholarship.types && uni.scholarship.types.length > 0 && (
                                                <div className="scholarship-types">
                                                    {uni.scholarship.types.map((type: string, idx: number) => (
                                                        <span key={idx} className="badge badge-green">
                                                            {type}
                                                        </span>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            )}


                            {uni.studentProfile && (
                                <div className="detail-section">
                                    <h3 className="section-title">Student Information</h3>
                                    <div className="demographics-grid">
                                        {uni.studentProfile.acceptanceRate && (
                                            <div className="demo-card">
                                                <div className="demo-value">{uni.studentProfile.acceptanceRate}%</div>
                                                <div className="demo-label">Acceptance Rate</div>
                                            </div>
                                        )}
                                        {uni.studentProfile.internationalStudentRatio && (
                                            <div className="demo-card">
                                                <div className="demo-value">{uni.studentProfile.internationalStudentRatio}%</div>
                                                <div className="demo-label">International Students</div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>
                    )}


                    {activeTab === 'process' && (
                        <div className="tab-panel">
                            {uni.applicationProcess && (
                                <div className="detail-section">
                                    <h3 className="section-title">Application Process</h3>
                                    <div className="process-card">
                                        <div className="process-method">
                                            <div className="method-icon">
                                                {uni.applicationProcess.submissionMethod === 'api' && '🔗'}
                                                {uni.applicationProcess.submissionMethod === 'manual' && '✍️'}
                                                {uni.applicationProcess.submissionMethod === 'email' && '📧'}
                                                {uni.applicationProcess.submissionMethod === 'courier' && '📦'}
                                            </div>
                                            <div className="method-content">
                                                <h4>Submission Method</h4>
                                                <p>{uni.applicationProcess.submissionMethod.toUpperCase()}</p>
                                            </div>
                                        </div>

                                        {uni.applicationProcess.portalUrl && (
                                            <div className="process-detail">
                                                <div className="detail-label">Application Portal</div>
                                                <a href={uni.applicationProcess.portalUrl} target="_blank" rel="noopener noreferrer" className="info-link">
                                                    {uni.applicationProcess.portalUrl}
                                                </a>
                                            </div>
                                        )}

                                        {uni.applicationProcess.hasAPIIntegration && (
                                            <div className="api-badge">
                                                <span>✓ API Integration Available</span>
                                            </div>
                                        )}

                                        {uni.applicationProcess.processingTime && (
                                            <div className="process-detail">
                                                <div className="detail-label">Processing Time</div>
                                                <div className="detail-value">⏱️ {uni.applicationProcess.processingTime}</div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )}


                            {uni.rankings && (uni.rankings.worldRanking || uni.rankings.nationalRanking) && (
                                <div className="detail-section">
                                    <h3 className="section-title">Rankings</h3>
                                    <div className="rankings-grid">
                                        {uni.rankings.worldRanking && (
                                            <div className="ranking-card">
                                                <div className="ranking-icon">🌍</div>
                                                <div className="ranking-content">
                                                    <div className="ranking-value">#{uni.rankings.worldRanking}</div>
                                                    <div className="ranking-label">World Ranking</div>
                                                </div>
                                            </div>
                                        )}
                                        {uni.rankings.nationalRanking && (
                                            <div className="ranking-card">
                                                <div className="ranking-icon">🏆</div>
                                                <div className="ranking-content">
                                                    <div className="ranking-value">#{uni.rankings.nationalRanking}</div>
                                                    <div className="ranking-label">National Ranking</div>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )}


                            <div className="detail-section">
                                <h3 className="section-title">Additional Information</h3>
                                <div className="metadata-grid">
                                    <div className="metadata-item">
                                        <span className="meta-label">University ID:</span>
                                        <span className="meta-value">{uni.universityId || 'N/A'}</span>
                                    </div>
                                    <div className="metadata-item">
                                        <span className="meta-label">Created:</span>
                                        <span className="meta-value">{uni.createdAt || 'N/A'}</span>
                                    </div>
                                    <div className="metadata-item">
                                        <span className="meta-label">Last Updated:</span>
                                        <span className="meta-value">{uni.lastUpdated || 'N/A'}</span>
                                    </div>
                                    {uni.popularityScore !== undefined && (
                                        <div className="metadata-item">
                                            <span className="meta-label">Popularity Score:</span>
                                            <span className="meta-value">{uni.popularityScore}</span>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default UniversityDetails