'use client'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './UniversityTable.css'
import { faAdd, faList, faPen, faTrash } from '@fortawesome/free-solid-svg-icons'
import { useDeleteUniMutation, useGetUniversityListQuery } from '@/redux/endpoints/university/universityEndpoints'
import Loader from '@/component/shared/Loader/Loader'
import { Suspense, useState } from 'react'
import { useGetAllCountryNameQuery } from '@/redux/endpoints/countryBaseUni/countryBaseUniversity'
import AddUniModal from '../AddUniModal/AddUniModal'
import { toast } from 'react-toastify'


type paraType = {
    all:string,
    country:string,
    page:string,
    total:string,
}

const UniversityTable = () => {
    const {data:country, isLoading: nameLoading}= useGetAllCountryNameQuery()
    const [deleteUni , { isLoading: deleteLoading }] = useDeleteUniMutation()
    const [addUni,setAddUni] = useState({action:"",id:'',isOPen: false,name:''})
    const [para,setPara] = useState<paraType>({all:'',country:'',page:'1',total:'10'})
    const { data , isLoading } = useGetUniversityListQuery({
        all: para.all || "",
        country: para.country || "",
        page: para.page || "1",
        total: para.total || "10"
    })
    

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
    

    return (
        <div className='university-table'>
            <h1>University: {para?.country?para?.country:'all'} / total:{data?.meta?.totalCount}</h1>
            {
                country?.data?.map((single:any)=><button
                    onClick={() => setPara(prev => ({ ...prev, all: '', country: single.country, page: '1', total: '10' }))}
                    key={single?._id}
                >
                    {single?.country}
                </button>)
            }
            <div className='table-container'>
                <table id="customers">
                    <thead>
                        <tr>
                            <th>university name</th>
                            <th>country image</th>
                            <th>schoolarship</th>
                            <th>tuition fee</th>
                            <th>initital deposite</th>
                            <th>required english</th>
                            <th>required qualification</th>
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
                                <td><img style={{width:"50px",height:"50px",borderRadius:"50%"}} src={uni?.universityImage?.url} /></td>
                                <td>{uni?.scholarship}</td>
                                <td>from:{uni?.lowFee}/to:{uni?.highFee}</td>
                                <td>{uni?.initialDeposite}</td>
                                <td>
                                    {Object.entries(uni?.englishProf || {}).map(([key, value]) => (
                                        <div style={{display:'block',width:'100%'}}  key={key}>
                                            {key}: {String(value)}
                                        </div>
                                    ))}
                                </td>
                                <td>
                                    {Object.entries(uni?.qualifications || {}).map(([key, value]) => (
                                        <div style={{display:'block',width:'100%'}} key={key}>
                                        {key}: {String(value)}
                                        </div>
                                    ))}
                                </td>
                                <td><button style={{background:"green"}}  className='University-edit-btn'><FontAwesomeIcon icon={faAdd}/></button></td>
                                <td><button style={{background:"teal"}}  className='University-edit-btn'><FontAwesomeIcon icon={faList}/></button></td>
                                <td><button style={{background:"red"}} onClick={()=>handleDelete(uni?.countryId,uni?.universityName)} className='University-edit-btn'><FontAwesomeIcon icon={faTrash}/></button></td>
                                <td><button style={{background:"green"}}  onClick={() => setAddUni(prev => ({ ...prev , isOPen: true, name:`${uni?.universityName}`, id:`${uni?.countryId}` , action: "edit"}))} className='University-edit-btn'><FontAwesomeIcon icon={faPen}/></button></td>
                            </tr>
                        )}
                    </tbody>
                </table>

            </div>
            <Suspense fallback={<Loader />}>
                <AddUniModal 
                    setAddUni={setAddUni}
                    addUni={addUni}
                />
            </Suspense>
        </div>
    )
}

export default UniversityTable