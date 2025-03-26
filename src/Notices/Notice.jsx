import React, { useState, useEffect } from "react";
import axios from "axios";

import { MdDelete } from "react-icons/md";
import AsideBar from "../crud/others/AsideBar";
import Api from "../crud/others/Api";

const Notice = () => {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [filePreviews, setFilePreviews] = useState([]);
  const [files, setFiles] = useState([]);

  // Handle file selection
  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);

    // Validate file type (only images allowed)
    const validFiles = files.filter((file) =>
      ["image/jpeg", "image/png", "image/jpg"].includes(file.type)
    );

    if (validFiles.length < files.length) {
      alert("Only JPEG and PNG files are allowed.");
    }

    setSelectedFiles(validFiles);

    // Generate previews for valid files
    const previews = validFiles.map((file) => ({
      name: file.name,
      src: URL.createObjectURL(file),
    }));
    setFilePreviews(previews);
  };

  // Handle file upload
  const handleUpload = async () => {
    if (selectedFiles.length === 0) {
      alert("Please select files to upload!");
      return;
    }

    try {
      for (const file of selectedFiles) {
        const formData = new FormData();
        formData.append("file", file);

        // Send the file to the Java backend
        await Api.post("/images/upload", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      }
      alert("Files uploaded successfully!");
      setSelectedFiles([]);
      setFilePreviews([]);
      fetchFiles(); // Refresh the file list
    } catch (error) {
      console.error("Error uploading files:", error);
      alert("Failed to upload files.");
    }
  };

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
      <AsideBar />
      {/* <section id='noti' className="container mx-auto bg-white p-4 shadow-lg rounded-lg mt-6"> */}
      <section id='noti' className="p-6 max-w-4xl mx-auto space-y-8">

        <h1 id="hhh" className="text-center text-2xl font-bold mb-4 text-black">Notice Board</h1>

        <h2   className="text-center">Upload only Photos</h2>

        {/* Upload Section */}
        <div className="p-4 bg-white shadow-md rounded-md max-w-xl mx-auto">
          <input
            type="file"
            multiple
            accept="image/jpeg,image/png"
            onChange={handleFileChange}
            className="block mb-2 p-2 border rounded-md w-full"
          />
          <button
            onClick={handleUpload}
            className="w-full px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            Upload Images
          </button>

          {/* Previews */}
          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {filePreviews.map((file, index) => (
              <div key={index} className="w-full h-auto rounded-md p-2 border">
                <img
                  src={file.src}
                  alt={file.name}
                  className="w-full h-auto rounded-md"
                />
                <p className="mt-2 text-center">{file.name}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Uploaded Files Section */}
        <div className="mt-6">
          <h2 className="text-xl font-bold mb-4">Uploaded Notices</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {files.map((file) => (
              <div
                key={file.id}
                className="border rounded-md shadow-md p-2 relative"
              >
                {/* <img
                  src={`data:image/jpeg;base64,${file.data}`}
                  alt={file.name}
                  className="w-full h-auto object-cover rounded-md"
                /> */}
                <img
  src={`data:image/jpeg;base64,${file.data}`}
  alt={file.name}
  className="w-full h-[200px] object-cover rounded-md"
/>

                <button
                  onClick={() => deleteNotice(file.id)}
                  className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600"
                >
                  <MdDelete className="text-lg" title="Delete" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Notice;