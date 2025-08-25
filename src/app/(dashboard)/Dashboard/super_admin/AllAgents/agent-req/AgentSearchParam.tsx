
const AgentSearchParam = ({openFilter , agentSearchParameter , setAgentSearchParameter} :{openFilter: boolean , agentSearchParameter:any , setAgentSearchParameter:any} ) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setAgentSearchParameter({
            ...agentSearchParameter,
            [e.target.name]: e.target.value
        });
    }
    return (
        <div style={{top:"30px",right:'50px'}} className={`card-action-container ${openFilter ? "show-card" : ""}`}>
            <div className="agent-action-header">
                Agent Fileter
            </div>
            <div className="select-group">
                <label className="select-label">Search By Nationality</label>
                <div className="custom-select">
                    <input onChange={handleChange} name="nationality" type="text" placeholder="search by nationality" />
                </div>
            </div>
            <div className="select-group">
                <label className="select-label">Search By Email</label>
                <div className="custom-select">
                    <input onChange={handleChange} name="email" type="text" placeholder="agent's email" />
                </div>
            </div>
            <div className="select-group">
                <label className="select-label">Search By Id</label>
                <div className="custom-select">
                    <input onChange={handleChange} name="id" type="text" placeholder="agent's email" />
                </div>
            </div>
            <div className="select-group">
                <label className="select-label">Item limit Perpage</label>
                <div className="custom-select">
                    <input onChange={handleChange} name="limit" type="number" placeholder="insert a number" />
                </div>
            </div>
            <div className="select-group">
                <label className="select-label">Page Number</label>
                <div className="custom-select">
                    <input onChange={handleChange} name="page" type="text" placeholder="Page Number" />
                </div>
            </div>
            <div className="select-group">
                <label className="select-label">Search By Application Status</label>
                <div className="custom-select">
                    <select onChange={handleChange} name="applicationStat" id="application_status">
                        {/* <option value="">Select Status</option> */}
                        <option value="all">⏳ all</option>
                        <option value="pending">⏳ Pending</option>
                        <option value="rejected">❌ Rejected</option>
                        <option value="needs_Info">⚠️ Needs Info</option>
                    </select>
                </div>
            </div>
        </div>
    )
}

export default AgentSearchParam
