'use client'
import { Suspense, useState } from 'react'
import { toast } from 'react-toastify'
import '@/css/Dashboard/super_admin/common.css'
import Loader from '@/component/shared/Loader/Loader'
import '../SharedCountryUni/UniversityTable/UniversityTable.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Pagination from '@/component/shared/Pagination/Pagination'
import { faEye, faFilter, faPen, faTrash } from '@fortawesome/free-solid-svg-icons'
import { useDeleteBlogMutation, useGetBlogsQuery } from '@/redux/endpoints/blogs/blogsEndpoint'
import BlogDetails from './BlogDetails'


type Props = {
    params: {
        page: number,
        limit: number,
        category: string,
        status: string,
        isFeatured: boolean | undefined
    },
    setParams: any
}

const BlogTable = ({ params , setParams }: Props) => {
    const [detail,setDetail] = useState({
        isOPen: false,
        slug: '',
    })

    const [deleteBlog , { isLoading: deleteLoading }] = useDeleteBlogMutation()
    const { data, isLoading } =  useGetBlogsQuery({ 
        page: params?.page, 
        limit: params?.limit , 
        category: params?.category, 
        status: params?.status, 
        isFeatured: params?.isFeatured})
    
    
    const handlePageChange = (newPage: number) => {
        setParams((prev:any) => ({
            ...prev,
            page: newPage,
        }))
    }

    const handleDelete = async(id: string) => {
        try {
            const rep = window.confirm("Are you sure you want to delete this blog?")
            if(!rep) return;
            const res = await deleteBlog({ id }).unwrap()
            toast.success("Blog deleted successfully")
        } catch (error) {
            toast.error("Failed to delete blog")
        }
    }
    
    return ((
        (isLoading || deleteLoading ) ? <Loader />:
        <div style={ data?.meta?.totalCount!==0? {display:"block"} : {display:"none"}}>
            <div className='table-contant'>
                <table id="">
                    <thead>
                        <tr>
                            <th>Serial</th>
                            <th>Blog image</th>
                            <th>title&author</th>
                            <th>categories</th>
                            <th>status</th>
                            <th>Featured</th>
                            <th>slug</th>
                            <th>actions</th>
                        </tr>
                    </thead>
                    <tbody>
                    {
                        data?.data?.map((blog:any,index:number)=>
                            <tr key={index} className=''>
                                <td>{index+1}</td>
                                <td><img className='table-img'src={blog?.meta?.ogImage?.url || 'safas'} alt='Blog header iage'/></td>
                                <td> 
                                    <h4 style={{marginBottom:"10px"}} >{blog?.title}</h4>
                                    <br />
                                    <span style={{fontSize:"14px",color:"gray"}}>by: {blog?.author || 'N/A'}</span>
                                    <span style={{fontSize:"14px",color:"gray",marginLeft:'15px'}}>by: {blog?.author || 'N/A'}</span>
                                
                                </td>
                                <td>
                                    {blog?.categories?.join(', ') || ''}
                                </td>
                                <td>{blog?.status || ''}</td>
                                <td>{blog?.isFeatured? 'Yes' : 'No'}</td>
                                <td>{blog?.slug || ''}</td>
                                <td>
                                    <button onClick={()=>setDetail({...detail,isOPen: true, slug:blog?.slug})}className="action-btn" style={{margin:'5px',background:"green"}} ><FontAwesomeIcon icon={faEye}/></button>
                                    <button onClick={()=>handleDelete(blog?._id)} className="action-btn" style={{margin:'5px',background:"#f14040"}} ><FontAwesomeIcon icon={faTrash}/></button>
                                    <button className="action-btn" style={{margin:'5px',background:"green"}} ><FontAwesomeIcon icon={faPen}/></button>
                                </td>
                            </tr>
                        )
                    }
                    </tbody>
                </table>
            </div>
            <Pagination 
                totalPages={data?.meta?.totalPages || 1}
                currentPage={Number(params?.page) || 1}
                onPageChange={handlePageChange}
                siblingCount={1}
            />
            <Suspense fallback={<Loader />}>
                <BlogDetails 
                    detail={detail}
                    setDetail={setDetail}/>
            </Suspense>
        </div>
    ))
}

export default BlogTable

