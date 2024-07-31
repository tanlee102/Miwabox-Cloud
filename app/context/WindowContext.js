'use client';

import Cookies from 'js-cookie';
import React, { createContext, useEffect, useState } from 'react';

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
import { useSearchParams } from 'next/navigation';

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
    const [postId, setPostId] = useState(-1);
    const [postUsername, setPostUsername] = useState("");

    const searchParams = useSearchParams();
  
    useEffect(() => {
      let token = Cookies.get('token');

      if(!token) {
        token = searchParams.get('token');
      }

      if (token) {
        
        const decoded = jwtDecode(token);
        setLogged(true);
  
        if (Cookies.get('thumbnail') && Cookies.get('username')) {
          decoded.thumbnail = Cookies.get('thumbnail');
          decoded.username = Cookies.get('username');
          setUserData(decoded);
        } else {
          axios.get('http://localhost:8080/api/v1/users/profile', {
            headers: {
              Authorization: `Bearer ${token}`
            }
          })
          .then(response => {
            const myData = response.data;
            const username = myData.username;
            let thumbnailUrl = 'https://image.lehienthanh.workers.dev/?id='+myData.profileImageUrl;
            if(!(response.data.profileImageUrl)){
                thumbnailUrl="/avatar.jpeg";
            }
            Cookies.set('thumbnail', thumbnailUrl);
            Cookies.set('username', username)
            decoded.thumbnail = thumbnailUrl;
            decoded.username = username;
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
                                    logged, setUserData, userData, setLogged,
                                    setPostId, setPostUsername
                                    }}>
        <main className="content" dark-mode={darkMode ? "true" : "false"}>
            <Nav/>
            {children}
        </main>

        <Modal displayModel={displayLoginModel} setDisplayModel={setDisplayLoginModel} title={'Login'} displayfooter={false} body={<CreateLoginModal />}/>
        <Modal displayModel={displayRegisterModel} setDisplayModel={setDisplayRegisterModel} title={'Register'} displayfooter={false} body={<CreateRegisterModal />}/>
        <Modal displayModel={displayForgotModel} setDisplayModel={setDisplayForgotModel} title={'Forgot password'} displayfooter={false} body={<CreateForgotPass />}/>
        <Modal displayModel={displayAddPost} setDisplayModel={setDisplayAddPost} title={"Create Post"} displayfooter={false} body={<AddPost/>} footer={<AddPostButton/>}/>
        <PostModal  displayModel={displayPost} 
                    setDisplayModel={setDisplayPost} 
                    displayfooter={false} 
                    title={<Link onClick={() => setDisplayPost(false)} href={"/post/"+postId}>Bài viết của {postUsername}</Link>} 
                    body={<Post postId={postId} userData={userData} setDisplayPost={setDisplayPost} displayPost={displayPost}/>} 
                    />

    </WindowContext.Provider>
  )
}

export default WindowProvider