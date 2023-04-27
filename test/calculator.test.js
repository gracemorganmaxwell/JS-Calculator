/** @format */

const Calculator = require("./src/calculator.js");

global.document.querySelector = (selector) => {
	switch (selector) {
		case ".calculator-screen":
			return {
				textContent: "",
			};
		case ".inner-calculator-screen":
			return {
				textContent: "",
			};
		default:
			return {
				addEventListener: jest.fn(),
			};
	}
};

function createMockEvent(target) {
	return {
		target: {
			dataset: {
				action: target.action,
			},
			textContent: target.textContent,
			matches: () => true,
		},
	};
}

describe("Calculator", () => {
	let calculator;

	beforeEach(() => {
		calculator = new Calculator();
	});

	describe("handleButtonClick", () => {
		test("should handle number buttons", () => {
			const mockNumberEvent = createMockEvent({
				action: "number",
				textContent: "5",
			});
			calculator.handleButtonClick(mockNumberEvent);
			expect(calculator.calculatorScreen.textContent).toBe("5");
		});

		test("should handle operator buttons", () => {
			const mockOperatorEvent = createMockEvent({
				action: "operator",
				textContent: "+",
			});
			calculator.handleButtonClick(mockOperatorEvent);
			expect(calculator.currentOperator).toBe("+");
			expect(calculator.firstOperand).toBe(
				parseFloat(calculator.calculatorScreen.textContent)
			);
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
				calculator.handleOperator("-");
				expect(calculator.currentOperator).toBe("-");
				expect(calculator.firstOperand).toBe("5");
				expect(calculator.shouldResetScreen).toBe(true);
				expect(calculator.innerCalculatorScreen.textContent).toBe("0 + 5 = 5");
			});
		});

		// Add more tests for other button types (decimal, clear, calculate)
		describe("appendNumber", () => {
			it("should append a number to the screen", () => {
				calculator.appendNumber("5");
				expect(calculator.calculatorScreen.textContent).toBe("5");
			});

			it("should reset the screen when screen is 0 or shouldResetScreen is true", () => {
				calculator.shouldResetScreen = false;
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

		describe("calculate", () => {
			it("should return if currentOperator is null or shouldResetScreen is true", () => {
				calculator.calculate();
				expect(calculator.calculatorScreen.textContent).toBe("0");
				expect(calculator.innerCalculatorScreen.textContent).toBe("");

				calculator.shouldResetScreen = true;
				calculator.currentOperator = "+";
				calculator.calculate();
				expect(calculator.calculatorScreen.textContent).toBe("0");
				expect(calculator.innerCalculatorScreen.textContent).toBe("");
			});

			it("should calculate the result of an operation and display on calculator screen and inner screen", () => {
				calculator.calculatorScreen.textContent = "5";
				calculator.currentOperator = "+";
				calculator.shouldResetScreen = false;
				calculator.secondOperand = "10";
				calculator.calculate();
				expect(calculator.calculatorScreen.textContent).toBe("15");
				expect(calculator.innerCalculatorScreen.textContent).toBe(
					"5 + 10 = 15"
				);
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
				expect(calculator.innerCalculatorScreen.textContent).toBe("");
				expect(calculator.firstOperand).toBe("");
				expect(calculator.secondOperand).toBe("");
				expect(calculator.currentOperator).toBe(null);
			});
		});
	});
});
