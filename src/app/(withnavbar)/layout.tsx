import Navbar from "@/component/shared/navbar/Navbar"


const layout = ({ children } : {children : React.ReactNode} ) => {
    return (
      <div>
        <Navbar />
          {children}
      </div>
    )
  }
  
  export default layout