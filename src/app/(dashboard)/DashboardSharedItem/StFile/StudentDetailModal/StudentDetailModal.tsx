'use client'
import History from './History/History';
import AllFIle from './AllFIle/AllFIle';
import { StudentListProps } from '../type';
import PersonalInfo from './PersonalInfo';
import EnglisTest from './EnglisTest/EnglisTest';
import AssignedUniSub from './AssignedUniSub/AssignedUniSub';
import EducationalBack from './EducationalBack/EducationalBack';


const StudentDetailModal = ({ detailState, setdetailState }: StudentListProps) => {

    
    if (detailState?.title === 'personal information') return <PersonalInfo detailState={detailState} setdetailState={setdetailState} />

    if (detailState?.title === 'all files') return <AllFIle detailState={detailState} setdetailState={setdetailState} />
    
    if (detailState?.title === 'assigned university & subjects/ search course') return <AssignedUniSub detailState={detailState} setdetailState={setdetailState} />
    
    if (detailState?.title === 'english test') return <EnglisTest detailState={detailState} setdetailState={setdetailState} />
    
    if (detailState?.title === 'educational background') return <EducationalBack detailState={detailState} setdetailState={setdetailState} />
    
    if (detailState?.title === 'history timeline') return <History detailState={detailState} setdetailState={setdetailState} />

    return null;
};

export default StudentDetailModal;
