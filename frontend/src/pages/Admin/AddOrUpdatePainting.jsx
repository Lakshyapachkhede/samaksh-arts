import React, { useEffect, useState } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'
import NotificationBox from '../../components/NotificationBox/NotificationBox';
import useFormHandler from '../../hooks/useFormHandler';
import ImageInput from '../../components/ImageInput/ImageInput';
import InputField from '../../components/InputFeild/InputField';
import { getToken } from '../../utils/token';
import loadingImg from '../../assets/loading.gif'


export default function AddOrUpdatePainting() {
    const [searchParams] = useSearchParams();
    const action = searchParams.get("action") || "create";
    const id = searchParams.get("id");
    const [painting, setPainting] = useState(null);

    const [loading, setLoading] = useState(false)
    const navigate = useNavigate();

    useEffect(() => {
        if (action == "update" && id) {
            fetch(`https://samaksh-arts.onrender.com/api/v1/paintings/${id}`)
                .then(response => response.json())
                .then(data => { setPainting(data); })
                .catch(err => setMessage({ message: "cannot found painting", type: "error", id: Date.now() }));

        }
    }, [action, id]);




    const { formData, message, handleFormSubmit, handleChange, resetForm } = useFormHandler({
        initialData: {
            title: painting?.title || "",
            description: painting?.description || "",
            height: painting?.height || "",
            width: painting?.width || "",
            unit: painting?.unit || "",
            image: null

        },
        submitUrl: action == "create" ? "https://samaksh-arts.onrender.com/api/v1/paintings/" : `https://samaksh-arts.onrender.com/api/v1/paintings/${id}`,
        submitMethod: action == "create" ? "POST" : "PATCH",
        onSuccessMessage: action == "create" ? "Painting Added Successfully!" : "Painting Updated Successfully",
        useFormData: true,
        authToken: getToken()
    });

    useEffect(() => {
        if (action === 'update' && painting && resetForm) {
            resetForm({
                title: painting.title || "",
                description: painting.description || "",
                height: painting.height || "",
                width: painting.width || "",
                unit: painting.unit || "",
                image: null
            })
        }
    }, [painting])

    const submitForm = async (e) => {
        setLoading(true);
        await handleFormSubmit(e)

        setLoading(false);
        navigate("/gallery")
    }

    return (
        <>





            <div className="container">

                <div className='form-top'>

                    <h1>{action === 'create' ?
                        "Add a Painting" : `Update Painting ${painting?.title}`

                    }</h1>
                    <p>Add or Update Paintings for showing them on gallery.</p>
                </div>

                <form onSubmit={submitForm}>


                    <div className='center-in-div'>

                        <ImageInput required={action === 'create' ? true : false} name="image" onChange={handleChange} />

                    </div>


                    <InputField
                        label="Enter Title For Painting:"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        required={true}
                        placeholder="Enter Image Title"


                    />


                    <InputField
                        label="Enter Something About this Painting:"

                        name="description"
                        onChange={handleChange}
                        value={formData.description}

                        placeholder="Description of painting"
                        textArea={true}


                    />


                    <div className="form-row">
                        <InputField
                            label="Width:"
                            name="width"
                            value={formData.width}
                            onChange={handleChange}

                            placeholder="painting width"
                        />

                        <InputField
                            label="Height:"
                            name="height"
                            value={formData.height}
                            onChange={handleChange}


                            placeholder="painting height"
                        />

                        <InputField
                            label="Unit:"

                            value={formData.unit}
                            name="unit"
                            onChange={handleChange}

                            placeholder="unit"
                        />

                    </div>


                    {
                        loading &&
                        <div className='center-in-div'>
                            <img src={loadingImg} alt="" className='loadingIcon' />

                        </div>

                    }

                    <div className='center-in-div'>
                        <button type='submit'>Submit</button>
                    </div>


                </form>

                {message.message && (
                    <NotificationBox key={message.id} type={message.type} message={message.message} />
                )}

            </div>

        </>


    )
}
