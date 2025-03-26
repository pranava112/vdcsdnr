import React, { useState, useEffect,  } from "react";
import { MdDelete } from "react-icons/md";
import AsideBar from "../others/AsideBar";
import Api from "../others/Api" // Ensure the correct path to your Api instance

const FacultyUpload = () => {
  const [formData, setFormData] = useState({
    name: "",
    designation: "",
    mobile: "",
    subject: "",
  });
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [uploadedFiles, setUploadedFiles] = useState([]);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle file selection
  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setSelectedFiles(files);
  };

  // Handle form submission
  const handleUpload = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.designation || !formData.mobile || !formData.subject) {
      alert("Please fill out all fields.");
      return;
    }

    if (selectedFiles.length === 0) {
      alert("Please select an image to upload!");
      return;
    }

    try {
      const form = new FormData();
      form.append("name", formData.name);
      form.append("designation", formData.designation);
      form.append("mobile", formData.mobile);
      form.append("subject", formData.subject);
      form.append("image", selectedFiles[0]); // Assume only one file for this example

      await Api.post("/faculties", form, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert("Faculty uploaded successfully!");
      setFormData({ name: "", designation: "", mobile: "", subject: "" });
      setSelectedFiles([]);
      fetchFiles();
    } catch (error) {
      console.error("Error uploading faculty:", error);
      alert("Failed to upload faculty.");
    }
  };

  // Fetch uploaded files
  const fetchFiles = async () => {
    try {
      const response = await Api.get("/faculties");
      setUploadedFiles(response.data);
    } catch (error) {
      console.error("Error fetching files:", error);
    }
  };

  useEffect(() => {
    fetchFiles();
    document.title = "Faculty Upload";
  }, []);

  // Handle delete action
  const deleteNotice = async (id) => {
    if (window.confirm("Do you want to delete this faculty?")) {
      try {
        await Api.delete(`/faculties/${id}`);
        alert("Faculty deleted successfully.");
        fetchFiles();
      } catch (error) {
        console.error("Error deleting faculty:", error);
        alert("Failed to delete the faculty.");
      }
    }
  };

  return (
    <>
      <AsideBar />
      <section className="p-6 max-w-4xl mx-auto space-y-8">
        <h1 className="text-center text-2xl font-bold mb-4 text-black">Faculty Management</h1>
        <form onSubmit={handleUpload} className="space-y-4 bg-white p-6 rounded-md shadow-md max-w-xl mx-auto">
          <div>
            <label className="block font-medium mb-2">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="w-full p-2 border rounded-md"
              required
            />
          </div>
          <div>
            <label className="block font-medium mb-2">Position</label>
            <input
              type="text"
              name="designation"
              value={formData.designation}
              onChange={handleInputChange}
              className="w-full p-2 border rounded-md"
              required
            />
          </div>
          <div>
            <label className="block font-medium mb-2">Mobile</label>
            <input
              type="text"
              name="mobile"
              value={formData.mobile}
              onChange={handleInputChange}
              className="w-full p-2 border rounded-md"
              maxLength="10"
              required
            />
          </div>
          <div>
            <label className="block font-medium mb-2">Subject</label>
            <input
              type="text"
              name="subject"
              value={formData.subject}
              onChange={handleInputChange}
              className="w-full p-2 border rounded-md"
              required
            />
          </div>
          <div>
            <label className="block font-medium mb-2">Image</label>
            <input
              type="file"
              accept="image/jpeg,image/png"
              onChange={handleFileChange}
              className="w-full p-2 border rounded-md"
              required
            />
          </div>
          <button type="submit" className="w-full px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
            Submit
          </button>
        </form>

        <div className="mt-6">
          <h2 className="text-xl font-bold mb-4">Uploaded Faculties</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {uploadedFiles.map((file) => (
              <div key={file.id} className="border rounded-md shadow-md p-2 relative">
                <img
                  src={`data:image/jpeg;base64,${file.imageFile}`}
                  alt={file.name}
                  title="press to view in full screen"
                  className="w-full max-h-72 rounded-lg shadow-md"
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

export default FacultyUpload;
