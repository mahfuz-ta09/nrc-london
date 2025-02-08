'use client'
import '@/css/Dashboard/admin/test-prep.css'
import { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

type Inputs = {
    question: string
    answer: string
}

const page = () => {
    const [access,setAccess] = useState(false)
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<Inputs>()
    
    const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data)

    return (
      <div className='testPrep-content'>
        <div className="header">
          <h1>Test Preparation:</h1>
          <button>Add</button>
        </div>


        <div className="table-container">
            {/* <h1>Edit mode/ your data</h1> */}
            <form onSubmit={handleSubmit(onSubmit)} className='prep-table'>
                <div className='item-group'>
                    <div className="item">
                        <label htmlFor="What is your question?">What is your question?</label>
                        <input type="text" value="hell yes" {...register("question")}/>
                    </div>
                    
                    <div className="item">
                        <label htmlFor="Your answer">Your answer</label>
                        <textarea {...register("answer")}/>
                    </div>
                </div>
                <div className='item-group'>
                    <div className="item">
                        <label htmlFor="What is your question?">What is your question?</label>
                        <input type="text" value="hell yes" {...register("question")}/>
                    </div>
                    
                    <div className="item">
                        <label htmlFor="Your answer">Your answer</label>
                        <textarea {...register("answer")}/>
                    </div>
                </div>
                <div className='item-group'>
                    <div className="item">
                        <label htmlFor="What is your question?">What is your question?</label>
                        <input type="text" value="hell yes" {...register("question")}/>
                    </div>
                    
                    <div className="item">
                        <label htmlFor="Your answer">Your answer</label>
                        <textarea {...register("answer")}/>
                    </div>
                </div>
                <div className='item-group'>
                    <div className="item">
                        <label htmlFor="What is your question?">What is your question?</label>
                        <input type="text" value="hell yes" {...register("question")}/>
                    </div>
                    
                    <div className="item">
                        <label htmlFor="Your answer">Your answer</label>
                        <textarea {...register("answer")}/>
                    </div>
                </div>

                <input className='edit' type="submit" value="edit"/>
                {/* <input className='edit' type="submit" value="edit"/> */}
            </form>
        </div>

      </div>
    )
}

export default page