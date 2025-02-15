'use client'
import Loader from "@/component/shared/Loader/Loader"
import "@/css/Dashboard/profile.css"
import { useGetProfileByIdQuery } from "@/redux/endpoints/profile/profileEndpoints"
import { useUserInfo } from "@/utils/useUserInfo"
import { useState } from "react"
import Profile from "./profileUi/Profile"
import ProfileAgent from "./profileUi/ProfileAgent"
import ProfileProcess from "./profileUi/ProfileProcess"
import { useDeleteReviewMutation } from "@/redux/endpoints/review/reviewEndpoints"
import { toast } from "react-toastify"


const page = () => {
    const data = useUserInfo()
    const [profileData, setProfileData] = useState<boolean>(false)
    const [agentData, setAgentData] = useState<boolean>(false)
    const [processData, setProcessData] = useState<boolean>(false)
    const { data: profile, refetch , isLoading: profileLoading } = useGetProfileByIdQuery(data?.Uid)
    const [deleteReview , { isLoading: deleteLoading }] = useDeleteReviewMutation()


    const iUrl = "https://i.ibb.co.com/rRNMCXtf/vr2.png"
    
    
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

          {profile?.data?.review && <div className="comments" style={{color:"black" , width:"50%",margin:"10px 0",padding:"10px",border:"1px solid black",borderRadius:"4px"}}>
                <p>Want to delete your comment now?</p>
                <p className="form-label" style={{color:"white"}}>your previous comment : {profile?.data?.review}</p>
                {deleteLoading ? <p>Loading...</p> :<button onClick={()=>handleDelete(data?.Uid)} style={{padding:"5px 16px",width:"80px",margin:"10px 0",border:"none",borderRadius:"4px"}}>delete</button>}
          </div>}

          <div className="button-grp">
            <button onClick={()=>{setProfileData(!profileData);setAgentData(false);setProcessData(false)}} className="btn">{profileData?"close":"profile"}</button>
            {data?.Urole==='agent'&& <button onClick={()=>{setAgentData(!agentData);setProfileData(false);setProcessData(false)}} className="btn">{agentData?"close":"agent"}</button>}
            {data?.Urole==='agent'&& <button onClick={()=>{setProcessData(!processData);setProfileData(false);setAgentData(false)}} className="btn">{processData?"close":"process"}</button>}
          </div>
        </div>
        
        <Profile profileData={profileData}/>
        <ProfileAgent agentData={agentData}/>
        <ProfileProcess processData={processData}/>
      </div>
    )
  }
  
  export default page