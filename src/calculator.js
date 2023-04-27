/** @format */

class Calculator {
	constructor() {
		this.firstOperand = null;
		this.secondOperand = null;
		this.currentOperator = null;
		this.shouldResetScreen = false;
		this.calculatorScreen = document.querySelector(".calculator-screen");
		this.innerCalculatorScreen = document.querySelector(
			".inner-calculator-screen"
		);
	}

	appendNumber(number) {
		if (this.shouldResetScreen) {
			this.calculatorScreen.textContent = "";
			this.shouldResetScreen = false;
		}
		this.calculatorScreen.textContent += number;
	}

	appendDecimal() {
		if (this.shouldResetScreen) {
			this.calculatorScreen.textContent = "0";
			this.shouldResetScreen = false;
		}
		if (!this.calculatorScreen.textContent.includes(".")) {
			this.calculatorScreen.textContent += ".";
		}
	}

	handleOperator(operator) {
		if (this.currentOperator !== null) this.calculate();
		this.firstOperand = this.calculatorScreen.textContent;
		this.currentOperator = operator;
		this.shouldResetScreen = true;
	}

	calculate() {
		if (this.currentOperator === null || this.shouldResetScreen) return;

		let result;
		const firstOperand = parseFloat(this.firstOperand);
		const secondOperand = parseFloat(this.calculatorScreen.textContent);

		switch (this.currentOperator) {
			case "+":
				result = firstOperand + secondOperand;
				break;
			case "-":
				result = firstOperand - secondOperand;
				break;
			case "*":
				result = firstOperand * secondOperand;
				break;
			case "/":
				result = firstOperand / secondOperand;
				break;
			default:
				return;
		}

		this.calculatorScreen.textContent = parseFloat(
			result.toFixed(2)
		).toString();
		this.innerCalculatorScreen.textContent = `${this.firstOperand} ${this.currentOperator} ${this.calculatorScreen.textContent} =`;
		this.currentOperator = null;
		this.shouldResetScreen = true;
	}

	resetScreen() {
		this.calculatorScreen.textContent = "0";
		this.shouldResetScreen = false;
	}

	clearAll() {
		this.calculatorScreen.textContent = "0";
		this.innerCalculatorScreen.textContent = "";
		this.firstOperand = null;
		this.secondOperand = null;
		this.currentOperator = null;
	}

	handleButtonClick(event) {
		const target = event.target;
		if (!target.matches("button")) return;

		const action = target.dataset.action;

		switch (action) {
			case "number":
				this.appendNumber(target.textContent);
				break;
			case "operator":
				this.handleOperator(target.textContent);
				break;
			case "decimal":
				this.appendDecimal();
				break;
			case "clear":
				this.resetScreen();
				break;
			case "clear-all":
				this.clearAll();
				break;
			default:
				return;
		}
	}
}

const calculator = new Calculator();
document
	.querySelector(".calculator")
	.addEventListener("click", (event) => calculator.handleButtonClick(event));
