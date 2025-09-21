'use client'
import '@/css/Dashboard/admin/university.css'
import { faPen, faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useState } from 'react'
import UpdateUni from './UpdateUni'
import { useDeleteUniversityMutation, useGetUniversityQuery } from '@/redux/endpoints/university/universityEndpoints'
import { toast } from 'react-toastify'
import Loader from '@/component/shared/loader/loader'


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
                            <th className="th">Flag</th>
                            <th className="th">English Skills</th>
                            <th className="th">Tuition Fee</th>
                            <th className="th">Required Qualifications</th>
                            <th className="th">Initial Depossit</th>
                            <th className="th">SCHOLARSHIP</th>
                            <th className="th">Update</th>
                            <th className="th">Delete</th>
                        </tr>
                    </thead>
                    <tbody className="tbody">
                        {
                            data?.data?.map((uni:any,index:number)=>(
                                <tr key={uni?._id} className="tr">
                                    <td className="td" data-label="Serial">{index+1}</td>
                                    <td className="td" data-label="University Name">{uni?.name}</td>
                                    <td className="td" data-label="Country">{uni?.country}</td>
                                    <td className="td" data-label="University image"><img className="logo-img" src={uni?.url} alt="University Image"/></td>
                                    <td className="td" data-label="Country flag"><img className="logo-img" src={uni?.flag} alt="Flag Image"/></td>
                                    <td className="td" data-label="English Test">{uni?.englishTest}</td>
                                    <td className="td" data-label="Tuition Fee">{uni?.tuitionFee}</td>
                                    <td className="td" data-label="Required qualification">{uni?.requardQualification}</td>
                                    <td className="td" data-label="Initial Depossit">{uni?.initialDepossit}</td>
                                    <td className="td" data-label="Scholarship">{uni?.SCHOLARSHIP}</td>
                                    <td className="td" data-label="Edit"><FontAwesomeIcon onClick={()=>{setOpen(!open);setName("Edit");setUniId(uni?._id)}} icon={faPen}/></td>
                                    <td className="td" data-label="Delete"><FontAwesomeIcon onClick={()=>handleDelete(uni?._id)} icon={faTrash}/></td>
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