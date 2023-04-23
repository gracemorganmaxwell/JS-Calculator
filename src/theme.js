/** @format */

const themeToggle = document.querySelector(".theme-toggle");

function toggleDarkMode() {
	console.log("toggleDarkMode called");
	document.body.classList.toggle("dark");
	document.querySelector(".calculator").classList.toggle("dark");
}

themeToggle.addEventListener("click", toggleDarkMode);
