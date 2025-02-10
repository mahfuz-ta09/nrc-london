'use client'
import { useState } from 'react'
import { toast } from 'react-toastify'
import '@/css/Dashboard/admin/university.css'
import '@/css/Dashboard/admin/process-req.css'
import Loader from '@/component/shared/Loader/Loader'
import { faAngleDoubleRight, faCancel } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useDeleteProcessReqMutation, useGetALlProcessReqQuery } from '@/redux/endpoints/proceed/proceedEndpoints'



const page = () => {
    const [ open,setOpen ] = useState(false)
    const [ number,setNumber ] = useState(0)
    const [ uniId,setUniId ] = useState("")
    const { data , isLoading : dataLoading } = useGetALlProcessReqQuery()
    const [ deleteSubject , { isLoading : deleteLoading }] = useDeleteProcessReqMutation()


    const handleDelete= async(id:string) =>  {
        try{
            const res = await deleteSubject(id)
            console.log(res)
            if(res?.data?.data?.deletedCount){
                toast.success("Deletion successful!!")
            }else{
                toast.error("Deletion successful!!")
            }
        }catch(err){
            console.log(err)
        }
    }
    
    console.log(data)

    return (
      <div className='university-content'>
        <div className="header">
          <h1>Process request: (Total available data: {data?.meta?.total})</h1>
          {/* <button onClick={()=>{setOpen(!open);setName("Add")}}>Add Subjects</button> */}
        </div>

        {
            (dataLoading || deleteLoading) ?
                <Loader /> :
                <div className="table-container">
                    <table className="table">
                        <thead className="thead">
                            <tr className="tr">
                                <th className="th">Serial</th>
                                <th className="th">Name</th>
                                <th className="th">Email</th>
                                <th className="th">Possible Destination</th>
                                <th className="th">Point</th>
                                <th className="th">Updated</th>
                                <th className="th">Status</th>
                                <th className="th">Details</th>
                                <th className="th">Delete</th>
                            </tr>
                        </thead>
                        <tbody className="tbody">
                        {
                            data?.data?.map((person:any,index:number)=>(
                                <tr key={person?._id} className="tr">
                                    <td className="td" data-label="Serial">{index+1}</td>
                                    <td className="td" data-label="Subject Name">{person?.name}</td>
                                    <td className="td" data-label="Email">{person?.email}</td>
                                    <td className="td" data-label="Possible Destination">{person?.prefered_country}</td>
                                    <td className="td" data-label="Possible Destination">{person?.en_proficiency}</td>
                                    <td className="td" data-label="updated">{person?.updated}</td>
                                    <td className="td" data-label="updated">{person?.condition}</td>
                                    <td className="td" data-label="details"><FontAwesomeIcon onClick={()=>{setOpen(!open);setNumber(index)}} icon={faAngleDoubleRight}/></td>
                                    <td className="td" data-label="Delete"><FontAwesomeIcon onClick={()=>handleDelete(person?.email)} icon={faCancel}/></td>
                                </tr>
                            ))
                        }
                        </tbody>
                    </table>
                </div>

        }

        

        <div className={open? "mod-open" : "modal"}>
            <button onClick={()=>setOpen(!open)} className='mod-close'>Close</button>
                <div className="req-details">
                    <table className="vertical-table">
                        <tbody>
                        {data?.data[number] &&
    Object.entries(data.data[number]).map(([key, value]) => (
      <tr key={key}>
        <td className="key">{key}</td>
        <td className="value">{value}</td>
      </tr>
    ))}
                            
                        </tbody>
                    </table>
                </div>
        </div>
      </div>
    )
}

export default page