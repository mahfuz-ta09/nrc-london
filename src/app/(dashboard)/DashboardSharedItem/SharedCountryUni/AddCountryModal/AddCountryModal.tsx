'use client'
import { toast } from 'react-toastify'
import 'react-quill-new/dist/quill.snow.css'
import { countryCurrencyMap } from '@/types/common'
import Loader from '@/component/shared/loader/loader'
import { base64ToFile } from '@/utils/convertFileType'
import { useForm, SubmitHandler, Controller } from "react-hook-form"
import { 
    useCreateCountryListMutation, 
    useEditCountryListMutation 
} from '@/redux/endpoints/countryBaseUni/countryBaseUniversity'
import dynamic from 'next/dynamic'

const ReactQuill = dynamic(() => import('react-quill-new'), { ssr: false })

type ModalProps = {
    addCountry: {
        action: string,
        id: string,
        isOPen: boolean,
        name: string,
        data?: any
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
    meta_title: string,
    meta_description: string,
    currency: string,
    content: string,
    status?: string,
    isVisible?: string
}

const modules = {
    toolbar: [
        ['bold', 'italic', 'underline', 'strike'],
        ['blockquote', 'code-block'],
        ['link', 'image', 'formula'],
        [{ 'header': 1 }, { 'header': 2 }],
        [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'list': 'check' }],
        [{ 'script': 'sub' }, { 'script': 'super' }],
        [{ 'indent': '-1' }, { 'indent': '+1' }],
        [{ 'direction': 'rtl' }],
        [{ 'size': ['small', false, 'large', 'huge'] }],
        [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
        [{ 'color': [] }, { 'background': [] }],
        [{ 'font': [] }],
        [{ 'align': [] }],
        ['clean']
    ],
}

const AddCountryModal = ({ addCountry, setAddCountry }: ModalProps) => {
    const {register,handleSubmit,reset,control,watch,formState: { errors }} = useForm<CountryData>({
        defaultValues: {
            country: '',
            slug: '',
            meta_title: '',
            meta_description: '',
            currency: '',
            serial: 0,
            content: '',
            status: '',
            isVisible: ''
        }
    })

    const [createCountryList, { isLoading: creationLoader }] = useCreateCountryListMutation()
    const [editCountryList, { isLoading: editLoader }] = useEditCountryListMutation()

    
    const metaTitle = watch('meta_title', '')
    const metaDescription = watch('meta_description', '')
    const slug = watch('slug', '')

    
    const handleCountryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const countryName = e.target.value
        if (addCountry.action === 'add') {
            const autoSlug = countryName
                .toLowerCase()
                .trim()
                .replace(/[^a-z0-9\s-]/g, "")
                .replace(/\s+/g, "-")
            

            const slugInput = document.querySelector<HTMLInputElement>('input[name="slug"]')
            if (slugInput) slugInput.value = autoSlug
        }
    }

    if (creationLoader || editLoader) return <Loader />

    const onSubmit: SubmitHandler<CountryData> = async (data: CountryData) => {
        try {
            let res:any
            const form_data = new FormData()

            if(data?.country)form_data.append('country', data.country)
            if(data?.currency)form_data.append('currency', data.currency)
            if(data?.serial || data?.serial===0)form_data.append('serial', String(data.serial))
            if (data.slug) {
                const cleanSlug = data.slug
                    .toLowerCase()
                    .trim()
                    .replace(/[^a-z0-9\s-]/g, "")
                    .replace(/\s+/g, "-")
                form_data.append('slug', cleanSlug)
            }
            if(data?.meta_title)form_data.append('meta_title', data.meta_title)
            if(data?.meta_description)form_data.append('meta_description', data.meta_description)
            if(data?.status)form_data.append('status', data.status)
            if(data?.isVisible)form_data.append('isVisible', data.isVisible)
            if(data?.countryFlag && data.countryFlag.length > 0) {
                form_data.append('countryFlag', data.countryFlag[0])
            }
            if(data?.famousFile && data.famousFile.length > 0) {
                form_data.append('famousFile', data.famousFile[0])
            }
            if(data?.content){
                const parser = new DOMParser()
                const doc = parser.parseFromString(data?.content, 'text/html')
                const imgElements = doc.querySelectorAll('img')

                imgElements.forEach((imgEl, i) => {
                    const src = imgEl.getAttribute("src")
                    if (src && src.startsWith("data:image")) {
                        imgEl.setAttribute("src", `__IMAGE_${i}__`)
                        const file = base64ToFile(src, `editor-img-${i}.png`)
                        form_data.append("content_image", file)
                    }
                })

                form_data.append('content', doc.body.innerHTML)
            }
            // Object.entries(data).forEach(([key, value]) => {
            //     if (value instanceof FileList) {
            //         for (let i = 0; i < value.length; i++) {
            //             form_data.append(key, value[i])
            //         }
            //     } else if (value !== undefined && value !== null) {
            //         if (key === 'slug' && typeof value === 'string') {
            //             form_data.append(key, value.toLowerCase().trim().replace(/[^a-z0-9\s-]/g, "").replace(/\s+/g, "-"))
            //         } else if (key === 'content' && typeof value === 'string' && value.trim() !== "") {
            //             const parser = new DOMParser()
            //             const doc = parser.parseFromString(value, 'text/html')
            //             const imgElements = doc.querySelectorAll('img')

            //             imgElements.forEach((imgEl, i) => {
            //                 const src = imgEl.getAttribute("src")
            //                 if (src && src.startsWith("data:image")) {
            //                     imgEl.setAttribute("src", `__IMAGE_${i}__`)
            //                     const file = base64ToFile(src, `editor-img-${i}.png`)
            //                     form_data.append("content_image", file)
            //                 }
            //             })

            //             form_data.append(key, doc.body.innerHTML)
            //         } else if (key === 'isVisible') {
            //             form_data.append(key, String(value))
            //         } else {
            //             if(key==='serial' && value!==0)form_data.append(key, String(value))
            //         }
            //     }
            // })

            if (addCountry?.action === "add") {
                res = await createCountryList(form_data).unwrap()
                if (res?.data?.insertedId) {
                    toast.success("New country added successful!")
                    setAddCountry({isOpen: false,id: "",name: '',action: ""})
                    reset()
                } else {
                    toast.error(res?.data?.message || res?.error?.data || "Operation failed!")
                }
            }
            if (addCountry?.action === "edit" && addCountry?.id) {
                res = await editCountryList({ data: form_data, id: addCountry?.id }).unwrap()
                if (res?.data?.modifiedCount) {
                    toast.success(res?.data?.message || "Operation successful!")
                    setAddCountry({isOpen: false,id: "",name: '',action: ""})
                    reset()
                } else {
                    toast.error(res?.data || "Operation failed!")
                }
            }
        } catch (err:any) {
            console.error('Error in onSubmit:', err)
            toast.error(err?.data ||"Something went wrong!")
        }
    }

    return (
        <div className={addCountry?.isOPen ? 'modal-container openmoda-container' : 'modal-container'}>
            <div className='modal-body' style={{ maxWidth: '700px' }}>
                <h4 className="modal-header">
                    {addCountry?.action === 'add' ? 'Add New Country' : `Edit ${addCountry?.name}`}
                </h4>

                <button
                    onClick={() => {
                        setAddCountry((prev: any) => ({ ...prev, id: '', name: '', isOPen: false, action: "" }))
                        reset()
                    }}
                    className="cancel-btn"
                >
                    ✕
                </button>

                <form onSubmit={handleSubmit(onSubmit)} className='modal-from'>
                    <div className='input-container'>
                        <label htmlFor="country">
                            Country Name* 
                            <span style={{ fontSize: '12px', color: '#64748b', fontWeight: 'normal', marginLeft: '8px' }}>
                                (e.g., Canada, United Kingdom)
                            </span>
                        </label>
                        <input
                            type='text'
                            {...register("country", { required: addCountry.action === "add" ? "Country name is required" : false })}
                            onChange={handleCountryChange}
                            placeholder="Canada"
                        />
                        {errors.country && <span style={{ color: '#ef4444', fontSize: '12px' }}>{errors.country.message}</span>}
                    </div>

                    {/* URL Slug */}
                    <div className='input-container'>
                        <label htmlFor="slug">
                            URL Slug* 
                            <span style={{ fontSize: '12px', color: '#64748b', fontWeight: 'normal', marginLeft: '8px' }}>
                                (SEO-friendly URL: {slug && `/study-destinations/${slug}`})
                            </span>
                        </label>
                        <input
                            type='text'
                            {...register("slug", { required: addCountry.action === "add" ? "Slug is required" : false })}
                            placeholder="canada or united-kingdom"
                        />
                        {errors.slug && <span style={{ color: '#ef4444', fontSize: '12px' }}>{errors.slug.message}</span>}
                    </div>

                    {/* Meta Title */}
                    <div className='input-container'>
                        <label htmlFor="meta_title">
                            Meta Title* (SEO)
                            <span style={{ fontSize: '12px', color: metaTitle.length > 60 ? '#ef4444' : '#10b981', fontWeight: 'normal', marginLeft: '8px' }}>
                                ({metaTitle.length}/60 characters - appears in Google search)
                            </span>
                        </label>
                        <input
                            type='text'
                            maxLength={70}
                            {...register("meta_title", { required: addCountry.action === "add" ? "Meta title is required" : false})}
                            placeholder="Study in Canada | Top Universities & Programs 2025"
                        />
                        {errors.meta_title && <span style={{ color: '#ef4444', fontSize: '12px' }}>{errors.meta_title.message}</span>}
                        <small style={{ color: '#64748b', fontSize: '11px', display: 'block', marginTop: '4px' }}>
                            💡 Tip: Include country name, year, and key benefit (50-60 chars is ideal)
                        </small>
                    </div>

                    {/* Meta Description */}
                    <div className='input-container'>
                        <label htmlFor="meta_description">
                            Meta Description (SEO)
                            <span style={{ fontSize: '12px', color: metaDescription.length > 160 ? '#ef4444' : metaDescription.length > 140 ? '#10b981' : '#64748b', fontWeight: 'normal', marginLeft: '8px' }}>
                                ({metaDescription.length}/160 characters)
                            </span>
                        </label>
                        <textarea
                            rows={3}
                            maxLength={170}
                            {...register("meta_description")}
                            placeholder="Explore top universities in Canada. Complete guide to admission requirements, costs, scholarships, and student life. Apply to 100+ programs."
                        />
                        <small style={{ color: '#64748b', fontSize: '11px', display: 'block', marginTop: '4px' }}>
                            💡 Tip: This appears in Google search results - make it compelling! (155-160 chars is ideal)
                        </small>
                    </div>


                    <div className="input-container">
                        <label htmlFor="currency">Currency*</label>
                        <select {...register("currency", { required: addCountry.action === "add" ? "Currency is required" : false})}>
                            <option value="">Select currency...</option>
                            {Object.entries(countryCurrencyMap).map(([code, sign]) => (
                                <option key={code} value={sign}>
                                    {code} ({sign})
                                </option>
                            ))}
                        </select>
                        {errors.currency && <span style={{ color: '#ef4444', fontSize: '12px' }}>{errors.currency.message}</span>}
                    </div>


                    <div className='input-container'>
                        <label htmlFor="serial">
                            Display Order*
                            <span style={{ fontSize: '12px', color: '#64748b', fontWeight: 'normal', marginLeft: '8px' }}>
                                (Lower numbers appear first on homepage)
                            </span>
                        </label>
                        <input
                            type='number'
                            min={0}
                            {...register("serial", { required: addCountry.action === "add" ? "Serial is required" : false, min: 0})}
                            placeholder="1"
                        />
                        {errors.serial && <span style={{ color: '#ef4444', fontSize: '12px' }}>{errors.serial.message}</span>}
                    </div>


                    <div className='double-input-container'>
                        <div className='input-container'>
                            <label htmlFor="status">Status</label>
                            <select {...register("status")}>
                                <option value="">select</option>
                                <option value="published">Published</option>
                                <option value="draft">Draft</option>
                                <option value="archived">Archived</option>
                            </select>
                        </div>
                        <div className='input-container'>
                            <label htmlFor="status">Visible on website</label>
                            <select {...register("isVisible")}>
                                <option value="">select</option>
                                <option value="yes">yes</option>
                                <option value="no">no</option>
                            </select>
                        </div>
                    </div>


                    <div className='input-container'>
                        <label htmlFor="content">
                            Country Content*
                            <span style={{ fontSize: '12px', color: '#64748b', fontWeight: 'normal', marginLeft: '8px' }}>
                                (Write comprehensive guide about studying in this country)
                            </span>
                        </label>
                        <Controller
                            name="content"
                            control={control}
                            rules={{ required: addCountry.action === "add" ? "Content is required" : false}}
                            render={({ field }) => (
                                <ReactQuill
                                    theme="snow"
                                    value={field.value}
                                    onChange={field.onChange}
                                    modules={modules}
                                    placeholder="Write about studying in this country: Why study here? Costs? Visa process? Work opportunities? Include images for better engagement..."
                                    style={{ height: '300px', marginBottom: '50px' }}
                                />
                            )}
                        />
                        {errors.content && <span style={{ color: '#ef4444', fontSize: '12px' }}>{errors.content.message}</span>}
                    </div>

                    {/* File Uploads */}
                    <div className='double-input-container'>
                        <div className='input-container'>
                            <label htmlFor="countryFlag">
                                Country Flag{addCountry.action === 'add' && '*'}
                            </label>
                            <input
                                type='file'
                                accept="image/jpeg, image/jpg, image/png"
                                {...register("countryFlag", {
                                    required: addCountry.action === 'add' ? "Flag is required" : false
                                })}
                            />
                            {errors.countryFlag && <span style={{ color: '#ef4444', fontSize: '12px' }}>{errors.countryFlag.message}</span>}
                            <small style={{ color: '#64748b', fontSize: '11px', display: 'block', marginTop: '4px' }}>
                                Recommended: 300x200px, PNG
                            </small>
                        </div>

                        <div className='input-container'>
                            <label htmlFor="famousFile">
                                Hero Image{addCountry.action === 'add' && '*'}
                            </label>
                            <input
                                type='file'
                                accept="image/jpeg, image/jpg, image/png"
                                {...register("famousFile", {
                                    required: addCountry.action === 'add' ? "Hero image is required" : false
                                })}
                            />
                            {errors.famousFile && <span style={{ color: '#ef4444', fontSize: '12px' }}>{errors.famousFile.message}</span>}
                            <small style={{ color: '#64748b', fontSize: '11px', display: 'block', marginTop: '4px' }}>
                                Recommended: 1200x630px, JPG
                            </small>
                        </div>
                    </div>

                    <button
                        type='submit'
                        className='submit-button'
                        style={{
                            marginTop: '20px',
                            width: '100%',
                            padding: '12px',
                            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                            color: 'white',
                            border: 'none',
                            borderRadius: '8px',
                            fontSize: '16px',
                            fontWeight: '600',
                            cursor: 'pointer'
                        }}
                    >
                        {addCountry?.action === 'add' ? '✨ Create Country' : '💾 Update Country'}
                    </button>
                </form>
            </div>
        </div>
    )
}

export default AddCountryModal