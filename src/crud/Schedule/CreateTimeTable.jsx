import React, { useState, useEffect } from 'react';
import AsideBar from '../others/AsideBar';
import { useNavigate, useParams } from 'react-router-dom';
import Api from '../others/Api'; // Assuming you have this Api instance
import TimeTable from './TimeTable';

const CreateTimeTable = () => {
  const [timeTable, setTimeTable] = useState({
    groupName: "",
    class1: "",
    class2: "",
    class3: "",
    class4: "",
    class5: "",
    class6: "",
  });

  const { groupName, class1, class2, class3, class4, class5, class6 } = timeTable;

  const { id } = useParams(); // Extract id from URL params (if exists)
  const navigate = useNavigate();

  // Set the page title and fetch data if editing an existing timetable
  useEffect(() => {
    document.title = id ? "Update Time-Table" : "Create Time-Table";
    if (id) {
      fetchTimeTable();
    }
  }, [id]);

  // Fetch the timetable data for editing if an id is passed (for updating)
  const fetchTimeTable = async () => {
    try {
      const { data } = await Api.get(`/timetable/${id}`); // Assuming your endpoint structure
      setTimeTable(data);
    } catch (e) {
      console.error("Error fetching timetable:", e);
    }
  };

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setTimeTable({ ...timeTable, [name]: value });
  };

  // Handle form submission (POST for new timetable, PUT for updating existing one)
  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = { groupName, class1, class2, class3, class4, class5, class6 };

    try {
      if (id) {
        // If id is present, we are updating an existing timetable (PUT request)
        await Api.put(`/timetable/${id}`, payload);
        console.log('Updated timetable:', payload);
      } else {
        // If no id, we are creating a new timetable (POST request)
        await Api.post('/timetable', payload);
        console.log('Created timetable:', payload);
      }

      // Navigate to the "CreateTimeTable" page after successful creation or update
      navigate("/CreateTimeTable");

    } catch (e) {
      console.error("Error during form submission:", e);
    } finally {
      // Reset the form after submission
      setTimeTable({
        groupName: "",
        class1: "",
        class2: "",
        class3: "",
        class4: "",
        class5: "",
        class6: "",
      });
    }
  };

  return (
    <>
      <AsideBar />

      <div className="p-6 max-w-4xl mx-auto space-y-8">
        <h1 className="text-2xl font-semibold text-gray-800">
          {id ? "Update TimeTable" : "Create TimeTable"}
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col space-y-2">
              <label htmlFor="groupName">Group</label>
              <input
                type="text"
                id="groupName"
                placeholder="Enter the group"
                name="groupName"
                value={groupName}
                required
                onChange={handleChange}
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>

          {/* 1st Period */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col space-y-2">
              <label htmlFor="class1">1st Period</label>
              <input
                type="text"
                id="class1"
                placeholder="Enter the class"
                name="class1"
                value={class1}
                required
                onChange={handleChange}
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div className="flex flex-col space-y-2">
              <label htmlFor="class2">2nd Period</label>
              <input
                type="text"
                id="class2"
                placeholder="Enter the class"
                name="class2"
                value={class2}
                required
                onChange={handleChange}
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>

          {/* 3rd Period */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col space-y-2">
              <label htmlFor="class3">3rd Period</label>
              <input
                type="text"
                id="class3"
                placeholder="Enter the class"
                name="class3"
                value={class3}
                required
                onChange={handleChange}
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>

          {/* 4th Period */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col space-y-2">
              <label htmlFor="class4">4th Period</label>
              <input
                type="text"
                id="class4"
                placeholder="Enter the class"
                name="class4"
                value={class4}
                required
                onChange={handleChange}
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div className="flex flex-col space-y-2">
              <label htmlFor="class5">5th Period</label>
              <input
                type="text"
                id="class5"
                placeholder="Enter the class"
                name="class5"
                value={class5}
                required
                onChange={handleChange}
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>

          {/* 6th Period */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col space-y-2">
              <label htmlFor="class6">6th Period</label>
              <input
                type="text"
                id="class6"
                placeholder="Enter the class"
                name="class6"
                value={class6}
                required
                onChange={handleChange}
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>

          {/* Submit Button */}
          <div className="mt-6">
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {id ? "Update Timetable" : "Create Timetable"}
            </button>
          </div>
        </form>

        <TimeTable />
      </div>
    </>
  );
};

export default CreateTimeTable;
