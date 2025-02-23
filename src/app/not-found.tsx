import Link from 'next/link'
import '@/css/Redirect/Redirect.css'
 

export default function NotFound() {
  return (
    <div className='redirect-page' style={{color:"white",gap:"20px"}}>
      <h2>Error!</h2>
      <p>Could not find requested resource</p>
      <Link style={{color:"white"}} href="/">Return Home</Link>
    </div>
  )
}