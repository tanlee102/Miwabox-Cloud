'use client'
import React, { useContext, useState } from 'react'

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import axios from 'axios';


const page = ({ params }) => {

    const searchParams = useSearchParams()
    const router = useRouter()
 
    const token = searchParams.get('token');
    const email = searchParams.get('email');

    const [load, setLoad] = useState(false);

    const [password, setPassword] = useState("");
    const [repassword, setRePassword] = useState("");
    const [isMatchPass, setIsMatchPass] = useState(true);
    const [isCorrectPass, setIsCorrectPass] = useState(true);


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


    const createPasswordBtn = async () => {
      if (!isMatchPass || !isCorrectPass) {
        alert("Please ensure the passwords match and are at least 8 characters long.");
        return;
      }

      setLoad(true);

      try {
        const response = await axios.post('https://miwa-cloud-api.netlify.app/api/auth/password/change', {
          token: token,
          email: email,
          password: password
        });

        if (response.data.token) {
          Cookies.set('token', response.data.token);
          router.push('/');
        } else {
          alert("Failed to update password. Please try again.");
        }
      } catch (error) {
        console.error("Error:", error);
        alert("An error occurred. Please try again later.");
      } finally {
        setLoad(false);
      }
    }



  return (
    <div className='contain-layout-setpassword'>
      <div className="contain-login">

              <div className="content-login">

                  <div>
                    <span className='title-text-setpassword'>Update password for the account linked to [{email}]</span>

                    <input 
                        style={{ marginBottom: isCorrectPass ? '10px' : '5px' }} 
                        value={password} 
                        onChange={(e) => onChangePassword(e)} 
                        type="password" 
                        placeholder="Enter password"
                    />
                    <span 
                        style={{ color: "tomato", display: isCorrectPass ? "none" : "block" }} 
                        className="info-text-login"
                    >
                        Password must be at least 8 characters.
                    </span>

                    <input 
                        style={{ marginBottom: isMatchPass ? '10px' : '5px' }}  
                        value={repassword} 
                        onChange={(e) => onChangeRePassword(e)} 
                        type="password" 
                        placeholder="Re-enter password"
                    />
                    <span 
                        style={{ color: "tomato", display: isMatchPass ? "none" : "block" }} 
                        className="info-text-login"
                    >
                        Passwords do not match.
                    </span>

                    <span className="btn-login" onClick={() => createPasswordBtn()}>
                        {!load ? <p>Confirm</p> : <div class="loader-circle-small"><div></div></div>}
                    </span>

                    <Link href={"/"}>
                        <span className="btn-text-login">Skip</span>
                    </Link>
                </div>




              </div>

      </div>
    </div>


  )
}

export default page
