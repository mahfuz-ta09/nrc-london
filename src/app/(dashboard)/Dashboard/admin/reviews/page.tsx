'use client'
import '@/css/Dashboard/admin/university.css'
import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCancel } from '@fortawesome/free-solid-svg-icons'
import { toast } from 'react-toastify'
import { useDeleteReviewMutation, useGetALlReviewQuery } from '@/redux/endpoints/review/reviewEndpoints'



const page = () => {
    const [open,setOpen] = useState(false)
    const [name,setName] = useState("")
    const [ deleteReview , { isLoading : deleteLoading }] = useDeleteReviewMutation()
    const { data: review , isLoading : reviewLoading} = useGetALlReviewQuery()
    

    const handleDelete= async(id:string) =>  {
        try{
            const res = await deleteReview(id)
            if(res?.data?.data?.acknowledged){
                toast.success("Deletion successful!!")
            }else{
                toast.error("Deletion failed!!")
            }
        }catch(err){
            console.log(err)
        }
    }

    
    return (
      <div className='university-content'>
        <div className="header">
          <h1>Review: (current total review-{review?.meta?.total})</h1>
        </div>

        {
            (reviewLoading || deleteLoading) ?
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
                            review?.data?.map((sub:any,index:number)=>(
                                <tr key={sub?._id} className="tr">
                                    <td className="td" data-label="Serial">{index+1}</td>
                                    <td className="td" data-label="Subject Name">{sub?.name}</td>
                                    <td className="td" data-label="Possible Destination">{sub?.email}</td>
                                    <td className="td" data-label="Duration (Months)">{sub?.comment}</td>
                                    <td className="td" data-label="Delete"><FontAwesomeIcon onClick={()=>handleDelete(sub?.email)} icon={faCancel}/></td>
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