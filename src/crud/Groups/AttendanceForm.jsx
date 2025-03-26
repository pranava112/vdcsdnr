// AttendanceForm.js
import React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const AttendanceForm = ({ date, setDate, handleSubmit }) => {
  return (
    <form onSubmit={handleSubmit} className="mt-8 bg-white rounded-lg shadow-lg p-6">
      <div>
        <label className="block text-sm font-medium text-gray-700">Select Date</label>
        <DatePicker
          selected={date}
          onChange={(newDate) => setDate(newDate)}
          className="mt-2 border rounded-md p-2 w-full"
        />
      </div>
      <button type="submit" className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg">
        Submit Attendance
      </button>
    </form>
  );
};

export default AttendanceForm;
