'use client';
import Final from './Final';
import English from './English';
import Personal from './Personal';
import { useState } from 'react';
import '@/css/component/Form.css';
import { toast } from 'react-toastify';
import ApplicationInfo from './ApplicationInfo';
import Loader from '@/component/shared/loader/loader';
import { ModalProps, StudentFileForm } from '../type';
import { useForm, FormProvider } from 'react-hook-form';
import { useCreatetStudentFileMutation } from '@/redux/endpoints/studentfileprocess/proceedEndpoints';



const AddStudentFileModal = ({ setModalState, modalState }: ModalProps) => {
    const [step, setStep] = useState(1);
    const methods = useForm<StudentFileForm>({});   
    const { register, formState: { errors }, trigger, reset } = methods;    
    const [createStudentFile, { isLoading }] = useCreatetStudentFileMutation();   

    const onSubmit = async (data: StudentFileForm) => {
      try {
        const cleanedData = JSON.parse(JSON.stringify(data));

        const englishProficiency = cleanedData.englishProficiency as Record<string, any> | undefined;

        if (englishProficiency) {
          for (const [testName, testData] of Object.entries(englishProficiency)) {
            const hasValue = Object.values(testData).some(
              (val) => val !== "" && val !== null && val !== undefined
            );
            if (!hasValue) {
              delete englishProficiency[testName];
            }
          }
        }

        if (Array.isArray(cleanedData.preferredUniversities)) {
          cleanedData.preferredUniversities = cleanedData.preferredUniversities.filter((uni:any) =>
            Object.values(uni).some((val) => val !== "" && val !== null && val !== undefined)
          );
        }
        
        if (typeof cleanedData.refusedCountry === "string") {
            cleanedData.refusedCountry = cleanedData.refusedCountry
            .split(",")
            .map((v:any) => v.trim())
            .filter((v:any) => v.length > 0);
        }

        const res: any = await createStudentFile({ data: cleanedData });    
        if (res?.data?.success) {
            toast.success('Student file created successfully!');
            reset();
            setModalState({ isOpen: false });
        } else {
            toast.error(res?.error?.data?.message || 'Something went wrong!');
        }
      } catch {
          toast.error('Failed to operate!');
      }
    };

    const handleNext = async () => {
        const fieldsToValidate: Record<number, (keyof StudentFileForm)[]> = {
          1: ['name', 'email'],
        };
        const valid = await trigger(fieldsToValidate[step] || []);
        if (valid && step < 4) setStep(step + 1);
    };
    const handleBack = () => step > 1 && setStep(step - 1);
    if (isLoading) return <Loader />;

    return (
      <div className={modalState?.isOpen ? 'modal-container openmoda-container' : 'modal-container'}>
        <div className="modal-body">
          <h4 className="modal-header">Open New Student File</h4>
          <button onClick={() => setModalState({ isOpen: false })} className="cancel-btn">X</button>

          <FormProvider {...methods}>
            <form className="modal-form" onSubmit={methods.handleSubmit(onSubmit)}>
              {step === 1 && <Personal register={register} errors={errors}/>}
              {step === 2 && <English register={register}/>}
              {step === 3 && <ApplicationInfo />}
              {step === 4 && <Final register={register} />}


              <div style={{margin:"20px 0"}} className="form-navigation">
                {step > 1 && (
                  <button type="button" onClick={handleBack} className="submit-button">
                    Back
                  </button>
                )}
                {step < 4 && (
                  <button type="button" onClick={handleNext} className="submit-button">
                    Next
                  </button>
                )}
                {step === 4 && (
                  <button type="submit" className="submit-button">
                    Submit
                  </button>
                )}
              </div>
            </form>
          </FormProvider>
        </div>
      </div>
    );
};

export default AddStudentFileModal;
