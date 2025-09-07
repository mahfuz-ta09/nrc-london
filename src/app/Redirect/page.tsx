'use client'
import '@/css/Redirect/Redirect.css'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { useForm, SubmitHandler } from "react-hook-form"
import useAuth from '@/authHooks/useAuth'
import { toast } from 'react-toastify'
import { sessionValue } from '@/utils/accessToken'

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
        if(!logItem || !logItem?.email || !logItem.id){
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
                    localStorage.setItem('nrc_acc', JSON.stringify({user:res.data.user}))
                    toast.success(res?.message)
                    router.push('/')
                    localStorage.removeItem('logItem')
                }else{
                    toast.error(res?.message)
                }
            }
        }catch(err){
            console.log(err)
            toast.success('something went wrong!')
        }
    }


    return (
        <div className="redirect-page">
            <div>
                <h1>Check your email for a code!</h1>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <input 
                        type="text" 
                        placeholder="Enter 6-digit code" 
                        {...register('code')}
                        pattern="[0-9]{6}"
                        id="verification-code"
                        autoComplete="one-time-code"
                    />
                    <button type="submit" id="verify-btn">Verify</button>
                </form>
            </div>
        
        </div>
    )
}

export default page