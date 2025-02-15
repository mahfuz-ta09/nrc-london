'use client'
import { SubmitHandler, useForm } from 'react-hook-form'
import "@/css/Dashboard/profile.css"
import { useUpdateUserProfileMutation } from '@/redux/endpoints/profile/profileEndpoints'
import { useUserInfo } from '@/utils/useUserInfo'
import useImgBBUpload from '@/utils/useImgBBUpload'
import { toast } from 'react-toastify'


interface IFormInput {
    name: string
    phone: number
    dob: string
    country: string
    image?: FileList | null
    password:string
    review:string
}

const Profile = ({profileData}:{profileData:boolean}) => {
    const { Uid } = useUserInfo()
    const { uploadImage, isLoading: imageLoading } = useImgBBUpload()
    const { register , handleSubmit , reset } = useForm<IFormInput>()
    const [updateUserProfile , { isLoading: uploadLoading }] = useUpdateUserProfileMutation()
    

    const onSubmit: SubmitHandler<IFormInput> = async(data) => {
        try {
            if(data?.image) {
                const url = await uploadImage(data?.image)
                if(url){
                    data.image = url
                }
            }
            const res = await updateUserProfile({ data: data , id: Uid })
            if(res?.data?.data?.modifiedCount === 1) {
                reset()
                toast.success("Profile updated successfully")
            }else{
                toast.error(res?.data?.errorMessage || "Profile not updated")
            }
        }catch(error) {
            console.log(error)      
        }
    }


    return (
        <div className={profileData? "profile-edit-container" : "profile-container-hode"}>
            
            <form onSubmit={handleSubmit(onSubmit)}>
                <h1 className="form-label" >Update your profile</h1>
                <label className="form-label" htmlFor="name">Name:</label>
                <input className="form-input" type="text" {...register("name")}/>
                
                <label className="form-label" htmlFor="Country">Country:</label>
                <input className="form-input" type="text" {...register("country")}/>
                
                <label className="form-label" htmlFor="Country">Comment/delete/update:</label>
                <textarea className="form-input" style={{minHeight:"10vh",padding:'10px',width:'100%'}} {...register("review")}/>

                <label className="form-label" htmlFor="mobile">Mobile Number:</label>
                <input className="form-input" type="number" {...register("phone")}/>

                <label className="form-label" htmlFor="password">Password:</label>
                <input className="form-input" autoComplete="new-password" type="password" {...register("password",{ required: false })}/>

                <label className="form-label" htmlFor="dob">Date of Birth:</label>
                <input className="form-input" type="date" {...register("dob")}/>
                
                <label className="form-label" htmlFor="image">Your image:</label>
                <input style={{color:"white"}} id="file" type="file" {...register("image")}  />
                
                {(uploadLoading || imageLoading) ? <p>Loading...</p> : <button className='prfl-udate-btn' type="submit" >Update</button>}
            </form>

        </div>
    )
}

export default Profile