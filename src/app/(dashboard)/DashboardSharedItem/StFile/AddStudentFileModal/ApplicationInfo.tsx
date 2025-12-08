'use client'
import type { StudentFileForm } from "../type";
import { useFieldArray, useFormContext } from "react-hook-form";

const ApplicationInfo = () => {
    const { register, control } = useFormContext<StudentFileForm>();

    const { fields, append, remove } = useFieldArray({
      control,
      name: "universityApplications"
    });

    return (
      <>
        <h3 className="phase-title">phase 3: preferred university</h3>

        {fields.map((field, index) => (
          <div key={field.id} className="university-section">
            <div className="input-container">
              <label>University Name</label>
              <input {...register(`universityApplications.${index}.uniName` as const)} />
            </div>
            <div className="input-container">
              <label>Program</label>
              <input {...register(`universityApplications.${index}.program` as const)} />
            </div>

            <div className="input-container">
              <label>Subject</label>
              <input {...register(`universityApplications.${index}.subject` as const)} />
            </div>

            <div className="input-container">
              <label>Destination Country</label>
              <input {...register(`universityApplications.${index}.destinationCountry` as const)} />
            </div>

            <div className="input-container">
              <label>Intake</label>
              <input {...register(`universityApplications.${index}.intake` as const)} />
            </div>

            <div className="input-container">
              <label>Scholarship</label>
              <input
                type="number"
                {...register(`universityApplications.${index}.scholarship` as const)}
              />
            </div>

            <div className="input-container">
              <label>Course Start Date</label>
              <input type="date" {...register(`universityApplications.${index}.courseStartDate` as const)} />
            </div>

            <button
              type="button"
              onClick={() => remove(index)}
              className="remove-btn"
            >
              Remove University
            </button>

            <hr style={{ margin: "20px 0" }} />
          </div>
        ))}

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
      </>
    );
};

export default ApplicationInfo;
