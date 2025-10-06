'use client'
import dynamic from 'next/dynamic'
import { toast } from 'react-toastify'
import 'react-quill-new/dist/quill.snow.css'
import { useForm, Controller } from "react-hook-form"
import { base64ToFile } from '@/utils/convertFileType'
import Loader from '@/component/shared/loader/loader'
import { useCreateAffiliatedUniMutation, 
    useUpdateAffiliatedUniMutation } from '@/redux/endpoints/affiliatedUni/affiliatedUni'


type ModalProps = {
    modalState: { 
        isOpen: boolean,
        action: string ,
        id: string
    }
    setModalState: React.Dispatch<React.SetStateAction<any>>
}

type BlogFormData = {
    name:string
    slug:string
    description:string

    location:string
    content:string

    tags:string
    status:string

    meta_title:string
    meta_keywords:string
    meta_description:string

    header_image: FileList
    logo: FileList
}

const ReactQuill = dynamic(() => import('react-quill-new'), { ssr: false })

const AffiliatedUniActionModal = ({ setModalState, modalState }: ModalProps) => {
    const [createAffiliatedUni, { isLoading: createLoadig }] = useCreateAffiliatedUniMutation()
    const [updateAffiliatedUni, { isLoading: updateLoadig }] = useUpdateAffiliatedUniMutation()
    const { register, control, handleSubmit, reset } = useForm<BlogFormData>({
        shouldUnregister: true,
        defaultValues: {
            name: "",
            slug: "",
            description: "",

            location:"",
            content: "",

            tags: "",
            status: "",
            
            meta_title: "",
            meta_keywords: "",
            meta_description: "",
            
            header_image: {} as FileList,
            logo: {} as FileList,
        },
    })

    const onSubmit = async(data: BlogFormData) => {
        try{
            const rep = window.confirm("Are you sure you want to create this blog(do not refresh while uploading)?")
            if(!rep) return
            
            const formData = new FormData()
            if(data.name)formData.append("name", data.name)
            if(data.slug)formData.append("slug",(data.slug).toLowerCase().trim().replace(/\s+/g, "-"))
            if(data.description)formData.append("description", data.description)

            if(data.location)formData.append("location", data.location)
            if(data.status)formData.append("status", data.status)
            
            if(data.tags)data?.tags.split(",").map(t => t.trim()).forEach(t => formData.append("tags", t))

            if (data.header_image?.[0])formData.append("header_image",data.header_image[0])
            if (data.logo?.[0])formData.append("logo",data.logo[0])

            if(data.meta_title)formData.append("meta_title", data.meta_title)
            if(data.meta_keywords)data?.meta_keywords.split(",").map(k => k.trim()).forEach(k => formData.append("meta_keywords", k))
            if(data.meta_description)formData.append("meta_description", data.meta_description)

            const parser = new DOMParser();
            const doc = parser.parseFromString(data.content, 'text/html');
            const imgElements = doc.querySelectorAll('img')

            if(imgElements.length > 0){
                let i=0
                const updatedData = new FormData()
                
                imgElements.forEach((imgEl) => {
                    const src = imgEl.getAttribute("src")
                    if (src && src.startsWith("data:image")) {
                        imgEl.setAttribute("src",`__IMAGE_${i}__`)
                        const file = base64ToFile(src, `editor-img-${i}.png`)
                        updatedData.append("images", file)
                        formData.append("content_image",file)
                        i++;
                    }
                })

            }
            
            const updatedBody = doc.body.innerHTML
            if(data.content)formData.append("content", JSON.stringify(updatedBody))

            let res:any
            
            if(modalState?.action==="Add")res = await createAffiliatedUni({data: formData}).unwrap()
            else if(modalState?.action==="Edit" && modalState?.id)res = await updateAffiliatedUni({ data: formData , id: modalState?.id }).unwrap()
            
            if(res?.data?.modifiedCount || res?.data?.insertedId){
                toast.success(`Blog ${modalState?.action==="Edit"? "edit":"added"} successfully`)
                reset()
                setModalState({ isOpen: false , id: ''})
            }else{
                toast?.error(res?.data)
            }
        }catch(err: any){
            toast.error(err?.data || "something went wrong")
        }
    }

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

    
    return ((
        (createLoadig || updateLoadig) ? <Loader /> :
        <div className={modalState?.isOpen ? 'modal-container openmoda-container' : 'modal-container'}>
            <div className="modal-body">
                <h4 className='modal-header'>{modalState?.action} Affiliated University</h4>
                <button onClick={() => setModalState({ isOpen: false , action: ""})} className="cancel-btn">X</button>
                {modalState?.id? <h5>document id: {modalState?.id}</h5>:''}
                <form className="modal-form" onSubmit={handleSubmit(onSubmit)}>

                    <div className="input-container">
                        <label>
                            affiliated university name
                        </label>
                        <input {...register("name")} placeholder="Blog Title*" className="input-field" />
                    </div>
                
                    <div className="input-container">
                        <label>
                            affiliated university name Slug
                        </label>
                        <input {...register("slug")} placeholder="Slug*" className="input-field" />
                    </div>
                
                    <div className="input-container">
                        <label>
                            description
                        </label>
                        <input {...register("description")} placeholder="Descrition" className="input-field" />
                    </div>
                
                    <div className="input-container">
                        <label>
                            Meta Title
                        </label>
                        <input {...register("meta_title")} placeholder="Meta title(important for seo)*" className="input-field" />
                    </div>
                
                    <div className="input-container">
                        <label>
                            Meta Keywords
                        </label>
                        <input {...register("meta_keywords")} placeholder="Meta keywords(important for seo-comma separated)*" className="input-field" />
                    </div>
                
                    <div className="input-container">
                        <label>
                            Meta Description
                        </label>
                        <input {...register("meta_description")} placeholder="Meta description(important for seo)*" className="input-field" />
                    </div>
                
                
                    <div className="input-container">
                        <label>
                            details*(maximum 10 images allowed) 
                        </label>
                    </div>

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

                    
                    <div className="input-container">
                        <label>
                            Blog tags/keywords
                        </label>
                        <input {...register("tags")} placeholder="tags (comma separated)" className="input-field" />
                    </div>                    
                    
                    <div className="input-container">
                        <label>
                            location of the affiliated university
                        </label>
                        <input {...register("location")} placeholder="enter the location*" className="input-field" />
                    </div>

                    
                    <div className="input-container">
                        <label>
                            header image
                        </label>
                        <input type="file" {...register("header_image")} className="input-field" />
                    </div>
                    

                    
                    <div className="input-container">
                        <label>
                            university logo
                        </label>
                        <input type="file" {...register("logo")} className="input-field" />
                    </div>
                    
                    <div className="input-container">
                        <label>
                            publish now?
                        </label>                    
                        <select {...register("status")} className="input-field">
                            <option value="">select</option>
                            <option value="draft">Draft</option>
                            <option value="published">Published</option>
                        </select>

                    </div>
                    
                    <br/>
                    
                    <button type="submit" className="submit-button">{modalState?.action} Blog</button>
                </form>
            </div>
        </div>
    ))
}

export default AffiliatedUniActionModal
