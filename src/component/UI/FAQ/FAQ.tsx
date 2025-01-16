import '@/css/additional/FAQ/FAQ.css';

interface FAQItem {
  question?: string;
  answer?: string;
}

interface FAQProps {
  items?: FAQItem[];
  title?: string;
}

const FAQ: React.FC<FAQProps> = ({ items, title = "Frequently Asked Questions" }) => {

    return (
        <div className="faq-container">
        <div className="faq-content">
            {title && <div className="faq-header">{title}</div>}
            <div className="faq-questions">
            {items?.map((item, index) => (
                <div className="faq-question" key={index}>
                <input id={`q${index}`} type="checkbox" className="panel" />
                <div className="plus">+</div>
                <label htmlFor={`q${index}`} className="panel-title">{item.question}</label>
                <div className="panel-content">{item.answer}</div>
                </div>
            ))}
            </div>
        </div>
        </div>
    )
};

export default FAQ;
