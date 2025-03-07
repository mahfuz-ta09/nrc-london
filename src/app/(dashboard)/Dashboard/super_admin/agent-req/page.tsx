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



const page = () => {
    const { data , isLoading: dataLoading} = useGetALlAgentReqQuery()
    const [ updateAgentStatus , { isLoading : updateLoading }] = useUpdateAgentStatusMutation()
    const router = useRouter()

    
    const handleStatusChange = async(id:string) =>{    
        let a = window.confirm("Do you want to change the status?")
        if(a){
            const res = await updateAgentStatus({status: "accepted" , id:id})
            if(res?.data?.data?.modifiedCount){
                toast.success("Status updated!!")
            }else{
                toast.error("Failed to update!")
            }
        }
    }

    return (
        <div className="sAdmin">
            <div className="sAdmin-header">
                <h1>Agent requests:</h1>
                {data?.data?.length ? " " : <p style={{color:"white"}}>No agent request available</p>}
                <button onClick={()=>router.push('/Dashboard/super_admin/AllAgents')}>Check all agents</button>
            </div>
            
            {
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
            }
        </div>
    )
}

export default page