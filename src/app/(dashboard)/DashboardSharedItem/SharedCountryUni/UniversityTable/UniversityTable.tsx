'use client'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './UniversityTable.css'
import { faAdd, faFilter, faList, faPen, faTrash } from '@fortawesome/free-solid-svg-icons'
import { useDeleteUniMutation, useGetUniversityListQuery } from '@/redux/endpoints/university/universityEndpoints'
import Loader from '@/component/shared/Loader/Loader'
import { Suspense, useState } from 'react'
import { useGetAllCountryNameQuery } from '@/redux/endpoints/countryBaseUni/countryBaseUniversity'
import AddUniModal from '../AddUniModal/AddUniModal'
import { toast } from 'react-toastify'
import SubjectControllModal from './SubjectControllModal'
import SubjectListModal from './SubjectListModal'


type paraType = {
    all?:string,
    country?:string,
    page?:string,
    total?:string,
    uniName?:string
}

const UniversityTable = () => {
    const {data:country, isLoading: nameLoading}= useGetAllCountryNameQuery()
    const [deleteUni , { isLoading: deleteLoading }] = useDeleteUniMutation()
    const [addUni,setAddUni] = useState({action:"",id:'',isOPen: false,name:''})
    const [listSubject,setListSubject] = useState({action:"",id:'',isOPen: false,name:''})
    const [addSub,setAddSub] = useState({action:"",id:'',isOPen: false,name:''})
    const [para,setPara] = useState<paraType>({all:'',country:'',page:'1',total:'10',uniName:''})
    const { data , isLoading } = useGetUniversityListQuery({
        all: para.all || "",
        country: para.country || "",
        page: para.page || "1",
        total: para.total || "10",
        uniName: para.uniName || ""
    })
    const [isOpen,setIsOpen] = useState(false)

    if(isLoading || nameLoading || deleteLoading){
        return <Loader />
    }
    
    const handleDelete = async(id:string,uniName:string ) =>{
        try{
            if(!id && !uniName){
                toast.error("id missing!")
                return 
            }

            const isConfirmed = window.confirm(`Are you sure you want to delete "${uniName}"?`)
            if (!isConfirmed) return; 
            
            const res = await deleteUni({id:id,name:uniName})

            if(res?.data?.data?.modifiedCount){
                toast.success("University deleted!")
            }else{
                toast.error('Failed to delete')
            }
        }catch(err){
            console.log(err)
            toast.error("Something went wrong!")
        }
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setPara({
        ...para,
        [e.target.name]: e.target.value
        });
    }
    
    
    return (
        <div className='university-table'>
            {(data?.meta?.totalCount || country?.meta?.total) && <h1>university: {para?.country?para?.country:'all'} & total: {data?.meta?.totalCount}</h1>}
            
            {data?.meta?.totalCount!==0 && 
            
            <div className="filter-header-uni">
                <p>filter users</p>
                <button onClick={()=>setIsOpen(!isOpen)}><FontAwesomeIcon icon={faFilter}/></button>
                
                <div className={isOpen?"filter-container show":"filter-container"}>
                    <input
                        type="number"
                        name="page"
                        placeholder="Page"
                        value={para.page}
                        onChange={handleChange}
                        className='pagination-input'
                        min={0}
                    />
                    <input
                        type="number"
                        name="total"
                        placeholder="Rows per page"
                        value={para.total}
                        onChange={handleChange}
                        className='pagination-input'
                        min={0}
                    />
                    <input
                        type="text"
                        name="uniName"
                        placeholder="university name"
                        value={para.uniName}
                        onChange={handleChange}
                        className='pagination-input'
                    />
                </div>
            </div>}

            {(data?.meta?.totalCount || country?.meta?.total) && <div className='all-btn-container'>
                <button className='all-btn'
                        onClick={() =>setPara(prev => ({...prev,all: "all",country: "",page: "1",total: "10"}))}
                        onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#eee")}
                        onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#f8f8f8")}
                    >all</button>
                {country?.data?.map((single: any) => (
                    <button
                        key={single?._id}
                        className='all-btn'
                        onClick={() =>
                            setPara(prev => ({
                            ...prev,
                            all: "",
                            country: single.country,
                            page: "1",
                            total: "10"
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
            
            <div className='table-container-users'>
                    <table id="">
                        <thead>
                            <tr>
                                <th>university name</th>
                                <th>country image</th>
                                <th>schoolarship</th>
                                <th>tuition fee</th>
                                <th>initital deposite</th>
                                <th>required english</th>
                                <th>required qualification</th>
                                <th>details</th>
                                <th>add subject</th>
                                <th>all subject</th>
                                <th>delete university</th>
                                <th>edit university</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data?.data?.map((uni:any,index:number)=>
                                <tr key={index} className=''>
                                    <td>{uni?.universityName}</td>
                                    <td><img className='table-img' src={uni?.universityImage?.url} /></td>
                                    <td>{uni?.scholarship}</td>
                                    <td>from:{uni?.lowFee}/to:{uni?.highFee}</td>
                                    <td>{uni?.initialDeposite}</td>
                                    <td>
                                        {Object.entries(uni?.englishProf || {}).map(([key, value]) => (
                                            <h1 style={{fontSize:"15px",display:"inline-block",width:'100%'}}  key={key}>
                                                {key}: {String(value)}
                                            </h1>
                                        ))}
                                    </td>
                                    <td>
                                        {Object.entries(uni?.qualifications || {}).map(([key, value]) => (
                                            <h1 style={{fontSize:"15px",display:"inline-block",width:'100%'}} key={key}>
                                                {key}: {String(value)}
                                            </h1>
                                        ))}
                                    </td>
                                    <td>{uni?.aboutUni}</td>
                                    <td><button className="action-btn" style={{background:"green"}} onClick={() => setAddSub(prev => ({ ...prev , isOPen: true,id: uni?.countryId, name:`${uni?.universityName}`, action: "add"}))}><FontAwesomeIcon icon={faAdd}/></button></td>
                                    <td><button className="action-btn" style={{background:"teal"}} onClick={() => setListSubject(prev => ({ ...prev ,id: uni?.countryId, isOPen: true, name:`${uni?.universityName}`, action: ""}))}><FontAwesomeIcon icon={faList}/></button></td>
                                    <td><button className="action-btn" style={{background:"#f14040"}} onClick={()=> handleDelete(uni?.countryId,uni?.universityName)}><FontAwesomeIcon icon={faTrash}/></button></td>
                                    <td><button className="action-btn" style={{background:"green"}} onClick={()=> setAddUni(prev => ({ ...prev , isOPen: true, name:`${uni?.universityName}`, id:`${uni?.countryId}` , action: "edit"}))} ><FontAwesomeIcon icon={faPen}/></button></td>
                                </tr>
                            )}
                        </tbody>
                    </table>

            </div>}

            <Suspense fallback={<Loader />}>
                <AddUniModal 
                    setAddUni={setAddUni}
                    addUni={addUni}
                />
            </Suspense>

            <Suspense fallback={<Loader />}>
                <SubjectControllModal
                    setAddSub={setAddSub}
                    addSub={addSub}
                />
            </Suspense>

            <Suspense fallback={<Loader />}>
                <SubjectListModal
                    setListSubject={setListSubject}
                    listSubject={listSubject}
                />
            </Suspense>

        </div>
    )
}

export default UniversityTable