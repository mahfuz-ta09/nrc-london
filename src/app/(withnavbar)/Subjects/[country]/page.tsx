'use client'
import Footer from '@/component/shared/Footer/Footer'
import Loader from '@/component/shared/Loader/Loader'
import '@/css/Students/Subjects/Subjects.css'
import { useGetAllSubByCountryQuery } from '@/redux/endpoints/subject/subjectEndpoints'
import { faDotCircle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useParams, useRouter } from 'next/navigation'


const Page = () => {
    const { country } = useParams()
    const router = useRouter()
    const { data , isLoading : dataLoading }= useGetAllSubByCountryQuery(String(country))


    return (
        <div className='subjects-container'>
            <div className="subjects-banner">
                <div className="wdth subjects-banner-content">
                    <p>Choose your dream course in</p>
                    <h1>{country}</h1>
                </div>
            </div>
            
            <div className="subjects-content wdth">
                <div className="subject-card">
                    {
                        dataLoading ?
                        <Loader /> :
                            data?.data?.map((sub:any) =>
                            <div key={sub?._id} className="single-subject">
                                <div className="subject-header">
                                    <p style={{"whiteSpace": "pre-wrap"}}>{sub?.name}</p>
                                </div>
                                <div className="additional">
                                    <h5  style={{"whiteSpace": "pre-wrap"}}>{sub?.details}</h5>
                                    <div className="addition-data">
                                        <p className=''>Tuition fee:</p>
                                        <p className=''>{sub?.tuitionFee} </p>
                                    </div>
                                    <div className="addition-data">
                                        <p className=''>Destination:</p>
                                        <p className=''>{sub?.country}</p>
                                    </div>
                                    <div className="addition-data">
                                        <p className=''>English test:</p>
                                        <p className=''>{sub?.engTest}</p>
                                    </div>
                                    <div className="addition-data">
                                        <p className=''>Duration:</p>
                                        <p className=''>{sub?.duration}</p>
                                    </div>
                                    <div className="addition-data">
                                        <p className=''>Entry requirements</p>
                                        <p className=''>{sub?.entryRequ}</p>
                                    </div>
                                </div>
                                <button onClick={()=>router.push('/Proceed')}className='apply-now'>apply now</button>
                            </div>
                        )
                    }
                </div>
                {/* <div className="navigation">
                    <button><FontAwesomeIcon icon={faDotCircle}/></button>
                    <button><FontAwesomeIcon icon={faDotCircle}/></button>
                    <button><FontAwesomeIcon icon={faDotCircle}/></button>
                    <button><FontAwesomeIcon icon={faDotCircle}/></button>
                    <button><FontAwesomeIcon icon={faDotCircle}/></button>
                    <button><FontAwesomeIcon icon={faDotCircle}/></button>
                    <button><FontAwesomeIcon icon={faDotCircle}/></button>
                    <button><FontAwesomeIcon icon={faDotCircle}/></button>
                </div> */}
            </div>


            <Footer />
        </div>
    )
}

export default Page