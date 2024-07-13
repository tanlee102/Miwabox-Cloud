"use client";

import Cookies from 'js-cookie';
import React, { createContext, useEffect, useState } from 'react'

import Nav from '../components/Nav';
import PostModal from '../components/ShowPanel/PostModal';
import CreateLoginModal from '../components/Login/CreateLoginModal';
import CreateRegisterModal from '../components/Login/CreateRegisterModal';
import CreateForgotPass from '../components/Login/CreateForgotPass';
import AddPost from '../components/Post/AddPost';
import AddPostButton from '../components/Post/AddPostButton';
import Post from '../components/Post/Post';
import Link from 'next/link';
import Modal from '../components/ShowPanel/Modal';
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';

export const WindowContext = createContext();

const WindowProvider = ({ children }) => {
  
    const [darkMode, setDarkMode] = useState(Cookies.get('dark_mode') === 'true');
    const [displayLoginModel, setDisplayLoginModel] = useState(false);
    const [displayForgotModel, setDisplayForgotModel] = useState(false);
    const [displayRegisterModel, setDisplayRegisterModel] = useState(false);
    const [displayAddPost, setDisplayAddPost] = useState(false);
    const [gridMode, setGridMode] = useState(true);
    const [displayPost, setDisplayPost] = useState(false);

    const [logged, setLogged] = useState(false);
    const [userData, setUserData] = useState({});
  
    useEffect(() => {
      const token = Cookies.get('token');
      if (token) {
        const decoded = jwtDecode(token);
        setLogged(true);
  
        if (Cookies.get('thumbnail')) {
          decoded.thumbnail = Cookies.get('thumbnail');
          setUserData(decoded);
        } else {
          axios.get('http://localhost:8080/api/v1/users/thumbnail', {
            headers: {
              Authorization: `Bearer ${token}`
            }
          })
          .then(response => {
            let thumbnailUrl = 'http://localhost:3000/image/'+response.data+'.jpeg';
            if(!(response.data.length > 1)){
                thumbnailUrl="/avatar.jpeg"
            }
            Cookies.set('thumbnail', thumbnailUrl);
            decoded.thumbnail = thumbnailUrl;
            setUserData(decoded);
          })
          .catch(error => {
            console.error('Error loading thumbnail:', error);
          });
        }
      }
    }, []);

    useEffect(() => {
      document.body.classList.remove('dark-mode', 'light-mode');
      document.body.classList.add(darkMode ? 'dark-mode' : 'light-mode');
    }, [darkMode]);
    
    
  return (
    <WindowContext.Provider  value={{darkMode, setDarkMode, gridMode, setGridMode,
                                    displayLoginModel, setDisplayLoginModel, 
                                    displayForgotModel, setDisplayForgotModel,
                                    displayRegisterModel, setDisplayRegisterModel,
                                    displayAddPost, setDisplayAddPost,
                                    displayPost, setDisplayPost,
                                    logged, setUserData, userData, setLogged
                                    }}>
        <main className="content" dark-mode={darkMode ? "true" : "false"}>
            <Nav/>
            {children}
        </main>

        <Modal displayModel={displayLoginModel} setDisplayModel={setDisplayLoginModel} title={'Login'} displayfooter={false} body={<CreateLoginModal />}/>
        <Modal displayModel={displayRegisterModel} setDisplayModel={setDisplayRegisterModel} title={'Register'} displayfooter={false} body={<CreateRegisterModal />}/>
        <Modal displayModel={displayForgotModel} setDisplayModel={setDisplayForgotModel} title={'Forgot password'} displayfooter={false} body={<CreateForgotPass />}/>
        <Modal displayModel={displayAddPost} setDisplayModel={setDisplayAddPost} title={"Tạo bài viết"} displayfooter={true} body={<AddPost/>} footer={<AddPostButton/>}/>
        <PostModal displayModel={displayPost} setDisplayModel={setDisplayPost} title={<Link onClick={() => setDisplayPost(false)} href={"/post/1"}>Bài viết của Tan</Link>} displayfooter={false} body={<Post/>}/>

    </WindowContext.Provider>
  )
}

export default WindowProvider