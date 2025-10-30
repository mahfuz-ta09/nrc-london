'use client'
import '@/css/component/Form.css'
import '@/css/component/Modal.css'
import { StudentListProps } from '../type';
import PersonalInfo from './PersonalInfo';

const StudentDetailModal = ({ detailState, setdetailState }: StudentListProps) => {


    if (detailState?.title === 'personal information') return <PersonalInfo detailState={detailState} setdetailState={setdetailState} />

    if (detailState?.title === 'all files') {
    return (
        <div className={detailState.isOpen ? "modal-container openmoda-container" : "modal-container"}>
        <div className="modal-body">
            <h4 className="modal-header">{detailState?.title}</h4>
            <button
            onClick={() => setdetailState({ isOpen: false, data: {}, title: '' })}
            className="cancel-btn"
            >
            X
            </button>

            <div className="modal-content">
            {Array.isArray(detailState?.data) && detailState.data.length > 0 ? (
                detailState.data.map((file: any, index: number) => (
                <div key={index} className="file-row">
                    <span className="file-label">{file.fileFor}</span>
                    {file.url ? (
                    <a
                        href={file.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="file-link"
                    >
                        View File
                    </a>
                    ) : (
                    <span className="no-file">No file uploaded</span>
                    )}
                </div>
                ))
            ) : (
                <p>No files available</p>
            )}
            </div>
        </div>
        </div>
    );
    }

    if (detailState?.title === 'assigned university & subjects') {
        return (
        <div className={detailState.isOpen ? "modal-container openmoda-container" : "modal-container"}>
            <div className="modal-body">
            <h4 className='modal-header'>{detailState?.title}</h4>
            <button
                onClick={() => setdetailState({ isOpen: false, data: {}, title: '' })}
                className="cancel-btn"
            >X</button>
            <div className="modal-content">
                {/* Add content for assigned university & subjects here */}
            </div>
            </div>
        </div>
        )
    }

    return null;
};

export default StudentDetailModal;
