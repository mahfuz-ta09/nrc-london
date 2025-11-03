'use client'
import '@/css/component/Form.css'
import '@/css/component/Modal.css'
import { StudentListProps } from '../type';
import PersonalInfo from './PersonalInfo';
import AssignedUniSub from './AssignedUniSub/AssignedUniSub';
import AllFIle from './AllFIle/AllFIle';

const StudentDetailModal = ({ detailState, setdetailState }: StudentListProps) => {


    if (detailState?.title === 'personal information') return <PersonalInfo detailState={detailState} setdetailState={setdetailState} />

    if (detailState?.title === 'all files') return <AllFIle detailState={detailState} setdetailState={setdetailState} />
    
    if (detailState?.title === 'assigned university & subjects') return <AssignedUniSub detailState={detailState} setdetailState={setdetailState} />

    return null;
};

export default StudentDetailModal;
