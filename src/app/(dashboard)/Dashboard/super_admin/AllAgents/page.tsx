'use client'
import Loader from "@/component/shared/Loader/Loader"
import { useGetALlAgentQuery } from "@/redux/endpoints/agent/agentsEndpoints"
import '@/css/Dashboard/super_admin/common.css'
import '@/css/Dashboard/admin/university.css'
import { useRouter } from "next/navigation"


const page = () => {
    const { data , isLoading : dataLoading } = useGetALlAgentQuery()
    const router = useRouter()


    return (
        <div className="sAdmin">
            <div className="sAdmin-header">
                <h1>All Agent:</h1>
                <button onClick={()=>router.push('/Dashboard/super_admin/agent-req')}>Agent Request?</button>
            </div>
            
            {
                (dataLoading)? <Loader /> :
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
                                <th className="th">State</th> 
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