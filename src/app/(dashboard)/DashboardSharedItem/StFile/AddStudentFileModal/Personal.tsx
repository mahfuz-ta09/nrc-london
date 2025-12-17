"use client";
import React from "react";
import { useFieldArray, useFormContext } from "react-hook-form";
import { programOptions } from "../../Objects/programItem";


const Personal = ({ register, errors }: { register: any; errors: any }) => {
    const { control } = useFormContext();
    const { fields, append, remove } = useFieldArray({
      control,
      name: "academicInfo",
    });

    return (
      <>
        <h3 className="phase-title">Phase 1: Student Information</h3>

        <div className="input-container">
          <label>Full Name*</label>
          <input {...register("name", { required: "Full name is required" })} />
          {errors.name && <span className="error">{errors.name.message}</span>}
        </div>

        <div className="input-container">
          <label>Email*</label>
          <input
            type="email"
            {...register("email", { required: "Email is required" })}
          />
          {errors.email && <span className="error">{errors.email.message}</span>}
        </div>

        <div className="double-input-container">
          <div className="input-container">
            <label>Phone</label>
            <input type="tel" {...register("phone")} />
          </div>
          <div className="input-container">
            <label>Alternative Mobile</label>
            <input type="tel" {...register("alternativePhone")} />
          </div>
        </div>

        <div className="double-input-container">
          <div className="input-container">
            <label>Gender</label>
            <select {...register("gender")}>
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>
          <div className="input-container">
            <label>Marital Status</label>
            <select {...register("maritalStatus")}>
              <option value="">Select Status</option>
              <option value="married">Married</option>
              <option value="unmerried">Unmerried</option>
            </select>
          </div>
        </div>

        <div className="double-input-container">
          <div className="input-container">
            <label>Date of Birth</label>
            <input type="date" {...register("dob")} />
          </div>
          <div className="input-container">
            <label>Passport No</label>
            <input {...register("passportNo")} />
          </div>
        </div>

        <div className="double-input-container">
          <div className="input-container">
            <label>Current Address</label>
            <input {...register("currentAddress")} />
          </div>
          <div className="input-container">
            <label>Country Citizen</label>
            <input {...register("countryCitizen")} />
          </div>
        </div>


        <h3 className="phase-title">Phase 2: Academic Information</h3>

        {fields.map((field, index) => (
          <div key={field.id} className="academic-item">
            <div className="double-input-container">
              <div className="input-container">
                <label>institution name</label>
                <input
                  {...register(`academicInfo.${index}.institutionName`)}
                  placeholder="Ex: Dhaka University"
                />
              </div>
              <div className="input-container">
                <label>programm</label>
                <select {...register(`academicInfo.${index}.degree`)}>
                  <option value="">Select Program</option>

                  {programOptions.map(group => (
                    <optgroup key={group.label} label={group.label}>
                      {group.options.map(option => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </optgroup>
                  ))}
                </select>

              </div>
            </div>

            <div className="double-input-container">
              <div className="input-container">
                <label>start year</label>
                <input
                  type="number"
                  {...register(`academicInfo.${index}.startYear`)}
                  placeholder="Ex: 2018"
                />
              </div>
              <div className="input-container">
                <label>End Year</label>
                <input
                  type="number"
                  {...register(`academicInfo.${index}.endYear`)}
                  placeholder="Ex: 2022"
                />
              </div>
            </div>

            <div className="double-input-container">
              <div className="input-container">
                <label>result / grade</label>
                <input
                  {...register(`academicInfo.${index}.result`)}
                  placeholder="Ex: 3.90 / 4.00"
                />
              </div>
              <div className="input-container">
                <label>country</label>
                <input
                  {...register(`academicInfo.${index}.country`)}
                  placeholder="Ex: Bangladesh"
                />
              </div>
            </div>

            <button
              type="button"
              onClick={() => remove(index)}
              className="remove-btn"
            >
              Remove
            </button>
          </div>
        ))}

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
      </>
    );
};

export default Personal;
