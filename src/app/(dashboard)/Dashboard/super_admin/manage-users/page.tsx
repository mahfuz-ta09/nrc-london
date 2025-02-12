'use client'
import '@/css/Dashboard/super_admin/common.css'
import '@/css/Dashboard/admin/university.css'
import Loader from "@/component/shared/Loader/Loader"
import { useGetALlUserQuery, useUpdateAdminStatusMutation } from "@/redux/endpoints/sAdmin/superAdmin"
import { toast } from 'react-toastify'


const page = () => {
        const { data , isLoading: dataLoading } = useGetALlUserQuery()
        const [ updateAdminStatus , { isLoading : updateLoading }] = useUpdateAdminStatusMutation() 
    
    
        const handleStatusChange = async(e:React.ChangeEvent<HTMLSelectElement>,id:string) =>{    
            let a = window.confirm("Do you want to change the status?")
            if(a){
                const res = await updateAdminStatus({status: e.target.value , id:id})
                console.log(res)
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
                    <h1>All users</h1>
                    {/* <button onClick={()=>setCreate(!create)}>{create ? "close":"create?"}</button> */}
                </div>

                <div className="table-container">
                    <table className="table">
                        <thead className="thead">
                            <tr className="tr">
                                <th className="th">Serial</th>
                                <th className="th">Id</th>
                                <th className="th">Profile</th>
                                <th className="th">Name</th>
                                <th className="th">Email</th>
                                <th className="th">Mobile</th>
                                <th className="th">Role</th>
                                <th className="th">DOB</th>
                                <th className="th">Created</th>
                                <th className="th">Status</th>
                                <th className="th">Change Status</th>
                            </tr>
                        </thead>
                        <tbody className="tbody">
                            {dataLoading ? (
                                <tr>
                                    <td className="td" colSpan={8} style={{ textAlign: "center" }}>
                                        <Loader />
                                    </td>
                                </tr>
                            ) : (
                                Array.isArray(data?.data) && data.data.map((admin: any, index: number) => (
                                    <tr key={admin?._id || index} className="tr">
                                        <td className="td">{index + 1}</td>
                                        <td className="td">{admin?._id}</td>
                                        <td className="td"><img src={admin?.image ? admin?.image : " "} alt=''/></td>
                                        <td className="td">{admin?.name}</td>
                                        <td className="td">{admin?.email}</td>
                                        <td className="td">{admin?.mobile}</td>
                                        <td className="td">{admin?.role}</td>
                                        <td className="td">{admin?.dob}</td>
                                        <td className="td">{admin?.createdAt}</td>
                                        <td className="td">{admin?.status}</td>
                                        <td className="td">
                                            <select 
                                                value={admin?.status} 
                                                onChange={(e) => handleStatusChange(e,admin?._id)}
                                            >
                                                <option value="active">active</option>
                                                <option value="inactive">inactive</option>
                                                <option value="banned">banned</option>
                                            </select>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>


            </div>
    )
}

export default page