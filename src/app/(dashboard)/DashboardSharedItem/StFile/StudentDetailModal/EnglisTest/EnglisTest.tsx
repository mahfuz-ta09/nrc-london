"use client";
import React, { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { StudentListProps, examConfig } from "../../type";

const EnglishTest = ({ detailState, setdetailState }: StudentListProps) => {
    const [isEditing, setIsEditing] = useState(false);

    const methods = useForm({
        defaultValues: {
            englishProficiency: detailState?.data || {},
        },
    });

    const { register, watch, setValue } = methods;
    const englishData = watch("englishProficiency");

    const onSubmit = (data: any) => {
        console.log("✅ Updated English Tests:", data);
        setIsEditing(false);
    };

    const addExam = (exam: string) => {
        if (!exam) return;
        const current = { ...englishData };
        if (!current[exam]) {
            current[exam] = {};
            setValue("englishProficiency", current);
        }
    };

    const removeExam = (exam: string) => {
        const updated = { ...englishData };
        delete updated[exam];
        setValue("englishProficiency", updated);
    };

    if (!detailState.isOpen) return null;
    
    return (
        <div className={detailState.isOpen? "modal-container openmoda-container": "modal-container"}>
            <div className="modal-body">
                <h4 className="modal-header">{detailState?.title}</h4>
                <button
                    onClick={() =>
                        setdetailState({ isOpen: false, data: {}, title: "" })
                    }
                    className="cancel-btn"
                >X</button>
                <div style={{ display: "flex", justifyContent: "end" }}>
                    {!isEditing ? (
                        <button className="add-btn" onClick={() => setIsEditing(true)}>
                        ✏️ Edit</button>
                    ) : (
                        <button
                            className="add-btn"
                            style={{ backgroundColor: "#f55", color: "#fff" }}
                            onClick={() => setIsEditing(false)}
                        >✖ Cancel</button>
                    )}
                </div>
                <FormProvider {...methods}>
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
                        
                        {isEditing && (
                            <div className="input-container">
                                <select
                                defaultValue=""
                                onChange={(e) => {
                                    addExam(e.target.value);
                                    e.target.value = "";
                                }}>
                                <option value="" disabled>
                                    Add new test...
                                </option>
                                {Object.keys(examConfig).map((exam) => (
                                    <option key={exam} value={exam}>
                                    {exam.toUpperCase()}
                                    </option>
                                ))}
                                </select>
                            </div>
                        )}

                        {Object.keys(englishData || {}).length === 0 && (
                            <p style={{ marginTop: "1rem" }}>No English test information available.</p>
                        )}

                        {Object.keys(englishData || {}).map((exam) => (
                            <div
                                key={exam}
                                className="exam-section"
                                style={{
                                    borderLeft: "3px solid #004a62",
                                    paddingLeft: "10px",
                                    marginTop: "1rem",
                                }}
                            >
                                <div
                                style={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    alignItems: "center",
                                }}
                                >
                                <h4>{exam.toUpperCase()}</h4>
                                {isEditing && (
                                    <button
                                        type="button"
                                        className="remove-btn"
                                        onClick={() => removeExam(exam)}
                                    >❌ Remove</button>
                                )}
                                </div>

                                <div
                                    className="exam-fields"
                                    style={{
                                        display: "grid",
                                        gridTemplateColumns:
                                        "repeat(auto-fit, minmax(200px, 1fr))",
                                        gap: "10px",
                                    }}
                                >
                                {examConfig[exam]?.map((field: string) => (
                                    <div key={field} className="input-container">
                                    <label>{field}</label>
                                    {isEditing ? (
                                        <input
                                            type={field === "date" ? "date" : "number"}
                                            {...register(`englishProficiency.${exam}.${field}`)}
                                        />
                                    ) : (
                                        <p>
                                            {englishData?.[exam]?.[field]
                                            ? englishData[exam][field]
                                            : "-"}
                                        </p>
                                    )}
                                    </div>
                                ))}
                                </div>
                            </div>
                        ))}

                        {isEditing && (
                            <div style={{ marginTop: "1rem", textAlign: "right" }}>
                                <button type="submit" className="add-btn">
                                💾 Save Changes
                                </button>
                            </div>
                        )}
                    </form>
                </FormProvider>
            </div>
        </div>
    );
};

export default EnglishTest;
