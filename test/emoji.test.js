/** @format */

const {
	generateRandomEmoji,
	generateEmojisContinuously,
} = require("../src/emoji.js");

const mockEmojiContainer = {
	appendChild: jest.fn(),
	removeChild: jest.fn(),
};

const emojis = [
	"🚀",
	"🌠",
	"🌌",
	"🌕",
	"🌖",
	"🌗",
	"🌘",
	"🌑",
	"🌒",
	"🌓",
	"🌔",
	"🌟",
	"⭐",
	"☄️",
];

describe("generateRandomEmoji", () => {
	test("returns a valid emoji", () => {
		generateRandomEmoji(mockEmojiContainer);

		const emojiElement = mockEmojiContainer.appendChild.mock.calls[0][0];
		const emoji = emojiElement.textContent;

		expect(emojis).toContain(emoji);
	});
});

describe("generateEmojisContinuously", () => {
	test("creates and removes emoji elements", () => {
		jest.useFakeTimers();

		generateEmojisContinuously(mockEmojiContainer);
		expect(mockEmojiContainer.appendChild).toHaveBeenCalled();

		// Advance the timers by a specific amount of time (e.g., 5000ms)
		jest.advanceTimersByTime(5000);

		expect(mockEmojiContainer.removeChild).toHaveBeenCalled();

		jest.useRealTimers();
	});
});
