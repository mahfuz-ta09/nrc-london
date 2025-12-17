import React, { useState, useEffect } from "react";
import {
  useForm,
  FormProvider,
  useFieldArray,
} from "react-hook-form";
import { toast } from "react-toastify";
import { useUserInfo } from "@/utils/useUserInfo";
import Loader from "@/component/shared/loader/loader";
import { FILE_CATEGORIES, StudentListProps } from "../../type";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faFile, faTrash } from "@fortawesome/free-solid-svg-icons";
import { useEditStudentFileMutation } from "@/redux/endpoints/studentfileprocess/proceedEndpoints";


interface NewFileField {
    fileFor: string;
    file: FileList | null;
}

interface FileFormValues {
    newFiles: NewFileField[];
    permission: {
        permission_studentsFile: string;
    };
    applicationState: {
        studentsFile: {
            verified: string;
            complete: string;
        };
    };
}

const AllFile = ({ detailState, setdetailState }: StudentListProps) => {
    const userData = useUserInfo()
    const [isEditing, setIsEditing] = useState(false);
    const [deletedFiles, setDeletedFiles] = useState<string[]>([]);
    const [editStudentFile,{ isLoading}] = useEditStudentFileMutation()

    const methods = useForm<FileFormValues>({
        defaultValues: {
            newFiles: [],
        },
    });

    const { control, handleSubmit, register, setValue } = methods;

    const { fields, append, remove } = useFieldArray({
        control,
        name: "newFiles",
    });

    const handleDelete = (url: string) => {
        setDeletedFiles((prev) =>
            prev.includes(url) ? prev : [...prev, url]
        );
    };

    const onSubmit = async(data: FileFormValues) => {
        if(isEditing){ 
            const confirm = window.confirm("Are you sure aboiut the upgrade?")
            if(!confirm) return
            if(!detailState?.id) return
             
            const formData = new FormData();
            const fileMeta: { fileFor: string; originalName: string; newName: string }[] = [];
            
            if(deletedFiles.length){
                formData.append("deletedFiles", JSON.stringify(deletedFiles));
            }
            
            if(data.newFiles.length){
                data.newFiles.forEach((fileObj) => {
                    if (fileObj.file && fileObj.file.length > 0) {
                        const file = fileObj.file[0];
                        if (file instanceof File) {
                            const newName = `${fileObj.fileFor.replace(/\s+/g, "_")}`;
                            formData.append("files", file, newName);
                            
                            fileMeta.push({
                                fileFor: fileObj.fileFor,
                                originalName: file.name,
                                newName,
                            });
                        }
                    }
                }
            )}
            
            
            const response:any = await Promise.all([
                editStudentFile({ data: formData, id:detailState?.id}).unwrap(),
                editStudentFile({ data: data, id:detailState?.id}).unwrap()
            ])

            if(response[0]?.data?.modifiedCount || response[1]?.data?.modifiedCount){
              toast.success("Student file updated successfully")
              setdetailState({ isOpen: false, data: {}, title: "" })
            }else{
              toast.error("Failed to update student file")
            }
        }
        setIsEditing(false);
    };

    if (isLoading) return <Loader />;
    if (!detailState.isOpen) return null;

    return (
        <div className="modal-container openmoda-container">
            <div className="modal-body">
                <h4 className="modal-header">{detailState?.title}</h4>
                <button
                    onClick={() => setdetailState({ isOpen: false, data: {}, title: "" }) }
                    className="cancel-btn" 
                > X </button>

                <FormProvider {...methods}>
                    <div style={{ display: "flex", justifyContent: "end" }}>
                        {!isEditing ? (
                            <button
                                className="add-btn"
                                type="button"
                                onClick={() => setIsEditing(true)}
                            >
                                ✏️ Edit
                            </button>
                        ) : (
                            <button
                                className="add-btn"
                                type="button"
                                style={{ backgroundColor: "#f55", color: "#fff" }}
                                onClick={() => setIsEditing(false)}
                            >
                                ✖ Cancel
                            </button>
                        )}
                    </div>

                <form className="modal-content" onSubmit={handleSubmit(onSubmit)}>
                    <h3 className="phase-title">Uploaded Files</h3>

                    {detailState?.data?.map((file: any) => (
                        <div
                            key={file._id}
                            style={{
                            borderLeft: "3px solid #004a62",
                            padding: "10px",
                            borderRadius: "8px",
                            backgroundColor:deletedFiles.includes(file.publicID) ? "#ffc1c1ff" : "#f9f9f9",
                            marginBottom: "15px",
                        }}>
                            <strong>{file.fileFor}</strong>
                            <div
                                style={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    marginTop: "10px",
                                }}>
                                <div style={{ display: "flex", gap: "10px" }}>
                                    <FontAwesomeIcon
                                    icon={faFile}
                                    style={{ fontSize: "35px", color: "#004a62" }}
                                    />
                                    <div>
                                    <div>{file.fileName || "Unknown File"}</div>
                                    <small style={{ color: "gray" }}>
                                        {file.uploadedAt}
                                    </small>
                                    </div>
                                </div>

                                <div style={{ display: "flex",alignItems:"center" , gap: "15px" }}>
                                    {!isEditing && <a href={file.url} target="__blank" rel="noreferrer">
                                    <FontAwesomeIcon
                                        icon={faEye}
                                        style={{
                                        cursor: "pointer",
                                        color: "#007bff",
                                        fontSize: "20px",
                                        }}
                                    />
                                    </a>}

                                    {isEditing && (
                                    <button
                                        type="button"
                                        className="remove-btn"
                                        onClick={() => handleDelete(file.publicID)}
                                    >
                                        <FontAwesomeIcon icon={faTrash} />
                                    </button>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}


                    {isEditing &&
                    fields.map((field, index) => (
                        <div
                            key={field.id}
                            className="input-container"
                            style={{
                                borderLeft: "3px solid #004a62",
                                padding: "10px",
                                borderRadius: "8px",
                                backgroundColor: "#f9f9f9",
                                marginBottom: "15px",
                            }}
                        >
                        <label>File Type</label>
                            <select {...register(`newFiles.${index}.fileFor`, {required: true})}>
                                <option value="">Select file type</option>
                                {FILE_CATEGORIES.map((group) => (
                                <optgroup
                                    key={group.category}
                                    label={group.category}
                                >
                                    {group.files.map((f) => (
                                    <option value={f} key={f}>
                                        {f}
                                    </option>
                                    ))}
                                </optgroup>
                                ))}
                            </select>

                            <label>Upload File</label>
                            <input
                                type="file"
                                accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                                {...register(`newFiles.${index}.file`)}
                            />

                        <button
                            type="button"
                            className="remove-btn"
                            onClick={() => remove(index)}
                        >
                            ❌ Remove
                        </button>
                        </div>
                    ))}

                    {isEditing && (
                    <button
                        type="button"
                        className="add-btn"
                        onClick={() =>
                        append({
                            fileFor: "",
                            file: null,
                        })
                        }
                    >
                        + Add Another File
                    </button>
                    )}
                    
                    {(isEditing && userData?.Urole !== 'student') && (
                    <div className="input-container">
                        <label>Allow student to edit this section?</label>
                        <select {...methods.register("permission.permission_studentsFile")}>
                          <option value="">Select</option>
                          <option value="true">Yes</option>
                          <option value="false">No</option>
                        </select>
                    </div>
                    )}
                    {(isEditing && userData?.Urole !== 'student') && (
                    <div className="input-container">
                        <label>Information Verified?</label>
                        <select {...methods.register("applicationState.studentsFile.verified")}>
                          <option value="">Select</option>
                          <option value="true">Verified</option>
                          <option value="false">Not Verified</option>
                        </select>
                    </div>
                    )}
                    {(isEditing && userData?.Urole !== 'student') && (
                    <div className="input-container">
                      <label>Section Complete?</label>
                        <select {...methods.register("applicationState.studentsFile.complete")}>
                          <option value="">Select</option>
                          <option value="true">Complete</option>
                          <option value="false">Incomplete</option>
                        </select>
                    </div>
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
