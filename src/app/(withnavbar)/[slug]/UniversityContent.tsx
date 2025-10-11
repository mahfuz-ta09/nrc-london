'use client'
import Link from "next/link"
import "../../../css/blogs/slugDesign.css"
import "../../../css/blogs/slugDesignFOrUni.css"
import Footer from "@/component/shared/footer/Footer"


const UniversityContent = ({ data }:{ data:any }) => {    
    return (
        <div className="page-container">
            <div className="page-banner">
            
                <div className="banner-content">
                    <div className="bread-crumb">
                        <Link className='bread-link1' href="/blogs">blogs</Link>
                        <div className="bread-dot"></div>
                        <Link className='bread-link2'  href="">details blog</Link>
                    
                    </div>

                </div>
            </div>


            <div className="university-detail-container">
                <div className="university-body">
                    <div className="university-detail-container-body">
                        <h1>{data?.meta_title}</h1>
                        <h4>{data?.meta_description}</h4>
                        {data?.famousFile?.url && (
                            <img
                                src={data?.famousFile?.url}
                                alt="blog header image"
                            /> )}

                        
                        <div dangerouslySetInnerHTML={{ __html: data?.content || "" }}/>
                    </div>
                </div>

                <div className="university-info-part">
                    <h3>Checkout Your University Options</h3>
                    {data?.universityList?.map((university: any, idx: number) => (
                    <div key={idx} className="university">
                        <input id={`uni${idx}`} type="checkbox" className="check-box" />
                        
                        <label htmlFor={`uni${idx}`} className="header-info">
                            <img src={university?.universityImage?.url} alt={university?.universityName} />
                            <p>{university?.universityName}</p>
                            <div className="open-plus">+</div> 
                        </label>

                        <div className="university-data">
                                <p>{university?.aboutUni}</p>
                                
                                {university?.englishProf && (
                                    <div className="university-details">
                                        
                                        <div className="detail-item">
                                            <p>English proficiency </p>
                                        {Object.entries(university.englishProf as Record<string, string>).map(
                                            ([key, value]) => (
                                                <div key={key}>
                                                   <div className="detail-label">{key}</div>
                                                   <div className="detail-value">{value}</div>
                                                </div>
                                            )
                                        )}
                                        </div>
                                        
                                        <div className="detail-item">
                                            <div className="detail-label">Scholarship Availability</div>
                                            <div className="detail-value">{university?.scholarship} {data?.currency}</div>
                                            <div className="detail-label">Minimum Tuition Fee (Per Year)</div>
                                            <div className="detail-value">
                                                {university?.lowFee ? `${university?.lowFee} ${data?.currency || ""}` : "N/A"}
                                            </div>
                                            <div className="detail-label">Maximum Tuition Fee (Per Year)</div>
                                            <div className="detail-value">
                                                {university?.highFee ? `${university?.highFee} ${data?.currency}` : "N/A"}
                                            </div>
                                        </div>
                                        
                                        {university?.initialDeposite && (
                                            <div className="detail-item">
                                                <div className="detail-label">Initial Deposit</div>
                                                <div className="detail-value">{university?.initialDeposite}{data?.currency}</div>
                                            </div>
                                        )}
                                    </div>
                                )}
                        </div>
                    </div>
                    ))}
                </div>
            </div>

                        
            <Footer />
        </div>
    )
}

export default UniversityContent