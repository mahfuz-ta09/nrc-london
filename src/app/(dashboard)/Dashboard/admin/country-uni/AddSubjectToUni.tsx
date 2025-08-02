import { useState } from "react";


type PropsType = {
    uniName:string
    setUniName:React.Dispatch<React.SetStateAction<string>>
    isAddSubOpen: boolean;
    setIsAddSubOpen: React.Dispatch<React.SetStateAction<boolean>>
}
const testOptions = ["IELTS", "OITC", "TOEFL", "DUOLINGO","SAT","ACT","GRE",]

const AddSubjectToUni = ({ isAddSubOpen , setIsAddSubOpen , setUniName , uniName }:PropsType) => {
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


    // const 
    
    return (
        <div className={isAddSubOpen?"country-mod cntry-open":"cntry-close"}>
            <button className="close-modal" onClick={()=>{setIsAddSubOpen(false);setUniName('')}}>X</button>
            <div className="add-uni-container">
                <h5>add subject to {uniName}</h5>
                
                <form className="country-submit-form">
                    <label htmlFor="country">Country Name</label>
                    <input type="text" className="cntry-name-in"/>

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

                    <label htmlFor="serial">Order you want to show in landing page:</label>
                    <input type="number"  className="cntry-name-in"/>

                    <div className="country-add-btn-grp">
                        <button type="button">Add Another</button>
                        <button type="submit">Submit</button>
                    </div>
                </form>

            </div>
        </div>
    )
}

export default AddSubjectToUni