'use client'
import "@/css/Dashboard/profile.css"
import { useUserInfo } from "@/utils/useUserInfo"

const page = () => {
    const data = useUserInfo()
    const iUrl = "https://i.ibb.co.com/rRNMCXtf/vr2.png"
console.log(data)
    return (
      <div className="profile-container">
        <div className="all-container">
          <div className="card">
            <img src={iUrl} alt="Profile picture"/>
            <div className="card-profile">
              <h1>John Doe</h1>
              <p><span>{data?.Uemail}</span></p>
              <p>id: <span>{data?.Uid}</span></p>
              <p>role: <span>{data?.Urole}</span></p>
              <p>role: <span>{data?.Ustatus}</span></p>
            </div>
            <div className="card-profile">
              <p>John Doe</p>
              <p><span>{data?.Uemail}</span></p>
              <p>id: <span>{data?.Uid}</span></p>
              <p>role: <span>{data?.Urole}</span></p>
              <p>role: <span>{data?.Ustatus}</span></p>
            </div>
          </div>

          <div className="button-grp">
            <button className="btn">profile</button>
            <button className="btn">Agent</button>
            <button className="btn">Process</button>
          </div>
        </div>
      </div>
    )
  }
  
  export default page