import React, { Fragment, memo, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import Api from "../others/Api"; // ✅ Use Api instance

const NotesDisplay = () => {
  const [inputData, setInputData] = useState({
    title: "",
    description: "",
    category: "",
    id: uuidv4(),
  });

  const [multiTask, setMultiTask] = useState([]); // Store all notes
  const [selected, setSelected] = useState({ selectedCategory: "all" }); // Filter state
  const [error, setError] = useState(null); // Error state

  // 🔹 Fetch Notes from Backend
  const fetchData = async () => {
    try {
      const { data } = await Api.get("/notes"); // ✅ Corrected API URL

      console.log(data);
      

      setMultiTask(data);
      setError(null);
    } catch (e) {
      console.error("Error fetching notes:", e.message);
      setError("Failed to load notes. Check backend connection.");
    }
  };

  useEffect(() => {
    document.title = "Notes";
    fetchData();
  }, []);

  // 🔹 Handle Category Filter Change
  const handleSelectedCategory = (e) => {
    setSelected({ selectedCategory: e.target.value });
  };

  // 🔹 Delete Note
  const handleDelete = async (id) => {
    if (window.confirm("Do you want to delete this note?")) {
      try {
        await Api.delete(`/notes/${id}`); // ✅ Correct API call
        fetchData(); // Refresh notes
      } catch (e) {
        console.error("Error deleting note:", e.message);
        setError("Failed to delete note. Please try again.");
      }
    }
  };

  // 🔹 Edit Note (Prefill Data)
  // const handleEdit = (editId) => {
  //   const editItem = multiTask.find((val) => val.id === editId);
  //   setInputData({
  //     title: editItem.title,
  //     description: editItem.description,
  //     category: editItem.category,
  //     id: editItem.id,
  //   });
  // };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <main className="notesContainer text-center">
        <h1 className="text-3xl font-bold text-blue-600 mb-4">Display Notes</h1>

        {/* 🔹 Error Message */}
        {error && <p className="text-red-600 text-center">{error}</p>}

        {/* 🔹 Category Filter */}
        <div className="flex justify-center space-x-4 mb-6">
          {["all", "GENERAL", "OFFICIAL", "TECHNICAL"].map((category) => (
            <label key={category} className="font-medium text-gray-700">
              <input
                type="radio"
                name="selectedCategory"
                value={category}
                checked={selected.selectedCategory === category}
                onChange={handleSelectedCategory}
                className="mr-2"
              />
              {category.toUpperCase()}
            </label>
          ))}
        </div>
      </main>

      {/* 🔹 Notes List */}
      <section className="data">
        <article className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-6">
          {multiTask.length === 0 ? (
            <p className="text-center text-gray-600">No Notes Found</p>
          ) : (
            multiTask
              .filter((val) =>
                selected.selectedCategory === "all"
                  ? true
                  : val.category === selected.selectedCategory
              )
              .map((val) => (
                <Fragment key={val.id}>
                  <div className="bg-white shadow-md rounded-lg p-4">
                    <h2 className="text-lg font-bold text-gray-800 mb-2">
                      TITLE: {val.title}
                    </h2>
                    <h3 className="text-sm font-medium text-gray-600 mb-1">
                      CATEGORY: {val.category}
                    </h3>
                    <h4 className="text-sm text-gray-700 mb-4">
                      <u>DESCRIPTION</u> :- {val.description}
                    </h4>

                    {/* 🔹 Edit & Delete Buttons */}
                    <div className="flex justify-between">
                      <NavLink
                        to={`/updatenotes/${val.id}`}
                        className="block p-2 hover:bg-gray-700 rounded"
                      >
                        <button
                          // onClick={() => handleEdit(val.id)}
                          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                        >
                          Edit
                        </button>
                      </NavLink>

                      <button
                        onClick={() => handleDelete(val.id)}
                        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </Fragment>
              ))
          )}
        </article>
      </section>
    </div>
  );
};

export default memo(NotesDisplay);
