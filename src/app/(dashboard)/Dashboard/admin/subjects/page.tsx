'use client'
import { useState } from 'react'
import SubCntrl from './SubCntrl'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCancel, faPen } from '@fortawesome/free-solid-svg-icons'
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
    // console.log(data)
    return (
      <div className='university-content'>
        <div className="header">
          <h1>Subjects:</h1>
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
                                <th className="th">Subject Name</th>
                                <th className="th">Possible Destination</th>
                                <th className="th">Duration (Months)</th>
                                <th className="th">Tuition Fee</th>
                                <th className="th">Required Document</th>
                                <th className="th">Application Fee</th>
                                <th className="th">Intakes</th>
                                <th className="th">Entry Requirements</th>
                                <th className="th">Application Deadlines</th>
                                <th className="th">Update</th>
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
                                    <td className="td" data-label="Tuition Fee">${sub?.tuitionFee}</td>
                                    <td className="td" data-label="Required Document">{sub?.requiredDocs}</td>
                                    <td className="td" data-label="Application Fee">${sub?.applicationFee}</td>
                                    <td className="td" data-label="Intakes">{sub?.intakes}</td>
                                    <td className="td" data-label="Entry Requirements">{sub?.entryRequirements}</td>
                                    <td className="td" data-label="Application Deadlines">{sub?.applicationDeadlines}</td>
                                    <td className="td" data-label="Update"><FontAwesomeIcon onClick={()=>{setOpen(!open);setName("Edit");setUniId(sub?._id)}} icon={faPen}/></td>
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
            <SubCntrl name={name} setOpen={setOpen} uniId={uniId} />
        </div>
      </div>
    )
}

export default page