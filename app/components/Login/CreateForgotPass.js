import React, { useContext, useRef, useState } from 'react'
import ReCAPTCHA from "react-google-recaptcha";

import { WindowContext } from '@/app/context/WindowContext';

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

    const createPasswordBtn = () => {

  }

  return (
    <div className="contain-login">

      <div className="content-login">
          <div>

              <span className='info-text-login'>Nhập địa chỉ email liên kết với tài khoản của bạn, chúng tôi sẽ gửi một liên kết để thiết lập lại mật khẩu cho bạn.</span>
              <input style={{marginBottom: isValidEmail ? '10px' : '5px'}}  value={email} onChange={(e) => onEmailChange(e)} type="email" placeholder="Nhập email"/>
              <span style={{color: "tomato",display: isValidEmail ? "none" : "block"}} className="info-text-login">Email không hợp lệ.</span>

              <div className='contain-recaptcha'>
              <ReCAPTCHA
                    ref={recaptchaRef}
                    sitekey="6LcccwsoAAAAAF8e0OJQy8ym93hBPETHnGTD6ai1"
                    onChange={onChangeReCaptcha}
                />
              </div>

              <span className="btn-login" onClick={() => createPasswordBtn()}>
                {!load ? <p>Thay đổi mật khẩu</p> : <div class="loader-circle-small"><div></div></div> }
              </span>
              
              {/* {router.pathname === '/login' ? "" : */}
              <span className="btn-text-login" onClick={() => {if(!load){setDisplayForgotModel(false); setDisplayLoginModel(true)}}} >Đăng nhập?</span>
              {/* } */}
              
          </div>

      </div>

   </div>
  )
}

export default CreateForgotPass
