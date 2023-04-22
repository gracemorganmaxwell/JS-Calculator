// Functions for arithmetic operations
function add(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

function multiply(a, b) {
  return a * b;
}

function divide(a, b) {
  if (b === 0) {
    return "Cannot divide by zero";
  } else {
    return a / b;
  }
}

// Select DOM elements
const calculatorInput = document.querySelector('.calculator-input');
const calculatorOutput = document.querySelector('.calculator-output');
const numberButtons = document.querySelectorAll('[data-number]');
const operatorButtons = document.querySelectorAll('.operator');
const clearButton = document.querySelector('[data-action="clear"]');
const delButton = document.querySelector('.del');
const equalsButton = document.querySelector('.equal-sign');

// Add event listeners to number buttons
numberButtons.forEach(button => {
  button.addEventListener('click', () => {
    calculatorInput.textContent += button.textContent;
  });
});

// Add event listeners to operator buttons
operatorButtons.forEach(button => {
  button.addEventListener('click', () => {
    calculatorInput.textContent += button.textContent;
  });
});

// Add event listener to clear button
clearButton.addEventListener('click', () => {
  calculatorInput.textContent = '';
  calculatorOutput.textContent = '';
});

// Add event listener to delete button
delButton.addEventListener('click', () => {
  calculatorInput.textContent = calculatorInput.textContent.slice(0, -1);
});

// Add event listener to equals button
equalsButton.addEventListener('click', () => {
  const input = calculatorInput.textContent;
  const expression = input.replace(/×/g, '*').replace(/÷/g, '/');
  try {
    const result = eval(expression);
    calculatorOutput.textContent = result;
  } catch (e) {
    calculatorOutput.textContent = 'Invalid expression';
  }
});
