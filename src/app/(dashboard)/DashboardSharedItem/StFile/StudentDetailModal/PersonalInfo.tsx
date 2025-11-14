import { useState } from "react";
import { StudentListProps } from "../type";
import EditableInput from "./EditableInput";
import { useForm, FormProvider, useFieldArray } from "react-hook-form";
import { useEditStudentFileMutation } from "@/redux/endpoints/studentfileprocess/proceedEndpoints";
import { toast } from "react-toastify";

const personalInfoLabels: Record<string, string> = {
    name: "Student's Name",
    email: "Student's Email",
    phone: "Student's Phone",
    alternativePhone: "Alternative Phone",
    dob: "Date of Birth",
    passportNo: "Passport Number",
    currentAddress: "Current Address",
    countryCitizen: "Citizenship Country",
    refused: "Ever Refused",
    refusedCountry: "Refused Country",
    gender: "Gender",
    maritalStatus: "Marital Status",
    emergencyContactName: "Emergency Contact Name",
};

const PersonalInfo = ({ detailState, setdetailState }: StudentListProps) => {
    const [isEditing, setIsEditing] = useState(false);
    const methods = useForm({
      defaultValues: detailState?.data || {},
    });
    const [editStudentFile,{ isLoading}] = useEditStudentFileMutation()
    const { control } = methods;
    const { fields, append, remove } = useFieldArray({
        control,
        name: "academicInfo",
    });
    
    const onSubmit = async(data: any) => {
        if(isEditing){
            const confirm = window.confirm("Are you sure aboiut the upgrade?")
            if(!confirm) return
            if(!detailState?.id) return
            
            const response = await editStudentFile({data:data, id:detailState?.id})
            if(response?.data?.data?.modifiedCount){
              toast.success("Student file updated successfully")
              setdetailState({ isOpen: false, data: {}, title: "" })
            }else{
              toast.error("Failed to update student file")
            }
        }
        setIsEditing(false);
    };

    if (!detailState.isOpen) return null;


    return (
      <div className={detailState.isOpen?"modal-container openmoda-container":"modal-container"}>
          <div className="modal-body">
          
              <h4 className="modal-header">{detailState?.title}</h4>
              <button
                  onClick={() => setdetailState({ isOpen: false, data: {}, title: "" })}
                  className="cancel-btn"
              >X</button>
            
              <div style={{ display: 'flex', justifyContent: 'end' }}>
                  {!isEditing ? (
                    <button className="add-btn" onClick={() => setIsEditing(true)}>
                        ✏️ Edit
                    </button>
                  ) : (
                    <button
                        className="add-btn"
                        style={{ backgroundColor: '#f55', color: '#fff' }}
                        onClick={() => setIsEditing(false)}
                    >✖ Cancel</button>
                  )}
              </div>

              <FormProvider {...methods}>
                <form onSubmit={methods.handleSubmit(onSubmit)} className="modal-content">

                    <div className="double-input-container">
                      {Object.keys(detailState?.data?.personalInfo || {}).map((key) => (
                        <EditableInput
                          key={key}
                          name={`personalInfo.${key}`}
                          label={personalInfoLabels[key] || key}
                          readOnly={!isEditing}
                        />
                      ))}
                    </div>
                    
                    <h3 className="phase-title">Academic Information</h3>
                    <div className="double-input-container">
                      {fields.map((field, index) => (
                        <div
                          key={field.id}
                          style={{
                            borderLeft: "1px dashed green",
                            marginTop: "10px",
                            paddingLeft: "10px",
                          }}
                        >
                          {isEditing && (
                              <button
                                type="button"
                                onClick={() => remove(index)}
                                className="remove-btn"
                              >Remove</button>
                          )}
                            <label><strong>#{index+1}</strong></label>
                            {Object.keys(field || {}).map((key) =>
                              key === "id" ? null : (
                                <EditableInput
                                  key={key}
                                  name={`academicInfo.${index}.${key}`}
                                  label={key}
                                  readOnly={!isEditing}
                                />
                              )
                          )}
                        </div>
                      ))}
                    </div>
                    
                    {isEditing && (
                      <>
                        <button
                          type="button"
                          onClick={() =>
                            append({
                              institutionName: "",
                              degree: "",
                              startYear: "",
                              endYear: "",
                              result: "",
                              country: "",
                            })
                          }
                          className="add-btn"
                        >
                          + Add Academic Info
                        </button>


                        <div className="input-container">
                            {isEditing && (<label>Allow student to edit this section?</label>)}
                            {isEditing && (
                              <select {...methods.register("permission.permission_personalInfo")}>
                                <option value="">Select</option>
                                <option value="true">Yes</option>
                                <option value="false">No</option>
                              </select>
                            )}
                        </div>
 
                        <div className="input-container">
                          {isEditing && (<label>Information Verified?</label>)}
                          {isEditing && (
                            <select {...methods.register("applicationState.personalInfo.verified")}>
                              <option value="">Select</option>
                              <option value="true">Verified</option>
                              <option value="false">Not Verified</option>
                            </select>
                          )}
                        </div>

                        <div className="input-container">
                          {isEditing && (<label>Section Complete?</label>)}
                          {isEditing && (
                            <select {...methods.register("applicationState.personalInfo.complete")}>
                              <option value="">Select</option>
                              <option value="true">Complete</option>
                              <option value="false">Incomplete</option>
                            </select>
                          )}
                        </div>
                    
                        <div style={{ marginTop: "1rem", textAlign: "right" }}>
                          <button type="submit" className="add-btn">
                            💾 Save Changes
                          </button>
                        </div>
                      </>
                    )}
                </form>
              </FormProvider>
          </div>
      </div>
    );
};

export default PersonalInfo;
