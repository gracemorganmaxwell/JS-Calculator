/** @format */

const fs = require("fs");
const path = require("path");

const html = fs.readFileSync(path.resolve(__dirname, "../index.html"), "utf8");

describe("index.html", () => {
	beforeAll(() => {
		document.documentElement.innerHTML = html.toString();
	});

	it("contains an emoji container", () => {
		const emojiContainer = document.querySelector("#emoji-container");
		expect(emojiContainer).not.toBeNull();
	});

	it("contains a theme toggle switch", () => {
		const themeToggle = document.querySelector(".theme-toggle");
		expect(themeToggle).not.toBeNull();
	});

	it("contains a calculator element", () => {
		const calculator = document.querySelector(".calculator");
		expect(calculator).not.toBeNull();
	});

	it("contains the required calculator keys", () => {
		const calculatorKeys = document.querySelectorAll(".calculator-keys button");
		expect(calculatorKeys.length).toBe(18);
		expect(calculatorKeys[0].textContent).toBe("7");
		expect(calculatorKeys[1].textContent).toBe("8");
		expect(calculatorKeys[2].textContent).toBe("9");
		expect(calculatorKeys[3].textContent).toBe("-");
		expect(calculatorKeys[4].textContent).toBe("4");
		expect(calculatorKeys[5].textContent).toBe("5");
		expect(calculatorKeys[6].textContent).toBe("6");
		expect(calculatorKeys[7].textContent).toBe("×");
		expect(calculatorKeys[8].textContent).toBe("1");
		expect(calculatorKeys[9].textContent).toBe("2");
		expect(calculatorKeys[10].textContent).toBe("3");
		expect(calculatorKeys[11].textContent).toBe("+");
		expect(calculatorKeys[12].textContent).toBe("0");
		expect(calculatorKeys[12].classList.contains("span-two")).toBe(true);
		expect(calculatorKeys[13].textContent).toBe(".");
		expect(calculatorKeys[14].textContent).toBe("÷");
		expect(calculatorKeys[15].textContent).toBe("=");
		expect(calculatorKeys[16].textContent).toBe("AC");
		expect(calculatorKeys[16].classList.contains("span-two")).toBe(true);
		expect(calculatorKeys[17].textContent).toBe("DEL");
	});
});
