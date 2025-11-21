import React, { useState } from 'react'
import { StudentListProps } from '../../type'
import EditableInput from '../EditableInput'
import { FormProvider, useFieldArray, useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { useEditStudentFileMutation } from '@/redux/endpoints/studentfileprocess/proceedEndpoints'

interface AssignedUniSubForm {
    preferredUniversities: any[]
    permission: {
        permission_prefferedUniSub: string
    }
    applicationState: {
        prefferedUniSub: {
            verified: string
            complete: string
        }
    }
}

const AssignedUniSub = ({ detailState, setdetailState }: StudentListProps) => {
    const [isEditing, setIsEditing] = useState(false)
    const [editStudentFile,{ isLoading}] = useEditStudentFileMutation()

    const methods = useForm<AssignedUniSubForm>({
        defaultValues: {
            preferredUniversities: detailState?.data || [],
            permission: {
                permission_prefferedUniSub: '',
            },
            applicationState: {
                prefferedUniSub: {
                    verified: '',
                    complete: '',
                },
            },
        },
    })
    const { control } = methods
    const { fields, append, remove } = useFieldArray({
        control,
        name: 'preferredUniversities',
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
              toast.error("Failed to update student file")
            }
        }
        setIsEditing(false)
    }

    if (!detailState.isOpen) return null
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
                                <div>
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
                                                name={`preferredUniversities.${index}.${key}` as const}
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

                        <div className="input-container">
                            {isEditing && (<label>Allow student to edit this section?</label>)}
                            {isEditing && (
                              <select {...methods.register("permission.permission_prefferedUniSub")}>
                                <option value="">Select</option>
                                <option value="true">Yes</option>
                                <option value="false">No</option>
                              </select>
                            )}
                        </div>
 
                        <div className="input-container">
                          {isEditing && (<label>Information Verified?</label>)}
                          {isEditing && (
                            <select {...methods.register("applicationState.prefferedUniSub.verified")}>
                              <option value="">Select</option>
                              <option value="true">Verified</option>
                              <option value="false">Not Verified</option>
                            </select>
                          )}
                        </div>

                        <div className="input-container">
                          {isEditing && (<label>Section Complete?</label>)}
                          {isEditing && (
                            <select {...methods.register("applicationState.prefferedUniSub.complete")}>
                              <option value="">Select</option>
                              <option value="true">Complete</option>
                              <option value="false">Incomplete</option>
                            </select>
                          )}
                        </div>
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
