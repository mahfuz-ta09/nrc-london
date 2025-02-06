'use client'
import { useState } from 'react'
import SubCntrl from './SubCntrl'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCancel, faPen } from '@fortawesome/free-solid-svg-icons'

const page = () => {
    const [open,setOpen] = useState(false)
    const [name,setName] = useState("")
    const [uniId,setUniId] = useState("")
    
    return (
      <div className='university-content'>
        <div className="header">
          <h1>Subjects:</h1>
          <button onClick={()=>{setOpen(!open);setName("Add")}}>Add Subjects</button>
        </div>


        <div className="table-container">
            <table className="table">
                <thead className="thead">
                    <tr className="tr">
                        <th className="th">University Name</th>
                        <th className="th">Country</th>
                        <th className="th">Logo</th>
                        <th className="th">Ranking</th>
                        <th className="th">Tuition Fee</th>
                        <th className="th">Required Document</th>
                        <th className="th">Application Fee</th>
                        <th className="th">Duration (Months)</th>
                        <th className="th">Intakes</th>
                        <th className="th">Entry Requirements</th>
                        <th className="th">Application Deadlines</th>
                        <th className="th">Update</th>
                        <th className="th">Delete</th>
                    </tr>
                </thead>
                <tbody className="tbody">
                    <tr className="tr">
                        <td className="td" data-label="University Name">Harvard University</td>
                        <td className="td" data-label="Ranking">Uk</td>
                        <td className="td" data-label="Logo"><img className="logo-img" src="https://upload.wikimedia.org/wikipedia/en/2/29/Harvard_shield_wreath.svg" alt="Harvard Logo"/></td>
                        <td className="td" data-label="Ranking">#1</td>
                        <td className="td" data-label="Tuition Fee">$50,000/year</td>
                        <td className="td" data-label="Required Document">Passport, IELTS, Transcripts</td>
                        <td className="td" data-label="Application Fee">$75</td>
                        <td className="td" data-label="Duration (Months)">48</td>
                        <td className="td" data-label="Intakes">September, January</td>
                        <td className="td" data-label="Entry Requirements">SAT, 3.5+ GPA</td>
                        <td className="td" data-label="Application Deadlines">Dec 15</td>
                        <td className="td" data-label="Application Deadlines"><FontAwesomeIcon onClick={()=>{setOpen(!open);setName("Edit");setUniId("id")}} icon={faPen}/></td>
                        <td className="td" data-label="Application Deadlines"><FontAwesomeIcon icon={faCancel}/></td>
                    </tr>
                    <tr className="tr">
                        <td className="td" data-label="University Name">Oxford University</td>
                        <td className="td" data-label="Ranking">uk</td>
                        <td className="td" data-label="Logo"><img className="logo-img" src="https://upload.wikimedia.org/wikipedia/en/d/d6/Oxford_university_coat_of_arms.svg" alt="Oxford Logo"/></td>
                        <td className="td" data-label="Ranking">#2</td>
                        <td className="td" data-label="Tuition Fee">$45,000/year</td>
                        <td className="td" data-label="Required Document">Visa, TOEFL, SOP</td>
                        <td className="td" data-label="Application Fee">$100</td>
                        <td className="td" data-label="Duration (Months)">36</td>
                        <td className="td" data-label="Intakes">October</td>
                        <td className="td" data-label="Entry Requirements">A-levels, GPA 3.8+</td>
                        <td className="td" data-label="Application Deadlines">Jan 10</td>
                        <td className="td" data-label="Application Deadlines"><FontAwesomeIcon onClick={()=>{setOpen(!open);setName("Edit");setUniId("id")}}  icon={faPen}/></td>
                        <td className="td" data-label="Application Deadlines"><FontAwesomeIcon icon={faCancel}/></td>
                    </tr>
                    <tr className="tr">
                        <td className="td" data-label="University Name">Oxford University</td>
                        <td className="td" data-label="Ranking">uk</td>
                        <td className="td" data-label="Logo"><img className="logo-img" src="https://upload.wikimedia.org/wikipedia/en/d/d6/Oxford_university_coat_of_arms.svg" alt="Oxford Logo"/></td>
                        <td className="td" data-label="Ranking">#2</td>
                        <td className="td" data-label="Tuition Fee">$45,000/year</td>
                        <td className="td" data-label="Required Document">Visa, TOEFL, SOP</td>
                        <td className="td" data-label="Application Fee">$100</td>
                        <td className="td" data-label="Duration (Months)">36</td>
                        <td className="td" data-label="Intakes">October</td>
                        <td className="td" data-label="Entry Requirements">A-levels, GPA 3.8+</td>
                        <td className="td" data-label="Application Deadlines">Jan 10</td>
                        <td className="td" data-label="Application Deadlines"><FontAwesomeIcon onClick={()=>{setOpen(!open);setName("Edit");setUniId("id")}} icon={faPen}/></td>
                        <td className="td" data-label="Application Deadlines"><FontAwesomeIcon icon={faCancel}/></td>
                    </tr>
                </tbody>
            </table>
        </div>

        <div className={open? "mod-open" : "modal"}>
            <button onClick={()=>setOpen(!open)} className='mod-close'>Close</button>
            <SubCntrl name={name} setOpen={setOpen} uniId={uniId} />
        </div>
      </div>
    )
}

export default page