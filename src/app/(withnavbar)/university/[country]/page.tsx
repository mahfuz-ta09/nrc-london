'use client'
import '@/css/Students/Subjects/Subjects.css'
import Footer from '@/component/shared/footer/Footer'
import { useParams, useRouter } from 'next/navigation'
import { useGetAllUniByCountryQuery } from '@/redux/endpoints/university/universityEndpoints'
import Loader from '@/component/shared/loader/loader'

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
                        isLoading ? <Loader />: 
                        data?.data?.map((uni:any)=> 
                            <div style={{height:"560px"}} key={uni?._id} className="single-subject">
                                <div className="subject-header">
                                    <p>{uni?.name}</p>
                                </div>
                                <div className="additional">
                                    <h4>Required Qualifications:</h4>
                                    <h5>{uni?.requardQualification}</h5>
                                    <div className="addition-data">
                                        <p className=''>Tuition fee:</p>
                                        <p className=''>{uni?.tuitionFee}</p>
                                    </div>
                                    <div className="addition-data">
                                        <p className=''>English:</p>
                                        <p className=''>{uni?.englishTest}</p>
                                    </div>
                                    <div className="addition-data">
                                        <p className=''>Initial Deposit:</p>
                                        <p className=''>{uni?.initialDepossit}</p>
                                    </div>
                                </div>
                                <button onClick={()=>router.push('/proceed')}className='apply-now'>apply now</button>
                            </div>
                            
                    )}
                </div>
            </div>


            <Footer />
        </div>
    )
}

export default page