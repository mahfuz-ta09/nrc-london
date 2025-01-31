'use client'
import Link from "next/link"
import '@/css/Login/Login.css'


const SignUpPage = () => {


    return (
        <div className="login-container">
            <div className="login-content">
                <div className="login-content-item">
                    <h1 className="">Sign up</h1>
                    <p className="">Signup to open the horizon</p>
                    <form className="input-container">
                        <input type='text' placeholder="enter your name" className=""/>
                        <input type='email' placeholder="enter your email" className=""/>
                        <input type='password' placeholder="enter your password" className=""/>
                        <div className="form-link">
                            <button >signup</button>
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