'use client'
import Loader from "@/component/shared/Loader/Loader"
import { useGetALlAgentQuery } from "@/redux/endpoints/agent/agentsEndpoints"
import { useRouter } from "next/navigation"
import Link from "next/link"
import '../css/allagents.css'

const page = () => {
    const { data , isLoading : dataLoading } = useGetALlAgentQuery()
    const router = useRouter()


    if(dataLoading) return <Loader />
    
    return (
        <div className="sAdmin">
            <div className="sAdmin-header">
                <h1>All Agent:</h1>
                <button onClick={()=>router.push('/Dashboard/super_admin/agent-req')}>Agent Request?</button>
            </div>
            
            {/* {
                (dataLoading)? <Loader /> :
                <div className="table-container">
                    <table className="table">
                        <thead className="thead">
                            <tr className="tr">
                                <th className="th">Serial</th> 
                                <th className="th">Id</th> 
                                <th className="th">Name</th> 
                                <th className="th">Email</th> 
                                <th className="th">Mobile number</th>
                                <th className="th">Alternate mobile</th> 
                                <th className="th">dob</th> 
                                <th className="th">Address</th> 
                                <th className="th">Nationality</th> 
                                <th className="th">Passport_number</th> 
                                <th className="th">Agency name</th> 
                                <th className="th">Agency address</th> 
                                <th className="th">Agency website</th> 
                                <th className="th">Experience</th> 
                                <th className="th">Services</th>
                                <th className="th">Partner universities</th> 
                                <th className="th">License number</th> 
                                <th className="th">License document</th> 
                                <th className="th">Tax id</th>
                                <th className="th">Criminal record</th> 
                                <th className="th">Background check</th> 
                                <th className="th">Created At</th> 
                                <th className="th">Referral</th> 
                                <th className="th">Role</th> 
                                <th className="th">Services</th> 
                                <th className="th">Status</th> 
                            </tr>
                        </thead>
                        <tbody className="tbody">
                            {
                                data?.data?.map((req:any,index:number)=>(
                                    <tr key={req?._id} className="tr">
                                        <td data-label="serial" className="td" >{index+1}</td>
                                        <td data-label="id" className="td" >{req?._id}</td>
                                        <td data-label="name" className="td" >{req?.name}</td>
                                        <td data-label="email" className="td" >{req?.email}</td>
                                        <td data-label="mobile" className="td" >{req?.mobile_number}</td>
                                        <td data-label="alternate mobile" className="td" >{req?.alternate_mobile}</td>
                                        <td data-label="dob" className="td" >{req?.dob}</td>
                                        <td data-label="address" className="td" >{req?.address}</td>
                                        <td data-label="nationality" className="td" >{req?.nationality}</td>
                                        <td data-label="passport no" className="td" >{req?.passport_number}</td>
                                        <td data-label="agency name" className="td" >{req?.agency_name}</td>
                                        <td data-label="agency address" className="td" >{req?.agency_address}</td>
                                        <td data-label="agency website" className="td" ><Link style={{color:"white"}}  href={req?.agency_website}>visit</Link></td>
                                        <td data-label="experience" className="td" >{req?.experience}</td>
                                        <td data-label="services" className="td" >{req?.services}</td>
                                        <td data-label="parter uni" className="td" >{req?.partner_universities}</td>
                                        <td data-label="license number" className="td" >{req?.license_number}</td>
                                        <td data-label="license doc" className="td" ><Link style={{color:"white"}} href={req?.license_document}>check</Link></td>
                                        <td data-label="tax id" className="td" >{req?.tax_id}</td>
                                        <td data-label="criminal record" className="td" >{req?.criminal_record}</td>
                                        <td data-label="background check" className="td" ><Link style={{color:"white"}}  href={req?.background_check}>check</Link></td>
                                        <td data-label="created" className="td" >{req?.createdAt}</td>
                                        <td data-label="referral" className="td" >{req?.referral}</td>
                                        <td data-label="role" className="td" >{req?.role}</td>
                                        <td data-label="services" className="td" >{req?.services}</td>
                                        <td data-label="status" className="td" >{req?.status}</td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>
            } */}
            {data?.data?.map((req:any,index:number)=>(
            <div className="card-container">
                <div className="profile-card">
                    <div className="floating-elements"></div>
                    
                    <div className="card-header">
                        <div className="profile-avatar">
                            <span>JD</span>
                        </div>
                        <h1 className="profile-name">John Doe</h1>
                        <p className="profile-email">john.doe@example.com</p>
                        <span className="profile-id">ID: #12345</span>
                    </div>

                    <div className="card-content">
                        <div className="info-grid">
                            <div className="info-section">
                                <h3 className="section-title">Personal Information</h3>
                                <div className="info-item">
                                    <div className="info-label">Mobile</div>
                                    <div className="info-value">+1 (555) 123-4567</div>
                                </div>
                                <div className="info-item">
                                    <div className="info-label">Alternate Contact</div>
                                    <div className="info-value">+1 (555) 987-6543</div>
                                </div>
                                <div className="info-item">
                                    <div className="info-label">Date of Birth</div>
                                    <div className="info-value">January 15, 1990</div>
                                </div>
                                <div className="info-item">
                                    <div className="info-label">Address</div>
                                    <div className="info-value">123 Main Street, New York, NY 10001</div>
                                </div>
                                <div className="info-item">
                                    <div className="info-label">Nationality</div>
                                    <div className="info-value">United States</div>
                                </div>
                            </div>

                            <div className="info-section">
                                <h3 className="section-title">Travel & Documentation</h3>
                                <div className="info-item">
                                    <div className="info-label">Passport Number</div>
                                    <div className="info-value">123456789</div>
                                </div>
                                <div className="info-item">
                                    <div className="info-label">Agency</div>
                                    <div className="info-value">Global Travel Agency</div>
                                </div>
                                <div className="info-item">
                                    <div className="info-label">Experience</div>
                                    <div className="info-value">5 Years International Travel</div>
                                </div>
                                <div className="info-item">
                                    <div className="info-label">Services</div>
                                    <div className="info-value">Visa Processing, Travel Planning</div>
                                </div>
                            </div>

                            <div className="info-section">
                                <h3 className="section-title">Professional Details</h3>
                                <div className="info-item">
                                    <div className="info-label">Partner</div>
                                    <div className="info-value">Premium Travel Partners</div>
                                </div>
                                <div className="info-item">
                                    <div className="info-label">License</div>
                                    <div className="info-value">
                                        <span className="status-badge status-verified">LIC-2024-001 ✓</span>
                                    </div>
                                </div>
                                <div className="info-item">
                                    <div className="info-label">Tax Status</div>
                                    <div className="info-value">
                                        <span className="status-badge status-active">Compliant ✓</span>
                                    </div>
                                </div>
                                <div className="info-item">
                                    <div className="info-label">Background Check</div>
                                    <div className="info-value">
                                        <span className="status-badge status-verified">Verified ✓</span>
                                    </div>
                                </div>
                            </div>

                            <div className="info-section">
                                <h3 className="section-title">Account Information</h3>
                                <div className="info-item">
                                    <div className="info-label">Created</div>
                                    <div className="info-value">March 15, 2024</div>
                                </div>
                                <div className="info-item">
                                    <div className="info-label">Referral</div>
                                    <div className="info-value">Sarah Johnson</div>
                                </div>
                                <div className="info-item">
                                    <div className="info-label">Role</div>
                                    <div className="info-value">
                                        <span className="status-badge status-active">Travel Consultant</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>))}
        </div>
    )
}

export default page