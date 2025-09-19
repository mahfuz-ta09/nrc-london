'use client'
// import './AddCountryModal.css'
import { toast } from 'react-toastify'
import { countryCurrencyMap } from '@/types/common'
import Loader from '@/component/shared/Loader/Loader'
import { useForm, SubmitHandler } from "react-hook-form"
import { useCreateCountryListMutation, useEditCountryListMutation } from '@/redux/endpoints/countryBaseUni/countryBaseUniversity'


type ModalProps = {
    addCounty:{
        action:string,
        id:string,
        isOPen: boolean,
        name: string
    },
    setAddCountry: any
}

type CountryData = {
    countryFlag: FileList | null,
    famousFile: FileList | null,
    country: string,
    serial: number,
    countryFull: string,
    currency:string
}


const AddCountryModal = ({addCounty,setAddCountry}: ModalProps) => {
    const {
            register,
            handleSubmit,
            reset,
            formState: { errors },
        } = useForm<CountryData>()
    const [ createCountryList , { isLoading: creationLoader } ] = useCreateCountryListMutation()
    const [ editCountryList , { isLoading: editLoader } ] = useEditCountryListMutation()


    if( creationLoader || editLoader ) return <Loader />

    const onSubmit: SubmitHandler<CountryData> = async(data: CountryData) => {
        try{
            let res
            var form_data = new FormData()
            
            Object.entries(data).forEach(([key, value]) => {
                if(value instanceof FileList) {
                    for (let i = 0; i < value.length; i++) {
                        form_data.append(key, value[i]);
                    }
                }else if (value !== undefined && value !== null) {
                    form_data.append(key, String(value));
                }
            })


            if(addCounty?.action==="add")res = await createCountryList(form_data)
            if(addCounty?.action==="edit" && addCounty?.id)res = await editCountryList({data: form_data,id:addCounty?.id})
            
            
            if(res?.data?.data?.acknowledged){
                toast.success("Operation successful!!!")
                setAddCountry({
                    isOpen: false,
                    id:"",
                    name:''
                })
                reset()
            }else{
                toast.error(res?.data?.message || "Failed!")
            }
        }catch(err){
            console.log(err)
        }
    }

    
    return (
        ( creationLoader || editLoader ) ? <Loader /> :
        <div className={addCounty?.isOPen? 'modal-container openmoda-container' :'modal-container'}>
            <div className='modal-body'>
                <h4 className="modal-header">{addCounty?.action} country {addCounty?.name}</h4>
                    
                <button onClick={()=>setAddCountry((prev:any) => ({...prev ,id:'',name:'', isOPen: false , action:""}))} className="cancel-btn">X</button>
                
                <form  onSubmit={handleSubmit(onSubmit)} className='modal-from'>
                    <div className='input-container'>
                        <label htmlFor="">Insert country name in short</label>
                        <input type='text' {...register("country")}/>
                    </div>
                    
                    <div className='input-container'>
                        <label htmlFor="">Insert country name</label>
                        <input type='text' {...register("countryFull")}/>
                    </div>
                    <div className="input-container">
                        <label htmlFor="">Select currency</label>
                        <select {...register("currency")}>
                        {Object.entries(countryCurrencyMap).map(([code, sign]) => (
                            <option key={code} value={sign}>
                            {code} ({sign})
                            </option>
                        ))}
                        </select>
                    </div>
                    <div className='input-container'>
                        <label htmlFor="serial">Enter the serial you want to show in fron page</label>
                        <input type='number' min={1} {...register("serial")}/>
                    </div>
                    
                    <div className='input-container'>
                        <label htmlFor="">Add Country flag</label>
                        <input type='file'  accept="image/jpeg, image/jpg, image/png" {...register("countryFlag")}/>
                    </div>

                    <div className='input-container'>
                        <label htmlFor="serial">Add an image of the country</label>
                        <input type='file'  accept="image/jpeg, image/jpg, image/png" {...register("famousFile")}/>
                    </div>
                    <button type='submit' className='submit-button'>submit</button>
                </form>

            </div>
        </div>
    )
}

export default AddCountryModal