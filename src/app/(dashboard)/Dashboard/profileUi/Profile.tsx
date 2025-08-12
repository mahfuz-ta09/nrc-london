'use client'
import { SubmitHandler, useForm } from 'react-hook-form'
import "@/app/(dashboard)/Dashboard/admin/country-uni/AddCountryModal/AddCountryModal.css"
import { useUpdateUserProfileMutation } from '@/redux/endpoints/profile/profileEndpoints'
import { useUserInfo } from '@/utils/useUserInfo'
import { toast } from 'react-toastify'
import convertFormData from '@/utils/convertFormData'

interface IFormInput {
    name: string
    phone: number
    dob: string
    country: string
    file?: FileList | null
    review:string
    password:string
}


const Profile = ({profileData , setProfileData}:{profileData:boolean,setProfileData:any}) => {
    const { Uid } = useUserInfo()
    const { register , handleSubmit , reset } = useForm<IFormInput>()
    const [updateUserProfile , { isLoading: uploadLoading }] = useUpdateUserProfileMutation()
    

    const onSubmit: SubmitHandler<IFormInput> = async(data) => {
        try {
            const formData = convertFormData(data)
            const res = await updateUserProfile({ data: formData , id: Uid })
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
        <div className={profileData? 'modal-container openmoda-container' :'modal-container'}>
            
            <div className='modal-body'>
                <button
                    onClick={() => setProfileData(!profileData)}
                    className="cancel-btn"
                >
                    X
                </button>

                <form onSubmit={handleSubmit(onSubmit)} className='modal-from'>
                    <h1 className="form-label" >Update your profile</h1>
                    <div className='input-container'>
                        <label className="form-label" htmlFor="name">Name:</label>
                        <input className="form-input" type="text" {...register("name")}/>
                    </div>
                    
                    <div className='input-container'>
                        <label className="form-label" htmlFor="Country">Country:</label>
                        <input className="form-input" type="text" {...register("country")}/>
                    </div>
                    
                    
                    <div className='input-container'>
                        <label className="form-label" htmlFor="Password">Reset password:</label>
                        <input className="form-input" type="text" {...register("password")}/>
                    </div>
                    
                    <div className='input-container'>
                        <label className="form-label" htmlFor="Country">Comment/delete/update:</label>
                        <textarea className="form-input" style={{minHeight:"10vh",padding:'10px',width:'100%'}} {...register("review")}/>
                    </div>

                    <div className='input-container'>
                        <label className="form-label" htmlFor="mobile">Mobile Number:</label>
                        <input className="form-input" type="number" {...register("phone")}/>
                    </div>

                    <div className='input-container'>
                        <label className="form-label" htmlFor="dob">Date of Birth:</label>
                        <input className="form-input" type="date" {...register("dob")}/>
                    </div>
                    
                    <div className='input-container'>
                        <label className="form-label" htmlFor="file">Your image:</label>
                        <input style={{color:"white"}} id="file" type="file" {...register("file")}  />
                    </div>
                    
                    {uploadLoading ? <p>Loading...</p> : <button className='modal-sbmt-btn'type="submit" >Update</button>}
                </form> 
                

            </div>
        </div>
    )
}

export default Profile

