'use client'

import React, { useContext, useRef, useState } from 'react'
import Link from 'next/link';

import ReCAPTCHA from "react-google-recaptcha";

import { WindowContext } from '@/app/context/WindowContext';

const CreateRegisterModal = () => {

    const recaptchaRef = useRef();
    const {setDisplayLoginModel, setDisplayRegisterModel}  = useContext(WindowContext);

    const [load, setLoad] = useState(false);

    const [name, setName] = useState("");

    const [email, setEmail] = useState("");
    const [isValidEmail, setIsValidEmail] = useState(true);

    const [password, setPassword] = useState("");
    const [repassword, setRePassword] = useState("");
    const [isMatchPass, setIsMatchPass] = useState(true)
    const [isCorrectPass, setIsCorrectPass] = useState(true)

    const [reCaptcha, setReCaptcha] = useState(null);

    function onChangeReCaptcha(value) {
        setReCaptcha(value);
    }

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

    const createAccountBtn = () => {
 
    }
      
  return (
    <div className="contain-login">

      <div className="content-login">
          <div>
              <input style={{marginBottom: (name.length == 0 || String(name.trim()).length >= 2) ? '10px' : '5px'}} value={name} onChange={(e) => setName(e.target.value)} type="text" placeholder="Nhập họ và tên"/>
              <span style={{color: "tomato",display: (name.length == 0 || String(name.trim()).length >= 2) ? "none" : "block"}} className="info-text-login">Tên phải ít nhất 2 ký tự.</span>

              <input style={{marginBottom: isValidEmail ? '10px' : '5px'}}  value={email} onChange={(e) => onEmailChange(e)} type="email" placeholder="Nhập email"/>
              <span style={{color: "tomato",display: isValidEmail ? "none" : "block"}} className="info-text-login">Email không hợp lệ.</span>
              
              <input style={{ marginBottom: isCorrectPass ? '10px' : '5px'}} value={password} onChange={(e) => onChangePassword(e)} type="password" placeholder="Nhập mật khẩu"/>
              <span style={{color: "tomato",display: isCorrectPass ? "none" : "block"}} className="info-text-login">Mật khẩu phải ít nhất 8 ký tự.</span>
              <input style={{ marginBottom: isMatchPass ? '10px' : '5px'}}  value={repassword} onChange={(e) => onChangeRePassword(e)} type="password" placeholder="Nhập lại mật khẩu"/>
              <span style={{color: "tomato",display: isMatchPass ? "none" : "block"}} className="info-text-login">Không khớp mật khẩu.</span>

              <div className='contain-recaptcha'>
              <ReCAPTCHA
                    ref={recaptchaRef}
                    sitekey="6LcccwsoAAAAAF8e0OJQy8ym93hBPETHnGTD6ai1"
                    onChange={onChangeReCaptcha}
                />
              </div>

              <span className="btn-login" onClick={() => createAccountBtn()}>
                {!load ? <p>Tạo tài khoản</p> : <div class="loader-circle-small"><div></div></div> }
              </span>

              {/* {router.pathname === '/signup' ?
                <Link href={"/login"}><span className="btn-text-login">Đăng nhập?</span></Link>
                : */}
                <span className="btn-text-login" onClick={() => {if(!load){ setDisplayRegisterModel(false); setDisplayLoginModel(true)}}} >Đăng nhập?</span>
              {/* } */}

          </div>

      </div>

   </div>
  )
}

export default CreateRegisterModal
