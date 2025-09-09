'use client'
import { useState } from 'react'
import { useForm, FormProvider } from 'react-hook-form'
import '../../SharedCountryUni/AddCountryModal/AddCountryModal.css'
import { useUserInfo } from '@/utils/useUserInfo'
import { useCreatetStudentFileMutation } from '@/redux/endpoints/studentFileProcess/proceedEndpoints'
import Loader from '@/component/shared/Loader/Loader'
import { toast } from 'react-toastify'

type ModalProps = {
  modalState: {
    isOpen: boolean
  }
  setModalState: React.Dispatch<React.SetStateAction<any>>
}

type StudentFileForm = {
  name: string
  email: string
  phone: string
  alternative_phone: string
  dob: string
  passportNo: string
  currentAddress: string
  countryCitizen: string
  testName: string
  listening: number
  reading: number
  writing: number
  speaking: number
  overall: number
  schoolership: string
  intake: string
  program: string
  uniName: string
  subject: string
  courseStartDate: string
  permission: boolean
  destinationCountry: string
}

const AddStudentFileModal = ({ setModalState, modalState }: ModalProps) => {
    const [step, setStep] = useState(1)
    const user = useUserInfo()
    const [createtStudentFile, { isLoading: createLoading }] =
        useCreatetStudentFileMutation()

    const methods = useForm<StudentFileForm>({
        defaultValues: {
        name: '',
        email: '',
        phone: '',
        alternative_phone: '',
        dob: '',
        passportNo: '',
        currentAddress: '',
        countryCitizen: '',
        testName: '',
        listening: 0,
        reading: 0,
        writing: 0,
        speaking: 0,
        overall: 0,
        schoolership: '',
        intake: '',
        program: '',
        uniName: '',
        subject: '',
        courseStartDate: '',
        permission: false,
        destinationCountry: ''
        },
        mode: 'onBlur'
    })

    const {
        register,
        formState: { errors },
        trigger,
        reset
    } = methods

    const onSubmit = async (data: StudentFileForm) => {
        try {
            const payload = {
                ...data,
                creatorEmail: user?.Uemail,
                creatorRole: user?.Urole,
                creatorId: user?.Uid,
                creatorUnder: ''
            }
            
            const res:any = await createtStudentFile({ data: payload })
            if (res?.data?.data?.insertedId) {
                toast.success('Insertion successful!')
                reset()
            } else {
                toast.error(res?.error?.data || 'Something went wrong!')
            }
        } catch (err) {
            toast.error('Failed to operate!')
        }
    }

    const handleNext = async () => {
        let fieldsToValidate: (keyof StudentFileForm)[] = []
        if (step === 1) fieldsToValidate = ['name', 'email', 'phone']
        if (step === 2) fieldsToValidate = ['testName', 'overall']
        if (step === 3) fieldsToValidate = ['program', 'destinationCountry']

        const valid = await trigger(fieldsToValidate)
        if (valid && step < 4) setStep(step + 1)
    }

    const handleBack = () => {
        if (step > 1) setStep(step - 1)
    }

    if (createLoading) return <Loader />

    return (
        <div
        className={
            modalState?.isOpen
            ? 'modal-container openmoda-container'
            : 'modal-container'
        }>
            <div className="modal-body">
                <h1>Open New Student File</h1>

                <button
                onClick={() => setModalState({ isOpen: false })}
                className="cancel-btn"
                >
                X
                </button>

                <FormProvider {...methods}>
                <form className="modal-form" onSubmit={methods.handleSubmit(onSubmit)}>
                    {/* STEP 1 – Student Info */}
                    {step === 1 && (
                    <>
                        <h3 className="phase-title">Phase 1: Student Information</h3>

                        <div className="input-container">
                        <label>Full Name</label>
                        <input {...register('name', { required: 'Full name is required' })} />
                        {errors?.name && <span className="error">{errors.name.message}</span>}
                        </div>

                        <div className="input-container">
                        <label>
                            Student's Email (Once submitted you can't change the email)
                        </label>
                        <input
                            type="email"
                            {...register('email', { required: 'Email is required' })}
                        />
                        {errors?.email && <span className="error">{errors.email.message}</span>}
                        </div>

                        <div className="input-container">
                        <label>Phone</label>
                        <input {...register('phone', { required: 'Phone is required' })} />
                        {errors?.phone && <span className="error">{errors.phone.message}</span>}
                        </div>

                        <div className="input-container">
                        <label>Alternative Phone</label>
                        <input {...register('alternative_phone')} />
                        </div>

                        <div className="input-container">
                        <label>Date of Birth</label>
                        <input type="date" {...register('dob')} />
                        </div>

                        <div className="input-container">
                        <label>Passport Number</label>
                        <input {...register('passportNo')} />
                        </div>

                        <div className="input-container">
                        <label>Country of Citizenship</label>
                        <input {...register('countryCitizen')} />
                        </div>

                        <div className="input-container">
                        <label>Current Address</label>
                        <input {...register('currentAddress')} />
                        </div>
                    </>
                    )}

                    {/* STEP 2 – English Proficiency */}
                    {step === 2 && (
                    <>
                        <h3 className="phase-title">Phase 2: English Proficiency </h3>

                        <div className="input-container">
                        <label>Test name</label>
                        <input {...register('testName', { required: 'Test name is required' })} />
                        {errors?.testName && <span className="error">{errors.testName.message}</span>}
                        </div>

                        <div className="input-container">
                        <label>Listening</label>
                        <input type="number" step="0.1" {...register('listening', { valueAsNumber: true })} />
                        </div>

                        <div className="input-container">
                        <label>Reading</label>
                        <input type="number" step="0.1" {...register('reading', { valueAsNumber: true })} />
                        </div>

                        <div className="input-container">
                        <label>Writing</label>
                        <input type="number" step="0.1" {...register('writing', { valueAsNumber: true })} />
                        </div>

                        <div className="input-container">
                        <label>Speaking</label>
                        <input type="number" step="0.1" {...register('speaking', { valueAsNumber: true })} />
                        </div>

                        <div className="input-container">
                        <label>Overall</label>
                        <input type="number" step="0.1" {...register('overall', { required: 'Overall score is required', valueAsNumber: true })} />
                        {errors?.overall && <span className="error">{errors.overall.message}</span>}
                        </div>
                    </>
                    )}

                    {/* STEP 3 – Application Info */}
                    {step === 3 && (
                    <>
                        <h3 className="phase-title">Phase 3: Application Information</h3>

                        <div className="input-container">
                        <label>Program</label>
                        <input {...register('program', { required: 'Program is required' })} />
                        {errors?.program && <span className="error">{errors.program.message}</span>}
                        </div>

                        <div className="input-container">
                        <label>Destination Country</label>
                        <input {...register('destinationCountry', { required: 'Destination country is required' })} />
                        {errors?.destinationCountry && <span className="error">{errors.destinationCountry.message}</span>}
                        </div>

                        <div className="input-container">
                        <label>Intake</label>
                        <input {...register('intake')} />
                        </div>

                        <div className="input-container">
                        <label>Schoolership</label>
                        <input {...register('schoolership')} />
                        </div>

                        <div className="input-container">
                        <label>Institution</label>
                        <input {...register('uniName')} />
                        </div>

                        <div className="input-container">
                        <label>Course Start Date</label>
                        <input type="date" {...register('courseStartDate')} />
                        </div>

                        <div className="input-container">
                        <label>Preferred Subject</label>
                        <input type="text" {...register('subject')} />
                        </div>
                    </>
                    )}

                    {/* STEP 4 – Finalize */}
                    {step === 4 && (
                    <>
                        <h3 className="phase-title">Phase 4: Finalize</h3>
                        <div className="checkbox-container">
                            <label htmlFor="permission">Allow student to fill their own file</label>
                            <input className="checkbox-input" type="checkbox" {...register('permission')} />
                        </div>
                        <p className="warning">
                        Review the details and submit. Once submitted, a student file will be created in the system.
                        </p>

                        <div className="input-container">
                        <label>File Initialized By</label>
                        <input readOnly value={user?.Uemail} />
                        <input readOnly value={user?.Urole} />
                        <input readOnly value={user?.Uid} />
                        </div>
                    </>
                    )}

                    <div className="form-navigation">
                    {step > 1 && (
                        <button type="button" onClick={handleBack} className="modal-sbmt-btn">
                        Back
                        </button>
                    )}
                    {step < 4 && (
                        <button type="button" onClick={handleNext} className="modal-sbmt-btn">
                        Next
                        </button>
                    )}
                    {step === 4 && (
                        <button type="submit" className="modal-sbmt-btn">
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
