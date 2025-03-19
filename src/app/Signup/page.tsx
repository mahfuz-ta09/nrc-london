'use client'
import Link from "next/link"
import '@/css/Login/Login.css'
import { useRouter } from "next/navigation"
import { useForm, SubmitHandler } from "react-hook-form"
import useAuth from '@/authHooks/useAuth'
import { toast } from "react-toastify"
import convertFormData from "@/utils/convertFormData"
import Loader from "@/component/shared/Loader/Loader"

type Inputs = {
    name: string
    email: string
    password: string
}


const SignUpPage = () => {
    const router = useRouter()
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<Inputs>()
    const { signUpUser, loading } = useAuth()


    const onSubmit: SubmitHandler<Inputs> =  async(data) => {
        var formData = convertFormData(data)
        try{
            const res = await signUpUser(formData)
            console.log(res) 
            if (res?.success) {
                toast.success(res?.message)
                sessionStorage.setItem('logItem', JSON.stringify({
                    id: res?.data?.id, 
                    email: data.email
                }))
                router.push('/Redirect')
            } else {
                toast.error(res?.message);
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
                    <h1 className="">Sign up</h1>
                    <p className="">Signup to open the horizon</p>
                    <form onSubmit={handleSubmit(onSubmit)} className="input-container">
                        <input type='text' {...register("name", { required: true })}  placeholder="enter your name" className=""/>
                        <input type='email' {...register("email", { required: true })}  placeholder="enter your email" className=""/>
                        <input type='password' {...register("password", { required: true })}  placeholder="enter your password" className=""/>
                        <div className="form-link">
                            <button type="submit">signup</button>
                        </div>
                    </form>
                    <Link className='forgot-link underline' href="/Login">Already have an account? login</Link>
                </div>
                <div className='image-conteiner'>
                    <img src='https://i.ibb.co.com/yN0nYww/books.webp' className="" alt=''/>
                </div>
            </div>
            </div>
    )
}


export default SignUpPage