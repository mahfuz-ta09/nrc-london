'use client'
import '@/css/TestPrep/CommonStyle.css'
import { usePathname } from "next/navigation"
import { useEffect, useState } from 'react'

interface TestType {
    name: string;
    full_abbreviation: string;
    purpose: string;
    description?: string;
}

export default function Page(){
    const pathname= usePathname()
    const paths= pathname.split('/')
    const [test, setTest] = useState<TestType | undefined>(undefined);

    useEffect(() => {
        fetch('/test.json')
            .then((res) => res.json())
            .then((data: TestType[]) => {
                if (paths[2]) {
                    setTest(data.find((s) => s.name.toLowerCase() === paths[2].toLowerCase()));
                } else {
                    console.error("Invalid path segment:", paths[2]);
                }
            })
            .catch((error) => console.error("Failed to fetch data:", error));
    }, []);
    
    // console.log(test)
    return (
        <div className='element-container'>
            <div className="test-banner">
                <div className="test-banner-content">
                    <h1 className='test-banner-content-header'>{test?.name}</h1>
                    <h1>{test?.full_abbreviation}</h1>
                    <p>{test?.purpose}</p>
                </div>
            </div>
            page:{pathname}
        </div>
    )
}



