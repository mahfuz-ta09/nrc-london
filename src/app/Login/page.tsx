'use client'
import Link from 'next/link'
import '@/css/Login/Login.css'
import { useRouter } from 'next/navigation'
import { SubmitHandler, useForm } from 'react-hook-form'
import convertFormData from '@/utils/convertFormData'
import { toast } from 'react-toastify'
import useAuth from '@/authHooks/useAuth'
import Loader from '@/component/shared/Loader/Loader'


type Inputs = {
    email: string
    password: string
}

const LoginPage = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<Inputs>()
    const router = useRouter()
    const { logInUser, loading , error} = useAuth()

    const onSubmit: SubmitHandler<Inputs> = async(data) => {
      let formData = convertFormData(data)
        try{
            const res = await logInUser(formData)
            if(res?.success){
                toast.success(res?.message)
                window.location.href = '/'
            }else{
                toast.error(res?.message)
            }
        }catch(err:any){
            console.log(err)
        }
    }


    if(loading) return <Loader />

    return (
            <div className="login-container">
                <div className="login-content">
                    <div className="login-content-item">
                        <h1 className="">Log in</h1>
                        <p className="">Log in to your account to access your content</p>
                        <form onSubmit={handleSubmit(onSubmit)} className="input-container">
                            <input type='email' {...register("email", { required: true })} placeholder="enter your email" className=""/>
                            <input type='password' {...register("password", { required: true })}   placeholder="enter your password" className=""/>
                            <div className="form-link">
                                <Link className='forgot-link' href="/ResetPass">forgot password?</Link>
                                <button type="submit" className="">login</button>
                            </div>
                        </form>
                        <div className="social-login">
                                <button className="" onClick={()=>router.push('/')}>home?</button>
                        </div>
                        <Link className='forgot-link underline' href="/Signup">Do not have account? sign up</Link>
                    </div>
                    <div className='image-conteiner'>
                        <img src='https://i.ibb.co.com/yN0nYww/books.webp' className="" alt=''/>
                    </div>
                </div>
            </div>
    )
}


export default LoginPage