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
          <div className="double-input-container">
              <div className="input-container">
                <label>allow student to edit/upload personal information</label>
                <select {...register('permission_personalInfo')}>
                  <option value="">--select--</option>
                  <option value="yes">yes</option>
                  <option value="false">no</option>
                </select>
            </div>
            <div className='input-container'>
                <label>allow student to edit/upload test information</label>
                <select {...register('permission_englishProficiency')}>
                  <option value="">--select--</option>
                  <option value="yes">yes</option>
                  <option value="false">no</option>
                </select>
            </div>
          </div>
          <div className="double-input-container">
              <div className="input-container">
                <label>allow student to edit/upload university information</label>
                <select {...register('permission_universityApplications')}>
                  <option value="">--select--</option>
                  <option value="yes">yes</option>
                  <option value="false">no</option>
                </select>
            </div>
            <div className='input-container'>
                <label>allow student to edit/upload files information</label>
                <select {...register('permission_studentsFile')}>
                  <option value="">--select--</option>
                  <option value="yes">yes</option>
                  <option value="false">no</option>
                </select>
            </div>
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
