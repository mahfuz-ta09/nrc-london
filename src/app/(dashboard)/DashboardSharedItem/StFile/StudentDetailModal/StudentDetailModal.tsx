'use client'

import { useGetFileByConditionsQuery } from "@/redux/endpoints/studentfileprocess/proceedEndpoints";

type StudentListProps = {
    setdetailState: React.Dispatch<React.SetStateAction<{ isOpen: boolean }>>;
    detailState: { isOpen: boolean };
    values: any;
    setValues: React.Dispatch<React.SetStateAction<any>>;
}

const StudentDetailModal = ({detailState,setdetailState,values,setValues}:StudentListProps) => {
    const { data , isLoading } = useGetFileByConditionsQuery({values: values })
    // console.log(values , data)

    return (
        <div className={detailState.isOpen ? "modal-container openmoda-container" : "modal-container"}>
            <div className="modal-body">
                <h4 className='modal-header'>file details</h4>
                <button
                    onClick={() => setdetailState({ isOpen: false })}
                    className="cancel-btn"
                >X</button>
                <div className="modal-content">
                </div>
            </div>
        </div>
    )
}

export default StudentDetailModal
