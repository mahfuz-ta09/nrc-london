'use client'
import { useGetBlogsQuery } from '@/redux/endpoints/blogs/blogsEndpoint'
import '../SharedCountryUni/UniversityTable/UniversityTable.css'

const BlogTable = () => {
    const { data , isLoading, isError, refetch } =  useGetBlogsQuery({ page: 1, limit: 10 })
    console.log(data)
    return (
        <div>
            
            {/* {data?.meta?.totalCount!==0 &&  */}
            
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
                            {/* {data?.data?.map((uni:any,index:number)=>
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
                                </tr> */}
                            {/* )} */}
                        </tbody>
                    </table>
            </div>
            {/* } */}
        </div>
    )
}

export default BlogTable
