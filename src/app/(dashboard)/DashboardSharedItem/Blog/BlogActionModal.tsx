'use client'
import { toast } from 'react-toastify'
import ReactQuill from 'react-quill-new'
import 'react-quill-new/dist/quill.snow.css'
import { useForm, Controller } from "react-hook-form"
import { base64ToFile } from '@/utils/convertFileType'
import { useCreateBlogMutation, useUpdateBlogMutation } from '@/redux/endpoints/blogs/blogsEndpoint'
import Loader from '@/component/shared/loader/loader'


type ModalProps = {
    modalState: { 
        isOpen: boolean,
        action: string ,
        id: string
    }
    setModalState: React.Dispatch<React.SetStateAction<any>>
}

type BlogFormData = {
    title: string
    slug: string
    description: string

    author: string
    content: { summary: string; body: string }
    
    categories: string
    tags: string
    
    status: string
    isFeatured: boolean
    
    header_image: FileList
    
    meta_title: string
    meta_keywords: string
    meta_description: string
}

const BlogActionModal = ({ setModalState, modalState }: ModalProps) => {
    const [createBlog, { isLoading: createLoadig }] = useCreateBlogMutation()
    const [updateBlog, { isLoading: updateLoadig }] = useUpdateBlogMutation()
    const { register, control, handleSubmit, reset } = useForm<BlogFormData>({
        defaultValues: {
            title: "",
            slug: "",
            author: "",
            content: { summary: "", body: "" },
            categories: "",
            tags: "",
            status: "draft",
            isFeatured: false,
            meta_title: "",
            meta_keywords: "",
            meta_description: "",
            header_image: {} as FileList,
            description: "",
        },
    })

    const onSubmit = async(data: BlogFormData) => {
        try{
            const rep = window.confirm("Are you sure you want to create this blog(do not refresh while uploading)?")
            if(!rep) return

            const formData = new FormData()

            formData.append("title", data.title)
            formData.append("slug",(data.slug).toLowerCase().trim().replace(/\s+/g, "-"))
            formData.append("description", JSON.stringify(data.description))

            formData.append("author", data.author)
            formData.append("status", data.status)
            formData.append("isFeatured", (data.isFeatured).toString())
            
            data?.categories.split(",").map(c => c.trim()).forEach(c => formData.append("categories", c))
            data?.tags.split(",").map(t => t.trim()).forEach(t => formData.append("tags", t))

            formData.append("header_image",data.header_image[0])

            formData.append("meta_title", data.meta_title)
            data?.meta_keywords.split(",").map(k => k.trim()).forEach(k => formData.append("meta_keywords", k))
            formData.append("meta_description", data.meta_description)

            const parser = new DOMParser();
            const doc = parser.parseFromString(data.content.body, 'text/html');
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
            formData.append("content", JSON.stringify({
                summary: data.content.summary,
                body: updatedBody,
                sections: []
            }))

            let res: any
            if(modalState?.action==="Add")res = await createBlog({data:formData}).unwrap()
            else if(modalState?.action==="Edit" && modalState?.id) res = await updateBlog({ data: formData , id: modalState?.id })
            toast.success(`Blog ${modalState?.action==="Edit"? "edit":"added"} successfully`)
            reset()
            setModalState({ isOpen: false , id: ''})
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
                <h4 className='modal-header'>{modalState?.action} Blog</h4>
                <button onClick={() => setModalState({ isOpen: false , action: ""})} className="cancel-btn">X</button>
                {modalState?.id? <h5>document id: {modalState?.id}</h5>:''}
                <form className="modal-form" style={{width:'60vw'}} onSubmit={handleSubmit(onSubmit)}>

                    <div className="input-container">
                        <label>
                            Blog Title
                        </label>
                        <input {...register("title")} placeholder="Blog Title" className="input-field" />
                    </div>
                
                    <div className="input-container">
                        <label>
                            Blog Slug
                        </label>
                        <input {...register("slug")} placeholder="Slug (optional)" className="input-field" />
                    </div>
                
                    <div className="input-container">
                        <label>
                            Blog Description
                        </label>
                        <input {...register("description")} placeholder="Descrition" className="input-field" />
                    </div>
                
                    <div className="input-container">
                        <label>
                            Blog Author
                        </label>
                        <input {...register("author")} placeholder="Author" className="input-field" />
                    </div>
                
                
                    <div className="input-container">
                        <label>
                            Meta Title
                        </label>
                        <input {...register("meta_title")} placeholder="Meta title(important for seo)" className="input-field" />
                    </div>
                
                    <div className="input-container">
                        <label>
                            Meta Keywords
                        </label>
                        <input {...register("meta_keywords")} placeholder="Meta keywords(important for seo-comma separated)" className="input-field" />
                    </div>
                
                    <div className="input-container">
                        <label>
                            Meta Description
                        </label>
                        <input {...register("meta_description")} placeholder="Meta description(important for seo)" className="input-field" />
                    </div>
                
                
                    <div className="input-container">
                        <label>
                            Blog summary & body 
                        </label>
                    </div>

                    <textarea {...register("content.summary")} placeholder="Blog Summary" className="input-field" />

                    <Controller
                        name="content.body"
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
                            Blog categories and tags/keywords
                        </label>
                        <input {...register("categories")} placeholder="Categories (comma separated)" className="input-field" />
                        <input {...register("tags")} placeholder="Tags (comma separated)" className="input-field" />
                    </div>

                    
                    <div className="input-container">
                        <label>
                            Blog Header Image
                        </label>
                        <input type="file" {...register("header_image")} className="input-field" />
                    </div>
                    
                    
                    <select {...register("status")} className="input-field">
                        <option value="draft">Draft</option>
                        <option value="published">Published</option>
                    </select>

                    <input style={{margin:"30px 0"}} type="checkbox" {...register("isFeatured")} /> Featured Blog
                    
                    <br/>
                    
                    <button type="submit" className="submit-button">Create Blog</button>
                </form>
            </div>
        </div>
    ))
}

export default BlogActionModal
