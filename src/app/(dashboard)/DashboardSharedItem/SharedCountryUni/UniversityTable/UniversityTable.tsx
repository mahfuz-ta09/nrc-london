'use client'
import './css/UniversityTable.css'
import { toast } from 'react-toastify'
import { Suspense, useState } from 'react'
import SubjectListModal from './SubjectListModal'
import UniversityDetails from './UniversityDetails'
import AddUniModal from '../AddUniModal/AddUniModal'
import Loader from '@/component/shared/loader/loader'
import SubjectControllModal from './SubjectControllModal'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Pagination from '@/component/shared/Pagination/Pagination'
import { useGetAllCountryNameQuery } from '@/redux/endpoints/countryBaseUni/countryBaseUniversity'
import { faAdd, faArrowRight, faFilter, faList, faPen, faTrash } from '@fortawesome/free-solid-svg-icons'
import { useDeleteUniMutation, useGetUniversityListQuery } from '@/redux/endpoints/university/universityEndpoints'

type paraType = {
    para:{
        all?:string,
        country?:string,
        page?:number,
        total?:number,
        uniName?:string
    },
    setPara:any
}



const UniversityTable = ({ para , setPara }: paraType) => {
    const [isOpen,setIsOpen] = useState(false)
    const {data:country, isLoading: nameLoading}= useGetAllCountryNameQuery()
    const [deleteUni , { isLoading: deleteLoading }] = useDeleteUniMutation()
    const [addUni,setAddUni] = useState({action:'',id:'',isOPen: false,name:''})
    const [addSub,setAddSub] = useState({action:'',universityId:'',countryId:'',universityName:'',isOPen: false})
    const [uniDetails,setUniDetails] = useState({isOPen: false,name:'',data:null})
    const [listSubject,setListSubject] = useState({action:"",countryId:'',universityId:'',isOPen: false,name:''})
    const { data , isLoading } = useGetUniversityListQuery({
        all: para.all || "",
        country: para.country || "",
        page: para.page || 1,
        total: para.total || 10,
        uniName: para.uniName || ""
    })

    
    const handleDelete = async(id:string,uniId:string ) =>{
        try{
            if(!id && !uniId){
                toast.error("id missing!")
                return 
            }

            const isConfirmed = window.confirm(`Are you sure you want to delete"?`)
            if (!isConfirmed) return; 
            
            const res:any = await deleteUni({id:id,name:uniId}).unwrap()
            if(res?.data?.modifiedCount){
                toast.success("University deleted!")
            }else{
                toast.error(res?.err?.data ||'Failed to delete')
            }
        }catch(err:any){
            // console.log(err)
            toast.error("University containing subjects cant be deleted or something went wrong!")
        }
    }
    
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setPara({
            ...para,
            [e.target.name]: e.target.value
        });
    }
    
    const handlePageChange = (p: number) => {
        setPara({
            ...para,
            page : p
        })
    }
    

    return (
        (isLoading || nameLoading || deleteLoading) ? <Loader /> :(
        <div style={{}} className='university-table'>
            
            <button style={{margin:"20px 0"}} className="header-btn" onClick={() => setIsOpen(!isOpen)}><FontAwesomeIcon icon={faFilter}/></button>
            <div className={isOpen?"filter-container show":"filter-container"}>
                        <h4 className='filter-header-text'>University filter</h4>
                        <div className='filter-item'>
                            <label htmlFor="page">page</label>
                            <input
                                type="number"
                                name="page"
                                placeholder="Page"
                                value={para.page}
                                onChange={handleChange}
                                className='pagination-input'
                                min={0}
                            />
                        </div>
                        <div className='filter-item'>
                            <label htmlFor="page">Rows per page</label>
                            <input
                                type="number"
                                name="total"
                                placeholder="Rows per page"
                                value={para.total}
                                onChange={handleChange}
                                className='pagination-input'
                                min={0}
                            />
                        </div>
                        <div className='filter-item'>
                            <label htmlFor="page">university name</label>
                            <input
                                type="text"
                                name="uniName"
                                placeholder="university name"
                                value={para.uniName}
                                onChange={handleChange}
                                className='pagination-input'
                            />
                        </div>
            </div>
            <p className="total-reasult">total result: {data?.meta?.totalCount}</p>

            {(data?.meta?.totalCount || country?.meta?.total) && 
            <div className='all-btn-container'>
                <button className='all-btn'
                        style={{padding:"8px 12px"}}
                        onClick={() =>setPara((prev:any) => ({...prev,all: "all",country: "",page: 1,total: 10}))}
                        onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#eee")}
                        onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#f8f8f8")}
                    >all</button>
                {country?.data?.map((single: any) => (
                    <button
                        key={single?._id}
                        className='all-btn'
                        onClick={() =>
                            setPara((prev:any) => ({
                                ...prev,
                                all: "",
                                country: single._id,
                                page: 1,
                                total: 10
                            }))
                        }
                        onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#eee")}
                        onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#f8f8f8")}
                    >
                        <img 
                            style={{width:"20px",height:"20px",borderRadius:"50%"}}
                            src={single?.countryFlg?.url} alt="" 
                        />
                        {single?.country}
                    </button>
                ))}
            </div>}
            {data?.meta?.totalCount!==0 && 
            <div className='table-contant'>
                    <table id="">
                        <thead>
                            <tr>
                                <th>university id-name</th>
                                <th>country image</th>
                                <th>details - delete - edit</th>
                                <th>add - all subject</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data?.data?.map((uni:any,index:number)=>
                                <tr key={index} className=''>
                                    <td>
                                        {uni?.universityId}
                                        <br />
                                        {uni?.universityName}
                                    </td>
                                    <td><img className='table-img' src={uni?.universityImage?.url} /></td>
                                    
                                    <td>
                                        <div style={{display:"flex",height:"100%",gap:"30px"}}>
                                            <button className="action-btn" style={{background:"green"}} onClick={() => setUniDetails(prev => ({ ...prev , isOPen: true,data: uni, name:`${uni?.universityName}`}))}><FontAwesomeIcon icon={faArrowRight}/></button>
                                            <button className="action-btn" style={{background:"#f14040"}} onClick={()=> handleDelete(uni?.countryId,uni?.universityId)}><FontAwesomeIcon icon={faTrash}/></button>
                                            <button className="action-btn" style={{background:"green"}} onClick={()=> setAddUni(prev => ({ ...prev , isOPen: true, name:`${uni?.universityId}`, id:`${uni?.countryId}` , action: "edit"}))} ><FontAwesomeIcon icon={faPen}/></button>
                                        </div>
                                    </td>
                                    <td>
                                        <div style={{display:"flex",height:"100%",gap:"30px"}}>
                                            <button className="action-btn" style={{background:"green"}} onClick={() => setAddSub(prev => ({ ...prev ,universityName:uni?.universityName, isOPen: true,countryId: uni?.countryId, universityId:uni?.universityId, action: "add"}))}><FontAwesomeIcon icon={faAdd}/></button>
                                            <button className="action-btn" style={{background:"teal"}} onClick={() => setListSubject(prev => ({ ...prev ,countryId: uni?.countryId,universityId: uni?.universityId,isOPen: true, name:uni?.universityName, action: ""}))}><FontAwesomeIcon icon={faList}/></button>
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
            </div>}
            {/* {
                data?.meta?.totalPages && <Pagination 
                    totalPages={data?.meta?.totalPages}
                    currentPage={Number(para?.page) || 1}
                    onPageChange={handlePageChange}
                    siblingCount={1}/>
            } */}
            <Pagination 
                totalPages={data?.meta?.totalPages}
                currentPage={Number(para?.page) || 1}
                onPageChange={handlePageChange}
                siblingCount={1}/>

            <Suspense fallback={<Loader />}>
                <AddUniModal 
                    setAddUni={setAddUni}
                    addUni={addUni}
                />
                <SubjectControllModal
                    setAddSub={setAddSub}
                    addSub={addSub}
                />
                <SubjectListModal
                    setListSubject={setListSubject}
                    listSubject={listSubject}
                />
                <UniversityDetails
                    setUniDetails={setUniDetails}
                    uniDetails={uniDetails}
                />
            </Suspense>

        </div>    
    ))
}

export default UniversityTable