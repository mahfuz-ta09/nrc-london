'use client'
import Loader from "@/component/shared/Loader/Loader"
import "@/css/Dashboard/profile.css"
import { useGetProfileByIdQuery } from "@/redux/endpoints/profile/profileEndpoints"
import { useUserInfo } from "@/utils/useUserInfo"
import { useState } from "react"
import Profile from "./profileUi/Profile"
import { useDeleteReviewMutation } from "@/redux/endpoints/review/reviewEndpoints"
import { toast } from "react-toastify"

const Page = () => {
    const data = useUserInfo()
    const [profileData, setProfileData] = useState(false)

    const { data: profile, refetch, isLoading: profileLoading } = useGetProfileByIdQuery(data?.Uemail!, { skip: !data?.Uemail })
    const [deleteReview, { isLoading: deleteLoading }] = useDeleteReviewMutation()

  
    if (profileLoading || deleteLoading) return <Loader />

    const handleDelete = async (Uemail: string | undefined) => {
      if (!Uemail) return toast.error("Email not found")

      try {
          const isConfirmed = window.confirm(`Are you sure you want to delete?`)
          if (!isConfirmed) return

          const res = await deleteReview(Uemail)
          if (res?.data?.data?.deletedCount === 1) {
            toast.success("Comment deleted successfully")
            refetch()
          } else {
            toast.error("Comment not deleted")
          }
      } catch (error) {
          console.log(error)
      }
    }

    return (
      <div className="courses-container">
          <div className="course">
            <div className="course-preview">
              <div className="profile-image">
                <img
                  src={profile?.data?.image?.url || "https://res.cloudinary.com/dczblyxih/image/upload/v1746651178/nsn9a9bwvsohtrpnaoqd.jpg"}
                  alt="Profile picture"
                />
              </div>
            </div>

            {/* Right info */}
            <div className="course-info">
              <div className="progress-container">
                <div className="progress"></div>
                <span className="progress-text">Role: {data?.Urole || "N/A"}</span>
              </div>

              <h6>User Info</h6>
              <h2>{profile?.data?.name}</h2>
              <p className="profile-email">{data?.Uemail}</p>
              <p>ID: {data?.Uid}</p>
              <p>
                <strong>Status:</strong> {data?.Ustatus}
              </p>
              <p>
                <strong>Account Created:</strong> {profile?.data?.createdAt}
              </p>
              <p>
                <strong>DOB:</strong> {profile?.data?.dob}
              </p>
              <p>
                <strong>Phone:</strong> {profile?.data?.phone}
              </p>
              <p>
                <strong>Country:</strong> {profile?.data?.country}
              </p>

              <button className="btn" onClick={() => setProfileData(!profileData)}>
                {profileData ? "Close Profile" : "Edit Profile"}
              </button>
            </div>
          </div>

          {profile?.data?.review && (
            <div className="profile-review">
              <p>
                <strong>Your previous comment:</strong>
              </p>
              <p className="review-text">{profile?.data?.review}</p>
              <button
                className="btn profile-delete-btn"
                onClick={() => handleDelete(data?.Uemail)}
              >
                Delete
              </button>
            </div>
          )}


          <Profile setProfileData={setProfileData} profileData={profileData} />
      </div>
    )
}

export default Page
