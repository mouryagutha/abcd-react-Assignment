import React, { useState } from "react";

const Calculator = () => {
  const [display, setDisplay] = useState("0");
  const [memory, setMemory] = useState(0);

  const buttons = [
    ["(", ")", "mc", "m+", "m-", "mr", "C", "±", "%", "÷"],
    ["2nd", "x²", "x³", "xʸ", "eˣ", "10ˣ", "7", "8", "9", "×"],
    ["¹/ₓ", "²√x", "³√x", "ʸ√x", "ln", "log₁₀", "4", "5", "6", "-"],
    ["x!", "sin", "cos", "tan", "e", "EE", "1", "2", "3", "+"],
    ["Rad", "sinh", "cosh", "tanh", "π", "Rand", "0", ".", "="],
  ];

  const handleButtonClick = (value) => {
    if (value === "C") {
      setDisplay("0");
    } else if (value === "mc") {
      setMemory(0);
    } else if (value === "m+") {
      setMemory((prevMemory) => prevMemory + parseFloat(display));
    } else if (value === "m-") {
      setMemory((prevMemory) => prevMemory - parseFloat(display));
    } else if (value === "mr") {
      setDisplay(memory.toString());
    } else if (value === "=") {
      try {
        setDisplay(eval(display).toString());
      } catch (e) {
        setDisplay("Error");
      }
    } else if (value === "%") {
      setDisplay((parseFloat(display) / 100).toString());
    } else {
      setDisplay((prevDisplay) =>
        prevDisplay === "0" ? value : prevDisplay + value
      );
    }
  };

  const handleFunctionClick = (func) => {
    switch (func) {
      case "x²":
        setDisplay(Math.pow(parseFloat(display), 2).toString());
        break;
      case "x³":
        setDisplay(Math.pow(parseFloat(display), 3).toString());
        break;
      case "²√x":
        setDisplay(Math.sqrt(parseFloat(display)).toString());
        break;
      case "ln":
        setDisplay(Math.log(parseFloat(display)).toString());
        break;
      case "log₁₀":
        setDisplay(Math.log10(parseFloat(display)).toString());
        break;
      default:
        break;
    }
  };

  return (
    <div className="bg-gray-800 flex items-center justify-center min-h-screen">
      <div className="bg-gray-700 rounded-lg shadow-lg p-4 w-full max-w-4xl">
        <div className="flex justify-between items-center mb-4">
          <div className="flex space-x-2">
            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
          </div>
          <div className="text-white text-4xl">{display}</div>
        </div>
        <div className="grid grid-cols-10 gap-1">
          {buttons.map((row, rowIndex) =>
            row.map((button, colIndex) => (
              <button
              key={`${rowIndex}-${colIndex}`}
              className={`py-2 ${['+', '-', '=', '×', '÷'].includes(button) ? 'bg-[rgb(241,161,58)]' : 'bg-gray-600'} text-white ${button === '0' ? 'col-span-2' : 'col-span-1'} ${['0', '1', '2', '3', '4', '5', '6', '7', '8', '9','.'].includes(button) ? 'bg-[rgb(114,114,112)]' : ''}`}
              onClick={() => {
                if (['x²', 'x³', '²√x', 'ln', 'log₁₀'].includes(button)) {
                  handleFunctionClick(button);
                } else {
                  handleButtonClick(button);
                }
              }}
            >
              {button}
            </button>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Calculator;
