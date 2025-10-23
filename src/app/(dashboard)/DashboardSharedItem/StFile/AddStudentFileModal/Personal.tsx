import React from 'react'

const Personal = ({register,errors}:{register:any,errors:any}) => {
    return (
        <>
          <h3 className="phase-title">phase 1: student information</h3>
          <div className="input-container">
            <label>Full Name*</label>
            <input {...register('name', { required: 'Full name is required' })} />
            {errors.name && <span className="error">{errors.name.message}</span>}
          </div>
          <div className="input-container">
            <label>Email*</label>
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
