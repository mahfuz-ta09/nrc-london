'use client'
// import './AddCountryModal.css'
import { toast } from 'react-toastify'
import 'react-quill-new/dist/quill.snow.css'
import { countryCurrencyMap } from '@/types/common'
import Loader from '@/component/shared/loader/loader'
import { base64ToFile } from '@/utils/convertFileType'
import { useForm, SubmitHandler , Controller } from "react-hook-form"
import { useCreateCountryListMutation, useEditCountryListMutation } from '@/redux/endpoints/countryBaseUni/countryBaseUniversity'
import dynamic from 'next/dynamic'


type ModalProps = {
    addCountry:{
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
    content_image: FileList | null,
    country: string,
    serial: number,
    slug: string,
    currency:string,
    content: string,
    descriptiopn: string,
}

const ReactQuill = dynamic(() => import('react-quill-new'), { ssr: false })

const modules = {
    toolbar: [
        ['bold', 'italic', 'underline', 'strike'],   
        ['blockquote', 'code-block'],
        ['link', 'image','formula'],
        [{ 'header': 1 }, { 'header': 2 }],         
        [{ 'list': 'ordered'}, { 'list': 'bullet' }, { 'list': 'check' }],
        [{ 'script': 'sub'}, { 'script': 'super' }],  
        [{ 'indent': '-1'}, { 'indent': '+1' }],          
        [{ 'direction': 'rtl' }],                         
        [{ 'size': ['small', false, 'large', 'huge'] }],  
        [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
        [{ 'color': [] }, { 'background': [] }],
        [{ 'font': [] }],
        [{ 'align': [] }],
        ['clean']    
    ],
}

const AddCountryModal = ({addCountry,setAddCountry}: ModalProps) => {
    const {
            register,
            handleSubmit,
            reset,
            control,
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
                if (value instanceof FileList) {
                    for (let i = 0; i < value.length; i++) {
                        form_data.append(key, value[i]);
                    }
                } else if (value !== undefined && value !== null) {
                    if (key === 'slug' && typeof value === 'string') {
                        form_data.append(key,value.toLowerCase().trim().replace(/[^a-z0-9\s-]/g, "").replace(/\s+/g, "-"));
                    } else if (key === 'content' && typeof value === 'string' && value.trim() !== "") {
                        const parser = new DOMParser();
                        const doc = parser.parseFromString(value, 'text/html');
                        const imgElements = doc.querySelectorAll('img');

                        imgElements.forEach((imgEl, i) => {
                            const src = imgEl.getAttribute("src");
                            if (src && src.startsWith("data:image")) {
                                imgEl.setAttribute("src", `__IMAGE_${i}__`);
                                const file = base64ToFile(src, `editor-img-${i}.png`);
                                form_data.append("content_image", file);
                            }
                        });

                        form_data.append(key, doc.body.innerHTML);
                    } else {
                        form_data.append(key, String(value));
                    }
                }
            });



            if(addCountry?.action==="add")res = await createCountryList(form_data)
            if(addCountry?.action==="edit" && addCountry?.id)res = await editCountryList({data: form_data,id:addCountry?.id})
            
            
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
        <div className={addCountry?.isOPen? 'modal-container openmoda-container' :'modal-container'}>
            <div className='modal-body'>
                <h4 className="modal-header">{addCountry?.action} country {addCountry?.name}</h4>
                    
                <button onClick={()=>setAddCountry((prev:any) => ({...prev ,id:'',name:'', isOPen: false , action:""}))} className="cancel-btn">X</button>
                
                <form  onSubmit={handleSubmit(onSubmit)} className='modal-from'>
                    <div className='input-container'>
                        <label htmlFor="country">Insert country name in short</label>
                        <input type='text' {...register("country")}/>
                    </div>
                    
                    <div className='input-container'>
                        <label htmlFor="slug">slug name*</label>
                        <input type='text' {...register("slug")}/>
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
                        <label htmlFor="serial">Enter the serial you want to show in front page</label>
                        <input type='number' min={1} {...register("serial")}/>
                    </div>
                    
                    <div className='input-container'>
                        <label htmlFor="serial">Details about country</label>
                        
                        <Controller
                            name="content"
                            control={control}
                            render={({ field }) => (
                            <ReactQuill
                                theme="snow"
                                value={field.value}
                                onChange={field.onChange}
                                modules={modules}
                                className=""
                            />
                            )}
                        />
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