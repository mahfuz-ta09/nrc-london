import Loader from "@/component/shared/loader/loader"
import { Suspense } from "react"
import Details from "./Details"


const page = () => {
    return (
      <div>
          <Suspense fallback={<Loader/>}>
            <Details />
          </Suspense>
      </div>
    )
}

export default page
