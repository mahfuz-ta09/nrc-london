'use client'
import Loader from "@/component/shared/Loader/Loader"
import { useGetALlAgentReqQuery, useUpdateAgentStatusMutation } from "@/redux/endpoints/agent/agentsEndpoints"
import '@/css/Dashboard/super_admin/common.css'
import '@/css/Dashboard/admin/university.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {  faCheckDouble, faTrash } from "@fortawesome/free-solid-svg-icons"
import { toast } from "react-toastify"
import { useRouter } from "next/navigation"
import Link from "next/link"
import '../css/allagents.css'



const page = () => {
    const { data , isLoading: dataLoading} = useGetALlAgentReqQuery()
    const [ updateAgentStatus , { isLoading : updateLoading }] = useUpdateAgentStatusMutation()
    const router = useRouter()

    
    // const handleStatusChange = async(id:string) =>{    
    //     let a = window.confirm("Do you want to change the status?")
    //     if(a){
    //         const res = await updateAgentStatus({status: "accepted" , id:id})
    //         if(res?.data?.data?.modifiedCount){
    //             toast.success("Status updated!!")
    //         }else{
    //             toast.error("Failed to update!")
    //         }
    //     }
    // }

    if(dataLoading) return <Loader />
    console.log(data)
    return (
        <div className="sAdmin">
            <div className="sAdmin-header">
                <h1>Agent requests:</h1>
                {data?.data?.length ? " " : <p style={{color:"white"}}>No agent request available</p>}
                <button onClick={()=>router.push('/Dashboard/super_admin/AllAgents')}>Check all agents</button>
            </div>
            

            {data?.data?.map((req: any) => (
            <div key={req?._id} className="card-container">
                <div className="profile-card">
                {/* Floating Elements (for decoration) */}
                <div className="floating-elements"></div>

                {/* Card Header */}
                <div className="card-header">
                    <div className="profile-avatar">
                    <span>
                        {req?.name?.split(" ")[0]?.[0]}
                        {req?.name?.split(" ")[1]?.[0]}
                    </span>
                    </div>
                    <h1 className="profile-name">{req?.name}</h1>
                    <p className="profile-email">{req?.email}</p>
                    <span className="profile-id">ID: #{req?._id}</span>
                </div>

                {/* Card Content */}
                <div className="card-content">
                    <div className="info-grid">

                    {/* Personal Info */}
                    <InfoSection title="Personal Information" items={[
                        { label: "Mobile", value: req?.mobile_number },
                        { label: "Alternate Contact", value: req?.alternate_mobile },
                        { label: "Date of Birth", value: req?.dob },
                        { label: "Agent Address", value: req?.address },
                        { label: "Nationality", value: req?.nationality },
                    ]} />

                    {/* Travel & Documentation */}
                    <InfoSection title="Travel & Documentation" items={[
                        { label: "Passport Number", value: req?.passport_number },
                        { label: "Agency Name", value: req?.agency_name },
                        { label: "Agency Address", value: req?.agency_address },
                        {
                        label: "Agency Website",
                        value: req?.agency_website ? (
                            <a href={req?.agency_website} target="_blank" rel="noreferrer">
                            {req?.agency_website}
                            </a>
                        ) : "Not Provided"
                        },
                        { label: "Working Experience", value: req?.experience },
                        { label: "Services Provided", value: req?.services },
                    ]} />

                    {/* Professional Details */}
                    <InfoSection title="Professional Details" items={[
                        { label: "Partner Universities", value: req?.partner_universities },
                        {
                        label: "License",
                        value: req?.license_document ? (
                            <a href={req?.license_document} target="_blank" rel="noreferrer">
                            <span className="status-badge status-verified">
                                {req?.license_number} ✓
                            </span>
                            </a>
                        ) : "Not Provided"
                        },
                        { label: "Tax ID", value: req?.tax_id },
                        {
                        label: "Background Check",
                        value: req?.background_check ? (
                            <a href={req?.background_check} target="_blank" rel="noreferrer">
                            <span className="status-badge status-verified">View Document ✓</span>
                            </a>
                        ) : "Not Provided"
                        },
                        { label: "Criminal Record", value: req?.criminal_record || "Not Provided" },
                    ]} />

                    {/* Account Info */}
                    <InfoSection title="Account Information" items={[
                        { label: "Created", value: new Date(req?.createdAt).toLocaleDateString() },
                        { label: "Referral", value: req?.referral || "N/A" },
                        {
                        label: "Role",
                        value: <span className="status-badge status-active">{req?.role || "Pending"}</span>
                        },
                        {
                        label: "Status",
                        value: <span className="status-badge">{req?.status}</span>
                        },
                    ]} />

                    </div>
                </div>
                </div>
            </div>
            ))}









            {/* {
                (dataLoading || updateLoading )? <Loader /> :
                <div className="table-container">
                    <table className="table">
                        <thead className="thead">
                            <tr className="tr">
                                <th className="th">Serial</th> 
                                <th className="th">Id</th> 
                                <th className="th">Name</th> 
                                <th className="th">Email</th> 
                                <th className="th">Mobile number</th>
                                <th className="th">Alternate mobile</th> 
                                <th className="th">dob</th> 
                                <th className="th">Address</th> 
                                <th className="th">Nationality</th> 
                                <th className="th">Passport_number</th> 
                                <th className="th">Agency name</th> 
                                <th className="th">Agency address</th> 
                                <th className="th">Agency website</th> 
                                <th className="th">Experience</th> 
                                <th className="th">Services</th>
                                <th className="th">Partner universities</th> 
                                <th className="th">License number</th> 
                                <th className="th">License document</th> 
                                <th className="th">Tax id</th>
                                <th className="th">Criminal record</th> 
                                <th className="th">Background check</th> 
                                <th className="th">Created At</th> 
                                <th className="th">Referral</th> 
                                <th className="th">Role</th> 
                                <th className="th">Services</th> 
                                <th className="th">Status</th> 
                                <th className="th">Update Status</th>
                                <th className="th">Delete</th>
                            </tr>
                        </thead>
                        <tbody className="tbody">
                            {
                                data?.data?.map((req:any,index:number)=>(
                                    <tr key={req?._id} className="tr">
                                        <td data-label="serial"  className="td" >{index+1}</td>
                                        <td data-label="id"  className="td" >{req?._id}</td>
                                        <td data-label="name"  className="td" >{req?.name}</td>
                                        <td data-label="email"  className="td" >{req?.email}</td>
                                        <td data-label="mobile"  className="td" >{req?.mobile_number}</td>
                                        <td data-label="alternate mobile" className="td" >{req?.alternate_mobile}</td>
                                        <td data-label="dob"  className="td">{req?.dob}</td>
                                        <td data-label="address"  className="td">{req?.address}</td>
                                        <td data-label="nationality"  className="td">{req?.nationality}</td>
                                        <td data-label="passport no" className="td">{req?.passport_number}</td>
                                        <td data-label="agency name" className="td">{req?.agency_name}</td>
                                        <td data-label="agency address" className="td">{req?.agency_address}</td>
                                        <td data-label="agency website" className="td"><Link style={{color:"white"}}  href={req?.agency_website}>visit</Link></td>
                                        <td data-label="experience"  className="td" >{req?.experience}</td>
                                        <td data-label="services"  className="td" >{req?.services}</td>
                                        <td data-label="parter uni" className="td" >{req?.partner_universities}</td>
                                        <td data-label="license number" className="td" >{req?.license_number}</td>
                                        <td data-label="license doc" className="td" ><Link style={{color:"white"}} href={req?.license_document}>check</Link></td>
                                        <td data-label="tax id" className="td" >{req?.tax_id}</td>
                                        <td data-label="criminal record" className="td" >{req?.criminal_record}</td>
                                        <td data-label="background check" className="td" ><Link style={{color:"white"}}  href={req?.background_check}>check</Link></td>
                                        <td data-label="created"  className="td" >{req?.createdAt}</td>
                                        <td data-label="referral"  className="td" >{req?.referral}</td>
                                        <td data-label="role"  className="td" >{req?.role}</td>
                                        <td data-label="services"  className="td" >{req?.services}</td>
                                        <td data-label="status"  className="td" >{req?.status}</td>
                                        <td className="td" ><FontAwesomeIcon onClick={()=>handleStatusChange(req?._id)} icon={faCheckDouble}/></td>
                                        <td className="td" ><FontAwesomeIcon icon={faTrash}/></td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>
            } */}
        </div>
    )
}

export default page

const InfoSection = ({ title, items }: { title: string, items: { label: string, value: any }[] }) => (
  <div className="info-section">
    <h3 className="section-title">{title}</h3>
    {items.map((item, index) => (
      <div key={index} className="info-item">
        <div className="info-label">{item.label}</div>
        <div className="info-value">{item.value || "Not Provided"}</div>
      </div>
    ))}
  </div>
);