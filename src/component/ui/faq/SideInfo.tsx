import React from 'react';
import { useRouter } from 'next/navigation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faGraduationCap, 
  faHeadset, 
  faUsers, 
  faPaperPlane 
} from "@fortawesome/free-solid-svg-icons";


const SideInfo = () => {
    const router = useRouter();
    const services = [
        {
            icon: faGraduationCap,
            title: 'Explore Services',
            description: 'Discover our complete range of study abroad and academic consulting services designed to guide you every step of the way.',
            link: '/services'
        },
        {
            icon: faHeadset,
            title: 'Get in Touch',
            description: 'Have questions? Speak with our expert advisors for personalized guidance and quick support anytime.',
            link: '/contact'
        },
        {
            icon: faUsers,
            title: 'Who We Are',
            description: 'Learn more about our mission, values, and how we have helped students build successful academic journeys worldwide.',
            link: '/about-us'
        },
        {
            icon: faPaperPlane,
            title: 'Apply Now',
            description: 'Start your journey today! Submit your application and let our team handle documentation, guidance, and submission.',
            link: '/proceed'
        }
    ];

    return (
        <div className="sidebar-container">
            <h3 className="sidebar-heading">Our Services</h3>
            
            {services.map((service, index) => (
                <div key={index} className="service-card">
                    <div className="icon-wrapper">
                        <FontAwesomeIcon icon={service.icon} className="service-icon" />
                    </div>
                    
                    <h4 className="service-title">{service.title}</h4>
                    
                    <p className="service-description">{service.description}</p>
                    
                    <button 
                        className="service-btn"
                        onClick={() => router.push(service.link)}
                    >
                        Learn More
                        <span className="btn-arrow">→</span>
                    </button>
                </div>
            ))}

            <style jsx>{`
                .sidebar-container {
                    width: 100%;
                    // background: #f8f9fa;
                    border-radius: 16px;
                    // padding: 25px;
                    display: flex;
                    // flex-direction: column;
                    flex-wrap:wrap;
                    gap: 20px;
                }

                .sidebar-heading {
                    font-size: 1.5rem;
                    font-weight: 800;
                    color: #212529;
                    margin: 0 0 10px 0;
                    text-align: center;
                    letter-spacing: -0.5px;
                }

                .service-card {
                    background: #ffffff;
                    border-radius: 12px;
                    padding: 25px;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    gap: 18px;
                    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
                    transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
                    border: 1px solid transparent;
                }

                .service-card:hover {
                    transform: translateY(-4px);
                    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.12);
                    border-color: teal;
                }

                .icon-wrapper {
                    width: 70px;
                    height: 70px;
                    background: linear-gradient(135deg, #e8f5f4, #d1ebe9);
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    transition: all 0.3s ease;
                }

                .service-card:hover .icon-wrapper {
                    // background: linear-gradient(135deg, #F9C748, #f7b924);
                    transform: scale(1.1) rotate(5deg);
                }

                .service-icon {
                    width: 28px;
                    height: 28px;
                    color: #008080;
                    transition: color 0.3s ease;
                }

                .service-card:hover .service-icon {
                    color: #000;
                }

                .service-title {
                    font-size: 1.125rem;
                    font-weight: 700;
                    color: #212529;
                    text-align: center;
                    margin: 0;
                    line-height: 1.3;
                }

                .service-description {
                    text-align: center;
                    line-height: 1.6;
                    font-size: 0.9rem;
                    font-weight: 400;
                    color: #6c757d;
                    margin: 0;
                }

                .service-btn {
                    padding: 8px 18px;
                    font-size: 0.575rem;
                    font-weight: 700;
                    text-transform: uppercase;
                    letter-spacing: 0.5px;
                    border-radius: 50px;
                    background: linear-gradient(135deg, #008080, #006666);
                    color: #fff;
                    border: none;
                    cursor: pointer;
                    transition: all 0.3s ease;
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    box-shadow: 0 4px 12px rgba(0, 128, 128, 0.3);
                }

                .service-btn:hover {
                    background: linear-gradient(135deg, #006666, #004d4d);
                    transform: translateY(-2px);
                    box-shadow: 0 6px 18px rgba(0, 128, 128, 0.4);
                }

                .service-btn:active {
                    transform: translateY(0);
                }

                .btn-arrow {
                    font-size: 1.1rem;
                    transition: transform 0.3s ease;
                }

                .service-btn:hover .btn-arrow {
                    transform: translateX(3px);
                }

                /* Responsive Design */
                @media screen and (max-width: 768px) {
                    .sidebar-container {
                        padding: 20px;
                        gap: 18px;
                    }

                    .sidebar-heading {
                        font-size: 1.375rem;
                        margin-bottom: 8px;
                    }

                    .service-card {
                        padding: 25px 20px;
                        gap: 16px;
                    }

                    .icon-wrapper {
                        width: 65px;
                        height: 65px;
                    }

                    .service-icon {
                        width: 26px;
                        height: 26px;
                    }

                    .service-title {
                        font-size: 1.05rem;
                    }

                    .service-description {
                        font-size: 0.875rem;
                    }

                    .service-btn {
                        padding: 11px 24px;
                        font-size: 0.8rem;
                    }
                }

                @media screen and (max-width: 480px) {
                    .sidebar-container {
                        padding: 18px;
                        border-radius: 12px;
                    }

                    .sidebar-heading {
                        font-size: 1.25rem;
                    }

                    .service-card {
                        padding: 22px 18px;
                        gap: 14px;
                        border-radius: 10px;
                    }

                    .icon-wrapper {
                        width: 60px;
                        height: 60px;
                    }

                    .service-icon {
                        width: 24px;
                        height: 24px;
                    }

                    .service-title {
                        font-size: 1rem;
                    }

                    .service-description {
                        font-size: 0.85rem;
                        line-height: 1.5;
                    }

                    .service-btn {
                        padding: 10px 22px;
                        font-size: 0.75rem;
                        width: 100%;
                        justify-content: center;
                    }
                }

                /* Print Styles */
                @media print {
                    .service-btn {
                        display: none;
                    }

                    .service-card {
                        box-shadow: none;
                        border: 1px solid #ddd;
                        page-break-inside: avoid;
                    }
                }
            `}</style>
        </div>
    );
};

export default SideInfo;