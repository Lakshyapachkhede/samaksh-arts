import InputField from '../../components/InputFeild/InputField';
import { React, useEffect, useState } from 'react'
import useFormHandler from '../../hooks/useFormHandler';
import NotificationBox from '../../components/NotificationBox/NotificationBox';
import { storeToken, getToken } from '../../utils/token';
import { useNavigate } from 'react-router-dom';



export const AdminLogin = () => {
  
  useEffect(()=>{
    if (getToken() !== null){
      navigate("/admin/");
    }
  }, []);
  
  const { formData, message, handleFormSubmit, handleChange } = useFormHandler({
    initialData: { username: "", password: "", },
    submitUrl: "https://samaksh-arts.onrender.com/auth/login",
    submitMethod: "POST",
    onSuccessMessage: "Login Successfull!"
  });

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    const result = await handleFormSubmit(e);

    if (result && result.token) {
      // localStorage.setItem("token", result.token); 
      storeToken(result.token);
      navigate("/admin/");
    }
  }
  return (
    <div className='container'>
      <div className='form-top'>

        <h1><i className="fa-solid fa-lock"></i> Admin Login</h1>

      </div>

      <form onSubmit={handleSubmit}>

        <InputField
          name="username"
          value={formData.username}
          onChange={handleChange}
          required={true}
          placeholder="Enter username"
        />

        <InputField
          type='password'
          value={formData.password}
          name="password"
          onChange={handleChange}
          required={true}

          placeholder="Enter your password"
        />
        <div className='center-in-div'>
          <button type='submit'>Submit</button>
        </div>

      </form>

      {message.message && (
        <NotificationBox key={message.id} type={message.type} message={message.message} />
      )}
    </div>
  )
}
