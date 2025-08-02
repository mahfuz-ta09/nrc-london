import { useState } from 'react';

type PropsType = {
    action:string
    isUniOpen: boolean;
    setAction: React.Dispatch<React.SetStateAction<string>>
    setIsUniOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const testOptions = ["IELTS", "OITC", "TOEFL", "DUOLINGO","SAT","ACT","GRE",]

const AddUniversity: React.FC<PropsType> = ({ isUniOpen, setIsUniOpen , setAction , action }) => {
    const [selectedTests, setSelectedTests] = useState<{ [key: string]: string }>({})

    const handleTestSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selected = e.target.value;
        if (selected && !selectedTests[selected]) {
        setSelectedTests(prev => ({
            ...prev,
            [selected]: ''
        }))
        }
        e.target.value = ""
    }


    return (
        <div className={isUniOpen ? "country-mod cntry-open" : "cntry-close"}>
        <button className="close-modal" onClick={() => {setIsUniOpen(false);setAction('')}}>
            X
        </button>

        <div className="add-uni-container">
            <h5>{action} university</h5>

            <form className="country-submit-form">
            <label htmlFor="university" style={{ marginTop: '10px' }}>University Name</label>
            <input
                id="university"
                name="university"
                type="text"
                className="university"
                style={{ padding: '6px' }}
            />

            <label htmlFor="deposit" style={{ marginTop: '10px' }}>Initial Deposit</label>
            <input
                id="deposit"
                name="deposit"
                type="number"
                className="deposit"
                style={{ padding: '6px' }}
            />

            <label htmlFor="tuition" style={{ marginTop: '10px' }}>Tuition fee</label>
            <input
                id="tuition"
                name="tuition"
                type="number"
                className="tuition"
                style={{ padding: '6px' }}
            />

            <label htmlFor="qualifications" style={{ marginTop: '10px' }}>Required qualifications</label>
            <input
                id="qualifications"
                name="qualifications"
                type="text"
                className="qualifications"
                style={{ padding: '6px' }}
            />

            <label htmlFor="scholarship" style={{ marginTop: '10px' }}>Scholarship</label>
            <input
                id="scholarship"
                name="scholarship"
                type="number"
                className="scholarship"
                style={{ padding: '6px' }}
            />

            <label htmlFor="testSelect" style={{ marginTop: '10px' }}>Select Test</label>
            <select id="testSelect" onChange={handleTestSelect}  style={{ padding: '6px' }}>
                <option value="">-- Select a test --</option>
                {testOptions.map(test => (
                <option key={test} value={test}>{test}</option>
                ))}
            </select>

            {Object.entries(selectedTests).map(([test, score]) => (
                <div key={test} style={{ marginTop: '10px' }}>
                <label>{test} Score:</label>
                <input
                    type="number"
                    placeholder={`Enter ${test} score`}
                    style={{ padding: '6px', marginLeft: '10px' }}
                />
                </div>
            ))}

            <div className="country-add-btn-grp" style={{ marginTop: '16px' }}>
                <button type="submit">Submit</button>
            </div>
            </form>
        </div>
        </div>
    )
}

export default AddUniversity;
