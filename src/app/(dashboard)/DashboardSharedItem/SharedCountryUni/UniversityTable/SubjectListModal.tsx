'use client'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import './UniversityTable.css'
import { useForm, SubmitHandler } from "react-hook-form"
import { toast } from "react-toastify"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useGetSubjectListQuery } from '@/redux/endpoints/subject/subjectEndpoints'
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

const qualificationOptions = ["master", "bsc", "phd", "diploma","under grad","experience"]

const SubjectListModal = ({ listSubject, setListSubject }: ModalProps) => {
    const { register, handleSubmit, reset, setValue } = useForm<UniData>()
    const { data , isLoading } = useGetSubjectListQuery({
        all: "",
        country: listSubject?.id || "",
        page: "1",
        total: "10",
        uniName: listSubject?.name || ""
    }, {
        skip: !listSubject?.id || !listSubject?.name 
    })

    if(isLoading){
        return <Loader />
    }


    if(!listSubject?.id || !listSubject?.name){
        return null
    }
    const onSubmit: SubmitHandler<UniData> = async(data) => {
        try{
            let res
            var form_data = new FormData()
            
            Object.entries(data).forEach(([key, value]) => {
                if (value instanceof FileList) {
                    for (let i = 0; i < value.length; i++) {
                        form_data.append(key, value[i]);
                    }
                } else if (typeof value === "object" && value !== null) {
                    Object.entries(value).forEach(([subKey, subValue]) => {
                        if (subValue !== undefined && subValue !== null && subValue !== "" && !Number.isNaN(subValue)) {
                        form_data.append(`${key}[${subKey}]`, String(subValue));
                        }
                    });
                } else if (value !== undefined && value !== null && value !== "" && !Number.isNaN(value)) {
                    form_data.append(key, String(value));
                }

            });

            
            // if(addUni?.action==="add")res = await addUniversity({data:form_data,id: addUni?.id})
            // if(addUni?.action==="edit")res = await editUniversity({data: form_data,id:addUni?.id, universityName:addUni?.name})
            
            
            // if(res?.data?.data?.acknowledged){
            //     toast.success("Operation successful!!!")
            //     setAddUni({
            //         isOpen: false,
            //         id:"",
            //         name:''
            //     })
            //     reset()
            // }else{
            //     toast.error(res?.data?.message || "Failed! to operate")
            // }
        }catch(err){
            toast.error("Something went wrong!")
        }
    }

    // console.log(listSubject)
    // console.log(data)
    
    return (
        <div className={listSubject?.isOPen ? 'modal-container openmoda-container' : 'modal-container'}>
            <div className='modal-body'>
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
                                <th>course duration</th>
                                <th>qualification</th>
                                <th>description</th>
                                <th>delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr style={{color:"black"}}>
                                <td  style={{color:"black"}}>dsf</td>
                                <td  style={{color:"black"}}>dsf</td>
                                <td  style={{color:"black"}}>dsf</td>
                                <td  style={{color:"black"}}>dsf</td>
                                <td  style={{color:"black"}}><FontAwesomeIcon icon={faTrash}/></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default SubjectListModal