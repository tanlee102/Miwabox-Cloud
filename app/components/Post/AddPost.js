import React, { useState } from 'react';
import axios from 'axios';
import TagInput from './TagInput';
import '../../styles/Post/AddPost.css';
import EditableSpan from './EditableSpan';

const AddPost = () => {
  const [mediaFiles, setMediaFiles] = useState([]);

  const handleFileUpload = (event) => {
    const files = Array.from(event.target.files);
    setMediaFiles((prevFiles) => [...prevFiles, ...files]);
  };

  const handleRemoveFile = (index) => {
    setMediaFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
  };

  // const handleSubmit = async () => {
  //   const formData = new FormData();
  //   mediaFiles.forEach((file, index) => {
  //     formData.append(`file${index}`, file);
  //   });

  //   try {
  //     const response = await axios.post('/api/upload', formData, {
  //       headers: {
  //         'Content-Type': 'multipart/form-data',
  //       },
  //     });
  //     console.log('Upload successful:', response.data);
  //   } catch (error) {
  //     console.error('Upload failed:', error);
  //   }
  // };

    const fileInputRef = React.useRef(null);
  
    const handleButtonClick = () => {
      fileInputRef.current.click();
    };

  return (
    <div className="add-post">
      <EditableSpan placeholder="Give your post a unique title..." fontSize="large" fontWeight="bold"/>

      <div className="list-media">
        {mediaFiles.map((file, index) => (
          <div key={index} className="media-item">
            {file.type.startsWith('image') && <img src={URL.createObjectURL(file)} alt="Uploaded" />}
            {file.type.startsWith('video') && <video src={URL.createObjectURL(file)} controls />}
            <button className="remove-button" onClick={() => handleRemoveFile(index)}><svg fill="#000000" viewBox="-3.5 0 19 19" class="cf-icon-svg"><path d="M11.383 13.644A1.03 1.03 0 0 1 9.928 15.1L6 11.172 2.072 15.1a1.03 1.03 0 1 1-1.455-1.456l3.928-3.928L.617 5.79a1.03 1.03 0 1 1 1.455-1.456L6 8.261l3.928-3.928a1.03 1.03 0 0 1 1.455 1.456L7.455 9.716z"/></svg></button>
            <EditableSpan placeholder="Give your media a description..." fontSize="normal" fontWeight="normal"/>
          </div>
        ))}
      </div>

      <div className="add-media-button">
        <button type="button" onClick={handleButtonClick}>
          <svg fill="#000000" viewBox="0 0 45.402 45.402"><path d="M41.267,18.557H26.832V4.134C26.832,1.851,24.99,0,22.707,0c-2.283,0-4.124,1.851-4.124,4.135v14.432H4.141c-2.283,0-4.139,1.851-4.138,4.135c-0.001,1.141,0.46,2.187,1.207,2.934c0.748,0.749,1.78,1.222,2.92,1.222h14.453V41.27c0,1.142,0.453,2.176,1.201,2.922c0.748,0.748,1.777,1.211,2.919,1.211c2.282,0,4.129-1.851,4.129-4.133V26.857h14.435c2.283,0,4.134-1.867,4.133-4.15C45.399,20.425,43.548,18.557,41.267,18.557z"/></svg>
          Add Image
      </button>
      <input
        type="file" accept="image/*,video/*" multiple onChange={handleFileUpload} ref={fileInputRef} style={{ display: 'none' }}
      />
    </div>

      <TagInput />

    </div>
  );
};

export default AddPost;
