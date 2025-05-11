// src/components/CreateTimeTable.jsx

import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import Api from '../others/Api';
import AsideBar from '../others/AsideBar';
import TimeTable from './TimeTable';
import axios from 'axios';

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

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    document.title = id ? "Update Time-Table" : "Create Time-Table";
    if (id) {
      fetchTimeTable();
    }
  }, [id]);

  const fetchTimeTable = async () => {
    try {
      const { data } = await Api.get(`/timetable/${id}`);
      // const { data } = await axios.get(`https://vignan-degree-college.azurewebsites.net/api/vignan/timetable/${id}`);
      setTimeTable(data);
    } catch (error) {
      console.error("Error fetching timetable:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTimeTable(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = { ...timeTable };

    try {
      if (id) {
        await Api.put(`/timetable/${id}`, payload);
        console.log("Updated timetable:", payload);
      } else {
        await Api.post('/timetable', payload);
        // await Api.post('https://vignan-degree-college.azurewebsites.net/api/vignan/timetable', payload);

        console.log("Created timetable:", payload);
      }
      navigate("/CreateTimeTable");
    } catch (error) {
      console.error("Error during form submission:", error);
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
            <InputField label="Group" name="groupName" value={timeTable.groupName} onChange={handleChange} />
            <InputField label="1st Period" name="class1" value={timeTable.class1} onChange={handleChange} />
            <InputField label="2nd Period" name="class2" value={timeTable.class2} onChange={handleChange} />
            <InputField label="3rd Period" name="class3" value={timeTable.class3} onChange={handleChange} />
            <InputField label="4th Period" name="class4" value={timeTable.class4} onChange={handleChange} />
            <InputField label="5th Period" name="class5" value={timeTable.class5} onChange={handleChange} />
            <InputField label="6th Period" name="class6" value={timeTable.class6} onChange={handleChange} />
          </div>

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

// Reusable Input Component
const InputField = ({ label, name, value, onChange }) => (
  <div className="flex flex-col space-y-2">
    <label htmlFor={name}>{label}</label>
    <input
      type="text"
      id={name}
      name={name}
      placeholder={`Enter ${label}`}
      value={value}
      required
      onChange={onChange}
      className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
    />
  </div>
);

export default CreateTimeTable;
