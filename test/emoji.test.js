/** @format */

const {
	generateRandomEmoji,
	generateEmojisContinuously,
} = require("../src/emoji");

global.document = {
	querySelector: () => ({
		appendChild: () => {},
		removeChild: () => {},
	}),
};

beforeAll(() => {
	global.document.querySelector = jest.fn((selector) => {
		if (selector === "#emoji-container") {
			return { appendChild: jest.fn(), removeChild: jest.fn() };
		}
	});
});

const createElementMock = jest.fn(() => ({
	style: {},
}));

const querySelectorMock = jest.fn(() => ({
	appendChild: jest.fn(),
	removeChild: jest.fn(),
}));

global.document.querySelector = querySelectorMock;

describe("generateRandomEmoji", () => {
	it("returns a valid emoji", () => {
		const emojis = ["🚀", "🌠", "🌌", "🌕", "🌙", "⭐"];
		const emoji = generateRandomEmoji();
		expect(emojis).toContain(emoji);
	});
});

describe("generateEmojisContinuously", () => {
	jest.useFakeTimers();

	it("calls setInterval with the expected delay", () => {
		generateEmojisContinuously(1000);
		expect(setInterval).toHaveBeenCalledWith(expect.any(Function), 1000);
	});

	it("creates and removes emoji elements", () => {
		generateEmojisContinuously(1000);
		jest.advanceTimersByTime(1000);

		expect(createElementMock).toHaveBeenCalledWith("span");
		expect(querySelectorMock).toHaveBeenCalledWith("#emoji-container");
		expect(querySelectorMock().appendChild).toHaveBeenCalled();
		expect(setTimeout).toHaveBeenCalled();

		jest.runOnlyPendingTimers();
		expect(querySelectorMock().removeChild).toHaveBeenCalled();
	});
});
