import React, { Fragment, useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { CiEdit } from 'react-icons/ci';
import { MdDelete } from 'react-icons/md';
import Api from '../others/Api';  // Import Api instance

const TimeTable = () => {

  let [datas, setDatas] = useState([]);

  // Fetch the timetable data
  const fetchData = async () => {
    try {
      let { data } = await Api.get('/timetable');  // Use Api instance for GET request
      setDatas(data);
      console.log(data);
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  // Delete the timetable by id
  const deleteTimeTable = (id) => {
    if (window.confirm('Do you want to delete the timetable?')) {  // Added confirmation before deletion
      Api.delete(`/timetable/${id}`)  // Use Api instance for DELETE request
        .then(() => {
          fetchData();  // Fetch updated data after deletion
        })
        .catch((error) => {
          console.error('Error deleting timetable:', error);
        });
    }
  };

  return (
    <>
      <section className="flex flex-col md:flex-row bg-gray-100">
        <div className="flex-1 p-4 md:p-6">
          <div className="overflow-x-auto shadow-lg bg-white rounded-lg">
            <table className="w-full border-collapse text-sm md:text-base">
              <thead className="bg-blue-500 text-white">
                <tr>
                  <th className="p-3 border-b-2">GROUP</th>
                  <th className="p-3 border-b-2">10:00 AM to 10:50 AM</th>
                  <th className="p-3 border-b-2">10:50 AM to 11:40 AM</th>
                  <th className="p-3 border-b-2">11:40 AM to 12:30 PM</th>
                  <th className="p-3 border-b-2">12:30 PM to 1:00 PM</th>
                  <th className="p-3 border-b-2">1:00 PM to 1:50 PM</th>
                  <th className="p-3 border-b-2">1:50 PM to 2:40 PM</th>
                  <th className="p-3 border-b-2">2:40 PM to 3:30 PM</th>
                  <th className="p-3 border-b-2">MORE</th>
                </tr>
              </thead>
              <tbody>
                {datas.length === 0 ? (
                  <tr>
                    <td colSpan="7" className="text-center p-4">Loading...</td>
                  </tr>
                ) : (
                  datas.map((val) => (
                    <Fragment key={val.id}>
                      <tr className="border-b hover:bg-gray-100">
                        <td className="p-3">{val.groupName}</td>
                        <td className="p-3 text-center">{val.class1}</td>
                        <td className="p-3 text-center">{val.class2}</td>
                        <td className="p-3 text-center">{val.class3}</td>
                        <td className="p-3 text-center bg-red-600">Lunch</td>
                        <td className="p-3 text-center">{val.class4}</td>
                        <td className="p-3 text-center">{val.class5}</td>
                        <td className="p-3 text-center">{val.class6}</td>
                        <td className="p-3 text-center">
                          <NavLink to={`/edittimetable/${val.id}`}>
                            <button className="bg-yellow-500 text-white px-1 py-1 rounded hover:bg-yellow-600">
                              <CiEdit className="inline-block" /> EDIT
                            </button>
                          </NavLink>
                          <button
                            onClick={() => deleteTimeTable(val.id)}
                            className="bg-red-500 text-white px-1 py-1 rounded hover:bg-red-600"
                          >
                            <MdDelete className="inline-block" /> DELETE
                          </button>
                        </td>
                      </tr>
                    </Fragment>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </>
  );
};

export default TimeTable;
