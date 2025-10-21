'use client'

type StudentListProps = {
    setdetailState: React.Dispatch<React.SetStateAction<{ isOpen: boolean, data: any, title: string }>>;
    detailState: { isOpen: boolean , data: any , title: string};
    values: any;
    setValues: React.Dispatch<React.SetStateAction<any>>;
}

const StudentDetailModal = ({detailState,setdetailState}:StudentListProps) => {
    console.log(detailState)
    return (
        <div className={detailState.isOpen ? "modal-container openmoda-container" : "modal-container"}>
            <div className="modal-body">
                <h4 className='modal-header'>{detailState?.title}</h4>
                <button
                    onClick={() => setdetailState({ isOpen: false, data: {} , title:''})}
                    className="cancel-btn">X</button>
                <div className="modal-content">
                    {
                        Object.entries(detailState?.data || {}).map(([key, value]: [string, any]) => (
                            // <div key={key} className="detail-item">
                            //     <h5 className="detail-item-key">{key} :</h5>
                            //     <p className="detail-item-value">{value}</p>
                            // </div>
                            
                            <div key={key} className="input-container">
                                <label>{key}</label>
                                <input value={value} readOnly/>
                                <img src="" alt="" />
                            </div>
                        ))  
                    }
                </div>
            </div>
        </div>
    )
}

export default StudentDetailModal
