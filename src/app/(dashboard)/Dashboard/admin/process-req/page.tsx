'use client'
import '@/css/Dashboard/admin/university.css'
import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCancel } from '@fortawesome/free-solid-svg-icons'
import { useDeleteSubjectMutation, useGetSubjectQuery } from '@/redux/endpoints/subject/subjectEndpoints'
import { toast } from 'react-toastify'



const page = () => {
    const [open,setOpen] = useState(false)
    const [name,setName] = useState("")
    const [uniId,setUniId] = useState("")
    const { data , isLoading : dataLoading } = useGetSubjectQuery()
    const [ deleteSubject , { isLoading : deleteLoading }] = useDeleteSubjectMutation()
    
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
    

    
    return (
      <div className='university-content'>
        <div className="header">
          <h1>Process request:</h1>
          <button onClick={()=>{setOpen(!open);setName("Add")}}>Add Subjects</button>
        </div>

        {
            (dataLoading || deleteLoading) ?
            <p>Loading...</p> :
             
                <div className="table-container">
                    <table className="table">
                        <thead className="thead">
                            <tr className="tr">
                                <th className="th">Serial</th>
                                <th className="th">Name</th>
                                <th className="th">Email</th>
                                <th className="th">Comment</th>
                                <th className="th">Delete</th>
                            </tr>
                        </thead> 
                        <tbody className="tbody">
                        {
                            data?.data?.map((sub:any,index:number)=>(
                                <tr key={sub?._id} className="tr">
                                    <td className="td" data-label="Serial">{index+1}</td>
                                    <td className="td" data-label="Subject Name">{sub?.name}</td>
                                    <td className="td" data-label="Possible Destination">{sub?.destination}</td>
                                    <td className="td" data-label="Duration (Months)">#{sub?.duration}</td>
                                    <td className="td" data-label="Delete"><FontAwesomeIcon onClick={()=>handleDelete(sub?._id)} icon={faCancel}/></td>
                                </tr>
                            ))
                        }
                        </tbody>
                    </table>
                </div>

        }

        

        <div className={open? "mod-open" : "modal"}>
            <button onClick={()=>setOpen(!open)} className='mod-close'>Close</button>
        </div>
      </div>
    )
}

export default page