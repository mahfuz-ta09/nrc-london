'use client'
import { useState } from 'react'
import { toast } from 'react-toastify'
import '@/css/Dashboard/admin/university.css'
import '@/css/Dashboard/admin/process-req.css'
import Loader from '@/component/shared/loader/loader'
import { faAngleDoubleRight, faCancel } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useDeleteProcessReqMutation, useGetALlProcessReqQuery } from '@/redux/endpoints/studentfileprocess/proceedEndpoints'



const page = () => {
    const [ open,setOpen ] = useState(false)
    const [ number,setNumber ] = useState(0)
    // const [ uniId,setUniId ] = useState("")
    const { data , isLoading : dataLoading } = useGetALlProcessReqQuery()
    const [ deleteSubject , { isLoading : deleteLoading }] = useDeleteProcessReqMutation()


    const handleDelete= async(id:string) =>  {
        try{
            const res = await deleteSubject(id)
            if(res?.data?.data?.deletedCount){
                toast.success("Deletion successful!!")
            }else{
                toast.error("Deletion failed!!")
            }
        }catch(err){
            console.log(err)
        }
    }
    

    return (
      <div className='university-content'>
        <div className="header">
          <h1>Process request: (Total available data: {data?.meta?.total})</h1>
          <form action="" className='search-form'>
            <input className='search-form-input' type="text" placeholder='search' />
            <input className='search-form-search' type="submit" value="search"/>
          </form>
        </div>

        {
            (dataLoading || deleteLoading) ?
            <Loader /> :
            <div className="table-container">
                <table className="table">
                    <thead className="thead">
                        <tr className="tr">
                            <th className="th">Serial</th>
                            <th className="th">Id</th>
                            <th className="th">Name</th>
                            <th className="th">Email</th>
                            <th className="th">Possible Destination</th>
                            <th className="th">Point</th>
                            <th className="th">Updated</th>
                            <th className="th">Status</th>
                            <th className="th">Change Status</th>
                            <th className="th">Details</th>
                            {/* <th className="th">Delete</th> */}
                        </tr>
                    </thead>
                    <tbody className="tbody">
                    {
                        data?.data?.map((person:any,index:number)=>(
                            <tr key={person?._id} className="tr">
                                <td className="td" data-label="Serial">{index+1}</td>
                                <td className="td" data-label="Subject Name">{person?._id}</td>
                                <td className="td" data-label="Subject Name">{person?.name}</td>
                                <td className="td" data-label="Email">{person?.email}</td>
                                <td className="td" data-label="Possible Destination">{person?.prefered_country}</td>
                                <td className="td" data-label="Possible Destination">{person?.en_proficiency}</td>
                                <td className="td" data-label="updated">{person?.updated}</td>
                                <td className="td" data-label="updated">{person?.condition}</td>
                                <td className="td" data-label="updated">
                                    <select name="" id="">
                                        <option value="initial">initial</option>
                                        <option value="applied">applied</option>
                                        <option value="document_collection">document_collection</option>
                                        <option value="document_collection">document_collection</option>
                                        <option value="document_collection">document_collection</option>
                                    </select>
                                </td>
                                <td className="td" data-label="details"><FontAwesomeIcon onClick={()=>{setOpen(!open);setNumber(index)}} icon={faAngleDoubleRight}/></td>
                                {/* <td className="td" data-label="Delete"><FontAwesomeIcon onClick={()=>handleDelete(person?._id)} icon={faCancel}/></td> */}
                            </tr>
                        ))
                    }
                    </tbody>
                </table>
            </div>
        }


        <div className={open? "mod-open" : "modal"}>
            <button onClick={()=>setOpen(!open)} className='mod-close'>Close</button>
            <div className="form-container">

                <div className="section">
                    <div className="section-title">STUDENT DETAILS</div>
                    
                    <table className="dynamic-data">
                        <tbody>
                            <tr>
                                <td>Name:</td>
                                <td>{data?.data[number]?.name}</td>
                            </tr>
                            <tr>
                                <td>Country:</td>
                                <td>{data?.data[number]?.country_name}</td>
                            </tr>
                            <tr>
                                <td>Email:</td>
                                <td>{data?.data[number]?.email}</td>
                            </tr>
                            <tr>
                                <td>Number:</td>
                                <td>{data?.data[number]?.mobile_number}</td>
                            </tr>
                            <tr>
                                <td>Emergency Number:</td>
                                <td>{data?.data[number]?.emergency_number}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <div className="section">
                    <div className="section-title">EDUCATIONAL QUALIFICATION</div>
                    <table>
                        <thead>
                            <tr>
                                <th>DEGREE</th>
                                <th>RESULT</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>SSC</td>
                                <td><a style={{color:"white"}} href={data?.data[number]?.ssc_result?.url} target='_blank'>go</a></td>
                            </tr>
                            <tr>
                                <td>HSC</td>
                                <td><a style={{color:"white"}} href={data?.data[number]?.hsc_result?.url} target='_blank'>go</a></td>
                            </tr>
                            <tr>
                                <td>Bachelor</td>
                                <td><a style={{color:"white"}} href={data?.data[number]?.bachelor_result?.url} target='_blank'>go</a></td>
                            </tr>
                            <tr>
                                <td>OTHER</td>
                                <td><a style={{color:"white"}} href={data?.data[number]?.other_result?.url} target='_blank'>go</a></td>
                            </tr>
                        </tbody>
                    </table>
                </div>


                <div className="section">
                    <div className="section-title">ENGLISH PROFICIENCY-(test taken: {data?.data[number]?.exam_taken_time})</div>
                    <table>
                        <thead>
                            <tr>
                                <th>Test Name</th>
                                <th>Certificate</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>{data?.data[number]?.en_proficiency}</td>
                                <td><a style={{color:"white"}} href={data?.data[number]?.en_result?.url} target='_blank'>go</a></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                

                <div className="section">
                    <div className="section-title">HOW DO YOU KNOW ABOUT US: {data?.data[number]?.referral}</div>
                </div>

                <div className="columns">
                    <div>
                        REFUSAL COUNTRY: {data?.data[number]?.refused!=="no" ? data?.data[number]?.country_name : "None"}
                    </div>
                    <div>
                        <div className="section-title">PREFERED COUNTRY: {data?.data[number]?.prefered_country}</div>
                    </div>
                </div>

                <div className="address">
                    101 Whitechapel Road, London,<br/>
                    E17RA, London Borough of Hackney,<br/>
                    United Kingdom<br/>
                    COUNSELLOR SIGNATURE
                </div>
            </div>
        </div>
      </div>
    )
}

export default page