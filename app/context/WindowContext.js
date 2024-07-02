"use client";

import Cookies from 'js-cookie';
import React, { createContext, useState } from 'react'


export const WindowContext = createContext();

const WindowProvider = ({ children }) => {
  
  
    const [darkMode, setDarkMode] = useState((Cookies.get('dark_mode') === 'true'));
    const [displayLoginModel, setDisplayLoginModel] = useState(false);
    const [displayForgotModel, setDisplayForgotModel] = useState(false);
    const [displayRegisterModel, setDisplayRegisterModel] = useState(false);


  return (
    <WindowContext.Provider  value={{darkMode, setDarkMode , 
                                    displayLoginModel, setDisplayLoginModel, 
                                    displayForgotModel, setDisplayForgotModel,
                                    displayRegisterModel, setDisplayRegisterModel
                                    }}>
        {children}
    </WindowContext.Provider>
  )
}

export default WindowProvider