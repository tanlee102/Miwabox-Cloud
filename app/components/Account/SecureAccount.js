import React, { useContext, useEffect, useState } from 'react'
import EditUserName from '../Dialog/EditUserName';
import { LayoutContext } from '@/app/context/LayoutContext';
import ChangeEmailBox from '../Dialog/ChangeEmailBox';
import axios from 'axios';
import { WindowContext } from '@/app/context/WindowContext';
import Cookies from 'js-cookie';

const loadData = async (userId, setMyData) => {
    const token = Cookies.get('token');
    if (!token) {
      alert('No authentication token found');
      return;
    }
    try {
      const response = await axios.get(`http://localhost:8080/api/v1/users/${userId}`);
      setMyData(response.data);
      console.log(response.data)
    } catch (error) {
      console.error('Error loading user data:', error);
    }
  };
  

const SecureAccount = ({}) => {

    const [password, setPassword] = useState("");
    const [repassword, setRePassword] = useState("");
    const [displayChangePass, setDisplayChangePass] = useState(false);

    const {userData} = useContext(WindowContext)

    const [isVerified, setIsVerified] = useState(true);
    const [displayChangeEmailBox, setDisplayChangeEmailBox] = useState(false)
    const {conFirmFun} = useContext(LayoutContext)

    const [myData, setMyData] = useState({});

    useEffect(() => {
        if(userData?.id) loadData(userData.id, setMyData);
    }, [userData?.id]);
    
    useEffect(() => {
        if(myData){
          setIsVerified(myData.verified);
        }
    }, [myData?.userProfile])

    const changeEmail = () => {
        setDisplayChangeEmailBox(true);
    }

    const verifyEmail = async () => {
        conFirmFun('Xác minh tài khoản', 'Chúng tôi sẽ gửi một liên kết đến địa chỉ '+userData.email+' để xác minh tài khoản của bạn?', async () => {
            
            try {
                conFirmFun('Gửi Email');

                const response = await axios.post('http://localhost:3000/api/auth/email/verify', {
                  email: userData.email,
                });
          
                if (response.data.success) {
                  alert("Success! Check your email for a verify link.");
                } else {
                  alert("Failed to send reset link. Please try again later.");
                }
              } catch (error) {
                console.error("Error:", error);
                alert("An error occurred. Please try again later.");
              } finally {
                conFirmFun();
              }
        });
    }

    const forgotEmail = async () => {

        conFirmFun('Quên mật khẩu', 'Chúng tôi sẽ gửi một liên kết đến địa chỉ '+userData.email+' để khôi phục mật khẩu của bạn?', async () => {

            try {
                conFirmFun('Gửi Email');

                const response = await axios.post('http://localhost:3000/api/auth/password/forgot', {
                  email: userData.email,
                });
          
                if (response.data.success) {
                  alert("Success! Check your email for a password reset link.");
                } else {
                  alert("Failed to send reset link. Please try again later.");
                }
              } catch (error) {
                console.error("Error:", error);
                alert("An error occurred. Please try again later.");
              } finally {
                conFirmFun();
              }

            
        });
    }


    const changePasswordBtn = async () => {
        if(password !== '' && repassword !== ''){
            const token = Cookies.get('token');
            if (!token) {
                alert('No authentication token found');
                return;
            }
            
            try {
                const response = await axios.post('http://localhost:8080/api/v1/auth/password/edit', {
                    password: password,
                    newPassword: repassword
                }, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                if (response.data.token) {
                    Cookies.set('token', response.data.token, { expires: 7 });  // Set token to expire in 7 days
                    alert("Password changed successfully!");
                } else {
                    alert("Failed to change password. Please try again.");
                }
            } catch (error) {
                console.error('Error changing password:', error);
                alert("An error occurred. Please try again later.");
            }
        } else {
            conFirmFun('Đổi mật khẩu', 'Vui lòng điền đầy đủ thông tin!')  
        }
    }

    return (
        <>
            <div class="form-account">

                <div className='open-edit-dialog-form-account'>
                    <span>Email: {userData.email}</span>
                    <div className='label-open-edit-dialog-form-account'> 
                        {isVerified ?  
                            <><svg viewBox="0 0 48 48"><circle cx="24" cy="24" r="20" fill="#4dd0e1"/><path fill="#fff" d="M22.491,30.69c-0.576,0-1.152-0.22-1.591-0.659l-6.083-6.084c-0.879-0.878-0.879-2.303,0-3.182 c0.878-0.879,2.304-0.879,3.182,0l6.083,6.084c0.879,0.878,0.879,2.303,0,3.182C23.643,30.47,23.067,30.69,22.491,30.69z"/><path fill="#fff" d="M22.491,30.69c-0.576,0-1.152-0.22-1.591-0.659c-0.879-0.878-0.879-2.303,0-3.182l9.539-9.539 c0.878-0.879,2.304-0.879,3.182,0c0.879,0.878,0.879,2.303,0,3.182l-9.539,9.539C23.643,30.47,23.067,30.69,22.491,30.69z"/></svg>        
                            <p>Verified</p></>
                        :
                            <><svg viewBox="0 0 24 24"><path d="M13 16.5a1 1 0 11-2 0 1 1 0 012 0zm-2.517-7.665c.112-.223.268-.424.488-.57C11.186 8.12 11.506 8 12 8c.384 0 .766.118 1.034.319a.953.953 0 01.403.806c0 .48-.218.81-.62 1.186a9.293 9.293 0 01-.409.354 19.8 19.8 0 00-.294.249c-.246.213-.524.474-.738.795l-.126.19V13.5a.75.75 0 001.5 0v-1.12c.09-.1.203-.208.347-.333.063-.055.14-.119.222-.187.166-.14.358-.3.52-.452.536-.5 1.098-1.2 1.098-2.283a2.45 2.45 0 00-1.003-2.006C13.37 6.695 12.658 6.5 12 6.5c-.756 0-1.373.191-1.861.517a2.944 2.944 0 00-.997 1.148.75.75 0 001.341.67z"/><path fill-rule="evenodd" d="M9.864 1.2a3.61 3.61 0 014.272 0l1.375 1.01c.274.2.593.333.929.384l1.686.259a3.61 3.61 0 013.021 3.02l.259 1.687c.051.336.183.655.384.929l1.01 1.375a3.61 3.61 0 010 4.272l-1.01 1.375a2.11 2.11 0 00-.384.929l-.259 1.686a3.61 3.61 0 01-3.02 3.021l-1.687.259a2.11 2.11 0 00-.929.384l-1.375 1.01a3.61 3.61 0 01-4.272 0l-1.375-1.01a2.11 2.11 0 00-.929-.384l-1.686-.259a3.61 3.61 0 01-3.021-3.02l-.259-1.687a2.11 2.11 0 00-.384-.929L1.2 14.136a3.61 3.61 0 010-4.272l1.01-1.375a2.11 2.11 0 00.384-.929l.259-1.686a3.61 3.61 0 013.02-3.021l1.687-.259a2.11 2.11 0 00.929-.384L9.864 1.2zm3.384 1.209a2.11 2.11 0 00-2.496 0l-1.376 1.01a3.61 3.61 0 01-1.589.658l-1.686.258a2.11 2.11 0 00-1.766 1.766l-.258 1.686a3.61 3.61 0 01-.658 1.59l-1.01 1.375a2.11 2.11 0 000 2.496l1.01 1.376a3.61 3.61 0 01.658 1.589l.258 1.686a2.11 2.11 0 001.766 1.765l1.686.26a3.61 3.61 0 011.59.657l1.375 1.01a2.11 2.11 0 002.496 0l1.376-1.01a3.61 3.61 0 011.589-.658l1.686-.258a2.11 2.11 0 001.765-1.766l.26-1.686a3.61 3.61 0 01.657-1.59l1.01-1.375a2.11 2.11 0 000-2.496l-1.01-1.376a3.61 3.61 0 01-.658-1.589l-.258-1.686a2.11 2.11 0 00-1.766-1.766l-1.686-.258a3.61 3.61 0 01-1.59-.658l-1.375-1.01z"/></svg>
                            <p>Not verified</p></>
                        }
                    </div>
                    <span onClick={() => changeEmail()}>Change</span>
                    {isVerified ? "" : <span onClick={() => verifyEmail()}>Confirm</span>}
                    
                </div>

                <div className='open-edit-dialog-form-account'>
                    
                    <span>Password: <code style={{display: displayChangePass ? "none" : "inline"}}>●●●●●●●●</code> </span>

                    <span style={{display: displayChangePass ? "none" : "block"}} onClick={() => setDisplayChangePass(true)}>Change</span>

                    <div style={{display: displayChangePass ? "block" : "none"}} className='input-open-edit-dialog-form-account'>
                        <input value={password} onChange={(e) => setPassword(String(e.target.value).replace(/\s/g, ''))} placeholder='Nhập mật khẩu hiện tại' type="password" maxLength="70"/>
                        <input value={repassword} onChange={(e) => setRePassword(String(e.target.value).replace(/\s/g, ''))} placeholder='Nhập mật khẩu mới' type="password" maxLength="70"/>
                    </div>

                    <div style={{display: displayChangePass ? "block" : "none"}}>
                        <span className='button-open-edit-dialog-form-account' onClick={() => changePasswordBtn()}>Thay đổi mật khẩu</span>
                    </div>

                    <span style={{display: displayChangePass ? "block" : "none"}}  onClick={() => forgotEmail()}>Quên mật khẩu</span>

                </div>

            </div>

            <ChangeEmailBox isDisplay={displayChangeEmailBox} setIsDisplay={setDisplayChangeEmailBox} myData={myData}/>
        </>
    )
}

export default SecureAccount