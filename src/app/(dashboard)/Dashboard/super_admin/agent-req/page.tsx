'use client'
import Loader from "@/component/shared/Loader/Loader"
import { useGetALlAgentReqQuery, useUpdateAgentStatusMutation } from "@/redux/endpoints/agent/agentsEndpoints"
import '@/css/Dashboard/super_admin/common.css'
import '@/css/Dashboard/admin/university.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {  faCheckDouble, faTrash } from "@fortawesome/free-solid-svg-icons"
import { toast } from "react-toastify"
import { useRouter } from "next/navigation"



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
                                <th className="th">Tax id</th> 
                                <th className="th">Status</th> 
                                <th className="th">Update Status</th>
                                <th className="th">Delete</th>
                            </tr>
                        </thead>
                        <tbody className="tbody">
                            {
                                data?.data?.map((req:any,index:number)=>(
                                    <tr key={req?._id} className="tr">
                                        <td className="td" >{index+1}</td>
                                        <td className="td" >{req?._id}</td>
                                        <td className="td" >{req?.name}</td>
                                        <td className="td" >{req?.email}</td>
                                        <td className="td" >{req?.mobile_number}</td>
                                        <td className="td" >{req?.alternate_mobile}</td>
                                        <td className="td" >{req?.dob}</td>
                                        <td className="td" >{req?.address}</td>
                                        <td className="td" >{req?.nationality}</td>
                                        <td className="td" >{req?.passport_number}</td>
                                        <td className="td" >{req?.agency_name}</td>
                                        <td className="td" >{req?.agency_address}</td>
                                        <td className="td" >{req?.agency_website}</td>
                                        <td className="td" >{req?.experience}</td>
                                        <td className="td" >{req?.services}</td>
                                        <td className="td" >{req?.partner_universities}</td>
                                        <td className="td" >{req?.license_number}</td>
                                        <td className="td" >{req?.license_document}</td>
                                        <td className="td" >{req?.tax_id}</td>
                                        <td className="td" >{req?.criminal_record}</td>
                                        <td className="td" >{req?.background_check}</td>
                                        <td className="td" >{req?.createdAt}</td>
                                        <td className="td" >{req?.referral}</td>
                                        <td className="td" >{req?.role}</td>
                                        <td className="td" >{req?.services}</td>
                                        <td className="td" >{req?.tax_id}</td>
                                        <td className="td" >{req?.status}</td>
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