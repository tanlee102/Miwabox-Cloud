import React, { useContext } from 'react'
import { useState, useEffect } from 'react';
import { hideMainScrollBar } from '@/app/helper/hideMainScrollBar';
import { LayoutContext } from '@/app/context/LayoutContext';
import Cookies from 'js-cookie';
import axios from 'axios';

const ChangeEmailBox = ({isDisplay,setIsDisplay,myData}) => {

    const {conFirmFun} = useContext(LayoutContext);

    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [isValidEmail, setIsValidEmail] = useState(true);

    const onEmailChange = (e) => {
        setEmail(String(e.target.value))
          let re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
          if ( re.test(String(e.target.value)) || String(e.target.value) === '') {
            setIsValidEmail(true)
          }else {
            setIsValidEmail(false)
          }
    }


    const changeEmailBtn = async () => {
        if (email === myData.email) {
            conFirmFun('Change Email', 'The requested email must be different from the current email!');
        } else {
            if (isValidEmail) {
                if (email !== '' && password !== '') {
                    const token = Cookies.get('token');
                    if (!token) {
                        alert('No authentication token found');
                        return;
                    }
    
                    try {
                        const response = await axios.post('http://localhost:8080/api/v1/auth/email/change', {
                            email: email,
                            password: password
                        }, {
                            headers: {
                                Authorization: `Bearer ${token}`
                            }
                        });
    
                        if (response.data.token) {
                            Cookies.set('token', response.data.token, { expires: 7 });  // Set token to expire in 7 days
                            alert("Email changed successfully!");
                            setIsDisplay(false);
                        } else {
                            alert("Failed to change email. Please try again.");
                        }
                    } catch (error) {
                        console.error('Error changing email:', error);
                        alert("An error occurred. Please try again later.");
                    }
                } else {
                    conFirmFun('Change Email', 'Please fill in all required information!');
                }
            }
        }
    };
    

    useEffect(() => {
        hideMainScrollBar(isDisplay);
    }, [isDisplay]);

  return (
    <div  class={isDisplay ? "dialog-confirm active-confirm" : "dialog-confirm"}>
  
        <div>
            <div>
                <header> 
                    <h3> Change Email </h3> 
                    <i class="fa fa-close" aria-hidden="true" onClick={() => setIsDisplay(false)}></i>
                </header>

                <div class="dialog-msg dialog-user-name"> 
                    <input value={email} onChange={(e) => onEmailChange(e)} placeholder='Enter new email' id='input-dialog-user-name' type="text" maxLength="50"/>
                    {!isValidEmail ? <span style={{marginTop: '5px'}}>Invalid email.</span> : "" }
                    <input value={password} onChange={(e) => setPassword(String(e.target.value).replace(/\s/g, ''))} style={{marginTop: '10px'}} placeholder='Enter password' id='input-dialog-user-name' type="password" maxLength="70"/>
                </div>

                <footer>
                    <div class="controls"> 
                        <button class="button button-danger doAction" onClick={() => {changeEmailBtn()}}>Yes</button>  
                        <button class="button button-default cancelAction" onClick={() => setIsDisplay(false)}>Cancel</button>
                    </div>
                </footer>

            </div>
        </div>

    </div>
  )
}

export default ChangeEmailBox