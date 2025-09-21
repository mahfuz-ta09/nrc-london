'use client'
import '../../css/allagents.css'
import Loader from "@/component/shared/loader/loader"
import { useGetALlAgentReqQuery } from "@/redux/endpoints/agent/agentsEndpoints"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {  faCancel, faFilter } from "@fortawesome/free-solid-svg-icons"
import AgentQuickAction from './AgentQuickAction'
import { useRouter } from "next/navigation"
import { useState } from "react"
import AgentSearchParam from './AgentSearchParam'


const page = () => {
    const [openCardId, setOpenCardId] = useState<string>('')
    const [openFilter, setOpenFilter] = useState<boolean>(false)
    const [agentSearchParameter, setAgentSearchParameter] = useState({limit: "10", page: "1",email:'',nationality:'', applicationStat:'all'})
    const { data , isLoading: dataLoading} = useGetALlAgentReqQuery({
            limit: agentSearchParameter?.limit, 
            page: agentSearchParameter?.page,
            email:agentSearchParameter?.email,
            nationality:agentSearchParameter?.nationality, 
            applicationStat: agentSearchParameter?.applicationStat})
    const router = useRouter()


    if(dataLoading) return <Loader />

    const handleQuickaction = (id:string) => {
        setOpenCardId((prv:any) => {
            console.log(prv)
            return prv === id ? '' : id
        })
    }

    if(dataLoading) return <Loader />

    return (
        <div className="sAdmin-agent-req">
            <div className="sAdmin-header-agent-req">
                <h1>{data?.meta?.total} Pending Agent Requests</h1>
                <div className="sAdmin-header-actions">
                    <button onClick={()=>setOpenFilter(!openFilter)}>{openFilter? <FontAwesomeIcon style={{color:"red"}} icon={faCancel}/>:<FontAwesomeIcon icon={faFilter}/>}</button>
                    <button onClick={()=>router.push('/Dashboard/super_admin/AllAgents')}>Check All Agents</button>
                </div>
                <AgentSearchParam 
                    agentSearchParameter={agentSearchParameter}
                    openFilter={openFilter}
                    setAgentSearchParameter={setAgentSearchParameter}/>
            </div>
            

            {data?.data?.map((req: any) => (
            <div key={req?._id} className="card-container-agent-req">
                <div className="agent-req-profile-card">
                    <div className="floating-elements"></div>
                    <AgentQuickAction cardId={req?._id} openCardId={openCardId} />
                    <button onClick={()=>handleQuickaction(req?._id)} className="agent-action-btn">{openCardId? <span style={{color:"#d32f2f"}}>close</span>:<span>Edit Status</span>}</button>

                    <div className="agent-req-card-header">
                        <div className="agent-req-profile-avatar">
                            <span>{req?.name?.split(" ")[0][0]}{req?.name?.split(" ")[1]?.[0]}</span>
                        </div>
                        <h1 className="agent-req-profile-name">{req?.name}</h1>
                        <p className="agent-req-profile-email">{req?.email}</p>
                        <span className="agent-req-profile-id">ID: #{req?._id}</span>
                    </div>

                    <div className="agent-req-card-content">
                        <div className="agent-req-info-grid">
                            <div className="agent-req-info-section">
                                <h3 className="agent-req-section-title">Personal Information</h3>
                                <div className="agent-req-info-item">
                                    <div className="agent-req-info-label">Mobile</div>
                                    <div className="agent-req-info-value">{req?.mobile_number}</div>
                                </div>
                                <div className="agent-req-info-item">
                                    <div className="agent-req-info-label">Alternate Contact</div>
                                    <div className="agent-req-info-value">{req?.alternate_mobile}</div>
                                </div>
                                <div className="agent-req-info-item">
                                    <div className="agent-req-info-label">Date of Birth</div>
                                    <div className="agent-req-info-value">{req?.dob}</div>
                                </div>
                                <div className="agent-req-info-item">
                                    <div className="agent-req-info-label">Agent Address</div>
                                    <div className="agent-req-info-value">{req?.address}</div>
                                </div>
                                <div className="agent-req-info-item">
                                    <div className="agent-req-info-label">Nationality</div>
                                    <div className="agent-req-info-value">{req?.nationality}</div>
                                </div>
                                <div className="agent-req-info-item">
                                    <div className="agent-req-info-label">Passport/NID</div>
                                    <div className="agent-req-info-value">
                                        {req?.id_document ? (
                                        <a href={req?.id_document?.url} target="_blank" rel="noreferrer">
                                            <span className="agent-req-status-badge status-verified">View Document ✓</span>
                                        </a>
                                        ) : "Not Provided"}
                                    </div>
                                </div>
                                <div className="agent-req-info-item">
                                    <div className="agent-req-info-label">Address</div>
                                    <div className="agent-req-info-value">
                                        {req?.proof_of_address ? (
                                        <a href={req?.proof_of_address?.url} target="_blank" rel="noreferrer">
                                            <span className="agent-req-status-badge status-verified">View Document ✓</span>
                                        </a>
                                        ) : "Not Provided"}
                                    </div>
                                </div>
                            </div>

                            <div className="agent-req-info-section">
                                <h3 className="agent-req-section-title">Agency & Documentation</h3>
                                <div className="agent-req-info-item">
                                    <div className="agent-req-info-label">Passport Number</div>
                                    <div className="agent-req-info-value">{req?.passport_number}</div>
                                </div>
                                <div className="agent-req-info-item">
                                    <div className="agent-req-info-label">Agency Name</div>
                                    <div className="agent-req-info-value">{req?.agency_name}</div>
                                </div>
                                <div className="agent-req-info-item">
                                    <div className="agent-req-info-label">Agency Address</div>
                                    <div className="agent-req-info-value">{req?.agency_address}</div>
                                </div>
                                <div className="agent-req-info-item">
                                    <div className="agent-req-info-label">Agency Website</div>
                                    <div className="agent-req-info-value">
                                        <a href={req?.agency_website} target="_blank" rel="noreferrer">{req?.agency_website}</a>
                                    </div>
                                </div>
                                <div className="agent-req-info-item">
                                    <div className="agent-req-info-label">Working Experience</div>
                                    <div className="agent-req-info-value">{req?.experience}</div>
                                </div>
                                <div className="agent-req-info-item">
                                    <div className="agent-req-info-label">Services Provided</div>
                                    <div className="agent-req-info-value">{req?.services}</div>
                                </div>
                            </div>

                            <div className="agent-req-info-section">
                                <h3 className="agent-req-section-title">Professional Details</h3>
                                <div className="agent-req-info-item">
                                    <div className="agent-req-info-label">Partner Universities</div>
                                    <div className="agent-req-info-value">{req?.partner_universities}</div>
                                </div>
                                <div className="agent-req-info-item">
                                    <div className="agent-req-info-label">Business License</div>
                                    <div className="agent-req-info-value">
                                        <a href={req?.license_document?.url} target="_blank" rel="noreferrer">
                                        <span className="agent-req-status-badge status-verified">{req?.license_number} ✓</span>
                                        </a>
                                    </div>
                                </div>
                                <div className="agent-req-info-item">
                                    <div className="agent-req-info-label">Tax ID</div>
                                    <div className="agent-req-info-value">{req?.tax_id}</div>
                                </div>
                                <div className="agent-req-info-item">
                                    <div className="agent-req-info-label">Background Check</div>
                                    <div className="agent-req-info-value">
                                        {req?.background_check ? (
                                        <a href={req?.background_check?.url} target="_blank" rel="noreferrer">
                                            <span className="agent-req-status-badge status-verified">View Document ✓</span>
                                        </a>
                                        ) : "Not Provided"}
                                    </div>
                                </div>
                                <div className="agent-req-info-item">
                                    <div className="agent-req-info-label">Criminal Record</div>
                                    <div className="agent-req-info-value">{req?.criminal_record}</div>
                                </div>
                            </div>

                            
                            <div className="agent-req-info-section">
                                <h3 className="agent-req-section-title">Account Information</h3>
                                <div className="agent-req-info-item">
                                    <div className="agent-req-info-label">Created</div>
                                    <div className="agent-req-info-value">{req?.createdAt}</div>
                                </div>
                                <div className="agent-req-info-item">
                                    <div className="agent-req-info-label">Referral</div>
                                    <div className="agent-req-info-value">{req?.referral}</div>
                                </div>
                                {/* <div className="agent-req-info-item">
                                    <div className="agent-req-info-label">Role(agent)</div>
                                    <div className="agent-req-info-value">
                                        <span className="agent-req-status-badge status-active">{req?.role} || pending</span>
                                    </div>
                                </div> */}
                                <div className="agent-req-info-item">
                                    <div className="agent-req-info-label">Status</div>
                                    <div className="agent-req-info-value">
                                        <span className="agent-req-status-badge">{req?.status}</span>
                                    </div>
                                </div>
                                <div className="agent-req-info-item">
                                    <div className="agent-req-info-label">Application Status</div>
                                    <div className="agent-req-info-value">
                                        <span className="agent-req-status-badge status-active">{req?.applicationStat}</span>
                                    </div>
                                </div>
                                <div className="agent-req-info-item">
                                    <div className="agent-req-info-label">Document Status</div>
                                    <div className="agent-req-info-value ">
                                        <span className="agent-req-status-badge status-active">{req?.docStat}</span>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
            ))}

        </div>
    )
}

export default page