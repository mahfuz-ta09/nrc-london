'use client';
import '@/css/TestPrep/CommonStyle.css';
import Footer from '@/component/shared/Footer/Footer';
import FAQ from '@/component/UI/FAQ/FAQ';
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from 'react';

interface TestType {
    name: string;
    abbreviation: string;
    targetAudience?: string;
    purpose: string;
    test_type: string;
    description?: string;
    format?: Array<{
        module: string;
        sections: number;
        questions?: number;
        duration: string;
        focus: string;
    }>;
    faq?: Array<{
        question: string;
        answer: string;
    }>;
    types?: Array<{
        type: string;
        description: string;
    }>;
    details?: {
        purpose_of_test?: string;
    };
}

const Page = () => {
    const pathname = usePathname();
    const paths = pathname.split('/');
    const router = useRouter();
    const [test, setTest] = useState<TestType | undefined>(undefined);
    
    useEffect(() => {
        fetch('/t.json')
            .then((res) => res.json())
            .then((data: TestType[]) => {
                if (paths[2]) {
                    setTest(data.find((s) => s?.name?.toLowerCase() === paths[2].toLowerCase()));
                } else {
                    console.error("Invalid path segment:", paths[2]);
                }
            })
            .catch((error) => console.error("Failed to fetch data:", error));
    }, [])

    return (
        <div className="element-container">
            <div className="test-banner">
                <div className="test-banner-container">
                    <div className="test-banner-content">
                        <h1 className="test-banner-content-header">{test?.name}</h1>
                        <h1 className="header-abbri">{test?.abbreviation}</h1>
                        <button onClick={() => router.push('/Contact')}>Contact</button>
                    </div>
                </div>
            </div>

            <div className="details-container">
                <div className="questions">
                    <div className="question">
                        <h1 className="question-main">What is the <span>purpose of {test?.name}?</span></h1>
                        <p className="answer">{test?.purpose}</p>
                        <h1 className="question-main">Types of <span>{test?.name} test</span></h1>
                        <p className="answer">{test?.test_type}</p>
                    </div>

                    <div className="type-container">
                        <div className="types">
                            {test?.types?.map((item, index) => (
                                <div className="type" key={index}>
                                    <h1 className="type-header">{item?.type}</h1>
                                    <h1 className="type-details">{item?.description}</h1>
                                </div>
                            ))}
                        </div>

                        <div className="table-contant">
                            <table>
                                <thead>
                                    <tr>
                                        <th>Module</th>
                                        <th>Sections</th>
                                        <th>Questions</th>
                                        <th>Duration</th>
                                        <th>Focus</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {test?.format?.map((item, index) => (
                                        <tr key={index}>
                                            <td>{item?.module ?? "--"}</td>
                                            <td>{item?.sections ?? "--"}</td>
                                            <td>{item?.questions ?? "--"}</td>
                                            <td>{item?.duration ?? "--"}</td>
                                            <td>{item?.focus ?? "--"}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                <div className="question">
                    <h1 className="question-main">{test?.name?.toLocaleLowerCase()} scoring <span>scoring patterns</span></h1>
                    <p className="answer">{test?.targetAudience}</p>
                </div>

                <div className="table-contant">
                    <table>
                        <thead>
                            <tr>
                                <th>Module</th>
                                <th>Sections</th>
                                <th>Questions</th>
                                <th>Duration</th>
                                <th>Focus</th>
                            </tr>
                        </thead>
                        <tbody>
                            {test?.format?.map((item, index) => (
                                <tr key={index}>
                                    <td>{item?.module ?? "--"}</td>
                                    <td>{item?.sections ?? "--"}</td>
                                    <td>{item?.questions ?? "--"}</td>
                                    <td>{item?.duration ?? "--"}</td>
                                    <td>{item?.focus ?? "--"}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            <FAQ items={test?.faq} title="Frequently Asked Questions"  color="black"/>
            <Footer />
        </div>
    );
};

export default Page;
