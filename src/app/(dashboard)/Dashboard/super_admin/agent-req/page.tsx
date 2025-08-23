'use client'
import Loader from "@/component/shared/Loader/Loader"
import { useGetALlAgentReqQuery, useUpdateAgentStatusMutation } from "@/redux/endpoints/agent/agentsEndpoints"
import '@/css/Dashboard/super_admin/common.css'
// import '@/css/Dashboard/admin/university.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {  faCancel, faCheckDouble, faFilter, faTrash } from "@fortawesome/free-solid-svg-icons"
import { toast } from "react-toastify"
import { useRouter } from "next/navigation"
import Link from "next/link"
import '../css/allagents.css'
import { useState } from "react"



const page = () => {
    const [openCardId, setOpenCardId] = useState<string | null>(null);
    const [openFilter, setOpenFilter] = useState<boolean>(false);
    const [applStat, setApplStat] = useState<string | null>(null);
    const [docStat, setDocStat] = useState<string | null>(null);
    const [agentSearchParameter, setAgentSearchParameter] = useState({limit: "10", page: "1",email:'',nationality:'', applicationStat:''});

    const { data , isLoading: dataLoading} = useGetALlAgentReqQuery({
            limit: agentSearchParameter?.limit, 
            page: agentSearchParameter?.page,
            email:agentSearchParameter?.email,
            nationality:agentSearchParameter?.nationality, 
            applicationStat: agentSearchParameter?.applicationStat})

    const [ updateAgentStatus , { isLoading : updateLoading }] = useUpdateAgentStatusMutation()
    const router = useRouter()


    if(updateLoading) return <Loader />


    const toggleCard = (id: string) => {
        setOpenCardId(prev => (prev === id ? null : id));
    };    
    
    const handleStatusChange = async(id:string) =>{  
        try{  
            if(!applStat && !docStat) {
                toast.error("both field unselected!");
                return;
            }

            let a = window.confirm("Do you want to change the status?")
            if(a){
                const res = await updateAgentStatus({applicationStat: applStat , docStat: docStat , id:id})
                if(res?.data?.data?.modifiedCount){
                    toast.success("Status updated!!")
                }else{
                    toast.error("Failed to update!")
                }
            }
        }catch(err){
            console.error("Error updating status:", err);
            toast.error("Failed to update status!");
        }
    }
    
    const deleteAgentRequest = async(id:string) =>{    
        let a = window.confirm("Do you want to change the status?")
        if(a){
            // const res = await updateAgentStatus({applicationStat: applStat , docStat: docStat , id:id})
            // if(res?.data?.data?.modifiedCount){
            //     toast.success("Status updated!!")
            // }else{
            //     toast.error("Failed to update!")
            // }
        }
    }


    const applicationStatus = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setApplStat(e.target.value);
    }

    const documentStatus = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
            setDocStat(e.target.value);
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setAgentSearchParameter({
        ...agentSearchParameter,
        [e.target.name]: e.target.value
        });
    }

    // console.log(applStat, docStat)
    // console.log(data)
    // console.log(agentSearchParameter)

    if(dataLoading) return <Loader />
    return (
        <div className="sAdmin">
            <div className="sAdmin-header">
                <h1>{data?.meta?.total} Pending Agent Requests</h1>
                <div className="sAdmin-header-actions">
                    <button onClick={()=>setOpenFilter(!openFilter)}>{openFilter? <FontAwesomeIcon style={{color:"red"}} icon={faCancel}/>:<FontAwesomeIcon icon={faFilter}/>}</button>
                    <button onClick={()=>router.push('/Dashboard/super_admin/AllAgents')}>Check all agents</button>
                </div>
                <div style={{top:"30px",right:'50px'}} className={`card-action-container ${openFilter ? "show-card" : ""}`}>
                    <div className="action-header">
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
            </div>
            

            {data?.data?.map((req: any) => (
            <div key={req?._id} className="card-container">

                <div className={`card-action-container ${openCardId === req?._id ? "show-card" : ""}`}>
                    <div className="action-header">
                        Quick Actions
                    </div>

                    <div className="select-group">
                        <label className="select-label">Application Status</label>
                        <div className="custom-select">
                            <select onChange={applicationStatus} name="application_status" id="application_status">
                                <option>Select Status</option>
                                <option value="pending">⏳ Pending</option>
                                <option value="approved">✅ Approved</option>
                                <option value="rejected">❌ Rejected</option>
                                <option value="needs_Info">⚠️ Needs Info</option>
                            </select>
                        </div>
                    </div>

                    <div className="select-group">
                        <label className="select-label">Document Status</label>
                        <div className="custom-select">
                            <select onChange={documentStatus} name="document_status" id="document_status">
                                <option>Select Status</option>
                                <option value="approved">✅ Approved</option>
                                <option value="rejected">❌ Rejected</option>
                                <option value="needs_Info">⚠️ Needs Info</option>
                            </select>
                        </div>
                        <div className="action-buttons">
                            <button onClick={()=>handleStatusChange(req?._id)} className="action-btn save">💾 Save</button>
                            <button onClick={()=>deleteAgentRequest(req?._id)} className="action-btn" >🔄 Delete This Agent</button>
                        </div>
                    </div>
                </div>

                <div className="profile-card">
                    <div className="floating-elements"></div>

                    <div className="card-header "  onClick={() => toggleCard(req?._id)}>
                        <div className="profile-avatar">
                            <span>{req?.name?.split(" ")[0][0]}{req?.name?.split(" ")[1]?.[0]}</span>
                        </div>
                        <h1 className="profile-name">{req?.name}</h1>
                        <p className="profile-email">{req?.email}</p>
                        <span className="profile-id">ID: #{req?._id}</span>
                    </div>

                    <div className="card-content">
                        <div className="info-grid">
                            <div className="info-section">
                                <h3 className="section-title">Personal Information</h3>
                                <div className="info-item">
                                    <div className="info-label">Mobile</div>
                                    <div className="info-value">{req?.mobile_number}</div>
                                </div>
                                <div className="info-item">
                                    <div className="info-label">Alternate Contact</div>
                                    <div className="info-value">{req?.alternate_mobile}</div>
                                </div>
                                <div className="info-item">
                                    <div className="info-label">Date of Birth</div>
                                    <div className="info-value">{req?.dob}</div>
                                </div>
                                <div className="info-item">
                                    <div className="info-label">Agent Address</div>
                                    <div className="info-value">{req?.address}</div>
                                </div>
                                <div className="info-item">
                                    <div className="info-label">Nationality</div>
                                    <div className="info-value">{req?.nationality}</div>
                                </div>
                                <div className="info-item">
                                    <div className="info-label">Passport/NID</div>
                                    <div className="info-value">
                                        {req?.id_document ? (
                                        <a href={req?.id_document?.url} target="_blank" rel="noreferrer">
                                            <span className="status-badge status-verified">View Document ✓</span>
                                        </a>
                                        ) : "Not Provided"}
                                    </div>
                                </div>
                                <div className="info-item">
                                    <div className="info-label">Address</div>
                                    <div className="info-value">
                                        {req?.proof_of_address ? (
                                        <a href={req?.proof_of_address?.url} target="_blank" rel="noreferrer">
                                            <span className="status-badge status-verified">View Document ✓</span>
                                        </a>
                                        ) : "Not Provided"}
                                    </div>
                                </div>
                            </div>

                            <div className="info-section">
                                <h3 className="section-title">Agency & Documentation</h3>
                                <div className="info-item">
                                    <div className="info-label">Passport Number</div>
                                    <div className="info-value">{req?.passport_number}</div>
                                </div>
                                <div className="info-item">
                                    <div className="info-label">Agency Name</div>
                                    <div className="info-value">{req?.agency_name}</div>
                                </div>
                                <div className="info-item">
                                    <div className="info-label">Agency Address</div>
                                    <div className="info-value">{req?.agency_address}</div>
                                </div>
                                <div className="info-item">
                                    <div className="info-label">Agency Website</div>
                                    <div className="info-value">
                                        <a href={req?.agency_website} target="_blank" rel="noreferrer">{req?.agency_website}</a>
                                    </div>
                                </div>
                                <div className="info-item">
                                    <div className="info-label">Working Experience</div>
                                    <div className="info-value">{req?.experience}</div>
                                </div>
                                <div className="info-item">
                                    <div className="info-label">Services Provided</div>
                                    <div className="info-value">{req?.services}</div>
                                </div>
                            </div>

                            <div className="info-section">
                                <h3 className="section-title">Professional Details</h3>
                                <div className="info-item">
                                    <div className="info-label">Partner Universities</div>
                                    <div className="info-value">{req?.partner_universities}</div>
                                </div>
                                <div className="info-item">
                                    <div className="info-label">Business License</div>
                                    <div className="info-value">
                                        <a href={req?.license_document?.url} target="_blank" rel="noreferrer">
                                        <span className="status-badge status-verified">{req?.license_number} ✓</span>
                                        </a>
                                    </div>
                                </div>
                                <div className="info-item">
                                    <div className="info-label">Tax ID</div>
                                    <div className="info-value">{req?.tax_id}</div>
                                </div>
                                <div className="info-item">
                                    <div className="info-label">Background Check</div>
                                    <div className="info-value">
                                        {req?.background_check ? (
                                        <a href={req?.background_check?.url} target="_blank" rel="noreferrer">
                                            <span className="status-badge status-verified">View Document ✓</span>
                                        </a>
                                        ) : "Not Provided"}
                                    </div>
                                </div>
                                <div className="info-item">
                                    <div className="info-label">Criminal Record</div>
                                    <div className="info-value">{req?.criminal_record}</div>
                                </div>
                            </div>

                            {/* Account Info */}
                            <div className="info-section">
                                <h3 className="section-title">Account Information</h3>
                                <div className="info-item">
                                    <div className="info-label">Created</div>
                                    <div className="info-value">{req?.createdAt}</div>
                                </div>
                                <div className="info-item">
                                    <div className="info-label">Referral</div>
                                    <div className="info-value">{req?.referral}</div>
                                </div>
                                {/* <div className="info-item">
                                    <div className="info-label">Role(agent)</div>
                                    <div className="info-value">
                                        <span className="status-badge status-active">{req?.role} || pending</span>
                                    </div>
                                </div> */}
                                <div className="info-item">
                                    <div className="info-label">Status</div>
                                    <div className="info-value">
                                        <span className="status-badge">{req?.status}</span>
                                    </div>
                                </div>
                                <div className="info-item">
                                    <div className="info-label">Application Status</div>
                                    <div className="info-value">
                                        <span className="status-badge status-active">{req?.applicationStat}</span>
                                    </div>
                                </div>
                                <div className="info-item">
                                    <div className="info-label">Document Status</div>
                                    <div className="info-value ">
                                        <span className="status-badge status-active">{req?.docStat}</span>
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