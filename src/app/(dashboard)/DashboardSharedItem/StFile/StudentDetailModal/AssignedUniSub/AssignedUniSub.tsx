import React from 'react'
import { StudentListProps } from '../../type'
import EditableInput from '../EditableInput'
import { FormProvider, useFieldArray, useForm } from 'react-hook-form'

const AssignedUniSub = ({ detailState, setdetailState }:StudentListProps) => {
    const methods = useForm({ 
        defaultValues: {
            preferredUniversities:detailState?.data
        }
    });
    const { control } = methods;
    const { fields, append, remove } = useFieldArray({
      control,
      name: "preferredUniversities",
    });
    
    
    const onSubmit = (data: any) => {
        console.log("Updated Personal Info:", data);
    };

    if (!detailState.isOpen) return null;

    return (
        <div className={detailState.isOpen ? "modal-container openmoda-container" : "modal-container"}>
            <div className="modal-body">
                <h4 className='modal-header'>{detailState?.title}</h4>
                <button
                    onClick={() => setdetailState({ isOpen: false, data: {}, title: '' })}
                    className="cancel-btn"
                >X</button>
                
                <div className="modal-content">
                    <FormProvider {...methods}>
                        <form onSubmit={methods.handleSubmit(onSubmit)} className="modal-content">
                        {
                            fields.map((field, index) => (
                                <div key={index} className="double-input-container">
                                    {Object.keys(field || {}).map((key) => (
                                        <EditableInput
                                            key={key}
                                            name={`preferredUniversities.${index}.${key}` as const}
                                            label={key}
                                        />
                                    ))}
                                    <button
                                        type="button"
                                        onClick={() => remove(index)}
                                        className="remove-btn"
                                        style={{width:"150px"}}
                                    >
                                        Remove University
                                    </button>
                                </div>
                            )
                        )}
                         <button
                           type="button"
                           onClick={() =>
                             append({
                               uniName: "",
                               program: "",
                               subject: "",
                               destinationCountry: "",
                               intake: "",
                               scholarship: 0,
                               courseStartDate: "",
                             })
                           }
                           className="add-btn"
                         >
                           + Add Another
                         </button>
                        <div style={{marginTop:"20px"}}>
                            <h5>🟡 required verification</h5>
                            <div className="checkbox-container">
                            <label>mark verified</label>
                            <input type="checkbox" />
                            </div>

                            <h5 style={{marginTop:"10px"}}>🔴 not ready for submission</h5>
                            <div className="checkbox-container">
                            <label>mark this part ready for submission</label>
                            <input type="checkbox" />
                            </div>
                        </div>
                        <div style={{ marginTop: "1rem", textAlign: "right" }}>
                            <button type="submit" className="add-btn">
                            💾 Save Changes
                            </button>
                        </div>
                    </form>
                </FormProvider>
                </div>
            </div>
        </div>
    )
}


export default AssignedUniSub