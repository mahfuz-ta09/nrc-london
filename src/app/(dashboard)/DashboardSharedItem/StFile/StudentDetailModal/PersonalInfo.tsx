import { useForm, FormProvider, useFieldArray } from "react-hook-form";
import { useState } from "react";
import { StudentListProps } from "../type";
import EditableInput from "./EditableInput";

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

const StatusBadge = ({ status }: { status: string }) => {
  const colors: Record<string, string> = {
    submitted: "🟢 Submitted",
    underReview: "🟡 Under Review",
    verified: "🔵 Verified",
    missing: "🔴 Missing / Not Started",
    offered: "🟣 Offered",
    accepted: "🟤 Accepted",
    rejected: "⚫ Rejected",
  };

  return (
    <span
      style={{
        display: "inline-block",
        fontWeight: 600,
        marginLeft: "0.5rem",
      }}
    >
      {colors[status] || "⚫ Unknown"}
    </span>
  );
};

const PersonalInfo = ({ detailState, setdetailState }: StudentListProps) => {
    const [isEditing, setIsEditing] = useState(false);

    const methods = useForm({
      defaultValues: detailState?.data || {},
    });

    const { control } = methods;
    const { fields, append, remove } = useFieldArray({
      control,
      name: "academicInfo",
    });

    const onSubmit = (data: any) => {
      console.log("✅ Updated Personal Info:", data);
      setIsEditing(false);
    };

    if (!detailState.isOpen) return null;

    return (
      <div
        className={
          detailState.isOpen
            ? "modal-container openmoda-container"
            : "modal-container"
        }>
        <div className="modal-body">
          <h4 className="modal-header">
            {detailState?.title}
          </h4>

          <button
            onClick={() => setdetailState({ isOpen: false, data: {}, title: "" })}
            className="cancel-btn"
          >
            X
          </button>


          <FormProvider {...methods}>
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
                >
                    ✖ Cancel
                </button>
                )}
            </div>

            <form onSubmit={methods.handleSubmit(onSubmit)} className="modal-content">
              
                <div style={{marginTop:"20px"}}>
                    <div className="checkbox-container">
                        <h5>🟡 required verification</h5>
                        <br />
                        { isEditing && (<label>mark verified</label>)}
                        { isEditing && (<input type="checkbox" />)}
                    </div>
                    <div className="checkbox-container">
                        <h5>🔴 not ready for submission</h5>
                        <br />
                        { isEditing && (<label>mark this part ready for submission</label>)}
                        { isEditing && (<input type="checkbox" />)}
                    </div>
                    <div className="checkbox-container">
                        <h5>🔴 student are not allowed to change these data</h5>
                        <br />
                        { isEditing && (<label>mark this part ready for submission</label>)}
                        { isEditing && (<input type="checkbox" />)}
                    </div>
                </div>
                
                <h3 className="phase-title">Personal Information</h3>
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
                        >
                          Remove
                        </button>
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
