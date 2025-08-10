import '@/css/shared/Loader/Loader.css'


const Loader = () => {
  return (
    <div className='loader-container'>
      <div className="spinner"></div>
      <h1 style={{color:"white"}}>Loading...</h1>
    </div>
  )
}

export default Loader