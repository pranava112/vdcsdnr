import React, { memo, useEffect, useState } from "react";

const Calculator = () => {
  const [input, setInput] = useState("");

  useEffect(()=>{
    document.title="Calculator"
  })

  const handleClick = (value) => {
    setInput((prev) => prev + value);
  };

  const clearInput = () => {
    setInput("");
  };

  const calculateResult = () => {
    try {
      setInput(eval(input).toString());
    } catch (e) {
      console.log(e);
      setInput("Error");
    }
  };

  return (
    <div id="counter1" className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <div className="w-80 bg-white rounded-lg shadow-lg">
        <div id="calculator" className="bg-gray-200 text-right p-4 text-xl font-mono rounded-t-lg">
          {input || "0"}
        </div>
        <div className="grid grid-cols-4 gap-2 p-4">
          <button
            onClick={clearInput}
            className="col-span-2 bg-red-500 text-white py-2 rounded hover:bg-red-600"
          >
            C
          </button>
          <button
            onClick={() => handleClick("/")}
            className="bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
          >
            /
          </button>
          <button
            onClick={() => handleClick("*")}
            className="bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
          >
            *
          </button>
          <button
            onClick={() => handleClick("7")}
            className="bg-gray-400 py-2 rounded hover:bg-gray-400"
          >
            7
          </button>
          <button
            onClick={() => handleClick("8")}
            className="bg-gray-400 py-2 rounded hover:bg-gray-400"
          >
            8
          </button>
          <button
            onClick={() => handleClick("9")}
            className="bg-gray-400 py-2 rounded hover:bg-gray-400"
          >
            9
          </button>
          <button
            onClick={() => handleClick("-")}
            className="bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
          >
            -
          </button>
          <button
            onClick={() => handleClick("4")}
            className="bg-gray-400 py-2 rounded hover:bg-gray-400"
          >
            4
          </button>
          <button
            onClick={() => handleClick("5")}
            className="bg-gray-400 py-2 rounded hover:bg-gray-400"
          >
            5
          </button>
          <button
            onClick={() => handleClick("6")}
            className="bg-gray-400 py-2 rounded hover:bg-gray-400"
          >
            6
          </button>
          <button
            onClick={() => handleClick("+")}
            className="bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
          >
            +
          </button>
          <button
            onClick={() => handleClick("1")}
            className="bg-gray-400 py-2 rounded hover:bg-gray-400"
          >
            1
          </button>
          <button
            onClick={() => handleClick("2")}
            className="bg-gray-400 py-2 rounded hover:bg-gray-400"
          >
            2
          </button>
          <button
            onClick={() => handleClick("3")}
            className="bg-gray-400 py-2 rounded hover:bg-gray-400"
          >
            3
          </button>
          <button
            onClick={calculateResult}
            className="row-span-2 bg-green-500 text-white py-2 rounded hover:bg-green-600"
          >
            =
          </button>
          <button
            onClick={() => handleClick("0")}
            className="col-span-2 bg-gray-400 py-2 rounded hover:bg-gray-400"
          >
            0
          </button>
          <button
            onClick={() => handleClick(".")}
            className="bg-gray-400 py-2 rounded hover:bg-gray-400"
          >
            .
          </button>
        </div>
      </div>
    </div>
  );
};

export default memo(Calculator);

//completed finally on 25/12/2024
