'use client'

import React, { useContext, useRef, useState } from 'react'
import Link from 'next/link';

import ReCAPTCHA from "react-google-recaptcha";

import { WindowContext } from '@/app/context/WindowContext';
import axios from 'axios';
import { LayoutContext } from '@/app/context/LayoutContext';
import { usePathname, useRouter } from 'next/navigation';

const CreateRegisterModal = () => {

    const recaptchaRef = useRef();
    const {setDisplayLoginModel, setDisplayRegisterModel}  = useContext(WindowContext);

    const [load, setLoad] = useState(false);

    const [name, setName] = useState("");
    const [isExistUsername, setIsExistUsername] = useState(false);

    const [email, setEmail] = useState("");
    const [isValidEmail, setIsValidEmail] = useState(true);

    const [password, setPassword] = useState("");
    const [repassword, setRePassword] = useState("");
    const [isMatchPass, setIsMatchPass] = useState(true);
    const [isCorrectPass, setIsCorrectPass] = useState(true);

    const [reCaptcha, setReCaptcha] = useState(null);

    const {conFirmFun} = useContext(LayoutContext)

    const pathname = usePathname()
    const router = useRouter()

    function onChangeReCaptcha(value) {
        setReCaptcha(value);
    }

    const handleBlur = async () => {
      if (name.trim().length >= 2) {
        try {
          const response = await axios.get(`http://localhost:8080/api/v1/users/${encodeURIComponent(name)}/exists`);
          if (response.data.exists) {
            setIsExistUsername(true);
          } else {
            console.log("User fine, nothing")
            setIsExistUsername(false);
          }
        } catch (error) {
          console.error('Error checking username:', error);
        }
      } else {
      }
    };

    const onChangeRePassword = (e) => {
      let str = String(e.target.value).replace(/\s/g, '');
      setRePassword(str)
      if(str === password || str === '' ||  password === ''){
        setIsMatchPass(true)
      }else{
        setIsMatchPass(false)
      }
    }

    const onChangePassword = (e) => {
      let str = String(e.target.value).replace(/\s/g, '');
      setPassword(str)
      if(str === repassword || str === '' ||  repassword === ''){
        setIsMatchPass(true)
      }else{
        setIsMatchPass(false)
      }
      if(str.length < 8 && str.length != 0){
        setIsCorrectPass(false);
      }else{
        setIsCorrectPass(true);
      }
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

    const createAccountBtn = async () => {
      if (!name || !email || !password || !repassword || !reCaptcha) {
        alert('Please fill in all fields and complete the reCAPTCHA');
        return;
      }
  
      if (!isCorrectPass || !isMatchPass || !isValidEmail || isExistUsername) {
        alert('Please resolve the errors before proceeding');
        return;
      }
  
      setLoad(true);
  
      try {
        const response = await axios.post('http://localhost:3000/api/auth/password/register', {
          username: name,
          password: password,
          email: email
        });
  
        if (response.status === 200) {
          conFirmFun('Registration', 'We have sent a link to the address ' + email + ' to complete your registration confirmation.');
          reset();
        } else {
          alert('Failed to create account. Please try again.');
        }
      } catch (error) {
        console.error('Error creating account:', error);
        alert('Failed to create account. Please try again.');
      } finally {
        setLoad(false);
      }
    }


    const reset = () => {
      setDisplayRegisterModel(false)
      setEmail("")
      setPassword("")
      setReCaptcha(null)
      setRePassword("")
      setName("")
    }
      
  return (
    <div className="contain-login">
      <div className="content-login">
          <div>

              <input style={{marginBottom: (name.length == 0 || String(name.trim()).length >= 2) ? '10px' : '5px'}} value={name} onBlur={handleBlur} onChange={(e) => setName(e.target.value)} type="text" placeholder="Username"/>
              <span style={{color: "tomato",display: (isExistUsername ? "block" : "none"), marginBottom: ((name.length == 0 || String(name.trim()).length >= 2) ? "" : "0px")}} className="info-text-login">Username already taken.</span>
              <span style={{color: "tomato",display: (name.length == 0 || String(name.trim()).length >= 2) ? "none" : "block"}} className="info-text-login">Username must be at least 2 characters.</span>

              <input style={{marginBottom: isValidEmail ? '10px' : '5px'}}  value={email} onChange={(e) => onEmailChange(e)} type="email" placeholder="Email"/>
              <span style={{color: "tomato",display: isValidEmail ? "none" : "block"}} className="info-text-login">Invalid email address.</span>
              
              <input style={{ marginBottom: isCorrectPass ? '10px' : '5px'}} value={password} onChange={(e) => onChangePassword(e)} type="password" placeholder="Password"/>
              <span style={{color: "tomato",display: isCorrectPass ? "none" : "block"}} className="info-text-login">Password must be at least 8 characters.</span>

              <input style={{ marginBottom: isMatchPass ? '10px' : '5px'}}  value={repassword} onChange={(e) => onChangeRePassword(e)} type="password" placeholder="Confirm Password"/>
              <span style={{color: "tomato",display: isMatchPass ? "none" : "block"}} className="info-text-login">Passwords do not match.</span>

              <div className='contain-recaptcha'>
              <ReCAPTCHA
                    ref={recaptchaRef}
                    sitekey="6LcccwsoAAAAAF8e0OJQy8ym93hBPETHnGTD6ai1"
                    onChange={onChangeReCaptcha}
                />
              </div>

              <span className="btn-login" onClick={() => createAccountBtn()}>
                {!load ? <p>Create Account</p> : <div class="loader-circle-small"><div></div></div> }
              </span>

              {pathname === '/auth/signup' ?
                <span className="btn-text-login" onClick={() => { router.push("/auth/login") }} >Login?</span>
              :
                <span className="btn-text-login" onClick={() => {if(!load){ setDisplayRegisterModel(false); setDisplayLoginModel(true)}}} >Login?</span>
              }
          </div>
      </div>
    </div>
  )
}

export default CreateRegisterModal

