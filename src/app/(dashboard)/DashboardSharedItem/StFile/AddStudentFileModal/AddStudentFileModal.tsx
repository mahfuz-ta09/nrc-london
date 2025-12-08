'use client';
import Final from './Final';
import English from './English';
import Personal from './Personal';
import { useState } from 'react';
import '@/css/component/Form.css';
import FileUpload from './FileUpload';
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
        const formData = new FormData();
        const fileMeta: { fileFor: string; originalName: string; newName: string }[] = [];

        for (const key in data) {
            const value = data[key as keyof StudentFileForm];

            if (key === "files" && Array.isArray(value)) {
              value.forEach((fileObj: any) => {
                if (fileObj.file && fileObj.file.length > 0) {
                  const file = fileObj.file[0];
                  if (file instanceof File) {
                    const newName = `${fileObj.fileFor.replace(/\s+/g, "_")}`;
                    formData.append("files", file, newName);

                    fileMeta.push({
                      fileFor: fileObj.fileFor,
                      originalName: file.name,
                      newName,
                    });
                  }
                }
              });

              formData.append("fileMeta", JSON.stringify(fileMeta));
            }else if (key === "academicInfo" ||key === "educationBackground" ||key === "universityApplications" ||key === "englishProficiency" ||key === "refusedCountry") {
              formData.append(key, JSON.stringify(value));
            }else {
              formData.append(key, String(value));
            }
        }

        const res: any = await createStudentFile({ data: formData }); 
        console.log(res)   
        if (res?.data?.data?.acknowledged) {
            toast.success('Student file created successfully!');
            reset();
            setModalState({ isOpen: false });
        } else {
            toast.error(res?.error?.data || 'Something went wrong!');
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
        if (valid && step < 5) setStep(step + 1);
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
              {step === 4 && <FileUpload />}
              {step === 5 && <Final register={register} />}


              <div style={{margin:"20px 0"}} className="form-navigation">
                {step > 1 && (
                  <button type="button" onClick={handleBack} className="submit-button">
                    Back
                  </button>
                )}
                {step < 5 && (
                  <button type="button" onClick={handleNext} className="submit-button">
                    Next
                  </button>
                )}
                {step === 5 && (
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
