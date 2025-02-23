'use client'
import { useAuth } from '@/authHooks/useAuth'
import '@/css/Redirect/Redirect.css'
import { useRouter } from 'next/navigation'
import { SubmitHandler, useForm } from 'react-hook-form'
import { toast } from 'react-toastify'

type Inputs = {
    email: string
}


const page = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<Inputs>()
    const { resetPassword , loading } = useAuth()
    const router = useRouter()


    const onSubmit: SubmitHandler<Inputs> = async(data) => {
        try{
            console.log(data)
            const res = await resetPassword(data)
            console.log(res)
            if(res?.success){
                toast.success(res?.message)
                router.push('/')
            }else{
                toast.error(res?.message)
            }
        }catch(err){
            console.log(err)
        }
    }
    
    return (
        <div className='redirect-page'>
            <div>
                <h1>Reset your password!</h1>
                <form  onSubmit={handleSubmit(onSubmit)}>
                    <input type="email" placeholder='Enter your email' {...register("email", { required: true })}/>
                    {loading ? 'Loading...' : <button type="submit">proceed</button>}
                </form>
            </div>
        </div>
    )
}

export default page