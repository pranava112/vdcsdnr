import React, { Fragment, useEffect, useState } from 'react';
import { MdDelete } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import AsideBar from './AsideBar';
import Api from './Api';

const DeleteStudent = () => {
  const [students, setStudents] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const navigate = useNavigate();

  // Fetch all students on component mount
  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await Api.get('/student'); // Update API endpoint here
        setStudents(response.data);
      } catch (error) {
        console.error('Error fetching students:', error.message);
      }
    };
    fetchStudents();
  }, []);

  // Delete a student by roll number
  const deleteStudent = async (rollno) => {
    if (!window.confirm(`Do you really want to delete student with Roll No: ${rollno}?`)) return;

    if (isDeleting) return;
    setIsDeleting(true);

    try {
      const response = await Api.delete(`/student/${rollno}`);
      if (response.status === 200) {
        console.log(`Student with Roll No: ${rollno} deleted successfully.`);
        setStudents((prevStudents) =>
          prevStudents.filter((student) => student.rollno !== rollno)
        );
        navigate('/viewAllPersuing');
      } else {
        console.error(`Failed to delete student with Roll No: ${rollno}`);
      }
    } catch (error) {
      console.error('Error deleting student:', error.message);
    } finally {
      setIsDeleting(false);
    }
  };

  // Filter students based on search input
  const filteredStudents = students.filter((student) =>
    student.rollno.toString().toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.surname.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <AsideBar />
      <div className="flex-1 p-4 md:p-6">
        <div className="overflow-x-auto shadow-lg bg-white rounded-lg">
          <h1 className="text-3xl font-bold mb-8 text-black">Delete Students</h1>

          {/* Search Input */}
          <div className="mb-4">
            <input
              type="text"
              className="w-full border px-4 py-2 rounded"
              placeholder="Search by roll number, surname, or name"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <table className="w-full border-collapse text-sm md:text-base">
            <thead className="bg-blue-500 text-white">
              <tr>
                <th className="p-3 border-b-2">ROLL-NO</th>
                <th className="p-3 border-b-2">SURNAME</th>
                <th className="p-3 border-b-2">NAME</th>
                <th className="p-3 border-b-2">ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {filteredStudents.length === 0 ? (
                <tr>
                  <td colSpan="4" className="text-center p-4">
                    No matching records found.
                  </td>
                </tr>
              ) : (
                filteredStudents.map((val) => (
                  <Fragment key={val.rollno}>
                    <tr className="border-b">
                      <td className="p-3">{val.rollno}</td>
                      <td className="p-3">{val.surname}</td>
                      <td className="p-3">{val.name}</td>
                      <td className="p-3">
                        <button
                          onClick={() => deleteStudent(val.rollno)}
                          className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                          disabled={isDeleting}
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
    </>
  );
};

export default DeleteStudent;
