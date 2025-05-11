// Bcom1Attendence.js

import React, { memo } from 'react';

import AsideBar from '../others/AsideBar';
import AttendanceForm from './AttendanceForm';
import AttendanceTable from './AttendanceTable';
import useAttendanceDatabcom from './useAttendanceDatabcom';

const Bcom2Attendence = () => {
  const {
    users,
    attendance,
    attendanceRecords,
    date,
    setDate,
    handleAttendanceChange,
    handleSubmit,
    calculatePercentage,
  } = useAttendanceDatabcom(2);

  return (
    <>
      <AsideBar />
      <section id="table-back" className="p-4 bg-gray-100 min-h-screen">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">BCOM Year-2 Attendance Sheet</h1>
        <AttendanceTable
          users={users}
          attendance={attendance}
          attendanceRecords={attendanceRecords}
          handleAttendanceChange={handleAttendanceChange}
          calculatePercentage={calculatePercentage}
        />
        <AttendanceForm date={date} setDate={setDate} handleSubmit={handleSubmit} />
      </section>
    </>
  );
};

export default memo(Bcom2Attendence);