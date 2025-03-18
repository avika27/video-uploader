// src/components/VideoUploader.js

import React, { useState } from 'react';
import axios from 'axios';
import NavbarComp from './Navbar';


const VideoUploader = () => {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('video', selectedFile);

    try {
      const response = await axios.post('http://localhost:5000/transcribe', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Content-Type': 'video/mp4',
        },
      });
      console.log(response.data);
      // Handle success, maybe show a success message to the user
    } catch (error) {
      console.error('Error uploading file:', error);
      // Handle error, show an error message to the user
    }
  };

  return (
    <div>
    <NavbarComp />  
      <h2>Video Uploader</h2>
      <form onSubmit={handleSubmit}>
        <input type="file" onChange={handleFileChange} />
        <button type="submit">Upload</button>
      </form>
    </div>
  );
};

export default VideoUploader;

