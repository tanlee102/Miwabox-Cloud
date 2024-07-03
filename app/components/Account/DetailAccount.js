import React, { useState, useEffect }  from 'react'

import "../../styles/Account/FormAccount.css"
import EditUserName from '../Dialog/EditUserName';


const DetailAccount = ({data}) => {


  const [displayBox, setDisplayBox] = useState(false)


  const [selectedFile, setSelectedFile] = useState();
  const [preview, setPreview] = useState("");

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

  
  const updateAccount = () => {

  }




  return (

    <>

    <div class="form-account">


      <div className='open-edit-dialog-form-account'>
          <span>Tên tài khoản: xemtua23</span>
          <span onClick={() => setDisplayBox(true)}>Chỉnh sửa</span>
      </div>

    <div>
        <span>Bio:</span>
        <input value="Be yourself" type="text" maxLength="12"/>
    </div>

    <div>
        <span>Avatar:</span>
        <span >
          <img id="icon-btn-image-form-account" onClick={() => clickImageBtn()}  src={preview || "https://i.pinimg.com/736x/79/76/c3/7976c3f29a3448f7112b32019346c584.jpg"} alt=""/> 
          <p>click to change image</p>     
        </span>
        <input id="avatar-file-input" className='hide-element' type="file" accept=".jpg, .jpeg, .png" onChange={onSelectFile}/>
    </div>

    <div class="submit-form-account">
      <span onClick={() => {updateAccount()}}>Save</span>
    </div>


  
  </div>

  <EditUserName setIsDisplay={setDisplayBox} isDisplay={displayBox}/>

  </>
  )
}

export default DetailAccount