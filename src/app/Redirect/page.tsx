'use client'
import '@/css/Redirect/Redirect.css'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { useForm, SubmitHandler } from "react-hook-form"
import useAuth from '@/authHooks/useAuth'
import { toast } from 'react-toastify'
import { sessionValue } from '@/utils/accessToken'
import { setCookie } from '@/utils/manageCookie'

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
    const rawLogItem = sessionValue()
    const logItem = rawLogItem ? JSON.parse(rawLogItem) : null
    const router = useRouter()


    useEffect(()=>{
        if(!logItem?.email || !logItem.id){
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
                
                if(res?.success){
                    localStorage.setItem('userData', JSON.stringify(res.data.userObj))
                    setCookie(res?.data?.userObj)
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
                    <input type="digit" placeholder='Required 6 digit code' {...register("code", { required: true })}/>
                    {loading ? 'Loading...' : <button type="submit">Verify</button>}
                </form>
            </div>
        </div>
    )
}

export default page