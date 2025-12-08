import { useUserInfo } from '@/utils/useUserInfo';

const Final = ({register}:{register:any}) => {
    const info = useUserInfo();
    
    return (
        <>
          <h3 className="phase-title">Phase 4: Finalize</h3>
          <div style={{margin:"10px 0 30px"}} className="input-container">
            <label>ever refused by any country?</label>
            <input type="text" placeholder='comma separated, e.g: usa,uk' {...register('refusedCountry')} />
          </div>
          <div className="checkbox-container">
            <input type="checkbox" {...register('permission_personalInfo')} />
            <label>allow student to edit/upload personal information</label>
          </div>
          <div className="checkbox-container">
            <input type="checkbox" {...register('permission_englishProficiency')} />
            <label>allow student to edit/upload test information</label>
          </div>
          <div className="checkbox-container">
            <input type="checkbox" {...register('permission_universityApplications')} />
            <label>allow student to edit/upload university information</label>
          </div>
          <div className="checkbox-container">
            <input type="checkbox" {...register('permission_studentsFile')} />
            <label>allow student to edit/upload files</label>
          </div>
          
          <div className="final"></div>
          <div className="input-container">
            <input value={info?.Uemail} readOnly/>
            <input value={info?.Uid} readOnly/>
            <input value={info?.Urole} readOnly/>
            <input value={info?.Ustatus} readOnly/>
          </div>

        </>
    )
}

export default Final
