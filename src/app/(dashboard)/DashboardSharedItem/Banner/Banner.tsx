'use client'
import { toast } from 'react-toastify'
import { Suspense, useState } from "react"
import BannerActionModal from "./BannerActionModal"
import Loader from "@/component/shared/Loader/Loader"
import '../../../../css/Dashboard/super_admin/common.css'
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useDeleteBannerMutation, useGetAllBannersQuery } from '@/redux/endpoints/banner/bannerEndpoint'

const Banner = () => {
    const [addBanner,setAddBanner] = useState({action:"",id:'',isOPen: false,name:''})
    const { data: banners , isLoading: bannerLoading } = useGetAllBannersQuery({status:'all'})
    const [deleteBanner , { isLoading: deleteLoading } ] = useDeleteBannerMutation()
    if(bannerLoading || deleteLoading) return <Loader />

    const deleteHandler = async(id: string) =>  {
        try{
            const a = window.confirm('Are you sure to delete this banner?')
            if(!a) return 
            const res = await deleteBanner(id)

            if(res?.data?.data?.deletedCount){
                toast.success("deleted successfully!")
            }else{
                toast.error("Failed to deleted!")
            }
        }catch(err){
            toast.error("failed to delete the banner")
        }
    }
    
    // console.log(banners)

    return (
        <div className="sAdmin">
            <div className="sAdmin-header">
                <h1>All Banner</h1>
                <button onClick={()=>setAddBanner({action:"add",id:'',isOPen: true,name:''})}>Create Banner</button>
            </div>

            
            <div className="table-container-users">
                <table className="responsive-table">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Id</th>
                            <th>Serial On Banner</th>
                            <th>Title</th>
                            <th>description</th>
                            <th>status</th>
                            <th>Image</th>
                            <th>Edit</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Array.isArray(banners?.data) &&
                        banners.data.map((banner:any, index:number) => (
                        <tr key={banner?._id || index} className="tr">
                            <td>{index+1}</td>
                            <td>{banner?._id}</td>
                            <td>{banner?.serial}</td>
                            <td>{banner?.title}</td>
                            <td>{banner?.description}</td>
                            <td>{banner?.status}</td>
                            <td><img className='table-img' src={banner?.imageUrl?.url} alt="" /></td>
                            <td><button onClick={()=>deleteHandler(banner?._id)} className="delete-users-btn"><FontAwesomeIcon icon={faTrash} /></button></td>
                            <td><button onClick={()=>setAddBanner({action:"edit",id:banner?._id,isOPen: true,name:''})} className="edit-users-btn"><FontAwesomeIcon icon={faEdit} /></button></td>
                        </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <Suspense fallback={<Loader/>}>
                <BannerActionModal 
                    addBanner={addBanner}
                    setAddBanner={setAddBanner}
                />
            </Suspense>
        </div>
    )
}

export default Banner
