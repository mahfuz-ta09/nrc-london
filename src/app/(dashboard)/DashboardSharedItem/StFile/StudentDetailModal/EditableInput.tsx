import { useFormContext } from 'react-hook-form'

type EditableInputProps = {
    name: string
    label: string
    readOnly?: boolean
}

const EditableInput = ({ name, label, readOnly = false }: EditableInputProps) => {
    const { register, watch } = useFormContext()
    const value = watch(name)

    const getInputType = () => {
        if (label.toLowerCase().includes('date')) return 'date'
        if (label.toLowerCase().includes('email')) return 'email'
        if (label.toLowerCase().includes('phone')) return 'tel'
        if (label.toLowerCase().includes('scholarship')) return 'number'
        return 'text'
    }

    if (readOnly) {
        return (
            <div className="input-container">
                <label>{label}</label>
                <input value={value ?? '___'} readOnly />
            </div>
        )
    }

    return (
        <div className="input-container">
            <label>{label}</label>
            <input
                type={getInputType()}
                {...register(name)}
                defaultValue={value ?? ''}
            />
        </div>
    )
}

export default EditableInput
