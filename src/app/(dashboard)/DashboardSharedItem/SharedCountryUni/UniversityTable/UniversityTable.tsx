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
    const {data:country, isLoading: nameLoading}= useGetAllCountryNameQuery()
    const [deleteUni , { isLoading: deleteLoading }] = useDeleteUniMutation()
    const [addUni,setAddUni] = useState({action:"",id:'',isOPen: false,name:''})
    const [addSub,setAddSub] = useState({action:"",id:'',isOPen: false,name:''})
    const [uniDetails,setUniDetails] = useState({isOPen: false,name:'',data:null})
    const [listSubject,setListSubject] = useState({action:"",id:'',isOPen: false,name:''})
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
            console.log("res.data ",res?.data)
            if(res?.data?.modifiedCount){
                toast.success("University deleted!")
            }else{
                toast.error(res?.err?.data ||'Failed to delete')
            }
        }catch(err:any){
            console.log(err)
            toast.error(err?.data|| "Something went wrong!")
        }
    }

    
    const handlePageChange = (p: number) => {
        setPara({
            ...para,
            page : p
        })
    }
    

    return (
        (isLoading || nameLoading || deleteLoading) ? <Loader /> :(
        <div className='university-table'>

            {(data?.meta?.totalCount || country?.meta?.total) && <div className='all-btn-container'>
                <button className='all-btn'
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
                        {single?.country}
                    </button>
                ))}
            </div>}


            {data?.meta?.totalCount!==0 && 
            <div className='table-contant'>
                    <table id="">
                        <thead>
                            <tr>
                                <th>university id</th>
                                <th>university name</th>
                                <th>country image</th>
                                <th>details/ delete university/ edit university</th>
                                <th>add subject/ all subject</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data?.data?.map((uni:any,index:number)=>
                                <tr key={index} className=''>
                                    <td>{uni?.universityId}</td>
                                    <td>{uni?.universityName}</td>
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
                                            <button className="action-btn" style={{background:"green"}} onClick={() => setAddSub(prev => ({ ...prev , isOPen: true,id: uni?.countryId, name:`${uni?.universityName}`, action: "add"}))}><FontAwesomeIcon icon={faAdd}/></button>
                                            <button className="action-btn" style={{background:"teal"}} onClick={() => setListSubject(prev => ({ ...prev ,id: uni?.countryId, isOPen: true, name:`${uni?.universityName}`, action: ""}))}><FontAwesomeIcon icon={faList}/></button>
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
            </div>}
            {
                data?.meta?.totalPages && <Pagination 
                    totalPages={data?.meta?.totalPages}
                    currentPage={Number(para?.page) || 1}
                    onPageChange={handlePageChange}
                    siblingCount={1}/>
            }

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