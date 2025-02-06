'use client'
import "@/css/Dashboard/profile.css"
import { useUserInfo } from "@/utils/useUserInfo"

const page = () => {
    const data = useUserInfo()



    return (
      <div className="profile-container">
        <div className="card">
            <img src="https://images.pexels.com/photos/30189620/pexels-photo-30189620/free-photo-of-white-and-gray-cat-on-tree-in-sunlight.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="John"/>
            <h1>John Doe</h1>
            <p className="title">{data?.Uemail}</p>
            <p>id:{data?.Uid}</p>
            <p>role:{data?.Urole}</p>
            <button>Contact</button>
        </div>
      </div>
    )
  }
  
  export default page