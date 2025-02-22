'use client'
import Footer from '@/component/shared/Footer/Footer'
import Loader from '@/component/shared/Loader/Loader'
import '@/css/Students/Subjects/Subjects.css'
import { useGetSubjectQuery } from '@/redux/endpoints/subject/subjectEndpoints'
import { faCancel, faDollar, faDotCircle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useRouter } from 'next/navigation'


const Page = () => {
    const { data , isLoading : dataLoading } = useGetSubjectQuery()
    const router = useRouter()


    return (
        <div className='subjects-container'>
            <div className="subjects-banner">
                <div className="wdth subjects-banner-content">
                    <h1>Subjects</h1>
                    <p>Choose your dream course</p>
                </div>
            </div>
            
            <div className="subjects-content wdth">
                <div className="subject-card">
                    {
                        dataLoading ?
                        <Loader /> :
                            data?.data?.map((sub:any) =>
                            <div key={sub?._id} style={{height:"auto"}} className="single-subject">
                                <div className="subject-header">
                                    <p style={{"whiteSpace": "pre-wrap"}}>{sub?.name}</p>
                                </div>
                                <div className="additional">
                                    <h4>Your possible destination:</h4>
                                    <h5  style={{"whiteSpace": "pre-wrap"}}>{sub?.destination}</h5>
                                    <div className="addition-data">
                                        <p className=''>Tuition fee:</p>
                                        <p className=''>{sub?.tuitionFee} </p>
                                    </div>
                                    <div className="addition-data">
                                        <p className=''>Application fee:</p>
                                        <p className=''>{sub?.applicationFee}</p>
                                    </div>
                                    <div className="addition-data">
                                        <p className=''>Required Doc:</p>
                                        <p className=''>{sub?.requiredDocs}</p>
                                    </div>
                                    <div className="addition-data">
                                        <p className=''>Duration[months]:</p>
                                        <p className=''>{sub?.duration}</p>
                                    </div>
                                    <div className="addition-data">
                                        <p className=''>Intakes:</p>
                                        <p className=''>{sub?.intakes}</p>
                                    </div>
                                    <div className="addition-data">
                                        <p className=''>Entry requirements</p>
                                        <p className=''>{sub?.entryRequirements}</p>
                                    </div>
                                    <div className="addition-data">
                                        <p className=''>Entry requirements</p>
                                        <p className=''>{sub?.applicationDeadlines}</p>
                                    </div>
                                </div>
                                <button onClick={()=>router.push('/Proceed')}className='apply-now'>apply now</button>
                            </div>
                        )
                    }
                </div>
                <div className="navigation">
                    <button><FontAwesomeIcon icon={faDotCircle}/></button>
                    <button><FontAwesomeIcon icon={faDotCircle}/></button>
                    <button><FontAwesomeIcon icon={faDotCircle}/></button>
                    <button><FontAwesomeIcon icon={faDotCircle}/></button>
                    <button><FontAwesomeIcon icon={faDotCircle}/></button>
                    <button><FontAwesomeIcon icon={faDotCircle}/></button>
                    <button><FontAwesomeIcon icon={faDotCircle}/></button>
                    <button><FontAwesomeIcon icon={faDotCircle}/></button>
                </div>
            </div>


            <Footer />
        </div>
    )
}

export default Page