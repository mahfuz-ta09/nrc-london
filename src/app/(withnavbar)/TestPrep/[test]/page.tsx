'use client'
import '@/css/TestPrep/CommonStyle.css'
import Footer from '@/component/shared/Footer/Footer'
import FAQ from '@/component/UI/FAQ/FAQ'
import { usePathname, useRouter } from "next/navigation"
import { useEffect, useState } from 'react'

interface TestType {
    name: string;
    full_abbreviation: string;
    targetAudience?: string;
    purpose: string;
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
    const pathname= usePathname()
    const paths= pathname.split('/')
    const router = useRouter()
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
        <div className='element-container'>
            <div className="test-banner">
                <div className="test-banner-container">
                    <div className="test-banner-content">
                        <h1 className='test-banner-content-header'>{test?.name}</h1>
                        <h1 className='header-abbri'>{test?.full_abbreviation}</h1>
                        <p className='header-abbri'>{test?.purpose}</p>
                        <p className='header-addition'>{test?.purpose}</p>
                        <button onClick={()=>router.push('/Contact')}>Contact</button>
                    </div>
                </div>
            </div>

            <div className="details-container">

                <div className="questions">
                        
                    {/* {
                        paths.slice(1,paths.length-1)?.map((path,index)=>(
                            <div key={index} className="breadcrumb">
                                <p className="breadcrumb-item">Home</p>
                                <p className="breadcrumb-item">{path}</p>
                            </div>
                        ))
                    } */}
                    

                    <div className="question">
                        <h1 className="question-main">What is the <span>purpose of ielts?</span></h1>
                        <p className="answer">{test?.targetAudience} Lorem ipsum dolor sit, amet consectetur adipisicing elit. Illo accusamus ab nisi pariatur voluptates, molestiae ut quibusdam ullam sunt aliquid tempora error hic sit. Reiciendis harum corrupti, minima, officiis ex deleniti quisquam vitae natus nisi deserunt nostrum provident adipisci recusandae.
                        </p>
                        <h1 className="question-main">Types of <span>{test?.name} test</span></h1>
                        <p className="answer">Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit doloribus esse quas, mollitia delectus amet temporibus cum eum veritatis dolore illo sequi fuga fugit doloremque necessitatibus molestiae consequuntur? Vero beatae et quasi libero sequi omnis debitis minus cupiditate modi rem.</p>
                    </div>

                    <div className="type-container">
                        <div className="types">
                            {
                                test?.types?.map((item, index) => (
                                    <div className='type' key={index}>
                                        <h1 className='type-header'>{item?.type}</h1>
                                        <h1 className='type-details'>{item?.description}</h1>
                                    </div>
                                ))
                            }
                        </div>
                        <div className="table-container">
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
                                {
                                    test?.format?.map((item,index)=>(
                                        <tr key={index}>
                                            <td>{item?.module? item?.module :"--"}</td>
                                            <td>{item?.sections? item?.sections :"--"}</td>
                                            <td>{item?.questions? item?.questions :"--"}</td>
                                            <td>{item?.duration? item?.duration :"--"}</td>
                                            <td>{item?.focus? item?.focus :"--"}</td>
                                        </tr>))
                                }
                            </tbody>
                        </table>
                        </div>
                    </div>

                </div>
                
                <div className="question">
                        <h1 className="question-main">{test?.name?.toLocaleLowerCase()} scoring <span>scoring patterns</span></h1>
                        <p className="answer">
                            {test?.targetAudience} Lorem ipsum dolor sit, amet consectetur adipisicing elit. Illo accusamus ab nisi pariatur voluptates, molestiae ut quibusdam ullam sunt aliquid tempora error hic sit. Reiciendis harum corrupti, minima, officiis ex deleniti quisquam vitae natus nisi deserunt nostrum provident adipisci recusandae.
                        </p>
                </div>
                <div className="table-container">
                    
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
                            {
                                test?.format?.map((item,index)=>(
                                    <tr key={index}>
                                        <td>{item?.module? item?.module :"--"}</td>
                                        <td>{item?.sections? item?.sections :"--"}</td>
                                        <td>{item?.questions? item?.questions :"--"}</td>
                                        <td>{item?.duration? item?.duration :"--"}</td>
                                        <td>{item?.focus? item?.focus :"--"}</td>
                                    </tr>))
                            }
                        </tbody>
                    </table>
                </div>
            </div>
            <FAQ items={test?.faq} title="Frequently Asked Questions"/>
            <Footer />
        </div>
        
    )
}

export default Page


