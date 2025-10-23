'use client'
import '@/css/component/Form.css'
import '@/css/component/Modal.css'

type StudentListProps = {
  setdetailState: React.Dispatch<React.SetStateAction<{ isOpen: boolean, data: any, title: string }>>;
  detailState: { isOpen: boolean, data: any, title: string };
  values: any;
  setValues: React.Dispatch<React.SetStateAction<any>>;
};
const personalInfoLabels:any = {
  name: "Student's Name",
  email: "Student's Email",
  phone: "Student's Phone",
  alternativePhone: "Alternative Phone",
  dob: "Date of Birth",
  passportNo: "Passport Number",
  currentAddress: "Current Address",
  countryCitizen: "Citizen",
  refused: "Ever Refused",
  refusedCountry: "Refused Country",
  gender: "Gender",
  maritalStatus: "Marital Status",
  emergencyContactName: "Emergency Contact Name"
};

const StudentDetailModal = ({ detailState, setdetailState }: StudentListProps) => {
    console.log(detailState?.data)
    if (detailState?.title === 'personal information') {
        return (
        <div className={detailState.isOpen ? "modal-container openmoda-container" : "modal-container"}>
            <div className="modal-body">
            <h4 className="modal-header">{detailState?.title}</h4>
            <button
                onClick={() => setdetailState({ isOpen: false, data: {}, title: '' })}
                className="cancel-btn"
            >X</button>

            <div className="modal-content">
                <div className="value-container">
                    {Object.entries(detailState?.data || {}).map(([key, value]:any) => (
                        <div key={key} className="value-body">
                            <label>{personalInfoLabels[key] || key}</label>
                            <h6>{value?value:'___'}</h6>
                        </div>
                    ))}

                </div>
            </div>
            </div>
        </div>
        );
    }
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
