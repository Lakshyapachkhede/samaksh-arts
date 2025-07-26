import React, { useState } from 'react'

const useFormHandler = ({ initialData, submitUrl, submitMethod, onSuccessMessage, authToken, useFormData = false }) => {
    const [formData, setFormData] = useState(initialData);
    const [message, setMessage] = useState({ type: 'info', message: '', id: 0 });

    const handleChange = (e) => {
        const { name, type, files, value } = e.target;

        if (type == 'file') {
            setFormData(prev => ({ ...prev, [name]: files[0] }));
        } else {
            setFormData(prev => ({ ...prev, [name]: value }));
        }
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();

        try {
            let payload;
            let headers = {};

            if (useFormData) {
                payload = new FormData();
                Object.entries(formData).forEach(([key, value]) => {
                    payload.append(key, value);
                });
            } else {
                payload = JSON.stringify(formData);
                headers['Content-Type'] = 'application/json';
            }

            if (authToken) {
                headers['Authorization'] = `Bearer ${authToken}`;

            }


            const res = await fetch(submitUrl, {
                method: submitMethod,
                headers,
                body: payload
            })

            const result = await res.json();
            



            if (res.ok) {
                setMessage({ type: 'success', message: onSuccessMessage, id: Date.now() });
            } else {
                setMessage({ type: 'error', message: result?.error || 'Failed to submit.', id: Date.now() });
            }
            return result;


        } catch {
            setMessage({ type: 'error', message: 'Submission failed.', id: Date.now() });
            return null;
            
        }


    }


    const resetForm = (newData) =>{
        setFormData(newData);
    }


    return { formData, handleChange, handleFormSubmit, message, resetForm};


}

export default useFormHandler;