import { useFormContext } from 'react-hook-form'

type EditableInputProps = {
    name: string
    label: string
    readOnly?: boolean
}

const EditableInput = ({ name, label, readOnly = false }: EditableInputProps) => {
    const { register, watch } = useFormContext();
    const value = watch(name);
    
    const getInputType = () => {
        if (label.toLowerCase().includes("date")) return "date";
        if (label.toLowerCase().includes("email")) return "email";
        if (label.toLowerCase().includes("phone")) return "tel";
        if (label.toLowerCase().includes("scholarship")) return "number";
        return "text";
    }

    
    if (readOnly) {
        return (
            <div className="input-container">
                <label>{label}</label>
                <h6 style={{width:"100%",padding:"9px",borderRadius:"5px",fontSize:"13px",fontWeight:"500",
                    border:"1px solid #dbdbdbff"}}>{value}</h6>
            </div>
        )
    }
    
    
    if(name==='personalInfo.gender'){
        return (
            <div className="input-container">
                <label>{label}</label>
                <select style={{padding:"9px"}} {...register(name)}>
                    <option value="">Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                </select>
            </div>
        )
    }
    
    if(name==='personalInfo.maritalStatus'){
        return (
            <div className="input-container">
                <label>{label}</label>
                <select style={{padding:"9px"}} {...register(name)}>
                    <option value="">Select Status</option>
                    <option value="married">Married</option>
                    <option value="unmerried">Unmerried</option>
                </select>
            </div>
        )
    }

    return (
        <div className="input-container">
            <label>{label}</label>
            <input type={getInputType()} {...register(name)} />
        </div>
    )
}

export default EditableInput
