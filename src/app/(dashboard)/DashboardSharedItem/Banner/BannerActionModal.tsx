import { toast } from 'react-toastify'
import { useForm, SubmitHandler } from "react-hook-form"
import { useCreateBannerMutation, useUpdateBannerMutation } from '@/redux/endpoints/banner/bannerEndpoint'
import Loader from '@/component/shared/Loader/Loader'


type ModalProps = {
    addBanner:{
        action:string,
        id:string,
        isOPen: boolean,
        name: string
    },
    setAddBanner: any
}

type CountryData = {
    title: string,
    additional_title: string,
    description: string,
    status: string,
    serial: number,
    bannerImg: FileList,
}

const BannerActionModal = ({addBanner,setAddBanner}: ModalProps) => {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<CountryData>()
    const [createBanner , {isLoading: createLoading}] = useCreateBannerMutation()
    const [updateBanner , {isLoading: updateLoading}] = useUpdateBannerMutation()
    
    if(createLoading || updateLoading) return <Loader />
    
    const onSubmit: SubmitHandler<CountryData> = async(data: CountryData) => {
        try{
            let res
            var form_data = new FormData()
            
            Object.entries(data).forEach(([key, value]) => {
                if(value instanceof FileList) {
                    for (let i = 0; i < value.length; i++) {
                        form_data.append(key, value[i])
                    }
                }else if (value !== undefined && value !== null) {
                    form_data.append(key, String(value))
                }
            })

            if(addBanner?.action==="add")res = await createBanner({data:form_data})
            if(addBanner?.action==="edit" && addBanner?.id)res = await updateBanner({data: form_data,id:addBanner?.id})
            
            
            if(res?.data?.data?.acknowledged){
                toast.success("Operation successful!!!")
                setAddBanner({
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
        <div className={addBanner?.isOPen? 'modal-container openmoda-container' :'modal-container'}>
            <div className='modal-body'>
                <h4 className="modal-header">{addBanner?.action} banner</h4>
                {addBanner?.action==='edit' && <p>ID - {addBanner?.id}</p>}
                    
                <button onClick={()=>setAddBanner((prev:any) => ({...prev ,id:'',name:'', isOPen: false , action:""}))} className="cancel-btn">X</button>
                
                <form  onSubmit={handleSubmit(onSubmit)} className='modal-from'>
                    <div className='input-container'>
                        <label htmlFor="title">Insert Banner title</label>
                        <input type='text' {...register("title")}/>
                    </div>
                
                    <div className='input-container'>
                        <label htmlFor="title">Insert Additional title</label>
                        <input type='text' {...register("additional_title")}/>
                    </div>
                
                    <div className='input-container'>
                        <label htmlFor="serial">Enter the serial you want to show in banner</label>
                        <input type='number' min={1} {...register("serial")}/>
                    </div>
                    
                    <div className='input-container'>
                        <label htmlFor="countryFlag">Add Banner Background Image</label>
                        <input type='file' accept="image/jpeg, image/jpg, image/png" {...register("bannerImg")}/>
                    </div>

                    <div className='input-container'>
                        <label htmlFor="status">Do you want to active the banner now?</label>
                            <select {...register("status")}>
                                <option value="">options</option>
                                <option value="active">active</option>
                                <option value="inactive">inactive</option>
                            </select>
                    </div>
                    <div className='input-container'>
                        <label htmlFor="description">Add description</label>
                        <textarea {...register("description")}/>
                    </div>
                    <button type='submit' className='submit-button'>submit</button>
                </form>

            </div>
        </div>
    )
}

export default BannerActionModal
