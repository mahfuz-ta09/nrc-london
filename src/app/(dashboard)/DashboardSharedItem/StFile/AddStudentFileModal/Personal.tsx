import React from 'react'

const Personal = ({register,errors}:{register:any,errors:any}) => {
    return (
        <>
          <h3 className="phase-title">phase 1: student information</h3>
          <div className="input-container">
            <label>full name*</label>
            <input {...register('name', { required: 'Full name is required' })} />
            {errors.name && <span className="error">{errors.name.message}</span>}
          </div>
          <div className="input-container">
            <label>email*</label>
            <input type="email" {...register('email', { required: 'Email is required' })} />
            {errors.email && <span className="error">{errors.email.message}</span>}
          </div>
          
          <div className="double-input-container">
            <div className="input-container">
              <label>Phone</label>
              <input type='tel' {...register('phone')} />
            </div>
            <div className="input-container">
              <label>alternative mobile</label>
              <input type='tel' {...register('alternativePhone')} />
            </div>
          </div>
          
          <div className="double-input-container">
            <div className="input-container">
              <label>gender</label>
              <select {...register('gender')}>
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select> 
            </div>
            <div className="input-container">
              <label>marital status</label>
              <select {...register('maritalStatus')}>
                <option value="">Select Status</option>
                <option value="married">Married</option>
                <option value="unmerried">Unmerried</option>
              </select> 
            </div>
          </div>
          <div className="double-input-container">
            <div className="input-container">
              <label>dob</label>
              <input type='date' {...register('dob')} />
            </div>
            <div className="input-container">
              <label>passport no</label>
              <input {...register('passportNo')} />
            </div>
          </div>
          <div className="double-input-container">
            <div className="input-container">
              <label>current address</label>
              <input {...register('currentAddress')} />
            </div>
            <div className="input-container">
              <label>country citizen</label>
              <input {...register('countryCitizen')} />
            </div>
          </div>
        </>
    )
}

export default Personal
