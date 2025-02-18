import '../../../css/shared/Process/Process.css'


const Process = () => {
    return (
        <div className='process-container'>
            <div className="process-content">
                <h1>How We Work</h1>
                <ul className="process-timeline">
                <li className="process-timeline-item" style={{ '--accent-color': '#004a62' } as React.CSSProperties}>
                    <div className="date">Step 1</div>
                    <div className="title">Initial Consultation</div>
                    <div className="descr">Discuss your study abroad goals, preferred countries, and eligibility with our experts.</div>
                </li>
                <li className="process-timeline-item" style={{ '--accent-color': '#004a62' } as React.CSSProperties}>
                    <div className="date">Step 2</div>
                    <div className="title">University & Course Selection</div>
                    <div className="descr">Choose from top universities based on your academic background, career goals, and budget.</div>
                </li>
                <li className="process-timeline-item" style={{ '--accent-color': '#004a62' } as React.CSSProperties}>
                    <div className="date">Step 3</div>
                    <div className="title">Application & Documentation</div>
                    <div className="descr">Prepare and submit your university application along with required documents like SOPs, LORs, and transcripts.</div>
                </li>
                <li className="process-timeline-item" style={{ '--accent-color': '#004a62' } as React.CSSProperties}>
                    <div className="date">Step 4</div>
                    <div className="title">Visa Processing</div>
                    <div className="descr">Submit your student visa application, attend interviews, and meet financial requirements.</div>
                </li>
                <li className="process-timeline-item" style={{ '--accent-color': '#004a62' } as React.CSSProperties}>
                    <div className="date">Step 5</div>
                    <div className="title">Pre-Departure Guidance</div>
                    <div className="descr">Receive travel, accommodation, and orientation support to prepare for your study abroad journey.</div>
                </li>
            </ul>

            </div>
        </div>
    );
};

export default Process;
