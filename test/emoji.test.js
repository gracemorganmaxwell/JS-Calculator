/** @format */

// ... (other imports)
const {
	generateRandomEmoji,
	generateEmojisContinuously,
} = require("../src/emoji");

// Create a mock emojiContainer
const mockEmojiContainer = {
	appendChild: jest.fn(),
	removeChild: jest.fn(),
};

describe("generateRandomEmoji", () => {
	// ... (other tests)

	test("returns a valid emoji", () => {
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
		const emoji = generateRandomEmoji(mockEmojiContainer);
		expect(emojis).toContain(emoji);
	});
});

describe("generateEmojisContinuously", () => {
	// ... (other tests)

	test("creates and removes emoji elements", () => {
		jest.useFakeTimers();

		generateEmojisContinuously(mockEmojiContainer);
		expect(mockEmojiContainer.appendChild).toHaveBeenCalled();
		jest.runAllTimers();
		expect(mockEmojiContainer.removeChild).toHaveBeenCalled();

		jest.useRealTimers();
	});
});
