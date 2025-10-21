'use client'
import { useGetFileByConditionsQuery } from "@/redux/endpoints/studentfileprocess/proceedEndpoints";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"


type StudentListProps = {
    setdetailState: React.Dispatch<React.SetStateAction<{ isOpen: boolean, data: any , title: string}>>;
    detailState: { isOpen: boolean , data: any, title: string};
    values: any;
    setValues: React.Dispatch<React.SetStateAction<any>>;
}

const StudentList = ({ setdetailState,detailState, values}: StudentListProps) => {
    const { data , isLoading } = useGetFileByConditionsQuery({values: values })

    // console.log(data?.data)
    return (
        <div>
            <h1 className='tag'>Review Student Applications</h1>
            <div className="table-contant">

                <table>
                    <thead>
                        <tr>
                            <th>name/email/id</th>
                            <th>personal info</th>
                            <th>assigned universities and subjects</th>
                            <th>files</th>
                            <th>english test</th>
                            <th>update history</th>
                            <th>delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            isLoading ? (
                                <tr>
                                    <td colSpan={6}>Loading...</td>
                                </tr>
                            ) : data?.data?.length > 0 ? (
                                data.data.map((student: any) => (
                                    <tr key={student?._id}>
                                        <td>
                                            {student?.personalInfo?.name}
                                            <br/>
                                            {student?.personalInfo?.email}
                                            <br/>
                                            {student?._id}
                                        </td>
                                        <td><button onClick={()=>setdetailState({isOpen: true ,title:'personal information', data:student?.personalInfo})} className="details-table-action">details <FontAwesomeIcon icon={faArrowRight}/></button></td>
                                        <td><button onClick={()=>setdetailState({isOpen: true ,title:'assigned university & subjects', data:student?.prefferedUniSub})} className="details-table-action">details <FontAwesomeIcon icon={faArrowRight}/></button></td>
                                        <td><button onClick={()=>setdetailState({isOpen: true ,title:'all files', data:student?.studentsFile})} className="details-table-action">details <FontAwesomeIcon icon={faArrowRight}/></button></td>
                                        <td><button onClick={()=>setdetailState({isOpen: true ,title:'engkish test', data:student?.englishProficiency})} className="details-table-action">details <FontAwesomeIcon icon={faArrowRight}/></button></td>
                                        <td><button onClick={()=>setdetailState({isOpen: true ,title:'update history', data:student?.fileEditActivity})} className="details-table-action">details <FontAwesomeIcon icon={faArrowRight}/></button></td>
                                        <td><button className="details-table-action"></button></td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={6}>No students found.</td>
                                </tr>
                            )
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default StudentList
