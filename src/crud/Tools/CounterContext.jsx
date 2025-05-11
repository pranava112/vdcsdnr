import React, { memo, useEffect, useState } from 'react';

const CounterContext = () => {
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    document.title = "Counter";
  });

  const increment = () => {
    setCounter(counter + 1);
  };

  const decrement = () => {
    setCounter(counter - 1);
  };

  const reset = () => {
    setCounter(0);
  };

  return (
    <div id='counter' className="flex items-center justify-center min-h-screen bg-gray-100">
      <div id='counter1' className="flex flex-col items-center justify-center p-6 border-2 border-gray-300 rounded-md shadow-lg bg-white">
        <h1 id="" className="text-4xl font-bold mb-4 text-black">{counter}</h1>
        <div className="flex space-x-4">
          <button
            onClick={increment}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
          >
            +
          </button>
          <button
            onClick={decrement}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-300"
          >
            -
          </button>
          <button
            onClick={reset}
            className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-300"
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );
};

export default memo(CounterContext);
