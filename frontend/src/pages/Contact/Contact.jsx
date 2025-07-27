import InputField from '../../components/InputFeild/InputField';
import NotificationBox from '../../components/NotificationBox/NotificationBox';
import useFormHandler from '../../hooks/useFormHandler';
import './Contact.css';
import loadingImg from '../../assets/loading.gif'
import { useNavigate } from 'react-router-dom'
import { React, useState } from 'react'

export default function Contact() {

    const [loading, setLoading] = useState(false)
  


    const { formData, message, handleFormSubmit, handleChange } = useFormHandler({
        initialData: { name: "", email: "", subject: "", message: "" },
        submitUrl: "https://samaksh-arts.onrender.com/api/v1/contact",
        submitMethod: "POST",
        onSuccessMessage: "Form submitted successfully!"
    });


    const submitForm = async (e) => {
        setLoading(true);
        await handleFormSubmit(e)

        setLoading(false);
    }



    return (
        <div className="pages-con">

            <div className="container">

                <div className='form-top'>

                    <h1>Contact Me</h1>
                    <p>Feel free to reach out for commissions, collaborations, or just to say hello.</p>
                </div>

                <form onSubmit={submitForm}>

                    <div className="form-row">
                        <InputField
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required={true}
                            placeholder="Enter your Name"
                        />

                        <InputField
                            type='email'
                            value={formData.email}
                            name="email"
                            onChange={handleChange}
                            required={true}

                            placeholder="Enter a valid Email"
                        />

                    </div>

                    <InputField
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        placeholder="Subject"
                        required={true}

                    />


                    <InputField

                        name="message"
                        onChange={handleChange}
                        value={formData.message}

                        placeholder="Message"
                        textArea={true}
                        required={true}

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


                </form>

                {message.message && (
                    <NotificationBox key={message.id} type={message.type} message={message.message} />
                )}

            </div>
        </div>


    )
}
