/** @format */

const themeToggle = document.querySelector(".theme-toggle");

function toggleDarkMode() {
	document.body.classList.toggle("dark");
	document.querySelector(".calculator").classList.toggle("dark");
}

themeToggle.addEventListener("click", toggleDarkMode);

module.exports = { toggleDarkMode };
