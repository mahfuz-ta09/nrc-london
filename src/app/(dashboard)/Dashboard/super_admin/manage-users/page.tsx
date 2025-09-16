'use client'
import { useState } from 'react'
import { toast } from 'react-toastify'
import '@/css/Dashboard/super_admin/common.css'
import Loader from "@/component/shared/Loader/Loader"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Pagination from '@/component/shared/Pagination/Pagination'
import { faFilter, faTrash } from '@fortawesome/free-solid-svg-icons'
import { useGetALlUserQuery, useUpdateAdminStatusMutation, useUpdateUserRoleMutation } from "@/redux/endpoints/sAdmin/superAdmin"


type paraType = {
    email: string,
    name: string,
    page: number,
    total: number,
    status: string
}

const Page = () => {
    const [para,setPara] = useState<paraType>({
        email:'',
        name:'',
        page:1,
        total:10,
        status:''
    })
    const [isOpen,setIsOpen] = useState(false)
    const { data , isLoading: dataLoading } = useGetALlUserQuery(para,{ skip: !para.page || !para.total })
    const [ updateAdminStatus , { isLoading : updateLoading }] = useUpdateAdminStatusMutation() 
    const [ updateUserRole , { isLoading : updateUsrLoading }] = useUpdateUserRoleMutation() 


    if((dataLoading || updateLoading || updateUsrLoading)) return <Loader />

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
            let a = window.confirm("Do you want to change the role?")
            if(a){
                const res = await updateUserRole({role: e.target.value , id:id})
                if(res?.data?.data?.modifiedCount){
                    toast.success("Role updated!!")
                }else{
                    toast.error("Failed to update!")
                }
            }
        }catch(err){
            console.log(err)
            toast.error("Failed to update role!")
        }
    }

    const handleUserDelete = async(id:string) => {
        try {
            let a = window.confirm("Do you want to delete this user?")
            console.log(a,id)
        }catch(err){
            console.log(err)
            toast.error("Failed to delete user!")
        }
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setPara({
            ...para,
            [e.target.name]: e.target.value
        })
    }
    
    const handlePageChange = (p: number) => {
        setPara({
            ...para,
            page : p
        })
    }
    
    return (
        <div className="sAdmin">
            <div className="sAdmin-header">
                <h1>All users</h1>
            </div>

            <p className='filter-status'>page number:{para.page??'not selected'} | per page:{para.total??'not selected'} | status:{para.status??'not selected'} | search email:{para.email??'not selected'} | search name:{para.name??''}</p>

            <div className="filter-header">
                <button onClick={()=>setIsOpen(!isOpen)}><FontAwesomeIcon icon={faFilter}/></button>
                
                <div className={isOpen?"filter-container show":"filter-container"}>
                        
                    <div className="filter-item">
                            <input
                            type="number"
                            name="page"
                            placeholder="Page"
                            value={para.page}
                            onChange={handleChange}
                            min={1}
                        />
                    </div>
                    
                    <div className="filter-item">
                        <input
                            type="number"
                            name="total"
                            placeholder="Rows per page"
                            value={para.total}
                            onChange={handleChange}
                            min={1}
                        />
                    </div>
                    
                    <div className="filter-item">
                        <input
                            type="text"
                            name="status"
                            placeholder="Status filter(active/inactive/banned)"
                            value={para.status}
                            onChange={handleChange}
                            />
                    </div>
                    
                    <div className="filter-item">
                        <input
                            type="text"
                            name="email"
                            placeholder="Email filter"
                            value={para.email}
                            onChange={handleChange}
                        />
                    </div>
                    
                    <div className="filter-item">
                        <input
                            type="text"
                            name="name"
                            placeholder="Name filter"
                            value={para.name}
                            onChange={handleChange}
                        />
                    </div>
                </div>
            </div>
            
            <div className="table-container-users">
                <table className="responsive-table">
                    <thead>
                        <tr>
                            <th>Serial</th>
                            <th>Id</th>
                            <th>Profile</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Mobile</th>
                            <th>Role</th>
                            <th>DOB</th>
                            <th>Created</th>
                            <th>Status</th>
                            <th>Change Status</th>
                            <th>Change Role</th>
                            <th>Delete User</th>
                        </tr>
                    </thead>
                    <tbody>
                    {Array.isArray(data?.data) &&
                        data.data.map((admin:any, index:number) => (
                        <tr key={admin?._id || index} className="tr">
                            <td>{index + 1}</td>
                            <td>{admin?._id}</td>
                            <td>
                                <img className="table-img" src={admin?.image || " "} alt="" />
                            </td>
                            <td className="truncate">{admin?.name}</td>
                            <td className="truncate">{admin?.email}</td>
                            <td>{admin?.mobile}</td>
                            <td>{admin?.role}</td>
                            <td>{admin?.dob}</td>
                            <td>{admin?.createdAt}</td>
                            <td>{admin?.status}</td>
                            <td>
                                <select
                                    style={{ width: "100px" }}
                                    value={admin?.status}
                                    onChange={(e) => handleStatusChange(e, admin?._id)}>
                                        <option value="active">active</option>
                                        <option value="inactive">inactive</option>
                                        <option value="banned">banned</option>
                                </select>
                            </td>
                            <td>
                                <select
                                    style={{ width: "100px" }}
                                    value={admin?.role}
                                    onChange={(e) => handleRoleChange(e, admin?._id)}>
                                        <option value="user">user</option>
                                        <option value="student">student</option>
                                        <option value="agent">agent</option>
                                        <option value="admin">admin</option>
                                </select>
                            </td>
                            <td>
                            <button
                                onClick={() => handleUserDelete(admin?._id)}
                                className="delete-users-btn"
                            >
                                <FontAwesomeIcon icon={faTrash} />
                            </button>
                            </td>
                        </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <Pagination 
                totalPages={data?.meta?.totalPages}
                currentPage={Number(para?.page)}
                onPageChange={handlePageChange}
                siblingCount={1}/>
        </div>
    )
}

export default Page
