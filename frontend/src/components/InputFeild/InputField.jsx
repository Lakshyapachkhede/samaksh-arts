import React from 'react';
import './InputField.css';

export const InputField = ({
    label,
    type = 'text',
    name,
    value,
    onChange,
    placeholder,
    required = false,
    textArea = false,
}) => {
    return (
        <div className='input-field'>
            {label && <label htmlFor={name}>{label}</label>}

            {textArea ?


                <textarea value={value} id={name} name={name} onChange={onChange} placeholder={placeholder} required={required} rows={7} />
                :
                <input type={type} id={name} name={name} value={value} onChange={onChange} placeholder={placeholder} required={required} />

            }






        </div>
    )
}


export default InputField;