import { useFieldArray, useFormContext } from "react-hook-form";
import { FILE_CATEGORIES, StudentFileForm } from "../type";

const FileUpload = () => {
    const { register, control } = useFormContext<StudentFileForm>();

    const { fields, append, remove } = useFieldArray({
        control,
        name: "files",
    });

    return (
      <>
        <h3 className="phase-title">Phase 4: File Upload</h3>

        {fields.map((field:any, index:any) => (
          <div key={field.id} className="file-section">
            <div className="input-container">
              <label>File Type</label>
              <select {...register(`files.${index}.fileFor` as const,{required:true})}>
                <option value="">Select file type</option>
                {FILE_CATEGORIES.map((group:any) => (
                  <optgroup key={group.category} label={group.category}>
                    {group.files.map((file:any) => (
                      <option key={file} value={file}>
                        {file}
                      </option>
                    ))}
                  </optgroup>
                ))}
              </select>
            </div>

            <div className="input-container">
              <label>Upload File</label>
              <input
                type="file"
                accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                {...register(`files.${index}.file` as const)}
              />
            </div>

            <button
              type="button"
              onClick={() => remove(index)}
              className="remove-btn"
            >
              Remove File
            </button>

            <hr style={{ margin: "20px 0" }} />
          </div>
        ))}

        <button
          type="button"
          onClick={() => append({ fileFor: "", file: null })}
          className="add-btn"
        >
          + Add File
        </button>
      </>
    );
};


export default FileUpload;