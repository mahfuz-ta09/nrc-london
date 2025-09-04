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
      <div className="profile-container">
        <div className="profile-card">
            <div className="profile-image">
                <img 
                    src="https://cdn.dribbble.com/userupload/33876250/file/original-73d675e3b35687a79566f8a00dcd1e6c.jpg?resize=752x564&vertical=center" 
                    alt="Profile picture"
                />
            </div>

            <div className="profile-oval">
                <div className="profile-info">
                    <h2 className="profile-name">John Doe</h2>
                    <p className="profile-email">john.doe@example.com</p>
                    <p><strong>ID:</strong> USER001</p>
                    <p><strong>Role:</strong> Administrator</p>
                    <p><strong>Status:</strong> Active</p>
                    <hr />
                    <p><strong>Account Created:</strong> January 15, 2024</p>
                    <p><strong>DOB:</strong> March 22, 1990</p>
                    <p><strong>Phone:</strong> +1 (555) 123-4567</p>
                    <p><strong>Country:</strong> United States</p>
                </div>

                <div className="profile-review">
                    <p><strong>Your previous comment:</strong></p>
                    <p className="review-text">This platform has been incredibly helpful for managing our team's workflow. The interface is intuitive and the features are robust.</p>
                    <button className="profile-delete-btn">
                        Delete
                    </button>
                </div>

                <div className="profile-actions">
                    <button className="btn">
                        Profile
                    </button>
                </div>
            </div>
        </div>
    </div>

    )
}
  
  export default page