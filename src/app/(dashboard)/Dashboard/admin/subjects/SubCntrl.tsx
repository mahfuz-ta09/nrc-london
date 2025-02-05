'use client'
import '@/css/Dashboard/admin/university.css'
import { useState } from 'react';

interface University {
    name: string;
    logo: string;
    ranking: string;
    tuitionFee: string;
    requiredDocs: string;
    applicationFee: string;
    duration: string;
    intakes: string;
    entryRequirements: string;
    applicationDeadlines: string;
}

const UpdateUni = () => {
    const [selectedUni, setSelectedUni] = useState<University & { index?: number } | null>(null)
    const [universities, setUniversities] = useState<University[]>([{
            name: "Oxford University",
            logo: "https://upload.wikimedia.org/wikipedia/en/d/d6/Oxford_university_coat_of_arms.svg",
            ranking: "#2",
            tuitionFee: "$45,000/year",
            requiredDocs: "Visa, TOEFL, SOP",
            applicationFee: "$100",
            duration: "36",
            intakes: "October",
            entryRequirements: "A-levels, GPA 3.8+",
            applicationDeadlines: "Jan 10",
        }
    ]);

    const handleEdit = (index:number) => {
        setSelectedUni({ ...universities[index], index })
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        if (selectedUni) {
            setSelectedUni({ ...selectedUni, [e.target.name]: e.target.value });
        }
    }
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
        e.preventDefault();
        
    }

    return (
        <form className="edit-university-form" onSubmit={handleSubmit}>
            <h2 className="form-title">Edit University</h2>

            <div className="form-group">
                <label htmlFor="name">University Name:</label>
                <input id="name" type="text" name="name" value={selectedUni?.name} onChange={handleChange} required />
            </div>

            <div className="form-group">
                <label htmlFor="logo">Logo URL:</label>
                <input id="logo" type="file" name="logo" value={selectedUni?.logo} onChange={handleChange} required />
            </div>

            <div className="form-group">
                <label htmlFor="ranking">Ranking:</label>
                <input id="ranking" type="text" name="ranking" value={selectedUni?.ranking} onChange={handleChange} required />
            </div>

            <div className="form-group">
                <label htmlFor="tuitionFee">Tuition Fee:</label>
                <input id="tuitionFee" type="text" name="tuitionFee" value={selectedUni?.tuitionFee} onChange={handleChange} required />
            </div>

            <div className="form-group">
                <label htmlFor="requiredDocs">Required Documents:</label>
                <input id="requiredDocs" type="text" name="requiredDocs" value={selectedUni?.requiredDocs} onChange={handleChange} required />
            </div>

            <div className="form-group">
                <label htmlFor="applicationFee">Application Fee:</label>
                <input id="applicationFee" type="text" name="applicationFee" value={selectedUni?.applicationFee} onChange={handleChange} required />
            </div>

            <div className="form-group">
                <label htmlFor="duration">Duration (Months):</label>
                <input id="duration" type="text" name="duration" value={selectedUni?.duration} onChange={handleChange} required />
            </div>

            <div className="form-group">
                <label htmlFor="intakes">Intakes:</label>
                <input id="intakes" type="text" name="intakes" value={selectedUni?.intakes} onChange={handleChange} required />
            </div>

            <div className="form-group">
                <label htmlFor="entryRequirements">Entry Requirements:</label>
                <input id="entryRequirements" type="text" name="entryRequirements" value={selectedUni?.entryRequirements} onChange={handleChange} required />
            </div>

            <div className="form-group">
                <label htmlFor="applicationDeadlines">Application Deadlines:</label>
                <input id="applicationDeadlines" type="text" name="applicationDeadlines" value={selectedUni?.applicationDeadlines} onChange={handleChange} required />
            </div>

            <div className="form-actions">
                <button type="submit" className="btn-update">Update</button>
            </div>
        </form>
    )
}

export default UpdateUni