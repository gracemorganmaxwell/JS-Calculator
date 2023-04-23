/** @format */

const randomEmoji = require("./emoji");

describe("randomEmoji", () => {
	it("returns a valid emoji", () => {
		const emojis = ["🚀", "🌠", "🌌", "🌕", "🌙", "⭐"];
		const emoji = randomEmoji();
		expect(emojis).toContain(emoji);
	});
});
