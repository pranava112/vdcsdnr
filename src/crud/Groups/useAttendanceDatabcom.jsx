// useAttendanceData.js

import { useEffect, useState } from 'react';

import Api from '../others/Api';
import axios from 'axios';

const useAttendanceDatabcom = (year) => {
  const [users, setUsers] = useState([]);
  const [attendance, setAttendance] = useState({});
  const [attendanceRecords, setAttendanceRecords] = useState({});
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    document.title = `BCOM Year-${year} Attendance Tracker`;
    fetchData();
  }, [year]);

  const fetchData = async () => {
    try {
      const response = await Api.get("/student");
      // axios.get("http://localhost:8080/api/vignan/student");
      const data = response.data;
      const filteredData = data.filter((item) => item.year === `${year}` && item.studentGroup === "bcom");
      setUsers(filteredData);

      // Initialize attendance records
      const initialAttendanceRecords = {};
      filteredData.forEach((student) => {
        initialAttendanceRecords[student.rollno] = { total: 0, present: 0 };
      });
      setAttendanceRecords(initialAttendanceRecords);
    } catch (error) {
      console.error("Error fetching students:", error.message);
    }
  };

  const handleAttendanceChange = (e, student) => {
    const status = e.target.checked ? 'Present' : 'Absent';
    setAttendance((prev) => ({ ...prev, [student.rollno]: status }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedRecords = { ...attendanceRecords };

    users.forEach((student) => {
      if (attendance[student.rollno] === 'Present') {
        updatedRecords[student.rollno].present += 1;
      }
      updatedRecords[student.rollno].total += 1;
    });

    setAttendanceRecords(updatedRecords);

    try {
      await Api.post(`/student/attendance`,{
      //  axios.post('http://localhost:8080/api/vignan/student/attendance', {
        date,
        attendanceRecords: updatedRecords,
      });
      alert("Attendance submitted successfully!");
    } catch (error) {
      console.error("Error submitting attendance:", error.message);
    }
  };

  const calculatePercentage = (record) => {
    return record.total > 0 ? ((record.present / record.total) * 100).toFixed(2) : '0.00';
  };

  return {
    users,
    attendance,
    attendanceRecords,
    date,
    setDate,
    handleAttendanceChange,
    handleSubmit,
    calculatePercentage,
  };
};

export default useAttendanceDatabcom;
