import React, { Fragment, memo, useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import Api from "../others/Api"; // ✅ Use Api instance

const NotesForStudents = () => {
  const [notes, setNotes] = useState([]); // Store all notes
  const [selectedCategory, setSelectedCategory] = useState("all"); // Category filter
  const [error, setError] = useState(null); // Error state

  // 🔹 Fetch Notes from Backend
  const fetchNotes = async () => {
    try {
      const { data } = await Api.get("/notes"); // ✅ Corrected API URL
      setNotes(data);
      setError(null);
    } catch (e) {
      console.error("Error fetching notes:", e.message);
      setError("Failed to load notes. Check backend connection.");
    }
  };

  useEffect(() => {
    document.title = "Notes";
    fetchNotes();
  }, []);

  // 🔹 Handle Category Filter Change
  const handleSelectedCategory = (e) => {
    setSelectedCategory(e.target.value);
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <main className="notesContainer text-center">
        <h1 className="text-3xl font-bold text-blue-600 mb-4">Notes</h1>

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
                checked={selectedCategory === category}
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
          {notes.length === 0 ? (
            <p className="text-center text-gray-600">No Notes Found</p>
          ) : (
            notes
              .filter((val) =>
                selectedCategory === "all" ? true : val.category === selectedCategory
              )
              .map((val) => (
                <Fragment key={val.id}>
                  <div className="bg-blue-200 text-black shadow-md rounded-lg p-4">
                    <h2 className="text-lg font-bold text-gray-800 mb-2">
                      TITLE: {val.title}
                    </h2>
                    <h3 className="text-sm font-medium text-gray-600 mb-1">
                      CATEGORY: {val.category}
                    </h3>
                    <h4 className="text-sm text-black mb-4">
                      <u>DESCRIPTION</u> :- {val.description}
                    </h4>
                  </div>
                </Fragment>
              ))
          )}
        </article>
      </section>
    </div>
  );
};

export default memo(NotesForStudents);
