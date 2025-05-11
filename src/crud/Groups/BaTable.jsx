import React, { Fragment, useEffect, useState } from 'react';

import Api from '../others/Api'; // Ensure Api is configured properly
import { CSVLink } from 'react-csv';
import { NavLink } from 'react-router-dom';

const BaTable = ({ year, title, attendenceLink }) => {
  const [user, setUser] = useState([]);
  const [loading, setLoading] = useState(true); // Track loading state
  const [error, setError] = useState(null); // Track error state

  useEffect(() => {
    document.title = title;
  }, [title]);

  const fetchData = async () => {
    try {
      const response = await Api.get("/student"); // Ensure Api is configured correctly
      if (response.status !== 200) {
        throw new Error("Failed to fetch students");
      }
      const data = response.data; // Use response.data if you're using Axios
      const filteredData = data.filter((item) => item.year === year && item.studentGroup === "ba");
      setUser(filteredData);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching students:", error.message);
      setError(error.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [year]);

  const generateCsvData = () => {
    // Generate CSV-friendly data
    return user.map((val) => ({
      RollNo: val.rollno,
      Surname: val.surname,
      Name: val.name,
      DOB: val.dob,
      Group: val.studentGroup,
      Year: val.year,
      Mobile: val.mobile,
      Address: val.address,
    }));
  };

  if (loading) {
    return <div className="px-6 py-4 text-center text-gray-500">Loading...</div>;
  }

  if (error) {
    return <div className="px-6 py-4 text-center text-red-500">Error: {error}</div>;
  }

  return (
    <section className="flex flex-col md:flex-row bg-gray-100">
      
      <div className="flex-1 p-4 md:p-6 bg-gray-100">
        <div className="mt-5 mb-5 bg-gray-100">
          <NavLink to={attendenceLink}>
            <button title="Take Attendance" className="px-3 py-2 text-sm text-white bg-blue-500 rounded hover:bg-blue-600">
              Take Attendance
            </button>
          </NavLink>
        </div>

        <div className="overflow-x-auto shadow-lg bg-white rounded-lg">
          <h1 className="text-3xl font-bold mb-8 text-black">{title}</h1>
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                {['ROLL-NO', 'SURNAME', 'NAME', 'DOB', 'GROUP', 'YEAR', 'MOBILE', 'ADDRESS', 'MORE-OPTIONS'].map((heading) => (
                  <th key={heading} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {heading}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {user.length === 0 ? (
                <tr>
                  <td colSpan="9" className="px-6 py-4 text-center text-gray-500">No students found</td>
                </tr>
              ) : (
                user.map((val) => (
                  <Fragment key={val.id}>
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap">{val.rollno}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{val.surname}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{val.name}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{val.dob}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{val.studentGroup}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{val.year}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{val.mobile}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{val.address}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <NavLink to={`/viewsingle/${val.rollno}`}>
                          <button className="px-3 py-2 text-sm text-white bg-blue-500 rounded hover:bg-blue-600">MORE</button>
                        </NavLink>
                      </td>
                    </tr>
                  </Fragment>
                ))
              )}
            </tbody>
          </table>
        </div>

        <div className="mt-4 bg-gray-100">
          <CSVLink data={generateCsvData()} filename="vdc-students.csv">
            <button className="px-4 py-2 text-sm font-medium text-white bg-green-500 rounded hover:bg-green-600">
              EXPORT TO EXCEL
            </button>
          </CSVLink>
        </div>
      </div>
    </section>
  );
};

export default BaTable;
