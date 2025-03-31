import React, { memo, useEffect, useState } from 'react';
import AsideBar from '../others/AsideBar';
import { useNavigate, useParams } from 'react-router-dom';
import Api from '../others/Api'; // Import the Api instance

const EditTimeTable = () => {

    let [timeTable, setTimeTable] = useState({
        groupName: "",
        class1: "",
        class2: "",
        class3: "",
        class5: "",
        class6: "",
        class7: "",
    });

    let { groupName, class1, class2, class3, class5, class6, class7 } = timeTable;

    useEffect(() => {
        document.title = "Update Time-Table";
    }, []);

    let handleChange = (e) => {
        const { name, value } = e.target;
        setTimeTable({ ...timeTable, [name]: value });
    };

    let { id } = useParams();

    // Get the timetable data for the given id
    let getApi = async () => {
        try {
            let { data } = await Api.get(`/timetable/${id}`);  // Use Api to get data
            setTimeTable(data);
        } catch (e) {
            console.log(e);
        }
    };

    useEffect(() => {
        getApi();  // Fetch timetable data when the component mounts
    }, []);

    let navigate = useNavigate();

    // Handle form submission
    let handleSubmit = async (e) => {
        e.preventDefault();
        console.log(timeTable);

        try {
            // Prepare the payload with the updated data
            let payload = { groupName, class1, class2, class3, class5, class6, class7 };

            // Use Api to send a PUT request to update the timetable
            await Api.put(`/timetable/${id}`, payload);

            console.log('Updated timetable:', payload);

            // Navigate to the "CreateTimeTable" page after successful update
            navigate("/CreateTimeTable");

        } catch (e) {
            console.log(e);
        } finally {
            // Reset the form
            setTimeTable({
                groupName: "",
                class1: "",
                class2: "",
                class3: "",
                class5: "",
                class6: "",
                class7: "",
            });
        }
    };

    return (
        <>
            <AsideBar />

            <div className="p-6 max-w-4xl mx-auto space-y-8">
                <h1 className="text-2xl font-semibold text-gray-800">Update TimeTable</h1>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="flex flex-col space-y-2">
                            <label htmlFor="group">Group</label>
                            <input
                                type="text"
                                id='group'
                                placeholder='Enter the group'
                                name='group'
                                value={groupName}
                                required
                                onChange={handleChange}
                                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="flex flex-col space-y-2">
                            <label htmlFor="class1">1st Period</label>
                            <input
                                type="text"
                                id='class1'
                                placeholder='Enter the group'
                                name='class1'
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
                                id='class2'
                                placeholder='Enter the group'
                                name='class2'
                                value={class2}
                                required
                                onChange={handleChange}
                                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="flex flex-col space-y-2">
                            <label htmlFor="class3">3rd Period</label>
                            <input
                                type="text"
                                id='class3'
                                placeholder='Enter the group'
                                name='class3'
                                value={class3}
                                required
                                onChange={handleChange}
                                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="flex flex-col space-y-2">
                            <label htmlFor="class5">4th Period</label>
                            <input
                                type="text"
                                id='class5'
                                placeholder='Enter the group'
                                name='class5'
                                value={class5}
                                required
                                onChange={handleChange}
                                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            />
                        </div>

                        <div className="flex flex-col space-y-2">
                            <label htmlFor="class6">5th Period</label>
                            <input
                                type="text"
                                id='class6'
                                placeholder='Enter the group'
                                name='class6'
                                value={class6}
                                required
                                onChange={handleChange}
                                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="flex flex-col space-y-2">
                            <label htmlFor="class7">6th Period</label>
                            <input
                                type="text"
                                id='class7'
                                placeholder='Enter the group'
                                name='class7'
                                value={class7}
                                required
                                onChange={handleChange}
                                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            />
                        </div>
                    </div>

                    <div className="mt-6">
                        <button
                            type="submit"
                            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            Update Timetable
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
};

export default memo(EditTimeTable);
