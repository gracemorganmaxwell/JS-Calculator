/** @format */
global.document.querySelector = jest.fn((selector) => {
	if (selector === ".theme-toggle") {
		return { addEventListener: jest.fn() };
	} else if (selector === ".calculator") {
		return { classList: { toggle: jest.fn() } };
	}
});

beforeAll(() => {
	global.document.querySelector = jest.fn((selector) => {
		if (selector === ".theme-toggle") {
			return { addEventListener: jest.fn() };
		} else if (selector === ".calculator") {
			return { classList: { toggle: jest.fn(), contains: jest.fn() } };
		}
	});
});

const { toggleDarkMode } = require("../src/theme");

describe("theme", () => {
	beforeEach(() => {
		document.body.innerHTML = '<div id="app"></div>';
	});

	it("toggles dark-mode class on the calculator element", () => {
		const calculatorElement = document.querySelector(".calculator");
		expect(calculatorElement.classList.contains("dark-mode")).toBe(false);
		toggleDarkMode();
		expect(calculatorElement.classList.contains("dark-mode")).toBe(true);
		toggleDarkMode();
		expect(calculatorElement.classList.contains("dark-mode")).toBe(false);
	});
});
