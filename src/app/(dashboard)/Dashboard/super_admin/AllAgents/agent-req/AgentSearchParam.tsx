
const AgentSearchParam = ({openFilter , agentSearchParameter , setAgentSearchParameter} :{openFilter: boolean , agentSearchParameter:any , setAgentSearchParameter:any} ) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setAgentSearchParameter({
            ...agentSearchParameter,
            [e.target.name]: e.target.value
        })
    }
    return (
        <div className={`${openFilter ? "filter-container show" : "filter-container"}`}>
            <h4 className="filter-header-text">
                Agent Fileter
            </h4>
            <div className="filter-item">
                <label>Search By Nationality</label>
                <input onChange={handleChange} name="nationality" type="text" placeholder="search by nationality" />
            </div>
            <div className="filter-item">
                <label>Search By Email</label>
                <input onChange={handleChange} name="email" type="text" placeholder="agent's email" />
            </div>
            <div className="filter-item">
                <label>Search By Id</label>
                <input onChange={handleChange} name="id" type="text" placeholder="agent's email" />
            </div>
            <div className="filter-item">
                <label>Item limit Perpage</label>
                <input onChange={handleChange} name="limit" type="number" placeholder="insert a number" />
            </div>
            <div className="filter-item">
                <label>Page Number</label>
                <input onChange={handleChange} name="page" type="text" placeholder="Page Number" />
            </div>
            <div className="filter-item">
                <label>Search By Application Status</label>
                <select onChange={handleChange} name="applicationStat" id="application_status">
                        {/* <option value="">Select Status</option> */}
                        <option value="all">⏳ all</option>
                        <option value="pending">⏳ Pending</option>
                        <option value="rejected">❌ Rejected</option>
                        <option value="needs_Info">⚠️ Needs Info</option>
                    </select>

            </div>
        </div>
    )
}

export default AgentSearchParam
