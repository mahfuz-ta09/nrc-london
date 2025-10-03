'use client'
import '../../../css/shared/Process/Process.css'
import Link from 'next/link'

const Process = () => {
    const steps = [
        {
        step: 'Step 1',
        title: 'Initial Consultation',
        description:
            'Discuss your study abroad goals, preferred countries, and eligibility with our experts.',
        },
        {
        step: 'Step 2',
        title: 'University & Course Selection',
        description:
            'Choose from top universities based on your academic background, career goals, and budget.',
        },
        {
        step: 'Step 3',
        title: 'Application & Documentation',
        description:
            'Prepare and submit your application along with required documents like SOPs, LORs, and transcripts.',
        },
        {
        step: 'Step 4',
        title: 'Visa Processing',
        description:
            'Submit your student visa application, attend interviews, and meet financial requirements.',
        },
        {
        step: 'Step 5',
        title: 'Pre-Departure Guidance',
        description:
            'Get travel, accommodation, and orientation support before your study abroad journey begins.',
        },
    ]

    return (
        <section className="process-container">
            <div className="services-header">
                <h4 className="option-subtitle">✨ How We Work</h4>
                <h2 className="home-text-header" style={{ color: "#000" }}>
                    Our <span style={{ color: "#008080" }}>Step-by-Step Process</span>
                </h2>
                <p>
                    From your first consultation to your successful enrollment abroad, our proven process ensures
                    a smooth, transparent, and stress-free journey. Here’s how we make your dream a reality.
                </p>
            </div>


            <div className="process-grid">
                {steps.map((item, index) => (
                <div key={index} className="process-card">
                    <div className="step-number">{item.step}</div>
                    <h3 className="step-title">{item.title}</h3>
                    <p className="step-description">{item.description}</p>
                </div>
                ))}
            </div>
        </section>
    )
}

export default Process
