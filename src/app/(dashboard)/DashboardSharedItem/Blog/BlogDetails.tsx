'use client'
import "../../../../css/blogs/slugDesign.css"
import Loader from "@/component/shared/loader/loader"
import { useGetSingleBlogBySlugQuery } from "@/redux/endpoints/blogs/blogsEndpoint"

type DetailType = {
    detail :{
        isOPen: boolean,
        slug : string,
    }
    setDetail: React.Dispatch<React.SetStateAction<any>>
}

const BlogDetails = ({detail , setDetail}:DetailType) => {
    const { data , isLoading: dataLoading } = useGetSingleBlogBySlugQuery({slug: detail?.slug})
    console.log(data?.data)
    return (
        dataLoading? <Loader /> :
        <div className={ detail.isOPen ? 'modal-container openmoda-container' : 'modal-container'}>
            <div id='modal-body-id' className='modal-body'>
                <h1 style={{color:"black"}}>Blog details by slug: {detail?.slug}</h1>
                <button
                    onClick={() => setDetail((prev:any) => ({ ...prev, slug: '', isOPen: false }))}
                    className="cancel-btn"
                >
                    X
                </button>
                    
            </div>
        <div className=".table-contant">
            <div style={{maxWidth:"300px"}} dangerouslySetInnerHTML={{__html: data?.data?.content?.body}}/>
        </div>
        </div>
    )
}

export default BlogDetails
