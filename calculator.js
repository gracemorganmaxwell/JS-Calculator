// Function to add two numbers
function add(a, b) {
  return a + b;
}

// Function to subtract two numbers
function subtract(a, b) {
  return a - b;
}

// Function to multiply two numbers
function multiply(a, b) {
  return a * b;
}

// Function to divide two numbers
function divide(a, b) {
  if (b === 0) {
    return "Cannot divide by zero";
  } else {
    return a / b;
  }
}

// Prompt the user to enter the first number
const num1 = parseFloat(prompt("Enter the first number:"));

// Prompt the user to enter the second number
const num2 = parseFloat(prompt("Enter the second number:"));

// Prompt the user to choose an operation
const operation = prompt("Choose an operation (+, -, *, /):");

// Perform the selected operation
let result;
if (operation === "+") {
  result = add(num1, num2);
} else if (operation === "-") {
  result = subtract(num1, num2);
} else if (operation === "*") {
  result = multiply(num1, num2);
} else if (operation === "/") {
  result = divide(num1, num2);
} else {
  result = "Invalid operation";
}

// Display the result
alert("The result is " + result);
