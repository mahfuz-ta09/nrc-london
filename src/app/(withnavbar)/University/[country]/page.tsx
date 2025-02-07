'use client'
import '@/css/Students/Subjects/Subjects.css'
import Footer from '@/component/shared/Footer/Footer'
import { useParams, useRouter } from 'next/navigation'
import { useGetAllUniByCountryQuery } from '@/redux/endpoints/university/universityEndpoints'

const page = () => {
    const { country } = useParams()
    const router = useRouter()
    const {data,isLoading} = useGetAllUniByCountryQuery(String(country))



    return (
        <div className='subjects-container'>
            <div className="subjects-banner">
                <div className="wdth subjects-banner-content">
                    <h1>{String(country)?.toUpperCase()}</h1>
                    <p>as study destination</p>
                </div>
            </div>
            <div className="subjects-content wdth">
                <div className="subject-card">
                   
                    {
                        isLoading ? <p>Loading...</p>: 
                        data?.data?.map((uni:any)=> 
                            <div key={uni?._id} className="single-subject">
                                <div className="subject-header">
                                    <p>{uni?.name}</p>
                                </div>
                                <div className="additional">
                                    <h4>Required Document:</h4>
                                    <h5>{uni?.requiredDocs}</h5>
                                    <div className="addition-data">
                                        <p className=''>Tuition fee:</p>
                                        <p className=''>{uni?.tuitionFee}</p>
                                    </div>
                                    <div className="addition-data">
                                        <p className=''>Duration[months]:</p>
                                        <p className=''>{uni?.duration}</p>
                                    </div>
                                    <div className="addition-data">
                                        <p className=''>Intakes:</p>
                                        <p className=''>{uni?.intakes}</p>
                                    </div>
                                    <div className="addition-data">
                                        <p className=''>Entry requirements</p>
                                        <p className=''>{uni?.entryRequirements}</p>
                                    </div>
                                    <div className="addition-data">
                                        <p className=''>Application fee:</p>
                                        <p className=''>{uni?.applicationFee}</p>
                                    </div>
                                </div>
                                <button onClick={()=>router.push('/Proceed')}className='apply-now'>apply now</button>
                            </div>
                            
                    )}
                </div>
            </div>


            <Footer />
        </div>
    )
}

export default page