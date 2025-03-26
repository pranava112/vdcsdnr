// Bcom1Attendence.js
import React, { memo } from 'react';
import AsideBar from '../others/AsideBar';
import AttendanceTable from './AttendanceTable';
import AttendanceForm from './AttendanceForm';
import useAttendanceDatampcs from './useAttendanceDatampcs';

const BscMpcs1Attendence = () => {
  const {
    users,
    attendance,
    attendanceRecords,
    date,
    setDate,
    handleAttendanceChange,
    handleSubmit,
    calculatePercentage,
  } = useAttendanceDatampcs(1);

  return (
    <>
      <AsideBar />
      <section id="table-back" className="p-4 bg-gray-100 min-h-screen">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">BSC-MPCS Year-1 Attendance Sheet</h1>
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

export default memo(BscMpcs1Attendence);
