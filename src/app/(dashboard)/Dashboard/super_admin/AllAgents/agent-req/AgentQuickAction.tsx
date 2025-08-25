'use client'
import '../../css/allagents.css'
import { useForm, SubmitHandler } from "react-hook-form"
import { toast } from "react-toastify";
import { useDeleteAgentMutation, useUpdateAgentStatusMutation } from "@/redux/endpoints/agent/agentsEndpoints"
import Loader from '@/component/shared/Loader/Loader';

type AgentStatusForm = {
  applicationStat?: string;
  docStat?: string;
}

const AgentQuickAction = ({ cardId , openCardId }: { cardId:string ,openCardId:string } ) => {
    const [ updateAgentStatus , { isLoading : updateLoading }] = useUpdateAgentStatusMutation()
    const [ deleteAgent , { isLoading : deleteLoading}] = useDeleteAgentMutation()
    const { register, handleSubmit, formState: { errors }} = useForm<AgentStatusForm>({
        defaultValues:{
                applicationStat: "",
                docStat: ""
            }
    })

    
    if(updateLoading || deleteLoading) return <Loader />

    const onSubmit: SubmitHandler<AgentStatusForm> = async(data) =>{  
        try{  
            if(!data?.applicationStat && !data?.docStat) {
                toast.error("both field unselected!")
                return
            }

            let a = window.confirm("Do you want to change the status?")
            if(a){
                const res = await updateAgentStatus({ id:openCardId , data })
                if(res?.data?.data?.modifiedCount){
                    toast.success("Status updated!!")
                }else{
                    toast.error("Failed to update!")
                }
            }
        }catch(err){
            console.error("Error updating status:", err);
            toast.error("Failed to update status!");
        }
    }

        
    const deleteAgentRequest = async(id:string) =>{    
        let a = window.confirm("Do you want to change the status?")
        if(a){
            const res = await deleteAgent({ id: id })
            if(res?.data?.data?.deletedCount){
                toast.success("Status updated!!")
            }else{
                toast.error("Failed to update!")
            }
        }
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className={`card-action-container ${openCardId === cardId? "show-card" : ""}`}>
            <div className="agent-action-header">
                Quick Actions
            </div>

            <div className="select-group">
                <label className="select-label">Application Status</label>
                <div className="custom-select">
                    <select {...register("applicationStat")} id="application_status">
                        <option value="">Select Status</option>
                        <option value="pending">⏳ Pending</option>
                        <option value="approved">✅ Approved</option>
                        <option value="rejected">❌ Rejected</option>
                        <option value="needs_Info">⚠️ Needs Info</option>
                    </select>
                </div>
            </div>

            <div className="select-group">
                <label className="select-label">Document Status</label>
                <div className="custom-select">
                    <select  {...register("docStat")} id="document_status">
                        <option value="">Select Status</option>
                        <option value="approved">✅ Approved</option>
                        <option value="rejected">❌ Rejected</option>
                        <option value="needs_Info">⚠️ Needs Info</option>
                    </select>
                </div>
                <div className="action-buttons">
                    <button type="submit" className="action-btn save">💾 Save</button>
                    <button onClick={()=>deleteAgentRequest(cardId)} className="action-btn" >🔄 Delete This Agent</button>
                </div>
            </div>

        </form>
    )
}

export default AgentQuickAction
