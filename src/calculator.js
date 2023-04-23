/** @format */
const calculatorKeys = document.querySelector(".calculator-keys");
const calculatorScreen = document.querySelector(".calculator-screen");
const innerCalculatorScreen = document.querySelector(
	".inner-calculator-screen-display"
);

let firstOperand = "";
let secondOperand = "";
let currentOperator = null;
let shouldResetScreen = false;

function appendNumber(number) {
	if (calculatorScreen.textContent === "0" || shouldResetScreen) resetScreen();
	calculatorScreen.textContent += number;
}

function resetScreen() {
	calculatorScreen.textContent = "";
	shouldResetScreen = false;
}

function clearAll() {
	calculatorScreen.textContent = "0";
	innerCalculatorScreen.textContent = "";
	firstOperand = "";
	secondOperand = "";
	currentOperator = null;
}

function handleOperator(operator) {
	if (currentOperator !== null) calculate();
	firstOperand = calculatorScreen.textContent;
	currentOperator = operator;
	shouldResetScreen = true;
}

function calculate() {
	if (currentOperator === null || shouldResetScreen) return;
	secondOperand = calculatorScreen.textContent;
	let result;

	switch (currentOperator) {
		case "+":
			result = parseFloat(firstOperand) + parseFloat(secondOperand);
			break;
		case "-":
			result = parseFloat(firstOperand) - parseFloat(secondOperand);
			break;
		case "*":
			result = parseFloat(firstOperand) * parseFloat(secondOperand);
			break;
		case "/":
			result = parseFloat(firstOperand) / parseFloat(secondOperand);
			break;
		default:
			return;
	}

	calculatorScreen.textContent = result;
	innerCalculatorScreen.textContent = `${firstOperand} ${currentOperator} ${secondOperand} = ${result}`;
	currentOperator = null;
	shouldResetScreen = true;
}

calculatorKeys.addEventListener("click", (e) => {
	const target = e.target;
	const action = target.dataset.action;

	if (!target.matches("button")) return;

	switch (action) {
		case "number":
			appendNumber(target.textContent);
			break;
		case "operator":
			handleOperator(target.textContent);
			break;
		case "decimal":
			if (shouldResetScreen) resetScreen();
			if (!calculatorScreen.textContent.includes("."))
				calculatorScreen.textContent += ".";
			break;
		case "clear":
			clearAll();
			break;
		case "calculate":
			calculate();
			break;
	}
});

module.export = { calculate, calculatorKeys };
