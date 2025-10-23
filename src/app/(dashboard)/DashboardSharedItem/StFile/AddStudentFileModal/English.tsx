

const English = ({register}:{register:any}) => {
    return (
        <>
        <h3 className="phase-title">phase 2: english test</h3>
        <div className="exam-accordion">
            <div className="exam-item">
                <input id="exam1" type="checkbox" className="exam-toggle" />
                <div className="exam-plus">+</div>
                <label htmlFor="exam1" className="exam-title">IELTS</label>
                <div className="exam-content">
                    <div className="input-container"><label>Listening</label><input type="number" {...register("englishProficiency.ielts.listening")} /></div>
                    <div className="input-container"><label>Reading</label><input type="number" {...register("englishProficiency.ielts.reading")} /></div>
                    <div className="input-container"><label>Writing</label><input type="number" {...register("englishProficiency.ielts.writing")} /></div>
                    <div className="input-container"><label>Speaking</label><input type="number" {...register("englishProficiency.ielts.speaking")} /></div>
                    <div className="input-container"><label>Overall</label><input type="number" {...register("englishProficiency.ielts.overall")} /></div>
                    <div className="input-container"><label>Date</label><input type="date" {...register("englishProficiency.ielts.date")} /></div>
                    <div className="input-container"><label>TRF Number</label><input type="text" {...register("englishProficiency.ielts.trfNumber")} /></div>
                    <div className="input-container"><label>Test Type</label><input type="text" {...register("englishProficiency.ielts.testType")} /></div>
                </div>
            </div>
            
            <div className="exam-item">
                <input id="exam2" type="checkbox" className="exam-toggle" />
                <div className="exam-plus">+</div>
                <label htmlFor="exam2" className="exam-title">TOEFL</label>
                <div className="exam-content">
                    <div className="input-container"><label>Reading</label><input type="number" {...register("englishProficiency.toefl.reading")} /></div>
                    <div className="input-container"><label>Listening</label><input type="number" {...register("englishProficiency.toefl.listening")} /></div>
                    <div className="input-container"><label>Speaking</label><input type="number" {...register("englishProficiency.toefl.speaking")} /></div>
                    <div className="input-container"><label>Writing</label><input type="number" {...register("englishProficiency.toefl.writing")} /></div>
                    <div className="input-container"><label>Total</label><input type="number" {...register("englishProficiency.toefl.total")} /></div>
                    <div className="input-container"><label>Date</label><input type="date" {...register("englishProficiency.toefl.date")} /></div>
                </div>
            </div>
            
            <div className="exam-item">
                <input id="exam3" type="checkbox" className="exam-toggle" />
                <div className="exam-plus">+</div>
                <label htmlFor="exam3" className="exam-title">PTE</label>
                <div className="exam-content">
                    <div className="input-container"><label>Reading</label><input type="number" {...register("englishProficiency.pte.reading")} /></div>
                    <div className="input-container"><label>Listening</label><input type="number" {...register("englishProficiency.pte.listening")} /></div>
                    <div className="input-container"><label>Speaking</label><input type="number" {...register("englishProficiency.pte.speaking")} /></div>
                    <div className="input-container"><label>Writing</label><input type="number" {...register("englishProficiency.pte.writing")} /></div>
                    <div className="input-container"><label>Total</label><input type="number" {...register("englishProficiency.pte.total")} /></div>
                    <div className="input-container"><label>Date</label><input type="date" {...register("englishProficiency.pte.date")} /></div>
                </div>
            </div>
            
            <div className="exam-item">
                <input id="exam4" type="checkbox" className="exam-toggle" />
                <div className="exam-plus">+</div>
                <label htmlFor="exam4" className="exam-title">Duolingo</label>
                <div className="exam-content">
                    <div className="input-container"><label>Reading</label><input type="number" {...register("englishProficiency.duolingo.reading")} /></div>
                    <div className="input-container"><label>Listening</label><input type="number" {...register("englishProficiency.duolingo.listening")} /></div>
                    <div className="input-container"><label>Speaking</label><input type="number" {...register("englishProficiency.duolingo.speaking")} /></div>
                    <div className="input-container"><label>Writing</label><input type="number" {...register("englishProficiency.duolingo.writing")} /></div>
                    <div className="input-container"><label>Total</label><input type="number" {...register("englishProficiency.duolingo.total")} /></div>
                    <div className="input-container"><label>Date</label><input type="date" {...register("englishProficiency.duolingo.date")} /></div>
                </div>
            </div>
            
            <div className="exam-item">
                <input id="exam5" type="checkbox" className="exam-toggle" />
                <div className="exam-plus">+</div>
                <label htmlFor="exam5" className="exam-title">GRE</label>
                <div className="exam-content">
                    <div className="input-container"><label>Verbal</label><input type="number" {...register("englishProficiency.gre.verbal")} /></div>
                    <div className="input-container"><label>Quantitative</label><input type="number" {...register("englishProficiency.gre.quantitative")} /></div>
                    <div className="input-container"><label>Writing</label><input type="number" {...register("englishProficiency.gre.writing")} /></div>
                    <div className="input-container"><label>Overall</label><input type="number" {...register("englishProficiency.gre.overall")} /></div>
                    <div className="input-container"><label>Date</label><input type="date" {...register("englishProficiency.gre.date")} /></div>
                </div>
            </div>
            
            <div className="exam-item">
                <input id="exam6" type="checkbox" className="exam-toggle" />
                <div className="exam-plus">+</div>
                <label htmlFor="exam6" className="exam-title">GMAT</label>
                <div className="exam-content">
                    <div className="input-container"><label>Verbal</label><input type="number" {...register("englishProficiency.gmat.verbal")} /></div>
                    <div className="input-container"><label>Reasoning</label><input type="number" {...register("englishProficiency.gmat.reasoning")} /></div>
                    <div className="input-container"><label>Quantitative</label><input type="number" {...register("englishProficiency.gmat.quantitative")} /></div>
                    <div className="input-container"><label>Writing</label><input type="number" {...register("englishProficiency.gmat.writing")} /></div>
                    <div className="input-container"><label>Overall</label><input type="number" {...register("englishProficiency.gmat.overall")} /></div>
                    <div className="input-container"><label>Date</label><input type="date" {...register("englishProficiency.gmat.date")} /></div>
                </div>
            </div>
            
            <div className="exam-item">
                <input id="exam7" type="checkbox" className="exam-toggle" />
                <div className="exam-plus">+</div>
                <label htmlFor="exam7" className="exam-title">SAT</label>
                <div className="exam-content">
                    <div className="input-container"><label>Math</label><input type="number" {...register("englishProficiency.sat.math")} /></div>
                    <div className="input-container"><label>Reasoning</label><input type="number" {...register("englishProficiency.sat.reasoning")} /></div>
                    <div className="input-container"><label>Quantitative</label><input type="number" {...register("englishProficiency.sat.quantitative")} /></div>
                    <div className="input-container"><label>Writing</label><input type="number" {...register("englishProficiency.sat.writing")} /></div>
                    <div className="input-container"><label>Reading</label><input type="number" {...register("englishProficiency.sat.reading")} /></div>
                    <div className="input-container"><label>Overall</label><input type="number" {...register("englishProficiency.sat.overall")} /></div>
                    <div className="input-container"><label>Date</label><input type="date" {...register("englishProficiency.sat.date")} /></div>
                </div>
            </div>
            
            <div className="exam-item">
                <input id="exam8" type="checkbox" className="exam-toggle" />
                <div className="exam-plus">+</div>
                <label htmlFor="exam8" className="exam-title">ACT</label>
                <div className="exam-content">
                    <div className="input-container"><label>Math</label><input type="number" {...register("englishProficiency.act.math")} /></div>
                    <div className="input-container"><label>Reasoning</label><input type="number" {...register("englishProficiency.act.reasoning")} /></div>
                    <div className="input-container"><label>Quantitative</label><input type="number" {...register("englishProficiency.act.quantitative")} /></div>
                    <div className="input-container"><label>Writing</label><input type="number" {...register("englishProficiency.act.writing")} /></div>
                    <div className="input-container"><label>Reading</label><input type="number" {...register("englishProficiency.act.reading")} /></div>
                    <div className="input-container"><label>Overall</label><input type="number" {...register("englishProficiency.act.overall")} /></div>
                    <div className="input-container"><label>Date</label><input type="date" {...register("englishProficiency.act.date")} /></div>
                </div>
            </div>
        </div>
        </>
    )
}

export default English
