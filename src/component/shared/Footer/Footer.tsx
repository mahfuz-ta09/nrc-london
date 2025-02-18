'use client'
import { useForm, SubmitHandler } from "react-hook-form"
import Link from 'next/link'
import '../../../css/shared/Footer/Footer.css'
import Image from 'next/image'
import logo from "../../../assets/logo.png"
import { useGetUniNavItemQuery } from '@/redux/endpoints/university/universityEndpoints';
import { usePostReviewMutation } from "@/redux/endpoints/review/reviewEndpoints"
import { toast } from "react-toastify"
import { useUserInfo } from "@/utils/useUserInfo"

type Inputs = {
  comment: string
}

const Footer = () => {
    const { data, isLoading } = useGetUniNavItemQuery()
    const [postReview , { isLoading: reviewLoading }] = usePostReviewMutation()
    const {
      register,
      handleSubmit,
      reset,
      formState: { errors },
    } = useForm<Inputs>()
    const user = useUserInfo()


    const onSubmit: SubmitHandler<Inputs> = async(data) => {
        try{
            const item = {
                email:user?.Uemail,
                comment:data?.comment,
            }
            const res = await postReview(item)
            if(res?.data?.data?.acknowledged){
                toast.success("You have commented!!")
                reset()
            }else{
                toast.error(res?.data?.message)
            }
        }catch(err){
            console.log(err)
        }
    }
    
    return (
            <footer className="pg-footer">
                <div className="pg-footer-content">
                    <div className="pg-footer-content-column">
                        <div className="pg-footer-logo">
                            <Link href="/"><Image className='nav-logo' src={logo} alt="Logo" /></Link>
                        </div>
                        <div className="pg-footer-menu">
                            <h2 className="pg-footer-menu-name">Get Started</h2>
                            <ul className="pg-footer-menu-list">
                                <li><Link href="#">Start</Link></li>
                                <li><Link href="/Centre">Centre</Link></li>
                                <li><Link href="/Subjects">Subjects</Link></li>
                            </ul>
                        </div>
                    </div>

                    <div className="pg-footer-content-column">
                        <div className="pg-footer-menu">
                            <ul className="pg-footer-menu-list">
                                <li><Link href="/Contact">Contact</Link></li>
                                <li><Link href="/Services">Services</Link></li>
                                <li><Link href="/Proceed">Proceed</Link></li>
                            </ul>
                        </div>
                    </div>

                    <div className="pg-footer-content-column">
                        <div className="pg-footer-menu">
                            <h2 className="pg-footer-menu-name">Quick Links</h2>
                            <ul className="pg-footer-menu-list">
                                {isLoading ? (
                                    <li>Loading...</li> // ✅ Fix for <ul> structure
                                ) : (
                                    <>
                                        {Array.isArray(data?.data) && data?.meta?.total ? (
                                            Array.from({ length: Math.ceil((data?.meta?.total || 0) / 4) }, (_, index) => (
                                                <li key={index} style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
                                                    {data.data.slice(4 * index, 4 * index + 4).map((uni: any, ind: number) => (
                                                        <Link key={ind} style={{ fontSize: "15px", fontWeight: "400" }} href={`/University/${uni?.country}`}>
                                                            {uni?.country}
                                                        </Link>
                                                    ))}
                                                </li>
                                            ))
                                        ) : (
                                            <li>Currently no data available</li>
                                        )}
                                    </>
                                )}
                            </ul>
                        </div>
                    </div>

                    <div className="pg-footer-content-column">
                        <div className="pg-footer-call-to-action">
                            <h2 className="pg-footer-call-to-action-title">Let&apos;s share</h2>
                            <p className="pg-footer-call-to-action-description">
                                your though about us!
                            </p>
                            <form style={{display:"flex",flexDirection:"column"}}  onSubmit={handleSubmit(onSubmit)}>
                              <textarea  {...register("comment", { required: true })}  style={{padding:"5px",margin:"10px 0",borderRadius:"4px",minHeight:"70px",maxWidth:"300px"}}/>
                              {reviewLoading ? <p>Loading...</p> : <input type='submit' style={{padding:"5px 20px",border:"none",width:"110px",objectFit:"contain",borderRadius:"4px"}} />}
                            </form>
                        </div>
                    </div>
                </div>

                <div className="pg-footer-copyright">
                    <p className="pg-footer-copyright-text">
                        ©2025. | Designed By: Md Mahfuz Anam Tasnim. | All rights reserved.
                    </p>
                </div>
            </footer>
    )
}

export default Footer
