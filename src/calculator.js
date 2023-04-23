/** @format */
class Calculator {
	constructor() {
		this.calculatorKeys = document.querySelector(".calculator-keys");
		this.calculatorScreen = document.querySelector(".calculator-screen");
		this.innerCalculatorScreen = document.querySelector(
			".inner-calculator-screen-display"
		);
		this.firstOperand = "";
		this.secondOperand = "";
		this.currentOperator = null;
		this.shouldResetScreen = false;

		this.calculatorKeys.addEventListener("click", (e) =>
			this.handleButtonClick(e)
		);
	}

	appendNumber(number) {
		if (this.calculatorScreen.textContent === "0" || this.shouldResetScreen)
			this.resetScreen();
		this.calculatorScreen.textContent += number;
	}

	resetScreen() {
		this.calculatorScreen.textContent = "";
		this.shouldResetScreen = false;
	}

	clearAll() {
		this.calculatorScreen.textContent = "0";
		this.innerCalculatorScreen.textContent = "";
		this.firstOperand = "";
		this.secondOperand = "";
		this.currentOperator = null;
	}

	handleOperator(operator) {
		if (this.currentOperator !== null) this.calculate();
		this.firstOperand = this.calculatorScreen.textContent;
		this.currentOperator = operator;
		this.shouldResetScreen = true;
	}

	calculate() {
		if (this.currentOperator === null || this.shouldResetScreen) return;
		this.secondOperand = this.calculatorScreen.textContent;
		let result;

		switch (this.currentOperator) {
			case "+":
				result = parseFloat(this.firstOperand) + parseFloat(this.secondOperand);
				break;
			case "-":
				result = parseFloat(this.firstOperand) - parseFloat(this.secondOperand);
				break;
			case "*":
				result = parseFloat(this.firstOperand) * parseFloat(this.secondOperand);
				break;
			case "/":
				result = parseFloat(this.firstOperand) / parseFloat(this.secondOperand);
				break;
			default:
				return;
		}

		this.calculatorScreen.textContent = result;
		this.innerCalculatorScreen.textContent = `${this.firstOperand} ${this.currentOperator} ${this.secondOperand} = ${result}`;
		this.currentOperator = null;
		this.shouldResetScreen = true;
	}

	handleButtonClick(e) {
		const target = e.target;
		const action = target.dataset.action;

		if (!target.matches("button")) return;

		switch (action) {
			case "number":
				this.appendNumber(target.textContent);
				break;
			case "operator":
				this.handleOperator(target.textContent);
				break;
			case "decimal":
				if (this.shouldResetScreen) this.resetScreen();
				if (!this.calculatorScreen.textContent.includes("."))
					this.calculatorScreen.textContent += ".";
				break;
			case "clear":
				this.clearAll();
				break;
			case "calculate":
				this.calculate();
				break;
		}
	}
}

const calculator = new Calculator();
module.exports = Calculator;
