'use client'
import { useState } from 'react'
import { toast } from 'react-toastify'
import '@/css/Dashboard/super_admin/common.css'
import Loader from '@/component/shared/Loader/Loader'
import '../SharedCountryUni/UniversityTable/UniversityTable.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Pagination from '@/component/shared/Pagination/Pagination'
import { faEye, faFilter, faPen, faTrash } from '@fortawesome/free-solid-svg-icons'
import { useDeleteBlogMutation, useGetBlogsQuery } from '@/redux/endpoints/blogs/blogsEndpoint'

const BlogTable = () => {
    const [open,setOpen] = useState(false)
    const [params,setParams] =  useState({ page: 1, limit: 10 , category: "", status: "", isFeatured: undefined})
    const [deleteBlog , { isLoading: deleteLoading }] = useDeleteBlogMutation()
    const { data, isLoading } =  useGetBlogsQuery({ page: params?.page, limit: params?.limit , category: params?.category, status: params?.status, isFeatured: params?.isFeatured})
    
    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target

        setParams(prev => {
            let newValue: any = value

            if (name === "page" || name === "limit") {
                newValue = Number(value)
                } else if (name === "isFeatured") {
                newValue = value === "true" ? true : value === "false" ? false : undefined
                }

                return {
                ...prev,
                [name]: newValue,
            }
        })
    }
    
    const handlePageChange = (newPage: number) => {
        setParams(prev => ({
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
            
            <div className="filter-header">
                <button onClick={()=>setOpen(!open)}><FontAwesomeIcon icon={faFilter}/></button>
                <div className={open?"filter-container show":"filter-container"}>
                    <input placeholder='Enter Page' type="number" name="page" onChange={handleOnChange}/>
                    <input placeholder='Enter Limit per page' type="number" name="limit" onChange={handleOnChange}/>
                    <input placeholder='Enter Category' type="text" name="category" onChange={handleOnChange}/>
                    <select onChange={handleOnChange} name="status" id="">
                        <option>Select status</option>
                        <option value="published">Published</option>
                        <option value="draft">Draft</option>
                    </select>
                    <select onChange={handleOnChange} name="isFeatured" id="">
                        <option>Is featured</option>
                        <option value="true">yes</option>
                        <option value="false">no</option>
                    </select>
                </div>
            </div>

            <div className='table-container-users'>
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
                                    <button className="action-btn" style={{margin:'5px',background:"green"}} ><FontAwesomeIcon icon={faEye}/></button>
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
        </div>
    ))
}

export default BlogTable

