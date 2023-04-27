/** @format */

const Calculator = require("../src/calculator.js");

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

const Calculator = require("../src/calculator");

describe("Calculator", () => {
	describe("Calculator › handleButtonClick", () => {
		describe("handleButtonClick › handleOperator", () => {
			let calculator;

			beforeEach(() => {
				calculator = new Calculator();
			});

			it("should handle an operator when currentOperator is null", () => {
				calculator.handleButtonClick({
					target: {
						dataset: { action: "operator" },
						textContent: "+",
						matches: () => true,
					},
				});
				expect(calculator.currentOperator).toBe("+");
				expect(calculator.firstOperand).toBe(
					calculator.calculatorScreen.textContent
				);
				expect(calculator.shouldResetScreen).toBe(true);
			});

			it("should handle an operator when currentOperator is not null", () => {
				calculator.handleButtonClick({
					target: {
						dataset: { action: "operator" },
						textContent: "+",
						matches: () => true,
					},
				});
				calculator.handleButtonClick({
					target: {
						dataset: { action: "number" },
						textContent: "2",
						matches: () => true,
					},
				});
				calculator.handleButtonClick({
					target: {
						dataset: { action: "operator" },
						textContent: "-",
						matches: () => true,
					},
				});
				expect(calculator.innerCalculatorScreen.textContent).toContain("=");
			});
		});

		describe("handleButtonClick › resetScreen", () => {
			let calculator;

			beforeEach(() => {
				calculator = new Calculator();
			});

			it("should reset the screen to 0 and set shouldResetScreen to false", () => {
				calculator.calculatorScreen.textContent = "42";
				calculator.shouldResetScreen = true;
				calculator.handleButtonClick({
					target: { dataset: { action: "clear" }, matches: () => true },
				});
				expect(calculator.calculatorScreen.textContent).toBe("0");
				expect(calculator.shouldResetScreen).toBe(false);
			});
		});

		describe("handleButtonClick › clearAll", () => {
			let calculator;

			beforeEach(() => {
				calculator = new Calculator();
			});

			it("should clear the screen, innerscreen, and all operands", () => {
				calculator.handleButtonClick({
					target: { dataset: { action: "clear-all" }, matches: () => true },
				});
				expect(calculator.calculatorScreen.textContent).toBe("0");
				expect(calculator.innerCalculatorScreen.textContent).toBe("");
				expect(calculator.firstOperand).toBe(null);
				expect(calculator.secondOperand).toBe(null);
				expect(calculator.currentOperator).toBe(null);
			});
		});

		describe("handleButtonClick › calculate", () => {
			let calculator;

			beforeEach(() => {
				calculator = new Calculator();
			});

			it("should return if currentOperator is null or shouldResetScreen is true", () => {
				calculator.handleButtonClick({
					target: { dataset: { action: "calculate" }, matches: () => true },
				});
				expect(calculator.calculatorScreen.textContent).toBe("0");
				expect(calculator.innerCalculatorScreen.textContent).toBe("");

				calculator.shouldResetScreen = true;
				calculator.handleButtonClick({
					target: { dataset: { action: "calculate" }, matches: () => true },
				});
				expect(calculator.calculatorScreen.textContent).toBe("0");
				expect(calculator.innerCalculatorScreen.textContent).toBe("");
			});

			it("should calculate the result of an operation and display on calculator screen and inner screen", () => {
				calculator.handleButtonClick({
					target: {
						dataset: { action: "number" },
						textContent: "5",
						matches: () => true,
					},
				});
				calculator.handleButtonClick({
					target: {
						dataset: { action: "operator" },
						textContent: "+",
						matches: () => true,
					},
				});
				calculator.handleButtonClick({
					target: {
						dataset: { action: "number" },
						textContent: "3",
						matches: () => true,
					},
				});
				calculator.handleButtonClick({
					target: { dataset: { action: "calculate" }, matches: () => true },
				});
				expect(calculator.calculatorScreen.textContent).toBe("8");
				expect(calculator.innerCalculatorScreen.textContent)
					.expect(calculator.innerCalculatorScreen.textContent)
					.toBe("5 + 8 =");
				expect(calculator.innerCalculatorScreen.textContent).toBe("5 + 8 =");
			});
		});
	});
});
