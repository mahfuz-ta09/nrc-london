import { useState } from "react"
import { StudentListProps } from "../../type"


const EducationalBack = ({ detailState, setdetailState }: StudentListProps) => {
    const [isEditing, setIsEditing] = useState(false)

    return (
        <div className={detailState.isOpen? 'modal-container openmoda-container': 'modal-container' }>
            <div className="modal-body">
                <h4 className="modal-header">{detailState?.title}</h4>
                <button
                    onClick={() => setdetailState({ isOpen: false, data: {}, title: '' })}
                    className="cancel-btn"
                >X</button>

                <div className="modal-content">
                    <div style={{ display: 'flex', justifyContent: 'end' }}>
                        {!isEditing ? (
                        <button className="add-btn" onClick={() => setIsEditing(true)}>
                            ✏️ Edit
                        </button>
                        ) : (
                        <button
                            className="add-btn"
                            style={{ backgroundColor: '#f55', color: '#fff' }}
                            onClick={() => setIsEditing(false)}>
                            ✖ Cancel
                        </button>
                        )}
                    </div>
    
                    <div style={{marginTop:"20px"}}>
                        <div className="checkbox-container">
                            <h5>🟡 required verification</h5>
                            <br />
                            { isEditing && (<label>mark verified</label>)}
                            { isEditing && (<input type="checkbox" />)}
                        </div>
                        <div className="checkbox-container">
                            <h5>🔴 not ready for submission</h5>
                            <br />
                            { isEditing && (<label>mark this part ready for submission</label>)}
                            { isEditing && (<input type="checkbox" />)}
                        </div>
                        <div className="checkbox-container">
                            <h5>🔴 student are not allowed to change these data</h5>
                            <br />
                            { isEditing && (<label>mark this part ready for submission</label>)}
                            { isEditing && (<input type="checkbox" />)}
                        </div>
                    </div>

        
                </div>
            </div>
        </div>
    )
}

export default EducationalBack
