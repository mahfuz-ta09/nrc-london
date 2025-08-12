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
     <div>
     <div className="profile-card">
        <div className="profile-image">
          <img
            src={profile?.data?.image ? profile?.data?.image : iUrl}
            alt={profile?.data?.name || "Profile picture"}
          />
        </div>



      <div className="profile-info">
        <h2 className="profile-name">{profile?.data?.name}</h2>
        <p className="profile-email">{data?.Uemail}</p>
        <p><strong>ID:</strong> {data?.Uid}</p>
        <p><strong>Role:</strong> {data?.Urole}</p>
        <p><strong>Status:</strong> {data?.Ustatus}</p>
        <hr />
        <p><strong>Account Created:</strong> {profile?.data?.createdAt}</p>
        <p><strong>DOB:</strong> {profile?.data?.dob}</p>
        <p><strong>Phone:</strong> {profile?.data?.phone}</p>
        <p><strong>Country:</strong> {profile?.data?.country}</p>

        {/* Review Section */}
        {profile?.data?.review && (
          <div className="profile-review">
            <p><strong>Your previous comment:</strong></p>
            <p className="review-text">{profile?.data?.review}</p>
            {deleteLoading ? (
              <p>Loading...</p>
            ) : (
              <button
                className="delete-btn"
                onClick={() => handleDelete(data?.Uid)}
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