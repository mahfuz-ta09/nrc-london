import { StudentListProps } from "../../type";

const History = ({ detailState, setdetailState }: StudentListProps) => {

    
    return (
        <div className={detailState.isOpen ? "modal-container openmoda-container" : "modal-container"}>
            <div className="modal-body">

                <h4 className="modal-header">{detailState?.title}</h4>
                <button
                    onClick={() => setdetailState({ isOpen: false, data: [], title: "" })}
                    className="cancel-btn"
                >X</button>

                <div style={{margin:"10px 0"}} className="modal-content">
                    <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:"10px"}}>
                        {Array.isArray(detailState?.data) && detailState.data.length > 0 ? (
                            detailState.data.map((item: any, index: number) => {
                            return (
                                <div
                                    key={index}
                                    style={{
                                        borderLeft: "4px solid #004a62",
                                        padding: "10px 15px",
                                        marginBottom: "1rem",
                                        background: "#f8f9fa",
                                        borderRadius: "6px"
                                }}>
                                    <h4 style={{ marginBottom: "5px", textTransform: "capitalize", color: "#004a62" }}>
                                        {item?.stage}
                                    </h4>

                                    <div style={{ fontSize: "14px", marginBottom: "3px" }}>
                                        <strong>Comment:</strong> {item?.comment}
                                    </div>

                                    <div style={{ fontSize: "14px", marginBottom: "3px" }}>
                                        <strong>Date:</strong> {item?.date}
                                    </div>

                                    <div style={{ fontSize: "14px", marginBottom: "3px" }}>
                                        <strong>email:</strong> {item?.by?.email}
                                    </div>

                                    <div style={{ fontSize: "14px", opacity: 0.8 }}>
                                        <strong>role:</strong> {item?.by?.role}
                                    </div>
                                </div>
                            );
                            })
                        ) : (
                            <p style={{ textAlign: "center", color: "#666" }}>No history available.</p>
                        )}

                    </div>
                </div>
            </div>
        </div>
    );
};

export default History;
