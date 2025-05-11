import axios from 'axios';
import React, {  useEffect, useState } from 'react';
import {  useParams } from 'react-router-dom';
import Api from '../crud/others/Api';

const DisplayNotice = () => {
  const [files, setFiles] = useState([]);
  const { id } = useParams();

  // Fetch uploaded files from the backend
  const fetchFiles = async () => {
    try {
      const response = await Api.get(`/images/${id}`);
      setFiles(response.data);
    } catch (error) {
      console.error('Error fetching files:', error);
    }
  };

  useEffect(() => {
    document.title = 'Notice Board';
    fetchFiles();
  }, [id]); // Added 'id' as a dependency to refetch data when id changes

  return (
    <>
        <div className="h-screen w-screen flex justify-center items-center bg-gray-100">
               
              <img
  src={`data:image/jpeg;base64,${files.data}`}
  alt={files.name || 'Notice Image'}
 className="h-full w-full border-4 border-blue-500 rounded-lg m-2 mt-5 opacity-100 "
/>


        </div>
      
    </>
  );
};

export default DisplayNotice;