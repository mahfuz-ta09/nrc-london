'use client'
import { SubmitHandler, useForm } from 'react-hook-form'
import "@/css/Dashboard/profile.css"

interface IFormInput {
    comment: string
}


const PofileComment = ({reviewData}:{reviewData:boolean}) => {
    const { register , handleSubmit } = useForm<IFormInput>()

    const onSubmit: SubmitHandler<IFormInput> = async(data) => {
        // console.log(data)
    }
    return (
        <div className={reviewData? "profile-edit-container" : "profile-container-hode"}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <h1 className="form-label" >Update your comment</h1>
                <label className="form-label" htmlFor="mobile">Mobile Number:</label>
                <textarea className="form-input" style={{width:"100%",padding:"15px",minHeight:'10vh',borderRadius:"5px"}} {...register("comment")}/>
                <input className='prfl-btn' type="submit" value="Update"/>
            </form>
        </div>
    )
}

export default PofileComment