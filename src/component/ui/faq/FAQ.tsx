import '@/css/additional/FAQ/FAQ.css';

interface FAQItem {
  question?: string;
  answer?: string;
}

interface FAQProps {
  items?: FAQItem[];
  title?: string;
  color?: string;
}

const FAQ: React.FC<FAQProps> = ({ items, title = "Frequently Asked Questions", color }) => {
    return (
      <div style={{ color: `${color}` }} className="faq-container">
        <div className="faq-content">

          <div className="services-header">
            <h4 className="option-subtitle">❓ Got Questions</h4>
            <h2 className="home-text-header" style={{ color: "#000" }}>
              Frequently <span >Asked Questions</span>
            </h2>
            <p>
              We’ve answered some of the most common questions to help you better understand our process and services.  
              If you don’t find what you’re looking for, feel free to reach out to our support team.
            </p>
          </div>

          <div className="faq-questions">
            {items?.map((item, index) => (
              <div className="faq-question" key={index}>
                <input id={`q${index}`} type="checkbox" className="panel" />
                <div className="plus">+</div>
                <label htmlFor={`q${index}`} className="panel-title">
                  {item.question}
                </label>
                <div className="panel-content">{item.answer}</div>
              </div>
            ))}
          </div>

        </div>
      </div>
    );
};

export default FAQ;
