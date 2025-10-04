'use client'
import { toast } from 'react-toastify'
import { Suspense, useState } from 'react'
import '@/css/Dashboard/super_admin/common.css'
import Loader from '@/component/shared/loader/loader'
import '../SharedCountryUni/UniversityTable/UniversityTable.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Pagination from '@/component/shared/Pagination/Pagination'
import { faPen, faTrash } from '@fortawesome/free-solid-svg-icons'
import AffiliatedUniActionModal from './AffiliatedUniActionModal'
import { useDeleteAffiliatedUniMutation, useGetAllAffiliatedUniQuery } from '@/redux/endpoints/affiliatedUni/affiliatedUni'


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

const AffiliatedUniTable = ({ params , setParams }: Props) => {
    const [modalState,setModalState] = useState({ isOpen: false , action:'Add' , id:''})
    const [detail,setDetail] = useState({
        isOPen: false,
        slug: '',
    })

    const [deleteAffiliatedUni , { isLoading: deleteLoading }] = useDeleteAffiliatedUniMutation()
    const { data, isLoading } =  useGetAllAffiliatedUniQuery({ 
        page: params?.page, 
        limit: params?.limit , 
        category: params?.category, 
        status: params?.status, 
        isFeatured: params?.isFeatured
    })
    
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
            const res = await deleteAffiliatedUni({ id })
            console.log(res)
            if(res?.data?.data?.deletedCount){
                toast.success("Affiliated university deleted successfully")
            }else{
                toast.error("something went wrong")
            }
        } catch (error) {
            toast.error("Failed to delete blog")
        }
    }

    
    return ((
        (isLoading || deleteLoading ) ? <Loader />:
        <div style={ data?.meta?.totalCount!==0? {display:"block"} : {display:"none"}}>
            
            <div className='table-contant'>
                <table>
                    <thead>
                        <tr>
                            <th>Serial</th>
                            <th>image</th>
                            <th>logo</th>
                            <th>name</th>
                            <th>description</th>
                            <th>meta title</th>
                            <th>meta description</th>
                            <th>meta keywords</th>
                            <th>location</th>
                            <th>status</th>
                            <th>slug</th>
                            <th>created</th>
                            <th>actions</th>
                        </tr>
                    </thead>
                    <tbody>
                    {
                        data?.data?.map((blog:any,index:number)=>
                            <tr key={index} className=''>
                                <td>{index+1}</td>
                                <td><img className='table-img'src={blog?.header_image?.url || 'safas'} alt='Blog header iage'/></td>
                                <td><img className='table-img'src={blog?.logo?.url || 'safas'} alt='Blog header iage'/></td>
                                <td> 
                                    <h4>{blog?.name}</h4>
                                </td>
                                <td style={{minWidth:"300px",textAlign:'justify'}}> 
                                    <h4>{blog?.description}</h4>
                                </td>
                                <td>
                                    {blog?.meta_title}
                                </td>
                                <td style={{minWidth:"300px",textAlign:'justify'}}>
                                    {blog?.meta_description}
                                </td>
                                <td>
                                    {blog?.meta_keywords}
                                </td>
                                <td>{blog?.location || ''}</td>
                                <td>{blog?.status || ''}</td>
                                <td>{blog?.slug || ''}</td>
                                <td>{blog?.creationHistory?.date || ''}</td>
                                <td>
                                    {/* <button onClick={()=>setDetail({...detail,isOPen: true, slug:blog?.slug})}className="action-btn" style={{margin:'5px',background:"green"}} ><FontAwesomeIcon icon={faEye}/></button> */}
                                    <button onClick={()=>handleDelete(blog?._id)} className="action-btn" style={{margin:'5px',background:"#f14040"}} ><FontAwesomeIcon icon={faTrash}/></button>
                                    <button onClick={()=>setModalState({isOpen: true , action:"Edit" , id:blog?._id})} className="action-btn" style={{margin:'5px',background:"green"}} ><FontAwesomeIcon icon={faPen}/></button>
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

            <div></div>

            {/* <Suspense fallback={<Loader />}>
                <AffiliatedUniDetails 
                    detail={detail}
                    setDetail={setDetail}
                />
            </Suspense> */}
            <Suspense fallback={<Loader />}>
                <AffiliatedUniActionModal
                    modalState={modalState}
                    setModalState={setModalState}
                />
            </Suspense>
        </div>
    ))
}

export default AffiliatedUniTable

