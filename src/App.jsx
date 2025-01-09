import React, { useState } from 'react';
import Confetti from 'react-confetti';

const Calculator = () => {
  const [display, setDisplay] = useState('0');
  const [memory, setMemory] = useState(0);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [showConfetti, setShowConfetti] = useState(false);
  const [isRadians, setIsRadians] = useState(true);

  const buttons = [
    ["(", ")", "mc", "m+", "m-", "mr", "C", "+/-", "%", "÷"],
    ["2nd", "x²", "x³", "xʸ", "eˣ", "10ˣ", "7", "8", "9", "×"],
    ["¹/ₓ", "²√x", "³√x", "ʸ√x", "ln", "log₁₀", "4", "5", "6", "-"],
    ["x!", "sin", "cos", "tan", "e", "EE", "1", "2", "3", "+"],
    ["Rad", "sinh", "cosh", "tanh", "π", "Rand", "0", ".", "="]
  ];

  const handleButtonClick = (value) => {
    if (value === 'C') {
      setDisplay('0');
      setShowConfetti(false);
    } else if (value === 'mc') {
      setMemory(0);
    } else if (value === 'm+') {
      setMemory(prevMemory => prevMemory + parseFloat(display));
    } else if (value === 'm-') {
      setMemory(prevMemory => prevMemory - parseFloat(display));
    } else if (value === 'mr') {
      setDisplay(memory.toString());
    } else if (value === '=') {
      try {
        const sanitizedDisplay = display.replace(/×/g, '*').replace(/÷/g, '/');
        if (sanitizedDisplay.includes('/0')) {
          setDisplay('Error');
        } else {
          setDisplay(eval(sanitizedDisplay).toString());
        }
      } catch (e) {
        setDisplay('Error');
      }
    }
    
     else if (value === '%') {
      setDisplay((parseFloat(display) / 100).toString());
    } else {
      setDisplay(prevDisplay => prevDisplay === '0' ? value : prevDisplay + value);
    }
  };

  const handleFunctionClick = (func) => {
    const num = parseFloat(display);
  
    switch (func) {
      case 'x²':
        setDisplay((num ** 2).toString());
        break;
      case 'x³':
        setDisplay((num ** 3).toString());
        break;
      case '²√x':
        setDisplay(Math.sqrt(num).toString());
        break;
      case 'ln':
        setDisplay(Math.log(num).toString());
        break;
      case 'log₁₀':
        setDisplay(Math.log10(num).toString());
        break;
      case 'x!':
        const factorial = (n) => (n <= 1 ? 1 : n * factorial(n - 1));
        setDisplay(factorial(num).toString());
        break;
      case 'sin':
        setDisplay(Math.sin(num).toString());
        break;
      case 'cos':
        setDisplay(Math.cos(num).toString());
        break;
      case 'tan':
        setDisplay(Math.tan(num).toString());
        break;
      default:
        break;
    }
  };
  

  return (
    <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-gray-200'} flex items-center justify-center min-h-screen relative`}>
      {showConfetti && <Confetti />}
      <button
        className="absolute top-2 right-2 p-2 bg-gray-500 text-white rounded"
        onClick={() => setIsDarkMode(!isDarkMode)}
      >
        {isDarkMode ? 'Light Mode' : 'Dark Mode'}
      </button>
      <div className="bg-gray-700 rounded-lg shadow-lg p-4 w-full max-w-4xl">
        <div className="flex justify-between items-center mb-4">
          <div className="flex space-x-2">
            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
          </div>
          <div className="text-white text-4xl px-5 truncate">{display}</div>
        </div>
        <div className="grid grid-cols-5 sm:grid-cols-10 gap-1">
          {buttons.map((row, rowIndex) => (
            row.map((button, colIndex) => (
              <button
                key={`${rowIndex}-${colIndex}`}
                className={`py-2 ${
                  ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '.'].includes(button)
                    ? 'bg-gray-400 text-black'
                    : button === '+' || button === '-' || button === '=' || button === '×' || button === '÷'
                    ? 'bg-orange-400 text-white font-bold'
                    : 'bg-gray-500 text-white'
                } ${button === '0' ? 'col-span-2' : 'col-span-1'} hover:bg-gray-700`}
                onClick={() => {
                  if (['x²', 'x³', '²√x', 'ln', 'log₁₀', 'x!', 'sin', 'cos', 'tan', 'Rand'].includes(button)) {
                    handleFunctionClick(button);
                  } else {
                    handleButtonClick(button);
                  }
                }}
              >
                {button}
              </button>
            ))
          ))}
        </div>
      </div>
    </div>
  );
};

export default Calculator;
