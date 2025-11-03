import React, { useState } from "react";
import {
  FormProvider,
  useForm,
  useFormContext,
  useFieldArray,
} from "react-hook-form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faFile, faTrash } from "@fortawesome/free-solid-svg-icons";
import { StudentListProps } from "../../type";

interface FileField {
  fileName?: string;
  uploadedAt?: string;
  url?: string;
  file?: FileList | null;
}

interface FileFormValues {
  files: FileField[];
}

const FileInput = ({name,label,readOnly,field,onRemove,}: {name: any;label: string;readOnly?: boolean;field: FileField;onRemove?: () => void;}) => {
    const { register, setValue, watch } = useFormContext<FileFormValues>();
    const fileValue = watch(name);

    return (
        <div style={{borderLeft: "3px solid #004a62",padding: "10px",borderRadius: "8px",backgroundColor: "#f9f9f9",marginBottom: "15px"}}>
            <strong>{label}</strong>
            {readOnly && field?.url ? (
                <div style={{display: "flex",justifyContent: "space-between",marginTop: "10px"}}>
                    <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                        <FontAwesomeIcon
                            icon={faFile}
                            style={{ fontSize: "35px", color: "#004a62" }}
                        />
                        <div>
                            <div>{field.fileName || "Unknown File"}</div>
                            <small style={{ color: "gray" }}>{field.uploadedAt}</small>
                        </div>
                    </div>

                    <div style={{ display: "flex", alignItems: "center",justifyContent:"center"}}>
                        <a href={field.url} target="__blank" rel="noreferrer">
                            <FontAwesomeIcon
                                icon={faEye}
                                style={{ cursor: "pointer", color: "#007bff" }}
                            />
                        </a>
                    </div>
                </div>
            ) : (
                 <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
                    <input
                        type="file"
                        accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                        {...register(name)}
                        onChange={(e) => setValue(name, e.target.files)}
                    />
                    <FontAwesomeIcon
                        icon={faTrash}
                        className="remove-btn"
                        onClick={onRemove}
                    />
                </div>
            )}
        </div>
    );
};

const AllFile = ({ detailState, setdetailState }: StudentListProps) => {
    const [isEditing, setIsEditing] = useState(false);

    const methods = useForm<FileFormValues>({
        defaultValues: {
        files:
            detailState?.data?.map((file: any) => ({
                fileName: file.fileName,
                uploadedAt: file.uploadedAt,
                url: file.url,
                file: null,
            })) || [],
        },
    });

    const { control, handleSubmit } = methods;
    const { fields, append, remove } = useFieldArray({
        control,
        name: "files",
    });

    const onSubmit = (data: FileFormValues) => {
        console.log("✅ Updated Files:", data);
        setIsEditing(false);
    };

    if (!detailState.isOpen) return null;

    return (
        <div className={detailState.isOpen? "modal-container openmoda-container": "modal-container"}>
            <div className="modal-body">
                <h4 className="modal-header">{detailState?.title}</h4>

                <button
                    onClick={() =>setdetailState({ isOpen: false, data: {}, title: "" })}
                    className="cancel-btn"
                >X
                </button>

                <FormProvider {...methods}>
                    <div style={{ display: "flex", justifyContent: "end" }}>
                        {!isEditing ? (
                            <button className="add-btn" onClick={() => setIsEditing(true)}>
                                ✏️ Edit
                            </button>
                        ) : (
                            <button
                                className="add-btn"
                                style={{ backgroundColor: "#f55", color: "#fff" }}
                                onClick={() => setIsEditing(false)}
                            >
                                ✖ Cancel
                            </button>
                        )}
                    </div>

                <div style={{marginTop:"20px"}}>
                    <div className="checkbox-container">
                        <h5>🟡 required verification</h5>
                        <br />
                        { isEditing && (<label>mark verified</label>)}
                        { isEditing && (<input type="checkbox" />)}
                    </div>
                    <div className="checkbox-container">
                        <h5>🔴 not ready for submission</h5>
                        <br />
                        { isEditing && (<label>mark this part ready for submission</label>)}
                        { isEditing && (<input type="checkbox" />)}
                    </div>
                    <div className="checkbox-container">
                        <h5>🔴 student are not allowed to change these data</h5>
                        <br />
                        { isEditing && (<label>mark this part ready for submission</label>)}
                        { isEditing && (<input type="checkbox" />)}
                    </div>
                </div>

                    <form onSubmit={handleSubmit(onSubmit)} className="modal-content">
                        <h3 className="phase-title">Uploaded Files</h3>

                        {fields.map((field, index) => (
                            <div key={field.id}>
                                <FileInput
                                    name={`files.${index}.file`}
                                    label={`File ${index + 1}`}
                                    field={field}
                                    readOnly={!isEditing}
                                    onRemove={() => remove(index)}
                                />
                            </div>
                        ))}

                        {isEditing && (
                            <button
                                type="button"
                                className="add-btn"
                                onClick={() =>
                                    append({
                                        fileName: "",
                                        uploadedAt: "",
                                        url: "",
                                        file: null,
                                    })
                                }>
                                + Add Another File
                            </button>
                        )}

                        {isEditing && (
                            <div style={{ marginTop: "1rem", textAlign: "right" }}>
                                <button type="submit" className="add-btn">
                                💾 Save Changes
                                </button>
                            </div>
                        )}
                    </form>
                </FormProvider>
            </div>
        </div>
    );
};

export default AllFile;
