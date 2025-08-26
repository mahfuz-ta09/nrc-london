'use client'
import '@/css/Dashboard/super_admin/common.css'
import { useState } from 'react'
import { useForm, SubmitHandler } from "react-hook-form"
import { useCreateAdminMutation, useGetALlAdminQuery, useUpdateAdminStatusMutation, useUpdateUserRoleMutation } from '@/redux/endpoints/sAdmin/superAdmin'
import { toast } from 'react-toastify'
import Loader from '@/component/shared/Loader/Loader'

type Inputs = {
    email: string
    password: string
}


const page = () => {
    const [create,setCreate] = useState(false)
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<Inputs>()
    const [createAdmin , { isLoading : createLoading }] = useCreateAdminMutation()
    const { data , isLoading: dataLoading } = useGetALlAdminQuery()
    const [ updateAdminStatus , { isLoading : updateLoading }] = useUpdateAdminStatusMutation() 
    const [ updateUserRole , { isLoading : updateUsrLoading }] = useUpdateUserRoleMutation() 


    if(createLoading || dataLoading || updateLoading || updateUsrLoading) return <Loader />

    const onSubmit: SubmitHandler<Inputs> = async(data) => {
        try{
            const res = await createAdmin(data)
            if(res?.data?.data?.acknowledged){
                reset()
                toast.success("Admin created!!")
            }else{
                toast.warning(res?.data?.errorMessage || "Failed to create admin!")
            }
        }catch(err){
            console.log(err)
        }
    }
    
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
        <div className="sAdmin">
            <div className="sAdmin-header">
                <h1>Mange Your Admin Panel</h1>
                <button onClick={()=>setCreate(!create)}>{create ? "close":"Create New Admin?"}</button>
            </div>

            <div className="table-container-users">
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
                        {(dataLoading || createLoading || updateLoading) ? (
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
                                            <select style={{width:"100px"}}
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

            <div className={create ? 'create-show' : 'admin-create'}>
                <h1>Create A New Admin</h1>
                <form onSubmit={handleSubmit(onSubmit)} action="">
                    <input type="email" {...register("email")} required/>
                    <input type="password" {...register("password")} required/>
                    {createLoading ? <p style={{color:"white"}}>Loading..</p> :<button className="form-submit" type='submit'>create</button>}
                </form>
            </div>

        </div>
    )
}

export default page