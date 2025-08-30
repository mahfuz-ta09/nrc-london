'use client'
import Loader from "@/component/shared/Loader/Loader"
import "@/css/Dashboard/profile.css"
import { useGetProfileByIdQuery } from "@/redux/endpoints/profile/profileEndpoints"
import { useUserInfo } from "@/utils/useUserInfo"
import { useState } from "react"
import Profile from "./profileUi/Profile"
import { useDeleteReviewMutation } from "@/redux/endpoints/review/reviewEndpoints"
import { toast } from "react-toastify"


const page = () => {
    const data = useUserInfo()
    const [profileData, setProfileData] = useState<boolean>(false)
    const { data: profile, refetch , isLoading: profileLoading } = useGetProfileByIdQuery(data?.Uemail)
    const [deleteReview , { isLoading: deleteLoading }] = useDeleteReviewMutation()

    const iUrl = "../../../assets/nrc.logo.png"
    
    
    if(profileLoading || deleteLoading) return <Loader />


    const handleDelete = async(Uemail:string) => {
        try {
            const isConfirmed = window.confirm(`Are you sure you want to delete?`)
            if (!isConfirmed) return; 
            
            const res = await deleteReview(Uemail)
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
      <div className="profile-card">
          <div className="profile-image">
            <img
              src={profile?.data?.image ? profile?.data?.image?.url : iUrl}
              alt="Profile picture"
            />
          </div>



        <div className="profile-info">
          <h2 className="profile-name">{profile?.data?.name}</h2>
          <p className="profile-email">{data?.Uemail}</p>
          {/* <p><strong>ID:</strong> {data?.Uid}</p> */}
          <p><strong>Role:</strong> {data?.Urole}</p>
          {/* <p><strong>Status:</strong> {data?.Ustatus}</p> */}
          <hr />
          <p><strong>Account Created:</strong> {profile?.data?.createdAt}</p>
          <p><strong>DOB:</strong> {profile?.data?.dob}-</p>
          <p><strong>Phone:</strong> {profile?.data?.phone}</p>
          <p><strong>Country:</strong> {profile?.data?.country}</p>

          
          {profile?.data?.review && (
            <div className="profile-review">
              <p><strong>Your previous comment:</strong></p>
              <p className="review-text">{profile?.data?.review}</p>
              {deleteLoading ? (
                <p>Loading...</p>
              ) : (
                <button
                  className="profile-delete-btn"
                  onClick={() => handleDelete(data?.Uemail)}
                >
                  Delete
                </button>
              )}
            </div>
          )}

          {/* Action buttons */}
          <div className="profile-actions">
            <button
              className="btn"
              onClick={() => setProfileData(!profileData)}
            >
              {profileData ? "Close" : "Profile"}
            </button>
          </div>
        </div>
      </div>
        <Profile setProfileData={setProfileData} profileData={profileData}/>
    </div>

    )
  }
  
  export default page