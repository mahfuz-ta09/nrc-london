'use client'
import { toast } from 'react-toastify'
import ReactQuill from 'react-quill-new'
import 'react-quill-new/dist/quill.snow.css'
import { useForm, Controller } from "react-hook-form"
import { base64ToFile } from '@/utils/convertFileType'
import '../SharedCountryUni/AddCountryModal/AddCountryModal.css'
import { useCreateBlogMutation } from '@/redux/endpoints/blogs/blogsEndpoint'
import useImageUpload from '@/utils/useImageUpload'
import Loader from '@/component/shared/Loader/Loader'


type ModalProps = {
  modalState: { isOpen: boolean }
  setModalState: React.Dispatch<React.SetStateAction<any>>
}


type BlogFormData = {
    title: string
    slug: string
    author: string
    description: string
    content: { summary: string; body: string }
    categories: string
    tags: string
    status: string
    isFeatured: boolean
    header_image: FileList
}

const BlogActionModal = ({ setModalState, modalState }: ModalProps) => {
    const [createBlog, { isLoading: createLoadig }] = useCreateBlogMutation()
    const { uploadImage , isLoading: imageLoading, error } = useImageUpload()
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
            formData.append("description", JSON.stringify(data.description))
            formData.append("categories", JSON.stringify(data.categories.split(",").map(c => c.trim())))
            formData.append("tags", JSON.stringify(data.tags.split(",").map(t => t.trim())))
            formData.append("header_image",data.header_image[0])


            const parser = new DOMParser();
            const doc = parser.parseFromString(data.content.body, 'text/html');
            const imgElements = doc.querySelectorAll('img')

            if(imgElements.length > 0){
                let i=0
                const updatedData = new FormData()
                
                imgElements.forEach((imgEl) => {
                    const src = imgEl.getAttribute("src");
                    if (src && src.startsWith("data:image")) {
                        const file = base64ToFile(src, `editor-img-${i}.png`);
                        console.log("files inside modal",file)
                        updatedData.append("images", file);
                        i++;
                    }
                })
                
                const uploaded = await uploadImage(updatedData)
                formData.append("urlLists", JSON.stringify(uploaded))
                
                imgElements.forEach((imgEl,index) => {
                    const src = imgEl.getAttribute("src");
                    if (src && src.startsWith("data:image")) {
                        imgEl.setAttribute("src", uploaded?.[index]?.url)
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
            res = await createBlog({data:formData})

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
        (imageLoading || createLoadig) ? <Loader /> :
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
                        <input {...register("slug", { required: true })} placeholder="Slug (optional)" className="input-field" />
                    </div>
                
                    <div className="input-container">
                        <label>
                            Blog Author
                        </label>
                        <input {...register("author",{ required: true })} placeholder="Author" className="input-field" />
                    </div>
                
                
                    <div className="input-container">
                        <label>
                            Blog Description
                        </label>
                        <input {...register("description" ,{ required: true })} placeholder="Author" className="input-field" />
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
                    
                    <button type="submit" className="modal-sbmt-btn">Create Blog</button>
                </form>
            </div>
        </div>
    ))
}

export default BlogActionModal
