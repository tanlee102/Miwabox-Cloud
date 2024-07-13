import React, { useState, useEffect, useContext }  from 'react'

import "../../styles/Account/FormAccount.css"
import EditUserName from '../Dialog/EditUserName';
import { WindowContext } from '@/app/context/WindowContext';
import Cookies from 'js-cookie';
import axios from 'axios';


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



const DetailAccount = ({data}) => {

  const [displayBox, setDisplayBox] = useState(false)
  const {userData} = useContext(WindowContext);

  const [myData, setMyData] = useState({})

  const [selectedFile, setSelectedFile] = useState();
  const [preview, setPreview] = useState("");
  const [textIn, setTextIn] = useState('');

  useEffect(() => {
    if(myData?.username){
      setTextIn(myData?.username);
    }
}, [myData])

  const [bio, setBio] = useState("")

  useEffect(() => {
    
    if(myData?.userProfile?.bio){
      setBio(myData?.userProfile?.bio);
    }

  }, [myData?.userProfile])

  useEffect(() => {
    if(userData?.id) loadData(userData.id, setMyData);
  }, [userData?.id]);


  const clickImageBtn = () => {
    document.getElementById('avatar-file-input').click();
  };

  const onSelectFile = e => {
    if (!e.target.files || e.target.files.length === 0) {
      setSelectedFile(undefined);
      return;
    }
    setSelectedFile(e.target.files[0]);
  };

  useEffect(() => {
    if (!selectedFile) {
      setPreview("");
      return;
    }
    const objectUrl = URL.createObjectURL(selectedFile);
    setPreview(objectUrl);

    return () => URL.revokeObjectURL(objectUrl);
  }, [selectedFile]);

  
  const updateAccount = async () => {


    const token = Cookies.get('token');
    if (!token) {
      alert('No authentication token found');
      return;
    }

    if (!selectedFile) {
    }else{
      const formData = new FormData();
      formData.append('image', selectedFile);
      formData.append('file', selectedFile.name);
  
      axios.put('http://localhost:3000/image/upload', formData, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        }
      })
      .then(response => {
        const newThumbnailUrl = 'http://localhost:3000/image/'+response.data.id+'.jpeg';
        const expirationDays = 7; // Set the expiration days as needed
        Cookies.set('thumbnail', newThumbnailUrl, { expires: expirationDays });
        alert('Image uploaded successfully');
        // Optionally update userData with the new thumbnail URL
      })
      .catch(error => {
        console.error('Error uploading image:', error);
        alert('Failed to upload image');
      });
  
    }


    try {
      const response = await axios.post('http://localhost:8080/api/v1/users/profile/update', 
        { bio : bio }, 
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );
      if (response.status === 200) {
        alert('Profile updated successfully');
      }
    } catch (error) {
      console.error('Error updating profile:', error);
    }


  }




  return (

    <>

    <div class="form-account">


      <div className='open-edit-dialog-form-account'>
          <span>Tên tài khoản: {textIn}</span>
          <span onClick={() => setDisplayBox(true)}>Chỉnh sửa</span>
      </div>

    <div>
        <span>Bio:</span>
        <input value={bio} onChange={(e) => {setBio(e.target.value)}} type="text" maxLength="12"/>
    </div>

    <div>
        <span>Avatar:</span>
        <span>
          <img id="icon-btn-image-form-account" onClick={() => clickImageBtn()}  src={preview || userData.thumbnail} alt=""/> 
          <p>click to change image</p>     
        </span>
        <input id="avatar-file-input" className='hide-element' type="file" accept=".jpg, .jpeg, .png" onChange={onSelectFile}/>
    </div>

    <div class="submit-form-account">
      <span onClick={() => {updateAccount()}}>Save</span>
    </div>


  
  </div>

  <EditUserName setIsDisplay={setDisplayBox} isDisplay={displayBox} textIn={textIn} setTextIn={setTextIn}/>

  </>
  )
}

export default DetailAccount