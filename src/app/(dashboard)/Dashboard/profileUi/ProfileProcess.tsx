'use client'
import { SubmitHandler, useForm } from 'react-hook-form'
import "@/css/Dashboard/profile.css"
import { useUserInfo } from '@/utils/useUserInfo'

interface IFormInput {
    comment: string
}


const PofileProcess = ({processData}:{processData:boolean}) => {
    const data = useUserInfo()
    const { register , handleSubmit } = useForm<IFormInput>()

    const onSubmit: SubmitHandler<IFormInput> = async(data) => {
        // console.log(data)
    }
    return (
        <div className={(processData && data?.Urole==='student')? "profile-edit-container" : "profile-container-hode"}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <h1 className="form-label" >Update your process request?</h1>
                <label className="form-label" htmlFor="mobile">Mobile Number:</label>
                <input className="form-input" type="number" {...register("comment")}/>
                <input className='prfl-btn' type="submit" value="Update"/>
            </form>
        </div>
    )
}

export default PofileProcess