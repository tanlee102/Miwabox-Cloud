"use client";

import Cookies from 'js-cookie';
import React, { createContext, useEffect, useState } from 'react'

import Nav from '../components/Nav';
import Modal from '../components/ShowPanel/Modal';
import CreateLoginModal from '../components/Login/CreateLoginModal';
import CreateRegisterModal from '../components/Login/CreateRegisterModal';
import CreateForgotPass from '../components/Login/CreateForgotPass';

export const WindowContext = createContext();

const WindowProvider = ({ children }) => {
  
    const [darkMode, setDarkMode] = useState(Cookies.get('dark_mode') === 'true');
    const [displayLoginModel, setDisplayLoginModel] = useState(false);
    const [displayForgotModel, setDisplayForgotModel] = useState(false);
    const [displayRegisterModel, setDisplayRegisterModel] = useState(false);

    useEffect(() => {
      document.body.classList.remove('dark-mode', 'light-mode');
      document.body.classList.add(darkMode ? 'dark-mode' : 'light-mode');
    }, [darkMode]);
    
    
  return (
    <WindowContext.Provider  value={{darkMode, setDarkMode, 
                                    displayLoginModel, setDisplayLoginModel, 
                                    displayForgotModel, setDisplayForgotModel,
                                    displayRegisterModel, setDisplayRegisterModel
                                    }}>
        <main className="content" dark-mode={darkMode ? "true" : "false"}>
            <Nav/>
            {children}
        </main>

        <Modal displayModel={displayLoginModel} setDisplayModel={setDisplayLoginModel} title={'Đăng nhập'} displayfooter={true} body={<CreateLoginModal />}/>
        <Modal displayModel={displayRegisterModel} setDisplayModel={setDisplayRegisterModel} title={'Tạo tài khoảng'} displayfooter={true} body={<CreateRegisterModal />}/>
        <Modal displayModel={displayForgotModel} setDisplayModel={setDisplayForgotModel} title={'Quên mật khẩu'} displayfooter={true} body={<CreateForgotPass />}/>

    </WindowContext.Provider>
  )
}

export default WindowProvider