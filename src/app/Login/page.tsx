'use client'
import Link from 'next/link'
import '@/css/Login/Login.css'
import { useRouter } from 'next/navigation'


const LoginPage = () => {
    const router = useRouter()


    return (
            <div className="login-container">
            <div className="login-content">
                <div className="login-content-item">
                    <h1 className="">Log in</h1>
                    <p className="">Log in to your account to access your content</p>
                    <form className="input-container">
                        <input type='email'placeholder="enter your email" className=""/>
                        <input type='password'   placeholder="enter your password" className=""/>
                        <div className="form-link">
                            <Link className='forgot-link' href="">forgot password?</Link>
                            <button type="submit" className="">login</button>
                        </div>
                    </form>
                    <h2 className="link-header">or login with</h2>
                    <div className="social-login">
                        <button className="">google</button>
                        <button onClick={()=>router.push('/')}>home?</button>
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