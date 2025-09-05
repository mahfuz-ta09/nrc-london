'use client'
import { useState } from 'react'
import { useForm, FormProvider } from 'react-hook-form'
import '../../SharedCountryUni/AddCountryModal/AddCountryModal.css'

type ModalProps = {
  modalState: {
    isOpen: boolean
  }
  setModalState: React.Dispatch<React.SetStateAction<any>>
}

type StudentFileForm = {
  student: {
    fullName: string
    email: string
    phone: string
    dob: string
    passportNumber: string
    countryOfCitizenship: string
    currentAddress: string
  }
  application: {
    program: string
    destinationCountry: string
    intake: string
    institution: string
    courseStartDate: string
    courseEndDate: string
  }
  workflow: {
    currentStage: string
  }
  allowStudentSelfFill: boolean
}

const AddStudentFileModal = ({ setModalState, modalState }: ModalProps) => {
    const [step, setStep] = useState(1)

    const methods = useForm<StudentFileForm>({
        defaultValues: {
        student: {
            fullName: '',
            email: '',
            phone: '',
            dob: '',
            passportNumber: '',
            countryOfCitizenship: '',
            currentAddress: '',
        },
        application: {
            program: '',
            destinationCountry: '',
            intake: '',
            institution: '',
            courseStartDate: '',
            courseEndDate: '',
        },
        workflow: {
            currentStage: 'File Initialized',
        },
        allowStudentSelfFill: false,
        },
        mode: 'onBlur',
    })

    const {register,handleSubmit,watch,formState: { errors }} = methods

    const onSubmit = (data: StudentFileForm) => {
        console.log('Final Data:', data)
        // send data to API
        setModalState({ isOpen: false })
    }

    const handleNext = async () => {
        // Validate current step before moving forward
        const valid = await methods.trigger(step === 1 ? 'student' : 'application')
        if (valid && step < 3) setStep(step + 1)
    }

    const handleBack = () => {
        if (step > 1) setStep(step - 1)
    }
console.log(modalState)
    return (
        <div className={modalState?.isOpen ? 'modal-container openmoda-container' : 'modal-container' }>
            <div className="modal-body">
                <h1>Open New Student File</h1>

                <button
                    onClick={() => setModalState({ isOpen: false })}
                    className="cancel-btn">
                    X
                </button>

                <FormProvider {...methods}>
                <form className="modal-form" onSubmit={methods.handleSubmit(onSubmit)}>
                    {/* STEP 1 – Student Info */}
                    {step === 1 && (
                    <>
                        <h3 className='phase-title'>Phase 1: Student Information</h3>

                        <div className="input-container">
                            <label>Full Name</label>
                            <input {...register('student.fullName', { required: true })} />
                            {errors.student?.fullName && (
                                <span className="error">Full name is required</span>
                            )}
                        </div>

                        <div className="input-container">
                            <label>Student's Email</label>
                            <input
                                type="email"
                                {...register('student.email', { required: true })}
                            />
                            {errors.student?.email && (
                                <span className="error">Email is required</span>
                            )}
                        </div>

                        <div className="input-container">
                            <label>Phone</label>
                            <input {...register('student.phone', { required: true })} />
                            {errors.student?.phone && (
                                <span className="error">Phone is required</span>
                            )}
                        </div>

                        <div className="input-container">
                            <label>Date of Birth</label>
                            <input type="date" {...register('student.dob')} />
                        </div>

                        <div className="input-container">
                            <label>Passport Number</label>
                            <input {...register('student.passportNumber')} />
                        </div>

                        <div className="input-container">
                            <label>Country of Citizenship</label>
                            <input {...register('student.countryOfCitizenship')} />
                        </div>

                        <div className="input-container">
                            <label>Current Address</label>
                            <input {...register('student.currentAddress')} />
                        </div>
                    </>
                    )}

                    {step === 2 && (
                    <>
                        <h3 className='phase-title'>Phase 2: Application Information</h3>

                        <div className="input-container">
                        <label>Program</label>
                        <input {...register('application.program', { required: true })} />
                        {errors.application?.program && (
                            <span className="error">Program is required</span>
                        )}
                        </div>

                        <div className="input-container">
                        <label>Destination Country</label>
                        <input
                            {...register('application.destinationCountry', {
                            required: true,
                            })}
                        />
                        {errors.application?.destinationCountry && (
                            <span className="error">Destination country is required</span>
                        )}
                        </div>

                        <div className="input-container">
                        <label>Intake</label>
                        <input {...register('application.intake')} />
                        </div>

                        <div className="input-container">
                        <label>Institution</label>
                        <input {...register('application.institution')} />
                        </div>

                        <div className="input-container">
                        <label>Course Start Date</label>
                        <input
                            type="date"
                            {...register('application.courseStartDate')}
                        />
                        </div>

                        <div className="input-container">
                        <label>Course End Date</label>
                        <input type="date" {...register('application.courseEndDate')} />
                        </div>
                    </>
                    )}

                    {/* STEP 3 – Confirmation */}
                    {step === 3 && (
                    <>
                        <h3 className='phase-title'>Phase 3: Finalize</h3>
                        <div className="input-container">
                        <label>
                            <input type="checkbox" {...register('allowStudentSelfFill')} />{' '}
                            Allow student to fill their own file
                        </label>
                        </div>
                        <p>
                        Review the details and submit. Once submitted, a student file
                        will be created in the system.
                        </p>
                    </>
                    )}

                    {/* Step Navigation */}
                    <div className="form-navigation">
                        {step > 1 && (
                            <button type="button" onClick={handleBack}  className='modal-sbmt-btn'>
                            Back
                            </button>
                        )}

                        {step < 3 ? (
                            <button type="button" onClick={handleNext}  className='modal-sbmt-btn'>
                            Next
                            </button>
                        ) : (
                            <button type="submit"  className='modal-sbmt-btn'>
                                Submit
                            </button>
                        )}
                    </div>

                </form>
                </FormProvider>
            </div>
        </div>
    )
}

export default AddStudentFileModal
