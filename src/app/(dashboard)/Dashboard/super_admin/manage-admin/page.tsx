'use client'
import { useState } from 'react'
import { toast } from 'react-toastify'
import Loader from '@/component/shared/Loader/Loader'
import CreateAdminModal from './CreateAdminModal'
import { useGetALlAdminQuery, useUpdateAdminStatusMutation, useUpdateUserRoleMutation } from '@/redux/endpoints/sAdmin/superAdmin'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faQuestion } from '@fortawesome/free-solid-svg-icons'

const page = () => {
    const [create,setCreate] = useState(false)
    const { data , isLoading: dataLoading } = useGetALlAdminQuery()
    const [ updateAdminStatus , { isLoading : updateLoading }] = useUpdateAdminStatusMutation() 
    const [ updateUserRole , { isLoading : updateUsrLoading }] = useUpdateUserRoleMutation() 

    const handleStatusChange = async(e:React.ChangeEvent<HTMLSelectElement>,id:string) =>{    
        try {  
            let a = window.confirm("Do you want to change the status?")
            if(a){
                const res = await updateAdminStatus({status: e.target.value , id:id})
                if(res?.data?.data?.modifiedCount){
                    toast.success("Status updated!!")
                }else{
                    toast.error("Failed to update!")
                }
            }
        }catch(err){
            console.log(err)
            toast.error("Failed to update status!")
        }
    }

    const handleRoleChange = async(e:React.ChangeEvent<HTMLSelectElement>,id:string) =>{
        try {  
            let a = window.confirm("Do you want to change the status?")
            if(a){
                const res = await updateUserRole({role: e.target.value , id:id})
                if(res?.data?.data?.modifiedCount){
                    toast.success("Status updated!!")
                }else{
                    toast.error("Failed to update!")
                }
            }
        }catch(err){
            console.log(err)
            toast.error("Failed to update status!")
        }
    }
    

    return (
        ( dataLoading || updateLoading || updateUsrLoading) ? <Loader />:
        <div className="dashboard-content-item">
            <div className="dashboard-header-content">
                <h1 className='tag'>Mange Your Admin Panel</h1>
                <div className='header-content'>
                    <button className='header-btn' onClick={()=>setCreate(!create)}>New Admin<FontAwesomeIcon className='header-btn-icon' icon={faQuestion}/> </button>
                </div>
            </div>

            <div className="table-contant">
                <table className="table">
                    <thead className="thead">
                        <tr className="tr">
                            <th className="th">Serial</th>
                            <th className="th">Id</th>
                            <th className="th">Name</th>
                            <th className="th">Email</th>
                            <th className="th">Mobile</th>
                            <th className="th">Country</th>
                            <th className="th">Role</th>
                            <th className="th">Created</th>
                            <th className="th">Status</th>
                            <th className="th">Change Status</th>
                            <th className="th">Change role</th>
                        </tr>
                    </thead>
                    <tbody className="tbody">
                        {(dataLoading || updateLoading) ? (
                            <tr>
                                <td className="td" colSpan={8} style={{ textAlign: "center" }}>
                                    <Loader />
                                </td>
                            </tr>
                        ) : (
                            Array.isArray(data?.data) && data.data.map((admin: any, index: number) => (
                                <tr key={admin?._id || index} className="tr">
                                    <td  data-label="Serial" className="td">{index + 1}</td>
                                    <td  data-label="id" className="td">{admin?._id}</td>
                                    <td  data-label="name" className="td">{admin?.name}</td>
                                    <td  data-label="email" className="td">{admin?.email}</td>
                                    <td  data-label="mobile" className="td">{admin?.mobile}</td>
                                    <td  data-label="country" className="td">{admin?.counrty}</td>
                                    <td  data-label="role" className="td">{admin?.role}</td>
                                    <td  data-label="created" className="td">{admin?.createdAt}</td>
                                    <td  data-label="Status" className="td">{admin?.status}</td>
                                    <td  data-label="Change status" className="td">
                                        <select 
                                            value={admin?.status} 
                                            onChange={(e) => handleStatusChange(e,admin?._id)}
                                        >
                                            <option value="active">active</option>
                                            <option value="inactive">inactive</option>
                                            <option value="banned">banned</option>
                                        </select>
                                    </td>
                                    <td  data-label="change status" className="td">
                                            <select 
                                                value={admin?.status} 
                                                onChange={(e) => handleRoleChange(e,admin?._id)}>
                                                    <option value="">select</option>
                                                    <option value="user">user</option>
                                                    <option value="student">student</option>
                                                    <option value="agent">agent</option>
                                                    <option value="admin">admin</option>
                                            </select>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            <CreateAdminModal 
                create={create}
                setCreat={setCreate}
            />
        </div>
    )
}

export default page