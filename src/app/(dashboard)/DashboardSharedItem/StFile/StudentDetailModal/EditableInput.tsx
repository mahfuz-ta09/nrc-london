import { useState } from "react";
import { useFormContext } from "react-hook-form";


function EditableInput({name,label,readOnly = false,}: {name: string;label: string;readOnly?: boolean;}) {
    const { register, watch } = useFormContext();
    const [isEditing, setIsEditing] = useState(false);
    const value = watch(name);
    
    
    
    if (readOnly) {
      return (
        <div className="input-container">
          <label>{label}</label>
          <input value={value || "___"} readOnly />
        </div>
      );
    }
    console.log(label)
    return (
      <div className="input-container">
        <label>{label}</label>
        <input
          {...register(name)}
          value={isEditing ? value || "" : value || "___"}
          readOnly={!isEditing}
          onClick={() => setIsEditing(true)}
          onBlur={() => setIsEditing(false)}
          autoFocus={isEditing}
        />
      </div>
    );
}

export default EditableInput
