'use client'
import { useGetBlogsQuery } from '@/redux/endpoints/blogs/blogsEndpoint'
import '../SharedCountryUni/UniversityTable/UniversityTable.css'
import { faAdd, faEye, faPen, faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useState } from 'react'
import Loader from '@/component/shared/Loader/Loader'
import Pagination from '@/component/shared/Pagination/Pagination'

const BlogTable = () => {
    const [params,setParams] =  useState({ page: 1, limit: 10 , category: "", status: "", isFeatured: undefined})
    const { data, isLoading, isError, refetch } =  useGetBlogsQuery({ page: params?.page, limit: params?.limit , category: params?.category, status: params?.status, isFeatured: params?.isFeatured})
    
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
console.log(data?.meta)
    return ((
        (isLoading) ? <Loader />:
        <div style={ data?.meta?.totalCount!==0? {display:"block"} : {display:"none"}}>
            
            <div className="params-controlls">
                <input type="number" name="page" onChange={handleOnChange}/>
                <input type="number" name="limit" onChange={handleOnChange}/>
                <input type="text" name="category" onChange={handleOnChange}/>
                <select onChange={handleOnChange} name="status" id="">
                    <option value="">Select status</option>
                    <option value="published">Published</option>
                    <option value="draft">Draft</option>
                </select>
                <select onChange={handleOnChange} name="isFeatured" id="">
                    <option value="">Select status</option>
                    <option value="true">yes</option>
                    <option value="false">no</option>
                </select>
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
                                            {JSON.parse(blog?.categories)?.join(', ') || ''}
                                        </td>
                                        <td>{blog?.status || ''}</td>
                                        <td>{JSON.parse(blog?.isFeatured)? 'Yes' : 'No'}</td>
                                        <td>{blog?.slug || ''}</td>
                                        <td>
                                            <button className="action-btn" style={{margin:'5px',background:"green"}} ><FontAwesomeIcon icon={faEye}/></button>
                                            <button className="action-btn" style={{margin:'5px',background:"#f14040"}} ><FontAwesomeIcon icon={faTrash}/></button>
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

