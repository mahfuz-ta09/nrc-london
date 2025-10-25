"use client";
import { useState } from "react";
import { examConfig } from "../type";

interface EnglishProps {
  register: any;
}



const English = ({ register }: EnglishProps) => {
    const [selectedExams, setSelectedExams] = useState<string[]>([]);

    const addExam = (exam: string) => {
        if (exam && !selectedExams.includes(exam)) {
        setSelectedExams([...selectedExams, exam]);
        }
    };

    const removeExam = (exam: string) => {
        setSelectedExams(selectedExams.filter((e) => e !== exam));
    };

    return (
        <>
        <h3 className="phase-title">phase 2: english test</h3>

        <div className="input-container">
            <select
            defaultValue=""
            onChange={(e) => {
                addExam(e.target.value);
                e.target.value = "";
            }}
            >
            <option value="" disabled>
                Select a test...
            </option>
            {Object.keys(examConfig).map((exam) => (
                <option key={exam} value={exam}>
                {exam.toUpperCase()}
                </option>
            ))}
            </select>
        </div>

        {selectedExams.map((exam:any) => (
            <div key={exam} className="exam-section" style={{ marginTop: "1rem" }}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
                <h4>{exam.toUpperCase()}</h4>
                <button type="button" className="remove-btn" onClick={() => removeExam(exam)}>
                ❌ Remove
                </button>
            </div>

            <div className="exam-fields" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "10px" }}>
                {examConfig[exam].map((field:any) => (
                <div key={field} className="input-container">
                    <label>{field}</label>
                    <input
                    type={field === "date" ? "date" : "number"}
                    {...register(`englishProficiency.${exam}.${field}`)}
                    />
                </div>
                ))}
            </div>
            </div>
        ))}
        </>
    );
};

export default English;
