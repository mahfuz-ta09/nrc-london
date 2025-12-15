'use client'
import { useState } from 'react'
import { faTrash, faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons'
import './css/UniversityTable.css'
import { toast } from "react-toastify"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useGetSubjectListQuery, useRemoveSubjectMutation } from '@/redux/endpoints/subject/subjectEndpoints'
import Loader from '@/component/shared/loader/loader'

type ModalProps = {
    listSubject: {
        action: string,
        countryId: string,
        universityId: string,
        isOPen: boolean,
        name: string
    },
    setListSubject: React.Dispatch<React.SetStateAction<any>>,
    setAddSub?: React.Dispatch<React.SetStateAction<any>>
}

const SubjectListModal = ({ listSubject, setListSubject, setAddSub }: ModalProps) => {
    const [expandedRows, setExpandedRows] = useState<Set<string>>(new Set())
    const [removeSubject, { isLoading: removeLoading }] = useRemoveSubjectMutation()
    const { data, isLoading } = useGetSubjectListQuery({
        countryId: listSubject?.countryId || "",
        universityId: listSubject?.universityId || "",
        page: "1",
        total: "100"
    }, {
        skip: !listSubject?.countryId || !listSubject?.universityId
    })

    if (isLoading || removeLoading) {
        return <Loader />
    }

    if (!listSubject?.countryId || !listSubject?.universityId) {
        return null
    }

    const toggleRow = (subjectId: string) => {
        const newExpandedRows = new Set(expandedRows)
        if (newExpandedRows.has(subjectId)) {
            newExpandedRows.delete(subjectId)
        } else {
            newExpandedRows.add(subjectId)
        }
        setExpandedRows(newExpandedRows)
    }

    const handleDeleteSubject = async (subjectId: string) => {
        try {
            const isConfirmed = window.confirm(`Are you sure you want to delete this subject?`)
            if (!isConfirmed) return

            const res = await removeSubject({
                countryId: listSubject?.countryId,
                universityId: listSubject?.universityId,
                subjectId: subjectId
            }).unwrap()

            if (res?.data?.modifiedCount) {
                toast.success("Subject deleted successfully!")
            } else {
                toast.error('Failed to delete subject')
            }
        } catch (err) {
            console.error("Error deleting subject:", err)
            toast.error("Failed to delete subject")
        }
    }

    const handleAddSubject = () => {
        if (setAddSub) {
            setAddSub({
                action: 'Add',
                countryId: listSubject?.countryId,
                universityId: listSubject?.universityId,
                universityName: listSubject?.name,
                isOPen: true
            })
        }
        setListSubject((prev: any) => ({ 
            ...prev, 
            isOPen: false 
        }))
    }
    
    return (
        <div className={listSubject?.isOPen ? 'modal-container openmoda-container' : 'modal-container'}>
            <div id='modal-body-id' className='modal-body'>
                <div>
                    <h1 className='modal-header'>Subject list of {listSubject?.name}</h1>
                    <button
                        onClick={() => setListSubject((prev: any) => ({ 
                            ...prev, 
                            countryId: '', 
                            universityId: '', 
                            name: '', 
                            isOPen: false, 
                            action: "" 
                        }))}
                        className="cancel-btn"
                    >
                        X
                    </button>
                </div>

                {data?.data?.subjects?.length === 0 ? (
                    <div style={{ 
                        textAlign: 'center', 
                        padding: '40px', 
                        color: '#64748b' 
                    }}>
                        <p style={{ fontSize: '16px', marginBottom: '10px' }}>
                            No subjects found for this university
                        </p>
                        <button
                            onClick={handleAddSubject}
                            style={{
                                padding: '10px 20px',
                                background: '#667eea',
                                color: 'white',
                                border: 'none',
                                borderRadius: '6px',
                                cursor: 'pointer',
                                fontSize: '14px'
                            }}
                        >
                            Add First Subject
                        </button>
                    </div>
                ) : (
                    <div className="table-contant">
                        <table>
                            <thead>
                                <tr>
                                    <th>Subject Name</th>
                                    <th>Program Level</th>
                                    <th>Duration</th>
                                    <th>Cost</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data?.data?.subjects?.map((subject: any) => (
                                    <>
                                        <tr key={subject?.id}>
                                            <td style={{ color: "#fff", fontWeight: '500' }}>
                                                {subject?.subjectName}
                                            </td>
                                            <td style={{ color: "#fff" }}>
                                                {subject?.programLevel || 'N/A'}
                                            </td>
                                            <td style={{ color: "#fff" }}>
                                                {subject?.duration?.value} {subject?.duration?.unit || 'months'}
                                            </td>
                                            <td style={{ color: "#fff", fontWeight: '500' }}>
                                                ${subject?.cost?.toLocaleString()}
                                            </td>
                                            <td>
                                                <div style={{ 
                                                    display: 'flex', 
                                                    gap: '8px', 
                                                    justifyContent: 'center' 
                                                }}>
                                                    <button
                                                        onClick={() => toggleRow(subject?.id)}
                                                        style={{
                                                            background: "#667eea",
                                                            padding: '6px 12px',
                                                            color: 'white',
                                                            border: 'none',
                                                            borderRadius: '4px',
                                                            cursor: 'pointer',
                                                            display: 'flex',
                                                            alignItems: 'center',
                                                            gap: '5px',
                                                            fontSize: '13px'
                                                        }}
                                                        className='action-btn'
                                                    >
                                                        <FontAwesomeIcon 
                                                            icon={expandedRows.has(subject?.id) ? faChevronUp : faChevronDown} 
                                                            style={{ fontSize: '12px' }}
                                                        />
                                                    </button>
                                                    <button
                                                        onClick={() => handleDeleteSubject(subject?.id)}
                                                        style={{ background: "#f14040" }}
                                                        className='action-btn'
                                                    >
                                                        <FontAwesomeIcon icon={faTrash} />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                        {expandedRows.has(subject?.id) && (
                                            <tr key={`${subject?.id}-details`}>
                                                <td colSpan={5} style={{ 
                                                    padding: '0',
                                                    background: '#f8fafc',
                                                    border: 'none'
                                                }}>
                                                    <div style={{
                                                        padding: '20px',
                                                        animation: 'slideDown 0.3s ease-out'
                                                    }}>
                                                        <div style={{
                                                            display: 'grid',
                                                            gridTemplateColumns: 'repeat(2, 1fr)',
                                                            gap: '20px',
                                                            marginBottom: '20px'
                                                        }}>
                                                            <div>
                                                                <h4 style={{ 
                                                                    color: '#1e293b', 
                                                                    marginBottom: '12px',
                                                                    fontSize: '14px',
                                                                    fontWeight: '600',
                                                                    textTransform: 'uppercase',
                                                                    letterSpacing: '0.5px'
                                                                }}>
                                                                    Program Information
                                                                </h4>
                                                                <div style={{ 
                                                                    display: 'flex', 
                                                                    flexDirection: 'column', 
                                                                    gap: '8px' 
                                                                }}>
                                                                    <DetailItem 
                                                                        label="Degree" 
                                                                        value={subject?.degree || 'N/A'} 
                                                                    />
                                                                    <DetailItem 
                                                                        label="Program Type" 
                                                                        value={subject?.programType || 'N/A'} 
                                                                    />
                                                                    <DetailItem 
                                                                        label="Faculty" 
                                                                        value={subject?.faculty || 'N/A'} 
                                                                    />
                                                                    <DetailItem 
                                                                        label="Credits" 
                                                                        value={subject?.credits || 'N/A'} 
                                                                    />
                                                                    <DetailItem 
                                                                        label="Mode of Study" 
                                                                        value={subject?.modeOfStudy || 'N/A'} 
                                                                    />
                                                                </div>
                                                            </div>

                                                            <div>
                                                                <h4 style={{ 
                                                                    color: '#1e293b', 
                                                                    marginBottom: '12px',
                                                                    fontSize: '14px',
                                                                    fontWeight: '600',
                                                                    textTransform: 'uppercase',
                                                                    letterSpacing: '0.5px'
                                                                }}>
                                                                    Application Details
                                                                </h4>
                                                                <div style={{ 
                                                                    display: 'flex', 
                                                                    flexDirection: 'column', 
                                                                    gap: '8px' 
                                                                }}>
                                                                    <DetailItem 
                                                                        label="Language" 
                                                                        value={subject?.language || 'N/A'} 
                                                                    />
                                                                    <DetailItem 
                                                                        label="Intake" 
                                                                        value={subject?.intakes || 'N/A'} 
                                                                    />
                                                                    <DetailItem 
                                                                        label="Deadline" 
                                                                        value={subject?.applicationDeadline || 'N/A'} 
                                                                    />
                                                                    <DetailItem 
                                                                        label="Placement" 
                                                                        value={subject?.placement === 'yes' ? 'Available' : 'Not Available'} 
                                                                    />
                                                                    <DetailItem 
                                                                        label="Accreditation" 
                                                                        value={subject?.accreditation || 'N/A'} 
                                                                    />
                                                                </div>
                                                            </div>
                                                        </div>

                                                        {subject?.qualifications && Object.keys(subject.qualifications).length > 0 && (
                                                            <div style={{ marginBottom: '20px' }}>
                                                                <h4 style={{ 
                                                                    color: '#1e293b', 
                                                                    marginBottom: '12px',
                                                                    fontSize: '14px',
                                                                    fontWeight: '600',
                                                                    textTransform: 'uppercase',
                                                                    letterSpacing: '0.5px'
                                                                }}>
                                                                    Required Qualifications
                                                                </h4>
                                                                <div style={{ 
                                                                    display: 'flex', 
                                                                    flexWrap: 'wrap', 
                                                                    gap: '8px' 
                                                                }}>
                                                                    {Object.entries(subject?.qualifications || {}).map(([key, value]: [any, any]) => (
                                                                        <span 
                                                                            key={key}
                                                                            style={{
                                                                                padding: '6px 12px',
                                                                                background: '#e0e7ff',
                                                                                borderRadius: '15px',
                                                                                fontSize: '13px',
                                                                                color: '#4338ca',
                                                                                fontWeight: '500'
                                                                            }}
                                                                        >
                                                                            {key}: {value}
                                                                        </span>
                                                                    ))}
                                                                </div>
                                                            </div>
                                                        )}

                                                        {subject?.description && (
                                                            <div style={{ marginBottom: '20px' }}>
                                                                <h4 style={{ 
                                                                    color: '#1e293b', 
                                                                    marginBottom: '12px',
                                                                    fontSize: '14px',
                                                                    fontWeight: '600',
                                                                    textTransform: 'uppercase',
                                                                    letterSpacing: '0.5px'
                                                                }}>
                                                                    Description
                                                                </h4>
                                                                <p style={{ 
                                                                    color: '#475569', 
                                                                    lineHeight: '1.6',
                                                                    fontSize: '14px',
                                                                    margin: 0
                                                                }}>
                                                                    {subject?.description}
                                                                </p>
                                                            </div>
                                                        )}

                                                        {subject?.careerOpportunities && (
                                                            <div>
                                                                <h4 style={{ 
                                                                    color: '#1e293b', 
                                                                    marginBottom: '12px',
                                                                    fontSize: '14px',
                                                                    fontWeight: '600',
                                                                    textTransform: 'uppercase',
                                                                    letterSpacing: '0.5px'
                                                                }}>
                                                                    Career Opportunities
                                                                </h4>
                                                                <p style={{ 
                                                                    color: '#475569', 
                                                                    lineHeight: '1.6',
                                                                    fontSize: '14px',
                                                                    margin: 0
                                                                }}>
                                                                    {subject?.careerOpportunities}
                                                                </p>
                                                            </div>
                                                        )}

                                                        {(subject?.createdAt || subject?.updatedAt) && (
                                                            <div style={{ 
                                                                marginTop: '20px',
                                                                paddingTop: '15px',
                                                                borderTop: '1px solid #e2e8f0',
                                                                display: 'flex',
                                                                gap: '20px',
                                                                fontSize: '12px',
                                                                color: '#64748b'
                                                            }}>
                                                                {subject?.createdAt && (
                                                                    <span>Created: {subject.createdAt}</span>
                                                                )}
                                                                {subject?.updatedAt && (
                                                                    <span>Updated: {subject.updatedAt}</span>
                                                                )}
                                                            </div>
                                                        )}
                                                    </div>
                                                </td>
                                            </tr>
                                        )}
                                    </>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

            <style>{`
                @keyframes slideDown {
                    from {
                        opacity: 0;
                        transform: translateY(-10px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
            `}</style>
        </div>
    )
}

const DetailItem = ({ label, value }: { label: string, value: string | number }) => (
    <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between',
        padding: '8px 12px',
        background: 'white',
        borderRadius: '6px',
        border: '1px solid #e2e8f0'
    }}>
        <span style={{ 
            color: '#64748b', 
            fontSize: '13px',
            fontWeight: '500'
        }}>
            {label}:
        </span>
        <span style={{ 
            color: '#1e293b', 
            fontSize: '13px',
            fontWeight: '500'
        }}>
            {value}
        </span>
    </div>
)

export default SubjectListModal