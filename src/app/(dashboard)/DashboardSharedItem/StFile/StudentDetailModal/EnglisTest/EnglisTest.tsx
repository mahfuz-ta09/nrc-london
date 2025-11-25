"use client";
import React, { useState } from "react";
import { toast } from "react-toastify";
import EditableInput from "../EditableInput";
import Loader from "@/component/shared/loader/loader";
import { FormProvider, useForm } from "react-hook-form";
import { StudentListProps, examConfig } from "../../type";
import { useEditStudentFileMutation } from "@/redux/endpoints/studentfileprocess/proceedEndpoints";
import { useUserInfo } from "@/utils/useUserInfo";

interface formValue{
    englishProficiency: {
        [key: string]: {
            score?: number;
            date?: string;
            listening?: number;
            reading?: number;
            writing?: number;
            speaking?: number;
        };
    };
    permission: {
        permission_englishProficiency: string;
    };
    applicationState: {
        englishProficiency: {
            verified: string;
            complete: string;
        };
    };
}

const EnglishTest = ({ detailState, setdetailState }: StudentListProps) => {
    const userData = useUserInfo()
    const [isEditing, setIsEditing] = useState(false);
    const [editStudentFile,{ isLoading}] = useEditStudentFileMutation()
    

    const methods = useForm<formValue>({
        defaultValues: {
            englishProficiency: detailState?.data || {},
            permission: {
                permission_englishProficiency: '',
            },
            applicationState: {
                englishProficiency: {
                    verified: '',
                    complete: '',
                },
            },
        },
    });

    const { register, watch, setValue } = methods;
    const englishData = watch("englishProficiency");

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
    };

    const addExam = (exam: string) => {
        if (!exam) return;
        const updated = { ...englishData };
        if (!updated[exam]) {
            updated[exam] = {};
            setValue("englishProficiency", updated);
        }
    };

    const removeExam = (exam: string) => {
        const updated = { ...englishData };
        delete updated[exam];
        setValue("englishProficiency", updated);
    };

    if (!detailState.isOpen) return null;
    if (isLoading) return <Loader />;

    return (
        <div className={detailState.isOpen ? "modal-container openmoda-container" : "modal-container"}>
            <div className="modal-body">

                <h4 className="modal-header">{detailState?.title}</h4>

                <button
                    onClick={() => setdetailState({ isOpen: false, data: {}, title: "" })}
                    className="cancel-btn"
                >X</button>

                <div style={{ display: "flex", justifyContent: "end" }}>
                    {!isEditing ? (
                        <button className="add-btn" onClick={() => setIsEditing(true)}>
                            ✏️ Edit
                        </button>
                    ) : (
                        <button
                            className="add-btn"
                            style={{ backgroundColor: "#f55", color: "#fff" }}
                            onClick={() => setIsEditing(false)}
                        >
                            ✖ Cancel
                        </button>
                    )}
                </div>

                <FormProvider {...methods}>
                    <form onSubmit={methods.handleSubmit(onSubmit)} className="modal-content">
                        {isEditing && (
                            <div className="input-container">
                                <label>Want to add new test result?</label>
                                <select
                                    defaultValue=""
                                    onChange={(e) => {
                                        addExam(e.target.value);
                                        e.target.value = "";
                                    }}
                                >
                                    <option value="" disabled>Add new test...</option>

                                    {Object.keys(examConfig).map((exam) => (
                                        <option key={exam} value={exam}>
                                            {exam.toUpperCase()}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        )}


                        {Object.keys(englishData || {}).length === 0 && (
                            <p>No English test information available.</p>
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
                                        >
                                            ❌ Remove
                                        </button>
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
                                    {examConfig[exam]?.map((field: any) => (
                                        <EditableInput 
                                            key={field}
                                            name={`englishProficiency.${exam}.${field}`}
                                            label={field}
                                            readOnly={!isEditing}
                                        />
                                    ))}
                                </div>
                            </div>
                        ))}
                        {(isEditing && userData?.Urole !== 'student') && (
                        <div className="input-container">
                            <label>Allow student to edit this section?</label>
                            <select {...methods.register("permission.permission_englishProficiency")}>
                              <option value="">Select</option>
                              <option value="true">Yes</option>
                              <option value="false">No</option>
                            </select>
                        </div>
                        )}
                        {(isEditing && userData?.Urole !== 'student') && (
                        <div className="input-container">
                           <label>Information Verified?</label>
                            <select {...methods.register("applicationState.englishProficiency.verified")}>
                              <option value="">Select</option>
                              <option value="true">Verified</option>
                              <option value="false">Not Verified</option>
                            </select>
                        </div>
                        )}
                        {(isEditing && userData?.Urole !== 'student') && (
                        <div className="input-container">
                            <label>Section Complete?</label>
                            <select {...methods.register("applicationState.englishProficiency.complete")}>
                              <option value="">Select</option>
                              <option value="true">Complete</option>
                              <option value="false">Incomplete</option>
                            </select>
                        </div>
                        )}


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
  