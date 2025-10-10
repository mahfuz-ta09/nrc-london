'use client'
import '@/css/HomeApply/HomeApply.css'
import { toast } from 'react-toastify'
import { useRouter } from 'next/navigation'
import { useForm, SubmitHandler } from "react-hook-form"
import { useSendEmailMutation } from "@/redux/endpoints/profile/profileEndpoints"

type Inputs = {
    fullName: string;
    country: string;
    email: string;
}
const SideForm = () => {    
    const router = useRouter()
    const { register, handleSubmit, reset, formState: { errors } } = useForm<Inputs>()
    const [ sendEmail , {  isLoading: emailLoading } ] = useSendEmailMutation()

    const onSubmit: SubmitHandler<Inputs> = async(data:any) => {
        if(!data?.email){
            toast.error("empty field not allowed")
        }else{
            try{
                const res = await sendEmail({ data: data })
                reset()
                if(res?.data?.success==='false'){
                    toast.error("Faild to send message!")
                }else{
                    toast.success("Message sent!")
                }
            }catch(err){
                console.log(err)
            }
        }
    }
        
    return (
        <div className="mini-form">
            <h4>Get a Free Consultation</h4>
            <form onSubmit={handleSubmit(onSubmit)}>
                <input {...register("fullName", { required: "name is required" })}  type="text" placeholder="Your Name" />
                <input {...register("email", { required: "State is required" })} type="email" placeholder="Email" />
                <input {...register("country", { required: "State is required" })}  type="text" placeholder="country" />
                {emailLoading ? 'loading...':<button type="submit">Submit</button>}
            </form>
        </div>
    )
}

export default SideForm
