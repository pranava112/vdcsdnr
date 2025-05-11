// AttendanceTable.js

import React from 'react';

const AttendanceTable = ({ users, attendance, attendanceRecords, handleAttendanceChange, calculatePercentage }) => {
  return (
    <section className="overflow-x-auto bg-white shadow-lg rounded-lg">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            {['ROLL-NO', 'SURNAME', 'NAME', 'GROUP', 'YEAR', 'ATTENDANCE %', 'STATUS'].map((heading) => (
              <th key={heading} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                {heading}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {users.map((student) => (
            <tr key={student.rollno}>
              <td className="px-6 py-4 whitespace-nowrap">{student.rollno}</td>
              <td className="px-6 py-4 whitespace-nowrap">{student.surname}</td>
              <td className="px-6 py-4 whitespace-nowrap">{student.name}</td>
              <td className="px-6 py-4 whitespace-nowrap">{student.studentGroup}</td>
              <td className="px-6 py-4 whitespace-nowrap">{student.year}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                {calculatePercentage(attendanceRecords[student.rollno] || { total: 0, present: 0 })}%
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <input
                  type="checkbox"
                  checked={attendance[student.rollno] === 'Present'}
                  onChange={(e) => handleAttendanceChange(e, student)}
                  className="form-checkbox h-5 w-5 text-blue-600 focus:ring-blue-500"
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
};

export default AttendanceTable;
