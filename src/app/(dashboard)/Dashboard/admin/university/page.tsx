'use client'
import '@/css/Dashboard/admin/university.css'
import { faCancel, faPen } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useState } from 'react'
import UpdateUni from './UpdateUni'
import { useDeleteUniversityMutation, useGetUniversityQuery } from '@/redux/endpoints/university/universityEndpoints'
import { toast } from 'react-toastify'
import Loader from '@/component/shared/Loader/Loader'


const page = () => {
    const [open,setOpen] = useState(false)
    const [name,setName] = useState("")
    const [uniId,setUniId] = useState("")
    const {data , isLoading : fetchLoading} = useGetUniversityQuery()
    const [deleteUniversity , { isLoading: deleteLoading}] = useDeleteUniversityMutation()


    const handleDelete = async(id:string)=>{
        try{
            const response = await deleteUniversity(id)
            
            if(response?.data?.data?.acknowledged){
                toast.success("Successfully deleted!")
            }else{
                toast.error("Failed to delete!")
            }
        }catch(err){
            console.log(err)
        }
    }

    

    return (
      <div className='university-content'>
        <div className="header">
          <h1>University:</h1>
          <button onClick={()=>{setOpen(!open);setName("Add")}}>Add University</button>
        </div>

        {
            (fetchLoading || deleteLoading) ?
            <Loader /> :
             
            <div className="table-container">
                <table className="table">
                    <thead className="thead">
                        <tr className="tr">
                            <th className="th">Serial</th>
                            <th className="th">University Name</th>
                            <th className="th">Country</th>
                            <th className="th">Image</th>
                            <th className="th">Ranking</th>
                            <th className="th">Tuition Fee</th>
                            <th className="th">Required Document</th>
                            <th className="th">Application Fee</th>
                            <th className="th">Duration (Months)</th>
                            <th className="th">Intakes</th>
                            <th className="th">Entry Requirements</th>
                            <th className="th">Application Deadlines</th>
                            <th className="th">Update</th>
                            <th className="th">Delete</th>
                        </tr>
                    </thead>
                    <tbody className="tbody">
                        {
                            data?.data?.map((uni:any,index:number)=>(
                                <tr key={uni?._id} className="tr">
                                    <td className="td" data-label="University Name">{index+1}</td>
                                    <td className="td" data-label="University Name">{uni?.name}</td>
                                    <td className="td" data-label="Ranking">#{uni?.country}</td>
                                    <td className="td" data-label="Logo"><img className="logo-img" src={uni?.url} alt="Harvard Logo"/></td>
                                    <td className="td" data-label="Ranking">{uni?.ranking}</td>
                                    <td className="td" data-label="Tuition Fee">${uni?.tuitionFee}</td>
                                    <td className="td" data-label="Required Document">{uni?.requiredDocs}</td>
                                    <td className="td" data-label="Application Fee">${uni?.applicationFee}</td>
                                    <td className="td" data-label="Duration (Months)">{uni?.duration}</td>
                                    <td className="td" data-label="Intakes">{uni?.intakes}</td>
                                    <td className="td" data-label="Entry Requirements">{uni?.entryRequirements}</td>
                                    <td className="td" data-label="Application Deadlines">{uni?.applicationDeadlines}</td>
                                    <td className="td" data-label="Application Deadlines"><FontAwesomeIcon onClick={()=>{setOpen(!open);setName("Edit");setUniId(uni?._id)}} icon={faPen}/></td>
                                    <td className="td" data-label="Application Deadlines"><FontAwesomeIcon onClick={()=>handleDelete(uni?._id)} icon={faCancel}/></td>
                                </tr>))
                        }
                    </tbody>
                </table>
            </div>

        }
        <div className={open? "mod-open" : "modal"}>
            <button onClick={()=>setOpen(!open)} className='mod-close'>Close</button>
            <UpdateUni name={name} setOpen={setOpen} uniId={uniId} />
        </div>
      </div>
    )
}

export default page