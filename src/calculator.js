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
		if (this.shouldResetScreen || this.calculatorScreen.textContent === "0") {
			this.calculatorScreen.textContent = "";
			this.shouldResetScreen = false;
		}
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
		if (this.shouldResetScreen) return;
		if (this.currentOperator !== null) {
			this.calculate();
		}
		this.firstOperand = parseFloat(this.calculatorScreen.textContent);
		this.currentOperator = operator;
		this.shouldResetScreen = true;
	}

	calculate() {
		if (this.currentOperator === null || this.shouldResetScreen) return;
		this.secondOperand = parseFloat(this.calculatorScreen.textContent);
		let result;

		switch (this.currentOperator) {
			case "+":
				result = this.firstOperand + this.secondOperand;
				break;
			case "-":
				result = this.firstOperand - this.secondOperand;
				break;
			case "*":
				result = this.firstOperand * this.secondOperand;
				break;
			case "/":
				result = this.firstOperand / this.secondOperand;
				break;
			default:
				return;
		}

		if (isNaN(result)) {
			throw new Error("Result is not a number");
		}

		this.calculatorScreen.textContent = result.toFixed(2).replace(/\.?0+$/, "");
		this.innerCalculatorScreen.textContent = `${this.firstOperand} ${this.currentOperator} ${this.secondOperand} =`;
		this.currentOperator = null;
		this.shouldResetScreen = true;
	}

	handleButtonClick(e) {
		const target = e.target;

		if (!target || !target.matches("button")) {
			return;
		}

		const action = target.dataset.action;

		switch (action) {
			case "number":
				this.appendNumber(target.textContent);
				break;
			case "operator":
				this.handleOperator(target.textContent);
				break;
			case "decimal":
				if (this.shouldResetScreen) {
					this.resetScreen();
				}
				if (!this.calculatorScreen.textContent.includes(".")) {
					this.calculatorScreen.textContent += ".";
				}
				break;
			case "clear":
				this.clearAll();
				break;
			case "calculate":
				this.calculate();
				break;
			default:
				return;
		}
	}
}

module.exports = Calculator;
