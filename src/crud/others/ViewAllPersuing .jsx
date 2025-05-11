import { CiEdit, CiSquareMore } from "react-icons/ci";
import React, { Fragment, useEffect, useState } from 'react';

import Api from './Api';
import AsideBar from './AsideBar';
import { CSVLink } from 'react-csv';
import { MdDelete } from "react-icons/md";
import { MdPayment } from "react-icons/md";
import { NavLink } from 'react-router-dom';
import axios from 'axios';

const ViewAllPersuing = () => {
    const [students, setStudents] = useState([]);
    const [searchTerm, setSearchTerm] = useState(''); // State for search term

      const fetchData = async () => {
        try {
            const response = await Api.get("/student");
            const filteredData = response.data.filter(
                (item) => item.year === '1' || item.year === '2' || item.year === '3'
            );
            setStudents(filteredData);
        } catch (error) {
            console.error("Error fetching students:", error.message);
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
        <>
            <section id='viewall' className="flex flex-col md:flex-row bg-gray-100">
                <AsideBar />
                <div id='viewall' className="flex-1 p-4 md:p-6">
                    <div id='viewall' className="overflow-x-auto shadow-lg bg-white rounded-lg">
                        <h1 className="text-3xl font-bold mb-8 text-black">ViewAll Persuing Students</h1>

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

                        <table id='viewall' className="w-full border-collapse text-sm md:text-base">
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
                                    filteredStudents.map(val => (
                                        <Fragment key={val.rollno}>
                                            <tr className="border-b">
                                                <td className="p-3">{val.rollno}</td>
                                                <td className="p-3">{val.surname}</td>
                                                <td className="p-3">{val.name}</td>
                                                <td className="p-3">{val.jyear}</td>
                                                <td className="p-3">{val.studentGroup}</td>
                                                <td className="p-3">{val.year}</td>
                                                <td className="p-3">{val.balance}.rs</td>
                                                <td className="p-3">
                                                    <NavLink to={`/payment/${val.rollno}`}>
                                                        <button className="bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600">
                                                            <MdPayment className="inline-block" /> PAY
                                                        </button>
                                                    </NavLink>
                                                </td>
                                                <td className="p-3 space-x-2">
                                                    <NavLink to={`/viewsingle/${val.rollno}`}>
                                                        <button className="bg-blue-500 text-white px-1 py-1 rounded hover:bg-blue-600 ml-2 mt-1 pr-3">
                                                            <CiSquareMore className="inline-block" /> MORE
                                                        </button>
                                                    </NavLink>
                                                    <NavLink to={`/update/${val.rollno}`}>
                                                        <button className="bg-yellow-500 text-white px-1 py-1 rounded hover:bg-yellow-600 mt-1 pr-6">
                                                            <CiEdit className="inline-block" /> EDIT
                                                        </button>
                                                    </NavLink>

                                                    <NavLink to={`/deleteStudent/${val.rollno}`}>
                                                        <button className="bg-red-600 text-white px-1 py-1 rounded hover:bg-red-600 mt-1 pr-6">
                                                        <MdDelete className="inline-block" /> DELETE
                                                        </button>
                                                    </NavLink>
                                                    {/* <button
                                                        onClick={() => deleteStudent(val.rollno)}
                                                        className="bg-red-500 text-white px-1 py-1 rounded hover:bg-red-600 mt-1"
                                                    >
                                                        <MdDelete className="inline-block" /> DELETE
                                                    </button> */}
                                                </td>
                                            </tr>
                                        </Fragment>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>

                    <div id='viewall' className="mt-4 text-center">
                        <CSVLink data={students} filename="vdc-students.csv">
                            <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                                EXPORT TO EXCEL
                            </button>
                        </CSVLink>
                    </div>
                </div>
            </section>
        </>
    );
};

export default ViewAllPersuing;