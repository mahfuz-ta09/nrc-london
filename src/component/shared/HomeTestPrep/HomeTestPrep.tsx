"use client";
import '../../../css/shared/HomeTestPrep/HomeTestPrep.css'
import { useEffect, useRef, useState } from "react";
import { useRouter } from 'next/navigation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowAltCircleLeft, faArrowAltCircleRight } from '@fortawesome/free-solid-svg-icons';

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

const HomeTestPrep = () => {
    const router = useRouter()    
    const scrollContainerRef = useRef<HTMLDivElement>(null)
    const [test, setTest] = useState<any[]>([])
        
    useEffect(() => {
        fetch('/t.json')
            .then((res) => res.json())
            .then((data) => {
                setTest(data)
            })
            .catch((error) => console.error("Failed to fetch data:", error))
    }, [])

    const scroll = (direction: 'left' | 'right') => {
        if (scrollContainerRef.current) {
            const scrollAmount = 250
            scrollContainerRef.current.scrollBy({
                left: direction === 'left' ? -scrollAmount : scrollAmount,
                behavior: 'smooth'
            });
        }
    }


    

    return (
        <div className='homeTest-container'>
            <div className="wdth">
                <h2 className='uniHeader'>Get prepared for your future journey</h2>
                
                <div className="homeTest-content" ref={scrollContainerRef}>
                    <div style={{minWidth:`${250*11}px`}}  className="homeTestcaro">
                        {
                            test?.map((option:any,index:number)=>
                            <div key={index} className="test">
                                    <h3>Prepare for {option?.name}</h3>
                                    <p>{option?.purpose.slice(0,30)}...</p>
                                    <button onClick={()=> router.push(`/TestPrep/${option.name.toLowerCase()}`)}>details <FontAwesomeIcon icon={faArrowAltCircleRight}/> </button>
                            </div>)
                        }
                    </div>
                </div>

                <div className="uni-nav">
                    <button onClick={()=>scroll('left')}  className='uni-nav-nav-btn'><FontAwesomeIcon icon={faArrowAltCircleLeft}/></button>
                    <button onClick={()=>scroll('right')}  className='uni-nav-nav-btn'><FontAwesomeIcon icon={faArrowAltCircleRight} /></button>
                </div>
            </div>
        </div>
    )
}

export default HomeTestPrep;
