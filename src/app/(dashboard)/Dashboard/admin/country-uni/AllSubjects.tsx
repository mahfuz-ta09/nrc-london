import '@/css/Dashboard/admin/AllSubjects.css'


type Props = {
  isSubOPen: boolean
  uniName: string
  setIsSubOpen: React.Dispatch<React.SetStateAction<boolean>>
  setUniName: React.Dispatch<React.SetStateAction<string>>
}


const AllSubjects = ({ isSubOPen , setIsSubOpen , setUniName , uniName} : Props) => {
    return (
        <div className={isSubOPen?'allsubjects-cotainer subopen':'subclose'}>
            <button className='cancel-btn' onClick={()=>{setIsSubOpen(!isSubOPen);setUniName('')}}>X</button>
            
            <div className='allsubjects'>

                <div className="subjects-add-form-cont">
                    <h3>edit or add new subject to {uniName}</h3>

                    <form className="sub-add-form">
                        <input type="text" placeholder='Enter subject name' />
                        <input type="text" placeholder='Enter subject name' />
                        <button>add</button>
                    </form>
                    
                    <div className='sub-list'>
                        fsdf dsf sdfsdf
                    </div>
                </div>

            </div>
        </div>
    )
}

export default AllSubjects