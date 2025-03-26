import React, { useState, useEffect } from 'react';
import AsideBar from '../others/AsideBar';
import Api from '../others/Api'; // Import Api instance
import NotesDisplay from './NoteDisplay';
import { v4 as uuidv4 } from 'uuid';

const Notes = () => {
  const [notes, setNotes] = useState({
    id: uuidv4(),
    title: '',
    description: '',
    category: '',
  });

  const [allNotes, setAllNotes] = useState([]); // Store all notes

  const { id, title, description, category } = notes;

  // Function to fetch existing notes from backend
  const fetchNotes = async () => {
    try {
      const response = await Api.get('/notes'); // Use Api instance
      setAllNotes(response.data);
    } catch (error) {
      console.error('Error fetching notes:', error.message);
    }
  };

  // Load notes on component mount
  useEffect(() => {
    fetchNotes();
  }, []);

  // Handle Input Change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNotes({ ...notes, [name]: value });
  };

  // Handle Form Submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(notes);

    try {
      const payload = { id, title, description, category };

      await Api.post('/notes', payload); // Use Api instance

      fetchNotes(); // Refresh notes after adding a new one
    } catch (error) {
      console.error('Error creating note:', error.message);
    } finally {
      setNotes({
        id: uuidv4(),
        title: '',
        description: '',
        category: '',
      });
    }
  };

  return (
    <>
      <AsideBar />
      <div className="p-6 max-w-4xl mx-auto space-y-8">
        <h1 id="hhh" className="text-2xl font-semibold text-gray-800">Create Notes</h1>

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
                value={title}
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
                value={description}
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
                value={category}
                required
                className="px-3 py-0 border h-10 w-72 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="">---select----</option>
                <option value="GENERAL">GENERAL</option>
                <option value="OFFICIAL">OFFICIAL</option>
                <option value="TECHNICAL">TECHNICAL</option>
              </select>
            </div>
          </div>

          <div className="mt-6">
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Create Notes
            </button>
          </div>
        </form>

        {/* Display Notes */}
        <NotesDisplay notes={allNotes} />
      </div>
    </>
  );
};

export default Notes;
