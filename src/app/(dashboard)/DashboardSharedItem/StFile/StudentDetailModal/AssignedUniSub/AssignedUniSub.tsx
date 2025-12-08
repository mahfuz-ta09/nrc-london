import React, { useState } from 'react'
import { toast } from 'react-toastify'
import { StudentListProps } from '../../type'
import EditableInput from '../EditableInput'
import Loader from '@/component/shared/loader/loader'
import { FormProvider, useFieldArray, useForm } from 'react-hook-form'
import { useEditStudentFileMutation } from '@/redux/endpoints/studentfileprocess/proceedEndpoints'
import { useUserInfo } from '@/utils/useUserInfo'

interface AssignedUniSubForm {
    universityApplications: any[]
    permission: {
        permission_universityApplications: string
    }
    applicationState: {
        universityApplications: {
            verified: string
            complete: string
        }
    }
}

const AssignedUniSub = ({ detailState, setdetailState }: StudentListProps) => {
    const userData = useUserInfo()
    const [isEditing, setIsEditing] = useState(false)
    const [editStudentFile,{ isLoading}] = useEditStudentFileMutation()


    const methods = useForm<AssignedUniSubForm>({
        defaultValues: {
            universityApplications: detailState?.data || [],
            permission: {
                permission_universityApplications: '',
            },
            applicationState: {
                universityApplications: {
                    verified: '',
                    complete: '',
                },
            },
        },
    })
    const { control } = methods
    const { fields, append, remove } = useFieldArray({
        control,
        name: 'universityApplications',
    })

    const onSubmit = async(data: any) => {
        if(isEditing){
            const confirm = window.confirm("Are you sure aboiut the upgrade?")
            if(!confirm) return
            if(!detailState?.id) return
            
            const response:any = await editStudentFile({ data: data, id:detailState?.id}) 
            if(response?.data?.data?.modifiedCount){
              toast.success("Student file updated successfully")
              setdetailState({ isOpen: false, data: {}, title: "" })
            }else{
              toast.error(response?.error?.data ||"Failed to update student file")
            }
        }
        setIsEditing(false)
    }

    if (!detailState.isOpen) return null
    if(isLoading) return <Loader />

    // console.log(detailState)

    return (
        <div className={detailState.isOpen? 'modal-container openmoda-container': 'modal-container' }>
            <div className="modal-body">
                <h4 className="modal-header">{detailState?.title}</h4>
                <button
                    onClick={() => setdetailState({ isOpen: false, data: {}, title: '' })}
                    className="cancel-btn"
                >X</button>

                <div className="modal-content">
                    <div style={{ display: 'flex', justifyContent: 'end' }}>
                        {!isEditing ? (
                        <button className="add-btn" onClick={() => setIsEditing(true)}>
                            ✏️ Edit
                        </button>
                        ) : (
                        <button
                            className="add-btn"
                            style={{ backgroundColor: '#f55', color: '#fff' }}
                            onClick={() => setIsEditing(false)}>
                            ✖ Cancel
                        </button>
                        )}
                    </div>
    
                    <FormProvider {...methods}>
                        <form onSubmit={methods.handleSubmit(onSubmit)} className="modal-content">
                            {fields.map((field, index) => (
                                <div key={index}>
                                    <div 
                                        style={{
                                            borderLeft: "1px solid green",
                                            marginTop: "40px",
                                            paddingLeft: "10px",
                                        }} key={field.id} className="double-input-container">
                                        
                                        {Object.keys(field || {})
                                        .filter((key) => key !== "id")
                                        .map((key) => (
                                            <EditableInput
                                                key={key}
                                                name={`universityApplications.${index}.${key}` as const}
                                                label={key}
                                                readOnly={!isEditing}
                                            />
                                        ))}
                                    </div>
                                    {isEditing && (
                                        <button
                                            type="button"
                                            onClick={() => remove(index)}
                                            className="remove-btn"
                                            style={{ width: '150px' , height:"30px" ,display:'inline-block', marginTop:'10px' }}
                                        >
                                            Remove University
                                        </button>
                                    )}
                                </div>
                            ))}

                            {isEditing && (
                                <button
                                    type="button"
                                    onClick={() =>
                                        append({
                                            uniName: '',
                                            program: '',
                                            subject: '',
                                            destinationCountry: '',
                                            intake: '',
                                            scholarship: 0,
                                            courseStartDate: '',
                                        })
                                    }
                                    className="add-btn">
                                + Add Another
                                </button>
                            )}

                            {(isEditing && userData?.Urole !== 'student') && (
                            <div className="input-container">
                                <label>Allow student to edit this section?</label>
                                <select {...methods.register("permission.permission_universityApplications")}>
                                    <option value="">Select</option>
                                    <option value="true">Yes</option>
                                    <option value="false">No</option>
                                </select>
                            </div>
                            )}
                            
                            {(isEditing && userData?.Urole !== 'student') && (
                            <div className="input-container">
                                <label>Information Verified?</label>
                                <select {...methods.register("applicationState.universityApplications.verified")}>
                                <option value="">Select</option>
                                <option value="true">Verified</option>
                                <option value="false">Not Verified</option>
                                </select>
                            </div>
                            )}
                            
                            {(isEditing && userData?.Urole !== 'student') && (
                            <div className="input-container">
                            <label>Section Complete?</label> 
                                <select {...methods.register("applicationState.universityApplications.complete")}>
                                <option value="">Select</option>
                                <option value="true">Complete</option>
                                <option value="false">Incomplete</option>
                                </select>
                            </div>
                            )}
                            {isEditing && (
                                <div style={{ marginTop: '1rem', textAlign: 'right' }}>
                                <button type="submit" className="add-btn">
                                    💾 Save Changes
                                </button>
                                </div>
                            )}
                        </form>
                    </FormProvider>
                </div>
            </div>
        </div>
    )
}

export default AssignedUniSub
