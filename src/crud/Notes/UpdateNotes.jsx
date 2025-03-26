import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AsideBar from "../others/AsideBar";
import Api from "../others/Api"; // ✅ Ensure API instance is correctly imported

const UpdateNotes = () => {
  const [notes, setNotes] = useState({
    title: "",
    description: "",
    category: "",
  });

  const { id } = useParams(); // Extract note ID from URL
  const navigate = useNavigate();
  const [error, setError] = useState(""); // ✅ Error handling
  const [loading, setLoading] = useState(false); // ✅ Handle loading states

  // 🔹 Fetch Note by ID on component mount
  useEffect(() => {
    const fetchNoteById = async () => {
      try {
        const response = await Api.get(`/notes/${id}`);
        const data=response.data;

        console.log("notes data",data);//hello
        

        // const response = await Api.get(`/student/${id}`);
        // const data = response.data;
        // setUser(data);

        setNotes(data);
      } catch (error) {
        console.error("Error fetching note:", error);
        setError("Failed to fetch note. Please try again.");
      }
    };

    if (id) {
      fetchNoteById();
    }
  }, [id]);

  // 🔹 Handle Form Submission (Update Note)
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await Api.put(`/notes/${id}`, notes);
      // console.log("Note updated:", notes);
      navigate("/notes"); // ✅ Redirect only after successful update
    } catch (error) {
      console.error("Error updating note:", error);
      setError("Failed to update note. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // 🔹 Handle Input Change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNotes((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // 🔹 Handle Delete Note
  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this note?")) {
      try {
        await Api.delete(`/api/vignan/notes/${id}`);

        
        console.log("Note deleted successfully");
        navigate("/notes"); // ✅ Redirect after deletion
      } catch (error) {
        console.error("Error deleting note:", error);
        setError("Failed to delete note. Please try again.");
      }
    }
  };

  return (
    <>
      <AsideBar />
      <div className="p-6 max-w-4xl mx-auto space-y-8">
        <h1 className="text-2xl font-semibold text-gray-800">Update Notes</h1>

        {error && <p className="text-red-500">{error}</p>} {/* ✅ Display errors */}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col space-y-2">
              <label className="text-sm font-medium text-gray-700" htmlFor="title">
                Title
              </label>
              <input
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                type="text"
                id="title"
                name="title"
                value={notes.title}
                placeholder="Enter notes title"
                onChange={handleChange}
                required
              />

              <label className="text-sm font-medium text-gray-700" htmlFor="description">
                Description
              </label>
              <textarea
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                id="description"
                name="description"
                rows={5}
                value={notes.description}
                placeholder="Enter the description"
                onChange={handleChange}
                required
              ></textarea>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col space-y-2">
              <label htmlFor="category" className="text-sm font-medium text-gray-700">
                Category
              </label>
              <select
                name="category"
                id="category"
                onChange={handleChange}
                value={notes.category}
                required
                className="px-3 py-2 border h-10 w-72 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="">---select----</option>
                <option value="GENERAL">GENERAL</option>
                <option value="OFFICIAL">OFFICIAL</option>
                <option value="TECHNICAL">TECHNICAL</option>
              </select>
            </div>
          </div>

          <div className="mt-6 flex space-x-4">
            <button
              type="submit"
              className="w-1/2 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              disabled={loading}
            >
              {loading ? "Updating..." : "Update Notes"}
            </button>

            {/* <button
              type="button"
              onClick={handleDelete}
              className="w-1/2 bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
            >
              Delete Note
            </button> */}
          </div>
        </form>
      </div>
    </>
  );
};

export default UpdateNotes;
