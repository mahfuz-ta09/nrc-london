'use client'
import { useForm, SubmitHandler } from "react-hook-form"
import '@/css/HomeApply/HomeApply.css'
import { useSendEmailMutation } from '@/redux/endpoints/profile/profileEndpoints'
import { useRouter } from 'next/navigation'
import { toast } from 'react-toastify'

type Inputs = {
    fullName: string;
    country: string;
    email: string;
}
const HomeApply = () => {
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
        <section className="home-apply-container">
            <div className="home-apply-overlay"></div>
            <div className="home-apply-content">
                <div className="apply-left">
                    <p className="subtitle">🌱 Prepare for Your Future</p>
                    <h2 className="home-text-header" style={{color:"#fff"}}><span style={{color:"#F9C748"}}>Apply Now</span> for the Upcoming Intake</h2>
                    <p>
                        Secure your spot at top universities worldwide. Our expert team is ready to guide you 
                        through every step of your application journey — from choosing the right course 
                        to submitting a winning application.
                    </p>
                    <div className="button-container">
                        <button onClick={()=>router.push('/proceed') }>Apply Now</button>
                    </div>
                </div>

                <div className="apply-right">
                    <div className="mini-form">
                        <h4>Get a Free Consultation</h4>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <input {...register("fullName", { required: "name is required" })}  type="text" placeholder="Your Name" />
                            <input {...register("email", { required: "State is required" })} type="email" placeholder="Email" />
                            <input {...register("country", { required: "State is required" })}  type="text" placeholder="country" />
                            {emailLoading ? 'loading...':<button type="submit">Submit</button>}
                        </form>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default HomeApply
