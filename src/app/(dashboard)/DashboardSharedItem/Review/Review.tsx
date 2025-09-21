'use client'
import { useState } from 'react'
import { toast } from 'react-toastify'
import '@/css/Dashboard/super_admin/common.css'
import Loader from '@/component/shared/loader/loader'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Pagination from '@/component/shared/Pagination/Pagination'
import { useDeleteReviewMutation, useGetALlReviewQuery } from '@/redux/endpoints/review/reviewEndpoints'


type paraType = {
    email: string,
    name: string,
    page: number,
    limit: number
}

const page = () => {
    const [name,setName] = useState("")
    const [para,setPara] = useState<paraType>({
            email:'',
            name:'',
            page:1,
            limit:10
        })
    const { data: review , isLoading : reviewLoading} = useGetALlReviewQuery(para)
    const [ deleteReview , { isLoading : deleteLoading }] = useDeleteReviewMutation()
    

    const handleDelete= async(id:string) =>  {
        try{
            const a = window.confirm("Are sure want delete this?")
            if(!a) return

            const res = await deleteReview(id)
            if(res?.data?.data?.acknowledged){
                toast.success("The review was deleted.")
            }else{
                toast.error("Failed to delete the review")
            }
        }catch(err){
            console.log(err)
        }
    }
    
    const handlePageChange = (p: number) => {
        setPara({
            ...para,
            page : p
        })
    }
    
    return (
        <div className='sAdmin'>
            <div className="sAdmin-header">
                <h1>Review: (current total review-{review?.meta?.total})</h1>
            </div>

            {
                (reviewLoading || deleteLoading) ?
                <Loader /> :
                
                <div className="table-contant">
                    <table className="responsive-table">
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
                                    <td className="td" data-label="Duration (Months)">{sub?.review}</td>
                                    <td className="td" data-label="Delete"><button  onClick={()=>handleDelete(sub?._id)} className='delete-users-btn'><FontAwesomeIcon icon={faTrash}/></button></td>
                                </tr>
                            ))
                        }
                        </tbody>
                    </table>
                </div>

            }
            
            <Pagination
                totalPages={review?.meta?.totalPages}
                currentPage={Number(para?.page)}
                onPageChange={handlePageChange}
                siblingCount={1}/>
        </div>
    )
}

export default page