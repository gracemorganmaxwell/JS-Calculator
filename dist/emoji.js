/** @format */
//emjoi random generating function
const emojis = ["🚀", "🌠", "🌌", "🌕", "🌖", "🌗", "🌘", "🌑", "🌒", "🌓", "🌔", "🌟", "⭐", "☄️"];
const emojiContainer = document.getElementById("emoji-container");
function generateRandomEmoji() {
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
function generateEmojisContinuously() {
  generateRandomEmoji();
  setTimeout(generateEmojisContinuously, Math.random() * 2000 + 1000);
}
generateEmojisContinuously();
module.exports = "generateRandomEmoji";