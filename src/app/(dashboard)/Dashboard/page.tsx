'use client'
import Loader from "@/component/shared/Loader/Loader"
import "@/css/Dashboard/profile.css"
import { useGetProfileByIdQuery } from "@/redux/endpoints/profile/profileEndpoints"
import { useUserInfo } from "@/utils/useUserInfo"
import { useState } from "react"
import Profile from "./profileUi/Profile"
import { useDeleteReviewMutation } from "@/redux/endpoints/review/reviewEndpoints"
import { toast } from "react-toastify"
import { useRouter } from "next/navigation"


const page = () => {
    const data = useUserInfo()
    const [profileData, setProfileData] = useState<boolean>(false)
    const { data: profile, refetch , isLoading: profileLoading } = useGetProfileByIdQuery(data?.Uid)
    const [deleteReview , { isLoading: deleteLoading }] = useDeleteReviewMutation()


    const iUrl = "https://i.ibb.co.com/d06pb1G0/Blue-and-White-Modern-Computer-Illustrative-Tech-Website-Logo.png"
    
    
    if(profileLoading || deleteLoading) return <Loader />


    const handleDelete = async(Uid:string) => {
        try {
            const res = await deleteReview(Uid)
            if(res?.data?.data?.modifiedCount === 1) {
                toast.success("Comment deleted successfully")
                refetch()
            }else{
                toast.error("Comment not deleted")
            }
        }catch(error) {
            console.log(error)      
        }
    }
    
    return (
      <div className="profile-container">
        <div className="all-container">
          <div className="card">
            <img src={profile?.data?.image ? profile?.data?.image : iUrl} alt="Profile picture"/>
            <div className="card-profile">
              <h1>{profile?.data?.name}</h1>
              <p><span>{data?.Uemail}</span></p>
              <p>id: <span>{data?.Uid}</span></p>
              <p>role: <span>{data?.Urole}</span></p>
              <p>status: <span>{data?.Ustatus}</span></p>
            </div>
            <div className="card-profile">
              <p>account created: <span>{profile?.data?.createdAt}</span></p>
              <p>dob: <span>{profile?.data?.dob}</span></p>
              <p>phone: <span>{profile?.data?.phone}</span></p>
              <p>country: <span>{profile?.data?.country}</span></p>
            </div>
          </div>

          {profile?.data?.review && <div className="profile-comments">
                <p>your previous comment : </p>
                <p className="form-label">{profile?.data?.review}</p>
                {deleteLoading ? <p>Loading...</p> :<button onClick={()=>handleDelete(data?.Uid)} style={{padding:"5px 16px",width:"80px",margin:"10px 0",border:"none",borderRadius:"4px"}}>delete</button>}
          </div>}

          <div className="button-grp">
            <button onClick={()=>{setProfileData(!profileData)}} className="btn">{profileData?"close":"profile"}</button>
          </div>
        </div>
        
        <Profile profileData={profileData}/>
      </div>
    )
  }
  
  export default page