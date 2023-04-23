/** @format */
const { toggleDarkMode } = require("src/theme");

describe("theme", () => {
	beforeEach(() => {
		document.body.innerHTML = '<div id="app"></div>';
	});

	it("toggles dark-mode class on the body", () => {
		expect(document.body.classList.contains("dark-mode")).toBe(false);
		toggleDarkMode();
		expect(document.body.classList.contains("dark-mode")).toBe(true);
		toggleDarkMode();
		expect(document.body.classList.contains("dark-mode")).toBe(false);
	});
});
