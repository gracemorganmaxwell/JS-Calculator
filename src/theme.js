/** @format */
const themeToggle = document.querySelector(".theme-toggle");

themeToggle.addEventListener("click", () => {
	document.body.classList.toggle("dark");
	document.querySelector(".calculator").classList.toggle("dark");
});

module.exports = { toggleDarkMode };
