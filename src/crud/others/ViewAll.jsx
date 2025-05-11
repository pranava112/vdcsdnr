import { CiEdit, CiSquareMore } from "react-icons/ci";
import { MdDelete, MdPayment } from "react-icons/md";
import React, { Fragment, useEffect, useState } from 'react';

import Api from './Api'; // Updated to use Api instance
import AsideBar from './AsideBar';
import { CSVLink } from 'react-csv';
import { NavLink } from 'react-router-dom';

const ViewAll = () => {
    const [students, setStudents] = useState([]);
    const [searchTerm, setSearchTerm] = useState(''); // State for search term

    // Fetch student data using Api instance
    const fetchData = async () => {
        try {
            const response = await Api.get("/student");
            setStudents(response.data);
        } catch (error) {
            console.error("Error fetching students:", error);
        }
    };

    useEffect(() => {
        document.title = "View All Students";
        fetchData();
    }, []);

    // Handle search input change
    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    // Filter students based on search term
    const filteredStudents = students.filter((student) => {
        return (
            student.rollno.toString().toLowerCase().includes(searchTerm.toLowerCase()) ||
            student.surname.toLowerCase().includes(searchTerm.toLowerCase()) ||
            student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            student.studentGroup.toLowerCase().includes(searchTerm.toLowerCase()) ||
            student.year.toString().includes(searchTerm.toLowerCase())
        );
    });

    return (
        <section id="viewall" className="flex flex-col md:flex-row bg-gray-100">
            <AsideBar />
            <div id="viewall" className="flex-1 p-4 md:p-6">
                <div id="viewall" className="overflow-x-auto shadow-lg bg-white rounded-lg">
                    <h1 className="text-3xl font-bold mb-8 text-black">View All Students</h1>

                    {/* Search Input */}
                    <div className="mb-4">
                        <input
                            type="text"
                            className="w-full border px-4 py-2 rounded"
                            placeholder="Search by roll number, surname, name, group, or year"
                            value={searchTerm}
                            onChange={handleSearchChange}
                        />
                    </div>

                    <table id="viewall" className="viewall w-full border-collapse text-sm md:text-base">
                        <thead className="bg-blue-500 text-white">
                            <tr>
                                <th className="p-3 border-b-2">ROLL-NO</th>
                                <th className="p-3 border-b-2">SURNAME</th>
                                <th className="p-3 border-b-2">NAME</th>
                                <th className="p-3 border-b-2">JOINING YEAR</th>
                                <th className="p-3 border-b-2">GROUP</th>
                                <th className="p-3 border-b-2">YEAR</th>
                                <th className="p-3 border-b-2">FEE BALANCE</th>
                                <th className="p-3 border-b-2">PAY</th>
                                <th className="p-3 border-b-2">MORE OPTIONS</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredStudents.length === 0 ? (
                                <tr>
                                    <td colSpan="9" className="text-center p-4">No matching records found.</td>
                                </tr>
                            ) : (
                                filteredStudents.map((student) => (
                                    <Fragment key={student.rollno}>
                                        <tr className="border-b">
                                            <td className="p-3">{student.rollno}</td>
                                            <td className="p-3">{student.surname}</td>
                                            <td className="p-3">{student.name}</td>
                                            <td className="p-3">{student.jyear}</td>
                                            <td className="p-3">{student.studentGroup}</td>
                                            <td className="p-3">{student.year}</td>
                                            <td className="p-3">{student.balance}.rs</td>
                                            <td className="p-3">
                                                <NavLink to={`/payment/${student.rollno}`}>
                                                    <button className="bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600">
                                                        <MdPayment className="inline-block" /> PAY
                                                    </button>
                                                </NavLink>
                                            </td>
                                            <td className="p-3 space-x-2">
                                                <NavLink to={`/viewsingle/${student.rollno}`}>
                                                    <button className="bg-blue-500 text-white px-1 py-1 rounded hover:bg-blue-600 ml-2 mt-1 pr-3">
                                                        <CiSquareMore className="inline-block" /> MORE
                                                    </button>
                                                </NavLink>
                                                <NavLink to={`/update/${student.rollno}`}>
                                                    <button className="bg-yellow-500 text-white px-1 py-1 rounded hover:bg-yellow-600 mt-1 pr-6">
                                                        <CiEdit className="inline-block" /> EDIT
                                                    </button>
                                                </NavLink>
                                                <NavLink to={`/deleteStudent/${student.rollno}`}>
                                                    <button className="bg-red-600 text-white px-1 py-1 rounded hover:bg-red-600 mt-1 pr-6">
                                                        <MdDelete className="inline-block" /> DELETE
                                                    </button>
                                                </NavLink>
                                            </td>
                                        </tr>
                                    </Fragment>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>

                <div id="viewall" className="mt-4 text-center">
                    <CSVLink data={students} filename="vdc-students.csv">
                        <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                            EXPORT TO EXCEL
                        </button>
                    </CSVLink>
                </div>
            </div>
        </section>
    );
};

export default ViewAll;
