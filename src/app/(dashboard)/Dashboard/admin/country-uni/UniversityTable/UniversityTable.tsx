import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './UniversityTable.css'
import { faAdd, faList, faPen, faTrash } from '@fortawesome/free-solid-svg-icons'
import { useGetUniversityListQuery } from '@/redux/endpoints/university/universityEndpoints'
import Loader from '@/component/shared/Loader/Loader'
import { useState } from 'react'
import { useGetAllCountryNameQuery } from '@/redux/endpoints/countryBaseUni/countryBaseUniversity'


type paraType = {
    all:string,
    country:string,
    page:string,
    total:string,
}

const UniversityTable = () => {
    const {data:country, isLoading: nameLoading}= useGetAllCountryNameQuery()
    const [para,setPara] = useState<paraType>({all:'all',country:'',page:'0',total:'0'})
    const { data , isLoading } = useGetUniversityListQuery({
        all: para.all || "all",
        country: para.country || "",
        page: para.page || "2",
        total: para.total || "1"
    })
    

    if(isLoading || nameLoading){
        return <Loader />
    }
    
    return (
        <div className='university-table'>
            <h1>University: {para?.country?para?.country:'all'} / total:{data?.data?.length}</h1>
            {
                country.data.map((single:any)=><button
                    onClick={() => setPara(prev => ({ ...prev, country: single?.country }))}
                    key={single._id}
                >
                    {single.country}
                </button>)
            }
            <div className='table-container'>
                <table id="customers">
                    <thead>
                        <tr>
                            <th>country</th>
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
                                <td>{uni.universityName}</td>
                                <td><img style={{width:"50px",height:"50px",borderRadius:"50%"}} src={uni.universityImage?.url} /></td>
                                <td>{uni.scholarship}</td>
                                <td>from:{uni.lowFee}/to:{uni.highFee}</td>
                                <td>{uni.initialDeposite}</td>
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
                                <td><button className='University-edit-btn'><FontAwesomeIcon icon={faAdd}/></button></td>
                                <td><button className='University-edit-btn'><FontAwesomeIcon icon={faList}/></button></td>
                                <td><button className='University-edit-btn'><FontAwesomeIcon icon={faTrash}/></button></td>
                                <td><button className='University-edit-btn'><FontAwesomeIcon icon={faPen}/></button></td>
                            </tr>
                        )}
                    </tbody>
                </table>

            </div>
        </div>
    )
}

export default UniversityTable