import React, { memo, useState } from 'react';
import dayjs from 'dayjs';
import 'tailwindcss/tailwind.css';

const Calender = () => {
  const [currentDate, setCurrentDate] = useState(dayjs());

  const startOfMonth = currentDate.startOf('month');
  const endOfMonth = currentDate.endOf('month');
  const startOfWeek = startOfMonth.startOf('week');
  const endOfWeek = endOfMonth.endOf('week');

  const days = [];
  let day = startOfWeek;

  while (day.isBefore(endOfWeek, 'day')) {
    days.push(day);
    day = day.add(1, 'day');
  }

  const changeMonth = (direction) => {
    setCurrentDate(currentDate.add(direction, 'month'));
  };

  return (
    <>
    <div className="max-w-md mx-auto bg-white shadow-lg rounded-lg overflow-hidden m-5 ">
      <div className="flex justify-between items-center bg-blue-500 text-white py-4 px-6 ">
        <button onClick={() => changeMonth(-1)} className="focus:outline-none">
          &lt;
        </button>
        <h1 className="text-lg font-bold">
          {currentDate.format('MMMM YYYY')}
        </h1>
        <button onClick={() => changeMonth(1)} className="focus:outline-none">
          &gt;
        </button>
      </div>
      <div className="grid grid-cols-7 gap-4 p-4 text-black">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
          <div key={day} className="text-center font-semibold ">
            {day}
          </div>
        ))}
        {days.map((day) => (
          <div
            key={day.format('DD-MM-YYYY')}
            className={` h-10 w-10 flex items-center justify-center rounded-full ${
              day.isSame(currentDate, 'month') ? 'bg-gray-200' : 'text-gray-400'
            } ${day.isSame(dayjs(), 'day') && 'bg-blue-900 font-bold text-white '}`}
          >
            {day.date()}
          </div>
        ))}
      </div>
    </div>
    </>
  );
};

export default memo(Calender);
