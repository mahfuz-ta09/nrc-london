'use client'
import '@/css/Redirect/Redirect.css'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { useForm, SubmitHandler } from "react-hook-form"
import { useAuth } from '@/authHooks/useAuth'
import { toast } from 'react-toastify'
import { setCookie } from '@/utils/setCookies'

type Inputs = {
  code: string
}

const page = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<Inputs>()
    const {verifyUser , loading } = useAuth()
    const logItem = JSON.parse(sessionStorage.getItem('logItem') || '{}')
    const router = useRouter()

    useEffect(()=>{
        if(!logItem?.email && !logItem?.id){
            router.push('/')
        }
    },[])


    const onSubmit: SubmitHandler<Inputs> = async(data) => {
        try{
            if (logItem) {
                const obj = {
                    ...logItem,
                    code:data?.code
                }
                
                const res = await verifyUser(obj)
                console.log(res)
                if(res?.success){
                    localStorage.setItem('accessToken',res?.meta?.accessToken)
                    setCookie(res?.meta?.accessToken)
                    sessionStorage.removeItem('logItem')
                    toast.success(res?.message)
                    router.push('/')
                }else{
                    toast.error(res?.message)
                }
            }
        }catch(err){
            console.log(err)
        }
    }


    return (
        <div className="redirect-page">
            <div>
                <h1>Check your email for a code!</h1>
                <form  onSubmit={handleSubmit(onSubmit)}>
                    <input type="digit"  {...register("code", { required: true })}/>
                    {loading ? 'Loading...' : <button type="submit">Verify</button>}
                </form>
            </div>
        </div>
    )
}

export default page