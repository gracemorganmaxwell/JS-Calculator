/** @format */

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

function generateRandomEmoji(emojiContainer) {
	if (!emojiContainer) return;

	const emojiElement = document.createElement("div");
	const randomEmojiIndex = Math.floor(Math.random() * emojis.length);
	const randomX = Math.random() * 100;
	const randomDuration = Math.random() * 10 + 5;

	emojiElement.classList.add("emoji");
	emojiElement.textContent = emojis[randomEmojiIndex];
	emojiElement.style.left = `${randomX}%`;
	emojiElement.style.animationDuration = `${randomDuration}s`;

	emojiContainer.appendChild(emojiElement);

	setTimeout(() => {
		emojiContainer.removeChild(emojiElement);
	}, randomDuration * 1000);
}

function generateEmojisContinuously(emojiContainer) {
	generateRandomEmoji(emojiContainer);
	setTimeout(
		() => generateEmojisContinuously(emojiContainer),
		Math.random() * 2000 + 1000
	);
}

document.addEventListener("DOMContentLoaded", () => {
	const emojiContainer = document.getElementById("emoji-container");
	generateEmojisContinuously(emojiContainer);
});

module.exports = { generateRandomEmoji, generateEmojisContinuously };
