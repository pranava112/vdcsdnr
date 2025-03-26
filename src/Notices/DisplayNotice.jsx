import axios from 'axios';
import React, {  useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom';
import Api from '../crud/others/Api';

const DisplayNotice = () => {

      const [files, setFiles] = useState([]);
    
      


     // Fetch uploaded files from the backend
  const fetchFiles = async () => {
    try {
      const response = await Api.get("/images");
      setFiles(response.data);
    } catch (error) {
      console.error("Error fetching files:", error);
    }
  };

  useEffect(() => {
    document.title = "Notice Board";
    fetchFiles();
  }, []);

  // Handle delete action
  const deleteNotice = async (id) => {
    const confirmDelete = window.confirm("Do you want to delete this notice?");
    if (confirmDelete) {
      try {
        await Api.delete(`/images/${id}`);
        alert("File deleted successfully.");
        fetchFiles();
      } catch (error) {
        console.error("Error deleting file:", error);
        alert("Failed to delete the file.");
      }
    }
  };




  return (
    <>

     {/* Uploaded Files Section */}
             <div  className="mt-6  bg-gray-300 w-auto m-9 rounded">
               <h2 className="text-xl text-black  font-bold mb-4 text-center">NOTICE BOARD</h2>
               <div className="grid grid-cols-1   sm:grid-cols-2 md:grid-cols-3 h-auto gap-4 p-1">
                 {files.map((file) => (
                   <div
                     key={file.id}
                     className="border rounded-md bg-slate-500 shadow-md p-2 relative"
                   >

                    <NavLink to={`/viewImage/${file.id}`}>
                     <img
                       src={`data:image/jpeg;base64,${file.data}`}
                       alt={file.name}
                       title='press to view in full screen'
                      //  className="w-full h-auto overflow-scroll object-cover rounded-md"

                        className="w-full max-h-72 rounded-lg shadow-md hover:scale-110 transition-transform duration-500"
                      
                     />
                     </NavLink>
                     
                   </div>
                 ))}
               </div>
             </div>

    </>
  )
}

export default DisplayNotice;