import InputField from '../../components/InputFeild/InputField';
import Notification from '../../components/Notification/Notification';
import './Contact.css';

import { React, useState } from 'react'

export default function Contact() {

    const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" });

    const [message, setMessage] = useState({ type: "info", message: "", id:0 });


    const handleFormSubmit = async (e) => {
        e.preventDefault();
        if (!formData.name || !formData.email || !formData.message) {
            setMessage({type:"error", message:"Please fill All Fields!", id:Date.now()})
            return

        }

        try{
            const res = await fetch("https://samaksh-arts.onrender.com/api/v1/contact", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const result = await res.json();
            setMessage({type:"success", message:"Form submitted successfully!", id:Date.now()})

        }
        catch{

            setMessage({type:"error", message:result.error, id:Date.now()})
        }


    }

    const handleChange = (e) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));

    }

    return (
        <>
            <div className="container">

                <div className='form-top'>

                    <h1>Contact Me</h1>
                    <p>Feel free to reach out for commissions, collaborations, or just to say hello.</p>
                </div>

                <form onSubmit={handleFormSubmit}>

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
                    />


                    <InputField

                        name="message"
                        onChange={handleChange}
                        value={formData.message}

                        placeholder="Message"
                        textArea={true}
                        required={true}

                    />

                    <div className='center-in-div'>
                        <button>Submit</button>
                    </div>


                </form>

                {message.message && (
                    <Notification key={message.id} type={message.type} message={message.message} />
                )}

            </div>

        </>
    )
}
