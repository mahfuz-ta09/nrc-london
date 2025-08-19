'use client'
import { useState } from "react"
import { useForm, SubmitHandler } from "react-hook-form"
import { toast } from "react-toastify"


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


    return (
        <div className={listSubject?.isOPen ? 'modal-container openmoda-container' : 'modal-container'}>
            <h1 style={{color:"black"}}>{listSubject?.action} subject to {listSubject?.name}</h1>
                <button
                    onClick={() => setListSubject((prev:any) => ({ ...prev, id: '', name: '', isOPen: false, action: "" }))}
                    className="cancel-btn"
                >
                    X
                </button>
                
                <div className="modal-from">
                    <table style={{background:"wheat"}}>
                        <thead>
                            <tr>
                                <th>university name</th>
                                <th>country image</th>
                                <th>schoolarship</th>
                                <th>tuition fee</th>
                                <th>initital deposite</th>
                                <th>required english</th>
                                <th>required qualification</th>
                                <th>details</th>
                                <th>add subject</th>
                                <th>all subject</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>dsf</td>
                                <td>dsf</td>
                                <td>dsf</td>
                                <td>dsf</td>
                                <td>dsf</td>
                                <td>dsf</td>
                                <td>dsf</td>
                                <td>dsf</td>
                                <td>dsf</td>
                                <td>dsf</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
        </div>
    )
}

export default SubjectListModal