import React, { useContext } from 'react'
import { useState, useEffect } from 'react';

import { env_variable } from '../../env';
import { hideMainScrollBar } from '@/app/helper/hideMainScrollBar';
import axios from 'axios';
import Cookies from 'js-cookie';
import { WindowContext } from '@/app/context/WindowContext';


const EditUserName = ({isDisplay,setIsDisplay, textIn, setTextIn}) => {

    const [checkSame, setCheckSame] = useState(false);
    const {setUserData} = useContext(WindowContext)

    const handleChange = event => {
        const result = event.target.value.replace(/[^a-z0-9]/gi, '').replace(/\s/g,'').toLowerCase();
        setTextIn(result);
    };
    
    const checkUserNameBtn = async () =>{
        if (textIn.trim().length >= 2) {
            try {
              const response = await axios.get(`http://8.219.96.109/api/v1/users/${encodeURIComponent(textIn)}/exists`);
              if (response.data) {
                console.log("Username exists");
                setCheckSame(true);
              } else {
                console.log("User fine, nothing");
                setCheckSame(false);
              }
            } catch (error) {
              console.error('Error checking username:', error);
            }
          } else {
          }
    }    

    const updateUserNameBtn = async () => {
        const token = Cookies.get('token');
        if (!token) {
          alert('No authentication token found');
          return;
        }
        try {
          const response = await axios.post('http://8.219.96.109/api/v1/users/update/username', 
            { username: textIn }, 
            {
              headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
              }
            }
          );
          if (response.status === 200) {
            Cookies.set('token', response.data.token, { expires: 7 });  // Set token to expire in 7 days
            Cookies.set('username', textIn, { expires: 7 });  // Set token to expire in 7 days
            setUserData((prevUserData) => ({
              ...prevUserData,
              username: textIn
            }));
            alert('Username updated successfully');
            setIsDisplay(false);
          }
        } catch (error) {
          console.error('Error updating username:', error);
          alert('Failed to update username');
        }
    }


    useEffect(() => {
      hideMainScrollBar(isDisplay);
    }, [isDisplay]);

  return (
    <div  class={isDisplay ? "dialog-confirm active-confirm" : "dialog-confirm"}>
  
        <div>
            {/* <div>
                <header> 
                    <h3> Chỉnh sửa tên tài khoảng </h3> 
                    <i class="fa fa-close" aria-hidden="true" onClick={() => setIsDisplay(false)}></i>
                </header>

                <div class="dialog-msg dialog-user-name"> 

                    <input value={textIn} onChange={handleChange} placeholder='Nhập tên tài khoảng' id='input-dialog-user-name' type="text" maxLength={env_variable.MAX_NAME_USER_LENGTH}
                    onBlur={(e) => checkUserNameBtn()}/>
                    {checkSame ? <span>Tên này đã được sử dụng.</span> : "" }

                </div>
                
                <footer>
                    <div class="controls"> 
                        <button class="button button-danger doAction" onClick={() => {updateUserNameBtn()}}>Vâng</button>  
                         <button class="button button-default cancelAction" onClick={() => setIsDisplay(false)}>Hủy</button> 
                    </div>
                </footer>

            </div> */}

            <div>
                <header> 
                    <h3>Edit Account Name</h3> 
                    <i class="fa fa-close" aria-hidden="true" onClick={() => setIsDisplay(false)}></i>
                </header>

                <div class="dialog-msg dialog-user-name"> 
                    <input 
                        value={textIn} 
                        onChange={handleChange} 
                        placeholder='Enter account name' 
                        id='input-dialog-user-name' 
                        type="text" 
                        maxLength={env_variable.MAX_NAME_USER_LENGTH}
                        onBlur={(e) => checkUserNameBtn()}
                    />
                    {checkSame ? <span>This name is already taken.</span> : "" }
                </div>
                
                <footer>
                    <div class="controls"> 
                        <button class="button button-danger doAction" onClick={() => {updateUserNameBtn()}}>Yes</button>  
                        <button class="button button-default cancelAction" onClick={() => setIsDisplay(false)}>Cancel</button> 
                    </div>
                </footer>
            </div>

        </div>

    </div>
  )
}

export default EditUserName
