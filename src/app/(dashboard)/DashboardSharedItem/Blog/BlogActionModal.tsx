'use client'
import { toast } from 'react-toastify'
import ReactQuill from 'react-quill-new'
import 'react-quill-new/dist/quill.snow.css'
import { useForm, Controller } from "react-hook-form"
import '../SharedCountryUni/AddCountryModal/AddCountryModal.css'
import { useCreateBlogMutation } from '@/redux/endpoints/blogs/blogsEndpoint'


type ModalProps = {
  modalState: { isOpen: boolean }
  setModalState: React.Dispatch<React.SetStateAction<any>>
}


type BlogFormData = {
    title: string
    slug: string
    author: string
    meta: {
        description: string
        keywords: string
        ogTitle: string
        ogDescription: string
    }
    content: { summary: string; body: string }
    categories: string
    tags: string
    status: string
    isFeatured: boolean
    header_image: FileList
}

const BlogActionModal = ({ setModalState, modalState }: ModalProps) => {
    const [createBlog, { isLoading: createLoadig }] = useCreateBlogMutation()
    const { register, control, handleSubmit, reset } = useForm<BlogFormData>({
        defaultValues: {
        title: "",
        slug: "",
        author: "",
        meta: { description: "", keywords: "", ogTitle: "", ogDescription: "" },
        content: { summary: "", body: "" },
        categories: "",
        tags: "",
        status: "draft",
        isFeatured: false,
        },
    })

    const onSubmit = async(data: BlogFormData) => {
        try{
            const formData = new FormData()

            formData.append("title", data.title)
            formData.append("slug",(data.slug || data.title).toLowerCase().replace(/\s+/g, "-"))
            formData.append("author", data.author)
            formData.append("status", data.status)
            formData.append("isFeatured", String(data.isFeatured))

            formData.append("meta", JSON.stringify({
                description: data.meta.description,
                keywords: data.meta.keywords.split(",").map(k => k.trim()),
                ogTitle: data.meta.ogTitle,
                ogDescription: data.meta.ogDescription,
                ogImage: { url: "", publicId: "" }, 
            }))

            
            formData.append("content", JSON.stringify({
                summary: data.content.summary,
                body: data.content.body,
                sections: []
            }))
            
            formData.append("categories", JSON.stringify(data.categories.split(",").map(c => c.trim())))
            formData.append("tags", JSON.stringify(data.tags.split(",").map(t => t.trim())))
            formData.append("header_image",data.header_image[0])

            const res:any = await createBlog({data:formData})

            if(res?.data?.data?.insertedId){
                toast.success('Blog inserted seccessfully')
                reset()
                setModalState({ isOpen: false })
            }else{
                toast.error(res?.data || "Failed to insert blog" )
            }
        }catch(err: any){
            toast.error(err?.data || "something went wrong")
        }
    }

    const modules = {
        toolbar: [
            ['bold', 'italic', 'underline', 'strike'],   
            ['blockquote', 'code-block'],
            ['link', 'image', 'video', 'formula'],

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

    return (
        <div className={modalState?.isOpen ? 'modal-container openmoda-container' : 'modal-container'}>
            <div className="modal-body">
                <h1>Add New Blog</h1>
                <button onClick={() => setModalState({ isOpen: false })} className="cancel-btn">X</button>

                <form className="modal-form" style={{minWidth:'60vw'}} onSubmit={handleSubmit(onSubmit)}>
                
                    <div className="input-container">
                        <label>
                            Blog Title
                        </label>
                        <input {...register("title", { required: true })} placeholder="Blog Title" className="input-field" />
                    </div>
                
                    <div className="input-container">
                        <label>
                            Blog Slug
                        </label>
                        <input {...register("slug")} placeholder="Slug (optional)" className="input-field" />
                    </div>
                
                    <div className="input-container">
                        <label>
                            Blog Author
                        </label>
                        <input {...register("author")} placeholder="Author" className="input-field" />
                    </div>
                
                    <div className="input-container">
                        <label>
                            Meta field for blog
                        </label>
                        <textarea {...register("meta.description")} placeholder="Meta Description" className="input-field" />
                        <input {...register("meta.keywords")} placeholder="Meta Keywords (comma separated)" className="input-field" />
                        <input {...register("meta.ogTitle")} placeholder="OG Title" className="input-field" />
                        <input {...register("meta.ogDescription")} placeholder="OG Description" className="input-field" />
                    </div>
                    <div className="input-container">
                        <label>
                            Blog body & summary
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
                            Blog categories and tags
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
                    
                    <button type="submit" className="modal-sbmt-btn">Create Blog</button>
                </form>
            </div>
        </div>
    )
}

export default BlogActionModal
