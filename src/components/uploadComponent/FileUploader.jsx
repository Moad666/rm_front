import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import axios from 'axios';
import { IoMdCloudUpload } from "react-icons/io";

const FileUploader = () => {
  const onDrop = useCallback(acceptedFiles => {
    // Process each file
    acceptedFiles.forEach(file => {
      const formData = new FormData();
      formData.append('file', file);

      // Upload the file using axios or any other method
      axios.post('/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      .then(response => {
        console.log('File uploaded successfully:', response.data);
      })
      .catch(error => {
        console.error('Error uploading file:', error);
      });
    });
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div {...getRootProps()} style={styles.dropzone}>
      <input {...getInputProps()} />
      {isDragActive ? (
        <p>Drop the files here...</p>
      ) : (
        <div style={{display:"flex",flexDirection:"column",alignItems:"center"}}>
        <IoMdCloudUpload color='blue' size={50}/>
        <p style={{fontSize:"14px"}}>drag your files or <b><span style={{color:"#4F46E5"}}>brows</span></b></p>
        <p style={{fontSize:"14px",color:"gray"}}>Max 10 MB files are allowed </p>
        </div>
      )}
    </div>
  );
};

const styles = {
  dropzone: {
    background:"#e2e8f0",
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    border: '2px dashed #cccccc',
    borderRadius: '5px',
    padding: '20px',
    width: '100%',
    height: '200px',
    cursor: 'pointer',
    border:"solid #4F46E5 1px",
  },
};

export default FileUploader;



