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
    console.log(profile?.data)
    return (
      <div className="courses-container">
        <div className="course">
          {/* Left preview: profile image & name */}
          <div className="course-preview">
            <div className="profile-image">
              <img
                src={
                  profile?.data?.image
                    ? profile?.data?.image?.url
                    : iUrl
                }
                alt="Profile picture"
              />
            </div>
          </div>

          {/* Right info section */}
          <div className="course-info">
            <div className="progress-container">
              <div className="progress"></div>
              <span className="progress-text">
                Role: {data?.Urole || "N/A"}
              </span>
            </div>

            <h6>User Info</h6>
            <h2>{profile?.data?.name}</h2>
            <p className="profile-email">{data?.Uemail}</p>
            <p>ID: {data?.Uid}</p>
            <p><strong>Status:</strong> {data?.Ustatus}</p>
            <p><strong>Account Created:</strong> {profile?.data?.createdAt}</p>
            <p><strong>DOB:</strong> {profile?.data?.dob}</p>
            <p><strong>Phone:</strong> {profile?.data?.phone}</p>
            <p><strong>Country:</strong> {profile?.data?.country}</p>


            <button
              className="btn"
              onClick={() => setProfileData(!profileData)}
            >
              {profileData ? "Close Profile" : "Edit Profile"}
            </button>
          </div>
        </div>

        {/* Social Panel (optional, reused from given code) */}
        {/* <div className="social-panel-container">
          <div className="social-panel">
            <p>
              Created with <i className="fa fa-heart"></i> by
              <a target="_blank" href="https://florin-pop.com">Florin Pop</a>
            </p>
            <button className="close-btn">
              <i className="fas fa-times"></i>
            </button>
            <h4>Get in touch on</h4>
          </div>
        </div> */}

            {profile?.data?.review && (
              <div className="profile-review">
                <p><strong>Your previous comment:</strong></p>
                <p className="review-text">{profile?.data?.review}</p>
                {deleteLoading ? (
                  <p>Loading...</p>
                ) : (
                  <button
                    className="btn profile-delete-btn"
                    onClick={() => handleDelete(data?.Uemail)}
                  >
                    Delete
                  </button>
                )}
              </div>
            )}
        {/* Profile modal component */}
        <Profile setProfileData={setProfileData} profileData={profileData} />
      </div>

    )
}
  
  export default page