'use client'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import './UniversityTable.css'
import { toast } from "react-toastify"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useGetSubjectListQuery, useRemoveSubjectMutation } from '@/redux/endpoints/subject/subjectEndpoints'
import Loader from '@/component/shared/Loader/Loader'


type ModalProps = {
    listSubject: {
        action: string,
        id: string,
        isOPen: boolean,
        name: string
    },
    setListSubject: React.Dispatch<React.SetStateAction<any>>
}

type UniData = {
    subjectName:string,
    cost:number,
    duration:number,
    description:string,
    qualifications: Record<string, string>, 
}


const SubjectListModal = ({ listSubject, setListSubject }: ModalProps) => {
    const [removeSubject] = useRemoveSubjectMutation()
    const { data , isLoading } = useGetSubjectListQuery({all: "",country: listSubject?.id || "",page: "1",total: "10",uniName: listSubject?.name ||""},{
        skip: !listSubject?.id || !listSubject?.name 
    })

    if(isLoading){
        return <Loader />
    }


    if(!listSubject?.id || !listSubject?.name){
        return null
    }
    
    const handleDeleteSubject = async(e:any) => {
        try{
            const isConfirmed = window.confirm(`Are you sure you want to delete subject?`)
            if (!isConfirmed) return; 

            const res = await removeSubject({id: e , countryID: listSubject?.id , countryName: listSubject?.name})

            if(res?.data?.data?.modifiedCount){
                toast.success("Subject deleted!")
            }else{
                toast.error('Failed to delete')
            }   
        }catch(err){
            console.error("Error deleting subject:", err)
            toast.error("Failed to delete subject")
        }
    }
    
    
    return (
        <div className={listSubject?.isOPen ? 'modal-container openmoda-container' : 'modal-container'}>
            <div id='modal-body-id' className='modal-body'>
                <h1 style={{color:"black"}}>check all subject in {listSubject?.name}</h1>
                <button
                    onClick={() => setListSubject((prev:any) => ({ ...prev, id: '', name: '', isOPen: false, action: "" }))}
                    className="cancel-btn"
                >
                    X
                </button>
                    
                <div className="table-container">
                    <table id="customers">
                        <thead>
                            <tr>
                                <th>subject name</th>
                                <th>course duration(month)</th>
                                <th>cost</th>
                                <th>total credit</th>
                                <th>application deadline</th>
                                <th>faculty</th>
                                <th>intake</th>
                                <th>language</th>
                                <th>mode of study</th>
                                <th>program type</th>
                                <th>qualifications</th>
                                <th>description</th>
                                <th>delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                data?.data?.map((subject:any,index:number) => (
                                    <tr key={index}>
                                        <td style={{color:"#000"}}>{subject?.subjectName}</td>
                                        <td style={{color:"#000"}}>{subject?.duration}</td>
                                        <td style={{color:"#000"}}>{subject?.cost}</td>
                                        <td style={{color:"#000"}}>{subject?.credits}</td>
                                        <td style={{color:"#000"}}>{subject?.applicationDeadline}</td>
                                        <td style={{color:"#000"}}>{subject?.faculty}</td>
                                        <td style={{color:"#000"}}>{subject?.intake}</td>
                                        <td style={{color:"#000"}}>{subject?.language}</td>
                                        <td style={{color:"#000"}}>{subject?.modeOfStudy}</td>
                                        <td style={{color:"#000"}}>{subject?.programType}</td>
                                        <td style={{color:"#000"}}>
                                            {Object.entries(subject?.qualifications || {}).map(([key, value]:[any,any]) => (
                                                <span key={key}>{key} : {value}</span>
                                            ))}
                                        </td>
                                        <td style={{color:"#000"}}>{subject?.description}</td>
                                        <td>
                                            <button onClick={()=>handleDeleteSubject(subject?._id)} style={{color:"#000"}} className='University-edit-btn'>
                                                <FontAwesomeIcon icon={faTrash} />
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default SubjectListModal