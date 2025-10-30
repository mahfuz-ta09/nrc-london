import { useForm, FormProvider, useFieldArray, useFormContext } from "react-hook-form";
import { useState } from "react";
import { StudentListProps } from "../type";

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

const EditableInput = ({
  name,
  label,
  readOnly = false,
}: {
  name: string;
  label: string;
  readOnly?: boolean;
}) => {
  const { register, watch } = useFormContext();
  const [isEditing, setIsEditing] = useState(false);
  const value = watch(name);

  if (readOnly) {
    return (
      <div className="input-container">
        <label>{label}</label>
        <input value={value || "___"} readOnly />
      </div>
    );
  }

  return (
    <div className="input-container">
      <label>{label}</label>
      <input
        {...register(name)}
        value={isEditing ? value || "" : value || "___"}
        readOnly={!isEditing}
        onClick={() => setIsEditing(true)}
        onBlur={() => setIsEditing(false)}
        autoFocus={isEditing}
      />
    </div>
  );
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
  const methods = useForm({ defaultValues: detailState?.data || {} });
  const { control } = methods;
  const { fields, append, remove } = useFieldArray({
    control,
    name: "academicInfo",
  });

  const onSubmit = (data: any) => {
    console.log("Updated Personal Info:", data);
  };

  if (!detailState.isOpen) return null;

  return (
    <div
      className={detailState.isOpen
          ? "modal-container openmoda-container"
          : "modal-container"
      }>
      <div className="modal-body">
        <h4 className="modal-header">
          {detailState?.title}
          <StatusBadge
            status={detailState?.data?.progress?.status || "missing"}
          />
        </h4>

        <button
          onClick={() =>
            setdetailState({ isOpen: false, data: {}, title: "" })
          }
          className="cancel-btn"
        >
          X
        </button>

        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit)} className="modal-content">
            <h3 className="phase-title">Personal Information</h3>
            <div className="double-input-container">
              {Object.keys(detailState?.data?.personalInfo || {}).map((key) => (
                <EditableInput
                  key={key}
                  name={`personalInfo.${key}`}
                  label={personalInfoLabels[key] || key}
                />
              ))}
            </div>

            <h3 className="phase-title">Academic Information</h3>
            <div className="double-input-container">
              {fields.map((field, index) => (
                <div
                  style={{
                    borderLeft: "3px solid green",
                    marginTop: "10px",
                    paddingLeft: "10px",
                  }}
                  key={field.id}
                >
                  <button
                    type="button"
                    onClick={() => remove(index)}
                    className="remove-btn"
                  >
                    Remove
                  </button>
                  {Object.keys(field || {}).map((key) =>
                    key === "id" ? null : (
                      <EditableInput
                        key={key}
                        name={`academicInfo.${index}.${key}`}
                        label={key}
                      />
                    )
                  )}
                </div>
              ))}
            </div>

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
          </form>
        </FormProvider>
      </div>
    </div>
  );
};

export default PersonalInfo;
