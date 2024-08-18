'use client'

import React, { useContext, useRef, useState } from 'react'
import ReCAPTCHA from "react-google-recaptcha";

import { WindowContext } from '@/app/context/WindowContext';
import axios from 'axios';

const CreateForgotPass = () => {

    const recaptchaRef = useRef();

    const {setDisplayLoginModel, setDisplayForgotModel}  = useContext(WindowContext);

    const [load, setLoad] = useState(false);

    const [email, setEmail] = useState("");
    const [isValidEmail, setIsValidEmail] = useState(true);

    const [reCaptcha, setReCaptcha] = useState(null);

    function onChangeReCaptcha(value) {
      setReCaptcha(value)
      console.log("Captcha-value:", value);
    }

    const onEmailChange = (e) => {
      setEmail(String(e.target.value).toLowerCase())
        let re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if ( re.test(String(e.target.value)) || String(e.target.value) === '') {
          setIsValidEmail(true)
        }else {
          setIsValidEmail(false)
        }
    }

    const createPasswordBtn = async () => {
      if (!isValidEmail || !reCaptcha) {
        alert("Please enter a valid email and complete the reCAPTCHA.");
        return;
      }
  
      setLoad(true);
  
      try {
        const response = await axios.post('http://localhost:3000/api/auth/password/forgot', {
          email: email,
          recaptcha: reCaptcha
        });
  
        if (response.data.success) {
          alert("Success! Check your email for a password reset link.");
        } else {
          alert("Failed to send reset link. Please try again later.");
        }
      } catch (error) {
        console.error("Error:", error);
        alert("An error occurred. Please try again later.");
      } finally {
        setLoad(false);
      }
    }


  return (
    <div className="contain-login">

      <div className="content-login">
          <div>

              <span className='info-text-login'>Enter the email address associated with your account, we will send a link to reset your password.</span>
              <input style={{marginBottom: isValidEmail ? '10px' : '5px'}}  value={email} onChange={(e) => onEmailChange(e)} type="email" placeholder="Enter email"/>
              <span style={{color: "tomato",display: isValidEmail ? "none" : "block"}} className="info-text-login">Invalid email.</span>

              <div className='contain-recaptcha'>
              <ReCAPTCHA
                    ref={recaptchaRef}
                    sitekey="6LcccwsoAAAAAF8e0OJQy8ym93hBPETHnGTD6ai1"
                    onChange={onChangeReCaptcha}
                />
              </div>

              <span className="btn-login" onClick={() => createPasswordBtn()}>
                {!load ? <p>Reset password</p> : <div class="loader-circle-small"><div></div></div> }
              </span>
              
              <span className="btn-text-login" onClick={() => {if(!load){setDisplayForgotModel(false); setDisplayLoginModel(true)}}} >Login?</span>
              
          </div>

      </div>

   </div>
  )
}

export default CreateForgotPass
