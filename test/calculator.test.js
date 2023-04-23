/** @format */

const Calculator = require("../src/calculator");

describe("Calculator", () => {
	let calculator;

	beforeEach(() => {
		calculator = new Calculator();
	});

	describe("add", () => {
		it("adds two numbers", () => {
			expect(calculator.add(2, 3)).toBe(5);
		});

		it("returns NaN when input is not a number", () => {
			expect(calculator.add("a", "b")).toBeNaN();
		});
	});

	describe("subtract", () => {
		it("subtracts two numbers", () => {
			expect(calculator.subtract(5, 3)).toBe(2);
		});

		it("returns NaN when input is not a number", () => {
			expect(calculator.subtract("a", "b")).toBeNaN();
		});
	});

	describe("multiply", () => {
		it("multiplies two numbers", () => {
			expect(calculator.multiply(2, 3)).toBe(6);
		});

		it("returns NaN when input is not a number", () => {
			expect(calculator.multiply("a", "b")).toBeNaN();
		});
	});

	describe("divide", () => {
		it("divides two numbers", () => {
			expect(calculator.divide(6, 3)).toBe(2);
		});

		it("returns NaN when input is not a number", () => {
			expect(calculator.divide("a", "b")).toBeNaN();
		});

		it("returns Infinity when dividing by 0", () => {
			expect(calculator.divide(3, 0)).toBe(Infinity);
		});
	});
});
