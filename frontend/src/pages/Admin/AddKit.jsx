import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import NotificationBox from '../../components/NotificationBox/NotificationBox';
import useFormHandler from '../../hooks/useFormHandler';
import ImageInput from '../../components/ImageInput/ImageInput';
import InputField from '../../components/InputFeild/InputField';
import { getToken } from '../../utils/token';
import loadingImg from '../../assets/loading.gif'


export default function AddKit() {

    const [loading, setLoading] = useState(false)
    const navigate = useNavigate();


    const { formData, message, handleFormSubmit, handleChange, resetForm } = useFormHandler({
        initialData: {
            title: "",
            description: "",
            image: null,
            link: ""

        },
        submitUrl: "https://samaksh-arts.onrender.com/api/v1/kit/",
        submitMethod: "POST",
        onSuccessMessage: "Item added successfully!",
        useFormData: true,
        authToken: getToken()
    });

    const submitForm = async (e) => {
        setLoading(true);
        await handleFormSubmit(e)
        
        setLoading(false);
        navigate("/kit")
    }


    return (
        <>
            <div className="container">

                <div className='form-top'>

                    <h1>Add Kit Item</h1>
                    <p>Add kit item for showing item you use.</p>
                </div>

                <form onSubmit={submitForm}>


                    <div className='center-in-div'>

                        <ImageInput required={true} name="image" onChange={handleChange} />

                    </div>


                    <InputField
                        label="Enter Name of Item:"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        required={true}
                        placeholder="Enter Item name"


                    />


                    <InputField
                        label="Give some Description About this Item:"

                        name="description"
                        onChange={handleChange}
                        value={formData.description}
                        placeholder="Description of item"
                        textArea={true}

                        required={true}


                    />



                    <InputField
                        label="Link to Item:"
                        name="link"
                        value={formData.link}
                        onChange={handleChange}
                        required={true}

                        placeholder="link"
                    />
                    {
                        loading &&
                        <div className='center-in-div'>
                            <img src={loadingImg} alt="" className='loadingIcon' />

                        </div>

                    }

                    <div className='center-in-div'>
                        <button type='submit'>Submit</button>
                    </div>


                </form >

                {
                    message.message && (
                        <NotificationBox key={message.id} type={message.type} message={message.message} />
                    )
                }

            </div >

        </>


    )
}
