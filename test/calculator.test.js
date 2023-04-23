/** @format */
global.document.querySelector = () => ({
	addEventListener: jest.fn(),
});

const Calculator = require("../src/calculator");

describe("Calculator", () => {
	let calculator;

	beforeEach(() => {
		calculator = new Calculator();
	});

	describe("appendNumber", () => {
		it("should append a number to the screen", () => {
			calculator.appendNumber("5");
			expect(calculator.calculatorScreen.textContent).toBe("5");
		});

		it("should reset the screen when screen is 0 or shouldResetScreen is true", () => {
			calculator.calculatorScreen.textContent = "0";
			calculator.shouldResetScreen = false;
			document.body.innerHTML = '<div id="calculator-screen">0</div>';
			calculator.appendNumber("5");
			expect(calculator.calculatorScreen.textContent).toBe("5");

			calculator.resetScreen();
			calculator.shouldResetScreen = true;
			calculator.appendNumber("5");
			expect(calculator.calculatorScreen.textContent).toBe("5");
		});
	});

	describe("resetScreen", () => {
		it("should reset the screen to an empty string and set shouldResetScreen to false", () => {
			calculator.calculatorScreen.textContent = "5";
			calculator.shouldResetScreen = true;
			calculator.resetScreen();
			expect(calculator.calculatorScreen.textContent).toBe("");
			expect(calculator.shouldResetScreen).toBe(false);
		});
	});

	describe("clearAll", () => {
		it("should clear the screen, inner screen, and all operands", () => {
			calculator.calculatorScreen.textContent = "5";
			calculator.innerCalculatorScreen.textContent = "5 + 5 = 10";
			calculator.firstOperand = "5";
			calculator.secondOperand = "5";
			calculator.currentOperator = "+";

			calculator.clearAll();

			expect(calculator.calculatorScreen.textContent).toBe("0");
			expect(calculator.innerCalculatorScreen.textContent).toBe("");
			expect(calculator.firstOperand).toBe("");
			expect(calculator.secondOperand).toBe("");
			expect(calculator.currentOperator).toBe(null);
		});
	});

	describe("handleOperator", () => {
		it("should handle an operator when currentOperator is null", () => {
			calculator.calculatorScreen.textContent = "0";
			calculator.handleOperator("+");
			expect(calculator.currentOperator).toBe("+");
			expect(calculator.firstOperand).toBe("0");
			expect(calculator.shouldResetScreen).toBe(true);
		});

		it("should handle an operator when currentOperator is not null", () => {
			calculator.currentOperator = "+";
			calculator.calculatorScreen.textContent = "5";
			calculator.shouldResetScreen = false;
			document.body.innerHTML = `<div id="calculator-screen">0</div>
			<div id="inner-calculator-screen"></div>`;
			calculator.handleOperator("-");
			expect(calculator.currentOperator).toBe("-");
			expect(calculator.firstOperand).toBe("5");
			expect(calculator.shouldResetScreen).toBe(true);
			expect(calculator.innerCalculatorScreen.textContent).toBe("0 + 5 = 5");
		});
	});

	describe("calculate", () => {
		it("should return if currentOperator is null or shouldResetScreen is true", () => {
			calculator.calculate();
			expect(calculator.calculatorScreen.textContent).toBe("");
			expect(calculator.innerCalculatorScreen.textContent).toBe("");

			calculator.shouldResetScreen = true;
			calculator.currentOperator = "+";
			document.body.innerHTML = `<div id="calculator-screen"></div>
			<div id="inner-calculator-screen"></div>`;
			calculator.calculate();
			expect(calculator.calculatorScreen.textContent).toBe("");
			expect(calculator.innerCalculatorScreen.textContent).toBe("");
		});

		it("should calculate the result of an operation and display on calculator screen and inner screen", () => {
			calculator.calculatorScreen.textContent = "5";
			calculator.currentOperator = "+";
			calculator.shouldResetScreen = false;
			calculator.secondOperand = "10";
			document.body.innerHTML = `
			<div id="calculator-screen">5</div>
			<div id="inner-calculator-screen"></div>`;
			calculator.calculate();
			expect(calculator.calculatorScreen.textContent).toBe("15");
			expect(calculator.innerCalculatorScreen.textContent).toBe("5 + 10 = 15");
		});
	});
	describe("handleButtonClick", () => {
		it("should append a number to the screen", () => {
			calculator.handleButtonClick({
				target: { textContent: "5", matches: () => true },
			});
			expect(calculator.calculatorScreen.textContent).toBe("5");
		});

		it("should handle the addition operator", () => {
			calculator.handleButtonClick({
				target: { textContent: "+", matches: () => true },
			});
			calculator.handleButtonClick({
				target: { textContent: "3", matches: () => true },
			});
			calculator.handleButtonClick({
				target: { textContent: "=", matches: () => true },
			});
			expect(calculator.calculatorScreen.textContent).toBe("3");
		});

		it("should handle the subtraction operator", () => {
			calculator.handleButtonClick({
				target: { textContent: "-", matches: () => true },
			});
			calculator.handleButtonClick({
				target: { textContent: "3", matches: () => true },
			});
			calculator.handleButtonClick({
				target: { textContent: "=", matches: () => true },
			});
			expect(calculator.calculatorScreen.textContent).toBe("-3");
		});

		it("should handle the multiplication operator", () => {
			calculator.handleButtonClick({
				target: { textContent: "*", matches: () => true },
			});
			calculator.handleButtonClick({
				target: { textContent: "3", matches: () => true },
			});
			calculator.handleButtonClick({
				target: { textContent: "=", matches: () => true },
			});
			expect(calculator.calculatorScreen.textContent).toBe("0");
		});

		it("should handle the division operator", () => {
			calculator.handleButtonClick({
				target: { textContent: "/", matches: () => true },
			});
			calculator.handleButtonClick({
				target: { textContent: "3", matches: () => true },
			});
			calculator.handleButtonClick({
				target: { textContent: "=", matches: () => true },
			});
			expect(calculator.calculatorScreen.textContent).toBe("0");
		});

		it("should handle the decimal point operator", () => {
			calculator.handleButtonClick({
				target: { textContent: "2", matches: () => true },
			});
			calculator.handleButtonClick({
				target: { textContent: ".", matches: () => true },
			});
			calculator.handleButtonClick({
				target: { textContent: "5", matches: () => true },
			});
			expect(calculator.calculatorScreen.textContent).toBe("2.5");
		});

		it("should clear the screen and inner screen when the clear button is pressed", () => {
			calculator.calculatorScreen.textContent = "5";
			calculator.innerCalculatorScreen.textContent = "5 + 5 = 10";
			calculator.firstOperand = "5";
			calculator.secondOperand = "5";
			calculator.currentOperator = "+";

			calculator.handleButtonClick({
				target: { textContent: "C", matches: () => true },
			});

			expect(calculator.calculatorScreen.textContent).toBe("0");
			expect(calculator.innerCalculatorScreen.textContent).toBe("");
			expect(calculator.firstOperand).toBe("");
			expect(calculator.secondOperand).toBe("");
			expect(calculator.currentOperator).toBe(null);
		});

		it("should do nothing if an invalid button is pressed", () => {
			calculator.handleButtonClick({
				target: { textContent: "invalid", matches: () => false },
			});

			expect(calculator.calculatorScreen.textContent).toBe("0");
		});
	});
});
