'use client'
import Loader from "@/component/shared/Loader/Loader"
import { useCreateAdminMutation } from "@/redux/endpoints/sAdmin/superAdmin"
import { useForm, SubmitHandler } from "react-hook-form"
import { toast } from "react-toastify"



type Inputs = {
    email: string
    password: string
}


type ModalProps = {
  create: boolean 
  setCreat: React.Dispatch<React.SetStateAction<any>>
}

const CreateAdminModal = ({ create , setCreat }: ModalProps) => {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<Inputs>()
    const [createAdmin , { isLoading : createLoading }] = useCreateAdminMutation()

    const onSubmit: SubmitHandler<Inputs> = async(data) => {
        try{
            const res = await createAdmin(data)
            if(res?.data?.data?.acknowledged){
                reset()
                toast.success("Admin created!!")
            }else{
                toast.warning(res?.data?.errorMessage || "Failed to create admin!")
            }
        }catch(err){
            console.log(err)
        }
    }
    
    
    return (
        (createLoading) ? <Loader /> :
        <div className={create ? 'modal-container openmoda-container' : 'modal-container'}>
            <div className="modal-body">
                <h1 className="modal-header">Add New Blog</h1>
                <button onClick={() => setCreat(false)} className="cancel-btn">X</button>

                <form className="modal-form" onSubmit={handleSubmit(onSubmit)}>
                    <div className="input-container">
                        <label htmlFor="email">Insert new admin email</label>
                        <input type="email" {...register("email", {
                            required: "Email is required",
                            pattern: {
                            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                            message: "Enter a valid email address",
                            },
                        })}/>
                        <p className="error">{errors.email?.message}</p>
                    </div>
                    <div className="input-container">
                        <label htmlFor="password">insert new password</label>
                        <input type="password" {...register("password", {
                            required: "Password is required",
                            minLength: { value: 6, message: "Password must be at least 6 characters" },
                        })}/>
                        <p className="error">{errors.password?.message}</p>
                    </div>
                    {createLoading ? <p style={{color:"black"}}>Loading..</p> :<button className="submit-button" type='submit'>create</button>}
                </form>
            </div>
        </div>
    )
}

export default CreateAdminModal
